import React, { useState, useMemo } from "react";
import { 
  Search, 
  Filter, 
  Scale, 
  FileText, 
  Calendar, 
  MapPin, 
  Building2, 
  ArrowRight, 
  Check, 
  SlidersHorizontal,
  Grid,
  List as ListIcon,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  X
} from "lucide-react";

export default function PropertyDiscovery({
  properties = [],
  loading = false,
  activeCategory = "All",
  onSelectCategory,
  onSelectProperty,
  onOpenBrochure,
  onOpenSiteVisit,
  comparisonIds = [],
  onToggleComparison
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBhk, setSelectedBhk] = useState("All");
  const [selectedSector, setSelectedSector] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [priceBudget, setPriceBudget] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  const categories = ["All", "Apartments", "Plots", "Villas", "Commercial"];
  const bhkOptions = ["All", "1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK", "Plots", "Retail"];
  const sectors = ["All", "Oakwood Enclave", "Greenwood Enclave", "Kingwood Enclave", "Sector 3", "Sector 5"];
  const statusOptions = ["All", "Ready to Move", "Under Construction"];

  // Instant reactive filtering without page reload
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      // Category filter
      if (activeCategory !== "All" && p.category.toLowerCase() !== activeCategory.toLowerCase()) {
        return false;
      }

      // BHK filter
      if (selectedBhk !== "All") {
        const bhkMatch = p.bhk_options.some(b => b.toLowerCase().includes(selectedBhk.toLowerCase())) ||
                         p.configuration.toLowerCase().includes(selectedBhk.toLowerCase());
        if (!bhkMatch) return false;
      }

      // Sector filter
      if (selectedSector !== "All") {
        const sectorMatch = p.sector.toLowerCase().includes(selectedSector.toLowerCase()) ||
                            p.location.toLowerCase().includes(selectedSector.toLowerCase());
        if (!sectorMatch) return false;
      }

      // Construction status filter
      if (selectedStatus !== "All") {
        if (!p.construction_status.toLowerCase().includes(selectedStatus.toLowerCase())) {
          return false;
        }
      }

      // Budget filter
      if (priceBudget === "under_50l" && p.price_starting_inr > 5000000) return false;
      if (priceBudget === "50l_1cr" && (p.price_starting_inr < 5000000 || p.price_starting_inr > 10000000)) return false;
      if (priceBudget === "1cr_2cr" && (p.price_starting_inr < 10000000 || p.price_starting_inr > 20000000)) return false;
      if (priceBudget === "above_2cr" && p.price_starting_inr < 20000000) return false;

      // Text Search
      if (searchTerm.trim() !== "") {
        const query = searchTerm.toLowerCase();
        const textMatch = 
          p.title.toLowerCase().includes(query) ||
          p.subtitle.toLowerCase().includes(query) ||
          p.developer.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query) ||
          p.sector.toLowerCase().includes(query) ||
          p.tags.some(t => t.toLowerCase().includes(query));
        if (!textMatch) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price_asc") return a.price_starting_inr - b.price_starting_inr;
      if (sortBy === "price_desc") return b.price_starting_inr - a.price_starting_inr;
      if (sortBy === "roi_desc") return b.projected_roi_3yr_pct - a.projected_roi_3yr_pct;
      // Default: featured first
      return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
    });
  }, [properties, activeCategory, selectedBhk, selectedSector, selectedStatus, priceBudget, searchTerm, sortBy]);

  const clearAllFilters = () => {
    onSelectCategory("All");
    setSelectedBhk("All");
    setSelectedSector("All");
    setSelectedStatus("All");
    setPriceBudget("all");
    setSearchTerm("");
    setSortBy("featured");
  };

  const hasActiveFilters = 
    activeCategory !== "All" || 
    selectedBhk !== "All" || 
    selectedSector !== "All" || 
    selectedStatus !== "All" || 
    priceBudget !== "all" || 
    searchTerm.trim() !== "";

  return (
    <section id="properties-section" style={{
      padding: "5rem 0",
      backgroundColor: "#F8FAFC",
      borderBottom: "1px solid #E2E8F0",
      position: "relative"
    }}>
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto 3rem" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            color: "var(--gold-primary)",
            fontSize: "0.82rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "0.45rem"
          }}>
            <Sparkles size={15} />
            Real-Time Discovery Matrix
          </div>
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
            color: "#0F172A",
            marginBottom: "0.85rem",
            letterSpacing: "-0.015em"
          }}>
            Exclusive <span style={{ color: "var(--gold-primary)" }}>Wave City</span> Portfolio
          </h2>
          <p style={{ color: "#64748B", fontSize: "0.98rem", lineHeight: 1.6 }}>
            Browse verified inventory with direct builder pricing, RERA authentication, 
            instant comparison, and zero brokerage.
          </p>
        </div>

        {/* Filter Bar Controls - Crisp Clean White Surface */}
        <div style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          padding: "1.5rem",
          borderRadius: "var(--radius-xl)",
          marginBottom: "2.5rem",
          boxShadow: "0 4px 16px -2px rgba(15, 23, 42, 0.04)"
        }}>
          {/* Top Row: Categories Tabs & Search */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "1.25rem",
            paddingBottom: "1.25rem",
            borderBottom: "1px solid #F1F5F9"
          }}>
            {/* Category Pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  style={{
                    backgroundColor: activeCategory.toLowerCase() === cat.toLowerCase()
                      ? "var(--gold-primary)"
                      : "#FFFFFF",
                    color: activeCategory.toLowerCase() === cat.toLowerCase()
                      ? "#FFFFFF"
                      : "#475569",
                    fontWeight: activeCategory.toLowerCase() === cat.toLowerCase() ? 700 : 600,
                    padding: "0.5rem 1.15rem",
                    borderRadius: "100px",
                    border: activeCategory.toLowerCase() === cat.toLowerCase()
                      ? "1px solid var(--gold-primary)"
                      : "1px solid #E2E8F0",
                    fontSize: "0.88rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: activeCategory.toLowerCase() === cat.toLowerCase()
                      ? "0 2px 8px rgba(197, 154, 39, 0.25)"
                      : "0 1px 2px rgba(0,0,0,0.02)"
                  }}
                  onMouseEnter={(e) => {
                    if (activeCategory.toLowerCase() !== cat.toLowerCase()) {
                      e.currentTarget.style.backgroundColor = "#F8FAFC";
                      e.currentTarget.style.borderColor = "#CBD5E1";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeCategory.toLowerCase() !== cat.toLowerCase()) {
                      e.currentTarget.style.backgroundColor = "#FFFFFF";
                      e.currentTarget.style.borderColor = "#E2E8F0";
                    }
                  }}
                >
                  {cat === "All" ? "All Properties" : cat}
                </button>
              ))}
            </div>

            {/* Instant Text Search Input */}
            <div style={{ position: "relative", minWidth: "260px", flex: 1, maxWidth: "420px" }}>
              <Search size={16} color="#94A3B8" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                placeholder="Filter by keyword, developer, or feature..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  backgroundColor: "#F8FAFC",
                  border: "1px solid #CBD5E1",
                  borderRadius: "100px",
                  padding: "0.55rem 2.2rem 0.55rem 2.4rem",
                  color: "#0F172A",
                  fontSize: "0.88rem",
                  outline: "none"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--gold-primary)";
                  e.target.style.backgroundColor = "#FFFFFF";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#CBD5E1";
                  e.target.style.backgroundColor = "#F8FAFC";
                }}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "#94A3B8",
                    cursor: "pointer"
                  }}
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Bottom Filter Row: BHK, Sector, Budget, Status, Sort & View Mode */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "0.85rem",
            alignItems: "center"
          }}>
            {/* BHK Filter */}
            <div>
              <label style={{ display: "block", fontSize: "0.72rem", color: "#475569", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.3rem" }}>
                Configuration
              </label>
              <select
                value={selectedBhk}
                onChange={(e) => setSelectedBhk(e.target.value)}
                style={{
                  width: "100%",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #CBD5E1",
                  borderRadius: "var(--radius-sm)",
                  padding: "0.55rem 0.75rem",
                  color: "#0F172A",
                  fontSize: "0.85rem",
                  outline: "none",
                  cursor: "pointer"
                }}
              >
                {bhkOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            {/* Sector / Enclave Filter */}
            <div>
              <label style={{ display: "block", fontSize: "0.72rem", color: "#475569", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.3rem" }}>
                Township Sector
              </label>
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                style={{
                  width: "100%",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #CBD5E1",
                  borderRadius: "var(--radius-sm)",
                  padding: "0.55rem 0.75rem",
                  color: "#0F172A",
                  fontSize: "0.85rem",
                  outline: "none",
                  cursor: "pointer"
                }}
              >
                {sectors.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Budget Presets */}
            <div>
              <label style={{ display: "block", fontSize: "0.72rem", color: "#475569", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.3rem" }}>
                Budget Bracket
              </label>
              <select
                value={priceBudget}
                onChange={(e) => setPriceBudget(e.target.value)}
                style={{
                  width: "100%",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #CBD5E1",
                  borderRadius: "var(--radius-sm)",
                  padding: "0.55rem 0.75rem",
                  color: "#0F172A",
                  fontSize: "0.85rem",
                  outline: "none",
                  cursor: "pointer"
                }}
              >
                <option value="all">All Budgets</option>
                <option value="under_50l">Under ₹50 Lakh</option>
                <option value="50l_1cr">₹50L - ₹1.0 Cr</option>
                <option value="1cr_2cr">₹1.0 Cr - ₹2.0 Cr</option>
                <option value="above_2cr">Above ₹2.0 Cr</option>
              </select>
            </div>

            {/* Possession Status */}
            <div>
              <label style={{ display: "block", fontSize: "0.72rem", color: "#475569", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.3rem" }}>
                Possession Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                style={{
                  width: "100%",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #CBD5E1",
                  borderRadius: "var(--radius-sm)",
                  padding: "0.55rem 0.75rem",
                  color: "#0F172A",
                  fontSize: "0.85rem",
                  outline: "none",
                  cursor: "pointer"
                }}
              >
                {statusOptions.map(st => <option key={st} value={st}>{st}</option>)}
              </select>
            </div>

            {/* Sorting */}
            <div>
              <label style={{ display: "block", fontSize: "0.72rem", color: "#475569", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.3rem" }}>
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  width: "100%",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #CBD5E1",
                  borderRadius: "var(--radius-sm)",
                  padding: "0.55rem 0.75rem",
                  color: "#0F172A",
                  fontSize: "0.85rem",
                  outline: "none",
                  cursor: "pointer"
                }}
              >
                <option value="featured">Featured & Signature</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="roi_desc">Highest Projected ROI</option>
              </select>
            </div>

            {/* Clear Filters & View Toggle */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: "0.5rem" }}>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  style={{
                    backgroundColor: "#FEE2E2",
                    border: "1px solid #FCA5A5",
                    color: "#991B1B",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    padding: "0.55rem 0.75rem",
                    borderRadius: "var(--radius-sm)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    whiteSpace: "nowrap"
                  }}
                >
                  <X size={14} />
                  Reset
                </button>
              )}

              <div style={{
                display: "inline-flex",
                backgroundColor: "#F1F5F9",
                borderRadius: "var(--radius-sm)",
                border: "1px solid #E2E8F0",
                padding: "2px",
                marginLeft: "auto"
              }}>
                <button
                  onClick={() => setViewMode("grid")}
                  style={{
                    background: viewMode === "grid" ? "#FFFFFF" : "none",
                    border: "none",
                    color: viewMode === "grid" ? "#0F172A" : "#64748B",
                    padding: "0.45rem",
                    borderRadius: "6px",
                    cursor: "pointer",
                    boxShadow: viewMode === "grid" ? "0 1px 3px rgba(0,0,0,0.1)" : "none"
                  }}
                  title="Grid View"
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  style={{
                    background: viewMode === "list" ? "#FFFFFF" : "none",
                    border: "none",
                    color: viewMode === "list" ? "#0F172A" : "#64748B",
                    padding: "0.45rem",
                    borderRadius: "6px",
                    cursor: "pointer",
                    boxShadow: viewMode === "list" ? "0 1px 3px rgba(0,0,0,0.1)" : "none"
                  }}
                  title="List View"
                >
                  <ListIcon size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Counter Bar */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.75rem",
          color: "#64748B",
          fontSize: "0.9rem"
        }}>
          <div>
            Showing <strong style={{ color: "#0F172A" }}>{filteredProperties.length}</strong> verified properties in Wave City
          </div>
          {comparisonIds.length > 0 && (
            <div style={{ color: "var(--gold-primary)", fontWeight: 700 }}>
              {comparisonIds.length} of 3 properties selected for comparison
            </div>
          )}
        </div>

        {/* Properties Render (Grid or List) */}
        {filteredProperties.length === 0 ? (
          <div style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            padding: "4rem 2rem",
            textAlign: "center",
            borderRadius: "var(--radius-xl)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
          }}>
            <Building2 size={48} color="var(--gold-primary)" style={{ margin: "0 auto 1.25rem", opacity: 0.8 }} />
            <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.45rem", color: "#0F172A", marginBottom: "0.5rem" }}>
              No properties matched your criteria
            </h3>
            <p style={{ color: "#64748B", maxWidth: "460px", margin: "0 auto 1.5rem" }}>
              Try broadening your price bracket or selecting "All Properties" to view our complete portfolio.
            </p>
            <button onClick={clearAllFilters} className="btn-gold">
              Reset All Filters
            </button>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: viewMode === "grid" ? "repeat(auto-fill, minmax(350px, 1fr))" : "1fr",
            gap: "2rem"
          }}>
            {filteredProperties.map((property) => {
              const isCompared = comparisonIds.includes(property.id) || comparisonIds.includes(property.slug);

              return (
                <div
                  key={property.id}
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "var(--radius-xl)",
                    overflow: "hidden",
                    border: isCompared ? "2px solid var(--gold-primary)" : "1px solid #E2E8F0",
                    display: "flex",
                    flexDirection: viewMode === "list" ? "row" : "column",
                    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                    boxShadow: isCompared 
                      ? "0 10px 25px -4px rgba(197, 154, 39, 0.2)" 
                      : "0 2px 10px rgba(15, 23, 42, 0.04)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 14px 34px -4px rgba(15, 23, 42, 0.08)";
                    if (!isCompared) e.currentTarget.style.borderColor = "#CBD5E1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = isCompared ? "0 10px 25px -4px rgba(197, 154, 39, 0.2)" : "0 2px 10px rgba(15, 23, 42, 0.04)";
                    if (!isCompared) e.currentTarget.style.borderColor = "#E2E8F0";
                  }}
                >
                  {/* Property Image Container */}
                  <div style={{
                    position: "relative",
                    width: viewMode === "list" ? "380px" : "100%",
                    height: viewMode === "list" ? "100%" : "230px",
                    minHeight: "230px",
                    overflow: "hidden",
                    backgroundColor: "#F1F5F9"
                  }}>
                    <img
                      src={property.hero_image}
                      alt={property.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.4s ease"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    />

                    {/* Gradient Overlay */}
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(15, 23, 42, 0.7) 0%, transparent 60%)"
                    }} />

                    {/* Top Badges */}
                    <div style={{
                      position: "absolute",
                      top: "1rem",
                      left: "1rem",
                      right: "1rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}>
                      <span style={{
                        background: "#FEF3C7",
                        color: "#92400E",
                        border: "1px solid #FDE68A",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        padding: "0.25rem 0.7rem",
                        borderRadius: "100px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.12)"
                      }}>
                        {property.badge || property.category}
                      </span>

                      <span style={{
                        background: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(6px)",
                        color: "#1E293B",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        padding: "0.25rem 0.65rem",
                        borderRadius: "100px",
                        border: "1px solid #E2E8F0",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.06)"
                      }}>
                        {property.construction_status}
                      </span>
                    </div>

                    {/* Bottom Price in Image */}
                    <div style={{
                      position: "absolute",
                      bottom: "0.85rem",
                      left: "1.25rem",
                      right: "1.25rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline"
                    }}>
                      <div>
                        <div style={{ fontSize: "0.7rem", color: "#FDE68A", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700 }}>
                          Starting Price
                        </div>
                        <div style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "1.5rem",
                          fontWeight: 800,
                          color: "#FFFFFF",
                          letterSpacing: "-0.02em"
                        }}>
                          {property.price_starting_formatted}
                        </div>
                      </div>

                      <div style={{ fontSize: "0.8rem", color: "#F1F5F9", fontWeight: 600 }}>
                        ₹{property.price_per_sqft.toLocaleString()}/sq.ft
                      </div>
                    </div>
                  </div>

                  {/* Property Details Body */}
                  <div style={{
                    padding: "1.5rem",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}>
                    <div>
                      {/* Location */}
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        color: "var(--gold-primary)",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        marginBottom: "0.35rem"
                      }}>
                        <MapPin size={13} />
                        <span>{property.sector}</span>
                      </div>

                      {/* Title */}
                      <h3 style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "1.3rem",
                        fontWeight: 700,
                        color: "#0F172A",
                        marginBottom: "0.35rem",
                        cursor: "pointer",
                        letterSpacing: "-0.015em"
                      }}
                      onClick={() => onSelectProperty(property)}
                      onMouseEnter={(e) => e.currentTarget.style.color = "var(--gold-primary)"}
                      onMouseLeave={(e) => e.currentTarget.style.color = "#0F172A"}
                      >
                        {property.title}
                      </h3>

                      {/* Subtitle */}
                      <p style={{
                        fontSize: "0.85rem",
                        color: "#64748B",
                        marginBottom: "1rem",
                        lineHeight: 1.5
                      }}>
                        {property.subtitle}
                      </p>

                      {/* Specs Row */}
                      <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "0.75rem",
                        backgroundColor: "#F8FAFC",
                        padding: "0.75rem",
                        borderRadius: "var(--radius-md)",
                        marginBottom: "1rem",
                        border: "1px solid #E2E8F0"
                      }}>
                        <div>
                          <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 500 }}>Configuration</div>
                          <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0F172A" }}>
                            {property.configuration}
                          </div>
                        </div>

                        <div>
                          <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 500 }}>Area / Plot Size</div>
                          <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0F172A" }}>
                            {property.area_range_sqft}
                          </div>
                        </div>
                      </div>

                      {/* Key Highlights preview */}
                      <div style={{ marginBottom: "1.25rem" }}>
                        {property.key_highlights.slice(0, 2).map((hl, idx) => (
                          <div key={idx} style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.45rem",
                            fontSize: "0.8rem",
                            color: "#334155",
                            marginBottom: "0.3rem"
                          }}>
                            <Check size={13} color="var(--gold-primary)" style={{ flexShrink: 0 }} />
                            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {hl}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div style={{
                      paddingTop: "1rem",
                      borderTop: "1px solid #F1F5F9",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem"
                    }}>
                      {/* Secondary Buttons Row */}
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        {/* Compare Toggle */}
                        <button
                          onClick={() => onToggleComparison(property)}
                          style={{
                            flex: 1,
                            backgroundColor: isCompared ? "#FFFBEB" : "#FFFFFF",
                            border: isCompared ? "1px solid var(--gold-primary)" : "1px solid #E2E8F0",
                            color: isCompared ? "#92400E" : "#475569",
                            borderRadius: "var(--radius-sm)",
                            padding: "0.55rem 0.5rem",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.35rem",
                            transition: "all 0.2s"
                          }}
                          onMouseEnter={(e) => {
                            if (!isCompared) {
                              e.currentTarget.style.backgroundColor = "#F8FAFC";
                              e.currentTarget.style.borderColor = "#CBD5E1";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isCompared) {
                              e.currentTarget.style.backgroundColor = "#FFFFFF";
                              e.currentTarget.style.borderColor = "#E2E8F0";
                            }
                          }}
                        >
                          <Scale size={13} color={isCompared ? "var(--gold-primary)" : "#64748B"} />
                          <span>{isCompared ? "In Comparison" : "Compare"}</span>
                        </button>

                        {/* Brochure Trigger */}
                        <button
                          onClick={() => onOpenBrochure(property)}
                          style={{
                            flex: 1,
                            backgroundColor: "#FFFFFF",
                            border: "1px solid #E2E8F0",
                            color: "#475569",
                            borderRadius: "var(--radius-sm)",
                            padding: "0.55rem 0.5rem",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.35rem",
                            transition: "all 0.2s"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#F8FAFC";
                            e.currentTarget.style.borderColor = "#CBD5E1";
                            e.currentTarget.style.color = "#0F172A";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#FFFFFF";
                            e.currentTarget.style.borderColor = "#E2E8F0";
                            e.currentTarget.style.color = "#475569";
                          }}
                        >
                          <FileText size={13} color="var(--gold-primary)" />
                          <span>Brochure</span>
                        </button>
                      </div>

                      {/* Primary Buttons Row */}
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          onClick={() => onSelectProperty(property)}
                          className="btn-gold"
                          style={{
                            flex: 1,
                            padding: "0.6rem 0.75rem",
                            fontSize: "0.85rem"
                          }}
                        >
                          <span>Explore Specs</span>
                          <ArrowRight size={14} />
                        </button>

                        <button
                          onClick={() => onOpenSiteVisit(property)}
                          style={{
                            backgroundColor: "#FFFFFF",
                            border: "1px solid var(--border-gold)",
                            color: "var(--gold-hover)",
                            borderRadius: "var(--radius-sm)",
                            padding: "0.6rem 0.85rem",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.35rem",
                            transition: "all 0.2s"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "var(--gold-light)";
                            e.currentTarget.style.borderColor = "var(--gold-primary)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#FFFFFF";
                            e.currentTarget.style.borderColor = "var(--border-gold)";
                          }}
                        >
                          <Calendar size={14} color="var(--gold-primary)" />
                          <span>Visit</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
