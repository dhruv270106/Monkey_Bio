import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_NAME = 'Monkey Linktree';

// Define the public and dashboard pages
const pages = [
  // Public Top Level Routes
  { path: 'index.html', title: 'Home - Premium Creator Platform' },
  { path: 'features.html', title: 'Features' },
  { path: 'pricing.html', title: 'Pricing' },
  { path: 'discover.html', title: 'Discover Creators' },
  { path: 'marketplace.html', title: 'Integrations Marketplace' },
  { path: 'blog.html', title: 'Blog' },
  { path: 'blog-category.html', title: 'Creator Tips - Blog' },
  { path: 'blog-article.html', title: 'How to Grow Your Audience - Blog' },
  { path: 'about.html', title: 'About Us' },
  { path: 'careers.html', title: 'Careers' },
  { path: 'help-center.html', title: 'Help Center' },
  { path: 'help-center-category.html', title: 'Getting Started - Help Center' },
  { path: 'help-center-article.html', title: 'How to Set Up Your Page - Help Center' },
  { path: 'login.html', title: 'Login' },
  { path: 'signup.html', title: 'Sign Up' },
  { path: 'contact.html', title: 'Contact Support' },
  { path: 'api.html', title: 'API / Developers' },
  { path: 'press.html', title: 'Press' },
  { path: 'enterprise.html', title: 'Enterprise' },
  { path: 'privacy-policy.html', title: 'Privacy Policy' },
  { path: 'terms-of-service.html', title: 'Terms of Service' },
  { path: 'cookie-policy.html', title: 'Cookie Policy' },

  // Feature Subpages
  { path: 'features/link-pages.html', title: 'Link Pages' },
  { path: 'features/analytics.html', title: 'Analytics' },
  { path: 'features/appearance-customization.html', title: 'Appearance' },
  { path: 'features/monetization.html', title: 'Monetization' },
  { path: 'features/email-capture.html', title: 'Email Capture' },
  { path: 'features/scheduling-links.html', title: 'Scheduling Links' },
  { path: 'features/social-integrations.html', title: 'Social Integrations' },
  { path: 'features/affiliate-tracking.html', title: 'Affiliate Tracking' },
  { path: 'features/qr-code-generator.html', title: 'QR Codes' },
  { path: 'features/custom-domains.html', title: 'Custom Domains' },

  // Marketplace Subpages
  { path: 'marketplace/youtube.html', title: 'YouTube Integration' },
  { path: 'marketplace/spotify.html', title: 'Spotify Integration' },
  { path: 'marketplace/tiktok.html', title: 'TikTok Integration' },
  { path: 'marketplace/instagram.html', title: 'Instagram Integration' },
  { path: 'marketplace/shopify.html', title: 'Shopify Integration' },
  { path: 'marketplace/stripe.html', title: 'Stripe Integration' },
  { path: 'marketplace/paypal.html', title: 'PayPal Integration' },
  { path: 'marketplace/mailchimp.html', title: 'Mailchimp Integration' },
  { path: 'marketplace/zapier.html', title: 'Zapier Integration' },
  { path: 'marketplace/whatsapp.html', title: 'WhatsApp Integration' },

  // Dashboard Routes
  { path: 'dashboard/links.html', title: 'Manage Links' },
  { path: 'dashboard/analytics.html', title: 'Your Analytics' },
  { path: 'dashboard/appearance.html', title: 'Customize Appearance' },
  { path: 'dashboard/integrations.html', title: 'Integrations' },
  { path: 'dashboard/monetization.html', title: 'Monetization Tools' },
  { path: 'dashboard/email-capture.html', title: 'Email Leads' },
  { path: 'dashboard/qr-codes.html', title: 'QR Codes' },
  { path: 'dashboard/domains.html', title: 'Custom Domains' },
  { path: 'dashboard/billing.html', title: 'Billing & Subscriptions' },
  { path: 'dashboard/settings.html', title: 'Settings' },

  // Public Profile Model
  { path: 'profile-demo.html', title: 'Alex Rivera - Links' },
  { path: 'profile-artist.html', title: 'Luna Sol | Visual Artist' },
  { path: 'profile-founder.html', title: 'Jordan Chen | Tech Founder' },
];

const PAGE_DATA = {
  'index.html': {
    heroHeading: 'Everything you are.<br><span class="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-[#43E660] to-teal-400">In one link.</span>',
    heroSubheadline: 'Join 50M+ creators who use Monkey to organize their links, monetize their audience, and build their brand. The only platform that grows with you.',
    primaryCTA: 'Claim it',
    secondaryCTA: 'Sign up free',
    trustLine: 'Join 5M+ successful creators today.',
    features: [
      { title: 'Create your page', description: 'Design a stunning mobile-first landing page for your audience in minutes, no coding required.' },
      { title: 'Track everything', description: 'Real-time analytics on clicks, views, and revenue right from your beautifully clean dashboard.' },
      { title: 'Earn money', description: 'Sell digital products, collect tips, or set up a membership instantly directly on your page.' }
    ],
    faqs: [
      { q: 'Is Monkey truly free?', a: 'Yes! We offer a powerful free forever plan that includes all core features you need to get started.' },
      { q: 'How many links can I add?', a: 'On all plans, including Free, you can add unlimited links to your profile page.' },
      { q: 'Can I sell products directly?', a: 'Absolutely. Use our Monetization tools to sell digital goods, collect tips, and manage memberships.' },
      { q: 'Do I need a custom domain?', a: 'No, but you can definitely connect one on our Pro plans for a more professional look.' },
      { q: 'How do I track my performance?', a: 'Our built-in analytics dashboard gives you deep insights into where your traffic is coming from.' },
      { q: 'Are there any hidden fees?', a: 'None. We are transparent about our pricing and there are no surprises.' }
    ]
  },
  'features.html': {
    heroHeading: 'Powerful tools for the modern creator.',
    heroDescription: 'From advanced analytics to seamless monetization, build your digital home with features designed for growth.',
    capabilities: 'Complete control over your audience journey.',
    ctaHeading: 'Ready to level up your bio?'
  },
  'pricing.html': {
    heroHeading: 'Simple, transparent pricing.',
    heroDescription: 'Choose the plan that fits your stage. From just starting out to scaling a global brand.',
    plans: [
      { name: 'Free', price: '$0', desc: 'The basics for every creator.', features: ['Unlimited links', 'Basic analytics', 'Standard themes', 'Community support'] },
      { name: 'Starter', price: '$5', desc: 'Perfect for growing creators.', features: ['Remove Monkey branding', 'Advanced analytics', 'Link scheduling', 'Priority support'] },
      { name: 'Pro', price: '$12', desc: 'The ultimate creator toolkit.', features: ['Custom domains', 'Email capture', 'Pixel integration', '0% transaction fees'] },
      { name: 'Business', price: '$24', desc: 'For teams and large creators.', features: ['Multiple user access', 'Centralized branding', 'Dedicated account manager', 'API access'] }
    ]
  },
  'features/link-pages.html': {
    hero: 'One link, endless possibilities.',
    benefit: 'The most flexible landing page for your brand.',
    useCases: 'Perfect for DJs, Artists, Coaches, and Retailers.',
    howItWorks: 'Add your links, customize your theme, and share everywhere.'
  },
  'features/analytics.html': {
    hero: 'Deep insights into your audience.',
    benefit: 'Track every click and visitor session in real-time.',
    useCases: 'Optimize your marketing spend and content strategy.',
    howItWorks: 'Automatic tracking for all links, no setup required.'
  },
  'marketplace.html': {
    hero: 'Connect your favorite tools.',
    description: 'Our marketplace features over 100+ integrations to help you automate your workflow.',
    cta: 'Explore all integrations'
  },
  'about.html': {
    hero: 'Our mission is to empower creators.',
    mission: 'We believe everyone should have a beautiful digital home.',
    values: 'Simplicity, Speed, and Security.',
    story: 'Founded in 2024 to solve the problem of fragmented digital identities.'
  },
  'blog.html': {
    hero: 'Creator Insights & Strategy',
    description: 'Learn how to grow your audience and build a sustainable brand.'
  },
  'contact.html': {
    hero: 'We are here to help.',
    support: 'Need technical support? Check our Help Center or email us.',
    business: 'Interested in partnering? Contact our growth team.'
  },
  'features/monetization.html': {
    hero: 'Get paid for what you create.',
    description: 'Collect tips, sell products, or set up memberships directly on your profile. Our 0% transaction fee models help you keep what you earn.',
    cta: 'Start earning now'
  },
  'features/appearance-customization.html': {
    hero: 'Your brand, your rules.',
    description: 'Full control over fonts, colors, backgrounds, and layouts. Make your page truly unique with our advanced design editor.',
    cta: 'Design your page'
  },
  'features/email-capture.html': {
    hero: 'Own your audience.',
    description: 'Build your mailing list directly from your link in bio. Integrate with Mailchimp, ConvertKit, and more.',
    cta: 'Grow your list'
  },
  'help-center.html': {
    hero: 'How can we help you today?',
    search: 'Search our knowledge base...'
  },
  'help-center-category.html': {
    hero: 'Getting Started',
    description: 'Learn the basics of setting up your Monkey profile.'
  },
  'help-center-article.html': {
    hero: 'How to Customize Your Page',
    description: 'A step-by-step guide to choosing themes, fonts, and colors.'
  },
  'blog-category.html': {
    hero: 'Creator Strategy',
    description: 'Deep dives into growing your audience and revenue.'
  },
  'blog-article.html': {
    hero: '10 Tips for Your Link in Bio',
    description: 'Maximize your CTR with these proven link organization techniques.'
  },
  'marketplace/youtube.html': {
    hero: 'YouTube for Monkey',
    description: 'Embed your latest videos or live streams directly on your page.'
  },
  'marketplace/spotify.html': {
    hero: 'Spotify for Monkey',
    description: 'Showcase your favorite music, podcasts, or latest tracks.'
  },
  'dashboard/analytics.html': {
    hero: 'Audience Insights',
    description: 'Understand exactly who is visiting and what they are clicking.'
  },
  'privacy-policy.html': {
    hero: 'Privacy Policy',
    description: 'We respect your data and transparency is our core value.'
  },
  'terms-of-service.html': {
    hero: 'Terms of Service',
    description: 'The standard agreement for using our platform.'
  },
  'cookie-policy.html': {
    hero: 'Cookie Policy',
    description: 'How we use cookies to improve your experience.'
  },
  'api.html': {
    hero: 'Developer Hub',
    description: 'Build custom integrations with the Monkey API.'
  },
  'press.html': {
    hero: 'Press Kit',
    description: 'Official logos, assets, and contact information for media.'
  },
  'careers.html': {
    hero: 'Join the Monkey Team',
    description: 'Help us build the future of the creator economy.'
  },
  'enterprise.html': {
    hero: 'Monkey for Enterprise',
    description: 'Scalable solutions for teams, agencies, and global brands.'
  }
};

const headerDesktop = (depth) => {
  const root = depth === 0 ? './' : '../'.repeat(depth);
  return `
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <div class="flex items-center gap-8">
            <a href="${root}index.html" class="flex items-center gap-2">
              <span class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-secondary font-bold text-xl">M</span>
              <span class="font-bold text-xl tracking-tight text-secondary">Monkey</span>
            </a>
            <nav class="hidden md:flex items-center gap-6">
              <div class="relative group">
                <a href="${root}features.html" class="text-sm font-medium text-gray-600 hover:text-black transition-colors flex items-center gap-1 py-4">Features <i data-lucide="chevron-down" class="w-4 h-4"></i></a>
                <div class="absolute top-[80%] left-0 bg-white shadow-xl rounded-xl border border-gray-100 w-64 pt-2 pb-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left -translate-y-2 group-hover:translate-y-0">
                  <a href="${root}features/link-pages.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-neutral-100 rounded-lg">Link Pages</a>
                  <a href="${root}features/analytics.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-neutral-100 rounded-lg">Analytics</a>
                   <a href="${root}features/appearance-customization.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-neutral-100 rounded-lg">Appearance Customization</a>
                   <a href="${root}features/monetization.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-neutral-100 rounded-lg">Monetization</a>
                   <a href="${root}features/email-capture.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-neutral-100 rounded-lg">Email Capture</a>
                </div>
              </div>
              <a href="${root}pricing.html" class="text-sm font-medium text-gray-600 hover:text-black transition-colors">Pricing</a>
              <a href="${root}discover.html" class="text-sm font-medium text-gray-600 hover:text-black transition-colors">Discover</a>
              <div class="relative group">
                <a href="${root}marketplace.html" class="text-sm font-medium text-gray-600 hover:text-black transition-colors flex items-center gap-1 py-4">Marketplace <i data-lucide="chevron-down" class="w-4 h-4"></i></a>
                <div class="absolute top-[80%] left-0 bg-white shadow-xl rounded-xl border border-gray-100 w-64 pt-2 pb-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left -translate-y-2 group-hover:translate-y-0">
                  <a href="${root}marketplace/youtube.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-neutral-100 rounded-lg">YouTube</a>
                  <a href="${root}marketplace/spotify.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-neutral-100 rounded-lg">Spotify</a>
                  <a href="${root}marketplace/shopify.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-neutral-100 rounded-lg">Shopify</a>
                  <a href="${root}marketplace/stripe.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-neutral-100 rounded-lg">Stripe</a>
                </div>
              </div>
              <a href="${root}blog.html" class="text-sm font-medium text-gray-600 hover:text-black transition-colors">Blog</a>
              
              <div class="relative group">
                <a href="${root}about.html" class="text-sm font-medium text-gray-600 hover:text-black transition-colors flex items-center gap-1 py-4">About <i data-lucide="chevron-down" class="w-4 h-4"></i></a>
                <div class="absolute top-[80%] left-0 bg-white shadow-xl rounded-xl border border-gray-100 w-48 pt-2 pb-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left -translate-y-2 group-hover:translate-y-0">
                  <a href="${root}about.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-neutral-100 rounded-lg">Company</a>
                  <a href="${root}careers.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-neutral-100 rounded-lg">Careers</a>
                  <a href="${root}press.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-neutral-100 rounded-lg">Press</a>
                  <a href="${root}contact.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-neutral-100 rounded-lg">Contact</a>
                  <a href="${root}enterprise.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-neutral-100 rounded-lg">Enterprise</a>
                </div>
              </div>
            </nav>
          </div>
          <div class="flex items-center gap-4">
             <a href="${root}login.html" class="text-sm font-semibold text-gray-800 hover:text-black hidden sm:block bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-full transition-colors">Log in</a>
             <a href="${root}signup.html" class="text-sm font-semibold bg-secondary text-white hover:bg-gray-800 px-6 py-3 rounded-full transition-all shadow-md transform hover:scale-105">Sign up free</a>
          </div>
        </div>
      </div>
    </header>
  `;
};

const footerTemplate = (depth) => {
  const root = depth === 0 ? './' : '../'.repeat(depth);
  return `
    <footer class="bg-gray-50 border-t border-gray-200 text-secondary pt-24 pb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          <div class="col-span-2 lg:col-span-1">
             <a href="${root}index.html" class="flex items-center gap-2 mb-6">
              <span class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-secondary font-bold text-xl">M</span>
              <span class="font-bold text-xl tracking-tight">Monkey</span>
             </a>
             <p class="text-gray-500 text-sm mb-6">Everything you are. In one simple link in bio. Join millions of creators today.</p>
             <div class="flex items-center gap-4">
               <a href="#" class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-primary transition-colors text-gray-700 hover:text-secondary"><i data-lucide="twitter" class="w-4 h-4"></i></a>
               <a href="#" class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-primary transition-colors text-gray-700 hover:text-secondary"><i data-lucide="instagram" class="w-4 h-4"></i></a>
               <a href="#" class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-primary transition-colors text-gray-700 hover:text-secondary"><i data-lucide="youtube" class="w-4 h-4"></i></a>
             </div>
          </div>
          <div>
            <h4 class="font-bold mb-4">Product</h4>
            <ul class="space-y-3 text-sm text-gray-500 font-medium">
              <li><a href="${root}features.html" class="hover:text-primary transition-colors">Features</a></li>
              <li><a href="${root}pricing.html" class="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="${root}discover.html" class="hover:text-primary transition-colors">Discover</a></li>
              <li><a href="${root}marketplace.html" class="hover:text-primary transition-colors">Marketplace</a></li>
              <li><a href="${root}features/monetization.html" class="hover:text-primary transition-colors">Monetization</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold mb-4">Company</h4>
            <ul class="space-y-3 text-sm text-gray-500 font-medium">
              <li><a href="${root}about.html" class="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="${root}careers.html" class="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="${root}press.html" class="hover:text-primary transition-colors">Press</a></li>
              <li><a href="${root}contact.html" class="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="${root}enterprise.html" class="hover:text-primary transition-colors">Enterprise</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold mb-4">Resources</h4>
            <ul class="space-y-3 text-sm text-gray-500 font-medium">
              <li><a href="${root}blog.html" class="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="${root}help-center.html" class="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="${root}api.html" class="hover:text-primary transition-colors">Developer API</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold mb-4">Legal</h4>
            <ul class="space-y-3 text-sm text-gray-500 font-medium">
              <li><a href="${root}privacy-policy.html" class="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="${root}terms-of-service.html" class="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="${root}cookie-policy.html" class="hover:text-primary transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 font-medium">
          <p>&copy; 2026 Monkey Linktree Sandbox. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `;
}

const getSplineBackgroundScript = () => `
  <!-- Mock Spline/Interactive background simulation logic -->
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const bg = document.getElementById('spline-bg');
      if (bg) {
        window.addEventListener('mousemove', (e) => {
             const x = e.clientX / window.innerWidth;
             const y = e.clientY / window.innerHeight;
             // Slow elegant motion mapping
             bg.style.transform = "translate(-" + (x * 30) + "px, -" + (y * 30) + "px) scale(1.05)";
        });
      }
    });
  </script>
`;

const generatePageHTML = (page) => {
  const depth = page.path.split('/').length - 1;
  const root = depth === 0 ? './' : '../'.repeat(depth);

  const isDashboard = page.path.startsWith('dashboard');
  const isAuth = page.path === 'login.html' || page.path === 'signup.html';
  const isProfile = page.path === 'profile-demo.html';

  let head = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page.title} | ${SITE_NAME}</title>
    <!-- We inject tailwindcss script for simple rapid preview execution here -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              primary: { DEFAULT: '#6cf383', dark: '#43E660' },
              secondary: { DEFAULT: '#0F172A' },
            },
            fontFamily: { sans: ['Inter', 'sans-serif'] },
            animation: {
              'fade-in': 'fadeIn 0.7s ease-out forwards',
              'bounce-slow': 'bounce 4s infinite',
            },
            keyframes: {
              fadeIn: {
                '0%': { opacity: '0', transform: 'translateY(10px)' },
                '100%': { opacity: '1', transform: 'translateY(0)' },
              }
            }
          }
        }
      }
    </script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script>
      const supabaseUrl = 'https://esngrodyozljdjkfcocp.supabase.co';
      const supabaseKey = 'sb_publishable_6DOFYKjxL3o2U1rs5Gd4cw_SitIaPwy';
      const supabase = supabasejs.createClient(supabaseUrl, supabaseKey);
    </script>
    <style>
       body { font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }
       .spline-bg-container {
           position: absolute; inset: 0; z-index: -1; overflow: hidden; background: #fafafa;
       }
       .spline-orb {
           position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.6;
           animation: floatOrb 10s infinite alternate ease-in-out;
       }
       @keyframes floatOrb {
           0% { transform: translate(0,0) scale(1); }
           100% { transform: translate(50px, 60px) scale(1.05); }
       }
    </style>
</head>
<body class="bg-gray-50 text-secondary min-h-screen flex flex-col ${isDashboard ? 'bg-gray-50' : ''}">
  `;

  let body = '';

  if (isProfile) {
    const profileType = page.path.includes('founder') ? 'founder' : page.path.includes('artist') ? 'artist' : 'creator';
    const profileMeta = {
      creator: { name: 'Alex Rivera', bio: 'Digital Creator & Minimalist ✨', links: [{ icon: 'youtube', text: 'New YouTube Video! 🚀' }, { icon: 'shopping-bag', text: 'My Setup & Gear Store' }, { icon: 'calendar', text: 'Book a 1:1 Call' }] },
      artist: { name: 'Luna Sol', bio: 'Visual Artist & Dreamer 🎨', links: [{ icon: 'palette', text: 'Latest NFT Collection' }, { icon: 'image', text: 'Portfolio 2024' }, { icon: 'mail', text: 'Commission Requests' }] },
      founder: { name: 'Jordan Chen', bio: 'Tech Founder & Angel Investor 💡', links: [{ icon: 'external-link', text: 'Read my latest thread' }, { icon: 'briefcase', text: 'Work with my agency' }, { icon: 'coffee', text: 'Office Hours' }] }
    }[profileType] || profileMeta.creator;

    body += `
      <!-- Public Profile Page Design -->
      <div class="min-h-screen w-full relative overflow-x-hidden flex items-center justify-center py-12 px-4 sm:px-0" style="background: linear-gradient(135deg, #1e293b, #0f172a);">
         <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div class="spline-orb" style="width: 400px; height: 400px; background: #43E660; top: -10%; left: -10%; opacity: 0.15;"></div>
            <div class="spline-orb" style="width: 500px; height: 500px; background: #6cf383; bottom: -20%; right: -10%; opacity: 0.1; animation-delay: -5s;"></div>
         </div>
         
         <div class="w-full max-w-[480px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-[40px] p-8 pb-12 shadow-2xl relative z-10 text-center animate-fade-in opacity-0">
            <img src="https://i.pravatar.cc/150?u=${page.path}" alt="${profileMeta.name}" class="w-24 h-24 rounded-full border-4 border-white/20 mx-auto shadow-lg mb-4 object-cover">
            <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-1">${profileMeta.name} <i data-lucide="badge-check" class="w-5 h-5 text-primary"></i></h1>
            <p class="text-white/80 font-medium mb-6">${profileMeta.bio}</p>
            
            <div class="flex justify-center gap-4 mb-8">
               <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all transform hover:scale-110"><i data-lucide="instagram" class="w-5 h-5"></i></a>
               <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all transform hover:scale-110"><i data-lucide="twitter" class="w-5 h-5"></i></a>
               <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all transform hover:scale-110"><i data-lucide="mail" class="w-5 h-5"></i></a>
            </div>

            <div class="space-y-4">
              ${profileMeta.links.map(l => `
                <a href="#" class="block w-full py-4 px-6 bg-white/90 backdrop-blur text-secondary rounded-2xl font-semibold shadow-md hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300">
                  <span class="flex items-center justify-center gap-2"><i data-lucide="${l.icon}" class="w-5 h-5"></i> ${l.text}</span>
                </a>
              `).join('')}
            </div>
            
            <a href="${root}index.html" class="mt-12 inline-flex items-center gap-1 text-white/50 text-sm font-medium hover:text-white transition-colors">
              Powered by <span class="text-white font-bold tracking-tight">Monkey<span class="text-primary">.</span></span>
            </a>
         </div>
      </div>
    `;
  } else if (isAuth) {
    body += `
      <!-- Auth Layout -->
      <div class="min-h-screen flex bg-[#F5F7FA]">
         <div class="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative z-10 rounded-r-[40px] shadow-2xl overflow-hidden">
            <div class="w-full max-w-md animate-fade-in opacity-0" style="animation-delay: 0.2s;">
              <a href="${root}index.html" class="flex items-center gap-2 mb-12">
                <span class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-secondary font-bold text-xl">M</span>
                <span class="font-bold text-3xl tracking-tight text-secondary">Monkey</span>
              </a>
              <h1 class="text-4xl font-bold mb-4 tracking-tight">${page.title}</h1>
              <p class="text-gray-500 mb-8 font-medium">${page.path === 'login.html' ? 'Welcome back, creators!' : 'Claim your unique link today.'}</p>
              
              <div class="space-y-4">
                 <button onclick="supabase.auth.signInWithOAuth({provider: 'google'})" class="w-full py-3.5 px-4 rounded-xl font-bold bg-[#F5F7FA] text-secondary hover:bg-[#EAEFF4] transition-colors flex items-center justify-center gap-3">
                   <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-5 h-5" alt="Google"> Continue with Google
                 </button>
                 <div class="relative flex items-center py-4">
                   <div class="flex-grow border-t border-gray-100"></div>
                   <span class="flex-shrink-0 mx-4 text-gray-400 text-sm font-medium">OR WITH EMAIL</span>
                   <div class="flex-grow border-t border-gray-100"></div>
                 </div>
                 
                 <form class="space-y-5" id="authForm">
                   ${page.path === 'signup.html' ? `
                   <div><label class="block text-sm font-bold text-secondary mb-1">Username</label><div class="flex shadow-sm rounded-xl focus-within:ring-2 focus-within:ring-primary overflow-hidden border border-gray-200"><span class="inline-flex items-center px-4 bg-gray-50 text-gray-500 font-medium">monkey.link/</span><input type="text" id="username" class="flex-1 block w-full py-3.5 px-4 outline-none font-medium text-secondary" placeholder="username"></div></div>
                   ` : ''}
                   <div>
                     <label class="block text-sm font-bold text-secondary mb-1">Email</label>
                     <input type="email" id="email" class="w-full border border-gray-200 bg-gray-50 rounded-xl py-3.5 px-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none font-medium transition-all shadow-sm" placeholder="you@example.com" required>
                   </div>
                   ${page.path === 'login.html' ? '<div>' : '<div class="pb-2">'}
                     <label class="block text-sm font-bold text-secondary mb-1">Password</label>
                     <input type="password" id="password" class="w-full border border-gray-200 bg-gray-50 rounded-xl py-3.5 px-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none font-medium transition-all shadow-sm" placeholder="••••••••" required>
                   </div>
                   <button type="submit" id="submitBtn" class="w-full py-4 px-4 bg-secondary text-white font-bold rounded-xl hover:bg-gray-800 transition-all transform hover:scale-[1.02] shadow-xl mt-2">
                     ${page.path === 'login.html' ? 'Log in' : 'Create account'}
                   </button>
                 </form>
              </div>
              <p class="mt-8 text-center text-sm font-medium text-gray-500">
                ${page.path === 'login.html' ?
        `Don't have an account? <a href="signup.html" class="text-secondary font-bold hover:underline">Sign up</a>` :
        `Already have an account? <a href="login.html" class="text-secondary font-bold hover:underline">Log in</a>`}
              </p>
            </div>
         </div>

         <script>
            document.getElementById('authForm').addEventListener('submit', async (e) => {
              e.preventDefault();
              const submitBtn = document.getElementById('submitBtn');
              submitBtn.disabled = true;
              submitBtn.innerHTML = 'Processing...';

              const email = document.getElementById('email').value;
              const password = document.getElementById('password').value;
              const username = document.getElementById('username')?.value;
              
              const isLogin = '${page.path}' === 'login.html';

              try {
                if (isLogin) {
                  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
                  if (error) throw error;
                  window.location.href = 'dashboard.html';
                } else {
                  // Registration
                  const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
                  if (authError) throw authError;

                  if (authData.user && username) {
                    const { error: profileError } = await supabase
                      .from('monkey_bio')
                      .insert([{ id: authData.user.id, username: username.toLowerCase(), display_name: username }]);
                    if (profileError) throw profileError;
                  }
                  alert('Registered successfully! Check your email if verification is required.');
                  window.location.href = 'login.html';
                }
              } catch (err) {
                alert(err.message || 'An error occurred');
              } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = isLogin ? 'Log in' : 'Create account';
              }
            });
         </script>

         <!-- Spline-style side background -->
         <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#F5F7FA] items-center justify-center">
            <div id="spline-bg" class="absolute inset-0 z-0 transition-transform duration-200">
                <div class="spline-orb" style="width: 500px; height: 500px; background: #43E660; top: 10%; right: 10%; opacity: 0.4;"></div>
                <div class="spline-orb" style="width: 600px; height: 600px; background: #60a5fa; bottom: -5%; left: 0; opacity: 0.3; animation-delay: -3s;"></div>
            </div>
            <!-- Glass Mockup overlapping -->
            <div class="relative z-10 bg-white/40 backdrop-blur-2xl border border-white p-8 rounded-[40px] shadow-2xl max-w-sm animate-fade-in opacity-0" style="animation-delay: 0.4s;">
               <div class="flex items-center gap-4 mb-8">
                  <div class="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg"><i data-lucide="zap" class="w-8 h-8 text-secondary"></i></div>
                  <div>
                    <h3 class="font-bold text-2xl text-secondary">One Link.</h3>
                    <p class="font-medium text-gray-600">Infinite Possibilities.</p>
                  </div>
               </div>
               <div class="space-y-4">
                  <div class="h-16 w-full bg-white/80 rounded-2xl shadow-sm"></div>
                  <div class="h-16 w-full bg-white/80 rounded-2xl shadow-sm"></div>
                  <div class="h-16 w-full bg-white/80 rounded-2xl shadow-sm"></div>
               </div>
            </div>
         </div>
      </div>
    `;
  } else if (isDashboard) {
    body += `
      <!-- Dashboard Layout -->
      <div class="min-h-screen flex bg-[#F5F7FA]">
        <!-- Sidebar -->
        <aside class="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col flex-shrink-0 h-screen sticky top-0 shadow-sm z-20">
           <div class="h-20 flex items-center px-6 border-b border-gray-100 mb-4">
              <a href="${root}index.html" class="flex items-center gap-2">
                <span class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-secondary font-bold text-xl">M</span>
                <span class="font-bold text-2xl tracking-tight text-secondary">Monkey</span>
              </a>
           </div>
           <nav class="px-4 flex-1 overflow-y-auto space-y-1 pb-4">
             <a href="${root}dashboard.html" class="flex items-center gap-3 px-4 py-3 ${page.path === 'dashboard.html' ? 'bg-gray-100 text-secondary font-bold' : 'text-gray-500 font-medium hover:bg-gray-50 hover:text-secondary'} rounded-xl transition-all"><i data-lucide="layout-dashboard" class="w-5 h-5"></i> Overview</a>
             <a href="${root}dashboard/links.html" class="flex items-center gap-3 px-4 py-3 ${page.path.includes('links.html') ? 'bg-gray-100 text-secondary font-bold' : 'text-gray-500 font-medium hover:bg-gray-50 hover:text-secondary'} rounded-xl transition-all"><i data-lucide="list" class="w-5 h-5"></i> Links</a>
             <a href="${root}dashboard/appearance.html" class="flex items-center gap-3 px-4 py-3 ${page.path.includes('appearance') ? 'bg-gray-100 text-secondary font-bold' : 'text-gray-500 font-medium hover:bg-gray-50 hover:text-secondary'} rounded-xl transition-all"><i data-lucide="palette" class="w-5 h-5"></i> Appearance</a>
             <a href="${root}dashboard/analytics.html" class="flex items-center gap-3 px-4 py-3 ${page.path.includes('analytics') ? 'bg-gray-100 text-secondary font-bold' : 'text-gray-500 font-medium hover:bg-gray-50 hover:text-secondary'} rounded-xl transition-all"><i data-lucide="bar-chart-2" class="w-5 h-5"></i> Analytics</a>
             <a href="${root}dashboard/monetization.html" class="flex items-center gap-3 px-4 py-3 ${page.path.includes('monetization') ? 'bg-gray-100 text-secondary font-bold' : 'text-gray-500 font-medium hover:bg-gray-50 hover:text-secondary'} rounded-xl transition-all"><i data-lucide="dollar-sign" class="w-5 h-5"></i> Monetization</a>
             <a href="${root}dashboard/integrations.html" class="flex items-center gap-3 px-4 py-3 ${page.path.includes('integrations') ? 'bg-gray-100 text-secondary font-bold' : 'text-gray-500 font-medium hover:bg-gray-50 hover:text-secondary'} rounded-xl transition-all"><i data-lucide="blocks" class="w-5 h-5"></i> Integrations</a>
             <div class="my-6 border-t border-gray-100"></div>
             <a href="${root}dashboard/settings.html" class="flex items-center gap-3 px-4 py-3 text-gray-500 font-medium hover:bg-gray-50 hover:text-secondary rounded-xl transition-all"><i data-lucide="settings" class="w-5 h-5"></i> Settings</a>
             <a href="${root}dashboard/billing.html" class="flex items-center gap-3 px-4 py-3 text-gray-500 font-medium hover:bg-gray-50 hover:text-secondary rounded-xl transition-all"><i data-lucide="credit-card" class="w-5 h-5"></i> Billing</a>
             <a href="${root}index.html" class="flex items-center gap-3 px-4 py-3 text-red-500 font-medium hover:bg-red-50 hover:text-red-600 rounded-xl transition-all mt-6"><i data-lucide="log-out" class="w-5 h-5"></i> Logout</a>
           </nav>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 flex flex-col h-screen overflow-hidden relative">
           <!-- Topbar -->
           <header class="h-20 bg-white/80 backdrop-blur border-b border-gray-100 flex items-center justify-between px-8 flex-shrink-0 z-10 absolute top-0 w-full shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
             <h2 class="text-xl font-bold tracking-tight text-secondary">${page.title}</h2>
             <div class="flex items-center gap-4">
                <a href="${root}profile-demo.html" target="_blank" class="text-sm font-bold flex items-center gap-2 bg-[#F5F7FA] px-4 py-2 rounded-full hover:bg-gray-200 transition-colors text-secondary">
                  <i data-lucide="external-link" class="w-4 h-4 text-gray-400"></i> monkey.link/alex 
                </a>
                <div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden border-2 border-primary cursor-pointer hover:shadow-lg transition-shadow">
                   <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Profile" class="w-full h-full object-cover">
                </div>
             </div>
           </header>
           
           <div class="flex-1 overflow-y-auto p-8 pt-28 relative">
              <!-- Animated ambient block for empty state/onboarding vibe in dashboard -->
              <div class="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                  <div class="spline-orb" style="width: 600px; height: 600px; background: #6cf383; top: -20%; left: 30%; opacity: 0.15;"></div>
                  <div class="spline-orb" style="width: 400px; height: 400px; background: #60a5fa; bottom: -10%; left: -10%; opacity: 0.1;"></div>
              </div>

              <div class="max-w-4xl mx-auto relative z-10 w-full animate-fade-in opacity-0" style="animation-delay: 0.1s;">
                 ${page.path === 'dashboard.html' ? `
                   <!-- Dashboard Overview Content -->
                   <div class="bg-primary/10 border border-primary/20 rounded-3xl p-8 mb-8 flex items-center justify-between shadow-sm">
                      <div>
                        <h3 class="text-2xl font-bold text-secondary mb-2">Welcome back to Monkey! 🐵</h3>
                        <p class="text-gray-600 font-medium">Your link is optimized and performing well. Check your latest insights below.</p>
                      </div>
                      <button class="bg-primary text-secondary font-bold px-6 py-3 rounded-full hover:bg-primary-dark transition-all transform hover:scale-105 shadow-md">Add new link</button>
                   </div>
                 
                   <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                     <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                        <div class="flex justify-between items-start mb-4">
                           <p class="text-gray-400 font-bold text-xs uppercase tracking-widest">Page Views</p>
                           <span class="text-primary font-bold text-xs">+12%</span>
                        </div>
                        <h3 class="text-3xl font-black">24.5k</h3>
                     </div>
                     <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                        <div class="flex justify-between items-start mb-4">
                           <p class="text-gray-400 font-bold text-xs uppercase tracking-widest">Link Clicks</p>
                           <span class="text-primary font-bold text-xs">+5.4%</span>
                        </div>
                        <h3 class="text-3xl font-black">18.2k</h3>
                     </div>
                     <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                        <div class="flex justify-between items-start mb-4">
                           <p class="text-gray-400 font-bold text-xs uppercase tracking-widest">Total Earned</p>
                           <span class="text-primary font-bold text-xs">Ready</span>
                        </div>
                        <h3 class="text-3xl font-black">$1,420</h3>
                     </div>
                   </div>
                   
                   <div class="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm min-h-[300px]">
                      <div class="flex justify-between items-center mb-8">
                         <h4 class="font-bold text-lg">Top Performing Links</h4>
                         <a href="dashboard/links.html" class="text-sm font-bold text-primary hover:underline">View all</a>
                      </div>
                      <div class="space-y-4">
                         <div class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                            <div class="flex items-center gap-4">
                               <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-red-500 shadow-sm"><i data-lucide="youtube" class="w-5 h-5"></i></div>
                               <p class="font-bold">Latest Video</p>
                            </div>
                            <p class="font-medium text-gray-500">4,203 clicks</p>
                         </div>
                         <div class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                            <div class="flex items-center gap-4">
                               <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-500 shadow-sm"><i data-lucide="twitter" class="w-5 h-5"></i></div>
                               <p class="font-bold">Twitter Profile</p>
                            </div>
                            <p class="font-medium text-gray-500">2,150 clicks</p>
                         </div>
                      </div>
                   </div>
                 ` : `
                   <div class="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                      <div class="flex items-center gap-4 mb-8">
                         <div class="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shadow-sm"><i data-lucide="${page.path.includes('links') ? 'list' : page.path.includes('analytics') ? 'bar-chart-2' : page.path.includes('appearance') ? 'palette' : 'settings'}" class="w-8 h-8"></i></div>
                         <div>
                            <h3 class="text-2xl font-bold tracking-tight">${page.title}</h3>
                            <p class="text-gray-500 font-medium">Manage your profile ${page.title.toLowerCase()} settings.</p>
                         </div>
                      </div>
                      
                      <div class="grid gap-4">
                        <div class="p-6 border border-gray-100 rounded-2xl hover:border-primary transition-all cursor-pointer bg-gray-50/50 group">
                           <div class="flex justify-between items-center">
                              <div>
                                 <h4 class="font-bold text-secondary mb-1">Add new entry</h4>
                                 <p class="text-sm font-medium text-gray-400">Configure a new element for your page.</p>
                              </div>
                              <i data-lucide="plus-circle" class="w-6 h-6 text-gray-300 group-hover:text-primary transition-colors"></i>
                           </div>
                        </div>
                        <div class="p-6 border border-gray-100 rounded-2xl bg-white shadow-sm opacity-50 cursor-not-allowed">
                           <div class="flex justify-between items-center">
                              <div>
                                 <h4 class="font-bold text-secondary mb-1">Coming Soon</h4>
                                 <p class="text-sm font-medium text-gray-400">This feature is currently under maintenance.</p>
                              </div>
                              <i data-lucide="lock" class="w-5 h-5 text-gray-300"></i>
                           </div>
                        </div>
                      </div>
                   </div>
                 `}
              </div>
           </div>
        </main>
        
        <!-- Preview Mockup Panel -->
        <aside class="w-[450px] bg-white border-l border-gray-200 hidden lg:flex flex-col items-center py-12 px-10 overflow-y-auto relative z-20 shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.1)]">
           <div class="w-full flex justify-between items-center mb-6">
             <span class="font-bold text-gray-400 text-sm">LIVE PREVIEW</span>
             <div class="flex gap-2">
               <button class="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 text-secondary"><i data-lucide="copy" class="w-4 h-4"></i></button>
               <button class="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 text-secondary"><i data-lucide="share" class="w-4 h-4"></i></button>
             </div>
           </div>
           
           <div class="w-full max-w-[340px] rounded-[52px] border-[12px] border-[#020617] shadow-xl h-[700px] overflow-hidden relative bg-black transform transition-transform hover:scale-[1.02] duration-300">
              <div class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#020617] rounded-b-[20px] z-50"></div>
              <iframe src="${root}profile-demo.html" class="w-full h-full border-0 absolute inset-0 rounded-[40px] z-10 pointer-events-none"></iframe>
           </div>
        </aside>
      </div>
    `;
  } else {
    // Normal Public Page template
    const isHome = page.path === 'index.html';

    body += headerDesktop(depth);
    body += `<main class="flex-1 mt-20">`;

    if (isHome) {
      const data = PAGE_DATA['index.html'];
      body += `
        <!-- HERO SECTION -->
        <section class="relative pt-24 pb-32 overflow-hidden px-4 sm:px-6 lg:px-8 bg-white" id="spline-bg-container">
           <div id="spline-bg" class="absolute inset-0 z-0 opacity-60 transition-transform duration-100 ease-linear pointer-events-none">
              <div class="spline-orb" style="width: 800px; height: 800px; background: linear-gradient(135deg, #43E660, #d9f99d); top: -20%; left: -10%;"></div>
              <div class="spline-orb" style="width: 600px; height: 600px; background: #60a5fa; bottom: -10%; right: -5%; animation-delay: -5s; opacity: 0.2;"></div>
           </div>
           
           <div class="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-16">
              <div class="lg:w-[55%] text-center lg:text-left">
                  <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-gray-100 shadow-sm mb-8 text-sm font-bold text-secondary animate-fade-in opacity-0" style="animation-delay: 0.1s;">
                    <span class="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(67,230,96,1)]"></span> ${data.trustLine}
                  </div>
                  <h1 class="text-[3.5rem] md:text-[5rem] lg:text-[5.5rem] font-black tracking-tight mb-8 leading-[1.05] animate-fade-in opacity-0 text-secondary" style="animation-delay: 0.2s;">
                    ${data.heroHeading}
                  </h1>
                  <p class="text-xl md:text-2xl text-gray-500 font-medium mb-12 max-w-xl mx-auto lg:mx-0 animate-fade-in opacity-0 leading-relaxed" style="animation-delay: 0.3s;">
                    ${data.heroSubheadline}
                  </p>
                  
                  <form class="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto lg:mx-0 mb-8 animate-fade-in opacity-0" style="animation-delay: 0.4s;">
                     <div class="flex flex-1 relative bg-white rounded-[20px] shadow-sm border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
                       <span class="flex items-center pl-6 pr-2 text-gray-400 font-bold text-lg">monkey.link/</span>
                       <input type="text" placeholder="yourname" class="w-full py-5 pr-6 outline-none font-bold text-lg text-secondary">
                     </div>
                     <a href="signup.html" class="bg-secondary text-white font-bold text-lg px-8 py-5 rounded-[20px] hover:bg-gray-800 transition-all shadow-[0_8px_25px_rgba(15,23,42,0.2)] hover:shadow-[0_12px_30px_rgba(15,23,42,0.3)] flex-shrink-0 flex items-center justify-center transform hover:scale-[1.02]">
                        ${data.primaryCTA}
                     </a>
                  </form>
                  
                  <div class="flex items-center justify-center lg:justify-start gap-3 text-sm text-gray-400 font-bold animate-fade-in opacity-0" style="animation-delay: 0.5s;">
                     <p>Free forever</p> <span class="bg-gray-300 w-1 h-1 rounded-full"></span> <p>No credit card required</p>
                  </div>
              </div>
              
              <div class="lg:w-[45%] relative flex justify-center lg:justify-end animate-fade-in opacity-0" style="animation-delay: 0.6s;">
                 <div class="absolute -left-12 top-20 bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-2xl border border-white z-20 flex items-center gap-4 animate-bounce-slow">
                    <div class="bg-green-100 p-3 rounded-2xl text-green-600"><i data-lucide="trending-up" class="w-6 h-6"></i></div>
                    <div><p class="text-[11px] text-gray-400 font-black uppercase tracking-widest">Revenue</p><p class="text-xl font-black text-secondary">$3,420</p></div>
                 </div>
                 <div class="relative w-[340px] h-[680px] bg-black rounded-[52px] border-[14px] border-[#020617] shadow-2xl overflow-hidden z-10 transform -rotate-2 hover:rotate-0 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(67,230,96,0.2)]">
                    <iframe src="profile-demo.html" class="w-full h-full border-0 pointer-events-none"></iframe>
                 </div>
                 <div class="absolute -right-8 bottom-32 bg-white/90 backdrop-blur-md py-4 px-6 rounded-3xl shadow-2xl border border-white z-20 flex items-center gap-4 animate-bounce-slow" style="animation-delay: 2s;">
                    <div class="bg-blue-100 p-2.5 rounded-full text-blue-600"><i data-lucide="music" class="w-5 h-5"></i></div>
                    <p class="text-sm font-bold text-secondary">Spotify Linked!</p>
                 </div>
              </div>
           </div>
        </section>

        <!-- CORE FEATURES GRID -->
        <section class="py-32 bg-white" id="features">
           <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="text-center mb-24">
                 <h2 class="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-secondary">Everything you need.</h2>
                 <p class="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto font-medium">Create your page, share your content, and monetize your audience — all in one place.</p>
              </div>
              
              <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                 ${data.features.map((f, i) => `
                   <div class="bg-[#F5F7FA] p-10 rounded-[40px] border border-gray-100 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
                      <div class="w-16 h-16 bg-white text-secondary rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:bg-primary transition-all"><i data-lucide="${i === 0 ? 'layout' : i === 1 ? 'bar-chart-2' : 'dollar-sign'}" class="w-7 h-7"></i></div>
                      <h3 class="text-3xl font-bold mb-4 tracking-tight text-secondary">${f.title}</h3>
                      <p class="text-lg text-gray-500 font-medium">${f.description}</p>
                   </div>
                 `).join('')}
              </div>
           </div>
        </section>

        <!-- FAQ SECTION -->
        <section class="py-32 bg-gray-50">
           <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
              <h2 class="text-4xl font-black mb-4">Frequently Asked Questions</h2>
              <p class="text-xl text-gray-500">Everything you need to know about Monkey.</p>
           </div>
           <div class="max-w-3xl mx-auto px-4 space-y-4">
              ${data.faqs.map(f => `
                <div class="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                   <h4 class="font-bold text-xl mb-3">${f.q}</h4>
                   <p class="text-gray-500 font-medium">${f.a}</p>
                </div>
              `).join('')}
           </div>
        </section>

        <!-- CTA BAND -->
        <section class="py-32 relative overflow-hidden bg-secondary text-white text-center rounded-[60px] max-w-[1400px] mx-auto mb-16 shadow-2xl">
            <div class="absolute inset-0 z-0">
                <div class="spline-orb" style="width: 800px; height: 800px; background: #6cf383; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.15; animation-duration: 20s;"></div>
            </div>
            <div class="max-w-4xl mx-auto px-4 relative z-10">
               <h2 class="text-5xl md:text-7xl font-black mb-8 tracking-tight">Ready to grow?</h2>
               <p class="text-xl text-white/70 font-medium mb-12">Join millions of creators managing their digital presence.</p>
               <a href="signup.html" class="inline-flex items-center justify-center bg-primary text-secondary font-bold text-xl px-12 py-5 rounded-full hover:bg-[#2ecf4a] transition-all transform hover:scale-105 shadow-[0_10px_30px_rgba(67,230,96,0.3)]">
                  Start building today
               </a>
            </div>
        </section>
      `;
    } else if (page.path === 'pricing.html') {
      const data = PAGE_DATA['pricing.html'];
      body += `
        <section class="pt-32 pb-24 px-4 bg-white text-center">
           <div class="max-w-4xl mx-auto">
              <h1 class="text-5xl md:text-6xl font-black mb-6 tracking-tight">${data.heroHeading}</h1>
              <p class="text-xl text-gray-500 mb-16">${data.heroDescription}</p>
              
              <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                 ${data.plans.map(p => `
                   <div class="bg-gray-50 p-8 rounded-[40px] border border-gray-100 flex flex-col hover:border-primary transition-all group">
                      <h3 class="text-xl font-bold mb-2">${p.name}</h3>
                      <div class="flex items-baseline gap-1 mb-4">
                         <span class="text-4xl font-black">${p.price}</span>
                         <span class="text-gray-400 font-medium">/mo</span>
                      </div>
                      <p class="text-sm text-gray-500 mb-8 font-medium">${p.desc}</p>
                      <ul class="space-y-4 mb-auto text-sm font-medium text-secondary">
                        ${p.features.map(f => `<li class="flex items-center gap-2"><i data-lucide="check" class="w-4 h-4 text-primary"></i> ${f}</li>`).join('')}
                      </ul>
                      <button class="w-full mt-10 py-4 rounded-full bg-white border border-gray-200 font-bold hover:bg-secondary hover:text-white hover:border-secondary transition-all">Get Started</button>
                   </div>
                 `).join('')}
              </div>
           </div>
        </section>
      `;
    } else {
      const data = PAGE_DATA[page.path] || { 
        hero: `Explore ${page.title}`, 
        description: `This is the ${page.title} page for Monkey Linktree.` 
      };
      
      body += `
        <section class="pt-32 pb-24 px-4 bg-white min-h-[70vh] flex flex-col justify-center text-center">
           <div class="animate-fade-in opacity-0" style="animation-delay: 0.1s;">
              <div class="w-24 h-24 bg-[#F5F7FA] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm border border-gray-100">
                 <i data-lucide="layout" class="w-12 h-12 text-secondary"></i>
              </div>
              <h1 class="text-6xl font-black mb-6 text-secondary tracking-tight">${data.hero || page.title}</h1>
              <p class="text-2xl text-gray-500 max-w-2xl mx-auto mb-10 font-medium">${data.description || data.benefit || 'Premium content coming soon.'}</p>
              <div class="flex flex-wrap justify-center gap-4">
                <a href="${root}signup.html" class="inline-flex py-4 px-8 rounded-full bg-primary text-secondary font-bold hover:scale-105 transition-all shadow-xl">Start for Free</a>
                <a href="${root}index.html" class="inline-flex py-4 px-8 rounded-full bg-secondary text-white font-bold hover:bg-gray-800 transition-all shadow-xl">Return Home</a>
              </div>
           </div>
        </section>
      `;
    }

    body += `</main>`;
    body += footerTemplate(depth);
  }

  body += getSplineBackgroundScript();
  body += `
    <script>
       // Initialize Lucide Icons
       lucide.createIcons();
    </script>
</body>
</html>
  `;

  return head + body;
}

// Build script execution
const buildSite = () => {
  pages.forEach(page => {
    const fullPath = path.join(__dirname, page.path);
    const dir = path.dirname(fullPath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(fullPath, generatePageHTML(page));
    console.log(`Generated ${page.path}`);
  });
  console.log('Site build complete! Open index.html to preview.');
};

buildSite();
