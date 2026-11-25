const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/v1";

export async function fetchProperties(params = {}) {
  const query = new URLSearchParams();
  if (params.category && params.category !== "All") query.append("category", params.category);
  if (params.location) query.append("location", params.location);
  if (params.bhk && params.bhk !== "All") query.append("bhk", params.bhk);
  if (params.min_price) query.append("min_price", params.min_price);
  if (params.max_price) query.append("max_price", params.max_price);
  if (params.construction_status && params.construction_status !== "All") query.append("construction_status", params.construction_status);
  if (params.search) query.append("search", params.search);
  if (params.featured) query.append("featured", "true");
  if (params.sort_by) query.append("sort_by", params.sort_by);

  const url = `${API_BASE_URL}/properties?${query.toString()}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch properties: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchPropertyBySlug(slug) {
  const response = await fetch(`${API_BASE_URL}/properties/${slug}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch property details: ${response.statusText}`);
  }
  return response.json();
}

export async function compareProperties(slugsOrIds = []) {
  if (!slugsOrIds.length) return [];
  const idsStr = slugsOrIds.join(",");
  const response = await fetch(`${API_BASE_URL}/properties/compare?ids=${encodeURIComponent(idsStr)}`);
  if (!response.ok) {
    throw new Error(`Failed to compare properties: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchCategories() {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`);
  }
  return response.json();
}

export async function submitEnquiry(data) {
  const response = await fetch(`${API_BASE_URL}/enquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Failed to submit enquiry: ${response.statusText}`);
  }
  return response.json();
}

export async function calculateEMI(data) {
  const response = await fetch(`${API_BASE_URL}/calculator/emi`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Failed to calculate EMI: ${response.statusText}`);
  }
  return response.json();
}

export async function calculateROI(data) {
  const response = await fetch(`${API_BASE_URL}/calculator/roi`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Failed to calculate ROI: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchBrandMeta() {
  const response = await fetch(`${API_BASE_URL}/insights/brand-meta`);
  if (!response.ok) {
    throw new Error(`Failed to fetch brand meta: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchTestimonials() {
  const response = await fetch(`${API_BASE_URL}/insights/testimonials`);
  if (!response.ok) {
    throw new Error(`Failed to fetch testimonials: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchFAQs() {
  const response = await fetch(`${API_BASE_URL}/insights/faqs`);
  if (!response.ok) {
    throw new Error(`Failed to fetch FAQs: ${response.statusText}`);
  }
  return response.json();
}
