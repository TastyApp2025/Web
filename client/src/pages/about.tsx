import { Layout } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import aboutImage from "@assets/generated_images/fresh_ingredients_tomato_and_herbs.png";

export default function About() {
  return (
    <Layout>
      <div className="bg-secondary/30 py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-4 bg-white/50 backdrop-blur">Our Philosophy</Badge>
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-6">About ForYourInfluence</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
             A platform created to offer a more honest and realistic way of talking about food in South Africa.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-xl rotate-1 hover:rotate-0 transition-transform duration-500">
            <img 
              src={aboutImage} 
              alt="Fresh Ingredients" 
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="font-display font-bold text-3xl">The Chef's Perspective</h2>
            <div className="prose prose-lg text-muted-foreground">
              <p>
                As a professional chef, I understand food from the kitchen side. I know the prep, the costs, and the effort that goes into a plate.
              </p>
              <p>
                However, this platform isn't about critiquing knife cuts. It focuses on the <strong>real experience of eating out</strong>. I consider the atmosphere, service, food taste, and ultimately—value.
              </p>
              <p>
                Restaurants and takeaways are reviewed differently, based on what they aim to deliver. A fine dining spot has different standards than a street food vendor, but both can be excellent in their own context.
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