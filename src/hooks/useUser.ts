'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function useUser() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser()
        if (error) throw error
        setUser(data?.user || null)
      } catch (err) {
        console.error("useUser fetch error:", err)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      if (data?.subscription) data.subscription.unsubscribe()
    }
  }, [])

  return { user, loading }
}
