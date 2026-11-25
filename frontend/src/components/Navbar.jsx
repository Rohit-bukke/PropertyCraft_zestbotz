import React, { useState, useEffect } from "react";
import { 
  Building2, 
  Phone, 
  MessageCircle, 
  Scale, 
  Calculator, 
  Calendar, 
  Menu, 
  X, 
  ShieldCheck,
  ChevronRight,
  MapPin
} from "lucide-react";

export default function Navbar({ 
  comparisonCount = 0, 
  onOpenComparison, 
  onOpenCalculator, 
  onOpenSiteVisit,
  activeFilter,
  onSelectCategory
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top Advisory Bar - Responsive Bootstrap Flex */}
      <div style={{
        backgroundColor: "#F8FAFC",
        borderBottom: "1px solid #E2E8F0",
        fontSize: "0.8rem",
        color: "#475569",
        padding: "0.45rem 0",
        position: "relative",
        zIndex: 51
      }}>
        <div className="container-custom">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <span style={{ 
                display: "inline-flex", 
                alignItems: "center", 
                gap: "0.35rem",
                color: "#9A7316",
                backgroundColor: "#FEF3C7",
                padding: "0.15rem 0.55rem",
                borderRadius: "4px",
                fontWeight: 600,
                fontSize: "0.74rem"
              }}>
                <ShieldCheck size={13} color="#B45309" />
                UPRERA Partner
              </span>
              <span className="d-none d-md-inline" style={{ color: "#CBD5E1" }}>|</span>
              <span className="d-none d-md-inline-flex align-items-center gap-1" style={{ color: "#64748B", fontSize: "0.78rem" }}>
                <MapPin size={13} color="#C59A27" />
                Wave Galleria SF-102, Wave City
              </span>
            </div>

            <div className="d-flex align-items-center gap-3">
              <a 
                href="tel:+919212224545" 
                style={{ 
                  color: "#1E293B", 
                  textDecoration: "none", 
                  display: "inline-flex", 
                  alignItems: "center", 
                  gap: "0.35rem",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  transition: "color 0.2s"
                }}
              >
                <Phone size={13} color="#C59A27" />
                <span>+91 92122 24545</span>
              </a>
              <a 
                href="https://wa.me/919212224545?text=Hello%20PropertyKraft,%20I%20am%20interested%20in%20Wave%20City%20properties." 
                target="_blank" 
                rel="noreferrer"
                style={{ 
                  color: "#15803D", 
                  backgroundColor: "#DCFCE7",
                  padding: "0.18rem 0.6rem",
                  borderRadius: "4px",
                  textDecoration: "none", 
                  display: "inline-flex", 
                  alignItems: "center", 
                  gap: "0.35rem",
                  fontWeight: 600,
                  fontSize: "0.76rem"
                }}
              >
                <MessageCircle size={13} color="#16A34A" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header style={{
        position: "sticky",
        top: 0,
        zIndex: 1020,
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #E2E8F0",
        boxShadow: scrolled ? "0 4px 20px -2px rgba(15, 23, 42, 0.08)" : "0 1px 3px rgba(15, 23, 42, 0.02)",
        transition: "all 0.25s ease",
        padding: scrolled ? "0.65rem 0" : "0.85rem 0"
      }}>
        <div className="container-custom">
          <div className="d-flex justify-content-between align-items-center w-100">
            {/* Logo & Brand */}
            <div 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{ 
                cursor: "pointer", 
                display: "flex", 
                alignItems: "center", 
                gap: "0.65rem" 
              }}
            >
              <div style={{
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                background: "var(--gold-gradient)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(197, 154, 39, 0.28)",
                flexShrink: 0
              }}>
                <span style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 800,
                  fontSize: "1.18rem",
                  color: "#FFFFFF"
                }}>PK</span>
              </div>
              <div>
                <div style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(1.2rem, 3.5vw, 1.45rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: "#0F172A",
                  display: "flex",
                  alignItems: "baseline",
                  gap: "2px",
                  lineHeight: 1.15
                }}>
                  Property<span style={{ color: "var(--gold-primary)" }}>Kraft</span>
                </div>
                <div style={{
                  fontSize: "0.68rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#64748B",
                  fontWeight: 600
                }}>
                  Wave City Specialists
                </div>
              </div>
            </div>

            {/* Desktop Navigation Links (>= 992px) */}
            <nav className="d-none d-lg-flex align-items-center gap-4">
              <button 
                onClick={() => scrollToSection("properties-section")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#334155",
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "color 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--gold-primary)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#334155"}
              >
                Explore Properties
              </button>

              <button 
                onClick={() => scrollToSection("categories-section")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#334155",
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "color 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--gold-primary)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#334155"}
              >
                Segments
              </button>

              <button 
                onClick={onOpenCalculator}
                style={{
                  background: "none",
                  border: "none",
                  color: "#334155",
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  transition: "color 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--gold-primary)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#334155"}
              >
                <Calculator size={15} color="var(--gold-primary)" />
                EMI & ROI Calculator
              </button>

              <button 
                onClick={() => scrollToSection("township-section")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#334155",
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "color 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--gold-primary)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#334155"}
              >
                Township Insights
              </button>

              <button 
                onClick={() => scrollToSection("why-us-section")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#334155",
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "color 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--gold-primary)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#334155"}
              >
                Why Us
              </button>
            </nav>

            {/* Desktop Actions (>= 992px) */}
            <div className="d-none d-lg-flex align-items-center gap-3">
              {/* Compare Trigger button */}
              <button 
                onClick={onOpenComparison}
                style={{
                  position: "relative",
                  background: comparisonCount > 0 ? "#FFFBEB" : "#FFFFFF",
                  border: comparisonCount > 0 ? "1px solid var(--gold-primary)" : "1px solid #E2E8F0",
                  color: comparisonCount > 0 ? "#92400E" : "#334155",
                  padding: "0.55rem 0.95rem",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  transition: "all 0.2s"
                }}
              >
                <Scale size={15} color={comparisonCount > 0 ? "var(--gold-primary)" : "#64748B"} />
                <span>Compare</span>
                {comparisonCount > 0 && (
                  <span style={{
                    background: "var(--gold-primary)",
                    color: "#FFFFFF",
                    borderRadius: "50%",
                    width: "18px",
                    height: "18px",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    {comparisonCount}
                  </span>
                )}
              </button>

              {/* Schedule Visit CTA */}
              <button 
                onClick={() => onOpenSiteVisit(null)}
                className="btn-gold"
                style={{ padding: "0.6rem 1.25rem", fontSize: "0.88rem" }}
              >
                <Calendar size={15} />
                Book VIP Visit
              </button>
            </div>

            {/* Mobile Controls (< 992px) */}
            <div className="d-flex d-lg-none align-items-center gap-2">
              {comparisonCount > 0 && (
                <button 
                  onClick={onOpenComparison}
                  style={{
                    background: "#FFFBEB",
                    border: "1px solid var(--gold-primary)",
                    color: "#92400E",
                    padding: "0.4rem 0.65rem",
                    borderRadius: "8px",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem"
                  }}
                >
                  <Scale size={14} color="var(--gold-primary)" />
                  <span>({comparisonCount})</span>
                </button>
              )}

              <button
                onClick={() => onOpenSiteVisit(null)}
                className="btn-gold d-none d-sm-inline-flex"
                style={{ padding: "0.45rem 0.85rem", fontSize: "0.8rem" }}
              >
                <Calendar size={13} />
                Visit
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                style={{
                  background: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                  borderRadius: "8px",
                  color: "#1E293B",
                  padding: "0.45rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer"
                }}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer Dropdown */}
        {mobileMenuOpen && (
          <div style={{
            backgroundColor: "#FFFFFF",
            borderTop: "1px solid #E2E8F0",
            borderBottom: "1px solid #E2E8F0",
            boxShadow: "0 12px 30px -5px rgba(0,0,0,0.1)",
            padding: "1rem 1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem"
          }}>
            <button 
              onClick={() => scrollToSection("properties-section")}
              style={{
                background: "none",
                border: "none",
                textAlign: "left",
                color: "#1E293B",
                fontSize: "0.95rem",
                fontWeight: 600,
                padding: "0.6rem 0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer"
              }}
            >
              <span>Explore All Properties</span>
              <ChevronRight size={18} color="var(--gold-primary)" />
            </button>

            <button 
              onClick={() => scrollToSection("categories-section")}
              style={{
                background: "none",
                border: "none",
                textAlign: "left",
                color: "#1E293B",
                fontSize: "0.95rem",
                fontWeight: 600,
                padding: "0.6rem 0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer"
              }}
            >
              <span>Property Segments (Plots, Villas, Floors)</span>
              <ChevronRight size={18} color="var(--gold-primary)" />
            </button>

            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenCalculator(); }}
              style={{
                background: "none",
                border: "none",
                textAlign: "left",
                color: "#1E293B",
                fontSize: "0.95rem",
                fontWeight: 600,
                padding: "0.6rem 0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer"
              }}
            >
              <span className="d-flex align-items-center gap-2">
                <Calculator size={17} color="var(--gold-primary)" />
                EMI & ROI Investment Calculator
              </span>
              <ChevronRight size={18} color="var(--gold-primary)" />
            </button>

            <button 
              onClick={() => scrollToSection("township-section")}
              style={{
                background: "none",
                border: "none",
                textAlign: "left",
                color: "#1E293B",
                fontSize: "0.95rem",
                fontWeight: 600,
                padding: "0.6rem 0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer"
              }}
            >
              <span>Wave City 4,500-Acre Master Plan</span>
              <ChevronRight size={18} color="var(--gold-primary)" />
            </button>

            <button 
              onClick={() => scrollToSection("why-us-section")}
              style={{
                background: "none",
                border: "none",
                textAlign: "left",
                color: "#1E293B",
                fontSize: "0.95rem",
                fontWeight: 600,
                padding: "0.6rem 0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer"
              }}
            >
              <span>Why Choose PropertyKraft</span>
              <ChevronRight size={18} color="var(--gold-primary)" />
            </button>

            <div style={{ paddingTop: "0.75rem", borderTop: "1px solid #E2E8F0" }}>
              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenSiteVisit(null); }}
                className="btn-gold w-100"
                style={{ justifyContent: "center", padding: "0.75rem 1rem" }}
              >
                <Calendar size={18} />
                Schedule VIP Guided Site Visit
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
