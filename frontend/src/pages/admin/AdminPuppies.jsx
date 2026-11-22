import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, Play, Upload, X, Search, Sparkles } from 'lucide-react';
import { api } from '../../api';
import { useAuth } from '../../context/AuthContext';

export const AdminPuppies = () => {
  const { token } = useAuth();
  const [puppies, setPuppies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPuppy, setEditingPuppy] = useState(null);

  // Form State
  const initialForm = {
    name: '',
    breed: 'Maltipoo',
    gender: 'female',
    ageMonths: 2.5,
    ageLabel: '2.5 months Maltipoo',
    origin: 'local',
    status: 'available',
    images: '',
    videoUrl: '',
    description: '',
    healthInfo: 'Microchipped, up to date on all vaccinations, vet health passport & warranty.',
    price: 'AED 14,000',
    featured: false
  };

  const [form, setForm] = useState(initialForm);
  const [formLoading, setFormLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const fetchPuppies = async () => {
    setLoading(true);
    try {
      const res = await api.adminGetPuppies(token);
      if (res.success) setPuppies(res.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPuppies();
  }, [token]);

  const openAddModal = () => {
    setEditingPuppy(null);
    setForm(initialForm);
    setModalOpen(true);
  };

  const openEditModal = (pup) => {
    setEditingPuppy(pup);
    setForm({
      name: pup.name,
      breed: pup.breed,
      gender: pup.gender,
      ageMonths: pup.ageMonths,
      ageLabel: pup.ageLabel,
      origin: pup.origin,
      status: pup.status,
      images: Array.isArray(pup.images) ? pup.images.join('\n') : '',
      videoUrl: pup.videoUrl || '',
      description: pup.description || '',
      healthInfo: pup.healthInfo || '',
      price: pup.price || '',
      featured: Boolean(pup.featured)
    });
    setModalOpen(true);
  };

  const handleStatusChange = async (pup, newStatus) => {
    try {
      const res = await api.adminUpdatePuppy(pup._id || pup.id, { status: newStatus }, token);
      if (res.success) {
        setPuppies(prev => prev.map(p => (p._id === pup._id || p.id === pup.id) ? res.data : p));
      }
    } catch (e) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this puppy listing?')) return;
    try {
      const res = await api.adminDeletePuppy(id, token);
      if (res.success) {
        setPuppies(prev => prev.filter(p => p._id !== id && p.id !== id));
      }
    } catch (e) {
      alert('Failed to delete puppy');
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const res = await api.adminUploadFile(file, token);
      if (res.success && res.url) {
        setForm(prev => ({
          ...prev,
          images: prev.images ? `${prev.images}\n${res.url}` : res.url
        }));
      } else {
        alert(res.message || 'Upload failed');
      }
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    const imagesArray = form.images
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const payload = {
      ...form,
      images: imagesArray
    };

    try {
      if (editingPuppy) {
        const res = await api.adminUpdatePuppy(editingPuppy._id || editingPuppy.id, payload, token);
        if (res.success) {
          setModalOpen(false);
          fetchPuppies();
        }
      } else {
        const res = await api.adminCreatePuppy(payload, token);
        if (res.success) {
          setModalOpen(false);
          fetchPuppies();
        }
      }
    } catch (err) {
      alert('Failed to save puppy listing');
    } finally {
      setFormLoading(false);
    }
  };

  const filtered = puppies.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.breed.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-cocoa">
            Puppy Manager
          </h1>
          <p className="text-xs text-cocoa-soft mt-1">
            Total listings: {puppies.length} ({puppies.filter(p => p.status === 'available').length} available)
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 bg-toffee hover:bg-toffee-deep text-milk text-xs font-bold px-5 py-3 rounded-full shadow-lift transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Puppy</span>
        </button>
      </div>

      {/* Search Filter */}
      <div className="mb-6 relative max-w-md">
        <Search className="w-4 h-4 text-cocoa-soft/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter puppies by name or breed..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-honey/30 text-xs focus:outline-none focus:ring-2 focus:ring-toffee text-cocoa"
        />
      </div>

      {/* Puppy Table */}
      <div className="bg-white rounded-3xl border border-honey/25 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#fbf7ee] text-cocoa font-bold border-b border-honey/20 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-4">Puppy</th>
                <th className="p-4">Breed & Age</th>
                <th className="p-4">Origin</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-honey/15">
              {filtered.map((pup) => {
                const img = pup.images?.[0] || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=200&q=80';
                return (
                  <tr key={pup._id || pup.id} className="hover:bg-milk/60 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={img} alt="" className="w-12 h-12 rounded-xl object-cover border border-honey/30" />
                        <div>
                          <strong className="font-serif text-sm text-cocoa block">{pup.name}</strong>
                          <span className="text-[11px] text-cocoa-soft capitalize">{pup.gender}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-cocoa">
                      <strong>{pup.breed}</strong>
                      <span className="block text-[11px] text-cocoa-soft">{pup.ageLabel || `${pup.ageMonths} mos`}</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        pup.origin === 'imported' ? 'bg-sky/50 text-sky-deep' : 'bg-honey/30 text-toffee'
                      }`}>
                        {pup.origin === 'imported' ? 'Korea Import' : 'Showroom'}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-toffee">
                      {pup.price || 'On Request'}
                    </td>
                    <td className="p-4">
                      <select
                        value={pup.status}
                        onChange={(e) => handleStatusChange(pup, e.target.value)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-full border focus:outline-none ${
                          pup.status === 'available' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                          pup.status === 'reserved' ? 'bg-amber-50 text-amber-800 border-amber-300' :
                          'bg-gray-100 text-gray-700 border-gray-300'
                        }`}
                      >
                        <option value="available">Available</option>
                        <option value="reserved">Reserved</option>
                        <option value="sold">Sold (Gone Home)</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(pup)}
                          className="p-1.5 rounded-lg text-cocoa hover:bg-honey/30 transition"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(pup._id || pup.id)}
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-4xl max-w-2xl w-full p-6 sm:p-8 border border-honey/30 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-honey/20 mb-6">
              <h3 className="font-serif text-xl font-bold text-cocoa">
                {editingPuppy ? `Edit ${editingPuppy.name}` : 'Add New Puppy'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-full text-cocoa-soft hover:bg-honey/20 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-cocoa mb-1">Puppy Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl bg-milk border border-honey/30 text-cocoa"
                  />
                </div>
                <div>
                  <label className="block font-bold text-cocoa mb-1">Breed *</label>
                  <select
                    value={form.breed}
                    onChange={e => setForm(prev => ({ ...prev, breed: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl bg-milk border border-honey/30 text-cocoa"
                  >
                    <option value="Maltipoo">Maltipoo</option>
                    <option value="Pomeranian">Pomeranian</option>
                    <option value="Poodle">Poodle</option>
                    <option value="Cavapoo">Cavapoo</option>
                    <option value="Shih Tzu">Shih Tzu</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-cocoa mb-1">Gender *</label>
                  <select
                    value={form.gender}
                    onChange={e => setForm(prev => ({ ...prev, gender: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl bg-milk border border-honey/30 text-cocoa"
                  >
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-cocoa mb-1">Origin *</label>
                  <select
                    value={form.origin}
                    onChange={e => setForm(prev => ({ ...prev, origin: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl bg-milk border border-honey/30 text-cocoa"
                  >
                    <option value="local">In Showroom (Dubai)</option>
                    <option value="imported">Korea Import</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-cocoa mb-1">Status *</label>
                  <select
                    value={form.status}
                    onChange={e => setForm(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl bg-milk border border-honey/30 text-cocoa"
                  >
                    <option value="available">Available</option>
                    <option value="reserved">Reserved</option>
                    <option value="sold">Sold (Gone Home)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-cocoa mb-1">Age Label *</label>
                  <input
                    type="text"
                    required
                    value={form.ageLabel}
                    onChange={e => setForm(prev => ({ ...prev, ageLabel: e.target.value }))}
                    placeholder="e.g. 2.5 months Maltipoo"
                    className="w-full px-3 py-2.5 rounded-xl bg-milk border border-honey/30 text-cocoa"
                  />
                </div>
                <div>
                  <label className="block font-bold text-cocoa mb-1">Price Tag</label>
                  <input
                    type="text"
                    value={form.price}
                    onChange={e => setForm(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="e.g. AED 14,500 or Price on request"
                    className="w-full px-3 py-2.5 rounded-xl bg-milk border border-honey/30 text-cocoa"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-cocoa">Image URLs (one per line) *</label>
                  <label className="cursor-pointer text-toffee font-semibold flex items-center gap-1 hover:underline">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload local image'}</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
                <textarea
                  rows={3}
                  value={form.images}
                  onChange={e => setForm(prev => ({ ...prev, images: e.target.value }))}
                  placeholder="https://..."
                  className="w-full px-3 py-2.5 rounded-xl bg-milk border border-honey/30 text-cocoa font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-bold text-cocoa mb-1">Video URL (mp4 or webm)</label>
                <input
                  type="text"
                  value={form.videoUrl}
                  onChange={e => setForm(prev => ({ ...prev, videoUrl: e.target.value }))}
                  placeholder="https://..."
                  className="w-full px-3 py-2.5 rounded-xl bg-milk border border-honey/30 text-cocoa"
                />
              </div>

              <div>
                <label className="block font-bold text-cocoa mb-1">Description</label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl bg-milk border border-honey/30 text-cocoa"
                />
              </div>

              <div>
                <label className="block font-bold text-cocoa mb-1">Health & Medical Notes</label>
                <input
                  type="text"
                  value={form.healthInfo}
                  onChange={e => setForm(prev => ({ ...prev, healthInfo: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl bg-milk border border-honey/30 text-cocoa"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featured"
                  checked={form.featured}
                  onChange={e => setForm(prev => ({ ...prev, featured: e.target.checked }))}
                  className="w-4 h-4 text-toffee rounded"
                />
                <label htmlFor="featured" className="font-semibold text-cocoa">
                  Featured Puppy on Homepage
                </label>
              </div>

              <div className="pt-4 border-t border-honey/20 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-honey/30 text-cocoa hover:bg-milk font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-6 py-2.5 rounded-full bg-toffee text-milk font-bold shadow-lift hover:bg-toffee-deep transition"
                >
                  {formLoading ? 'Saving...' : 'Save Puppy Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
