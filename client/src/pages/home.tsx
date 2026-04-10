import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, ChevronRight, Utensils, TrendingUp, Shield, BarChart3, Code2, Loader } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { useYouTubeVideos, getYouTubeWatchUrl, formatPublishDate, getYouTubeChannelUrl, YouTubeVideo } from "@/hooks/use-youtube";
import { usePageMeta } from "@/hooks/use-page-meta";
import { siteContent } from "@/data/site-content";
import { VideoDetailsModal } from "@/components/video-details-modal";
import { generateVideoCollectionSchema, generatePersonSchema, generateOrganizationSchema, generateYouTubeChannelSchema } from "@/lib/schema-helpers";
import heroImage from "@assets/generated_images/professional_chef_plating_south_african_food.png";
import atmosphereImage from "@assets/generated_images/south_african_dining_atmosphere.png";

const YOUTUBE_CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID || '';

export default function Home() {
  const { videos, loading, error } = useYouTubeVideos(4);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  // Create structured data for videos with enhanced schema
  const videoSchema = videos.length > 0 
    ? generateVideoCollectionSchema(videos, siteContent.home.youtubeSection, getYouTubeChannelUrl(YOUTUBE_CHANNEL_ID))
    : undefined;

  // Combine all schemas for comprehensive SEO
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      generateOrganizationSchema(),
      generateYouTubeChannelSchema(),
      generatePersonSchema(),
      ...(videoSchema ? [videoSchema] : []),
    ],
  };

  usePageMeta({
    title: siteContent.home.metaTitle,
    description: siteContent.home.metaDescription,
    url: "https://www.foryourinfluence.co.za/",
    keywords: "chef reviews, food reviews, restaurant reviews, takeaway reviews, independent reviews, food channel, YouTube chef, African food, international food reviewer, honest food reviews, street food, fine dining reviews",
    structuredData: combinedSchema,
  });

  const handleVideoClick = (video: YouTubeVideo) => {
    setSelectedVideo(video);
    setModalOpen(true);
  };

  return (
    <Layout>
      {/* Top Ad Banner - Google AdSense */}
      {siteContent.adsense.enableAds && siteContent.adsense.publisherId && (
        <div className="bg-slate-700 py-4 px-4" id="ad-banner-top" data-testid="ad-banner-top">
          <div className="container mx-auto">
            {/* Google AdSense Ad Unit - Configuration from environment variables */}
            <div 
              id="google-ads-top"
              className="adsbygoogle"
              data-ad-client={siteContent.adsense.publisherId}
              data-ad-slot={siteContent.adsense.topAdSlot}
              data-ad-format="horizontal"
              data-full-width-responsive="true"
            ></div>
          </div>
        </div>
      )}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Image of Host of ForYourinfluence YouTube channel Chef Wesley" 
            className="w-full h-full object-cover brightness-100"
            data-testid="hero-image"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        </div>
        <div className="container relative z-10 px-4 text-center max-w-4xl mx-auto">
          <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 text-hero" style={{textShadow: '0 2px 12px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.4)'}}>
            {siteContent.home.heroTitle1}<br />
            <span className="text-hero-accent" style={{textShadow: '0 2px 12px rgba(0,0,0,0.5)'}}>{siteContent.home.heroTitle2}</span>
          </h1>
          <p className="font-serif text-lg md:text-xl text-hero/95 mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200" style={{textShadow: '0 1px 6px rgba(0,0,0,0.5)'}}>
            {siteContent.home.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Button asChild className="rounded-full text-base h-12 px-8 w-full sm:w-auto bg-primary hover:bg-primary/90 text-white shadow-lg transform hover:-translate-y-1 transition-all">
              <a href={siteContent.contact.youtubeUrl} target="_blank" rel="noopener noreferrer">
                {siteContent.home.watchButton}
              </a>
            </Button>
            <Button asChild className="rounded-full text-base h-12 px-8 w-full sm:w-auto bg-white/10 border border-white text-white hover:bg-white/20 transform hover:-translate-y-1 transition-all">
              <Link href="/favourites">
                {siteContent.home.favouritesButton}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-accent-line mx-auto block" />
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 heading-section">{siteContent.home.whyDifferent}</h2>
            <p className="text-description max-w-xl mx-auto">{siteContent.home.whyDifferentSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {siteContent.home.features.map((item, i) => (
              { icon: [Utensils, TrendingUp, Shield, BarChart3][i], title: item.title, desc: item.description }
            )).map((item, i) => (
              <div key={i} className="feature-card flex flex-col items-center text-center p-6 rounded-xl bg-card border-2 border-border">
                <div className="feature-icon w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4">
                  <item.icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="font-bold font-display text-lg mb-2 text-feature-title">{item.title}</h3>
                <p className="text-feature-desc text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Section - 4 Videos */}
      <section className="py-20 bg-background border-y border-border">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <div className="flex items-end justify-between mb-6 flex-wrap gap-4">
              <div>
                <span className="section-accent-line block" />
                <h2 className="font-display font-bold text-3xl md:text-4xl mb-2 heading-section">{siteContent.home.youtubeSection}</h2>
                <p className="text-description max-w-xl">
                  {siteContent.home.youtubeSectionSubtitle}
                </p>
              </div>
              {YOUTUBE_CHANNEL_ID && (
                <Button asChild variant="ghost" className="hidden md:flex gap-2 text-primary hover:text-primary/80">
                  <a href={getYouTubeChannelUrl(YOUTUBE_CHANNEL_ID)} target="_blank" rel="noopener noreferrer">
                    {siteContent.home.viewAllVideos} <ChevronRight className="w-4 h-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-yellow-900/40 border border-yellow-600/60 rounded-lg p-6 mb-8">
              <p className="text-yellow-200 text-sm text-body">
                <strong>Setup Required:</strong> {error}. Add your YouTube API key and Channel ID to get started. See README for instructions.
              </p>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-video bg-muted rounded-xl animate-pulse border border-border" />
              ))}
            </div>
          ) : videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="group block hover:no-underline cursor-pointer"
                  data-testid={`video-card-${video.videoId}`}
                  onClick={() => handleVideoClick(video)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleVideoClick(video);
                    }
                  }}
                >
                  <div className="video-card relative aspect-video bg-muted rounded-lg overflow-hidden border border-border shadow-sm transition-all">
                    {video.thumbnail && (
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:brightness-75 transition-all"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play fill="currentColor" className="ml-1 text-primary w-6 h-6" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white">
                      <h3 className="font-bold line-clamp-2 leading-tight text-sm group-hover:text-primary transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-xs text-white/70 mt-1">{formatPublishDate(video.publishedAt)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-body">No videos found. Check your YouTube configuration.</p>
            </div>
          )}
          
          {YOUTUBE_CHANNEL_ID && (
            <Button asChild variant="ghost" className="w-full mt-8 md:hidden rounded-full border border-primary text-primary hover:bg-primary/10">
              <a href={getYouTubeChannelUrl(YOUTUBE_CHANNEL_ID)} target="_blank" rel="noopener noreferrer">
                View All Videos on YouTube
              </a>
            </Button>
          )}
        </div>
      </section>

      {/* YouTube Setup Section - Only show if API is not configured */}
      {!YOUTUBE_CHANNEL_ID && (
        <section className="py-16 bg-background border-b border-border">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-primary/20 border-l-4 border-primary rounded-lg p-8">
              <div className="flex gap-4 items-start mb-6">
                <Code2 className="w-6 h-6 text-primary mt-1 flex-shrink-0" strokeWidth={2.5} />
                <div>
                  <h3 className="font-bold font-display text-xl mb-2 heading-subsection">Automatic YouTube Updates</h3>
                  <p className="text-body mb-6">
                    Your latest 4 videos appear here automatically. No manual updates needed.
                  </p>
                  <div className="space-y-3 text-sm">
                    <p className="font-semibold heading-subsection">To enable this on your site:</p>
                    <ol className="space-y-2 list-decimal list-inside text-body">
                      <li>Get your YouTube Channel ID from your channel's About section</li>
                      <li>Create a Google Cloud project & enable YouTube Data API v3</li>
                      <li>Generate an API key in Google Cloud Console</li>
                      <li>Copy <code className="bg-card px-2 py-1 rounded text-xs font-mono text-foreground">.env.example</code> to <code className="bg-card px-2 py-1 rounded text-xs font-mono text-foreground">.env.local</code></li>
                      <li>Add your API key and Channel ID to the .env.local file</li>
                    </ol>
                    <p className="text-xs text-body mt-4 pt-4 border-t border-border">
                      Full setup instructions available in the README.md file
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* AI Recipe CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="bg-card border-2 border-primary/40 rounded-3xl overflow-hidden shadow-xl flex flex-col md:flex-row">
            <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
              <span className="text-primary font-bold tracking-wider text-sm mb-2 uppercase">AI Powered</span>
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 heading-section">
                {siteContent.home.recipeTitle}
              </h2>
              <p className="text-description mb-8 text-lg">
                {siteContent.home.recipeSubtitle}
              </p>
              <Button asChild className="btn-shimmer w-fit rounded-full text-white px-8 h-12 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                <a href={siteContent.home.tasteyLink} target="_blank" rel="noopener noreferrer">
                  {siteContent.home.tryRecipeButton} <ChevronRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>
            <div className="md:w-1/2 bg-muted relative min-h-[300px]">
               <img 
                src={atmosphereImage}
                alt="Image of Tastey App A.I Recipe Generator"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partner Ad Space - Google AdSense */}
      {siteContent.adsense.enableAds && siteContent.adsense.publisherId && (
        <section className="py-12 bg-card">
          <div className="container mx-auto px-4 flex justify-center">
            <div className="w-full max-w-3xl" id="ad-banner-bottom" data-testid="ad-banner-bottom">
              {/* Google AdSense Ad Unit - Configuration from environment variables */}
              <div 
                id="google-ads-bottom"
                className="adsbygoogle"
                data-ad-client={siteContent.adsense.publisherId}
                data-ad-slot={siteContent.adsense.bottomAdSlot}
                data-ad-format="rectangle"
                data-full-width-responsive="false"
              ></div>
              {/* Fallback if ads don't load */}
              {!siteContent.home.partnerContent ? null : (
                <div className="border-2 border-dashed border-border rounded-lg py-12 px-8 text-center">
                  <p className="text-body text-sm uppercase tracking-widest">{siteContent.home.partnerContent}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Video Details Modal */}
      <VideoDetailsModal 
        video={selectedVideo} 
        open={modalOpen} 
        onOpenChange={setModalOpen} 
      />
    </Layout>
  );
}