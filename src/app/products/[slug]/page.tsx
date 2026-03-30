'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Reveal } from '@/components/Reveal'
import { CheckCircle2, ArrowRight, Plus, Minus } from 'lucide-react'

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
              <span className={`text-[11px] font-extrabold uppercase tracking-[0.4em] ${light ? 'text-white/40' : 'text-black/40'}`}>{subtitle}</span>
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

const PRODUCT_DATA: any = {
  'link-in-bio': {
    title: "Everything you are in one simple link",
    subtitle: 'THE ORIGINAL BIO',
    heroImg: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop',
    desc: 'Join 40M+ people using Monkey Bio as their link in bio to share everything they create, curate and sell across Instagram, TikTok, Twitter, YouTube and more.',
    color: 'bg-[#D2E823]',
    secondaryColor: 'text-black',
    accentColor: '#502274',
    sections: [
      { 
        title: 'One link to help you do it all', 
        desc: 'Monkey Bio is the launchpad for your online home. Connect your audience with all you do.',
        img: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1200&auto=format&fit=crop',
        bgColor: 'bg-[#254F1A]',
        light: true
      },
      { 
        title: 'Connect your fans instantly', 
        desc: 'Monkey Bio is the only link you’ll ever need. Connect your audience with all you do, wherever you are.',
        img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop',
        bgColor: 'bg-[#FF9313]',
        light: true
      },
      { 
        title: 'Keep your followers engaged', 
        desc: 'Don’t lose your audience to search algorithms. Monkey Bio is a platform you own and control, so your followers always stay with you.',
        img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop',
        bgColor: 'bg-[#1E2330]',
        light: true
      }
    ],
    faqs: [
      { q: 'Is Monkey Bio free?', a: 'Yes, you can start for free and use our core features forever.' },
      { q: 'How many links can I add?', a: 'You can add unlimited links to your Monkey Bio profile.' },
      { q: 'Can I use it on multiple socials?', a: 'Absolutely! One Monkey Bio link works across all platforms.' }
    ]
  },
  'link-shortener': {
    title: 'Powerful short links with huge potential',
    subtitle: 'SMART SHORTENING',
    heroImg: 'https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=1200&auto=format&fit=crop',
    desc: 'Create, track and brand your short links. Drive conversions and build deep trust with your audience, all from one dashboard.',
    color: 'bg-[#4037FF]',
    secondaryColor: 'text-white',
    accentColor: '#D2E823',
    sections: [
      { 
        title: 'More than just a short link', 
        desc: 'Our link shortener gives you total control over how your audience perceives your brand across all channels.',
        img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
        bgColor: 'bg-[#254F1A]',
        light: true
      },
      { 
        title: 'Deep dive into performance', 
        desc: 'Know exactly where your audience is coming from. Our analytics help you master every campaign with precision.',
        img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop',
        bgColor: 'bg-[#EA580C]',
        light: true
      }
    ],
    faqs: [
      { q: 'How many links can I shorten?', a: 'Unlimited! Shorten as many links as your brand needs.' },
      { q: 'Can I change the destination?', a: 'Yes, our links are dynamic and can be redirected anytime.' },
      { q: 'Is there a limit on clicks?', a: 'No, we track every single click without any artificial limits.' }
    ]
  },
  'qr-generator': {
    title: 'The QR code that makes things happen',
    subtitle: 'ADVANCED QR CODES',
    heroImg: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?q=80&w=1200&auto=format&fit=crop',
    desc: 'Create, customize, and track branded QR codes. Turn every real-world interaction into a digital connection in seconds.',
    color: 'bg-[#7C3AED]',
    secondaryColor: 'text-white',
    accentColor: '#DEF141',
    sections: [
      { 
        title: 'Bridge the offline gap', 
        desc: 'From business cards to huge billboards, Monkey Bio QR codes make it effortless for your audience to find you.',
        img: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?q=80&w=800&auto=format&fit=crop',
        bgColor: 'bg-[#254F1A]',
        light: true
      },
      { 
        title: 'Total creative freedom', 
        desc: 'Customize every detail of your QR code to ensure it reflects your unique brand identity perfectly.',
        img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop',
        bgColor: 'bg-[#2665D6]',
        light: true
      }
    ],
    faqs: [
      { q: 'Are your QR codes permanent?', a: 'Yes, they never expire and will work as long as your link is active.' },
      { q: 'Can I add my own logo?', a: 'Yes, full brand customization including logos is available.' },
      { q: 'Can I track scans?', a: 'Yes, every scan is tracked with real-time location insights.' }
    ]
  }
}

export default function ProductDetail() {
  const { slug } = useParams()
  const data = PRODUCT_DATA[slug as string]

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center p-20 bg-white text-black text-center">
        <div className="space-y-8">
          <SectionHeading title="404 - Page not found" centered />
          <Link href="/" className="px-12 py-6 bg-black text-white rounded-full font-black uppercase text-sm shadow-2xl inline-block transition-transform hover:scale-105 active:scale-95">Go Home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white overflow-x-hidden">
      
      {/* 1. HERO SECTION - BRANDED VIBRANT COLOR */}
      <section className={`pt-48 pb-32 px-6 md:px-20 relative overflow-hidden ${data.color} ${data.secondaryColor}`}>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24 relative z-10 text-center lg:text-left">
           <div className="w-full lg:w-1/2 space-y-12 flex flex-col items-center lg:items-start text-center lg:text-left">
              <SectionHeading 
                 subtitle={data.subtitle}
                 title={data.title}
                 description={data.desc}
                 light={data.secondaryColor === 'text-white'}
              />
              <Reveal delay={0.3} width="100%" overflowVisible>
                 <div className="flex justify-center lg:justify-start w-full">
                    <motion.button 
                        whileHover={{ scale: 1.05, backgroundColor: '#000', color: '#FFF' }}
                        whileTap={{ scale: 0.95 }}
                        className="px-14 py-7 bg-black text-white rounded-full font-extrabold uppercase text-sm shadow-2xl transition-all"
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
              <div className="aspect-[4/5] bg-white rounded-[60px] md:rounded-[80px] shadow-5xl border-[15px] border-black/5 overflow-hidden relative w-full max-w-md group">
                 <img key={data.heroImg} src={data.heroImg} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
           </motion.div>
        </div>
      </section>

      {/* 2. DYNAMIC SECTIONS - STACKED COLORS */}
      {data.sections.map((section: any, idx: number) => (
        <section key={idx} className={`py-40 px-6 md:px-20 ${section.bgColor} ${section.light ? 'text-white' : 'text-black'}`}>
           <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24 text-center lg:text-left">
              <div className={`w-full lg:w-1/2 ${idx % 2 === 0 ? 'lg:order-1' : 'lg:order-2'} space-y-10 flex flex-col items-center lg:items-start`}>
                 <SectionHeading 
                    title={section.title}
                    description={section.desc}
                    light={section.light}
                 />
                 <div className="pt-6">
                    <div className="flex items-center gap-4">
                       <CheckCircle2 size={24} className="opacity-40" />
                       <span className="text-[10px] font-black uppercase tracking-widest leading-none">Premium Feature Included</span>
                    </div>
                 </div>
              </div>
              <motion.div 
                 initial={{ opacity: 0, x: idx % 2 === 0 ? 100 : -100 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className={`w-full lg:w-1/2 ${idx % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} flex justify-center`}
              >
                 <div className="aspect-square w-full max-w-sm md:max-w-md rounded-[50px] md:rounded-[70px] overflow-hidden shadow-5xl border-[15px] border-white/10 group bg-white relative">
                    <img key={section.img} src={section.img} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
                 </div>
              </motion.div>
           </div>
        </section>
      ))}

      {/* 3. FAQ SECTION - ROYAL BLUE (#2665D6) */}
      <section className="py-40 bg-[#2665D6] px-6 md:px-20 text-white capitalize">
         <div className="max-w-4xl mx-auto flex flex-col items-center">
            <div className="text-center mb-32">
               <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter text-white leading-none">Frequently shared questions</h2>
            </div>
            <div className="space-y-6 w-full">
               {data.faqs.map((item: any, i: number) => (
                 <FAQItem key={i} question={item.q} answer={item.a} activeColor="text-[#2665D6]" />
               ))}
            </div>
         </div>
      </section>

      {/* 4. FINAL CTA - DARK PURPLE */}
      <section className="py-48 px-6 md:px-20 bg-[#502274] text-white text-center relative overflow-hidden">
         <div className="max-w-6xl mx-auto relative z-10 text-white flex flex-col items-center space-y-12">
            <Reveal width="100%">
               <h2 className="text-6xl md:text-[8rem] font-extrabold tracking-tighter uppercase leading-[0.85] text-white">
                 Jumpstart your <br className="hidden md:block" /><span className="text-[#D2E823]">empire today</span>
               </h2>
            </Reveal>
            <Reveal delay={0.2} overflowVisible>
               <div className="flex justify-center w-full">
                    <motion.button 
                        whileHover={{ scale: 1.05, backgroundColor: '#FFFFFF', color: '#502274' }}
                        whileTap={{ scale: 0.95 }}
                        className="px-16 py-8 bg-[#D2E823] text-black rounded-full font-extrabold uppercase text-sm shadow-3xl transition-all leading-none"
                    >
                        Get started for free
                    </motion.button>
               </div>
            </Reveal>
         </div>
         {/* Background Decoration */}
         <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[30rem] font-extrabold opacity-[0.03] select-none pointer-events-none uppercase tracking-tighter italic text-white leading-none">MONKEY</div>
      </section>

    </div>
  )
}
