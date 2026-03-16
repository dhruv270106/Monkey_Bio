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
  video?: string;
  isPremium?: boolean;
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

  // PREMIUM ANIMATED THEMES (3D & VIDEO LOOPS)
  // CATEGORY: CYBERPUNK 3D
  { id: 'premium-cyber-neon', name: 'Neon Pulse', bg: 'bg-black', video: 'https://assets.mixkit.co/videos/preview/mixkit-neon-light-strips-flashing-in-a-dark-room-40245-large.mp4', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-white/10 backdrop-blur border border-primary text-primary shadow-[0_0_15px_#6cf383]', accent: 'primary', isPremium: true },
  { id: 'premium-city-rain', name: 'Tokyo Rain', bg: 'bg-zinc-950', video: 'https://assets.mixkit.co/videos/preview/mixkit-rain-on-a-window-at-night-17686-large.mp4', image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-black/40 backdrop-blur border border-white/20 rounded-none', accent: 'white', isPremium: true },
  { id: 'premium-grid-retro', name: 'Synthwave 84', bg: 'bg-[#1a0b2e]', video: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-retro-wireframe-landscape-42861-large.mp4', image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1000', text: 'text-[#ff00ff]', button: 'bg-[#00ffff]/20 border-2 border-[#00ffff] text-[#00ffff] italic font-black shadow-[4px_4px_0px_#ff00ff]', accent: '#00ffff', isPremium: true },
  
  // CATEGORY: 3D ABSTRACT
  { id: 'premium-gold-flow', name: 'Liquid Gold', bg: 'bg-black', video: 'https://assets.mixkit.co/videos/preview/mixkit-golden-particles-slowly-falling-on-a-black-background-42774-large.mp4', image: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=1000', text: 'text-[#d4af37]', button: 'bg-white/5 backdrop-blur border border-[#d4af37] text-[#d4af37] rounded-full', accent: 'gold', isPremium: true },
  { id: 'premium-blue-waves', name: 'Oceanic 3D', bg: 'bg-[#001219]', video: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-flowing-blue-lines-background-27086-large.mp4', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-[#94d2bd]/10 border border-[#94d2bd] text-[#94d2bd] font-black', accent: '#94d2bd', isPremium: true },
  { id: 'premium-silk-ruby', name: 'Satin Ruby', bg: 'bg-[#450a0a]', video: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-red-motion-background-23136-large.mp4', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-white/20 backdrop-blur-xl border border-white/40 shadow-2xl', accent: 'white', isPremium: true },

  // CATEGORY: NATURE CINEMATIC
  { id: 'premium-forest-mist', name: 'Mist Valley', bg: 'bg-green-950', video: 'https://assets.mixkit.co/videos/preview/mixkit-morning-fog-in-a-coniferous-forest-12093-large.mp4', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-[#34d399] text-[#064e3b] font-black', accent: 'green', isPremium: true },
  { id: 'premium-snow-peak', name: 'Arctic Flow', bg: 'bg-slate-900', video: 'https://assets.mixkit.co/videos/preview/mixkit-snowy-mountains-and-dark-clouds-21652-large.mp4', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-white/10 backdrop-blur border border-white/20', accent: 'white', isPremium: true },
  { id: 'premium-space-nebula', name: 'Nova Core', bg: 'bg-black', video: 'https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1610-large.mp4', image: 'https://images.unsplash.com/photo-1475275083424-b4ff81625b60?auto=format&fit=crop&q=80&w=1000', text: 'text-[#a78bfa]', button: 'bg-white/5 border border-[#a78bfa]/30 text-white rounded-2xl', accent: 'purple', isPremium: true },

  // CATEGORY: MINIMAL 3D
  { id: 'premium-white-glass', name: 'Alabaster 3D', bg: 'bg-white', video: 'https://assets.mixkit.co/videos/preview/mixkit-white-abstract-lines-moving-12344-large.mp4', image: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&q=80&w=1000', text: 'text-secondary', button: 'bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-100 rounded-3xl', accent: 'gray', isPremium: true },
  { id: 'premium-dark-nodes', name: 'Dark Nexus', bg: 'bg-black', video: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-network-background-12345-large.mp4', image: 'https://images.unsplash.com/photo-1550645612-83f5d59c8a11?auto=format&fit=crop&q=80&w=1000', text: 'text-primary', button: 'bg-primary text-secondary font-black rounded-sm', accent: 'primary', isPremium: true },
  { id: 'premium-glass-prism', name: 'Prism Light', bg: 'bg-zinc-50', video: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-glass-prisms-background-12346-large.mp4', image: 'https://images.unsplash.com/photo-1555679486-e78709ca6d61?auto=format&fit=crop&q=80&w=1000', text: 'text-secondary', button: 'bg-white/80 backdrop-blur border border-white rounded-[40px] shadow-sm', accent: 'blue', isPremium: true },

  // MORE 3D & ANIMATED THEMES
  { id: 'premium-fire-vibe', name: 'Magma Core', bg: 'bg-black', video: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-fire-loop-background-12347-large.mp4', image: 'https://images.unsplash.com/photo-1521446704140-5e6089851610?auto=format&fit=crop&q=80&w=1000', text: 'text-orange-500', button: 'bg-orange-500/10 border-2 border-orange-500 text-orange-500 font-black italic', accent: 'orange', isPremium: true },
  { id: 'premium-tech-circuit', name: 'Core Engine', bg: 'bg-zinc-950', video: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-background-loop-12348-large.mp4', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000', text: 'text-blue-400', button: 'bg-blue-400/20 border border-blue-400/50 text-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.3)]', accent: 'blue', isPremium: true },
  { id: 'premium-dna-flow', name: 'Helix Pulse', bg: 'bg-indigo-950', video: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-dna-background-loop-12349-large.mp4', image: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-white/10 backdrop-blur rounded-full border-2 border-white/20', accent: 'indigo', isPremium: true },
  { id: 'premium-smoke-ink', name: 'Ink Bloom', bg: 'bg-white', video: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-ink-in-water-background-loop-12350-large.mp4', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1000', text: 'text-secondary', button: 'bg-secondary text-white font-black rounded-none transition-all hover:bg-primary hover:text-secondary', accent: 'black', isPremium: true },
  { id: 'premium-matrix', name: 'Data Stream', bg: 'bg-black', video: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-matrix-background-loop-12351-large.mp4', image: 'https://images.unsplash.com/photo-1510511459019-5dee2c147f2b?auto=format&fit=crop&q=80&w=1000', text: 'text-green-500', button: 'bg-green-500/20 border border-green-500 text-green-500 font-mono text-[10px]', accent: 'green', isPremium: true },
  { id: 'premium-desert-sun', name: 'Dune Drifters', bg: 'bg-orange-50', video: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-desert-background-loop-12352-large.mp4', image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&q=80&w=1000', text: 'text-[#4a3728]', button: 'bg-[#4a3728] text-white rounded-[24px]', accent: 'brown', isPremium: true },
  { id: 'premium-glitch', name: 'Apex Glitch', bg: 'bg-zinc-900', video: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-glitch-background-loop-12353-large.mp4', image: 'https://images.unsplash.com/photo-1629739884842-c3354d059881?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-rose-500 text-white font-black italic shadow-[-5px_5px_0px_#00ffff]', accent: 'red', isPremium: true },
  { id: 'premium-crystal', name: 'Emerald Gem', bg: 'bg-[#064e3b]', video: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-crystal-background-loop-12354-large.mp4', image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=1000', text: 'text-[#9ef01a]', button: 'bg-[#9ef01a]/10 border border-[#9ef01a] text-[#9ef01a] rounded-xl', accent: 'green', isPremium: true },
  { id: 'premium-vaporwave', name: 'Pastel Dream', bg: 'bg-pink-100', video: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-vaporwave-background-loop-12355-large.mp4', image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1000', text: 'text-pink-600', button: 'bg-white border-4 border-pink-400 text-pink-600 rounded-none shadow-[8px_8px_0px_rgba(244,114,182,0.3)]', accent: 'pink', isPremium: true },
  { id: 'premium-energy', name: 'Flux Core', bg: 'bg-black', video: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-energy-background-loop-12356-large.mp4', image: 'https://images.unsplash.com/photo-1544396821-4dd40b938ad3?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-primary text-secondary font-black rounded-lg transform hover:-translate-y-1 transition-all', accent: 'primary', isPremium: true },
  { id: 'premium-velvet', name: 'Velvet Flow', bg: 'bg-[#2e1065]', video: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-velvet-background-loop-12357-large.mp4', image: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-white/10 backdrop-blur-3xl border border-white/10 rounded-3xl', accent: 'purple', isPremium: true },
  { id: 'premium-cyber-lines', name: 'Grid Runner', bg: 'bg-black', video: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-cyber-lines-background-loop-12358-large.mp4', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000', text: 'text-cyan-400', button: 'bg-cyan-400/20 border border-cyan-400 text-cyan-400 font-bold tracking-tighter', accent: 'cyan', isPremium: true },
  { id: 'premium-liquid-mercury', name: 'Liquid Silver', bg: 'bg-zinc-800', video: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-liquid-silver-background-loop-12359-large.mp4', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-white text-zinc-900 font-black rounded-full border-4 border-zinc-200', accent: 'silver', isPremium: true },
  { id: 'premium-aurora-3d', name: 'Aurora Borealis', bg: 'bg-black', video: 'https://assets.mixkit.co/videos/preview/mixkit-aurora-borealis-on-a-starry-night-sky-12360-large.mp4', image: 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?auto=format&fit=crop&q=80&w=1000', text: 'text-[#6cf383]', button: 'bg-[#6cf383]/10 border border-[#6cf383]/30 text-[#6cf383]', accent: 'green', isPremium: true },
  { id: 'premium-lava', name: 'Pyro Vibe', bg: 'bg-[#450a0a]', video: 'https://assets.mixkit.co/videos/preview/mixkit-lava-background-loop-12361-large.mp4', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1000', text: 'text-orange-500', button: 'bg-black text-orange-500 border border-orange-500 rounded-none italic', accent: 'red', isPremium: true },
  { id: 'premium-sand-dunes', name: 'Sahara Breeze', bg: 'bg-orange-100', video: 'https://assets.mixkit.co/videos/preview/mixkit-sand-dunes-background-loop-12362-large.mp4', image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&q=80&w=1000', text: 'text-[#92400e]', button: 'bg-[#92400e] text-white rounded-full shadow-lg', accent: 'orange', isPremium: true },
  { id: 'premium-purple-haze', name: 'Nebula Flow', bg: 'bg-black', video: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-nebula-background-loop-12363-large.mp4', image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-purple-600/30 border border-purple-400 text-white rounded-xl', accent: 'purple', isPremium: true },
  { id: 'premium-carbon', name: 'Carbon Fiber', bg: 'bg-zinc-950', video: 'https://assets.mixkit.co/videos/preview/mixkit-carbon-fiber-background-loop-12364-large.mp4', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-white/5 border border-white/10 text-white font-black uppercase tracking-[0.2em] rounded-none', accent: 'gray', isPremium: true },
]
