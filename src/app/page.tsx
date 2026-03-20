'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import HeroScroll from '@/components/HeroScroll'
import { supabase } from '@/lib/supabase'
import { useDomain } from '@/hooks/useDomain'

export default function Home() {
  const domain = useDomain()
  const [user, setUser] = useState<any>(null)
  const [username, setUsername] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null)
    })
  }, [])

  return (
    <div className="bg-white text-linktree-text min-h-screen flex flex-col selection:bg-linktree-lime/30 font-sans">
      
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-24 lg:pt-52 lg:pb-52 px-4 bg-linktree-lime overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-[60%] text-center lg:text-left z-20"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.95] text-linktree-text">
                The only link in bio you'll ever need.
              </h1>
              <p className="text-xl md:text-2xl text-linktree-text font-semibold mb-12 max-w-xl mx-auto lg:mx-0 leading-tight">
                Join 50M+ people using Monkey Bio for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto lg:mx-0 mb-6 group">
                {user ? (
                  <Link href="/dashboard" className="bg-linktree-text text-linktree-lime font-bold text-xl px-12 py-7 rounded-full hover:scale-105 transition-transform shadow-xl flex-1 flex items-center justify-center">
                    Go to your Dashboard
                  </Link>
                ) : (
                  <>
                    <div className="flex-1 relative bg-white rounded-2xl shadow-sm overflow-hidden flex items-center px-4 md:px-6 py-5 md:py-6 border-2 border-transparent focus-within:border-linktree-text transition-all">
                      <span className="text-linktree-text/60 font-bold text-lg md:text-xl">monkey.id/</span>
                      <input 
                        type="text" 
                        placeholder="yourname" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-transparent outline-none font-bold text-lg md:text-xl text-linktree-text" 
                      />
                    </div>
                    <Link href={`/signup?username=${username}`} className="bg-linktree-purple text-white font-bold text-xl px-12 py-6 rounded-full hover:scale-105 transition-transform shadow-xl flex-shrink-0 flex items-center justify-center">
                      Claim your Monkey Bio
                    </Link>
                  </>
                )}
              </div>
              
              <div className="flex items-center justify-center lg:justify-start gap-3 mt-8 text-sm text-linktree-text/70 font-bold">
                 <p>🔥 Join 50 million+ active creators</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="lg:w-[45%] relative hidden lg:flex justify-end p-0"
            >
              <HeroScroll />
            </motion.div>
          </div>
          
          {/* MOBILE SCROLL (ONLY ON SM) */}
          <div className="lg:hidden mt-20 opacity-40 relative h-[500px] flex justify-center">
             <div className="scale-[0.6] origin-top">
                <HeroScroll />
             </div>
          </div>
        </section>


        {/* LOGOS / SOCIAL PROOF */}
        <section className="py-12 bg-white border-y border-gray-50 flex items-center justify-center">
           <div className="max-w-7xl mx-auto px-4 overflow-hidden text-linktree-text">
             <div className="flex flex-wrap justify-center items-center gap-10 lg:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
               <span className="font-black text-2xl tracking-tighter italic">Forbes</span>
               <span className="font-black text-2xl tracking-tighter">RollingStone</span>
               <span className="font-black text-2xl tracking-tighter">TechCrunch</span>
               <span className="font-black text-3xl tracking-tighter italic font-serif">WIRED</span>
               <span className="font-serif font-extrabold text-2xl tracking-tighter text-3xl">The Guardian</span>
             </div>
           </div>
        </section>

        {/* FEATURE 1: CUSTOMIZE */}
        <section className="py-24 lg:py-32 bg-linktree-blue text-white overflow-hidden px-4">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="lg:w-1/2 flex justify-center">
               <div className="relative w-full max-w-md aspect-[3/4] bg-white rounded-3xl overflow-hidden shadow-2xl transform lg:-rotate-6">
                  {/* Mock UI */}
                  <div className="p-8 h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-8">
                       <div className="w-12 h-12 rounded-full bg-gray-200" />
                       <div className="h-4 w-32 bg-gray-100 rounded-full" />
                    </div>
                    <div className="space-y-4 flex-1">
                       <div className="h-12 w-full bg-gray-50 rounded-xl" />
                       <div className="h-12 w-full bg-gray-50 rounded-xl" />
                       <div className="h-12 w-full bg-gray-50 rounded-xl" />
                    </div>
                  </div>
               </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">Create and customize your Monkey Bio in minutes</h2>
              <p className="text-xl md:text-2xl font-semibold mb-12 opacity-90">
                Connect your TikTok, Instagram, Twitter, website, store, videos, music, podcast, events and more. It all comes together in a link in bio landing page designed to convert.
              </p>
              <Link href="/signup" className="inline-block bg-linktree-lavender text-linktree-text font-bold text-xl px-12 py-6 rounded-full hover:bg-white transition-all shadow-lg">
                Get started for free
              </Link>
            </div>
          </div>
        </section>

        {/* FEATURE 2: SHARE */}
        <section className="py-24 lg:py-32 bg-linktree-maroon text-[#FFDDDD] px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight text-white">Share your Monkey Bio from your Instagram, TikTok, Twitter and other bios</h2>
            <p className="text-xl md:text-2xl font-semibold mb-12 opacity-90">
              Add your unique Linktree URL to all the platforms and places you find your audience. Then use your QR code to drive your offline audience online.
            </p>
            <Link href="/signup" className="inline-block bg-[#FFDDDD] text-linktree-maroon font-bold text-xl px-12 py-6 rounded-full hover:bg-white transition-all shadow-lg">
              Get started for free
            </Link>
          </div>
        </section>

        {/* FEATURE 3: ANALYZE */}
        <section className="py-24 lg:py-32 bg-linktree-grey text-linktree-text px-4">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
            <div className="lg:w-1/2 flex justify-center">
               <div className="bg-white p-8 rounded-3xl shadow-2xl w-full">
                  <div className="flex justify-between items-center mb-8">
                    <h4 className="font-bold text-xl">Analytics</h4>
                    <span className="text-sm font-bold text-gray-400">Last 28 days</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-gray-50 p-6 rounded-2xl">
                       <p className="text-sm text-gray-500 font-bold mb-2">Views</p>
                       <p className="text-3xl font-black">12.4k</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-2xl">
                       <p className="text-sm text-gray-500 font-bold mb-2">Clicks</p>
                       <p className="text-3xl font-black">4.8k</p>
                    </div>
                  </div>
                  <div className="h-40 w-full bg-linktree-lime/20 rounded-2xl relative overflow-hidden">
                     <div className="absolute bottom-0 left-0 w-full h-24 bg-linktree-lime/40" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 80% 40%, 60% 20%, 40% 60%, 20% 40%, 0 80%)' }} />
                  </div>
               </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">Analyze your audience and keep your followers engaged</h2>
              <p className="text-xl md:text-2xl font-semibold mb-12 opacity-80">
                Track your audience with our detailed insights. See which links are performing best, where your traffic is coming from and what's converting.
              </p>
              <Link href="/signup" className="inline-block bg-linktree-text text-white font-bold text-xl px-12 py-6 rounded-full hover:opacity-90 transition-all shadow-lg">
                Get started for free
              </Link>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-32 bg-linktree-purple text-white px-4">
           <div className="max-w-7xl mx-auto">
              <div className="text-center mb-24">
                 <h2 className="text-5xl md:text-7xl font-black mb-8">The only link you'll ever need.</h2>
                 <p className="text-xl md:text-2xl opacity-80 font-semibold max-w-2xl mx-auto">Used by creators, influencers and brands across the globe.</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                 {[
                   { name: 'Alex Rivera', role: 'Digital Artist', text: 'Monkey Bio has completely changed how I manage my online presence. It\'s simple, beautiful and it works.' },
                   { name: 'Sarah Chen', role: 'Fitness Coach', text: 'I love how easy it is to customize. I can match my brand colors perfectly and my clients find everything they need.' },
                   { name: 'Marcus Bell', role: 'Podcaster', text: 'The analytics are a game changer. I actually know which episodes my listeners are clicking on now.' }
                 ].map((t, i) => (
                   <div key={i} className="bg-white/10 backdrop-blur-md p-10 rounded-3xl border border-white/10">
                      <p className="text-xl font-medium mb-8">"{t.text}"</p>
                      <div>
                        <p className="font-bold text-lg">{t.name}</p>
                        <p className="text-sm opacity-60 font-bold">{t.role}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-32 bg-linktree-lime px-4 text-center">
           <div className="max-w-4xl mx-auto">
              <h2 className="text-5xl md:text-8xl font-black mb-12 text-linktree-text">The only link in bio you’ll ever need</h2>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <Link href="/signup" className="bg-linktree-purple text-white font-bold text-xl px-12 py-6 rounded-full hover:opacity-90 transition-all">
                    Sign up for free
                 </Link>
                 <Link href="/pricing" className="bg-linktree-text text-white font-bold text-xl px-12 py-6 rounded-full hover:opacity-90 transition-all">
                    Find out more
                 </Link>
              </div>
           </div>
        </section>
      </main>

      <footer className="bg-white text-linktree-text py-24 px-4 border-t border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-12">
          <div className="col-span-2 md:col-span-1">
             <Link href="/" className="flex items-center gap-2 mb-8">
              <span className="w-10 h-10 rounded-xl bg-linktree-text flex items-center justify-center text-linktree-lime font-black text-2xl">M</span>
              <span className="font-black text-2xl tracking-tight">Monkey.</span>
             </Link>
             <div className="flex gap-4">
                <i className="fi fi-brands-instagram text-2xl"></i>
                <i className="fi fi-brands-twitter text-2xl"></i>
                <i className="fi fi-brands-tiktok text-2xl"></i>
             </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-500">
              <li><Link href="#">About</Link></li>
              <li><Link href="#">Careers</Link></li>
              <li><Link href="#">Press</Link></li>
              <li><Link href="#">Social Good</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Community</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-500">
              <li><Link href="#">Creators</Link></li>
              <li><Link href="#">Charities</Link></li>
              <li><Link href="#">Monkey Bio for Teams</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-500">
              <li><Link href="#">Help Center</Link></li>
              <li><Link href="#">Contact</Link></li>
              <li><Link href="#">Trust Center</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Legal</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-500">
              <li><Link href="#">Privacy Policy</Link></li>
              <li><Link href="#">Terms of Service</Link></li>
              <li><Link href="#">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-gray-50 text-center text-sm font-bold text-gray-400">
          <p>© 2026 Monkey Bio. Built with love for creators.</p>
        </div>
      </footer>
    </div>
  )
}
