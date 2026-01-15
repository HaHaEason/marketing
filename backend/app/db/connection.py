from __future__ import annotations

from contextlib import contextmanager
from typing import Iterator

import psycopg

from app.core.config import get_settings


@contextmanager
def get_connection() -> Iterator[psycopg.Connection]:
    settings = get_settings()
    conn = psycopg.connect(settings.db_dsn)
    try:
        yield conn
    finally:
        conn.close()
