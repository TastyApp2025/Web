import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { YouTubeVideo, getYouTubeEmbedUrl, formatPublishDate } from "@/hooks/use-youtube";
import { Eye, ThumbsUp, MessageSquare, Clock } from "lucide-react";

interface VideoDetailsModalProps {
  video: YouTubeVideo | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  }
  if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  }
  return `${secs}s`;
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export function VideoDetailsModal({
  video,
  open,
  onOpenChange,
}: VideoDetailsModalProps) {
  if (!video) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{video.title}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Published {formatPublishDate(video.publishedAt)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Video Embed */}
          <div className="aspect-video rounded-lg overflow-hidden bg-black">
            <iframe
              width="100%"
              height="100%"
              src={getYouTubeEmbedUrl(video.videoId)}
              title={video.title}
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>

          {/* Video Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Duration</span>
                <span className="text-sm font-semibold">{formatDuration(video.duration)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <Eye className="w-4 h-4 text-muted-foreground" />
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Views</span>
                <span className="text-sm font-semibold">{formatNumber(video.viewCount)}</span>
              </div>
            </div>

            {video.likeCount !== undefined && (
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <ThumbsUp className="w-4 h-4 text-muted-foreground" />
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Likes</span>
                  <span className="text-sm font-semibold">{formatNumber(video.likeCount)}</span>
                </div>
              </div>
            )}

            {video.commentCount !== undefined && (
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <MessageSquare className="w-4 h-4 text-muted-foreground" />
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Comments</span>
                  <span className="text-sm font-semibold">{formatNumber(video.commentCount)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Video Description */}
          {video.description && (
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Description</h3>
              <p className="text-sm text-muted-foreground line-clamp-6 whitespace-pre-wrap">
                {video.description}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
