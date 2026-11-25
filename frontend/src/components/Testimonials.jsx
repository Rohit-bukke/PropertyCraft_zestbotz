import React from "react";
import { Star, Quote, CheckCircle2, Award } from "lucide-react";

export default function Testimonials({ testimonials = [] }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section style={{
      padding: "3.5rem 0",
      backgroundColor: "#FFFFFF",
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
            <Star size={15} fill="var(--gold-primary)" color="var(--gold-primary)" />
            Verified Buyer Experiences
          </div>
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.85rem, 3.5vw, 2.75rem)",
            color: "#0F172A",
            marginBottom: "0.75rem",
            letterSpacing: "-0.015em"
          }}>
            Trusted by <span style={{ color: "var(--gold-primary)" }}>1,250+ Families</span> & Investors
          </h2>
          <p style={{ color: "#64748B", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
            Read how doctors, corporate executives, and overseas NRI investors transformed their suburban living and wealth with PropertyKraft.
          </p>
        </div>

        {/* Testimonials Cards Grid - Bootstrap Row & Col */}
        <div className="row g-3 g-lg-4">
          {testimonials.map((t) => (
            <div key={t.id} className="col-12 col-md-6 col-lg-4">
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: "1.5rem",
                  borderRadius: "var(--radius-xl)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 2px 10px rgba(15, 23, 42, 0.04)",
                  transition: "all 0.25s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 30px -4px rgba(15, 23, 42, 0.08)";
                  e.currentTarget.style.borderColor = "#CBD5E1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 10px rgba(15, 23, 42, 0.04)";
                  e.currentTarget.style.borderColor = "#E2E8F0";
                }}
              >
                <div>
                  {/* Star rating */}
                  <div style={{ display: "flex", gap: "0.25rem", marginBottom: "0.85rem" }}>
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} size={15} fill="#EAB308" color="#EAB308" />
                    ))}
                  </div>

                  <p style={{
                    color: "#334155",
                    fontSize: "0.9rem",
                    lineHeight: 1.6,
                    fontStyle: "italic",
                    marginBottom: "1.25rem"
                  }}>
                    "{t.review}"
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", paddingTop: "0.85rem", borderTop: "1px solid #F1F5F9" }}>
                  <img
                    src={t.avatar}
                    alt={t.author}
                    style={{ width: "42px", height: "42px", borderRadius: "50%", objectFit: "cover", border: "2px solid #E2E8F0" }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, color: "#0F172A", fontSize: "0.92rem", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                      <span>{t.author}</span>
                      <CheckCircle2 size={14} color="#16A34A" />
                    </div>
                    <div style={{ fontSize: "0.76rem", color: "#64748B" }}>
                      {t.role} • <span style={{ color: "var(--gold-primary)", fontWeight: 600 }}>{t.property_purchased}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
