import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Play, ChevronRight, ChefHat, DollarSign, Ban, UtensilsCrossed } from "lucide-react";
import heroImage from "@assets/generated_images/professional_chef_plating_south_african_food.png";
import atmosphereImage from "@assets/generated_images/south_african_dining_atmosphere.png";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Chef plating food" 
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </div>
        <div className="container relative z-10 px-4 text-center text-white max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <ChefHat size={14} className="text-primary" />
            <span className="text-xs font-medium uppercase tracking-wider">Chef-Led Reviews</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl md:text-6xl lg:text-7xl leading-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Honest South African<br />
            <span className="text-primary">Food Experiences</span>
          </h1>
          <p className="font-serif text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            No ratings. No free meals. Just real, independent insights from a professional chef.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Button size="lg" className="rounded-full text-base h-12 px-8 w-full sm:w-auto">
              Watch Reviews
            </Button>
            <Button size="lg" variant="outline" className="rounded-full text-base h-12 px-8 w-full sm:w-auto bg-transparent border-white text-white hover:bg-white hover:text-black">
              Explore Favourites
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ChefHat, title: "Professional Chef", desc: "Insights from years in the kitchen" },
              { icon: DollarSign, title: "Self-Funded", desc: "I pay for every meal personally" },
              { icon: Ban, title: "No Sponsorships", desc: "Zero paid hype or promotions" },
              { icon: UtensilsCrossed, title: "Contextual", desc: "Reviews based on what they promise" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-secondary/30 border border-secondary transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <item.icon size={24} />
                </div>
                <h3 className="font-bold font-display text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Recipe CTA */}
      <section className="py-20 bg-secondary/20 border-y border-secondary">
        <div className="container mx-auto px-4">
          <div className="bg-card border rounded-3xl overflow-hidden shadow-xl flex flex-col md:flex-row">
            <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
              <span className="text-primary font-bold tracking-wider text-sm mb-2">NEW TOOL</span>
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-foreground">
                Cook Smarter with AI
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                The ForYourInfluence AI recipe generator helps you create meals based on the ingredients you actually have. Practical, accessible, and chef-verified logic.
              </p>
              <Button size="lg" className="w-fit rounded-full">
                Try Recipe Generator <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            <div className="md:w-1/2 bg-muted relative min-h-[300px]">
               <img 
                src={atmosphereImage}
                alt="Cooking atmosphere"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-card to-transparent md:via-card/20" />
            </div>
          </div>
        </div>
      </section>

      {/* YouTube Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-2">Latest Reviews</h2>
              <p className="text-muted-foreground max-w-xl">
                Recent restaurant and takeaway visits across South Africa, shared through honest, experience-based videos.
              </p>
            </div>
            <Button variant="ghost" className="hidden md:flex">
              View All Videos <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group relative aspect-video bg-muted rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition-all cursor-pointer">
                 {/* Placeholder for YouTube Embed/Thumbnail */}
                 <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play fill="currentColor" className="ml-1 text-primary w-6 h-6" />
                    </div>
                 </div>
                 <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <h3 className="font-bold line-clamp-2 leading-tight">Authentic Durban Curry - Is it worth the hype?</h3>
                    <p className="text-xs text-white/80 mt-1">Uploaded 2 days ago</p>
                 </div>
              </div>
            ))}
          </div>
          
          <Button variant="outline" className="w-full mt-8 md:hidden rounded-full">
            View Full Channel
          </Button>
        </div>
      </section>

      {/* Ad Space Placeholder (Subtle) */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="w-full max-w-3xl h-32 border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center text-muted-foreground text-sm uppercase tracking-widest">
            Partner Content Space
          </div>
        </div>
      </section>
    </Layout>
  );
}