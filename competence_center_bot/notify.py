import html
import logging

from aiogram import Bot

from config import ADMIN_CHAT_ID

log = logging.getLogger(__name__)


async def notify_admin(bot: Bot, booking_id: int, data: dict) -> bool:
    """Отправляет администратору структурированное уведомление о новой заявке."""
    if not ADMIN_CHAT_ID:
        log.warning("ADMIN_CHAT_ID не задан: уведомление по заявке %s не отправлено", booking_id)
        return False

    e = html.escape
    contact = ""
    if data.get("username"):
        contact = f"\n<b>Telegram:</b> @{e(data['username'])}"
    source = "Telegram-бот" if data.get("source", "telegram") == "telegram" else "Сайт"

    text = (
        f"🆕 <b>Новая заявка № {booking_id}</b>\n"
        f"<b>Источник:</b> {source}\n"
        f"<b>Имя:</b> {e(data['full_name'])}\n"
        f"<b>Телефон:</b> {e(data['phone'])}{contact}\n"
        f"<b>Категория:</b> {e(data['issue_category'])}\n"
        f"<b>Желаемое время:</b> {e(data['preferred_time'])}"
    )
    try:
        await bot.send_message(ADMIN_CHAT_ID, text)
        return True
    except Exception:
        log.exception("Не удалось отправить уведомление администратору (заявка %s)", booking_id)
        return False
