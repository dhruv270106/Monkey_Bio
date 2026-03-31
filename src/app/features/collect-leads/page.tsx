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
  Smartphone, 
  Settings, 
  Zap, 
  Mail, 
  Database, 
  Users, 
  BarChart3,
  Globe,
  Layout,
  CheckCircle2,
  Send,
  MousePointer2,
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

// 1. LEAD FORM MOCKUP
function LeadFormHeroMockup() {
    return (
        <div className="w-full max-w-sm aspect-[0.7] bg-white rounded-[60px] shadow-[0_50px_100px_rgba(0,0,0,0.15)] border-[12px] border-black/5 p-10 relative overflow-hidden flex flex-col gap-8 text-left">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF9313] opacity-10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="space-y-4">
                <div className="text-[10px] font-black uppercase text-black/40 tracking-widest leading-none">Monkey Bio Forms</div>
                <div className="text-[12px] font-extrabold uppercase text-black leading-tight">Join the Inner Circle</div>
            </div>
            <div className="space-y-6 flex-1">
                <div className="space-y-2">
                    <div className="text-[8px] font-black uppercase text-black/20 tracking-tighter">Full Name</div>
                    <div className="h-12 w-full bg-white border border-black/5 rounded-2xl shadow-sm flex items-center px-4 text-[10px] text-black/30 text-left">Enter your name...</div>
                </div>
                <div className="space-y-2">
                    <div className="text-[8px] font-black uppercase text-black/20 tracking-tighter">Email Address</div>
                    <div className="h-12 w-full bg-white border border-black/5 rounded-2xl shadow-sm flex items-center px-4 text-[10px] text-black/30 text-left">Enter your email...</div>
                </div>
                <div className="space-y-2">
                    <div className="text-[8px] font-black uppercase text-black/20 tracking-tighter">Interest</div>
                    <div className="h-24 w-full bg-white border border-black/5 rounded-3xl shadow-sm flex items-start p-4 text-[10px] text-black/30 text-left">Tell us what you love...</div>
                </div>
            </div>
            <motion.div 
                whileHover={{ scale: 1.02 }}
                className="h-16 w-full bg-[#FF9313] rounded-full shadow-lg flex items-center justify-center text-white font-extrabold uppercase text-xs tracking-widest gap-3"
            >
                Submit Form <Send size={16} />
            </motion.div>
            
            {/* Floating Stats Card */}
            <motion.div 
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.8 }}
               className="absolute -top-6 -right-6 bg-[#D2E823] p-6 rounded-[30px] shadow-2xl text-black"
            >
               <div className="text-3xl font-black leading-none">1.2K+</div>
               <div className="text-[10px] font-bold opacity-60 uppercase leading-none mt-2">Leads today</div>
            </motion.div>
        </div>
    )
}

function LeadAnalyticsBg() {
    return (
        <div className="absolute inset-0 opacity-[0.05]">
            <div className="absolute inset-0 flex flex-col gap-6 p-10 mt-10">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="flex gap-4 items-center">
                        <div className="w-8 h-8 rounded-lg bg-black"></div>
                        <div className="text-[8px] font-black text-black/20 uppercase tracking-widest">Entry #{i + 1042}</div>
                        <div className="h-2 flex-1 bg-black rounded-full"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function CollectLeadsPage() {
  const { user } = useUser()
  const targetLink = user ? '/dashboard' : '/signup'
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#FF9313] selection:text-white overflow-x-hidden">

      {/* 1. HERO SECTION - POPPY / ORANGE (#FF9313) */}
      <section className="pt-48 pb-32 px-6 md:px-20 relative overflow-hidden bg-[#FF9313] text-white text-center">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-32 relative z-10 text-center lg:text-left">
          <div className="w-full lg:w-1/2 space-y-12 flex flex-col items-center lg:items-start text-center lg:text-left">
            <SectionHeading 
              subtitle="TURN VISITORS INTO LEADS" 
              title="Grow your email list with a custom form" 
              description="Add a beautiful, branded form to your Monkey Bio to collect emails, inquiries and more – then engage every lead and keep them coming back for more."
              light 
            />
            <Reveal delay={0.3} width="100%" overflowVisible>
                <div className="flex justify-center lg:justify-start w-full">
                    <Link href={targetLink}>
                        <motion.button 
                            whileHover={{ scale: 1.05, backgroundColor: '#FFFFFF', color: '#FF9313' }} 
                            whileTap={{ scale: 0.95 }}
                            className="px-14 py-7 bg-black text-white rounded-full font-extrabold uppercase text-sm shadow-2xl transition-all"
                        >
                            Get started for free
                        </motion.button>
                    </Link>
                </div>
            </Reveal>
          </div>
          <motion.div 
             initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
             animate={{ opacity: 1, scale: 1, rotate: 0 }}
             transition={{ duration: 1.2, delay: 0.4 }}
             className="w-full lg:w-1/2 flex justify-center lg:justify-end"
          >
             <LeadFormHeroMockup />
          </motion.div>
        </div>
      </section>

      {/* 2. CUSTOMIZATION SECTION - LIME (#D2E823) */}
      <section className="py-40 px-6 md:px-20 bg-[#D2E823] text-black">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-32 text-center lg:text-left">
            <motion.div 
               initial={{ opacity: 0, x: -100 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="w-full lg:w-1/2 flex justify-center"
            >
               <div className="aspect-square w-full max-w-sm rounded-[80px] bg-white p-12 shadow-4xl flex flex-col gap-10 border-[15px] border-black/5 relative overflow-hidden group text-left">
                  <div className="flex justify-between items-center leading-none">
                     <div className="text-[10px] font-black uppercase text-black/40 tracking-widest">Builder Tools</div>
                     <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white shadow-lg transition-transform hover:rotate-90"><Settings size={20} /></div>
                  </div>
                  <div className="space-y-6 flex-1">
                     <div className="h-14 w-full bg-black/[0.02] rounded-3xl border-2 border-dashed border-black/10 flex items-center justify-center text-[10px] font-black uppercase text-black/20 tracking-widest group-hover:border-[#FF9313] group-hover:text-[#FF9313] transition-colors">Add custom field</div>
                     <div className="h-14 w-full bg-black/[0.02] rounded-3xl border-2 border-dashed border-black/10 flex items-center justify-center text-[10px] font-black uppercase text-black/20 tracking-widest">Dropdown option</div>
                  </div>
                  <div className="mt-auto text-center">
                      <span className="text-[8px] font-black uppercase text-black/20 tracking-[0.3em]">Form Preview Only</span>
                  </div>
               </div>
            </motion.div>
            <div className="w-full lg:w-1/2 space-y-12 flex flex-col items-center lg:items-start text-center lg:text-left">
               <SectionHeading 
                  subtitle="FULLY CUSTOMIZABLE FORMS" 
                  title="Customize your form to fit your needs." 
                  description="Collect emails, names and any other info you need with a form built directly into your Monkey Bio. From growing your email list to capturing leads and building your community – forms help you do it all."
               />
               <Reveal delay={0.3} width="100%" overflowVisible>
                  <div className="flex justify-center lg:justify-start w-full">
                      <Link href={targetLink}>
                          <motion.button 
                            whileHover={{ scale: 1.05, backgroundColor: '#000', color: '#FFF' }}
                            className="px-14 py-7 bg-white text-black rounded-full font-extrabold uppercase text-sm shadow-xl transition-all"
                          >
                            Get started today
                          </motion.button>
                      </Link>
                  </div>
               </Reveal>
            </div>
         </div>
      </section>

      {/* 3. GROWTH SECTION - FOREST GREEN (#254F1A) */}
      <section className="py-40 px-6 md:px-20 bg-[#254F1A] text-white">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-32 text-center lg:text-left">
            <div className="w-full lg:w-1/2 space-y-12 flex flex-col items-center lg:items-start text-center lg:text-left">
               <SectionHeading 
                  subtitle="GROW YOUR EMAIL LIST" 
                  title="Turn visitors into customers." 
                  description="Meet your audience where they’re at and capture high-intent leads right from your Monkey Bio — no redirects, no extra clicks."
                  light
               />
               <Reveal delay={0.3} width="100%" overflowVisible>
                  <div className="flex justify-center lg:justify-start w-full">
                      <Link href={targetLink}>
                          <motion.button 
                            whileHover={{ scale: 1.05, backgroundColor: '#D2E823', color: '#000' }}
                            className="px-14 py-7 bg-black text-white rounded-full font-extrabold uppercase text-sm shadow-xl transition-all"
                          >
                            Get started today
                          </motion.button>
                      </Link>
                  </div>
               </Reveal>
            </div>
            <motion.div 
               initial={{ opacity: 0, x: 100 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="w-full lg:w-1/2 flex justify-center"
            >
               <div className="p-12 bg-white rounded-[60px] shadow-4xl text-black w-full max-w-sm relative overflow-hidden h-[500px] flex flex-col text-left">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#D2E823] opacity-20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2"></div>
                  <div className="flex gap-4 items-center mb-10 leading-none">
                     <div className="w-12 h-12 rounded-full bg-[#254F1A] flex items-center justify-center text-white"><Sparkles size={20} /></div>
                     <span className="font-extrabold uppercase tracking-widest text-[10px]">Cura Skincare Form</span>
                  </div>
                  <div className="space-y-4 flex-1">
                     <div className="h-12 bg-black/5 rounded-2xl flex items-center px-4 text-[9px] font-black text-black/10">FULL NAME</div>
                     <div className="h-12 bg-black/5 rounded-2xl flex items-center px-4 text-[9px] font-black text-black/10">EMAIL ADDRESS</div>
                     <div className="h-32 bg-black/5 rounded-3xl p-4 text-[9px] font-black text-black/10 tracking-widest leading-relaxed">TELL US A BIT ABOUT YOUR SKIN GOALS...</div>
                  </div>
                  <div className="mt-8 h-14 w-full bg-[#254F1A] rounded-full shadow-lg flex items-center justify-center text-white font-black uppercase text-[10px] tracking-widest">Submit Today</div>
               </div>
            </motion.div>
         </div>
      </section>

      {/* 4. INTEGRATIONS SECTION - LAVENDER (#E9C0E9) */}
      <section className="py-40 px-6 md:px-20 bg-[#E9C0E9] text-black overflow-hidden relative">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-32 text-center lg:text-left">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="w-full lg:w-1/2 flex justify-center"
            >
               <div className="flex flex-wrap justify-center gap-8 max-w-md relative z-10">
                  {[
                    { icon: Mail, label: 'Mailchimp' },
                    { icon: Globe, label: 'Website' },
                    { icon: Zap, label: 'Zapier' },
                    { icon: Database, label: 'CSV Export' }
                  ].map((item, i) => (
                    <motion.div 
                        key={i} 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-32 h-32 bg-white rounded-[40px] shadow-xl flex flex-col items-center justify-center text-black transition-transform cursor-pointer border border-black/5 gap-3"
                    >
                       <item.icon size={32} />
                       <span className="text-[8px] font-black uppercase tracking-widest text-black/20 leading-none">{item.label}</span>
                    </motion.div>
                  ))}
               </div>
            </motion.div>
            <div className="w-full lg:w-1/2 space-y-12 flex flex-col items-center lg:items-start text-center lg:text-left">
               <SectionHeading 
                  subtitle="EXPORT EMAIL LIST" 
                  title="Sync with your marketing tool." 
                  description="Connect your form to Mailchimp, Kit, Klaviyo and more — so every subscriber flows directly into your list, ready for follow-up."
               />
               <Reveal delay={0.4} width="100%" overflowVisible>
                  <div className="flex justify-center lg:justify-start w-full">
                      <Link href={targetLink}>
                          <motion.button 
                            whileHover={{ scale: 1.05, backgroundColor: '#000', color: '#FFF' }}
                            className="px-14 py-7 bg-white text-black rounded-full font-extrabold uppercase text-sm shadow-xl transition-all"
                          >
                            View Integrations
                          </motion.button>
                      </Link>
                  </div>
               </Reveal>
            </div>
         </div>
      </section>

      {/* 5. MANAGEMENT SECTION - DARK NAVY (#1E2330) */}
      <section className="py-40 px-6 md:px-20 bg-[#1E2330] text-white">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-32 text-center lg:text-left">
            <div className="w-full lg:w-1/2 space-y-12 flex flex-col items-center lg:items-start text-center lg:text-left">
               <SectionHeading 
                  subtitle="ELEVATE YOUR MARKETING" 
                  title="Organize your contacts efficiently." 
                  description="View and manage every submission in your Monkey Bio Audience dashboard – or export to CSV, Google Sheets or your email tool."
                  light
               />
               <Reveal delay={0.3} width="100%" overflowVisible>
                  <div className="flex justify-center lg:justify-start w-full">
                      <Link href={targetLink}>
                          <motion.button 
                            whileHover={{ scale: 1.05, backgroundColor: '#D2E823', color: '#000' }}
                            className="px-14 py-7 bg-white text-black rounded-full font-extrabold uppercase text-sm shadow-xl transition-all"
                          >
                            Get started today
                          </motion.button>
                      </Link>
                  </div>
               </Reveal>
            </div>
            <motion.div 
               initial={{ opacity: 0, y: 100 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="w-full lg:w-1/2 flex justify-center"
            >
                <div className="w-full max-w-sm aspect-[1.1] bg-white/5 rounded-[60px] border border-white/10 p-10 relative overflow-hidden group hover:bg-white/10 transition-colors text-left">
                    <LeadAnalyticsBg />
                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div className="flex justify-between items-center leading-none">
                            <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Entry History Log</span>
                            <div className="w-8 h-8 rounded-full bg-[#D2E823]/20 flex items-center justify-center text-[#D2E823] shadow-inner"><BarChart3 size={16} /></div>
                        </div>
                        <div className="text-[8px] font-black uppercase text-white/10 tracking-[0.5em] text-center leading-none">Live Database Feed</div>
                    </div>
                </div>
            </motion.div>
         </div>
      </section>

      {/* 6. FAQ SECTION - ROYAL BLUE (#2665D6) */}
      <section className="py-40 bg-[#2665D6] px-6 md:px-20 capitalize text-white">
         <div className="max-w-4xl mx-auto flex flex-col items-center">
            <div className="text-center mb-32">
               <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter text-white font-black leading-none">Frequently shared questions</h2>
            </div>
            
            <div className="space-y-6 w-full">
               {[
                 { q: "What data can I collect with Monkey Bio forms?", a: "You can collect emails, names, phone numbers, and any custom field data like product preferences or survey responses." },
                 { q: "Are the forms mobile-friendly?", a: "Absolutely. All Monkey Bio forms are responsive and designed specifically to convert visitors on mobile devices." },
                 { q: "Can I receive email notifications for new leads?", a: "Yes, you can enable instant email alerts so you never miss a new subscriber or inquiry." },
                 { q: "Do you integrate with Shopify and other e-commerce tools?", a: "Yes, through our marketing tool integrations, you can sync your leads directly with your e-commerce platform's list." }
               ].map((item, i) => (
                 <FAQItem key={i} question={item.q} answer={item.a} activeColor="text-[#2665D6]" />
               ))}
            </div>
         </div>
      </section>

      {/* 7. FINAL CTA - DEEP PURPLE */}
      <section className="py-48 px-6 md:px-20 bg-[#502274] text-white text-center relative overflow-hidden">
         <div className="max-w-5xl mx-auto relative z-10 text-white flex flex-col items-center">
            <Reveal width="100%">
               <h2 className="text-6xl md:text-[8rem] font-extrabold tracking-tighter uppercase leading-[0.85] mb-12">
                 Jumpstart your <br /><span className="text-[#D3E923]">corner of the internet</span> today
               </h2>
            </Reveal>
            <Reveal width="100%" delay={0.2} overflowVisible>
                <Link href={targetLink}>
                   <motion.button 
                      whileHover={{ scale: 1.05, backgroundColor: '#FFFFFF', color: '#502274' }}
                      whileTap={{ scale: 0.95 }}
                      className="px-16 py-8 bg-[#D3E923] text-black rounded-full font-extrabold uppercase text-sm shadow-3xl transition-all"
                   >
                      Get started for free
                   </motion.button>
                </Link>
            </Reveal>
         </div>
         {/* Background Decoration */}
         <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[30rem] font-extrabold opacity-[0.03] select-none pointer-events-none uppercase tracking-tighter text-white leading-none">LEADS</div>
      </section>

    </div>
  )
}
