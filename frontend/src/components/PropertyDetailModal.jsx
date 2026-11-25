import React, { useState } from "react";
import { 
  X, 
  MapPin, 
  ShieldCheck, 
  Building2, 
  FileText, 
  Calendar, 
  Scale, 
  Check, 
  Navigation, 
  Clock, 
  ArrowRight,
  TrendingUp,
  Percent,
  Layers,
  Sparkles,
  MessageCircle,
  Eye
} from "lucide-react";

export default function PropertyDetailModal({
  property = null,
  isOpen = false,
  onClose,
  onOpenBrochure,
  onOpenSiteVisit,
  onOpenCalculator,
  onToggleComparison,
  isCompared = false
}) {
  if (!isOpen || !property) return null;

  const [activeTab, setActiveTab] = useState("overview"); // 'overview', 'floorplans', 'connectivity', 'amenities'
  const [selectedImage, setSelectedImage] = useState(property.hero_image);
  const [selectedFloorPlanIndex, setSelectedFloorPlanIndex] = useState(0);

  const galleryImages = [property.hero_image, ...(property.gallery || [])].filter(
    (img, idx, arr) => arr.indexOf(img) === idx
  );

  return (
    <div className="modal-overlay">
      <div 
        className="animate-fade-in modal-dialog-responsive"
        style={{
          width: "100%",
          maxWidth: "960px",
          backgroundColor: "#FFFFFF",
          borderRadius: "var(--radius-xl)",
          maxHeight: "92vh",
          overflowY: "auto",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 25px 60px -12px rgba(15, 23, 42, 0.2)",
          border: "1px solid #E2E8F0"
        }}
      >
        {/* Sticky Header with Close */}
        <div 
          className="modal-header-responsive"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 20,
            backgroundColor: "#FFFFFF",
            padding: "1rem 1.5rem",
            borderBottom: "1px solid #E2E8F0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <span style={{
              background: "#FEF3C7",
              color: "#92400E",
              padding: "0.2rem 0.6rem",
              borderRadius: "4px",
              fontWeight: 700,
              fontSize: "0.75rem",
              textTransform: "uppercase"
            }}>
              {property.category}
            </span>
            <span style={{ fontSize: "0.85rem", color: "#64748B", fontWeight: 600 }}>
              {property.developer}
            </span>
          </div>

          <div className="d-flex align-items-center gap-2">
            {/* Compare Toggle Button in Header */}
            <button
              onClick={() => onToggleComparison(property)}
              style={{
                backgroundColor: isCompared ? "#FFFBEB" : "#FFFFFF",
                border: isCompared ? "1px solid var(--gold-primary)" : "1px solid #CBD5E1",
                color: isCompared ? "#92400E" : "#334155",
                padding: "0.38rem 0.75rem",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.78rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem"
              }}
            >
              <Scale size={13} color={isCompared ? "var(--gold-primary)" : "#64748B"} />
              <span>{isCompared ? "In Comparison" : "Compare"}</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Close modal"
              style={{
                backgroundColor: "#F1F5F9",
                border: "1px solid #E2E8F0",
                borderRadius: "50%",
                width: "34px",
                height: "34px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0F172A",
                cursor: "pointer",
                transition: "background-color 0.2s"
              }}
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* Gallery Section */}
        <div style={{ padding: "1rem 1.25rem 0" }}>
          <div style={{
            position: "relative",
            height: "clamp(220px, 40vw, 360px)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            marginBottom: "0.75rem",
            backgroundColor: "#F1F5F9"
          }}>
            <img
              src={selectedImage}
              alt={property.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(15, 23, 42, 0.8) 0%, transparent 65%)"
            }} />

            <div style={{
              position: "absolute",
              bottom: "1rem",
              left: "1rem",
              right: "1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "0.5rem"
            }}>
              <div>
                <h2 style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(1.35rem, 3.5vw, 2.1rem)",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  marginBottom: "0.2rem",
                  letterSpacing: "-0.02em"
                }}>
                  {property.title}
                </h2>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#FDE68A", fontSize: "0.82rem", fontWeight: 600 }}>
                  <MapPin size={13} color="#FDE68A" />
                  <span>{property.location}</span>
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "0.68rem", color: "#CBD5E1", textTransform: "uppercase", fontWeight: 600 }}>
                  Starting Price
                </div>
                <div style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(1.3rem, 3vw, 1.85rem)",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em"
                }}>
                  {property.price_starting_formatted}
                </div>
                <div style={{ fontSize: "0.76rem", color: "#FDE68A", fontWeight: 600 }}>
                  ₹{property.price_per_sqft?.toLocaleString()} / sq.ft
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          {galleryImages.length > 1 && (
            <div className="d-flex gap-2 overflow-auto pb-1" style={{ scrollbarWidth: "none" }}>
              {galleryImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  onClick={() => setSelectedImage(img)}
                  style={{
                    width: "72px",
                    height: "48px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    cursor: "pointer",
                    border: selectedImage === img ? "2px solid var(--gold-primary)" : "1px solid #CBD5E1",
                    flexShrink: 0
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Quick Spec Highlights Strip - Bootstrap Row */}
        <div style={{ margin: "1rem 1.25rem 0.5rem" }}>
          <div className="row g-2 p-2 p-md-3 bg-light rounded border m-0">
            <div className="col-6 col-sm-3">
              <div style={{ fontSize: "0.7rem", color: "#64748B", fontWeight: 500 }}>Configuration</div>
              <div style={{ fontSize: "0.86rem", fontWeight: 700, color: "#0F172A" }}>{property.configuration}</div>
            </div>
            <div className="col-6 col-sm-3">
              <div style={{ fontSize: "0.7rem", color: "#64748B", fontWeight: 500 }}>Area / Plot Size</div>
              <div style={{ fontSize: "0.86rem", fontWeight: 700, color: "#0F172A" }}>{property.area_range_sqft}</div>
            </div>
            <div className="col-6 col-sm-3">
              <div style={{ fontSize: "0.7rem", color: "#64748B", fontWeight: 500 }}>Possession</div>
              <div style={{ fontSize: "0.86rem", fontWeight: 700, color: "#0F172A" }}>{property.possession_date}</div>
            </div>
            <div className="col-6 col-sm-3">
              <div style={{ fontSize: "0.7rem", color: "#64748B", fontWeight: 500 }}>RERA Registration</div>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#15803D" }}>{property.rera_id}</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs (Scrollable on small phones) */}
        <div className="d-flex overflow-auto flex-nowrap border-bottom px-3 px-md-4 gap-3 gap-md-4 mt-2" style={{ scrollbarWidth: "none" }}>
          {[
            { id: "overview", label: "Overview & Highlights" },
            { id: "floorplans", label: `Floor Plans (${property.floor_plans?.length || 0})` },
            { id: "connectivity", label: "Connectivity Matrix" },
            { id: "amenities", label: "Township Amenities" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: "none",
                border: "none",
                padding: "0.75rem 0",
                borderBottom: activeTab === tab.id ? "2px solid var(--gold-primary)" : "2px solid transparent",
                color: activeTab === tab.id ? "#0F172A" : "#64748B",
                fontWeight: 700,
                fontSize: "0.88rem",
                cursor: "pointer",
                whiteSpace: "nowrap",
                flexShrink: 0
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Panels */}
        <div style={{ padding: "1.25rem", flex: 1, backgroundColor: "#FFFFFF" }}>
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div>
              <p style={{ color: "#334155", fontSize: "0.92rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                {property.description}
              </p>

              <div style={{
                backgroundColor: "#FFFDF7",
                border: "1px solid #FDE68A",
                borderRadius: "var(--radius-lg)",
                padding: "1rem 1.25rem",
                marginBottom: "1.25rem"
              }}>
                <div style={{ fontSize: "0.78rem", color: "var(--gold-primary)", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.6rem" }}>
                  Key Project Advantages
                </div>
                <div className="row g-2">
                  {property.key_highlights?.map((hl, i) => (
                    <div key={i} className="col-12 col-md-6">
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.45rem", fontSize: "0.82rem", color: "#1E293B", fontWeight: 500 }}>
                        <Check size={15} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: "2px" }} />
                        <span>{hl}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Investment ROI Snapshot */}
              <div className="row g-3 p-3 bg-light rounded border m-0">
                <div className="col-12 col-sm-6">
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#15803D", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase" }}>
                    <TrendingUp size={14} />
                    Projected 3-Year Appreciation
                  </div>
                  <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0F172A", marginTop: "2px" }}>
                    +{property.projected_roi_3yr_pct || 38.5}%
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#64748B" }}>
                    Modeled on Wave City DME Master Corridor CAGR
                  </div>
                </div>

                <div className="col-12 col-sm-6">
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--gold-primary)", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase" }}>
                    <Percent size={14} />
                    Expected Rental Yield
                  </div>
                  <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0F172A", marginTop: "2px" }}>
                    {property.rental_yield_pct || 5.2}% p.a.
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#64748B" }}>
                    High demand from Noida Sector 62 IT executive rentals
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Floor Plans Tab */}
          {activeTab === "floorplans" && (
            <div>
              {property.floor_plans && property.floor_plans.length > 0 ? (
                <div>
                  {/* Plan Selector Buttons */}
                  <div className="d-flex gap-2 overflow-auto pb-2 mb-3" style={{ scrollbarWidth: "none" }}>
                    {property.floor_plans.map((fp, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedFloorPlanIndex(idx)}
                        style={{
                          backgroundColor: selectedFloorPlanIndex === idx ? "#0F172A" : "#FFFFFF",
                          color: selectedFloorPlanIndex === idx ? "#FFFFFF" : "#334155",
                          border: selectedFloorPlanIndex === idx ? "1px solid #0F172A" : "1px solid #CBD5E1",
                          borderRadius: "var(--radius-sm)",
                          padding: "0.45rem 0.85rem",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                          flexShrink: 0
                        }}
                      >
                        {fp.name} ({fp.bhk})
                      </button>
                    ))}
                  </div>

                  {/* Active Plan Detail - Bootstrap Row */}
                  {property.floor_plans[selectedFloorPlanIndex] && (
                    <div className="row g-3 align-items-center">
                      <div className="col-12 col-md-6 order-2 order-md-1">
                        <h4 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.2rem", color: "#0F172A", marginBottom: "0.5rem" }}>
                          {property.floor_plans[selectedFloorPlanIndex].name}
                        </h4>

                        <div className="row g-2 mb-3">
                          <div className="col-6">
                            <div style={{ backgroundColor: "#F8FAFC", padding: "0.6rem", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
                              <div style={{ fontSize: "0.7rem", color: "#64748B" }}>Super Built-Up Area</div>
                              <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0F172A" }}>
                                {property.floor_plans[selectedFloorPlanIndex].area_sqft} sq.ft
                              </div>
                            </div>
                          </div>

                          <div className="col-6">
                            <div style={{ backgroundColor: "#F8FAFC", padding: "0.6rem", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
                              <div style={{ fontSize: "0.7rem", color: "#64748B" }}>Carpet Area</div>
                              <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0F172A" }}>
                                {property.floor_plans[selectedFloorPlanIndex].carpet_area_sqft} sq.ft
                              </div>
                            </div>
                          </div>
                        </div>

                        <div style={{ marginBottom: "1rem" }}>
                          <div style={{ fontSize: "0.72rem", color: "#64748B", textTransform: "uppercase", fontWeight: 700 }}>Starting Price</div>
                          <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--gold-primary)" }}>
                            {property.floor_plans[selectedFloorPlanIndex].price_formatted}
                          </div>
                        </div>

                        <div className="d-flex gap-2">
                          <button
                            onClick={() => onOpenBrochure(property)}
                            className="btn-secondary"
                            style={{ flex: 1, padding: "0.6rem", fontSize: "0.82rem" }}
                          >
                            <FileText size={14} color="var(--gold-primary)" />
                            <span>Full Layout PDF</span>
                          </button>

                          <button
                            onClick={() => onOpenSiteVisit(property)}
                            className="btn-gold"
                            style={{ flex: 1, padding: "0.6rem", fontSize: "0.82rem" }}
                          >
                            <Calendar size={14} />
                            <span>Tour Layout</span>
                          </button>
                        </div>
                      </div>

                      <div className="col-12 col-md-6 order-1 order-md-2">
                        <div style={{
                          border: "1px solid #CBD5E1",
                          borderRadius: "var(--radius-lg)",
                          overflow: "hidden",
                          backgroundColor: "#F8FAFC",
                          padding: "0.5rem"
                        }}>
                          <img
                            src={property.floor_plans[selectedFloorPlanIndex].image_url}
                            alt="Floor Plan"
                            style={{ width: "100%", maxHeight: "280px", objectFit: "contain", borderRadius: "8px" }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "2rem", color: "#64748B" }}>
                  Bespoke plot architectural plans and layouts available directly on consultation.
                </div>
              )}
            </div>
          )}

          {/* Connectivity Tab */}
          {activeTab === "connectivity" && (
            <div>
              <div className="row g-2 g-md-3">
                {property.connectivity?.map((conn, idx) => (
                  <div key={idx} className="col-12 col-sm-6 col-md-4">
                    <div style={{
                      backgroundColor: "#F8FAFC",
                      border: "1px solid #E2E8F0",
                      padding: "0.85rem",
                      borderRadius: "var(--radius-md)",
                      height: "100%"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                        <span style={{
                          backgroundColor: conn.type === "Metro" ? "#E0F2FE" : "#FEF3C7",
                          color: conn.type === "Metro" ? "#0369A1" : "#92400E",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          padding: "0.15rem 0.5rem",
                          borderRadius: "4px"
                        }}>
                          {conn.type}
                        </span>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "#16A34A", fontSize: "0.78rem", fontWeight: 700 }}>
                          <Clock size={12} />
                          <span>{conn.time_mins} Mins</span>
                        </div>
                      </div>

                      <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#0F172A", marginBottom: "0.2rem" }}>
                        {conn.destination}
                      </div>
                      <div style={{ fontSize: "0.76rem", color: "#64748B" }}>
                        Distance: {conn.distance_km} KM via Signal-Free Corridor
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Amenities Tab */}
          {activeTab === "amenities" && (
            <div>
              <div className="row g-2 g-md-3">
                {property.amenities?.map((am, idx) => (
                  <div key={idx} className="col-6 col-md-4 col-lg-3">
                    <div style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                      padding: "0.75rem",
                      borderRadius: "var(--radius-md)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      height: "100%"
                    }}>
                      <div style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "6px",
                        backgroundColor: "#FEF3C7",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#B45309",
                        flexShrink: 0
                      }}>
                        <Sparkles size={14} />
                      </div>
                      <div>
                        <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0F172A", lineHeight: 1.2 }}>{am.name}</div>
                        <div style={{ fontSize: "0.68rem", color: "#64748B" }}>{am.category}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky Action Footer - Fully Responsive */}
        <div 
          className="modal-footer-responsive"
          style={{
            position: "sticky",
            bottom: 0,
            backgroundColor: "#FFFFFF",
            padding: "0.85rem 1.25rem",
            borderTop: "1px solid #E2E8F0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.75rem"
          }}
        >
          <div>
            <div style={{ fontSize: "0.7rem", color: "#64748B", fontWeight: 500 }}>Zero Brokerage Direct Allotment</div>
            <div style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1.2rem, 3vw, 1.45rem)",
              fontWeight: 800,
              color: "#0F172A",
              letterSpacing: "-0.02em"
            }}>
              {property.price_starting_formatted}
            </div>
          </div>

          <div className="d-flex align-items-center gap-2 flex-wrap btn-group-responsive">
            <button
              onClick={() => onOpenBrochure(property)}
              className="btn-secondary"
              style={{ fontSize: "0.82rem", padding: "0.55rem 0.85rem" }}
            >
              <FileText size={14} color="var(--gold-primary)" />
              Brochure
            </button>

            <button
              onClick={() => onOpenSiteVisit(property)}
              className="btn-gold"
              style={{ fontSize: "0.82rem", padding: "0.55rem 1.15rem" }}
            >
              <Calendar size={14} />
              Book Site Tour
            </button>

            <a
              href={`https://wa.me/919212224545?text=Hi%20PropertyKraft,%20I%20am%20interested%20in%20${encodeURIComponent(property.title)}%20at%20Wave%20City.`}
              target="_blank"
              rel="noreferrer"
              style={{
                backgroundColor: "#16A34A",
                color: "#FFFFFF",
                borderRadius: "var(--radius-md)",
                padding: "0.55rem 0.85rem",
                fontSize: "0.82rem",
                fontWeight: 700,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.35rem"
              }}
            >
              <MessageCircle size={14} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
