# ForYourInfluence - Chef-Led Food Experience Platform

A modern, chef-led food review platform designed for independent food creators in South Africa. Built as a Progressive Web App (PWA) with automatic YouTube video integration.

## Features

- **Progressive Web App (PWA)** - Install as a native app on any device
- **Offline Support** - Service Worker caches all content for offline access
- **YouTube Integration** - Automatically fetches and displays your latest videos
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **GitHub Pages Ready** - Deploy directly to GitHub Pages with zero configuration
- **Custom Domain Support** - Works with your custom domain

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A YouTube channel with videos

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/foryourinfluence.git
   cd foryourinfluence
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev:client
   ```

   The app will be available at `http://localhost:5000`

4. **Build for production**
   ```bash
   npm run build
   ```

## Deployment

### Deploy to GitHub Pages

1. **Update package.json**
   - Set `"homepage"` to `"https://yourusername.github.io/foryourinfluence"` (or your repo name)

2. **Enable GitHub Pages**
   - Go to your repository Settings → Pages
   - Select "Deploy from a branch"
   - Choose `main` branch and `/root` folder (or wherever your build output is)

3. **Deploy**
   ```bash
   npm run build
   git add -A
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

### Use Your Custom Domain

1. **Add a CNAME file** to `client/public/CNAME`:
   ```
   yourdomain.com
   ```

2. **Configure DNS** - Point your domain's DNS records to GitHub Pages:
   - Add A records for GitHub Pages IP addresses
   - Or use a CNAME pointing to `yourusername.github.io`

3. **Enable custom domain** in GitHub Pages settings

## Automatic YouTube Video Updates

ForYourInfluence automatically fetches and displays your 4 latest YouTube videos. Videos update dynamically without requiring a code deployment.

### How It Works

The platform uses the YouTube Data API to fetch your latest videos. Here's how to set it up:

### Setup Steps

1. **Get Your YouTube Channel ID**
   - Visit your YouTube channel
   - Click "About" → Copy your channel ID (format: `UC...`)

2. **Create a Google Cloud Project** (One-time setup)
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable the "YouTube Data API v3"
   - Create an API Key (Credentials → Create Credentials → API Key)

3. **Configure in Your App**
   - Open `client/src/components/YouTubeSection.tsx`
   - Replace these values with your own:
     ```javascript
     const YOUTUBE_API_KEY = 'YOUR_API_KEY';
     const YOUTUBE_CHANNEL_ID = 'YOUR_CHANNEL_ID';
     ```

4. **Save and Deploy**
   - The app will automatically fetch your 4 latest videos
   - Videos update every time the page refreshes (live)

### Important Security Notes

- Keep your API key private (don't commit it to public repositories)
- Restrict your API key to "YouTube Data API v3" only
- If you're concerned about key exposure, use environment variables:
  ```
  VITE_YOUTUBE_API_KEY=your_key
  VITE_YOUTUBE_CHANNEL_ID=your_channel_id
  ```

### Customizing Ad Placeholders

Ad sections are included as designated spaces. To add custom ad code:

1. **Ad Space 1** - Home page banner section
   - Located in `client/src/pages/home.tsx`
   - Replace the placeholder `<div>` with your ad code

2. **Partner Content Space** - Bottom of home page
   - Located in `client/src/pages/home.tsx`
   - Insert Google AdSense, affiliate links, or custom HTML

3. **To add ad code:**
   ```jsx
   {/* Replace the placeholder with your ad code */}
   <div className="w-full max-w-3xl">
     {/* Insert your ad script or code here */}
     <script async src="your-ad-network-script"></script>
   </div>
   ```

## File Structure

```
client/
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── sw.js                  # Service Worker
│   └── CNAME                  # Custom domain (if using GitHub Pages)
├── src/
│   ├── pages/
│   │   ├── home.tsx           # Home page with hero, trust section, videos
│   │   ├── about.tsx          # About the chef
│   │   ├── favourites.tsx     # Favourite restaurants
│   │   └── contact.tsx        # Contact form
│   ├── components/
│   │   ├── layout.tsx         # Header, footer, navigation
│   │   └── ui/                # Shadcn UI components
│   ├── App.tsx                # Router configuration
│   ├── index.css              # Global styles & design system
│   └── main.tsx               # React entry point
└── index.html                 # HTML template (meta tags here)
```

## Customization

### Colors & Branding

Edit `client/src/index.css` to change the color scheme:

```css
:root {
  --primary: 9 75% 60%;      /* Main brand color (tomato red) */
  --secondary: 100 40% 95%;  /* Accent color (fresh green) */
  /* Update HSL values (Hue Saturation% Lightness%) */
}
```

### Typography

Fonts are defined in `client/src/index.css`:

- **Display Font** - `Nunito` (headings)
- **Body Font** - `Inter` (text)
- **Serif Font** - `Lora` (quotes, accents)

Edit `client/index.html` to change font imports from Google Fonts.

### Content Updates

- **Home Page** - `client/src/pages/home.tsx`
- **About Page** - `client/src/pages/about.tsx`
- **Favourites** - `client/src/pages/favourites.tsx`
- **Contact** - `client/src/pages/contact.tsx`

## SEO & Meta Tags

Update meta tags in `client/index.html`:

```html
<meta property="og:title" content="ForYourInfluence | Chef Led SA Food" />
<meta property="og:description" content="Your description here" />
<meta property="og:image" content="https://your-site.com/og-image.jpg" />
```

## PWA Installation

Users can install ForYourInfluence as a native app:

1. **Chrome/Edge** - Click the install icon in address bar
2. **Firefox** - Menu → Install App
3. **iOS** - Share → Add to Home Screen
4. **Android** - Menu → Install

## Troubleshooting

### Videos not loading?
- Check your API key and Channel ID
- Verify API is enabled in Google Cloud Console
- Check browser console for errors

### Deployment issues?
- Ensure all files are committed to git
- Check GitHub Pages settings point to correct branch
- Clear browser cache if seeing old version

### CORS errors?
- YouTube API has CORS enabled for browser requests
- If issues persist, check API key restrictions

## Support & Contact

For issues or questions:
- GitHub Issues: [Your repo]/issues
- Email: your-email@example.com
- Social: Links in footer

## License

MIT License - Feel free to use and modify for your project

## Credits

Built with React, Tailwind CSS, and modern web technologies.
