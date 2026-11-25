import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "PropertyKraft API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Brand details
    BRAND_NAME: str = "PropertyKraft"
    BRAND_TAGLINE: str = "Premier Real Estate Advisory & Township Specialists"
    LOCATION_FOCUS: str = "Wave City, NH-24 / NH-9, Ghaziabad, Delhi-NCR"
    PHONE: str = "+91 6301785285"
    WHATSAPP: str = "+91 63017 85285"
    EMAIL: str = "info@propertykraft.in"
    OFFICE_ADDRESS: str = "SF-102, Wave Galleria, Sector-3, Wave City, Ghaziabad, UP 201002"
    RERA_REGISTRATION: str = "UPRERAAGT12490 / Certified Advisory Partner"
    
    # CORS
    BACKEND_CORS_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "*"
    ]

    class Config:
        case_sensitive = True

settings = Settings()
