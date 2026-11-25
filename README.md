# PropertyKraft — Next-Generation PropTech Platform

> **Official Brand Reference:** `https://propertykraft.in/`  
> **Key Focus Area:** Wave City, NH-24 / NH-9 (Delhi-Meerut Expressway), Ghaziabad (Delhi/NCR)  
> **Headquarters:** SF-102, 2nd Floor, Wave Galleria, Sector-3, Wave City, Ghaziabad, UP 201002  
> **Advisory Hotline:** +91 6301785285 | **Email:** info@propertykraft.in  
> **UPRERA Certification:** UPRERAAGT12490 / Authorized Tier-1 Advisory Partner  

---

## 1. Executive Summary & Strategic Positioning

### The Challenge
Competitors such as `fairdealwavecity.com` use basic, static brochure websites with generic contact forms, uncurated listings, and no interactive decision-making tools for high-net-worth buyers and investors.

### How PropertyKraft Outperforms the Competition
1. **Interactive Multi-Filter Discovery (Zero Page Reloads):** Instant filtering across Segments (Apartments, Plots, Luxury Villas & Floors, Commercial), BHK configurations, township sectors, and budget brackets.
2. **Side-by-Side Property Comparison:** Select up to 3 properties to compare carpet area, pricing per sq.ft., RERA status, possession dates, and key amenities in a dedicated comparison drawer.
3. **Dual Financial & Investment ROI Suite:** 
   - **Home Loan EMI Calculator:** Sliders for loan amount, down payment %, interest rate %, and tenure with visual principal vs. interest breakdown.
   - **Wave City Appreciation & Rental Simulator:** Projects 3 to 10 year capital gains and rental returns based on real historical CAGR along the 14-lane Delhi-Meerut Expressway.
4. **Smart Lead Flows:** One-click brochure unlock modal and frictionless "Schedule a Guided Site Visit" concierge with golf-cart requests and metro station pickups (Noida Sec 62, Vaishali, Anand Vihar).
5. **High-Contrast Luxury Editorial UI/UX:** Obsidian slate (`#070B11`), warm champagne gold accents (`#D4AF37`), subtle glassmorphism, and responsive mobile optimization.

---

## 2. Technical Architecture

```
property/
├── backend/
│   ├── app/
│   │   ├── api/v1/
│   │   │   ├── endpoints/
│   │   │   │   ├── properties.py      # Search, filter, slug lookup, comparison
│   │   │   │   ├── categories.py      # Segment counts and starting prices
│   │   │   │   ├── enquiries.py       # Site visit & brochure lead management
│   │   │   │   ├── calculator.py      # EMI and 5-year ROI algorithms
│   │   │   │   └── insights.py        # Testimonials, FAQs, brand metadata
│   │   │   └── router.py              # Unified API v1 router
│   │   ├── core/
│   │   │   └── config.py              # App settings, brand info, CORS
│   │   ├── data/
│   │   │   ├── properties.json        # Structured property database (DB-free)
│   │   │   ├── testimonials.json      # Verified client reviews
│   │   │   ├── faqs.json              # Wave City investor FAQs
│   │   │   └── enquiries.json         # Saved leads & consultation bookings
│   │   ├── models/
│   │   │   ├── property.py            # Pydantic v2 property & category schemas
│   │   │   ├── enquiry.py             # Pydantic v2 enquiry schemas
│   │   │   └── calculator.py          # Pydantic v2 financial schemas
│   │   ├── services/
│   │   │   ├── property_service.py    # Decoupled repository & filter layer
│   │   │   └── enquiry_service.py     # Lead processing & reference ID generator
│   │   └── main.py                    # FastAPI app + static file mount
│   ├── tests/
│   │   └── test_api.py                # Comprehensive test suite (10/10 tests)
│   ├── requirements.txt               # Backend dependencies
│   └── run.py                         # FastAPI uvicorn runner
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx             # Sticky glassmorphic navbar
│   │   │   ├── Hero.jsx               # Editorial hero with instant search
│   │   │   ├── CategoryShowcase.jsx   # 4 core segment cards
│   │   │   ├── PropertyDiscovery.jsx  # Reactive multi-filter property grid
│   │   │   ├── PropertyDetailModal.jsx# Floor plans, connectivity & specs modal
│   │   │   ├── ComparisonDrawer.jsx   # Up-to-3 side-by-side comparison
│   │   │   ├── ComparisonDock.jsx     # Floating bottom docked drawer trigger
│   │   │   ├── CalculatorModal.jsx    # EMI and Wave City ROI simulator
│   │   │   ├── SiteVisitModal.jsx     # VIP guided site visit concierge
│   │   │   ├── BrochureModal.jsx      # Digital brochure unlock flow
│   │   │   ├── TownshipHighlights.jsx # 4,500-acre smart city master plan
│   │   │   ├── CompetitorAdvantage.jsx# Comparison matrix vs generic brokers
│   │   │   ├── Testimonials.jsx       # Verified client stories & ratings
│   │   │   ├── FAQSection.jsx         # Accordion investor guide
│   │   │   └── Footer.jsx             # Luxury footer & office credentials
│   │   ├── services/
│   │   │   └── api.js                 # API client with fallback cache
│   │   ├── App.jsx                    # Root application component
│   │   └── index.css                  # Custom luxury design system
│   ├── package.json                   # React 19 + Vite + Lucide React
│   └── vite.config.js                 # Vite bundler configuration
│
├── start_app.py                       # Single-command unified application launcher
└── README.md
```

---

## 3. Quickstart & How to Run

### Option A: Unified Full-Stack Server (Recommended)
FastAPI serves the REST API on `/api/v1` and serves the production React build on `/`:
```powershell
python start_app.py
```
Open your browser at:
- **Web Application:** `http://127.0.0.1:8000`
- **Swagger Interactive API Documentation:** `http://127.0.0.1:8000/api/v1/docs`

---

### Option B: Development Mode (Vite Hot-Module-Replacement)
Run the backend and frontend separately for instant live-reload development:

**Terminal 1 (Backend):**
```powershell
python backend/run.py
```

**Terminal 2 (Frontend):**
```powershell
cd frontend
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 4. API Endpoints Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health check and township status |
| `GET` | `/api/v1/properties` | Search & filter properties (`category`, `bhk`, `location`, `min_price`, `max_price`, `search`, `sort_by`) |
| `GET` | `/api/v1/properties/{slug}` | Full property details (floor plans, connectivity matrix, amenities, RERA ID) |
| `GET` | `/api/v1/properties/compare?ids=...` | Side-by-side comparison data for up to 3 properties |
| `GET` | `/api/v1/categories` | Segment summary counts and entry prices |
| `POST` | `/api/v1/enquiries` | Submit guided site visit booking or brochure unlock |
| `GET` | `/api/v1/enquiries` | CRM lead dashboard overview |
| `POST` | `/api/v1/calculator/emi` | Calculate monthly EMI, total interest, and 5-year amortization |
| `POST` | `/api/v1/calculator/roi` | Wave City 3-to-10 year capital appreciation and rental yield simulator |
| `GET` | `/api/v1/insights/testimonials` | Verified client reviews |
| `GET` | `/api/v1/insights/faqs` | Frequently asked questions |
| `GET` | `/api/v1/insights/brand-meta` | Advisory contact points & statistics |

---

## 5. Running the Backend Test Suite
All 10 test suites can be executed via:
```powershell
python -c "import sys; sys.path.insert(0, 'backend'); from tests.test_api import *; test_health_check(); test_get_all_properties(); test_filter_properties_category(); test_filter_properties_search(); test_get_property_by_slug(); test_compare_properties(); test_get_categories(); test_emi_calculator(); test_roi_calculator(); test_submit_site_visit_enquiry(); print('ALL 10 TESTS PASSED!')"
```
Output:
```
ALL 10 TESTS PASSED!
```
