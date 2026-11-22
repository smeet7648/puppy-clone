const API_BASE = '/api';

export const api = {
  // Public
  async getPuppies(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/puppies${query ? `?${query}` : ''}`);
    return await res.json();
  },

  async getPuppyBySlug(slug) {
    const res = await fetch(`${API_BASE}/puppies/${slug}`);
    return await res.json();
  },

  async getHappyFamilies() {
    const res = await fetch(`${API_BASE}/happy-families`);
    return await res.json();
  },

  async getTestimonials() {
    const res = await fetch(`${API_BASE}/testimonials`);
    return await res.json();
  },

  async getFAQs() {
    const res = await fetch(`${API_BASE}/faqs`);
    return await res.json();
  },

  async getSettings() {
    const res = await fetch(`${API_BASE}/settings`);
    return await res.json();
  },

  async sendEnquiry(data) {
    const res = await fetch(`${API_BASE}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  // Admin
  async adminLogin(email, password) {
    const res = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return await res.json();
  },

  async getAdminMe(token) {
    const res = await fetch(`${API_BASE}/admin/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return await res.json();
  },

  async adminGetPuppies(token) {
    const res = await fetch(`${API_BASE}/admin/puppies`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return await res.json();
  },

  async adminCreatePuppy(data, token) {
    const res = await fetch(`${API_BASE}/admin/puppies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  async adminUpdatePuppy(id, data, token) {
    const res = await fetch(`${API_BASE}/admin/puppies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  async adminDeletePuppy(id, token) {
    const res = await fetch(`${API_BASE}/admin/puppies/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    return await res.json();
  },

  async adminCreateHappyFamily(data, token) {
    const res = await fetch(`${API_BASE}/admin/happy-families`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  async adminUpdateHappyFamily(id, data, token) {
    const res = await fetch(`${API_BASE}/admin/happy-families/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  async adminDeleteHappyFamily(id, token) {
    const res = await fetch(`${API_BASE}/admin/happy-families/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    return await res.json();
  },

  async adminCreateFAQ(data, token) {
    const res = await fetch(`${API_BASE}/admin/faqs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  async adminUpdateFAQ(id, data, token) {
    const res = await fetch(`${API_BASE}/admin/faqs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  async adminDeleteFAQ(id, token) {
    const res = await fetch(`${API_BASE}/admin/faqs/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    return await res.json();
  },

  async adminCreateTestimonial(data, token) {
    const res = await fetch(`${API_BASE}/admin/testimonials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  async adminUpdateTestimonial(id, data, token) {
    const res = await fetch(`${API_BASE}/admin/testimonials/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  async adminDeleteTestimonial(id, token) {
    const res = await fetch(`${API_BASE}/admin/testimonials/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    return await res.json();
  },

  async adminUpdateSettings(data, token) {
    const res = await fetch(`${API_BASE}/admin/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  async adminGetEnquiries(token) {
    const res = await fetch(`${API_BASE}/admin/enquiries`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return await res.json();
  },

  async adminUpdateEnquiryStatus(id, status, token) {
    const res = await fetch(`${API_BASE}/admin/enquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status })
    });
    return await res.json();
  },

  async adminUploadFile(file, token) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API_BASE}/admin/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });
    return await res.json();
  }
};
