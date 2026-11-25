import math
from fastapi import APIRouter
from app.models.calculator import (
    EMICalculatorRequest,
    EMICalculatorResponse,
    ROICalculatorRequest,
    ROICalculatorResponse
)

router = APIRouter()

@router.post("/emi", response_model=EMICalculatorResponse)
def calculate_emi(data: EMICalculatorRequest):
    """
    Calculate Monthly EMI, total interest, and 5-year repayment summary.
    Formula: EMI = [P x r x (1+r)^n] / [(1+r)^n - 1]
    """
    down_payment = (data.down_payment_pct / 100.0) * data.property_price
    loan_amount = max(0.0, data.property_price - down_payment)

    if loan_amount <= 0 or data.tenure_years <= 0 or data.interest_rate_pct <= 0:
        return EMICalculatorResponse(
            property_price=data.property_price,
            loan_amount=loan_amount,
            down_payment=down_payment,
            interest_rate_pct=data.interest_rate_pct,
            tenure_years=data.tenure_years,
            monthly_emi=0.0,
            total_interest=0.0,
            total_amount_payable=loan_amount,
            amortization_summary_5yr=[]
        )

    monthly_rate = (data.interest_rate_pct / 12.0) / 100.0
    total_months = data.tenure_years * 12

    factor = math.pow(1 + monthly_rate, total_months)
    monthly_emi = (loan_amount * monthly_rate * factor) / (factor - 1)
    total_payable = monthly_emi * total_months
    total_interest = total_payable - loan_amount

    # Generate 5-year amortization preview
    amortization_summary = []
    current_balance = loan_amount
    for year in range(1, min(6, data.tenure_years + 1)):
        interest_paid_year = 0.0
        principal_paid_year = 0.0
        for _ in range(12):
            monthly_interest = current_balance * monthly_rate
            monthly_principal = monthly_emi - monthly_interest
            interest_paid_year += monthly_interest
            principal_paid_year += monthly_principal
            current_balance = max(0.0, current_balance - monthly_principal)
        
        amortization_summary.append({
            "year": year,
            "principal_paid": round(principal_paid_year, 2),
            "interest_paid": round(interest_paid_year, 2),
            "remaining_balance": round(current_balance, 2)
        })

    return EMICalculatorResponse(
        property_price=round(data.property_price, 2),
        loan_amount=round(loan_amount, 2),
        down_payment=round(down_payment, 2),
        interest_rate_pct=data.interest_rate_pct,
        tenure_years=data.tenure_years,
        monthly_emi=round(monthly_emi, 2),
        total_interest=round(total_interest, 2),
        total_amount_payable=round(total_payable, 2),
        amortization_summary_5yr=amortization_summary
    )

@router.post("/roi", response_model=ROICalculatorResponse)
def calculate_roi(data: ROICalculatorRequest):
    """
    Simulate multi-year capital growth and rental returns for Wave City / NH-24 corridor.
    """
    years = max(1, data.holding_period_years)
    rate = data.annual_appreciation_pct / 100.0

    # Compound value: P * (1 + r)^n
    projected_value = data.purchase_price * math.pow(1 + rate, years)
    capital_appreciation = projected_value - data.purchase_price

    # Rental earnings over holding period with 5% annual rent escalation
    total_rental = 0.0
    current_rent = data.expected_rental_monthly
    for _ in range(years):
        annual_rent = (current_rent * 12) - data.maintenance_annual
        total_rental += max(0.0, annual_rent)
        current_rent *= 1.05  # 5% annual escalation

    net_profit = capital_appreciation + total_rental
    total_roi_pct = (net_profit / data.purchase_price) * 100.0
    annualized_irr = ((math.pow((projected_value + total_rental) / data.purchase_price, 1 / years)) - 1) * 100.0

    return ROICalculatorResponse(
        initial_investment=round(data.purchase_price, 2),
        projected_property_value=round(projected_value, 2),
        capital_appreciation=round(capital_appreciation, 2),
        total_rental_earned=round(total_rental, 2),
        net_profit=round(net_profit, 2),
        total_roi_pct=round(total_roi_pct, 2),
        annualized_irr_pct=round(annualized_irr, 2)
    )
