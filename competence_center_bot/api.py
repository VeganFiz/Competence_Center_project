import secrets

from aiogram import Bot
from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

import db
import texts as T
from config import ALLOWED_ORIGINS, API_KEY
from notify import notify_admin
from validators import normalize_phone, valid_name


class BookingIn(BaseModel):
    full_name: str = Field(min_length=2, max_length=100)
    phone: str = Field(max_length=30)
    issue_category: str
    preferred_time: str = Field(min_length=3, max_length=100)


def create_app(bot: Bot) -> FastAPI:
    app = FastAPI(title="COMPETENCE CENTER API")

    if ALLOWED_ORIGINS:
        app.add_middleware(
            CORSMiddleware,
            allow_origins=ALLOWED_ORIGINS,
            allow_methods=["POST", "GET"],
            allow_headers=["*"],
        )

    @app.get("/health")
    async def health():
        return {"status": "ok"}

    @app.post("/api/requests", status_code=201)
    async def create_request(b: BookingIn):
        """Приём заявок с сайта: те же проверки, то же хранилище, то же уведомление."""
        phone = normalize_phone(b.phone)
        if phone is None:
            raise HTTPException(422, "Неверный формат телефона")
        if not valid_name(b.full_name.strip()):
            raise HTTPException(422, "Неверное имя")
        if b.issue_category not in T.CATEGORIES:
            raise HTTPException(422, f"Категория должна быть одной из: {T.CATEGORIES}")

        data = {
            "full_name": b.full_name.strip(),
            "phone": phone,
            "issue_category": b.issue_category,
            "preferred_time": b.preferred_time.strip(),
        }
        booking_id = await db.add_booking(**data, source="website")
        await notify_admin(bot, booking_id, {**data, "source": "website"})
        return {"id": booking_id, "status": "new"}

    @app.get("/api/requests")
    async def list_requests(limit: int = 50, x_api_key: str | None = Header(default=None)):
        if not API_KEY or not x_api_key or not secrets.compare_digest(x_api_key, API_KEY):
            raise HTTPException(403, "Forbidden")
        return await db.list_bookings(min(max(limit, 1), 200))

    return app
