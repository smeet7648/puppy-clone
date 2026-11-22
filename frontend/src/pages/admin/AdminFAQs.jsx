import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, X } from 'lucide-react';
import { api } from '../../api';
import { useAuth } from '../../context/AuthContext';

export const AdminFAQs = () => {
  const { token } = useAuth();
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [form, setForm] = useState({ question: '', answer: '', category: 'General', order: 0 });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.getFAQs();
      if (res.success) setFaqs(res.data || []);
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
    setForm({ question: '', answer: '', category: 'Health & Care', order: faqs.length + 1 });
    setModalOpen(true);
  };

  const openEdit = (faq) => {
    setEditingItem(faq);
    setForm({ question: faq.question, answer: faq.answer, category: faq.category || 'General', order: faq.order || 0 });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this FAQ?')) return;
    try {
      const res = await api.adminDeleteFAQ(id, token);
      if (res.success) {
        setFaqs(prev => prev.filter(f => f._id !== id && f.id !== id));
      }
    } catch (e) {
      alert('Delete failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        const res = await api.adminUpdateFAQ(editingItem._id || editingItem.id, form, token);
        if (res.success) {
          setModalOpen(false);
          fetchData();
        }
      } else {
        const res = await api.adminCreateFAQ(form, token);
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
            FAQ Manager
          </h1>
          <p className="text-xs text-cocoa-soft mt-1">
            Questions and answers displayed on the FAQ page and Homepage preview
          </p>
        </div>

        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 bg-toffee hover:bg-toffee-deep text-milk text-xs font-bold px-5 py-3 rounded-full shadow-lift transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add New FAQ</span>
        </button>
      </div>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq._id || faq.id} className="bg-white rounded-3xl p-6 border border-honey/25 shadow-soft flex items-start justify-between gap-4">
            <div className="space-y-1.5 flex-1">
              <span className="text-[10px] font-bold text-toffee bg-honey/15 px-2.5 py-0.5 rounded-full inline-block">
                {faq.category || 'General'}
              </span>
              <h3 className="font-serif font-bold text-cocoa text-base">
                {faq.question}
              </h3>
              <p className="text-xs text-cocoa-soft leading-relaxed">
                {faq.answer}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => openEdit(faq)} className="p-2 text-cocoa hover:text-toffee">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(faq._id || faq.id)} className="p-2 text-red-600 hover:text-red-800">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-honey/30 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-honey/20 mb-4">
              <h3 className="font-serif font-bold text-cocoa text-lg">
                {editingItem ? 'Edit FAQ' : 'Add New FAQ'}
              </h3>
              <button onClick={() => setModalOpen(false)}>
                <X className="w-5 h-5 text-cocoa-soft" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-cocoa mb-1">Category *</label>
                <select
                  value={form.category}
                  onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl bg-milk border border-honey/30 text-cocoa"
                >
                  <option value="Health & Care">Health & Care</option>
                  <option value="Showroom & Visits">Showroom & Visits</option>
                  <option value="Import & Travel">Import & Travel</option>
                  <option value="Delivery & Shipping">Delivery & Shipping</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-cocoa mb-1">Question *</label>
                <input
                  type="text"
                  required
                  value={form.question}
                  onChange={e => setForm(prev => ({ ...prev, question: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl bg-milk border border-honey/30 text-cocoa"
                />
              </div>

              <div>
                <label className="block font-bold text-cocoa mb-1">Answer *</label>
                <textarea
                  rows={4}
                  required
                  value={form.answer}
                  onChange={e => setForm(prev => ({ ...prev, answer: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl bg-milk border border-honey/30 text-cocoa"
                />
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
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
