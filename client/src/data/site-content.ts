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
    heroSubtitle: "ForYourInfluence is a South African food discovery platform led by professional chef Wesley.\n\nEach restaurant and takeaway is visited independently, with meals fully paid for, ensuring every feature is based on a genuine dining experience.\n\nThe platform focuses on thoughtful, experience driven insights rather than promotional hype.\n\nAlongside restaurant coverage, the site also offers Tastey, an AI-powered recipe generator designed to help home cooks create smarter, more practical meals with ease.",
    metaTitle: "ForYourInfluence | Independent Food Reviews from Chef Wesley",
    metaDescription: "Honest, independent restaurant and takeaway reviews from professional chef Wesley. Self-funded. No sponsorships. Real food experiences for viewers worldwide.",
    watchButton: "Watch Latest Reviews",
    favouritesButton: "My Favourites",
    whyDifferent: "Built on Trust and Transparency",
    whyDifferentSubtitle: "Instead of scores or gimmicks, the platform focuses on storytelling, real experiences, and clear disclosure — allowing both audiences and partners to engage with confidence.",
    features: [
      {
        title: "Professional Chef",
        description: "Real kitchen experience informs every feature and collaboration"
      },
      {
        title: "Independently Experienced",
        description: "Dining visits are approached firsthand, with transparency at the core"
      },
      {
        title: "Open & Transparent Partnerships",
        description: "Collaborations are clearly disclosed and handled with creative integrity"
      },
      {
        title: "Contextual Storytelling",
        description: "Each restaurant or brand is explored on its own merits, concept, and intent"
      }
    ],
    youtubeSection: "Latest on YouTube",
    youtubeSectionSubtitle: "New restaurant & takeaway visits.",
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
    twitter: "X",
    twitterUrl: "https://x.com/4YourYourlnfluence",
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
    description: "Independent food reviews from Africa. Chef-led. Self-funded. No sponsored content. For food lovers worldwide.",
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
