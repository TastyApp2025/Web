# Google AdSense Setup Guide

This document explains how to set up Google AdSense on your ForYourInfluence website with two ad placements: a hidden top banner and a bottom partner content banner.

## Step 1: Get Your Google AdSense Approval

1. Go to https://www.google.com/adsense/start/
2. Sign in with your Google account
3. Enter your website URL (where you'll deploy on Render)
4. Complete the application and verification process
5. Google will review your site (takes 1-2 weeks typically)
6. Once approved, you'll get your **Publisher ID** (format: `ca-pub-xxxxxxxxxxxxxxxx`)

## Step 2: Create Ad Units

Once approved, create two ad units in AdSense:

### Ad Unit 1: Top Banner (Hidden)
- **Name**: "Top Ad Banner"
- **Format**: Horizontal Banner (728x90 or responsive)
- **This is the hidden ad space** - Google AdSense will display ads that are hidden

### Ad Unit 2: Bottom Partner Content
- **Name**: "Partner Content Banner"
- **Format**: Medium Rectangle (300x250) or Large Rectangle (336x280)
- **This will be visible** for partner content and ads

## Step 3: Add Your AdSense Code

For each ad unit you create, Google will give you an `data-ad-slot` number.

### Update your code:

1. **Open** `client/src/pages/home.tsx`

2. **Find the top ad banner section** (around line 20):
```html
<div 
  id="google-ads-top"
  className="adsbygoogle"
  data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
  data-ad-slot="1234567890"
  data-ad-format="horizontal"
  data-full-width-responsive="true"
></div>
```

3. **Replace with your values:**
   - `data-ad-client`: Your Publisher ID from AdSense
   - `data-ad-slot`: The slot number from your "Top Ad Banner" ad unit

4. **Find the bottom ad banner section** (around line 242):
```html
<div 
  id="google-ads-bottom"
  className="adsbygoogle"
  data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
  data-ad-slot="0987654321"
  data-ad-format="rectangle"
  data-full-width-responsive="false"
></div>
```

5. **Replace with your values:**
   - `data-ad-client`: Your Publisher ID from AdSense
   - `data-ad-slot`: The slot number from your "Partner Content Banner" ad unit

6. **Open** `client/src/main.tsx`

7. **Update the AdSense script URL**:
```javascript
script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxxxxxxxx";
```
- Replace `ca-pub-xxxxxxxxxxxxxxxx` with your Publisher ID

## Step 4: Deploy to Render

1. Commit your changes:
```bash
git add .
git commit -m "Add Google AdSense integration"
git push origin main
```

2. Push to Render (your app will auto-deploy with AdSense code)

## Step 5: Enable Ads to Show

After deployment, Google may need a few hours to:
- Detect your ad code
- Review your content
- Start serving ads

**Top Banner**: Hidden by default but will show ads when Google crawls the page
**Bottom Banner**: Visible and will show partner content or ads

## Important Notes

### Hidden Top Banner
- Uses CSS `hidden` class so it's not visible to users
- Google's crawlers can still detect and place ads there
- This is useful for ads you want served but not visibly intrusive

### Ad Policies
- Do NOT click your own ads
- Do NOT encourage users to click ads
- Do NOT place ads deceptively
- Google will suspend your account if you violate policies

### Earnings
- You earn money when someone clicks an ad (CPC) or when an ad is viewed (CPM)
- Earnings vary based on:
  - Your content quality
  - User location
  - Ad relevance
  - Traffic volume

### Monitoring
- Check your AdSense dashboard regularly to see:
  - Ad impressions
  - Clicks
  - Earnings
  - Ad performance

## Troubleshooting

**Ads not showing?**
- Check that your Publisher ID and Ad Slots are correct
- Wait 24-48 hours for Google to crawl and approve
- Verify your website is live and accessible
- Check browser console for errors

**"Ads.txt" warning?**
- Go to AdSense → Settings → Ads.txt
- Click "Manage your sites"
- Follow instructions to add ads.txt to your domain

**Low earnings?**
- Increase traffic to your site
- Improve content quality (better content = better ads)
- Optimize ad placement for visibility
- Focus on SEO to attract more visitors

## Support

- **Google AdSense Help**: https://support.google.com/adsense/
- **AdSense Policies**: https://support.google.com/adsense/answer/48182
- **Your AdSense Dashboard**: https://www.google.com/adsense/

---

Happy ad serving! 🚀
