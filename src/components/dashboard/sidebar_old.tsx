'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'

interface SidebarProps {
  userProfile: any
  activeTab?: string
  onTabChange?: (tab: string) => void
  isOpen?: boolean
  onClose?: () => void
}

export default function Sidebar({ userProfile, activeTab, onTabChange, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [accounts, setAccounts] = useState<any[]>([])

  useEffect(() => {
    // Load accounts from localStorage
    try {
      const savedAccounts = localStorage.getItem('monkey_accounts')
      if (savedAccounts) {
        let parsed = JSON.parse(savedAccounts)
        if (!Array.isArray(parsed)) parsed = []
        setAccounts(parsed)
        
        // Update current account info if it's already in the list
        if (userProfile && !parsed.find((a: any) => a?.id === userProfile.id)) {
          const newList = [...parsed, userProfile].filter(Boolean)
          localStorage.setItem('monkey_accounts', JSON.stringify(newList))
          setAccounts(newList)
        }
      } else if (userProfile) {
        const newList = [userProfile]
        localStorage.setItem('monkey_accounts', JSON.stringify(newList))
        setAccounts(newList)
      }
    } catch (e) {
      console.error("Error loading accounts:", e)
      if (userProfile) {
        const newList = [userProfile]
        localStorage.setItem('monkey_accounts', JSON.stringify(newList))
        setAccounts(newList)
      }
    }
  }, [userProfile])

  const handleLogout = async () => {
    // Remove current account from the list
    const otherAccounts = accounts.filter(a => a.id !== userProfile.id)
    localStorage.setItem('monkey_accounts', JSON.stringify(otherAccounts))

    if (otherAccounts.length > 0) {
      alert(`Logging out. Switching to ${otherAccounts[0].username}...`)
      await supabase.auth.signOut()
      window.location.href = '/login'
    } else {
      await supabase.auth.signOut()
      window.location.href = '/'
    }
  }

  const addAccount = () => {
    window.location.href = '/login?mode=add_account'
  }

  const navGroups = [
    {
      label: 'My Monkey Bio',
      items: [
        { label: 'Links', id: 'links', icon: 'fi-rr-link', color: 'text-purple-500' },
        { label: 'Design', id: 'design', icon: 'fi-rr-palette', color: 'text-pink-500' },
      ]
    },
    {
      label: 'Analytics',
      items: [
        { label: 'Audience', id: 'audience', icon: 'fi-rr-users', color: 'text-orange-500' },
        { label: 'Insights', id: 'insights', icon: 'fi-rr-stats', color: 'text-cyan-500' },
      ]
    },
    {
      label: 'Tools',
      items: [
        { label: 'Social planner', id: 'planner', icon: 'fi-rr-calendar', color: 'text-blue-500' },
        { label: 'Auto-reply', id: 'autoreply', icon: 'fi-rr-comment-alt', color: 'text-primary' },
      ]
    }
  ]

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white md:bg-[#f8fafc]">
      {/* Header with Close for mobile */}
      <div className="md:hidden flex items-center justify-between p-6 pb-2">
         <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
               <span className="text-primary font-extrabold text-sm">MB</span>
            </div>
            <span className="font-extrabold text-xs uppercase tracking-widest text-secondary">Dashboard</span>
         </div>
         <button onClick={onClose} className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400">
            <i className="fi fi-rr-cross-small text-xl pt-1"></i>
         </button>
      </div>

      {/* User Selector */}
      <div className="p-6 relative z-[110]">
        <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-2xl cursor-pointer transition-all group relative">
          <div 
            className="flex items-center gap-3 flex-1"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/10 overflow-hidden flex items-center justify-center">
              {userProfile?.avatar_url ? (
                <img src={userProfile.avatar_url} alt="" className="w-full h-full object-cover" />
              ) : (
                <i className="fi fi-rr-user text-primary"></i>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-secondary flex items-center gap-1">
                {userProfile?.username || 'User'} <i className={`fi fi-rr-angle-small-${isDropdownOpen ? 'up' : 'down'} pt-1 text-gray-400 transition-transform`}></i>
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => {
              onTabChange?.('audience')
              onClose?.()
            }}
            className="p-2 text-gray-400 hover:text-orange-500 transition-colors relative"
            title="Messages"
          >
            <i className="fi fi-rr-bell text-sm"></i>
            <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
          </button>

          {/* User Dropdown Menu */}
          {isDropdownOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="absolute top-full left-0 w-full mt-2 bg-white rounded-3xl shadow-2xl border border-gray-100 p-2 z-[120]"
            >
               <div className="p-2 mb-2">
                  <p className="text-[10px] font-extrabold uppercase text-gray-400 tracking-[0.2em] px-3 mb-2">Accounts</p>
                  {accounts.map((acc, i) => (
                    <div 
                      key={i}
                      className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${acc?.id === userProfile?.id ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                    >
                       <img src={acc?.avatar_url || `https://ui-avatars.com/api/?name=${acc?.username || 'User'}`} className="w-8 h-8 rounded-full" />
                       <div className="flex-1">
                          <p className="text-xs font-extrabold text-secondary">{acc?.username || 'User'}</p>
                          {acc?.id === userProfile?.id && <p className="text-[8px] font-semibold text-primary uppercase">Active now</p>}
                       </div>
                    </div>
                  ))}
               </div>
               
               <div className="border-t border-gray-50 pt-2 space-y-1">
                  <button 
                    onClick={addAccount}
                    className="w-full flex items-center gap-3 p-3 text-xs font-semibold text-gray-500 hover:bg-gray-50 rounded-2xl transition-all"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center">
                      <i className="fi fi-rr-plus-small text-lg"></i>
                    </div>
                    Add account
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 p-3 text-xs font-semibold text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                  >
                    <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center">
                      <i className="fi fi-rr-exit"></i>
                    </div>
                    Log out
                  </button>
               </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Nav Items */}
      <nav className="px-4 flex-1 space-y-6 overflow-y-auto no-scrollbar">
        {navGroups.map((group, i) => (
          <div key={i}>
            <p className="px-4 py-2 text-gray-400 font-semibold text-[10px] uppercase tracking-widest mb-1">
              {group.label}
            </p>
            <div className="space-y-1">
              {group.items.map((item, j) => {
                const isActive = activeTab === item.id
                
                return (
                  <button 
                    key={j}
                    onClick={() => {
                       onTabChange?.(item.id)
                       onClose?.()
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 transition-all rounded-xl font-semibold text-sm ${
                      isActive 
                        ? 'bg-white text-secondary shadow-sm border border-gray-100' 
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    <i className={`fi ${item.icon} ${item.color} ${isActive ? 'opacity-100' : 'opacity-70'}`}></i>
                    {item.label}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Checklist Card */}
      <div className="p-4 mt-auto">
        <div className="md:bg-white p-4 rounded-3xl md:border md:border-gray-100 md:shadow-sm space-y-3 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full border-2 border-primary/20 relative flex items-center justify-center">
              <span className="text-[10px] font-semibold text-primary">33%</span>
            </div>
          </div>
          <p className="text-xs font-semibold text-gray-700 leading-tight">Your setup checklist</p>
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">2 of 6 complete</p>
          <button className="w-full py-2 bg-secondary text-white font-semibold text-xs rounded-full hover:bg-gray-800 transition-all">Finish setup</button>
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-100">
         <div className="px-4 py-2">
            <p className="text-[8px] font-extrabold uppercase text-gray-300 tracking-[0.3em]">Monkey Bio v1.0</p>
         </div>
      </div>
    </div>
  )

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] md:hidden">
            {/* Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            />
            {/* Sidebar Motion Panel */}
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] shadow-2xl overflow-hidden"
            >
              <SidebarContent />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="w-64 bg-[#f8fafc] border-r border-gray-100 hidden md:flex flex-col flex-shrink-0 relative h-full overflow-hidden">
        <SidebarContent />
      </aside>
    </>
  )
}
