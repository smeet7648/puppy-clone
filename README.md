# TeddyPups U.A.E. 🐾
> **"every puppy is family"**

TeddyPups is a luxury, bespoke puppy showcase and concierge-enquiry platform designed for a Dubai-based seller of teacup and teddy-bear miniature puppies (Maltipoo, Pomeranian, Poodle, Cavapoo, Shih Tzu).

There is **no cart or checkout**. Instead, visitors browse real puppies with high-definition photos, health passports, and video recordings, and are smoothly routed to **WhatsApp** where the concierge team closes the sale directly.

---

## 🌟 Highlights & Features

### 1. Global Elements
- **Top Announcement Strip**: *"every puppy is family"* with pulsing status and Dubai concierge note.
- **Skip-to-Content Link**: Accessible navigation anchor (`#main-content`).
- **Header**: Custom SVG brand logo, luxury typography, navigation, pill-shaped *"WhatsApp us"* CTA, and responsive mobile hamburger trigger.
- **Mobile Menu Overlay**: *"where to, friend?"* overlay menu with quick links, direct WhatsApp, and phone dialer.
- **Floating WhatsApp Concierge Widget**: Mini chat card with "online" green beacon, prefilled message, breed quick-filter pills (Maltipoo, Pomeranian, Poodle, Cavapoo, Shih Tzu), and direct chat launcher.
- **Mobile Sticky Bar**: Always-accessible bottom bar featuring *"WhatsApp us"* and *"Call"* buttons on handheld devices.
- **Footer**: Brand blurb, Explore links (Available, Gone home, Happy families, How it works, Delivery, FAQ, Contact), contact details, social links, and owner admin login.

### 2. Pages & Routes
- **`/` (Home Page)**:
  1. **Hero**: *"every puppy is family"* scrawl tag, H1 *"Premium teacup puppies in Dubai"*, two CTAs (*View available puppies* & *Enquire on WhatsApp*), marquee photo carousel of 6 puppies linking to their detail pages.
  2. **Meet the pups**: 15 puppy cards + final *"Meet them all"* tile.
  3. **Two ways to meet your puppy**: *Puppies in Dubai* (Showroom) vs. *Imported for you* (Korea → Dubai).
  4. **Your puppy journey (3 steps)**: Step 1 (*Choose breed*), Step 2 (*Get photos & details via WhatsApp*), Step 3 (*Secure & safe delivery*).
  5. **Why families trust TeddyPups**: Signature *Puppy Passport* motif with 4 pillars (Vet-checked & healthy, Korea to Dubai safely, 24/7 support, Trusted worldwide).
  6. **Happy families & puppies**: Featured testimonial quote (*Sarah M., Dubai, UAE*), 8 customer photos with emoji captions, link to full gallery.
  7. **FAQ preview**: 3 accordion items + *"Read all questions"* link.
  8. **Final CTA**: *"Ready to meet your new best friend?"* + *welcome home* puppy portrait.
- **`/puppies` (Listing Page)**:
  - Multi-attribute filter chips: Breed, Origin (*In Showroom* vs. *Korean Import*), Gender, and live search.
  - Status badges (*Available*, *Reserved*).
  - Link banner to `/gone-home`.
- **`/puppies/:slug` (Detail Page)**:
  - Multi-image gallery with thumbnail switcher and full-screen lightbox zoom.
  - Video player with controls.
  - Puppy specs (breed, gender, age, origin, adult weight projection, price, medical clearance).
  - Prominent WhatsApp CTA prefilled with puppy name and direct link.
  - *"Every Teddy Pup comes with"* guarantee card.
  - Related puppies carousel.
- **`/gone-home` (Adoption Archive)**:
  - Read-only showcase of adopted puppies with *"Gone Home"* badges and WhatsApp concierge inquiry for similar puppies.
- **`/happy-families` (Photo Gallery & Testimonials)**:
  - Masonry customer photos with emoji captions and interactive lightbox.
  - Verified UAE customer reviews with star ratings.
- **`/how-it-works` (Concierge & Delivery)**:
  - In-depth 3-step adoption journey.
  - Dedicated `#delivery` section covering UAE doorstep delivery, South Korea to Dubai medical flight, and GCC/worldwide shipping.
  - The 4-pillar *Puppy Promise*.
- **`/faq` (Full FAQ Accordion)**:
  - Grouped into categories: *Health & Care*, *Showroom & Visits*, *Import & Travel*, *Delivery & Shipping*, *General*.
  - Instant search filter and accordion animations.
- **`/contact` (Showroom & Concierge)**:
  - Showroom address: *Downtown Dubai, Boulevard Plaza Tower 1*.
  - Opening hours, direct WhatsApp, phone, email, and Google Maps embed.
  - Real-time contact form with instant validation, posting to `/api/enquiries`.

### 3. Protected Admin Panel (`/admin/*`)
- **`/admin/login`**: Luxury secure authentication using bcrypt and JWT.
- **`/admin/puppies`**: Complete CRUD puppy management. Add, edit, delete, toggle status (*Available* / *Reserved* / *Sold* - auto-moves to Gone Home), image URL and file upload, video URLs, health notes, pricing, and homepage featured toggle.
- **`/admin/enquiries`**: Customer contact form leads inbox with status updater (*new* → *contacted* → *closed*) and **one-click direct WhatsApp response button** to message the customer back instantly!
- **`/admin/happy-families`**: Add, edit, and delete customer photos and captions.
- **`/admin/faqs`**: Add, edit, and categorize FAQ items.
- **`/admin/testimonials`**: Add, edit, and feature client reviews.
- **`/admin/settings`**: Live site settings editor (WhatsApp numbers, phone, email, address, opening hours, social links).

---

## 🎨 Design System

Computed directly from the boutique brand identity:
- **Milk (Cream Background)**: `#fffdf8`
- **Cocoa (Primary Dark Text & Headings)**: `#2a170e`
- **Soft Cocoa (Body Text)**: `#5a3a28`
- **Toffee (Brand Terracotta Button Accent)**: `#c2622b` (`hover: #a24a1a`)
- **Honey (Golden Accent & Badges)**: `#f2be6b` (`soft: #fbe3b4`)
- **Sky (Korean Import Badges)**: `#bfddf5` (`deep text: #2f6e9e`)
- **Blush (Accents & Cheeks)**: `#f9cdbf`
- **Typography**:
  - Headings: `Fraunces` (warm curvy serif)
  - Body: `Figtree` (clean modern sans-serif)
  - Scrawl/Accents: `Shantell Sans` (whimsical handwriting)

---

## 💻 Tech Stack

| Layer | Choice |
|---|---|
| **Frontend** | React 18, Vite, React Router v6, Tailwind CSS, Framer Motion, Lucide Icons |
| **Backend** | Node.js, Express, Helmet, CORS, Express-Rate-Limit, Zod |
| **Database** | MongoDB + Mongoose (with automated persistent file storage fallback) |
| **Authentication** | JWT + bcryptjs |
| **Media** | Cloudinary integration + local static upload fallback |
| **SEO** | react-helmet-async (OpenGraph, Twitter Cards, JSON-LD schema) |
| **Email** | Nodemailer |

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
# Install client dependencies
npm --prefix client install

# Install server dependencies
npm --prefix server install
```

### 2. Seed Database
```bash
npm run seed
```
> Seeds 16+ available puppies, 4 adopted puppies for Gone Home, 8 customer photos with emoji captions, testimonials, FAQs, settings, and the default admin user.

### 3. Run Development Servers
```bash
# Terminal 1: Backend API (port 5000)
npm run dev:server

# Terminal 2: Frontend Vite App (port 5173)
npm run dev:client
```

### 4. Build & Serve Production Bundle
```bash
# Build frontend
npm run build

# Start full-stack server (serves API and React frontend on port 5000)
npm start
```

---

## 🔑 Default Admin Credentials

- **Email**: `admin@teddypups.ae`
- **Password**: `TeddyPups2026!`
- **Access Route**: `http://localhost:5173/admin/login` or `http://localhost:5000/admin/login`

---

## 📡 API Endpoints

### Public Endpoints
- `GET /api/health` - Server health check
- `GET /api/puppies?breed=&origin=&gender=&status=&page=&limit=` - Filtered puppies list
- `GET /api/puppies/:slug` - Puppy detail by slug (with related puppies)
- `GET /api/happy-families` - Customer gallery photos
- `GET /api/testimonials` - Client reviews
- `GET /api/faqs` - Categorized FAQs
- `GET /api/settings` - Site contact details, WhatsApp, address & hours
- `POST /api/enquiries` - Submit contact enquiry (rate-limited, validated with Zod)

### Protected Admin Endpoints (`Bearer <token>`)
- `POST /api/admin/login` - Admin login with JWT issue
- `GET /api/admin/me` - Current admin session verification
- `GET, POST, PUT, DELETE /api/admin/puppies` - Puppy listings CRUD
- `GET, POST, PUT, DELETE /api/admin/happy-families` - Gallery CRUD
- `GET, POST, PUT, DELETE /api/admin/faqs` - FAQs CRUD
- `GET, POST, PUT, DELETE /api/admin/testimonials` - Testimonials CRUD
- `PUT /api/admin/settings` - Update site configuration
- `GET, PATCH /api/admin/enquiries` - View enquiries & update lead status
- `POST /api/admin/upload` - File upload to Cloudinary or local storage
