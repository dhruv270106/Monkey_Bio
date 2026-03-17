'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DesignPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to dashboard, potentially with a prompt or state if needed
    // But since dashboard handles everything now, we just go there.
    window.location.href = '/dashboard'
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <i className="fi fi-rr-spinner animate-spin text-3xl text-primary"></i>
    </div>
  )
}
