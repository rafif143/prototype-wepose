# Landing V2 Components

This directory contains V2-specific landing page components with **left-aligned headers** and modern design patterns.

## V2 Design Philosophy

- **Left-aligned headers** instead of centered (more modern, less formal)
- **Header + CTA layout** with action buttons on the right side
- **Responsive CTAs** that move to bottom on mobile
- **Consistent animation patterns** sliding from left/right instead of top

## Components

### V2-Specific Components
- `HeroSectionV2.tsx` - V2 hero section with Traveloka-style design
- `PopularVisaSectionV2.tsx` - V2 visa section with left-aligned headers (no divider)
- `PromoBannerV2.tsx` - V2 promo banner component
- `AboutSectionV2.tsx` - V2 about section with left header + dashboard CTA
- `HowItWorksSectionV2.tsx` - V2 how-it-works with left header + start CTA
- `SupportedCountriesSectionV2.tsx` - V2 countries section with left header + view all CTA
- `TestimonialsSectionV2.tsx` - V2 testimonials with left header + reviews CTA

### Shared Components (used by both V1 & V2)
- `TrackVisaSection` - Visa tracking (header already centered, no V2 needed)
- `ExtraServicesSection` - Additional services
- `BlogSection` - Blog preview
- `ContactSection` - Contact form
- `CtaDualSection` - Dual CTA
- `FaqSection` - FAQ
- `CtaSection` - Final CTA

## Usage

These components are used exclusively by `/landing-v2` page and represent the modern, left-aligned header approach.

## Header Pattern

All V2 components follow this header pattern:

```tsx
{/* Header - Left Aligned */}
<div className="flex items-end justify-between mb-12">
  <div>
    <motion.h2 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      // ... left slide animation
    >
      Section Title
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      // ... left slide animation
    >
      Section description
    </motion.p>
  </div>
  
  {/* Right side CTA - Desktop only */}
  <motion.div className="hidden md:block">
    <Link href="/action">Action Button</Link>
  </motion.div>
</div>

{/* Mobile CTA - Mobile only */}
<div className="mt-12 text-center md:hidden">
  <Link href="/action">Mobile Action Button</Link>
</div>
```