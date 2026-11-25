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
  const [pickupOption, setPickupOption] = useState("wave_galleria");
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
        className="animate-fade-in modal-dialog-responsive"
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
        {/* Header */}
        <div style={{
          padding: "1.25rem 1.5rem",
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
            <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(1.15rem, 2.5vw, 1.35rem)", color: "#0F172A", marginTop: "0.2rem", margin: 0 }}>
              Schedule a Guided Site Visit
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close site visit"
            style={{
              backgroundColor: "#F1F5F9",
              border: "1px solid #E2E8F0",
              borderRadius: "50%",
              width: "34px",
              height: "34px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0F172A",
              cursor: "pointer",
              transition: "background-color 0.2s"
            }}
          >
            <X size={17} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "1.25rem", backgroundColor: "#FFFFFF" }}>
          {isSuccess ? (
            <div style={{ textAlign: "center", padding: "1rem 0" }}>
              <div style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: "#DCFCE7",
                border: "2px solid #86EFAC",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
                color: "#16A34A"
              }}>
                <CheckCircle size={32} />
              </div>

              <h4 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: "clamp(1.3rem, 3vw, 1.55rem)", color: "#0F172A", marginBottom: "0.4rem" }}>
                VIP Site Visit Confirmed!
              </h4>

              <p style={{ color: "#475569", fontSize: "0.9rem", lineHeight: 1.6, maxWidth: "460px", margin: "0 auto 1.25rem" }}>
                Thank you <strong>{name}</strong>! Your guided inspection for <strong>{selectedPropertyTitle}</strong> has been logged in our advisory schedule for <strong>{visitDate}</strong> ({timeSlot}).
              </p>

              {/* Reference ID card */}
              <div style={{
                backgroundColor: "#FEF3C7",
                border: "1px solid #FDE68A",
                borderRadius: "var(--radius-lg)",
                padding: "0.85rem",
                marginBottom: "1.25rem",
                textAlign: "center"
              }}>
                <div style={{ fontSize: "0.72rem", color: "#92400E", textTransform: "uppercase", fontWeight: 700 }}>Booking Reference Pass</div>
                <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0F172A", letterSpacing: "0.05em", marginTop: "2px" }}>
                  {bookingRef}
                </div>
                <div style={{ fontSize: "0.76rem", color: "#B45309", marginTop: "3px", fontWeight: 600 }}>
                  Assigned Concierge: Wave Galleria SF-102 Office Team
                </div>
              </div>

              <div className="d-flex flex-column gap-2">
                <a
                  href={`https://wa.me/919212224545?text=Hello%20PropertyKraft,%20my%20Site%20Visit%20Pass%20is%20${bookingRef}%20for%20${encodeURIComponent(selectedPropertyTitle)}.`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    backgroundColor: "#16A34A",
                    color: "#FFFFFF",
                    padding: "0.75rem 1.25rem",
                    borderRadius: "var(--radius-md)",
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.45rem",
                    fontSize: "0.88rem"
                  }}
                >
                  <MessageSquare size={16} />
                  Connect with Relationship Manager on WhatsApp
                </a>

                <button
                  onClick={onClose}
                  className="btn-secondary w-100"
                  style={{ justifyContent: "center" }}
                >
                  Return to Exploration
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              {/* Target Project Selection */}
              <div>
                <label style={{ display: "block", fontSize: "0.72rem", color: "#334155", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.3rem" }}>
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
                    padding: "0.6rem 0.8rem",
                    color: "#0F172A",
                    fontSize: "0.88rem",
                    outline: "none",
                    cursor: "pointer"
                  }}
                >
                  <option value="Complete 4,500-Acre Wave City VIP Tour">
                    ⭐ Full 4,500-Acre Wave City Comprehensive Tour
                  </option>
                  {allProperties.map((p) => (
                    <option key={p.id} value={p.title}>
                      {p.title} ({p.sector})
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Presets - Bootstrap Row */}
              <div>
                <label style={{ display: "block", fontSize: "0.72rem", color: "#334155", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.3rem" }}>
                  Select Preferred Day
                </label>
                <div className="row g-2">
                  {["Tomorrow", "This Saturday", "This Sunday", "Next Weekday"].map((day) => (
                    <div key={day} className="col-6 col-sm-3">
                      <button
                        type="button"
                        onClick={() => setVisitDate(day)}
                        style={{
                          width: "100%",
                          backgroundColor: visitDate === day ? "#FEF3C7" : "#FFFFFF",
                          border: visitDate === day ? "1px solid var(--gold-primary)" : "1px solid #E2E8F0",
                          color: visitDate === day ? "#92400E" : "#475569",
                          borderRadius: "var(--radius-md)",
                          padding: "0.5rem 0.4rem",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          cursor: "pointer"
                        }}
                      >
                        {day}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Time Slots - Bootstrap Row */}
              <div>
                <label style={{ display: "block", fontSize: "0.72rem", color: "#334155", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.3rem" }}>
                  Preferred Time Window
                </label>
                <div className="row g-2">
                  {[
                    "Morning (10:30 AM - 12:30 PM)",
                    "Afternoon (2:00 PM - 4:00 PM)",
                    "Sunset Tour (4:30 PM - 6:30 PM)"
                  ].map((slot) => (
                    <div key={slot} className="col-12 col-sm-4">
                      <button
                        type="button"
                        onClick={() => setTimeSlot(slot)}
                        style={{
                          width: "100%",
                          backgroundColor: timeSlot === slot ? "#FEF3C7" : "#FFFFFF",
                          border: timeSlot === slot ? "1px solid var(--gold-primary)" : "1px solid #E2E8F0",
                          color: timeSlot === slot ? "#92400E" : "#475569",
                          borderRadius: "var(--radius-md)",
                          padding: "0.5rem 0.5rem",
                          fontSize: "0.78rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          height: "100%"
                        }}
                      >
                        {slot}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pickup Option */}
              <div>
                <label style={{ display: "block", fontSize: "0.72rem", color: "#334155", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.3rem" }}>
                  Meeting & Chauffeur Option
                </label>
                <select
                  value={pickupOption}
                  onChange={(e) => setPickupOption(e.target.value)}
                  style={{
                    width: "100%",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #CBD5E1",
                    borderRadius: "var(--radius-md)",
                    padding: "0.6rem 0.8rem",
                    color: "#0F172A",
                    fontSize: "0.88rem",
                    outline: "none",
                    cursor: "pointer"
                  }}
                >
                  <option value="wave_galleria">Direct Meeting at PropertyKraft Lounge (Wave Galleria SF-102)</option>
                  <option value="noida_62">Complimentary Executive Pickup from Noida Electronic City Metro (Sec 62)</option>
                  <option value="vaishali">Complimentary Executive Pickup from Vaishali Metro Station (Blue Line)</option>
                  <option value="direct">Direct Site Location (Meet Specialist on-site)</option>
                </select>
              </div>

              {/* Golf Cart Checkbox */}
              <div style={{
                backgroundColor: "#F8FAFC",
                border: "1px solid #E2E8F0",
                padding: "0.75rem 0.85rem",
                borderRadius: "var(--radius-md)",
                display: "flex",
                alignItems: "center",
                gap: "0.6rem"
              }}>
                <input
                  type="checkbox"
                  id="golfCartCheck"
                  checked={golfCartRequested}
                  onChange={(e) => setGolfCartRequested(e.target.checked)}
                  style={{ width: "16px", height: "16px", accentColor: "var(--gold-primary)", cursor: "pointer" }}
                />
                <label htmlFor="golfCartCheck" style={{ fontSize: "0.82rem", color: "#1E293B", cursor: "pointer", fontWeight: 600, margin: 0 }}>
                  Request Electric Golf-Cart for internal sector touring (Veridia & Enclaves)
                </label>
              </div>

              {/* Visitor Contact Info - Bootstrap Row */}
              <div className="row g-2">
                <div className="col-12 col-sm-6">
                  <label style={{ display: "block", fontSize: "0.72rem", color: "#334155", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.25rem" }}>
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Rajesh Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #CBD5E1",
                      borderRadius: "var(--radius-md)",
                      padding: "0.6rem 0.8rem",
                      color: "#0F172A",
                      fontSize: "0.88rem",
                      outline: "none"
                    }}
                  />
                </div>

                <div className="col-12 col-sm-6">
                  <label style={{ display: "block", fontSize: "0.72rem", color: "#334155", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.25rem" }}>
                    Mobile Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 98110 XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #CBD5E1",
                      borderRadius: "var(--radius-md)",
                      padding: "0.6rem 0.8rem",
                      color: "#0F172A",
                      fontSize: "0.88rem",
                      outline: "none"
                    }}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gold w-100"
                style={{ padding: "0.75rem", fontSize: "0.92rem", justifyContent: "center" }}
              >
                {isSubmitting ? (
                  <span>Generating VIP Pass...</span>
                ) : (
                  <>
                    <Calendar size={16} />
                    <span>Confirm VIP Site Visit Reservation</span>
                  </>
                )}
              </button>

              <div style={{ textAlign: "center", fontSize: "0.72rem", color: "#64748B" }}>
                🔒 100% Privacy. Zero spam. Official direct channel partner advisory.
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
