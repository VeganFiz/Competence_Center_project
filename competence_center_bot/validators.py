import re

# +7 / 7 / 8 и далее 10 цифр; допускаются пробелы, дефисы и скобки
PHONE_RE = re.compile(
    r"^(?:\+7|7|8)[\s\-()]*\d{3}[\s\-()]*\d{3}[\s\-]*\d{2}[\s\-]*\d{2}$"
)
NAME_RE = re.compile(r"[A-Za-zА-Яа-яЁёӘәІіҢңҒғҮүҰұҚқӨөҺһ]{2}")


def normalize_phone(raw: str) -> str | None:
    """Возвращает номер в виде +7XXXXXXXXXX или None, если формат неверный."""
    raw = raw.strip()
    if not PHONE_RE.match(raw):
        return None
    digits = re.sub(r"\D", "", raw)
    return "+7" + digits[-10:]


def valid_name(name: str) -> bool:
    return 2 <= len(name) <= 100 and bool(NAME_RE.search(name))
