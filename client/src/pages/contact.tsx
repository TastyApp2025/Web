import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, Instagram, Youtube } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { siteContent } from "@/data/site-content";

export default function Contact() {
  usePageMeta({
    title: siteContent.contact.metaTitle,
    description: siteContent.contact.metaDescription,
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-6">{siteContent.contact.title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {siteContent.contact.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <Card className="p-6 border-none shadow-md bg-secondary/30">
              <h3 className="font-bold mb-4">{siteContent.contact.socialsTitle}</h3>
              <div className="space-y-4">
                <a href={siteContent.contact.youtubeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-red-600">
                    <Youtube size={20} />
                  </div>
                  <span className="font-medium">{siteContent.contact.youtube}</span>
                </a>
                <a href={siteContent.contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                   <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-pink-600">
                    <Instagram size={20} />
                  </div>
                  <span className="font-medium">{siteContent.contact.instagram}</span>
                </a>
                <a href={siteContent.contact.tiktokUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                   <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-black">
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
                  <span className="font-medium">{siteContent.contact.tiktok}</span>
                </a>
              </div>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card className="p-8 shadow-lg border-none">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{siteContent.contact.nameLabel}</label>
                    <Input name="name" placeholder={siteContent.contact.namePlaceholder} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{siteContent.contact.emailLabel}</label>
                    <Input name="email" type="email" placeholder={siteContent.contact.emailPlaceholder} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{siteContent.contact.subjectLabel}</label>
                  <Input name="subject" placeholder={siteContent.contact.subjectPlaceholder} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{siteContent.contact.messageLabel}</label>
                  <Textarea name="message" placeholder={siteContent.contact.messagePlaceholder} className="min-h-[150px]" />
                </div>
                <Button 
                  className="w-full md:w-auto rounded-full px-8" 
                  size="lg"
                  onClick={(e) => {
                    e.preventDefault();
                    const form = (e.target as HTMLButtonElement).closest('form');
                    if (form) {
                      const formData = new FormData(form);
                      const name = formData.get('name') || form.querySelector('input[placeholder*="Your name"]')?.value || '';
                      const email = formData.get('email') || form.querySelector('input[type="email"]')?.value || '';
                      const subject = formData.get('subject') || form.querySelector('input[placeholder*="Collaboration"]')?.value || '';
                      const message = formData.get('message') || form.querySelector('textarea')?.value || '';
                      
                      const mailtoLink = `mailto:${siteContent.contact.contactFormEmail}?subject=${encodeURIComponent(subject || 'Contact Form Submission')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
                      window.location.href = mailtoLink;
                    }
                  }}
                >
                  {siteContent.contact.sendButton}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}