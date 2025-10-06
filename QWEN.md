# Spicy Town CSG - Project Context

## Project Overview

Spicy Town CSG is an authentic Pakistani restaurant website built with Next.js 15. The site is designed to showcase Pakistani cuisine in Italy, featuring sections for dishes, menu, chefs, gallery, and more. It uses a modern tech stack with TypeScript, Tailwind CSS, and shadcn/ui components.

## Key Technologies & Dependencies

- **Framework**: Next.js 15.5.4 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with CSS variables
- **UI Components**: shadcn/ui components using Radix UI primitives
- **Icons**: Lucide React
- **Animations**: Framer Motion, tw-animate-css
- **Date Handling**: date-fns
- **Charts**: Recharts
- **Forms**: React Hook Form with Zod validation
- **Theming**: next-themes for dark/light mode
- **Framer Motion**: For animations

## Project Architecture

- **Frontend**: Next.js 15 application using the App Router pattern
- **UI**: Component-based architecture with shadcn/ui components
- **Styling**: Tailwind CSS with custom color variables (white and orange theme)
- **Fonts**: Geist (from Vercel) for both sans and mono variants

## Directory Structure

- `/app` - Next.js App Router pages (contains layout.tsx, page.tsx, globals.css)
- `/components` - React components including sections and UI elements
- `/components/ui` - shadcn/ui reusable components
- `/hooks` - Custom React hooks (e.g., use-language)
- `/lib` - Utility functions and shared logic

## Key Components

- Splash screen on initial load
- Navbar with navigation elements
- Hero section for restaurant introduction
- Dishes and menu sections showcasing food offerings
- Chef profiles and team information
- Video section for immersive experience
- Gallery section with images
- Customer experience testimonials
- Information section with restaurant details
- Book table functionality
- AI assistant feature
- Footer with contact information

## Important Configuration Files

- `next.config.ts` - Next.js configuration including remote image patterns for api.qrserver.com
- `tsconfig.json` - TypeScript configuration with path aliases
- `components.json` - shadcn/ui configuration (New York style, with CSS variables)
- `tailwind.config.js` - Tailwind CSS configuration (uses CSS variables)

## Color Palette

The site uses a white and orange theme based on OKLCH color space with CSS variables:
- Primary: Orange (oklch(0.65 0.19 45))
- Background: Light/White (oklch(0.99 0.005 85))
- Foreground: Dark (oklch(0.2 0.01 60))

## Building and Running

### Development Commands
```bash
npm run dev    # Start development server
npm run build  # Build the application
npm run start  # Start production server
npm run lint   # Lint the code
```

### Default Development Server
- Runs on http://localhost:3000
- Hot Module Replacement (HMR) enabled

## Development Conventions

- Uses React Server Components (RSC) as specified in components.json
- Component organization is modular with reusable sections
- Path aliases are set up: `@/*` maps to project root
- Accessibility is implemented via Radix UI primitives
- Responsive design with Tailwind CSS
- TypeScript type safety throughout
- Modern CSS (Tailwind CSS v4 with CSS variables)
- Internationalization support (based on language provider)

## Special Features

- Splash screen animation on initial load
- AI assistant integration
- Multi-language support (via LanguageProvider)
- QR code support for images (configured in next.config.ts)
- Animated transitions using Framer Motion
- Responsive design for all devices
- Dark theme support via next-themes