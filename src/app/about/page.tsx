'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Lenis from 'lenis'
import { 
  Rocket, 
  Eye, 
  Sparkles, 
  Palette, 
  Heart, 
  Lightbulb, 
  ArrowRight,
  Star,
  Share2,
  Smartphone,
  Zap,
  ShieldCheck,
  TrendingUp,
  Target
} from 'lucide-react'

// --- ANIMATION VARIANTS ---

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
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

const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
}

// --- COMPONENTS ---

const HeroSection = () => (
  <section className="relative pt-36 md:pt-56 pb-20 md:pb-32 px-6 overflow-hidden bg-[#f6f6f6]">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="z-10 text-center lg:text-left"
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#d8ef2c] text-[#4d5700] text-xs font-bold tracking-widest uppercase mb-6">
          The Community Wall
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-[#2d2f2f] mb-6 md:mb-8 leading-[1.1] uppercase">
          EMPOWERING <br/> <span className="text-[#576100] italic">DIGITAL SOULS.</span>
        </h1>
        <p className="text-lg md:text-2xl text-[#5a5c5c] max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8 md:mb-10 font-medium">
          Joining 40M+ creators in building a unified home for their life's work. One link, total impact.
        </p>
        <div className="flex gap-4 justify-center lg:justify-start">
          <div className="flex -space-x-3">
             <img className="w-10 h-10 md:w-12 md:h-12 rounded-full border-4 border-white object-cover" src="https://i.pravatar.cc/150?u=1" alt="avatar" />
             <img className="w-10 h-10 md:w-12 md:h-12 rounded-full border-4 border-white object-cover" src="https://i.pravatar.cc/150?u=2" alt="avatar" />
             <img className="w-10 h-10 md:w-12 md:h-12 rounded-full border-4 border-white object-cover" src="https://i.pravatar.cc/150?u=3" alt="avatar" />
          </div>
          <div className="flex flex-col justify-center text-left">
            <span className="text-sm font-bold text-[#2d2f2f]">Join 40M+ creators</span>
            <span className="text-xs text-[#5a5c5c]">Global creative community</span>
          </div>
        </div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <div className="absolute inset-0 bg-[#576100]/5 rounded-xl -rotate-2 scale-105"></div>
        <img 
          className="relative rounded-xl shadow-2xl w-full h-[350px] md:h-[500px] object-cover" 
          src="/images/about_mosaic_hero.png" 
          alt="Mosaic Hub"
        />
        <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-left-8 bg-white p-4 md:p-6 rounded-lg shadow-xl max-w-[200px] md:max-w-xs border border-gray-100">
          <p className="text-[#576100] font-bold mb-1 md:mb-2 text-xs md:text-base">Since 2016</p>
          <p className="text-[10px] md:text-sm text-[#5a5c5c] font-medium italic">"We started with a simple link and a dream for the world."</p>
        </div>
      </motion.div>
    </div>
  </section>
)

const MissionVision = () => (
  <section className="py-20 md:py-24 bg-[#f0f1f1] px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        <motion.div 
          {...fadeIn}
          className="bg-white p-8 md:p-12 rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 group"
        >
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#d8ef2c] flex items-center justify-center mb-6 md:mb-8">
            <Rocket className="text-[#576100] w-6 h-6 md:w-8 md:h-8" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 tracking-tight text-[#2d2f2f] uppercase">Our Mission</h3>
          <p className="text-base md:text-lg text-[#5a5c5c] leading-relaxed font-medium">
             Providing a seamless and intelligent home for your entire digital existence. Complexity shouldn't be a barrier to sharing your passion.
          </p>
        </motion.div>
        <motion.div 
          {...fadeIn}
          transition={{ ...fadeIn.transition, delay: 0.2 }}
          className="bg-white p-8 md:p-12 rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 group"
        >
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#d3cbff] flex items-center justify-center mb-6 md:mb-8">
            <Eye className="text-[#572ff4] w-6 h-6 md:w-8 md:h-8" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 tracking-tight text-[#2d2f2f] uppercase">Our Vision</h3>
          <p className="text-base md:text-lg text-[#5a5c5c] leading-relaxed font-medium">
             To become the most reliable and beautiful bridge between creators and their world—where every creative journey flourishes.
          </p>
        </motion.div>
      </div>
    </div>
  </section>
)

const CoreValues = () => (
  <section className="py-20 md:py-32 px-6 bg-white">
    <div className="max-w-7xl mx-auto text-center mb-16 md:mb-20">
      <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-4 uppercase">The Values We Live By</h2>
      <div className="h-1.5 w-16 md:w-24 bg-[#576100] mx-auto rounded-full"></div>
    </div>
    <motion.div 
      variants={staggerContainer}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true }}
      className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
    >
      {[
        { icon: <Sparkles />, title: "Simplicity", desc: "Focusing on what truly matters, removing the noise from your digital identity." },
        { icon: <Palette />, title: "Creativity", desc: "Providing the blank canvas for you to paint your unique story online." },
        { icon: <Heart />, title: "Empathy", desc: "Building tools that prioritize the human experience behind the screen." },
        { icon: <Lightbulb />, title: "Innovation", desc: "Pushing the boundaries of what a single link can achieve for your career." }
      ].map((value, idx) => (
        <motion.div key={idx} variants={fadeIn} className="group text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#f0f1f1] mx-auto flex items-center justify-center mb-6 group-hover:bg-[#576100] transition-colors duration-500">
            <div className="text-[#2d2f2f] group-hover:text-white transition-colors duration-500">
                {React.cloneElement(value.icon as React.ReactElement, { size: 28 })}
            </div>
          </div>
          <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3 uppercase tracking-tighter">{value.title}</h4>
          <p className="text-[#5a5c5c] text-xs md:text-sm px-4 leading-relaxed font-medium">{value.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  </section>
)

const StatsSection = () => (
  <section className="py-20 md:py-24 bg-[#0c0f0f] text-[#f6f6f6] px-6 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-[#576100]/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 text-center">
        {[
          { label: "FOUNDED", val: "2016" },
          { label: "CREATORS", val: "40M+" },
          { label: "MONTHLY USERS", val: "100M+" }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            {...scaleIn}
            transition={{ delay: i * 0.1 }}
          >
            <div className="text-4xl md:text-6xl font-black text-[#d8ef2c] mb-2 tracking-tighter">{stat.val}</div>
            <div className="text-sm md:text-lg font-medium text-gray-400 uppercase tracking-widest">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const TeamSection = () => (
  <section className="py-20 md:py-32 px-6 bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-12 md:mb-16 gap-6">
        <div className="text-center lg:text-left">
          <span className="text-[#576100] font-bold tracking-widest uppercase text-xs md:text-sm">Our People</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mt-2 uppercase">Meet Our Team</h2>
        </div>
        <p className="text-[#5a5c5c] max-w-md mx-auto lg:mx-0 text-center lg:text-left text-base md:text-lg leading-snug font-medium">The diverse group of innovators and creators dedicated to building the future of the creator economy.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {[
          { name: "Dhruv Rana", role: "CEO & Founder", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGNoETjsHN7rZYPUKmzrB1tCmLvS8_p7lnqJwZmYwMkFxA0Hmvl1qsq1WAAdgWDjj7KO6WkJEf7dsFvKPP-5j8F-6LMZbHdzncftUwnGJ8hfJCj5XGDPHHnTjUC1lmGax3_t7TOYM7g1d8bhi1AfEeQfa_-H1ysvORoGSVPyNXB9C-6XzIevkFfm9NLRMKdvtr7kxFy0mFipnjdST5PqewKiB096VRYfFiRCTiV-Idfe9u62XEDWACFUlqBG69Jsj0nHA4YvWq1P8" },
          { name: "Marcus Chen", role: "CTO", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTIUM4-gjevdtJDe0mtiwQsIerG5BN4Lhudqb0N-kGQgrzms53KFb18z4XOUCvobdGaVeSAWfkwdDtowdheB5hXVDVcyWfSMPpww9xn_l5uy7QluG-9XZ6oGjPwND5Yw2VdqnrQademWn_mZbp8QtNWi-cPTYKaTZJSeGOkIeLKoMZFm3JwwOh1sMvSywDC4_myFSkCsg4+vlyDYOm7qCjN8UseS4Vs_u1R_fj_OilLyUtj6zooThEHuDzPnolypB2wAItM2ZkrdfY" },
          { name: "Elena Rodriguez", role: "Head of Design", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCndrXRKv4DB5QvkBRhMx51Oz5sEl2BHat1P3w8X-xpZ7KZCH3F-Lw5BnDKu5YcgJXzoGTI-EwBZREu0AX71sC9v6fNX3ZGCIlpds-H4-a-_aWKFx5QaJaSifTlT98utG6gjcRngh37dwMjyYZf6aGpQ8_2hRESGTR_YLDgmmSs4VyPahcEibScg46A8tF7cxWnYtrlJcLBM9JLydD_iZrjmzAYhKJFhsg1WgafxEKb8UJeuxeKI4ad_Ro--OXLuXB_e0dYlK4E3U4" },
          { name: "Sam Wilson", role: "Comm. Director", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-MU3EErpk-J07160XK_V7lSWhzlxaQo3VFYmBH4srNkuvMuD5gdhJSYzo9jAmhgEYYCqN7hfQZTFUKp-uCiX8w7r_Q0KRH00KqWKb_RLDyN9VpIj2jmhk3cwScQp5ah5o7lOUu-r2LE-kh3LFsnqKWc0WyN7BLGFHeZ2laFqbU5Ri1vRyAOgYLaxls0ZGFbFfKdc-PXnNtGtX9W_qDAJNPy9jXVZnsj4xBB7T4y2yp0RB8DXN73vOLzaNuLB7cAbZiOu_-Mx2QXE" }
        ].map((member, i) => (
          <motion.div 
            key={i} 
            {...fadeIn} 
            transition={{ delay: i * 0.1 }}
            className="group"
          >
            <div className="relative overflow-hidden rounded-xl aspect-[4/5] mb-4 shadow-sm">
              <img 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110" 
                src={member.img} 
                alt={member.name}
              />
              <div className="absolute bottom-4 left-4 flex gap-2 translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
                <div className="bg-white/90 backdrop-blur p-2 rounded-full shadow-md">
                    <Share2 size={16} />
                </div>
              </div>
            </div>
            <h4 className="text-lg md:text-xl font-bold uppercase tracking-tighter text-center lg:text-left">{member.name}</h4>
            <p className="text-[#576100] font-bold text-xs uppercase tracking-widest text-center lg:text-left">{member.role}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const CommunityImpact = () => (
  <section className="py-20 md:py-24 bg-[#dbdddd]/30 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-12 items-center">
        <div className="lg:col-span-1 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6 uppercase">Community Impact</h2>
          <p className="text-[#5a5c5c] leading-relaxed text-base md:text-lg mb-8 font-medium">
             We don't just build software; we build platforms for success. Here's what some of our creators have to say.
          </p>
          <div className="flex items-center justify-center lg:justify-start gap-2 text-[#576100] font-bold cursor-pointer hover:gap-4 transition-all group">
            <span className="uppercase tracking-widest text-xs md:text-sm">Read all stories</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
        <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
          {[
            { n: "Sarah Jenkins", r: "Digital Artist", q: "Monkey Bio changed how I monetize my content. It's clean, professional, and my fans love it." },
            { n: "Alex Rivera", r: "Fitness Coach", q: "Finally a tool that understands the creator journey from day one. Simplest setup ever." }
          ].map((t, i) => (
            <motion.div 
              key={i} 
              {...fadeIn} 
              transition={{ delay: i * 0.2 }}
              className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex gap-1 text-[#576100] mb-4">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill="currentColor" />)}
              </div>
              <p className="text-[#5a5c5c] text-sm md:text-base italic mb-6 leading-relaxed font-medium">"{t.q}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#dbdddd] overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?u=${t.n}`} alt={t.n} />
                </div>
                <div>
                  <p className="font-bold text-xs md:text-sm uppercase tracking-tighter">{t.n}</p>
                  <p className="text-[10px] md:text-xs text-[#5a5c5c] uppercase font-bold">{t.r}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
)

const FinalCTA = () => (
  <section className="py-20 md:py-32 px-6 bg-white">
    <div className="max-w-7xl mx-auto">
      <motion.div 
        {...scaleIn}
        className="bg-[#d8ef2c] rounded-[2rem] md:rounded-[3rem] p-10 md:p-24 text-center relative overflow-hidden group shadow-xl"
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-6xl font-black text-[#4d5700] tracking-tighter mb-8 leading-tight uppercase">
            Ready to showcase your<br className="hidden md:block"/>best self to the world?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/signup" className="w-full sm:w-auto bg-[#4d5700] text-[#d8ef2c] px-8 py-4 md:px-10 md:py-5 rounded-full font-black text-lg md:text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl uppercase tracking-widest">
                Create Your Profile
            </Link>
            <p className="text-[#4d5700] font-bold uppercase tracking-wide text-xs md:text-sm underline decoration-2 underline-offset-4 cursor-pointer">Join the Pulse Today</p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
)

export default function AboutPage() {
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
    <div className="min-h-screen bg-[#f6f6f6] selection:bg-[#d8ef2c] selection:text-[#4d5700] font-sans antialiased text-[#2d2f2f]">
      <main className="relative">
        <HeroSection />
        <MissionVision />
        <CoreValues />
        <StatsSection />
        <TeamSection />
        <CommunityImpact />
        <FinalCTA />
      </main>
    </div>
  )
}


