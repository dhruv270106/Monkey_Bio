'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        window.location.href = '/login'
      } else {
        setUserId(session.user.id)
        setUsername(session.user.user_metadata.username || '')
      }
    }
    checkUser()
  }, [])

  const handleComplete = async () => {
    if (!userId) return
    setLoading(true)
    
    // Create or update profile
    const { error } = await supabase
      .from('monkey_bio')
      .upsert({
        id: userId,
        username: username.toLowerCase(),
        display_name: displayName || username,
        onboarding_completed: true,
        links: [],
        social_links: {},
        theme: 'white'
      })

    if (error) {
      alert(error.message)
      setLoading(false)
    } else {
      window.location.href = '/dashboard'
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-12">
           <span className="font-black text-3xl tracking-tighter">Monkey <span className="text-primary">*</span></span>
        </div>

        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-3xl font-black text-secondary mb-4 text-center">Let's build your profile</h1>
            <p className="text-gray-500 font-medium text-center mb-8">What should we call you? This will be your public name.</p>
            
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Display Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-primary/50 rounded-2xl outline-none font-bold text-lg transition-all"
              />
              <button 
                onClick={() => setStep(2)}
                className="w-full py-4 bg-secondary text-white font-black rounded-full hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                Next <i className="fi fi-rr-arrow-right"></i>
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-3xl font-black text-secondary mb-4 text-center">You're all set!</h1>
            <p className="text-gray-500 font-medium text-center mb-8">Ready to start adding links to your bio?</p>
            
            <div className="p-8 bg-primary/10 rounded-[32px] border border-primary/20 mb-8 flex flex-col items-center">
               <i className="fi fi-rr-check-circle text-6xl text-primary mb-4"></i>
               <p className="font-bold text-secondary">Profile Ready</p>
               <p className="text-sm text-gray-400 font-medium">linktr.ee/{username}</p>
            </div>

            <button 
              disabled={loading}
              onClick={handleComplete}
              className="w-full py-4 bg-secondary text-white font-black rounded-full hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              {loading ? <i className="fi fi-rr-spinner animate-spin text-xl"></i> : <>Go to Dashboard <i className="fi fi-rr-arrow-right"></i></>}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
