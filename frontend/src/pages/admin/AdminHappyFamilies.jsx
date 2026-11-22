import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Upload, X } from 'lucide-react';
import { api } from '../../api';
import { useAuth } from '../../context/AuthContext';

export const AdminHappyFamilies = () => {
  const { token } = useAuth();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [form, setForm] = useState({ imageUrl: '', caption: '', order: 0 });
  const [uploading, setUploading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.getHappyFamilies();
      if (res.success) setPhotos(res.data || []);
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
    setForm({ imageUrl: '', caption: '', order: photos.length + 1 });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({ imageUrl: item.imageUrl, caption: item.caption, order: item.order || 0 });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this photo?')) return;
    try {
      const res = await api.adminDeleteHappyFamily(id, token);
      if (res.success) {
        setPhotos(prev => prev.filter(p => p._id !== id && p.id !== id));
      }
    } catch (e) {
      alert('Delete failed');
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await api.adminUploadFile(file, token);
      if (res.success && res.url) {
        setForm(prev => ({ ...prev, imageUrl: res.url }));
      }
    } catch (err) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        const res = await api.adminUpdateHappyFamily(editingItem._id || editingItem.id, form, token);
        if (res.success) {
          setModalOpen(false);
          fetchData();
        }
      } else {
        const res = await api.adminCreateHappyFamily(form, token);
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
            Happy Families Gallery
          </h1>
          <p className="text-xs text-cocoa-soft mt-1">
            Manage customer photos & testimonials featured on homepage and /happy-families
          </p>
        </div>

        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 bg-toffee hover:bg-toffee-deep text-milk text-xs font-bold px-5 py-3 rounded-full shadow-lift transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Family Photo</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {photos.map((item) => (
          <div key={item._id || item.id} className="bg-white rounded-3xl overflow-hidden border border-honey/25 shadow-soft flex flex-col justify-between">
            <div className="aspect-square overflow-hidden bg-honey/10 relative">
              <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="p-3 text-center">
              <p className="text-xs font-bold text-cocoa mb-3">{item.caption}</p>
              <div className="flex items-center justify-center gap-2 pt-2 border-t border-honey/15">
                <button onClick={() => openEdit(item)} className="p-1.5 text-cocoa hover:text-toffee">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(item._id || item.id)} className="p-1.5 text-red-600 hover:text-red-800">
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
                {editingItem ? 'Edit Photo' : 'Add Happy Family Photo'}
              </h3>
              <button onClick={() => setModalOpen(false)}>
                <X className="w-5 h-5 text-cocoa-soft" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-cocoa">Image URL *</label>
                  <label className="cursor-pointer text-toffee font-semibold flex items-center gap-1 hover:underline">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploading ? 'Uploading...' : 'Upload'}</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
                <input
                  type="text"
                  required
                  value={form.imageUrl}
                  onChange={e => setForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl bg-milk border border-honey/30 text-cocoa"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block font-bold text-cocoa mb-1">Caption (with emoji) *</label>
                <input
                  type="text"
                  required
                  value={form.caption}
                  onChange={e => setForm(prev => ({ ...prev, caption: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl bg-milk border border-honey/30 text-cocoa"
                  placeholder="e.g. Sarah with baby Max in Downtown Dubai 🐾✨"
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
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
