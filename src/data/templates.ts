export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  isPremium: boolean;
  themeId: string;
  image: string;
}

export const TEMPLATE_CATEGORIES = [
  "Influencer",
  "Business",
  "Creative",
  "Music",
  "Beauty",
  "Food & Drink",
  "Tech",
  "Education",
  "Health & Fitness",
  "Gaming"
];

export const TEMPLATES: Template[] = [
  // Influencer
  { id: 't1', name: 'Balcombe', description: 'This Linktree profile template is based on a travel influencers style, and is perfect for a travel blogger or Instagrammer.', category: 'Influencer', isPremium: false, themeId: 'mountain-mist', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000' },
  { id: 't2', name: 'Lumiere', description: 'A soft, light-filled template for lifestyle creators and minimalists.', category: 'Influencer', isPremium: false, themeId: 'bliss', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1000' },
  { id: 't3', name: 'Vantage', description: 'Premium sleek design for established personal brands.', category: 'Influencer', isPremium: true, themeId: 'premium-white-glass', image: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&q=80&w=1000' },
  { id: 't4', name: 'Sahara', description: 'Warm tones for travel and exploration content.', category: 'Influencer', isPremium: false, themeId: 'desert-storm', image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&q=80&w=1000' },
  { id: 't5', name: 'Nova', description: 'Futuristic vibe for modern digital creators.', category: 'Influencer', isPremium: true, themeId: 'premium-space-nebula', image: 'https://images.unsplash.com/photo-1475275083424-b4ff81625b60?auto=format&fit=crop&q=80&w=1000' },

  // Business
  { id: 't6', name: 'Corporate Grid', description: 'Clean and professional layout for startups and agencies.', category: 'Business', isPremium: false, themeId: 'high-rise', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000' },
  { id: 't7', name: 'CEO Suite', description: 'Elegant and minimal for executives and consultants.', category: 'Business', isPremium: false, themeId: 'ceo-suite-new', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000' },
  { id: 't8', name: 'Liquid Silver', description: 'Modern polished look for luxury brands.', category: 'Business', isPremium: true, themeId: 'premium-liquid-mercury', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000' },
  { id: 't9', name: 'Creative Ops', description: 'Vibrant and organized for creative studios.', category: 'Business', isPremium: false, themeId: 'creative-ops-new', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000' },
  { id: 't10', name: 'Gold Flow', description: 'The ultimate premium look for high-end commerce.', category: 'Business', isPremium: true, themeId: 'premium-gold-flow', image: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=1000' },

  // Creative
  { id: 't11', name: 'Canvas White', description: 'A blank slate for artists and designers.', category: 'Creative', isPremium: false, themeId: 'minimal-wall', image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1000' },
  { id: 't12', name: 'Abstract Pulse', description: 'Dynamic and colorful for modern art.', category: 'Creative', isPremium: true, themeId: 'premium-blue-waves', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000' },
  { id: 't13', name: 'Monochrome', description: 'Classic black and white for photographers.', category: 'Creative', isPremium: false, themeId: 'monochrome', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1000' },
  { id: 't14', name: 'Ink Bloom', description: 'Artistic smoke and ink effects for creatives.', category: 'Creative', isPremium: true, themeId: 'premium-smoke-ink', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1000' },
  { id: 't15', name: 'Watercolor', description: 'Soft and playful for illustrators.', category: 'Creative', isPremium: false, themeId: 'watercolor-fun', image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=1000' },

  // Music
  { id: 't16', name: 'Stage Light', description: 'High energy for DJs and musicians.', category: 'Music', isPremium: false, themeId: 'mesh-candy', image: 'https://images.unsplash.com/photo-1557683311-eac922347aa1?auto=format&fit=crop&q=80&w=1000' },
  { id: 't17', name: 'Neon Beat', description: 'Electric vibe for electronic music artists.', category: 'Music', isPremium: true, themeId: 'premium-cyber-neon', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000' },
  { id: 't18', name: 'Retro Vinyl', description: 'Vintage aesthetic for bands and producers.', category: 'Music', isPremium: false, themeId: 'retro-80s', image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1000' },
  { id: 't19', name: 'Acoustic Soul', description: 'Calm and earthy for solo artists.', category: 'Music', isPremium: false, themeId: 'agate', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000' },
  { id: 't20', name: 'Studio Dark', description: 'Professional studio look for audio engineers.', category: 'Music', isPremium: true, themeId: 'premium-dark-nodes', image: 'https://images.unsplash.com/photo-1550645612-83f5d59c8a11?auto=format&fit=crop&q=80&w=1000' },

  // Beauty
  { id: 't21', name: 'Glossy', description: 'Shiny and fresh for makeup artists.', category: 'Beauty', isPremium: false, themeId: 'cloud-nine', image: 'https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?auto=format&fit=crop&q=80&w=1000' },
  { id: 't22', name: 'Silk Ruby', description: 'Luxurious velvet feel for premium beauty brands.', category: 'Beauty', isPremium: true, themeId: 'premium-silk-ruby', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000' },
  { id: 't23', name: 'Sakura Night', description: 'Elegant floral aesthetic for skincare blogs.', category: 'Beauty', isPremium: false, themeId: 'midnight-sakura', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1000' },
  { id: 't24', name: 'Prism Glow', description: 'Iridescent and modern for beauty influencers.', category: 'Beauty', isPremium: true, themeId: 'premium-glass-prism', image: 'https://images.unsplash.com/photo-1555679486-e78709ca6d61?auto=format&fit=crop&q=80&w=1000' },
  { id: 't25', name: 'Pastel Dream', description: 'Soft colors for hair and nail salons.', category: 'Beauty', isPremium: false, themeId: 'premium-vaporwave', image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1000' },

  // Food & Drink
  { id: 't26', name: 'Mocha Grid', description: 'Warm and inviting for cafes and bakeries.', category: 'Food & Drink', isPremium: false, themeId: 'grid-mocha', image: 'https://images.unsplash.com/photo-1557683311-eac922347aa1?auto=format&fit=crop&q=80&w=1000' },
  { id: 't27', name: 'Sweet Treat', description: 'Playful and bright for dessert shops.', category: 'Food & Drink', isPremium: false, themeId: 'cookie-cream', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=1000' },
  { id: 't28', name: 'Organic Green', description: 'Fresh and natural for health food brands.', category: 'Food & Drink', isPremium: true, themeId: 'premium-forest-mist', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1000' },
  { id: 't29', name: 'Chef Special', description: 'Sleek and professional for restaurants.', category: 'Food & Drink', isPremium: false, themeId: 'urban-street', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1000' },
  { id: 't30', name: 'Lava Vibe', description: 'Spicy and bold for bars and grills.', category: 'Food & Drink', isPremium: true, themeId: 'premium-lava', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1000' },

  // Tech
  { id: 't31', name: 'Core Engine', description: 'Highly technical look for developers and tech brands.', category: 'Tech', isPremium: true, themeId: 'premium-tech-circuit', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000' },
  { id: 't32', name: 'Silicon Valley', description: 'The classic tech startup aesthetic.', category: 'Tech', isPremium: false, themeId: 'tech-vision', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1000' },
  { id: 't33', name: 'Cyber City', description: 'Flashy and futuristic for tech influencers.', category: 'Tech', isPremium: false, themeId: 'cyber-city', image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7da05?auto=format&fit=crop&q=80&w=1000' },
  { id: 't34', name: 'Data Stream', description: 'Matrix-inspired for coding enthusiasts.', category: 'Tech', isPremium: true, themeId: 'premium-matrix', image: 'https://images.unsplash.com/photo-1510511459019-5dee2c147f2b?auto=format&fit=crop&q=80&w=1000' },
  { id: 't35', name: 'Helix Pulse', description: 'Bioscience and biotech focused theme.', category: 'Tech', isPremium: true, themeId: 'premium-dna-flow', image: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&q=80&w=1000' },

  // Education
  { id: 't36', name: 'Library Blue', description: 'Structured and calm for teachers and educators.', category: 'Education', isPremium: false, themeId: 'airplane-sky', image: 'https://images.unsplash.com/photo-1464039397811-476f652a343b?auto=format&fit=crop&q=80&w=1000' },
  { id: 't37', name: 'Pencil Sketch', description: 'Creative and academic for artists and students.', category: 'Education', isPremium: false, themeId: 'pencil-sketch', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1000' },
  { id: 't38', name: 'Study Session', description: 'Focused and minimal for online courses.', category: 'Education', isPremium: true, themeId: 'premium-white-glass', image: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&q=80&w=1000' },
  { id: 't39', name: 'Bamboo Soul', description: 'Zen and focused for specialized skill teachers.', category: 'Education', isPremium: false, themeId: 'bamboo-soul-v2', image: 'https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?auto=format&fit=crop&q=80&w=1000' },
  { id: 't40', name: 'Knowledge Hub', description: 'Premium professional layout for corporate training.', category: 'Education', isPremium: true, themeId: 'premium-dark-nodes', image: 'https://images.unsplash.com/photo-1550645612-83f5d59c8a11?auto=format&fit=crop&q=80&w=1000' },

  // Health & Fitness
  { id: 't41', name: 'Gym Flow', description: 'High performance for trainers and coaches.', category: 'Health & Fitness', isPremium: false, themeId: 'urban-street', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1000' },
  { id: 't42', name: 'Zen Garden', description: 'Calm and balanced for yoga instructors.', category: 'Health & Fitness', isPremium: false, themeId: 'zen-garden', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000' },
  { id: 't43', name: 'Oceanic 3D', description: 'Fluid and modern for wellness influencers.', category: 'Health & Fitness', isPremium: true, themeId: 'premium-blue-waves', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000' },
  { id: 't44', name: 'Nature Jewel', description: 'Earthy and vibrant for holistic health.', category: 'Health & Fitness', isPremium: false, themeId: 'kingfisher-blue', image: 'https://images.unsplash.com/photo-1555169062-013468b47731?auto=format&fit=crop&q=80&w=1000' },
  { id: 't45', name: 'Active Energy', description: 'Vibrant and motivating for fitness communities.', category: 'Health & Fitness', isPremium: true, themeId: 'premium-energy', image: 'https://images.unsplash.com/photo-1544396821-4dd40b938ad3?auto=format&fit=crop&q=80&w=1000' },

  // Gaming
  { id: 't46', name: 'Night City', description: 'Neon aesthetic for streamers and esports players.', category: 'Gaming', isPremium: false, themeId: 'cyberpunk-neon', image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=1000' },
  { id: 't47', name: 'Pro Arena', description: 'Aggressive and professional for gaming teams.', category: 'Gaming', isPremium: false, themeId: 'esports-dark', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000' },
  { id: 't48', name: 'Glitch Apex', description: 'Action-packed glitch theme for gaming creators.', category: 'Gaming', isPremium: true, themeId: 'premium-glitch', image: 'https://images.unsplash.com/photo-1629739884842-c3354d059881?auto=format&fit=crop&q=80&w=1000' },
  { id: 't49', name: 'Retro Grid', description: 'Classic arcade feel for retro gaming channels.', category: 'Gaming', isPremium: false, themeId: 'retro-grid-colored', image: 'https://images.unsplash.com/photo-1557683311-eac922347aa1?auto=format&fit=crop&q=80&w=1000' },
  { id: 't50', name: 'Cyber Neon Pulse', description: 'Ultimate immersive gaming experience.', category: 'Gaming', isPremium: true, themeId: 'premium-cyber-neon', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000' },
];
