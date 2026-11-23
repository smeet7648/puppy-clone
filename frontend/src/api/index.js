const rawApiUrl = import.meta.env.VITE_API_URL || '';
const API_BASE = rawApiUrl ? `${rawApiUrl.replace(/\/+$/, '')}/api` : '/api';

/**
 * Safe fetch helper that gracefully handles network failures,
 * non-JSON server error pages (e.g. 404 HTML from static hosts),
 * and avoids uncaught JSON parse crashes.
 */
async function safeFetchJson(url, options = {}) {
  try {
    const res = await fetch(url, options);
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await res.json();
      return data;
    }
    // Return friendly error object if response is HTML or text (e.g., 404/500 from proxy)
    return {
      success: false,
      status: res.status,
      message: `Server returned HTTP ${res.status}`
    };
  } catch (err) {
    return {
      success: false,
      message: err.message || 'Network request failed'
    };
  }
}

export const api = {
  // Public
  async getPuppies(params = {}) {
    const query = new URLSearchParams(params).toString();
    return await safeFetchJson(`${API_BASE}/puppies${query ? `?${query}` : ''}`);
  },

  async getPuppyBySlug(slug) {
    return await safeFetchJson(`${API_BASE}/puppies/${encodeURIComponent(slug)}`);
  },

  async getHappyFamilies() {
    return await safeFetchJson(`${API_BASE}/happy-families`);
  },

  async getTestimonials() {
    return await safeFetchJson(`${API_BASE}/testimonials`);
  },

  async getFAQs() {
    return await safeFetchJson(`${API_BASE}/faqs`);
  },

  async getSettings() {
    return await safeFetchJson(`${API_BASE}/settings`);
  },

  async sendEnquiry(data) {
    return await safeFetchJson(`${API_BASE}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  },

  // Admin
  async adminLogin(email, password) {
    return await safeFetchJson(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
  },

  async getAdminMe(token) {
    return await safeFetchJson(`${API_BASE}/admin/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async adminGetPuppies(token) {
    return await safeFetchJson(`${API_BASE}/admin/puppies`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async adminCreatePuppy(data, token) {
    return await safeFetchJson(`${API_BASE}/admin/puppies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
  },

  async adminUpdatePuppy(id, data, token) {
    return await safeFetchJson(`${API_BASE}/admin/puppies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
  },

  async adminDeletePuppy(id, token) {
    return await safeFetchJson(`${API_BASE}/admin/puppies/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async adminCreateHappyFamily(data, token) {
    return await safeFetchJson(`${API_BASE}/admin/happy-families`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data)
    });
  },

  async adminUpdateHappyFamily(id, data, token) {
    return await safeFetchJson(`${API_BASE}/admin/happy-families/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data)
    });
  },

  async adminDeleteHappyFamily(id, token) {
    return await safeFetchJson(`${API_BASE}/admin/happy-families/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async adminCreateFAQ(data, token) {
    return await safeFetchJson(`${API_BASE}/admin/faqs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data)
    });
  },

  async adminUpdateFAQ(id, data, token) {
    return await safeFetchJson(`${API_BASE}/admin/faqs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data)
    });
  },

  async adminDeleteFAQ(id, token) {
    return await safeFetchJson(`${API_BASE}/admin/faqs/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async adminCreateTestimonial(data, token) {
    return await safeFetchJson(`${API_BASE}/admin/testimonials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data)
    });
  },

  async adminUpdateTestimonial(id, data, token) {
    return await safeFetchJson(`${API_BASE}/admin/testimonials/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data)
    });
  },

  async adminDeleteTestimonial(id, token) {
    return await safeFetchJson(`${API_BASE}/admin/testimonials/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async adminUpdateSettings(data, token) {
    return await safeFetchJson(`${API_BASE}/admin/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data)
    });
  },

  async adminGetEnquiries(token) {
    return await safeFetchJson(`${API_BASE}/admin/enquiries`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async adminUpdateEnquiryStatus(id, status, token) {
    return await safeFetchJson(`${API_BASE}/admin/enquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status })
    });
  },

  async adminUploadFile(file, token) {
    const formData = new FormData();
    formData.append('file', file);
    return await safeFetchJson(`${API_BASE}/admin/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });
  }
};
