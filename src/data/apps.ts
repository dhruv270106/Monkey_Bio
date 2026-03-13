'use client'

export interface AppConfig {
  id: string
  title: string
  description: string
  icon: string
  color: string
  category: string
  placeholder: string
  prefix?: string
  pattern?: RegExp
}

export const CATEGORIES = [
  { id: 'suggested', name: 'Suggested', icon: 'fi-rr-star' },
  { id: 'social', name: 'Social', icon: 'fi-rr-share' },
  { id: 'commerce', name: 'Commerce', icon: 'fi-rr-shopping-cart' },
  { id: 'media', name: 'Media', icon: 'fi-rr-play-alt' },
  { id: 'audio', name: 'Audio', icon: 'fi-rr-music' },
  { id: 'contact', name: 'Contact', icon: 'fi-rr-envelope' },
  { id: 'communities', name: 'Communities', icon: 'fi-rr-users' },
  { id: 'events', name: 'Events', icon: 'fi-rr-ticket' },
  { id: 'promotions', name: 'Promotions', icon: 'fi-rr-megaphone' },
  { id: 'fundraising', name: 'Fundraising', icon: 'fi-rr-heart' },
  { id: 'text', name: 'Text', icon: 'fi-rr-text' },
  { id: 'other', name: 'Other', icon: 'fi-rr-apps' },
]

export const APPS: AppConfig[] = [
  // COMMERCE
  { id: 'coaching', title: 'Coaching & bookings', description: 'Sell 1:1 sessions, consultations, and private coaching', icon: 'fi-rr-calendar-check', color: 'text-blue-600', category: 'commerce', placeholder: 'Service link' },
  { id: 'digital-products', title: 'Digital products', description: 'Sell documents, PDFs, guides, templates, and other content', icon: 'fi-rr-box-open', color: 'text-indigo-600', category: 'commerce', placeholder: 'Product link' },
  { id: 'courses', title: 'Courses', description: 'Sell online courses and lessons to your audience', icon: 'fi-rr-graduation-cap', color: 'text-purple-600', category: 'commerce', placeholder: 'Course link' },
  { id: 'affiliate', title: 'Affiliate products', description: 'Share the items you love or promote products you sell with Product links.', icon: 'fi-rr-tag', color: 'text-emerald-500', category: 'commerce', placeholder: 'Product URL' },
  { id: 'shopify', title: 'Shopify', description: 'Display your Shopify collections and products', icon: 'fi-brands-shopify', color: 'text-[#96BF48]', category: 'commerce', placeholder: 'Shopify store link' },
  { id: 'fourthwall', title: 'Fourthwall', description: 'Make & sell premium merch and custom goods', icon: 'fi-rr-shopping-bag', color: 'text-black', category: 'commerce', placeholder: 'Store link' },
  { id: 'amaze', title: 'Amaze', description: 'Create a store and display it on your Linktree', icon: 'fi-rr-shop', color: 'text-orange-500', category: 'commerce', placeholder: 'Amaze link' },
  { id: 'books', title: 'Books', description: 'Sell books from Amazon, Apple, and more', icon: 'fi-rr-book', color: 'text-amber-800', category: 'commerce', placeholder: 'Book link' },
  { id: 'bonfire', title: 'Bonfire', description: 'Sell products from your Bonfire store directly', icon: 'fi-rr-fire', color: 'text-orange-600', category: 'commerce', placeholder: 'Store link' },

  // COMMUNITIES
  { id: 'community-channels', title: 'Community Channels', description: 'Offer access to WhatsApp, Discord or Slack communities', icon: 'fi-rr-users-alt', color: 'text-blue-500', category: 'communities', placeholder: 'Community link' },
  { id: 'discord', title: 'Discord servers', description: 'Add members to your Discord server', icon: 'fi-brands-discord', color: 'text-[#5865F2]', category: 'communities', placeholder: 'Invite link' },
  { id: 'whatsapp', title: 'WhatsApp groups', description: 'Add members to your WhatsApp group', icon: 'fi-brands-whatsapp', color: 'text-[#25D366]', category: 'communities', placeholder: 'Group link' },
  { id: 'slack', title: 'Slack workspaces', description: 'Add members to your Slack workspace', icon: 'fi-brands-slack', color: 'text-[#4A154B]', category: 'communities', placeholder: 'Workspace invite' },

  // PROMOTIONS
  { id: 'discount', title: 'Discount Code', description: 'Display a discount code for your visitors', icon: 'fi-rr-ticket', color: 'text-rose-500', category: 'promotions', placeholder: 'CODE20' },
  { id: 'gleam', title: 'Gleam', description: 'Grow your audience with giveaways and contests', icon: 'fi-rr-trophy', color: 'text-blue-400', category: 'promotions', placeholder: 'Gleam link' },

  // FUNDRAISING
  { id: 'gofundme', title: 'GoFundMe', description: 'Promote and support causes you care about', icon: 'fi-rr-hand-holding-heart', color: 'text-[#00B964]', category: 'fundraising', placeholder: 'GoFundMe link' },

  // OTHER DIGITAL
  { id: 'sendowl', title: 'SendOwl', description: 'Sell digital goods with automatic delivery', icon: 'fi-rr-paper-plane', color: 'text-cyan-500', category: 'other', placeholder: 'SendOwl link' },
  { id: 'mobile-app', title: 'Mobile App', description: 'Market your app across Apple and Google stores', icon: 'fi-rr-apps', color: 'text-gray-700', category: 'other', placeholder: 'App store link' },

  // SOCIAL
  { id: 'threads', title: 'Threads', description: 'Select your favorite Threads posts to display', icon: 'fi-rr-at', color: 'text-[#000000]', category: 'social', placeholder: '@username', prefix: 'https://threads.net/@' },
  { id: 'instagram', title: 'Instagram', description: 'Display your posts and reels', icon: 'fi-brands-instagram', color: 'text-[#E4405F]', category: 'social', placeholder: '@username', prefix: 'https://instagram.com/' },
  { id: 'facebook', title: 'Facebook', description: 'Show your visitors any Facebook video', icon: 'fi-brands-facebook', color: 'text-[#1877F2]', category: 'social', placeholder: 'Profile or Video link' },
  { id: 'youtube', title: 'YouTube', description: 'Show your visitors any YouTube video', icon: 'fi-brands-youtube', color: 'text-[#FF0000]', category: 'social', placeholder: 'Video link' },
  { id: 'x', title: 'X', description: 'Showcase what\'s new on your feed', icon: 'fi-brands-twitter', color: 'text-[#000000]', category: 'social', placeholder: '@username', prefix: 'https://x.com/' },
  { id: 'tiktok', title: 'TikTok', description: 'Share your latest TikTok videos', icon: 'fi-br-brand-tiktok', color: 'text-[#000000]', category: 'social', placeholder: '@username', prefix: 'https://tiktok.com/@' },
  { id: 'whatsapp-direct', title: 'WhatsApp', description: 'Chat directly with your visitors', icon: 'fi-brands-whatsapp', color: 'text-[#25D366]', category: 'social', placeholder: 'Group or Direct link' },
  { id: 'snapchat', title: 'Snapchat', description: 'Drive audiences to your Public Stories', icon: 'fi-brands-snapchat', color: 'text-[#FFFC00]', category: 'social', placeholder: 'Username', prefix: 'https://snapchat.com/add/' },
  { id: 'pinterest', title: 'Pinterest', description: 'Share boards and individual Pins', icon: 'fi-brands-pinterest', color: 'text-[#BD081C]', category: 'social', placeholder: 'Pinterest link', prefix: 'https://pinterest.com/' },
  { id: 'twitch', title: 'Twitch', description: 'Show your live Twitch stream and chat', icon: 'fi-brands-twitch', color: 'text-[#9146FF]', category: 'social', placeholder: 'Channel name', prefix: 'https://twitch.tv/' },
  { id: 'reddit', title: 'Reddit', description: 'Add a preview of your Reddit profile', icon: 'fi-brands-reddit', color: 'text-[#FF4500]', category: 'social', placeholder: 'Username', prefix: 'https://reddit.com/u/' },
  { id: 'github', title: 'Github', description: 'Show your repositories and projects', icon: 'fi-brands-github', color: 'text-black', category: 'social', placeholder: 'Username', prefix: 'https://github.com/' },
  { id: 'linkedin', title: 'LinkedIn', description: 'Share your professional profile', icon: 'fi-brands-linkedin', color: 'text-[#0A66C2]', category: 'social', placeholder: 'LinkedIn URL', prefix: 'https://linkedin.com/in/' },
  { id: 'discord-social', title: 'Discord', description: 'Link to your Discord community', icon: 'fi-brands-discord', color: 'text-[#5865F2]', category: 'social', placeholder: 'Invite URL' },
  { id: 'telegram', title: 'Telegram', description: 'Direct visitors to your Telegram channel', icon: 'fi-brands-telegram', color: 'text-[#229ED9]', category: 'social', placeholder: 'Username', prefix: 'https://t.me/' },
  { id: 'rss', title: 'RSS Feed', description: 'Share RSS feeds for easy content syndication', icon: 'fi-rr-rss', color: 'text-orange-500', category: 'social', placeholder: 'RSS URL' },

  // MEDIA
  { id: 'youtube-media', title: 'YouTube', description: 'Show your visitors any YouTube video', icon: 'fi-brands-youtube', color: 'text-[#FF0000]', category: 'media', placeholder: 'Video link' },
  { id: 'tiktok-video', title: 'TikTok Video', description: 'Highlight one of your TikToks directly', icon: 'fi-br-brand-tiktok', color: 'text-black', category: 'media', placeholder: 'TikTok Link' },
  { id: 'vimeo', title: 'Vimeo', description: 'Share Vimeo videos with your visitors', icon: 'fi-brands-vimeo', color: 'text-[#1AB7EA]', category: 'media', placeholder: 'Vimeo link' },
  { id: 'pdf', title: 'PDF display', description: 'Display downloadable PDF files and CVs', icon: 'fi-rr-file-pdf', color: 'text-red-500', category: 'media', placeholder: 'PDF link' },

  // AUDIO
  { id: 'spotify', title: 'Spotify', description: 'Share your own or favorite Spotify sounds', icon: 'fi-brands-spotify', color: 'text-[#1DB954]', category: 'audio', placeholder: 'Spotify link' },
  { id: 'apple-music', title: 'Apple Music', description: 'Gets your listeners closer to the songs', icon: 'fi-brands-apple', color: 'text-[#FA2D48]', category: 'audio', placeholder: 'Apple Music link' },
  { id: 'soundcloud', title: 'SoundCloud', description: 'Upload and share tracks with followers', icon: 'fi-brands-soundcloud', color: 'text-[#FF3300]', category: 'audio', placeholder: 'SoundCloud link' },
  { id: 'audiomack', title: 'Audiomack', description: 'Share unlimited music and podcast content', icon: 'fi-rr-headset', color: 'text-amber-500', category: 'audio', placeholder: 'Audiomack link' },

  // CONTACT
  { id: 'email-signup', title: 'Email signup', description: 'Collect emails for your audience line', icon: 'fi-rr-envelope-plus', color: 'text-emerald-500', category: 'contact', placeholder: 'Signup link' },
  { id: 'sms-signup', title: 'SMS signup', description: 'Collect phone numbers to connect', icon: 'fi-rr-comments', color: 'text-teal-500', category: 'contact', placeholder: 'Service Link' },
  { id: 'maps', title: 'Maps', description: 'Display a map location on your profile', icon: 'fi-rr-map-marker', color: 'text-red-500', category: 'contact', placeholder: 'Google Maps link' },
  { id: 'faqs', title: 'FAQs', description: 'Provide answers to common questions', icon: 'fi-rr-interrogation', color: 'text-blue-400', category: 'contact', placeholder: 'FAQ Title' },

  // EVENTS
  { id: 'tour', title: 'Tour and Events', description: 'Promote your upcoming shows from your artist profile right on your Linktree.', icon: 'fi-rr-ticket', color: 'text-rose-500', category: 'events', placeholder: 'Events profile link' },
  { id: 'seated', title: 'Seated', description: 'Promote your upcoming shows and drive ticket sales via Seated.', icon: 'fi-rr-chair', color: 'text-blue-600', category: 'events', placeholder: 'Seated link' },
  { id: 'bandsintown', title: 'Bands In Town', description: 'Connect your Linktree visitors to your events via Bandsintown.', icon: 'fi-rr-music', color: 'text-blue-400', category: 'events', placeholder: 'Bandsintown link' },

  // TEXT
  { id: 'text', title: 'Text', description: 'Display custom text on your Linktree, complete with an optional call-to-action button.', icon: 'fi-rr-text', color: 'text-gray-700', category: 'text', placeholder: 'Enter text content' },
  { id: 'header', title: 'Header', description: 'Make it easy to navigate with Link Headers helping visitors find what they need fast.', icon: 'fi-rr-text-size', color: 'text-slate-600', category: 'text', placeholder: 'Header text' },
]

export const SUGGESTED_APPS = APPS.filter(a => ['instagram', 'tiktok', 'youtube', 'spotify', 'shopify'].includes(a.id))
