'use client'

import { useState, useEffect } from 'react'

export function useDomain() {
  const [domain, setDomain] = useState('monkey.link')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDomain(window.location.host)
    }
  }, [])

  return domain
}
