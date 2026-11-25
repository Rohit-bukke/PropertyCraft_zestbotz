from fastapi import APIRouter
from app.api.v1.endpoints import properties, categories, enquiries, calculator, insights

api_router = APIRouter()

api_router.include_router(properties.router, prefix="/properties", tags=["Properties"])
api_router.include_router(categories.router, prefix="/categories", tags=["Categories"])
api_router.include_router(enquiries.router, prefix="/enquiries", tags=["Enquiries & Leads"])
api_router.include_router(calculator.router, prefix="/calculator", tags=["Financial Calculators"])
api_router.include_router(insights.router, prefix="/insights", tags=["Insights & Brand"])
