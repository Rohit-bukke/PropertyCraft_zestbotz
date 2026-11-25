import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["service"] == "PropertyKraft"
    assert "Wave City" in data["location"]

def test_get_all_properties():
    response = client.get("/api/v1/properties")
    assert response.status_code == 200
    props = response.json()
    assert len(props) >= 5
    assert any(p["slug"] == "wave-veridia-oakwood-enclave" for p in props)

def test_filter_properties_category():
    response = client.get("/api/v1/properties?category=Villas")
    assert response.status_code == 200
    props = response.json()
    assert len(props) > 0
    assert all(p["category"] == "Villas" for p in props)

def test_filter_properties_search():
    response = client.get("/api/v1/properties?search=Eligo")
    assert response.status_code == 200
    props = response.json()
    assert len(props) >= 1
    assert "Eligo" in props[0]["title"]

def test_get_property_by_slug():
    response = client.get("/api/v1/properties/wave-veridia-oakwood-enclave")
    assert response.status_code == 200
    prop = response.json()
    assert prop["title"] == "Wave Veridia"
    assert len(prop["floor_plans"]) >= 2
    assert len(prop["amenities"]) >= 4

def test_compare_properties():
    response = client.get("/api/v1/properties/compare?ids=wave-veridia-oakwood-enclave,wave-eligo-smart-homes")
    assert response.status_code == 200
    props = response.json()
    assert len(props) == 2

def test_get_categories():
    response = client.get("/api/v1/categories")
    assert response.status_code == 200
    cats = response.json()
    assert len(cats) == 4
    cat_names = [c["name"] for c in cats]
    assert any("Apartments" in name for name in cat_names)
    assert any("Plots" in name for name in cat_names)

def test_emi_calculator():
    payload = {
        "property_price": 10000000,
        "down_payment_pct": 20,
        "interest_rate_pct": 8.5,
        "tenure_years": 20
    }
    response = client.post("/api/v1/calculator/emi", json=payload)
    assert response.status_code == 200
    res = response.json()
    assert res["loan_amount"] == 8000000
    assert res["monthly_emi"] > 0
    assert len(res["amortization_summary_5yr"]) == 5

def test_roi_calculator():
    payload = {
        "purchase_price": 10000000,
        "expected_rental_monthly": 35000,
        "annual_appreciation_pct": 11.5,
        "holding_period_years": 5
    }
    response = client.post("/api/v1/calculator/roi", json=payload)
    assert response.status_code == 200
    res = response.json()
    assert res["projected_property_value"] > 10000000
    assert res["total_roi_pct"] > 50

def test_submit_site_visit_enquiry():
    payload = {
        "name": "Kabir Mehta",
        "phone": "+919876543210",
        "email": "kabir@example.com",
        "property_title": "Wave Veridia",
        "enquiry_type": "site_visit",
        "preferred_date": "This Saturday",
        "preferred_time_slot": "Morning (10:30 AM - 12:30 PM)"
    }
    response = client.post("/api/v1/enquiries", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert "PK-VISIT" in data["reference_id"]
