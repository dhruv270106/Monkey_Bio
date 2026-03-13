'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafafa] selection:bg-primary/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-black text-2xl tracking-tighter">Monkey <span className="text-primary">*</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-500">
            <Link href="#" className="hover:text-secondary transition-colors">Pricing</Link>
            <Link href="#" className="hover:text-secondary transition-colors">Discover</Link>
            <Link href="#" className="hover:text-secondary transition-colors">Learn</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="px-5 py-2.5 text-sm font-bold text-secondary hover:bg-gray-100 rounded-xl transition-all">Log in</Link>
            <Link href="/signup" className="px-6 py-2.5 text-sm font-bold bg-secondary text-white rounded-full hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl">Sign up free</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-7xl font-black text-secondary leading-[1.1] mb-8">
              Everything you are. In one, simple link.
            </h1>
            <p className="text-xl text-gray-500 font-medium mb-10 max-w-lg leading-relaxed">
              Join 50M+ people using Monkey to share everything they do in one link in bio. 
              Help your followers discover everything you do.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative group flex-1 max-w-md">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold">linktr.ee/</span>
                <input 
                  type="text" 
                  placeholder="yourname"
                  className="w-full pl-[5.5rem] pr-6 py-5 bg-white border-2 border-transparent focus:border-primary/50 rounded-[20px] shadow-sm focus:shadow-xl transition-all outline-none font-bold text-lg"
                />
              </div>
              <button className="px-8 py-5 bg-primary text-secondary font-black rounded-[20px] hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                Claim your Monkey <i className="fi fi-rr-arrow-right mt-1"></i>
              </button>
            </div>
          </motion.div>

          {/* Hero Image/Mockup Mock */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-gradient-to-br from-primary/20 to-purple-200 rounded-[60px] relative overflow-hidden flex items-center justify-center">
              {/* Floating Cards */}
              <div className="absolute w-[80%] aspect-[9/19] bg-white rounded-[40px] shadow-2xl border-[8px] border-secondary overflow-hidden">
                <div className="p-8 pt-12 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 mb-4" />
                  <div className="w-24 h-4 bg-gray-100 rounded-full mb-8" />
                  <div className="w-full space-y-3">
                    <div className="w-full h-12 bg-gray-50 rounded-xl" />
                    <div className="w-full h-12 bg-gray-50 rounded-xl" />
                    <div className="w-full h-12 bg-gray-50 rounded-xl" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: 'fi-rr-link', title: 'One link, everything', desc: 'Connect your TikTok, Instagram, Twitter, website, store, videos, and more.' },
              { icon: 'fi-rr-zap', title: 'Fast & optimized', desc: 'Built with the latest tech to ensure your page loads instantly for your audience.' },
              { icon: 'fi-rr-stats', title: 'Powerful insights', desc: 'Track your clicks, views, and see what content is performing best.' }
            ].map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 rounded-[32px] bg-gray-50 border border-gray-100"
              >
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                  <i className={`fi ${f.icon} text-2xl text-secondary`}></i>
                </div>
                <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed font-medium">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
