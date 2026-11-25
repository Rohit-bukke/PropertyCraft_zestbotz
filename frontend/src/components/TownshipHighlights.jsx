import React, { useState } from "react";
import { 
  Cpu, 
  Droplet, 
  Zap, 
  Car, 
  Trees, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  MapPin
} from "lucide-react";

export default function TownshipHighlights({ onOpenSiteVisit }) {
  const [activeSector, setActiveSector] = useState("oakwood");

  const sectors = {
    oakwood: {
      title: "Oakwood Enclave & Veridia",
      tagline: "Signature Ultra-Luxury Living",
      description: "Home to Wave Veridia and premium bespoke plots. Features an Olympic-sized swimming pool, dedicated banquet greens, and the prestigious 30,000 sq.ft. Oakwood Clubhouse.",
      highlights: ["30,000 sq.ft. Club Oakwood", "Broad 45-Meter Boulevards", "Adjacent to Central Lake Park", "Underground Gas & Fiber"],
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    },
    greenwood: {
      title: "Greenwood Enclave & Eligo",
      tagline: "Mid-Rise Smart Living & Green Corridors",
      description: "Surrounded by 50+ acres of continuous thematic park systems. Home to Wave Eligo and high-efficiency smart 3 BHK apartments with 7-ft deep balconies.",
      highlights: ["50+ Acres Green Parks", "Biometric Building Access", "Dedicated EV Bays", "Zero Carbon Footprint"],
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
    },
    galleria: {
      title: "Wave Galleria & Commercial District",
      tagline: "Retail, High-Street Banking & Dining Hub",
      description: "The primary commercial nucleus of Wave City housing banks, gourmet retail, medical centers, and the official PropertyKraft client advisory lounge at SF-102.",
      highlights: ["High Street Retail Suites", "24/7 ATM & Banking Spine", "Multi-Level Parking", "PropertyKraft Advisory SF-102"],
      image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80"
    },
    kingwood: {
      title: "Kingwood & Palmwood Enclaves",
      tagline: "Freehold Residential Villa Plots",
      description: "Direct registry-ready residential plots ranging from 135 to 404 sq. yards. Immediate possession available with full municipal utility hookups.",
      highlights: ["Immediate Registry & Mutation", "Gated Security Checkposts", "100% Underground Cables", "Wide Tree-Lined Roads"],
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
    }
  };

  const currentSector = sectors[activeSector];

  return (
    <section id="township-section" style={{
      padding: "3.5rem 0",
      backgroundColor: "#FFFFFF",
      borderBottom: "1px solid #E2E8F0",
      position: "relative"
    }}>
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 2.5rem" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            color: "var(--gold-primary)",
            fontSize: "0.82rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "0.35rem"
          }}>
            <Sparkles size={15} />
            IGBC Platinum Pre-Certified Smart Township
          </div>
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.9rem, 3.5vw, 2.75rem)",
            color: "#0F172A",
            marginBottom: "0.75rem",
            letterSpacing: "-0.015em"
          }}>
            Mastering <span style={{ color: "var(--gold-primary)" }}>4,500 Acres</span> of Urban Luxury
          </h2>
          <p style={{ color: "#64748B", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
            Located directly on the 14-lane signal-free Delhi-Meerut Expressway (NH-24), 
            Wave City represents Asia's largest self-contained hi-tech smart city.
          </p>
        </div>

        {/* 4 Pillars of Wave City Infrastructure - Bootstrap Grid */}
        <div className="row g-3 g-lg-4 mb-4">
          <div className="col-12 col-sm-6 col-lg-3">
            <div style={{
              backgroundColor: "#F8FAFC",
              border: "1px solid #E2E8F0",
              padding: "1.25rem",
              borderRadius: "var(--radius-lg)",
              height: "100%",
              transition: "all 0.2s ease"
            }}>
              <div style={{
                width: "42px",
                height: "42px",
                borderRadius: "10px",
                backgroundColor: "#FEF3C7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#B45309",
                marginBottom: "0.85rem"
              }}>
                <Cpu size={20} />
              </div>
              <h4 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.1rem", color: "#0F172A", marginBottom: "0.35rem" }}>
                Central Command Center
              </h4>
              <p style={{ fontSize: "0.82rem", color: "#64748B", lineHeight: 1.5, margin: 0 }}>
                Centralized IBM-powered smart monitoring of traffic flow, perimeter CCTV, and municipal lighting.
              </p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div style={{
              backgroundColor: "#F8FAFC",
              border: "1px solid #E2E8F0",
              padding: "1.25rem",
              borderRadius: "var(--radius-lg)",
              height: "100%",
              transition: "all 0.2s ease"
            }}>
              <div style={{
                width: "42px",
                height: "42px",
                borderRadius: "10px",
                backgroundColor: "#E0F2FE",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0369A1",
                marginBottom: "0.85rem"
              }}>
                <Droplet size={20} />
              </div>
              <h4 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.1rem", color: "#0F172A", marginBottom: "0.35rem" }}>
                Smart Water & Eco Living
              </h4>
              <p style={{ fontSize: "0.82rem", color: "#64748B", lineHeight: 1.5, margin: 0 }}>
                100% automated electronic water metering, zero-discharge sewage recycling, and rainwater aquifers.
              </p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div style={{
              backgroundColor: "#F8FAFC",
              border: "1px solid #E2E8F0",
              padding: "1.25rem",
              borderRadius: "var(--radius-lg)",
              height: "100%",
              transition: "all 0.2s ease"
            }}>
              <div style={{
                width: "42px",
                height: "42px",
                borderRadius: "10px",
                backgroundColor: "#FEF9C3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#A16207",
                marginBottom: "0.85rem"
              }}>
                <Zap size={20} />
              </div>
              <h4 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.1rem", color: "#0F172A", marginBottom: "0.35rem" }}>
                Underground Utilities
              </h4>
              <p style={{ fontSize: "0.82rem", color: "#64748B", lineHeight: 1.5, margin: 0 }}>
                Zero overhead electrical wires or visual clutter. Dedicated underground utility trenches for power and optical fiber.
              </p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div style={{
              backgroundColor: "#F8FAFC",
              border: "1px solid #E2E8F0",
              padding: "1.25rem",
              borderRadius: "var(--radius-lg)",
              height: "100%",
              transition: "all 0.2s ease"
            }}>
              <div style={{
                width: "42px",
                height: "42px",
                borderRadius: "10px",
                backgroundColor: "#DCFCE7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#15803D",
                marginBottom: "0.85rem"
              }}>
                <Car size={20} />
              </div>
              <h4 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.1rem", color: "#0F172A", marginBottom: "0.35rem" }}>
                14-Lane DME Access
              </h4>
              <p style={{ fontSize: "0.82rem", color: "#64748B", lineHeight: 1.5, margin: 0 }}>
                Direct access to Delhi (20 mins), Noida Sector 62 (12 mins), and upcoming Jewar Airport expressways.
              </p>
            </div>
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
          {/* Enclave Selector Tabs (Scrollable on small phones) */}
          <div className="d-flex overflow-auto flex-nowrap" style={{ backgroundColor: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
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
                  padding: "0.9rem 1.25rem",
                  color: activeSector === sec.id ? "#0F172A" : "#64748B",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                  flex: "1 0 auto"
                }}
              >
                {sec.label}
              </button>
            ))}
          </div>

          {/* Enclave Display View - Bootstrap Row & Col */}
          <div className="row g-0">
            {/* Left Content */}
            <div className="col-12 col-lg-7 p-3 p-md-4 p-lg-5 d-flex flex-column justify-content-between">
              <div>
                <div style={{ color: "var(--gold-primary)", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {currentSector.tagline}
                </div>
                <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", color: "#0F172A", margin: "0.35rem 0 0.75rem" }}>
                  {currentSector.title}
                </h3>
                <p style={{ color: "#475569", fontSize: "0.92rem", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                  {currentSector.description}
                </p>

                <div className="row g-2 mb-4">
                  {currentSector.highlights.map((hl, i) => (
                    <div key={i} className="col-12 col-sm-6">
                      <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontSize: "0.82rem", color: "#1E293B", fontWeight: 500 }}>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--gold-primary)", flexShrink: 0 }} />
                        <span>{hl}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <button
                  onClick={() => onOpenSiteVisit({ title: currentSector.title })}
                  className="btn-gold w-mobile-100"
                  style={{ padding: "0.7rem 1.35rem", fontSize: "0.88rem" }}
                >
                  <MapPin size={16} />
                  Book VIP Tour of {currentSector.title}
                </button>
              </div>
            </div>

            {/* Right Photo */}
            <div className="col-12 col-lg-5" style={{ minHeight: "260px", backgroundColor: "#F1F5F9" }}>
              <img
                src={currentSector.image}
                alt={currentSector.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
