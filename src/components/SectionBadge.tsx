'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import React from 'react'

export function SectionBadge({ 
  icon: Icon, 
  title, 
  light = false 
}: { 
  icon: LucideIcon, 
  title: string, 
  light?: boolean 
}) {
  return (
    <div className={`inline-flex items-center gap-6 px-4 py-2 ${light ? 'bg-white/10 border-white/20' : 'bg-black/5 border-black/5'} rounded-full border mb-10 transition-all hover:scale-105 group shadow-sm backdrop-blur-md`}>
        <div className={`w-10 h-10 rounded-full ${light ? 'bg-white text-black' : 'bg-[#D2E823] text-black'} flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500`}>
            <Icon size={18} strokeWidth={3} />
        </div>
        <span className={`text-[11px] font-black uppercase tracking-[0.3em] ${light ? 'text-white' : 'text-black/60'} leading-none pr-4 whitespace-nowrap`}>
            {title}
        </span>
    </div>
  )
}
