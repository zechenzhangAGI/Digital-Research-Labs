# Google Maps Integration Setup Guide

This guide will help you set up Google Maps API for the Harvard Physics Lab Hub interactive campus map.

## Step 1: Get a Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Geocoding API (optional, for future enhancements)

4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Copy your API key

### Restrict Your API Key (Recommended)

For security, restrict your API key:
1. Click on your API key in the Credentials page
2. Under "Application restrictions":
   - Select "HTTP referrers (web sites)"
   - Add your domains:
     - `http://localhost:3000/*` (for development)
     - `http://localhost:3001/*` (alternate dev port)
     - Your production domain (e.g., `https://yourdomain.com/*`)
3. Under "API restrictions":
   - Select "Restrict key"
   - Choose "Maps JavaScript API"
4. Save your changes

## Step 2: Configure Your Environment

1. Open the `.env.local` file in the root of your project
2. Replace `your_google_maps_api_key_here` with your actual API key:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSy...your-actual-key-here
```

**Important:** Never commit your actual API key to Git. The `.env.local` file should already be in `.gitignore`.

## Step 3: Install Dependencies

Since Node.js is not yet installed on your system, follow these steps:

### Install Node.js (macOS)

**Option 1: Using Homebrew (Recommended)**
```bash
brew install node
```

**Option 2: Download Installer**
Visit [nodejs.org](https://nodejs.org/) and download the LTS version for macOS.

### Install Project Dependencies

Once Node.js is installed:

```bash
# Install pnpm globally
npm install -g pnpm

# Install project dependencies
pnpm install

# Start the development server
pnpm dev
```

## Step 4: View the Map

1. Navigate to `http://localhost:3000/map` (or `http://localhost:3001/map` if port 3000 is in use)
2. You should see an interactive satellite map of Harvard's North Yard
3. The following buildings will be highlighted with colored polygons:
   - **Jefferson Laboratory** (Blue) - 17 Oxford Street
   - **Lyman Laboratory** (Purple) - Cambridge Street
   - **Mallinckrodt Laboratory** (Orange) - 12 Oxford Street
   - **McKay Laboratory** (Green) - 9 Oxford Street
   - **60 Oxford Street** (Red)
   - **LISE Building** (Pink) - 29 Oxford Street

## Features

### Interactive Building Overlays
- **Hover**: Buildings highlight in gold when you hover over them
- **Click**: Click any building to:
  - View building details (name, address, year built, description)
  - See all research labs in that building
  - View lab images and information
  - Navigate to individual lab pages

### Map Controls
- **Zoom**: Use mouse wheel or touch gestures to zoom
- **Pan**: Click and drag to pan around the map
- **Toggle Legend**: Show/hide the building legend
- **Building Directory**: Click buildings in the sidebar to focus on them

### Color-Coded Buildings
Each building has a unique color for easy identification:
- Jefferson: Blue (#3b82f6)
- Lyman: Purple (#8b5cf6)
- Mallinckrodt: Orange (#f59e0b)
- McKay: Green (#10b981)
- 60 Oxford: Red (#ef4444)
- LISE: Pink (#ec4899)

## Troubleshooting

### "Error loading Google Maps"
- Check that your API key is correctly set in `.env.local`
- Verify the Maps JavaScript API is enabled in Google Cloud Console
- Make sure your domain is allowed in the API key restrictions

### Map not appearing
- Open browser console (F12) to check for errors
- Verify the API key starts with `NEXT_PUBLIC_` (required for Next.js client-side access)
- Restart your development server after changing `.env.local`

### Buildings not showing correctly
- The coordinates are approximate based on address information
- You can adjust building coordinates in `/app/map/page.tsx` in the `buildingsData` object

## Cost Considerations

Google Maps offers a free tier with $200 monthly credit, which typically covers:
- ~28,000 map loads per month
- Dynamic maps are $7 per 1,000 loads

For a university project with moderate traffic, you should stay within the free tier.

## Next Steps

To customize the map further:

1. **Adjust building coordinates**: Edit the `coordinates` array in `buildingsData`
2. **Add more buildings**: Add new entries to `buildingsData` with coordinates and lab information
3. **Change map style**: Modify `mapOptions` to switch between satellite, roadmap, or custom styles
4. **Add markers**: Import and use `Marker` component from `@react-google-maps/api`

Enjoy your interactive Harvard Physics campus map!
