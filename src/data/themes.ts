export interface Theme {
  id: string;
  name: string;
  bg: string;
  text: string;
  button: string;
  accent: string;
  isCustom?: boolean;
  image?: string;
  grid?: boolean;
}

export const THEMES: Theme[] = [
  { id: 'custom', name: 'Custom Color', bg: 'bg-white', text: 'text-secondary', button: 'bg-secondary text-white', accent: 'primary', isCustom: true },
  
  // PREMIUM CATEGORY (Unique Selections)
  { id: 'mesh-candy', name: 'Mesh Candy', bg: 'bg-[#ff7eb3]', image: 'https://images.unsplash.com/photo-1557683311-eac922347aa1?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-white/20 backdrop-blur border border-white/30 rounded-2xl', accent: 'white' },
  { id: 'northern-lights', name: 'Northern Lights', bg: 'bg-black', image: 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-white/10 backdrop-blur border border-white/10 text-[#6cf383]', accent: '#6cf383' },
  { id: 'cyber-city', name: 'Cyber City', bg: 'bg-[#0f172a]', image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7da05?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-primary text-secondary font-black border-4 border-secondary shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]', accent: 'primary' },
  { id: 'deep-forest', name: 'Deep Forest', bg: 'bg-[#064e3b]', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-[#34d399] text-[#064e3b] font-black rounded-none', accent: '#34d399' },
  { id: 'mountain-mist', name: 'Mountain Mist', bg: 'bg-slate-100', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000', text: 'text-secondary', button: 'bg-white/80 backdrop-blur text-secondary font-bold shadow-lg', accent: 'slate' },
  { id: 'desert-storm', name: 'Desert Storm', bg: 'bg-[#f5e6d3]', image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&q=80&w=1000', text: 'text-[#4a3728]', button: 'bg-[#4a3728] text-white rounded-xl', accent: '#4a3728' },
  { id: 'midnight-sakura', name: 'Midnight Sakura', bg: 'bg-[#0e0c0c]', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1000', text: 'text-[#ff6b6b]', button: 'bg-[#ff6b6b]/10 border border-[#ff6b6b]/20 text-[#ff6b6b] rounded-pill', accent: '#ff6b6b' },
  { id: 'marble-stone', name: 'Marble Stone', bg: 'bg-[#f3f4f6]', image: 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?auto=format&fit=crop&q=80&w=1000', text: 'text-secondary', button: 'bg-white border border-gray-100 shadow-xl font-black text-xs uppercase tracking-widest', accent: 'black' },
  { id: 'retro-80s', name: 'Retro 80s', bg: 'bg-[#2b0057]', image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1000', text: 'text-[#ff00ff]', button: 'bg-[#00ffff]/20 border-2 border-[#00ffff] text-[#00ffff] font-black italic shadow-[4px_4px_0px_0px_#ff00ff]', accent: '#00ffff' },
  { id: 'zen-garden', name: 'Zen Garden', bg: 'bg-[#f1f2ed]', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000', text: 'text-[#5d6049]', button: 'bg-white/40 border border-[#5d6049]/10 text-[#5d6049]', accent: '#5d6049' },
  { id: 'urban-street', name: 'Urban Street', bg: 'bg-zinc-900', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-primary text-secondary font-black border-none px-8 py-5', accent: 'primary' },
  { id: 'deep-sea', name: 'Deep Sea', bg: 'bg-[#001219]', image: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&q=80&w=1000', text: 'text-[#94d2bd]', button: 'bg-[#94d2bd]/10 border border-[#94d2bd]/30 text-[#94d2bd]', accent: '#94d2bd' },
  { id: 'dark-royal', name: 'Dark Royal', bg: 'bg-[#020617]', image: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-lg', accent: 'blue' },
  { id: 'retro-grid-colored', name: 'Retro Grid', bg: 'bg-[#fef9f1]', text: 'text-secondary', button: 'bg-white border-4 border-secondary shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]', accent: 'secondary', grid: true },

  // CATEGORIES WITH IMAGES
  // CARS
  { id: 'supercar-red', name: 'Vantage Red', bg: 'bg-black', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-red-600 text-white font-black italic rounded-none', accent: 'red' },
  { id: 'gtr-skyline', name: 'Drift Night', bg: 'bg-zinc-900', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-white/10 backdrop-blur border border-white/20', accent: 'blue' },
  
  // MOTORCYCLES
  { id: 'ducati-panigale', name: 'Bologna Beast', bg: 'bg-black', image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-rose-600 text-white font-black rounded-none', accent: 'red' },
  { id: 'harley-bobber', name: 'Iron Horse', bg: 'bg-stone-900', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1000', text: 'text-[#d4af37]', button: 'bg-[#d4af37] text-black font-black', accent: 'orange' },

  // BIRDS
  { id: 'kingfisher-blue', name: 'Nature Jewel', bg: 'bg-[#a5f3fc]', image: 'https://images.unsplash.com/photo-1555169062-013468b47731?auto=format&fit=crop&q=80&w=1000', text: 'text-[#0e4b5a]', button: 'bg-white/40 border border-white/20 text-[#0e4b5a]', accent: 'teal' },
  { id: 'toucan-tropical', name: 'Aruba Vibe', bg: 'bg-black', image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-[#ff7eb3] text-white', accent: 'pink' },

  // ANIMALS
  { id: 'tiger-roar', name: 'Jungle King', bg: 'bg-black', image: 'https://images.unsplash.com/photo-1477764250597-dffe9f601ae8?auto=format&fit=crop&q=80&w=1000', text: 'text-[#fbbf24]', button: 'bg-[#fbbf24] text-black font-black', accent: 'orange' },
  { id: 'bamboo-soul-v2', name: 'Bamboo Soul', bg: 'bg-zinc-100', image: 'https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?auto=format&fit=crop&q=80&w=1000', text: 'text-black', button: 'bg-black text-white rounded-[40px]', accent: 'gray' },

  // CUTE
  { id: 'cookie-cream', name: 'Sweet Treat', bg: 'bg-[#fafaf9]', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=1000', text: 'text-[#44403c]', button: 'bg-[#d6d3d1] text-[#44403c] rounded-[30px]', accent: 'brown' },
  { id: 'cloud-nine', name: 'Soft Cloud', bg: 'bg-white', image: 'https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?auto=format&fit=crop&q=80&w=1000', text: 'text-secondary', button: 'bg-white/60 backdrop-blur rounded-2xl', accent: 'blue' },

  // DRAWING
  { id: 'pencil-sketch', name: 'Graphite', bg: 'bg-[#f3f4f6]', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1000', text: 'text-[#111827]', button: 'bg-white border-2 border-black text-black', accent: 'gray' },
  { id: 'watercolor-fun', name: 'Abstract Art', bg: 'bg-white', image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=1000', text: 'text-secondary', button: 'bg-white shadow-xl rounded-[100px]', accent: 'pink' },

  // PHOTOGRAPHY
  { id: 'minimal-wall', name: 'Clean Void', bg: 'bg-white', image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1000', text: 'text-secondary', button: 'bg-gray-50 border border-gray-100', accent: 'gray' },
  { id: 'monochrome', name: 'BW Street', bg: 'bg-black', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-white text-black font-medium rounded-sm', accent: 'white' },

  // BUSINESS
  { id: 'high-rise', name: 'Skyscraper', bg: 'bg-zinc-900', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-blue-600 rounded-none transform transition-all', accent: 'blue' },
  { id: 'real-estate', name: 'Luxury Living', bg: 'bg-[#f8fafc]', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000', text: 'text-[#0f172a]', button: 'bg-white border-2 border-primary text-secondary', accent: 'gold' },
  { id: 'tech-vision', name: 'Silicon Valley', bg: 'bg-black', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-primary text-secondary font-black rounded-sm', accent: 'primary' },
  { id: 'ceo-suite-new', name: 'CEO Suite', bg: 'bg-[#ffffff]', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000', text: 'text-secondary', button: 'bg-transparent border-2 border-secondary text-secondary font-black', accent: 'black' },
  { id: 'creative-ops-new', name: 'Creative Ops', bg: 'bg-[#6366f1]', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-white text-[#6366f1] font-extrabold shadow-inner', accent: 'indigo' },

  // GRIDS
  { id: 'grid-mocha', name: 'Mocha Grid', bg: 'bg-[#2a1b0d]', text: 'text-white', button: 'bg-white/10 backdrop-blur border border-white/20', accent: 'white', grid: true },

  // SPORTS
  { id: 'soccer-field', name: 'Pitch High', bg: 'bg-[#166534]', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-white text-secondary font-black border-l-8 border-primary', accent: 'green' },
  { id: 'basketball-court', name: 'Swish Vibe', bg: 'bg-[#f97316]', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-black text-white font-black italic rounded-none', accent: 'orange' },

  // PLANTS
  { id: 'monstera-leaf', name: 'Swiss Cheese', bg: 'bg-[#f0f9f1]', image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=1000', text: 'text-[#166534]', button: 'bg-white border-[#166534] border-2 text-[#166534] rounded-full', accent: 'green' },
  { id: 'desert-cactus', name: 'Lone Cactus', bg: 'bg-[#fff7ed]', image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&q=80&w=1000', text: 'text-[#ea580c]', button: 'bg-[#ea580c] text-white rounded-none', accent: 'orange' },

  // TRANSPORTATION
  { id: 'subway-city', name: 'Metro Ride', bg: 'bg-zinc-900', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-primary text-secondary font-black rounded-none shadow-[4px_4px_0px_#ffffff]', accent: 'primary' },
  { id: 'airplane-sky', name: 'First Class', bg: 'bg-[#0ea5e9]', image: 'https://images.unsplash.com/photo-1464039397811-476f652a343b?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-white/10 backdrop-blur rounded-[20px] border border-white/30', accent: 'blue' },

  // GAMES
  { id: 'cyberpunk-neon', name: 'Night City', bg: 'bg-black', image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-[#ff00ff]/20 border-2 border-[#00ffff] text-[#00ffff] shadow-[0_0_15px_#ff00ff]', accent: 'pink' },
  { id: 'esports-dark', name: 'Pro Arena', bg: 'bg-zinc-950', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-primary text-secondary font-black italic rounded-none', accent: 'primary' },

  // LEGACY RESTORED
  { id: 'happy-vibes', name: 'Happy Vibes', bg: 'bg-yellow-400', image: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=1000', text: 'text-secondary', button: 'bg-white/90 backdrop-blur text-secondary shadow-lg', accent: 'yellow' },
  { id: 'agate', name: 'Agate', bg: 'bg-[#1b4332]', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-[#9ef01a] text-[#1b4332] font-black', accent: '#9ef01a' },
  { id: 'bliss', name: 'Bliss', bg: 'bg-white', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1000', text: 'text-secondary', button: 'bg-white/60 backdrop-blur shadow-sm', accent: 'gray' },
]
