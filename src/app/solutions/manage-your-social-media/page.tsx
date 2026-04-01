'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from '@/components/Reveal'
import { SectionBadge } from '@/components/SectionBadge'
import { 
  Calendar, 
  Clock, 
  Share2, 
  TrendingUp, 
  Plus, 
  Minus, 
  ArrowRight, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube, 
  Layers,
  Zap,
  Smartphone,
  CheckCircle2,
  ExternalLink
} from 'lucide-react'

// FAQ ITEM COMPONENT
function FAQItem({ question, answer, activeColor }: { question: string, answer: string, activeColor?: string }) {
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

function SectionHeading({ subtitle, title, light = false, centered = false }: { subtitle: string, title: string, light?: boolean, centered?: boolean }) {
  return (
    <div className={`space-y-4 mb-12 ${centered ? 'text-center items-center' : 'text-center md:text-left flex flex-col items-center md:items-start'}`}>
        <Reveal width={centered ? '100%' : 'fit-content'}>
            <span className={`text-[11px] font-black uppercase tracking-[0.4em] ${light ? 'text-white/40' : 'text-black/40'}`}>{subtitle}</span>
        </Reveal>
        <Reveal delay={0.1} width={centered ? '100%' : 'fit-content'}>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter uppercase leading-[1.1] ${light ? 'text-white' : 'text-black'}`}>
                {title}
            </h2>
        </Reveal>
    </div>
  )
}

export default function SocialMediaManagementPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#4037FF] selection:text-white overflow-x-hidden">

      {/* 1. HERO SECTION - ROYAL PURPLE (#502274) */}
      <section className="pt-48 pb-32 px-6 md:px-20 relative overflow-visible bg-[#502274] text-white">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-12 relative z-10 text-center">
            <Reveal width="100%" overflowVisible>
                <div className="flex justify-center w-full">
                    <SectionBadge icon={Zap} title="Manage Your Social Media" light />
                </div>
            </Reveal>
            <div className="space-y-4 mb-8 text-center items-center flex flex-col">
                <Reveal delay={0.1}>
                    <h1 className="text-5xl md:text-[7rem] font-extrabold tracking-tighter leading-[1.1] uppercase mb-4">
                        Schedule <br className="hidden md:block" /><span className="text-[#DEF141]">posts & grow.</span>
                    </h1>
                </Reveal>
                <Reveal delay={0.2}>
                    <p className="text-lg md:text-2xl text-white/60 font-medium max-w-3xl leading-relaxed mb-4 uppercase italic">
                        Create, schedule and publish content across all your platforms from Monkey Bio. Stay consistent and drive engagement on autopilot.
                    </p>
                </Reveal>
            </div>
            <Reveal delay={0.3} width="100%" overflowVisible>
               <div className="flex justify-center w-full">
                  <motion.button 
                      whileHover={{ scale: 1.05, backgroundColor: '#FFFFFF', color: '#502274' }}
                      whileTap={{ scale: 0.95 }}
                      className="px-14 py-7 bg-[#DEF141] text-black rounded-full font-extrabold uppercase text-sm shadow-2xl transition-all"
                  >
                      Get started for free
                  </motion.button>
               </div>
            </Reveal>
            
            <motion.div 
               initial={{ opacity: 0, y: 100 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.2, delay: 0.5 }}
               className="mt-20 w-full max-w-6xl relative"
            >
                <div className="aspect-video bg-gradient-to-t from-white/10 to-transparent rounded-[80px] overflow-hidden border border-white/10 p-2 shadow-[0_100px_100px_rgba(0,0,0,0.5)] bg-white">
                   <img 
                    src="/solutions/hero.png" 
                    className="w-full h-full object-cover rounded-[75px] opacity-95 scale-105" 
                    alt="Social Media Management Dashboard"
                   />
                </div>
                
                {/* Floating Stats */}
                <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="absolute -top-12 -right-12 hidden lg:flex flex-col gap-4 p-8 bg-[#2A3142] rounded-[40px] border border-white/10 shadow-3xl w-64 text-left">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#DEF141] flex items-center justify-center text-black shadow-lg shadow-[#DEF141]/20"><TrendingUp size={20} /></div>
                      <div>
                         <p className="text-[10px] font-black uppercase tracking-widest text-[#DEF141] leading-none">Engagement</p>
                         <p className="text-xl font-black mt-1 leading-none">+842%</p>
                      </div>
                   </div>
                </motion.div>
                
                <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="absolute -bottom-16 -left-16 hidden lg:flex items-center gap-6 p-8 bg-[#2A3142] rounded-[40px] border border-white/10 shadow-3xl text-left">
                   <div className="w-12 h-12 rounded-2xl bg-[#4037FF] flex items-center justify-center text-white shadow-lg shadow-[#4037FF]/20"><Clock size={24} /></div>
                   <p className="text-sm font-black uppercase tracking-[0.2em] leading-tight pr-4 text-white/80">Scheduled <br />for 6:00 PM</p>
                </motion.div>
            </motion.div>
        </div>
      </section>

      {/* COLLABORATION CARDS SECTION - LIME GREEN (#D2E823) */}
      <section className="py-40 px-6 md:px-20 bg-[#D2E823] text-black">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
               <SectionHeading subtitle="Success Together" title="SOCIAL COLLABORATION" centered />
            </div>

            <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
               {[
                 { title: 'Creators & Influencers', desc: 'Upload, organize and reuse content across brands and clients with ease.', icon: <Instagram size={32} /> },
                 { title: 'Business Owners', desc: 'Leave direct feedback and manage approval pipelines inside your calendar.', icon: <Twitter size={32} /> },
                 { title: 'Social Managers', desc: 'Share content previews with clients and partners for instant sign-off.', icon: <Linkedin size={32} /> },
               ].map((card, idx) => (
                 <Reveal key={idx} delay={idx * 0.1} overflowVisible>
                    <div className="p-16 bg-white rounded-[70px] border border-black/5 hover:-translate-y-4 hover:shadow-3xl transition-all duration-700 group text-center md:text-left flex flex-col items-center md:items-start group">
                       <div className="w-20 h-20 rounded-[30px] bg-black/5 flex items-center justify-center text-black mb-12 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                          {card.icon}
                       </div>
                       <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 pr-4 leading-none">{card.title}</h3>
                       <p className="text-gray-500 font-medium leading-relaxed italic">{card.desc}</p>
                    </div>
                 </Reveal>
               ))}
            </div>
         </div>
      </section>

      {/* POST CONSISTENTLY - ROYAL BLUE (#4037FF) */}
      <section className="py-40 px-6 md:px-20 bg-[#4037FF] text-white overflow-hidden relative">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-32 text-center md:text-left">
            <motion.div 
               initial={{ opacity: 0, x: -100 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="w-full lg:w-1/2 flex justify-center"
            >
               <div className="aspect-[4/5] rounded-[90px] overflow-hidden shadow-4xl border-[15px] border-white/10 w-full max-w-sm">
                  <img src="/solutions/stack.png" className="w-full h-full object-cover rounded-[80px]" />
               </div>
            </motion.div>

            <div className="w-full lg:w-1/2 space-y-12 flex flex-col items-center md:items-start">
               <SectionHeading subtitle="Daily impact" title="NEVER MISS A POSTING DAY." light />
               <Reveal delay={0.2}>
                  <p className="text-2xl text-white/70 font-medium leading-relaxed max-w-lg mb-12 uppercase italic">
                    Stay active across Instagram, Tik-Tok, YouTube Shorts, and X at the same time. Build consistency and reach your fans wherever they are.
                  </p>
               </Reveal>
               <Reveal delay={0.3} overflowVisible>
                  <motion.button 
                    whileHover={{ scale: 1.05, backgroundColor: '#DEF141', color: '#000', boxShadow: '0 20px 40px rgba(222,241,65,0.4)' }}
                    whileTap={{ scale: 0.95 }}
                    className="px-14 py-7 bg-white text-[#4037FF] rounded-full font-black uppercase text-sm transition-all shadow-2xl flex items-center gap-4"
                  >
                    Get started today <ArrowRight size={18} />
                  </motion.button>
               </Reveal>
            </div>
         </div>
      </section>

      {/* SIMPLIFY STRATEGY - SUNSET ORANGE (#EA580C) */}
      <section className="py-40 px-6 md:px-20 bg-[#EA580C] text-white">
         <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-24 gap-8 text-center md:text-left text-white">
               <SectionHeading subtitle="Everything in one place" title="SIMPLIFY YOUR STRATEGY." light />
               <Reveal delay={0.3}>
                  <p className="text-white/40 font-black italic max-w-xs mb-12 uppercase leading-relaxed mx-auto md:mx-0">All the tools you need to publish content across your network.</p>
               </Reveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
               {[
                 { title: 'Visualize', desc: 'Plan using our beautiful drag-and-drop grid.', color: 'bg-[#FF6B6B]' },
                 { title: 'Cross-post', desc: 'Publish to all platforms with a single click.', color: 'bg-[#4037FF]' },
                 { title: 'Auto-post', desc: 'Go live even when you are totally offline.', color: 'bg-[#7C3AED]' },
                 { title: 'Best Time', desc: 'Know exact moments of peak audience activity.', color: 'bg-[#DEF141]', dark: true },
               ].map((item, idx) => (
                 <Reveal key={idx} delay={idx * 0.1}>
                    <div className={`${item.color} ${item.dark ? 'text-black' : 'text-white'} p-12 rounded-[60px] aspect-square flex flex-col justify-end group cursor-pointer overflow-hidden relative shadow-xl text-center md:text-left items-center md:items-start`}>
                       <div className="absolute top-10 right-10 opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all">
                          <Layers size={100} />
                       </div>
                       <h4 className="text-3xl font-black uppercase tracking-tighter mb-4 leading-none">{item.title}</h4>
                       <p className={`text-sm font-medium ${item.dark ? 'text-black/60' : 'text-white/60'} leading-relaxed`}>{item.desc}</p>
                    </div>
                 </Reveal>
               ))}
            </div>
         </div>
      </section>

      {/* AUTOMATED LINKS SECTION - OLIVE GREEN (#3C3F2F) */}
      <section className="py-40 px-6 md:px-20 bg-[#3C3F2F] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-32 text-center md:text-left">
            <div className="w-full lg:w-1/2 space-y-12 lg:order-2 flex flex-col items-center md:items-start">
               <SectionHeading subtitle="Perfect Sync" title="SCHEDULE POSTS & LINKS." light />
               <Reveal delay={0.2}>
                  <p className="text-2xl text-white/60 font-medium leading-relaxed max-w-lg mb-12 italic uppercase">
                    Sync your link-in-bio updates with your social post timing. Every drop, launch, and announcement stays perfectly coordinated.
                  </p>
               </Reveal>
               <div className="space-y-6 flex flex-col items-center md:items-start">
                  {['Automated link reveals', 'Timed profile themes', 'Instant bio updates'].map((text, i) => (
                    <Reveal key={i} delay={0.3 + (i * 0.1)}>
                       <div className="flex items-center gap-4 text-[#DEF141]">
                          <CheckCircle2 size={24} />
                          <span className="text-sm font-black uppercase tracking-widest text-white leading-none">{text}</span>
                       </div>
                    </Reveal>
                  ))}
               </div>
            </div>

            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="w-full lg:w-1/2 lg:order-1 flex items-center justify-center"
            >
               <div className="aspect-square rounded-full border border-[20px] border-white/5 relative flex items-center justify-center p-20 w-full max-w-md">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#DEF141]/20 to-transparent rounded-full blur-[100px] animate-pulse"></div>
                  <img src="/solutions/mockup.png" className="w-full h-full object-contain relative z-10 drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] rounded-[60px]" />
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECONDARY CTA - BRIGHT LIME GREEN (#DEF141) */}
      <section className="py-32 px-6 md:px-20 bg-[#DEF141] overflow-hidden relative">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10 text-left">
            <div className="flex-1">
               <Reveal>
                  <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none text-black pr-10">
                    BUILD YOUR VIRAL <br /><span className="text-[#4037FF]">CONTENT STRATEGY.</span>
                  </h2>
               </Reveal>
            </div>
            <Reveal delay={0.2} overflowVisible>
               <motion.button 
                  whileHover={{ scale: 1.1, backgroundColor: '#000', color: '#FFF' }}
                  whileTap={{ scale: 0.9 }}
                  className="px-16 py-8 bg-black text-[#DEF141] rounded-full font-black uppercase text-sm shadow-2xl transition-all flex items-center gap-4"
               >
                  Plan content <ArrowRight size={20} />
               </motion.button>
            </Reveal>
         </div>
         {/* Background Decoration */}
         <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[30rem] font-black opacity-[0.03] select-none pointer-events-none uppercase tracking-tighter italic text-black leading-none">SOCIAL</div>
      </section>

      {/* FAQ SECTION - ROYAL BLUE (#2665D6) */}
      <section className="py-40 bg-[#2665D6] px-6 md:px-20 text-white capitalize">
         <div className="max-w-4xl mx-auto">
            <div className="text-center mb-32">
               <SectionHeading subtitle="Common Queries" title="FREQUENT QUESTIONS" light centered />
            </div>
            
            <div className="space-y-6">
               {[
                 { q: "What is Monkey Bio’s social planner?", a: "It is an all-in-one content strategy suite that lets you create, schedule, and publish posts to all major social platforms directly from your dashboard." },
                 { q: "What platforms are supported?", a: "We support Instagram (Grid & Stories), Tik-Tok, Facebook, X (formerly Twitter), LinkedIn, Pinterest, and YouTube Shorts." },
                 { q: "What is a cross post?", a: "A cross post allows you to share the exact same content across multiple social accounts or platforms simultaneously, saving you hours of manual work." },
                 { q: "How does scheduling posts help my business?", a: "Scheduling ensures you stay consistent even when you're busy. Consistency is the #1 factor in algorithm growth and building a loyal audience." },
                 { q: "What makes Monkey Bio’s planner different?", a: "Unlike other tools, our planner is built directly into your link-in-bio home. You can coordinate your profile updates exactly when your social posts go live." }
               ].map((item, i) => (
                 <FAQItem key={i} question={item.q} answer={item.a} activeColor="text-[#2665D6]" />
               ))}
            </div>
         </div>
      </section>

      {/* FINAL CTA - PURPLE (#7C3AED) */}
      <section className="py-40 px-6 md:px-20 bg-[#7C3AED] text-white overflow-hidden relative">
         <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10 space-y-12">
            <Reveal width="100%">
               <h2 className="text-6xl md:text-[8rem] font-black tracking-tighter uppercase leading-[0.85] text-white">
                 Jumpstart your <br /><span className="text-[#DEF141]">empire today.</span>
               </h2>
            </Reveal>
            <Reveal delay={0.2} overflowVisible>
               <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: '#FFFFFF', color: '#7C3AED' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-16 py-8 bg-[#DEF141] text-[#7C3AED] rounded-full font-black uppercase text-sm shadow-3xl transition-all"
               >
                  Get started for free
               </motion.button>
            </Reveal>
         </div>
      </section>

    </div>
  )
}
