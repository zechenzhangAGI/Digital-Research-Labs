# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Harvard Physics Lab Hub - A Next.js 15 platform for Harvard Physics Department's research infrastructure management, collaboration matching, and equipment booking.

## Development Commands

```bash
# Install dependencies
pnpm install

# Run development server with Turbopack (port 3001 if 3000 is occupied)
pnpm dev

# Build for production (Note: NO --turbopack flag for production builds)
pnpm build

# Start production server
pnpm start

# Type checking
pnpm tsc --noEmit

# Deployment to Vercel
git push origin main  # Auto-deploys via GitHub integration
```

## Architecture & Key Components

### Page Structure (App Router)
- **`/` (Homepage)**: Hero section, lab statistics, featured labs grid, AI insights panel
- **`/labs`**: Searchable lab directory with filters by category, real-time search
- **`/labs/[id]`**: Individual lab pages with image galleries, team info, publications, equipment lists
- **`/equipment`**: Equipment database with availability status, booking interface, type filtering
- **`/map`**: Interactive SVG floor plans with zoom/pan (react-zoom-pan-pinch), clickable lab rooms
- **`/ai`**: AI collaboration matching, grant opportunities, research trends visualization

### Data Flow Architecture
- All pages use **client-side components** ("use client") for interactivity
- Mock data is embedded in components (ready for API integration)
- State management via React hooks (useState) - Zustand is installed but not yet implemented
- No backend/API routes currently - all data is static/mock

### Interactive Map Implementation
The map page uses inline SVG with React event handlers for lab room interaction:
- Floor switching (2, 3, 4) with different layouts per floor
- Hover states change room fill colors
- Click handlers update selectedLab state
- Lab details panel shows info for selected room
- Color coding by research type (Quantum: blue, Optics: purple, etc.)

### UI Component Library
Using shadcn/ui components with Radix UI primitives:
- Components in `components/ui/` are auto-generated via `pnpm dlx shadcn@latest add [component]`
- Custom navigation component wraps NavigationMenu with dropdown for Equipment submenu
- All components use Tailwind CSS v4 with CSS variables for theming

### Animation Strategy
- **Framer Motion**: Page transitions, image galleries, modal animations
- **CSS Transitions**: Hover states, card interactions via Tailwind classes
- No tw-animate-css (removed due to build issues)

## Critical TypeScript Considerations

When working with dynamic object indexing:
```typescript
// Always type objects that will be indexed dynamically
const labsData: Record<string, any> = { ... }

// Type map callbacks to avoid implicit any errors
array.map((item: string) => ...)
Object.entries(obj).map(([key, value]: [string, any]) => ...)
```

## Deployment Configuration

**vercel.json** settings:
- Install command: `pnpm install --no-frozen-lockfile`
- Build command: `pnpm build` (NO turbopack in production)
- Region: iad1 (US East)

## Known Issues & Solutions

1. **Port 3000 occupied**: Dev server auto-selects 3001
2. **TypeScript strict mode**: All map callbacks need explicit types
3. **Build scripts warning**: pnpm ignores some build scripts for security (doesn't affect functionality)

## Mock Data Locations

- **Lab profiles data**: `/app/labs/page.tsx` (labs array)
- **Equipment data**: `/app/equipment/page.tsx` (equipment array)
- **Lab details data**: `/app/labs/[id]/page.tsx` (labsDetailData object)
- **Map floor plan data**: `/app/map/page.tsx` (labsData object)
- **AI recommendations**: `/app/ai/page.tsx` (multiple mock arrays)

## Future Integration Points

The codebase is structured for easy backend integration:
- Replace mock data arrays with API calls using TanStack Query
- Add NextAuth for Harvard SSO integration
- Implement Prisma models matching current data structures
- Connect Vercel AI SDK for real collaboration matching