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
  { id: 'commerce', name: 'Commerce', icon: 'fi-rr-shopping-cart', color: 'text-emerald-500', bg: 'bg-emerald-500' },
  { id: 'social', name: 'Social', icon: 'fi-rr-share', color: 'text-blue-500', bg: 'bg-blue-500' },
  { id: 'media', name: 'Media', icon: 'fi-rr-play-alt', color: 'text-red-500', bg: 'bg-red-500' },
  { id: 'audio', name: 'Audio', icon: 'fi-rr-music', color: 'text-purple-500', bg: 'bg-purple-500' },
  { id: 'contact', name: 'Contact', icon: 'fi-rr-envelope', color: 'text-teal-500', bg: 'bg-teal-500' },
  { id: 'communities', name: 'Communities', icon: 'fi-rr-users', color: 'text-indigo-500', bg: 'bg-indigo-500' },
  { id: 'promotions', name: 'Promotions', icon: 'fi-rr-megaphone', color: 'text-rose-500', bg: 'bg-rose-500' },
  { id: 'fundraising', name: 'Fundraising', icon: 'fi-rr-heart', color: 'text-pink-500', bg: 'bg-pink-500' },
  { id: 'details', name: 'Details', icon: 'fi-rr-info', color: 'text-amber-500', bg: 'bg-amber-500' },
  { id: 'text', name: 'Text', icon: 'fi-rr-text', color: 'text-slate-500', bg: 'bg-slate-500' },
  { id: 'events', name: 'Events', icon: 'fi-rr-calendar-clock', color: 'text-orange-500', bg: 'bg-orange-500' }
]

export const APPS: AppConfig[] = [
  // COMMERCE
  { id: 'coaching', title: 'Coaching & bookings', description: 'Sell 1:1 sessions, consultations, and private coaching', icon: 'fi-rr-calendar-star', color: 'text-purple-500', category: 'commerce', placeholder: 'Booking link', type: 'link' },
  { id: 'digital-products', title: 'Digital products', description: 'Sell documents, PDFs, guides, templates, and other content', icon: 'fi-rr-file-download', color: 'text-blue-500', category: 'commerce', placeholder: 'Product link', type: 'link' },
  { id: 'courses', title: 'Courses', description: 'Sell online courses and lessons to your audience', icon: 'fi-rr-graduation-cap', color: 'text-orange-500', category: 'commerce', placeholder: 'Course link', type: 'link' },
  { id: 'shopify', title: 'Shopify', description: 'Display the best of your Shopify store on your bio', icon: 'fi-brands-shopify', color: 'text-[#96BF48]', category: 'commerce', placeholder: 'Shopify URL', type: 'link' },
  { id: 'fourthwall', title: 'Fourthwall', description: 'Launch beautiful merch and stores in minutes', icon: 'fi-rr-shop', color: 'text-black', category: 'commerce', placeholder: 'Fourthwall link', type: 'link' },
  { id: 'amaze', title: 'Amaze', description: 'Create a store and monetize with no cost', icon: 'fi-rr-store', color: 'text-blue-600', category: 'commerce', placeholder: 'Amaze link', type: 'link' },
  { id: 'bonfire', title: 'Bonfire', description: 'Design and sell premium custom products', icon: 'fi-rr-fire', color: 'text-orange-600', category: 'commerce', placeholder: 'Bonfire link', type: 'link' },
  { id: 'books', title: 'Books', description: 'Sell more books by promoting them from major sellers', icon: 'fi-rr-book', color: 'text-amber-700', category: 'commerce', placeholder: 'Book link', type: 'link' },
  { id: 'affiliate', title: 'Affiliate Products', description: 'Share products you love and earn commission', icon: 'fi-rr-tags', color: 'text-rose-400', category: 'commerce', placeholder: 'Affiliate URL', type: 'link' },

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
  { id: 'threads', title: 'Threads', description: 'Select your favorite Threads posts', icon: 'fi-brands-threads', color: 'text-[#000000]', category: 'social', placeholder: '@username', prefix: 'https://threads.net/@', domain: 'threads.net', type: 'link' },
  { id: 'x', title: 'X', description: 'Showcase what\'s new on your feed', icon: 'fi-brands-twitter', color: 'text-[#000000]', category: 'social', placeholder: '@username', prefix: 'https://x.com/', domain: 'x.com', type: 'link' },
  { id: 'facebook', title: 'Facebook', description: 'Show your visitors any Facebook video', icon: 'fi-brands-facebook', color: 'text-[#1877F2]', category: 'social', placeholder: 'Profile or Video link', domain: 'facebook.com', type: 'link' },
  { id: 'snapchat', title: 'Snapchat', description: 'Drive audiences to your Public Stories', icon: 'fi-brands-snapchat', color: 'text-[#FFFC00]', category: 'social', placeholder: 'Username', prefix: 'https://snapchat.com/add/', domain: 'snapchat.com', type: 'link' },
  { id: 'pinterest', title: 'Pinterest', description: 'Share boards and individual Pins', icon: 'fi-brands-pinterest', color: 'text-[#BD081C]', category: 'social', placeholder: 'Pinterest link', prefix: 'https://pinterest.com/', domain: 'pinterest.com', type: 'link' },
  { id: 'twitch', title: 'Twitch', description: 'Show your live Twitch stream', icon: 'fi-brands-twitch', color: 'text-[#9146FF]', category: 'social', placeholder: 'Twitch URL', type: 'link' },
  { id: 'reddit', title: 'Reddit', description: 'Display your Reddit profile', icon: 'fi-brands-reddit', color: 'text-[#FF4500]', category: 'social', placeholder: 'u/username', prefix: 'https://reddit.com/u/', type: 'link' },
  { id: 'rss', title: 'RSS Feed', description: 'Share blog updates automatically', icon: 'fi-rr-rss', color: 'text-[#FFA500]', category: 'social', placeholder: 'RSS URL', type: 'link' },
  { id: 'cameo', title: 'Cameo', description: 'Personalized videos from your favorite stars', icon: 'fi-rr-star', color: 'text-[#FF0000]', category: 'social', placeholder: 'Cameo URL', type: 'link' },
  { id: 'clubhouse', title: 'Clubhouse', description: 'Drop-in audio conversations', icon: 'fi-rr-microphone', color: 'text-amber-600', category: 'social', placeholder: 'Clubhouse URL', type: 'link' },

  // MEDIA
  { id: 'video', title: 'Video', description: 'Show videos from YouTube, TikTok, or Vimeo', icon: 'fi-rr-play', color: 'text-red-500', category: 'media', placeholder: 'Video link', type: 'media' },
  { id: 'tiktok-video', title: 'TikTok Video', description: 'Embed a specific TikTok video', icon: 'fi-brands-tiktok', color: 'text-black', category: 'media', placeholder: 'Video URL', type: 'media' },
  { id: 'pdf', title: 'PDF display', description: 'Display downloadable PDF files and CVs', icon: 'fi-rr-file-pdf', color: 'text-red-500', category: 'media', placeholder: 'PDF link', type: 'file' },

  // AUDIO
  { id: 'music', title: 'Music', description: 'Share music from Spotify, SoundCloud, or Audiomack', icon: 'fi-rr-music', color: 'text-green-500', category: 'audio', placeholder: 'Music link', type: 'audio' },
  { id: 'podcasts', title: 'Podcasts', description: 'Get more listeners and subscribers', icon: 'fi-rr-microphone', color: 'text-purple-600', category: 'audio', placeholder: 'Podcast link', type: 'audio' },
  { id: 'spotify', title: 'Spotify', description: 'Share your favorite songs or playlists', icon: 'fi-brands-spotify', color: 'text-[#1DB954]', category: 'audio', placeholder: 'Spotify link', type: 'audio' },
  { id: 'apple-music', title: 'Apple Music', description: 'Share ad-free Apple Music sounds', icon: 'fi-brands-apple', color: 'text-[#FA243C]', category: 'audio', placeholder: 'Music link', type: 'audio' },
  { id: 'soundcloud', title: 'SoundCloud', description: 'Share your tracks and playlists', icon: 'fi-brands-soundcloud', color: 'text-[#FF5500]', category: 'audio', placeholder: 'SoundCloud URL', type: 'audio' },

  // CONTACT
  { id: 'contact-form', title: 'Contact Form', description: 'Collect contact details and messages', icon: 'fi-rr-envelope-plus', color: 'text-emerald-500', category: 'contact', placeholder: 'Form Title', type: 'form' },
  { id: 'email-signup', title: 'Email signup', description: 'Collect emails for your audience list', icon: 'fi-rr-user-add', color: 'text-teal-500', category: 'contact', placeholder: 'Signup link', type: 'form' },
  { id: 'sms-signup', title: 'SMS signup', description: 'Collect phone numbers for updates', icon: 'fi-rr-comment-plus', color: 'text-blue-500', category: 'contact', placeholder: 'Signup link', type: 'form' },
  { id: 'typeform', title: 'Typeform', description: 'Engage your audience with interactive forms', icon: 'fi-rr-form', color: 'text-black', category: 'contact', placeholder: 'Typeform link', type: 'link' },
  { id: 'calendly', title: 'Calendly', description: 'Book services or schedule time with you', icon: 'fi-rr-calendar', color: 'text-blue-600', category: 'contact', placeholder: 'Calendly link', type: 'link' },
  { id: 'laylo', title: 'Laylo', description: 'Build your fan list and notify them of drops', icon: 'fi-rr-bell', color: 'text-[#FF4B2B]', category: 'contact', placeholder: 'Laylo profile', type: 'link' },

  // DETAILS
  { id: 'maps', title: 'Maps', description: 'Display a business or event location', icon: 'fi-rr-map-marker', color: 'text-red-500', category: 'details', placeholder: 'Map address', type: 'link' },
  { id: 'faqs', title: 'FAQs', description: 'Provide quick answers to common questions', icon: 'fi-rr-interrogation', color: 'text-blue-400', category: 'details', placeholder: 'FAQ Title', type: 'text' },
  { id: 'chatbot', title: 'Chatbot', description: 'Engage audience with interactive AI', icon: 'fi-rr-comment-code', color: 'text-indigo-500', category: 'details', placeholder: 'Chatbot URL', type: 'link' },

  // EVENTS
  { id: 'tour', title: 'Tour Dates', description: 'Show all your upcoming tour dates', icon: 'fi-rr-plane-departure', color: 'text-indigo-600', category: 'events', placeholder: 'Tour link', type: 'link' },
  { id: 'seated', title: 'Seated', description: 'Track show dates and sell tickets', icon: 'fi-rr-chair', color: 'text-blue-500', category: 'events', placeholder: 'Seated link', type: 'link' },
  { id: 'bandsintown', title: 'Bandsintown', description: 'Update fans on world tours and shows', icon: 'fi-rr-music-alt', color: 'text-cyan-500', category: 'events', placeholder: 'Bandsintown link', type: 'link' },

  // TEXT
  { id: 'text', title: 'Text', description: 'Display custom text on your profile', icon: 'fi-rr-text', color: 'text-gray-700', category: 'text', placeholder: 'Enter text content', type: 'text' },
  { id: 'header', title: 'Header', description: 'Organize your links with headers', icon: 'fi-rr-text-size', color: 'text-slate-600', category: 'text', placeholder: 'Header text', type: 'text' },
  // CUSTOM
  { id: 'custom-link', title: 'Custom Link', description: 'Add a custom link to any external website', icon: 'fi-rr-link', color: 'text-gray-400', category: 'social', placeholder: 'https://yourlink.com', type: 'link' },
]

export const SUGGESTED_APPS = APPS.filter(a => ['custom-link', 'instagram', 'tiktok', 'youtube', 'shopify', 'contact-form', 'music'].includes(a.id))
