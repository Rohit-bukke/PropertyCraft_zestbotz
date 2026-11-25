import json
import random
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Any
from app.models.enquiry import EnquiryCreate, EnquiryResponse

DATA_DIR = Path(__file__).resolve().parent.parent / "data"

class EnquiryService:
    def __init__(self):
        self._enquiries_file = DATA_DIR / "enquiries.json"

    def _load_enquiries(self) -> List[Dict[str, Any]]:
        if not self._enquiries_file.exists():
            return []
        try:
            with open(self._enquiries_file, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return []

    def _save_enquiries(self, data: List[Dict[str, Any]]):
        with open(self._enquiries_file, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

    def create_enquiry(self, enquiry: EnquiryCreate) -> EnquiryResponse:
        prefix_map = {
            "site_visit": "PK-VISIT",
            "brochure": "PK-BROCHURE",
            "vip_callback": "PK-VIP",
            "price_quote": "PK-QUOTE",
            "general": "PK-ENQ"
        }
        prefix = prefix_map.get(enquiry.enquiry_type, "PK-ENQ")
        rand_num = random.randint(1000, 9999)
        timestamp = datetime.now().strftime("%Y%m%d%H%M")
        ref_id = f"{prefix}-{timestamp[-6:]}-{rand_num}"

        enquiry_record = {
            "reference_id": ref_id,
            "created_at": datetime.now().isoformat(),
            "name": enquiry.name,
            "phone": enquiry.phone,
            "email": enquiry.email,
            "property_id": enquiry.property_id,
            "property_title": enquiry.property_title,
            "enquiry_type": enquiry.enquiry_type,
            "preferred_date": enquiry.preferred_date,
            "preferred_time_slot": enquiry.preferred_time_slot,
            "message": enquiry.message,
            "source": enquiry.source,
            "status": "new"
        }

        records = self._load_enquiries()
        records.insert(0, enquiry_record)
        self._save_enquiries(records)

        msg_map = {
            "site_visit": f"Thank you {enquiry.name}! Your VIP guided site visit for Wave City has been scheduled. Our relationship manager will connect shortly.",
            "brochure": f"Thank you {enquiry.name}! The official brochure has been unlocked and sent to your registered contact.",
            "vip_callback": f"Thank you {enquiry.name}! Our Senior Real Estate Strategist will call you within 15 minutes.",
            "general": f"Thank you {enquiry.name}! We have received your query and will contact you promptly."
        }
        msg = msg_map.get(enquiry.enquiry_type, msg_map["general"])

        return EnquiryResponse(
            status="success",
            reference_id=ref_id,
            message=msg,
            created_at=enquiry_record["created_at"],
            lead_summary=enquiry_record
        )

    def list_enquiries(self, limit: int = 50) -> List[Dict[str, Any]]:
        records = self._load_enquiries()
        return records[:limit]

enquiry_service = EnquiryService()
