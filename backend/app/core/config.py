from __future__ import annotations

import os
from functools import lru_cache
from pathlib import Path

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


def _env_file() -> Path:
    backend_root = Path(__file__).resolve().parents[2]
    env = os.getenv("APP_ENV", "dev").lower()
    if env == "prod":
        return backend_root / ".env.prod"
    if env == "test":
        return backend_root / ".env.test"
    return backend_root / ".env"


class Settings(BaseSettings):
    app_env: str = Field(default="dev", alias="APP_ENV")
    app_name: str = Field(default="marketing-backend", alias="APP_NAME")
    api_prefix: str = Field(default="/api", alias="API_PREFIX")
    db_dsn: str = Field(
        default="postgresql://postgres:postgres@localhost:5432/marketing",
        alias="DATABASE_URL",
    )

    model_config = SettingsConfigDict(
        env_file=_env_file(),
        env_file_encoding="utf-8",
        extra="ignore",
    )


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()
