#!/usr/bin/env python3
"""
PropertyKraft — Production-Grade Web Application Runner
Launches the FastAPI backend serving both the REST API and the production React frontend.
"""
import sys
import os
from pathlib import Path

# Add backend directory to path
BASE_DIR = Path(__file__).resolve().parent
BACKEND_DIR = BASE_DIR / "backend"
sys.path.insert(0, str(BACKEND_DIR))

import uvicorn

if __name__ == "__main__":
    print("=" * 70)
    print("  PROPERTYKRAFT — PREMIER REAL ESTATE ADVISORY (WAVE CITY / NH-24)")
    print("=" * 70)
    print("  Starting unified FastAPI server with embedded React production UI...")
    print("  Application URL: http://127.0.0.1:8000")
    print("  API Docs (Swagger): http://127.0.0.1:8000/api/v1/docs")
    print("  Press Ctrl+C to terminate the server.")
    print("=" * 70)
    
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
