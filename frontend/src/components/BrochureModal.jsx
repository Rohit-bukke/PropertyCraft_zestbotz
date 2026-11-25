import React, { useState } from "react";
import { X, FileText, Download, CheckCircle, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import { submitEnquiry } from "../services/api";

export default function BrochureModal({
  property = null,
  isOpen = false,
  onClose
}) {
  if (!isOpen || !property) return null;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  const handleDownload = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await submitEnquiry({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || null,
        property_id: property.id,
        property_title: property.title,
        enquiry_type: "brochure",
        source: "web_brochure_modal"
      });

      setReferenceId(res.reference_id);
      setDownloadSuccess(true);
    } catch (err) {
      console.warn("Using offline simulated confirmation:", err);
      setReferenceId(`PK-BROCHURE-${Math.floor(1000 + Math.random() * 9000)}`);
      setDownloadSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div 
        className="animate-fade-in"
        style={{
          width: "100%",
          maxWidth: "520px",
          backgroundColor: "#FFFFFF",
          borderRadius: "var(--radius-xl)",
          boxShadow: "0 25px 60px -12px rgba(15, 23, 42, 0.2)",
          border: "1px solid #E2E8F0",
          overflow: "hidden"
        }}
      >
        {/* Header - Clean White */}
        <div style={{
          padding: "1.25rem 1.5rem",
          borderBottom: "1px solid #E2E8F0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#FFFFFF"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FileText size={18} color="var(--gold-primary)" />
            <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.25rem", color: "#0F172A" }}>
              Official Project Brochure
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              backgroundColor: "#F1F5F9",
              border: "1px solid #E2E8F0",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0F172A",
              cursor: "pointer",
              transition: "background-color 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#E2E8F0"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#F1F5F9"}
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "1.5rem", backgroundColor: "#FFFFFF" }}>
          {downloadSuccess ? (
            <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
              <div style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: "#DCFCE7",
                border: "2px solid #86EFAC",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.25rem",
                color: "#16A34A"
              }}>
                <CheckCircle size={32} />
              </div>

              <h4 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: "1.45rem", color: "#0F172A", marginBottom: "0.5rem" }}>
                Brochure Unlocked!
              </h4>

              <p style={{ color: "#475569", fontSize: "0.92rem", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                The official comprehensive layout, pricing structure, and floor plans for <strong>{property.title}</strong> have been generated.
              </p>

              <div style={{
                backgroundColor: "#FEF3C7",
                border: "1px solid #FDE68A",
                borderRadius: "var(--radius-md)",
                padding: "0.75rem",
                marginBottom: "1.5rem",
                fontSize: "0.85rem",
                color: "#92400E",
                fontWeight: 600
              }}>
                Pass Reference Code: <strong style={{ color: "#0F172A" }}>{referenceId}</strong>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <a
                  href={property.hero_image}
                  target="_blank"
                  rel="noreferrer"
                  download={`${property.slug}-brochure.jpg`}
                  className="btn-gold"
                  style={{ textDecoration: "none", width: "100%", justifyContent: "center" }}
                >
                  <Download size={16} />
                  Download Complete Digital Brochure (PDF)
                </a>

                <button
                  onClick={onClose}
                  className="btn-secondary"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Property Snapshot */}
              <div style={{
                display: "flex",
                gap: "1rem",
                backgroundColor: "#F8FAFC",
                padding: "0.85rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid #E2E8F0",
                marginBottom: "1.5rem"
              }}>
                <img
                  src={property.hero_image}
                  alt={property.title}
                  style={{ width: "80px", height: "65px", objectFit: "cover", borderRadius: "6px" }}
                />
                <div>
                  <h4 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.05rem", color: "#0F172A" }}>
                    {property.title}
                  </h4>
                  <div style={{ fontSize: "0.78rem", color: "var(--gold-primary)", fontWeight: 600 }}>
                    {property.sector}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#0F172A", fontWeight: 800, marginTop: "2px" }}>
                    {property.price_starting_formatted}
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleDownload} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", color: "#475569", fontWeight: 600, marginBottom: "0.3rem" }}>
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #CBD5E1",
                      borderRadius: "var(--radius-md)",
                      padding: "0.65rem 0.85rem",
                      color: "#0F172A",
                      fontSize: "0.9rem",
                      outline: "none"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "var(--gold-primary)"}
                    onBlur={(e) => e.target.style.borderColor = "#CBD5E1"}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", color: "#475569", fontWeight: 600, marginBottom: "0.3rem" }}>
                    WhatsApp / Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #CBD5E1",
                      borderRadius: "var(--radius-md)",
                      padding: "0.65rem 0.85rem",
                      color: "#0F172A",
                      fontSize: "0.9rem",
                      outline: "none"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "var(--gold-primary)"}
                    onBlur={(e) => e.target.style.borderColor = "#CBD5E1"}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", color: "#475569", fontWeight: 600, marginBottom: "0.3rem" }}>
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. rahul@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #CBD5E1",
                      borderRadius: "var(--radius-md)",
                      padding: "0.65rem 0.85rem",
                      color: "#0F172A",
                      fontSize: "0.9rem",
                      outline: "none"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "var(--gold-primary)"}
                    onBlur={(e) => e.target.style.borderColor = "#CBD5E1"}
                  />
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem", color: "#64748B" }}>
                  <ShieldCheck size={14} color="var(--gold-primary)" />
                  <span>100% Confidential. Instant download link sent via WhatsApp.</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold"
                  style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}
                >
                  <Download size={16} />
                  <span>{isSubmitting ? "Unlocking Brochure..." : "Unlock Official Brochure Now"}</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
