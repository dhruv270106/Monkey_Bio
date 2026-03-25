'use client'

import React from 'react'
import Link from 'next/link'
import { Instagram, Facebook, Linkedin, Disc } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()

  if (pathname?.startsWith('/dashboard') || pathname?.startsWith('/admin')) {
    return null
  }

  return (
    <footer className="relative bg-white pt-24 pb-16 px-6 md:px-12 lg:px-24 z-30 overflow-hidden border-t border-gray-100">
       <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-24 mb-24">
             {/* COLUMN 1: COMPANY */}
             <div className="flex flex-col gap-6">
                <h4 className="font-extrabold text-[15px] uppercase tracking-wider text-black">Company</h4>
                <ul className="flex flex-col gap-4">
                   {['The Linktree Blog', 'Engineering Blog', "What's New", 'About', 'Press', 'Careers', 'Link In Bio', 'Social Good', 'Contact'].map(l => (
                      <li key={l}>
                         <Link 
                            href={l === 'About' ? '/about' : l === 'Contact' ? '/contact' : l === 'Social Good' ? '/social-good' : `/footer/${l.toLowerCase().replace(/\s+/g, '-')}`} 
                            className="text-sm font-bold text-gray-500 hover:text-black transition-colors"
                         >
                            {l}
                         </Link>
                      </li>
                   ))}
                </ul>
             </div>
             
             {/* COLUMN 2: COMMUNITY */}
             <div className="flex flex-col gap-6">
                <h4 className="font-extrabold text-[15px] uppercase tracking-wider text-black">Community</h4>
                <ul className="flex flex-col gap-4">
                   {['Linktree for Enterprise', '2023 Creator Report', '2022 Creator Report', 'Charities', 'Creator Profile Directory', 'Explore Templates'].map(l => (
                      <li key={l}>
                        <Link 
                           href={l === 'Explore Templates' ? '/templates' : `/footer/${l.toLowerCase().replace(/\s+/g, '-')}`} 
                           className="text-sm font-bold text-gray-500 hover:text-black transition-colors"
                        >
                           {l}
                        </Link>
                     </li>
                   ))}
                </ul>
             </div>

             {/* COLUMN 3: SUPPORT */}
             <div className="flex flex-col gap-6">
                <h4 className="font-extrabold text-[15px] uppercase tracking-wider text-black">Support</h4>
                <ul className="flex flex-col gap-4">
                   {['Help Topics', 'Getting Started', 'Linktree Pro', 'Features & How-Tos', 'FAQs', 'Report a Violation'].map(l => (
                      <li key={l}><Link href={`/footer/${l.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm font-bold text-gray-500 hover:text-black transition-colors">{l}</Link></li>
                   ))}
                </ul>
             </div>

             {/* COLUMN 4: TRUST & LEGAL */}
             <div className="flex flex-col gap-6">
                <h4 className="font-extrabold text-[15px] uppercase tracking-wider text-black">Trust & Legal</h4>
                <ul className="flex flex-col gap-4">
                   {['Terms & Conditions', 'Privacy Notice', 'Cookie Notice', 'Trust Center', 'Cookie Preferences', 'Transparency Report', 'Law Enforcement Access Policy', 'Human Rights'].map(l => (
                      <li key={l}><Link href={`/footer/${l.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm font-bold text-gray-500 hover:text-black transition-colors">{l}</Link></li>
                   ))}
                </ul>
             </div>
          </div>

          {/* BOTTOM ROW: CTAs, APPS, SOCIAL */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-12 pt-12 border-t border-gray-100">
             <div className="flex items-center gap-4">
                <Link href="/login" className="bg-[#F3F3F1] text-black font-black text-xs uppercase px-10 py-5 rounded-[20px] shadow-sm hover:bg-gray-200 transition-colors tracking-widest">Log in</Link>
                <Link href="/signup" className="bg-[#D2E823] text-black font-black text-xs uppercase px-8 py-5 rounded-full shadow-lg hover:scale-105 transition-all tracking-widest">Get started for free</Link>
             </div>

             <div className="flex items-center gap-4 flex-wrap justify-center">
                {/* APP BADGES PLACEHOLDERS */}
                <div className="bg-black text-white px-5 py-3 rounded-2xl flex items-center gap-3 cursor-pointer hover:bg-gray-900 transition-colors">
                   <span className="text-xl">🍎</span>
                   <div className="leading-none"><p className="text-[8px] uppercase font-black opacity-60">Download on the</p><p className="text-sm font-black">App Store</p></div>
                </div>
                <div className="bg-black text-white px-5 py-3 rounded-2xl flex items-center gap-3 cursor-pointer hover:bg-gray-900 transition-colors">
                   <span className="text-xl">🤖</span>
                   <div className="leading-none"><p className="text-[8px] uppercase font-black opacity-60">GET IT ON</p><p className="text-sm font-black">Google Play</p></div>
                </div>

                {/* SOCIALS */}
                <div className="flex items-center gap-3 ml-4">
                   {[
                     { icon: <Instagram className="w-5 h-5" />, label: 'Instagram' },
                     { icon: <Facebook className="w-5 h-5" />, label: 'Facebook' },
                     { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn' },
                     { icon: <Disc className="w-5 h-5" />, label: 'Threads' }
                   ].map((s, i) => (
                      <div key={i} className="w-11 h-11 bg-[#1E2330] rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform active:scale-95" title={s.label}>
                         {s.icon}
                      </div>
                   ))}
                </div>
             </div>
          </div>

          <div className="mt-16 text-center text-[10px] font-black uppercase text-gray-300 tracking-[0.3em]">
             © 2026 MONKEY BIO. ALL RIGHTS RESERVED.
          </div>
       </div>
    </footer>
  )
}
