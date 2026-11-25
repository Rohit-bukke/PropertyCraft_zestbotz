import React from "react";
import { Check, X, ShieldCheck, Award, Zap, Building2 } from "lucide-react";

export default function CompetitorAdvantage({ onOpenSiteVisit }) {
  const comparisonRows = [
    {
      feature: "Brokerage on Fresh Builder Units",
      propertyKraft: "0% Strict Zero Brokerage",
      genericBrokers: "Often charges 1% - 2% fee",
      advantage: true
    },
    {
      feature: "Official Channel Partner Status",
      propertyKraft: "Tier-1 Certified Direct Partner",
      genericBrokers: "Sub-agents or secondary brokers",
      advantage: true
    },
    {
      feature: "On-Ground Township Office",
      propertyKraft: "Flagship Suite SF-102, Wave Galleria",
      genericBrokers: "Remote or highway curb setups",
      advantage: true
    },
    {
      feature: "VIP Site Tour Experience",
      propertyKraft: "Private Golf-Cart Tours + Metro Pickups",
      genericBrokers: "Self-navigation without sector access",
      advantage: true
    },
    {
      feature: "Legal & RERA Document Verification",
      propertyKraft: "100% In-House Legal & Title Search",
      genericBrokers: "Buyer handles registry & verification",
      advantage: true
    },
    {
      feature: "Post-Allotment Support & Registry",
      propertyKraft: "Complete Registry & Bank Loan Handholding",
      genericBrokers: "Ends transaction post-token",
      advantage: true
    },
    {
      feature: "PropTech Side-by-Side Comparison",
      propertyKraft: "Instant Multi-Project Matrix & ROI Tool",
      genericBrokers: "Paper pamphlets & vague estimates",
      advantage: true
    }
  ];

  return (
    <section id="why-us-section" style={{
      padding: "5rem 0",
      backgroundColor: "#F8FAFC",
      borderBottom: "1px solid #E2E8F0"
    }}>
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto 3rem" }}>
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
            <Award size={15} />
            The PropertyKraft Distinction
          </div>
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
            color: "#0F172A",
            marginBottom: "0.85rem",
            letterSpacing: "-0.015em"
          }}>
            Why Smart Investors Choose <span style={{ color: "var(--gold-primary)" }}>PropertyKraft</span>
          </h2>
          <p style={{ color: "#64748B", fontSize: "1rem", lineHeight: 1.6 }}>
            Transparent advisory. Direct builder terms. Zero surprises. See how we deliver an unmatched standard of service compared to conventional brokers.
          </p>
        </div>

        {/* Comparison Table - Clean Light Surface */}
        <div style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
          border: "1px solid #E2E8F0",
          boxShadow: "0 4px 16px -2px rgba(15, 23, 42, 0.05)",
          marginBottom: "2.5rem"
        }}>
          {/* Table Header */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 1.2fr 1fr",
            padding: "1.1rem 1.5rem",
            backgroundColor: "#F1F5F9",
            borderBottom: "1px solid #E2E8F0",
            fontWeight: 700,
            fontSize: "0.92rem"
          }}>
            <div style={{ color: "#475569" }}>Advisory Standard</div>
            <div style={{ color: "#0F172A", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <ShieldCheck size={18} color="var(--gold-primary)" />
              <span>PropertyKraft Advisory</span>
            </div>
            <div style={{ color: "#64748B" }}>Generic Local Agents / Portals</div>
          </div>

          {/* Rows */}
          {comparisonRows.map((row, idx) => (
            <div
              key={idx}
              style={{
                display: "grid",
                gridTemplateColumns: "1.3fr 1.2fr 1fr",
                padding: "1rem 1.5rem",
                backgroundColor: idx % 2 === 0 ? "#FFFFFF" : "#F8FAFC",
                borderBottom: idx !== comparisonRows.length - 1 ? "1px solid #E2E8F0" : "none",
                fontSize: "0.88rem",
                alignItems: "center"
              }}
            >
              <div style={{ color: "#0F172A", fontWeight: 600 }}>{row.feature}</div>
              <div style={{ color: "#15803D", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.45rem" }}>
                <span style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  backgroundColor: "#DCFCE7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  <Check size={13} color="#16A34A" />
                </span>
                <span>{row.propertyKraft}</span>
              </div>
              <div style={{ color: "#64748B", display: "flex", alignItems: "center", gap: "0.45rem" }}>
                <span style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  backgroundColor: "#FEE2E2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  <X size={13} color="#DC2626" />
                </span>
                <span>{row.genericBrokers}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner Below - Light Clean Card */}
        <div style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          boxShadow: "0 10px 30px -4px rgba(15, 23, 42, 0.06)",
          padding: "2rem 2.5rem",
          borderRadius: "var(--radius-lg)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.5rem"
        }}>
          <div>
            <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.35rem", color: "#0F172A", marginBottom: "0.25rem" }}>
              Experience the PropertyKraft Benchmark Today
            </h3>
            <p style={{ color: "#64748B", fontSize: "0.92rem" }}>
              Meet our Senior Strategists at Wave Galleria (SF-102) for a coffee and a bespoke portfolio assessment.
            </p>
          </div>

          <button
            onClick={() => onOpenSiteVisit(null)}
            className="btn-gold"
            style={{ padding: "0.85rem 1.6rem", fontSize: "0.92rem" }}
          >
            <span>Book Consultation & Site Tour</span>
            <ShieldCheck size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
