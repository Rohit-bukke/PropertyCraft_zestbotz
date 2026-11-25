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
  Compass,
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
      minHeight: "84vh",
      display: "flex",
      alignItems: "center",
      background: "linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)",
      borderBottom: "1px solid #E2E8F0",
      overflow: "hidden",
      padding: "3.5rem 0 4.5rem"
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
        width: "650px",
        height: "320px",
        background: "radial-gradient(circle, rgba(197, 154, 39, 0.08) 0%, transparent 70%)",
        filter: "blur(60px)",
        pointerEvents: "none"
      }} />

      <div className="container-custom" style={{ position: "relative", zIndex: 10, width: "100%" }}>
        <div style={{ maxWidth: "920px", margin: "0 auto", textAlign: "center" }}>
          
          {/* Official Channel Partner Badge - Light */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.55rem",
            padding: "0.4rem 1.15rem",
            borderRadius: "100px",
            background: "#FEF3C7",
            border: "1px solid #FDE68A",
            marginBottom: "1.6rem",
            boxShadow: "0 1px 3px rgba(180, 83, 9, 0.08)"
          }}>
            <Award size={15} color="#B45309" />
            <span style={{ 
              color: "#92400E", 
              fontSize: "0.82rem", 
              fontWeight: 700, 
              letterSpacing: "0.04em",
              textTransform: "uppercase"
            }}>
              Premier Wave City & NH-24 Real Estate Advisory
            </span>
          </div>

          {/* Large Headline */}
          <h1 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.3rem, 5.2vw, 4.1rem)",
            fontWeight: 700,
            lineHeight: 1.16,
            color: "#0F172A",
            marginBottom: "1.25rem",
            letterSpacing: "-0.025em"
          }}>
            Invest in Delhi-NCR's Premier <br />
            <span style={{ color: "var(--gold-primary)" }}>4,500-Acre Smart City</span> Township
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: "clamp(1.05rem, 1.8vw, 1.2rem)",
            color: "#475569",
            maxWidth: "760px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.65,
            fontWeight: 400
          }}>
            Curated direct-builder portfolio of luxury low-rise floors in <strong>Veridia</strong>, 
            smart residences in <strong>Eligo</strong>, and freehold villa plots. 
            Zero brokerage on fresh allotments with end-to-end registry & bank loan facilitation.
          </p>

          {/* Luxury Interactive Instant Search Card - Clean White Surface */}
          <div style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            padding: "1.25rem",
            borderRadius: "var(--radius-xl)",
            marginBottom: "3rem",
            textAlign: "left",
            boxShadow: "0 10px 30px -4px rgba(15, 23, 42, 0.08), 0 2px 8px -2px rgba(15, 23, 42, 0.04)"
          }}>
            <form onSubmit={handleSubmit} style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr)) auto",
              gap: "0.85rem",
              alignItems: "center"
            }}>
              {/* Keyword Search */}
              <div style={{ position: "relative" }}>
                <label style={{ 
                  display: "block", 
                  fontSize: "0.72rem", 
                  fontWeight: 700, 
                  textTransform: "uppercase", 
                  color: "#0F172A", 
                  marginBottom: "0.35rem",
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
                      padding: "0.7rem 0.85rem 0.7rem 2.3rem",
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
              <div>
                <label style={{ 
                  display: "block", 
                  fontSize: "0.72rem", 
                  fontWeight: 700, 
                  textTransform: "uppercase", 
                  color: "#0F172A", 
                  marginBottom: "0.35rem",
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
                    padding: "0.7rem 0.85rem",
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
              <div>
                <label style={{ 
                  display: "block", 
                  fontSize: "0.72rem", 
                  fontWeight: 700, 
                  textTransform: "uppercase", 
                  color: "#0F172A", 
                  marginBottom: "0.35rem",
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
                    padding: "0.7rem 0.85rem",
                    color: "#0F172A",
                    fontSize: "0.9rem",
                    outline: "none",
                    cursor: "pointer"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "var(--gold-primary)"}
                  onBlur={(e) => e.target.style.borderColor = "#CBD5E1"}
                >
                  <option value="any">Any Budget Range</option>
                  <option value="under_50l">Under ₹50 Lakh</option>
                  <option value="50l_1cr">₹50 Lakh - ₹1.00 Crore</option>
                  <option value="1cr_2cr">₹1.00 Crore - ₹2.00 Crore</option>
                  <option value="above_2cr">₹2.00 Crore+ (Ultra Luxury)</option>
                </select>
              </div>

              {/* Action Button */}
              <div style={{ paddingTop: "1.2rem" }}>
                <button
                  type="submit"
                  className="btn-gold"
                  style={{
                    width: "100%",
                    padding: "0.75rem 1.6rem",
                    whiteSpace: "nowrap"
                  }}
                >
                  <span>Explore Inventory</span>
                  <ArrowRight size={17} />
                </button>
              </div>
            </form>
          </div>

          {/* High-Impact Trust Metrics Bar - Clean Light Styling */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1.5rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid #E2E8F0"
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1.9rem",
                fontWeight: 800,
                color: "#0F172A"
              }}>
                ₹550+ Cr
              </div>
              <div style={{ fontSize: "0.82rem", color: "#64748B", fontWeight: 500, marginTop: "2px" }}>
                Inventory Successfully Advised
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1.9rem",
                fontWeight: 800,
                color: "#0F172A"
              }}>
                1,250+
              </div>
              <div style={{ fontSize: "0.82rem", color: "#64748B", fontWeight: 500, marginTop: "2px" }}>
                Families Settled in Wave City
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1.9rem",
                fontWeight: 800,
                color: "var(--gold-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.3rem"
              }}>
                <BadgePercent size={24} />
                0% Brokerage
              </div>
              <div style={{ fontSize: "0.82rem", color: "#64748B", fontWeight: 500, marginTop: "2px" }}>
                On Fresh Developer Allotments
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1.9rem",
                fontWeight: 800,
                color: "#0F172A"
              }}>
                100% RERA
              </div>
              <div style={{ fontSize: "0.82rem", color: "#64748B", fontWeight: 500, marginTop: "2px" }}>
                Verified Legal Clearances
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
