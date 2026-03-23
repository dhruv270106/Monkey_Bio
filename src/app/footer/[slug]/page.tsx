'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import { ArrowLeft, Sparkles, Check, Globe, Users, Shield, Zap, Target, BookOpen, Heart, Briefcase, Mail, Scale, BarChart3, Fingerprint, Code, Cpu, ExternalLink, Calendar, Search } from 'lucide-react'
import { useParams } from 'next/navigation'

export default function FooterPage() {
  const params = useParams()
  const slug = params?.slug as string || ''
  const title = slug ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Monkey Page'

  // DIFFERENT COMPONENTS FOR DIFFERENT CATEGORIES
  
  // 1. BLOG / ENGINEERING LAYOUT (GRID OF CARDS)
  if (slug.includes('blog') || slug.includes('engineering') || slug.includes('news')) {
    const blogs = [
       { title: "Scaling to 40M+ Users with zero downtime.", date: "March 20, 2026", cat: "Engineering", img: "/images/analyze.png" },
       { title: "Top 10 Bio-Link strategies for 2026.", date: "March 18, 2026", cat: "Strategy", img: "/images/customize.png" },
       { title: "The evolution of the creator economy.", date: "March 15, 2026", cat: "Insights", img: "/images/share.png" }
    ]
    return (
      <div className="min-h-screen bg-[#0A0A0B] text-white selection:bg-purple-500 selection:text-white">
        <Navbar />
        <main className="pt-40 pb-20 px-6 md:px-12 lg:px-24">
           <div className="max-w-[1400px] mx-auto">
              <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-purple-400 hover:text-white mb-12 transition-all"><ArrowLeft className="w-4 h-4" /> Home</Link>
              <h1 className="text-[clamp(50px,12vw,160px)] font-black uppercase tracking-tighter leading-[0.8] mb-16 italic text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">{title}.</h1>
              <div className="flex items-center justify-between mb-20 border-b border-white/5 pb-10">
                 <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                   <span className="text-white">Latest Blogs</span>
                   <span>Strategy</span>
                   <span>Development</span>
                 </div>
                 <div className="hidden md:flex items-center gap-2 px-6 py-3 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest"><Search className="w-4 h-4" /> Search</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((b, i) => (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={i} className="group cursor-pointer">
                     <div className="aspect-[4/3] bg-white/5 rounded-[40px] overflow-hidden mb-8 border border-white/5 group-hover:border-purple-500/50 transition-all p-3">
                        <img src={b.img} className="w-full h-full object-cover rounded-[32px] group-hover:scale-110 transition-transform duration-1000" />
                     </div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-purple-400 mb-4">{b.cat} • {b.date}</p>
                     <h3 className="text-2xl font-black uppercase tracking-tighter group-hover:text-purple-400 transition-colors leading-tight">{b.title}</h3>
                  </motion.div>
                ))}
              </div>
           </div>
        </main>
      </div>
    )
  }

  // 2. LEGAL / PRIVACY LAYOUT (CLEAN CENTERED TERMS)
  if (slug.includes('privacy') || slug.includes('terms') || slug.includes('cookie') || slug.includes('legal')) {
    return (
      <div className="min-h-screen bg-white text-black selection:bg-blue-600 selection:text-white">
        <Navbar />
        <main className="pt-40 pb-20 px-6 md:px-12 lg:px-24">
           <div className="max-w-[900px] mx-auto">
              <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 mb-12"><ArrowLeft className="w-4 h-4" /> Home</Link>
              <h1 className="text-[clamp(40px,8vw,100px)] font-bold tracking-tight mb-4">{title}.</h1>
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-16 pb-8 border-b border-gray-100 italic">Last updated: March 2026</p>
              <div className="flex flex-col gap-20">
                 {[1,2,3,4].map(num => (
                   <div key={num} className="flex flex-col gap-6">
                      <h2 className="text-2xl font-black uppercase tracking-tight">{num}. Section Title Goes Here</h2>
                      <p className="text-xl font-bold text-gray-500 uppercase leading-relaxed tracking-wider">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                   </div>
                 ))}
              </div>
           </div>
        </main>
      </div>
    )
  }

  // 3. CAREERS LAYOUT (HIGH ENERGY / SIDE-BY-SIDE)
  if (slug.includes('careers')) {
    return (
      <div className="min-h-screen bg-[#D2E823] text-black">
        <Navbar />
        <main className="pt-40 pb-0">
           <div className="px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto mb-20 text-center flex flex-col items-center">
              <h1 className="text-[clamp(60px,15vw,200px)] font-black uppercase tracking-[-0.08em] leading-[0.75] italic mb-12">Building <br /> The Jungle.</h1>
              <Link href="#" className="bg-black text-[#D2E823] px-12 py-6 rounded-full font-black text-xl uppercase tracking-tighter hover:scale-110 transition-transform shadow-2xl">Open Roles ↗</Link>
           </div>
           {[
             { title: "Engineering", p: "Building sub-millisecond link redirects for 40M+ humans.", bg: "bg-white" },
             { title: "Design", p: "Setting the aesthetic pace for the entire creator economy.", bg: "bg-black text-white" }
           ].map((s, i) => (
              <section key={i} className={`py-40 px-6 md:px-12 lg:px-24 ${s.bg}`}>
                 <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    <h2 className="text-[clamp(40px,8vw,120px)] font-black uppercase tracking-tighter leading-none italic">{s.title}.</h2>
                    <p className="text-2xl md:text-3xl font-black uppercase leading-tight opacity-50">{s.p}</p>
                 </div>
              </section>
           ))}
        </main>
      </div>
    )
  }

  // DEFAULT (ABOUT / CONTACT / OTHERS)
  const isAbout = slug.includes('about')
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <main className="pt-44 pb-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
           <div>
              <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/40 hover:text-black mb-12 transition-all"><ArrowLeft className="w-4 h-4" /> Home</Link>
              <h1 className="text-[clamp(40px,8vw,100px)] font-black uppercase tracking-tighter leading-tight italic bg-[#D2E823] py-2 px-6 w-fit mb-12">{title}.</h1>
              <p className="text-2xl md:text-3xl font-black uppercase italic leading-[1.1] text-black mb-12">
                {isAbout 
                  ? "We're here to help you own your digital space with just one link." 
                  : `Redefining ${title} for the modern world.`
                }
              </p>
              
              <div className="flex flex-col gap-12">
                 <div className="p-10 border-4 border-black rounded-[40px] flex flex-col gap-6 group hover:bg-[#D2E823] transition-all duration-500">
                    <h3 className="text-2xl font-black uppercase">
                       {isAbout ? "Our Story" : "Our Intent"}
                    </h3>
                    <p className="text-sm font-bold opacity-60 uppercase tracking-widest leading-relaxed">
                       {isAbout 
                        ? "Monkey Bio was started with a simple observation: the internet is becoming too fragmented. We built this platform to bring your entire digital universe into a single, beautiful place."
                        : "Everything we build is designed to be as simple as possible but as powerful as intended."
                       }
                    </p>
                 </div>

                 {isAbout && (
                   <div className="p-10 border-4 border-black rounded-[40px] flex flex-col gap-6 group hover:bg-black hover:text-[#D2E823] transition-all duration-500">
                      <h3 className="text-2xl font-black uppercase">Our Mission</h3>
                      <p className="text-sm font-bold opacity-60 uppercase tracking-widest leading-relaxed">
                         To empower 100 million creators to share, sell, and grow their audience without the friction of multiple platforms. We believe in one link for everything you are.
                      </p>
                   </div>
                 )}
              </div>
           </div>
           <div className="hidden lg:flex items-center justify-center p-12 bg-[#D2E823] rounded-[60px] shadow-3xl">
              <span className="text-[200px] font-black italic select-none text-black">M</span>
           </div>
        </div>
      </main>
    </div>
  )
}
