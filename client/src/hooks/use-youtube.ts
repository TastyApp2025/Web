import { useState, useEffect } from 'react';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  videoId: string;
}

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

export function useYouTubeVideos(maxResults: number = 4) {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Check if API key and channel ID are configured
        if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
          setError('YouTube API not configured. Check your environment variables.');
          setLoading(false);
          return;
        }

        // Fetch channel info to get uploads playlist
        const channelResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
        );

        if (!channelResponse.ok) {
          throw new Error('Failed to fetch channel info');
        }

        const channelData = await channelResponse.json();
        const uploadsPlaylistId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

        if (!uploadsPlaylistId) {
          throw new Error('Could not find uploads playlist');
        }

        // Fetch videos from uploads playlist
        const videosResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${maxResults * 3}&key=${YOUTUBE_API_KEY}`
        );

        if (!videosResponse.ok) {
          throw new Error('Failed to fetch videos');
        }

        const videosData = await videosResponse.json();
        
        // Get video IDs to fetch durations
        const videoIds = videosData.items?.map((item: any) => item.snippet?.resourceId?.videoId).filter(Boolean).join(',');
        
        if (!videoIds) {
          setVideos([]);
          setError(null);
          setLoading(false);
          return;
        }

        // Fetch video details to get duration
        const detailsResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds}&key=${YOUTUBE_API_KEY}`
        );

        if (!detailsResponse.ok) {
          throw new Error('Failed to fetch video details');
        }

        const detailsData = await detailsResponse.json();
        
        // Create a map of video durations
        const durationMap: { [key: string]: number } = {};
        detailsData.items?.forEach((item: any) => {
          const duration = item.contentDetails?.duration;
          if (duration) {
            // Parse ISO 8601 duration format (e.g., PT1H2M3S)
            const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
            const hours = parseInt(match?.[1] || '0');
            const minutes = parseInt(match?.[2] || '0');
            const seconds = parseInt(match?.[3] || '0');
            const totalSeconds = hours * 3600 + minutes * 60 + seconds;
            durationMap[item.id] = totalSeconds;
          }
        });

        // Filter out shorts (videos less than 60 seconds)
        const formattedVideos: YouTubeVideo[] = videosData.items
          ?.filter((item: any) => {
            const videoId = item.snippet?.resourceId?.videoId;
            const duration = durationMap[videoId];
            return duration && duration >= 60; // Only include videos 60 seconds or longer
          })
          ?.slice(0, maxResults) // Take only the requested number after filtering
          ?.map((item: any) => ({
            id: item.id,
            title: item.snippet?.title || 'Untitled',
            description: item.snippet?.description || '',
            thumbnail: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.default?.url || '',
            publishedAt: item.snippet?.publishedAt || '',
            videoId: item.snippet?.resourceId?.videoId || '',
          })) || [];

        setVideos(formattedVideos);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch YouTube videos');
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [maxResults]);

  return { videos, loading, error };
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
