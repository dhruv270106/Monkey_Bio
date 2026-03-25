'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Lenis from 'lenis'
import { Heart, Globe, Leaf, Users, ArrowRight, Check } from 'lucide-react'

// --- ANIMATION VARIANTS ---
const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
}

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  },
  viewport: { once: true }
}

export default function SocialGoodPage() {
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
    <div className="min-h-screen bg-white selection:bg-linktree-lime selection:text-black font-sans antialiased text-slate-900 overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-36 md:pt-56 pb-20 md:pb-32 px-6 bg-[#D9C4F2] overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/30 backdrop-blur-md border border-white/40 text-[#1e1b4b] text-[10px] font-black tracking-widest uppercase">
              <Heart size={12} fill="currentColor" /> Our Mission
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter leading-[1.1] text-[#1e1b4b] uppercase">
              Monkey's Social <br/> <span className="italic block text-white drop-shadow-xl">Responsibility</span>
            </h1>
            <p className="text-lg md:text-2xl text-[#1e1b4b]/80 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium pb-4">
              We are committed to creating a positive impact on the communities and environment we live in through a variety of social good initiatives.
            </p>
            <div className="flex gap-4 justify-center lg:justify-start">
               <button className="px-10 py-5 bg-[#1e1b4b] text-white rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl">
                 Join the cause
               </button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="w-full aspect-[4/5] md:h-[550px] rounded-[3rem] overflow-hidden shadow-2xl rotate-3 border-8 border-white/50 relative group">
               <img 
                 src="/images/social_good_hero_new.png" 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                 alt="Social Impact"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating Glass Badge */}
            <div className="absolute -bottom-10 -left-6 md:-left-10 p-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl z-20 border border-white/40 flex items-center gap-4 animate-bounce">
              <div className="w-12 h-12 rounded-full bg-linktree-lime flex items-center justify-center">
                <Globe className="text-black" size={24} />
              </div>
              <div>
                <p className="font-black text-[#1e1b4b] uppercase text-xs">Global Impact</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Saving the ecosystems</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/10 rounded-full blur-[120px] -mr-80 -mt-80" />
      </section>

      {/* --- TOOLS FOR CHANGE SECTION --- */}
      <section className="bg-blue-600 py-24 md:py-32 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center">
          <motion.div 
            {...fadeIn}
            className="relative z-10"
          >
             <div className="w-full aspect-[4/5] rounded-[4rem] overflow-hidden relative shadow-[0_50px_100px_rgba(0,0,0,0.4)] border-4 border-white/10">
                <img 
                  src="/images/social_good_tools.png" 
                  className="w-full h-full object-cover" 
                  alt="App Mockups"
                />
             </div>
             {/* Floating Elements */}
             <div className="absolute top-10 -right-10 w-32 h-32 bg-yellow-400 rounded-full blur-3xl opacity-30 border-white/10 border-8" />
          </motion.div>

          <motion.div 
            {...fadeIn}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-[1.1]">
              We build tools <br/>to <span className="text-linktree-lime">empower</span> change
            </h2>
            <div className="h-1.5 w-24 bg-linktree-lime rounded-full" />
            <p className="text-base md:text-lg text-white/90 leading-relaxed font-medium">
              We build new features and tools with social impact in mind. We strive to empower our users to support the causes they care about. From banners to themes, we are constantly evolving our product to raise awareness and channel donations.
            </p>
            <ul className="space-y-4 pt-4">
               {['Donation Banners', 'Impact Custom Themes', 'Anti-Racism Resources', 'Nature-Friendly Designs'].map((t, i) => (
                 <li key={i} className="flex items-center gap-4 text-sm md:text-base font-bold uppercase tracking-wider">
                    <div className="w-8 h-8 rounded-full bg-linktree-lime/20 flex items-center justify-center text-linktree-lime">
                       <Check size={18} strokeWidth={4} />
                    </div>
                    {t}
                 </li>
               ))}
            </ul>
          </motion.div>
        </div>
        
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_20%,_#fff_0%,_transparent_50%)]" />
        </div>
      </section>

      {/* --- VOLUNTEERING SECTION --- */}
      <section className="bg-[#f6f6f6] py-24 md:py-32 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div 
            {...fadeIn}
            className="space-y-8 order-2 lg:order-1"
          >
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 uppercase leading-[1.1]">
              20 hours paid <br/><span className="text-blue-600">volunteering</span> leave
            </h2>
            <div className="h-1.5 w-20 bg-blue-600 rounded-full" />
            <p className="text-base md:text-lg text-slate-600 leading-relaxed font-medium">
              We support everyone on the team to support the cause they care about. We are proud to offer everyone 20 hours paid volunteering leave to help out, give back and make a difference with their chosen charity or community organization.
            </p>
            <div className="flex items-center gap-6 p-6 bg-white rounded-3xl shadow-xl border border-gray-100">
               <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-inner">
                  <Users size={28} />
               </div>
               <div>
                 <p className="text-xl md:text-2xl font-black text-slate-900 leading-none mb-1">12,000+ Hours</p>
                 <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">Total Community impact in 2024</p>
               </div>
            </div>
          </motion.div>

          <motion.div 
            {...fadeIn}
            className="relative order-1 lg:order-2"
          >
            <div className="relative bg-white p-4 md:p-6 rounded-[3rem] shadow-2xl transform -rotate-2 border border-white">
              <img 
                src="/images/social_good_volunteering_new.png" 
                className="rounded-[2rem] w-full h-full object-cover shadow-lg aspect-video md:aspect-[4/3]" 
                alt="Volunteering hands"
              />
            </div>
            {/* Accent Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-200 rounded-full -z-10 blur-2xl opacity-40" />
          </motion.div>
        </div>
      </section>

      {/* --- ENVIRONMENT SECTION --- */}
      <section className="bg-[#4C1D95] py-24 md:py-32 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center">
           <motion.div {...fadeIn}>
              <div className="relative group">
                 <div className="absolute inset-0 bg-linktree-lime/20 rounded-[3rem] blur-3xl group-hover:scale-110 transition-transform duration-700" />
                 <img 
                   src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000" 
                   className="rounded-[3rem] w-full h-auto shadow-2xl relative z-10" 
                   alt="Nature and environment"
                 />
              </div>
           </motion.div>
           
           <motion.div {...fadeIn} className="space-y-8">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-linktree-lime">
                 <Leaf size={28} />
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-[1.1]">
                Carbon <span className="text-linktree-lime">Neutral</span> <br /> & Mindful Impact
              </h2>
              <div className="h-1.5 w-20 bg-linktree-lime rounded-full" />
              <p className="text-base md:text-lg text-white/80 leading-relaxed font-medium">
                Monkey has teamed up with Trace to measure our carbon footprint across our business. We are offsetting our CO2 emissions via our portfolio of climate credit projects.
              </p>
              <button className="flex items-center gap-4 text-linktree-lime font-black uppercase tracking-[0.2em] text-[10px] hover:gap-6 transition-all pt-4">
                View Impact Report <ArrowRight size={18} />
              </button>
           </motion.div>
        </div>
      </section>

      {/* --- LOCAL COMMUNITY SECTION --- */}
      <section className="bg-white py-24 md:py-32 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
           <motion.div {...fadeIn} className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 uppercase leading-[1.1]">
                Giving back to <br/>local <span className="text-purple-600">headquarters</span>
              </h2>
              <div className="h-1.5 w-20 bg-purple-600 rounded-full" />
              <p className="text-base md:text-lg text-slate-600 leading-relaxed font-medium">
                As part of our social good initiative, we provide a dedicated pod of desks on level 7 of our headquarters at no cost to not-for-profits that are making a positive impact in the world.
              </p>
           </motion.div>
           
           <motion.div 
             variants={staggerContainer}
             initial="initial"
             whileInView="whileInView"
             viewport={{ once: true }}
             className="relative flex justify-center"
           >
             <div className="grid grid-cols-2 gap-6 relative">
                 {[
                   '/images/community_hub_v2_1.png',
                   '/images/community_hub_v2_2.png',
                   '/images/community_hub_v2_3.png',
                   '/images/community_hub_v2_4.png'
                 ].map((src, i) => (
                   <motion.div 
                     key={i}
                     variants={fadeIn}
                     className={`w-full aspect-square rounded-3xl overflow-hidden shadow-2xl ${i % 2 === 0 ? '-mt-8' : 'mt-8'}`}
                   >
                      <img src={src} className="w-full h-full object-cover" alt="Community Hub" />
                   </motion.div>
                 ))}
              </div>
           </motion.div>
        </div>
      </section>

      {/* --- TRUSTED SECTION (SOCIAL PROOF) --- */}
      <section className="bg-[#f0f1f1]/50 py-24 md:py-32 text-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <motion.h2 
            {...fadeIn}
            className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 mb-16 uppercase"
          >
            Trusted by <span className="text-blue-600">70M+</span> change-makers
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              'photo-1539571696357-5a69c17a67c6',
              'photo-1507003211169-0a1dd7228f2d',
              'photo-1494790108377-be9c29b29330',
              'photo-1500648767791-00dcc994a43e'
            ].map((id, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-[2rem] overflow-hidden shadow-xl aspect-[3/4] ${i % 2 === 1 ? 'mt-8 md:mt-12' : ''}`}
              >
                <img src={`https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=800`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Creator" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- READY TO GROW SECTION --- */}
      <section className="py-24 md:py-40 bg-white text-center flex flex-col items-center">
         <motion.div {...fadeIn} className="max-w-4xl mx-auto px-8 space-y-8">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-slate-900 uppercase leading-none">
              Ready to grow <br/><span className="text-[#12B812] italic">your cause?</span>
            </h2>
            <p className="text-lg md:text-2xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
              We are waiving fees for Monkey Pro. So far we have helped over 12,000 charities get free premium accounts to scale their impact.
            </p>
            <div className="pt-6">
              <button className="px-12 py-6 md:px-16 md:py-8 bg-linktree-lime hover:bg-[#bef264] text-black rounded-full text-xl md:text-2xl font-black transition-all transform hover:scale-105 shadow-[0_20px_60px_rgba(210,232,35,0.4)] uppercase tracking-tight">
                 Apply Now
              </button>
            </div>
         </motion.div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="bg-[#1e1b4b] py-24 md:py-32 text-center text-white relative overflow-hidden">
        <motion.div {...fadeIn} className="max-w-4xl mx-auto px-8 relative z-10 space-y-10">
           <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[1.1]">
             Jumpstart your corner of the internet today
           </h2>
           <form className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
             <div className="relative w-full overflow-hidden group border-2 border-white/20 rounded-2xl focus-within:border-linktree-lime transition-colors bg-white shadow-2xl">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-black text-sm tracking-tight">monkey.bio/</span>
                <input className="w-full pl-32 pr-6 py-5 md:py-6 text-slate-900 focus:outline-none font-bold text-lg" placeholder="yourname" type="text"/>
             </div>
             <button className="w-full md:w-auto px-10 py-5 md:py-6 bg-linktree-lime text-black rounded-2xl font-black text-lg hover:bg-[#bef264] transition-all shrink-0 uppercase tracking-tight shadow-xl" type="submit">
               Claim yours
             </button>
           </form>
           <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">No credit card required • Join 50M+ users</p>
        </motion.div>
        
        {/* Visual Decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      </section>

    </div>
  )
}
