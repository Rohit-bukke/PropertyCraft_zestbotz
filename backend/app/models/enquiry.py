from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field

class EnquiryCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    phone: str = Field(..., min_length=10, max_length=15)
    email: Optional[EmailStr] = None
    property_id: Optional[str] = None
    property_title: Optional[str] = None
    enquiry_type: str = "general"  # "site_visit", "brochure", "vip_callback", "price_quote"
    preferred_date: Optional[str] = None
    preferred_time_slot: Optional[str] = None
    message: Optional[str] = None
    source: Optional[str] = "web_direct"

class EnquiryResponse(BaseModel):
    status: str = "success"
    reference_id: str
    message: str
    created_at: str
    lead_summary: dict
