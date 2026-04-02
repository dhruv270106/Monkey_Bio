'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AuthCallback() {
  useEffect(() => {
    const handleCallback = async () => {
      const { data } = await supabase.auth.getSession()
      const session = data?.session
      if (session) {
        // Check if profile exists
        const { data: profile } = await supabase
          .from('monkey_bio')
          .select('onboarding_completed')
          .eq('id', session.user.id)
          .single()

        const searchParams = new URLSearchParams(window.location.search)
        const next = searchParams.get('next') || '/dashboard'

        if (profile?.onboarding_completed) {
          window.location.href = next
        } else {
          window.location.href = '/onboarding'
        }
      } else {
        window.location.href = '/login'
      }
    }
    handleCallback()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <i className="fi fi-rr-spinner animate-spin text-3xl text-primary"></i>
    </div>
  )
}
