import React, { useState, useEffect } from 'react';
import { MessageCircle, Mail, Phone, Calendar, CheckCircle2, Clock } from 'lucide-react';
import { api } from '../../api';
import { useAuth } from '../../context/AuthContext';

export const AdminEnquiries = () => {
  const { token } = useAuth();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await api.adminGetEnquiries(token);
      if (res.success) {
        setEnquiries(res.data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [token]);

  const handleStatus = async (id, status) => {
    try {
      const res = await api.adminUpdateEnquiryStatus(id, status, token);
      if (res.success) {
        setEnquiries(prev => prev.map(e => (e._id === id || e.id === id) ? res.data : e));
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-cocoa">
            Enquiries Inbox
          </h1>
          <p className="text-xs text-cocoa-soft mt-1">
            Incoming concierge leads from website contact forms and puppy inquiries.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-honey/25 shadow-soft overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-xs text-cocoa-soft">Loading enquiries...</div>
        ) : enquiries.length > 0 ? (
          <div className="divide-y divide-honey/15">
            {enquiries.map((enq) => {
              const cleanPhone = enq.phone.replace(/[^0-9]/g, '');
              const waReplyLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hi ${enq.name}! Thank you for contacting TeddyPups Dubai regarding ${enq.puppyName || 'our available puppies'}. How can we assist you today?`)}`;

              return (
                <div key={enq._id || enq.id} className="p-6 hover:bg-milk/60 transition flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-serif font-bold text-base text-cocoa">
                        {enq.name}
                      </h3>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        enq.status === 'new' ? 'bg-red-50 text-red-700 border border-red-200' :
                        enq.status === 'contacted' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                        'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}>
                        {enq.status.toUpperCase()}
                      </span>
                      {enq.puppyName && (
                        <span className="text-[11px] font-semibold text-toffee bg-honey/15 px-2.5 py-0.5 rounded-full">
                          Interested in: {enq.puppyName}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs text-cocoa-soft">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-toffee" />
                        {enq.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-toffee" />
                        {enq.email}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-cocoa-soft/70">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(enq.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <p className="text-xs text-cocoa bg-[#fbf8f2] p-3 rounded-2xl border border-honey/15 leading-relaxed max-w-2xl">
                      "{enq.message}"
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-row md:flex-col items-end gap-2 flex-shrink-0">
                    <a
                      href={waReplyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold px-4 py-2 rounded-full shadow-xs transition"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>Reply on WhatsApp</span>
                    </a>

                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-[11px] text-cocoa-soft/70">Status:</span>
                      <select
                        value={enq.status}
                        onChange={(e) => handleStatus(enq._id || enq.id, e.target.value)}
                        className="text-xs font-bold px-2 py-1 rounded-lg border border-honey/30 bg-white"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center text-xs text-cocoa-soft">No enquiries received yet.</div>
        )}
      </div>
    </div>
  );
};
