import React from "react";
import { Check, X, ShieldCheck, Award, Zap, HeartHandshake } from "lucide-react";

export default function CompetitorAdvantage({ onOpenSiteVisit }) {
  const comparisonRows = [
    {
      feature: "Brokerage Commission",
      propertyKraft: "0% Brokerage (Direct Builder Allotment)",
      genericBrokers: "1% to 2% Charged on Buyer End"
    },
    {
      feature: "Inventory & Allocation",
      propertyKraft: "Direct Tier-1 Developer Allocation",
      genericBrokers: "Middleman Resale / Re-quoted Inventory"
    },
    {
      feature: "Title & Legal Verification",
      propertyKraft: "UP-RERA Checked + Encumbrance Cleared",
      genericBrokers: "Verbal Assurances & Unverified Claims"
    },
    {
      feature: "PropTech Financial Analysis",
      propertyKraft: "Custom EMI, Cash Flow & 3-Year ROI Simulations",
      genericBrokers: "Rough Estimates on Paper Notepads"
    },
    {
      feature: "Site Inspection Experience",
      propertyKraft: "Private VIP Tour with Golf Cart in Enclaves",
      genericBrokers: "Rushed walkthrough with generic agent"
    },
    {
      feature: "Permanent Township Presence",
      propertyKraft: "Physical Advisory Lounge at Wave Galleria (SF-102)",
      genericBrokers: "Remote or temporary roadside kiosks"
    }
  ];

  return (
    <section id="why-us-section" style={{
      padding: "3.5rem 0",
      backgroundColor: "#F8FAFC",
      borderBottom: "1px solid #E2E8F0"
    }}>
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto 2.5rem" }}>
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
            <Award size={15} />
            The PropertyKraft Distinction
          </div>
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.85rem, 3.5vw, 2.75rem)",
            color: "#0F172A",
            marginBottom: "0.75rem",
            letterSpacing: "-0.015em"
          }}>
            Why Smart Investors Choose <span style={{ color: "var(--gold-primary)" }}>PropertyKraft</span>
          </h2>
          <p style={{ color: "#64748B", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
            Transparent advisory. Direct builder terms. Zero surprises. See how we deliver an unmatched standard of service compared to conventional brokers.
          </p>
        </div>

        {/* Comparison Table with Horizontal Scroll Safety for Mobile */}
        <div style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
          border: "1px solid #E2E8F0",
          boxShadow: "0 4px 16px -2px rgba(15, 23, 42, 0.05)",
          marginBottom: "2rem"
        }}>
          <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
            <div style={{ minWidth: "620px" }}>
              {/* Table Header */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1.3fr 1.2fr 1fr",
                padding: "1rem 1.25rem",
                backgroundColor: "#F8FAFC",
                borderBottom: "1px solid #E2E8F0",
                fontSize: "0.82rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#64748B"
              }}>
                <div>Benchmark Metrics</div>
                <div style={{ color: "var(--gold-primary)" }}>PropertyKraft Benchmark</div>
                <div>Generic Regional Brokers</div>
              </div>

              {/* Rows */}
              {comparisonRows.map((row, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.3fr 1.2fr 1fr",
                    padding: "0.9rem 1.25rem",
                    backgroundColor: idx % 2 === 0 ? "#FFFFFF" : "#F8FAFC",
                    borderBottom: idx !== comparisonRows.length - 1 ? "1px solid #E2E8F0" : "none",
                    fontSize: "0.86rem",
                    alignItems: "center"
                  }}
                >
                  <div style={{ color: "#0F172A", fontWeight: 600 }}>{row.feature}</div>
                  <div style={{ color: "#15803D", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.45rem" }}>
                    <span style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor: "#DCFCE7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}>
                      <Check size={12} color="#16A34A" />
                    </span>
                    <span>{row.propertyKraft}</span>
                  </div>
                  <div style={{ color: "#64748B", display: "flex", alignItems: "center", gap: "0.45rem" }}>
                    <span style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor: "#FEE2E2",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}>
                      <X size={12} color="#DC2626" />
                    </span>
                    <span>{row.genericBrokers}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Banner - Bootstrap Row */}
        <div style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          boxShadow: "0 10px 30px -4px rgba(15, 23, 42, 0.06)",
          padding: "1.5rem 1.75rem",
          borderRadius: "var(--radius-lg)"
        }}>
          <div className="row g-3 align-items-center justify-content-between">
            <div className="col-12 col-md-8">
              <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(1.15rem, 2.5vw, 1.35rem)", color: "#0F172A", marginBottom: "0.25rem" }}>
                Experience the PropertyKraft Benchmark Today
              </h3>
              <p style={{ color: "#64748B", fontSize: "0.88rem", margin: 0 }}>
                Meet our Senior Strategists at Wave Galleria (SF-102) for a coffee and a bespoke portfolio assessment.
              </p>
            </div>

            <div className="col-12 col-md-auto">
              <button
                onClick={() => onOpenSiteVisit(null)}
                className="btn-gold w-mobile-100"
                style={{ padding: "0.75rem 1.4rem", fontSize: "0.88rem" }}
              >
                <span>Book Consultation & Site Tour</span>
                <ShieldCheck size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
