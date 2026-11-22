import React, { useState, useEffect } from 'react';
import { ChevronDown, Search, MessageCircle, HelpCircle, X } from 'lucide-react';
import { api } from '../api';
import { useSettings } from '../context/SettingsContext';
import { SEO } from '../components/common/SEO';

export const FAQPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const { getWhatsAppLink } = useSettings();

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await api.getFAQs();
        if (res.success) {
          setFaqs(res.data || []);
        }
      } catch (err) {
        console.error('Error fetching FAQs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  const categories = ['All', 'Health & Care', 'Showroom & Visits', 'Import & Travel', 'Delivery & Shipping', 'General'];

  const filteredFaqs = faqs.filter((faq) => {
    const matchCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchQuery = !searchQuery || (
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchCategory && matchQuery;
  });

  return (
    <div className="py-10 md:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <SEO
        title="Questions & Answers (FAQ) | TeddyPups U.A.E."
        description="Frequently asked questions about teacup puppies in Dubai, health certificates, vaccinations, showroom visits, and international travel."
        slug="/faq"
      />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="font-scrawl text-toffee text-lg">got questions?</span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cocoa mt-1">
          Questions & answers
        </h1>
        <p className="mt-3 text-cocoa-soft text-base leading-relaxed">
          Everything you need to know about our puppies, health standards, showroom appointments, and delivery.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative mb-6">
        <Search className="w-5 h-5 text-cocoa-soft/60 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search question keywords (vaccines, travel, visit, price)..."
          className="w-full pl-12 pr-10 py-3.5 rounded-full bg-white border border-honey/30 text-sm focus:outline-none focus:ring-2 focus:ring-toffee text-cocoa shadow-soft"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-cocoa-soft/60 hover:text-cocoa"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs font-semibold px-4 py-2 rounded-full transition-all ${
              activeCategory === cat
                ? 'bg-toffee text-milk shadow-lift scale-105'
                : 'bg-honey/20 text-cocoa hover:bg-honey/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordions */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-12 h-12 border-4 border-honey border-t-toffee rounded-full animate-spin mx-auto mb-4" />
          <p className="text-cocoa-soft text-sm">Loading questions...</p>
        </div>
      ) : filteredFaqs.length > 0 ? (
        <div className="space-y-4 mb-16">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = activeFaq === (faq._id || idx);
            return (
              <div
                key={faq._id || idx}
                className="bg-white rounded-3xl border border-honey/25 overflow-hidden shadow-soft transition-all"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : (faq._id || idx))}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 font-serif font-bold text-cocoa text-base sm:text-lg hover:text-toffee transition"
                >
                  <span>{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full bg-honey/20 flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-toffee text-milk' : 'text-toffee'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-cocoa-soft leading-relaxed border-t border-honey/15">
                    <p className="mb-2">{faq.answer}</p>
                    <span className="inline-block text-[10px] font-semibold text-toffee bg-honey/15 px-2.5 py-0.5 rounded-full mt-2">
                      {faq.category || 'General'}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-10 text-center border border-honey/25 mb-16">
          <p className="text-cocoa-soft text-sm mb-4">No matching questions found.</p>
          <button
            onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
            className="text-xs font-bold text-toffee underline"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Still Have Questions Box */}
      <div className="bg-[#fbf7ee] rounded-4xl p-8 sm:p-10 border border-honey/30 text-center shadow-soft">
        <HelpCircle className="w-10 h-10 text-toffee mx-auto mb-3" />
        <h3 className="font-serif text-2xl font-bold text-cocoa mb-2">
          Have a specific question?
        </h3>
        <p className="text-xs sm:text-sm text-cocoa-soft max-w-md mx-auto mb-6">
          Our Dubai concierge is active 7 days a week on WhatsApp to answer any questions regarding vaccinations, appointments, or special requests.
        </p>
        <a
          href={getWhatsAppLink("Hi TeddyPups! I have a question that was not covered in the FAQ.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] text-white text-sm font-bold px-7 py-3 rounded-full shadow-lift hover:scale-105 active:scale-95 transition"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>Ask on WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
