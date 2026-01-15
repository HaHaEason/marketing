from __future__ import annotations

from app.repositories.health_repo import database_is_alive


def get_health_status() -> dict:
    db_ok = database_is_alive()
    return {
        "database": "up" if db_ok else "down",
        "ok": db_ok,
    }
