import React from 'react';
import { Helmet } from 'react-helmet-async';

export const SEO = ({
  title = 'TeddyPups U.A.E. — Premium teacup puppies in Dubai',
  description = 'Teddy bear and teacup puppies in Dubai. Meet local puppies in our Downtown Dubai showroom or bring home a rare breed imported from trusted breeders.',
  image = '/logo.svg',
  slug = ''
}) => {
  const siteUrl = 'https://puppy.instabizweb.com';
  const url = slug ? `${siteUrl}${slug}` : siteUrl;

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'PetStore',
    name: 'TeddyPups Dubai',
    description,
    url,
    telephone: '+971 4 321 0000',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Boulevard Plaza Tower 1, Downtown Dubai',
      addressLocality: 'Dubai',
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
    ]
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};
