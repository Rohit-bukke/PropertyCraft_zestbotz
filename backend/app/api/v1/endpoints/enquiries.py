from typing import List, Dict, Any
from fastapi import APIRouter, HTTPException
from app.models.enquiry import EnquiryCreate, EnquiryResponse
from app.services.enquiry_service import enquiry_service

router = APIRouter()

@router.post("", response_model=EnquiryResponse)
def submit_enquiry(enquiry: EnquiryCreate):
    """
    Handle guided site visit requests, brochure downloads, VIP callbacks, and general enquiries.
    """
    try:
        return enquiry_service.create_enquiry(enquiry)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to submit enquiry: {str(e)}")

@router.get("", response_model=List[Dict[str, Any]])
def list_enquiries(limit: int = 50):
    """
    List recently submitted leads/enquiries (Advisory CRM dashboard view).
    """
    return enquiry_service.list_enquiries(limit=limit)
