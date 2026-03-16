export const THEMES = [
  { id: 'custom', name: 'Custom Color', bg: 'bg-white', text: 'text-secondary', button: 'bg-secondary text-white', accent: 'primary', isCustom: true },
  { id: 'classic-white', name: 'Classic White', bg: 'bg-white', text: 'text-secondary', button: 'bg-secondary text-white', accent: 'primary' },
  { id: 'classic-dark', name: 'Classic Dark', bg: 'bg-secondary', text: 'text-white', button: 'bg-white text-secondary', accent: 'primary' },
  { id: 'glass-blur', name: 'Glass Blur', bg: 'bg-gradient-to-br from-blue-100 to-purple-100', text: 'text-secondary', button: 'bg-white/40 backdrop-blur-md border border-white/20', accent: 'primary' },
  { id: 'ocean-deep', name: 'Ocean Deep', bg: 'bg-gradient-to-br from-blue-600 to-blue-900', text: 'text-white', button: 'bg-white/20 backdrop-blur-sm border border-white/10', accent: 'blue' },
  { id: 'sunset-glow', name: 'Sunset Glow', bg: 'bg-gradient-to-br from-orange-400 to-rose-400', text: 'text-white', button: 'bg-white text-secondary', accent: 'orange' },
  { id: 'cyber-neon', name: 'Cyber Neon', bg: 'bg-black', text: 'text-primary', button: 'border-2 border-primary text-primary', accent: 'primary' },
  { id: 'pastel-pink', name: 'Pastel Pink', bg: 'bg-[#ffedef]', text: 'text-[#ff4f6a]', button: 'bg-[#ff4f6a] text-white', accent: 'white' },
  { id: 'midnight-blue', name: 'Midnight Blue', bg: 'bg-[#191970]', text: 'text-white', button: 'bg-[#f0f8ff] text-secondary', accent: 'blue' },
  { id: 'vibrant-yellow', name: 'Vibrant Yellow', bg: 'bg-[#ffff00]', text: 'text-black', button: 'bg-black text-white', accent: 'yellow' },
  { id: 'grid-mocha', name: 'Grid Mocha', bg: 'bg-[#402020]', text: 'text-white', button: 'bg-[#FDF2E3] text-secondary', accent: '#FDF2E3', grid: true },
  
  // Lifestyle & Printed
  { id: 'happy-vibes', name: 'Happy Vibes', bg: 'bg-yellow-400', image: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=1000', text: 'text-secondary', button: 'bg-white/90 backdrop-blur text-secondary shadow-lg', accent: 'yellow' },
  { id: 'sad-mood', name: 'Inner Rain', bg: 'bg-slate-900', image: 'https://images.unsplash.com/photo-1516585421171-46bb90680e9a?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-black/40 backdrop-blur border border-white/20', accent: 'blue' },
  { id: 'love-red', name: 'Deep Love', bg: 'bg-rose-600', image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-white/20 backdrop-blur border border-white/30', accent: 'rose' },
  { id: 'flower-bloom', name: 'Flower Bloom', bg: 'bg-pink-100', image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=1000', text: 'text-[#2d3436]', button: 'bg-white/80 backdrop-blur text-secondary shadow-sm', accent: 'pink' },
  { id: 'super-car', name: 'Speed Night', bg: 'bg-zinc-900', image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-white/10 backdrop-blur border border-white/20', accent: 'red' },
  { id: 'motorcycle-ride', name: 'Open Road', bg: 'bg-stone-900', image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-black/50 backdrop-blur border border-white/10', accent: 'orange' },
  { id: 'black-design', name: 'Noir Texture', bg: 'bg-black', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-white text-black font-black', accent: 'white' },
  { id: 'white-design', name: 'Clean Marble', bg: 'bg-white', image: 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?auto=format&fit=crop&q=80&w=1000', text: 'text-secondary', button: 'bg-secondary text-white shadow-xl', accent: 'black' },
  
  // Curated Library Themes (Linktree Style)
  { id: 'agate', name: 'Agate', bg: 'bg-[#1b4332]', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-[#9ef01a] text-[#1b4332] font-black', accent: '#9ef01a' },
  { id: 'air', name: 'Air', bg: 'bg-[#f8fafc]', text: 'text-slate-600', button: 'bg-white border border-slate-200 text-slate-900 shadow-sm', accent: 'slate' },
  { id: 'astrid', name: 'Astrid', bg: 'bg-[#0f172a]', image: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-white/10 backdrop-blur border border-white/20', accent: 'white' },
  { id: 'aura', name: 'Aura', bg: 'bg-[#e2e8f0]', text: 'text-slate-900', button: 'bg-black/5 text-slate-800 border border-black/5', accent: 'slate' },
  { id: 'bliss', name: 'Bliss', bg: 'bg-white', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1000', text: 'text-secondary', button: 'bg-white/60 backdrop-blur shadow-sm', accent: 'gray' },
  { id: 'blocks', name: 'Blocks', bg: 'bg-[#7c3aed]', text: 'text-white', button: 'bg-[#fb7185] text-white font-bold', accent: '#fb7185' },
  { id: 'bloom', name: 'Bloom', bg: 'bg-[#ff7eb3]', image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-white/20 backdrop-blur border border-white/30', accent: 'white' },
  { id: 'breeze', name: 'Breeze', bg: 'bg-gradient-to-br from-[#a5f3fc] to-[#ddd6fe]', text: 'text-slate-800', button: 'bg-white/40 shadow-inner', accent: 'cyan' },
  { id: 'encore', name: 'Encore', bg: 'bg-[#111827]', image: 'https://images.unsplash.com/photo-1514525253344-99a6d5bdc04c?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-white/5 border border-white/10', accent: 'gray' },
  { id: 'grid', name: 'Grid', bg: 'bg-[#ecfccb]', text: 'text-slate-900', button: 'bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]', accent: 'slate', grid: true },
  { id: 'groove', name: 'Groove', bg: 'bg-[#f43f5e]', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-white/20 backdrop-blur border border-white/30', accent: 'white' },
  { id: 'haven', name: 'Haven', bg: 'bg-[#f5f5dc]', text: 'text-[#483c32]', button: 'bg-white shadow-lg border border-gray-100', accent: '#483c32' },
  { id: 'lake', name: 'Lake', bg: 'bg-[#1e1b4b]', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-black/30 backdrop-blur border border-white/10', accent: 'indigo' },
  { id: 'mineral', name: 'Mineral', bg: 'bg-[#fafaf9]', text: 'text-slate-800', button: 'bg-[#f5f5f4] border border-slate-200', accent: 'slate' },
  { id: 'nourish', name: 'Nourish', bg: 'bg-[#365314]', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-[#a3e635] text-[#1a2e05] font-black', accent: '#a3e635' },
  { id: 'rise', name: 'Rise', bg: 'bg-gradient-to-t from-[#f43f5e] to-[#fb923c]', text: 'text-white', button: 'bg-white/20 backdrop-blur border border-white/30', accent: 'white' },
  { id: 'sweat', name: 'Sweat', bg: 'bg-[#020617]', image: 'https://images.unsplash.com/photo-1540539234-c14a20fb7c7b?auto=format&fit=crop&q=80&w=1000', text: 'text-[#38bdf8]', button: 'bg-[#38bdf8]/10 border border-[#38bdf8]/30', accent: '#38bdf8' },
  { id: 'tress', name: 'Tress', bg: 'bg-[#451a03]', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1000', text: 'text-[#fcd34d]', button: 'bg-white/5 border border-white/10 shadow-xl', accent: '#fcd34d' },
  { id: 'twilight', name: 'Twilight', bg: 'bg-[#2e1065]', image: 'https://images.unsplash.com/photo-1472289065668-ce650ac443d2?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-[#d8b4fe]/20 backdrop-blur border border-[#d8b4fe]/30', accent: 'purple' },
  { id: 'vox', name: 'Vox', bg: 'bg-[#7f1d1d]', image: 'https://images.unsplash.com/photo-1560171963-70d1b25059bb?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-white text-red-900 font-extrabold', accent: 'red' },
  
  // Professional
  { id: 'executive-white', name: 'Executive White', bg: 'bg-slate-50', text: 'text-slate-900', button: 'bg-white border border-slate-200 text-slate-900 shadow-sm font-semibold hover:border-slate-400', accent: 'slate' },
  { id: 'modern-corporate', name: 'Modern Corporate', bg: 'bg-[#1e293b]', text: 'text-white', button: 'bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700', accent: 'blue' },
  { id: 'tech-minimal', name: 'Tech Minimal', bg: 'bg-[#0f172a]', text: 'text-slate-300', button: 'bg-slate-800 border border-slate-700 text-white rounded-md hover:bg-slate-700', accent: 'slate' },
  { id: 'business-slate', name: 'Business Slate', bg: 'bg-[#f8fafc]', text: 'text-[#334155]', button: 'bg-[#334155] text-white rounded-none border-b-4 border-[#1e293b]', accent: 'slate' }
]

