'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser } from '@/hooks/useUser'
import { Reveal } from '@/components/Reveal'
import { SectionBadge } from '@/components/SectionBadge'
import { 
  BarChart3, 
  TrendingUp, 
  MousePointer2, 
  Globe, 
  Smartphone, 
  PieChart, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Zap, 
  Download, 
  Target,
  Plus,
  Minus
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
              <span className={`text-[11px] font-black uppercase tracking-[0.4em] ${light ? 'text-white/40' : 'text-black/40'}`}>{subtitle}</span>
          </Reveal>
        )}
        <Reveal delay={0.1} width={centered ? '100%' : 'fit-content'}>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter uppercase leading-[1.1] ${light ? 'text-white' : 'text-black'}`}>
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

// --- MOCKUPS ---

function AnalyticsHeroMockup() {
    return (
        <div className="w-full max-w-lg bg-white rounded-[60px] shadow-5xl border-[15px] border-black/5 p-10 relative overflow-visible flex flex-col gap-10 text-left">
            <div className="flex justify-between items-center">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-black/40">Real-time Traffic</p>
                    <h4 className="text-3xl font-black uppercase tracking-tighter">1,240 <span className="text-emerald-500 text-xs ml-2">↗ 24%</span></h4>
                 </div>
                 <div className="w-14 h-14 rounded-2xl bg-black/5 flex items-center justify-center text-black">
                    <BarChart3 size={24} />
                 </div>
            </div>
            
            <div className="h-40 w-full flex items-end gap-2 px-2 pb-2">
                {[40, 70, 45, 90, 65, 80, 50, 100, 75, 85].map((h, i) => (
                    <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 0.5 + (i * 0.1), duration: 1 }}
                        className="flex-1 bg-black/10 rounded-t-xl relative group"
                    >
                        <div className="absolute inset-0 bg-[#D2E823] opacity-0 group-hover:opacity-100 transition-opacity rounded-t-xl"></div>
                    </motion.div>
                ))}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-gray-50 rounded-[30px] border border-black/5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center"><MousePointer2 size={14} /></div>
                        <p className="text-[8px] font-black uppercase tracking-widest text-black/40">Link Clicks</p>
                    </div>
                    <p className="text-xl font-black">42.5k</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-[30px] border border-black/5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-[#D2E823] text-black flex items-center justify-center"><TrendingUp size={14} /></div>
                        <p className="text-[8px] font-black uppercase tracking-widest text-black/40">Engagement</p>
                    </div>
                    <p className="text-xl font-black">72.4%</p>
                </div>
            </div>
        </div>
    )
}

function TrafficSourceMockup() {
    return (
        <div className="w-full max-w-md bg-black rounded-[60px] shadow-5xl border-[15px] border-white/5 p-10 relative overflow-visible flex flex-col gap-8 text-left text-white">
            <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Top Referral Channels</p>
                <h4 className="text-2xl font-black uppercase tracking-tighter">Social Channels</h4>
            </div>
            
            <div className="space-y-4">
                {[
                    { name: 'Instagram', val: 75, color: 'from-purple-500 to-pink-500' },
                    { name: 'TikTok', val: 62, color: 'from-gray-700 to-black' },
                    { name: 'LinkedIn', val: 45, color: 'from-blue-600 to-blue-800' },
                    { name: 'YouTube', val: 38, color: 'from-red-600 to-red-800' }
                ].map((item, i) => (
                    <div key={i} className="space-y-2">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest px-1">
                            <span>{item.name}</span>
                            <span>{item.val}%</span>
                        </div>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: `${item.val}%` }}
                                transition={{ duration: 1.5, delay: i * 0.2 }}
                                className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function AnalyticsPage() {
  const { user } = useUser()
  const targetLink = user ? '/dashboard' : '/signup'

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#FF4D00] selection:text-white overflow-x-hidden">

      {/* 1. HERO SECTION - VIBRANT ORANGE-RED (#FF4D00) */}
      <section className="pt-48 pb-32 px-6 md:px-20 relative overflow-visible bg-[#FF4D00] text-white">
        <div className="max-w-7xl mx-auto relative z-10 text-center flex flex-col items-center gap-12">
            <Reveal width="100%" overflowVisible>
                <SectionBadge icon={BarChart3} title="Data that drives success" light />
            </Reveal>
            
            <Reveal delay={0.1}>
                <h1 className="text-5xl md:text-[7rem] font-extrabold tracking-tighter leading-[1.1] uppercase">
                  Improve performance <br className="hidden md:block" /><span className="text-[#D2E823]">with smart insights.</span>
                </h1>
            </Reveal>
            
            <Reveal delay={0.2} width="100%">
                 <p className="text-xl md:text-3xl font-medium text-white/60 max-w-3xl mx-auto leading-relaxed uppercase italic">
                    Make data-driven decisions for your Monkey Bio and social media platforms with analytics that are easy to understand.
                 </p>
            </Reveal>

          <Reveal delay={0.4} width="100%" overflowVisible>
              <div className="flex justify-center w-full">
                <Link href={targetLink}>
                    <motion.button 
                        whileHover={{ scale: 1.05, backgroundColor: '#FFFFFF', color: '#FF4D00', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }} 
                        whileTap={{ scale: 0.95 }}
                        className="px-16 py-8 bg-[#D2E823] text-black rounded-full font-black uppercase text-lg shadow-5xl transition-all"
                    >
                        EXPLORE DATA ↗
                    </motion.button>
                </Link>
              </div>
          </Reveal>
          
          <motion.div 
             initial={{ opacity: 0, scale: 0.9, y: 50 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             transition={{ duration: 1.2, delay: 0.4 }}
             className="w-full flex justify-center mt-12 overflow-visible"
          >
             <div className="aspect-video w-full max-w-5xl rounded-[60px] md:rounded-[80px] shadow-5xl border-[15px] border-white/5 overflow-hidden relative group bg-white">
                <img src="/images/about_problem_maze_3d.png" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 opacity-90 scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FF4D00]/20 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center p-10">
                   <div className="max-w-2xl text-center">
                       <AnalyticsHeroMockup />
                   </div>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* 2. CONVERSION SECTION - WHITE */}
      <section className="py-40 px-6 md:px-20 bg-white text-black">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-32 text-center lg:text-left">
            <motion.div 
               initial={{ opacity: 0, x: -100 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="w-full lg:w-1/2 flex justify-center"
            >
               <div className="relative group">
                   <div className="absolute -inset-10 bg-[#FF4D00]/10 rounded-full blur-[80px] group-hover:opacity-100 transition-opacity opacity-50"></div>
                   <div className="aspect-[4/5] w-full max-w-sm bg-white rounded-[70px] shadow-4xl border-[12px] border-black/5 overflow-hidden relative z-10 flex flex-col gap-6 p-8">
                        <div className="flex items-center gap-4 border-b border-black/5 pb-6">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg"><MousePointer2 size={24} /></div>
                            <h5 className="font-black uppercase text-[12px] tracking-widest">Conversion Tracking</h5>
                        </div>
                        <div className="space-y-4 pt-4">
                            {[
                                { lab: 'Total Views', val: '52k', inc: '+12%' },
                                { lab: 'Total Clicks', val: '30k', inc: '+18%' },
                                { lab: 'Click Rate', val: '72%', inc: '+5%' },
                                { lab: 'Subscribers', val: '94', inc: '+32%' }
                            ].map((stat, i) => (
                                <div key={i} className="flex justify-between items-end">
                                    <div>
                                        <p className="text-[8px] font-black uppercase tracking-widest text-black/30 pb-1">{stat.lab}</p>
                                        <p className="text-2xl font-black uppercase tracking-tight">{stat.val}</p>
                                    </div>
                                    <span className="text-[10px] font-black text-emerald-500 pb-1">{stat.inc}</span>
                                </div>
                            ))}
                        </div>
                   </div>
               </div>
            </motion.div>

            <div className="w-full lg:w-1/2 space-y-12 flex flex-col items-center lg:items-start text-center lg:text-left">
               <SectionHeading 
                  subtitle="Maximize Engagement"
                  title="Turn clicks into customers." 
                  description="Track which links and posts drive engagement with Monkey Bio’s analytics. See clicks, traffic sources and audience behavior in real time to refine your strategy."
               />
               <div className="space-y-6">
                  {['Real-time link monitoring', 'Audience behavior tracking', 'Conversion path insights'].map((text, i) => (
                    <Reveal key={i} delay={0.3 + (i * 0.1)}>
                       <div className="flex items-center gap-4 text-[#FF4D00]">
                          <CheckCircle2 size={24} />
                          <span className="text-sm font-black uppercase tracking-widest text-black leading-none">{text}</span>
                       </div>
                    </Reveal>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* 3. TRENDS SECTION - DARK BLUE (#111D37) */}
      <section className="py-40 px-6 md:px-20 bg-[#111D37] text-white">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-32 text-center lg:text-left">
            <div className="w-full lg:w-1/2 space-y-12 flex flex-col items-center lg:items-start lg:order-2">
               <SectionHeading 
                  subtitle="Powerful Insights"
                  title="Simplify your data." 
                  description="Our analytics tools analyze your data and explain key trends in plain language, helping you quickly understand what’s working and what’s not."
                  light
               />
               <Reveal delay={0.3} width="fit-content">
                    <Link href={targetLink}>
                        <motion.button 
                            whileHover={{ scale: 1.05, backgroundColor: '#D2E823', color: '#000' }}
                            className="px-14 py-7 bg-white text-black rounded-full font-black uppercase text-sm shadow-3xl transition-all"
                        >
                            ANALYZE TRENDS ↗
                        </motion.button>
                    </Link>
               </Reveal>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center lg:order-1">
               <TrafficSourceMockup />
            </div>
         </div>
      </section>

      {/* 4. REPORTS SECTION - LIME (#D2E823) */}
      <section className="py-40 px-6 md:px-20 bg-[#D2E823] text-black overflow-hidden relative">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-32 text-center lg:text-left relative z-10">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="w-full lg:w-1/2 flex justify-center"
            >
               <div className="w-full max-w-sm bg-white rounded-[50px] shadow-5xl border border-black/5 p-12 flex flex-col gap-8 group hover:-translate-y-4 transition-all duration-700">
                    <div className="w-16 h-16 rounded-2xl bg-[#D2E823] flex items-center justify-center text-black shadow-lg"><Download size={32} /></div>
                    <div className="space-y-4">
                        <h4 className="text-3xl font-black uppercase tracking-tighter">Downloadable Reports</h4>
                        <p className="text-sm font-medium text-black/50 leading-relaxed">Export your audience and performance data in CSV or PDF format with one click.</p>
                    </div>
                    <div className="pt-4 flex items-center justify-between border-t border-black/5">
                        <span className="text-[10px] font-black uppercase tracking-widest">Industry Benchmarking</span>
                        <div className="flex gap-1">
                            <Plus size={16} />
                        </div>
                    </div>
               </div>
            </motion.div>

            <div className="w-full lg:w-1/2 space-y-12 flex flex-col items-center lg:items-start">
               <SectionHeading 
                  subtitle="Competitor Analysis"
                  title="Benchmark against your industry." 
                  description="Compare your engagement, views and link conversions with competitors in your sector, then export data for deeper analysis."
               />
               <Reveal delay={0.3}>
                  <div className="flex items-center gap-8">
                      <div className="text-center group cursor-pointer">
                          <div className="w-16 h-16 rounded-full border-4 border-black/5 flex items-center justify-center mb-3 group-hover:bg-black group-hover:text-white transition-all">
                              <Target size={24} />
                          </div>
                          <p className="text-[8px] font-black uppercase tracking-widest">Industry Stats</p>
                      </div>
                      <div className="text-center group cursor-pointer">
                          <div className="w-16 h-16 rounded-full border-4 border-black/5 flex items-center justify-center mb-3 group-hover:bg-black group-hover:text-white transition-all">
                              <Download size={24} />
                          </div>
                          <p className="text-[8px] font-black uppercase tracking-widest">Export All</p>
                      </div>
                      <div className="text-center group cursor-pointer">
                          <div className="w-16 h-16 rounded-full border-4 border-black/5 flex items-center justify-center mb-3 group-hover:bg-black group-hover:text-white transition-all">
                              <Zap size={24} />
                          </div>
                          <p className="text-[8px] font-black uppercase tracking-widest">Real-time</p>
                      </div>
                  </div>
               </Reveal>
            </div>
         </div>
      </section>

      {/* 5. FAQ SECTION - DEEP TEAL (#133333) */}
      <section className="py-40 bg-[#133333] px-6 md:px-20 text-white">
         <div className="max-w-4xl mx-auto flex flex-col items-center">
            <SectionBadge icon={Zap} title="Analytics FAQ" light />
            <SectionHeading 
              title="Common Questions" 
              description="Learn more about how to use Monkey Bio analytics to grow."
              light
              centered
            />
            
            <div className="w-full space-y-6 mt-12">
               {[
                 { 
                   q: 'What data can I track with Monkey Bio analytics?', 
                   a: 'Includes link clicks, traffic sources, profile views, and social media post engagement across various platforms.' 
                 },
                 { 
                   q: 'Can I see analytics for my scheduled social media posts too?', 
                   a: 'Yes, it covers posts across platforms like LinkedIn, Instagram, and TikTok in one dashboard.' 
                 },
                 { 
                   q: 'How do analytics help improve my performance?', 
                   a: 'By showing what content drives clicks and where the audience comes from, allowing for data-driven strategic refinements.' 
                 }
               ].map((faq, i) => (
                 <FAQItem key={i} question={faq.q} answer={faq.a} activeColor="text-[#D2E823]" />
               ))}
            </div>
         </div>
      </section>

      {/* 6. CTA SECTION - ORANGE-RED */}
      <section className="py-40 px-6 md:px-20 bg-[#FF4D00] text-white">
          <div className="max-w-7xl mx-auto text-center space-y-12">
              <h2 className="text-5xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85]">
                  MASTER YOUR <br/> <span className="text-[#D2E823] italic">DATA ENGINE.</span>
              </h2>
              <Reveal delay={0.2} width="100%">
                  <p className="text-xl md:text-3xl font-medium text-white/40 max-w-3xl mx-auto uppercase tracking-wide">
                      Connect your tools and start building your audience today. No complex setup, just results.
                  </p>
              </Reveal>
              <Reveal delay={0.4} width="100%" overflowVisible>
                  <div className="flex justify-center w-full">
                    <Link href={targetLink}>
                        <motion.button 
                            whileHover={{ scale: 1.1, backgroundColor: '#D2E823', color: '#000' }} 
                            whileTap={{ scale: 0.95 }}
                            className="px-20 py-10 bg-white text-[#FF4D00] rounded-full font-black uppercase text-xl shadow-5xl transition-all"
                        >
                            GET STARTED FOR FREE
                        </motion.button>
                    </Link>
                  </div>
              </Reveal>
          </div>
      </section>

    </div>
  )
}
