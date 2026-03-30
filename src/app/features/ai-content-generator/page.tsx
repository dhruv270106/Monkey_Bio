'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from '@/components/Reveal'
import { 
  Plus, 
  Minus, 
  ArrowRight, 
  Sparkles, 
  Edit3, 
  Wand2, 
  Zap, 
  Smartphone, 
  Lightbulb, 
  Bot,
  MessageSquare,
  Repeat,
  Terminal,
  Cpu,
  BrainCircuit
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

// AI MOCKUP COMPONENTS
function AIHeroMockup() {
    return (
        <div className="w-full max-w-2xl aspect-[1.4] bg-[#061492] rounded-[50px] shadow-[0_50px_100px_rgba(0,0,0,0.4)] border border-white/10 p-8 relative overflow-hidden group text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(222,241,65,0.1),transparent)]"></div>
            <div className="relative z-10 flex flex-col h-full gap-8 text-left">
                <div className="p-8 bg-white/5 backdrop-blur-2xl rounded-[40px] border border-white/10 space-y-6 flex-1 text-left">
                    <div className="flex gap-4">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="space-y-4">
                        <div className="text-white/80 text-[10px] uppercase font-black tracking-widest mb-4 leading-none">Enter Keywords for AI</div>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-white/40 text-[11px] font-medium italic">Type your content idea here...</div>
                        <div className="mt-10 h-32 w-full bg-white/5 rounded-3xl border border-dashed border-white/20 flex items-center justify-center">
                            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity }} className="text-[#DEF141] flex flex-col items-center gap-4">
                                <Sparkles size={48} />
                                <span className="text-[10px] font-black uppercase tracking-tighter">AI Generator Active</span>
                            </motion.div>
                        </div>
                    </div>
                </div>
                <div className="h-20 bg-[#DEF141] rounded-full flex items-center justify-between px-10 shadow-lg">
                    <span className="text-xs font-black uppercase text-black tracking-widest leading-none">Generate Content</span>
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-[#DEF141] shadow-2xl shadow-black/20 hover:scale-105 transition-transform"><ArrowRight /></div>
                </div>
            </div>
        </div>
    )
}

function AIFeatureCardBg({ color = "#502274" }) {
    return (
        <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 blur-[100px] rounded-full opacity-60" style={{ backgroundColor: color }}></div>
            <div className="absolute inset-0 grid grid-cols-6 gap-2 opacity-[0.08] p-12 -translate-x-10 -translate-y-10">
                {[...Array(48)].map((_, i) => (
                    <div key={i} className="aspect-square bg-white rounded-lg border border-white/20"></div>
                ))}
            </div>
        </div>
    )
}

export default function AIContentGeneratorPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#061492] selection:text-white overflow-x-hidden">

      {/* 1. HERO SECTION - DARK BLUE */}
      <section className="pt-48 pb-32 px-6 md:px-20 relative overflow-hidden bg-[#061492] text-white text-center">
        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-12 flex flex-col items-center">
          <SectionHeading 
            subtitle="CONTENT CREATION TOOLS"
            title="AI caption generator that keeps you creating" 
            description="Create engaging social media posts in seconds with our AI caption generator. Instantly generate captions, content ideas and ready-to-post text for Instagram, TikTok, YouTube and more."
            light
            centered
          />
          <Reveal delay={0.3} width="100%" overflowVisible>
              <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: '#DEF141', color: '#000' }} 
                  whileTap={{ scale: 0.95 }}
                  className="px-14 py-7 bg-[#DEF141] text-black rounded-full font-extrabold uppercase text-sm shadow-2xl transition-all"
              >
                  Get started for free
              </motion.button>
          </Reveal>
          
          <motion.div 
             initial={{ opacity: 0, y: 100 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.2, delay: 0.4 }}
             className="mt-32 flex justify-center"
          >
             <AIHeroMockup />
          </motion.div>
        </div>
      </section>

      {/* 2. FEATURE GRID - FOREST GREEN (#254F1A) */}
      <section className="py-40 px-6 md:px-20 bg-[#254F1A] overflow-hidden relative text-white">
         <div className="max-w-7xl mx-auto text-center relative z-20">
            <SectionHeading 
               subtitle="CREATE, POST AND GROW"
               title="Create content faster with AI-powered tools." 
               description="Say goodbye to writer’s block with our AI caption generator and content generator. Get scroll-stopping captions, viral video hooks and trending social media ideas in seconds."
               light
               centered
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-24 text-center md:text-left">
               {[
                 { title: 'Get inspired with post ideas on trending topics', desc: 'With our AI content generator, you can instantly transform trending topics into engaging social media posts.', color: 'bg-[#502274]', text: 'text-white', mockupColor: '#DEF141' },
                 { title: 'Grab attention with viral-worthy AI-generated captions', desc: 'Boost engagement with AI-powered captions designed to hook your audience and keep them engaged.', color: 'bg-[#1E2330]', text: 'text-white', mockupColor: '#061492' },
                 { title: 'Upload an image and get a viral AI caption', desc: 'Upload an image and AI will craft a caption that fits your content, aligns with trends and sparks conversation.', color: 'bg-[#000B8C]', text: 'text-white', mockupColor: '#FF9313' }
               ].map((card, idx) => (
                 <Reveal key={idx} delay={idx * 0.1}>
                    <div className={`${card.color} ${card.text} p-16 rounded-[70px] aspect-[4/5] flex flex-col justify-end text-center md:text-left items-center md:items-start space-y-8 hover:-translate-y-8 transition-all duration-700 cursor-pointer shadow-xl relative overflow-hidden border border-white/5`}>
                       <AIFeatureCardBg color={card.mockupColor} />
                       <div className="relative z-10 space-y-6 flex flex-col items-center md:items-start w-full">
                           <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform shadow-xl"><Sparkles size={32} /></div>
                           <h4 className="text-3xl font-extrabold uppercase tracking-tighter leading-[0.95]">{card.title}</h4>
                           <p className="text-lg font-medium opacity-80 leading-relaxed">{card.desc}</p>
                       </div>
                    </div>
                 </Reveal>
               ))}
            </div>
         </div>
      </section>

      {/* 3. CONTENT IDEATION SECTION - LIME GREEN (#D2E823) */}
      <section className="py-40 px-6 md:px-20 bg-[#D2E823] text-black">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-32 text-center lg:text-left">
            <motion.div 
               initial={{ opacity: 0, x: -100 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="w-full lg:w-1/2 flex justify-center"
            >
               <div className="aspect-[4/5] w-full max-w-sm rounded-[90px] bg-white p-10 shadow-4xl border-[15px] border-black/5 flex flex-col gap-6 text-left">
                  <div className="text-[10px] font-black uppercase text-black/40 tracking-tighter mb-4 leading-none">Content Suggestions</div>
                  {[
                    "Viral Reels Hooks",
                    "Podcast Summary Idea",
                    "Daily Fitness Goal Post",
                    "New Product Launch Strategy",
                    "Tutorial Breakdown Thread"
                  ].map((txt, i) => (
                      <div key={i} className="h-10 bg-black/5 rounded-2xl flex items-center px-6 gap-4 border border-black/5">
                          <Bot size={16} className="opacity-20" />
                          <span className="text-[10px] font-bold text-black/30 uppercase tracking-tighter leading-none">{txt}</span>
                      </div>
                  ))}
                  <div className="mt-auto h-20 bg-[#061492] rounded-3xl flex items-center justify-center text-white font-extrabold uppercase text-xs shadow-xl transition-all hover:scale-105 cursor-pointer">Generate Now</div>
               </div>
            </motion.div>
            <div className="w-full lg:w-1/2 space-y-12 flex flex-col items-center lg:items-start text-center lg:text-left">
               <SectionHeading 
                  subtitle="NEW POST IDEAS IN SECONDS"
                  title="Stay creative with fresh post ideas." 
                  description="Discover your next social media post with our AI ideation tool. Enter a few details about your niche and get a list of creative social post ideas instantly."
               />
               <Reveal width="fit-content" delay={0.3} overflowVisible>
                  <motion.button 
                    whileHover={{ scale: 1.05, backgroundColor: '#FFFFFF', color: '#000' }}
                    className="px-14 py-7 bg-black text-white rounded-full font-extrabold uppercase text-sm shadow-xl transition-all"
                  >
                    Get started for free
                  </motion.button>
               </Reveal>
            </div>
         </div>
      </section>

      {/* 4. CAPTION GENERATOR SECTION - VIBRANT ORANGE (#FF9313) */}
      <section className="py-40 px-6 md:px-20 bg-[#FF9313] text-white">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-32 text-center lg:text-left">
            <div className="w-full lg:w-1/2 space-y-12 lg:order-2 flex flex-col items-center lg:items-start text-center lg:text-left">
               <SectionHeading 
                  subtitle="CAPTIONS DONE FOR YOU"
                  title="Save time with our AI caption generator." 
                  description="Monkey Bio’s AI caption generator creates Instagram, TikTok and social media captions tailored to your tone, industry and brand voice."
                  light
               />
               <Reveal width="fit-content" delay={0.3} overflowVisible>
                  <motion.button 
                    whileHover={{ scale: 1.05, backgroundColor: '#D2E823', color: '#000' }}
                    className="px-14 py-7 bg-black text-white rounded-full font-extrabold uppercase text-sm shadow-xl transition-all"
                  >
                    Get started for free
                  </motion.button>
               </Reveal>
            </div>
            <motion.div 
               initial={{ opacity: 0, x: 100 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="w-full lg:w-1/2 lg:order-1 flex justify-center"
            >
               <div className="aspect-[4/5] w-full max-w-sm rounded-[90px] bg-black/20 backdrop-blur-xl p-10 shadow-4xl border-[15px] border-white/10 flex flex-col gap-8 text-left">
                  <div className="h-32 bg-white/10 rounded-4xl flex items-center justify-center text-[10px] font-black uppercase text-white/40 tracking-widest p-8 leading-relaxed">This is exactly what I needed for my new product drop! Viral hooks included.</div>
                  <div className="space-y-4">
                     <span className="text-[8px] font-black uppercase text-white/20 tracking-widest leading-none">Post Preview</span>
                     <div className="h-2 w-full bg-white/10 rounded-full"></div>
                     <div className="h-2 w-3/4 bg-white/10 rounded-full"></div>
                  </div>
                  <div className="mt-auto h-16 bg-[#D2E823] rounded-full flex items-center justify-center text-black font-black uppercase text-[10px] tracking-widest shadow-xl hover:scale-105 transition-transform cursor-pointer">Deploy AI Content</div>
               </div>
            </motion.div>
         </div>
      </section>

      {/* 5. TRANSITION / MID-PAGE CTA - ROYAL BLUE (#2665D6) */}
      <section className="py-48 px-6 md:px-20 bg-[#2665D6] text-white text-center relative overflow-hidden">
         <div className="max-w-5xl mx-auto relative z-10 space-y-12 flex flex-col items-center">
            <SectionHeading 
               title="Your next post starts here." 
               description="Get fresh post ideas and scroll-stopping captions in seconds. Try it now."
               light
               centered
            />
            <Reveal delay={0.3} width="100%" overflowVisible>
                <motion.button 
                    whileHover={{ scale: 1.05, backgroundColor: '#FFFFFF', color: '#2665D6' }} 
                    whileTap={{ scale: 0.95 }}
                    className="px-14 py-7 bg-[#D2E823] text-black rounded-full font-extrabold uppercase text-sm shadow-2xl transition-all"
                >
                    Get started for free
                </motion.button>
            </Reveal>
         </div>
      </section>

      {/* 6. FAQ SECTION - DEEP PURPLE (#2E1065) */}
      <section className="py-40 bg-[#2E1065] px-6 md:px-20 capitalize text-white">
         <div className="max-w-4xl mx-auto flex flex-col items-center">
            <div className="text-center mb-32">
               <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter text-white leading-none">Frequently shared questions</h2>
            </div>
            
            <div className="space-y-6 w-full">
               {[
                 { q: "How does Monkey Bio’s AI content generator work?", a: "Our AI is trained on viral social media trends and high-performing copy. It analyzes your keywords, tone, and niche to synthesize captions and post ideas that are mathematically optimized for engagement." },
                 { q: "Is it a free AI caption and idea generator?", a: "Monkey Bio offers a generous free tier for all AI tools. Power users can upgrade to a Pro plan for unlimited generations and advanced brand voice customization." },
                 { q: "What happens when I run out of AI credits?", a: "Free credits reset monthly. If you need more immediately, you can upgrade your plan or earn bonus credits through referrals." },
                 { q: "Can I customize the AI-generated captions?", a: "Absolutely. Think of the AI as your drafting partner. You can tweak the output, change the tone, add your own specific brand details, or ask the AI to regenerate based on new feedback." },
                 { q: "How can AI help me go viral on Reels and TikTok?", a: "The AI identifies trending 'hooks' and 'click-worthy' concepts that have recently performed well in your category, giving you a head start on the algorithm." }
               ].map((item, i) => (
                 <FAQItem key={i} question={item.q} answer={item.a} activeColor="text-[#2665D6]" />
               ))}
            </div>
         </div>
      </section>

      {/* 7. FINAL CTA - DARK NAVY (#1E2330) */}
      <section className="py-48 px-6 md:px-20 bg-[#1E2330] text-white text-center relative overflow-hidden">
         <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center">
            <Reveal width="100%">
               <h2 className="text-5xl md:text-[8rem] font-extrabold tracking-tighter uppercase leading-[0.85] mb-12">
                 Jumpstart your <br /><span className="text-[#D2E823]">corner of the internet</span> today
               </h2>
            </Reveal>
            <Reveal width="100%" delay={0.2} overflowVisible>
               <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: '#FFFFFF', color: '#1E2330' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-16 py-8 bg-[#D2E823] text-black rounded-full font-extrabold uppercase text-sm shadow-3xl transition-all"
               >
                  Get started for free
               </motion.button>
            </Reveal>
         </div>
      </section>

    </div>
  )
}
