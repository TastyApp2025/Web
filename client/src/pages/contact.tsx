import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, Instagram, Youtube, CheckCircle, AlertCircle, Loader } from "lucide-react";
import { useState } from "react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useContactForm } from "@/hooks/use-contact-form";
import { siteContent } from "@/data/site-content";
import { generatePersonSchema } from "@/lib/schema-helpers";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const { isLoading, isSuccess, isError, errorMessage, submitForm, reset } = useContactForm();

  // Combined schema for contact page
  const contactSchema = {
    "@context": "https://schema.org",
    "@graph": [
      generatePersonSchema(),
      {
        "@type": "ContactPoint",
        "contactType": "Media Inquiries",
        "email": siteContent.contact.contactFormEmail,
        "url": "https://www.foryourinfluence.co.za/contact",
        "contactOption": ["TelephoneOption", "EmailAddress"],
        "areaServed": [{"@type":"Continent","name":"Africa"},{"@type":"Country","name":"United Kingdom"},{"@type":"Country","name":"United States"},{"@type":"Country","name":"Canada"},{"@type":"Country","name":"Australia"}],
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How can I contact ForYourInfluence?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can reach out via the contact form on this page or email us directly at foryourinfluence2010@gmail.com for media inquiries and collaborations.",
            },
          },
          {
            "@type": "Question",
            "name": "What type of collaborations does ForYourInfluence do?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "ForYourInfluence accepts media inquiries and collaboration requests. All content is independent and self-funded. Get in touch for specific opportunities.",
            },
          },
        ],
      },
    ],
  };

  usePageMeta({
    title: siteContent.contact.metaTitle,
    description: siteContent.contact.metaDescription,
    url: "https://www.foryourinfluence.co.za/contact",
    keywords: "contact, enquiries, collaboration, media, food reviews, Wesley, ForYourInfluence",
    structuredData: contactSchema,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitForm(formData);
    if (success) {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(reset, 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-6 heading-page">{siteContent.contact.title}</h1>
          <p className="text-lg text-description max-w-2xl mx-auto">
            {siteContent.contact.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <Card className="p-6 border-none shadow-md bg-secondary/30">
              <h3 className="font-bold mb-4 heading-subsection">{siteContent.contact.socialsTitle}</h3>
              <div className="space-y-4">
                <a 
                  href={siteContent.contact.youtubeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 text-link hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-sm px-2 py-1"
                  aria-label={`Follow on ${siteContent.contact.youtube}`}
                >
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-red-600">
                    <Youtube size={20} aria-hidden="true" />
                  </div>
                  <span className="font-medium">{siteContent.contact.youtube}</span>
                </a>
                <a 
                  href={siteContent.contact.instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 text-link hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-sm px-2 py-1"
                  aria-label={`Follow on ${siteContent.contact.instagram}`}
                >
                   <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-pink-600">
                    <Instagram size={20} aria-hidden="true" />
                  </div>
                  <span className="font-medium">{siteContent.contact.instagram}</span>
                </a>
                <a 
                  href={siteContent.contact.tiktokUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 text-link hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-sm px-2 py-1"
                  aria-label={`Follow on ${siteContent.contact.tiktok}`}
                >
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
                      aria-hidden="true"
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
              {isSuccess && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex gap-3 items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-700">{siteContent.contact.successMessage}</p>
                  </div>
                </div>
              )}

              {isError && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex gap-3 items-start">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-red-700">{siteContent.contact.errorMessage}</p>
                    {errorMessage && <p className="text-sm text-red-600 mt-1">{errorMessage}</p>}
                  </div>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit} aria-label="Contact form">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="text-sm font-medium text-label">{siteContent.contact.nameLabel}</label>
                    <Input 
                      id="contact-name"
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={siteContent.contact.namePlaceholder}
                      required
                      aria-required="true"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-sm font-medium text-label">{siteContent.contact.emailLabel}</label>
                    <Input 
                      id="contact-email"
                      name="email" 
                      type="email" 
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={siteContent.contact.emailPlaceholder}
                      required
                      aria-required="true"
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-subject" className="text-sm font-medium text-label">{siteContent.contact.subjectLabel}</label>
                  <Input 
                    id="contact-subject"
                    name="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={siteContent.contact.subjectPlaceholder}
                    required
                    aria-required="true"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-message" className="text-sm font-medium text-label">{siteContent.contact.messageLabel}</label>
                  <Textarea 
                    id="contact-message"
                    name="message" 
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={siteContent.contact.messagePlaceholder} 
                    className="min-h-[150px]"
                    required
                    aria-required="true"
                    disabled={isLoading}
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full md:w-auto rounded-full px-8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" 
                  size="lg"
                  disabled={isLoading || isSuccess}
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    siteContent.contact.sendButton
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}