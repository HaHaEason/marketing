from __future__ import annotations

from app.services import health_service


def test_health_status_up(monkeypatch):
    monkeypatch.setattr(health_service, "database_is_alive", lambda: True)
    status = health_service.get_health_status()
    assert status["database"] == "up"
    assert status["ok"] is True


def test_health_status_down(monkeypatch):
    monkeypatch.setattr(health_service, "database_is_alive", lambda: False)
    status = health_service.get_health_status()
    assert status["database"] == "down"
    assert status["ok"] is False
