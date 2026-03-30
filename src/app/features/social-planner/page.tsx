'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from '@/components/Reveal'
import { 
  Plus, 
  Minus, 
  ArrowRight, 
  Calendar, 
  Layout, 
  Zap, 
  Smartphone, 
  Share2, 
  Users, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  TrendingUp,
  Award,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Search,
  MoreHorizontal,
  Camera,
  Heart,
  MessageCircle,
  Bookmark,
  Sparkles
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

// 1. HERO MOCKUP COMPONENT
function HeroDashboardMockup() {
    return (
        <div className="w-full max-w-2xl aspect-[1.4] bg-[#191C2B] rounded-[50px] shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/10 p-8 space-y-8 relative overflow-hidden group text-left">
            {/* Sidebar Mockup */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-white/5 border-r border-white/5 flex flex-col items-center py-10 gap-8 text-white/40">
                <div className="w-10 h-10 rounded-xl bg-[#DEF141]/20 flex items-center justify-center text-[#DEF141]"><Layout size={20} /></div>
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><Calendar size={16} /></div>
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><Smartphone size={16} /></div>
            </div>
            
            <div className="ml-24 space-y-10">
                {/* Header Mockup */}
                <div className="flex justify-between items-center pr-4">
                    <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Dashboard / Social Planner</span>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/5"></div>
                        <div className="w-24 h-10 rounded-full bg-[#DEF141] flex items-center justify-center text-black font-extrabold text-[10px] uppercase">Post Now</div>
                    </div>
                </div>

                {/* Calendar Table Mockup */}
                <div className="grid grid-cols-4 gap-6">
                    {[
                        { day: 'MON', color: 'bg-indigo-500' },
                        { day: 'TUE', color: 'bg-pink-500' },
                        { day: 'WED', color: 'bg-emerald-500' },
                        { day: 'THU', color: 'bg-amber-500' }
                    ].map((m, i) => (
                        <div key={i} className="bg-white/5 rounded-3xl p-6 space-y-4 hover:bg-white/10 transition-colors">
                            <span className="text-[10px] font-bold text-white/40">{m.day}</span>
                            <div className={`h-24 w-full ${m.color} rounded-2xl opacity-40 shadow-inner`}></div>
                            <span className="text-[8px] font-bold text-white/20 uppercase">Scheduled</span>
                        </div>
                    ))}
                </div>

                {/* Stats Bar */}
                <div className="bg-white/5 rounded-3xl p-8 flex items-center justify-between">
                    <div className="flex gap-6 items-center">
                        <div className="w-12 h-12 rounded-2xl bg-[#DEF141]/20 flex items-center justify-center text-[#DEF141]"><TrendingUp size={24} /></div>
                        <div className="space-y-1">
                           <div className="text-[10px] font-black uppercase text-[#DEF141]">Real-time Trends</div>
                           <div className="text-[8px] font-bold text-white/20 uppercase tracking-widest">Updated 2m ago</div>
                        </div>
                    </div>
                    <div className="h-10 px-6 bg-white/5 rounded-full flex items-center text-[8px] font-black uppercase text-white/40 tracking-widest border border-white/5">View Analytics</div>
                </div>
            </div>
            
            {/* Background Glow */}
            <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-[#DEF141] opacity-[0.05] blur-[150px] rounded-full"></div>
        </div>
    )
}

// 2. FEATURE BACKGROUND MOCKUPS
function ScheduleCardBg() {
    return (
        <div className="absolute inset-0 bg-white/5 flex items-center justify-center p-10 overflow-hidden text-left">
            <div className="w-full grid grid-cols-3 gap-4 opacity-40">
                {[...Array(9)].map((_, i) => (
                    <div key={i} className="aspect-square bg-white rounded-2xl border-4 border-dashed border-black/20 flex flex-col items-center justify-center gap-2 p-2">
                        <Calendar size={18} className="text-black/40" />
                        <div className="h-1 w-8 bg-black/10 rounded-full"></div>
                    </div>
                ))}
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#800000] blur-[80px] rounded-full opacity-60"></div>
        </div>
    )
}

function CrosspostCardBg() {
    return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
             <div className="relative w-full h-full">
                {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                    <motion.div 
                        key={i}
                        animate={{ 
                            y: [0, -20 * (i+1), 0],
                            rotate: [0, 10 * (i+1), 0]
                        }}
                        transition={{ duration: 4 + i, repeat: Infinity }}
                        className={`absolute w-16 h-16 bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-xl`}
                        style={{ 
                            left: `${20 + (i * 20)}%`, 
                            top: `${30 + (i * 10)}%`,
                            opacity: 0.4 + (i * 0.1)
                        }}
                    >
                        <Icon size={24} className="text-white" />
                    </motion.div>
                ))}
             </div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#FF9313] blur-[100px] rounded-full opacity-40"></div>
        </div>
    )
}

function FeedPlannerCardBg() {
    return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden p-12">
            <div className="grid grid-cols-3 gap-3 w-full h-full opacity-40">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="aspect-square bg-white/30 rounded-xl border border-white/20 flex items-center justify-center">
                         <div className="h-1 w-4 bg-white/20 rounded-full"></div>
                    </div>
                ))}
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#402010] blur-[120px] rounded-full opacity-80"></div>
        </div>
    )
}

function AIInsightsCardBg() {
    return (
        <div className="absolute inset-0 flex items-center justify-center p-12 overflow-hidden text-left">
            <div className="relative w-full h-full border border-white/20 rounded-[40px] p-6 space-y-4 opacity-60 flex flex-col">
                <div className="flex gap-4 items-center">
                    <div className="h-4 w-4 bg-[#DEF141] rounded-full"></div>
                    <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Global Analytics</span>
                </div>
                <div className="flex-1 h-32 border-b border-l border-white/20 relative">
                    <motion.div 
                        animate={{ height: ["10%", "60%", "30%", "80%", "40%"] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute bottom-0 left-4 w-10 bg-[#DEF141]/60 rounded-t-lg shadow-lg"
                    />
                    <motion.div 
                        animate={{ height: ["40%", "20%", "70%", "10%", "90%"] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute bottom-0 left-20 w-10 bg-white/40 rounded-t-lg shadow-lg"
                    />
                </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#000B8C] blur-[100px] rounded-full opacity-60"></div>
        </div>
    )
}

// 3. GRID PREVIEW COMPONENT
function GridFeedPreview() {
    const items = [
        { color: 'bg-purple-600', icon: <Camera size={40} />, label: 'Post 1' },
        { color: 'bg-emerald-600', icon: <Sparkles size={40} />, label: 'Post 2' },
        { color: 'bg-rose-600', icon: <Heart size={40} />, label: 'Post 3' },
        { color: 'bg-amber-600', icon: <Smartphone size={40} />, label: 'Post 4' }
    ]
    return (
        <div className="w-full max-w-sm aspect-square bg-[#1E2330] p-6 rounded-[60px] shadow-5xl border-[15px] border-white/5 grid grid-cols-2 gap-6 relative overflow-hidden group">
            {items.map((item, i) => (
                <div key={i} className={`relative overflow-hidden rounded-[40px] ${item.color} shadow-lg hover:scale-105 transition-transform duration-500 flex flex-col items-center justify-center text-white/40 gap-4`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                    {item.icon}
                    <span className="text-[10px] font-black uppercase text-white/60 tracking-widest">{item.label}</span>
                    <div className="absolute top-6 right-6 text-white/40"><Instagram size={14} /></div>
                </div>
            ))}
            {/* Overlay Grid lines */}
            <div className="absolute inset-0 pointer-events-none grid grid-cols-2 grid-rows-2 opacity-5">
                <div className="border-r border-b border-white"></div>
                <div className="border-b border-white"></div>
                <div className="border-r border-white"></div>
                <div></div>
            </div>
        </div>
    )
}

export default function SocialPlannerPage() {
  const carouselRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
        const { scrollLeft, clientWidth } = carouselRef.current
        const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth
        carouselRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#4037FF] selection:text-white overflow-x-hidden">

      {/* 1. HERO SECTION - ROYAL BLUE */}
      <section className="pt-48 pb-32 px-6 md:px-20 relative overflow-hidden bg-[#000B8C] text-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20 relative z-10 text-center lg:text-left">
          <div className="w-full lg:w-1/2 space-y-12 flex flex-col items-center lg:items-start">
            <SectionHeading 
              title="Social media scheduling made simple" 
              description="Overwhelmed with social media? Use our Social Planner to automate posting, save time, and stay consistent with a powerful scheduling tool that helps you plan, optimize, and auto-post with ease."
              light 
            />
            <Reveal delay={0.3} width="fit-content" overflowVisible>
                <div className="flex flex-col sm:flex-row gap-6">
                    <motion.button 
                        whileHover={{ scale: 1.05, backgroundColor: '#DEF141', color: '#000' }} 
                        className="px-14 py-7 bg-[#DEF141] text-black rounded-full font-extrabold uppercase text-sm shadow-2xl transition-all"
                    >
                        Get started for free
                    </motion.button>
                </div>
            </Reveal>
          </div>
          <motion.div 
             initial={{ opacity: 0, y: 100 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.2, delay: 0.4 }}
             className="w-full lg:w-1/2 flex justify-center"
          >
             <HeroDashboardMockup />
          </motion.div>
        </div>
      </section>

      {/* 2. OVERLINE INTRODUCTION - LIME (#DEF141) */}
      <section className="py-32 px-6 md:px-20 bg-[#DEF141] border-b border-black/5">
         <div className="max-w-7xl mx-auto">
            <SectionHeading 
               subtitle="PLAN, POST, AND GROW" 
               title="Plan, schedule and auto-post across your social platforms." 
               description="Whether you’re managing Instagram, TikTok, Facebook, LinkedIn, YouTube Shorts or Pinterest, our social media scheduling tool helps you stay consistent, save time, and grow your audience effortlessly."
               centered
            />
         </div>
      </section>

      {/* 3. FEATURE CARDS CAROUSEL - FOREST GREEN (#254F1A) */}
      <section className="py-40 px-6 md:px-20 bg-[#254F1A] overflow-hidden relative text-white">
         <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-16">
               <h3 className="text-2xl font-extrabold uppercase tracking-tighter">Everything you need</h3>
               <div className="flex gap-4">
                  <button onClick={() => scroll('left')} className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-[#254F1A] transition-all"><ChevronLeft /></button>
                  <button onClick={() => scroll('right')} className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-[#254F1A] transition-all"><ChevronRight /></button>
               </div>
            </div>

            <div 
               ref={carouselRef}
               className="flex gap-10 overflow-x-auto pt-16 pb-16 no-scrollbar snap-x snap-mandatory scroll-smooth"
            >
               {[
                 { 
                    title: 'Schedule and auto-post for every post type', 
                    desc: 'Easily schedule and auto-publish single images, videos, and carousel posts across your platforms.', 
                    color: 'bg-[#800000]', 
                    renderBg: <ScheduleCardBg />
                 },
                 { 
                    title: 'Cross-post and share everywhere', 
                    desc: 'Schedule seamlessly to Instagram, Facebook, TikTok and more – all from one place.', 
                    color: 'bg-[#FF9313]', 
                    renderBg: <CrosspostCardBg /> 
                 },
                 { 
                    title: 'Design and plan your perfect feed', 
                    desc: 'Preview and arrange posts to match your desired brand aesthetic.', 
                    color: 'bg-[#402010]', 
                    renderBg: <FeedPlannerCardBg /> 
                 },
                 { 
                    title: 'AI Content Insights', 
                    desc: 'Get data-driven recommendations for your next viral post.', 
                    color: 'bg-[#000B8C]', 
                    renderBg: <AIInsightsCardBg /> 
                 }
               ].map((card, i) => (
                 <div key={i} className={`${card.color} text-white min-w-[320px] md:min-w-[450px] p-8 md:p-16 rounded-[40px] md:rounded-[60px] snap-center hover:-translate-y-8 transition-all duration-700 aspect-[4/5] flex flex-col justify-end relative overflow-hidden group shadow-2xl space-y-4`}>
                    {card.renderBg}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                    <div className="relative z-10 space-y-6 flex flex-col text-left">
                        <h4 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tighter leading-tight">{card.title}</h4>
                        <p className="text-lg font-medium opacity-80 leading-relaxed">{card.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 4. VISUAL FEED PLANNER - DARK CHARCOAL */}
      <section className="py-40 px-6 md:px-20 bg-[#1E2330] text-white">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-32 text-center lg:text-left">
            <div className="w-full lg:w-1/2 space-y-12 flex flex-col items-center lg:items-start">
               <SectionHeading 
                  subtitle="VISUAL FEED PLANNER" 
                  title="Plan your picture-perfect feed." 
                  description="Easily plan and preview your Instagram feed before you post. Upload your content, drag and drop them into place, and perfect your layout with Monkey Bio’s visual feed planner."
                  light
               />
               <Reveal delay={0.3} width="fit-content" overflowVisible>
                  <motion.button 
                    whileHover={{ scale: 1.05, backgroundColor: '#FF6B6B', color: '#FFF' }}
                    className="px-14 py-7 bg-[#FF6B6B] text-white rounded-full font-extrabold uppercase text-sm shadow-xl transition-all"
                  >
                    Get started for free
                  </motion.button>
               </Reveal>
            </div>
            <motion.div 
               initial={{ opacity: 0, x: 100 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="w-full lg:w-1/2 flex justify-center"
            >
               <GridFeedPreview />
            </motion.div>
         </div>
      </section>

      {/* 5. STEP BY STEP - BLUE */}
      <section className="py-40 px-6 md:px-20 bg-[#4037FF] text-white">
         <div className="max-w-7xl mx-auto">
            <SectionHeading subtitle="GET STARTED" title="How to trend in 3 steps" light centered />
            <div className="grid md:grid-cols-3 gap-20 mt-32 text-center md:text-left">
               {[
                 { step: '01', title: 'Plan and create', desc: 'Create your social posts and use our AI tools to optimize your captions and hashtags.' },
                 { step: '02', title: 'Schedule with ease', desc: 'Drag and drop your posts into our visual planner and pick the perfect time to post.' },
                 { step: '03', title: 'Auto-post and relax', desc: 'Sit back while Monkey Bio auto-posts your scheduled content across every platform.' }
               ].map((s, idx) => (
                 <Reveal key={idx} delay={idx * 0.1} width="100%">
                    <div className="space-y-6 flex flex-col items-center md:items-start">
                       <span className="text-3xl font-black opacity-20 text-white">{s.step}</span>
                       <h4 className="text-2xl font-extrabold uppercase tracking-tighter leading-tight">{s.title}</h4>
                       <p className="text-white/70 font-medium leading-relaxed">{s.desc}</p>
                    </div>
                 </Reveal>
               ))}
            </div>
         </div>
      </section>

      {/* 6. FAQ SECTION - SUNSET ORANGE (#EA580C) */}
      <section className="py-40 bg-[#EA580C] px-6 md:px-20 capitalize text-white">
         <div className="max-w-4xl mx-auto flex flex-col items-center">
            <div className="text-center mb-32">
               <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter text-white">Frequently shared questions</h2>
            </div>
            
            <div className="space-y-6 w-full">
               {[
                 { q: "Which platforms can I auto-post to?", a: "You can schedule and auto-post content to Instagram (Business & Creator accounts), TikTok, Facebook, LinkedIn and YouTube Shorts." },
                 { q: "Is the visual feed planner included in the free plan?", a: "Yes, the visual feed planner is available to all Monkey Bio users, allowing you to preview and arrange your grid aesthetic effortlessly." },
                 { q: "What is auto-posting versus scheduling?", a: "Scheduling gives you a notification when it's time to post. Auto-posting handles the entire publishing process for you, so your content goes live without you lifting a finger." }
               ].map((item, i) => (
                 <FAQItem key={i} question={item.q} answer={item.a} activeColor="text-[#EA580C]" />
               ))}
            </div>
         </div>
      </section>

      {/* 7. FINAL CTA - DEEP PURPLE */}
      <section className="py-60 bg-[#502274] px-6 md:px-20 relative overflow-hidden text-center text-white">
         <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center">
            <Reveal width="100%">
               <h2 className="text-6xl md:text-[8rem] font-extrabold tracking-tighter uppercase leading-[0.85] mb-12 text-white">
                 Join the <br /><span className="text-[#DEF141]">modern movement</span> of creators
               </h2>
            </Reveal>
            <Reveal width="100%" delay={0.2} overflowVisible>
               <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: '#FFFFFF', color: '#502274' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-16 py-8 bg-[#DEF141] text-black rounded-full font-extrabold uppercase text-sm shadow-3xl transition-all"
               >
                  Try Monkey Bio for free
               </motion.button>
            </Reveal>
         </div>
         {/* Background Decoration */}
         <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[30rem] font-extrabold opacity-[0.03] select-none pointer-events-none uppercase tracking-tighter text-white leading-none">BIO</div>
      </section>

    </div>
  )
}
