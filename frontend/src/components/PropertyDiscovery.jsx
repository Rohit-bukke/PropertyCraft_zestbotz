import React, { useState, useMemo } from "react";
import { 
  Building2, 
  MapPin, 
  Filter, 
  Check, 
  Scale, 
  FileText, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  TrendingUp,
  Search,
  SlidersHorizontal,
  X,
  Grid as GridIcon,
  List as ListIcon
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
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'

  const bhkOptions = ["All", "2 BHK", "3 BHK", "4 BHK", "5 BHK", "Plots"];
  const sectorOptions = ["All", "Oakwood Enclave", "Palmwood Enclave", "Sector 2", "Sector 3", "Wave Galleria / NH-24"];
  const statusOptions = ["All", "Ready to Move", "Under Construction", "New Launch"];

  // Filtered & Sorted properties
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      // Category filter
      if (activeCategory !== "All") {
        const catMatch = p.category?.toLowerCase() === activeCategory.toLowerCase();
        if (!catMatch) return false;
      }

      // BHK filter
      if (selectedBhk !== "All") {
        const bhkMatch = p.bhk_options?.some(b => b.toLowerCase().includes(selectedBhk.toLowerCase())) ||
                         p.configuration?.toLowerCase().includes(selectedBhk.toLowerCase());
        if (!bhkMatch) return false;
      }

      // Sector filter
      if (selectedSector !== "All") {
        const sectorMatch = p.sector?.toLowerCase().includes(selectedSector.toLowerCase()) ||
                            p.location?.toLowerCase().includes(selectedSector.toLowerCase());
        if (!sectorMatch) return false;
      }

      // Construction status filter
      if (selectedStatus !== "All") {
        if (!p.construction_status?.toLowerCase().includes(selectedStatus.toLowerCase())) {
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
          p.title?.toLowerCase().includes(query) ||
          p.subtitle?.toLowerCase().includes(query) ||
          p.developer?.toLowerCase().includes(query) ||
          p.location?.toLowerCase().includes(query) ||
          p.sector?.toLowerCase().includes(query) ||
          p.tags?.some(t => t.toLowerCase().includes(query));
        if (!textMatch) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price_asc") return a.price_starting_inr - b.price_starting_inr;
      if (sortBy === "price_desc") return b.price_starting_inr - a.price_starting_inr;
      if (sortBy === "roi_desc") return (b.projected_roi_3yr_pct || 0) - (a.projected_roi_3yr_pct || 0);
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
      padding: "3.5rem 0",
      backgroundColor: "#F8FAFC",
      borderBottom: "1px solid #E2E8F0"
    }}>
      <div className="container-custom">
        {/* Section Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "2rem"
        }}>
          <div>
            <div style={{
              color: "var(--gold-primary)",
              fontSize: "0.82rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: "0.35rem"
            }}>
              Direct Developer Inventory
            </div>
            <h2 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)",
              color: "#0F172A",
              letterSpacing: "-0.015em"
            }}>
              Explore <span style={{ color: "var(--gold-primary)" }}>Wave City</span> Properties
            </h2>
          </div>

          <p style={{
            color: "#64748B",
            maxWidth: "460px",
            fontSize: "0.92rem",
            lineHeight: 1.6,
            margin: 0
          }}>
            Every listing verified with UP-RERA, clear builder titles, and guaranteed zero brokerage on direct allotments.
          </p>
        </div>

        {/* Category Filter Horizontal Scrollable Pills */}
        <div className="d-flex gap-2 overflow-auto pb-2 mb-3 flex-nowrap align-items-center" style={{ scrollbarWidth: "none" }}>
          {["All", "Apartments", "Plots", "Villas", "Commercial"].map((cat) => {
            const isSelected = activeCategory?.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                style={{
                  backgroundColor: isSelected ? "#0F172A" : "#FFFFFF",
                  color: isSelected ? "#FFFFFF" : "#475569",
                  border: isSelected ? "1px solid #0F172A" : "1px solid #CBD5E1",
                  padding: "0.45rem 1.15rem",
                  borderRadius: "100px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                  boxShadow: isSelected ? "0 2px 6px rgba(15, 23, 42, 0.15)" : "var(--shadow-xs)",
                  flexShrink: 0
                }}
              >
                {cat === "All" ? "All Properties" : cat}
              </button>
            );
          })}
        </div>

        {/* Interactive Multi-Filter Control Console - Bootstrap Powered */}
        <div style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: "var(--radius-xl)",
          padding: "1.25rem",
          marginBottom: "2rem",
          boxShadow: "var(--shadow-sm)"
        }}>
          <div className="row g-2 align-items-end">
            {/* Live Search Input */}
            <div className="col-12 col-lg-3">
              <label style={{ display: "block", fontSize: "0.72rem", color: "#475569", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.3rem" }}>
                Search Keyword
              </label>
              <div style={{ position: "relative" }}>
                <Search size={15} color="#94A3B8" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type="text"
                  placeholder="Filter by title, sector, keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: "100%",
                    backgroundColor: "#F8FAFC",
                    border: "1px solid #CBD5E1",
                    borderRadius: "var(--radius-md)",
                    padding: "0.55rem 2.2rem 0.55rem 2.2rem",
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
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      color: "#94A3B8",
                      cursor: "pointer",
                      padding: "2px"
                    }}
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
            </div>

            {/* BHK Filter */}
            <div className="col-6 col-sm-4 col-lg-2">
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
                  borderRadius: "var(--radius-md)",
                  padding: "0.55rem 0.65rem",
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
            <div className="col-6 col-sm-4 col-lg-2">
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
                  borderRadius: "var(--radius-md)",
                  padding: "0.55rem 0.65rem",
                  color: "#0F172A",
                  fontSize: "0.85rem",
                  outline: "none",
                  cursor: "pointer"
                }}
              >
                {sectorOptions.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Budget Range Filter */}
            <div className="col-6 col-sm-4 col-lg-2">
              <label style={{ display: "block", fontSize: "0.72rem", color: "#475569", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.3rem" }}>
                Budget
              </label>
              <select
                value={priceBudget}
                onChange={(e) => setPriceBudget(e.target.value)}
                style={{
                  width: "100%",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #CBD5E1",
                  borderRadius: "var(--radius-md)",
                  padding: "0.55rem 0.65rem",
                  color: "#0F172A",
                  fontSize: "0.85rem",
                  outline: "none",
                  cursor: "pointer"
                }}
              >
                <option value="all">Any Price</option>
                <option value="under_50l">Under ₹50 Lakh</option>
                <option value="50l_1cr">₹50L - ₹1 Cr</option>
                <option value="1cr_2cr">₹1 Cr - ₹2 Cr</option>
                <option value="above_2cr">Above ₹2 Cr</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div className="col-6 col-sm-6 col-lg-2">
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
                  borderRadius: "var(--radius-md)",
                  padding: "0.55rem 0.65rem",
                  color: "#0F172A",
                  fontSize: "0.85rem",
                  outline: "none",
                  cursor: "pointer"
                }}
              >
                <option value="featured">Featured First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="roi_desc">Highest 3Y ROI</option>
              </select>
            </div>

            {/* Reset & View Mode Buttons */}
            <div className="col-12 col-sm-6 col-lg-1 d-flex align-items-center justify-content-between justify-content-lg-end gap-2 mt-1">
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  style={{
                    backgroundColor: "#FEE2E2",
                    border: "1px solid #FCA5A5",
                    color: "#991B1B",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    padding: "0.5rem 0.65rem",
                    borderRadius: "var(--radius-sm)",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    whiteSpace: "nowrap"
                  }}
                >
                  <X size={13} />
                  Reset
                </button>
              )}

              <div className="d-none d-md-inline-flex bg-light p-1 rounded border">
                <button
                  onClick={() => setViewMode("grid")}
                  style={{
                    background: viewMode === "grid" ? "#FFFFFF" : "none",
                    border: "none",
                    color: viewMode === "grid" ? "#0F172A" : "#64748B",
                    padding: "0.35rem",
                    borderRadius: "4px",
                    cursor: "pointer",
                    boxShadow: viewMode === "grid" ? "0 1px 3px rgba(0,0,0,0.1)" : "none"
                  }}
                  title="Grid View"
                >
                  <GridIcon size={15} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  style={{
                    background: viewMode === "list" ? "#FFFFFF" : "none",
                    border: "none",
                    color: viewMode === "list" ? "#0F172A" : "#64748B",
                    padding: "0.35rem",
                    borderRadius: "4px",
                    cursor: "pointer",
                    boxShadow: viewMode === "list" ? "0 1px 3px rgba(0,0,0,0.1)" : "none"
                  }}
                  title="List View"
                >
                  <ListIcon size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Counter Bar */}
        <div className="d-flex justify-content-between align-items-center mb-3 text-muted flex-wrap gap-2" style={{ fontSize: "0.88rem" }}>
          <div>
            Showing <strong style={{ color: "#0F172A" }}>{filteredProperties.length}</strong> verified properties in Wave City
          </div>
          {comparisonIds.length > 0 && (
            <div style={{ color: "var(--gold-primary)", fontWeight: 700, fontSize: "0.85rem" }}>
              {comparisonIds.length} of 3 properties selected for comparison
            </div>
          )}
        </div>

        {/* Properties Render (Bootstrap Row & Columns) */}
        {filteredProperties.length === 0 ? (
          <div style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            padding: "3.5rem 1.5rem",
            textAlign: "center",
            borderRadius: "var(--radius-xl)",
            boxShadow: "var(--shadow-xs)"
          }}>
            <Building2 size={44} color="var(--gold-primary)" style={{ margin: "0 auto 1rem", opacity: 0.8 }} />
            <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.35rem", color: "#0F172A", marginBottom: "0.4rem" }}>
              No properties matched your criteria
            </h3>
            <p style={{ color: "#64748B", maxWidth: "460px", margin: "0 auto 1.25rem", fontSize: "0.9rem" }}>
              Try broadening your price bracket or selecting "All Properties" to view our complete portfolio.
            </p>
            <button onClick={clearAllFilters} className="btn-gold">
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="row g-3 g-lg-4">
            {filteredProperties.map((property) => {
              const isCompared = comparisonIds.includes(property.id) || comparisonIds.includes(property.slug);

              return (
                <div 
                  key={property.id} 
                  className={viewMode === "grid" ? "col-12 col-md-6 col-lg-4" : "col-12"}
                >
                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "var(--radius-xl)",
                      border: isCompared ? "2px solid var(--gold-primary)" : "1px solid #E2E8F0",
                      overflow: "hidden",
                      height: "100%",
                      display: "flex",
                      flexDirection: viewMode === "list" ? "row" : "column",
                      transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                      boxShadow: isCompared 
                        ? "0 10px 25px -4px rgba(197, 154, 39, 0.2)" 
                        : "0 2px 10px rgba(15, 23, 42, 0.04)"
                    }}
                    className={viewMode === "list" ? "property-card-list-mode" : ""}
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
                    <div 
                      className="card-img-wrapper"
                      style={{
                        position: "relative",
                        width: viewMode === "list" ? "360px" : "100%",
                        height: viewMode === "list" ? "auto" : "220px",
                        minHeight: "200px",
                        overflow: "hidden",
                        backgroundColor: "#F1F5F9",
                        flexShrink: 0
                      }}
                    >
                      <img
                        src={property.hero_image}
                        alt={property.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.4s ease"
                        }}
                      />

                      {/* Gradient Overlay */}
                      <div style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, rgba(15, 23, 42, 0.72) 0%, transparent 60%)"
                      }} />

                      {/* Top Badges */}
                      <div style={{
                        position: "absolute",
                        top: "0.85rem",
                        left: "0.85rem",
                        right: "0.85rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}>
                        <span style={{
                          background: "#FEF3C7",
                          color: "#92400E",
                          border: "1px solid #FDE68A",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          padding: "0.22rem 0.65rem",
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
                          padding: "0.22rem 0.65rem",
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
                        bottom: "0.75rem",
                        left: "1rem",
                        right: "1rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline"
                      }}>
                        <div>
                          <div style={{ fontSize: "0.68rem", color: "#FDE68A", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700 }}>
                            Starting Price
                          </div>
                          <div style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "1.45rem",
                            fontWeight: 800,
                            color: "#FFFFFF",
                            letterSpacing: "-0.02em"
                          }}>
                            {property.price_starting_formatted}
                          </div>
                        </div>

                        <div style={{ fontSize: "0.78rem", color: "#F1F5F9", fontWeight: 600 }}>
                          ₹{property.price_per_sqft?.toLocaleString()}/sq.ft
                        </div>
                      </div>
                    </div>

                    {/* Property Details Body */}
                    <div style={{
                      padding: "1.25rem",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between"
                    }}>
                      <div>
                        {/* Sector Location */}
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.35rem",
                          color: "var(--gold-primary)",
                          fontSize: "0.78rem",
                          fontWeight: 700,
                          marginBottom: "0.25rem"
                        }}>
                          <MapPin size={13} />
                          <span>{property.sector}</span>
                        </div>

                        {/* Title */}
                        <h3 
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "1.22rem",
                            fontWeight: 700,
                            color: "#0F172A",
                            marginBottom: "0.35rem",
                            cursor: "pointer",
                            letterSpacing: "-0.015em"
                          }}
                          onClick={() => onSelectProperty(property)}
                        >
                          {property.title}
                        </h3>

                        {/* Subtitle */}
                        <p style={{
                          fontSize: "0.82rem",
                          color: "#64748B",
                          marginBottom: "0.85rem",
                          lineHeight: 1.5
                        }}>
                          {property.subtitle}
                        </p>

                        {/* Specs Row */}
                        <div style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "0.5rem",
                          backgroundColor: "#F8FAFC",
                          padding: "0.65rem 0.75rem",
                          borderRadius: "var(--radius-md)",
                          marginBottom: "0.85rem",
                          border: "1px solid #E2E8F0"
                        }}>
                          <div>
                            <div style={{ fontSize: "0.7rem", color: "#64748B", fontWeight: 500 }}>Configuration</div>
                            <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0F172A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {property.configuration}
                            </div>
                          </div>

                          <div>
                            <div style={{ fontSize: "0.7rem", color: "#64748B", fontWeight: 500 }}>Area / Plot Size</div>
                            <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0F172A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {property.area_range_sqft}
                            </div>
                          </div>
                        </div>

                        {/* Highlights snippet */}
                        <div style={{ marginBottom: "1rem" }}>
                          {property.key_highlights?.slice(0, 2).map((hl, idx) => (
                            <div key={idx} style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.4rem",
                              fontSize: "0.78rem",
                              color: "#334155",
                              marginBottom: "0.25rem"
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
                        paddingTop: "0.85rem",
                        borderTop: "1px solid #F1F5F9",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem"
                      }}>
                        {/* Compare and Brochure buttons */}
                        <div className="d-flex gap-2">
                          <button
                            onClick={() => onToggleComparison(property)}
                            style={{
                              flex: 1,
                              backgroundColor: isCompared ? "#FFFBEB" : "#FFFFFF",
                              border: isCompared ? "1px solid var(--gold-primary)" : "1px solid #E2E8F0",
                              color: isCompared ? "#92400E" : "#475569",
                              borderRadius: "var(--radius-sm)",
                              padding: "0.45rem 0.5rem",
                              fontSize: "0.78rem",
                              fontWeight: 600,
                              cursor: "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "0.3rem"
                            }}
                          >
                            <Scale size={13} color={isCompared ? "var(--gold-primary)" : "#64748B"} />
                            <span>{isCompared ? "In Comparison" : "Compare"}</span>
                          </button>

                          <button
                            onClick={() => onOpenBrochure(property)}
                            style={{
                              flex: 1,
                              backgroundColor: "#FFFFFF",
                              border: "1px solid #E2E8F0",
                              color: "#475569",
                              borderRadius: "var(--radius-sm)",
                              padding: "0.45rem 0.5rem",
                              fontSize: "0.78rem",
                              fontWeight: 600,
                              cursor: "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "0.3rem"
                            }}
                          >
                            <FileText size={13} color="var(--gold-primary)" />
                            <span>Brochure</span>
                          </button>
                        </div>

                        {/* Primary Specs and Visit buttons */}
                        <div className="d-flex gap-2">
                          <button
                            onClick={() => onSelectProperty(property)}
                            className="btn-gold"
                            style={{
                              flex: 2,
                              padding: "0.55rem 0.75rem",
                              fontSize: "0.82rem"
                            }}
                          >
                            <span>Explore Specs</span>
                            <ArrowRight size={13} />
                          </button>

                          <button
                            onClick={() => onOpenSiteVisit(property)}
                            style={{
                              flex: 1,
                              backgroundColor: "#FFFFFF",
                              border: "1px solid var(--border-gold)",
                              color: "var(--gold-hover)",
                              borderRadius: "var(--radius-sm)",
                              padding: "0.55rem 0.5rem",
                              fontSize: "0.82rem",
                              fontWeight: 600,
                              cursor: "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "0.3rem"
                            }}
                          >
                            <Calendar size={13} color="var(--gold-primary)" />
                            <span>Visit</span>
                          </button>
                        </div>
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
