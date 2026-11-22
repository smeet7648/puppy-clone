import bcrypt from 'bcryptjs';

export const samplePuppyPhotos = {
  maltipoo1: [
    'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1000&q=80'
  ],
  poodle1: [
    'https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1000&q=80'
  ],
  pomeranian1: [
    'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1000&q=80'
  ],
  cavapoo1: [
    'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1000&q=80'
  ],
  shihtzu1: [
    'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1534361960057-19889db98a1e?auto=format&fit=crop&w=1000&q=80'
  ],
  koreanTeacup: [
    'https://images.unsplash.com/photo-1583511666407-5f06533f2113?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?auto=format&fit=crop&w=1000&q=80'
  ]
};

export const sampleVideoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-little-dog-playing-in-the-grass-1176-large.mp4';

export const initialPuppies = [
  {
    name: 'Max',
    slug: 'maltipoo-max-male',
    breed: 'Maltipoo',
    gender: 'male',
    ageMonths: 2.5,
    ageLabel: '2.5 months Maltipoo',
    origin: 'imported',
    status: 'available',
    images: samplePuppyPhotos.maltipoo1,
    videoUrl: sampleVideoUrl,
    description: 'Max is an extraordinary Korean Teacup Maltipoo with big doe eyes, a creamy plush coat, and a heart full of joy. He is playful, affectionate, and hypoallergenic.',
    healthInfo: 'Microchipped, vaccinated (1st & 2nd DHPPi), dewormed 3x, Korean vet health certificate & travel passport included.',
    price: 'AED 14,500',
    featured: true
  },
  {
    name: 'Coco',
    slug: 'korean-teacup-poodle-female',
    breed: 'Poodle',
    gender: 'female',
    ageMonths: 3,
    ageLabel: '3 months Korean Teacup Poodle',
    origin: 'imported',
    status: 'available',
    images: samplePuppyPhotos.poodle1,
    videoUrl: sampleVideoUrl,
    description: 'Coco is an exquisite tiny red toy poodle with gorgeous curls and a calm, cuddle-loving personality. Perfect for apartment living in Downtown or Marina.',
    healthInfo: 'Full official Korean Kennel Club documentation, microchip, rabies titer tested, international flight health pass.',
    price: 'AED 16,000',
    featured: true
  },
  {
    name: 'Bella',
    slug: 'maltipoo-cavapoo-female',
    breed: 'Cavapoo',
    gender: 'female',
    ageMonths: 2,
    ageLabel: '2 months Cavapoo',
    origin: 'local',
    status: 'available',
    images: samplePuppyPhotos.cavapoo1,
    videoUrl: sampleVideoUrl,
    description: 'Bella is currently playing in our Downtown Dubai showroom! She has a soft wavy apricot coat and loves nothing more than curling up in your lap.',
    healthInfo: 'Dubai municipality registered, microchipped, completed all age-appropriate vaccinations and full clinical vet clearance.',
    price: 'AED 12,500',
    featured: true
  },
  {
    name: 'Teddy',
    slug: 'toy-poodle-male',
    breed: 'Poodle',
    gender: 'male',
    ageMonths: 2.5,
    ageLabel: '2.5 months Toy Poodle',
    origin: 'local',
    status: 'available',
    images: samplePuppyPhotos.poodle1,
    videoUrl: sampleVideoUrl,
    description: 'Meet Teddy, the quintessential living teddy bear! Playful, hypoallergenic, and great with children and other pets.',
    healthInfo: 'Vaccinated, dewormed, healthy heart & patellas checked by certified Dubai veterinary specialist.',
    price: 'AED 11,800',
    featured: true
  },
  {
    name: 'Luna',
    slug: 'pomeranian-female',
    breed: 'Pomeranian',
    gender: 'female',
    ageMonths: 2,
    ageLabel: '2 months Korean Teacup Pomeranian',
    origin: 'imported',
    status: 'available',
    images: samplePuppyPhotos.pomeranian1,
    videoUrl: sampleVideoUrl,
    description: 'Pure snow-white cloud with tiny ears and a darling baby face. Luna comes from elite lineage breeders in Seoul.',
    healthInfo: 'Pedigree papers, health passport, microchipped, fully dewormed and vet examined.',
    price: 'AED 17,500',
    featured: true
  },
  {
    name: 'Milo',
    slug: 'shitzu-female-milo',
    breed: 'Shih Tzu',
    gender: 'female',
    ageMonths: 3,
    ageLabel: '3 months Shih Tzu Princess',
    origin: 'local',
    status: 'available',
    images: samplePuppyPhotos.shihtzu1,
    videoUrl: sampleVideoUrl,
    description: 'Milo is a gentle, silky-coated Shih Tzu with an angelic temperament. Ready to meet her forever family at our Downtown Dubai showroom.',
    healthInfo: 'Full health checkup report, microchip, primary vaccines completed, complimentary first grooming voucher.',
    price: 'AED 9,500',
    featured: true
  },
  {
    name: 'Oliver',
    slug: 'korean-teacup-maltipoo-male-oliver',
    breed: 'Maltipoo',
    gender: 'male',
    ageMonths: 2,
    ageLabel: '2 months Korean Teacup Maltipoo',
    origin: 'imported',
    status: 'available',
    images: samplePuppyPhotos.koreanTeacup,
    videoUrl: sampleVideoUrl,
    description: 'Pocket-sized charm! Oliver will weigh under 2kg fully grown. He is sweet, intelligent, and already pad trained.',
    healthInfo: 'Official health certificate, microchipped, export quarantine clearance, health warranty.',
    price: 'AED 15,000',
    featured: false
  },
  {
    name: 'Daisy',
    slug: 'cavapoo-apricot-daisy',
    breed: 'Cavapoo',
    gender: 'female',
    ageMonths: 2.5,
    ageLabel: '2.5 months Apricot Cavapoo',
    origin: 'local',
    status: 'available',
    images: samplePuppyPhotos.cavapoo1,
    videoUrl: sampleVideoUrl,
    description: 'Daisy has the silkiest caramel curls and the friendliest soul in Dubai. Great with families and very responsive.',
    healthInfo: 'Certified UAE vet book, initial vaccines complete, microchip verified.',
    price: 'AED 12,000',
    featured: false
  },
  {
    name: 'Bailey',
    slug: 'teacup-pomeranian-bailey',
    breed: 'Pomeranian',
    gender: 'male',
    ageMonths: 3,
    ageLabel: '3 months Teacup Pomeranian',
    origin: 'imported',
    status: 'available',
    images: samplePuppyPhotos.pomeranian1,
    videoUrl: sampleVideoUrl,
    description: 'A fluffy bundle of happiness imported from South Korea. Bailey has a short muzzle, dense double coat, and happy strut.',
    healthInfo: 'International passport, negative fecal and blood panels, microchipped.',
    price: 'AED 16,500',
    featured: false
  },
  {
    name: 'Rosie',
    slug: 'korean-red-poodle-rosie',
    breed: 'Poodle',
    gender: 'female',
    ageMonths: 2,
    ageLabel: '2 months Korean Teacup Poodle',
    origin: 'imported',
    status: 'available',
    images: samplePuppyPhotos.poodle1,
    videoUrl: sampleVideoUrl,
    description: 'Deep mahogany red coat with bright curious eyes. Rosie is affectionate, gentle, and loves to perch on your shoulder.',
    healthInfo: 'Full health check completed by licensed Korean and UAE veterinary doctors.',
    price: 'AED 15,800',
    featured: false
  },
  {
    name: 'Charlie',
    slug: 'maltipoo-cream-charlie',
    breed: 'Maltipoo',
    gender: 'male',
    ageMonths: 2.5,
    ageLabel: '2.5 months Cream Maltipoo',
    origin: 'local',
    status: 'available',
    images: samplePuppyPhotos.maltipoo1,
    videoUrl: sampleVideoUrl,
    description: 'Charlie is ready for visits today! Sweet, socialized, loves tummy rubs, and has an exceptionally soft fleece coat.',
    healthInfo: 'Vaccinated, microchipped, dewormed, includes welcome puppy starter pack.',
    price: 'AED 11,500',
    featured: false
  },
  {
    name: 'Archie',
    slug: 'mini-shih-tzu-archie',
    breed: 'Shih Tzu',
    gender: 'male',
    ageMonths: 3,
    ageLabel: '3 months Mini Shih Tzu',
    origin: 'local',
    status: 'available',
    images: samplePuppyPhotos.shihtzu1,
    videoUrl: sampleVideoUrl,
    description: 'Archie is our gentle prince. He has stunning tri-color markings and the sweetest, most loyal personality.',
    healthInfo: 'Healthy eyes and knees certified by vet, full vaccination record, microchipped.',
    price: 'AED 10,000',
    featured: false
  },
  {
    name: 'Chloe',
    slug: 'korean-teacup-maltipoo-chloe',
    breed: 'Maltipoo',
    gender: 'female',
    ageMonths: 2,
    ageLabel: '2 months Korean Teacup Maltipoo',
    origin: 'imported',
    status: 'available',
    images: samplePuppyPhotos.koreanTeacup,
    videoUrl: sampleVideoUrl,
    description: 'Chloe is an ultra-rare micro Korean Maltipoo with tiny button nose and baby-doll face. She is playful and sweet.',
    healthInfo: 'Import clearance, vet certificate, microchipped, fully vaccinated up to 8 weeks.',
    price: 'AED 18,000',
    featured: false
  },
  {
    name: 'Winston',
    slug: 'teacup-cavapoo-ruby-winston',
    breed: 'Cavapoo',
    gender: 'male',
    ageMonths: 2.5,
    ageLabel: '2.5 months Ruby Cavapoo',
    origin: 'local',
    status: 'available',
    images: samplePuppyPhotos.cavapoo1,
    videoUrl: sampleVideoUrl,
    description: 'Rich ruby coat with white chest star. Winston is confident, cheerful, and loves cuddling with kids.',
    healthInfo: 'Dewormed, primary vaccinations done, microchipped, 1-year health guarantee against genetic conditions.',
    price: 'AED 13,000',
    featured: false
  },
  {
    name: 'Leo',
    slug: 'korean-micro-poodle-leo',
    breed: 'Poodle',
    gender: 'male',
    ageMonths: 2,
    ageLabel: '2 months Korean Micro Poodle',
    origin: 'imported',
    status: 'available',
    images: samplePuppyPhotos.poodle1,
    videoUrl: sampleVideoUrl,
    description: 'Leo is a tiny silver-beige poodle with sharp intelligence and affectionate nature. Super hypoallergenic and non-shedding.',
    healthInfo: 'Full veterinary documentation, microchipped, imported directly from elite kennel in Incheon.',
    price: 'AED 16,000',
    featured: false
  },
  {
    name: 'Ruby',
    slug: 'korean-teacup-maltipoo-ruby',
    breed: 'Maltipoo',
    gender: 'female',
    ageMonths: 2.5,
    ageLabel: '2.5 months Korean Teacup Maltipoo',
    origin: 'imported',
    status: 'available',
    images: samplePuppyPhotos.maltipoo1,
    videoUrl: sampleVideoUrl,
    description: 'Ruby has the softest champagne curls and an adorable waddling walk. She loves being held like a baby doll.',
    healthInfo: 'Comprehensive health check, microchipped, up to date on DHPPi vaccinations.',
    price: 'AED 15,500',
    featured: false
  },

  // ADOPTED / GONE HOME PUPPIES
  {
    name: 'Prince',
    slug: 'korean-teacup-maltese-prince',
    breed: 'Maltipoo',
    gender: 'male',
    ageMonths: 4,
    ageLabel: 'Adopted at 3 months',
    origin: 'imported',
    status: 'sold',
    images: samplePuppyPhotos.koreanTeacup,
    videoUrl: sampleVideoUrl,
    description: 'Prince found his forever family in Emirates Hills, Dubai! He is thriving with his two loving human siblings.',
    healthInfo: 'Fully vaccinated & health guaranteed.',
    price: 'Adopted',
    featured: false,
    soldAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12)
  },
  {
    name: 'Honey',
    slug: 'apricot-maltipoo-honey',
    breed: 'Maltipoo',
    gender: 'female',
    ageMonths: 4,
    ageLabel: 'Adopted at 2.5 months',
    origin: 'local',
    status: 'sold',
    images: samplePuppyPhotos.maltipoo1,
    videoUrl: sampleVideoUrl,
    description: 'Honey went home with a wonderful family in Palm Jumeirah. She now enjoys daily sunsets by the private beach.',
    healthInfo: 'Fully vaccinated & microchipped.',
    price: 'Adopted',
    featured: false,
    soldAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20)
  },
  {
    name: 'Mochi',
    slug: 'white-pomeranian-mochi',
    breed: 'Pomeranian',
    gender: 'male',
    ageMonths: 5,
    ageLabel: 'Adopted at 3 months',
    origin: 'imported',
    status: 'sold',
    images: samplePuppyPhotos.pomeranian1,
    videoUrl: sampleVideoUrl,
    description: 'Mochi now resides in Downtown Dubai with his devoted owners. He is the king of Dubai Mall walkies!',
    healthInfo: 'Fully vaccinated & microchipped.',
    price: 'Adopted',
    featured: false,
    soldAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 35)
  },
  {
    name: 'Cookie',
    slug: 'korean-teacup-poodle-cookie',
    breed: 'Poodle',
    gender: 'female',
    ageMonths: 4,
    ageLabel: 'Adopted at 2.5 months',
    origin: 'imported',
    status: 'sold',
    images: samplePuppyPhotos.poodle1,
    videoUrl: sampleVideoUrl,
    description: 'Cookie joined a lovely family in Dubai Marina. Her owners send us weekly WhatsApp photos of her new outfits!',
    healthInfo: 'Fully vaccinated & microchipped.',
    price: 'Adopted',
    featured: false,
    soldAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45)
  }
];

export const initialTestimonials = [
  {
    name: 'Sarah M.',
    location: 'Downtown Dubai, UAE',
    quote: 'Finding our little Maltipoo Max through TeddyPups was the smoothest experience. The health check, Korean import passport, and door-to-door concierge in Downtown Dubai was 5-star.',
    featured: true,
    rating: 5
  },
  {
    name: 'Rashid & Noura Al Mansoori',
    location: 'Saadiyat Island, Abu Dhabi',
    quote: 'Our tiny Pomeranian Bella arrived in pristine health. The team kept us updated every single day with WhatsApp videos until she reached our home safely. Unmatched care and transparency!',
    featured: true,
    rating: 5
  },
  {
    name: 'Elena K.',
    location: 'Dubai Marina, UAE',
    quote: 'The showroom in Downtown Dubai is gorgeous and impeccably clean. You can immediately feel how cherished every puppy is. Truly, every puppy is family.',
    featured: true,
    rating: 5
  },
  {
    name: 'The Al Qasimi Family',
    location: 'Al Zahia, Sharjah',
    quote: 'From our first WhatsApp message to welcoming Coco home, the concierge guided us through vaccinations, puppy nutrition, and 24/7 care. Outstanding service.',
    featured: false,
    rating: 5
  }
];

export const initialHappyFamilies = [
  {
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    caption: 'Sarah with baby Max in Downtown Dubai 🐾✨',
    order: 1
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    caption: 'Noura and little Bella enjoying morning cuddles 🤍🧸',
    order: 2
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    caption: 'Elena & Coco exploring Dubai Marina promenade ☀️🐶',
    order: 3
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
    caption: 'First birthday celebration for Prince in Palm Jumeirah 🎂🎉',
    order: 4
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    caption: 'The kids welcoming Milo to their Arabian Ranches villa 🏡❤️',
    order: 5
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
    caption: 'Sweetest nap time with baby Luna 💤🍼',
    order: 6
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    caption: 'Sunday roadtrip to Hatta with Daisy 🚙🐕',
    order: 7
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    caption: 'Our proud puppy parents in Jumeirah Islands 🌟🐾',
    order: 8
  }
];

export const initialFAQs = [
  {
    question: 'Are your puppies vaccinated and health-checked?',
    answer: 'Every TeddyPup undergoes thorough veterinary examinations before joining our family. They come with all age-appropriate vaccinations (DHPPi), microchipped, fully dewormed, and accompanied by an official veterinary health passport and medical record.',
    category: 'Health & Care',
    order: 1
  },
  {
    question: 'Can I meet a puppy before I decide?',
    answer: 'Yes, absolutely! We welcome you to visit our luxury showroom in Downtown Dubai (by appointment) to spend quality time playing and bonding with our available local puppies. For imported puppies currently in Korea, our concierge will arrange real-time live WhatsApp HD video calls so you can see them interactive and playing.',
    category: 'Showroom & Visits',
    order: 2
  },
  {
    question: 'Can I take my puppy home the same day?',
    answer: 'For puppies already residing in our Downtown Dubai showroom who have fulfilled their clinical checks, same-day collection or white-glove chauffeur delivery to your residence across Dubai, Abu Dhabi, and the Northern Emirates is readily available.',
    category: 'Showroom & Visits',
    order: 3
  },
  {
    question: 'Do you import puppies from abroad?',
    answer: 'Yes! We specialize in exclusive Korean teacup and teddy-bear breeds (Maltipoo, Poodle, Pomeranian) from prestigious ethical breeding partners in South Korea known for exceptional doll faces, compact teacup proportions, and calm, loving temperaments.',
    category: 'Import & Travel',
    order: 4
  },
  {
    question: 'How does an imported puppy travel to Dubai safely?',
    answer: 'Imported puppies fly under direct temperature-controlled, pet-safe pressurized cabin standards with accredited pet travel couriers. They arrive safely at Dubai International Airport (DXB), clear ministry veterinary clearance smoothly, and rest comfortably before arriving in your arms.',
    category: 'Import & Travel',
    order: 5
  },
  {
    question: 'Will I see photos and health details first on WhatsApp?',
    answer: 'Yes! Our entire concierge process is conducted via WhatsApp. We will share high-resolution videos, close-up photos, parent breed lineage, weight progression charts, and veterinary notes before you confirm your reservation.',
    category: 'General',
    order: 6
  },
  {
    question: 'Do you deliver across the UAE and worldwide?',
    answer: 'Yes. We offer white-glove doorstep delivery across Dubai, Abu Dhabi, Sharjah, Ajman, RAK, and Fujairah. We also coordinate international concierge shipping to clients across the GCC (Saudi Arabia, Qatar, Kuwait, Bahrain, Oman) and worldwide with complete export documentation.',
    category: 'Delivery & Shipping',
    order: 7
  },
  {
    question: 'Which breeds do you usually have?',
    answer: 'We specialize in small and teacup companion breeds: Maltipoo, Korean Teacup Poodle, Miniature Pomeranian, Cavapoo, and Shih Tzu. We focus exclusively on hypoallergenic, apartment-friendly, gentle companion dogs.',
    category: 'General',
    order: 8
  },
  {
    question: 'Is there help after my puppy comes home?',
    answer: 'Our relationship begins the day your puppy comes home! You receive 24/7 WhatsApp concierge support for nutrition questions, potty training guidance, vaccination scheduling, and lifetime care advice.',
    category: 'Health & Care',
    order: 9
  }
];

export const initialSettings = {
  brandName: 'TeddyPups',
  tagline: 'every puppy is family',
  whatsappNumber: '+971 50 123 4567',
  whatsappCleanNumber: '971501234567',
  phone: '+971 4 321 0000',
  email: 'concierge@teddypups.ae',
  address: 'Downtown Dubai, Boulevard Plaza Tower 1, United Arab Emirates',
  hours: 'Daily: 10:00 AM – 9:00 PM (By appointment)',
  socials: {
    instagram: 'https://instagram.com/teddypups.ae',
    tiktok: 'https://tiktok.com/@teddypups.ae',
    facebook: 'https://facebook.com/teddypups.ae'
  }
};

export const getDefaultAdmin = async () => {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('TeddyPups2026!', salt);
  return {
    email: 'admin@teddypups.ae',
    passwordHash,
    name: 'TeddyPups Concierge'
  };
};

export const getDefaultEnquiries = () => [
  {
    _id: 'enq_1',
    name: 'Amira Al Nuaimi',
    phone: '+971 55 987 6543',
    email: 'amira.alnuaimi@gmail.com',
    message: 'Hi TeddyPups! I would love to visit your Downtown showroom this Saturday to see Max and Bella in person.',
    puppyId: 'pup_1',
    puppyName: 'Max (Korean Teacup Maltipoo)',
    status: 'contacted',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  }
];
