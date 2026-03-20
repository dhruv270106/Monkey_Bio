'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Navbar from '@/components/Navbar'
import HeroScroll from '@/components/HeroScroll'
import { Reveal } from '@/components/Reveal'
import Lenis from 'lenis'

// REUSABLE DECORATIVE BUBBLE
function FloatingBubble({ top, left, size, delay = 0, color = "bg-white/10" }: { top: string, left: string, size: string, delay?: number, color?: string }) {
  return (
    <motion.div 
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      animate={{ 
        y: [0, -20, 0],
        rotate: [0, 10, 0]
      }}
      transition={{ 
        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
        rotate: { duration: 5, repeat: Infinity, ease: "easeInOut", delay }
      }}
      className={`absolute ${top} ${left} ${size} ${color} rounded-full blur-xl pointer-events-none z-0`}
    />
  )
}

function Section({ id, children, from = "bottom", bgClass = "", imageSrc = "" }: { id: string, children: React.ReactNode, from?: "left" | "right" | "bottom", bgClass?: string, imageSrc?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"] // Triggers MUCH earlier now
  })

  // Faster entry (arrive by 0.2 instead of 0.4)
  const xRaw = useTransform(scrollYProgress, [0, 0.25], [from === "left" ? -150 : from === "right" ? 150 : 0, 0])
  const yRaw = useTransform(scrollYProgress, [0, 0.25], [from === "bottom" ? 150 : 0, 0])
  const x = useSpring(xRaw, { stiffness: 120, damping: 25 })
  const y = useSpring(yRaw, { stiffness: 120, damping: 25 })
  
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.25], [0.98, 1])

  // Parallax: Completely disable Y-movement on mobile to stop bottom clipping
  const imgY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [60, -60])
  const imgRotate = useTransform(scrollYProgress, [0, 0.5], isMobile ? [0, 0] : [from === "left" ? 6 : -6, 0])

  return (
    <section id={id} ref={ref} className={`stack-section px-4 md:px-12 lg:px-20 ${bgClass} overflow-hidden relative`}>
      <FloatingBubble top="top-20" left="left-10" size="w-32 h-32 md:w-64 md:h-64" delay={0.5} />
      <FloatingBubble top="bottom-20" left="right-20" size="w-40 h-40 md:w-80 md:h-80" delay={1} />
      
      <motion.div 
        style={{ x, y, opacity, scale }}
        className="w-full h-full grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] items-center gap-6 lg:gap-20 relative z-20 py-10 md:py-20 lg:py-32"
      >
        <div className={`flex flex-col ${from === "right" ? "lg:order-2 lg:pl-10 text-right lg:text-left" : "lg:pr-10"}`}>
           {children}
        </div>
        <motion.div style={{ y: imgY, rotate: imgRotate }} className="flex justify-center lg:justify-end">
           {imageSrc && (
             <div className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[400px] aspect-[4/5] bg-white rounded-[32px] md:rounded-[60px] shadow-2xl overflow-hidden p-1 md:p-2 group mt-6 lg:mt-0">
                <img src={imageSrc} className="w-full h-full object-cover rounded-[28px] md:rounded-[50px] group-hover:scale-105 transition-transform duration-700" />
             </div>
           )}
        </motion.div>
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
        
        {/* HERO */}
        <section id="hero" className="stack-section bg-gradient-to-br from-[#D2E823] via-[#E9F861] to-[#D2E823] text-black px-6 md:px-12 lg:px-20 overflow-hidden">
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] h-full items-center gap-10 relative z-20 pt-24 md:pt-0">
              <div className="flex flex-col gap-6 md:gap-10 z-30 pr-10 relative">
                <Reveal delay={0.05} width="100%">
                  <h1 className="text-[clamp(44px,9vw,100px)] font-black leading-[0.85] tracking-[-0.07em] uppercase pb-4">
                    Everything <br /> You Are. <br /> One Link.
                  </h1>
                </Reveal>
                <Reveal delay={0.2} width="100%">
                  <p className="text-[clamp(18px,2.2vw,24px)] font-black max-w-lg leading-tight opacity-70 pb-6">
                     The original link in bio, trusted by <span className="underline decoration-wavy decoration-linktree-purple decoration-4">40M+</span> creators.
                  </p>
                </Reveal>
                <div className="flex flex-col gap-4 max-w-2xl mt-4">
                  {!isClaimed ? (
                    <div className="flex flex-row bg-white rounded-[32px] md:rounded-[40px] p-2 sm:p-4 gap-2 sm:gap-4 shadow-2xl focus-within:ring-8 transition-all ring-linktree-purple/10 w-full overflow-hidden">
                      <div className="flex items-center flex-1 px-2 sm:px-4 min-w-0">
                        <span className="font-black text-xl sm:text-3xl text-gray-200 mr-1 sm:mr-2 shrink-0">/</span>
                        <input 
                          type="text" placeholder="yourname"
                          className="bg-transparent border-none focus:outline-none focus:ring-0 font-black text-base sm:text-2xl text-black flex-1 py-3 sm:py-4 min-w-0"
                          value={username} onChange={e => setUsername(e.target.value)}
                        />
                      </div>
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => username && setIsClaimed(true)} className="bg-linktree-purple text-white font-black text-xs sm:text-2xl px-3 sm:px-14 py-3 sm:py-6 rounded-2xl md:rounded-[40px] shadow-xl shrink-0">Claim It</motion.button>
                    </div>
                  ) : (
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex justify-between items-center bg-white p-4 sm:p-10 rounded-[40px] border-4 border-white shadow-2xl w-full">
                      <p className="font-black text-sm sm:text-3xl">monkey.bio/{username}</p>
                      <Link href={`/signup?username=${username}`} className="bg-linktree-purple text-white font-black text-xs sm:text-xl px-4 sm:px-8 py-3 rounded-xl sm:rounded-2xl">IT'S YOURS!</Link>
                    </motion.div>
                  )}
                </div>
              </div>
              <div className="relative h-full w-full hidden lg:block overflow-hidden"><HeroScroll /></div>
           </div>
        </section>

        {/* CUSTOMIZE */}
        <Section id="features" from="left" bgClass="bg-gradient-to-br from-[#2665D6] via-[#4F8BF8] to-[#1E4FAF] text-white" imageSrc="/images/customize.png">
             <Reveal delay={0.1} width="100%"><h2 className="text-[clamp(40px,7.5vw,94px)] font-black leading-[0.88] uppercase mb-6 md:mb-10 pb-4 md:pb-6">Personalize <br /> Everything.</h2></Reveal>
             <Reveal delay={0.2} width="100%"><p className="text-lg md:text-2xl font-black text-white/60 mb-8 md:mb-12 uppercase tracking-widest">Your Brand. Style. No Code.</p></Reveal>
             <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} className="inline-block mt-2 md:mt-4">
                <Link href="/signup" className="bg-[#D2E823] text-[#2665D6] font-black text-lg md:text-2xl px-8 py-4 md:px-12 md:py-6 rounded-[24px] shadow-2xl inline-block hover:bg-white transition-colors uppercase tracking-widest">DISCOVER ↗</Link>
             </motion.div>
        </Section>

        {/* SHARE */}
        <Section id="share" from="right" bgClass="bg-gradient-to-br from-[#780011] via-[#B50019] to-[#54000C] text-white" imageSrc="/images/share.png">
             <Reveal delay={0.1} width="100%"><h2 className="text-[clamp(40px,7.5vw,94px)] font-black leading-tight uppercase mb-6 md:mb-12 pb-4 md:pb-6">Share <br /> Everywhere.</h2></Reveal>
             <Reveal delay={0.2} width="100%"><p className="text-lg md:text-2xl font-black text-white/50 mb-8 md:mb-12 uppercase italic">One Link. All Socials.</p></Reveal>
             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Link href="/signup" className="bg-white text-linktree-maroon font-black text-lg md:text-2xl px-8 py-4 md:px-10 md:py-6 rounded-full shadow-2xl inline-flex items-center gap-4 hover:bg-[#D2E823] transition-colors">GET YOURS 🔥</Link></motion.div>
        </Section>

        {/* ANALYZE */}
        <Section id="analyze" from="bottom" bgClass="bg-gradient-to-br from-[#1E1E1E] via-[#2D2D2D] to-[#0D0D0D] text-white" imageSrc="/images/analyze.png">
             <Reveal delay={0.1} width="100%"><h2 className="text-[clamp(40px,7.5vw,94px)] font-black uppercase leading-[0.9] mb-4 md:mb-8 pb-4 md:pb-6">Smart <br /> Data.</h2></Reveal>
             <Reveal delay={0.2} width="100%"><p className="text-lg md:text-2xl font-black text-white/50 mb-8 md:mb-12 uppercase tracking-widest">Growth. Clicks. Insights.</p></Reveal>
             <motion.div whileHover={{ scale: 1.1, y: -5 }} whileTap={{ scale: 0.9 }}>
                <Link href="/signup" className="bg-linktree-lime text-black font-black text-lg md:text-2xl px-10 py-4 md:px-12 md:py-6 rounded-[24px] shadow-xl inline-block hover:bg-white transition-all uppercase">GO PRO ↗</Link>
             </motion.div>
        </Section>

        {/* MARKETPLACE */}
        <Section id="marketplace" from="left" bgClass="bg-gradient-to-br from-[#8000FF] via-[#A84FFF] to-[#5000AF] text-white" imageSrc="/images/marketplace.png">
             <Reveal delay={0.1} width="100%"><h2 className="text-[clamp(40px,7.5vw,94px)] font-black leading-[0.8] uppercase mb-6 md:mb-10 pb-4 md:pb-6">Creator <br /> Shop.</h2></Reveal>
             <Reveal delay={0.2} width="100%"><p className="text-lg md:text-2xl font-black text-white/40 mb-8 md:mb-12 uppercase">Sell Digital. Direct. Fast.</p></Reveal>
             <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
                <Link href="/templates" className="bg-[#D2E823] text-black font-black text-lg md:text-2xl px-10 py-4 md:px-14 md:py-6 rounded-[30px] shadow-2xl inline-block hover:bg-white transition-all uppercase leading-none">BROWSE ↗</Link>
             </motion.div>
        </Section>

        {/* TEMPLATES */}
        <Section id="templates" from="right" bgClass="bg-gradient-to-br from-[#FF0080] via-[#FF4FBC] to-[#AF0050] text-white" imageSrc="/images/templates.png">
             <Reveal delay={0.1} width="100%"><h2 className="text-[clamp(40px,7.5vw,94px)] font-black leading-[0.9] uppercase mb-6 md:mb-10 pb-4 md:pb-6">Beautiful <br /> Layouts.</h2></Reveal>
             <Reveal delay={0.2} width="100%"><p className="text-lg md:text-2xl font-black text-white/60 mb-8 md:mb-12 uppercase tracking-tighter italic">Design Beautifully.</p></Reveal>
             <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link href="/templates" className="bg-black text-white font-black text-lg md:text-2xl px-10 py-4 md:px-12 md:py-6 rounded-[30px] shadow-2xl inline-block hover:bg-[#8000FF] transition-all uppercase tracking-widest">VIEW ALL ↗</Link>
             </motion.div>
        </Section>

        {/* MONETIZE */}
        <Section id="monetize" from="left" bgClass="bg-gradient-to-br from-[#FF6B00] via-[#FF9E00] to-[#E65100] text-white" imageSrc="/images/monetize.png">
             <Reveal delay={0.1} width="100%"><h2 className="text-[clamp(40px,7.5vw,94px)] font-black leading-[0.85] uppercase mb-6 md:mb-10 pb-4 md:pb-6">Monetize <br /> Audience.</h2></Reveal>
             <Reveal delay={0.2} width="100%"><p className="text-lg md:text-2xl font-black text-white/50 mb-8 md:mb-12 uppercase tracking-widest">Support. Tips. Sales.</p></Reveal>
             <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="bg-white text-[#FF6B00] font-black text-lg md:text-2xl px-10 py-4 md:px-14 md:py-6 rounded-[40px] shadow-2xl transition-all uppercase tracking-widest">EARN NOW</motion.button>
        </Section>

        {/* INTEGRATIONS */}
        <Section id="integrations" from="right" bgClass="bg-gradient-to-br from-[#00C2FF] via-[#00E0FF] to-[#0085FF] text-white" imageSrc="/images/integrations.png">
             <Reveal delay={0.1} width="100%"><h2 className="text-[clamp(40px,7.5vw,94px)] font-black leading-[0.9] uppercase mb-6 md:mb-10 pb-4 md:pb-6">Embed <br /> Anything.</h2></Reveal>
             <Reveal delay={0.2} width="100%"><p className="text-lg md:text-2xl font-black text-white/50 mb-8 md:mb-12 uppercase">Spotify. Shopify. Connect.</p></Reveal>
             <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link href="/signup" className="bg-white text-[#0085FF] font-black text-lg md:text-2xl px-10 py-4 md:px-12 md:py-6 rounded-[30px] shadow-2xl inline-block hover:bg-black hover:text-white transition-all uppercase leading-none">PLUGINS ↗</Link>
             </motion.div>
        </Section>

        {/* FINAL CTA - MOBILE TIGHTENED */}
        <section id="cta" className="stack-section bg-gradient-to-br from-[#D2E823] via-[#E9F861] to-[#D2E823] text-black px-4 md:px-12 lg:px-20 overflow-hidden relative">
           <FloatingBubble top="top-20" left="left-20" size="w-64 h-64 md:w-96 md:h-96" color="bg-linktree-purple/10" />
           <div className="max-w-7xl mx-auto text-center px-4 md:px-8 flex flex-col items-center h-full justify-center relative z-20 py-10 md:py-20">
              <Reveal delay={0.1} width="100%">
                 {/* Fixed leading and reduced bottom margin for tighter mobile look */}
                 <h2 className="text-[clamp(48px,11vw,150px)] font-black leading-[0.95] md:leading-[0.75] uppercase italic mb-8 md:mb-20 pb-4 md:pb-8 tracking-tighter">
                    Finish <br className="hidden md:block" /> Strong.
                  </h2>
              </Reveal>
              <div className="flex flex-row justify-center gap-3 sm:gap-6 md:gap-8 w-full max-w-4xl">
                 <motion.div whileHover={{ scale: 1.08, y: -5 }} className="flex-1">
                    <Link href="/signup" className="block w-full bg-linktree-purple text-white font-black text-sm sm:text-2xl md:text-4xl px-2 py-5 sm:px-4 sm:py-6 md:py-10 rounded-2xl md:rounded-[40px] shadow-3xl text-center">SIGN UP</Link>
                 </motion.div>
                 <motion.div whileHover={{ scale: 1.08, y: -5 }} className="flex-1">
                    <Link href="/login" className="block w-full bg-white text-black font-black text-sm sm:text-2xl md:text-4xl px-2 py-5 sm:px-4 sm:py-6 md:py-10 rounded-2xl md:rounded-[40px] shadow-3xl text-center">LOG IN</Link>
                 </motion.div>
              </div>
           </div>
        </section>

        {/* FOOTER */}
        <footer className="relative bg-white pt-32 pb-16 px-8 z-30"><div className="max-w-7xl mx-auto flex flex-col gap-24"><div className="flex flex-col md:flex-row justify-between items-start gap-16"><div><h3 className="text-6xl font-black tracking-tighter mb-6">Monkey Bio.</h3><p className="text-xl font-bold text-gray-400">Join 40M+ creators today.</p></div><div className="grid grid-cols-2 md:grid-cols-3 gap-16">{[{t:'Product',links:['Features','Link','Bio']},{t:'Social',links:['Insta','TikTok', 'YouTube']},{t:'Company',links:['About', 'Legal', 'Privacy']}].map((col,i)=>(<div key={i} className="flex flex-col gap-6"><h4 className="font-black text-xs uppercase tracking-widest text-gray-300">{col.t}</h4><ul className="flex flex-col gap-4">{col.links.map(l=>(<li key={l}><Link href="#" className="font-black text-lg text-gray-600 hover:text-black">{l}</Link></li>))}</ul></div>))}</div></div><div className="pt-10 border-t border-gray-100 text-center font-black text-xs text-gray-300 uppercase tracking-widest">© 2026 MONKEY BIO. ALL RIGHTS RESERVED.</div></div></footer>
      </main>
    </div>
  )
}
