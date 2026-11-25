import React, { useState } from "react";
import { 
  Search, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  BadgePercent, 
  CheckCircle2,
  TrendingUp,
  Award
} from "lucide-react";

export default function Hero({ 
  onSearch, 
  onSelectCategory, 
  onOpenSiteVisit 
}) {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("All");
  const [budget, setBudget] = useState("any");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      search: keyword,
      category: category,
      budget: budget
    });
    const el = document.getElementById("properties-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section style={{
      position: "relative",
      minHeight: "75vh",
      display: "flex",
      alignItems: "center",
      background: "linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)",
      borderBottom: "1px solid #E2E8F0",
      overflow: "hidden",
      padding: "2.5rem 0 3.5rem"
    }}>
      {/* Subtle light geometric grid overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "linear-gradient(#E2E8F0 1px, transparent 1px), linear-gradient(90deg, #E2E8F0 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        opacity: 0.35,
        pointerEvents: "none"
      }} />

      {/* Soft warm ambient light glow */}
      <div style={{
        position: "absolute",
        top: "0%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "600px",
        maxWidth: "90vw",
        height: "300px",
        background: "radial-gradient(circle, rgba(197, 154, 39, 0.08) 0%, transparent 70%)",
        filter: "blur(50px)",
        pointerEvents: "none"
      }} />

      <div className="container-custom" style={{ position: "relative", zIndex: 10, width: "100%" }}>
        <div style={{ maxWidth: "940px", margin: "0 auto", textAlign: "center" }}>
          
          {/* Official Partner Badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.35rem 1rem",
            borderRadius: "100px",
            background: "#FEF3C7",
            border: "1px solid #FDE68A",
            marginBottom: "1.25rem",
            boxShadow: "0 1px 3px rgba(180, 83, 9, 0.08)",
            maxWidth: "100%"
          }}>
            <Award size={15} color="#B45309" className="flex-shrink-0" />
            <span style={{ 
              color: "#92400E", 
              fontSize: "clamp(0.72rem, 2.5vw, 0.8rem)", 
              fontWeight: 700, 
              letterSpacing: "0.03em",
              textTransform: "uppercase"
            }}>
              Premier Wave City & NH-24 Real Estate Advisory
            </span>
          </div>

          {/* Large Headline */}
          <h1 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.9rem, 4.5vw, 3.35rem)",
            fontWeight: 700,
            color: "#0F172A",
            lineHeight: 1.18,
            marginBottom: "1.2rem",
            letterSpacing: "-0.02em"
          }}>
            Invest in <span style={{ color: "var(--gold-primary)" }}>Wave City</span> with Complete Confidence & Direct Builder Allotments
          </h1>

          {/* Subheading */}
          <p style={{
            fontSize: "clamp(0.92rem, 2.2vw, 1.15rem)",
            color: "#475569",
            maxWidth: "760px",
            margin: "0 auto 2rem",
            lineHeight: 1.6
          }}>
            Official channel advisory for Veridia, Eligo, Dream Homes, and Freehold Villa Plots. 
            Enjoy <strong style={{ color: "#0F172A" }}>0% Brokerage</strong>, transparent pricing, and VIP site tours with our senior Wave City specialists.
          </p>

          {/* Luxury Instant Search Card - Bootstrap Grid Powered */}
          <div style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            padding: "1.25rem",
            borderRadius: "var(--radius-xl)",
            marginBottom: "2.5rem",
            textAlign: "left",
            boxShadow: "0 10px 30px -4px rgba(15, 23, 42, 0.08), 0 2px 8px -2px rgba(15, 23, 42, 0.04)"
          }}>
            <form onSubmit={handleSubmit}>
              <div className="row g-2 align-items-end">
                {/* Keyword Search */}
                <div className="col-12 col-md-4">
                  <label style={{ 
                    display: "block", 
                    fontSize: "0.72rem", 
                    fontWeight: 700, 
                    textTransform: "uppercase", 
                    color: "#0F172A", 
                    marginBottom: "0.3rem",
                    letterSpacing: "0.05em"
                  }}>
                    Search Project or Sector
                  </label>
                  <div style={{ position: "relative" }}>
                    <Search size={16} color="#94A3B8" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
                    <input
                      type="text"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      placeholder="e.g. Veridia, Eligo, Plots, 3 BHK..."
                      style={{
                        width: "100%",
                        backgroundColor: "#F8FAFC",
                        border: "1px solid #CBD5E1",
                        borderRadius: "var(--radius-md)",
                        padding: "0.65rem 0.85rem 0.65rem 2.3rem",
                        color: "#0F172A",
                        fontSize: "0.9rem",
                        outline: "none",
                        transition: "border-color 0.2s, background-color 0.2s"
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--gold-primary)";
                        e.target.style.backgroundColor = "#FFFFFF";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#CBD5E1";
                        e.target.style.backgroundColor = "#F8FAFC";
                      }}
                    />
                  </div>
                </div>

                {/* Category Segment Selector */}
                <div className="col-12 col-sm-6 col-md-3">
                  <label style={{ 
                    display: "block", 
                    fontSize: "0.72rem", 
                    fontWeight: 700, 
                    textTransform: "uppercase", 
                    color: "#0F172A", 
                    marginBottom: "0.3rem",
                    letterSpacing: "0.05em"
                  }}>
                    Property Segment
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#F8FAFC",
                      border: "1px solid #CBD5E1",
                      borderRadius: "var(--radius-md)",
                      padding: "0.65rem 0.85rem",
                      color: "#0F172A",
                      fontSize: "0.9rem",
                      outline: "none",
                      cursor: "pointer"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "var(--gold-primary)"}
                    onBlur={(e) => e.target.style.borderColor = "#CBD5E1"}
                  >
                    <option value="All">All Property Types</option>
                    <option value="Apartments">Apartments (Eligo, SKA, Dream Homes)</option>
                    <option value="Plots">Freehold Plots (Oakwood, Palmwood)</option>
                    <option value="Villas">Luxury Villas & Floors (Veridia)</option>
                    <option value="Commercial">Commercial & Retail (Wave Galleria)</option>
                  </select>
                </div>

                {/* Budget Filter */}
                <div className="col-12 col-sm-6 col-md-3">
                  <label style={{ 
                    display: "block", 
                    fontSize: "0.72rem", 
                    fontWeight: 700, 
                    textTransform: "uppercase", 
                    color: "#0F172A", 
                    marginBottom: "0.3rem",
                    letterSpacing: "0.05em"
                  }}>
                    Investment Budget
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#F8FAFC",
                      border: "1px solid #CBD5E1",
                      borderRadius: "var(--radius-md)",
                      padding: "0.65rem 0.85rem",
                      color: "#0F172A",
                      fontSize: "0.9rem",
                      outline: "none",
                      cursor: "pointer"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "var(--gold-primary)"}
                    onBlur={(e) => e.target.style.borderColor = "#CBD5E1"}
                  >
                    <option value="any">Any Budget</option>
                    <option value="under_50l">Under ₹50 Lakh</option>
                    <option value="50l_1cr">₹50 Lakh - ₹1 Crore</option>
                    <option value="1cr_2cr">₹1 Crore - ₹2 Crore</option>
                    <option value="above_2cr">Above ₹2 Crore (Luxury)</option>
                  </select>
                </div>

                {/* Search Button */}
                <div className="col-12 col-md-2">
                  <button
                    type="submit"
                    className="btn-gold w-100"
                    style={{ padding: "0.68rem 1rem", fontSize: "0.92rem", justifyContent: "center" }}
                  >
                    <Search size={16} />
                    <span>Search</span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* 4 Pillars Trust Metrics - Responsive Bootstrap Grid */}
          <div className="row g-2 g-md-3 justify-content-center">
            <div className="col-6 col-md-3">
              <div style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                padding: "0.85rem 0.75rem",
                borderRadius: "var(--radius-md)",
                boxShadow: "var(--shadow-xs)",
                textAlign: "center",
                height: "100%"
              }}>
                <div style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(1.2rem, 2.5vw, 1.55rem)",
                  fontWeight: 800,
                  color: "#0F172A"
                }}>
                  4,500 <span style={{ color: "var(--gold-primary)", fontSize: "0.85rem" }}>Acres</span>
                </div>
                <div style={{ fontSize: "0.74rem", color: "#64748B", fontWeight: 600, marginTop: "2px" }}>
                  Hi-Tech Smart Township
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                padding: "0.85rem 0.75rem",
                borderRadius: "var(--radius-md)",
                boxShadow: "var(--shadow-xs)",
                textAlign: "center",
                height: "100%"
              }}>
                <div style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(1.2rem, 2.5vw, 1.55rem)",
                  fontWeight: 800,
                  color: "#0F172A"
                }}>
                  0% <span style={{ color: "#16A34A", fontSize: "0.85rem" }}>Brokerage</span>
                </div>
                <div style={{ fontSize: "0.74rem", color: "#64748B", fontWeight: 600, marginTop: "2px" }}>
                  Direct Builder Allotment
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                padding: "0.85rem 0.75rem",
                borderRadius: "var(--radius-md)",
                boxShadow: "var(--shadow-xs)",
                textAlign: "center",
                height: "100%"
              }}>
                <div style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(1.2rem, 2.5vw, 1.55rem)",
                  fontWeight: 800,
                  color: "#0F172A"
                }}>
                  15 <span style={{ color: "var(--gold-primary)", fontSize: "0.85rem" }}>Mins</span>
                </div>
                <div style={{ fontSize: "0.74rem", color: "#64748B", fontWeight: 600, marginTop: "2px" }}>
                  To Noida Sec 62 via DME
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                padding: "0.85rem 0.75rem",
                borderRadius: "var(--radius-md)",
                boxShadow: "var(--shadow-xs)",
                textAlign: "center",
                height: "100%"
              }}>
                <div style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(1.2rem, 2.5vw, 1.55rem)",
                  fontWeight: 800,
                  color: "#0F172A"
                }}>
                  100% <span style={{ color: "#2563EB", fontSize: "0.85rem" }}>RERA</span>
                </div>
                <div style={{ fontSize: "0.74rem", color: "#64748B", fontWeight: 600, marginTop: "2px" }}>
                  Clear Legal Titles
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
