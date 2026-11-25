from typing import List, Optional
from pydantic import BaseModel, Field

class FloorPlan(BaseModel):
    name: str
    bhk: Optional[str] = None
    area_sqft: int
    carpet_area_sqft: Optional[int] = None
    price_inr: int
    price_formatted: str
    image_url: str

class ConnectivityItem(BaseModel):
    destination: str
    distance_km: float
    time_mins: int
    type: str  # Metro, Highway, Hospital, Education, Hub

class Amenity(BaseModel):
    name: str
    category: str
    icon: Optional[str] = "check-circle"

class Property(BaseModel):
    id: str
    slug: str
    title: str
    subtitle: str
    category: str  # Apartments, Plots, Villas, Commercial
    developer: str
    location: str
    sector: str
    price_starting_inr: int
    price_max_inr: Optional[int] = None
    price_starting_formatted: str
    price_per_sqft: int
    configuration: str  # e.g., "4 BHK Floors & 5 BHK Skyvillas"
    bhk_options: List[str] = []
    rera_id: str
    possession_date: str
    construction_status: str  # "Ready to Move", "Under Construction", "New Launch"
    area_range_sqft: str
    plot_size_range_sqyd: Optional[str] = None
    tags: List[str] = []
    is_featured: bool = False
    is_hot_deal: bool = False
    badge: Optional[str] = None
    hero_image: str
    gallery: List[str] = []
    description: str
    key_highlights: List[str] = []
    amenities: List[Amenity] = []
    floor_plans: List[FloorPlan] = []
    connectivity: List[ConnectivityItem] = []
    brochure_url: str
    virtual_tour_url: Optional[str] = None
    rental_yield_pct: float = 4.8
    projected_roi_3yr_pct: float = 38.5

class PropertyFilterParams(BaseModel):
    category: Optional[str] = None
    location: Optional[str] = None
    bhk: Optional[str] = None
    min_price: Optional[int] = None
    max_price: Optional[int] = None
    construction_status: Optional[str] = None
    search: Optional[str] = None
    featured: Optional[bool] = None
    sort_by: Optional[str] = "featured"  # featured, price_asc, price_desc, area_asc, area_desc

class CategorySummary(BaseModel):
    id: str
    name: str
    slug: str
    count: int
    starting_price: str
    description: str
    image: str
