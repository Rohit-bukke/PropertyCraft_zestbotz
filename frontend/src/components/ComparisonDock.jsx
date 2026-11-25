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
      <div 
        className="comparison-dock-body"
        style={{
          padding: "0.75rem 1.25rem",
          borderRadius: "var(--radius-xl)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.85rem",
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          boxShadow: "0 12px 35px -5px rgba(15, 23, 42, 0.16), 0 4px 12px -2px rgba(15, 23, 42, 0.05)"
        }}
      >
        {/* Left count indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "var(--gold-primary)",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: "0.82rem",
            flexShrink: 0
          }}>
            {selectedProperties.length}
          </div>
          <div>
            <div style={{ fontWeight: 700, color: "#0F172A", fontSize: "0.86rem", lineHeight: 1.2 }}>
              Compare Properties
            </div>
            <div className="d-none d-sm-block" style={{ fontSize: "0.72rem", color: "#64748B" }}>
              Max 3 properties
            </div>
          </div>
        </div>

        {/* Middle thumbnails (Scrollable / Hidden on very small phones if space constrained) */}
        <div className="d-none d-md-flex align-items-center gap-2 overflow-auto" style={{ maxWidth: "380px" }}>
          {selectedProperties.map((prop) => (
            <div
              key={prop.id}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                backgroundColor: "#F8FAFC",
                border: "1px solid #E2E8F0",
                padding: "0.3rem 0.55rem",
                borderRadius: "var(--radius-md)",
                flexShrink: 0
              }}
            >
              <img
                src={prop.hero_image}
                alt={prop.title}
                style={{ width: "26px", height: "26px", borderRadius: "4px", objectFit: "cover" }}
              />
              <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#1E293B", maxWidth: "90px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
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
                <X size={12} />
              </button>
            </div>
          ))}
        </div>

        {/* Right CTA */}
        <div className="d-flex align-items-center gap-2 comparison-dock-actions">
          <button
            onClick={onClearAll}
            style={{
              background: "none",
              border: "none",
              color: "#64748B",
              fontSize: "0.8rem",
              fontWeight: 600,
              cursor: "pointer",
              padding: "0.35rem 0.5rem"
            }}
          >
            Clear
          </button>

          <button
            onClick={onOpenComparison}
            className="btn-gold"
            style={{ padding: "0.5rem 1rem", fontSize: "0.82rem" }}
          >
            <Scale size={14} />
            <span>Compare ({selectedProperties.length})</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
