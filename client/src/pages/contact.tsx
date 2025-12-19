import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, Instagram, Youtube } from "lucide-react";

export default function Contact() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-6">Get in Touch</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            For media enquiries, collaborations, or general questions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <Card className="p-6 border-none shadow-md bg-secondary/30">
              <h3 className="font-bold mb-4">Socials</h3>
              <div className="space-y-4">
                <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-red-600">
                    <Youtube size={20} />
                  </div>
                  <span className="font-medium">YouTube</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                   <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-pink-600">
                    <Instagram size={20} />
                  </div>
                  <span className="font-medium">Instagram</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
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
                  <span className="font-medium">TikTok</span>
                </a>
              </div>
            </Card>

            <Card className="p-6 border-none shadow-md bg-primary/5">
              <h3 className="font-bold mb-2">Direct Email</h3>
              <a href="mailto:chef@foryourinfluence.com" className="flex items-center gap-2 text-primary font-medium hover:underline">
                <Mail size={16} />
                chef@foryourinfluence.com
              </a>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card className="p-8 shadow-lg border-none">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <Input placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" placeholder="hello@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input placeholder="Collaboration / Enquiry" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea placeholder="How can we help?" className="min-h-[150px]" />
                </div>
                <Button className="w-full md:w-auto rounded-full px-8" size="lg">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}