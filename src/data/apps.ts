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
  { id: 'media', name: 'Media', icon: 'fi-rr-play-alt' },
  { id: 'contact', name: 'Contact', icon: 'fi-rr-envelope' },
  { id: 'events', name: 'Events', icon: 'fi-rr-calendar' },
  { id: 'text', name: 'Text', icon: 'fi-rr-text' },
  { id: 'commerce', name: 'Commerce', icon: 'fi-rr-shopping-cart' },
]

export const APPS: AppConfig[] = [
  // SOCIAL
  { id: 'instagram', title: 'Instagram', description: 'Display your posts and reels', icon: 'fi-brands-instagram', color: 'text-[#E4405F]', category: 'social', placeholder: '@username', prefix: 'https://instagram.com/' },
  { id: 'tiktok', title: 'TikTok', description: 'Share your latest TikTok videos', icon: 'fi-brands-tiktok', color: 'text-[#000000]', category: 'social', placeholder: '@username', prefix: 'https://tiktok.com/@' },
  { id: 'youtube', title: 'YouTube', description: 'Link to your channel or videos', icon: 'fi-brands-youtube', color: 'text-[#FF0000]', category: 'social', placeholder: 'Channel URL', prefix: 'https://youtube.com/' },
  { id: 'spotify', title: 'Spotify', description: 'Share your playlists or artist profile', icon: 'fi-brands-spotify', color: 'text-[#1DB954]', category: 'social', placeholder: 'Spotify link', prefix: '' },
  { id: 'x', title: 'X (Twitter)', description: 'Embed your latest posts', icon: 'fi-brands-twitter', color: 'text-[#000000]', category: 'social', placeholder: '@username', prefix: 'https://x.com/' },
  { id: 'threads', title: 'Threads', description: 'Link to your Threads profile', icon: 'fi-brands-threads', color: 'text-[#000000]', category: 'social', placeholder: '@username', prefix: 'https://threads.net/@' },
  { id: 'facebook', title: 'Facebook', description: 'Link to your page or profile', icon: 'fi-brands-facebook', color: 'text-[#1877F2]', category: 'social', placeholder: 'Profile link', prefix: 'https://facebook.com/' },
  { id: 'snapchat', title: 'Snapchat', description: 'Share your Snap code or profile', icon: 'fi-brands-snapchat', color: 'text-[#FFFC00]', category: 'social', placeholder: 'Username', prefix: 'https://snapchat.com/add/' },
  { id: 'pinterest', title: 'Pinterest', description: 'Showcase your boards', icon: 'fi-brands-pinterest', color: 'text-[#BD081C]', category: 'social', placeholder: 'Profile link', prefix: 'https://pinterest.com/' },
  { id: 'twitch', title: 'Twitch', description: 'Promote your live streams', icon: 'fi-brands-twitch', color: 'text-[#9146FF]', category: 'social', placeholder: 'Channel name', prefix: 'https://twitch.tv/' },
  { id: 'reddit', title: 'Reddit', description: 'Link to your profile or community', icon: 'fi-brands-reddit', color: 'text-[#FF4500]', category: 'social', placeholder: 'Username', prefix: 'https://reddit.com/u/' },

  // MEDIA
  { id: 'video', title: 'Video', description: 'Embed any video from URL', icon: 'fi-rr-play', color: 'text-blue-500', category: 'media', placeholder: 'Video URL' },
  { id: 'vimeo', title: 'Vimeo', description: 'Share your Vimeo videos', icon: 'fi-brands-vimeo', color: 'text-[#1AB7EA]', category: 'media', placeholder: 'Video URL' },
  { id: 'pdf', title: 'PDF Display', description: 'Upload and showcase a PDF file', icon: 'fi-rr-file-pdf', color: 'text-red-500', category: 'media', placeholder: 'PDF link' },

  // CONTACT
  { id: 'contact-form', title: 'Contact Form', description: 'Receive messages from visitors', icon: 'fi-rr-form', color: 'text-purple-500', category: 'contact', placeholder: 'Form Title' },
  { id: 'email-signup', title: 'Email Signup', description: 'Build your mailing list', icon: 'fi-rr-envelope-plus', color: 'text-teal-500', category: 'contact', placeholder: 'Link to your tool' },
  { id: 'sms-signup', title: 'SMS Signup', description: 'Grow your SMS subscribers', icon: 'fi-rr-comment-alt', color: 'text-amber-500', category: 'contact', placeholder: 'Service link' },
  { id: 'typeform', title: 'Typeform', description: 'Embed a Typeform quiz or survey', icon: 'fi-rr-interrogation', color: 'text-[#262627]', category: 'contact', placeholder: 'Typeform URL' },

  // EVENTS
  { id: 'tour', title: 'Tour & Events', description: 'Show your upcoming show dates', icon: 'fi-rr-ticket', color: 'text-indigo-500', category: 'events', placeholder: 'Service link' },
  { id: 'seated', title: 'Seated', description: 'Promote your Seated tickets', icon: 'fi-rr-chair', color: 'text-gray-900', category: 'events', placeholder: 'Seated link' },
  { id: 'bandsintown', title: 'Bands in Town', description: 'List your gig dates', icon: 'fi-rr-music', color: 'text-blue-400', category: 'events', placeholder: 'Profile link' },

  // TEXT
  { id: 'text-block', title: 'Text', description: 'Add a block of custom text', icon: 'fi-rr-document', color: 'text-emerald-500', category: 'text', placeholder: 'Enter text here' },
  { id: 'header', title: 'Header', description: 'Add a headline to your profile', icon: 'fi-rr-text-size', color: 'text-slate-500', category: 'text', placeholder: 'Section Title' },
]

// Suggested is usually a mix of popular ones
export const SUGGESTED_APPS = APPS.filter(a => ['instagram', 'tiktok', 'youtube', 'spotify', 'contact-form'].includes(a.id))
