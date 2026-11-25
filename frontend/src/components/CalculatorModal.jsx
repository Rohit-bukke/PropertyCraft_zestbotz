import React, { useState, useMemo } from "react";
import { 
  X, 
  Calculator, 
  TrendingUp, 
  Percent, 
  IndianRupee, 
  HelpCircle, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar
} from "lucide-react";

export default function CalculatorModal({
  isOpen = false,
  onClose,
  initialPrice = 9800000,
  propertyTitle = null,
  onOpenSiteVisit
}) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState("emi"); // 'emi' or 'roi'

  // EMI Calculator States
  const [propertyPrice, setPropertyPrice] = useState(initialPrice);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  // ROI Calculator States
  const [roiPurchasePrice, setRoiPurchasePrice] = useState(initialPrice);
  const [monthlyRent, setMonthlyRent] = useState(Math.round((initialPrice * 0.0035) / 1000) * 1000 || 35000);
  const [annualGrowthRate, setAnnualGrowthRate] = useState(11.5);
  const [holdingPeriod, setHoldingPeriod] = useState(5);

  // Calculate EMI dynamically
  const emiCalculations = useMemo(() => {
    const downPayment = (downPaymentPct / 100) * propertyPrice;
    const loanAmount = Math.max(0, propertyPrice - downPayment);
    const monthlyRate = (interestRate / 12) / 100;
    const totalMonths = tenureYears * 12;

    if (loanAmount <= 0 || monthlyRate <= 0) {
      return { monthlyEmi: 0, totalInterest: 0, totalPayable: loanAmount, loanAmount, downPayment, principalShare: 50, interestShare: 50 };
    }

    const factor = Math.pow(1 + monthlyRate, totalMonths);
    const monthlyEmi = (loanAmount * monthlyRate * factor) / (factor - 1);
    const totalPayable = monthlyEmi * totalMonths;
    const totalInterest = totalPayable - loanAmount;

    return {
      downPayment,
      loanAmount,
      monthlyEmi: Math.round(monthlyEmi),
      totalInterest: Math.round(totalInterest),
      totalPayable: Math.round(totalPayable),
      principalShare: Math.round((loanAmount / totalPayable) * 100),
      interestShare: Math.round((totalInterest / totalPayable) * 100)
    };
  }, [propertyPrice, downPaymentPct, interestRate, tenureYears]);

  // Calculate ROI dynamically
  const roiCalculations = useMemo(() => {
    const rate = annualGrowthRate / 100;
    const projectedValue = Math.round(roiPurchasePrice * Math.pow(1 + rate, holdingPeriod));
    const capitalAppreciation = projectedValue - roiPurchasePrice;

    let totalRental = 0;
    let currentRent = monthlyRent;
    for (let y = 0; y < holdingPeriod; y++) {
      totalRental += currentRent * 12;
      currentRent *= 1.05;
    }
    totalRental = Math.round(totalRental);

    const netProfit = capitalAppreciation + totalRental;
    const totalRoiPct = Math.round((netProfit / roiPurchasePrice) * 100);

    return {
      projectedValue,
      capitalAppreciation,
      totalRental,
      netProfit,
      totalRoiPct
    };
  }, [roiPurchasePrice, monthlyRent, annualGrowthRate, holdingPeriod]);

  const formatINR = (val) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="modal-overlay">
      <div 
        className="animate-fade-in modal-dialog-responsive"
        style={{
          width: "100%",
          maxWidth: "760px",
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
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--gold-primary)", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase" }}>
              <Calculator size={14} />
              PropTech Financial Suite
            </div>
            <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(1.15rem, 2.5vw, 1.35rem)", color: "#0F172A", marginTop: "0.2rem", margin: 0 }}>
              {propertyTitle ? `${propertyTitle} Financial Planner` : "Wave City Investment & EMI Suite"}
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close calculator"
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

        {/* Tab Switcher (Scrollable on small devices) */}
        <div className="d-flex overflow-auto flex-nowrap border-bottom px-3 px-md-4 gap-3 gap-md-4" style={{ scrollbarWidth: "none" }}>
          <button
            onClick={() => setActiveTab("emi")}
            style={{
              background: "none",
              border: "none",
              padding: "0.75rem 0",
              borderBottom: activeTab === "emi" ? "2px solid var(--gold-primary)" : "2px solid transparent",
              color: activeTab === "emi" ? "#0F172A" : "#64748B",
              fontWeight: 700,
              fontSize: "0.9rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              whiteSpace: "nowrap",
              flexShrink: 0
            }}
          >
            <Calculator size={15} color={activeTab === "emi" ? "var(--gold-primary)" : "#64748B"} />
            Home Loan EMI Calculator
          </button>

          <button
            onClick={() => setActiveTab("roi")}
            style={{
              background: "none",
              border: "none",
              padding: "0.75rem 0",
              borderBottom: activeTab === "roi" ? "2px solid var(--gold-primary)" : "2px solid transparent",
              color: activeTab === "roi" ? "#0F172A" : "#64748B",
              fontWeight: 700,
              fontSize: "0.9rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              whiteSpace: "nowrap",
              flexShrink: 0
            }}
          >
            <TrendingUp size={15} color={activeTab === "roi" ? "var(--gold-primary)" : "#64748B"} />
            Wave City ROI & Appreciation
          </button>
        </div>

        {/* Tab Content Body - Bootstrap Row */}
        <div style={{ padding: "1.25rem", backgroundColor: "#FFFFFF" }}>
          {activeTab === "emi" ? (
            /* ============= EMI CALCULATOR ============= */
            <div className="row g-4">
              {/* Controls Column */}
              <div className="col-12 col-md-6 d-flex flex-column gap-3">
                {/* Property Price Slider */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                    <span style={{ fontSize: "0.82rem", color: "#475569", fontWeight: 600 }}>Property Cost</span>
                    <span style={{ fontSize: "0.92rem", color: "#0F172A", fontWeight: 800 }}>
                      {formatINR(propertyPrice)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2500000"
                    max="45000000"
                    step="250000"
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(Number(e.target.value))}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#64748B", marginTop: "4px" }}>
                    <span>₹25 Lakh</span>
                    <span>₹4.5 Crore</span>
                  </div>
                </div>

                {/* Down Payment % Slider */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                    <span style={{ fontSize: "0.82rem", color: "#475569", fontWeight: 600 }}>Down Payment ({downPaymentPct}%)</span>
                    <span style={{ fontSize: "0.88rem", color: "#0F172A", fontWeight: 700 }}>
                      {formatINR(emiCalculations.downPayment)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    step="5"
                    value={downPaymentPct}
                    onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#64748B", marginTop: "4px" }}>
                    <span>10% (Min)</span>
                    <span>50%</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                    <span style={{ fontSize: "0.82rem", color: "#475569", fontWeight: 600 }}>Interest Rate</span>
                    <span style={{ fontSize: "0.88rem", color: "#0F172A", fontWeight: 700 }}>
                      {interestRate}% p.a.
                    </span>
                  </div>
                  <input
                    type="range"
                    min="7.0"
                    max="12.0"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#64748B", marginTop: "4px" }}>
                    <span>7.0% (Prime)</span>
                    <span>12.0%</span>
                  </div>
                </div>

                {/* Loan Tenure */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                    <span style={{ fontSize: "0.82rem", color: "#475569", fontWeight: 600 }}>Loan Tenure</span>
                    <span style={{ fontSize: "0.88rem", color: "#0F172A", fontWeight: 700 }}>
                      {tenureYears} Years ({tenureYears * 12} Mos)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#64748B", marginTop: "4px" }}>
                    <span>5 Years</span>
                    <span>30 Years</span>
                  </div>
                </div>
              </div>

              {/* Live Output Card */}
              <div className="col-12 col-md-6">
                <div style={{
                  padding: "1.25rem",
                  borderRadius: "var(--radius-lg)",
                  backgroundColor: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
                }}>
                  <div>
                    <div style={{ fontSize: "0.76rem", color: "var(--gold-primary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      Estimated Monthly Repayment
                    </div>
                    <div style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "clamp(1.8rem, 4vw, 2.3rem)",
                      fontWeight: 800,
                      color: "#0F172A",
                      margin: "0.35rem 0 1rem",
                      letterSpacing: "-0.02em"
                    }}>
                      {formatINR(emiCalculations.monthlyEmi)}
                      <span style={{ fontSize: "0.85rem", color: "#64748B", fontWeight: 500 }}> / mo</span>
                    </div>

                    {/* Visual Proportion Bar */}
                    <div style={{ marginBottom: "1rem" }}>
                      <div style={{ height: "8px", borderRadius: "4px", backgroundColor: "#E2E8F0", display: "flex", overflow: "hidden" }}>
                        <div style={{ width: `${emiCalculations.principalShare}%`, backgroundColor: "var(--gold-primary)" }} title="Principal" />
                        <div style={{ width: `${emiCalculations.interestShare}%`, backgroundColor: "#94A3B8" }} title="Interest" />
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginTop: "0.35rem", fontWeight: 600 }}>
                        <span style={{ color: "var(--gold-primary)" }}>● Principal ({emiCalculations.principalShare}%)</span>
                        <span style={{ color: "#64748B" }}>● Interest ({emiCalculations.interestShare}%)</span>
                      </div>
                    </div>

                    {/* Summary Rows */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.82rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", color: "#475569" }}>
                        <span>Principal Loan Amount:</span>
                        <strong style={{ color: "#0F172A" }}>{formatINR(emiCalculations.loanAmount)}</strong>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", color: "#475569" }}>
                        <span>Total Interest Payable:</span>
                        <strong style={{ color: "var(--gold-primary)" }}>{formatINR(emiCalculations.totalInterest)}</strong>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", color: "#475569", borderTop: "1px solid #E2E8F0", paddingTop: "0.5rem" }}>
                        <span>Total Amount Payable:</span>
                        <strong style={{ color: "#0F172A" }}>{formatINR(emiCalculations.totalPayable)}</strong>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: "1.25rem" }}>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenSiteVisit(propertyTitle ? { title: propertyTitle } : null);
                      }}
                      className="btn-gold w-100"
                      style={{ justifyContent: "center", fontSize: "0.85rem", padding: "0.65rem" }}
                    >
                      <Calendar size={15} />
                      Apply for Pre-Approved Loan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ============= ROI SIMULATOR ============= */
            <div className="row g-4">
              {/* Controls */}
              <div className="col-12 col-md-6 d-flex flex-column gap-3">
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                    <span style={{ fontSize: "0.82rem", color: "#475569", fontWeight: 600 }}>Initial Purchase Price</span>
                    <span style={{ fontSize: "0.88rem", color: "#0F172A", fontWeight: 700 }}>
                      {formatINR(roiPurchasePrice)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3000000"
                    max="45000000"
                    step="500000"
                    value={roiPurchasePrice}
                    onChange={(e) => setRoiPurchasePrice(Number(e.target.value))}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#64748B", marginTop: "4px" }}>
                    <span>₹30 Lakh</span>
                    <span>₹4.5 Crore</span>
                  </div>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                    <span style={{ fontSize: "0.82rem", color: "#475569", fontWeight: 600 }}>Expected Monthly Rental</span>
                    <span style={{ fontSize: "0.88rem", color: "#0F172A", fontWeight: 700 }}>
                      {formatINR(monthlyRent)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="15000"
                    max="150000"
                    step="2000"
                    value={monthlyRent}
                    onChange={(e) => setMonthlyRent(Number(e.target.value))}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#64748B", marginTop: "4px" }}>
                    <span>₹15,000</span>
                    <span>₹1.5 Lakh</span>
                  </div>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                    <span style={{ fontSize: "0.82rem", color: "#475569", fontWeight: 600 }}>Annual Capital Appreciation</span>
                    <span style={{ fontSize: "0.88rem", color: "#0F172A", fontWeight: 700 }}>
                      {annualGrowthRate}% CAGR
                    </span>
                  </div>
                  <input
                    type="range"
                    min="6.0"
                    max="18.0"
                    step="0.5"
                    value={annualGrowthRate}
                    onChange={(e) => setAnnualGrowthRate(Number(e.target.value))}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#64748B", marginTop: "4px" }}>
                    <span>6% (Conservative)</span>
                    <span>18% (High Growth DME)</span>
                  </div>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                    <span style={{ fontSize: "0.82rem", color: "#475569", fontWeight: 600 }}>Investment Horizon</span>
                    <span style={{ fontSize: "0.88rem", color: "#0F172A", fontWeight: 700 }}>
                      {holdingPeriod} Years
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="15"
                    step="1"
                    value={holdingPeriod}
                    onChange={(e) => setHoldingPeriod(Number(e.target.value))}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#64748B", marginTop: "4px" }}>
                    <span>3 Years</span>
                    <span>15 Years</span>
                  </div>
                </div>
              </div>

              {/* ROI Output Card */}
              <div className="col-12 col-md-6">
                <div style={{
                  padding: "1.25rem",
                  borderRadius: "var(--radius-lg)",
                  backgroundColor: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
                }}>
                  <div>
                    <div style={{ fontSize: "0.76rem", color: "#16A34A", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      Estimated Portfolio Value in {holdingPeriod} Years
                    </div>
                    <div style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "clamp(1.8rem, 4vw, 2.3rem)",
                      fontWeight: 800,
                      color: "#0F172A",
                      margin: "0.35rem 0 1rem",
                      letterSpacing: "-0.02em"
                    }}>
                      {formatINR(roiCalculations.projectedValue)}
                    </div>

                    <div style={{
                      backgroundColor: "#DCFCE7",
                      padding: "0.6rem 0.85rem",
                      borderRadius: "var(--radius-md)",
                      marginBottom: "1rem",
                      border: "1px solid #86EFAC",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}>
                      <span style={{ color: "#166534", fontSize: "0.82rem", fontWeight: 600 }}>Total Net Returns:</span>
                      <strong style={{ color: "#14532D", fontSize: "1.1rem", fontWeight: 800 }}>+{roiCalculations.totalRoiPct}%</strong>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.82rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", color: "#475569" }}>
                        <span>Capital Appreciation:</span>
                        <strong style={{ color: "#0F172A" }}>+{formatINR(roiCalculations.capitalAppreciation)}</strong>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", color: "#475569" }}>
                        <span>Cumulative Rental Gain:</span>
                        <strong style={{ color: "var(--gold-primary)" }}>+{formatINR(roiCalculations.totalRental)}</strong>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", color: "#475569", borderTop: "1px solid #E2E8F0", paddingTop: "0.5rem" }}>
                        <span>Net Profit Created:</span>
                        <strong style={{ color: "#15803D" }}>+{formatINR(roiCalculations.netProfit)}</strong>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: "1.25rem" }}>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenSiteVisit(propertyTitle ? { title: propertyTitle } : null);
                      }}
                      className="btn-gold w-100"
                      style={{ justifyContent: "center", fontSize: "0.85rem", padding: "0.65rem" }}
                    >
                      <Sparkles size={15} />
                      Consult Wealth Strategist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
