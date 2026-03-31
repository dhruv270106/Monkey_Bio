'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser } from '@/hooks/useUser'
import { Reveal } from '@/components/Reveal'
import { 
  Plus, 
  Minus, 
  ArrowRight, 
  MessageSquare, 
  Zap, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  Smartphone,
  Repeat,
  Mail,
  ExternalLink,
  Target,
  Sparkles,
  Send
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

// AUTO REPLY MOCKUPS
function AutoReplyHeroMockup() {
    return (
        <div className="w-full max-w-lg aspect-[0.9] bg-[#D22BD2] rounded-[60px] shadow-[0_50px_100px_rgba(0,0,0,0.3)] border border-white/20 p-10 relative overflow-hidden flex flex-col gap-8 text-left">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent)]"></div>
            <div className="relative z-10 flex flex-col h-full gap-8">
                <div className="bg-black/20 backdrop-blur-2xl rounded-4xl p-10 border border-white/10 flex-1 flex flex-col gap-8 text-left">
                    <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 rounded-full bg-white/10 border border-white/10 shadow-inner"></div>
                        <div className="text-[10px] font-black uppercase text-white/40 tracking-widest leading-none">Creator / Fan DM</div>
                    </div>
                    <div className="space-y-4">
                        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="h-12 w-3/4 bg-white/10 rounded-2xl rounded-bl-none ml-2 border border-white/10 flex items-center px-4">
                            <span className="text-[8px] font-bold text-white/60">"Hey! How can I buy this?"</span>
                        </motion.div>
                        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1 }} className="h-12 w-3/4 bg-[#D2E823] rounded-2xl rounded-br-none ml-auto border border-white/20 shadow-lg flex items-center px-4 font-black uppercase text-[8px] text-black text-left">
                            <span className="leading-none">"Get it here: monkey.bio/shop"</span>
                        </motion.div>
                    </div>
                </div>
                <div className="h-20 bg-white rounded-full flex items-center justify-between px-10">
                    <span className="text-[10px] font-black uppercase text-black/20 tracking-widest leading-none">Type a message...</span>
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-[#D2E823] shadow-md hover:scale-110 transition-transform"><Send size={20} /></div>
                </div>
            </div>
        </div>
    )
}

function AutoReplyCardBg() {
    return (
        <div className="absolute inset-0 opacity-[0.12]">
            <div className="absolute inset-0 flex flex-col gap-10 p-10 -rotate-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className={`h-8 w-48 rounded-full border border-white/20 ${i % 2 === 0 ? 'bg-white/80 mr-auto shadow-inner flex items-center px-4 text-[6px] font-black text-black/20' : 'bg-white ml-auto shadow-md'}`}>
                         {i % 2 === 0 ? "REPLIED AUTOMATICALLY" : ""}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function InstagramAutoReplyPage() {
  const { user } = useUser()
  const targetLink = user ? '/dashboard' : '/signup'
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#D22BD2] selection:text-white overflow-x-hidden">

      {/* 1. HERO SECTION - VIBRANT MAGENTA */}
      <section className="pt-48 pb-32 px-6 md:px-20 relative overflow-hidden bg-[#D22BD2] text-white text-center">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20 relative z-10 text-center lg:text-left">
          <div className="w-full lg:w-1/2 space-y-12 flex flex-col items-center lg:items-start text-center lg:text-left">
            <SectionHeading 
              subtitle="AUTO-REPLY ON INSTAGRAM"
              title="Boost sales and traffic with Instagram Auto-Replies" 
              description="Turn every comment into a connection. Set up automated replies to instantly engage customers, drive traffic to your offers and increase conversions – all while keeping the conversation going."
              light 
            />
            <Reveal width="100%" delay={0.3} overflowVisible>
                <div className="flex justify-center lg:justify-start w-full">
                    <Link href={targetLink}>
                        <motion.button 
                            whileHover={{ scale: 1.05, backgroundColor: '#FFFFFF', color: '#D22BD2' }} 
                            whileTap={{ scale: 0.95 }}
                            className="px-14 py-7 bg-black text-white rounded-full font-extrabold uppercase text-sm shadow-2xl transition-all"
                        >
                            Send your first Auto-Reply
                        </motion.button>
                    </Link>
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
                <img src="/images/share.png" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" alt="Instagram Auto Reply" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <AutoReplyHeroMockup />
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* 2. AUTOMATION BENEFITS - LIME GREEN (#D2E823) */}
      <section className="py-40 px-6 md:px-20 bg-[#D2E823] border-b border-black/5 overflow-hidden relative">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-32 text-center lg:text-left pt-20">
            <motion.div 
               initial={{ opacity: 0, x: -100 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="w-full lg:w-1/2 flex justify-center"
            >
               <div className="relative group w-full max-w-sm rounded-[40px] bg-white p-12 shadow-4xl aspect-[0.8] flex flex-col gap-10 hover:scale-105 transition-transform duration-500 text-left">
                  <div className="flex gap-4">
                     <div className="w-12 h-12 bg-black/5 rounded-full"></div>
                     <div className="text-[10px] uppercase font-black tracking-widest text-black/20 mt-4 leading-none">Automation Builder</div>
                  </div>
                  <div className="h-40 bg-black/[0.02] border border-dashed border-black/10 rounded-4xl flex items-center justify-center text-[8px] font-black uppercase text-black/40 tracking-[0.2em] text-center px-10">Live Engagement Flow</div>
                  <div className="h-12 w-full bg-[#D22BD2] rounded-full mt-auto text-white flex items-center justify-center font-bold uppercase text-[10px] tracking-widest shadow-lg">Active Flow</div>
               </div>
            </motion.div>
            <div className="w-full lg:w-1/2 space-y-12 flex flex-col items-center lg:items-start text-center lg:text-left">
               <SectionHeading 
                  subtitle="INSTAGRAM AUTOMATIONS"
                  title="Build your brand while you sleep." 
                  description="Save time and stay on top of every comment without lifting a finger. Create connections with your followers — even when you're not online."
               />
               <Reveal width="100%" delay={0.4} overflowVisible>
                  <div className="flex justify-center lg:justify-start w-full">
                      <Link href={targetLink}>
                          <motion.button 
                            whileHover={{ scale: 1.05, backgroundColor: '#FFFFFF', color: '#000' }}
                            className="px-14 py-7 bg-black text-white rounded-full font-extrabold uppercase text-sm shadow-xl transition-all"
                          >
                            Start Automating
                          </motion.button>
                      </Link>
                  </div>
               </Reveal>
            </div>
         </div>
      </section>

      {/* 3. FEATURE SHOWCASE (GRID) - FOREST GREEN (#254F1A) */}
      <section className="py-40 px-6 md:px-20 bg-[#254F1A] overflow-hidden relative text-white">
         <div className="max-w-7xl mx-auto text-center pt-20 flex flex-col items-center">
            <SectionHeading 
               title="Automate Instagram engagement to grow your brand" 
               light
               centered
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-24 text-center md:text-left">
               {[
                 { title: 'Send product links', color: 'bg-[#FF9313]', icon: <ExternalLink size={32} />, label: 'Product Link Flow' },
                 { title: 'Offer exclusive discounts', color: 'bg-[#E9C0E9]', icon: <Sparkles size={32} />, label: 'VIP Promo Code' },
                 { title: 'Deliver digital downloads', color: 'bg-[#D2E823]', icon: <Zap size={32} />, label: 'Auto-Send PDF' }
               ].map((item, idx) => (
                 <Reveal key={idx} delay={idx * 0.1}>
                    <div className={`${item.color} p-12 md:p-16 rounded-[70px] aspect-[4/5] flex flex-col items-center justify-center text-center space-y-8 hover:-translate-y-8 transition-all duration-700 cursor-pointer shadow-xl border border-white/10 relative overflow-hidden group h-full`}>
                       <AutoReplyCardBg />
                       <div className="relative z-10 space-y-6 flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform text-white shadow-xl">
                                {item.icon}
                            </div>
                            <h4 className={`text-3xl font-extrabold uppercase tracking-tighter leading-[0.95] ${idx === 1 ? 'text-black' : 'text-white'}`}>{item.title}</h4>
                            <span className={`text-[10px] font-black uppercase ${idx === 1 ? 'text-black/40' : 'text-white/40'} tracking-widest leading-none`}>{item.label}</span>
                       </div>
                    </div>
                 </Reveal>
               ))}
            </div>
         </div>
      </section>

      {/* 4. MAILING LIST GROWTH - CANVA TEAL (#00C4CC) */}
      <section className="py-40 px-6 md:px-20 bg-[#00C4CC] border-t border-black/5 text-black">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-32 text-center lg:text-left pt-20">
            <motion.div 
               initial={{ opacity: 0, x: -100 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="w-full lg:w-1/2 flex justify-center"
            >
               <div className="w-full max-w-sm p-12 bg-white rounded-[60px] shadow-4xl relative overflow-hidden border border-black/5 flex flex-col h-[500px] hover:shadow-5xl transition-all hover:scale-105 text-left">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#D22BD2] opacity-10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2"></div>
                  <Mail size={48} className="text-[#D22BD2] mb-12" />
                  <div className="space-y-4 flex-1">
                     <div className="text-[10px] font-black uppercase text-black/20 tracking-widest mb-6 leading-none">Mailing List Form</div>
                      <div className="grid grid-cols-2 gap-4">
                          <div className="h-12 bg-black/[0.02] rounded-xl border border-black/5 shadow-sm flex items-center px-4 text-[8px] font-black text-black/10 uppercase tracking-widest">Name</div>
                          <div className="h-12 bg-black/[0.02] rounded-xl border border-black/5 shadow-sm flex items-center px-4 text-[8px] font-black text-black/10 uppercase tracking-widest">Email</div>
                      </div>
                  </div>
                   <div className="h-14 w-full bg-black rounded-3xl mt-auto shadow-xl flex items-center justify-center text-white text-[10px] uppercase font-black tracking-widest transition-all hover:bg-[#D22BD2] cursor-pointer">Subscribe Now</div>
               </div>
            </motion.div>
            <div className="w-full lg:w-1/2 space-y-12 flex flex-col items-center lg:items-start text-center lg:text-left">
               <SectionHeading 
                  subtitle="GROW YOUR MAILING LIST"
                  title="Supercharge your mailing list with Instagram." 
                  description="Use auto-replies to share mailing list sign-up links with your Instagram followers – allowing you to share news with them outside of your social content."
               />
               <Reveal width="100%" delay={0.3} overflowVisible>
                  <div className="flex justify-center lg:justify-start w-full">
                      <Link href={targetLink}>
                          <motion.button 
                            whileHover={{ scale: 1.05, backgroundColor: '#000', color: '#FFF' }}
                            className="px-14 py-7 bg-white text-black rounded-full font-extrabold uppercase text-sm shadow-xl transition-all"
                          >
                            Set Up List Growth
                          </motion.button>
                      </Link>
                  </div>
               </Reveal>
            </div>
         </div>
      </section>

      {/* 5. FAQ SECTION - ROYAL BLUE (#2665D6) */}
      <section className="py-40 bg-[#2665D6] px-6 md:px-20 capitalize text-white">
         <div className="max-w-4xl mx-auto flex flex-col items-center">
            <div className="text-center mb-32">
               <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter text-white font-black leading-none">Frequently shared questions</h2>
            </div>
            
            <div className="space-y-6 w-full">
               {[
                 { q: "How can I monitor the performance of my Instagram Auto-Replies?", a: "You can track impressions, open rates, and click-through rates directly in your Monkey Bio analytics dashboard, giving you a clear view of how your automations are converting." },
                 { q: "When should I use Instagram Auto-Replies?", a: "Auto-replies are perfect for launching new products, running limited-time offers, or simply ensuring every fan interaction is met with an instant response, even when you're away." },
                 { q: "Why do my followers sometimes see a \"Get Updates\" button instead of my link in the DM?", a: "This is a feature that ensures compliance with platform policies while offering followers a way to opt into your secondary communication channels like email or SMS." },
                 { q: "Can I send Instagram Auto-Replies if my account is set to private?", a: "To use automated engagement tools effectively, a professional or business account is recommended. Privacy settings may restrict external automation triggers." }
               ].map((item, i) => (
                 <FAQItem key={i} question={item.q} answer={item.a} activeColor="text-[#2665D6]" />
               ))}
            </div>
         </div>
      </section>

      {/* 6. FINAL CTA - DEEP PURPLE */}
      <section className="py-48 px-6 md:px-20 bg-[#502274] text-white text-center relative overflow-hidden">
         <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center">
            <Reveal width="100%">
               <h2 className="text-5xl md:text-[8rem] font-extrabold tracking-tighter uppercase leading-[0.85] mb-12 text-white">
                 Jumpstart your <br /><span className="text-[#D2E823]">corner of the internet</span> today
               </h2>
            </Reveal>
            <Reveal width="100%" delay={0.2} overflowVisible>
               <Link href={targetLink}>
                   <motion.button 
                      whileHover={{ scale: 1.05, backgroundColor: '#FFFFFF', color: '#502274' }}
                      whileTap={{ scale: 0.95 }}
                      className="px-16 py-8 bg-[#D2E823] text-black rounded-full font-extrabold uppercase text-sm shadow-3xl transition-all"
                   >
                      Get started for free
                   </motion.button>
               </Link>
            </Reveal>
         </div>
         {/* Background Decoration */}
         <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[30rem] font-extrabold opacity-[0.03] select-none pointer-events-none uppercase tracking-tighter text-white leading-none">BIO</div>
      </section>

    </div>
  )
}
