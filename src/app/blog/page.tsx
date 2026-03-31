'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      
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
          {[
            { img: '/images/analyze.png', category: 'Strategy', title: 'Dominate the algorithm in 2026' },
            { img: '/images/customize.png', category: 'Design', title: 'Why your profile needs a makeover' },
            { img: '/images/share.png', category: 'Growth', title: 'The secret to viral link-sharing' },
            { img: '/solutions/hero.png', category: 'Creator', title: 'Stories from top Monkey Bio users' },
            { img: '/solutions/stack.png', category: 'Productivity', title: 'Organize your digital life' },
            { img: '/products/link-in-bio-hero.png', category: 'Insights', title: 'What data tells us about your fans' }
          ].map((post, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/3] bg-gray-50 rounded-[50px] overflow-hidden mb-8 relative shadow-sm group-hover:shadow-4xl transition-all duration-700 border border-black/5">
                <img 
                  src={post.img}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                  alt={post.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-primary mb-4">{post.category}</p>
              <h3 className="text-3xl font-black text-black leading-[1.1] mb-6 group-hover:text-primary transition-colors tracking-tighter uppercase">{post.title}</h3>
              <p className="text-sm text-gray-400 font-medium leading-relaxed mb-8">Learn the latest secrets of the algorithm and how to dominate every feed...</p>
              <span className="text-[11px] font-black uppercase tracking-widest text-black group-hover:gap-6 transition-all inline-flex items-center gap-3">Read Now <ArrowRight size={14} /></span>
            </motion.div>
          ))}
        </div>
      </main>

    </div>
  )
}
