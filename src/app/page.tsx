'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Navbar from '@/components/Navbar'
import HeroScroll from '@/components/HeroScroll'
import { Reveal } from '@/components/Reveal'
import { Instagram, Facebook, Linkedin, Disc, Check } from 'lucide-react'
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

function Section({ id, children, imageSide = "right", bgClass = "", imageSrc = "" }: { id: string, children: React.ReactNode, imageSide?: "left" | "right", bgClass?: string, imageSrc?: string }) {
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
    offset: ["start end", "end start"]
  })

  // Animation constants - settle in the center (0.4 to 0.6)
  const xRaw = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [imageSide === "left" ? 100 : -100, 0, 0, imageSide === "left" ? -100 : 100])
  const yRaw = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [100, 0, 0, -100])
  const x = useSpring(xRaw, { stiffness: 100, damping: 20 })
  const y = useSpring(yRaw, { stiffness: 100, damping: 20 })
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.95, 1, 1, 0.95])

  // Parallax with a 'dead zone' in the center for perfect stability
  const imgY = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], isMobile ? [0, 0, 0, 0] : [100, 0, 0, -100])
  const imgRotate = useTransform(scrollYProgress, [0, 0.5], isMobile ? [0, 0] : [imageSide === "left" ? -6 : 6, 0])

  return (
    <section id={id} ref={ref} className={`stack-section px-6 md:px-12 lg:px-24 ${bgClass} overflow-hidden relative`}>
      <FloatingBubble top="top-20" left="left-10" size="w-32 h-32 md:w-64 md:h-64" delay={0.5} />
      <FloatingBubble top="bottom-20" left="right-20" size="w-40 h-40 md:w-80 md:h-80" delay={1} />
      
      <motion.div 
        style={{ x, opacity, scale }}
        className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-6 lg:gap-32 relative z-20 py-12 lg:py-24"
      >
        <div className={`flex flex-col items-center lg:items-start text-center lg:text-left ${imageSide === "left" ? "lg:order-2" : "lg:order-1"}`}>
           {children}
        </div>
        <motion.div 
          style={{ y: imgY, rotate: imgRotate }} 
          className={`flex justify-center ${imageSide === "left" ? "lg:order-1 lg:justify-start" : "lg:order-2 lg:justify-end"}`}
        >
           {imageSrc && (
             <div className="relative w-full max-w-[280px] sm:max-w-[360px] md:max-w-[420px] aspect-[4/5] bg-white rounded-[40px] md:rounded-[60px] shadow-2xl overflow-hidden p-2 group">
                <img src={imageSrc} className="w-full h-full object-cover rounded-[32px] md:rounded-[50px] group-hover:scale-110 transition-transform duration-1000" />
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
    <div className="min-h-screen bg-[#D2E823] selection:bg-black selection:text-[#D2E823]">
      
      <main className="relative flex flex-col">
        
        {/* HERO SECTION - COMPACT MOBILE OPTIMIZED */}
        <section id="hero" className="relative h-screen lg:h-screen min-h-[850px] lg:min-h-[800px] bg-gradient-to-br from-[#D2E823] via-[#E9F861] to-[#D2E823] text-black px-6 md:px-12 lg:px-24 overflow-hidden flex flex-col items-center justify-start pt-24 lg:pt-40 lg:justify-center">
           <div className="max-w-[1400px] mx-auto w-full h-full grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] items-start lg:items-center gap-4 lg:gap-12 relative z-20">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-2 md:gap-10 z-30 relative pt-4 lg:pt-0">
                <Reveal delay={0.05} width="100%">
                  <h1 className="text-[clamp(44px,9vw,100px)] font-extrabold leading-[0.9] lg:leading-[0.85] tracking-[-0.07em] uppercase pb-1">
                    Everything <br /> You Are. <br /> One Link.
                  </h1>
                </Reveal>
                
                <Reveal delay={0.15} width="100%">
                  <p className="text-lg md:text-2xl font-semibold tracking-tight opacity-70 max-w-xl leading-relaxed uppercase mb-2">
                    The original link in bio, trusted by <span className="relative inline-block px-1">40M+<span className="absolute left-0 bottom-0 w-full h-1 bg-[#502274] blur-[2px] opacity-20" /></span> creators.
                  </p>
                </Reveal>

                <div className="flex flex-col gap-4 w-full max-w-[600px] mt-2">
                  <div className={`relative transition-all duration-700 ${isClaimed ? 'scale-95 opacity-50 pointer-events-none' : 'scale-100'}`}>
                    <div className="absolute inset-0 bg-white/40 blur-3xl rounded-full" />
                    <div className="relative flex flex-col sm:flex-row items-center gap-3 bg-white/95 backdrop-blur-3xl p-2 sm:p-3 pl-6 sm:pl-8 rounded-[32px] sm:rounded-[40px] shadow-[0_30px_80px_rgba(0,0,0,0.12)] border border-white">
                      <span className="text-lg sm:text-xl font-extrabold text-black/30">linktr.ee/</span>
                      <input 
                        type="text" 
                        placeholder="yourname"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-transparent text-lg sm:text-xl font-extrabold outline-none w-full placeholder:text-gray-300 uppercase tracking-tighter"
                      />
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => username && setIsClaimed(true)}
                        className="w-full sm:w-auto bg-[#422066] text-white px-8 py-4 sm:px-10 sm:py-6 rounded-[24px] sm:rounded-[32px] font-extrabold text-lg sm:text-xl hover:bg-black transition-all shadow-2xl uppercase tracking-tighter whitespace-nowrap leading-none min-w-[160px] sm:min-w-[200px]"
                      >
                        Claim Yours
                      </motion.button>
                    </div>
                  </div>
                  
                  {isClaimed && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 bg-white text-green-600 px-8 py-4 rounded-3xl font-extrabold text-sm uppercase self-center sm:self-start shadow-xl border border-green-50">
                       <Check className="w-5 h-5" /> Username {username} reserved!
                    </motion.div>
                  )}
                </div>
                {/* HERO SCROLL MOBILE - BROUGHT EVEN CLOSER */}
                <div className="block lg:hidden w-full mt-4 pb-10 overflow-visible relative">
                   <HeroScroll />
                </div>
              </div>

              <div className="hidden lg:block relative h-full w-full">
                 <HeroScroll />
              </div>
           </div>
        </section>

        {/* CUSTOMIZE SECTION - IMAGE LEFT */}
        <Section id="features" imageSide="left" bgClass="bg-gradient-to-br from-[#2665D6] via-[#4F8BF8] to-[#1E4FAF] text-white" imageSrc="/images/customize.png">
             <Reveal delay={0.1} width="100%"><h2 className="text-[clamp(36px,6.5vw,72px)] font-extrabold leading-tight uppercase mb-4 md:mb-8 font-extrabold">Personalize Everything.</h2></Reveal>
             <Reveal delay={0.2} width="100%"><p className="text-base md:text-xl font-extrabold text-white/60 mb-4 md:mb-10 uppercase tracking-widest font-extrabold">Your Brand. Style. No Code.</p></Reveal>
             <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
                <Link href="/signup" className="bg-[#D2E823] text-[#2665D6] font-extrabold text-sm md:text-lg px-8 py-4 rounded-[18px] shadow-2xl inline-block hover:bg-white transition-colors uppercase tracking-widest font-extrabold">DISCOVER ↗</Link>
             </motion.div>
        </Section>

        {/* SHARE SECTION - IMAGE RIGHT */}
        <Section id="share" imageSide="right" bgClass="bg-gradient-to-br from-[#780011] via-[#B50019] to-[#54000C] text-white" imageSrc="/images/share.png">
             <Reveal delay={0.1} width="100%"><h2 className="text-[clamp(36px,6.5vw,72px)] font-extrabold leading-tight uppercase mb-4 md:mb-8 font-extrabold">Share Everywhere.</h2></Reveal>
             <Reveal delay={0.2} width="100%"><p className="text-base md:text-xl font-extrabold text-white/50 mb-4 md:mb-10 uppercase italic font-extrabold">One Link. All Socials.</p></Reveal>
             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Link href="/signup" className="bg-white text-[#780011] font-extrabold text-sm md:text-lg px-8 py-4 rounded-full shadow-2xl inline-flex items-center gap-4 hover:bg-[#D2E823] transition-colors font-extrabold">GET YOURS 🔥</Link></motion.div>
        </Section>

        {/* ANALYZE SECTION - IMAGE LEFT */}
        <Section id="analyze" imageSide="left" bgClass="bg-gradient-to-br from-[#1E1E1E] via-[#2D2D2D] to-[#0D0D0D] text-white" imageSrc="/images/analyze.png">
             <Reveal delay={0.1} width="100%"><h2 className="text-[clamp(36px,6.5vw,72px)] font-extrabold uppercase leading-tight mb-3 md:mb-6 font-extrabold">Smart Data.</h2></Reveal>
             <Reveal delay={0.2} width="100%"><p className="text-base md:text-xl font-extrabold text-white/50 mb-4 md:mb-10 uppercase tracking-widest font-extrabold">Growth. Clicks. Insights.</p></Reveal>
             <motion.div whileHover={{ scale: 1.1, y: -5 }} whileTap={{ scale: 0.9 }}>
                <Link href="/signup" className="bg-[#D2E823] text-black font-extrabold text-sm md:text-lg px-10 py-5 rounded-[20px] shadow-xl inline-block hover:bg-white transition-all uppercase font-extrabold">GO PRO ↗</Link>
             </motion.div>
        </Section>

        {/* MARKETPLACE SECTION - IMAGE RIGHT */}
        <Section id="marketplace" imageSide="right" bgClass="bg-gradient-to-br from-[#8000FF] via-[#A84FFF] to-[#5000AF] text-white" imageSrc="/images/marketplace.png">
             <Reveal delay={0.1} width="100%"><h2 className="text-[clamp(36px,6.5vw,72px)] font-extrabold leading-tight uppercase mb-4 md:mb-8 font-extrabold">Creator Shop.</h2></Reveal>
             <Reveal delay={0.2} width="100%"><p className="text-base md:text-xl font-extrabold text-white/40 mb-4 md:mb-10 uppercase font-extrabold">Sell Digital. Direct. Fast.</p></Reveal>
             <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
                <Link href="/templates" className="bg-[#D2E823] text-black font-extrabold text-sm md:text-lg px-10 py-5 rounded-[24px] shadow-2xl inline-block hover:bg-white transition-all uppercase leading-none font-extrabold">BROWSE ↗</Link>
             </motion.div>
        </Section>

        {/* TEMPLATES SECTION - IMAGE LEFT */}
        <Section id="templates" imageSide="left" bgClass="bg-gradient-to-br from-[#FF0080] via-[#FF4FBC] to-[#AF0050] text-white" imageSrc="/images/templates.png">
             <Reveal delay={0.1} width="100%"><h2 className="text-[clamp(36px,6.5vw,72px)] font-extrabold leading-tight uppercase mb-4 md:mb-8 font-extrabold">Beautiful Layouts.</h2></Reveal>
             <Reveal delay={0.2} width="100%"><p className="text-base md:text-xl font-extrabold text-white/60 mb-4 md:mb-10 uppercase tracking-tighter italic font-extrabold">Design Beautifully.</p></Reveal>
             <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link href="/templates" className="bg-black text-white font-extrabold text-sm md:text-lg px-10 py-5 rounded-[24px] shadow-2xl inline-block hover:bg-[#8000FF] transition-all uppercase tracking-widest font-extrabold">VIEW ALL ↗</Link>
             </motion.div>
        </Section>

        {/* MONETIZE SECTION - IMAGE RIGHT */}
        <Section id="monetize" imageSide="right" bgClass="bg-gradient-to-br from-[#FF6B00] via-[#FF9E00] to-[#E65100] text-white" imageSrc="/images/monetize.png">
             <Reveal delay={0.1} width="100%"><h2 className="text-[clamp(36px,6.5vw,72px)] font-extrabold leading-tight uppercase mb-4 md:mb-8 font-extrabold">Monetize Audience.</h2></Reveal>
             <Reveal delay={0.2} width="100%"><p className="text-base md:text-xl font-extrabold text-white/50 mb-4 md:mb-10 uppercase tracking-widest font-extrabold">Support. Tips. Sales.</p></Reveal>
             <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="bg-white text-[#FF6B00] font-extrabold text-sm md:text-lg px-10 py-5 rounded-3xl shadow-2xl transition-all uppercase tracking-widest font-extrabold">EARN NOW</motion.button>
        </Section>

        {/* EMBED SECTION - IMAGE LEFT */}
        <Section id="integrations" imageSide="left" bgClass="bg-gradient-to-br from-[#00C2FF] via-[#00E0FF] to-[#0085FF] text-white" imageSrc="/images/integrations.png">
             <Reveal delay={0.1} width="100%"><h2 className="text-[clamp(36px,6.5vw,72px)] font-extrabold leading-tight uppercase mb-4 md:mb-8 font-extrabold">Embed Anything.</h2></Reveal>
             <Reveal delay={0.2} width="100%"><p className="text-base md:text-xl font-extrabold text-white/50 mb-4 md:mb-10 uppercase font-extrabold">Spotify. Shopify. Connect.</p></Reveal>
             <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link href="/signup" className="bg-white text-[#0085FF] font-extrabold text-sm md:text-lg px-10 py-5 rounded-[24px] shadow-2xl inline-block hover:bg-black hover:text-white transition-all uppercase leading-none font-extrabold">PLUGINS ↗</Link>
             </motion.div>
        </Section>

        {/* FINAL CTA - EXTRA COMPACT MOBILE */}
        <section id="cta" className="stack-section bg-gradient-to-br from-[#D2E823] via-[#E9F861] to-[#D2E823] text-black px-6 md:px-12 lg:px-24 overflow-hidden relative py-6 md:py-24">
           <FloatingBubble top="top-20" left="left-20" size="w-64 h-64 md:w-96 md:h-96" color="bg-linktree-purple/10" />
           <div className="max-w-7xl mx-auto text-center px-4 md:px-8 flex flex-col items-center justify-center relative z-20">
              <Reveal delay={0.1} width="100%">
                 <h2 className="text-[clamp(48px,11vw,120px)] font-extrabold leading-tight md:leading-[0.75] uppercase italic mb-8 md:mb-16 tracking-tighter font-extrabold">
                    Finish <br className="hidden md:block" /> Strong.
                  </h2>
              </Reveal>
              <div className="flex flex-row justify-center gap-3 sm:gap-6 md:gap-8 w-full max-w-4xl">
                 <motion.div whileHover={{ scale: 1.08, y: -5 }} className="flex-1">
                    <Link href="/signup" className="block w-full bg-linktree-purple text-white font-extrabold text-sm sm:text-2xl md:text-4xl px-2 py-5 rounded-2xl md:rounded-[40px] shadow-3xl text-center">SIGN UP</Link>
                 </motion.div>
                 <motion.div whileHover={{ scale: 1.08, y: -5 }} className="flex-1">
                    <Link href="/login" className="block w-full bg-white text-black font-extrabold text-sm sm:text-2xl md:text-4xl px-2 py-5 rounded-2xl md:rounded-[40px] shadow-3xl text-center">LOG IN</Link>
                 </motion.div>
              </div>
           </div>
        </section>

      </main>
    </div>
  )
}
