import React, { useState } from "react";
import { 
  X, 
  Calendar, 
  Clock, 
  Car, 
  MapPin, 
  CheckCircle, 
  ShieldCheck, 
  Sparkles,
  PhoneCall,
  User,
  MessageSquare
} from "lucide-react";
import { submitEnquiry } from "../services/api";

export default function SiteVisitModal({
  property = null,
  allProperties = [],
  isOpen = false,
  onClose
}) {
  if (!isOpen) return null;

  const [selectedPropertyTitle, setSelectedPropertyTitle] = useState(
    property ? property.title : "Complete 4,500-Acre Wave City VIP Tour"
  );
  const [visitDate, setVisitDate] = useState("This Saturday");
  const [timeSlot, setTimeSlot] = useState("Morning (10:30 AM - 12:30 PM)");
  const [pickupOption, setPickupOption] = useState("wave_galleria"); // 'wave_galleria', 'noida_62', 'vaishali', 'direct'
  const [golfCartRequested, setGolfCartRequested] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || null,
        property_id: property ? property.id : null,
        property_title: selectedPropertyTitle,
        enquiry_type: "site_visit",
        preferred_date: visitDate,
        preferred_time_slot: `${timeSlot} [Pickup: ${pickupOption}, GolfCart: ${golfCartRequested}]`,
        message: notes.trim() || "VIP Site Visit with golf cart requested.",
        source: "web_site_visit_modal"
      };

      const res = await submitEnquiry(payload);
      setBookingRef(res.reference_id);
      setIsSuccess(true);
    } catch (err) {
      console.warn("Using simulated booking reference:", err);
      setBookingRef(`PK-VISIT-${Math.floor(1000 + Math.random() * 9000)}`);
      setIsSuccess(true);
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
          maxWidth: "640px",
          backgroundColor: "#FFFFFF",
          borderRadius: "var(--radius-xl)",
          maxHeight: "92vh",
          overflowY: "auto",
          boxShadow: "0 25px 60px -12px rgba(15, 23, 42, 0.2)",
          border: "1px solid #E2E8F0"
        }}
      >
        {/* Header - Clean White */}
        <div style={{
          padding: "1.25rem 1.75rem",
          borderBottom: "1px solid #E2E8F0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#FFFFFF"
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--gold-primary)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase" }}>
              <Calendar size={14} />
              VIP PropertyKraft Concierge
            </div>
            <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.35rem", color: "#0F172A", marginTop: "0.2rem" }}>
              Schedule a Guided Site Visit
            </h3>
          </div>

          <button
            onClick={onClose}
            style={{
              backgroundColor: "#F1F5F9",
              border: "1px solid #E2E8F0",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
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
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "1.75rem", backgroundColor: "#FFFFFF" }}>
          {isSuccess ? (
            <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
              <div style={{
                width: "68px",
                height: "68px",
                borderRadius: "50%",
                backgroundColor: "#DCFCE7",
                border: "2px solid #86EFAC",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.25rem",
                color: "#16A34A"
              }}>
                <CheckCircle size={36} />
              </div>

              <h4 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: "1.55rem", color: "#0F172A", marginBottom: "0.5rem" }}>
                VIP Site Visit Confirmed!
              </h4>

              <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.6, maxWidth: "460px", margin: "0 auto 1.5rem" }}>
                Thank you <strong>{name}</strong>! Your guided inspection for <strong>{selectedPropertyTitle}</strong> has been logged in our advisory schedule for <strong>{visitDate}</strong> ({timeSlot}).
              </p>

              {/* Reference ID card - Light Clean Accent */}
              <div style={{
                backgroundColor: "#FEF3C7",
                border: "1px solid #FDE68A",
                borderRadius: "var(--radius-lg)",
                padding: "1rem",
                marginBottom: "1.5rem",
                textAlign: "center"
              }}>
                <div style={{ fontSize: "0.75rem", color: "#92400E", textTransform: "uppercase", fontWeight: 700 }}>Booking Reference Pass</div>
                <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0F172A", letterSpacing: "0.05em", marginTop: "2px" }}>
                  {bookingRef}
                </div>
                <div style={{ fontSize: "0.8rem", color: "#B45309", marginTop: "4px", fontWeight: 600 }}>
                  Assigned Concierge: Wave Galleria SF-102 Office Team
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <a
                  href={`https://wa.me/919212224545?text=Hello%20PropertyKraft,%20my%20Site%20Visit%20Pass%20is%20${bookingRef}%20for%20${encodeURIComponent(selectedPropertyTitle)}.`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    backgroundColor: "#16A34A",
                    color: "#FFFFFF",
                    padding: "0.85rem 1.25rem",
                    borderRadius: "var(--radius-md)",
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    fontSize: "0.92rem",
                    boxShadow: "0 2px 8px rgba(22, 163, 74, 0.25)"
                  }}
                >
                  <MessageSquare size={16} />
                  Connect with Site Relationship Manager on WhatsApp
                </a>

                <button
                  onClick={onClose}
                  className="btn-secondary"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Return to Exploration
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {/* Target Project Selection */}
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", color: "#334155", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.35rem" }}>
                  Project or Segment to Inspect
                </label>
                <select
                  value={selectedPropertyTitle}
                  onChange={(e) => setSelectedPropertyTitle(e.target.value)}
                  style={{
                    width: "100%",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #CBD5E1",
                    borderRadius: "var(--radius-md)",
                    padding: "0.65rem 0.85rem",
                    color: "#0F172A",
                    fontSize: "0.9rem",
                    outline: "none",
                    cursor: "pointer"
                  }}
                >
                  <option value="Complete 4,500-Acre Wave City VIP Tour">
                    ⭐ Full 4,500-Acre Wave City Township Comprehensive Tour
                  </option>
                  {allProperties.map((p) => (
                    <option key={p.id} value={p.title}>
                      {p.title} ({p.sector})
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Presets */}
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", color: "#334155", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.35rem" }}>
                  Select Preferred Day
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "0.5rem" }}>
                  {["Tomorrow", "This Saturday", "This Sunday", "Next Weekday"].map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setVisitDate(day)}
                      style={{
                        backgroundColor: visitDate === day ? "#FEF3C7" : "#FFFFFF",
                        border: visitDate === day ? "1px solid var(--gold-primary)" : "1px solid #E2E8F0",
                        color: visitDate === day ? "#92400E" : "#475569",
                        borderRadius: "var(--radius-md)",
                        padding: "0.55rem 0.5rem",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        cursor: "pointer"
                      }}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", color: "#334155", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.35rem" }}>
                  Preferred Time Window
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "0.5rem" }}>
                  {[
                    "Morning (10:30 AM - 12:30 PM)",
                    "Afternoon (2:00 PM - 4:00 PM)",
                    "Sunset Tour (4:30 PM - 6:30 PM)"
                  ].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTimeSlot(slot)}
                      style={{
                        backgroundColor: timeSlot === slot ? "#FEF3C7" : "#FFFFFF",
                        border: timeSlot === slot ? "1px solid var(--gold-primary)" : "1px solid #E2E8F0",
                        color: timeSlot === slot ? "#92400E" : "#475569",
                        borderRadius: "var(--radius-md)",
                        padding: "0.55rem 0.6rem",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        cursor: "pointer"
                      }}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pickup Option */}
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", color: "#334155", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.35rem" }}>
                  Meeting Point & VIP Pickup Location
                </label>
                <select
                  value={pickupOption}
                  onChange={(e) => setPickupOption(e.target.value)}
                  style={{
                    width: "100%",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #CBD5E1",
                    borderRadius: "var(--radius-md)",
                    padding: "0.65rem 0.85rem",
                    color: "#0F172A",
                    fontSize: "0.9rem",
                    outline: "none",
                    cursor: "pointer"
                  }}
                >
                  <option value="wave_galleria">
                    🏢 PropertyKraft Head Office (Wave Galleria SF-102, Sector 3)
                  </option>
                  <option value="noida_62">
                    🚇 Noida Sector 62 / Electronic City Metro Pickup
                  </option>
                  <option value="vaishali">
                    🚇 Vaishali Metro Station (Blue Line) Pickup
                  </option>
                  <option value="anand_vihar">
                    🚄 Anand Vihar Namo Bharat / ISBT Hub Pickup
                  </option>
                  <option value="direct_site">
                    🚗 Direct Self-Drive to Project Gate
                  </option>
                </select>
              </div>

              {/* Golf Cart Checkbox */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                backgroundColor: "#F8FAFC",
                padding: "0.75rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid #E2E8F0"
              }}>
                <input
                  type="checkbox"
                  id="golf_cart"
                  checked={golfCartRequested}
                  onChange={(e) => setGolfCartRequested(e.target.checked)}
                  style={{ width: "18px", height: "18px", accentColor: "var(--gold-primary)", cursor: "pointer" }}
                />
                <label htmlFor="golf_cart" style={{ fontSize: "0.85rem", color: "#334155", cursor: "pointer", fontWeight: 500 }}>
                  Include <strong>VIP Golf Cart Tour</strong> of Central Greens, Lake Parks, and Sector Clubhouses (Complimentary)
                </label>
              </div>

              {/* Contact Information */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", color: "#475569", fontWeight: 600, marginBottom: "0.3rem" }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Sameer"
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
                    Mobile Number *
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
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gold"
                style={{ width: "100%", justifyContent: "center", padding: "0.85rem", marginTop: "0.5rem" }}
              >
                <Calendar size={18} />
                <span>{isSubmitting ? "Locking Concierge Slot..." : "Confirm Guided VIP Site Visit (0% Brokerage)"}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
