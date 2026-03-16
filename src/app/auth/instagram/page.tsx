'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function InstagramAuthRedirect() {
  const router = useRouter()
  useEffect(() => {
    router.push('/dashboard/autoreply')
  }, [router])
  
  return null
}
