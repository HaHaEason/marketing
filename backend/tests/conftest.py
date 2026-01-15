import os
import sys
from pathlib import Path


def pytest_sessionstart(session):
    backend_root = Path(__file__).resolve().parents[1]
    sys.path.insert(0, str(backend_root))
    os.environ.setdefault("APP_ENV", "test")
