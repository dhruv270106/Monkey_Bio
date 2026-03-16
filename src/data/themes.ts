export const THEMES = [
  { id: 'custom', name: 'Custom Color', bg: 'bg-white', text: 'text-secondary', button: 'bg-secondary text-white', accent: 'primary', isCustom: true },
  
  // Clean Essentials (Reduced Redundancy)
  { id: 'classic-white', name: 'Classic White', bg: 'bg-[#ffffff]', text: 'text-secondary', button: 'bg-secondary text-white', accent: 'primary' },
  { id: 'classic-dark', name: 'Classic Dark', bg: 'bg-[#000000]', text: 'text-white', button: 'bg-white text-secondary', accent: 'primary' },
  { id: 'glass-light', name: 'Glass Light', bg: 'bg-gradient-to-br from-blue-50 to-purple-50', text: 'text-secondary', button: 'bg-white/40 backdrop-blur-md border border-white/20', accent: 'primary' },
  { id: 'glass-dark', name: 'Glass Dark', bg: 'bg-slate-900', text: 'text-white', button: 'bg-black/20 backdrop-blur-md border border-white/10', accent: 'primary' },
  
  // 30 NEW PREMIUM & PRINTED THEMES
  { 
    id: 'mesh-candy', 
    name: 'Mesh Candy', 
    bg: 'bg-[#ff7eb3]', 
    image: 'https://images.unsplash.com/photo-1557683311-eac922347aa1?auto=format&fit=crop&q=80&w=1000', 
    text: 'text-white', 
    button: 'bg-white/20 backdrop-blur border border-white/30 rounded-2xl', 
    accent: 'white' 
  },
  { 
    id: 'northern-lights', 
    name: 'Northern Lights', 
    bg: 'bg-black', 
    image: 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?auto=format&fit=crop&q=80&w=1000', 
    text: 'text-white', 
    button: 'bg-white/10 backdrop-blur border border-white/10 text-[#6cf383]', 
    accent: '#6cf383' 
  },
  { 
    id: 'cyber-city', 
    name: 'Cyber City', 
    bg: 'bg-[#0f172a]', 
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7da05?auto=format&fit=crop&q=80&w=1000', 
    text: 'text-white', 
    button: 'bg-primary text-secondary font-black border-4 border-secondary shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]', 
    accent: 'primary' 
  },
  { 
    id: 'luxury-gold', 
    name: 'Luxury Gold', 
    bg: 'bg-[#1a1a1a]', 
    text: 'text-[#d4af37]', 
    button: 'bg-[#d4af37]/10 border-2 border-[#d4af37] text-[#d4af37] font-bold', 
    accent: '#d4af37' 
  },
  { 
    id: 'deep-forest', 
    name: 'Deep Forest', 
    bg: 'bg-[#064e3b]', 
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1000', 
    text: 'text-white', 
    button: 'bg-[#34d399] text-[#064e3b] font-black rounded-none', 
    accent: '#34d399' 
  },
  { 
    id: 'abstract-lava', 
    name: 'Abstract Lava', 
    bg: 'bg-[#000000]', 
    image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1000', 
    text: 'text-white', 
    button: 'bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20', 
    accent: 'red' 
  },
  { 
    id: 'neo-lime', 
    name: 'Neo Lime', 
    bg: 'bg-[#dcfce7]', 
    text: 'text-secondary', 
    button: 'bg-[#6cf383] text-secondary border-4 border-secondary shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-black uppercase tracking-widest', 
    accent: '#6cf383' 
  },
  { 
    id: 'royal-velvet', 
    name: 'Royal Velvet', 
    bg: 'bg-[#310404]', 
    text: 'text-[#ffb7b7]', 
    button: 'bg-[#ff4f6a] text-white rounded-full shadow-2xl', 
    accent: '#ff4f6a' 
  },
  { 
    id: 'mountain-mist', 
    name: 'Mountain Mist', 
    bg: 'bg-slate-100', 
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000', 
    text: 'text-secondary', 
    button: 'bg-white/80 backdrop-blur text-secondary font-bold shadow-lg', 
    accent: 'slate' 
  },
  { 
    id: 'desert-storm', 
    name: 'Desert Storm', 
    bg: 'bg-[#f5e6d3]', 
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&q=80&w=1000', 
    text: 'text-[#4a3728]', 
    button: 'bg-[#4a3728] text-white rounded-xl', 
    accent: '#4a3728' 
  },
  { 
    id: 'ocean-wave', 
    name: 'Ocean Wave', 
    bg: 'bg-[#0077b6]', 
    image: 'https://images.unsplash.com/photo-1505118380757-91f5f45d8de0?auto=format&fit=crop&q=80&w=1000', 
    text: 'text-white', 
    button: 'bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center', 
    accent: 'white' 
  },
  { 
    id: 'minimal-noir', 
    name: 'Minimal Noir', 
    bg: 'bg-[#121212]', 
    text: 'text-[#a0a0a0]', 
    button: 'bg-[#1a1a1a] border border-[#2a2a2a] text-white font-medium hover:border-primary', 
    accent: 'primary' 
  },
  { 
    id: 'cotton-candy', 
    name: 'Cotton Candy', 
    bg: 'bg-gradient-to-br from-[#ff9a9e] to-[#fad0c4]', 
    text: 'text-[#2d3436]', 
    button: 'bg-white/30 backdrop-blur shadow-sm rounded-3xl', 
    accent: 'pink' 
  },
  { 
    id: 'tech-grid', 
    name: 'Tech Grid', 
    bg: 'bg-[#000000]', 
    text: 'text-[#00ffcc]', 
    button: 'bg-[#003322] border-2 border-[#00ffcc] text-[#00ffcc] shadow-[0_0_15px_rgba(0,255,204,0.3)]', 
    accent: '#00ffcc', 
    grid: true 
  },
  { 
    id: 'vintage-cream', 
    name: 'Vintage Cream', 
    bg: 'bg-[#fff5e1]', 
    text: 'text-[#8b5e3c]', 
    button: 'border-2 border-[#8b5e3c] text-[#8b5e3c] bg-transparent hover:bg-[#8b5e3c] hover:text-white', 
    accent: '#8b5e3c' 
  },
  { 
    id: 'midnight-sakura', 
    name: 'Midnight Sakura', 
    bg: 'bg-[#0e0c0c]', 
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1000', 
    text: 'text-[#ff6b6b]', 
    button: 'bg-[#ff6b6b]/10 border border-[#ff6b6b]/20 text-[#ff6b6b] rounded-pill', 
    accent: '#ff6b6b' 
  },
  { 
    id: 'marble-stone', 
    name: 'Marble Stone', 
    bg: 'bg-[#f3f4f6]', 
    image: 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?auto=format&fit=crop&q=80&w=1000', 
    text: 'text-secondary', 
    button: 'bg-white border border-gray-100 shadow-xl font-black text-xs uppercase tracking-widest', 
    accent: 'black' 
  },
  { 
    id: 'retro-80s', 
    name: 'Retro 80s', 
    bg: 'bg-[#2b0057]', 
    image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1000', 
    text: 'text-[#ff00ff]', 
    button: 'bg-[#00ffff]/20 border-2 border-[#00ffff] text-[#00ffff] font-black italic shadow-[4px_4px_0px_0px_#ff00ff]', 
    accent: '#00ffff' 
  },
  { 
    id: 'zen-garden', 
    name: 'Zen Garden', 
    bg: 'bg-[#f1f2ed]', 
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000', 
    text: 'text-[#5d6049]', 
    button: 'bg-white/40 border border-[#5d6049]/10 text-[#5d6049]', 
    accent: '#5d6049' 
  },
  { 
    id: 'urban-street', 
    name: 'Urban Street', 
    bg: 'bg-zinc-900', 
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1000', 
    text: 'text-white', 
    button: 'bg-primary text-secondary font-black border-none px-8 py-5', 
    accent: 'primary' 
  },
  { 
    id: 'space-nebula', 
    name: 'Space Nebula', 
    bg: 'bg-black', 
    image: 'https://images.unsplash.com/photo-1464802686167-b939a67e06a1?auto=format&fit=crop&q=80&w=1000', 
    text: 'text-white', 
    button: 'bg-white/5 backdrop-blur border border-white/10 rounded-xl', 
    accent: 'purple' 
  },
  { 
    id: 'boho-terracotta', 
    name: 'Boho Terracotta', 
    bg: 'bg-[#e2725b]', 
    text: 'text-white', 
    button: 'bg-[#fdf2e3] text-[#e2725b] border-2 border-[#fdf2e3] font-black', 
    accent: '#fdf2e3' 
  },
  { 
    id: 'modern-slate', 
    name: 'Modern Slate', 
    bg: 'bg-[#0f172a]', 
    text: 'text-slate-100', 
    button: 'bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 rounded-none transform transition-all', 
    accent: 'slate' 
  },
  { 
    id: 'lavender-sky', 
    name: 'Lavender Sky', 
    bg: 'bg-gradient-to-t from-[#c471ed] to-[#f64f59]', 
    text: 'text-white', 
    button: 'bg-white/20 backdrop-blur border border-white/20 rounded-full', 
    accent: 'white' 
  },
  { 
    id: 'copper-night', 
    name: 'Copper Night', 
    bg: 'bg-[#1a0f0f]', 
    text: 'text-[#d97706]', 
    button: 'bg-transparent border-2 border-[#d97706] text-[#d97706] rounded-md font-bold', 
    accent: '#d97706' 
  },
  { 
    id: 'deep-sea', 
    name: 'Deep Sea', 
    bg: 'bg-[#001219]', 
    image: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&q=80&w=1000', 
    text: 'text-[#94d2bd]', 
    button: 'bg-[#94d2bd]/10 border border-[#94d2bd]/30 text-[#94d2bd]', 
    accent: '#94d2bd' 
  },
  { 
    id: 'organic-clay', 
    name: 'Organic Clay', 
    bg: 'bg-[#d2b48c]', 
    text: 'text-[#5d4037]', 
    button: 'bg-[#5d4037] text-white rounded-none border-b-8 border-[#3e2723]', 
    accent: '#5d4037' 
  },
  { 
    id: 'techno-mesh', 
    name: 'Techno Mesh', 
    bg: 'bg-[#000000]', 
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000', 
    text: 'text-primary', 
    button: 'bg-secondary text-primary border-2 border-primary shadow-[0_0_20px_rgba(108,243,131,0.2)]', 
    accent: 'primary' 
  },
  { 
    id: 'vivid-violet', 
    name: 'Vivid Violet', 
    bg: 'bg-gradient-to-tr from-[#4c1d95] to-[#7c3aed]', 
    text: 'text-white', 
    button: 'bg-[#a78bfa] text-white border-2 border-white/20 shadow-lg', 
    accent: 'white' 
  },
  { 
    id: 'matcha-minimal', 
    name: 'Matcha Minimal', 
    bg: 'bg-[#f0f9f1]', 
    text: 'text-[#166534]', 
    button: 'bg-[#166534] text-white rounded-xl shadow-inner', 
    accent: '#166534' 
  },
  { 
    id: 'dark-royal', 
    name: 'Dark Royal', 
    bg: 'bg-[#020617]', 
    text: 'text-white', 
    button: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-lg', 
    accent: 'blue' 
  },
  { 
    id: 'retro-grid', 
    name: 'Retro Grid', 
    bg: 'bg-[#fef9f1]', 
    text: 'text-secondary', 
    button: 'bg-white border-4 border-secondary shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]', 
    accent: 'secondary', 
    grid: true 
  },
  { 
    id: 'neon-plasma', 
    name: 'Neon Plasma', 
    bg: 'bg-black', 
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000', 
    text: 'text-white', 
    button: 'bg-white text-secondary font-black mix-blend-screen', 
    accent: 'white' 
  },
  { 
    id: 'clean-marble', 
    name: 'Clean Marble', 
    bg: 'bg-white', 
    image: 'https://images.unsplash.com/photo-1618221651586-77891823908f?auto=format&fit=crop&q=80&w=1000', 
    text: 'text-secondary', 
    button: 'bg-secondary text-white font-bold tracking-tighter', 
    accent: 'secondary' 
  }
]
