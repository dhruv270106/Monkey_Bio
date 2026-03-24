'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Lenis from 'lenis'
import { ArrowLeft, ArrowRight, Zap, Target, Rocket, Users, Globe, Layers, BarChart3, Palette, ShieldCheck, Cpu, Smartphone, Layout, Share2, TrendingUp, Sparkles, MessageCircle, Instagram, Twitter, Linkedin, Check, Music, Heart, Camera, ShoppingBag } from 'lucide-react'

// --- REUSABLE COMPONENTS ---

const SectionWrap = ({ children, className = "", id = "" }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`py-16 md:py-24 px-6 md:px-12 lg:px-24 overflow-hidden relative ${className}`}>
    <div className="max-w-[1200px] mx-auto ">{children}</div>
  </section>
)

const SectionTitle = ({ subtitle, title, description, center = false }: { subtitle: string, title: string, description?: string, center?: boolean }) => (
  <div className={`flex flex-col gap-4 mb-16 ${center ? 'text-center items-center' : 'text-left lg:items-start'}`}>
    <span className="text-[12px] uppercase font-bold tracking-widest text-[#502274] px-5 py-2 rounded-full border border-black/10 bg-black/5">{subtitle}</span>
    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black leading-[0.95] uppercase tracking-tighter" dangerouslySetInnerHTML={{ __html: title }} />
    {description && (
      <p className="max-w-xl text-lg font-bold text-gray-400 leading-snug mt-4 uppercase">{description}</p>
    )}
  </div>
)

// --- SECTIONS ---

const CustomMosaicHero = () => (
  <section className="relative h-screen min-h-[700px] flex items-center justify-center text-center px-6 overflow-hidden">
    {/* High-End Mosaic Wallpaper (Now a local generated image) */}
    <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
            src="/images/about_mosaic_hero.png" 
            className="w-full h-full object-cover scale-110 blur-[8px] opacity-80" 
            alt="Mosaic Wallpaper" 
        />
        {/* Dark Overlay for Depth */}
        <div className="absolute inset-0 bg-black/40" />
    </div>

    <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-10">
        <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="px-6 py-2 bg-[#D2E823] text-black rounded-full font-black uppercase text-xs tracking-[0.5em] shadow-2xl"
        >
            The Community Wall
        </motion.div>

        <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] uppercase tracking-tighter"
        >
            EMPOWERING <br/> 
            <span className="text-[#D2E823]">DIGITAL SOULS.</span>
        </motion.h1>
        
        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl font-bold text-white/80 max-w-3xl leading-tight uppercase tracking-tight"
        >
            Joining 40M+ creators in building a unified home for their life's work. One link, total impact.
        </motion.p>

        <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
        >
            <Link href="/signup" className="px-16 py-8 bg-[#D2E823] text-black font-black text-2xl rounded-full shadow-2xl hover:scale-105 transition-all uppercase tracking-widest">
                Start For Free
            </Link>
        </motion.div>
    </div>
  </section>
)

const ProblemSection = () => (
    <SectionWrap className="bg-white border-y border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            {/* SIDE-BY-SIDE 1: IMAGE LEFT */}
            <div className="rounded-[40px] overflow-hidden shadow-2xl border-[16px] border-gray-50 aspect-video lg:aspect-square">
                <img src="/images/about_problem_normal.png" className="w-full h-full object-cover rounded-[24px]" alt="Dispersion" />
            </div>
            <SectionTitle 
                subtitle="The Background" 
                title="THE DIGITAL <br/> DISPERSION." 
                description="Your followers are spread thin across dozens of platforms. Every disconnected link is a door closed. We unify your presence into one single pulse."
            />
        </div>
    </SectionWrap>
)

const Features = () => (
    <SectionWrap className="bg-white">
        <SectionTitle subtitle="Our DNA" title="CRAFTED FOR <br/> EXCELLENCE." center />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { i: <Smartphone />, t: "Mobile Native", d: "Designed for touch, perfected for speed." },
                { i: <Zap />, t: "Warp Load", d: "Zero wait time between links." },
                { i: <Palette />, t: "Custom Style", d: "Themes that match your personal brand." },
                { i: <ShieldCheck />, t: "Secure", d: "SSL protected and zero-spam safety." },
                { i: <TrendingUp />, t: "Insights", d: "Data that actually helps you grow." },
                { i: <Rocket />, t: "Quick Setup", d: "Live in precisely under 2 minutes." }
            ].map((f, i) => (
                <div key={i} className="flex flex-col items-center bg-gray-50 p-10 rounded-[32px] hover:bg-gray-100 transition-all group">
                     <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#502274] mb-6 shadow-sm border border-black/5">{f.i}</div>
                     <h4 className="font-black text-xl uppercase mb-2">{f.t}</h4>
                     <p className="text-xs font-bold text-gray-400 text-center uppercase leading-tight">{f.d}</p>
                </div>
            ))}
        </div>
    </SectionWrap>
)

const ImpactSection = () => (
    <SectionWrap className="bg-[#FCFCFC]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            {/* SIDE-BY-SIDE 2: IMAGE RIGHT */}
            <SectionTitle 
                subtitle="The Impact" 
                title="RADICAL <br/> SIMPLICITY." 
                description="One link, one focus. A beautiful, high-speed stage that unifies your social, commerce, and content into a single effortless stream."
            />
            <div className="rounded-[40px] overflow-hidden shadow-2xl border-[16px] border-white">
                <img src="/images/why_us_dashboard.png" className="w-auto h-auto rounded-[24px]" alt="Impact" />
            </div>
        </div>
    </SectionWrap>
)

const VisionMission = () => (
    <SectionWrap className="bg-black text-white py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="flex flex-col gap-6 font-sans">
                 <h4 className="font-black text-xs text-[#D2E823] uppercase tracking-[0.5em]">Vision</h4>
                 <h3 className="text-4xl md:text-5xl font-black uppercase italic leading-none text-[#D2E823]">Empowering <br/> Every <br/> Creator.</h3>
                 <p className="text-white/40 font-bold max-w-sm uppercase leading-tight text-xl">To be the most reliable and beautiful bridge between creators and their world.</p>
            </div>
            <div className="flex flex-col gap-6 border-l border-white/10 lg:pl-16">
                 <h4 className="font-black text-xs text-[#D2E823] uppercase tracking-[0.5em]">Mission</h4>
                 <h3 className="text-4xl md:text-5xl font-black uppercase italic leading-none text-[#D2E823]">Your Soul. <br/> Integrated.</h3>
                 <p className="text-white/40 font-bold max-w-sm uppercase leading-tight text-xl">Providing a seamless and intelligent home for your entire digital existence.</p>
            </div>
        </div>
    </SectionWrap>
)

const RitualSteps = () => (
    <SectionWrap className="bg-white">
        <SectionTitle subtitle="Ritual" title="UNFOLD YOUR <br/> POTENTIAL." center />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
             {[
                 { t: "Pick Name", d: "Claim your unique portal handle." },
                 { t: "Sync Pulse", d: "Connect your digital world." },
                 { t: "Aesthetic", d: "Choose your premium theme." },
                 { t: "Go Live", d: "Launch and monitor responses." }
             ].map((s, i) => (
                 <div key={i} className="flex flex-col items-center">
                     <div className="text-7xl font-black text-[#502274] leading-none mb-6">0{i+1}</div>
                     <h4 className="font-black text-xl uppercase mb-2">{s.t}</h4>
                     <p className="text-xs font-bold text-gray-400 max-w-[150px] uppercase leading-tight">{s.d}</p>
                 </div>
             ))}
        </div>
    </SectionWrap>
)

const FinalCTA = () => (
    <section className="bg-[#D2E823] py-16 px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center md:flex-row justify-between gap-10">
            <h2 className="text-3xl md:text-4xl font-black uppercase leading-none tracking-tighter text-black italic text-center md:text-left">
                Start Your <br/> <span className="bg-black text-white px-3 py-1 inline-block not-italic">New Story.</span>
            </h2>
            <Link href="/signup" className="px-14 py-7 bg-black text-white font-black text-xl rounded-full shadow-2xl uppercase tracking-widest hover:scale-105 transition-all">
                Join Free Now
            </Link>
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
    window.scrollTo(0, 0)
    return () => lenis.destroy()
  }, [])

  return (
    <div className="min-h-screen bg-white selection:bg-[#D2E823] selection:text-black">
      
      <main className="relative z-10 antialiased font-sans">
        <CustomMosaicHero />
        <ProblemSection />
        <Features />
        <ImpactSection />
        <VisionMission />
        <RitualSteps />
        <FinalCTA />
      </main>

    </div>
  )
}
