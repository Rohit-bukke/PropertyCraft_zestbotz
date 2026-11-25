import React, { useState } from "react";
import { 
  Building2, 
  Cpu, 
  Droplet, 
  Zap, 
  ShieldCheck, 
  Trees, 
  Car, 
  MapPin, 
  Sparkles,
  ArrowRight
} from "lucide-react";

export default function TownshipHighlights({ onOpenSiteVisit }) {
  const [activeSector, setActiveSector] = useState("oakwood");

  const sectorData = {
    oakwood: {
      title: "Oakwood Enclave (Sectors 2 & 3)",
      tagline: "The Pinnacle of Ultra-Luxury Living",
      description: "Home to Wave Veridia and premium freehold villa plots. Flanked by the lavish 30,000 sq.ft. Oakwood Clubhouse and Olympic swimming pool, this sector offers lush central lake views and the lowest population density in Delhi-NCR.",
      highlights: ["Wave Veridia 4 & 5 BHK Skyvillas", "30,000 Sq.Ft Club", "Facing 50-Acre Forest Greens", "Palafox Spanish Architecture"],
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
    },
    greenwood: {
      title: "Greenwood Enclave (Sector 4)",
      tagline: "Smart Mid-Rise Park Residences",
      description: "Nestled right along Wave City's central boulevard, Greenwood Enclave houses Wave Eligo smart residences with 80% open landscape gardens, integrated cycling tracks, and semi-modular digital homes.",
      highlights: ["Wave Eligo Smart Homes", "80% Open Green Canopy", "Infinity Splash Pool", "Direct Park Walkways"],
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
    },
    galleria: {
      title: "Wave Galleria Hub (Sector 3)",
      tagline: "Lifestyle, High-Street Retail & Corporate Suites",
      description: "The bustling commercial and lifestyle nerve center of the township. Features 5 levels of high-street retail, anchor stores, banks, pharmacies, multi-cuisine food courts, and corporate office suites including the PropertyKraft Advisory Headquarters (SF-102).",
      highlights: ["PropertyKraft Flagship Office SF-102", "500+ Car Basement Parking", "Operational Supermarkets & F&B", "7.6% Commercial Yields"],
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
    },
    kingwood: {
      title: "Kingwood & Palmwood Enclaves",
      tagline: "Independent Living & Freehold Plots",
      description: "A serene residential enclave characterized by low-rise independent floors (G+2) and wide villa plots. Popular for families who appreciate independent living with private terraces, tree-lined avenues, and gated perimeter security.",
      highlights: ["Wave Executive Independent Floors", "Freehold Plots (135 - 500 Sq. Yd.)", "Wide 60m Arterial Roads", "Immediate Registry"],
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
    }
  };

  const currentSector = sectorData[activeSector];

  return (
    <section id="township-section" style={{
      padding: "5rem 0",
      backgroundColor: "#FFFFFF",
      borderBottom: "1px solid #E2E8F0",
      position: "relative"
    }}>
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 3.5rem" }}>
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
            IGBC Platinum Pre-Certified Smart Township
          </div>
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
            color: "#0F172A",
            marginBottom: "0.85rem",
            letterSpacing: "-0.015em"
          }}>
            Mastering <span style={{ color: "var(--gold-primary)" }}>4,500 Acres</span> of Urban Luxury
          </h2>
          <p style={{ color: "#64748B", fontSize: "1rem", lineHeight: 1.6 }}>
            Located directly on the 14-lane signal-free Delhi-Meerut Expressway (NH-24), 
            Wave City represents Asia's largest self-contained hi-tech smart city.
          </p>
        </div>

        {/* 4 Pillars of Wave City Infrastructure - Clean Light Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.5rem",
          marginBottom: "3.5rem"
        }}>
          <div style={{
            backgroundColor: "#F8FAFC",
            border: "1px solid #E2E8F0",
            padding: "1.5rem",
            borderRadius: "var(--radius-lg)",
            transition: "all 0.2s ease"
          }}>
            <div style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              backgroundColor: "#FEF3C7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#B45309",
              marginBottom: "1rem"
            }}>
              <Cpu size={22} />
            </div>
            <h4 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.15rem", color: "#0F172A", marginBottom: "0.4rem" }}>
              Central Command Center
            </h4>
            <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.55 }}>
              Centralized IBM-powered smart monitoring of traffic flow, perimeter CCTV, automated emergency response, and municipal street lighting.
            </p>
          </div>

          <div style={{
            backgroundColor: "#F8FAFC",
            border: "1px solid #E2E8F0",
            padding: "1.5rem",
            borderRadius: "var(--radius-lg)",
            transition: "all 0.2s ease"
          }}>
            <div style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              backgroundColor: "#E0F2FE",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0369A1",
              marginBottom: "1rem"
            }}>
              <Droplet size={22} />
            </div>
            <h4 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.15rem", color: "#0F172A", marginBottom: "0.4rem" }}>
              Smart Water & Eco Living
            </h4>
            <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.55 }}>
              100% automated electronic water metering, zero-discharge sewage recycling plant, and extensive rainwater recharging aquifers.
            </p>
          </div>

          <div style={{
            backgroundColor: "#F8FAFC",
            border: "1px solid #E2E8F0",
            padding: "1.5rem",
            borderRadius: "var(--radius-lg)",
            transition: "all 0.2s ease"
          }}>
            <div style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              backgroundColor: "#FEF9C3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#A16207",
              marginBottom: "1rem"
            }}>
              <Zap size={22} />
            </div>
            <h4 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.15rem", color: "#0F172A", marginBottom: "0.4rem" }}>
              Underground Utilities
            </h4>
            <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.55 }}>
              Zero overhead electrical wires or visual clutter. Dedicated underground utility trenches for high-voltage power, optical fiber, and cooking gas.
            </p>
          </div>

          <div style={{
            backgroundColor: "#F8FAFC",
            border: "1px solid #E2E8F0",
            padding: "1.5rem",
            borderRadius: "var(--radius-lg)",
            transition: "all 0.2s ease"
          }}>
            <div style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              backgroundColor: "#DCFCE7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#15803D",
              marginBottom: "1rem"
            }}>
              <Car size={22} />
            </div>
            <h4 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.15rem", color: "#0F172A", marginBottom: "0.4rem" }}>
              14-Lane DME Access
            </h4>
            <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.55 }}>
              Seamless travel to Delhi (20 mins), Central Noida Sector 62 (12 mins), and Noida International Airport Jewar via upcoming expressway connectors.
            </p>
          </div>
        </div>

        {/* Interactive Enclave Explorer - Clean White Layout */}
        <div style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
          border: "1px solid #E2E8F0",
          boxShadow: "0 10px 30px -4px rgba(15, 23, 42, 0.06)"
        }}>
          {/* Enclave Selector Tabs */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            backgroundColor: "#F8FAFC",
            borderBottom: "1px solid #E2E8F0"
          }}>
            {[
              { id: "oakwood", label: "Oakwood Enclave" },
              { id: "greenwood", label: "Greenwood Enclave" },
              { id: "galleria", label: "Wave Galleria Hub" },
              { id: "kingwood", label: "Kingwood & Palmwood" }
            ].map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveSector(sec.id)}
                style={{
                  background: activeSector === sec.id ? "#FFFFFF" : "transparent",
                  border: "none",
                  borderBottom: activeSector === sec.id ? "3px solid var(--gold-primary)" : "3px solid transparent",
                  padding: "1rem",
                  color: activeSector === sec.id ? "#0F172A" : "#64748B",
                  fontWeight: 700,
                  fontSize: "0.92rem",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                {sec.label}
              </button>
            ))}
          </div>

          {/* Enclave Display View */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            minHeight: "360px"
          }}>
            {/* Left Content */}
            <div style={{ padding: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ color: "var(--gold-primary)", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {currentSector.tagline}
                </div>
                <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.75rem", color: "#0F172A", margin: "0.4rem 0 0.85rem" }}>
                  {currentSector.title}
                </h3>
                <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                  {currentSector.description}
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.5rem" }}>
                  {currentSector.highlights.map((hl, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontSize: "0.85rem", color: "#1E293B", fontWeight: 500 }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--gold-primary)" }} />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <button
                  onClick={() => onOpenSiteVisit({ title: currentSector.title })}
                  className="btn-gold"
                  style={{ padding: "0.75rem 1.4rem" }}
                >
                  <MapPin size={16} />
                  Book VIP Golf-Cart Tour of {currentSector.title}
                </button>
              </div>
            </div>

            {/* Right Photo */}
            <div style={{ position: "relative", minHeight: "300px", backgroundColor: "#F1F5F9" }}>
              <img
                src={currentSector.image}
                alt={currentSector.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
