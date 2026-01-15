from __future__ import annotations

from typing import Any, Dict, Optional

from fastapi.responses import JSONResponse


def json_response(
    *,
    data: Optional[Any] = None,
    error: Optional[Dict[str, Any]] = None,
    meta: Optional[Dict[str, Any]] = None,
    status_code: int = 200,
) -> JSONResponse:
    payload = {
        "data": data,
        "error": error,
        "meta": meta,
    }
    return JSONResponse(content=payload, status_code=status_code)
