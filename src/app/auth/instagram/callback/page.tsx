'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'

function InstagramCallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState('Connecting to Meta...')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const code = searchParams.get('code')
    const errorMsg = searchParams.get('error')

    if (errorMsg) {
      setError(`Auth failed: ${errorMsg}`)
      return
    }

    if (code) {
      handleCode(code)
    } else {
      setError('No authorization code received.')
    }
  }, [searchParams])

  const handleCode = async (code: string) => {
    try {
      setStatus('Exchanging code for access token...')
      
      const response = await fetch('/api/auth/instagram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to exchange token')
      }

      setStatus('Success! Link complete.')
      
      // Notify parent if opened in popup
      if (window.opener) {
        window.opener.postMessage({ 
          type: 'INSTAGRAM_AUTH_SUCCESS',
          data: data.user 
        }, '*')
        setTimeout(() => window.close(), 1000)
      } else {
        // Fallback if not in popup
        router.push('/dashboard/autoreply')
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="w-20 h-20 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-3xl flex items-center justify-center text-white text-4xl mx-auto shadow-lg animate-pulse">
           <i className="fi fi-brands-instagram"></i>
        </div>

        <div className="space-y-4">
           {error ? (
             <>
               <h1 className="text-2xl font-black text-red-500">Connection Failed</h1>
               <p className="text-gray-500 font-bold">{error}</p>
               <button 
                onClick={() => window.close()}
                className="px-8 py-3 bg-secondary text-white font-black rounded-full"
               >
                 Close Window
               </button>
             </>
           ) : (
             <>
               <h1 className="text-2xl font-black text-secondary">{status}</h1>
               <div className="flex justify-center">
                  <i className="fi fi-rr-spinner animate-spin text-3xl text-primary"></i>
               </div>
               <p className="text-gray-400 font-bold">Please do not close this window</p>
             </>
           )}
        </div>
      </motion.div>
    </div>
  )
}

export default function InstagramCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <i className="fi fi-rr-spinner animate-spin text-3xl text-primary"></i>
      </div>
    }>
      <InstagramCallbackContent />
    </Suspense>
  )
}
