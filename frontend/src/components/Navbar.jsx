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
      {/* Top Advisory Bar - Light Clean Luxury */}
      <div style={{
        backgroundColor: "#F8FAFC",
        borderBottom: "1px solid #E2E8F0",
        fontSize: "0.82rem",
        color: "#475569",
        padding: "0.5rem 0",
        position: "relative",
        zIndex: 51
      }}>
        <div className="container-custom" style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: "0.35rem",
              color: "#9A7316",
              backgroundColor: "#FEF3C7",
              padding: "0.15rem 0.55rem",
              borderRadius: "4px",
              fontWeight: 600,
              fontSize: "0.76rem"
            }}>
              <ShieldCheck size={13} color="#B45309" />
              UPRERA Registered Partner
            </span>
            <span style={{ color: "#CBD5E1" }}>|</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", color: "#64748B" }}>
              <MapPin size={13} color="#C59A27" />
              Wave Galleria SF-102, Wave City, NH-24
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            <a 
              href="tel:+919212224545" 
              style={{ 
                color: "#1E293B", 
                textDecoration: "none", 
                display: "inline-flex", 
                alignItems: "center", 
                gap: "0.35rem",
                fontWeight: 600,
                transition: "color 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#C59A27"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#1E293B"}
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
                padding: "0.2rem 0.65rem",
                borderRadius: "4px",
                textDecoration: "none", 
                display: "inline-flex", 
                alignItems: "center", 
                gap: "0.35rem",
                fontWeight: 600,
                fontSize: "0.78rem"
              }}
            >
              <MessageCircle size={13} color="#16A34A" />
              <span>WhatsApp Advisory</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header - Light Theme */}
      <header style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #E2E8F0",
        boxShadow: scrolled ? "0 4px 20px -2px rgba(15, 23, 42, 0.08)" : "0 1px 3px rgba(15, 23, 42, 0.02)",
        transition: "all 0.25s ease",
        padding: scrolled ? "0.75rem 0" : "0.95rem 0"
      }}>
        <div className="container-custom" style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          {/* Logo & Brand */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ 
              cursor: "pointer", 
              display: "flex", 
              alignItems: "center", 
              gap: "0.75rem" 
            }}
          >
            <div style={{
              width: "42px",
              height: "42px",
              borderRadius: "10px",
              background: "var(--gold-gradient)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(197, 154, 39, 0.28)"
            }}>
              <span style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 800,
                fontSize: "1.3rem",
                color: "#FFFFFF"
              }}>PK</span>
            </div>
            <div>
              <div style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1.45rem",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#0F172A",
                display: "flex",
                alignItems: "baseline",
                gap: "2px"
              }}>
                Property<span style={{ color: "var(--gold-primary)" }}>Kraft</span>
              </div>
              <div style={{
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#64748B",
                fontWeight: 600,
                marginTop: "-2px"
              }}>
                Wave City Specialists
              </div>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav style={{
            display: "none",
            alignItems: "center",
            gap: "1.85rem"
          }} className="desktop-nav">
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
              Why PropertyKraft
            </button>
          </nav>

          {/* Desktop Actions */}
          <div style={{
            display: "none",
            alignItems: "center",
            gap: "0.85rem"
          }} className="desktop-actions">
            {/* Compare Trigger button */}
            <button 
              onClick={onOpenComparison}
              style={{
                position: "relative",
                background: comparisonCount > 0 ? "#FFFBEB" : "#FFFFFF",
                border: comparisonCount > 0 ? "1px solid var(--gold-primary)" : "1px solid #E2E8F0",
                color: comparisonCount > 0 ? "#92400E" : "#334155",
                padding: "0.6rem 0.95rem",
                borderRadius: "var(--radius-md)",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                if (comparisonCount === 0) {
                  e.currentTarget.style.borderColor = "#CBD5E1";
                  e.currentTarget.style.background = "#F8FAFC";
                }
              }}
              onMouseLeave={(e) => {
                if (comparisonCount === 0) {
                  e.currentTarget.style.borderColor = "#E2E8F0";
                  e.currentTarget.style.background = "#FFFFFF";
                }
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
              style={{ padding: "0.65rem 1.25rem", fontSize: "0.88rem" }}
            >
              <Calendar size={15} />
              Book VIP Site Visit
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }} className="mobile-only">
            {comparisonCount > 0 && (
              <button 
                onClick={onOpenComparison}
                style={{
                  background: "#FFFBEB",
                  border: "1px solid var(--gold-primary)",
                  color: "#92400E",
                  padding: "0.45rem 0.65rem",
                  borderRadius: "8px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem"
                }}
              >
                <Scale size={14} color="var(--gold-primary)" />
                <span>({comparisonCount})</span>
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderRadius: "8px",
                color: "#1E293B",
                padding: "0.5rem",
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

        {/* Mobile Navigation Drawer - Light Theme */}
        {mobileMenuOpen && (
          <div style={{
            backgroundColor: "#FFFFFF",
            borderBottom: "1px solid #E2E8F0",
            boxShadow: "0 10px 25px -5px rgba(0,0,0,0.08)",
            padding: "1.25rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem"
          }}>
            <button 
              onClick={() => scrollToSection("properties-section")}
              style={{
                background: "none",
                border: "none",
                textAlign: "left",
                color: "#1E293B",
                fontSize: "0.98rem",
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
                fontSize: "0.98rem",
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
                fontSize: "0.98rem",
                fontWeight: 600,
                padding: "0.6rem 0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer"
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
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
                fontSize: "0.98rem",
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
                fontSize: "0.98rem",
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
                className="btn-gold"
                style={{ width: "100%", justifyContent: "center" }}
              >
                <Calendar size={18} />
                Schedule VIP Guided Site Visit
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Media query styling for desktop responsiveness */}
      <style>{`
        @media (min-width: 992px) {
          .desktop-nav { display: flex !important; }
          .desktop-actions { display: flex !important; }
          .mobile-only { display: none !important; }
        }
      `}</style>
    </>
  );
}
