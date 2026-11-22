import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, Sparkles, HeartHandshake, ArrowRight, X } from 'lucide-react';
import { api } from '../api';
import { PuppyCard } from '../components/common/PuppyCard';
import { SEO } from '../components/common/SEO';

export const PuppiesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [puppies, setPuppies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const currentBreed = searchParams.get('breed') || 'all';
  const currentOrigin = searchParams.get('origin') || 'all';
  const currentGender = searchParams.get('gender') || 'all';

  const breeds = ['all', 'Maltipoo', 'Pomeranian', 'Poodle', 'Cavapoo', 'Shih Tzu'];
  const origins = [
    { label: 'All Origins', value: 'all' },
    { label: 'In Dubai Showroom', value: 'local' },
    { label: 'Korea → Dubai Imports', value: 'imported' },
  ];
  const genders = [
    { label: 'All Genders', value: 'all' },
    { label: 'Female', value: 'female' },
    { label: 'Male', value: 'male' },
  ];

  useEffect(() => {
    const fetchPuppies = async () => {
      setLoading(true);
      try {
        const query = { status: 'available' };
        if (currentBreed !== 'all') query.breed = currentBreed;
        if (currentOrigin !== 'all') query.origin = currentOrigin;
        if (currentGender !== 'all') query.gender = currentGender;

        const res = await api.getPuppies(query);
        if (res.success) {
          setPuppies(res.data || []);
        }
      } catch (err) {
        console.error('Error fetching puppies:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPuppies();
  }, [currentBreed, currentOrigin, currentGender]);

  const updateFilter = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value === 'all') {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next);
  };

  const filteredPuppies = puppies.filter((p) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.breed.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q))
    );
  });

  return (
    <div className="py-8 sm:py-10 md:py-16 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pb-24 md:pb-16">
      <SEO
        title="Available Puppies | TeddyPups U.A.E."
        description="Browse available teacup Maltipoo, Pomeranian, Poodle, Cavapoo, and Shih Tzu puppies in Dubai or imported directly from South Korea."
        slug="/puppies"
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="font-scrawl text-toffee text-lg">forever companions</span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cocoa mt-1">
          Available puppies
        </h1>
        <p className="mt-3 text-cocoa-soft text-base leading-relaxed">
          Each puppy has been raised with love, medically examined, and is ready to join their new family.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-honey/25 shadow-soft mb-10 space-y-5">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-cocoa-soft/60 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, breed, or personality..."
            className="w-full pl-12 pr-4 py-3 rounded-full bg-milk border border-honey/30 text-sm focus:outline-none focus:ring-2 focus:ring-toffee text-cocoa placeholder:text-cocoa-soft/50"
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

        {/* Filter Chips: Breed */}
        <div>
          <span className="text-xs font-bold text-cocoa-soft uppercase tracking-wider block mb-2">
            Breed:
          </span>
          <div className="flex flex-wrap gap-2">
            {breeds.map((b) => {
              const active = (b === 'all' && currentBreed === 'all') || currentBreed === b;
              return (
                <button
                  key={b}
                  onClick={() => updateFilter('breed', b)}
                  className={`text-xs font-semibold px-4 py-2 rounded-full transition-all ${
                    active
                      ? 'bg-toffee text-milk shadow-lift scale-105'
                      : 'bg-honey/20 text-cocoa hover:bg-honey/40'
                  }`}
                >
                  {b === 'all' ? 'All Breeds' : b}
                </button>
              );
            })}
          </div>
        </div>

        {/* Origin & Gender Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-honey/15">
          <div>
            <span className="text-xs font-bold text-cocoa-soft uppercase tracking-wider block mb-2">
              Origin:
            </span>
            <div className="flex flex-wrap gap-2">
              {origins.map((o) => {
                const active = (o.value === 'all' && currentOrigin === 'all') || currentOrigin === o.value;
                return (
                  <button
                    key={o.value}
                    onClick={() => updateFilter('origin', o.value)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${
                      active
                        ? 'bg-cocoa text-milk'
                        : 'bg-honey/20 text-cocoa hover:bg-honey/35'
                    }`}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <span className="text-xs font-bold text-cocoa-soft uppercase tracking-wider block mb-2">
              Gender:
            </span>
            <div className="flex flex-wrap gap-2">
              {genders.map((g) => {
                const active = (g.value === 'all' && currentGender === 'all') || currentGender === g.value;
                return (
                  <button
                    key={g.value}
                    onClick={() => updateFilter('gender', g.value)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${
                      active
                        ? 'bg-cocoa text-milk'
                        : 'bg-honey/20 text-cocoa hover:bg-honey/35'
                    }`}
                  >
                    {g.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Results Count & Reset */}
      <div className="flex items-center justify-between mb-6 text-xs sm:text-sm text-cocoa-soft">
        <span>Showing <strong>{filteredPuppies.length}</strong> available puppies</span>
        {(currentBreed !== 'all' || currentOrigin !== 'all' || currentGender !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              setSearchParams({});
              setSearchQuery('');
            }}
            className="text-toffee font-semibold hover:underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Grid of Puppies */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-12 h-12 border-4 border-honey border-t-toffee rounded-full animate-spin mx-auto mb-4" />
          <p className="text-cocoa-soft text-sm">Gathering puppies...</p>
        </div>
      ) : filteredPuppies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPuppies.map((puppy, idx) => (
            <PuppyCard key={puppy._id || puppy.slug} puppy={puppy} index={idx} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-honey/25 max-w-md mx-auto">
          <span className="text-4xl mb-3 block">🐾</span>
          <h3 className="font-serif text-xl font-bold text-cocoa mb-2">No puppies found</h3>
          <p className="text-xs sm:text-sm text-cocoa-soft mb-6">
            We couldn't find any puppies matching your exact filters. Try clearing your filters or contact our concierge for upcoming litters!
          </p>
          <button
            onClick={() => {
              setSearchParams({});
              setSearchQuery('');
            }}
            className="px-6 py-2.5 rounded-full bg-toffee text-milk font-semibold text-xs shadow-lift hover:bg-toffee-deep transition"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Gone Home Archive Banner */}
      <div className="mt-16 bg-gradient-to-r from-honey/20 via-honey/10 to-milk rounded-3xl p-6 sm:p-8 border border-honey/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-honey/40 flex items-center justify-center text-toffee">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-cocoa">
              Looking for adopted puppies?
            </h3>
            <p className="text-xs sm:text-sm text-cocoa-soft">
              See the lovely puppies that have already found their forever families across the UAE.
            </p>
          </div>
        </div>
        <Link
          to="/gone-home"
          className="inline-flex items-center gap-2 bg-white hover:bg-milk text-cocoa font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full border border-honey/40 shadow-xs transition hover:scale-105"
        >
          <span>View Gone Home archive</span>
          <ArrowRight className="w-4 h-4 text-toffee" />
        </Link>
      </div>
    </div>
  );
};
