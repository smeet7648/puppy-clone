import React from 'react';
import { Helmet } from 'react-helmet-async';

export const SEO = ({
  title = 'TeddyPups U.A.E. — Premium teacup puppies in Dubai',
  description = 'Teddy bear and teacup puppies in Dubai. Meet local puppies in our Downtown Dubai showroom or bring home a rare breed imported from trusted breeders.',
  keywords = 'teacup puppies dubai, teddy bear puppy uae, maltipoo dubai, teacup poodle dubai, cavapoo uae, korean teacup puppy, teacup dogs dubai, buy puppy dubai',
  image = '/logo.svg',
  slug = '',
  type = 'website',
  puppyData = null
}) => {
  const siteUrl = typeof window !== 'undefined' && window.location.origin
    ? window.location.origin
    : 'https://puppy.instabizweb.com';
  const url = slug ? `${siteUrl}${slug.startsWith('/') ? slug : `/${slug}`}` : siteUrl;
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image.startsWith('/') ? image : `/${image}`}`;

  const schemas = [
    // Local Business / Pet Store Schema
    {
      '@context': 'https://schema.org',
      '@type': 'PetStore',
      '@id': `${siteUrl}/#petstore`,
      name: 'TeddyPups Dubai',
      legalName: 'TeddyPups Luxury Pets Concierge L.L.C.',
      description,
      url: siteUrl,
      logo: `${siteUrl}/logo.svg`,
      image: imageUrl,
      telephone: '+971 4 321 0000',
      priceRange: '$$$$',
      currenciesAccepted: 'AED, USD, EUR',
      paymentAccepted: 'Cash, Credit Card, Bank Transfer',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Boulevard Plaza Tower 1, Downtown Dubai',
        addressLocality: 'Dubai',
        addressRegion: 'Dubai',
        postalCode: '00000',
        addressCountry: 'AE'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '25.1972',
        longitude: '55.2744'
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '10:00',
          closes: '21:00'
        }
      ],
      sameAs: [
        'https://instagram.com/teddypups.ae',
        'https://tiktok.com/@teddypups.ae',
        'https://facebook.com/teddypups.ae'
      ]
    },
    // BreadcrumbList Schema
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: siteUrl
        },
        ...(slug ? [{
          '@type': 'ListItem',
          position: 2,
          name: title.split('—')[0].trim(),
          item: url
        }] : [])
      ]
    }
  ];

  // If puppy detail page, add Product schema
  if (puppyData) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: `${puppyData.name} — ${puppyData.breed}`,
      image: imageUrl,
      description: puppyData.description || description,
      brand: {
        '@type': 'Brand',
        name: 'TeddyPups'
      },
      category: puppyData.breed,
      offers: {
        '@type': 'Offer',
        priceCurrency: 'AED',
        price: puppyData.priceAed || '15000',
        availability: puppyData.status === 'available' ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
        url,
        seller: {
          '@type': 'PetStore',
          name: 'TeddyPups Dubai'
        }
      }
    });
  }

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content="TeddyPups U.A.E." />
      <meta property="og:locale" content="en_AE" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={url} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@teddypups_ae" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Structured JSON-LD Data */}
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};
