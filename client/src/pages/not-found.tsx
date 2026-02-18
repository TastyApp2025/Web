import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { usePageMeta } from "@/hooks/use-page-meta";

export default function NotFound() {
  usePageMeta({
    title: "Page Not Found | ForYourInfluence",
    description: "The page you're looking for doesn't exist. Return to ForYourInfluence for honest, independent restaurant reviews.",
    url: "https://www.foryourinfluence.co.za/404",
    keywords: "404, page not found, error",
  });

  return (
    <Layout>
      <div className="min-h-[70vh] w-full flex items-center justify-center px-4">
        <Card className="w-full max-w-md border-0 shadow-md bg-white">
          <CardContent className="pt-8 pb-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-center text-gray-900 mb-3">404</h1>
            <p className="text-center text-lg font-semibold text-gray-700 mb-4">Page Not Found</p>

            <p className="text-center text-sm text-gray-600 mb-8">
              Sorry, the page you're looking for doesn't exist. Let's get you back on track.
            </p>

            <div className="flex flex-col gap-3">
              <Button className="w-full gap-2" asChild>
                <Link href="/">
                  <Home size={16} />
                  Back to Home
                </Link>
              </Button>
              <Button variant="secondary" className="w-full gap-2" asChild>
                <Link href="/favourites">
                  View Restaurants
                  <ChevronRight size={16} />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
