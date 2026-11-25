from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query
from app.models.property import Property
from app.services.property_service import property_service

router = APIRouter()

@router.get("", response_model=List[Property])
def get_properties(
    category: Optional[str] = Query(None, description="Category filter (Apartments, Plots, Villas, Commercial, All)"),
    location: Optional[str] = Query(None, description="Location / Sector filter"),
    bhk: Optional[str] = Query(None, description="BHK filter (e.g., '3 BHK', '4 BHK')"),
    min_price: Optional[int] = Query(None, description="Minimum price in INR"),
    max_price: Optional[int] = Query(None, description="Maximum price in INR"),
    construction_status: Optional[str] = Query(None, description="e.g. 'Ready to Move', 'Under Construction'"),
    search: Optional[str] = Query(None, description="Search keyword across title, location, tags"),
    featured: Optional[bool] = Query(None, description="Filter featured projects"),
    sort_by: Optional[str] = Query("featured", description="Sort by: featured, price_asc, price_desc, roi_desc")
):
    """
    Search and filter properties with zero page reload capabilities.
    """
    return property_service.filter_properties(
        category=category,
        location=location,
        bhk=bhk,
        min_price=min_price,
        max_price=max_price,
        construction_status=construction_status,
        search=search,
        featured=featured,
        sort_by=sort_by
    )

@router.get("/compare", response_model=List[Property])
def compare_properties(
    ids: str = Query(..., description="Comma-separated IDs or slugs of up to 3 properties to compare")
):
    """
    Retrieve side-by-side comparison data for up to 3 selected properties.
    """
    item_list = [x.strip() for x in ids.split(",") if x.strip()]
    if not item_list:
        raise HTTPException(status_code=400, detail="Please provide at least one property ID or slug to compare")
    if len(item_list) > 3:
        item_list = item_list[:3]
    return property_service.compare(item_list)

@router.get("/{slug}", response_model=Property)
def get_property_by_slug(slug: str):
    """
    Retrieve full property details including floor plans, amenities, connectivity, and brochure specs.
    """
    prop = property_service.get_by_slug(slug)
    if not prop:
        # Also try matching by ID directly if slug didn't match
        prop = property_service.get_by_id(slug)
    if not prop:
        raise HTTPException(status_code=404, detail=f"Property with identifier '{slug}' not found")
    return prop
