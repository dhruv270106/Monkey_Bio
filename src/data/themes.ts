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
  
  // --- FREE THEMES ---
  { id: 'mountain-mist', name: 'Mountain Mist', bg: 'bg-slate-100', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000', text: 'text-secondary', button: 'bg-white/80 backdrop-blur text-secondary font-bold shadow-lg', accent: 'slate' },
  { id: 'desert-storm', name: 'Desert Storm', bg: 'bg-[#f5e6d3]', image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&q=80&w=1000', text: 'text-[#4a3728]', button: 'bg-[#4a3728] text-white rounded-xl', accent: '#4a3728' },
  { id: 'midnight-sakura', name: 'Midnight Sakura', bg: 'bg-[#0e0c0c]', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1000', text: 'text-[#ff6b6b]', button: 'bg-[#ff6b6b]/10 border border-[#ff6b6b]/20 text-[#ff6b6b] rounded-pill', accent: '#ff6b6b' },
  { id: 'retro-80s', name: 'Retro 80s', bg: 'bg-[#2b0057]', image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1000', text: 'text-[#ff00ff]', button: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black italic shadow-2xl', accent: '#00ffff' },
  { id: 'urban-street', name: 'Urban Street', bg: 'bg-zinc-900', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-primary text-secondary font-black border-none px-8 py-5', accent: 'primary' },
  { id: 'bliss', name: 'Bliss', bg: 'bg-white', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1000', text: 'text-secondary', button: 'bg-white/90 backdrop-blur-md shadow-2xl border border-gray-100', accent: 'gray' },
  { id: 'matcha', name: 'Matcha Zen', bg: 'bg-[#e8f3e8]', image: 'https://images.unsplash.com/photo-1582733315364-84bb9045ea72?auto=format&fit=crop&q=80&w=1000', text: 'text-[#2d5a27]', button: 'bg-[#2d5a27] text-white rounded-2xl shadow-xl', accent: '#2d5a27' },
  { id: 'lavender', name: 'Soft Lavender', bg: 'bg-[#f3e8ff]', image: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?auto=format&fit=crop&q=80&w=1000', text: 'text-[#581c87]', button: 'bg-[#581c87] text-white rounded-full shadow-lg', accent: '#a855f7' },
  { id: 'dark-glass', name: 'Glass Dark', bg: 'bg-[#121212]', text: 'text-white', button: 'bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-3xl pb-1', accent: 'white' },
  
  // --- PREMIUM THEMES (Cinematic & High-End Asset Focus) ---
  { id: 'premium-cyber-neon', name: 'Neon Genesis', bg: 'bg-black', video: 'https://assets.mixkit.co/videos/preview/mixkit-neon-light-strips-flashing-in-a-dark-room-40245-large.mp4', text: 'text-white', button: 'bg-white/10 backdrop-blur-2xl border border-white/20 text-white rounded-[40px] shadow-2xl', accent: 'white', isPremium: true },
  { id: 'premium-liquid-mercury', name: 'Silver Surf', bg: 'bg-zinc-800', video: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-liquid-silver-background-loop-12359-large.mp4', text: 'text-white', button: 'bg-white text-zinc-900 font-extrabold rounded-none transform skew-x-2 shadow-[10px_10px_0px_rgba(255,255,255,0.2)]', accent: 'silver', isPremium: true },
  { id: 'premium-silk-ruby', name: 'Satin Ruby', bg: 'bg-[#450a0a]', video: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-red-motion-background-23136-large.mp4', text: 'text-white', button: 'bg-black/30 backdrop-blur-3xl border border-white/10 text-white rounded-none font-black tracking-widest uppercase', accent: 'red', isPremium: true },
  { id: 'premium-blue-waves', name: 'Hydro Kinetic', bg: 'bg-[#001219]', video: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-flowing-blue-lines-background-27086-large.mp4', text: 'text-white', button: 'bg-cyan-500/20 backdrop-blur-lg border-2 border-cyan-400 text-cyan-400 font-black rounded-3xl shadow-[0_0_20px_rgba(34,211,238,0.3)]', accent: 'cyan', isPremium: true },
  { id: 'premium-white-smoke', name: 'Ethereal Cloud', bg: 'bg-white', video: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-white-smoke-on-a-black-background-40243-large.mp4', text: 'text-white', button: 'bg-white/20 backdrop-blur-3xl border border-white/40 text-white rounded-[50px] font-black italic shadow-2xl', accent: 'white', isPremium: true },
  { id: 'premium-gold-luxury', name: 'Royal Gilt', bg: 'bg-black', video: 'https://assets.mixkit.co/videos/preview/mixkit-golden-particles-slowly-falling-on-a-black-background-42774-large.mp4', text: 'text-[#d4af37]', button: 'bg-gradient-to-r from-[#d4af37] to-[#f9e498] text-black font-black rounded-none shadow-2xl', accent: 'gold', isPremium: true },
  { id: 'premium-deep-space', name: 'Andromeda', bg: 'bg-black', video: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-nebula-background-loop-12363-large.mp4', text: 'text-white', button: 'bg-white/5 backdrop-blur-2xl border border-indigo-500/50 text-white rounded-2xl font-black tracking-tighter italic shadow-[0_0_30px_rgba(99,102,241,0.2)]', accent: 'indigo', isPremium: true },
  { id: 'premium-plasma-green', name: 'Toxic Glow', bg: 'bg-black', video: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-energy-background-loop-12356-large.mp4', text: 'text-white', button: 'bg-[#6cf383] text-black font-black rounded-xl shadow-[5px_5px_0px_#22c55e]', accent: '#6cf383', isPremium: true },
  { id: 'premium-ocean-mystery', name: 'Dark Depths', bg: 'bg-black', video: 'https://assets.mixkit.co/videos/preview/mixkit-curvy-blue-lines-on-a-black-background-42777-large.mp4', text: 'text-[#0077b6]', button: 'bg-[#0077b6]/10 backdrop-blur-3xl border border-[#90e0ef]/30 text-[#90e0ef] font-mono rounded-none tracking-[0.2em]', accent: 'blue', isPremium: true },
  
  // High-End Static Premium Themes (Mesh Gradients & Glassmorphism)
  { id: 'premium-mesh-1', name: 'Solaris Mesh', bg: 'bg-white', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000', text: 'text-secondary', button: 'bg-white/40 backdrop-blur-2xl border border-white/50 shadow-2xl text-secondary font-black rounded-[40px]', accent: 'orange', isPremium: true },
  { id: 'premium-mesh-2', name: 'Arctic Dawn', bg: 'bg-white', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1000', text: 'text-[#2a4365]', button: 'bg-[#2a4365] text-white rounded-none shadow-[8px_8px_0px_rgba(42,67,101,0.2)] font-black', accent: 'blue', isPremium: true },
  { id: 'premium-glass-color', name: 'Aura Glass', bg: 'bg-white', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-white/10 backdrop-blur-3xl border border-white/20 text-white rounded-[50px] shadow-inner font-bold italic', accent: 'purple', isPremium: true },
  { id: 'premium-obsidian', name: 'Obsidian Velvet', bg: 'bg-[#0a0a0a]', image: 'https://images.unsplash.com/photo-1550684847-75bdda21cc95?auto=format&fit=crop&q=80&w=1000', text: 'text-[#D2E823]', button: 'bg-[#D2E823] text-black font-black uppercase rounded-[2px] shadow-[0_0_15px_rgba(210,232,35,0.4)]', accent: 'lime', isPremium: true },
];
