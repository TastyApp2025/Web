import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/error-boundary";
import { useAnalytics } from "@/hooks/use-analytics";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import Favourites from "@/pages/favourites";
import Contact from "@/pages/contact";
import RestaurantDetail from "@/pages/restaurant-detail";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/favourites" component={Favourites} />
      <Route path="/restaurant/:id" component={RestaurantDetail} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AnalyticsWrapper() {
  const [location] = useLocation();
  const { pageview } = useAnalytics();

  useEffect(() => {
    // Track page views
    const pageName = location === "/" ? "Home" : location.slice(1).charAt(0).toUpperCase() + location.slice(2);
    pageview(location, pageName);
  }, [location, pageview]);

  return <Router />;
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <AnalyticsWrapper />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;