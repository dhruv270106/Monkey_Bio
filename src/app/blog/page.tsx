'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6 block">Monkey Bio Blog</span>
          <h1 className="text-5xl md:text-7xl font-black text-black tracking-tighter mb-8 italic">The Creator Hub</h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-500 font-medium">Insights, strategies, and stories from the world's most successful creators.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[1.5/1] bg-gray-100 rounded-[40px] overflow-hidden mb-6 relative shadow-sm group-hover:shadow-2xl transition-all duration-500">
                <img 
                  src={`https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&q=80&w=800`}
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                  alt="Blog post"
                />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-3">Strategy</p>
              <h3 className="text-2xl font-black text-black leading-tight mb-4 group-hover:text-primary transition-colors italic">How to grow your Monkey Bio audience in 2026</h3>
              <p className="text-sm text-gray-400 font-medium mb-6">Learn the latest secrets of the algorithm and how to dominate every feed...</p>
              <span className="text-[10px] font-black uppercase tracking-widest text-black group-hover:translate-x-4 transition-transform inline-flex items-center gap-2">Read Now <i className="fi fi-rr-arrow-right"></i></span>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
