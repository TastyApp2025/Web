// Edit this file to update all text content across your site
// Changes here will automatically reflect on all pages

export const siteContent = {
  // Header & Navigation
  siteTitle: "ForYourInfluence",
  siteUrl: "https://www.foryourinfluence.co.za",
  recipeAppButton: "Tastey",
  
  // SEO & Schema Data
  chef: {
    name: "Wesley",
    url: "https://www.foryourinfluence.co.za/about"
  },

  // Home Page
  home: {
    heroTitle1: "Real Food",
    heroTitle2: "No Hype",
    heroSubtitle: "ForYourInfluence is a South African food experience platform run by a professional chef Wesley. I visit restaurants and takeaways independently, pay for my own food, and share honest insights into the full dining. Alongside this, I offer an AI-powered recipe generator \"Tastey\" to help people cook smarter at home.",
    metaTitle: "ForYourInfluence | Independent Food Reviews from a South African Chef",
    metaDescription: "Honest, independent restaurant and takeaway reviews from professional chef Wesley. Self-funded. No sponsorships. Real experiences.",
    watchButton: "Watch Latest Reviews",
    favouritesButton: "My Favourites",
    whyDifferent: "Why I'm Different",
    whyDifferentSubtitle: "No ratings. No free meals. No sponsored content.",
    features: [
      {
        title: "Professional Chef",
        description: "Kitchen experience shapes every review"
      },
      {
        title: "Self-Funded",
        description: "I pay for every single meal"
      },
      {
        title: "No Sponsorships",
        description: "Zero paid placements or deals"
      },
      {
        title: "Contextual",
        description: "Judged on their own merits to be different"
      }
    ],
    youtubeSection: "Latest on YouTube",
    youtubeSectionSubtitle: "New restaurant & takeaway visits. Honest takes. Auto-updated.",
    viewAllVideos: "View All Videos",
    recipeTitle: "Cook What You Have",
    recipeSubtitle: "Generate meal ideas based on your pantry. Smart, practical recipes from chef knowledge.",
    tryRecipeButton: "Tastey App",
    tasteyLink: "https://www.tastey.co.za/",
    partnerContent: "Partner Content",
  },

  // Favourites Page
  favourites: {
    title: "Chef's Favourites",
    subtitle: "The spots I keep going back to.",
    emptyState: "No Favourites Yet",
    metaTitle: "Chef's Favourite Restaurants | ForYourInfluence",
    metaDescription: "Discover the restaurants and takeaways that a professional chef keeps going back to. Real reviews from Chef Wesley.",
  },

  // About Page
  about: {
    title: "About ForYourInfluence",
    subtitle: "A platform created to offer a more honest and realistic way of talking about food in South Africa.",
    chefPerspective: "About",
    chefBio1: "As a professional chef, I understand food from the kitchen side. I know the prep, the costs, and the effort that goes into a plate. However, this platform isn't about being overly technical or harsh. It focuses on the real experience of eating out. I consider the atmosphere, service, food taste, and ultimately the value.",
    chefBio2: "Restaurants and takeaways are reviewed differently, based on what they aim to deliver. A fine dining spot has different standards than a street food vendor, but both can be excellent in their own context. All visits are independent. I pay for my own food and do not accept free meals or paid promotions to review or visit restaurants.",
    metaTitle: "About Chef Wesley | Independent Food Reviews | ForYourInfluence",
    metaDescription: "Learn about Chef Wesley and his approach to independent, honest restaurant reviews. Professional chef. Self-funded. No sponsorships.",
  },

  // Contact Page
  contact: {
    title: "Get in Touch",
    subtitle: "For media enquiries, collaborations, or general questions.",
    metaTitle: "Contact Us | ForYourInfluence",
    metaDescription: "Get in touch with Chef Wesley for media enquiries, collaborations, or questions about ForYourInfluence.",
    socialsTitle: "Connect",
    youtube: "YouTube",
    youtubeUrl: "https://www.youtube.com/@ForYourInfluence",
    instagram: "Instagram",
    instagramUrl: "https://www.instagram.com/4yourinfluence",
    tiktok: "TikTok",
    tiktokUrl: "https://www.tiktok.com/@foryourinfluence",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "hello@example.com",
    subjectLabel: "Subject",
    subjectPlaceholder: "Collaboration / Enquiry",
    messageLabel: "Message",
    messagePlaceholder: "How can we help?",
    sendButton: "Send Message",
    successMessage: "Message sent successfully! We'll get back to you soon.",
    errorMessage: "Failed to send message. Please try again or email us directly.",
    contactFormEmail: "foryourinfluence2010@gmail.com",
    contactFormEndpoint: "/api/contact",
  },

  // Footer
  footer: {
    siteTitleFooter: "ForYourInfluence",
    description: "Independent South African food reviews. Chef-led. Self-funded. No sponsored content.",
    pagesTitle: "Pages",
    aboutLink: "About Chef",
    favouritesLink: "Favourites",
    contactLink: "Contact",
    connectTitle: "Connect",
    copyrightText: "Independent reviews. No hype.",
  },

  // Analytics & Tracking
  analytics: {
    // Google Analytics 4 - set your measurement ID here
    googleAnalyticsId: import.meta.env.VITE_GA_ID || "",
    // Enable/disable analytics
    enableTracking: true,
  },

  // AdSense Configuration
  adsense: {
    // Publisher ID from AdSense
    publisherId: import.meta.env.VITE_ADSENSE_ID || "ca-pub-xxxxxxxxxxxxxxxx",
    // Top Banner Ad Slot
    topAdSlot: import.meta.env.VITE_ADSENSE_TOP_SLOT || "1234567890",
    // Bottom Ad Slot
    bottomAdSlot: import.meta.env.VITE_ADSENSE_BOTTOM_SLOT || "0987654321",
    // Enable ads
    enableAds: true,
  },

  // Favicon Configuration
  favicon: {
    url: "/favicon.png",
    appleTouchIcon: "/icons/icon-192x192.png",
  },

  // YouTube Configuration
  youtube: {
    maxVideosPerPage: 4,
    retryAttempts: 3,
    retryDelayMs: 1000,
  },

  // Image Configuration
  images: {
    lazyLoadEnabled: true,
    useWebP: true,
    showLoadingState: true,
  },

  // API Configuration
  api: {
    rateLimit: {
      enabled: true,
      requestsPerMinute: 60,
      requestsPerHour: 1000,
    },
    timeout: 30000,
    retryAttempts: 3,
  }
};
