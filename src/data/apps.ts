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
  { id: 'affiliate', title: 'Affiliate products', description: 'Share the items you love or promote products you sell', icon: 'fi-rr-tag', color: 'text-emerald-600', category: 'commerce', placeholder: 'Product URL' },
  { id: 'shopify', title: 'Shopify', description: 'Display your Shopify collections and products', icon: 'fi-brands-shopify', color: 'text-[#96BF48]', category: 'commerce', placeholder: 'Shopify store link' },
  { id: 'fourthwall', title: 'Fourthwall', description: 'Make & sell premium merch and custom goods', icon: 'fi-rr-shopping-bag', color: 'text-black', category: 'commerce', placeholder: 'Store link' },
  { id: 'amaze', title: 'Amaze', description: 'Create a store and display it on your Linktree', icon: 'fi-rr-shop', color: 'text-orange-500', category: 'commerce', placeholder: 'Amaze link' },
  { id: 'books', title: 'Books', description: 'Sell books from Amazon, Apple, and more', icon: 'fi-rr-book', color: 'text-amber-800', category: 'commerce', placeholder: 'Book link' },
  { id: 'bonfire', title: 'Bonfire', description: 'Sell products from your Bonfire store directly', icon: 'fi-rr-fire', color: 'text-orange-600', category: 'commerce', placeholder: 'Store link' },

  // COMMUNITIES
  { id: 'community-channels', title: 'Community Channels', description: 'Offer access to WhatsApp, Discord or Slack communities', icon: 'fi-rr-layers', color: 'text-blue-500', category: 'communities', placeholder: 'Community link' },
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
  { id: 'instagram', title: 'Instagram', description: 'Display your posts and reels', icon: 'fi-brands-instagram', color: 'text-[#E4405F]', category: 'social', placeholder: '@username', prefix: 'https://instagram.com/' },
  { id: 'tiktok', title: 'TikTok', description: 'Share your latest TikTok videos', icon: 'fi-brands-tiktok', color: 'text-[#000000]', category: 'social', placeholder: '@username', prefix: 'https://tiktok.com/@' },
  { id: 'tiktok-profile', title: 'TikTok Profile', description: 'Share TikTok profiles with your audience', icon: 'fi-brands-tiktok', color: 'text-[#000000]', category: 'social', placeholder: '@username', prefix: 'https://tiktok.com/@' },
  { id: 'x', title: 'X', description: 'Showcase what\'s new on your feed', icon: 'fi-brands-twitter', color: 'text-[#000000]', category: 'social', placeholder: '@username', prefix: 'https://x.com/' },
  { id: 'threads', title: 'Threads', description: 'Select your favorite Threads posts to display', icon: 'fi-brands-threads', color: 'text-[#000000]', category: 'social', placeholder: '@username', prefix: 'https://threads.net/@' },
  { id: 'reviews', title: 'Reviews', description: 'Showcase your Google reviews on your profile', icon: 'fi-rr-star', color: 'text-yellow-500', category: 'social', placeholder: 'Google Maps Link' },
  { id: 'facebook', title: 'Facebook', description: 'Show your visitors any Facebook video', icon: 'fi-brands-facebook', color: 'text-[#1877F2]', category: 'social', placeholder: 'Profile or Video link' },
  { id: 'snapchat', title: 'Snapchat', description: 'Drive audiences to your Public Stories', icon: 'fi-brands-snapchat', color: 'text-[#F7F131]', category: 'social', placeholder: 'Username', prefix: 'https://snapchat.com/add/' },
  { id: 'pinterest', title: 'Pinterest', description: 'Share boards and individual Pins', icon: 'fi-brands-pinterest', color: 'text-[#BD081C]', category: 'social', placeholder: 'Pinterest link', prefix: 'https://pinterest.com/' },
  { id: 'twitch', title: 'Twitch', description: 'Show your live Twitch stream and chat', icon: 'fi-brands-twitch', color: 'text-[#9146FF]', category: 'social', placeholder: 'Channel name', prefix: 'https://twitch.tv/' },
  { id: 'reddit', title: 'Reddit', description: 'Add a preview of your Reddit profile', icon: 'fi-brands-reddit', color: 'text-[#FF4500]', category: 'social', placeholder: 'Username', prefix: 'https://reddit.com/u/' },
  { id: 'rss', title: 'RSS Feed', description: 'Share RSS feeds for easy content syndication', icon: 'fi-rr-rss', color: 'text-orange-500', category: 'social', placeholder: 'RSS URL' },
  { id: 'cameo', title: 'Cameo', description: 'Drive fans to your personalized video profile', icon: 'fi-rr-star-half-filled', color: 'text-pink-500', category: 'social', placeholder: 'Cameo link' },
  { id: 'clubhouse', title: 'Clubhouse', description: 'Listen in on fascinating voice conversations', icon: 'fi-rr-microphone', color: 'text-amber-600', category: 'social', placeholder: 'Clubhouse Username' },

  // MEDIA
  { id: 'video', title: 'Video', description: 'Add videos from Twitch, Youtube, TikTok, Vimeo', icon: 'fi-rr-play', color: 'text-blue-500', category: 'media', placeholder: 'Video URL' },
  { id: 'youtube', title: 'YouTube', description: 'Show your visitors any YouTube video', icon: 'fi-brands-youtube', color: 'text-[#FF0000]', category: 'media', placeholder: 'Video link' },
  { id: 'tiktok-video', title: 'TikTok Video', description: 'Highlight one of your TikToks directly', icon: 'fi-brands-tiktok', color: 'text-black', category: 'media', placeholder: 'TikTok Link' },
  { id: 'vimeo', title: 'Vimeo', description: 'Share Vimeo videos with your visitors', icon: 'fi-brands-vimeo', color: 'text-[#1AB7EA]', category: 'media', placeholder: 'Vimeo link' },
  { id: 'pdf', title: 'PDF display', description: 'Display downloadable PDF files and CVs', icon: 'fi-rr-file-pdf', color: 'text-red-500', category: 'media', placeholder: 'PDF link' },

  // AUDIO
  { id: 'music', title: 'Music', description: 'Connect fans with music in one place', icon: 'fi-rr-music', color: 'text-pink-600', category: 'audio', placeholder: 'Song link' },
  { id: 'podcasts', title: 'Podcasts', description: 'Get more podcast listeners and subscribers', icon: 'fi-rr-microphone-alt', color: 'text-purple-600', category: 'audio', placeholder: 'Podcast link' },
  { id: 'spotify', title: 'Spotify', description: 'Share your own or favorite Spotify sounds', icon: 'fi-brands-spotify', color: 'text-[#1DB954]', category: 'audio', placeholder: 'Spotify link' },
  { id: 'apple-music', title: 'Apple Music', description: 'Gets your listeners closer to the songs', icon: 'fi-brands-apple', color: 'text-[#FA2D48]', category: 'audio', placeholder: 'Apple Music link' },
  { id: 'soundcloud', title: 'SoundCloud', description: 'Upload and share tracks with followers', icon: 'fi-brands-soundcloud', color: 'text-[#FF3300]', category: 'audio', placeholder: 'SoundCloud link' },
  { id: 'music-presave', title: 'Music Presave', description: 'Build excitement for upcoming releases', icon: 'fi-rr-play-circle', color: 'text-indigo-500', category: 'audio', placeholder: 'Presave link' },
  { id: 'audiomack', title: 'Audiomack', description: 'Share unlimited music and podcast content', icon: 'fi-rr-headset', color: 'text-amber-500', category: 'audio', placeholder: 'Audiomack link' },

  // CONTACT
  { id: 'form', title: 'Form', description: 'Add a Contact Form for messages', icon: 'fi-rr-form', color: 'text-blue-500', category: 'contact', placeholder: 'Form Title' },
  { id: 'contact-form', title: 'Contact Form', description: 'Collect info with a customized form', icon: 'fi-rr-document-signed', color: 'text-indigo-500', category: 'contact', placeholder: 'Form Name' },
  { id: 'email-signup', title: 'Email signup', description: 'Collect emails for your audience line', icon: 'fi-rr-envelope-plus', color: 'text-emerald-500', category: 'contact', placeholder: 'Signup link' },
  { id: 'sms-signup', title: 'SMS signup', description: 'Collect phone numbers to connect', icon: 'fi-rr-comments', color: 'text-teal-500', category: 'contact', placeholder: 'Service Link' },
  { id: 'typeform', title: 'Typeform', description: 'Embed conversational forms and quizzes', icon: 'fi-rr-interrogation', color: 'text-black', category: 'contact', placeholder: 'Typeform link' },
  { id: 'laylo', title: 'Laylo', description: 'Build fan list and reward audience', icon: 'fi-rr-magic-wand', color: 'text-violet-500', category: 'contact', placeholder: 'Laylo link' },
  { id: 'umg-signup', title: 'UMG Signup', description: 'Experimental greeting link base', icon: 'fi-rr-user-add', color: 'text-blue-400', category: 'contact', placeholder: 'Signup link' },
  { id: 'community-sms', title: 'Community SMS', description: 'Grow SMS subscriber list directly', icon: 'fi-rr-comment-alt-middle', color: 'text-orange-500', category: 'contact', placeholder: 'Community link' },
  { id: 'maps', title: 'Maps', description: 'Display a map location on your profile', icon: 'fi-rr-map-marker', color: 'text-red-500', category: 'contact', placeholder: 'Google Maps link' },
  { id: 'contact-details', title: 'Contact Details', description: 'Add a virtual contact card (vCard)', icon: 'fi-rr-id-badge', color: 'text-slate-600', category: 'contact', placeholder: 'Details Name' },
  { id: 'faqs', title: 'FAQs', description: 'Provide answers to common questions', icon: 'fi-rr-interrogation', color: 'text-blue-400', category: 'contact', placeholder: 'FAQ Title' },
  { id: 'chatbot', title: 'Chatbot', description: 'Add an interactive AI assistant', icon: 'fi-rr-comment-code', color: 'text-purple-400', category: 'contact', placeholder: 'Bot Link' },
  { id: 'email-direct', title: 'Email', description: 'Send email to a specific address', icon: 'fi-rr-envelope', color: 'text-gray-400', category: 'contact', placeholder: 'email@example.com' },
  { id: 'stats', title: 'Stats', description: 'Showcase achievements with labels', icon: 'fi-rr-stats', color: 'text-green-500', category: 'contact', placeholder: 'Stats Title' },

  // SCHEDULING
  { id: 'calendly', title: 'Calendly', description: 'Schedule meetings directly from profile', icon: 'fi-rr-calendar', color: 'text-[#006BFF]', category: 'events', placeholder: 'Calendly link' },

  // EVENTS
  { id: 'tour', title: 'Tour and Events', description: 'Promote upcoming show dates', icon: 'fi-rr-ticket', color: 'text-rose-500', category: 'events', placeholder: 'Events profile link' },
  { id: 'seated', title: 'Seated', description: 'Promote upcoming Seated tickets', icon: 'fi-rr-chair', color: 'text-gray-900', category: 'events', placeholder: 'Seated link' },
  { id: 'bandsintown', title: 'Bands In Town', description: 'Connect visitors to gig dates', icon: 'fi-rr-music', color: 'text-blue-400', category: 'events', placeholder: 'Bandsintown link' },

  // TEXT
  { id: 'text', title: 'Text', description: 'Display custom text and description', icon: 'fi-rr-text', color: 'text-emerald-500', category: 'text', placeholder: 'Enter text' },
  { id: 'header', title: 'Header', description: 'Make navigation easy with headers', icon: 'fi-rr-text-size', color: 'text-slate-500', category: 'text', placeholder: 'Header text' },
]

export const SUGGESTED_APPS = APPS.filter(a => ['instagram', 'tiktok', 'youtube', 'spotify', 'contact-form'].includes(a.id))
