import html
import re

from aiogram import Bot, F, Router
from aiogram.filters import Command, CommandStart, StateFilter
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from aiogram.types import (
    CallbackQuery,
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    KeyboardButton,
    Message,
    ReplyKeyboardMarkup,
)

import db
import texts as T
from notify import notify_admin
from validators import normalize_phone, valid_name

router = Router()


class Booking(StatesGroup):
    name = State()
    phone = State()
    category = State()
    time = State()
    confirm = State()


# ---------- клавиатуры ----------
def main_menu() -> ReplyKeyboardMarkup:
    return ReplyKeyboardMarkup(
        keyboard=[
            [KeyboardButton(text=T.BTN_BOOK)],
            [KeyboardButton(text=T.BTN_PRICES), KeyboardButton(text=T.BTN_FAQ)],
        ],
        resize_keyboard=True,
    )


def cancel_kb() -> ReplyKeyboardMarkup:
    return ReplyKeyboardMarkup(keyboard=[[KeyboardButton(text=T.BTN_CANCEL)]], resize_keyboard=True)


def phone_kb() -> ReplyKeyboardMarkup:
    return ReplyKeyboardMarkup(
        keyboard=[
            [KeyboardButton(text=T.BTN_SHARE_PHONE, request_contact=True)],
            [KeyboardButton(text=T.BTN_CANCEL)],
        ],
        resize_keyboard=True,
    )


def categories_kb() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text=c, callback_data=f"cat:{i}")]
            for i, c in enumerate(T.CATEGORIES)
        ]
    )


def confirm_kb() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text="✅ Подтвердить", callback_data="confirm:yes"),
                InlineKeyboardButton(text="✖️ Отменить", callback_data="confirm:no"),
            ]
        ]
    )


def faq_kb() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text=q, callback_data=f"faq:{i}")] for i, (q, _) in enumerate(T.FAQ)
        ]
    )


# ---------- общие команды (работают в любом состоянии) ----------
@router.message(CommandStart())
async def cmd_start(m: Message, state: FSMContext):
    await state.clear()
    await m.answer(T.WELCOME, reply_markup=main_menu())


@router.message(Command("cancel"))
@router.message(F.text == T.BTN_CANCEL)
async def cancel(m: Message, state: FSMContext):
    was_active = await state.get_state() is not None
    await state.clear()
    await m.answer(T.CANCELLED if was_active else T.NOTHING_TO_CANCEL, reply_markup=main_menu())


@router.message(F.text == T.BTN_PRICES)
async def show_prices(m: Message, state: FSMContext):
    await state.clear()
    await m.answer(T.PRICES, reply_markup=main_menu())


@router.message(F.text == T.BTN_FAQ)
async def show_faq(m: Message, state: FSMContext):
    await state.clear()
    await m.answer("Выберите вопрос:", reply_markup=faq_kb())


@router.callback_query(F.data.startswith("faq:"))
async def faq_answer(cb: CallbackQuery):
    idx = cb.data.split(":", 1)[1]
    if idx.isdigit() and int(idx) < len(T.FAQ):
        q, a = T.FAQ[int(idx)]
        await cb.message.answer(f"<b>{html.escape(q)}</b>\n\n{a}")
    await cb.answer()


# ---------- запись на консультацию (FSM) ----------
@router.message(F.text == T.BTN_BOOK)
async def book_start(m: Message, state: FSMContext):
    await state.clear()
    await state.set_state(Booking.name)
    await m.answer(T.BOOK_INTRO, reply_markup=cancel_kb())


@router.message(Booking.name, F.text)
async def got_name(m: Message, state: FSMContext):
    name = " ".join(m.text.split())
    if not valid_name(name):
        await m.answer(T.BAD_NAME)
        return
    await state.update_data(full_name=name)
    await state.set_state(Booking.phone)
    await m.answer(T.ASK_PHONE, reply_markup=phone_kb())


async def _accept_phone(m: Message, state: FSMContext, phone: str):
    await state.update_data(phone=phone)
    await state.set_state(Booking.category)
    await m.answer(f"Телефон принят: <b>{phone}</b>", reply_markup=cancel_kb())
    await m.answer(T.ASK_CATEGORY, reply_markup=categories_kb())


@router.message(Booking.phone, F.contact)
async def got_contact(m: Message, state: FSMContext):
    digits = re.sub(r"\D", "", m.contact.phone_number)
    await _accept_phone(m, state, "+" + digits)


@router.message(Booking.phone, F.text)
async def got_phone(m: Message, state: FSMContext):
    phone = normalize_phone(m.text)
    if phone is None:
        await m.answer(T.BAD_PHONE)  # остаёмся в том же состоянии
        return
    await _accept_phone(m, state, phone)


@router.callback_query(Booking.category, F.data.startswith("cat:"))
async def got_category(cb: CallbackQuery, state: FSMContext):
    idx = cb.data.split(":", 1)[1]
    if not (idx.isdigit() and int(idx) < len(T.CATEGORIES)):
        await cb.answer()
        return
    category = T.CATEGORIES[int(idx)]
    await state.update_data(issue_category=category)
    await state.set_state(Booking.time)
    await cb.message.edit_text(f"Категория: <b>{html.escape(category)}</b>")
    await cb.message.answer(T.ASK_TIME)
    await cb.answer()


@router.message(Booking.time, F.text)
async def got_time(m: Message, state: FSMContext):
    when = " ".join(m.text.split())
    if not 3 <= len(when) <= 100:
        await m.answer(T.BAD_TIME)
        return
    await state.update_data(preferred_time=when)
    await state.set_state(Booking.confirm)
    d = await state.get_data()
    e = html.escape
    summary = (
        "<b>Проверьте данные заявки:</b>\n\n"
        f"Имя: {e(d['full_name'])}\n"
        f"Телефон: {e(d['phone'])}\n"
        f"Категория: {e(d['issue_category'])}\n"
        f"Желаемое время: {e(d['preferred_time'])}\n\n"
        f"<i>{T.CONSENT}</i>"
    )
    await m.answer(summary, reply_markup=confirm_kb())


@router.callback_query(Booking.confirm, F.data == "confirm:yes")
async def confirm_yes(cb: CallbackQuery, state: FSMContext, bot: Bot):
    data = await state.get_data()
    await state.clear()  # сначала очищаем состояние, чтобы двойной клик не создал дубль
    booking_id = await db.add_booking(
        full_name=data["full_name"],
        phone=data["phone"],
        issue_category=data["issue_category"],
        preferred_time=data["preferred_time"],
        source="telegram",
        telegram_id=cb.from_user.id,
        username=cb.from_user.username,
    )
    await cb.message.edit_reply_markup(reply_markup=None)
    await cb.message.answer(T.DONE.format(id=booking_id), reply_markup=main_menu())
    await notify_admin(bot, booking_id, {**data, "username": cb.from_user.username, "source": "telegram"})
    await cb.answer()


@router.callback_query(Booking.confirm, F.data == "confirm:no")
async def confirm_no(cb: CallbackQuery, state: FSMContext):
    await state.clear()
    await cb.message.edit_reply_markup(reply_markup=None)
    await cb.message.answer(T.CANCELLED, reply_markup=main_menu())
    await cb.answer()


# ---------- запасные обработчики (регистрируются последними) ----------
@router.message(StateFilter(Booking))
async def in_flow_fallback(m: Message):
    await m.answer(T.IN_FLOW_HINT)


@router.message(StateFilter(None))
async def unknown(m: Message):
    await m.answer(T.UNKNOWN, reply_markup=main_menu())


@router.callback_query()
async def stale_callback(cb: CallbackQuery):
    await cb.answer(T.EXPIRED, show_alert=True)
