'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'

interface SidebarProps {
  userProfile: any
  activeMainTab: string
  onMainTabChange: (tab: string) => void
  isOpen?: boolean
  onClose?: () => void
}

export const MAIN_TABS = [
  { id: 'user', icon: 'fi-rr-user', label: 'User menu' },
  { id: 'monkeybio', icon: 'fi-rr-square-plus', label: 'My MonkeyBio' },
  { id: 'audience', icon: 'fi-rr-users', label: 'Audience' },
  { id: 'insights', icon: 'fi-rr-stats', label: 'Insights' },
  { id: 'tools', icon: 'fi-rr-apps', label: 'Tools' },
]

export default function Sidebar({ userProfile, activeMainTab, onMainTabChange, isOpen, onClose }: SidebarProps) {
  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <aside className="w-[72px] bg-black h-full flex flex-col items-center py-6 shrink-0 z-[200]">
      {/* Branding / Logo */}
      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-10 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
        <span className="text-black font-medium text-xs uppercase italic tracking-tighter">M</span>
      </div>

      <nav className="flex-1 flex flex-col items-center gap-6 w-full">
        {MAIN_TABS.map((tab) => {
          const isActive = activeMainTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onMainTabChange(tab.id)}
              className={`w-full flex items-center justify-center relative group transition-all duration-300 py-2`}
              title={tab.label}
            >
              <div className={`w-12 h-12 rounded-[18px] flex items-center justify-center transition-all duration-500 overflow-hidden ${
                isActive 
                  ? 'bg-primary/20 text-primary shadow-[0_10px_30px_rgba(139,62,255,0.15)] ring-1 ring-primary/30' 
                  : 'text-white/40 hover:text-white hover:bg-white/10'
              }`}>
                {tab.id === 'user' ? (
                  <img 
                    src={userProfile?.avatar_url || `https://ui-avatars.com/api/?name=${userProfile?.username || 'U'}&background=6cf383&color=0f172a`} 
                    className={`w-full h-full object-cover transition-transform duration-500 ${isActive ? 'scale-110 opacity-100' : 'opacity-80'}`} 
                    alt="" 
                  />
                ) : (
                  <i className={`fi ${tab.icon} text-xl pt-0 transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-110 group-hover:text-primary'}`}></i>
                )}
              </div>
              
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active-indicator"
                  className="absolute right-0 w-[3px] h-8 bg-primary rounded-l-full shadow-[0_0_15px_#502274]" 
                />
              )}
            </button>
          )
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="mt-auto flex flex-col items-center gap-6 w-full pb-2">
        <button 
           onClick={() => onMainTabChange('settings')}
           className={`w-full flex items-center justify-center transition-all ${activeMainTab === 'settings' ? 'text-primary' : 'text-white/30 hover:text-white'}`}
        >
          <i className="fi fi-rr-settings text-xl"></i>
        </button>
        <button 
           className="w-full flex items-center justify-center text-white/30 hover:text-red-500 transition-all opacity-50"
           title="Alerts"
        >
          <i className="fi fi-rr-exclamation text-xl"></i>
        </button>
      </div>
    </aside>
  )
}

