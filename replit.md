# ForYourInfluence - Chef-Led Food Experience Platform

## Overview

ForYourInfluence is a Progressive Web App (PWA) for a South African chef-led food review platform. The application showcases independent restaurant and takeaway reviews, integrates with YouTube for video content, and uses Google Maps Places API to fetch restaurant details dynamically. The platform emphasizes authenticity - all reviews are self-funded with no sponsorships.

## Recent Changes (December 20, 2024)

### SEO Setup - Production Ready
- Created dynamic page titles and meta descriptions for all pages
- Added JSON-LD structured data for Organization, Person (Chef Wesley), and LocalBusiness
- Implemented canonical URLs for duplicate content prevention
- Created robots.txt and sitemap.xml for search engine discovery
- Added usePageMeta hook for managing per-page SEO metadata
- All SEO data is centralized in site-content.ts, no hardcoding

**Files Added:**
- `client/public/robots.txt` - Search engine crawling instructions
- `client/public/sitemap.xml` - Site structure for search engines
- `client/src/hooks/use-page-meta.ts` - Hook for dynamic page metadata

**Files Modified:**
- `client/index.html` - Added canonical URL, JSON-LD schemas
- `client/src/data/site-content.ts` - Added SEO metadata for each page
- `client/src/pages/home.tsx` - Integrated usePageMeta hook
- `client/src/pages/about.tsx` - Integrated usePageMeta hook
- `client/src/pages/favourites.tsx` - Integrated usePageMeta hook
- `client/src/pages/contact.tsx` - Integrated usePageMeta hook

### SEO Features Implemented

**Search Engine Optimization:**
- Unique, descriptive page titles (55-60 characters)
- Page-specific meta descriptions (155-160 characters)
- Open Graph tags for social media sharing
- Twitter card tags for social visibility
- Canonical URLs to prevent duplicate content issues

**Structured Data (Schema.org):**
- Organization schema with business information and social profiles
- Person schema for Chef Wesley (founder/reviewer)
- LocalBusiness schema indicating South African food review service
- All structured data uses real information from site content

**Technical SEO:**
- robots.txt with proper crawl instructions
- Dynamic XML sitemap with change frequency and priority
- Responsive design with mobile viewport meta tag
- PWA manifest for installation and app-like experience
- Service Worker for offline capabilities

## User Preferences

Preferred communication style: Simple, everyday language without marketing speak.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS v4 with CSS variables for theming
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Build Tool**: Vite with custom plugins for meta images and Replit integration
- **SEO**: Dynamic page titles and meta tags via usePageMeta hook

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript compiled with tsx for development, esbuild for production
- **API Design**: RESTful endpoints prefixed with `/api`
- **Server Structure**: Modular routes in `server/routes/` with services in `server/services/`

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` using Zod for validation
- **Current Storage**: In-memory storage (`MemStorage` class) for development
- **Database Ready**: Drizzle config expects `DATABASE_URL` environment variable for PostgreSQL

### Progressive Web App Features
- Service Worker for offline caching (`client/public/sw.js`)
- Web App Manifest for installability
- Responsive mobile-first design

### Key Design Patterns
- **Shared Types**: Schema and types in `shared/` directory accessible by both client and server
- **Path Aliases**: `@/` for client source, `@shared/` for shared code, `@assets/` for attached assets
- **Content Management**: Centralized site content in `client/src/data/site-content.ts` for easy editing (now includes SEO metadata)
- **Component Library**: Reusable UI components in `client/src/components/ui/`
- **SEO Management**: All page metadata (titles, descriptions) centralized in site-content.ts and managed via usePageMeta hook

## External Dependencies

### Third-Party APIs
- **Google Maps Places API**: Fetches restaurant details, photos, and ratings dynamically
  - Requires `GOOGLE_MAPS_API_KEY` environment variable
  - Server-side implementation in `server/services/googleMapsService.ts`

- **YouTube Data API**: Fetches latest videos from channel
  - Requires `VITE_YOUTUBE_API_KEY` and `VITE_YOUTUBE_CHANNEL_ID` environment variables
  - Client-side implementation in `client/src/hooks/use-youtube.ts`

### Database
- PostgreSQL (when `DATABASE_URL` is configured)
- Drizzle ORM for type-safe database operations

### Key NPM Packages
- `axios`: HTTP client for API requests
- `express`: Web server framework
- `drizzle-orm` / `drizzle-zod`: Database ORM and validation
- `@tanstack/react-query`: Async state management
- `wouter`: Client-side routing
- `vaul`: Drawer component
- `embla-carousel-react`: Carousel functionality

## Deployment

### Current Setup
- Configured for Render deployment (see `DEPLOYMENT_GUIDE.md`)
- Build outputs to `dist/` directory
- Static files served from `dist/public`

### SEO for Production
- robots.txt will be served from `/robots.txt`
- sitemap.xml will be served from `/sitemap.xml`
- All meta tags are dynamically updated per page
- JSON-LD schemas help search engines understand content
- No hardcoded values - everything comes from site-content.ts

## How to Update SEO Information

All SEO data is managed in `client/src/data/site-content.ts`. To update any SEO content:

1. **Page Title**: Edit `page.metaTitle` in the relevant section
2. **Meta Description**: Edit `page.metaDescription` in the relevant section
3. **Site URL**: Update `siteUrl` at the top of site-content.ts
4. **Chef Information**: Update `chef.name` and `chef.url` if needed
5. **Organization Info**: Modify JSON-LD in index.html for business details

The `usePageMeta` hook automatically updates the document title and meta tags when pages load.

## Maintenance Notes

- robots.txt allows all crawlers except AI bots (GPTBot, Claude, Anthropic)
- Sitemap updates URLs with their change frequency and priority
- JSON-LD schemas help with Google's knowledge graph and rich results
- Monitor Google Search Console for indexing status and issues
- All SEO setup is production-ready and follows best practices
