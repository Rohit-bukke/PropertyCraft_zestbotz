import React, { useState } from "react";
import { ChevronDown, HelpCircle, MessageSquare } from "lucide-react";

export default function FAQSection({ faqs = [], onOpenSiteVisit }) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section style={{
      padding: "3.5rem 0",
      backgroundColor: "#F8FAFC",
      borderBottom: "1px solid #E2E8F0"
    }}>
      <div className="container-custom">
        <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 2.5rem" }}>
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
            <HelpCircle size={15} />
            Frequently Addressed Queries
          </div>
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.85rem, 3.5vw, 2.75rem)",
            color: "#0F172A",
            marginBottom: "0.75rem",
            letterSpacing: "-0.015em"
          }}>
            Wave City & NH-24 <span style={{ color: "var(--gold-primary)" }}>Investor Guide</span>
          </h2>
          <p style={{ color: "#64748B", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
            Clear, authoritative answers regarding RERA approvals, freehold land titles, bank mortgages, and smart infrastructure.
          </p>
        </div>

        {/* Accordion Container */}
        <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={faq.id || idx}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "var(--radius-lg)",
                  border: isOpen ? "1px solid var(--gold-primary)" : "1px solid #E2E8F0",
                  overflow: "hidden",
                  transition: "all 0.2s ease",
                  boxShadow: isOpen ? "0 4px 14px rgba(197, 154, 39, 0.1)" : "0 1px 3px rgba(0,0,0,0.02)"
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  style={{
                    width: "100%",
                    padding: "1.1rem 1.25rem",
                    background: isOpen ? "#FFFDF7" : "#FFFFFF",
                    border: "none",
                    textAlign: "left",
                    color: "#0F172A",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "0.75rem"
                  }}
                >
                  <span style={{ color: isOpen ? "var(--gold-primary)" : "#0F172A" }}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    color={isOpen ? "var(--gold-primary)" : "#64748B"}
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.25s ease",
                      flexShrink: 0
                    }}
                  />
                </button>

                {isOpen && (
                  <div style={{
                    padding: "0 1.25rem 1.1rem",
                    backgroundColor: "#FFFDF7",
                    color: "#475569",
                    fontSize: "0.88rem",
                    lineHeight: 1.65,
                    borderTop: "1px solid #FBF4DE"
                  }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <p style={{ color: "#64748B", fontSize: "0.92rem", marginBottom: "0.85rem" }}>
            Have a specific plot layout query or need custom financial guidance?
          </p>
          <a
            href="https://wa.me/919212224545?text=Hello%20PropertyKraft,%20I%20have%20a%20question%20regarding%20Wave%20City%20properties."
            target="_blank"
            rel="noreferrer"
            className="btn-gold w-mobile-100"
            style={{ textDecoration: "none" }}
          >
            <MessageSquare size={16} />
            Ask PropertyKraft Advisory on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
