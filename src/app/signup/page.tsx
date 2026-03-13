'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    // Check if username is already taken in monkey_bio
    const { data: existingUser } = await supabase
      .from('monkey_bio')
      .select('username')
      .eq('username', username.toLowerCase())
      .single()

    if (existingUser) {
      setError('Username is already taken.')
      setLoading(false)
      return
    }

    const { data: authData, error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username.toLowerCase(),
        }
      }
    })

    if (signupError) {
      setError(signupError.message)
      setLoading(false)
    } else if (authData.user) {
      window.location.href = '/onboarding'
    }
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

          <h1 className="text-4xl font-black text-secondary mb-2">Join Monkey</h1>
          <p className="text-gray-500 font-medium mb-10">Sign up for free and claim your link</p>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary ml-1">Username</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">linktr.ee/</span>
                <input 
                  type="text" 
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                  placeholder="yourname"
                  className="w-full pl-[5.5rem] pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-primary/50 rounded-2xl outline-none font-medium transition-all"
                />
              </div>
            </div>

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
              {loading ? <i className="fi fi-rr-spinner animate-spin text-xl"></i> : <>Create account <i className="fi fi-rr-arrow-right"></i></>}
            </button>
          </form>

          <p className="text-center mt-8 text-sm font-medium text-gray-500">
            Already have an account? <Link href="/login" className="text-secondary font-bold hover:underline">Log in</Link>
          </p>
        </motion.div>
      </div>

      <div className="hidden lg:flex bg-[#D2E823] flex-col items-center justify-center p-24 relative overflow-hidden">
        <div className="relative z-10 text-center">
          <h2 className="text-5xl font-black text-secondary leading-tight mb-6">Claim your spot in the creator economy</h2>
          <p className="text-xl text-secondary/60 font-bold max-w-md mx-auto">One link to rule them all. Join millions of creators using Monkey to share their world.</p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full -ml-40 -mb-40" />
      </div>
    </div>
  )
}
