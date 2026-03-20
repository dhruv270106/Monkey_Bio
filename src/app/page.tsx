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
    <div className="relative bg-white selection-lime overflow-x-hidden font-sans">
      <div className="noise-overlay" />
      <Navbar />

      <main ref={containerRef} className="relative flex flex-col">
        
        {/* SECTION 1: VIBRANT STACKING HERO */}
        <section id="hero" className="stack-section bg-gradient-to-br from-[#D2E823] via-[#E9F861] to-[#D2E823] text-linktree-text">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 h-full items-center gap-10 px-8">
            <motion.div 
              style={{ opacity: useTransform(useScroll().scrollY, [0, 500], [1, 0]) }}
              className="flex flex-col gap-10 z-20"
            >
              <Reveal delay={0.1}>
                <h1 className="text-7xl md:text-9xl lg:text-[140px] font-black leading-[0.8] tracking-[-0.06em] text-linktree-text uppercase">
                  Everything <br /> You Are. <br /> One Link.
                </h1>
              </Reveal>
              
              <Reveal delay={0.3}>
                <p className="text-2xl md:text-3xl font-black max-w-2xl text-linktree-text leading-tight opacity-90">
                  The only link in bio you'll ever need. Join 40M+ people using <span className="underline decoration-wavy decoration-linktree-purple decoration-4">Monkey Bio</span> to grow their audience.
                </p>
              </Reveal>

              <div className="flex flex-col gap-6 max-w-lg mt-6">
                {!isClaimed ? (
                  <div className="flex bg-white rounded-3xl p-3 gap-3 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] ring-black/5 focus-within:ring-8 transition-all">
                    <span className="flex items-center pl-6 font-black text-xl text-gray-300">monkey.bio/</span>
                    <input 
                      type="text" 
                      placeholder="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-transparent border-none focus:outline-none focus:ring-0 font-black text-2xl text-linktree-text flex-1 py-4"
                    />
                    <motion.button 
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => username && setIsClaimed(true)}
                      className="bg-linktree-purple text-white font-black text-xl px-12 py-5 rounded-3xl shadow-xl transition-all"
                    >
                      CLAIM IT
                    </motion.button>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }} 
                    className="flex justify-between items-center bg-white p-6 rounded-[30px] shadow-2xl border-4 border-white"
                  >
                    <p className="font-black text-2xl text-linktree-text">monkey.bio/{username}</p>
                    <Link href={`/signup?username=${username}`} className="bg-linktree-purple text-white font-black text-lg px-8 py-4 rounded-2xl">Finish! 🔥</Link>
                  </motion.div>
                )}
              </div>
            </motion.div>

            <motion.div 
              style={{ y: useTransform(useScroll().scrollY, [0, 800], [0, -100]) }}
              className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block overflow-hidden pointer-events-none"
            >
               <HeroScroll />
            </motion.div>
          </div>
          <div className="absolute bottom-12 left-8 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] opacity-30 text-linktree-text">
             <div className="w-10 h-[2px] bg-black" /> Scroll to explore
          </div>
        </section>

        {/* SECTION 2: CUSTOMIZE STACK - RADIANT BLUE */}
        <section id="features" className="stack-section bg-gradient-to-br from-[#2665D6] via-[#4F8BF8] to-[#1E4FAF] text-white">
           <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center px-8 z-10">
              <div className="order-2 lg:order-1">
                 <Reveal delay={0.1}>
                    <h2 className="text-7xl md:text-9xl font-black leading-[0.85] uppercase tracking-tighter mb-10">
                      Personalize <br /> Everything.
                    </h2>
                 </Reveal>
                 <Reveal delay={0.2}>
                    <p className="text-2xl font-black text-white/70 mb-12 max-w-md">
                       Your Brand. Your Style. <br /> Our Beautiful Infrastructure.
                    </p>
                 </Reveal>
                 <motion.div whileHover={{ scale: 1.1, x: 20 }} className="inline-block">
                    <Link href="/signup" className="bg-[#D2E823] text-linktree-text font-black text-2xl px-16 py-8 rounded-3xl shadow-2xl">
                       START FREE <span>→</span>
                    </Link>
                 </motion.div>
              </div>
              
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end h-full items-center">
                 <motion.div 
                   whileInView={{ rotate: 10, scale: 1.1 }}
                   className="relative w-full max-w-sm aspect-[4/5] bg-white rounded-[60px] p-2 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-[16px] border-white"
                 >
                    <div className="h-full w-full bg-white rounded-[40px] flex flex-col p-8 overflow-hidden">
                       <div className="w-16 h-16 rounded-full bg-gray-100 mb-8" />
                       <div className="space-y-4">
                          {[1,2,3].map(i => <div key={i} className="h-16 w-full rounded-2xl bg-black/5" />)}
                       </div>
                    </div>
                 </motion.div>
              </div>
           </div>
        </section>

        {/* SECTION 3: SHARE STACK - MAROON FIRE */}
        <section id="share" className="stack-section bg-gradient-to-br from-[#780011] via-[#B50019] to-[#54000C] text-white">
           <div className="max-w-4xl mx-auto text-center px-8">
              <Reveal delay={0.1}>
                 <h2 className="text-7xl md:text-[140px] font-black leading-none uppercase tracking-tighter mb-12">
                    Share <br /> Everywhere.
                 </h2>
              </Reveal>
              <Reveal delay={0.2}>
                 <p className="text-2xl font-black text-[#FFDDDD] mb-12 max-w-2xl mx-auto">
                    One link for your Instagram, TikTok, Twitter, YouTube and everything else.
                 </p>
              </Reveal>
              <button className="mt-16">
                 <Link href="/signup" className="bg-white text-linktree-maroon font-black text-3xl px-20 py-10 rounded-full shadow-2xl inline-flex items-center gap-4">
                    GET YOURS 🔥
                 </Link>
              </button>
           </div>
        </section>

        {/* SECTION 4: ANALYZE STACK - CHARCOAL STEEL */}
        <section id="analyze" className="stack-section bg-gradient-to-br from-[#1E1E1E] via-[#2D2D2D] to-[#0D0D0D] text-white">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center px-8">
             <div className="flex justify-center">
                <motion.div 
                  whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
                  className="bg-white p-12 rounded-[50px] shadow-2xl w-full max-w-md"
                >
                   <div className="flex justify-between items-center mb-10 text-black">
                      <span className="font-black text-2xl">Insights</span>
                      <span className="text-green-500 font-black">+42% ↑</span>
                   </div>
                   <div className="space-y-4">
                      {[1,2,3].map(i => (
                        <div key={i} className="h-10 w-full bg-gray-100 rounded-2xl overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }} 
                             whileInView={{ width: `${30 + i * 20}%` }} 
                             className="h-full bg-linktree-purple" 
                           />
                        </div>
                      ))}
                   </div>
                </motion.div>
             </div>
             
             <div>
                <Reveal delay={0.1}>
                  <h2 className="text-6xl md:text-8xl font-black uppercase leading-[0.9] mb-8">
                    Smart <br /> Data.
                  </h2>
                </Reveal>
                <p className="text-2xl font-black text-white/60 mb-12">
                  Track your growth in real-time. <br /> See who's clicking and why.
                </p>
                <Link href="/signup" className="bg-linktree-lime text-linktree-text font-black text-2xl px-12 py-6 rounded-2xl shadow-xl inline-block hover:bg-white transition-all">
                  GO PRO ↗
                </Link>
             </div>
          </div>
        </section>

        {/* SECTION 5: FINAL CTA STACK - CYBER LIME */}
        <section className="stack-section bg-gradient-to-br from-[#D2E823] via-[#E9F861] to-[#D2E823] text-linktree-text">
           <div className="max-w-7xl mx-auto text-center px-8">
              <Reveal delay={0.1}>
                 <h2 className="text-7xl md:text-[180px] font-black leading-[0.75] uppercase tracking-tighter mb-20 italic">
                    Finish <br /> Strong.
                  </h2>
              </Reveal>
              <div className="flex flex-col md:flex-row justify-center gap-8">
                 <Link href="/signup" className="bg-linktree-purple text-white font-black text-4xl px-24 py-12 rounded-[40px] hover:rotate-3 transition-transform shadow-2xl">
                    SIGN UP
                 </Link>
                 <Link href="/login" className="bg-white text-linktree-text font-black text-4xl px-24 py-12 rounded-[40px] hover:-rotate-3 transition-transform shadow-2xl">
                    LOG IN
                 </Link>
              </div>
           </div>
        </section>

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
