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
    <div className="modal-overlay" style={{ padding: "1rem" }}>
      <div 
        className="animate-fade-in"
        style={{
          width: "100%",
          maxWidth: "960px",
          backgroundColor: "#FFFFFF",
          borderRadius: "var(--radius-xl)",
          maxHeight: "94vh",
          overflowY: "auto",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 25px 60px -12px rgba(15, 23, 42, 0.2)",
          border: "1px solid #E2E8F0"
        }}
      >
        {/* Sticky Header with Close */}
        <div style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          backgroundColor: "#FFFFFF",
          padding: "1.1rem 1.75rem",
          borderBottom: "1px solid #E2E8F0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <span style={{
              background: "#FEF3C7",
              color: "#92400E",
              border: "1px solid #FDE68A",
              fontSize: "0.75rem",
              fontWeight: 700,
              padding: "0.25rem 0.65rem",
              borderRadius: "100px"
            }}>
              {property.badge || property.category}
            </span>
            <span style={{ color: "#64748B", fontSize: "0.85rem", fontWeight: 500 }}>
              {property.sector}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <button
              onClick={() => onToggleComparison(property)}
              style={{
                backgroundColor: isCompared ? "#FFFBEB" : "#FFFFFF",
                border: isCompared ? "1px solid var(--gold-primary)" : "1px solid #E2E8F0",
                color: isCompared ? "#92400E" : "#475569",
                padding: "0.45rem 0.85rem",
                borderRadius: "var(--radius-md)",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                transition: "all 0.2s"
              }}
            >
              <Scale size={14} color={isCompared ? "var(--gold-primary)" : "#64748B"} />
              <span>{isCompared ? "In Comparison" : "Add to Compare"}</span>
            </button>

            <button
              onClick={onClose}
              style={{
                backgroundColor: "#F1F5F9",
                border: "1px solid #E2E8F0",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0F172A",
                cursor: "pointer",
                transition: "background-color 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#E2E8F0"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#F1F5F9"}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Gallery Section */}
        <div style={{ padding: "1.5rem 1.75rem 0" }}>
          <div style={{
            position: "relative",
            height: "360px",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            marginBottom: "0.85rem",
            backgroundColor: "#F1F5F9"
          }}>
            <img
              src={selectedImage}
              alt={property.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "all 0.3s ease"
              }}
            />
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(15, 23, 42, 0.75) 0%, transparent 60%)"
            }} />

            <div style={{
              position: "absolute",
              bottom: "1.25rem",
              left: "1.5rem",
              right: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end"
            }}>
              <div>
                <h2 style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  marginBottom: "0.25rem",
                  letterSpacing: "-0.02em"
                }}>
                  {property.title}
                </h2>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#FDE68A", fontSize: "0.88rem", fontWeight: 600 }}>
                  <MapPin size={14} color="#FDE68A" />
                  <span>{property.location}</span>
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "0.75rem", color: "#CBD5E1", textTransform: "uppercase", fontWeight: 600 }}>
                  Starting Price
                </div>
                <div style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "1.9rem",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em"
                }}>
                  {property.price_starting_formatted}
                </div>
                <div style={{ fontSize: "0.8rem", color: "#FDE68A", fontWeight: 600 }}>
                  ₹{property.price_per_sqft.toLocaleString()} / sq.ft
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          {galleryImages.length > 1 && (
            <div style={{ display: "flex", gap: "0.6rem", overflowX: "auto", paddingBottom: "0.5rem" }}>
              {galleryImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  onClick={() => setSelectedImage(img)}
                  style={{
                    width: "80px",
                    height: "55px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    cursor: "pointer",
                    border: selectedImage === img ? "2px solid var(--gold-primary)" : "1px solid #E2E8F0",
                    opacity: selectedImage === img ? 1 : 0.7,
                    transition: "all 0.2s"
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Quick Spec Highlights Strip - Clean Light Grey */}
        <div style={{
          margin: "1.25rem 1.75rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "0.75rem",
          backgroundColor: "#F8FAFC",
          padding: "1rem",
          borderRadius: "var(--radius-lg)",
          border: "1px solid #E2E8F0"
        }}>
          <div>
            <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 500 }}>Configuration</div>
            <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0F172A" }}>{property.configuration}</div>
          </div>
          <div>
            <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 500 }}>Area / Plot Size</div>
            <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0F172A" }}>{property.area_range_sqft}</div>
          </div>
          <div>
            <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 500 }}>Possession</div>
            <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0F172A" }}>{property.possession_date}</div>
          </div>
          <div>
            <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 500 }}>RERA Registration</div>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#15803D" }}>{property.rera_id}</div>
          </div>
        </div>

        {/* Navigation Tabs - Light Clean Styling */}
        <div style={{
          display: "flex",
          padding: "0 1.75rem",
          borderBottom: "1px solid #E2E8F0",
          gap: "1.5rem"
        }}>
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
                fontSize: "0.9rem",
                cursor: "pointer",
                whiteSpace: "nowrap"
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Panels */}
        <div style={{ padding: "1.75rem", flex: 1, backgroundColor: "#FFFFFF" }}>
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div>
              <p style={{ color: "#334155", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                {property.description}
              </p>

              <div style={{
                backgroundColor: "#FFFDF7",
                border: "1px solid #FDE68A",
                borderRadius: "var(--radius-lg)",
                padding: "1.25rem",
                marginBottom: "1.5rem"
              }}>
                <div style={{ fontSize: "0.8rem", color: "var(--gold-primary)", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.75rem" }}>
                  Key Project Advantages
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0.6rem" }}>
                  {property.key_highlights.map((hl, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.85rem", color: "#1E293B", fontWeight: 500 }}>
                      <Check size={16} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: "2px" }} />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Investment ROI Snapshot */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                backgroundColor: "#F8FAFC",
                padding: "1.25rem",
                borderRadius: "var(--radius-lg)",
                border: "1px solid #E2E8F0"
              }}>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 500 }}>Projected Rental Yield</div>
                  <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#15803D" }}>
                    {property.rental_yield_pct}% p.a.
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#64748B", marginTop: "2px" }}>
                    Above Delhi-NCR average
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 500 }}>3-Year Projected Capital ROI</div>
                  <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--gold-primary)" }}>
                    +{property.projected_roi_3yr_pct}%
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#64748B", marginTop: "2px" }}>
                    Driven by NH-24 corridor expansion
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
                  {/* Selector Tabs */}
                  <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
                    {property.floor_plans.map((fp, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedFloorPlanIndex(idx)}
                        style={{
                          backgroundColor: selectedFloorPlanIndex === idx ? "#FEF3C7" : "#FFFFFF",
                          border: selectedFloorPlanIndex === idx ? "1px solid var(--gold-primary)" : "1px solid #E2E8F0",
                          color: selectedFloorPlanIndex === idx ? "#92400E" : "#475569",
                          borderRadius: "var(--radius-md)",
                          padding: "0.6rem 1rem",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          cursor: "pointer"
                        }}
                      >
                        {fp.name}
                      </button>
                    ))}
                  </div>

                  {/* Active Floor Plan Card */}
                  {(() => {
                    const activeFP = property.floor_plans[selectedFloorPlanIndex];
                    return (
                      <div style={{
                        padding: "1.5rem",
                        borderRadius: "var(--radius-lg)",
                        border: "1px solid #E2E8F0",
                        backgroundColor: "#F8FAFC"
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1rem" }}>
                          <div>
                            <h4 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.2rem", color: "#0F172A" }}>
                              {activeFP.name}
                            </h4>
                            <div style={{ fontSize: "0.82rem", color: "#64748B" }}>
                              Super Area: {activeFP.area_sqft} sq.ft | Carpet: {activeFP.carpet_area_sqft || "N/A"} sq.ft
                            </div>
                          </div>
                          <div style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "1.35rem",
                            fontWeight: 800,
                            color: "var(--gold-primary)"
                          }}>
                            {activeFP.price_formatted}
                          </div>
                        </div>

                        <div style={{
                          height: "300px",
                          borderRadius: "var(--radius-md)",
                          overflow: "hidden",
                          border: "1px solid #CBD5E1",
                          position: "relative",
                          backgroundColor: "#FFFFFF"
                        }}>
                          <img
                            src={activeFP.image_url}
                            alt={activeFP.name}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </div>
                      </div>
                    );
                  })()}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "2rem", color: "#64748B" }}>
                  Plot and layout drawings are available upon request through our advisory desk.
                </div>
              )}
            </div>
          )}

          {/* Connectivity Tab */}
          {activeTab === "connectivity" && (
            <div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "1rem"
              }}>
                {property.connectivity && property.connectivity.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "1rem 1.25rem",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid #E2E8F0",
                      backgroundColor: "#F8FAFC"
                    }}
                  >
                    <div style={{ fontSize: "0.72rem", color: "var(--gold-primary)", fontWeight: 700, textTransform: "uppercase" }}>
                      {item.type}
                    </div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0F172A", margin: "0.2rem 0 0.5rem" }}>
                      {item.destination}
                    </div>
                    <div style={{ display: "flex", gap: "1rem", fontSize: "0.8rem", color: "#475569" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <Navigation size={13} color="var(--gold-primary)" />
                        {item.distance_km} km
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "#15803D", fontWeight: 600 }}>
                        <Clock size={13} />
                        {item.time_mins} mins
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Amenities Tab */}
          {activeTab === "amenities" && (
            <div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "0.85rem"
              }}>
                {property.amenities && property.amenities.map((am, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: "#F8FAFC",
                      padding: "0.85rem 1rem",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid #E2E8F0",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem"
                    }}
                  >
                    <div style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      backgroundColor: "#FEF3C7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#B45309"
                    }}>
                      <Sparkles size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0F172A" }}>{am.name}</div>
                      <div style={{ fontSize: "0.72rem", color: "#64748B" }}>{am.category}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky Action Footer */}
        <div style={{
          position: "sticky",
          bottom: 0,
          backgroundColor: "#FFFFFF",
          padding: "1.1rem 1.75rem",
          borderTop: "1px solid #E2E8F0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem"
        }}>
          <div>
            <div style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 500 }}>Zero Brokerage Direct Booking</div>
            <div style={{
              fontFamily: "var(--font-sans)",
              fontSize: "1.45rem",
              fontWeight: 800,
              color: "#0F172A",
              letterSpacing: "-0.02em"
            }}>
              {property.price_starting_formatted}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <button
              onClick={() => onOpenBrochure(property)}
              className="btn-secondary"
              style={{ fontSize: "0.85rem", padding: "0.65rem 1rem" }}
            >
              <FileText size={15} color="var(--gold-primary)" />
              Download Brochure
            </button>

            <button
              onClick={() => onOpenSiteVisit(property)}
              className="btn-gold"
              style={{ fontSize: "0.85rem", padding: "0.65rem 1.25rem" }}
            >
              <Calendar size={15} />
              Book Guided Site Visit
            </button>

            <a
              href={`https://wa.me/919212224545?text=Hi%20PropertyKraft,%20I%20am%20interested%20in%20${encodeURIComponent(property.title)}%20at%20Wave%20City.`}
              target="_blank"
              rel="noreferrer"
              style={{
                backgroundColor: "#16A34A",
                color: "#FFFFFF",
                borderRadius: "var(--radius-md)",
                padding: "0.65rem 1rem",
                fontSize: "0.85rem",
                fontWeight: 700,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem"
              }}
            >
              <MessageCircle size={15} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
