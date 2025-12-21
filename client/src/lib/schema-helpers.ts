import { YouTubeVideo } from "@/hooks/use-youtube";

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
    "description": "Independent food reviewer creating honest restaurant and takeaway reviews in South Africa",
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
    ],
    "knowsAbout": [
      "Food Reviews",
      "Restaurant Reviews",
      "Cooking",
      "South African Cuisine",
      "Food Preparation",
      "Restaurant Industry",
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
