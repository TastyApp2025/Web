import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, ChevronRight, Utensils, TrendingUp, Shield, BarChart3, Code2, Loader } from "lucide-react";
import { useYouTubeVideos, getYouTubeWatchUrl, formatPublishDate, getYouTubeChannelUrl } from "@/hooks/use-youtube";
import heroImage from "@assets/generated_images/professional_chef_plating_south_african_food.png";
import atmosphereImage from "@assets/generated_images/south_african_dining_atmosphere.png";

const YOUTUBE_CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID || '';

export default function Home() {
  const { videos, loading, error } = useYouTubeVideos(4);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Chef plating food" 
            className="w-full h-full object-cover brightness-100"
            data-testid="hero-image"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 to-transparent" />
        </div>
        <div className="container relative z-10 px-4 text-center text-white max-w-4xl mx-auto">
          <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 drop-shadow-lg">
            Real Food<br />
            <span className="text-primary drop-shadow-md">No Hype</span>
          </h1>
          <p className="font-serif text-lg md:text-xl text-white/95 mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 drop-shadow-md">
            Independent reviews. Self-funded meals. Honest takes from a professional chef in South Africa.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Button size="lg" className="rounded-full text-base h-12 px-8 w-full sm:w-auto bg-primary hover:bg-primary/90 text-white shadow-lg transform hover:-translate-y-1 transition-all">
              Watch Latest Reviews
            </Button>
            <Button size="lg" variant="outline" className="rounded-full text-base h-12 px-8 w-full sm:w-auto bg-white/10 border-white text-white hover:bg-white/20 transform hover:-translate-y-1 transition-all">
              My Favourites
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-foreground">Why I'm Different</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">No ratings. No free meals. No sponsored content.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Utensils, title: "Professional Chef", desc: "Kitchen experience shapes every review" },
              { icon: TrendingUp, title: "Self-Funded", desc: "I pay for every single meal" },
              { icon: Shield, title: "No Sponsorships", desc: "Zero paid placements or deals" },
              { icon: BarChart3, title: "Contextual", desc: "Judged on their own merits" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 rounded-lg bg-card border-2 border-border transition-all hover:shadow-lg hover:-translate-y-2">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4">
                  <item.icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="font-bold font-display text-lg mb-2 text-white">{item.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
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
                <h2 className="font-display font-bold text-3xl md:text-4xl mb-2 text-foreground">Latest on YouTube</h2>
                <p className="text-muted-foreground max-w-xl">
                  New restaurant & takeaway visits. Honest takes. Auto-updated.
                </p>
              </div>
              {YOUTUBE_CHANNEL_ID && (
                <Button asChild variant="ghost" className="hidden md:flex gap-2 text-primary hover:text-primary/80">
                  <a href={getYouTubeChannelUrl(YOUTUBE_CHANNEL_ID)} target="_blank" rel="noopener noreferrer">
                    View All Videos <ChevronRight className="w-4 h-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-yellow-900/40 border border-yellow-600/60 rounded-lg p-6 mb-8">
              <p className="text-yellow-200 text-sm">
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
                <a
                  key={video.id}
                  href={getYouTubeWatchUrl(video.videoId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block hover:no-underline"
                  data-testid={`video-card-${video.videoId}`}
                >
                  <div className="relative aspect-video bg-muted rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-md transition-all cursor-pointer">
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
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No videos found. Check your YouTube configuration.</p>
            </div>
          )}
          
          {YOUTUBE_CHANNEL_ID && (
            <Button asChild variant="outline" className="w-full mt-8 md:hidden rounded-full">
              <a href={getYouTubeChannelUrl(YOUTUBE_CHANNEL_ID)} target="_blank" rel="noopener noreferrer">
                View All Videos on YouTube
              </a>
            </Button>
          )}
        </div>
      </section>

      {/* YouTube Setup Section */}
      <section className="py-16 bg-background border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-primary/20 border-l-4 border-primary rounded-lg p-8">
            <div className="flex gap-4 items-start mb-6">
              <Code2 className="w-6 h-6 text-primary mt-1 flex-shrink-0" strokeWidth={2.5} />
              <div>
                <h3 className="font-bold font-display text-xl mb-2 text-foreground">Automatic YouTube Updates</h3>
                <p className="text-muted-foreground mb-6">
                  Your latest 4 videos appear here automatically. No manual updates needed.
                </p>
                <div className="space-y-3 text-sm">
                  <p className="font-semibold text-foreground">To enable this on your site:</p>
                  <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
                    <li>Get your YouTube Channel ID from your channel's About section</li>
                    <li>Create a Google Cloud project & enable YouTube Data API v3</li>
                    <li>Generate an API key in Google Cloud Console</li>
                    <li>Copy <code className="bg-card px-2 py-1 rounded text-xs font-mono text-foreground">.env.example</code> to <code className="bg-card px-2 py-1 rounded text-xs font-mono text-foreground">.env.local</code></li>
                    <li>Add your API key and Channel ID to the .env.local file</li>
                  </ol>
                  <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
                    Full setup instructions available in the README.md file
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Recipe CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="bg-card border-2 border-primary/40 rounded-3xl overflow-hidden shadow-xl flex flex-col md:flex-row">
            <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
              <span className="text-primary font-bold tracking-wider text-sm mb-2 uppercase">AI Powered</span>
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-foreground">
                Cook What You Have
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Generate meal ideas based on your pantry. Smart, practical recipes from chef knowledge.
              </p>
              <Button size="lg" className="w-fit rounded-full bg-primary hover:bg-primary/90 text-white">
                Try Recipe Generator <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            <div className="md:w-1/2 bg-muted relative min-h-[300px]">
               <img 
                src={atmosphereImage}
                alt="Cooking atmosphere"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-card to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Partner Ad Space */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="w-full max-w-3xl h-32 border-2 border-dashed border-border rounded-lg flex items-center justify-center text-muted-foreground text-sm uppercase tracking-widest" id="ad-banner-bottom" data-testid="ad-banner-bottom">
            {/* Partner Content / Ad Space - Customizable */}
            Partner Content
          </div>
        </div>
      </section>
    </Layout>
  );
}