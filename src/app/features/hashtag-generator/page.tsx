'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from '@/components/Reveal'
import { SectionBadge } from '@/components/SectionBadge'
import { 
  Plus, 
  Minus, 
  ArrowRight, 
  Hash, 
  Zap, 
  TrendingUp, 
  Smartphone, 
  Search, 
  Layers, 
  CheckCircle2,
  Instagram,
  Settings,
  Sparkles,
  Award
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

// HASHTAG MOCKUPS
function HashtagHeroMockup() {
    const tags = ['#selfie', '#viral', '#picoftheday', '#trending', '#monkeybio', '#engagement']
    return (
        <div className="w-full max-w-lg aspect-[0.9] bg-[#CC01DD] rounded-[60px] shadow-[0_50px_100px_rgba(0,0,0,0.3)] border border-white/20 p-10 relative overflow-hidden flex flex-col gap-8 text-left">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(210,232,35,0.15),transparent)]"></div>
            <div className="relative z-10 flex flex-col h-full gap-8">
                <div className="bg-white/10 backdrop-blur-2xl rounded-4xl p-8 border border-white/10 flex-1 space-y-6 text-left">
                    <div className="text-[10px] font-black uppercase tracking-widest text-[#D2E823] leading-none mb-4">Hashtag Generator</div>
                    <div className="grid grid-cols-2 gap-4">
                        {tags.map((tag, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="h-10 bg-white/5 rounded-2xl flex items-center px-4 gap-2 text-[10px] font-black tracking-widest text-white/60 lowercase border border-white/5"
                            >
                                <Hash size={12} className="opacity-40" />
                                {tag.substring(1)}
                            </motion.div>
                        ))}
                    </div>
                </div>
                <div className="h-20 bg-[#D2E823] rounded-full flex items-center justify-between px-10 shadow-lg">
                    <span className="text-[11px] font-black uppercase text-black tracking-widest">Generate Tags</span>
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-[#D2E823] shadow-md hover:scale-105 transition-transform"><ArrowRight /></div>
                </div>
            </div>
        </div>
    )
}

function HashtagCardBg() {
    return (
        <div className="absolute inset-0 overflow-hidden opacity-[0.08]">
            <div className="absolute inset-0 flex flex-wrap gap-10 p-10 rotate-12 -translate-x-10">
                {[...Array(20)].map((_, i) => (
                    <Hash key={i} size={80} strokeWidth={3} className="text-black" />
                ))}
            </div>
        </div>
    )
}

export default function HashtagGeneratorPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#CC01DD] selection:text-white overflow-x-hidden">

      {/* 1. HERO SECTION - MAGENTA */}
      <section className="pt-48 pb-32 px-6 md:px-20 relative overflow-visible bg-[#CC01DD] text-white text-center">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20 relative z-10 text-center lg:text-left">
          <div className="w-full lg:w-1/2 space-y-12 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Reveal width="100%" overflowVisible>
                <div className="flex justify-center lg:justify-start w-full">
                  <SectionBadge icon={Hash} title="Hashtag Generator" light />
                </div>
            </Reveal>
            <SectionHeading 
              subtitle="HASHTAGS MADE EASY"
              title="Viral-worthy Instagram hashtag generator" 
              description="Growing your audience is easier than ever. Use our hashtag generator to discover and save the best hashtags, helping your posts reach more people and attract the right followers."
              light 
            />
            <Reveal delay={0.3} width="100%" overflowVisible>
                <div className="flex justify-center lg:justify-start w-full">
                    <motion.button 
                        whileHover={{ scale: 1.05, backgroundColor: '#FFFFFF', color: '#CC01DD' }} 
                        whileTap={{ scale: 0.95 }}
                        className="px-14 py-7 bg-[#D2E823] text-black rounded-full font-extrabold uppercase text-sm shadow-2xl transition-all"
                    >
                        Get started for free
                    </motion.button>
                </div>
            </Reveal>
          </div>
          <motion.div 
             initial={{ opacity: 0, scale: 0.9, y: 50 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             transition={{ duration: 1.2, delay: 0.4 }}
             className="w-full lg:w-1/2 flex justify-center lg:justify-end"
          >
             <div className="aspect-square w-full max-w-md bg-white rounded-[60px] md:rounded-[80px] shadow-5xl border-[15px] border-white/5 overflow-hidden relative group">
                <img src="/images/analyze.png" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" alt="Hashtag Analytics" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <HashtagHeroMockup />
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* 2. FEATURES GRID - FOREST GREEN (#254F1A) */}
      <section className="py-40 px-6 md:px-20 bg-[#254F1A] overflow-hidden relative text-white">
         <div className="max-w-7xl mx-auto text-center pt-20 flex flex-col items-center">
            <SectionHeading 
               subtitle="FIND HASHTAGS THAT WORK"
               title="Unlock the power of hashtags." 
               description="Cut through the noise and get your content in front of the right audience with suggested hashtags tailored to maximize visibility and engagement."
               light
               centered
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-24 text-center md:text-left">
               {[
                 { title: 'Get instant suggestions', desc: 'No more manual research. Get perfect mix of popular and hyper-relevant hashtags in seconds.' },
                 { title: 'Grow your online presence', desc: 'Reach a broader audience by appearing in searches related to your content.' },
                 { title: 'Platform-specific results', desc: 'Get optimized hashtags for Instagram, TikTok, YouTube, Threads and LinkedIn.' }
               ].map((item, idx) => (
                 <Reveal key={idx} delay={idx * 0.1}>
                    <div className="bg-white p-12 md:p-16 rounded-[60px] shadow-sm hover:shadow-2xl transition-all duration-700 space-y-10 group border border-white/5 relative overflow-hidden aspect-[4/5] flex flex-col justify-end items-center md:items-start text-center md:text-left hover:-translate-y-8 text-black h-full">
                       <HashtagCardBg />
                       <div className="relative z-10 space-y-6 flex flex-col items-center md:items-start w-full">
                            <div className="w-16 h-16 rounded-full bg-[#CC01DD] flex items-center justify-center group-hover:scale-110 transition-transform text-white shadow-xl">
                                <Hash size={28} />
                            </div>
                            <h4 className="text-2xl font-extrabold uppercase tracking-tighter leading-tight">{item.title}</h4>
                            <p className="text-black/50 font-medium leading-relaxed">{item.desc}</p>
                       </div>
                    </div>
                 </Reveal>
               ))}
            </div>
            <div className="mt-20 flex justify-center w-full">
               <Reveal width="100%" overflowVisible>
                  <div className="flex justify-center w-full">
                      <motion.button 
                        whileHover={{ scale: 1.05, backgroundColor: '#D2E823', color: '#000' }}
                        className="px-14 py-7 bg-white text-black rounded-full font-extrabold uppercase text-sm shadow-xl transition-all"
                      >
                        Get started for free
                      </motion.button>
                  </div>
               </Reveal>
            </div>
         </div>
      </section>

      {/* 3. STEP-BY-STEP - LIME GREEN (#D2E823) */}
      <section className="py-40 px-6 md:px-20 bg-[#D2E823] text-black">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-32 text-center lg:text-left">
            <div className="w-full lg:w-1/2 space-y-12 flex flex-col items-center lg:items-start">
               <SectionHeading 
                  subtitle="INSTAGRAM HASHTAG GENERATOR"
                  title="How to generate hashtags" 
               />
               <div className="space-y-10 w-full flex flex-col items-center lg:items-start">
                  {[
                    { step: '01', title: 'Add your content details', desc: 'Enter keywords or a brief description of what your post is about.' },
                    { step: '02', title: 'Select your platform', desc: 'Choose where you’re posting – Instagram, TikTok, YouTube or more.' },
                    { step: '03', title: 'Generate hashtags', desc: 'Receive a curated list of hashtags designed to maximize your reach.' }
                  ].map((s, i) => (
                    <Reveal key={i} delay={i * 0.1}>
                       <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start">
                          <span className="text-xl font-extrabold opacity-20">{s.step}</span>
                          <div className="space-y-2 text-center md:text-left">
                             <h4 className="text-xl font-extrabold uppercase tracking-tighter">{s.title}</h4>
                             <p className="text-black/60 font-medium leading-relaxed">{s.desc}</p>
                          </div>
                       </div>
                    </Reveal>
                  ))}
               </div>
               <Reveal width="100%" delay={0.4} overflowVisible>
                  <div className="flex justify-center lg:justify-start w-full">
                      <motion.button 
                        whileHover={{ scale: 1.05, backgroundColor: '#0000FF', color: '#FFF' }}
                        className="px-14 py-7 bg-[#0000FF] text-white rounded-full font-extrabold uppercase text-sm shadow-xl transition-all"
                      >
                        Get started for free
                      </motion.button>
                  </div>
               </Reveal>
            </div>
            <motion.div 
               initial={{ opacity: 0, x: 100 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="w-full lg:w-1/2 flex justify-center"
            >
               <div className="aspect-[0.9] w-full max-w-sm rounded-[50px] bg-white p-12 shadow-5xl border-[15px] border-black/5 relative overflow-hidden flex flex-col gap-6 text-left">
                   <div className="text-[10px] font-black uppercase text-black/40 tracking-tighter mb-8 leading-none">Generated Tags</div>
                   {[...Array(6)].map((_, i) => (
                       <div key={i} className="h-8 bg-black/[0.03] border border-black/5 rounded-xl px-4 flex items-center text-[10px] font-bold text-black/20">#trend_item_{i + 1}</div>
                   ))}
               </div>
            </motion.div>
         </div>
      </section>

      {/* 4. FAQ SECTION - ROYAL BLUE (#2665D6) */}
      <section className="py-40 bg-[#2665D6] px-6 md:px-20 capitalize text-white">
         <div className="max-w-4xl mx-auto flex flex-col items-center">
            <div className="text-center mb-32">
               <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter text-white">Frequently shared questions</h2>
            </div>
            
            <div className="space-y-6 w-full">
               {[
                 { q: "How do I see and manage hashtag recommendations?", a: "When you use the hashtag generator, recommendations are displayed instantly. You can select the ones that fit your post and even save sets for future use in your Monkey Bio dashboard." },
                 { q: "Is the hashtag generator free to use?", a: "Yes, Monkey Bio offers a free hashtag generator for all users. Pro plan subscribers get access to more advanced multi-platform results and AI-driven timing optimizations." },
                 { q: "Which platforms does the generator support?", a: "Currently we support optimized hashtags for Instagram, TikTok, YouTube, Threads, and LinkedIn." },
                 { q: "How often should I change my hashtags?", a: "We recommend refreshing your hashtag sets every few weeks to keep up with trending topics and avoid potential reach limitations from the platform algorithms." }
               ].map((item, i) => (
                 <FAQItem key={i} question={item.q} answer={item.a} activeColor="text-[#2665D6]" />
               ))}
            </div>
         </div>
      </section>

      {/* 5. FINAL CTA - DEEP PURPLE */}
      <section className="py-48 px-6 md:px-20 bg-[#502274] text-white text-center relative overflow-hidden">
         <div className="max-w-5xl mx-auto relative z-10 text-white flex flex-col items-center">
            <Reveal width="100%">
               <h2 className="text-5xl md:text-[8rem] font-extrabold tracking-tighter uppercase leading-[0.85] mb-12 text-white">
                 Jumpstart your <br /><span className="text-[#D3E923]">corner of the internet</span> today
               </h2>
            </Reveal>
            <Reveal width="100%" delay={0.2} overflowVisible>
               <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: '#FFFFFF', color: '#502274' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-16 py-8 bg-[#D3E923] text-black rounded-full font-extrabold uppercase text-sm shadow-3xl transition-all"
               >
                  Get started for free
               </motion.button>
            </Reveal>
         </div>
         {/* Background Decoration */}
         <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[30rem] font-extrabold opacity-[0.03] select-none pointer-events-none uppercase tracking-tighter text-white leading-none">BIO</div>
      </section>

    </div>
  )
}
