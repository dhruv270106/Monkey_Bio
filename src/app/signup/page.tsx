'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { sendNotification } from '@/lib/notifications'
import { trackActivity } from '@/lib/analytics'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    const { data: authData, error: authError } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: {
          username: username.toLowerCase(),
        }
      }
    })

    if (authError) {
      alert(authError.message)
      setLoading(false)
    } else {
      if (authData.user) {
        // Create profile
        const { error: profileError } = await supabase
          .from('monkey_bio')
          .insert([{ 
            id: authData.user.id, 
            username: username.toLowerCase(), 
            display_name: username,
            onboarding_completed: false,
            links: [],
            social_links: {},
            theme: 'white',
            signup_date: new Date().toISOString(),
            device_info: typeof window !== 'undefined' ? window.navigator.userAgent.substring(0, 100) : 'Web Client'
          }])
        
        if (profileError) {
          alert(profileError.message)
        } else {
          // Track Activity
          trackActivity('signup', `User @${username} was created.`, authData.user.id)
          
          // Notify Admin
          sendNotification({
            title: 'New User Signup',
            message: `@${username} just joined Monkey Bio!`,
            type: 'success',
            channels: ['Slack', 'Audit'],
            metadata: { user_id: authData.user.id, username, event_type: 'signup' }
          })
          window.location.href = '/onboarding'
        }
      }
    }
  }

  const signupWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
  }

  return (
    <div className="min-h-screen flex bg-[#F5F7FA] selection:bg-primary/30">
      {/* Left Column: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative z-10 rounded-r-[40px] shadow-2xl overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Link href="/" className="flex items-center gap-2 mb-12">
            <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-secondary font-bold text-xl">M</span>
            <span className="font-bold text-3xl tracking-tight text-secondary">Monkey</span>
          </Link>
          
          <h1 className="text-4xl font-bold mb-4 tracking-tight text-secondary">Sign Up</h1>
          <p className="text-gray-500 mb-8 font-medium">Create your unique creator profile today.</p>
          
          <div className="space-y-4">
            <button 
              onClick={signupWithGoogle}
              className="w-full py-3.5 px-4 rounded-xl font-bold bg-[#F5F7FA] text-secondary hover:bg-[#EAEFF4] transition-colors flex items-center justify-center gap-3"
            >
              <i className="fi fi-brands-google text-lg"></i> Continue with Google
            </button>
            
            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-gray-100"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400 text-sm font-medium uppercase tracking-widest">or with email</span>
              <div className="flex-grow border-t border-gray-100"></div>
            </div>
            
            <form onSubmit={handleSignup} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-secondary mb-1 uppercase tracking-widest text-[10px]">Username</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3.5 px-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none font-medium transition-all shadow-sm" 
                  placeholder="yourname" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-secondary mb-1 uppercase tracking-widest text-[10px]">Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3.5 px-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none font-medium transition-all shadow-sm" 
                  placeholder="you@example.com" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-secondary mb-1 uppercase tracking-widest text-[10px]">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3.5 px-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none font-medium transition-all shadow-sm" 
                  placeholder="••••••••" 
                  required 
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 px-4 bg-secondary text-white font-bold rounded-xl hover:bg-gray-800 transition-all transform hover:scale-[1.02] shadow-xl mt-2 flex items-center justify-center gap-2"
              >
                {loading ? <i className="fi fi-rr-spinner animate-spin"></i> : 'Create account'}
              </button>
            </form>
          </div>
          
          <p className="mt-8 text-center text-sm font-medium text-gray-500">
            Already have an account? <Link href="/login" className="text-secondary font-bold hover:underline">Log in</Link>
          </p>
        </motion.div>
      </div>

      {/* Right Column: Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#F5F7FA] items-center justify-center">
        <div className="absolute inset-0 z-0 transition-transform duration-200">
            <div className="absolute rounded-full filter blur-[80px] opacity-40 animate-blob" style={{ width: '500px', height: '500px', background: '#43E660', top: '10%', right: '10%' }}></div>
            <div className="absolute rounded-full filter blur-[80px] opacity-30 animate-blob" style={{ width: '600px', height: '600px', background: '#60a5fa', bottom: '-5%', left: '0', animationDelay: '-3s' }}></div>
        </div>
        
        {/* Glass Mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 bg-white/40 backdrop-blur-2xl border border-white p-8 rounded-[40px] shadow-2xl max-w-sm"
        >
           <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg"><i className="fi fi-rr-zap text-2xl text-secondary"></i></div>
              <div>
                <h3 className="font-bold text-2xl text-secondary leading-tight">Join Millions.</h3>
                <p className="font-medium text-gray-600">Grow your platform today.</p>
              </div>
           </div>
           <div className="space-y-4">
              <div className="h-16 w-full bg-white/80 rounded-2xl shadow-sm border border-white/40"></div>
              <div className="h-16 w-full bg-white/80 rounded-2xl shadow-sm border border-white/40"></div>
              <div className="h-16 w-full bg-white/80 rounded-2xl shadow-sm border border-white/40"></div>
           </div>
        </motion.div>
      </div>
    </div>
  )
}
