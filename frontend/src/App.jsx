import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategoryShowcase from "./components/CategoryShowcase";
import PropertyDiscovery from "./components/PropertyDiscovery";
import PropertyDetailModal from "./components/PropertyDetailModal";
import ComparisonDrawer from "./components/ComparisonDrawer";
import ComparisonDock from "./components/ComparisonDock";
import CalculatorModal from "./components/CalculatorModal";
import SiteVisitModal from "./components/SiteVisitModal";
import BrochureModal from "./components/BrochureModal";
import TownshipHighlights from "./components/TownshipHighlights";
import CompetitorAdvantage from "./components/CompetitorAdvantage";
import Testimonials from "./components/Testimonials";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";

import { 
  fetchProperties, 
  fetchCategories, 
  fetchTestimonials, 
  fetchFAQs, 
  fetchBrandMeta 
} from "./services/api";

// Fallback initial dataset in case backend is loading
const FALLBACK_PROPERTIES = [
  {
    id: "prop-veridia-wave-city",
    slug: "wave-veridia-oakwood-enclave",
    title: "Wave Veridia",
    subtitle: "Ultra-Luxury Low-Rise Floors & Magnificent 5 BHK Skyvillas",
    category: "Villas",
    developer: "Wave Infratech (Palafox International)",
    location: "Oakwood Enclave, Wave City, NH-24, Ghaziabad",
    sector: "Sector 2 / Oakwood Enclave",
    price_starting_inr: 18500000,
    price_max_inr: 36500000,
    price_starting_formatted: "₹1.85 Cr*",
    price_per_sqft: 7750,
    configuration: "4 BHK Low-Rise & 5 BHK Skyvillas",
    bhk_options: ["4 BHK", "5 BHK"],
    rera_id: "UPRERAPRJ13945",
    possession_date: "Ready / Dec 2025",
    construction_status: "Ready to Move",
    area_range_sqft: "2,385 - 4,089 Sq. Ft.",
    tags: ["Ultra Luxury", "Low Rise Living", "Private Terrace", "Home Automation"],
    is_featured: true,
    is_hot_deal: false,
    badge: "Signature Luxury",
    hero_image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Wave Veridia sets a benchmark in elite suburban living within Wave City. Designed by master architects Palafox Associates (Spain), Veridia features exclusive 4 BHK Low-Rise Residences and colossal 5 BHK duplex Skyvillas with double-height ceiling living rooms and private panoramic terraces. Privileged access to the 30,000 sq.ft. Oakwood Clubhouse.",
    key_highlights: [
      "Palafox Associates (Spain) Architecture",
      "Only 2 homes per floor with dedicated dual elevators",
      "Expansive 30,000 sq.ft. Oakwood Clubhouse with Olympic-sized pool",
      "Italian marble flooring & complete VRV air-conditioning"
    ],
    amenities: [
      { name: "30,000 Sq.Ft Clubhouse", category: "Leisure" },
      { name: "Olympic-Size Pool", category: "Sports" },
      { name: "Smart Home Automation", category: "Tech" },
      { name: "24/7 Multi-Tier Biometric Security", category: "Safety" }
    ],
    floor_plans: [
      {
        name: "4 BHK + Family Lounge + Servant",
        bhk: "4 BHK",
        area_sqft: 2385,
        carpet_area_sqft: 1780,
        price_inr: 18500000,
        price_formatted: "₹1.85 Cr",
        image_url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=900&q=80"
      },
      {
        name: "5 BHK Grand Skyvilla",
        bhk: "5 BHK",
        area_sqft: 4089,
        carpet_area_sqft: 3120,
        price_inr: 36500000,
        price_formatted: "₹3.65 Cr",
        image_url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80"
      }
    ],
    connectivity: [
      { destination: "Akshardham Temple, Delhi", distance_km: 24.5, time_mins: 25, type: "Highway" },
      { destination: "Noida Sector 62 Metro Hub", distance_km: 14.0, time_mins: 15, type: "Metro" },
      { destination: "Delhi-Meerut Expressway", distance_km: 1.2, time_mins: 3, type: "Highway" }
    ],
    brochure_url: "/downloads/veridia.pdf",
    rental_yield_pct: 5.4,
    projected_roi_3yr_pct: 42.0
  },
  {
    "id": "prop-eligo-wave-city",
    "slug": "wave-eligo-smart-homes",
    "title": "Wave Eligo",
    "subtitle": "Mid-Rise Premium 3 BHK Smart Residences Overlooking Central Greens",
    "category": "Apartments",
    "developer": "Wave Infratech",
    "location": "Greenwood Enclave, Wave City, NH-24, Ghaziabad",
    "sector": "Sector 4 / Greenwood Enclave",
    "price_starting_inr": 9800000,
    "price_max_inr": 14500000,
    "price_starting_formatted": "₹98.0 Lakh*",
    "price_per_sqft": 6490,
    "configuration": "3 BHK + 3T Smart Residences",
    "bhk_options": ["3 BHK"],
    "rera_id": "UPRERAPRJ14832",
    "possession_date": "Ready for Fit-out",
    "construction_status": "Ready to Move",
    "area_range_sqft": "1,510 Sq. Ft.",
    "tags": ["Smart Homes", "80% Green Open Area", "Balcony Greens", "Modern Clubhouse"],
    "is_featured": true,
    "is_hot_deal": true,
    "badge": "Best Seller 2026",
    "hero_image": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
    ],
    "description": "Wave Eligo is a premier mid-rise enclave crafted for upwardly mobile urban families who demand both nature and digital convenience. Located within Greenwood Enclave right alongside Wave City's central boulevard.",
    "key_highlights": [
      "3-side open residences with uninterrupted skyline and landscape views",
      "UPVC soundproof glazed windows and digital door locks",
      "Clubhouse with infinity splash pool and squash courts"
    ],
    "amenities": [
      { name: "Infinity Splash Pool", category: "Sports" },
      { name: "Smart Keyless Lock Entry", category: "Tech" },
      { name: "High-Speed Fiber Optics", category: "Tech" }
    ],
    "floor_plans": [
      {
        name: "3 BHK + 3 Toilet Premium",
        bhk: "3 BHK",
        area_sqft: 1510,
        carpet_area_sqft: 1058,
        price_inr: 9800000,
        price_formatted: "₹98 Lakh",
        image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
      }
    ],
    "connectivity": [
      { destination: "Delhi-Meerut Expressway", distance_km: 1.5, time_mins: 3, type: "Highway" },
      { destination: "Noida Electronic City Metro", distance_km: 15.0, time_mins: 16, type: "Metro" }
    ],
    "brochure_url": "/downloads/eligo.pdf",
    "rental_yield_pct": 5.1,
    "projected_roi_3yr_pct": 36.0
  },
  {
    "id": "prop-residential-plots-wave-city",
    "slug": "wave-city-freehold-residential-plots",
    "title": "Wave City Residential Plots",
    "subtitle": "Freehold Gated Villa Plots with Wide Roads & Smart Underground Infrastructure",
    "category": "Plots",
    "developer": "Wave Infratech High-Tech Township",
    "location": "Oakwood, Palmwood, Pinewood Enclaves, Wave City",
    "sector": "Sectors 2, 3, 6 & 7",
    "price_starting_inr": 7500000,
    "price_max_inr": 32000000,
    "price_starting_formatted": "₹75.0 Lakh*",
    "price_per_sqft": 5555,
    "configuration": "135, 194, 287, 404 & 500 Sq. Yd. Plots",
    "bhk_options": ["Plots / Custom Villa"],
    "rera_id": "UPRERAPRJ3917",
    "possession_date": "Immediate Possession",
    "construction_status": "Ready to Move",
    "area_range_sqft": "1,215 - 4,500 Sq. Ft.",
    "tags": ["Freehold Plots", "Immediate Registry", "Custom Villa Permitted", "Highest Capital Appreciation"],
    "is_featured": true,
    "is_hot_deal": true,
    "badge": "High Demand Plots",
    "hero_image": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80",
    "gallery": [],
    "description": "Construct your dream bespoke bungalow on official freehold plots within Wave City. Master-planned arterial roadways (30-60m wide), 100% underground drainage, sewage and fiber optics networks.",
    "key_highlights": [
      "Sizes: 135 Sq. Yd. up to 500 Sq. Yd.",
      "Clear title freehold plots with immediate registry",
      "G+3 floor construction sanctioned under modern building bylaws"
    ],
    "amenities": [
      { name: "60m Wide Boulevard Roads", category: "Infrastructure" },
      { name: "Underground Power Lines", category: "Eco" },
      { name: "Command Center Surveillance", category: "Security" }
    ],
    "floor_plans": [],
    "connectivity": [
      { destination: "Delhi Gate / Connaught Place", distance_km: 28.0, time_mins: 30, type: "Highway" },
      { destination: "Noida Sector 62", distance_km: 14.0, time_mins: 15, type: "Hub" }
    ],
    "brochure_url": "/downloads/plots.pdf",
    "rental_yield_pct": 3.8,
    "projected_roi_3yr_pct": 48.0
  },
  {
    "id": "prop-wave-galleria-commercial",
    "slug": "wave-galleria-commercial-sector-3",
    "title": "Wave Galleria Commercial",
    "subtitle": "5-Level Shopping Hub, High-Street Retail, Food Court & Corporate Suites",
    "category": "Commercial",
    "developer": "Wave Infratech Commercial",
    "location": "Sector 3, Wave City, NH-24, Ghaziabad",
    "sector": "Sector 3 / Main Boulevard",
    "price_starting_inr": 3800000,
    "price_max_inr": 18000000,
    "price_starting_formatted": "₹38.0 Lakh*",
    "price_per_sqft": 11500,
    "configuration": "Retail Shops, Food Outlets & Office Spaces",
    "bhk_options": ["Commercial / Retail"],
    "rera_id": "UPRERAPRJ2941",
    "possession_date": "Ready & Operational",
    "construction_status": "Ready to Move",
    "area_range_sqft": "180 - 1,200 Sq. Ft.",
    "tags": ["High Footfall", "Operational Commercial", "Captive 20k+ Population"],
    "is_featured": true,
    "is_hot_deal": false,
    "badge": "Operational Hub",
    "hero_image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80",
    "gallery": [],
    "description": "Wave Galleria is the lifestyle nerve-center of Wave City. Houses functional supermarkets, pharmacy chains, multi-cuisine food courts, and boutique offices. PropertyKraft maintains its flagship advisory office right on the 2nd Floor (SF-102).",
    "key_highlights": [
      "PropertyKraft Head Office located here (SF-102)",
      "Captive footfall from over 3,000+ settled families",
      "High commercial yields up to 7.6% p.a."
    ],
    "amenities": [
      { name: "500+ Car Basement Parking", category: "Parking" },
      { name: "Food Court & Dining Terraces", category: "F&B" }
    ],
    "floor_plans": [],
    "connectivity": [
      { destination: "Delhi-Meerut Expressway", distance_km: 0.5, time_mins: 1, type: "Highway" }
    ],
    "brochure_url": "/downloads/galleria.pdf",
    "rental_yield_pct": 7.6,
    "projected_roi_3yr_pct": 45.0
  }
];

const FALLBACK_CATEGORIES = [
  {
    id: "apartments",
    slug: "apartments",
    name: "Luxury & Smart Apartments",
    count: 3,
    starting_price: "From ₹32.0 Lakh",
    description: "High-efficiency 1, 2, 3 & 4 BHK residences with modern clubhouses and smart controls.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "plots",
    slug: "plots",
    name: "Freehold Residential Plots",
    count: 1,
    starting_price: "From ₹75.0 Lakh",
    description: "Master-planned villa plots with wide roads, underground cabling & instant registry.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "villas",
    slug: "villas",
    name: "Luxury Villas & Floors",
    count: 2,
    starting_price: "From ₹65.0 Lakh",
    description: "Exclusive low-rise independent floors and signature Skyvillas with private terraces.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "commercial",
    slug: "commercial",
    name: "Commercial & High-Street Retail",
    count: 1,
    starting_price: "From ₹38.0 Lakh",
    description: "Prime high-street shops, food courts & corporate offices with assured high footfall.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
  }
];

const FALLBACK_TESTIMONIALS = [
  {
    id: "test-1",
    name: "Dr. Sameer & Ritu Malhotra",
    property_bought: "Wave Veridia (Oakwood Enclave - 4 BHK)",
    role: "Senior Consultant Physician",
    location: "Moved from Indirapuram",
    rating: 5,
    text: "PropertyKraft was instrumental in our shift from Indirapuram to Wave City. Rohit and his advisory team provided direct builder pricing with complete transparency. Living in Veridia with 50 acres of greenery has transformed our family's health and lifestyle.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    verified: true
  },
  {
    id: "test-2",
    name: "Vikramaditya Chauhan",
    property_bought: "Residential Plot (287 Sq. Yd.)",
    role: "NRI Investor & Tech Entrepreneur",
    location: "Dubai, UAE",
    rating: 5,
    text: "Investing from Dubai requires 100% dependable on-ground partners. PropertyKraft handled everything remotely—from virtual video walkthroughs to title deeds and registry documentation at Ghaziabad registrar office.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    verified: true
  },
  {
    id: "test-3",
    name: "Ananya Sharma & Rahul Saxena",
    property_bought: "Wave Eligo (3 BHK Smart Home)",
    role: "Lead Architects & Designers",
    location: "Wave City Sector 4",
    rating: 5,
    text: "As architects, layout efficiency and natural cross-ventilation were our non-negotiables. PropertyKraft provided side-by-side comparative matrices comparing Eligo against competing projects across NH-24. Closed with zero brokerage!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    verified: true
  }
];

const FALLBACK_FAQS = [
  {
    id: "faq-1",
    question: "What is Wave City Ghaziabad and why is it called a Hi-Tech Smart City?",
    answer: "Wave City is a 4,500-acre master-planned township located directly on the 14-lane Delhi-Meerut Expressway (NH-24). It is pre-certified Platinum Green by IGBC, featuring an IBM-powered central command center, automated water metering, underground utilities, and round-the-clock surveillance."
  },
  {
    id: "faq-2",
    question: "Does PropertyKraft charge any brokerage on new booking projects?",
    answer: "No. PropertyKraft is an authorized, RERA-registered Tier-1 channel partner for Wave City. For all fresh builder bookings (such as Veridia, Eligo, Dream Homes, and plots), our comprehensive advisory, guided site visits, negotiation, and paperwork support are 100% free of brokerage to the buyer."
  },
  {
    id: "faq-3",
    question: "Are residential plots in Wave City freehold and eligible for bank loans?",
    answer: "Yes, all residential and commercial plots allotted in Wave City are clear-title freehold properties. Major nationalized and private banks including SBI, HDFC, ICICI, and PNB offer plot purchase and construction loan facilities."
  },
  {
    id: "faq-4",
    question: "How fast can I travel to Delhi and Central Noida from Wave City?",
    answer: "Thanks to the 14-lane signal-free Delhi-Meerut Expressway (DME), driving to Akshardham Temple / East Delhi takes approximately 20 to 25 minutes. Central Noida Sector 62 is reachable within 12 to 15 minutes."
  }
];

export default function App() {
  const [properties, setProperties] = useState(FALLBACK_PROPERTIES);
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);
  const [testimonials, setTestimonials] = useState(FALLBACK_TESTIMONIALS);
  const [faqs, setFaqs] = useState(FALLBACK_FAQS);
  const [loading, setLoading] = useState(false);

  // Active filters and views
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPropertyForDetail, setSelectedPropertyForDetail] = useState(null);
  const [selectedPropertyForBrochure, setSelectedPropertyForBrochure] = useState(null);
  const [selectedPropertyForSiteVisit, setSelectedPropertyForSiteVisit] = useState(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [calculatorInitialPrice, setCalculatorInitialPrice] = useState(9800000);
  const [calculatorPropertyTitle, setCalculatorPropertyTitle] = useState(null);

  // Comparison state (Max 3 properties)
  const [comparisonIds, setComparisonIds] = useState([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  // Load live data from FastAPI backend on mount
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [propsData, catsData, testData, faqData] = await Promise.all([
          fetchProperties().catch(() => FALLBACK_PROPERTIES),
          fetchCategories().catch(() => FALLBACK_CATEGORIES),
          fetchTestimonials().catch(() => FALLBACK_TESTIMONIALS),
          fetchFAQs().catch(() => FALLBACK_FAQS)
        ]);

        if (propsData && propsData.length > 0) setProperties(propsData);
        if (catsData && catsData.length > 0) setCategories(catsData);
        if (testData && testData.length > 0) setTestimonials(testData);
        if (faqData && faqData.length > 0) setFaqs(faqData);
      } catch (err) {
        console.warn("Backend loading notice; using robust fallback cache:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Comparison helpers
  const toggleComparison = (property) => {
    const id = property.id;
    if (comparisonIds.includes(id)) {
      setComparisonIds(comparisonIds.filter(item => item !== id));
    } else {
      if (comparisonIds.length >= 3) {
        alert("You can compare up to 3 properties at a time. Please remove one to add another.");
        return;
      }
      setComparisonIds([...comparisonIds, id]);
    }
  };

  const removePropertyFromComparison = (id) => {
    setComparisonIds(comparisonIds.filter(item => item !== id));
  };

  const clearAllComparison = () => {
    setComparisonIds([]);
    setIsComparisonOpen(false);
  };

  const selectedComparisonProperties = properties.filter(
    p => comparisonIds.includes(p.id) || comparisonIds.includes(p.slug)
  );

  // Handlers for Modals
  const handleOpenCalculator = (property = null) => {
    if (property) {
      setCalculatorInitialPrice(property.price_starting_inr || 9800000);
      setCalculatorPropertyTitle(property.title);
    } else {
      setCalculatorInitialPrice(9800000);
      setCalculatorPropertyTitle(null);
    }
    setIsCalculatorOpen(true);
  };

  const handleHeroSearch = ({ search, category, budget }) => {
    if (category) setActiveCategory(category);
    // Auto-scroll handled inside Hero component
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)" }}>
      {/* Top Navigation */}
      <Navbar
        comparisonCount={comparisonIds.length}
        onOpenComparison={() => setIsComparisonOpen(true)}
        onOpenCalculator={() => handleOpenCalculator(null)}
        onOpenSiteVisit={(p) => setSelectedPropertyForSiteVisit(p || { title: "Complete Wave City VIP Tour" })}
        activeFilter={activeCategory}
        onSelectCategory={(cat) => setActiveCategory(cat)}
      />

      {/* Hero Section */}
      <Hero
        onSearch={handleHeroSearch}
        onSelectCategory={(cat) => setActiveCategory(cat)}
        onOpenSiteVisit={(p) => setSelectedPropertyForSiteVisit(p || { title: "Complete Wave City VIP Tour" })}
      />

      {/* Strategic Category Showcase */}
      <CategoryShowcase
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => setActiveCategory(cat)}
      />

      {/* Interactive Property Discovery Matrix */}
      <PropertyDiscovery
        properties={properties}
        loading={loading}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => setActiveCategory(cat)}
        onSelectProperty={(prop) => setSelectedPropertyForDetail(prop)}
        onOpenBrochure={(prop) => setSelectedPropertyForBrochure(prop)}
        onOpenSiteVisit={(prop) => setSelectedPropertyForSiteVisit(prop)}
        comparisonIds={comparisonIds}
        onToggleComparison={toggleComparison}
      />

      {/* 4,500-Acre Township Infrastructure Highlights */}
      <TownshipHighlights
        onOpenSiteVisit={(prop) => setSelectedPropertyForSiteVisit(prop)}
      />

      {/* Why PropertyKraft Outperforms Generic Brokers */}
      <CompetitorAdvantage
        onOpenSiteVisit={(prop) => setSelectedPropertyForSiteVisit(prop)}
      />

      {/* Verified Client Testimonials */}
      <Testimonials testimonials={testimonials} />

      {/* Frequently Asked Questions */}
      <FAQSection
        faqs={faqs}
        onOpenSiteVisit={(prop) => setSelectedPropertyForSiteVisit(prop)}
      />

      {/* Luxury Footer */}
      <Footer
        onOpenSiteVisit={(prop) => setSelectedPropertyForSiteVisit(prop)}
        onOpenCalculator={() => handleOpenCalculator(null)}
      />

      {/* Floating Bottom Comparison Dock */}
      <ComparisonDock
        selectedProperties={selectedComparisonProperties}
        onOpenComparison={() => setIsComparisonOpen(true)}
        onRemoveProperty={removePropertyFromComparison}
        onClearAll={clearAllComparison}
      />

      {/* Property Detail Modal */}
      <PropertyDetailModal
        property={selectedPropertyForDetail}
        isOpen={Boolean(selectedPropertyForDetail)}
        onClose={() => setSelectedPropertyForDetail(null)}
        onOpenBrochure={(p) => setSelectedPropertyForBrochure(p)}
        onOpenSiteVisit={(p) => setSelectedPropertyForSiteVisit(p)}
        onOpenCalculator={(p) => handleOpenCalculator(p)}
        onToggleComparison={toggleComparison}
        isCompared={selectedPropertyForDetail ? comparisonIds.includes(selectedPropertyForDetail.id) : false}
      />

      {/* Side-by-Side Comparison Drawer */}
      <ComparisonDrawer
        selectedProperties={selectedComparisonProperties}
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        onRemoveProperty={removePropertyFromComparison}
        onClearAll={clearAllComparison}
        onOpenSiteVisit={(p) => setSelectedPropertyForSiteVisit(p)}
        onOpenBrochure={(p) => setSelectedPropertyForBrochure(p)}
      />

      {/* Financial EMI & ROI Calculator Modal */}
      <CalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        initialPrice={calculatorInitialPrice}
        propertyTitle={calculatorPropertyTitle}
        onOpenSiteVisit={(p) => setSelectedPropertyForSiteVisit(p)}
      />

      {/* Smart Brochure Download Modal */}
      <BrochureModal
        property={selectedPropertyForBrochure}
        isOpen={Boolean(selectedPropertyForBrochure)}
        onClose={() => setSelectedPropertyForBrochure(null)}
      />

      {/* Frictionless Guided Site Visit Modal */}
      <SiteVisitModal
        property={selectedPropertyForSiteVisit}
        allProperties={properties}
        isOpen={Boolean(selectedPropertyForSiteVisit)}
        onClose={() => setSelectedPropertyForSiteVisit(null)}
      />
    </div>
  );
}
