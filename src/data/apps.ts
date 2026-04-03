'use client'

export interface AppConfig {
  id: string
  title: string
  description: string
  icon: string
  color: string
  category: string
  placeholder: string
  type?: 'link' | 'file' | 'text' | 'form' | 'media' | 'audio'
  prefix?: string
  pattern?: RegExp
  domain?: string
}

export const CATEGORIES = [
  { id: 'commerce', name: 'Commerce', icon: 'fi-rr-shopping-cart' },
  { id: 'social', name: 'Social', icon: 'fi-rr-share' },
  { id: 'media', name: 'Media', icon: 'fi-rr-play-alt' },
  { id: 'audio', name: 'Audio', icon: 'fi-rr-music' },
  { id: 'contact', name: 'Contact', icon: 'fi-rr-envelope' },
  { id: 'communities', name: 'Communities', icon: 'fi-rr-users' },
  { id: 'promotions', name: 'Promotions', icon: 'fi-rr-megaphone' },
  { id: 'fundraising', name: 'Fundraising', icon: 'fi-rr-heart' },
  { id: 'text', name: 'Text', icon: 'fi-rr-text' },
  { id: 'other', name: 'Other', icon: 'fi-rr-apps' },
]

export const APPS: AppConfig[] = [
  // COMMERCE
  { id: 'coaching', title: 'Coaching & bookings', description: 'Sell 1:1 sessions, consultations, and private coaching', icon: 'fi-rr-calendar-star', color: 'text-purple-500', category: 'commerce', placeholder: 'Booking link', type: 'link' },
  { id: 'digital-products', title: 'Digital products', description: 'Sell documents, PDFs, guides, templates, and other content', icon: 'fi-rr-file-download', color: 'text-blue-500', category: 'commerce', placeholder: 'Product link', type: 'link' },
  { id: 'courses', title: 'Courses', description: 'Sell online courses and lessons to your audience', icon: 'fi-rr-graduation-cap', color: 'text-orange-500', category: 'commerce', placeholder: 'Course link', type: 'link' },
  { id: 'shopify', title: 'Shopify', description: 'Display the best of your Shopify store on your Linktree', icon: 'fi-brands-shopify', color: 'text-[#96BF48]', category: 'commerce', placeholder: 'Shopify URL', type: 'link' },
  { id: 'fourthwall', title: 'Fourthwall', description: 'Launch beautiful merch and stores in minutes', icon: 'fi-rr-shop', color: 'text-black', category: 'commerce', placeholder: 'Fourthwall link', type: 'link' },
  { id: 'bonfire', title: 'Bonfire', description: 'Design and sell premium custom products', icon: 'fi-rr-fire', color: 'text-orange-600', category: 'commerce', placeholder: 'Bonfire link', type: 'link' },

  // COMMUNITIES
  { id: 'community-channels', title: 'Community Channels', description: 'Offer access to WhatsApp, Discord or Slack communities', icon: 'fi-rr-users-alt', color: 'text-blue-500', category: 'communities', placeholder: 'Community link', type: 'link' },
  { id: 'discord', title: 'Discord servers', description: 'Add members to your Discord server', icon: 'fi-brands-discord', color: 'text-[#5865F2]', category: 'communities', placeholder: 'Invite link', type: 'link' },
  { id: 'whatsapp', title: 'WhatsApp groups', description: 'Add members to your WhatsApp group', icon: 'fi-brands-whatsapp', color: 'text-[#25D366]', category: 'communities', placeholder: 'Group link', type: 'link' },
  { id: 'slack', title: 'Slack workspaces', description: 'Add members to your Slack workspace', icon: 'fi-brands-slack', color: 'text-[#4A154B]', category: 'communities', placeholder: 'Workspace invite', type: 'link' },

  // PROMOTIONS
  { id: 'discount', title: 'Discount Code', description: 'Display a discount code for your visitors', icon: 'fi-rr-ticket', color: 'text-rose-500', category: 'promotions', placeholder: 'CODE20', type: 'text' },
  { id: 'gleam', title: 'Gleam', description: 'Grow your audience with giveaways and contests', icon: 'fi-rr-trophy', color: 'text-blue-400', category: 'promotions', placeholder: 'Gleam link', type: 'link' },

  // FUNDRAISING
  { id: 'gofundme', title: 'GoFundMe', description: 'Support and promote the causes you care about', icon: 'fi-rr-hand-holding-heart', color: 'text-[#00B964]', category: 'fundraising', placeholder: 'GoFundMe link', type: 'link' },

  // SOCIAL
  { id: 'instagram', title: 'Instagram', description: 'Display your posts and reels', icon: 'fi-brands-instagram', color: 'text-[#E4405F]', category: 'social', placeholder: '@username', prefix: 'https://instagram.com/', domain: 'instagram.com', type: 'link' },
  { id: 'tiktok', title: 'TikTok', description: 'Share your latest TikTok videos', icon: 'fi-brands-tiktok', color: 'text-[#000000]', category: 'social', placeholder: '@username', prefix: 'https://tiktok.com/@', domain: 'tiktok.com', type: 'link' },
  { id: 'youtube', title: 'YouTube', description: 'Show your visitors any YouTube video', icon: 'fi-brands-youtube', color: 'text-[#FF0000]', category: 'social', placeholder: 'Video link', domain: 'youtube.com', type: 'link' },
  { id: 'threads', title: 'Threads', description: 'Select your favorite Threads posts to display', icon: 'fi-brands-threads', color: 'text-[#000000]', category: 'social', placeholder: '@username', prefix: 'https://threads.net/@', domain: 'threads.net', type: 'link' },
  { id: 'x', title: 'X', description: 'Showcase what\'s new on your feed', icon: 'fi-brands-twitter', color: 'text-[#000000]', category: 'social', placeholder: '@username', prefix: 'https://x.com/', domain: 'x.com', type: 'link' },
  { id: 'facebook', title: 'Facebook', description: 'Show your visitors any Facebook video', icon: 'fi-brands-facebook', color: 'text-[#1877F2]', category: 'social', placeholder: 'Profile or Video link', domain: 'facebook.com', type: 'link' },
  { id: 'snapchat', title: 'Snapchat', description: 'Drive audiences to your Public Stories', icon: 'fi-brands-snapchat', color: 'text-[#FFFC00]', category: 'social', placeholder: 'Username', prefix: 'https://snapchat.com/add/', domain: 'snapchat.com', type: 'link' },
  { id: 'pinterest', title: 'Pinterest', description: 'Share boards and individual Pins', icon: 'fi-brands-pinterest', color: 'text-[#BD081C]', category: 'social', placeholder: 'Pinterest link', prefix: 'https://pinterest.com/', domain: 'pinterest.com', type: 'link' },

  // MEDIA
  { id: 'video', title: 'Video', description: 'Show videos from YouTube, TikTok, or Vimeo', icon: 'fi-rr-play', color: 'text-red-500', category: 'media', placeholder: 'Video link', type: 'media' },
  { id: 'pdf', title: 'PDF display', description: 'Display downloadable PDF files and CVs', icon: 'fi-rr-file-pdf', color: 'text-red-500', category: 'media', placeholder: 'PDF link', type: 'file' },

  // AUDIO
  { id: 'music', title: 'Music', description: 'Share music from Spotify, SoundCloud, or Audiomack', icon: 'fi-rr-music', color: 'text-green-500', category: 'audio', placeholder: 'Music link', type: 'audio' },
  { id: 'podcasts', title: 'Podcasts', description: 'Get more listeners and subscribers', icon: 'fi-rr-microphone', color: 'text-purple-600', category: 'audio', placeholder: 'Podcast link', type: 'audio' },

  // CONTACT
  { id: 'contact-form', title: 'Contact Form', description: 'Collect contact details and messages', icon: 'fi-rr-envelope-plus', color: 'text-emerald-500', category: 'contact', placeholder: 'Form Title', type: 'form' },
  { id: 'email-signup', title: 'Email signup', description: 'Collect emails for your audience list', icon: 'fi-rr-user-add', color: 'text-teal-500', category: 'contact', placeholder: 'Signup link', type: 'form' },
  { id: 'calendly', title: 'Calendly', description: 'Book services or schedule time with you', icon: 'fi-rr-calendar', color: 'text-blue-600', category: 'contact', placeholder: 'Calendly link', type: 'link' },

  // TEXT
  { id: 'text', title: 'Text', description: 'Display custom text on your Linktree', icon: 'fi-rr-text', color: 'text-gray-700', category: 'text', placeholder: 'Enter text content', type: 'text' },
  { id: 'header', title: 'Header', description: 'Organize your links with headers', icon: 'fi-rr-text-size', color: 'text-slate-600', category: 'text', placeholder: 'Header text', type: 'text' },
]

export const SUGGESTED_APPS = APPS.filter(a => ['instagram', 'tiktok', 'youtube', 'shopify', 'contact-form'].includes(a.id))
