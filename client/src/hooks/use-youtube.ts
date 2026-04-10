import { useState, useEffect } from 'react';
import { siteContent } from '@/data/site-content';

// Exponential backoff retry logic
async function fetchWithRetry(
  url: string,
  maxAttempts: number = 3,
  delayMs: number = 1000
): Promise<Response> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;

      // Don't retry on client errors (4xx)
      if (response.status >= 400 && response.status < 500) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      lastError = new Error(`HTTP ${response.status}: ${response.statusText}`);
    } catch (error) {
      lastError = error as Error;
    }

    // Exponential backoff: wait longer between retries
    if (attempt < maxAttempts) {
      const waitTime = delayMs * Math.pow(2, attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }
  }

  throw lastError || new Error('Failed to fetch after retries');
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  videoId: string;
  duration: number; // seconds
  viewCount: number;
  likeCount?: number;
  commentCount?: number;
}

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

export function useYouTubeVideos(maxResults: number = 4) {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retrying, setRetrying] = useState(false);

  const retryAttempts = siteContent.youtube.retryAttempts;
  const retryDelayMs = siteContent.youtube.retryDelayMs;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Check if API key and channel ID are configured
        if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
          // Use mock videos for preview when API is not configured
          const mockVideos: YouTubeVideo[] = [
            {
              id: "mock-1",
              title: "Is Food Inn India Worth Your Money?",
              description: "An honest review of Food Inn India restaurant.",
              thumbnail: "https://i.ytimg.com/vi/QkueYTG4MMQ/hqdefault.jpg",
              publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
              videoId: "QkueYTG4MMQ",
              duration: 600,
              viewCount: 1200,
            },
            {
              id: "mock-2",
              title: "Is Mo's Diner Worth the Hype?",
              description: "Visiting Mo's Diner to find out if it lives up to the hype.",
              thumbnail: "https://i.ytimg.com/vi/b7QhWQ6ajvQ/hqdefault.jpg",
              publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
              videoId: "b7QhWQ6ajvQ",
              duration: 720,
              viewCount: 980,
            },
            {
              id: "mock-3",
              title: "Is Woolworths Café Actually Worth It?",
              description: "Putting the Woolworths Café to the test.",
              thumbnail: "https://i.ytimg.com/vi/RWt2WuwzCFU/hqdefault.jpg",
              publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
              videoId: "RWt2WuwzCFU",
              duration: 540,
              viewCount: 850,
            },
            {
              id: "mock-4",
              title: "Can a Salad Actually Taste Good?",
              description: "Exploring whether a salad can truly be satisfying.",
              thumbnail: "https://i.ytimg.com/vi/xzGnOE9FtOg/hqdefault.jpg",
              publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
              videoId: "xzGnOE9FtOg",
              duration: 480,
              viewCount: 760,
            },
          ];
          setVideos(mockVideos.slice(0, maxResults));
          setError(null);
          setLoading(false);
          return;
        }

        // Fetch channel info to get uploads playlist with retry
        const channelResponse = await fetchWithRetry(
          `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`,
          retryAttempts,
          retryDelayMs
        );

        const channelData = await channelResponse.json();
        const uploadsPlaylistId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

        if (!uploadsPlaylistId) {
          throw new Error('Could not find uploads playlist. Please check your YouTube Channel ID.');
        }

        // Fetch videos from uploads playlist with retry
        const videosResponse = await fetchWithRetry(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${maxResults * 3}&key=${YOUTUBE_API_KEY}`,
          retryAttempts,
          retryDelayMs
        );

        const videosData = await videosResponse.json();

        // Get video IDs to fetch detailed statistics
        const videoIds = videosData.items?.map((item: any) => item.snippet?.resourceId?.videoId).filter(Boolean).join(',');

        if (!videoIds) {
          setVideos([]);
          setError(null);
          setLoading(false);
          return;
        }

        // Fetch video details including statistics (duration, views, likes, comments) with retry
        const detailsResponse = await fetchWithRetry(
          `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`,
          retryAttempts,
          retryDelayMs
        );

        const detailsData = await detailsResponse.json();

        // Create a map of video details
        const videoDetailsMap: { [key: string]: any } = {};
        detailsData.items?.forEach((item: any) => {
          const duration = item.contentDetails?.duration;
          if (duration) {
            // Parse ISO 8601 duration format (e.g., PT1H2M3S)
            const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
            const hours = parseInt(match?.[1] || '0');
            const minutes = parseInt(match?.[2] || '0');
            const seconds = parseInt(match?.[3] || '0');
            const totalSeconds = hours * 3600 + minutes * 60 + seconds;
            
            videoDetailsMap[item.id] = {
              duration: totalSeconds,
              viewCount: parseInt(item.statistics?.viewCount || '0'),
              likeCount: parseInt(item.statistics?.likeCount || '0'),
              commentCount: parseInt(item.statistics?.commentCount || '0'),
            };
          }
        });

        // Filter out shorts (videos less than 60 seconds)
        const formattedVideos: YouTubeVideo[] = videosData.items
          ?.filter((item: any) => {
            const videoId = item.snippet?.resourceId?.videoId;
            const details = videoDetailsMap[videoId];
            return details && details.duration >= 60; // Only include videos 60 seconds or longer
          })
          ?.slice(0, maxResults) // Take only the requested number after filtering
          ?.map((item: any) => {
            const videoId = item.snippet?.resourceId?.videoId;
            const details = videoDetailsMap[videoId];
            return {
              id: item.id,
              title: item.snippet?.title || 'Untitled',
              description: item.snippet?.description || '',
              thumbnail: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.default?.url || '',
              publishedAt: item.snippet?.publishedAt || '',
              videoId: videoId || '',
              duration: details?.duration || 0,
              viewCount: details?.viewCount || 0,
              likeCount: details?.likeCount,
              commentCount: details?.commentCount,
            };
          }) || [];

        setVideos(formattedVideos);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch YouTube videos';
        setError(errorMessage);
        setVideos([]);
        setRetrying(false);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [maxResults]);

  return { videos, loading, error, retrying };
}

export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}

export function getYouTubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export function getYouTubeChannelUrl(channelId: string): string {
  return `https://www.youtube.com/channel/${channelId}`;
}

export function formatPublishDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffWeeks < 4) return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
  if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;

  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
