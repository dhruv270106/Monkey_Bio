'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { TEMPLATES, TEMPLATE_CATEGORIES, Template } from '@/data/templates'
import { THEMES, Theme } from '@/data/themes'
import { supabase } from '@/lib/supabase'
import Lenis from 'lenis'
import { 
  Palette, 
  Search, 
  Plus, 
  Crown, 
  Lock, 
  Eye, 
  Check, 
  ArrowRight,
  TrendingUp,
  Layout,
  Layers,
  Sparkles,
  X,
  Smartphone,
  ChevronRight,
  Zap
} from 'lucide-react'

// --- ANIMATION VARIANTS ---

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
}

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// --- COMPONENTS ---

export default function TemplatesPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lenis = new Lenis()
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    
    async function getUserData() {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        const { data: profile } = await supabase
          .from('monkey_bio')
          .select('*')
          .eq('id', session.user.id)
          .single()
        setUser(profile ?? null)
      }
    }
    getUserData()

    return () => lenis.destroy()
  }, [])

  const filteredTemplates = TEMPLATES.filter(
    (t) => selectedCategory === 'All' || t.category === selectedCategory
  )

  const handleCreateLinktree = async (template: Template) => {
    if (!user) {
      localStorage.setItem('pendingTheme', template.themeId)
      router.push('/login?redirect=/templates')
      return
    }

    if (template.isPremium && user.plan_status !== 'premium') {
       alert('This is a Premium Template! Please upgrade your plan to unlock.')
       return
    }

    setLoading(true)
    const selectedTheme = THEMES.find(t => t.id === template.themeId)
    
    if (selectedTheme) {
      const { error } = await supabase
        .from('monkey_bio')
        .update({ theme: selectedTheme.id })
        .eq('id', user.id)

      if (error) {
        alert('Error updating theme: ' + error.message)
      } else {
        router.push('/dashboard?tab=design')
      }
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#f6f6f6] selection:bg-[#d8ef2c] selection:text-[#4d5700] font-sans antialiased text-[#2d2f2f]">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-8 overflow-hidden bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 space-y-8 text-center md:text-left"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#d8ef2c] text-[#4d5700] text-[10px] font-black tracking-widest uppercase">
              Curated Styles
            </span>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[1.1] text-[#2d2f2f] uppercase">
                Choose Your <span className="text-[#576100] italic">Perfect</span> Template
            </h1>
            <p className="text-xl lg:text-2xl text-[#5a5c5c] leading-relaxed max-w-xl mx-auto md:mx-0 font-medium capitalize">
                Select from a variety of customizable templates to match your style. From professional portfolios to personal blogs.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 relative hidden lg:block"
          >
            <div className="w-full aspect-square rounded-[2rem] overflow-hidden bg-gray-50 relative z-10 shadow-2xl border-8 border-white">
              <img 
                src="/images/templates_hero_showcase.png" 
                className="w-full h-full object-cover" 
                alt="3D Template Showcase"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            {/* Glass Badge */}
            <div className="absolute -bottom-10 -left-10 p-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl z-20 border border-white/40 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#d8ef2c] flex items-center justify-center">
                <Palette className="text-[#4d5700]" size={24} />
              </div>
              <div>
                <p className="font-black text-[#2d2f2f] uppercase text-xs">100% Customizable</p>
                <p className="text-[10px] font-bold text-[#5a5c5c] uppercase opacity-60">Change every detail</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- HORIZONTAL CATEGORIES --- */}
      <div className="sticky top-[80px] z-[40] bg-[#f6f6f6]/80 backdrop-blur-xl border-b border-gray-200/50 py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
           <div className="flex items-center gap-2 text-[#2d2f2f] font-black mr-4 shrink-0 uppercase text-[10px] tracking-widest text-gray-400">
              <Layout size={14} /> Filter
           </div>
           <div 
             ref={scrollRef}
             className="flex gap-2 overflow-x-auto scrollbar-hide no-scrollbar flex-1 pb-1"
           >
              {TEMPLATE_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest transition-all border ${
                    selectedCategory === cat
                      ? 'bg-[#576100] text-[#d8ef2c] border-[#576100] shadow-lg shadow-[#576100]/20'
                      : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
           </div>
        </div>
      </div>

      {/* --- TEMPLATES GRID --- */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredTemplates.map((template) => {
              const isLocked = template.isPremium && user?.plan_status !== 'premium';
              return (
                <motion.div
                  key={template.id}
                  layout
                  variants={fadeIn}
                  className="group flex flex-col gap-5"
                >
                  {/* Card Image */}
                  <div 
                    className="aspect-[4/5] bg-white rounded-[2rem] overflow-hidden relative shadow-sm group-hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white"
                  >
                      <img 
                        src={template.image} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        alt={template.name} 
                      />
                      
                      {/* Floating Info */}
                      <div className="absolute top-6 right-6 flex flex-col gap-2">
                         {template.isPremium && (
                           <div className={`px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest shadow-xl flex items-center gap-1.5 ${
                             isLocked ? 'bg-black/50 text-white backdrop-blur-md' : 'bg-[#d8ef2c] text-[#4d5700]'
                           }`}>
                             {isLocked ? <Lock size={10} /> : <Crown size={10} />}
                             {isLocked ? 'Locked' : 'Premium'}
                           </div>
                         )}
                         <div className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#2d2f2f] text-[8px] font-black uppercase tracking-widest shadow-xl">
                            {template.category}
                         </div>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4 p-8">
                         <button 
                           onClick={() => setSelectedTemplate(template)}
                           className="w-full py-4 bg-white text-[#576100] rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-2"
                         >
                            <Eye size={16} /> Preview
                         </button>
                         <button 
                           onClick={() => handleCreateLinktree(template)}
                           className="w-full py-4 bg-[#d8ef2c] text-[#4d5700] rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl"
                         >
                            Use Template
                         </button>
                      </div>
                  </div>

                  {/* Text Info */}
                  <div className="px-2">
                    <h3 className="text-lg font-black text-[#2d2f2f] uppercase tracking-tighter group-hover:text-[#576100] transition-colors">
                        {template.name}
                    </h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                        {template.isPremium ? 'Premium Plan Required' : 'Free Forever'}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* --- PREVIEW MODAL --- */}
      <AnimatePresence>
        {selectedTemplate && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0c0f0f]/80 backdrop-blur-xl" 
              onClick={() => setSelectedTemplate(null)} 
            />
            
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              className="relative w-full max-w-6xl bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] flex flex-col md:flex-row h-[95vh] md:h-auto max-h-[95vh] border border-white/20"
            >
              <button 
                onClick={() => setSelectedTemplate(null)}
                className="absolute top-8 right-8 w-12 h-12 bg-white/10 hover:bg-white/20 text-black md:text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all z-[210] md:bg-white/20"
              >
                <X size={20} />
              </button>

              {/* Top Side (Mobile) / Right Side (Desktop): Mock Phone Preview */}
              <div className="w-full md:w-[45%] bg-[#0c0f0f] p-6 md:p-20 flex items-center justify-center relative overflow-hidden shrink-0 h-[40%] md:h-auto order-1 md:order-2">
                  {/* Phone Shell */}
                  <div className="w-full max-w-[160px] md:max-w-[320px] aspect-[9/19] rounded-[24px] md:rounded-[48px] border-[6px] md:border-[12px] border-[#1e2323] shadow-2xl relative overflow-hidden bg-white ring-1 ring-white/10 scale-90 md:scale-100">
                     <ThemePreviewContent 
                       themeId={selectedTemplate.themeId} 
                       templateId={selectedTemplate.id} 
                       overrideImage={selectedTemplate.image} 
                       isMini={true}
                     />
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 md:w-32 h-4 md:h-8 bg-[#1e2323] rounded-b-[10px] md:rounded-b-[20px] z-50 shadow-inner"></div>
                  </div>

                  {/* Decorative Glows */}
                  <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#d8ef2c]/10 rounded-full blur-[100px]" />
                  <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]" />
              </div>

              {/* Bottom Side (Mobile) / Left Side (Desktop): Info */}
              <div className="flex-1 p-6 md:p-20 flex flex-col justify-start md:justify-center overflow-y-auto order-2 md:order-1 h-[60%] md:h-auto">
                <nav className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8">
                   <span>Templates</span>
                   <ChevronRight size={10} />
                   <span className="text-[#576100]">{selectedTemplate.name}</span>
                </nav>

                <h2 className="text-3xl md:text-7xl font-black text-[#2d2f2f] mb-4 md:mb-8 uppercase tracking-tighter leading-none">
                    {selectedTemplate.name}
                </h2>
                <p className="text-sm md:text-xl font-medium text-[#5a5c5c] mb-6 md:mb-12 leading-relaxed">
                  {selectedTemplate.description}
                </p>

                <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-12">
                   <div className="p-4 md:p-6 bg-gray-50 rounded-2xl border border-gray-100">
                      <Zap className="text-[#576100] mb-2 md:mb-3" size={16} />
                      <p className="font-black text-[8px] md:text-[10px] uppercase tracking-widest text-[#2d2f2f]">Fast Loading</p>
                   </div>
                   <div className="p-4 md:p-6 bg-gray-50 rounded-2xl border border-gray-100">
                      <Sparkles className="text-[#576100] mb-2 md:mb-3" size={16} />
                      <p className="font-black text-[8px] md:text-[10px] uppercase tracking-widest text-[#2d2f2f]">SEO Optimized</p>
                   </div>
                </div>

                <button
                  onClick={() => handleCreateLinktree(selectedTemplate)}
                  disabled={loading}
                  className="w-full md:w-fit px-8 py-5 md:px-12 md:py-6 bg-[#d8ef2c] hover:bg-[#cbe01d] text-[#4d5700] font-black rounded-full text-lg md:text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 uppercase tracking-[0.1em]"
                >
                  {loading ? (
                    <div className="w-5 h-5 md:w-6 md:h-6 border-4 border-[#4d5700]/20 border-t-[#4d5700] rounded-full animate-spin" />
                  ) : (
                    <>Use Template <ArrowRight size={18} /></>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- HOW IT WORKS (BENTO) --- */}
      <section className="py-24 md:py-32 px-6 bg-[#f0f1f1]/50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center space-y-4">
            <span className="text-[#576100] font-black uppercase tracking-[0.3em] text-xs">Steps to Start</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-[#2d2f2f]">Customize Your Template</h2>
            <p className="text-xl text-[#5a5c5c] max-w-2xl mx-auto font-medium">Transform any layout into your personal digital home in three simple steps.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                step: 1, 
                title: "Select a Template", 
                desc: "Choose a design that fits your style. Browse our library of professionally crafted layouts.",
                icon: <Layout className="text-[#576100]" size={36} />
              },
              { 
                step: 2, 
                title: "Personalize It", 
                desc: "Add your links, images, and colors. Our intuitive editor makes customization effortless.",
                icon: <Palette className="text-[#576100]" size={36} />
              },
              { 
                step: 3, 
                title: "Publish", 
                desc: "Share your personalized link with the world across all your social platforms instantly.",
                icon: <Plus className="text-[#576100]" size={36} />
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                variants={fadeIn}
                whileHover={{ y: -10 }}
                className="p-10 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col items-start space-y-6 hover:shadow-2xl transition-all h-full"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#d8ef2c] flex items-center justify-center text-[#4d5700] font-black text-2xl shadow-xl">
                    {item.step}
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter text-[#2d2f2f]">{item.title}</h3>
                <p className="text-[#5a5c5c] leading-relaxed font-medium">{item.desc}</p>
                <div className="mt-auto pt-8 opacity-10">
                    {item.icon}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-24 md:py-32 bg-[#0c0f0f] text-white px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#576100]/20 rounded-full blur-[120px] -ml-40 -mt-40" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-20 uppercase">What Creators Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            {[
              {
                name: "Elena Rodriguez",
                role: "Digital Artist",
                text: "Monkey Bio changed how I monetize my content. The premium templates are editorial-grade and stunning."
              },
              {
                name: "Alex Rivera",
                role: "Growth Coach",
                text: "Finally a tool that understands the creator journey. I setup my business link in under 2 minutes."
              }
            ].map((t, i) => (
              <motion.div 
                key={i}
                variants={fadeIn}
                className="p-12 bg-white/5 rounded-[3rem] border border-white/10 backdrop-blur-md relative group hover:bg-white/10 transition-colors"
              >
                <p className="text-2xl font-medium text-white/90 leading-relaxed mb-8 italic">
                    "{t.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-500">
                    <img src={`https://i.pravatar.cc/150?u=${t.name}`} alt={t.name} />
                  </div>
                  <div>
                    <p className="font-black uppercase tracking-tighter text-[#d8ef2c]">{t.name}</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/40">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-24 md:py-40 px-6 max-w-7xl mx-auto">
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="bg-[#d8ef2c] text-[#4d5700] py-24 px-12 md:px-24 rounded-[3rem] md:rounded-[4rem] relative overflow-hidden shadow-2xl text-center flex flex-col items-center"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-32 -mb-32" />
          
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-10 relative z-10 leading-none uppercase">
            Build your perfect<br/>linktree today.
          </h2>
          <button 
             onClick={() => router.push('/signup')}
             className="px-6 py-4 md:px-12 md:py-6 bg-[#4d5700] text-[#d8ef2c] rounded-full text-base md:text-2xl font-black hover:scale-105 active:scale-95 transition-all shadow-2xl relative z-10 flex items-center gap-3 md:gap-4 uppercase tracking-widest whitespace-nowrap"
          >
              Get Started Free <ArrowRight size={18} className="md:w-6 md:h-6" />
          </button>
        </motion.div>
      </section>
    </div>
  )
}

function ThemePreviewContent({ themeId, templateId, overrideImage, isMini }: { themeId: string, templateId?: string, overrideImage?: string, isMini?: boolean }) {
  const theme = THEMES.find(t => t.id === themeId) || THEMES[0]
  
  const mockProfiles = [
    { name: 'Katy Delma', bio: 'Solar design practice.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200' },
    { name: 'Hydra Juice', bio: 'Daily vitamin C dose.', avatar: 'https://images.unsplash.com/photo-1613511723521-085e6878b66e?auto=format&fit=crop&q=80&w=200' },
    { name: 'Matthew Hugh', bio: 'Skater & home cook.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200' },
    { name: 'Elena Rossi', bio: 'Fashion designer.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200' }
  ]
  
  const mockLinkSets = [
    [
      { label: 'Travel Blog', icon: 'zap' },
      { label: 'YouTube', icon: 'share-2' },
      { label: 'Instagram', icon: 'twitter' }
    ],
    [
      { label: 'Portfolio', icon: 'layout' },
      { label: 'Contact', icon: 'mail' },
      { label: 'Behance', icon: 'brush' }
    ]
  ]

  const hash = (templateId || theme.id).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const mock = mockProfiles[hash % mockProfiles.length]
  const links = mockLinkSets[hash % mockLinkSets.length]
  const backgroundImage = overrideImage || theme.image

  return (
    <div className={`absolute inset-0 ${theme.bg} flex flex-col items-center p-4 pt-16 overflow-hidden`}>
      {backgroundImage && (
        <div 
          className="absolute inset-0"
          style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
      )}
      <div className="absolute inset-0 bg-black/10" />

      <div className={`relative z-10 w-full flex flex-col items-center ${isMini ? 'scale-[0.8]' : ''} transition-transform`}>
        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/40 mb-4 overflow-hidden shadow-2xl shrink-0">
          <img src={mock.avatar} className="w-full h-full object-cover" alt="" />
        </div>
        
        <h4 className={`font-black text-center mb-1 leading-tight text-xl ${theme.text.includes('white') ? 'text-white' : 'text-[#576100]'}`}>
           {mock.name}
        </h4>
        <p className={`text-center px-4 font-bold opacity-80 leading-tight mb-8 text-xs ${theme.text.includes('white') ? 'text-white' : 'text-[#576100]'}`}>
           {mock.bio}
        </p>

        <div className="w-full space-y-3 pb-20 px-4">
          {links.map((btn, i) => (
            <div 
              key={i} 
              className={`w-full h-12 flex items-center justify-center px-4 rounded-2xl shadow-sm font-black text-[11px] uppercase tracking-widest ${theme.button}`}
            >
              <span className="truncate">{btn.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

