import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MessageCircle, ShieldCheck, Plane, Truck, Heart, CheckCircle2, MapPin, Sparkles, Clock } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { SEO } from '../components/common/SEO';

export const HowItWorksPage = () => {
  const { getWhatsAppLink } = useSettings();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.substring(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.hash]);

  return (
    <div className="py-10 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SEO
        title="How It Works & Delivery | TeddyPups U.A.E."
        description="Learn how we match families with healthy teacup puppies, our South Korea to Dubai import process, and door-to-door UAE delivery."
        slug="/how-it-works"
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="font-scrawl text-toffee text-lg">transparent concierge</span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cocoa mt-1">
          How it works
        </h1>
        <p className="mt-3 text-cocoa-soft text-base sm:text-lg leading-relaxed">
          From initial consultation to bringing your puppy home, every step is built around transparency, health, and peace of mind.
        </p>
      </div>

      {/* 3 Step Journey Detailed */}
      <div className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white rounded-4xl p-8 border border-honey/25 shadow-soft relative flex flex-col justify-between">
            <div>
              <span className="font-serif text-6xl font-black text-honey/25 select-none block mb-4">
                01
              </span>
              <h3 className="font-serif text-2xl font-bold text-cocoa mb-3">
                Choose your breed
              </h3>
              <p className="text-sm text-cocoa-soft leading-relaxed mb-4">
                Browse our real-time listings of teacup Maltipoo, Pomeranian, Poodle, Cavapoo, and Shih Tzu. Tell us about your home, family lifestyle, and preferred gender or coat color.
              </p>
              <ul className="text-xs text-cocoa-soft space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-toffee" />
                  <span>Real photos & current weights</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-toffee" />
                  <span>Temperament & size projection</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-honey/15">
              <span className="text-xs font-bold text-toffee">Step 1 of 3</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-4xl p-8 border border-honey/25 shadow-soft relative flex flex-col justify-between">
            <div>
              <span className="font-serif text-6xl font-black text-honey/25 select-none block mb-4">
                02
              </span>
              <h3 className="font-serif text-2xl font-bold text-cocoa mb-3">
                Get photos & details
              </h3>
              <p className="text-sm text-cocoa-soft leading-relaxed mb-4">
                Connect directly with our concierge on WhatsApp. We send multiple 4K videos, close-ups of paws and teeth, parental health lineage, and recent veterinary reports.
              </p>
              <ul className="text-xs text-cocoa-soft space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-toffee" />
                  <span>Live HD video call option</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-toffee" />
                  <span>Showroom visit appointment</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-honey/15">
              <span className="text-xs font-bold text-toffee">Step 2 of 3</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-4xl p-8 border border-honey/25 shadow-soft relative flex flex-col justify-between">
            <div>
              <span className="font-serif text-6xl font-black text-honey/25 select-none block mb-4">
                03
              </span>
              <h3 className="font-serif text-2xl font-bold text-cocoa mb-3">
                Secure & safe delivery
              </h3>
              <p className="text-sm text-cocoa-soft leading-relaxed mb-4">
                Pick up your puppy at our Downtown Dubai boutique or enjoy our white-glove chauffeur delivery across the UAE. Each puppy arrives with official passport and starter kit.
              </p>
              <ul className="text-xs text-cocoa-soft space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-toffee" />
                  <span>Doorstep delivery in climate-controlled luxury</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-toffee" />
                  <span>Lifetime 24/7 care hotline</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-honey/15">
              <span className="text-xs font-bold text-toffee">Step 3 of 3</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Ways Home */}
      <div className="mb-20 bg-[#fbf8f2] rounded-4xl p-8 sm:p-12 border border-honey/30">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="font-scrawl text-toffee text-lg">flexible options</span>
          <h2 className="font-serif text-3xl font-bold text-cocoa mt-1">
            Two ways home
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-honey/20 shadow-xs">
            <span className="text-xs font-bold px-3 py-1 bg-honey/30 text-toffee rounded-full inline-block mb-3">
              Option A
            </span>
            <h3 className="font-serif text-xl font-bold text-cocoa mb-2">
              Dubai Showroom Puppies
            </h3>
            <p className="text-xs sm:text-sm text-cocoa-soft leading-relaxed mb-4">
              Puppies currently residing in our Downtown Dubai showroom have cleared all veterinary inspections and municipal health registration. You can visit them in person today and take your puppy home the very same day.
            </p>
            <Link to="/puppies?origin=local" className="text-xs font-bold text-toffee hover:underline">
              Browse showroom puppies →
            </Link>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-honey/20 shadow-xs">
            <span className="text-xs font-bold px-3 py-1 bg-sky/50 text-sky-deep rounded-full inline-block mb-3">
              Option B
            </span>
            <h3 className="font-serif text-xl font-bold text-cocoa mb-2">
              Korean Teacup Reserve & Import
            </h3>
            <p className="text-xs sm:text-sm text-cocoa-soft leading-relaxed mb-4">
              For rare doll-face teacup lines, reserve directly from elite Seoul breeders. Our courier oversees the medical flight to Dubai International Airport (DXB). Smooth 5 to 7 day transition with flight tracking.
            </p>
            <Link to="/puppies?origin=imported" className="text-xs font-bold text-sky-deep hover:underline">
              Browse Korean imports →
            </Link>
          </div>
        </div>
      </div>

      {/* DELIVERY & COLLECTION SECTION (#delivery) */}
      <section id="delivery" className="mb-20 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-scrawl text-toffee text-lg">white-glove transit</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cocoa mt-1">
            Delivery & collection
          </h2>
          <p className="mt-3 text-cocoa-soft text-base leading-relaxed">
            Safety, gentle handling, and comfort are our highest priorities during travel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: UAE Doorstep Delivery */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-honey/25 shadow-soft flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-honey/30 text-toffee flex items-center justify-center mb-5">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-cocoa mb-2">
                UAE Doorstep Delivery
              </h3>
              <p className="text-xs sm:text-sm text-cocoa-soft leading-relaxed mb-4">
                We provide private chauffeur delivery across Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, and Fujairah. Our puppy handler stays with the puppy throughout the journey and assists with first-day setup at your home.
              </p>
            </div>
            <div className="pt-4 border-t border-honey/15 text-xs text-cocoa-soft/80 font-medium">
              Same-day or scheduled time slot
            </div>
          </div>

          {/* Card 2: Korea to Dubai Import Flight */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-honey/25 shadow-soft flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky/30 text-sky-deep flex items-center justify-center mb-5">
                <Plane className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-cocoa mb-2">
                South Korea to Dubai Flight
              </h3>
              <p className="text-xs sm:text-sm text-cocoa-soft leading-relaxed mb-4">
                Imported puppies travel exclusively via pet-certified airlines in pressurized, temperature-regulated cabins. They clear Dubai International Airport customs under full veterinary oversight.
              </p>
            </div>
            <div className="pt-4 border-t border-honey/15 text-xs text-cocoa-soft/80 font-medium">
              DXB airport clearance included
            </div>
          </div>

          {/* Card 3: Worldwide & GCC Shipping */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-honey/25 shadow-soft flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-honey/30 text-toffee flex items-center justify-center mb-5">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-cocoa mb-2">
                GCC & Worldwide Shipping
              </h3>
              <p className="text-xs sm:text-sm text-cocoa-soft leading-relaxed mb-4">
                We coordinate luxury pet flights to Saudi Arabia (Riyadh, Jeddah), Qatar, Kuwait, Bahrain, and international destinations. Full export permits and ministry rabies titers handled end-to-end.
              </p>
            </div>
            <div className="pt-4 border-t border-honey/15 text-xs text-cocoa-soft/80 font-medium">
              Worldwide veterinary documentation
            </div>
          </div>
        </div>
      </section>

      {/* Our Premium Puppy Promise */}
      <div className="bg-cocoa text-milk rounded-4xl p-8 sm:p-12 mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="font-scrawl text-honey text-lg">uncompromising standards</span>
          <h2 className="font-serif text-3xl font-bold text-milk mt-1">
            Our premium puppy promise
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          <div className="border border-milk/10 p-5 rounded-2xl bg-milk/5">
            <ShieldCheck className="w-6 h-6 text-honey mb-2" />
            <h4 className="font-bold text-honey text-base mb-1">100% Health Guarantee</h4>
            <p className="text-xs text-milk/75">
              1-year congenital guarantee and certified vet passport with microchip.
            </p>
          </div>

          <div className="border border-milk/10 p-5 rounded-2xl bg-milk/5">
            <CheckCircle2 className="w-6 h-6 text-honey mb-2" />
            <h4 className="font-bold text-honey text-base mb-1">Ethical Breeding</h4>
            <p className="text-xs text-milk/75">
              Strictly non-mill, healthy lineages with certified pedigree documentation.
            </p>
          </div>

          <div className="border border-milk/10 p-5 rounded-2xl bg-milk/5">
            <Clock className="w-6 h-6 text-honey mb-2" />
            <h4 className="font-bold text-honey text-base mb-1">24/7 WhatsApp Hotline</h4>
            <p className="text-xs text-milk/75">
              Always on call for feeding tips, veterinary questions, and guidance.
            </p>
          </div>

          <div className="border border-milk/10 p-5 rounded-2xl bg-milk/5">
            <Sparkles className="w-6 h-6 text-honey mb-2" />
            <h4 className="font-bold text-honey text-base mb-1">Luxury Starter Pack</h4>
            <p className="text-xs text-milk/75">
              Premium puppy food, toys, blanket with mother's scent, and grooming essentials.
            </p>
          </div>
        </div>
      </div>

      {/* Final Action Banner */}
      <div className="text-center bg-[#fbf7ee] rounded-4xl p-8 sm:p-10 border border-honey/30">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cocoa mb-3">
          Ready to begin your journey?
        </h3>
        <p className="text-xs sm:text-sm text-cocoa-soft max-w-lg mx-auto mb-6">
          Chat with our team right now on WhatsApp. We will help you select the puppy that matches your family best.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={getWhatsAppLink("Hi TeddyPups! I've read through How It Works and would love to start finding my puppy.")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#25D366] text-white font-bold text-sm shadow-lift transition flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat on WhatsApp</span>
          </a>
          <Link
            to="/contact"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white text-cocoa font-bold text-sm border border-honey/40 shadow-xs hover:bg-milk transition text-center"
          >
            Visit Downtown Showroom
          </Link>
        </div>
      </div>
    </div>
  );
};
