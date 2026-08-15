import aiosqlite

from config import DB_PATH

SCHEMA = """
CREATE TABLE IF NOT EXISTS bookings (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    source         TEXT    NOT NULL DEFAULT 'telegram',
    telegram_id    INTEGER,
    username       TEXT,
    full_name      TEXT    NOT NULL,
    phone          TEXT    NOT NULL,
    issue_category TEXT    NOT NULL,
    preferred_time TEXT    NOT NULL,
    status         TEXT    NOT NULL DEFAULT 'new',
    created_at     TEXT    NOT NULL DEFAULT (datetime('now'))
)
"""


async def init_db() -> None:
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute(SCHEMA)
        await db.commit()


async def add_booking(
    *,
    full_name: str,
    phone: str,
    issue_category: str,
    preferred_time: str,
    source: str = "telegram",
    telegram_id: int | None = None,
    username: str | None = None,
) -> int:
    async with aiosqlite.connect(DB_PATH) as db:
        cur = await db.execute(
            """INSERT INTO bookings
               (source, telegram_id, username, full_name, phone, issue_category, preferred_time)
               VALUES (?, ?, ?, ?, ?, ?, ?)""",
            (source, telegram_id, username, full_name, phone, issue_category, preferred_time),
        )
        await db.commit()
        return cur.lastrowid


async def list_bookings(limit: int = 50) -> list[dict]:
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cur = await db.execute("SELECT * FROM bookings ORDER BY id DESC LIMIT ?", (limit,))
        return [dict(r) for r in await cur.fetchall()]
