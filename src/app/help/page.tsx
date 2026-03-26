'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50/20">
      <Navbar />
      
      <main className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6 block">Monkey Bio Help Centre</span>
          <h1 className="text-5xl md:text-7xl font-black text-black tracking-tighter mb-12 italic">How can we help?</h1>
          
          <div className="max-w-xl mx-auto relative group">
             <i className="fi fi-rr-search absolute left-8 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-black text-xl transition-colors"></i>
             <input 
               type="text" 
               placeholder="Search articles, guides, and support..." 
               className="w-full h-20 px-16 bg-white rounded-[40px] shadow-[0_30px_90px_rgba(0,0,0,0.15)] focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all font-semibold italic text-lg"
             />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {['Getting Started', 'Account Setup', 'Links & Profiles', 'Themes & Customization', 'Analytics & Insights'].map((topic, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer p-10 bg-white rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_100px_rgba(0,0,0,0.15)] hover:-translate-y-2 transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-[24px] bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all text-2xl mb-8">
                 <i className="fi fi-rr-box-open"></i>
              </div>
              <h3 className="text-2xl font-black text-black leading-tight mb-4 group-hover:text-primary transition-colors italic uppercase tracking-tighter">{topic}</h3>
              <p className="text-xs text-gray-400 font-semibold mb-6 uppercase tracking-widest leading-loose">Step-by-step guides on how to master {topic} for your Monkey Bio.</p>
              <ul className="space-y-4">
                 {[1, 2, 3].map(j => (
                   <li key={j} className="text-sm font-bold text-black flex items-center gap-3 opacity-60 hover:opacity-100 hover:translate-x-2 transition-all cursor-pointer">
                      <i className="fi fi-rr-angle-small-right"></i>
                      Guide {j} for {topic}
                   </li>
                 ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
