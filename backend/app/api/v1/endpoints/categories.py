from typing import List
from fastapi import APIRouter
from app.models.property import CategorySummary
from app.services.property_service import property_service

router = APIRouter()

@router.get("", response_model=List[CategorySummary])
def get_categories():
    """
    Get summary counts and entry pricing for all core segments:
    Apartments, Plots, Villas, Commercial.
    """
    return property_service.get_categories_summary()
