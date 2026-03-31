'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser } from '@/hooks/useUser'
import { Reveal } from '@/components/Reveal'
import { 
  Check, 
  ArrowRight, 
  Plus, 
  Minus, 
  Layers, 
  Image as ImageIcon, 
  Sparkles, 
  Zap, 
  Smartphone, 
  ExternalLink,
  Palette,
  Layout,
  MousePointer2,
  Heart,
  Star,
  RefreshCcw,
  CloudLightning,
  Box,
  Component,
  Database
} from 'lucide-react'

// FAQ ITEM COMPONENT
function FAQItem({ question, answer, activeColor }: { question: string, answer: string, activeColor: string }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className={`bg-white rounded-[32px] overflow-hidden shadow-sm transition-all duration-500 border border-black/5 ${isOpen ? 'shadow-xl' : ''}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left group p-8"
      >
        <h4 className={`text-lg md:text-xl font-bold uppercase tracking-wide transition-colors pr-8 ${isOpen ? activeColor : 'text-black group-hover:' + activeColor}`}>
          {question}
        </h4>
        <div className={`w-8 h-8 rounded-full border border-black/10 flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'rotate-180 bg-black text-white' : 'hover:scale-110'}`}>
           {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-8 pb-8"
          >
            <p className="text-gray-500 font-medium leading-relaxed max-w-2xl border-t border-black/5 pt-6">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SectionHeading({ subtitle, title, description, light = false, centered = false }: { subtitle?: string, title: string, description?: string, light?: boolean, centered?: boolean }) {
  return (
    <div className={`space-y-6 mb-12 ${centered ? 'text-center items-center' : 'text-center md:text-left flex flex-col items-center md:items-start'}`}>
        {subtitle && (
          <Reveal delay={0.2} width={centered ? '100%' : 'fit-content'}>
              <span className={`text-[11px] font-bold uppercase tracking-[0.4em] ${light ? 'text-white/40' : 'text-black/40'}`}>{subtitle}</span>
          </Reveal>
        )}
        <Reveal delay={0.1} width={centered ? '100%' : 'fit-content'}>
            <h2 className={`text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter uppercase leading-[1.1] ${light ? 'text-white' : 'text-black'}`}>
                {title}
            </h2>
        </Reveal>
        {description && (
          <Reveal delay={0.2} width={centered ? '100%' : 'fit-content'}>
              <p className={`text-lg md:text-xl font-medium leading-relaxed ${light ? 'text-white/80' : 'text-black/60'} ${centered ? 'mx-auto' : ''}`}>
                  {description}
              </p>
          </Reveal>
        )}
    </div>
  )
}

// CANVA MOCKUPS
function CanvaHeroMockup() {
    return (
        <div className="w-full max-w-2xl aspect-[1.4] bg-[#00C4CC] rounded-[50px] shadow-[0_50px_100px_rgba(0,0,0,0.3)] border border-white/20 p-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent)]"></div>
            <div className="relative z-10 flex flex-col h-full gap-8 text-left text-black">
                <div className="flex-1 bg-white rounded-[40px] shadow-2xl p-10 flex flex-col gap-8 relative overflow-hidden">
                    <div className="flex justify-between items-center relative z-10">
                        <div className="text-[10px] font-black uppercase text-[#001D1F]/40 tracking-widest leading-none">Canva Designer Editor</div>
                        <div className="w-10 h-10 rounded-full bg-[#00C4CC] flex items-center justify-center text-white shadow-lg"><Plus size={20} /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-8 relative z-10 h-full">
                        <div className="h-40 bg-black/[0.03] rounded-3xl border border-dashed border-black/10 flex flex-col items-center justify-center p-6 gap-4">
                            <ImageIcon size={32} className="text-[#00C4CC]/20" />
                            <div className="text-[9px] font-black uppercase text-black/30 tracking-widest text-center">Your Custom Designs</div>
                        </div>
                        <div className="space-y-6">
                            <span className="text-[10px] font-black uppercase text-[#00C4CC] tracking-widest leading-none">Bio Settings</span>
                            <div className="p-4 bg-black/[0.02] rounded-2xl border border-black/5 text-[9px] font-bold text-black/40 leading-relaxed uppercase tracking-tighter">Sync your professional Canva designs to Monkey Bio with one click.</div>
                            <div className="h-12 w-full bg-[#00C4CC] rounded-full mt-4 flex items-center justify-center text-white text-[10px] font-black uppercase tracking-widest shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer">Push to Bio Library</div>
                        </div>
                    </div>
                    {/* Cursor Mockup */}
                    <motion.div 
                        animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute bottom-20 right-20 text-[#00C4CC] drop-shadow-xl"
                    >
                        <MousePointer2 size={32} fill="currentColor" opacity={0.6} />
                    </motion.div>
                </div>
                <div className="h-20 bg-black rounded-full flex items-center justify-between px-10 shadow-2xl">
                    <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Connect Canva Projects</span>
                    <div className="w-12 h-12 bg-[#00C4CC] rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform"><ArrowRight /></div>
                </div>
            </div>
        </div>
    )
}

function CanvaGridMockup() {
    const templates = [
        { title: "PROFILE PIC", color: "bg-[#FFD1E3]", icon: <ImageIcon className="text-[#FF6B6B]" size={20} />, text: "Beauty Brand" },
        { title: "LINK BANNER", color: "bg-[#DDE5FF]", icon: <Zap className="text-[#4037FF]" size={20} />, text: "Coming Soon" },
        { title: "BRAND LOGO", color: "bg-[#E2FFDD]", icon: <Sparkles className="text-[#2DB018]" size={20} />, text: "New Identity" },
        { title: "SOCIAL POST", color: "bg-[#FFF4DD]", icon: <Star className="text-[#FF9313]" size={20} />, text: "Daily Tips" }
    ]

    return (
        <div className="aspect-square bg-white rounded-[70px] shadow-5xl border-[15px] border-black/5 p-10 grid grid-cols-2 gap-8 relative overflow-hidden group">
            {templates.map((t, i) => (
                <motion.div 
                    key={i}
                    whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? -2 : 2 }}
                    className={`${t.color} rounded-[40px] p-6 flex flex-col gap-4 shadow-xl border border-black/5 relative overflow-hidden group-hover:transition-all`}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent"></div>
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-[8px] font-black uppercase text-black/30 tracking-widest">{t.title}</span>
                            {t.icon}
                        </div>
                        <div className="mt-auto space-y-2">
                            <div className="text-[10px] font-extrabold uppercase text-black leading-none">{t.text}</div>
                            <div className="h-1.5 w-1/2 bg-black/5 rounded-full"></div>
                        </div>
                    </div>
                </motion.div>
            ))}
            {/* Center Plus Icon overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full p-2 shadow-3xl z-20 hidden md:flex items-center justify-center">
                 <div className="w-full h-full bg-[#00C4CC] rounded-full flex items-center justify-center text-white"><Plus size={24} /></div>
            </div>
        </div>
    )
}

// 1. DESIGNER BACKGROUND MOCKUP (Light themed for dark bg)
function DesignerBgMockup() {
    return (
        <div className="absolute inset-0 overflow-hidden opacity-20 group-hover:opacity-40 transition-opacity duration-700">
             <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-10">
                 {[...Array(36)].map((_, i) => <div key={i} className="border border-white/20"></div>)}
             </div>
             <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="absolute -top-10 -left-10 w-64 h-64 border-[30px] border-white/10 rounded-full"></motion.div>
             <div className="absolute bottom-10 right-10 flex gap-4">
                 <Box size={80} strokeWidth={1} className="text-white/20 rotate-12" />
                 <Palette size={60} strokeWidth={1} className="text-white/20 -rotate-12 translate-y-10" />
             </div>
        </div>
    )
}

// 2. ONE-CLICK BG MOCKUP (Light themed)
function OneClickBgMockup() {
    return (
        <div className="absolute inset-0 overflow-hidden opacity-20 group-hover:opacity-40 transition-opacity duration-700">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-10">
                 {[...Array(3)].map((_, i) => (
                     <motion.div 
                        key={i}
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 3 + i, repeat: Infinity }}
                        className="w-16 h-32 bg-white/10 rounded-full border border-white/5"
                     ></motion.div>
                 ))}
             </div>
             <CloudLightning size={150} strokeWidth={1} className="absolute -bottom-10 -right-10 text-white/10 -rotate-12" />
        </div>
    )
}

// 3. SYNC BG MOCKUP (Light themed)
function SyncBgMockup() {
    return (
        <div className="absolute inset-0 overflow-hidden opacity-20 group-hover:opacity-40 transition-opacity duration-700">
             <div className="absolute inset-0 flex flex-col gap-4 p-10 justify-center">
                 {[...Array(4)].map((_, i) => (
                     <div key={i} className="h-1 w-full bg-white/10 rounded-full relative">
                         <motion.div animate={{ left: ['0%', '100%'] }} transition={{ duration: 4 + i, repeat: Infinity }} className="absolute top-0 w-8 h-full bg-white/20 rounded-full shadow-lg"></motion.div>
                     </div>
                 ))}
             </div>
             <Database size={100} strokeWidth={1} className="absolute top-10 left-10 text-white/5 rotate-45" />
             <RefreshCcw size={120} strokeWidth={1} className="absolute -bottom-10 -right-10 text-white/10" />
        </div>
    )
}

export default function CanvaIntegrationPage() {
  const { user } = useUser()
  const targetLink = user ? '/dashboard' : '/signup'
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#00C4CC] selection:text-white overflow-x-hidden">

      {/* 1. HERO SECTION - DARK NAVY (#1E2330) */}
      <section className="pt-48 pb-10 px-6 md:px-20 relative overflow-hidden bg-[#1E2330] text-white text-center">
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
            <Reveal>
                <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-8 shadow-2xl">
                   <div className="w-6 h-6 rounded-full bg-[#00C4CC] flex items-center justify-center">
                     <Plus size={12} className="text-white" />
                   </div>
                   <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/60">Monkey Bio + Canva</span>
                </div>
            </Reveal>
            
            <SectionHeading 
              title="Design in Canva. Use in Monkey Bio." 
              description="Connect Canva, create your design, and instantly apply it to your Monkey Bio—no extra steps, no wasted time."
              light
              centered
            />

            <Reveal delay={0.3} width="100%" overflowVisible>
                <Link href={targetLink}>
                    <motion.button 
                        whileHover={{ scale: 1.05, backgroundColor: '#00C4CC', color: '#FFF' }} 
                        whileTap={{ scale: 0.95 }}
                        className="px-14 py-7 bg-white text-black rounded-full font-extrabold uppercase text-sm shadow-2xl transition-all"
                    >
                        Connect Canva
                    </motion.button>
                </Link>
            </Reveal>

            <motion.div 
               initial={{ opacity: 0, y: 100 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.2, delay: 0.4 }}
               className="mt-32 flex justify-center"
            >
               <CanvaHeroMockup />
            </motion.div>
        </div>
      </section>

      {/* 2. BENEFITS SECTION - LIME (#D2E823) */}
      <section className="py-40 px-6 md:px-20 bg-[#D2E823] text-black overflow-visible">
         <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-32 items-center overflow-visible text-center lg:text-left">
               <div className="w-full lg:w-1/2 space-y-12 flex flex-col items-center lg:items-start">
                  <SectionHeading 
                    subtitle="SAVE TIME"
                    title="A workflow designed for creators." 
                    description="Why download and re-upload when you can do it all in one click? Our Canva integration lets you publish designs directly to your Monkey Bio profiles, links, and banners."
                  />
                  <div className="space-y-6 flex flex-col items-center lg:items-start w-full">
                     {[
                       'Access your Canva designs instantly',
                       'Quickly create banners and profile pics',
                       'Maintain brand consistency effortlessly',
                       'Optimize images automatically for web'
                     ].map((item, i) => (
                       <Reveal key={i} delay={i * 0.1}>
                          <div className="flex items-center gap-4">
                             <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white shadow-sm"><Check size={14} /></div>
                             <span className="text-lg font-medium text-black/60">{item}</span>
                          </div>
                       </Reveal>
                     ))}
                  </div>
               </div>
               <div className="w-full lg:w-1/2 relative overflow-visible pb-20 mt-10 flex justify-center">
                  <CanvaGridMockup />

                  <motion.div 
                     initial={{ rotate: -15, opacity: 0 }}
                     whileInView={{ rotate: -5, opacity: 1 }}
                     className="absolute -bottom-10 right-0 bg-black text-white p-8 rounded-[40px] font-black uppercase text-xs tracking-widest shadow-5xl z-20"
                  >
                     One-Click Layout Sync
                  </motion.div>
               </div>
            </div>
         </div>
      </section>

      {/* 3. FEATURE CARDS - VIBRANT & COLORFUL (Matches High-Fidelity pages) */}
      <section className="py-60 px-6 md:px-20 bg-[#E9C0E9] text-black overflow-visible">
         <div className="max-w-7xl mx-auto overflow-visible">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 overflow-visible text-center md:text-left">
               {[
                 { 
                    title: 'The Designer', 
                    desc: 'Powerful design tools right where you need them.', 
                    icon: <Palette size={24} />, 
                    label: 'Canva Pro Tools', 
                    bgMockup: <DesignerBgMockup />,
                    bgColor: 'bg-[#003B3D]',
                    accentColor: 'text-[#00C4CC]'
                 },
                 { 
                    title: 'One Click Apply', 
                    desc: 'No more downloads. Send designs straight to your link-in-bio.', 
                    icon: <Zap size={24} />, 
                    label: 'Auto-Sync Active', 
                    bgMockup: <OneClickBgMockup />,
                    bgColor: 'bg-[#2E1065]',
                    accentColor: 'text-[#C084FC]'
                 },
                 { 
                    title: 'Always Syncing', 
                    desc: 'Updates in Canva can be reflected in seconds.', 
                    icon: <Layers size={24} />, 
                    label: 'Version Control', 
                    bgMockup: <SyncBgMockup />,
                    bgColor: 'bg-[#500724]',
                    accentColor: 'text-[#FB7185]'
                 }
               ].map((card, i) => (
                 <Reveal key={i} delay={i * 0.1} width="100%" overflowVisible>
                    <div className="relative group overflow-visible h-full">
                        <div className={`${card.bgColor} p-16 rounded-[70px] space-y-10 hover:-translate-y-12 transition-all duration-700 shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/5 aspect-[4/5] flex flex-col justify-end items-center md:items-start text-center md:text-left relative overflow-hidden group text-white h-full`}>
                           {/* Code-Based Background Illustration */}
                           <div className="absolute inset-0 z-0">
                                {card.bgMockup}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                           </div>

                           <div className="relative z-10 space-y-6 flex flex-col items-center md:items-start w-full">
                                <div className="w-16 h-16 rounded-full bg-white border border-white/10 flex items-center justify-center text-black shadow-xl group-hover:scale-110 transition-transform duration-500">
                                    {card.icon}
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-3xl font-extrabold uppercase tracking-tighter leading-tight">{card.title}</h4>
                                    <span className={`text-[10px] font-black uppercase ${card.accentColor} tracking-[0.2em] leading-none`}>{card.label}</span>
                                    <p className="text-white/60 font-medium leading-relaxed">{card.desc}</p>
                                </div>
                           </div>
                        </div>
                    </div>
                 </Reveal>
               ))}
            </div>
         </div>
      </section>

      {/* 4. FAQ SECTION - ROYAL BLUE (#2665D6) */}
      <section className="py-40 bg-[#2665D6] px-6 md:px-20 capitalize border-t border-black/5">
         <div className="max-w-4xl mx-auto flex flex-col items-center">
            <div className="text-center mb-32">
               <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter text-white">Frequently shared questions</h2>
            </div>
            
            <div className="space-y-6 w-full">
               {[
                 { q: "How do I connect my Canva account?", a: "Simply click the 'Connect Canva' button on this page or in your Monkey Bio dashboard. You'll be prompted to sign in to Canva and authorize the integration." },
                 { q: "Is the Canva integration free?", a: "Yes, the basic integration is available to all users. Some advanced features like direct syncing for Pro templates may require a Monkey Bio Pro plan." },
                 { q: "Can I use my own Canva brand kit?", a: "Absolutely! The integration allows you to browse all your Canva folders, including your Brand Kits with custom fonts and colors." },
                 { q: "What design sizes should I use?", a: "Monkey Bio automatically suggests the best dimensions for profile pictures, banners, and links, but you can use any custom Canva design size." }
               ].map((item, i) => (
                 <FAQItem key={i} question={item.q} answer={item.a} activeColor="text-[#00C4CC]" />
               ))}
            </div>
         </div>
      </section>

      {/* 5. FINAL CTA - DEEP PURPLE (#502274) */}
      <section className="py-48 px-6 md:px-20 bg-[#502274] text-white text-center relative overflow-hidden">
         <div className="max-w-5xl mx-auto relative z-10 text-white flex flex-col items-center">
            <Reveal width="100%">
               <h2 className="text-5xl md:text-[8rem] font-extrabold tracking-tighter uppercase leading-[0.85] mb-12">
                 Jumpstart your <br /><span className="text-[#D2E823]">modern brand</span> today
               </h2>
            </Reveal>
            <Reveal width="100%" delay={0.2} overflowVisible>
                <Link href={targetLink}>
                   <motion.button 
                      whileHover={{ scale: 1.05, backgroundColor: '#FFFFFF', color: '#502274' }}
                      whileTap={{ scale: 0.95 }}
                      className="px-16 py-8 bg-[#D2E823] text-black rounded-full font-extrabold uppercase text-sm shadow-3xl transition-all"
                   >
                      Connect Canva Now
                   </motion.button>
                </Link>
            </Reveal>
         </div>
         {/* Background Decoration */}
         <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[30rem] font-extrabold opacity-[0.05] select-none pointer-events-none uppercase tracking-tighter text-white leading-none">DESIGN</div>
      </section>

    </div>
  )
}
