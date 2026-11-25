from typing import List
from pydantic import BaseModel

class EMICalculatorRequest(BaseModel):
    property_price: float
    down_payment_pct: float = 20.0  # default 20%
    interest_rate_pct: float = 8.5  # default 8.5%
    tenure_years: int = 20

class EMICalculatorResponse(BaseModel):
    property_price: float
    loan_amount: float
    down_payment: float
    interest_rate_pct: float
    tenure_years: int
    monthly_emi: float
    total_interest: float
    total_amount_payable: float
    amortization_summary_5yr: List[dict]

class ROICalculatorRequest(BaseModel):
    purchase_price: float
    expected_rental_monthly: float
    annual_appreciation_pct: float = 11.5  # Wave City / NH-24 historical CAGR
    holding_period_years: int = 5
    maintenance_annual: float = 35000.0

class ROICalculatorResponse(BaseModel):
    initial_investment: float
    projected_property_value: float
    capital_appreciation: float
    total_rental_earned: float
    net_profit: float
    total_roi_pct: float
    annualized_irr_pct: float
