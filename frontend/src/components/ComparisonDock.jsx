import React from "react";
import { Scale, X, ArrowRight } from "lucide-react";

export default function ComparisonDock({
  selectedProperties = [],
  onOpenComparison,
  onRemoveProperty,
  onClearAll
}) {
  if (!selectedProperties || selectedProperties.length === 0) return null;

  return (
    <div className="comparison-dock animate-fade-in">
      <div style={{
        padding: "0.85rem 1.35rem",
        borderRadius: "var(--radius-xl)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        flexWrap: "wrap",
        backgroundColor: "#FFFFFF",
        border: "1px solid #E2E8F0",
        boxShadow: "0 12px 35px -5px rgba(15, 23, 42, 0.14), 0 4px 12px -2px rgba(15, 23, 42, 0.05)"
      }}>
        {/* Left count indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            background: "var(--gold-primary)",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: "0.85rem"
          }}>
            {selectedProperties.length}
          </div>
          <div>
            <div style={{ fontWeight: 700, color: "#0F172A", fontSize: "0.9rem" }}>
              Properties in Comparison
            </div>
            <div style={{ fontSize: "0.74rem", color: "#64748B" }}>
              Max 3 properties (Side-by-side specs)
            </div>
          </div>
        </div>

        {/* Middle thumbnails */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          {selectedProperties.map((prop) => (
            <div
              key={prop.id}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: "0.45rem",
                backgroundColor: "#F8FAFC",
                border: "1px solid #E2E8F0",
                padding: "0.35rem 0.6rem",
                borderRadius: "var(--radius-md)"
              }}
            >
              <img
                src={prop.hero_image}
                alt={prop.title}
                style={{ width: "28px", height: "28px", borderRadius: "4px", objectFit: "cover" }}
              />
              <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#1E293B", maxWidth: "95px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {prop.title}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveProperty(prop.id);
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#64748B",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  padding: "2px"
                }}
                title="Remove"
              >
                <X size={13} />
              </button>
            </div>
          ))}
        </div>

        {/* Right CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button
            onClick={onClearAll}
            style={{
              background: "none",
              border: "none",
              color: "#64748B",
              fontSize: "0.82rem",
              fontWeight: 600,
              cursor: "pointer",
              padding: "0.4rem"
            }}
          >
            Clear
          </button>

          <button
            onClick={onOpenComparison}
            className="btn-gold"
            style={{ padding: "0.55rem 1.15rem", fontSize: "0.85rem" }}
          >
            <Scale size={14} />
            <span>Compare Now ({selectedProperties.length})</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
