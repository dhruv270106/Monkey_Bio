'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import HeroScroll from '@/components/HeroScroll'
import { Reveal } from '@/components/Reveal'

export default function Home() {
  const [username, setUsername] = useState('')
  const [isClaimed, setIsClaimed] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="relative min-h-screen bg-white text-linktree-text selection-lime overflow-x-hidden font-sans">
      {/* AMBIENT BACKGROUND */}
      <div className="bg-liquid-mesh" />
      
      <Navbar />

      <main className="flex flex-col gap-16 pt-28 pb-0">
        
        {/* SECTION 1: HERO - THE VIRTUAL STAGE */}
        <section id="hero" className="relative min-h-[90vh] px-4 flex flex-col justify-center">
          <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-[60%] flex flex-col gap-8 z-20 text-center lg:text-left"
            >
              <Reveal delay={0.1}>
                <h1 className="text-6xl md:text-8xl lg:text-[100px] font-black leading-[0.85] tracking-[-0.05em] text-gradient-primary">
                  The only link <br /> in bio you'll <br /> ever need.
                </h1>
              </Reveal>
              
              <Reveal delay={0.3}>
                <p className="text-xl md:text-2xl font-bold max-w-2xl text-linktree-text/80 leading-relaxed">
                  Join 50M+ people using <span className="text-linktree-purple">Monkey Bio</span> to share everything you create, curate and sell. One link, infinite possibilities.
                </p>
              </Reveal>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-4"
              >
                {!isClaimed ? (
                  <>
                    <div className="flex bg-white/50 backdrop-blur-xl border border-white/50 rounded-2xl p-2 gap-2 shadow-2xl ring-linktree-purple/20 transition-all focus-within:ring-4">
                      <span className="flex items-center pl-4 font-bold text-gray-400">monkey.bio/</span>
                      <input 
                        type="text" 
                        placeholder="yourname"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-transparent border-none focus:outline-none focus:ring-0 font-bold text-linktree-text flex-1 py-4 px-2"
                      />
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(120, 0, 22, 0.15)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => username && setIsClaimed(true)}
                      className="bg-linktree-purple text-white font-black text-xl px-12 py-6 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3"
                    >
                      Claim your page <span>→</span>
                    </motion.button>
                  </>
                ) : (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-6 bg-white/80 p-6 rounded-3xl premium-glass"
                  >
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">✓</div>
                    <p className="font-black text-lg">monkey.bio/{username} is available!</p>
                    <Link href={`/signup?username=${username}`} className="bg-linktree-purple text-white font-black text-lg px-8 py-4 rounded-2xl hover:scale-105 transition-all shadow-lg">
                      Finish
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>

            {/* FULL HEIGHT DESKTOP SCROLL */}
            <div className="absolute right-0 top-0 bottom-0 w-2/5 hidden lg:block pointer-events-none">
              <HeroScroll />
            </div>
          </div>
          
          {/* SCROLL INDICATOR */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
          >
            <p className="text-[10px] tracking-[0.3em] font-black uppercase">Scroll</p>
            <div className="w-[1px] h-12 bg-black/20" />
          </motion.div>
        </section>



        {/* SECTION 2: CUSTOMIZE */}
        <section id="features" className="py-24 px-4 overflow-visible">
          <Reveal delay={0.2}>
            <div className="max-w-6xl mx-auto rounded-[60px] bg-linktree-blue/10 backdrop-blur-3xl p-12 lg:p-24 flex flex-col lg:flex-row items-center gap-20 premium-glass relative overflow-hidden">
               <div className="absolute -top-32 -left-32 w-64 h-64 bg-linktree-blue/20 blur-[100px] rounded-full" />
               <div className="lg:w-1/2 order-2 lg:order-1">
                  <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight text-linktree-text">Fully customize <br /> your vibe.</h2>
                  <p className="text-xl md:text-2xl font-bold text-linktree-text/70 mb-12">
                     Connect everything. Express yourself exactly as you are. All your socials, stores, and stories in one beautiful place.
                  </p>
                  <motion.div whileHover={{ scale: 1.02 }} className="inline-block">
                    <Link href="/signup" className="bg-linktree-purple text-white font-black text-xl px-12 py-6 rounded-2xl shadow-2xl flex items-center gap-3">
                      Start building <span>→</span>
                    </Link>
                  </motion.div>
               </div>
               <div className="lg:w-1/2 order-1 lg:order-2 flex justify-center z-10">
                  <motion.div 
                    whileInView={{ y: [0, -20, 0] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                    className="relative w-full max-w-sm aspect-[4/5] bg-white rounded-[50px] shadow-[0_50px_100px_-20px_rgba(38,101,214,0.3)] overflow-hidden scale-110 rotate-3 border-[12px] border-white"
                  >
                        {/* Mock UI Filled */}
                        <div className="p-8 h-full flex flex-col bg-white">
                          <div className="flex items-center gap-4 mb-8">
                            <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&h=400&fit=crop" className="w-14 h-14 rounded-full bg-gray-100 object-cover shadow-lg" alt="Profile" />
                            <div className="flex flex-col">
                                <p className="font-black text-sm text-linktree-text uppercase tracking-wider">@alex.creator</p>
                                <p className="text-[10px] font-black text-linktree-purple uppercase">Global Creator</p>
                            </div>
                          </div>
                          <div className="space-y-4 flex-1">
                            <motion.div whileHover={{ x: 10 }} className="h-14 w-full bg-linktree-lime rounded-2xl flex items-center justify-center font-black text-xs text-linktree-text shadow-md cursor-pointer">
                                Latest Brand Drop
                            </motion.div>
                            <motion.div whileHover={{ x: 10 }} className="h-14 w-full bg-linktree-purple rounded-2xl flex items-center justify-center font-black text-xs text-white shadow-md cursor-pointer">
                                My Newest Reel
                            </motion.div>
                            <motion.div whileHover={{ x: 10 }} className="h-14 w-full bg-linktree-blue rounded-2xl flex items-center justify-center font-black text-xs text-white shadow-md cursor-pointer">
                                Digital Portfolio
                            </motion.div>
                          </div>
                          <div className="mt-8 pt-8 border-t border-gray-50 flex flex-col items-center gap-2">
                             <span className="w-8 h-1 bg-gray-100 rounded-full" />
                             <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Monkey Bio</span>
                          </div>
                        </div>
                  </motion.div>
               </div>
            </div>
          </Reveal>
        </section>

        {/* SECTION 3: SHARE - DRAMATIC DARK GLASS */}
        <section id="share" className="py-24 px-4">
          <Reveal delay={0.2}>
            <div className="max-w-6xl mx-auto rounded-[60px] bg-linktree-maroon/90 backdrop-blur-3xl p-12 lg:p-24 text-center dark-premium-glass shadow-[0_50px_100px_-20px_rgba(120,0,22,0.4)] relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
               <div className="relative z-10 text-white max-w-4xl mx-auto flex flex-col items-center gap-10">
                  <h2 className="text-6xl md:text-8xl font-black leading-tight tracking-tighter">Share from <br /> everywhere.</h2>
                  <p className="text-xl md:text-2xl font-bold opacity-80 leading-relaxed text-[#FFDDDD]">
                    One link for your Instagram, TikTok, Twitter, YouTube and everything else. <br /> Drive your offline audience online with your personalized QR code.
                  </p>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/signup" className="bg-[#FFDDDD] text-linktree-maroon font-black text-2xl px-16 py-8 rounded-3xl shadow-2xl transition-all">
                      Get yours now
                    </Link>
                  </motion.div>
               </div>
            </div>
          </Reveal>
        </section>

        {/* SECTION 4: ANALYZE - MINIMALIST HIGH CONTRAST */}
        <section id="analyze" className="py-24 px-4">
          <Reveal delay={0.2}>
            <div className="max-w-6xl mx-auto rounded-[60px] bg-white/40 backdrop-blur-3xl p-12 lg:p-24 flex flex-col lg:flex-row-reverse items-center gap-20 premium-glass">
                <div className="lg:w-1/2">
                   <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight text-linktree-text">Insights that <br /> inspire.</h2>
                   <p className="text-xl md:text-2xl font-bold text-linktree-text/70 mb-12 leading-relaxed">
                      Track your growth in real-time. See who's clicking, where they're from, and what's moving the needle for your brand.
                   </p>
                   <Link href="/signup" className="inline-block bg-linktree-text text-white font-black text-xl px-12 py-6 rounded-2xl shadow-2xl hover:bg-black transition-all">
                      Go pro <span className="ml-2">↗</span>
                   </Link>
                </div>
                <div className="lg:w-1/2 w-full">
                   <motion.div 
                    whileHover={{ scale: 1.02, rotate: -1 }}
                    className="bg-white p-10 rounded-[40px] shadow-2xl border border-gray-100"
                   >
                        <div className="flex justify-between items-center mb-12">
                          <h4 className="font-black text-2xl tracking-tight text-linktree-text">Analytics</h4>
                          <span className="px-4 py-2 bg-gray-50 rounded-full text-xs font-black text-gray-400">LAST 30 DAYS</span>
                        </div>
                        <div className="grid grid-cols-2 gap-6 mb-12">
                          <div className="bg-gray-50/50 p-8 rounded-3xl border border-gray-100/50">
                             <p className="text-xs text-gray-400 font-black mb-4 uppercase tracking-widest">Views</p>
                             <p className="text-4xl font-black text-linktree-text">4.8M <span className="text-xs text-green-500 ml-1">↑12%</span></p>
                          </div>
                          <div className="bg-gray-50/50 p-8 rounded-3xl border border-gray-100/50">
                             <p className="text-xs text-gray-400 font-black mb-4 uppercase tracking-widest">Clicks</p>
                             <p className="text-4xl font-black text-linktree-text">2.1M <span className="text-xs text-green-500 ml-1">↑8%</span></p>
                          </div>
                        </div>
                        <div className="space-y-6">
                           {[ {color: 'bg-linktree-lime', w: '85%'}, {color: 'bg-linktree-purple', w: '65%'}, {color: 'bg-linktree-blue', w: '45%'}].map((item, i) => (
                             <div key={i} className="flex items-center gap-6">
                                <div className={`w-12 h-12 rounded-2xl ${item.color} shadow-lg`} />
                                <div className="flex-1 h-3 bg-gray-50 rounded-full overflow-hidden">
                                   <motion.div 
                                      initial={{ width: 0 }}
                                      whileInView={{ width: item.w }}
                                      transition={{ duration: 1.5, delay: 0.5 + (i * 0.2) }}
                                      className="h-full bg-linktree-text rounded-full" 
                                    />
                                </div>
                             </div>
                           ))}
                        </div>
                   </motion.div>
                </div>
            </div>
          </Reveal>
        </section>

        {/* SECTION 5: TESTIMONIALS - THE BIG QUOTE */}
        <section id="testimonials" className="py-32 px-4 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[50vh] bg-linktree-purple/10 blur-[150px] pointer-events-none" />
          <Reveal delay={0.1}>
             <div className="max-w-7xl mx-auto rounded-[60px] bg-linktree-purple text-white p-16 lg:p-32 relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(80,34,116,0.5)]">
                <span className="absolute top-10 left-10 text-[200px] leading-none opacity-10 font-black serif">“</span>
                <div className="relative z-10 text-center flex flex-col items-center gap-12">
                   <h2 className="text-4xl md:text-7xl lg:text-[90px] font-black leading-[1.05] tracking-tight max-w-5xl">
                      "Monkey Bio is how I connect my community across every platform."
                   </h2>
                   <div className="flex flex-col items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-white/20 p-1">
                         <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop" className="w-full h-full rounded-full object-cover" alt="User" />
                      </div>
                      <div className="text-center">
                         <p className="text-xl font-black">James Miller</p>
                         <p className="text-sm font-bold opacity-60 uppercase tracking-widest text-center">Creator at Digital Future</p>
                      </div>
                   </div>
                </div>
             </div>
          </Reveal>
        </section>

        {/* FINAL CTA: THE BOLD LANDING */}
        <section className="py-24 px-4">
          <Reveal delay={0.2}>
             <motion.div 
              whileHover={{ rotate: 1 }}
              className="max-w-6xl mx-auto rounded-[70px] bg-linktree-lime p-12 lg:p-32 text-center shadow-[0_50px_100px_-20px_rgba(210,232,35,0.5)]"
             >
                <h2 className="text-7xl md:text-9xl font-black mb-16 leading-tight tracking-[-0.05em] text-linktree-text">
                  The only link you'll ever need.
                </h2>
                <div className="flex flex-col md:flex-row justify-center gap-6">
                   <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-linktree-text text-white font-black text-2xl px-16 py-8 rounded-3xl"
                   >
                      Get Started for Free
                   </motion.button>
                   <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/50 backdrop-blur-xl border border-white/20 text-linktree-text font-black text-2xl px-16 py-8 rounded-3xl"
                   >
                      Explore Premium
                   </motion.button>
                </div>
             </motion.div>
          </Reveal>
        </section>
      </main>

      {/* REFINED FOOTER - THE ANCHOR */}
      <footer className="bg-white text-linktree-text pt-40 pb-20 px-8 rounded-t-[80px] shadow-[0_-50px_100px_rgba(0,0,0,0.02)] relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-20">
          <div className="col-span-2">
             <Link href="/" className="flex items-center gap-3 mb-10 group">
              <span className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center text-linktree-lime font-black text-3xl transition-transform group-hover:rotate-12">M</span>
              <span className="font-black text-3xl tracking-tighter">Monkey Bio</span>
             </Link>
             <p className="text-xl font-bold text-gray-500 max-w-sm mb-12">
                Join 50 million+ active creators who choose the world's original and most stable link in bio.
             </p>
             <div className="flex gap-6 grayscale opacity-40 hover:opacity-100 transition-opacity">
                {['TW', 'IG', 'YT', 'TK'].map(s => <span key={s} className="font-black text-sm cursor-pointer hover:text-linktree-purple transition-colors uppercase tracking-widest">{s}</span>)}
             </div>
          </div>
          
          {[ 
            { t: 'Product', links: ['Features', 'Marketplace', 'Templates', 'Video'] },
            { t: 'Support', links: ['Help Center', 'Community', 'Status', 'Contact'] },
            { t: 'Company', links: ['About', 'Careers', 'Social Good', 'Contact'] }
          ].map((col, i) => (
            <div key={i} className="flex flex-col gap-8">
               <h4 className="font-black text-lg uppercase tracking-widest text-gray-400">{col.t}</h4>
               <ul className="flex flex-col gap-6">
                 {col.links.map(l => (
                   <li key={l}>
                      <Link href="#" className="font-bold text-lg text-gray-600 hover:text-linktree-purple transition-all underline-offset-4 hover:underline">{l}</Link>
                   </li>
                 ))}
               </ul>
            </div>
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto mt-40 pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex gap-10 text-sm font-black text-gray-400">
              <Link href="#" className="hover:text-black transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-black transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-black transition-colors">Cookie Policy</Link>
           </div>
           <p className="text-sm font-black text-gray-300 uppercase tracking-widest">© 2026 MONKEY BIO. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  )
}
