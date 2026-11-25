import React from "react";
import { 
  X, 
  Scale, 
  Check, 
  Minus, 
  ArrowRight, 
  Calendar, 
  FileText, 
  ShieldCheck, 
  TrendingUp,
  Percent,
  MapPin,
  Building2
} from "lucide-react";

export default function ComparisonDrawer({
  selectedProperties = [],
  isOpen = false,
  onClose,
  onRemoveProperty,
  onClearAll,
  onOpenSiteVisit,
  onOpenBrochure
}) {
  if (!isOpen) return null;

  // Comparison metrics rows
  const allAmenitiesList = [
    "Clubhouse",
    "Swimming Pool",
    "Home Automation",
    "Private Terrace / Lawn",
    "24/7 Multi-Tier Security",
    "Power Backup",
    "EV Charging Bays",
    "Underground Utilities"
  ];

  const formatPrice = (val) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    return `₹${(val / 100000).toFixed(1)} Lakh`;
  };

  return (
    <div className="modal-overlay" style={{ alignItems: "flex-end", padding: 0 }}>
      <div 
        className="animate-fade-in"
        style={{
          width: "100%",
          maxHeight: "92vh",
          backgroundColor: "#FFFFFF",
          borderTopLeftRadius: "var(--radius-xl)",
          borderTopRightRadius: "var(--radius-xl)",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 -10px 40px rgba(15, 23, 42, 0.15)",
          borderTop: "1px solid #E2E8F0"
        }}
      >
        {/* Header - Clean White */}
        <div style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "#FFFFFF",
          padding: "1rem 1.25rem",
          borderBottom: "1px solid #E2E8F0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div style={{
              width: "34px",
              height: "34px",
              borderRadius: "8px",
              background: "#FEF3C7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#B45309",
              flexShrink: 0
            }}>
              <Scale size={18} />
            </div>
            <div>
              <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)", color: "#0F172A", margin: 0 }}>
                Side-by-Side Property Comparison
              </h2>
              <p style={{ fontSize: "0.78rem", color: "#64748B", margin: 0 }}>
                Analyzing {selectedProperties.length} of 3 properties in Wave City
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            {selectedProperties.length > 0 && (
              <button
                onClick={onClearAll}
                style={{
                  background: "none",
                  border: "none",
                  color: "#64748B",
                  fontSize: "0.82rem",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontWeight: 600
                }}
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close comparison"
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
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#E2E8F0"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#F1F5F9"}
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: "1.25rem 1rem", overflowX: "auto", WebkitOverflowScrolling: "touch", backgroundColor: "#FFFFFF" }}>
          {selectedProperties.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem" }}>
              <Scale size={42} color="var(--gold-primary)" style={{ margin: "0 auto 1rem", opacity: 0.6 }} />
              <p style={{ color: "#0F172A", fontSize: "1.1rem", fontWeight: 600 }}>
                No properties selected for comparison yet.
              </p>
              <p style={{ color: "#64748B", fontSize: "0.85rem", marginTop: "0.5rem" }}>
                Click the "Compare" button on any property card to compare specs side by side.
              </p>
            </div>
          ) : (
            <div style={{ minWidth: "750px" }}>
              {/* Properties Headers Row */}
              <div style={{
                display: "grid",
                gridTemplateColumns: `240px repeat(${selectedProperties.length}, 1fr)`,
                gap: "1.25rem",
                marginBottom: "1.5rem"
              }}>
                <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: "1rem" }}>
                  <span style={{ fontSize: "0.85rem", color: "var(--gold-primary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Comparative Matrix
                  </span>
                </div>

                {selectedProperties.map((prop) => (
                  <div
                    key={prop.id}
                    style={{
                      padding: "1rem",
                      borderRadius: "var(--radius-lg)",
                      position: "relative",
                      border: "1px solid #E2E8F0",
                      backgroundColor: "#FFFFFF",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
                    }}
                  >
                    <button
                      onClick={() => onRemoveProperty(prop.id)}
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        background: "rgba(15, 23, 42, 0.75)",
                        border: "none",
                        color: "#FFFFFF",
                        borderRadius: "50%",
                        width: "24px",
                        height: "24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        zIndex: 2
                      }}
                      title="Remove from comparison"
                    >
                      <X size={13} />
                    </button>

                    <img
                      src={prop.hero_image}
                      alt={prop.title}
                      style={{
                        width: "100%",
                        height: "120px",
                        objectFit: "cover",
                        borderRadius: "var(--radius-md)",
                        marginBottom: "0.75rem"
                      }}
                    />

                    <div style={{ fontSize: "0.75rem", color: "var(--gold-primary)", fontWeight: 700 }}>
                      {prop.category}
                    </div>
                    <h4 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.15rem", color: "#0F172A", marginBottom: "0.2rem" }}>
                      {prop.title}
                    </h4>
                    <div style={{ fontSize: "0.78rem", color: "#64748B", marginBottom: "0.55rem" }}>
                      {prop.sector}
                    </div>

                    <div style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "1.25rem",
                      fontWeight: 800,
                      color: "#0F172A",
                      marginBottom: "0.75rem"
                    }}>
                      {prop.price_starting_formatted}
                    </div>

                    <div style={{ display: "flex", gap: "0.4rem" }}>
                      <button
                        onClick={() => onOpenSiteVisit(prop)}
                        className="btn-gold"
                        style={{ flex: 1, padding: "0.45rem", fontSize: "0.78rem" }}
                      >
                        <Calendar size={13} />
                        Book Visit
                      </button>
                      <button
                        onClick={() => onOpenBrochure(prop)}
                        className="btn-secondary"
                        style={{ padding: "0.45rem", fontSize: "0.78rem" }}
                        title="View Brochure"
                      >
                        <FileText size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comparison Data Table - Clean Light Borders */}
              <div style={{
                border: "1px solid #E2E8F0",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden"
              }}>
                {/* Row: Configuration */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: `240px repeat(${selectedProperties.length}, 1fr)`,
                  padding: "0.85rem 1rem",
                  backgroundColor: "#F8FAFC",
                  borderBottom: "1px solid #E2E8F0",
                  fontSize: "0.88rem"
                }}>
                  <div style={{ color: "#64748B", fontWeight: 600 }}>Configuration</div>
                  {selectedProperties.map(p => (
                    <div key={p.id} style={{ color: "#0F172A", fontWeight: 700 }}>
                      {p.configuration}
                    </div>
                  ))}
                </div>

                {/* Row: Area Range */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: `240px repeat(${selectedProperties.length}, 1fr)`,
                  padding: "0.85rem 1rem",
                  backgroundColor: "#FFFFFF",
                  borderBottom: "1px solid #E2E8F0",
                  fontSize: "0.88rem"
                }}>
                  <div style={{ color: "#64748B", fontWeight: 600 }}>Area / Plot Size</div>
                  {selectedProperties.map(p => (
                    <div key={p.id} style={{ color: "#0F172A" }}>
                      {p.area_range_sqft}
                    </div>
                  ))}
                </div>

                {/* Row: Rate per Sq. Ft. */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: `240px repeat(${selectedProperties.length}, 1fr)`,
                  padding: "0.85rem 1rem",
                  backgroundColor: "#F8FAFC",
                  borderBottom: "1px solid #E2E8F0",
                  fontSize: "0.88rem"
                }}>
                  <div style={{ color: "#64748B", fontWeight: 600 }}>Price Rate / Sq. Ft.</div>
                  {selectedProperties.map(p => (
                    <div key={p.id} style={{ color: "var(--gold-primary)", fontWeight: 700 }}>
                      ₹{p.price_per_sqft.toLocaleString()}/sq.ft
                    </div>
                  ))}
                </div>

                {/* Row: Construction & Possession */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: `240px repeat(${selectedProperties.length}, 1fr)`,
                  padding: "0.85rem 1rem",
                  backgroundColor: "#FFFFFF",
                  borderBottom: "1px solid #E2E8F0",
                  fontSize: "0.88rem"
                }}>
                  <div style={{ color: "#64748B", fontWeight: 600 }}>Possession Timeline</div>
                  {selectedProperties.map(p => (
                    <div key={p.id} style={{ color: "#0F172A" }}>
                      {p.possession_date} ({p.construction_status})
                    </div>
                  ))}
                </div>

                {/* Row: RERA Status */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: `240px repeat(${selectedProperties.length}, 1fr)`,
                  padding: "0.85rem 1rem",
                  backgroundColor: "#F8FAFC",
                  borderBottom: "1px solid #E2E8F0",
                  fontSize: "0.88rem"
                }}>
                  <div style={{ color: "#64748B", fontWeight: 600 }}>RERA Certification</div>
                  {selectedProperties.map(p => (
                    <div key={p.id} style={{ color: "#15803D", fontSize: "0.82rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <ShieldCheck size={14} color="#16A34A" />
                      <span>{p.rera_id}</span>
                    </div>
                  ))}
                </div>

                {/* Row: Rental Yield & Capital Appreciation */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: `240px repeat(${selectedProperties.length}, 1fr)`,
                  padding: "0.85rem 1rem",
                  backgroundColor: "#FFFFFF",
                  borderBottom: "1px solid #E2E8F0",
                  fontSize: "0.88rem"
                }}>
                  <div style={{ color: "#64748B", fontWeight: 600 }}>Investment Metrics</div>
                  {selectedProperties.map(p => (
                    <div key={p.id} style={{ color: "#0F172A" }}>
                      <div>Yield: <strong>{p.rental_yield_pct}% p.a.</strong></div>
                      <div style={{ color: "var(--gold-primary)", fontSize: "0.82rem", fontWeight: 600 }}>
                        3-Yr Projected ROI: +{p.projected_roi_3yr_pct}%
                      </div>
                    </div>
                  ))}
                </div>

                {/* Row: Developer */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: `240px repeat(${selectedProperties.length}, 1fr)`,
                  padding: "0.85rem 1rem",
                  backgroundColor: "#F8FAFC",
                  borderBottom: "1px solid #E2E8F0",
                  fontSize: "0.88rem"
                }}>
                  <div style={{ color: "#64748B", fontWeight: 600 }}>Developer / Architecture</div>
                  {selectedProperties.map(p => (
                    <div key={p.id} style={{ color: "#334155" }}>
                      {p.developer}
                    </div>
                  ))}
                </div>

                {/* Amenities Matrix Rows */}
                <div style={{
                  padding: "0.75rem 1rem",
                  backgroundColor: "#FEF3C7",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#92400E",
                  borderBottom: "1px solid #FDE68A"
                }}>
                  Lifestyle & Infrastructure Features
                </div>

                {allAmenitiesList.map((amenityName, idx) => (
                  <div
                    key={amenityName}
                    style={{
                      display: "grid",
                      gridTemplateColumns: `240px repeat(${selectedProperties.length}, 1fr)`,
                      padding: "0.75rem 1rem",
                      backgroundColor: idx % 2 === 0 ? "#FFFFFF" : "#F8FAFC",
                      borderBottom: "1px solid #E2E8F0",
                      fontSize: "0.88rem",
                      alignItems: "center"
                    }}
                  >
                    <div style={{ color: "#334155", fontWeight: 500 }}>{amenityName}</div>
                    {selectedProperties.map((p) => {
                      const hasAmenity = p.amenities.some(a => 
                        a.name.toLowerCase().includes(amenityName.toLowerCase()) ||
                        amenityName.toLowerCase().includes(a.name.toLowerCase())
                      ) || p.key_highlights.some(h => h.toLowerCase().includes(amenityName.toLowerCase()));

                      return (
                        <div key={p.id}>
                          {hasAmenity ? (
                            <span style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "22px",
                              height: "22px",
                              borderRadius: "50%",
                              backgroundColor: "#DCFCE7",
                              color: "#16A34A"
                            }}>
                              <Check size={14} />
                            </span>
                          ) : (
                            <span style={{ color: "#94A3B8" }}>
                              <Minus size={16} />
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
