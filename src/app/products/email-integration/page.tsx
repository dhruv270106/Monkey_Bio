'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser } from '@/hooks/useUser'
import { Reveal } from '@/components/Reveal'
import { SectionBadge } from '@/components/SectionBadge'
import { 
  Plus, 
  Minus, 
  ArrowRight, 
  Mail, 
  Database, 
  Zap, 
  CheckCircle2, 
  Layers, 
  MousePointer2, 
  ExternalLink,
  Target,
  Users,
  Layout,
  Globe,
  Settings,
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
        {!subtitle && null}
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

function IntegrationMockup() {
    return (
        <div className="grid grid-cols-2 gap-4 md:gap-8 w-full max-w-md p-4 overflow-visible">
            {[
                { name: 'Mailchimp', icon: <Mail />, color: 'bg-[#FFE01B]' },
                { name: 'Klaviyo', icon: <Database />, color: 'bg-[#15D562]' },
                { name: 'Kit', icon: <Zap />, color: 'bg-[#212529]' },
                { name: 'Sheets', icon: <Layout />, color: 'bg-[#107C41]' }
            ].map((tool, i) => (
                <Reveal key={i} delay={i * 0.1} overflowVisible>
                    <div className="relative group perspective-2000 overflow-visible">
                        <div className={`${tool.color} p-6 md:p-10 rounded-[40px] aspect-square flex flex-col items-center justify-center gap-4 text-white shadow-2xl transition-all duration-700 group-hover:rotate-y-12 group-hover:scale-110 border border-white/20 overflow-visible relative`}>
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/25 flex items-center justify-center backdrop-blur-md shadow-inner text-white group-hover:scale-110 transition-transform">
                                {React.cloneElement(tool.icon as React.ReactElement, { size: 32 })}
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest leading-none text-white shadow-sm">{tool.name}</span>
                            
                            <div className="absolute top-4 right-4 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform">
                                <CheckCircle2 size={10} className="text-black" />
                            </div>
                        </div>
                    </div>
                </Reveal>
            ))}
        </div>
    )
}

function ContactSyncMockup() {
    return (
        <div className="w-full max-w-lg bg-white rounded-[60px] shadow-5xl border-[15px] border-black/5 p-10 relative overflow-visible flex flex-col gap-8 text-left">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white"><Users size={20} /></div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest">Recent Leads</p>
                        <p className="text-[8px] font-bold text-black/40 uppercase">Last updated 2m ago</p>
                    </div>
                </div>
                <div className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[8px] font-black uppercase tracking-widest animate-pulse">Syncing...</div>
            </div>
            
            <div className="space-y-4">
                {[
                    { name: 'Sarah Miller', email: 'sarah@example.com', source: 'TikTok' },
                    { name: 'David Chen', email: 'd.chen@gmail.com', source: 'Instagram' },
                    { name: 'Alex Rivera', email: 'alex.r@web.com', source: 'QR Code' }
                ].map((item, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-black/5"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-white border border-black/5 flex items-center justify-center font-black text-[10px]">{item.name[0]}</div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-tight">{item.name}</p>
                                <p className="text-[8px] font-medium text-black/40">{item.email}</p>
                            </div>
                        </div>
                        <span className="text-[8px] font-black uppercase tracking-widest text-[#2665D6] bg-blue-50 px-3 py-1 rounded-full">{item.source}</span>
                    </motion.div>
                ))}
            </div>
            
            <div className="mt-4 p-6 bg-[#2665D6] rounded-3xl text-white flex items-center justify-between shadow-xl">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md"><Mail size={20} /></div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest">Mailchimp Connected</p>
                        <p className="text-[8px] font-bold text-white/60 uppercase">1,533 Contacts Refreshed</p>
                    </div>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-white text-[#2665D6] flex items-center justify-center shadow-lg"><Send size={18} /></div>
            </div>
        </div>
    )
}

export default function EmailIntegrationPage() {
  const { user } = useUser()
  const targetLink = user ? '/dashboard' : '/signup'

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#2665D6] selection:text-white overflow-x-hidden">

      {/* 1. HERO SECTION - ROYAL BLUE (#2665D6) */}
      <section className="pt-48 pb-32 px-6 md:px-20 relative overflow-visible bg-[#2665D6] text-white">
        <div className="max-w-7xl mx-auto relative z-10 text-center flex flex-col items-center gap-12">
            <Reveal width="100%" overflowVisible>
                <SectionBadge icon={Mail} title="Email Integrations" light />
            </Reveal>
            
            <Reveal delay={0.1}>
                <h1 className="text-5xl md:text-[7rem] font-extrabold tracking-tighter leading-[1.1] uppercase mb-4">
                    Schedule <br className="hidden md:block" /><span className="text-[#DEF141]">posts & grow.</span>
                </h1>
            </Reveal>
            
            <Reveal delay={0.2} width="100%">
                 <p className="text-xl md:text-3xl font-medium text-white/60 max-w-3xl mx-auto leading-relaxed uppercase italic">
                    Automatically connect Monkey Bio subscribers to your email platform and keep your lists up to date. No manual exports needed.
                 </p>
            </Reveal>

          <Reveal delay={0.4} width="100%" overflowVisible>
              <div className="flex justify-center w-full">
                <Link href={targetLink}>
                    <motion.button 
                        whileHover={{ scale: 1.05, backgroundColor: '#FFFFFF', color: '#2665D6', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }} 
                        whileTap={{ scale: 0.95 }}
                        className="px-16 py-8 bg-[#D2E823] text-black rounded-full font-black uppercase text-lg shadow-5xl transition-all"
                    >
                        GET CONNECTED ↗
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
             <div className="aspect-video w-full max-w-5xl rounded-[60px] md:rounded-[80px] shadow-5xl border-[15px] border-white/5 overflow-hidden relative group bg-[#111]">
                <img src="/solutions/mockup.png" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2665D6]/60 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center p-10">
                   <div className="max-w-2xl text-center">
                       <IntegrationMockup />
                   </div>
                </div>
             </div>
          </motion.div>
        </div>
        
        {/* Background Decorative Elements */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#D2E823]/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none"></div>
      </section>

      {/* 2. SYNC SECTION - WHITE */}
      <section className="py-40 px-6 md:px-20 bg-white text-black overflow-visible relative">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-32 text-center lg:text-left">
            <motion.div 
               initial={{ opacity: 0, x: -100 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="w-full lg:w-1/2 flex justify-center overflow-visible"
            >
               <ContactSyncMockup />
            </motion.div>

            <div className="w-full lg:w-1/2 space-y-12 flex flex-col items-center lg:items-start text-center lg:text-left">
               <SectionBadge icon={Zap} title="Automation" />
               <SectionHeading 
                  title="Connect instantly and grow effortlessly." 
                  description="Collect emails and grow your list, fast. Just add a signup form, connect your provider, and you’re ready to grow – right from your link in bio."
               />
               <div className="space-y-6">
                  {['No more manual exports', 'Real-time list updates', 'Automated welcome flows'].map((text, i) => (
                    <Reveal key={i} delay={0.3 + (i * 0.1)}>
                       <div className="flex items-center gap-4 text-[#2665D6]">
                          <CheckCircle2 size={24} />
                          <span className="text-sm font-black uppercase tracking-widest text-black leading-none">{text}</span>
                       </div>
                    </Reveal>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* 3. MULTI-TOOL SECTION - LIME (#D2E823) */}
      <section className="py-40 px-6 md:px-20 bg-[#D2E823] text-black overflow-visible">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-32 text-center lg:text-left">
            <div className="w-full lg:w-1/2 space-y-12 flex flex-col items-center lg:items-start lg:order-2">
               <SectionBadge icon={Target} title="Audience Growth" />
               <SectionHeading 
                  title="Grow your email list with every tool." 
                  description="Collect email subscribers from forms, digital products or online courses, and sync them all to your email list automatically."
               />
               <Reveal delay={0.3} width="fit-content" overflowVisible>
                    <Link href={targetLink}>
                        <motion.button 
                            whileHover={{ scale: 1.05, backgroundColor: '#000', color: '#D2E823', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
                            className="px-14 py-7 bg-white text-black rounded-full font-black uppercase text-sm shadow-3xl transition-all"
                        >
                            START GROWING ↗
                        </motion.button>
                    </Link>
               </Reveal>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center lg:order-1 overflow-visible">
               <div className="grid grid-cols-2 gap-6 w-full max-w-md overflow-visible">
                    {[
                        { label: 'Purchasers', count: '1.2k', icon: <CheckCircle2 /> },
                        { label: 'Newsletter', count: '8.4k', icon: <Mail /> },
                        { label: 'Waitlist', count: '452', icon: <Clock /> }, // Reusing icons logic
                        { label: 'Students', count: '2.1k', icon: <Award /> }
                    ].map((group, i) => (
                        <Reveal key={i} delay={i * 0.1} overflowVisible>
                         <div className="bg-white p-8 rounded-[50px] shadow-sm flex flex-col justify-end gap-10 hover:shadow-4xl transition-all group aspect-square hover:-translate-y-6 hover:scale-105 border border-black/5 relative overflow-visible">
                             <div className="w-14 h-14 rounded-2xl bg-black/5 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all duration-500 shadow-inner group-hover:shadow-xl">
                                <Plus size={24} />
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

      {/* 4. FAQ SECTION - DEEP PURPLE (#422066) */}
      <section className="py-40 bg-[#422066] px-6 md:px-20 text-white">
         <div className="max-w-4xl mx-auto flex flex-col items-center">
            <SectionBadge icon={Plus} title="Integration FAQ" light />
            <SectionHeading 
              title="Common Questions" 
              description="Everything you need to know about connecting your email tools."
              light
              centered
            />
            
            <div className="w-full space-y-6 mt-12">
               {[
                 { 
                   q: 'Who can use audience integrations?', 
                   a: 'Integration tools are available to all users on Pro and Premium plans. Syncing contacts to Google Sheets is available to users on all plans.' 
                 },
                 { 
                   q: 'What are audience integrations?', 
                   a: 'They allow you to connect your Monkey Bio with favorite email marketing platforms to automatically sync new leads and subscribers from forms, digital products, or courses.' 
                 },
                 { 
                   q: 'What audience integrations are available?', 
                   a: 'We currently support Mailchimp, Kit (formerly ConvertKit), Klaviyo, and Google Sheets, with more coming soon.' 
                 }
               ].map((faq, i) => (
                 <FAQItem key={i} question={faq.q} answer={faq.a} activeColor="text-[#D2E823]" />
               ))}
            </div>
         </div>
      </section>

      {/* 5. CTA SECTION - ROYAL BLUE */}
      <section className="py-40 px-6 md:px-20 bg-[#2665D6] text-white">
          <div className="max-w-7xl mx-auto text-center space-y-12">
              <h2 className="text-5xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85]">
                  SCALE YOUR <br/> <span className="text-[#D2E823] italic">EMAIL ENGINE.</span>
              </h2>
              <Reveal delay={0.2} width="100%">
                  <p className="text-xl md:text-3xl font-medium text-white/40 max-w-3xl mx-auto uppercase tracking-wide">
                      Connect your tools and start building your audience today. No complex setup, just results.
                  </p>
              </Reveal>
              <Reveal delay={0.4} width="100%" overflowVisible>
                  <Link href={targetLink}>
                      <motion.button 
                          whileHover={{ scale: 1.1, backgroundColor: '#D2E823', color: '#000' }} 
                          whileTap={{ scale: 0.95 }}
                          className="px-20 py-10 bg-white text-[#2665D6] rounded-full font-black uppercase text-xl shadow-5xl transition-all"
                      >
                          GET STARTED NOW
                      </motion.button>
                  </Link>
              </Reveal>
          </div>
      </section>

    </div>
  )
}

function Clock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function Award(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 17-5 3 1-5-4-4 5-1 2-4 2 4 5 1-4 4 1 5z" />
    </svg>
  )
}
