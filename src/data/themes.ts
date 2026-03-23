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
  
  // FREE THEMES (Clean & Standard)
  { id: 'mountain-mist', name: 'Mountain Mist', bg: 'bg-slate-100', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000', text: 'text-secondary', button: 'bg-white/80 backdrop-blur text-secondary font-bold shadow-lg', accent: 'slate' },
  { id: 'desert-storm', name: 'Desert Storm', bg: 'bg-[#f5e6d3]', image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&q=80&w=1000', text: 'text-[#4a3728]', button: 'bg-[#4a3728] text-white rounded-xl', accent: '#4a3728' },
  { id: 'midnight-sakura', name: 'Midnight Sakura', bg: 'bg-[#0e0c0c]', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1000', text: 'text-[#ff6b6b]', button: 'bg-[#ff6b6b]/10 border border-[#ff6b6b]/20 text-[#ff6b6b] rounded-pill', accent: '#ff6b6b' },
  { id: 'retro-80s', name: 'Retro 80s', bg: 'bg-[#2b0057]', image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1000', text: 'text-[#ff00ff]', button: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black italic shadow-2xl', accent: '#00ffff' },
  { id: 'urban-street', name: 'Urban Street', bg: 'bg-zinc-900', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-primary text-secondary font-black border-none px-8 py-5', accent: 'primary' },
  { id: 'bliss', name: 'Bliss', bg: 'bg-white', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1000', text: 'text-secondary', button: 'bg-white/90 backdrop-blur-md shadow-2xl border border-gray-100', accent: 'gray' },

  // PREMIUM THEMES (Cinematic & High-End Asset Focus)
  { id: 'premium-cyber-neon', name: 'Neon Genesis', bg: 'bg-black', video: 'https://assets.mixkit.co/videos/preview/mixkit-neon-light-strips-flashing-in-a-dark-room-40245-large.mp4', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-white/10 backdrop-blur-2xl border border-white/20 text-white rounded-[40px] shadow-2xl hover:scale-105 active:scale-95 transition-all', accent: 'white', isPremium: true },
  { id: 'premium-liquid-mercury', name: 'Silver Surf', bg: 'bg-zinc-800', video: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-liquid-silver-background-loop-12359-large.mp4', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-white text-zinc-900 font-extrabold rounded-none transform hover:skew-x-2 transition-transform shadow-[10px_10px_0px_rgba(255,255,255,0.2)]', accent: 'silver', isPremium: true },
  { id: 'premium-silk-ruby', name: 'Satin Ruby', bg: 'bg-[#450a0a]', video: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-red-motion-background-23136-large.mp4', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-black/30 backdrop-blur-3xl border border-white/10 text-white rounded-none font-black tracking-widest uppercase hover:bg-black/50 transition-all', accent: 'red', isPremium: true },
  { id: 'premium-blue-waves', name: 'Hydro Kinetic', bg: 'bg-[#001219]', video: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-flowing-blue-lines-background-27086-large.mp4', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-cyan-500/20 backdrop-blur-lg border-2 border-cyan-400 text-cyan-400 font-black rounded-3xl shadow-[0_0_20px_rgba(34,211,238,0.3)]', accent: 'cyan', isPremium: true },
  { id: 'premium-white-smoke', name: 'Ethereal Cloud', bg: 'bg-white', video: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-white-smoke-on-a-black-background-40243-large.mp4', image: 'https://images.unsplash.com/photo-1513346030248-b7af0f8b800f?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-white/20 backdrop-blur-3xl border border-white/40 text-white rounded-[50px] font-black italic shadow-2xl', accent: 'white', isPremium: true },
  { id: 'premium-gold-luxury', name: 'Royal Gilt', bg: 'bg-black', video: 'https://assets.mixkit.co/videos/preview/mixkit-golden-particles-slowly-falling-on-a-black-background-42774-large.mp4', image: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=1000', text: 'text-[#d4af37]', button: 'bg-gradient-to-r from-[#d4af37] to-[#f9e498] text-black font-black rounded-none shadow-2xl hover:scale-[1.02] active:scale-95 transition-all', accent: 'gold', isPremium: true },
  { id: 'premium-deep-space', name: 'Andromeda', bg: 'bg-black', video: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-nebula-background-loop-12363-large.mp4', image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-white/5 backdrop-blur-2xl border border-indigo-500/50 text-white rounded-2xl font-black tracking-tighter italic shadow-[0_0_30px_rgba(99,102,241,0.2)]', accent: 'indigo', isPremium: true },
  { id: 'premium-plasma-green', name: 'Toxic Glow', bg: 'bg-black', video: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-energy-background-loop-12356-large.mp4', image: 'https://images.unsplash.com/photo-1544396821-4dd40b938ad3?auto=format&fit=crop&q=80&w=1000', text: 'text-white', button: 'bg-[#6cf383] text-black font-black rounded-xl shadow-[5px_5px_0px_#22c55e] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all', accent: '#6cf383', isPremium: true },
  { id: 'premium-ocean-mystery', name: 'Dark Depths', bg: 'bg-black', video: 'https://assets.mixkit.co/videos/preview/mixkit-curvy-blue-lines-on-a-black-background-42777-large.mp4', image: 'https://images.unsplash.com/photo-1518443855757-dfadac7101ad?auto=format&fit=crop&q=80&w=1000', text: 'text-[#0077b6]', button: 'bg-[#0077b6]/10 backdrop-blur-3xl border border-[#90e0ef]/30 text-[#90e0ef] font-mono rounded-none tracking-[0.2em] px-10 py-6', accent: 'blue', isPremium: true },
];
