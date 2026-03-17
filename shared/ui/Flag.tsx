import React from 'react';

interface FlagProps {
  countryCode: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Flag({ countryCode, className = '', size = 'md' }: FlagProps) {
  const sizeClasses = {
    sm: 'w-4 h-3',
    md: 'w-6 h-4',
    lg: 'w-8 h-6'
  };

  return (
    <span 
      className={`fi fi-${countryCode.toLowerCase()} inline-block ${sizeClasses[size]} ${className}`}
      style={{ 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '2px'
      }}
    />
  );
}

// Country code mapping for common countries
export const countryCodeMap = {
  // Schengen countries
  'france': 'fr',
  'prancis': 'fr',
  'germany': 'de', 
  'jerman': 'de',
  'italy': 'it',
  'italia': 'it',
  'netherlands': 'nl',
  'belanda': 'nl',
  'spain': 'es',
  'spanyol': 'es',
  'switzerland': 'ch',
  'swiss': 'ch',
  
  // Other popular destinations
  'uk': 'gb',
  'inggris': 'gb',
  'united kingdom': 'gb',
  'japan': 'jp',
  'jepang': 'jp',
  'korea': 'kr',
  'korea selatan': 'kr',
  'south korea': 'kr',
  'china': 'cn',
  'thailand': 'th',
  'usa': 'us',
  'united states': 'us',
  'amerika serikat': 'us',
  'amerika': 'us',
  'australia': 'au',
  'uae': 'ae',
  'dubai': 'ae',
  'canada': 'ca',
  'kanada': 'ca',
  
  // Language codes
  'indonesia': 'id',
  'english': 'gb',
  'chinese': 'cn',
  'japanese': 'jp',
  'thai': 'th',
  'russian': 'ru',
  'german': 'de',
  'french': 'fr',
  'arabic': 'sa',
  
  // Special cases
  'schengen': 'eu',
  'eropa': 'eu',
  'europe': 'eu'
} as const;

export function getCountryCode(country: string): string {
  const normalized = country.toLowerCase().trim();
  return countryCodeMap[normalized as keyof typeof countryCodeMap] || normalized;
}