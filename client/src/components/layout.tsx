import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Instagram, Youtube, Video, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/favourites", label: "Favourites" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-display font-black text-3xl md:text-4xl text-primary tracking-tight hover:opacity-80 transition-opacity">
            ForYourInfluence
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === link.href
                    ? "text-primary font-bold"
                    : "text-muted-foreground"
                }`}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
            <Button size="sm" className="rounded-full bg-primary hover:bg-primary/90 text-white shadow-md">
              Recipe App
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            data-testid="button-menu-toggle"
          >
            {isMenuOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden border-b bg-background animate-in slide-in-from-top-5">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-lg font-medium py-2 transition-colors ${
                    location === link.href
                      ? "text-primary font-bold"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  data-testid={`link-nav-mobile-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Link>
              ))}
              <Button className="w-full rounded-full bg-primary hover:bg-primary/90 text-white">
                Try Recipe App
              </Button>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-secondary/15 border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-display font-bold text-lg mb-4">ForYourInfluence</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Independent South African food reviews. Chef-led. Self-funded. No sponsored content.
              </p>
            </div>
            <div>
              <h4 className="font-bold font-display mb-4">Pages</h4>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <Link href="/about" className="hover:text-primary transition-colors" data-testid="link-footer-about">
                  About Chef
                </Link>
                <Link href="/favourites" className="hover:text-primary transition-colors" data-testid="link-footer-favourites">
                  Favourites
                </Link>
                <Link href="/contact" className="hover:text-primary transition-colors" data-testid="link-footer-contact">
                  Contact
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold font-display mb-4">Connect</h4>
              <div className="flex gap-3">
                <a 
                  href="#" 
                  className="p-2.5 bg-white rounded-full border border-border hover:border-primary hover:text-primary transition-all shadow-sm hover:shadow-md"
                  data-testid="link-youtube"
                  aria-label="YouTube"
                >
                  <Youtube size={18} strokeWidth={2.5} />
                </a>
                <a 
                  href="#" 
                  className="p-2.5 bg-white rounded-full border border-border hover:border-primary hover:text-primary transition-all shadow-sm hover:shadow-md"
                  data-testid="link-instagram"
                  aria-label="Instagram"
                >
                  <Instagram size={18} strokeWidth={2.5} />
                </a>
                <a 
                  href="#" 
                  className="p-2.5 bg-white rounded-full border border-border hover:border-primary hover:text-primary transition-all shadow-sm hover:shadow-md"
                  data-testid="link-tiktok"
                  aria-label="TikTok"
                >
                  <Video size={18} strokeWidth={2.5} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} ForYourInfluence. Independent reviews. No hype.
          </div>
        </div>
      </footer>
    </div>
  );
}
