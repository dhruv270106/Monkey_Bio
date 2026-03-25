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
  "All",
  "Influencer",
  "Business",
  "Creative",
  "Music",
  "Beauty",
  "Food & Drink",
  "Tech",
  "Education",
  "Health & Fitness",
  "Gaming",
  "Law & Finance",
  "E-commerce",
  "Crypto & Web3"
];

const getImg = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=1000`;

export const TEMPLATES: Template[] = [
  // INFLUENCER
  { id: 'inf-1', name: 'Nomad Soul', description: 'Travel influencer vibe.', category: 'Influencer', isPremium: false, themeId: 'mountain-mist', image: getImg('photo-1501785888041-af3ef285b470') },
  { id: 'inf-2', name: 'Royal Gold', description: 'Warm lifestyle aesthetic.', category: 'Influencer', isPremium: true, themeId: 'premium-gold-luxury', image: getImg('photo-1490730141103-6cac27aaab94') },
  { id: 'inf-3', name: 'Urban Glow', description: 'City street style.', category: 'Influencer', isPremium: false, themeId: 'urban-street', image: getImg('photo-1449824913935-59a10b8d2000') },
  { id: 'inf-4', name: 'Andromeda Muse', description: 'Cosmic content creator.', category: 'Influencer', isPremium: true, themeId: 'premium-deep-space', image: getImg('photo-1446776811953-b23d57bd21aa') },
  { id: 'inf-5', name: 'Lumiere', description: 'Minimalist brand.', category: 'Influencer', isPremium: false, themeId: 'bliss', image: getImg('photo-1516762689617-e1cffcef479d') },

  // BUSINESS
  { id: 'biz-1', name: 'Skyline Corp', description: 'Modern agencies.', category: 'Business', isPremium: false, themeId: 'urban-street', image: getImg('photo-1486406146926-c627a92ad1ab') },
  { id: 'biz-2', name: 'Silver Executive', description: 'Polished corporate look.', category: 'Business', isPremium: true, themeId: 'premium-liquid-mercury', image: getImg('photo-1497215728101-856f4ea42174') },
  { id: 'biz-3', name: 'Creative Hub', description: 'Dynamic grid teams.', category: 'Business', isPremium: false, themeId: 'mountain-mist', image: getImg('photo-1542744173-8e7e53415bb0') },
  { id: 'biz-4', name: 'Ethereal Milan', description: 'Luxury brand presence.', category: 'Business', isPremium: true, themeId: 'premium-white-smoke', image: getImg('photo-1533134486753-c833f0ed4866') },
  { id: 'biz-5', name: 'Silicon Valley Labs', description: 'Startup landing.', category: 'Business', isPremium: false, themeId: 'urban-street', image: getImg('photo-1519389950473-47ba0277781c') },

  // CREATIVE
  { id: 'cre-1', name: 'Hydro Kinetic', description: 'Experimental design.', category: 'Creative', isPremium: true, themeId: 'premium-blue-waves', image: getImg('photo-1550684848-fac1c5b4e853') },
  { id: 'cre-2', name: 'Ink & Paper', description: 'Artist portfolio.', category: 'Creative', isPremium: false, themeId: 'desert-storm', image: getImg('photo-1513364776144-60967b0f800f') },
  { id: 'cre-3', name: 'Deep Sea Flow', description: 'Immersive deep sea vibe.', category: 'Creative', isPremium: true, themeId: 'premium-ocean-mystery', image: getImg('photo-1551244072-5d12893278ab') },
  { id: 'cre-4', name: 'Neon Studio', description: 'Vibrant agency.', category: 'Creative', isPremium: false, themeId: 'midnight-sakura', image: getImg('photo-1558591710-4b4a1ae0f04d') },
  { id: 'cre-5', name: 'Satin Creative', description: 'Premium art focus.', category: 'Creative', isPremium: true, themeId: 'premium-silk-ruby', image: getImg('photo-1541701494587-cb58502866ab') },

  // MUSIC
  { id: 'mus-1', name: 'Stage Light', description: 'High energy performer.', category: 'Music', isPremium: false, themeId: 'midnight-sakura', image: getImg('photo-1470225620780-dba8ba36b745') },
  { id: 'mus-2', name: 'Neon Genesis', description: 'Electronic DJ style.', category: 'Music', isPremium: true, themeId: 'premium-cyber-neon', image: getImg('photo-1508700115892-45ecd05ae2ad') },
  { id: 'mus-3', name: 'Retro Vinyl', description: 'Vintage soul recordings.', category: 'Music', isPremium: false, themeId: 'retro-80s', image: getImg('photo-1605810230434-7631ac76ec81') },
  { id: 'mus-4', name: 'Acoustic Soul', description: 'Natural music feel.', category: 'Music', isPremium: false, themeId: 'desert-storm', image: getImg('photo-1511671782779-c97d3d27a1d4') },
  { id: 'mus-5', name: 'Toxic Rock', description: 'Industrial rock soul.', category: 'Music', isPremium: true, themeId: 'premium-plasma-green', image: getImg('photo-1598488035139-bdbb2231ce04') },

  // BEAUTY
  { id: 'bea-1', name: 'Velvet Rose Beauty', description: 'Premium makeup.', category: 'Beauty', isPremium: true, themeId: 'premium-silk-ruby', image: getImg('photo-1512496015851-a90fb38ba796') },
  { id: 'bea-2', name: 'Ethereal Glow', description: 'Soft wellness.', category: 'Beauty', isPremium: true, themeId: 'premium-white-smoke', image: getImg('photo-1515377905703-c4788e51af15') },
  { id: 'bea-3', name: 'Sakura Night', description: 'Floral beauty.', category: 'Beauty', isPremium: false, themeId: 'midnight-sakura', image: getImg('photo-1522337360788-8b13dee7a37e') },
  { id: 'bea-4', name: 'Mint Oasis', description: 'Fresh organic brand.', category: 'Beauty', isPremium: false, themeId: 'matcha', image: getImg('photo-1494438639946-1ebd1d20bf85') },
  { id: 'bea-5', name: 'Andromeda Eyes', description: 'Colorful artist style.', category: 'Beauty', isPremium: true, themeId: 'premium-deep-space', image: getImg('photo-1516975080664-ed2fc6a32937') },

  // FOOD & DRINK
  { id: 'foo-1', name: 'Spiced Kitchen', description: 'Warm café vibe.', category: 'Food & Drink', isPremium: false, themeId: 'mountain-mist', image: getImg('photo-1504674900247-0877df9cc836') },
  { id: 'foo-2', name: 'Gourmet Gilt', description: 'Fine dining.', category: 'Food & Drink', isPremium: true, themeId: 'premium-gold-luxury', image: getImg('photo-1559339352-11d035aa65de') },
  { id: 'foo-3', name: 'Mint Garden', description: 'Organic cuisine.', category: 'Food & Drink', isPremium: false, themeId: 'mountain-mist', image: getImg('photo-1512621776951-a57141f2eefd') },
  { id: 'foo-4', name: 'Andromeda Lounge', description: 'High-end cocktail bar.', category: 'Food & Drink', isPremium: true, themeId: 'premium-deep-space', image: getImg('photo-1514362545857-3bc16c4c7d1b') },
  { id: 'foo-5', name: 'Bistro White', description: 'Classic restaurant.', category: 'Food & Drink', isPremium: false, themeId: 'bliss', image: getImg('photo-1552566626-52f8b828add9') },

  // TECH
  { id: 'tec-1', name: 'Dev Core', description: 'Software profile.', category: 'Tech', isPremium: false, themeId: 'urban-street', image: getImg('photo-1451187580459-43490279c0fa') },
  { id: 'tec-2', name: 'Toxic Tech', description: 'High energy tech.', category: 'Tech', isPremium: true, themeId: 'premium-plasma-green', image: getImg('photo-1550751827-4bd374c3f58b') },
  { id: 'tec-3', name: 'Ocean Mystery Tech', description: 'Future tech flow.', category: 'Tech', isPremium: true, themeId: 'premium-ocean-mystery', image: getImg('photo-1518770660439-4636190af475') },
  { id: 'tec-4', name: 'Liquid Silver Tech', description: 'Precision metal tech.', category: 'Tech', isPremium: true, themeId: 'premium-liquid-mercury', image: getImg('photo-1531297484001-80022131f5a1') },
  { id: 'tec-5', name: 'Silicon Valley', description: 'SaaS style.', category: 'Tech', isPremium: false, themeId: 'urban-street', image: getImg('photo-1516110833967-0b5716ca1387') },

  // EDUCATION
  { id: 'edu-1', name: 'Academy Hub', description: 'Knowledge platform.', category: 'Education', isPremium: false, themeId: 'desert-storm', image: getImg('photo-1524995997946-a1c2e315a42f') },
  { id: 'edu-2', name: 'Ethereal Scholar', description: 'Research profile.', category: 'Education', isPremium: true, themeId: 'premium-white-smoke', image: getImg('photo-1507842217343-583bb7270b66') },
  { id: 'edu-3', name: 'Zen Study', description: 'Productivity hub.', category: 'Education', isPremium: false, themeId: 'mountain-mist', image: getImg('photo-1509869175650-a1d97972541a') },
  { id: 'edu-4', name: 'Neon Academy', description: 'Vibrant academic style.', category: 'Education', isPremium: true, themeId: 'premium-cyber-neon', image: getImg('photo-1558021212-51b6ecfa0db9') },
  { id: 'edu-5', name: 'Andromeda Science', description: 'Biology focus.', category: 'Education', isPremium: true, themeId: 'premium-deep-space', image: getImg('photo-1530210124550-912dc1381cb8') },

  // HEALTH & FITNESS
  { id: 'hea-1', name: 'Grounded Fitness', description: 'Coaching wellness.', category: 'Health & Fitness', isPremium: false, themeId: 'mountain-mist', image: getImg('photo-1517836357463-d25dfeac3438') },
  { id: 'hea-2', name: 'Ethereal Wellness', description: 'Soft therapy.', category: 'Health & Fitness', isPremium: true, themeId: 'premium-white-smoke', image: getImg('photo-1506126613408-eca07ce68773') },
  { id: 'hea-3', name: 'Toxic Iron', description: 'High energy coaching.', category: 'Health & Fitness', isPremium: true, themeId: 'premium-plasma-green', image: getImg('photo-1544396821-4dd40b938ad3') },
  { id: 'hea-4', name: 'Pure Agate', description: 'Natural supplements.', category: 'Health & Fitness', isPremium: false, themeId: 'mountain-mist', image: getImg('photo-1544367567-0f2fcb009e0b') },
  { id: 'hea-5', name: 'Urban Health', description: 'City fitness.', category: 'Health & Fitness', isPremium: false, themeId: 'bliss', image: getImg('photo-1464457312035-3d7d0e0c058e') },

  // GAMING
  { id: 'gam-1', name: 'Overlord Pro', description: 'Esports competitive.', category: 'Gaming', isPremium: false, themeId: 'urban-street', image: getImg('photo-1542751371-adc38448a05e') },
  { id: 'gam-2', name: 'Neon Genesis Gaming', description: 'Streamer aesthetic.', category: 'Gaming', isPremium: true, themeId: 'premium-cyber-neon', image: getImg('photo-1550745165-9bc0b252726f') },
  { id: 'gam-3', name: 'Retro Arcade', description: 'Arcade fun.', category: 'Gaming', isPremium: false, themeId: 'retro-80s', image: getImg('photo-1511512578047-dfb367046420') },
  { id: 'gam-4', name: 'Toxic Stream', description: 'High octane gaming.', category: 'Gaming', isPremium: true, themeId: 'premium-plasma-green', image: getImg('photo-1485846234645-a62644f84728') },
  { id: 'gam-5', name: 'Andromeda Arena', description: 'Tactical feel.', category: 'Gaming', isPremium: true, themeId: 'premium-deep-space', image: getImg('photo-1538481199705-c710c4e965fc') },

  // LAW & FINANCE
  { id: 'fin-1', name: 'Lexington Law', description: 'Legal firm style.', category: 'Law & Finance', isPremium: false, themeId: 'dark-glass', image: getImg('photo-1589829545856-d10d557cf95f') },
  { id: 'fin-2', name: 'Liquid Trust', description: 'Polished accounting.', category: 'Law & Finance', isPremium: true, themeId: 'premium-liquid-mercury', image: getImg('photo-1497366216548-37526070297c') },
  { id: 'fin-3', name: 'Royal Wealth', description: 'High-end management.', category: 'Law & Finance', isPremium: true, themeId: 'premium-gold-luxury', image: getImg('photo-1618005182384-a83a8bd57fbe') },
  { id: 'fin-4', name: 'Minimal Wealth', description: 'Financial advice.', category: 'Law & Finance', isPremium: false, themeId: 'bliss', image: getImg('photo-1554224155-6726b3ff858f') },
  { id: 'fin-5', name: 'Silver Ledger', description: 'Modern financial suite.', category: 'Law & Finance', isPremium: true, themeId: 'premium-liquid-mercury', image: getImg('photo-1554224154-26032ffc0d07') },

  // E-COMMERCE
  { id: 'com-1', name: 'Royal Boutique', description: 'Boutique store.', category: 'E-commerce', isPremium: true, themeId: 'premium-gold-luxury', image: getImg('photo-1557683311-eac922347aa1') },
  { id: 'com-2', name: 'Modern Shop', description: 'Product-first look.', category: 'E-commerce', isPremium: false, themeId: 'bliss', image: getImg('photo-1441986300917-64674bd600d8') },
  { id: 'com-3', name: 'Hydro Gear Shop', description: 'Performance gear.', category: 'E-commerce', isPremium: true, themeId: 'premium-blue-waves', image: getImg('photo-1523275335684-37898b6baf30') },
  { id: 'com-4', name: 'Desert Artisan', description: 'Handcrafted goods.', category: 'E-commerce', isPremium: false, themeId: 'desert-storm', image: getImg('photo-1509316785289-025f5b846b35') },
  { id: 'com-5', name: 'Satin Luxury', description: 'Premium fashion shop.', category: 'E-commerce', isPremium: true, themeId: 'premium-silk-ruby', image: getImg('photo-1523381210434-271e8be1f52b') },

  // CRYPTO & WEB3
  { id: 'cry-1', name: 'Andromeda Web3', description: 'Cosmic blockchain style.', category: 'Crypto & Web3', isPremium: true, themeId: 'premium-deep-space', image: getImg('photo-1639762681485-074b7f938ba0') },
  { id: 'cry-2', name: 'Liquid Ledger', description: 'Metal future finance.', category: 'Crypto & Web3', isPremium: true, themeId: 'premium-liquid-mercury', image: getImg('photo-1639322537228-f710d846310a') },
  { id: 'cry-3', name: 'Hydro Wallet', description: 'Crypto security style.', category: 'Crypto & Web3', isPremium: true, themeId: 'premium-blue-waves', image: getImg('photo-1621761191319-c6fb62004040') },
  { id: 'cry-4', name: 'Neon Genesis Crypto', description: 'Cyber trading.', category: 'Crypto & Web3', isPremium: true, themeId: 'premium-cyber-neon', image: getImg('photo-1642104704074-907c0698cbd9') },
  { id: 'cry-5', name: 'Toxic Ledger', description: 'Edge blockchain look.', category: 'Crypto & Web3', isPremium: true, themeId: 'premium-plasma-green', image: getImg('photo-1478760329108-5c3ed9d495a0') },
];
