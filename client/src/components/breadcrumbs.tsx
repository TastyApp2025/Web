import { Link, useLocation } from "wouter";
import { ChevronRight } from "lucide-react";

interface Breadcrumb {
  label: string;
  href: string;
}

export function Breadcrumbs() {
  const [location] = useLocation();

  // Map routes to breadcrumbs
  const breadcrumbMap: Record<string, Breadcrumb[]> = {
    "/": [],
    "/about": [{ label: "About", href: "/about" }],
    "/favourites": [{ label: "Favourites", href: "/favourites" }],
    "/contact": [{ label: "Contact", href: "/contact" }],
  };

  const breadcrumbs = breadcrumbMap[location] || [];

  // Don't show breadcrumbs on home page
  if (!breadcrumbs.length) {
    return null;
  }

  return (
    <nav className="py-3 px-4 bg-muted/30 border-b border-border/50" aria-label="Breadcrumb">
      <div className="container mx-auto px-4">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-sm px-2 py-1"
            >
              Home
            </Link>
          </li>
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.href} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              {index === breadcrumbs.length - 1 ? (
                <span className="text-foreground font-medium">{crumb.label}</span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-sm px-2 py-1"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
