from typing import List, Dict, Any
from fastapi import APIRouter
from app.core.config import settings
from app.services.property_service import property_service

router = APIRouter()

@router.get("/testimonials", response_model=List[Dict[str, Any]])
def get_testimonials():
    """Get verified client stories and reviews."""
    return property_service.get_testimonials()

@router.get("/faqs", response_model=List[Dict[str, Any]])
def get_faqs():
    """Get Wave City & NH-24 frequently asked questions."""
    return property_service.get_faqs()

@router.get("/brand-meta")
def get_brand_meta():
    """Get PropertyKraft brand identity, contact points, and advisory credentials."""
    return {
        "brand_name": settings.BRAND_NAME,
        "tagline": settings.BRAND_TAGLINE,
        "location_focus": settings.LOCATION_FOCUS,
        "phone": settings.PHONE,
        "whatsapp": settings.WHATSAPP,
        "email": settings.EMAIL,
        "office_address": settings.OFFICE_ADDRESS,
        "rera_registration": settings.RERA_REGISTRATION,
        "stats": {
            "inventory_advised": "₹550+ Cr",
            "happy_families": "1,250+",
            "years_in_wave_city": "10+ Years",
            "rera_verified_projects": "100%",
            "satisfaction_rate": "99.4%"
        }
    }
