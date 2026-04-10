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
            <Card className="p-8 shadow-lg border-none flex flex-col items-center justify-center text-center min-h-[300px]">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Mail size={32} />
              </div>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-lg text-description mb-6">
                For media enquiries, collaborations, or general questions, please reach out via email:
              </p>
              <a 
                href={`mailto:${siteContent.contact.contactFormEmail}`}
                className="text-2xl font-display font-bold text-primary hover:underline transition-all"
              >
                {siteContent.contact.contactFormEmail}
              </a>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}