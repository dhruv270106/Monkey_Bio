'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="bg-gray-50 text-secondary min-h-screen flex flex-col selection:bg-primary/30">
      
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-secondary font-bold text-xl">M</span>
                <span className="font-bold text-xl tracking-tight text-secondary">Monkey</span>
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <div className="relative group">
                  <Link href="#" className="text-sm font-medium text-gray-600 hover:text-black transition-colors flex items-center gap-1 py-4">
                    Features <i className="fi fi-rr-angle-small-down pt-1"></i>
                  </Link>
                  <div className="absolute top-[80%] left-0 bg-white shadow-xl rounded-xl border border-gray-100 w-64 pt-2 pb-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left -translate-y-2 group-hover:translate-y-0">
                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-neutral-100 rounded-lg">Link Pages</Link>
                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-neutral-100 rounded-lg">Analytics</Link>
                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-neutral-100 rounded-lg">Appearance</Link>
                  </div>
                </div>
                <Link href="#" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Pricing</Link>
                <Link href="#" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Discover</Link>
                <Link href="#" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Blog</Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
               <Link href="/login" className="text-sm font-semibold text-gray-800 hover:text-black hidden sm:block bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-full transition-colors">Log in</Link>
               <Link href="/signup" className="text-sm font-semibold bg-secondary text-white hover:bg-gray-800 px-6 py-3 rounded-full transition-all shadow-md transform hover:scale-105">Sign up free</Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 mt-20">
        {/* HERO SECTION */}
        <section className="relative pt-24 pb-32 overflow-hidden px-4 sm:px-6 lg:px-8 bg-white">
           <div 
             className="absolute inset-0 z-0 opacity-60 transition-transform duration-100 ease-linear pointer-events-none"
             style={{ transform: `translate(-${mousePos.x * 30}px, -${mousePos.y * 30}px) scale(1.05)` }}
           >
              <div className="absolute rounded-full filter blur-[80px] opacity-60 animate-blob" style={{ width: '800px', height: '800px', background: 'linear-gradient(135deg, #43E660, #d9f99d)', top: '-20%', left: '-10%' }}></div>
              <div className="absolute rounded-full filter blur-[80px] opacity-20 animate-blob" style={{ width: '600px', height: '600px', background: '#60a5fa', bottom: '-10%', right: '-5%', animationDelay: '-5s' }}></div>
           </div>
           
           <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:w-[55%] text-center lg:text-left"
              >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-gray-100 shadow-sm mb-8 text-sm font-bold text-secondary">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(67,230,96,1)]"></span> Join 5M+ successful creators today.
                  </div>
                  <h1 className="text-[3.5rem] md:text-[5rem] lg:text-[5.5rem] font-black tracking-tight mb-8 leading-[1.05] text-secondary">
                    Everything you are.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-[#43E660] to-teal-400">In one link.</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-500 font-medium mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                    Join 50M+ creators who use Monkey to organize their links, monetize their audience, and build their brand. The only platform that grows with you.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto lg:mx-0 mb-8">
                     <div className="flex flex-1 relative bg-white rounded-[20px] shadow-sm border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
                       <span className="flex items-center pl-6 pr-2 text-gray-400 font-bold text-lg">monkey.link/</span>
                       <input type="text" placeholder="yourname" className="w-full py-5 pr-6 outline-none font-bold text-lg text-secondary" />
                     </div>
                     <Link href="/signup" className="bg-secondary text-white font-bold text-lg px-8 py-5 rounded-[20px] hover:bg-gray-800 transition-all shadow-lg flex-shrink-0 flex items-center justify-center transform hover:scale-[1.02]">
                        Claim it
                     </Link>
                  </div>
                  
                  <div className="flex items-center justify-center lg:justify-start gap-3 text-sm text-gray-400 font-bold">
                     <p>Free forever</p> <span className="bg-gray-300 w-1 h-1 rounded-full"></span> <p>No credit card required</p>
                  </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:w-[45%] relative flex justify-center lg:justify-end"
              >
                 <div className="absolute -left-12 top-20 bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-2xl border border-white z-20 flex items-center gap-4 animate-bounce-slow">
                    <div className="bg-green-100 p-3 rounded-2xl text-green-600"><i className="fi fi-rr-stats"></i></div>
                    <div><p className="text-[11px] text-gray-400 font-black uppercase tracking-widest">Revenue</p><p className="text-xl font-black text-secondary">$3,420</p></div>
                 </div>
                 <div className="relative w-[340px] h-[680px] bg-black rounded-[52px] border-[14px] border-[#020617] shadow-2xl overflow-hidden z-10 transform -rotate-2 hover:rotate-0 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(67,230,96,0.2)]">
                    <div className="w-full h-full bg-white flex flex-col items-center p-8 pt-12">
                        <div className="w-16 h-16 rounded-full bg-primary/20 mb-4" />
                        <div className="w-24 h-4 bg-gray-100 rounded-full mb-8" />
                        <div className="w-full space-y-3">
                          <div className="w-full h-12 bg-gray-50 rounded-xl" />
                          <div className="w-full h-12 bg-gray-50 rounded-xl" />
                          <div className="w-full h-12 bg-gray-50 rounded-xl" />
                        </div>
                    </div>
                 </div>
                 <div className="absolute -right-8 bottom-32 bg-white/90 backdrop-blur-md py-4 px-6 rounded-3xl shadow-2xl border border-white z-20 flex items-center gap-4 animate-bounce-slow" style={{ animationDelay: '2s' }}>
                    <div className="bg-blue-100 p-2.5 rounded-full text-blue-600"><i className="fi fi-rr-music-alt"></i></div>
                    <p className="text-sm font-bold text-secondary">Spotify Linked!</p>
                 </div>
              </motion.div>
           </div>
        </section>

        {/* FEATURES GRID */}
        <section className="py-32 bg-white">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-24">
                 <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-secondary">Everything you need.</h2>
                 <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto font-medium">Create your page, share your content, and monetize your audience — all in one place.</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {[
                     { icon: 'fi-rr-layout-fluid', title: 'Create your page', desc: 'Design a stunning mobile-first landing page for your audience in minutes, no coding required.' },
                     { icon: 'fi-rr-stats', title: 'Track everything', desc: 'Real-time analytics on clicks, views, and revenue right from your beautifully clean dashboard.' },
                     { icon: 'fi-rr-dollar', title: 'Earn money', desc: 'Sell digital products, collect tips, or set up a membership instantly directly on your page.' }
                   ].map((item, i) => (
                     <div key={i} className="bg-[#F5F7FA] p-10 rounded-[40px] border border-gray-100 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
                        <div className="w-16 h-16 bg-white text-secondary rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:bg-primary transition-all">
                           <i className={`fi ${item.icon} text-2xl`}></i>
                        </div>
                        <h3 className="text-3xl font-bold mb-4 tracking-tight text-secondary">{item.title}</h3>
                        <p className="text-lg text-gray-500 font-medium">{item.desc}</p>
                     </div>
                   ))}
              </div>
           </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-32 relative overflow-hidden bg-secondary text-white text-center rounded-[60px] max-w-[1400px] mx-auto mb-16 shadow-2xl">
            <div className="absolute inset-0 z-0">
                <div className="absolute rounded-full bg-primary/15 filter blur-[80px] animate-blob" style={{ width: '800px', height: '800px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', animationDuration: '20s' }}></div>
            </div>
            <div className="max-w-4xl mx-auto px-4 relative z-10">
               <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">Ready to grow?</h2>
               <p className="text-xl text-white/70 font-medium mb-12">Join millions of creators managing their digital presence.</p>
               <Link href="/signup" className="inline-flex items-center justify-center bg-primary text-secondary font-bold text-xl px-12 py-5 rounded-full hover:bg-primary-dark transition-all transform hover:scale-105 shadow-lg">
                  Start building today
               </Link>
            </div>
        </section>
      </main>

      <footer className="bg-gray-50 border-t border-gray-200 text-secondary pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
            <div className="col-span-2 lg:col-span-1">
               <Link href="/" className="flex items-center gap-2 mb-6">
                <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-secondary font-bold text-xl">M</span>
                <span className="font-bold text-xl tracking-tight">Monkey</span>
               </Link>
               <p className="text-gray-500 text-sm mb-6">Everything you are. In one simple link in bio. Join millions of creators today.</p>
               <div className="flex items-center gap-4">
                 <Link href="#" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-primary transition-colors text-gray-700 hover:text-secondary"><i className="fi fi-brands-twitter"></i></Link>
                 <Link href="#" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-primary transition-colors text-gray-700 hover:text-secondary"><i className="fi fi-brands-instagram"></i></Link>
                 <Link href="#" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-primary transition-colors text-gray-700 hover:text-secondary"><i className="fi fi-brands-youtube"></i></Link>
               </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-gray-500 font-medium">
                <li><Link href="#" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Discover</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-gray-500 font-medium">
                <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-3 text-sm text-gray-500 font-medium">
                <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-gray-500 font-medium">
                <li><Link href="#" className="hover:text-primary transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-500 font-medium">
            <p>&copy; 2026 Monkey Linktree. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
