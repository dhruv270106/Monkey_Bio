'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from '@/components/Reveal'
import { SectionBadge } from '@/components/SectionBadge'
import { 
  Users, 
  Target, 
  Zap, 
  BarChart3, 
  MessageSquare, 
  Smartphone, 
  Share2, 
  ArrowRight,
  Plus,
  Minus,
  Sparkles,
  Link,
  Bot,
  TrendingUp,
  Award,
  Globe,
  Heart
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

// GROW MOCKUPS
function GrowHeroMockup() {
    return (
        <div className="w-full max-w-2xl aspect-[1.3] bg-[#DEE5FF] rounded-[60px] shadow-[0_50px_100px_rgba(38,101,214,0.2)] border-[15px] border-white/50 p-12 relative overflow-hidden flex flex-col gap-10 text-left">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#2665D6] opacity-10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="flex-1 rounded-[40px] bg-white p-10 shadow-2xl flex flex-col gap-10 border border-black/5 text-left">
                <div className="flex justify-between items-center">
                    <div className="text-[10px] font-black uppercase text-black/40 tracking-widest leading-none">Audience Growth Dashboard</div>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#2665D6]/10 flex items-center justify-center text-[#2665D6]"><TrendingUp size={20} /></div>
                        <div className="w-10 h-10 rounded-full bg-[#E9C0E9]/20 flex items-center justify-center text-[#E9C0E9]"><Heart size={20} /></div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-6 flex-1">
                    {[
                      { icon: Sparkles, label: 'Viral Reach' },
                      { icon: Users, label: 'New Fans' },
                      { icon: Award, label: 'Top Tier' }
                    ].map((item, i) => (
                        <div key={i} className="bg-[#F3F3F1] rounded-3xl p-6 flex flex-col gap-4 border border-black/5 group hover:bg-black hover:text-white transition-all text-left">
                            <item.icon size={24} className="opacity-20 group-hover:opacity-100" />
                            <span className="text-[8px] font-black uppercase tracking-widest text-black/40 mt-auto group-hover:text-white/60 leading-none">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="h-20 bg-[#2665D6] rounded-full flex items-center justify-between px-10 shadow-xl">
                <span className="text-[10px] font-black uppercase text-white/40 tracking-widest leading-none">Connect with Community</span>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#2665D6] shadow-lg hover:scale-110 transition-transform cursor-pointer"><ArrowRight /></div>
            </div>
        </div>
    )
}
export default function GrowAndEngagePage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#2665D6] selection:text-white overflow-x-hidden">

      {/* 1. HERO SECTION - ROYAL BLUE (#2665D6) */}
      <section className="pt-48 pb-32 px-6 md:px-20 relative overflow-visible bg-[#2665D6] text-white text-center">
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center gap-12">
          <SectionBadge icon={Users} title="Grow and Engage" light />
          <SectionHeading 
            subtitle="YOUR AUDIENCE, EVERYWHERE"
            title="Grow and engage your audience" 
            description="Build a deeper connection with your community and expand your reach across every platform. Monkey Bio gives you the tools to grow your following, increase engagement, and turn visitors into regular fans."
            light
            centered
          />
          <Reveal delay={0.3} width="100%" overflowVisible>
             <div className="flex justify-center w-full">
                <motion.button 
                    whileHover={{ scale: 1.05, backgroundColor: '#FFFFFF', color: '#2665D6' }} 
                    whileTap={{ scale: 0.95 }}
                    className="px-14 py-7 bg-black text-white rounded-full font-extrabold uppercase text-sm shadow-2xl transition-all"
                >
                    Get started for free
                </motion.button>
             </div>
          </Reveal>
          
          <motion.div 
             initial={{ opacity: 0, scale: 0.9, y: 50 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             transition={{ duration: 1.2, delay: 0.4 }}
             className="w-full flex justify-center mt-12 overflow-visible"
          >
             <div className="aspect-video w-full max-w-4xl bg-white rounded-[60px] md:rounded-[80px] shadow-5xl border-[15px] border-white/5 overflow-hidden relative group">
                <img src="/solutions/stack.png" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" alt="Engagement Mockup" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* 2. ANALYTICS & INSIGHTS - FOREST GREEN (#254F1A) */}
      <section className="py-40 px-6 md:px-20 bg-[#254F1A] text-white">
         <div className="max-w-7xl mx-auto text-center md:text-left">
            <div className="grid lg:grid-cols-2 gap-32 items-center">
               <div className="space-y-12 flex flex-col items-center md:items-start text-center md:text-left">
                   <SectionHeading 
                     subtitle="ANALYTICS & INSIGHTS"
                     title="Understand what moves your audience." 
                     description="Get real-time insights into your link performance, audience demographics and conversion rates. Our analytics help you understand what your audience wants so you can grow faster."
                     light
                   />
                   <div className="grid grid-cols-2 gap-8 w-full max-w-md">
                      {[
                        { label: 'Views', value: '42K+' },
                        { label: 'Clicks', value: '8.4K' },
                        { label: 'Conversions', value: '1.2K' },
                        { label: 'CTR', value: '12.4%' }
                      ].map((stat, i) => (
                        <Reveal key={i} delay={i * 0.1}>
                           <div className="p-8 bg-white/5 rounded-[40px] border border-white/10 hover:bg-white hover:text-black transition-all shadow-sm text-center md:text-left">
                              <div className="text-3xl font-black mb-2">{stat.value}</div>
                              <div className="text-[10px] font-extrabold uppercase tracking-widest opacity-40 leading-none">{stat.label}</div>
                           </div>
                        </Reveal>
                      ))}
                   </div>
               </div>
               <div className="relative">
                  <div className="aspect-square bg-white/5 rounded-[80px] p-16 flex items-center justify-center overflow-hidden relative group border border-white/10">
                     {/* Circular Chart Mockup */}
                     <div className="w-full h-full rounded-full border-[30px] border-white/10 relative flex items-center justify-center">
                        <div className="text-center">
                            <TrendingUp size={48} className="text-[#DEE5FF] mx-auto mb-4" />
                            <span className="text-[10px] font-black uppercase text-white/40 tracking-widest leading-none">Growth Curve</span>
                        </div>
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border-[30px] border-[#DEE5FF] border-t-transparent border-l-transparent rounded-full shadow-inner opacity-20"
                        ></motion.div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 3. INTERACTIVE ENGAGEMENT - LIME (#D2E823) */}
      <section className="py-40 px-6 md:px-20 bg-[#D2E823] text-black overflow-hidden relative">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-32 text-center lg:text-left">
            <motion.div 
               initial={{ opacity: 0, x: -100 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="w-full lg:w-1/2 flex justify-center"
            >
               <div className="p-12 bg-white rounded-[60px] shadow-4xl text-black w-full max-w-sm relative overflow-hidden h-[500px] flex flex-col gap-10 border border-black/5 text-left">
                  <div className="flex gap-4 items-center">
                     <div className="w-12 h-12 rounded-full bg-[#D2E823] flex items-center justify-center shadow-lg"><MessageSquare size={20} /></div>
                     <span className="font-black uppercase tracking-widest text-[10px]">Recent Community Responses</span>
                  </div>
                  <div className="space-y-6 flex-1">
                     {[
                        "I love the new drop! 🔥",
                        "When is the next restock?",
                        "Best link-in-bio ever!"
                     ].map((txt, i) => (
                        <div key={i} className="h-14 bg-black/5 rounded-2xl flex items-center px-6 gap-4 border border-black/5 text-left">
                           <div className="w-8 h-8 rounded-full bg-black/10"></div>
                           <span className="text-[10px] font-bold text-black/30 uppercase tracking-tighter leading-none">{txt}</span>
                        </div>
                     ))}
                  </div>
                  <div className="mt-8 h-14 w-full bg-black rounded-full shadow-lg flex items-center justify-center text-white text-[10px] uppercase font-black tracking-widest transition-transform hover:scale-105 cursor-pointer leading-none">Manage Conversations</div>
               </div>
            </motion.div>
            <div className="w-full lg:w-1/2 space-y-12 flex flex-col items-center lg:items-start text-center lg:text-left">
               <SectionHeading 
                  subtitle="INTERACTIVE TOOLS"
                  title="Make every visitor an active fan." 
                  description="From polls and surveys to exclusive content drops — our interactive link tools give your audience reasons to engage and stay on your page longer."
               />
                <Reveal delay={0.3} width="fit-content" overflowVisible>
                  <motion.button 
                    whileHover={{ scale: 1.05, backgroundColor: '#000', color: '#FFF' }}
                    className="px-14 py-7 bg-white text-black rounded-full font-extrabold uppercase text-sm shadow-xl transition-all"
                  >
                    Start engaging now
                  </motion.button>
               </Reveal>
            </div>
         </div>
      </section>

      {/* 4. MULTI-PLATFORM GROWTH - DARK NAVY (#1E2330) */}
      <section className="py-40 px-6 md:px-20 bg-[#1E2330] text-white">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-32 text-center lg:text-left pt-20">
            <div className="w-full lg:w-1/2 space-y-12 flex flex-col items-center lg:items-start text-center lg:text-left">
               <SectionHeading 
                  subtitle="MULTI-PLATFORM PRESENCE"
                  title="Scale your growth anywhere." 
                  description="Whether you’re on Instagram, TikTok, Threads or Pinterest — Monkey Bio’s scaling tools ensure your growth translates across every social channel you own."
                  light
               />
               <div className="grid grid-cols-3 gap-6 w-full">
                  {[
                    { icon: Globe, label: 'Global Search' },
                    { icon: Share2, label: 'Auto Share' },
                    { icon: Zap, label: 'Viral Boost' }
                  ].map((item, i) => (
                    <Reveal key={i} delay={i * 0.1}>
                       <div className="bg-white/5 p-8 rounded-[40px] border border-white/5 flex flex-col gap-6 group hover:bg-white/10 transition-all cursor-pointer items-center text-center">
                          <item.icon size={32} className="text-[#DEE5FF]" />
                          <span className="text-[8px] font-black uppercase text-white/20 tracking-widest leading-none">{item.label}</span>
                       </div>
                    </Reveal>
                  ))}
               </div>
            </div>
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="w-full lg:w-1/2 flex justify-center"
            >
               <div className="w-full max-w-sm aspect-[1.1] relative">
                  <div className="absolute inset-0 bg-[#2665D6] opacity-20 blur-[100px] rounded-full"></div>
                  <div className="bg-white/5 backdrop-blur-3xl rounded-[60px] border border-white/10 p-12 h-full flex flex-col items-center justify-center text-center gap-8 shadow-5xl group hover:border-[#2665D6]/40 transition-colors">
                     <div className="w-24 h-24 rounded-full bg-[#DEE5FF]/10 flex items-center justify-center text-[#DEE5FF] shadow-inner group-hover:scale-110 transition-transform"><Sparkles size={48} /></div>
                     <span className="text-4xl font-extrabold uppercase tracking-tighter text-white shadow-sm leading-none">Global Scale</span>
                     <span className="text-[10px] font-black uppercase text-white/20 tracking-[0.5em] leading-none mt-2">Market Expansion</span>
                  </div>
               </div>
            </motion.div>
         </div>
      </section>

      {/* 5. FAQ SECTION - SUNSET ORANGE (#EA580C) */}
      <section className="py-40 bg-[#EA580C] px-6 md:px-20 capitalize border-t border-black/5 text-white">
         <div className="max-w-4xl mx-auto">
            <div className="text-center mb-32">
               <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter text-white font-black leading-none italic">Frequently shared questions</h2>
            </div>
            
            <div className="space-y-6">
               {[
                 { q: "How does Monkey Bio help me target my growth effectively?", a: "By providing deep insights into which platforms and links are driving the most high-value engagement, so you can focus your energy where it matters most." },
                 { q: "Can I run polls directly on my Monkey Bio profile?", a: "Yes, you can add interactive poll and survey links that let you collect data and engage fans without them ever leaving your link-in-bio page." },
                 { q: "Does analytics support conversion tracking?", a: "Pro users can integrate Facebook Pixel and Google Analytics to track exact conversions from their Monkey Bio link all the way to a purchase or sign-up." },
                 { q: "How secure is my audience data?", a: "Monkey Bio follows industry-leading security standards and GDPR requirements to ensure your attendee and subscriber data is always safe." }
               ].map((item, i) => (
                 <FAQItem key={i} question={item.q} answer={item.a} activeColor="text-[#EA580C]" />
               ))}
            </div>
         </div>
      </section>

      {/* 6. FINAL CTA - DEEP PURPLE */}
      <section className="py-48 px-6 md:px-20 bg-[#502274] text-white text-center relative overflow-hidden">
         <div className="max-w-5xl mx-auto relative z-10 text-white space-y-12 flex flex-col items-center">
            <Reveal width="100%">
               <h2 className="text-5xl md:text-[8rem] font-extrabold tracking-tighter uppercase leading-[0.85] mb-12">
                 Join the <br /><span className="text-[#D2E823]">modern movement</span> today
               </h2>
            </Reveal>
            <Reveal width="100%" delay={0.2} overflowVisible>
               <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: '#FFFFFF', color: '#502274' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-16 py-8 bg-[#D2E823] text-black rounded-full font-extrabold uppercase text-sm shadow-3xl transition-all"
               >
                  Get started for free
               </motion.button>
            </Reveal>
         </div>
         {/* Background Decoration */}
         <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[30rem] font-extrabold opacity-[0.03] select-none pointer-events-none uppercase tracking-tighter text-white leading-none">GROW</div>
      </section>

    </div>
  )
}
