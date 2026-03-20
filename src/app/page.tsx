'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Navbar from '@/components/Navbar'
import HeroScroll from '@/components/HeroScroll'
import { Reveal } from '@/components/Reveal'
import Lenis from 'lenis'

export default function Home() {
  const [username, setUsername] = useState('')
  const [isClaimed, setIsClaimed] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

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
    <div className="relative bg-black selection-lime overflow-x-hidden">
      <div className="noise-overlay" />
      <Navbar />

      <main ref={containerRef} className="relative flex flex-col">
        
        {/* SECTION 1: THE LUXE HERO */}
        <section className="stack-section bg-neutral-900 border-b border-white/5">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 h-full items-center gap-10 px-8">
            <motion.div 
              style={{ opacity: useTransform(useScroll().scrollY, [0, 500], [1, 0]) }}
              className="flex flex-col gap-12 z-20"
            >
              <Reveal delay={0.2}>
                <h1 className="text-[120px] lg:text-[180px] font-light leading-[0.75] italic tracking-tighter text-white">
                  The <br /> Original.
                </h1>
              </Reveal>
              
              <Reveal delay={0.4}>
                <p className="max-w-md text-xl font-light text-white/50 leading-relaxed uppercase tracking-widest">
                  The only link <br /> in bio you'll <br /> ever need.
                </p>
              </Reveal>

              <div className="flex flex-col gap-6 max-w-lg mt-10">
                {!isClaimed ? (
                  <div className="flex bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl p-2 gap-2 focus-within:ring-1 ring-white/20 transition-all">
                    <span className="flex items-center pl-6 font-light text-white/20 uppercase tracking-widest text-xs">monkey.bio/</span>
                    <input 
                      type="text" 
                      placeholder="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-transparent border-none focus:outline-none focus:ring-0 font-light text-xl text-white flex-1 py-4 uppercase tracking-[0.2em]"
                    />
                    <motion.button 
                      whileHover={{ backgroundColor: "rgba(255,255,255,1)", color: "#000" }}
                      onClick={() => username && setIsClaimed(true)}
                      className="bg-white/10 text-white font-light text-xs px-8 py-4 rounded-xl transition-all border border-white/10 uppercase"
                    >
                      Join
                    </motion.button>
                  </div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-between items-center bg-white/5 p-6 rounded-3xl border border-white/10">
                    <p className="font-light tracking-widest uppercase text-white/60">Ready: {username}</p>
                    <Link href={`/signup?username=${username}`} className="text-linktree-lime underline font-light tracking-widest text-xs uppercase">Finish</Link>
                  </motion.div>
                )}
              </div>
            </motion.div>

            <motion.div 
              style={{ y: useTransform(useScroll().scrollY, [0, 800], [0, -100]) }}
              className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block"
            >
              <div className="h-full w-full opacity-60 grayscale hover:grayscale-0 transition-all duration-1000">
                 <HeroScroll />
              </div>
            </motion.div>
          </div>
          <div className="absolute bottom-12 left-8 flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] opacity-30">
             <span className="w-8 h-[1px] bg-white" /> Scroll to explore
          </div>
        </section>

        {/* SECTION 2: CUSTOMIZE STACK */}
        <section className="stack-section bg-neutral-900 border-b border-white/5">
           <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/60 pointer-events-none" />
           <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-end px-8 z-10">
              <div className="pb-32">
                 <Reveal delay={0.1}>
                    <h2 className="text-7xl md:text-9xl font-light text-white italic leading-[0.8] tracking-tighter mb-10">
                      Infinite <br /> Canvas.
                    </h2>
                 </Reveal>
                 <Reveal delay={0.2}>
                    <p className="text-lg font-light text-white/40 max-w-sm mb-12 leading-relaxed uppercase tracking-[0.2em]">
                       Every link. Every thought. <br /> Perfectly curated into your own aesthetic space.
                    </p>
                 </Reveal>
                 <motion.button 
                   whileHover={{ x: 20 }}
                   className="text-white border-b border-white pb-2 font-light text-xs uppercase tracking-[0.5em]"
                 >
                    Explore Customization
                 </motion.button>
              </div>
              
              <div className="h-full flex items-center justify-end pb-20">
                 <div className="img-reveal-card lux-glass aspect-[4/5] w-full max-w-sm scale-90 rotate-2">
                    {/* Placeholder or mock image with spring vibe */}
                    <div className="h-full w-full bg-neutral-800 animate-pulse overflow-hidden p-10 flex flex-col justify-between">
                       <span className="text-[10px] uppercase tracking-widest text-white/20">Monkey Bio x Springs</span>
                       <div className="h-20 w-1 bg-white" />
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 3: SHARE STACK */}
        <section className="stack-section bg-neutral-800">
           <div className="max-w-4xl mx-auto text-center px-8">
              <Reveal delay={0.1}>
                 <h2 className="text-[100px] lg:text-[150px] font-light italic leading-none text-white tracking-tighter mb-16">
                    Presence.
                 </h2>
              </Reveal>
              <Reveal delay={0.2}>
                 <p className="text-lg font-light text-white/30 uppercase tracking-[0.5em] mb-20">
                    Connect Your Entire Digital Footprint.
                 </p>
              </Reveal>
              <div className="flex justify-center gap-12 opacity-20">
                 {['IG', 'TK', 'YT', 'TW'].map(s => <span key={s} className="font-light text-2xl tracking-[0.2em]">{s}</span>)}
              </div>
           </div>
        </section>



        {/* SECTION 4: ANALYZE STACK */}
        <section className="stack-section bg-neutral-900 border-b border-white/5">
           <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center px-8">
              <div className="lg:w-full flex justify-center">
                 <div className="w-full max-w-sm aspect-square border border-white/10 rounded-full flex items-center justify-center relative p-20">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-t border-linktree-lime/30 rounded-full" 
                    />
                    <div className="text-center">
                       <p className="text-6xl font-light italic text-white mb-2 tracking-tighter text-serif">98%</p>
                       <p className="text-[10px] font-light uppercase tracking-[0.4em] text-white/30">Retention</p>
                    </div>
                 </div>
              </div>
              
              <div>
                 <Reveal delay={0.1}>
                    <h2 className="text-7xl md:text-9xl font-light text-white italic leading-[0.8] tracking-tighter mb-10 text-serif font-serif">
                       Clear <br /> Vision.
                    </h2>
                 </Reveal>
                 <p className="text-lg font-light text-white/40 mb-12 uppercase tracking-[0.2em] leading-relaxed">
                    Insightful analytics that reveal <br /> the truth behind your growth.
                 </p>
                 <motion.button whileHover={{ x: 10 }} className="text-white border-b border-white pb-2 font-light text-xs uppercase tracking-[0.5em]">
                    View Insights
                 </motion.button>
              </div>
           </div>
        </section>

        {/* SECTION 5: FINAL CTA STACK */}
        <section className="stack-section bg-neutral-950">
           <div className="max-w-7xl mx-auto text-center px-8 flex flex-col items-center">
              <Reveal delay={0.1}>
                 <h2 className="text-[120px] lg:text-[240px] font-light italic text-white leading-none tracking-tighter mb-20 opacity-20 text-serif font-serif">
                    Join.
                 </h2>
              </Reveal>
              <div className="flex flex-col md:flex-row gap-12 -mt-40 z-10 relative">
                 <Link href="/signup" className="text-white text-xl font-light italic border border-white/20 px-20 py-10 rounded-full hover:bg-white hover:text-black transition-all uppercase tracking-widest text-serif font-serif">
                    Create Space
                 </Link>
                 <Link href="/login" className="text-white/40 text-xl font-light italic px-20 py-10 rounded-full hover:text-white transition-all uppercase tracking-widest text-serif font-serif">
                    Sign In
                 </Link>
              </div>
           </div>
        </section>

        {/* LUXURY FOOTER */}
        <footer className="relative bg-neutral-950 pt-40 pb-20 px-8 z-30">
           <div className="max-w-7xl mx-auto flex flex-col gap-40">
              <div className="flex flex-col md:flex-row justify-between items-start gap-20">
                 <div className="flex flex-col gap-10">
                    <h3 className="text-8xl font-light italic text-white tracking-tighter text-serif font-serif">Monkey <br /> Bio.</h3>
                    <p className="text-xs font-light text-white/20 uppercase tracking-[0.5em]">The intersection of art <br /> and digital presence.</p>
                 </div>
                 
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-20">
                    {[
                      { t: 'Index', links: ['Home', 'Features', 'Pricing'] },
                      { t: 'Social', links: ['Instagram', 'Twitter', 'TikTok'] },
                      { t: 'About', links: ['Press', 'Careers', 'Legal'] }
                    ].map((col, i) => (
                      <div key={i} className="flex flex-col gap-8">
                         <h4 className="text-[10px] font-light uppercase tracking-[0.4em] text-white/30">{col.t}</h4>
                         <ul className="flex flex-col gap-4">
                            {col.links.map(l => (
                              <li key={l}><Link href="#" className="text-xs font-light text-white/60 hover:text-white transition-colors uppercase tracking-[0.2em]">{l}</Link></li>
                            ))}
                         </ul>
                      </div>
                    ))}
                 </div>
              </div>
              
              <div className="flex justify-between items-center pt-10 border-t border-white/5 opacity-20 text-[8px] uppercase tracking-[0.5em]">
                 <p>© 2026 MONKEY BIO CORPORATE</p>
                 <p>BUILT ON EXCELLENCE</p>
              </div>
           </div>
        </footer>
      </main>
    </div>
  )
}
