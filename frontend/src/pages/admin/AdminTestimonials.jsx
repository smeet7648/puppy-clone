import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, X, Star } from 'lucide-react';
import { api } from '../../api';
import { useAuth } from '../../context/AuthContext';

export const AdminTestimonials = () => {
  const { token } = useAuth();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [form, setForm] = useState({ name: '', location: '', quote: '', featured: false, rating: 5 });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.getTestimonials();
      if (res.success) setTestimonials(res.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAdd = () => {
    setEditingItem(null);
    setForm({ name: '', location: 'Dubai, UAE', quote: '', featured: false, rating: 5 });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({ name: item.name, location: item.location, quote: item.quote, featured: Boolean(item.featured), rating: item.rating || 5 });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      const res = await api.adminDeleteTestimonial(id, token);
      if (res.success) {
        setTestimonials(prev => prev.filter(t => t._id !== id && t.id !== id));
      }
    } catch (e) {
      alert('Delete failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        const res = await api.adminUpdateTestimonial(editingItem._id || editingItem.id, form, token);
        if (res.success) {
          setModalOpen(false);
          fetchData();
        }
      } else {
        const res = await api.adminCreateTestimonial(form, token);
        if (res.success) {
          setModalOpen(false);
          fetchData();
        }
      }
    } catch (err) {
      alert('Failed to save');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-cocoa">
            Testimonials Manager
          </h1>
          <p className="text-xs text-cocoa-soft mt-1">
            Customer reviews featured on the homepage and /happy-families
          </p>
        </div>

        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 bg-toffee hover:bg-toffee-deep text-milk text-xs font-bold px-5 py-3 rounded-full shadow-lift transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((test) => (
          <div key={test._id || test.id} className="bg-white rounded-3xl p-6 border border-honey/25 shadow-soft flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-honey">
                  {[...Array(test.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-honey" />
                  ))}
                </div>
                {test.featured && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-honey/30 text-toffee">
                    Homepage Featured
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-cocoa leading-relaxed italic mb-4">
                "{test.quote}"
              </p>
            </div>

            <div className="pt-3 border-t border-honey/15 flex items-center justify-between">
              <div>
                <strong className="text-xs font-bold text-cocoa block">{test.name}</strong>
                <span className="text-[11px] text-cocoa-soft/80">{test.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => openEdit(test)} className="p-1.5 text-cocoa hover:text-toffee">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(test._id || test.id)} className="p-1.5 text-red-600 hover:text-red-800">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-honey/30 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-honey/20 mb-4">
              <h3 className="font-serif font-bold text-cocoa text-lg">
                {editingItem ? 'Edit Testimonial' : 'Add Testimonial'}
              </h3>
              <button onClick={() => setModalOpen(false)}>
                <X className="w-5 h-5 text-cocoa-soft" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-cocoa mb-1">Customer Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl bg-milk border border-honey/30 text-cocoa"
                />
              </div>

              <div>
                <label className="block font-bold text-cocoa mb-1">Location *</label>
                <input
                  type="text"
                  required
                  value={form.location}
                  onChange={e => setForm(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl bg-milk border border-honey/30 text-cocoa"
                />
              </div>

              <div>
                <label className="block font-bold text-cocoa mb-1">Quote *</label>
                <textarea
                  rows={3}
                  required
                  value={form.quote}
                  onChange={e => setForm(prev => ({ ...prev, quote: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl bg-milk border border-honey/30 text-cocoa"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured-test"
                  checked={form.featured}
                  onChange={e => setForm(prev => ({ ...prev, featured: e.target.checked }))}
                  className="w-4 h-4 text-toffee rounded"
                />
                <label htmlFor="featured-test" className="font-semibold text-cocoa">
                  Featured on Homepage
                </label>
              </div>

              <div className="pt-3 border-t border-honey/20 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-honey/30 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-toffee text-milk font-bold shadow-lift hover:bg-toffee-deep transition"
                >
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
