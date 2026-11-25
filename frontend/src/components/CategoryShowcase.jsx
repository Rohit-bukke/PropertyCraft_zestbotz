import React from "react";
import { ArrowUpRight, Building, Home, Trees, Store } from "lucide-react";

export default function CategoryShowcase({ 
  categories = [], 
  onSelectCategory, 
  activeCategory 
}) {
  const iconMap = {
    apartments: Building,
    plots: Trees,
    villas: Home,
    commercial: Store
  };

  const categoryNameMap = {
    apartments: "Apartments",
    plots: "Plots",
    villas: "Villas",
    commercial: "Commercial"
  };

  return (
    <section id="categories-section" style={{
      padding: "5rem 0",
      backgroundColor: "#FFFFFF",
      borderBottom: "1px solid #E2E8F0"
    }}>
      <div className="container-custom">
        {/* Section Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "1.5rem",
          marginBottom: "3rem"
        }}>
          <div>
            <div style={{
              color: "var(--gold-primary)",
              fontSize: "0.82rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: "0.45rem"
            }}>
              Strategic Asset Classes
            </div>
            <h2 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)",
              color: "#0F172A",
              letterSpacing: "-0.015em"
            }}>
              Curated Segments in <span style={{ color: "var(--gold-primary)" }}>Wave City</span>
            </h2>
          </div>

          <p style={{
            color: "#64748B",
            maxWidth: "480px",
            fontSize: "0.95rem",
            lineHeight: 1.6
          }}>
            Explore our specialized investment portfolios engineered for high capital growth, 
            peaceful living, and robust rental yields along the 14-lane Delhi-Meerut Expressway.
          </p>
        </div>

        {/* Categories Grid - Clean Light Aesthetic */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1.5rem"
        }}>
          {categories.map((cat) => {
            const IconComponent = iconMap[cat.id] || Building;
            const filterTarget = categoryNameMap[cat.id] || cat.name;
            const isSelected = activeCategory?.toLowerCase() === filterTarget.toLowerCase();

            return (
              <div
                key={cat.id}
                onClick={() => {
                  onSelectCategory(filterTarget);
                  const el = document.getElementById("properties-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "var(--radius-lg)",
                  border: isSelected ? "2px solid var(--gold-primary)" : "1px solid #E2E8F0",
                  overflow: "hidden",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: isSelected 
                    ? "0 10px 25px -4px rgba(197, 154, 39, 0.2)" 
                    : "0 2px 8px rgba(15, 23, 42, 0.04)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 30px -4px rgba(15, 23, 42, 0.08)";
                  if (!isSelected) e.currentTarget.style.borderColor = "#CBD5E1";
                  const img = e.currentTarget.querySelector("img");
                  if (img) img.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = isSelected ? "0 10px 25px -4px rgba(197, 154, 39, 0.2)" : "0 2px 8px rgba(15, 23, 42, 0.04)";
                  if (!isSelected) e.currentTarget.style.borderColor = "#E2E8F0";
                  const img = e.currentTarget.querySelector("img");
                  if (img) img.style.transform = "scale(1)";
                }}
              >
                {/* Image Container with Top Badge */}
                <div style={{
                  position: "relative",
                  height: "190px",
                  overflow: "hidden",
                  backgroundColor: "#F1F5F9"
                }}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.4s ease"
                    }}
                  />
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(15, 23, 42, 0.4) 0%, transparent 60%)"
                  }} />

                  {/* Top Badge: Count */}
                  <div style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(6px)",
                    border: "1px solid #E2E8F0",
                    color: "#0F172A",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    padding: "0.25rem 0.65rem",
                    borderRadius: "100px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.06)"
                  }}>
                    {cat.count} {cat.count === 1 ? "Project" : "Projects"}
                  </div>

                  {/* Icon Circle */}
                  <div style={{
                    position: "absolute",
                    bottom: "12px",
                    left: "14px",
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    background: "#FFFFFF",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--gold-primary)"
                  }}>
                    <IconComponent size={18} />
                  </div>
                </div>

                {/* Body Content */}
                <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                  <div>
                    <div style={{
                      color: "var(--gold-primary)",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      marginBottom: "0.25rem"
                    }}>
                      {cat.starting_price}
                    </div>

                    <h3 style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      color: "#0F172A",
                      marginBottom: "0.45rem",
                      letterSpacing: "-0.01em"
                    }}>
                      {cat.name}
                    </h3>

                    <p style={{
                      fontSize: "0.85rem",
                      color: "#64748B",
                      lineHeight: 1.5,
                      marginBottom: "1.25rem"
                    }}>
                      {cat.description}
                    </p>
                  </div>

                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: isSelected ? "var(--gold-primary)" : "#0F172A",
                    paddingTop: "0.75rem",
                    borderTop: "1px solid #F1F5F9"
                  }}>
                    <span>View Listings</span>
                    <ArrowUpRight size={15} color="var(--gold-primary)" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
