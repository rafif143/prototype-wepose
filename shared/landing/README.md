# Shared Landing Components

This directory contains landing page components that are shared between V1 and V2 landing pages.

## Components

- `about-section.tsx` - "Jelajahi Dashboard Anda" section
- `blog-section.tsx` - Blog preview section
- `contact-section.tsx` - Contact form section
- `cta-dual-section.tsx` - Dual call-to-action section
- `cta-section.tsx` - Final call-to-action section
- `extra-services-section.tsx` - Additional services section
- `faq-section.tsx` - Frequently asked questions
- `how-it-works-section.tsx` - How it works explanation
- `supported-countries-section.tsx` - Supported countries grid
- `testimonials-section.tsx` - Customer testimonials
- `track-visa-section.tsx` - Visa tracking functionality

## Usage

These components are imported and used by both:
- `/` (V1 landing page)
- `/landing-v2` (V2 landing page)

## Guidelines

- Keep these components generic and configurable
- Avoid V1 or V2 specific styling
- Use props for customization when needed