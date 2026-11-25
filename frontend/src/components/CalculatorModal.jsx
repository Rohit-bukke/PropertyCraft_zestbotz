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
  const [annualGrowthRate, setAnnualGrowthRate] = useState(11.5); // Historical Wave City / DME CAGR
  const [holdingPeriod, setHoldingPeriod] = useState(5);

  // Calculate EMI dynamically
  const emiCalculations = useMemo(() => {
    const downPayment = (downPaymentPct / 100) * propertyPrice;
    const loanAmount = Math.max(0, propertyPrice - downPayment);
    const monthlyRate = (interestRate / 12) / 100;
    const totalMonths = tenureYears * 12;

    if (loanAmount <= 0 || monthlyRate <= 0) {
      return { monthlyEmi: 0, totalInterest: 0, totalPayable: loanAmount, loanAmount, downPayment };
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

    // Cumulative rental income with 5% annual escalation
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
        className="animate-fade-in"
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
        {/* Header - Clean White */}
        <div style={{
          padding: "1.5rem 1.75rem",
          borderBottom: "1px solid #E2E8F0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#FFFFFF"
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--gold-primary)", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase" }}>
              <Calculator size={15} />
              PropTech Financial Suite
            </div>
            <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.35rem", color: "#0F172A", marginTop: "0.2rem" }}>
              {propertyTitle ? `${propertyTitle} Financial Planner` : "Wave City Investment & EMI Suite"}
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

        {/* Tab Switcher - Light */}
        <div style={{
          display: "flex",
          padding: "0.75rem 1.75rem 0",
          borderBottom: "1px solid #E2E8F0",
          gap: "1.5rem"
        }}>
          <button
            onClick={() => setActiveTab("emi")}
            style={{
              background: "none",
              border: "none",
              paddingBottom: "0.75rem",
              borderBottom: activeTab === "emi" ? "2px solid var(--gold-primary)" : "2px solid transparent",
              color: activeTab === "emi" ? "#0F172A" : "#64748B",
              fontWeight: 700,
              fontSize: "0.95rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.45rem"
            }}
          >
            <Calculator size={16} color={activeTab === "emi" ? "var(--gold-primary)" : "#64748B"} />
            Home Loan EMI Calculator
          </button>

          <button
            onClick={() => setActiveTab("roi")}
            style={{
              background: "none",
              border: "none",
              paddingBottom: "0.75rem",
              borderBottom: activeTab === "roi" ? "2px solid var(--gold-primary)" : "2px solid transparent",
              color: activeTab === "roi" ? "#0F172A" : "#64748B",
              fontWeight: 700,
              fontSize: "0.95rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.45rem"
            }}
          >
            <TrendingUp size={16} color={activeTab === "roi" ? "var(--gold-primary)" : "#64748B"} />
            Wave City ROI & Appreciation Simulator
          </button>
        </div>

        {/* Tab Content */}
        <div style={{ padding: "1.75rem", backgroundColor: "#FFFFFF" }}>
          {activeTab === "emi" ? (
            /* ============= EMI CALCULATOR ============= */
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
              {/* Controls Column */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.35rem" }}>
                {/* Property Price Slider */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                    <span style={{ fontSize: "0.85rem", color: "#475569", fontWeight: 600 }}>Property Cost</span>
                    <span style={{ fontSize: "0.95rem", color: "#0F172A", fontWeight: 800 }}>
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
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#64748B", marginTop: "4px" }}>
                    <span>₹25 Lakh</span>
                    <span>₹4.5 Crore</span>
                  </div>
                </div>

                {/* Down Payment % Slider */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                    <span style={{ fontSize: "0.85rem", color: "#475569", fontWeight: 600 }}>Down Payment ({downPaymentPct}%)</span>
                    <span style={{ fontSize: "0.9rem", color: "#0F172A", fontWeight: 700 }}>
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
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#64748B", marginTop: "4px" }}>
                    <span>10% (Min)</span>
                    <span>50%</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                    <span style={{ fontSize: "0.85rem", color: "#475569", fontWeight: 600 }}>Interest Rate</span>
                    <span style={{ fontSize: "0.9rem", color: "#0F172A", fontWeight: 700 }}>
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
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#64748B", marginTop: "4px" }}>
                    <span>7.0% (Prime SBI/HDFC)</span>
                    <span>12.0%</span>
                  </div>
                </div>

                {/* Loan Tenure */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                    <span style={{ fontSize: "0.85rem", color: "#475569", fontWeight: 600 }}>Loan Tenure</span>
                    <span style={{ fontSize: "0.9rem", color: "#0F172A", fontWeight: 700 }}>
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
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#64748B", marginTop: "4px" }}>
                    <span>5 Years</span>
                    <span>30 Years</span>
                  </div>
                </div>
              </div>

              {/* Live Output Card - Clean Light Styling */}
              <div style={{
                padding: "1.75rem",
                borderRadius: "var(--radius-lg)",
                backgroundColor: "#F8FAFC",
                border: "1px solid #E2E8F0",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
              }}>
                <div>
                  <div style={{ fontSize: "0.8rem", color: "var(--gold-primary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Estimated Monthly Repayment
                  </div>
                  <div style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "2.4rem",
                    fontWeight: 800,
                    color: "#0F172A",
                    margin: "0.4rem 0 1.25rem",
                    letterSpacing: "-0.02em"
                  }}>
                    {formatINR(emiCalculations.monthlyEmi)}
                    <span style={{ fontSize: "0.95rem", color: "#64748B", fontWeight: 500 }}> / month</span>
                  </div>

                  {/* Visual Proportion Bar */}
                  <div style={{ marginBottom: "1.25rem" }}>
                    <div style={{ height: "8px", borderRadius: "4px", backgroundColor: "#E2E8F0", display: "flex", overflow: "hidden" }}>
                      <div style={{ width: `${emiCalculations.principalShare}%`, backgroundColor: "var(--gold-primary)" }} title="Principal" />
                      <div style={{ width: `${emiCalculations.interestShare}%`, backgroundColor: "#94A3B8" }} title="Interest" />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", marginTop: "0.35rem", fontWeight: 600 }}>
                      <span style={{ color: "var(--gold-primary)" }}>● Principal ({emiCalculations.principalShare}%)</span>
                      <span style={{ color: "#64748B" }}>● Interest ({emiCalculations.interestShare}%)</span>
                    </div>
                  </div>

                  {/* Summary Rows */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.85rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "#475569" }}>
                      <span>Principal Loan Amount:</span>
                      <strong style={{ color: "#0F172A" }}>{formatINR(emiCalculations.loanAmount)}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "#475569" }}>
                      <span>Total Interest Payable:</span>
                      <strong style={{ color: "var(--gold-primary)" }}>{formatINR(emiCalculations.totalInterest)}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "#475569", borderTop: "1px solid #E2E8F0", paddingTop: "0.6rem" }}>
                      <span>Total Amount Payable:</span>
                      <strong style={{ color: "#0F172A" }}>{formatINR(emiCalculations.totalPayable)}</strong>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: "1.5rem" }}>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenSiteVisit(propertyTitle ? { title: propertyTitle } : null);
                    }}
                    className="btn-gold"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    <Calendar size={16} />
                    Apply with Pre-Approved Bank Loan
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ============= ROI SIMULATOR ============= */
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
              {/* Controls */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.35rem" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                    <span style={{ fontSize: "0.85rem", color: "#475569", fontWeight: 600 }}>Initial Purchase Price</span>
                    <span style={{ fontSize: "0.95rem", color: "#0F172A", fontWeight: 800 }}>
                      {formatINR(roiPurchasePrice)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3000000"
                    max="40000000"
                    step="500000"
                    value={roiPurchasePrice}
                    onChange={(e) => setRoiPurchasePrice(Number(e.target.value))}
                  />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                    <span style={{ fontSize: "0.85rem", color: "#475569", fontWeight: 600 }}>Expected Monthly Rental</span>
                    <span style={{ fontSize: "0.9rem", color: "#0F172A", fontWeight: 700 }}>
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
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                    <span style={{ fontSize: "0.85rem", color: "#475569", fontWeight: 600 }}>Projected Annual Appreciation</span>
                    <span style={{ fontSize: "0.9rem", color: "var(--gold-primary)", fontWeight: 800 }}>
                      {annualGrowthRate}% p.a.
                    </span>
                  </div>
                  <input
                    type="range"
                    min="8.0"
                    max="18.0"
                    step="0.5"
                    value={annualGrowthRate}
                    onChange={(e) => setAnnualGrowthRate(Number(e.target.value))}
                  />
                  <div style={{ fontSize: "0.75rem", color: "#64748B", marginTop: "4px" }}>
                    *Wave City / DME corridor has historically compounded at 11.2% - 14.5% p.a.
                  </div>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                    <span style={{ fontSize: "0.85rem", color: "#475569", fontWeight: 600 }}>Holding Horizon</span>
                    <span style={{ fontSize: "0.9rem", color: "#0F172A", fontWeight: 700 }}>
                      {holdingPeriod} Years
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="10"
                    step="1"
                    value={holdingPeriod}
                    onChange={(e) => setHoldingPeriod(Number(e.target.value))}
                  />
                </div>
              </div>

              {/* ROI Output - Light Surface */}
              <div style={{
                padding: "1.75rem",
                borderRadius: "var(--radius-lg)",
                backgroundColor: "#F8FAFC",
                border: "1px solid #E2E8F0",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
              }}>
                <div>
                  <div style={{ fontSize: "0.8rem", color: "var(--gold-primary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Projected Property Worth (In {holdingPeriod} Yrs)
                  </div>
                  <div style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "2.3rem",
                    fontWeight: 800,
                    color: "#0F172A",
                    margin: "0.4rem 0 1.25rem",
                    letterSpacing: "-0.02em"
                  }}>
                    {formatINR(roiCalculations.projectedValue)}
                  </div>

                  <div style={{
                    backgroundColor: "#DCFCE7",
                    border: "1px solid #BBF7D0",
                    borderRadius: "var(--radius-md)",
                    padding: "0.85rem 1rem",
                    marginBottom: "1.25rem"
                  }}>
                    <div style={{ fontSize: "0.8rem", color: "#166534", fontWeight: 600 }}>Estimated Net Gain (Capital + Rent):</div>
                    <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "#15803D" }}>
                      +{formatINR(roiCalculations.netProfit)}
                      <span style={{ fontSize: "0.85rem", color: "#166534", marginLeft: "0.5rem" }}>
                        ({roiCalculations.totalRoiPct}% Total ROI)
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem", fontSize: "0.85rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "#475569" }}>
                      <span>Pure Capital Appreciation:</span>
                      <strong style={{ color: "#0F172A" }}>+{formatINR(roiCalculations.capitalAppreciation)}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "#475569" }}>
                      <span>Total Cumulative Rent Earned:</span>
                      <strong style={{ color: "#0F172A" }}>+{formatINR(roiCalculations.totalRental)}</strong>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: "1.5rem" }}>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenSiteVisit(propertyTitle ? { title: propertyTitle } : null);
                    }}
                    className="btn-gold"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    <span>Request Verified Investment Deck</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
