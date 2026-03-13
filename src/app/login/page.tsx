'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      window.location.href = '/dashboard'
    }
  }

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center p-8 lg:p-24 bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Link href="/" className="inline-block mb-12 font-black text-2xl tracking-tighter">
            Monkey <span className="text-primary">*</span>
          </Link>

          <h1 className="text-4xl font-black text-secondary mb-2">Welcome back</h1>
          <p className="text-gray-500 font-medium mb-10">Log in to your Monkey account</p>

          <button 
            onClick={handleGoogleLogin}
            className="w-full py-4 px-6 border-2 border-gray-100 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-50 transition-all mb-4 group"
          >
            <i className="fi fi-brands-google text-gray-400 group-hover:text-red-500 transition-colors"></i>
            Continue with Google
          </button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100" /></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-gray-400 font-bold tracking-widest">OR</span></div>
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary ml-1">Email</label>
              <div className="relative">
                <i className="fi fi-rr-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-primary/50 rounded-2xl outline-none font-medium transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary ml-1">Password</label>
              <div className="relative">
                <i className="fi fi-rr-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-primary/50 rounded-2xl outline-none font-medium transition-all"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>
            )}

            <button 
              disabled={loading}
              className="w-full py-4 bg-secondary text-white font-black rounded-full hover:bg-gray-800 transition-all shadow-lg flex items-center justify-center gap-2 mt-4"
            >
              {loading ? <i className="fi fi-rr-spinner animate-spin text-xl"></i> : <>Log in <i className="fi fi-rr-arrow-right"></i></>}
            </button>
          </form>

          <p className="text-center mt-8 text-sm font-medium text-gray-500">
            Don't have an account? <Link href="/signup" className="text-secondary font-bold hover:underline">Sign up</Link>
          </p>
        </motion.div>
      </div>

      <div className="hidden lg:flex bg-primary flex-col items-center justify-center p-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-dark opacity-50" />
        <div className="relative z-10 text-center">
          <h2 className="text-5xl font-black text-secondary leading-tight mb-6">Create and customize your profile in minutes</h2>
          <p className="text-xl text-secondary/60 font-bold max-w-md mx-auto">Connect your TikTok, Instagram, Twitter, website, store, videos, music, podcast, events and more. It all comes together in a link in bio engineered to inform.</p>
        </div>
        {/* Abstract shapes for premium feel */}
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>
    </div>
  )
}
