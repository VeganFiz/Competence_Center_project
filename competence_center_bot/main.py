import asyncio
import logging
import sys

import uvicorn
from aiogram import Bot, Dispatcher
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.fsm.storage.memory import MemoryStorage

import db
from api import create_app
from config import API_HOST, API_PORT, BOT_TOKEN
from handlers import router


async def main() -> None:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")
    if not BOT_TOKEN:
        sys.exit("Не задан BOT_TOKEN. Скопируйте .env.example в .env и заполните его.")

    await db.init_db()

    bot = Bot(BOT_TOKEN, default=DefaultBotProperties(parse_mode=ParseMode.HTML))
    dp = Dispatcher(storage=MemoryStorage())
    dp.include_router(router)

    server = uvicorn.Server(uvicorn.Config(create_app(bot), host=API_HOST, port=API_PORT, log_level="info"))

    tasks = [
        asyncio.create_task(dp.start_polling(bot, handle_signals=False)),
        asyncio.create_task(server.serve()),
    ]
    try:
        done, pending = await asyncio.wait(tasks, return_when=asyncio.FIRST_COMPLETED)
        server.should_exit = True
        for t in pending:
            t.cancel()
        for t in done:
            t.result()  # пробросить ошибку, если одна из частей упала
    finally:
        await bot.session.close()


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except (KeyboardInterrupt, asyncio.CancelledError):
        pass
