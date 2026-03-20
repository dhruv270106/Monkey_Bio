'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Navbar from '@/components/Navbar'
import HeroScroll from '@/components/HeroScroll'
import { Reveal } from '@/components/Reveal'
import Lenis from 'lenis'

function Section({ id, children, from = "bottom", bgClass = "" }: { id: string, children: React.ReactNode, from?: "left" | "right" | "bottom", bgClass?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Arrive earlier
  const x = useTransform(scrollYProgress, [0, 0.4], [from === "left" ? -250 : from === "right" ? 250 : 0, 0])
  const y = useTransform(scrollYProgress, [0, 0.4], [from === "bottom" ? 250 : 0, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.35], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.95, 1])

  return (
    <section id={id} ref={ref} className={`stack-section px-8 md:px-20 ${bgClass} overflow-hidden`}>
      <motion.div 
        style={{ x, y, opacity, scale }}
        className="w-full h-full flex flex-col items-center justify-center py-20 relative z-20"
      >
        {children}
      </motion.div>
    </section>
  )
}

export default function Home() {
  const [username, setUsername] = useState('')
  const [isClaimed, setIsClaimed] = useState(false)

  useEffect(() => {
    const lenis = new Lenis()
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <div className="relative bg-white selection-lime overflow-x-hidden font-sans">
      <div className="noise-overlay" />
      <Navbar />

      <main className="relative flex flex-col">
        
        {/* HERO SECTION - REFINED LAYOUT */}
        <section id="hero" className="stack-section bg-gradient-to-br from-[#D2E823] via-[#E9F861] to-[#D2E823] text-black px-8 md:px-20 overflow-hidden">
           <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] h-full items-center gap-10 relative z-20">
              
              {/* LEFT TEXT CONTAINER */}
              <div className="flex flex-col gap-10 z-30 pr-10 relative">
                <Reveal delay={0.05} width="100%">
                  <h1 className="text-6xl md:text-8xl lg:text-[110px] font-black leading-[0.85] tracking-[-0.07em] uppercase">
                    Everything <br /> You Are. <br /> One Link.
                  </h1>
                </Reveal>
                
                <Reveal delay={0.2} width="100%">
                  <p className="text-2xl font-black max-w-sm leading-tight opacity-60">
                     The original link in bio, trusted by <span className="underline decoration-wavy decoration-linktree-purple decoration-4">40M+</span> creators.
                  </p>
                </Reveal>

                <div className="flex flex-col gap-4 max-w-lg mt-6">
                  {!isClaimed ? (
                    <div className="flex bg-white rounded-3xl p-3 gap-3 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] focus-within:ring-8 transition-all">
                      <span className="flex items-center pl-6 font-black text-xl text-gray-200">/</span>
                      <input 
                        type="text" 
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-transparent border-none focus:outline-none focus:ring-0 font-black text-2xl text-black flex-1 py-4"
                      />
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => username && setIsClaimed(true)}
                        className="bg-linktree-purple text-white font-black text-xl px-12 py-5 rounded-[20px]"
                      >
                        CLAIM IT
                      </motion.button>
                    </div>
                  ) : (
                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex justify-between items-center bg-white p-6 rounded-[30px] border-4 border-white shadow-2xl">
                      <p className="font-black text-2xl">monkey.bio/{username}</p>
                      <Link href={`/signup?username=${username}`} className="bg-linktree-purple text-white font-black text-lg px-8 py-4 rounded-2xl">IT'S YOURS!</Link>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* RIGHT SCROLL CONTAINER - ISOLATED */}
              <div className="relative h-full w-full hidden lg:block overflow-hidden">
                <HeroScroll />
              </div>
           </div>

           {/* Scroll Indicator */}
           <div className="absolute bottom-12 left-8 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] opacity-30 text-black z-30">
             <div className="w-10 h-[2px] bg-black" /> Scroll to explore
           </div>
        </section>

        {/* CUSTOMIZE SECTION - FROM LEFT (BLUE) */}
        <Section id="features" from="left" bgClass="bg-gradient-to-br from-[#2665D6] via-[#4F8BF8] to-[#1E4FAF] text-white">
           <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="pr-10 z-30 relative">
                 <Reveal delay={0.1} width="100%">
                    <h2 className="text-6xl md:text-8xl lg:text-[100px] font-black leading-[0.85] uppercase mb-10">
                      Personalize <br /> Everything.
                    </h2>
                 </Reveal>
                 <motion.div whileHover={{ x: 20 }} className="inline-block mt-12">
                    <Link href="/signup" className="border-b-4 border-[#D2E823] text-[#D2E823] font-black text-3xl pb-2">
                       DISCOVER <span>→</span>
                    </Link>
                 </motion.div>
              </div>
              <div className="flex justify-center lg:justify-end z-10">
                <div className="relative w-full max-w-[400px] aspect-[4/5] bg-white rounded-[60px] p-2 shadow-2xl overflow-hidden border border-white/20">
                   <img src="/images/customize.png" className="w-full h-full object-cover rounded-[50px]" />
                </div>
              </div>
           </div>
        </Section>

        {/* SHARE SECTION - FROM RIGHT (MAROON) */}
        <Section id="share" from="right" bgClass="bg-gradient-to-br from-[#780011] via-[#B50019] to-[#54000C] text-white">
           <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-20 items-center">
              <div className="flex justify-center z-10 order-2 lg:order-1">
                 <div className="relative w-full max-w-[400px] aspect-[4/5] bg-white rounded-[60px] p-2 shadow-2xl overflow-hidden border border-white/20">
                    <img src="/images/share.png" className="w-full h-full object-cover rounded-[50px]" />
                 </div>
              </div>
              <div className="pl-10 z-30 order-1 lg:order-2">
                 <Reveal delay={0.1} width="100%">
                    <h2 className="text-7xl md:text-9xl lg:text-[120px] font-black leading-none uppercase tracking-tighter mb-12">
                       Share <br /> Everywhere.
                    </h2>
                 </Reveal>
                 <Link href="/signup" className="bg-white text-linktree-maroon font-black text-2xl px-12 py-8 rounded-full shadow-2xl inline-flex items-center gap-4">
                    GET YOURS 🔥
                 </Link>
              </div>
           </div>
        </Section>

        {/* ANALYZE SECTION - FROM BOTTOM (CHARCOAL) */}
        <Section id="analyze" from="bottom" bgClass="bg-gradient-to-br from-[#1E1E1E] via-[#2D2D2D] to-[#0D0D0D] text-white">
           <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="z-30 order-2 lg:order-1">
                 <Reveal delay={0.1} width="100%">
                   <h2 className="text-6xl md:text-9xl font-black uppercase leading-[0.9] mb-8">
                     Smart <br /> Data.
                   </h2>
                 </Reveal>
                 <Link href="/signup" className="bg-linktree-lime text-black font-black text-2xl px-12 py-6 rounded-2xl shadow-xl inline-block hover:bg-white transition-all">
                   GO PRO ↗
                 </Link>
              </div>
              <div className="flex justify-center z-10 order-1 lg:order-2">
                 <div className="relative w-full max-w-[400px] aspect-[4/5] bg-white rounded-[60px] p-2 shadow-2xl overflow-hidden border border-white/20">
                    <img src="/images/analyze.png" className="w-full h-full object-cover rounded-[50px]" />
                 </div>
              </div>
           </div>
        </Section>

        {/* MARKETPLACE SECTION - FROM LEFT (PURPLE) */}
        <Section id="marketplace" from="left" bgClass="bg-gradient-to-br from-[#8000FF] via-[#A84FFF] to-[#5000AF] text-white">
           <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-20 items-center">
              <div className="pr-10 z-30">
                 <Reveal delay={0.1} width="100%">
                    <h2 className="text-6xl md:text-9xl lg:text-[100px] font-black leading-[0.8] uppercase mb-10">
                      Marketplace <br /> For Creators.
                    </h2>
                 </Reveal>
                 <Link href="/templates" className="bg-[#D2E823] text-black font-black text-2xl px-16 py-8 rounded-3xl shadow-2xl inline-block mt-10">
                    BROWSE SHOP <span>→</span>
                 </Link>
              </div>
              <div className="flex justify-center lg:justify-end z-10 relative">
                 <div className="relative w-full max-w-[450px] aspect-square bg-white shadow-2xl rounded-[60px] overflow-hidden p-2 border border-white/20">
                    <img src="/images/marketplace.png" className="w-full h-full object-cover rounded-[50px]" />
                 </div>
              </div>
           </div>
        </Section>

        {/* TEMPLATES - FROM RIGHT (PINK) */}
        <Section id="templates" from="right" bgClass="bg-gradient-to-br from-[#FF0080] via-[#FF4FBC] to-[#AF0050] text-white">
           <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-20 items-center">
              <div className="flex justify-center z-10 order-2 lg:order-1">
                 <div className="relative w-full max-w-[450px] aspect-[4/5] bg-white shadow-2xl rounded-[60px] overflow-hidden p-2 border border-white/20">
                    <img src="/images/templates.png" className="w-full h-full object-cover rounded-[50px]" />
                 </div>
              </div>
              <div className="pl-10 z-30 order-1 lg:order-2">
                 <Reveal delay={0.1} width="100%">
                    <h2 className="text-6xl md:text-9xl lg:text-[100px] font-black leading-[0.9] uppercase mb-10">
                      Beautiful <br /> Layouts.
                    </h2>
                 </Reveal>
                 <Link href="/templates" className="bg-black text-white font-black text-2xl px-16 py-8 rounded-3xl shadow-2xl inline-block mt-10">
                    VIEW ALL <span>↗</span>
                 </Link>
              </div>
           </div>
        </Section>

        {/* FINAL CTA - FROM BOTTOM (CYBER LIME) */}
        <Section id="cta" from="bottom" bgClass="bg-gradient-to-br from-[#D2E823] via-[#E9F861] to-[#D2E823] text-black">
           <div className="max-w-7xl mx-auto text-center px-8 flex flex-col items-center">
              <Reveal delay={0.1} width="100%">
                 <h2 className="text-7xl md:text-[13vw] font-black leading-[0.75] uppercase tracking-tighter mb-20 italic">
                    Finish <br /> Strong.
                  </h2>
              </Reveal>
              <div className="flex flex-col md:flex-row justify-center gap-8 w-full max-w-4xl">
                 <Link href="/signup" className="flex-1 bg-linktree-purple text-white font-black text-4xl px-12 py-10 rounded-[40px]">
                    SIGN UP
                 </Link>
                 <Link href="/login" className="flex-1 bg-white text-black font-black text-4xl px-12 py-10 rounded-[40px]">
                    LOG IN
                 </Link>
              </div>
           </div>
        </Section>

        {/* VIBRANT FOOTER */}
        <footer className="relative bg-white pt-32 pb-16 px-8 z-30">
           <div className="max-w-7xl mx-auto flex flex-col gap-24">
              <div className="flex flex-col md:flex-row justify-between items-start gap-16">
                 <div>
                    <h3 className="text-6xl font-black tracking-tighter mb-6">Monkey Bio.</h3>
                    <p className="text-xl font-bold text-gray-400">Join 40M+ creators today.</p>
                 </div>
                 
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
                    {[
                      { t: 'Product', links: ['Features', 'Link', 'Bio'] },
                      { t: 'Social', links: ['Insta', 'TikTok', 'YouTube'] },
                      { t: 'Company', links: ['About', 'Legal', 'Privacy'] }
                    ].map((col, i) => (
                      <div key={i} className="flex flex-col gap-6">
                         <h4 className="font-black text-xs uppercase tracking-widest text-gray-300">{col.t}</h4>
                         <ul className="flex flex-col gap-4">
                            {col.links.map(l => (
                              <li key={l}><Link href="#" className="font-black text-lg text-gray-600 hover:text-black">{l}</Link></li>
                            ))}
                         </ul>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="pt-10 border-t border-gray-100 text-center font-black text-xs text-gray-300 uppercase tracking-widest">
                 © 2026 MONKEY BIO. ALL RIGHTS RESERVED.
              </div>
           </div>
        </footer>
      </main>
    </div>
  )
}
