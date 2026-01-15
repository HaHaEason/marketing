from __future__ import annotations

from fastapi import APIRouter
from fastapi.responses import JSONResponse

from app.core.response import json_response
from app.services.health_service import get_health_status

router = APIRouter()


@router.get("/health")
def health() -> JSONResponse:
    status = get_health_status()
    status_code = 200 if status.get("ok") else 503
    return json_response(data=status, status_code=status_code)
