import { YouTubeVideo } from "@/hooks/use-youtube";

// YouTube Channel ID for schema references
const YOUTUBE_CHANNEL_ID = "UCPyvMguOKYQxS4PG3L_Ja6Q";
const YOUTUBE_CHANNEL_URL = `https://www.youtube.com/channel/${YOUTUBE_CHANNEL_ID}`;

/**
 * Generate Organization schema with YouTube channel connection
 * Helps Google connect website to YouTube channel for international discovery
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ForYourInfluence",
    "alternateName": ["FYI", "For Your Influence", "4YourInfluence"],
    "url": "https://www.foryourinfluence.co.za",
    "logo": "https://www.foryourinfluence.co.za/favicon.png",
    "description": "Independent food reviews from professional chef Wesley. Honest restaurant and takeaway experiences for food lovers worldwide.",
    "foundingLocation": {
      "@type": "Place",
      "name": "South Africa",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -30.5595,
        "longitude": 22.9375
      }
    },
    "areaServed": [
      { "@type": "Continent", "name": "Africa" },
      { "@type": "Country", "name": "Algeria" },
      { "@type": "Country", "name": "Angola" },
      { "@type": "Country", "name": "Benin" },
      { "@type": "Country", "name": "Botswana" },
      { "@type": "Country", "name": "Burkina Faso" },
      { "@type": "Country", "name": "Burundi" },
      { "@type": "Country", "name": "Cameroon" },
      { "@type": "Country", "name": "Cape Verde" },
      { "@type": "Country", "name": "Central African Republic" },
      { "@type": "Country", "name": "Chad" },
      { "@type": "Country", "name": "Comoros" },
      { "@type": "Country", "name": "Congo" },
      { "@type": "Country", "name": "Democratic Republic of the Congo" },
      { "@type": "Country", "name": "Djibouti" },
      { "@type": "Country", "name": "Egypt" },
      { "@type": "Country", "name": "Equatorial Guinea" },
      { "@type": "Country", "name": "Eritrea" },
      { "@type": "Country", "name": "Ethiopia" },
      { "@type": "Country", "name": "Gabon" },
      { "@type": "Country", "name": "Gambia" },
      { "@type": "Country", "name": "Ghana" },
      { "@type": "Country", "name": "Guinea" },
      { "@type": "Country", "name": "Guinea-Bissau" },
      { "@type": "Country", "name": "Ivory Coast" },
      { "@type": "Country", "name": "Kenya" },
      { "@type": "Country", "name": "Lesotho" },
      { "@type": "Country", "name": "Liberia" },
      { "@type": "Country", "name": "Libya" },
      { "@type": "Country", "name": "Madagascar" },
      { "@type": "Country", "name": "Malawi" },
      { "@type": "Country", "name": "Mali" },
      { "@type": "Country", "name": "Mauritania" },
      { "@type": "Country", "name": "Mauritius" },
      { "@type": "Country", "name": "Morocco" },
      { "@type": "Country", "name": "Mozambique" },
      { "@type": "Country", "name": "Namibia" },
      { "@type": "Country", "name": "Niger" },
      { "@type": "Country", "name": "Nigeria" },
      { "@type": "Country", "name": "Rwanda" },
      { "@type": "Country", "name": "Sao Tome and Principe" },
      { "@type": "Country", "name": "Senegal" },
      { "@type": "Country", "name": "Seychelles" },
      { "@type": "Country", "name": "Sierra Leone" },
      { "@type": "Country", "name": "Somalia" },
      { "@type": "Country", "name": "South Africa" },
      { "@type": "Country", "name": "South Sudan" },
      { "@type": "Country", "name": "Sudan" },
      { "@type": "Country", "name": "Eswatini" },
      { "@type": "Country", "name": "Tanzania" },
      { "@type": "Country", "name": "Togo" },
      { "@type": "Country", "name": "Tunisia" },
      { "@type": "Country", "name": "Uganda" },
      { "@type": "Country", "name": "Zambia" },
      { "@type": "Country", "name": "Zimbabwe" },
      { "@type": "Country", "name": "United Kingdom" },
      { "@type": "Country", "name": "United States" },
      { "@type": "Country", "name": "Canada" },
      { "@type": "Country", "name": "Australia" },
      { "@type": "Country", "name": "New Zealand" },
      { "@type": "Country", "name": "Ireland" },
      { "@type": "Country", "name": "India" },
      { "@type": "Country", "name": "Philippines" },
      { "@type": "Country", "name": "Malaysia" },
      { "@type": "Country", "name": "Singapore" },
      { "@type": "Country", "name": "Jamaica" },
      { "@type": "Country", "name": "Trinidad and Tobago" },
      { "@type": "Country", "name": "Bahamas" },
      { "@type": "Country", "name": "Belize" },
      { "@type": "Country", "name": "Antigua and Barbuda" }
    ],
    "sameAs": [
      YOUTUBE_CHANNEL_URL,
      "https://www.youtube.com/@ForYourInfluence",
      "https://www.instagram.com/4yourinfluence",
      "https://www.tiktok.com/@foryourinfluence",
      "https://x.com/4YourYourlnfluence",
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "foryourinfluence2010@gmail.com",
      "availableLanguage": ["English"]
    }
  };
}

/**
 * Generate YouTube Channel schema
 * Helps search engines understand this is the official website for the YouTube channel
 */
export function generateYouTubeChannelSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ForYourInfluence",
    "alternateName": "FYI Food Reviews",
    "url": "https://www.foryourinfluence.co.za",
    "description": "Official website for ForYourInfluence YouTube channel - Independent food reviews from professional chef Wesley",
    "inLanguage": ["en", "en-ZA", "en-GB", "en-US"],
    "about": {
      "@type": "Thing",
      "name": "Food Reviews",
      "description": "Restaurant and takeaway reviews from Africa"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ForYourInfluence",
      "url": "https://www.foryourinfluence.co.za",
      "sameAs": [YOUTUBE_CHANNEL_URL]
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.youtube.com/@ForYourInfluence/search?query={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
}

/**
 * Generate VideoObject schema for YouTube videos
 * Helps Google and YouTube better understand video content
 */
export function generateVideoSchema(video: YouTubeVideo, channelUrl?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.title,
    "description": video.description || video.title,
    "thumbnailUrl": video.thumbnail,
    "uploadDate": video.publishedAt,
    "duration": `PT${Math.floor(video.duration / 3600)}H${Math.floor((video.duration % 3600) / 60)}M${video.duration % 60}S`,
    "url": `https://www.youtube.com/watch?v=${video.videoId}`,
    "embedUrl": `https://www.youtube.com/embed/${video.videoId}`,
    "interactionStatistic": [
      {
        "@type": "InteractionCounter",
        "interactionType": "http://schema.org/WatchAction",
        "userInteractionCount": video.viewCount,
      },
      {
        "@type": "InteractionCounter",
        "interactionType": "http://schema.org/LikeAction",
        "userInteractionCount": video.likeCount || 0,
      },
      {
        "@type": "InteractionCounter",
        "interactionType": "http://schema.org/CommentAction",
        "userInteractionCount": video.commentCount || 0,
      },
    ],
    "author": {
      "@type": "Person",
      "name": "Wesley",
      "url": "https://www.foryourinfluence.co.za/about",
    },
    ...(channelUrl && {
      "potentialAction": {
        "@type": "WatchAction",
        "target": channelUrl,
      },
    }),
  };
}

/**
 * Generate VideoCollection schema for multiple videos
 * Helps Google understand the video collection
 */
export function generateVideoCollectionSchema(
  videos: YouTubeVideo[],
  title: string,
  channelUrl?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": title,
    "description": "Latest food reviews from professional chef",
    "url": "https://www.foryourinfluence.co.za",
    "itemListElement": videos.map((video, index) => ({
      "@type": "VideoObject",
      "position": index + 1,
      "name": video.title,
      "description": video.description || video.title,
      "thumbnailUrl": video.thumbnail,
      "uploadDate": video.publishedAt,
      "duration": `PT${Math.floor(video.duration / 3600)}H${Math.floor((video.duration % 3600) / 60)}M${video.duration % 60}S`,
      "url": `https://www.youtube.com/watch?v=${video.videoId}`,
      "embedUrl": `https://www.youtube.com/embed/${video.videoId}`,
      "interactionStatistic": [
        {
          "@type": "InteractionCounter",
          "interactionType": "http://schema.org/WatchAction",
          "userInteractionCount": video.viewCount,
        },
      ],
    })),
    ...(channelUrl && {
      "author": {
        "@type": "Person",
        "name": "Wesley",
        "url": channelUrl,
      },
    }),
  };
}

/**
 * Generate Person schema with social profiles
 * Helps Google understand who runs the channel
 */
export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Wesley",
    "url": "https://www.foryourinfluence.co.za/about",
    "jobTitle": "Professional Chef & Content Creator",
    "description": "Independent food reviewer creating honest restaurant and takeaway reviews. Based in South Africa, creating content for food lovers across Africa and worldwide.",
    "image": "https://www.foryourinfluence.co.za/favicon.png",
    "worksFor": {
      "@type": "Organization",
      "name": "ForYourInfluence",
      "url": "https://www.foryourinfluence.co.za",
    },
    "sameAs": [
      "https://www.youtube.com/@ForYourInfluence",
      "https://www.instagram.com/4yourinfluence",
      "https://www.tiktok.com/@foryourinfluence",
      "https://x.com/4YourYourlnfluence",
    ],
    "knowsAbout": [
      "Food Reviews",
      "Restaurant Reviews",
      "Cooking",
      "South African Cuisine",
      "African Cuisine",
      "Food Preparation",
      "Restaurant Industry",
      "Street Food",
      "Fine Dining",
    ],
    "award": [
      "Independent Food Reviewer",
      "Professional Chef",
    ],
  };
}

/**
 * Generate BreadcrumbList schema
 * Helps Google understand site structure
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}
