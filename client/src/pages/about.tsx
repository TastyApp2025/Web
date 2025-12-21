import { Layout } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { usePageMeta } from "@/hooks/use-page-meta";
import { siteContent } from "@/data/site-content";
import { generatePersonSchema } from "@/lib/schema-helpers";
import aboutImage from "@assets/generated_images/fresh_ingredients_tomato_and_herbs.png";

export default function About() {
  // Enhanced schema with more details about the chef
  const aboutSchema = {
    "@context": "https://schema.org",
    "@graph": [
      generatePersonSchema(),
      {
        "@type": "ProfilePage",
        "name": "About Chef Wesley",
        "datePublished": "2023-01-01",
        "dateModified": new Date().toISOString().split('T')[0],
        "mainEntity": {
          "@type": "Person",
          "name": siteContent.chef.name,
          "url": siteContent.chef.url,
          "jobTitle": "Professional Chef & Content Creator",
          "description": "Independent food reviewer creating honest restaurant and takeaway reviews in South Africa. Self-funded. No sponsored content.",
          "image": "https://www.foryourinfluence.co.za/favicon.png",
          "knowsAbout": [
            "Cooking",
            "Food Reviews",
            "Restaurant Critique",
            "South African Cuisine",
            "Food Preparation",
            "Kitchen Management",
          ],
          "worksFor": {
            "@type": "Organization",
            "name": siteContent.siteTitle,
            "url": siteContent.siteUrl,
          },
          "sameAs": [
            siteContent.contact.youtubeUrl,
            siteContent.contact.instagramUrl,
            siteContent.contact.tiktokUrl,
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Media Inquiries",
            "email": "foryourinfluence2010@gmail.com",
          },
        },
      },
    ],
  };

  usePageMeta({
    title: siteContent.about.metaTitle,
    description: siteContent.about.metaDescription,
    url: "https://www.foryourinfluence.co.za/about",
    keywords: "chef Wesley, professional chef, food reviews, restaurant critic, South Africa, independent reviewer, food channel",
    structuredData: aboutSchema,
  });

  return (
    <Layout>
      <div className="bg-secondary/30 py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-4 bg-white/50 backdrop-blur">Our Philosophy</Badge>
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-6 heading-page">{siteContent.about.title}</h1>
          <p className="text-lg text-description max-w-2xl mx-auto">
             {siteContent.about.subtitle}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-xl rotate-1 hover:rotate-0 transition-transform duration-500">
            <img 
              src={aboutImage} 
              alt="Image of Chef Wesley in Chef Uniform" 
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="font-display font-bold text-3xl heading-section">{siteContent.about.chefPerspective}</h2>
            <div className="prose prose-lg text-body">
              <p>
                {siteContent.about.chefBio1}
              </p>
              <p>
                {siteContent.about.chefBio2}
              </p>
            </div>
            <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
              <h3 className="font-bold text-primary mb-2">My Promise</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  All visits are independent
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Food is paid for personally
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  No paid promotions accepted
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}