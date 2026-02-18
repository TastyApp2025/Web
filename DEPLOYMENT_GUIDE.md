# Deployment Guide to Render

This guide walks you through deploying your FYI Web application to Render.

## Prerequisites

- A Render account (sign up at https://render.com)
- Your GitHub repository with the FYI Web code
- Google Maps API key (see GOOGLE_MAPS_SETUP.md)

## Step 1: Push Code to GitHub

```bash
git add .
git commit -m "Add Google Maps integration"
git push origin main
```

## Step 2: Create New Web Service on Render

1. Log in to [Render Dashboard](https://dashboard.render.com)
2. Click **"New"** → **"Web Service"**
3. Connect your GitHub repository
4. Select the repository with your FYI Web code

## Step 3: Configure the Service

Fill in the following settings:

| Field | Value |
|-------|-------|
| **Name** | fyi-web (or your preferred name) |
| **Environment** | Node |
| **Region** | Select closest to your users |
| **Branch** | main |
| **Build Command** | `cd "FYI - Web" && npm install && npm run build` |
| **Start Command** | `cd "FYI - Web" && npm run start` |

## Step 4: Add Environment Variables

1. Scroll down to **"Environment"** section
2. Click **"Add Environment Variable"**
3. Add these variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `GOOGLE_MAPS_API_KEY` | Your Google Maps API key |

## Step 5: Choose Plan

- **Free plan**: Good for testing (spins down after 15 min inactivity)
- **Paid plan**: Always running, recommended for production

## Step 6: Deploy

Click **"Create Web Service"**

Render will automatically:
- Install dependencies
- Build your application
- Start the server
- Provide a public URL

## Step 7: Verify Deployment

1. Wait for deployment to complete (green checkmark)
2. Click the provided URL to access your app
3. Navigate to the Favourites page
4. Verify restaurants load with images and descriptions

## Monitoring & Logs

In Render dashboard:
- **Logs** tab: View real-time application logs
- **Metrics** tab: Monitor CPU, memory, and requests
- **Deploys** tab: See deployment history

## Common Issues

### Build Fails: "npm install timeout"
- Increase build timeout in service settings
- Or add `--legacy-peer-deps` to install command

### App Won't Start: Port Error
The app is configured to run on port 5000. Render automatically handles this.

### API Returns 500 Error
- Check that `GOOGLE_MAPS_API_KEY` is set correctly
- View logs in Render dashboard for error details
- Verify the API key has Places API enabled

### Images Not Loading
- Check Google Maps API quota hasn't been exceeded
- Verify API key has proper permissions
- Check browser console for CORS errors

## Scaling & Performance

As your app grows:

### Cache Results
Add database caching to reduce API calls:
```typescript
// Store results with timestamp
// Refresh if older than 24 hours
```

### Use CDN
Render automatically serves static assets via CDN.

### Monitor Usage
- Check Google Maps API dashboard for request volume
- Set up billing alerts in Google Cloud Console

## Custom Domain

1. Go to your Render service
2. Click **"Settings"** → **"Custom Domain"**
3. Add your domain
4. Point your domain DNS to Render's provided address

## Rolling Updates

To update your app:
1. Push changes to GitHub
2. Render automatically deploys (if auto-deploy is enabled)
3. Or manually click **"Manual Deploy"** in Render dashboard

## Rollback

If something breaks:
1. Go to **"Deploys"** tab
2. Click the previous working deployment
3. Click **"Re-deploy"**

## Environment Files

Don't commit these to GitHub:
- `.env` (local development)
- Any files with secrets

Render only uses the Environment Variables you set in the dashboard.

## Support

- **Render Docs**: https://render.com/docs
- **Google Maps Docs**: https://developers.google.com/maps/documentation/places/web-service
- **Node.js Hosting**: https://render.com/docs/deploy-node

Happy deploying! 🚀
