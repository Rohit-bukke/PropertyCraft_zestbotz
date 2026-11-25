import json
from pathlib import Path
from typing import List, Optional, Dict, Any
from app.models.property import Property, CategorySummary

DATA_DIR = Path(__file__).resolve().parent.parent / "data"

class PropertyService:
    def __init__(self):
        self._properties_file = DATA_DIR / "properties.json"
        self._testimonials_file = DATA_DIR / "testimonials.json"
        self._faqs_file = DATA_DIR / "faqs.json"

    def _load_properties_raw(self) -> List[Dict[str, Any]]:
        if not self._properties_file.exists():
            return []
        with open(self._properties_file, "r", encoding="utf-8") as f:
            return json.load(f)

    def get_all_properties(self) -> List[Property]:
        raw_items = self._load_properties_raw()
        return [Property(**item) for item in raw_items]

    def filter_properties(
        self,
        category: Optional[str] = None,
        location: Optional[str] = None,
        bhk: Optional[str] = None,
        min_price: Optional[int] = None,
        max_price: Optional[int] = None,
        construction_status: Optional[str] = None,
        search: Optional[str] = None,
        featured: Optional[bool] = None,
        sort_by: Optional[str] = "featured"
    ) -> List[Property]:
        items = self.get_all_properties()

        # Category filter (Apartments, Plots, Villas, Commercial)
        if category and category.lower() != "all":
            cat_norm = category.strip().lower()
            items = [p for p in items if p.category.lower() == cat_norm]

        # Location / Sector filter
        if location:
            loc_norm = location.strip().lower()
            items = [p for p in items if loc_norm in p.location.lower() or loc_norm in p.sector.lower()]

        # BHK / configuration filter
        if bhk and bhk.lower() != "all":
            bhk_norm = bhk.strip().lower()
            items = [
                p for p in items
                if any(bhk_norm in b.lower() for b in p.bhk_options) or bhk_norm in p.configuration.lower()
            ]

        # Price range filter
        if min_price is not None:
            items = [p for p in items if p.price_starting_inr >= min_price]
        if max_price is not None:
            items = [p for p in items if p.price_starting_inr <= max_price]

        # Construction status
        if construction_status and construction_status.lower() != "all":
            status_norm = construction_status.strip().lower()
            items = [p for p in items if status_norm in p.construction_status.lower()]

        # Featured only
        if featured is True:
            items = [p for p in items if p.is_featured]

        # Search term (across title, subtitle, developer, location, sector, tags)
        if search:
            query = search.strip().lower()
            items = [
                p for p in items
                if query in p.title.lower()
                or query in p.subtitle.lower()
                or query in p.developer.lower()
                or query in p.location.lower()
                or query in p.sector.lower()
                or any(query in tag.lower() for tag in p.tags)
            ]

        # Sorting
        if sort_by == "price_asc":
            items.sort(key=lambda x: x.price_starting_inr)
        elif sort_by == "price_desc":
            items.sort(key=lambda x: x.price_starting_inr, reverse=True)
        elif sort_by == "roi_desc":
            items.sort(key=lambda x: x.projected_roi_3yr_pct, reverse=True)
        elif sort_by == "featured":
            items.sort(key=lambda x: (not x.is_featured, not x.is_hot_deal))

        return items

    def get_by_slug(self, slug: str) -> Optional[Property]:
        items = self.get_all_properties()
        for p in items:
            if p.slug.lower() == slug.strip().lower():
                return p
        return None

    def get_by_id(self, prop_id: str) -> Optional[Property]:
        items = self.get_all_properties()
        for p in items:
            if p.id.lower() == prop_id.strip().lower():
                return p
        return None

    def compare(self, ids_or_slugs: List[str]) -> List[Property]:
        if not ids_or_slugs:
            return []
        # Limit to max 3 items as requested
        target_keys = [k.strip().lower() for k in ids_or_slugs[:3]]
        items = self.get_all_properties()
        matched = [
            p for p in items
            if p.id.lower() in target_keys or p.slug.lower() in target_keys
        ]
        return matched

    def get_categories_summary(self) -> List[CategorySummary]:
        items = self.get_all_properties()
        cat_meta = {
            "Apartments": {
                "id": "apartments",
                "slug": "apartments",
                "name": "Luxury & Smart Apartments",
                "description": "High-efficiency 1, 2, 3 & 4 BHK residences with modern clubhouses and smart controls.",
                "image": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"
            },
            "Plots": {
                "id": "plots",
                "slug": "plots",
                "name": "Freehold Residential Plots",
                "description": "Master-planned villa plots with wide roads, underground cabling & instant registry.",
                "image": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
            },
            "Villas": {
                "id": "villas",
                "slug": "villas",
                "name": "Luxury Villas & Floors",
                "description": "Exclusive low-rise independent floors and signature Skyvillas with private terraces.",
                "image": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
            },
            "Commercial": {
                "id": "commercial",
                "slug": "commercial",
                "name": "Commercial & High-Street Retail",
                "description": "Prime high-street shops, food courts & corporate offices with assured high footfall.",
                "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
            }
        }

        summaries = []
        for cat_name, meta in cat_meta.items():
            matching = [p for p in items if p.category.lower() == cat_name.lower()]
            count = len(matching)
            min_price = "Contact Us"
            if matching:
                lowest = min(p.price_starting_inr for p in matching)
                if lowest >= 10000000:
                    min_price = f"From ₹{lowest / 10000000:.2f} Cr"
                else:
                    min_price = f"From ₹{lowest / 100000:.1f} Lakh"

            summaries.append(CategorySummary(
                id=meta["id"],
                name=meta["name"],
                slug=meta["slug"],
                count=count,
                starting_price=min_price,
                description=meta["description"],
                image=meta["image"]
            ))

        return summaries

    def get_testimonials(self) -> List[Dict[str, Any]]:
        if not self._testimonials_file.exists():
            return []
        with open(self._testimonials_file, "r", encoding="utf-8") as f:
            return json.load(f)

    def get_faqs(self) -> List[Dict[str, Any]]:
        if not self._faqs_file.exists():
            return []
        with open(self._faqs_file, "r", encoding="utf-8") as f:
            return json.load(f)

property_service = PropertyService()
