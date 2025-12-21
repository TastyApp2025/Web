# Google Maps API Setup Guide

This application uses the Google Maps Places API to dynamically fetch restaurant data including photos, descriptions, ratings, and more.

## Step 1: Get a Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select an existing one)
3. Enable these APIs:
   - **Places API (New)**
   - **Maps JavaScript API** (optional, for future features)

4. Create an API key:
   - Go to "Credentials" in the sidebar
   - Click "Create Credentials" → "API Key"
   - Copy your API key

## Step 2: Restrict Your API Key (Recommended)

For security, restrict your API key to:
- **API restrictions**: Select "Places API" from the dropdown
- **Application restrictions**: Select "HTTP referrers (web sites)" and add your domain

## Step 3: Set Environment Variables

### For Local Development (Replit):

1. In your Replit project, go to **Secrets** (lock icon in sidebar)
2. Create a new secret:
   - **Key**: `GOOGLE_MAPS_API_KEY`
   - **Value**: Paste your API key from Step 1

### For Render Deployment:

1. Go to your Render dashboard
2. Select your service
3. Go to **Environment** tab
4. Add a new environment variable:
   - **Key**: `GOOGLE_MAPS_API_KEY`
   - **Value**: Paste your API key
5. Deploy your application

## Step 4: Customize Restaurant Queries

In `client/src/pages/favourites.tsx`, update the `RESTAURANT_QUERIES` array with your restaurant names/addresses:

```typescript
const RESTAURANT_QUERIES = [
  "Restaurant Name 1 City",
  "Restaurant Name 2 City",
  "Restaurant Name 3 City",
  // Add more as needed
];
```

## How It Works

1. When the Favourites page loads, it sends restaurant queries to your backend
2. The backend calls Google Maps Places API for each query
3. The API returns:
   - Restaurant name and address
   - Cuisine type (extracted from place categories)
   - Real photos from Google Maps
   - Customer reviews (used as descriptions)
   - Google Maps link
   - Rating

4. All data is displayed on the frontend dynamically

## API Endpoints

### Single Place Search
```bash
POST /api/places/search
Content-Type: application/json

{
  "query": "Restaurant Name City"
}
```

Response:
```json
{
  "id": "place_id",
  "name": "Restaurant Name",
  "location": "Full Address",
  "type": "Cuisine Type",
  "description": "Restaurant description from reviews",
  "image": "https://...",
  "mapLink": "https://maps.google.com/...",
  "address": "Full formatted address",
  "rating": 4.5,
  "website": "https://restaurant.com"
}
```

### Batch Place Search
```bash
POST /api/places/batch
Content-Type: application/json

{
  "queries": ["Restaurant 1 City", "Restaurant 2 City"]
}
```

Response: Array of place objects

## Pricing

Google Maps Places API pricing:
- **$7.00 per 1,000 requests** for Place Details with photos
- **Free tier**: $200/month in free credits (covers ~28,000 requests)

Each restaurant card triggers ONE API request to fetch all data.

## Troubleshooting

### API Key Not Set
**Error**: "GOOGLE_MAPS_API_KEY environment variable is not set"
- Make sure you've added the secret in Replit (for local development)
- For Render, add it to the Environment Variables section

### API Key Invalid
**Error**: "Failed to fetch place details"
- Verify your API key is correct
- Check that the Places API is enabled in your Google Cloud project
- Ensure the API key restrictions allow the Places API

### Rate Limiting
If you get too many requests, you might hit Google's rate limits:
- Cache results in your database
- Add pagination/lazy loading
- Request higher quota from Google Cloud Console

## Deployment Checklist for Render

- [ ] Create Render account and app
- [ ] Add `GOOGLE_MAPS_API_KEY` to Environment Variables
- [ ] Set build command: `npm run build`
- [ ] Set start command: `npm run start`
- [ ] Deploy your application
- [ ] Test the Favourites page on the deployed URL

## Database Caching (Optional)

For production, consider caching restaurant data in your database to reduce API calls:
- Store fetched place details with a timestamp
- Refresh every 24-48 hours
- This saves costs and improves load times

Let me know if you need help with any of these steps!
