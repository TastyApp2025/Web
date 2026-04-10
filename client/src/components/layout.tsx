import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Instagram, Youtube, Video, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BackToTop } from "@/components/back-to-top";
import { siteContent } from "@/data/site-content";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/favourites", label: "Favourites" },
    { href: "/contact", label: "Contact" },
  ];

  // Close menu when location changes
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-opacity-90" role="banner">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link 
            href="/" 
            className="font-display font-black text-3xl md:text-4xl heading-main tracking-tight hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-sm"
            role="link"
            onClick={closeMenu}
          >
            {siteContent.siteTitle}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link text-sm font-medium transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-sm px-2 py-1 ${
                  location === link.href
                    ? "text-primary font-bold active"
                    : "text-link"
                }`}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
                role="link"
                aria-current={location === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
            <Button 
              size="sm" 
              className="rounded-full bg-green hover:bg-green/90 text-white shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
              aria-label={siteContent.recipeAppButton}
            >
              {siteContent.recipeAppButton}
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            data-testid="button-menu-toggle"
          >
            {isMenuOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div 
            className="md:hidden border-b bg-background animate-in slide-in-from-top-5"
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-lg font-medium py-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-sm px-2 ${
                    location === link.href
                      ? "text-primary font-bold"
                      : "text-link hover:text-primary"
                  }`}
                  onClick={closeMenu}
                  data-testid={`link-nav-mobile-${link.label.toLowerCase()}`}
                  role="link"
                  aria-current={location === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              ))}
              <Button 
                className="w-full rounded-full bg-green hover:bg-green/90 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
                aria-label={siteContent.recipeAppButton}
                onClick={closeMenu}
              >
                {siteContent.recipeAppButton}
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Breadcrumbs */}
      <Breadcrumbs />

      <main className="flex-1" role="main">
        {children}
      </main>

      {/* Back to Top Button */}
      <BackToTop />

      <footer className="border-t border-border py-12" role="contentinfo">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-display font-bold text-lg mb-4 text-footer-heading">{siteContent.footer.siteTitleFooter}</h3>
              <p className="text-sm text-footer-body leading-relaxed">
                {siteContent.footer.description}
              </p>
            </div>
            <div>
              <h4 className="font-bold font-display mb-4 text-footer-heading">{siteContent.footer.pagesTitle}</h4>
              <div className="flex flex-col gap-2 text-sm text-footer-link">
                <Link href="/about" className="hover:text-primary transition-colors" data-testid="link-footer-about">
                  {siteContent.footer.aboutLink}
                </Link>
                <Link href="/favourites" className="hover:text-primary transition-colors" data-testid="link-footer-favourites">
                  {siteContent.footer.favouritesLink}
                </Link>
                <Link href="/contact" className="hover:text-primary transition-colors" data-testid="link-footer-contact">
                  {siteContent.footer.contactLink}
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold font-display mb-4 text-footer-heading">{siteContent.footer.connectTitle}</h4>
              <div className="flex gap-3">
                <a 
                  href={siteContent.contact.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                  data-testid="link-youtube"
                  aria-label="YouTube"
                >
                  <div className="social-icon w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-red-600">
                    <Youtube size={20} />
                  </div>
                </a>
                <a 
                  href={siteContent.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                  data-testid="link-instagram"
                  aria-label="Instagram"
                >
                  <div className="social-icon w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-pink-600">
                    <Instagram size={20} />
                  </div>
                </a>
                <a 
                  href={siteContent.contact.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                  data-testid="link-tiktok"
                  aria-label="TikTok"
                >
                  <div className="social-icon w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-black">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-xs text-footer-body">
            &copy; {new Date().getFullYear()} {siteContent.footer.siteTitleFooter}. {siteContent.footer.copyrightText}
          </div>
        </div>
      </footer>
    </div>
  );
}
