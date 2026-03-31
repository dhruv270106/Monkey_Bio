'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser } from '@/hooks/useUser'
import { Reveal } from '@/components/Reveal'
import { SectionBadge } from '@/components/SectionBadge'
import { 
  Users, 
  Target, 
  Zap, 
  BarChart3, 
  Mail, 
  MessageSquare, 
  Smartphone, 
  Share2, 
  ArrowRight,
  Plus,
  Minus,
  Sparkles,
  Link as LinkIcon,
  Bot,
  TrendingUp,
  Award,
  Globe,
  Heart,
  Filter,
  CheckCircle2,
  Bell,
  Layers,
  Database,
  Clock,
  Search,
  ChevronRight
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
        <h4 className={`text-lg md:text-xl font-black uppercase tracking-wide transition-colors pr-8 ${isOpen ? activeColor : 'text-black group-hover:' + activeColor}`}>
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
        {!subtitle && null} { /* Subtitle handled by Badge now */ }
        <Reveal delay={0.1} width={centered ? '100%' : 'fit-content'}>
            <h2 className={`text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.95] ${light ? 'text-white' : 'text-black'}`}>
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

function AudienceHeroMockup() {
    return (
        <div className="w-full max-w-2xl bg-white rounded-[60px] shadow-5xl border-[15px] border-black/5 p-10 relative flex flex-col gap-8 text-left h-auto min-h-[500px]">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white shadow-xl"><Users size={24} /></div>
                    <div>
                        <h4 className="text-sm font-black uppercase tracking-widest leading-none">Subscribers</h4>
                        <p className="text-[10px] font-bold text-black/40 uppercase mt-1">Real-time audience list</p>
                    </div>
                </div>
                <div className="px-6 py-3 bg-black/5 rounded-full text-[10px] font-black uppercase tracking-widest">Total: 12,842</div>
            </div>
            
            <div className="space-y-4 flex-1">
                {[
                    { name: 'Alex Rivera', source: 'Instagram', time: '2m ago', color: 'bg-pink-500' },
                    { name: 'Elena Rossi', source: 'TikTok', time: '15m ago', color: 'bg-black' },
                    { name: 'Sam Wilson', source: 'Twitter', time: '1h ago', color: 'bg-blue-400' },
                ].map((item, i) => (
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + (i * 0.1) }}
                        key={i} 
                        className="flex items-center justify-between p-5 bg-gray-50 rounded-3xl border border-black/5 group hover:bg-black transition-all cursor-pointer hover:scale-105 shadow-sm hover:shadow-2xl"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white border-2 border-white shadow-sm overflow-hidden flex items-center justify-center font-black text-xs">
                                {item.name[0]}
                            </div>
                            <div>
                                <p className="text-xs font-black uppercase tracking-tight group-hover:text-white transition-colors">{item.name}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className={`w-1.5 h-1.5 rounded-full ${item.color}`}></div>
                                    <p className="text-[8px] font-bold uppercase tracking-widest text-black/30 group-hover:text-white/40 transition-colors">{item.source}</p>
                                </div>
                            </div>
                        </div>
                        <span className="text-[8px] font-black uppercase tracking-widest text-black/20 group-hover:text-white/20 transition-colors">{item.time}</span>
                    </motion.div>
                ))}
            </div>
            
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#D2E823] rounded-full blur-[60px] opacity-20 -z-10"></div>
        </div>
    )
}

function IntegrationMockup({ lightBg = false }) {
    return (
        <div className="grid grid-cols-2 gap-4 md:gap-8 w-full max-w-md p-4 overflow-visible">
            {[
                { name: 'Mailchimp', icon: <Mail />, color: 'bg-[#FFE01B]' },
                { name: 'Klaviyo', icon: <Database />, color: 'bg-[#15D562]' },
                { name: 'Kit', icon: <Zap />, color: 'bg-[#212529]' },
                { name: 'Slack', icon: <MessageSquare />, color: 'bg-[#4A154B]' }
            ].map((tool, i) => (
                <Reveal key={i} delay={i * 0.1} overflowVisible>
                    <div className="relative group perspective-2000 overflow-visible">
                        <div className={`${tool.color} p-6 md:p-10 rounded-[40px] aspect-square flex flex-col items-center justify-center gap-4 text-white shadow-2xl transition-all duration-700 group-hover:rotate-y-12 group-hover:scale-110 border border-white/20 overflow-visible relative`}>
                            {/* Inner Glass Box to fix clipping visual */}
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/25 flex items-center justify-center backdrop-blur-md shadow-inner text-white group-hover:scale-110 transition-transform">
                                {React.cloneElement(tool.icon as React.ReactElement, { size: isMobile() ? 24 : 32 })}
                            </div>
                            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest leading-none text-white shadow-sm">{tool.name}</span>
                            
                            <div className="absolute top-4 right-4 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform">
                                <CheckCircle2 size={10} className="text-black" />
                            </div>
                        </div>
                        {/* Shadow backup to prevent edge cutting */}
                        <div className="absolute inset-4 -z-10 bg-black/20 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity"></div>
                    </div>
                </Reveal>
            ))}
        </div>
    )
}

function isMobile() {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
}

export default function AudienceManagerPage() {
  const { user } = useUser()
  const targetLink = user ? '/dashboard' : '/signup'

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#422066] selection:text-white overflow-x-hidden">

      {/* 1. HERO SECTION - DEEP PURPLE (#422066) */}
      <section className="pt-48 pb-32 px-6 md:px-20 relative overflow-visible bg-[#422066] text-white">
        <div className="max-w-7xl mx-auto relative z-10 text-center flex flex-col items-center gap-12">
            <Reveal width="100%" overflowVisible>
                <SectionBadge icon={Users} title="Audience Management" light />
            </Reveal>
            
            <Reveal delay={0.1}>
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase">
                  Collect <br className="hidden md:block" /><span className="text-[#D2E823]">grow & scale.</span>
                </h1>
            </Reveal>
            
            <Reveal delay={0.2} width="100%">
                 <p className="text-xl md:text-3xl font-medium text-white/60 max-w-3xl mx-auto leading-relaxed uppercase italic">
                    Build your customer list, filter contacts, and see exactly where they came from. Turn your profile into a growth machine.
                 </p>
            </Reveal>

          <Reveal delay={0.4} width="100%" overflowVisible>
              <div className="flex justify-center w-full">
                <Link href={targetLink}>
                    <motion.button 
                        whileHover={{ scale: 1.05, backgroundColor: '#FFFFFF', color: '#422066', boxShadow: '0 20px 50px rgba(210,232,35,0.4)' }} 
                        whileTap={{ scale: 0.95 }}
                        className="px-16 py-8 bg-[#D2E823] text-black rounded-full font-black uppercase text-lg shadow-5xl transition-all"
                    >
                        EXPLORE THE TOOLS ↗
                    </motion.button>
                </Link>
              </div>
          </Reveal>
          
          <motion.div 
             initial={{ opacity: 0, scale: 0.9, y: 50 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             transition={{ duration: 1.2, delay: 0.4 }}
             className="w-full flex justify-center mt-12"
          >
             <div className="aspect-[16/9] w-full max-w-5xl rounded-[60px] md:rounded-[80px] shadow-5xl border-[15px] border-white/5 overflow-hidden relative group bg-[#111]">
                <img src="/images/about_mosaic_hero.png" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#422066]/60 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center p-10">
                   <div className="max-w-2xl text-center">
                       <AudienceHeroMockup />
                   </div>
                </div>
             </div>
          </motion.div>
        </div>
        
        {/* Background Decorative Circles */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#D2E823]/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      </section>

      {/* 2. ORGANIZE SECTION - LIME (#D2E823) */}
      <section className="py-40 px-6 md:px-20 bg-[#D2E823] text-black overflow-visible relative">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-32 text-center lg:text-left">
            <motion.div 
               initial={{ opacity: 0, x: 100 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-12"
            >
               <SectionHeading 
                  title="Filter and group your audience" 
                  description="Sort your contacts by signup date, location, or past purchases to send the right message to the right people every time."
               />
               <div className="w-full aspect-[4/3] rounded-[60px] overflow-hidden shadow-4xl border-[12px] border-black/5 bg-white relative group">
                  <img src="/solutions/stack.png" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" />
               </div>
            </motion.div>
            <div className="w-full lg:w-1/2 flex justify-center overflow-visible">
               <div className="grid grid-cols-2 gap-6 w-full max-w-md overflow-visible">
                   {[
                       { label: 'Purchasers', count: '1.2k', icon: <CheckCircle2 /> },
                       { label: 'Newsletter', count: '8.4k', icon: <Mail /> },
                       { label: 'Waitlist', count: '452', icon: <Clock /> },
                       { label: 'Followers', count: '900k', icon: <Award /> }
                   ].map((group, i) => (
                       <Reveal key={i} delay={i * 0.1} overflowVisible>
                        <div className="bg-white p-8 rounded-[50px] shadow-sm flex flex-col justify-end gap-10 hover:shadow-4xl transition-all group aspect-square hover:-translate-y-6 hover:scale-105 border border-black/5 relative overflow-visible">
                            <div className="w-14 h-14 rounded-2xl bg-black/5 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all duration-500 shadow-inner group-hover:shadow-xl">
                                {React.cloneElement(group.icon as React.ReactElement, { size: 28, strokeWidth: 3 })}
                            </div>
                            <div>
                                <h4 className="text-3xl font-black uppercase tracking-tighter leading-none">{group.count}</h4>
                                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-black/30 mt-3">{group.label}</p>
                            </div>
                        </div>
                       </Reveal>
                   ))}
               </div>
            </div>
         </div>
      </section>

      {/* 3. INTEGRATIONS SECTION - ROYAL BLUE (#2665D6) */}
      <section className="py-40 px-6 md:px-20 bg-[#2665D6] text-white overflow-visible">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-32 text-center lg:text-left">
            <div className="w-full lg:w-1/2 space-y-12 flex flex-col items-center lg:items-start lg:order-2">
               <SectionBadge icon={Layers} title="Ecosystem" light />
               <SectionHeading 
                  title="Sync with Mailchimp, Kit & Klaviyo." 
                  description="Automatically export your new leads to your favorite marketing tools. Build your email list directly from your profile while we handle all the heavy lifting."
                  light
               />
               <Reveal delay={0.3} width="fit-content" overflowVisible>
                    <Link href={targetLink}>
                        <motion.button 
                            whileHover={{ scale: 1.05, backgroundColor: '#D2E823', color: '#000', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                            className="px-14 py-7 bg-white text-[#2665D6] rounded-full font-black uppercase text-sm shadow-3xl transition-all"
                        >
                            CONNECT NOW ↗
                        </motion.button>
                    </Link>
               </Reveal>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center lg:order-1 overflow-visible">
               <IntegrationMockup />
            </div>
         </div>
      </section>

      {/* 4. NOTIFICATIONS SECTION - SUNSET ORANGE (#EA580C) */}
      <section className="py-40 px-6 md:px-20 bg-[#EA580C] text-white overflow-visible relative">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-32 text-center lg:text-left">
            <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="w-full lg:w-1/2 flex justify-center overflow-visible"
            >
               <div className="w-full max-w-sm aspect-[9/19] rounded-[60px] bg-white border-[15px] border-white/20 shadow-5xl overflow-hidden relative group">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-100 to-white"></div>
                  
                  {/* Mock Notification Panel */}
                  <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[90%] space-y-4">
                      {[1, 2, 3].map((n) => (
                          <motion.div 
                            key={n}
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 + (n * 0.1) }}
                            className="p-5 bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-black/5 flex items-center gap-4 hover:scale-105 transition-transform"
                          >
                             <div className="w-10 h-10 rounded-full bg-[#EA580C] flex items-center justify-center text-white shadow-lg"><Bell size={20} /></div>
                             <div className="text-left">
                                <p className="text-[10px] font-black uppercase tracking-tight text-black">Monkey Bio Update</p>
                                <p className="text-[8px] font-bold text-black/40 uppercase mt-0.5 whitespace-nowrap">New campaign live now 🔥</p>
                             </div>
                          </motion.div>
                      ))}
                  </div>

                  {/* Phone Bar */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black/10 rounded-b-3xl"></div>
               </div>
            </motion.div>
            <div className="w-full lg:w-1/2 space-y-12 flex flex-col items-center lg:items-start text-center lg:text-left">
               <SectionBadge icon={Bell} title="Retention" light />
               <SectionHeading 
                  title="Update subscribers and drive repeat traffic." 
                  description="Use our Notify tool to send custom notifications directly to your following. Keep them in the loop about new content, product drops, or events."
                  light
               />
               <div className="grid grid-cols-2 gap-8 w-full max-w-md">
                   {[
                       { label: 'Retention', val: '84%' },
                       { label: 'Growth', val: '+240%' }
                   ].map((stat, i) => (
                       <div key={i} className="p-10 bg-white/10 backdrop-blur-md rounded-[50px] border border-white/10 text-center md:text-left hover:bg-white hover:text-[#EA580C] transition-all group cursor-default">
                           <div className="text-4xl font-black mb-2">{stat.val}</div>
                           <p className="text-[11px] font-black uppercase tracking-widest text-white/50 group-hover:text-black/40 leading-none">{stat.label}</p>
                       </div>
                   ))}
               </div>
            </div>
         </div>
      </section>

      {/* 5. FAQ SECTION - TEAL (#008B8B) */}
      <section className="py-40 bg-[#008B8B] px-6 md:px-20 text-white">
         <div className="max-w-4xl mx-auto">
            <div className="text-center mb-32 flex flex-col items-center gap-12">
               <SectionBadge icon={MessageSquare} title="FAQ" light />
               <SectionHeading 
                title="Commonly shared questions" 
                light 
                centered 
               />
            </div>
            
            <div className="space-y-6">
               {[
                 { q: "How do I start collecting leads?", a: "Simply add a 'Email Sign-up' or 'Contact Form' link to your Monkey Bio profile and users can start subscribing immediately." },
                 { q: "Is there a limit on how many contacts I can store?", a: "No, our Audience Manager scales with your growth. You can store and organize unlimited contacts." },
                 { q: "Can I export my contacts to Excel?", a: "Yes, you can export your entire audience list or specific segments to a CSV file anytime with one click." },
                 { q: "Are the notifications sent as emails or SMS?", a: "Our Notify tool uses browser and mobile-optimized push notifications to reach your audience instantly wherever they are." }
               ].map((item, i) => (
                 <FAQItem key={i} question={item.q} answer={item.a} activeColor="text-[#008B8B]" />
               ))}
            </div>
         </div>
      </section>

      {/* 6. FINAL CTA - LIME GREEN (#D2E823) */}
      <section className="py-48 px-6 md:px-20 bg-[#D2E823] text-black text-center relative overflow-hidden">
         <div className="max-w-7xl mx-auto relative z-10 space-y-12 flex flex-col items-center">
            <SectionBadge icon={Users} title="Get Started" />
            <Reveal width="100%">
               <h2 className="text-[clamp(44px,11vw,140px)] font-black tracking-tighter uppercase leading-[0.8] mb-12">
                 Build your <br className="hidden md:block" /><span className="text-purple-600">owned audience</span>
               </h2>
            </Reveal>
            <Reveal width="100%" delay={0.2} overflowVisible>
               <Link href={targetLink}>
                   <motion.button 
                      whileHover={{ scale: 1.05, backgroundColor: '#000', color: '#FFF', boxShadow: '0 30px 60px rgba(0,0,0,0.3)' }}
                      whileTap={{ scale: 0.95 }}
                      className="px-20 py-10 bg-black text-white rounded-full font-black uppercase text-xl shadow-5xl transition-all tracking-[0.1em]"
                   >
                      CLAIM YOUR BIO NOW 🔥
                   </motion.button>
               </Link>
            </Reveal>
         </div>
         {/* Background Decoration */}
         <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[30rem] font-black opacity-[0.04] select-none pointer-events-none uppercase tracking-tighter leading-none">PEOPLE</div>
      </section>

    </div>
  )
}
