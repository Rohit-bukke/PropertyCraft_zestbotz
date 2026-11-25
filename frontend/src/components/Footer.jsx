import React from "react";
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  ShieldCheck, 
  Clock, 
  ArrowUp,
  Scale,
  Calendar
} from "lucide-react";

export default function Footer({ onOpenSiteVisit, onOpenCalculator }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer style={{
      backgroundColor: "#F8FAFC",
      color: "#64748B",
      borderTop: "1px solid #E2E8F0",
      padding: "4.5rem 0 2rem",
      fontSize: "0.88rem"
    }}>
      <div className="container-custom">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "2.5rem",
          marginBottom: "3.5rem"
        }}>
          {/* Brand & Address */}
          <div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1rem"
            }}>
              <div style={{
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                background: "var(--gold-gradient)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                fontFamily: "var(--font-serif)",
                fontWeight: 800,
                fontSize: "1.2rem",
                boxShadow: "0 2px 6px rgba(197, 154, 39, 0.25)"
              }}>
                PK
              </div>
              <div style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1.4rem",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#0F172A"
              }}>
                Property<span style={{ color: "var(--gold-primary)" }}>Kraft</span>
              </div>
            </div>

            <p style={{ color: "#475569", fontSize: "0.85rem", lineHeight: 1.65, marginBottom: "1.25rem" }}>
              Premier Real Estate Advisory specializing in Wave City and the NH-24 / Delhi-Meerut Expressway growth corridor. Official direct channel partner for Tier-1 builders.
            </p>

            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.35rem 0.75rem",
              borderRadius: "100px",
              backgroundColor: "#FEF3C7",
              border: "1px solid #FDE68A",
              color: "#92400E",
              fontSize: "0.76rem",
              fontWeight: 600
            }}>
              <ShieldCheck size={14} color="#B45309" />
              <span>UP RERA: UPRERAAGT12490</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: "#0F172A", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.05rem", marginBottom: "1.2rem" }}>
              Featured Portfolios
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              <li>
                <a href="#properties-section" style={{ color: "#475569", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "var(--gold-primary)"} onMouseLeave={(e) => e.target.style.color = "#475569"}>
                  Wave Veridia (Oakwood Enclave)
                </a>
              </li>
              <li>
                <a href="#properties-section" style={{ color: "#475569", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "var(--gold-primary)"} onMouseLeave={(e) => e.target.style.color = "#475569"}>
                  Wave Eligo Smart Residences
                </a>
              </li>
              <li>
                <a href="#properties-section" style={{ color: "#475569", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "var(--gold-primary)"} onMouseLeave={(e) => e.target.style.color = "#475569"}>
                  Freehold Residential Plots (135 - 500 Sq. Yd.)
                </a>
              </li>
              <li>
                <a href="#properties-section" style={{ color: "#475569", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "var(--gold-primary)"} onMouseLeave={(e) => e.target.style.color = "#475569"}>
                  Wave Galleria Commercial Shops & Offices
                </a>
              </li>
              <li>
                <a href="#properties-section" style={{ color: "#475569", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "var(--gold-primary)"} onMouseLeave={(e) => e.target.style.color = "#475569"}>
                  Wave Dream Homes (Ready OC Received)
                </a>
              </li>
            </ul>
          </div>

          {/* Tools & Services */}
          <div>
            <h4 style={{ color: "#0F172A", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.05rem", marginBottom: "1.2rem" }}>
              PropTech Tools & Advisory
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              <li>
                <button 
                  onClick={onOpenCalculator} 
                  style={{ background: "none", border: "none", color: "#475569", cursor: "pointer", padding: 0, textAlign: "left", fontSize: "0.88rem", transition: "color 0.2s" }}
                  onMouseEnter={(e) => e.target.style.color = "var(--gold-primary)"}
                  onMouseLeave={(e) => e.target.style.color = "#475569"}
                >
                  Home Loan EMI Calculator
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenCalculator} 
                  style={{ background: "none", border: "none", color: "#475569", cursor: "pointer", padding: 0, textAlign: "left", fontSize: "0.88rem", transition: "color 0.2s" }}
                  onMouseEnter={(e) => e.target.style.color = "var(--gold-primary)"}
                  onMouseLeave={(e) => e.target.style.color = "#475569"}
                >
                  Wave City 5-Year ROI Simulator
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenSiteVisit(null)} 
                  style={{ background: "none", border: "none", color: "#475569", cursor: "pointer", padding: 0, textAlign: "left", fontSize: "0.88rem", transition: "color 0.2s" }}
                  onMouseEnter={(e) => e.target.style.color = "var(--gold-primary)"}
                  onMouseLeave={(e) => e.target.style.color = "#475569"}
                >
                  Schedule Guided VIP Site Visit
                </button>
              </li>
              <li>
                <a href="#township-section" style={{ color: "#475569", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "var(--gold-primary)"} onMouseLeave={(e) => e.target.style.color = "#475569"}>
                  4,500-Acre Master Township Plan
                </a>
              </li>
              <li>
                <a href="#why-us-section" style={{ color: "#475569", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "var(--gold-primary)"} onMouseLeave={(e) => e.target.style.color = "#475569"}>
                  0% Brokerage Allotment Guarantee
                </a>
              </li>
            </ul>
          </div>

          {/* Physical Office & Contact */}
          <div>
            <h4 style={{ color: "#0F172A", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.05rem", marginBottom: "1.2rem" }}>
              Township Headquarters
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                <MapPin size={17} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span style={{ color: "#475569" }}>SF-102, 2nd Floor, Wave Galleria, Sector-3, Wave City, Ghaziabad, UP 201002</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <Phone size={16} color="var(--gold-primary)" style={{ flexShrink: 0 }} />
                <a href="tel:+919212224545" style={{ color: "#0F172A", textDecoration: "none", fontWeight: 700 }}>
                  +91 92122 24545
                </a>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <Mail size={16} color="var(--gold-primary)" style={{ flexShrink: 0 }} />
                <a href="mailto:info@propertykraft.in" style={{ color: "#475569", textDecoration: "none" }}>
                  info@propertykraft.in
                </a>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <Clock size={16} color="var(--gold-primary)" style={{ flexShrink: 0 }} />
                <span style={{ color: "#475569" }}>Open 7 Days: 9:30 AM – 7:30 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div style={{
          borderTop: "1px solid #E2E8F0",
          paddingTop: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          fontSize: "0.8rem",
          color: "#64748B"
        }}>
          <div>
            © {new Date().getFullYear()} PropertyKraft. All Rights Reserved. Authorized independent real estate advisory.
          </div>

          <button
            onClick={scrollToTop}
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              color: "#334155",
              padding: "0.45rem 0.85rem",
              borderRadius: "var(--radius-md)",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontWeight: 600,
              boxShadow: "0 1px 2px rgba(0,0,0,0.04)"
            }}
          >
            <span>Back to Top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
