'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'

interface SidebarProps {
  userProfile: any
  isOpen?: boolean
  onClose?: () => void
}

export default function Sidebar({ userProfile, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [accounts, setAccounts] = useState<any[]>([])
  const [completionPercentage, setCompletionPercentage] = useState(0)

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
    }

    // Calculate completion percentage
    calculateCompletion()
  }, [userProfile])

  const calculateCompletion = () => {
    if (!userProfile) return
    let steps = 0
    let total = 4
    if (userProfile.bio) steps++
    if (userProfile.avatar_url) steps++
    if (userProfile.links && userProfile.links.length > 0) steps++
    if (userProfile.social_links && Object.keys(userProfile.social_links).length > 0) steps++
    
    setCompletionPercentage(Math.round((steps / total) * 100))
  }

  const handleLogout = async () => {
    // Remove current account from the list
    const otherAccounts = accounts.filter(a => a.id !== userProfile.id)
    localStorage.setItem('monkey_accounts', JSON.stringify(otherAccounts))

    await supabase.auth.signOut()
    if (otherAccounts.length > 0) {
      window.location.href = '/login'
    } else {
      window.location.href = '/'
    }
  }

  const navItems = [
    { label: 'Create New Linktree', href: '/dashboard?action=create', icon: 'fi-rr-plus-small', color: 'text-primary' },
    { label: 'Account', href: '/dashboard/account', icon: 'fi-rr-user', color: 'text-blue-500' },
    { label: 'Upgrade', href: '/dashboard/billing', icon: 'fi-rr-bolt', color: 'text-yellow-500' },
    { label: 'Help Topics', href: '/dashboard/help', icon: 'fi-rr-interrogation', color: 'text-pink-500' },
    { label: 'Ask a Question', href: '/dashboard/ask', icon: 'fi-rr-comment-alt', color: 'text-orange-500' },
    { label: 'Share Feedback', href: '/dashboard/feedback', icon: 'fi-rr-smile', color: 'text-emerald-500' },
  ]

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white md:bg-[#f8fafc]">
      {/* Header with Logo */}
      <div className="p-8 pb-4">
          <Link href="/dashboard" className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center">
                <span className="text-white font-black text-sm uppercase">M</span>
             </div>
             <span className="font-extrabold text-xs uppercase tracking-widest text-secondary">Monkey Bio</span>
          </Link>
      </div>

      {/* User Selector */}
      <div className="p-6 pt-0 relative z-[110]">
        <div className="flex items-center gap-3 p-3 bg-white/50 border border-gray-100 rounded-3xl cursor-pointer transition-all group relative">
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
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-secondary flex items-center gap-1 leading-none">
                {userProfile?.username || 'User'} <i className={`fi fi-rr-angle-small-${isDropdownOpen ? 'up' : 'down'} pt-1 text-gray-400 transition-transform`}></i>
              </p>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Free Tier</p>
            </div>
          </div>
          
          {/* User Dropdown Menu */}
          {isDropdownOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="absolute top-full left-0 w-full mt-2 bg-white rounded-[32px] shadow-2xl border border-gray-50 p-2 z-[120]"
            >
               <div className="p-2 mb-2">
                  <p className="text-[9px] font-extrabold uppercase text-gray-400 tracking-[0.2em] px-3 mb-2 leading-none">Your Accounts</p>
                  {accounts.map((acc, i) => (
                    <div 
                      key={i}
                      className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${acc?.id === userProfile?.id ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                    >
                       <img src={acc?.avatar_url || `https://ui-avatars.com/api/?name=${acc?.username || 'User'}`} className="w-8 h-8 rounded-full" />
                       <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-black text-secondary truncate leading-none">{acc?.username || 'User'}</p>
                          {acc?.id === userProfile?.id && <p className="text-[8px] font-semibold text-primary uppercase mt-1 leading-none">Active</p>}
                       </div>
                    </div>
                  ))}
               </div>
               
               <div className="border-t border-gray-50 pt-2 space-y-1">
                  <button 
                    onClick={() => { window.location.href = '/login?mode=add_account' }}
                    className="w-full flex items-center gap-3 p-3 text-[10px] font-black uppercase text-gray-400 hover:bg-gray-50 rounded-2xl transition-all tracking-widest"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center">
                      <i className="fi fi-rr-plus-small text-lg"></i>
                    </div>
                    Add account
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 p-3 text-[10px] font-black uppercase text-red-500 hover:bg-red-50 rounded-2xl transition-all tracking-widest"
                  >
                    <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center">
                      <i className="fi fi-rr-exit pt-0.5"></i>
                    </div>
                    Log out
                  </button>
               </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Nav Items */}
      <nav className="px-5 flex-1 space-y-2 overflow-y-auto no-scrollbar">
        {navItems.map((item, i) => {
          const isActive = pathname === item.href
          
          return (
            <Link 
              key={i}
              href={item.href}
              onClick={onClose}
              className={`w-full flex items-center gap-4 px-5 py-3.5 transition-all rounded-2xl font-black text-[10px] uppercase tracking-[0.15em] ${
                isActive 
                  ? 'bg-white text-secondary shadow-lg border border-gray-100' 
                  : 'text-gray-400 hover:bg-gray-100 hover:text-secondary'
              }`}
            >
              <i className={`fi ${item.icon} ${item.color} ${isActive ? 'opacity-100 rotate-12' : 'opacity-70 group-hover:rotate-12'} text-base transition-transform`}></i>
              {item.label}
            </Link>
          )
        })}

        <div className="h-px bg-gray-100 mx-4 my-6 opacity-50"></div>
        
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-5 py-3.5 transition-all rounded-2xl font-black text-[10px] uppercase tracking-[0.15em] text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <i className="fi fi-rr-exit text-base opacity-70"></i>
          Logout
        </button>
      </nav>

      {/* Checklist Card */}
      <div className="p-6">
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-xl space-y-4 relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary relative">
                <span className="text-[10px] font-black">{completionPercentage}%</span>
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle 
                    cx="24" cy="24" r="20" 
                    fill="none" stroke="currentColor" strokeWidth="3" 
                    className="text-gray-50"
                  />
                  <circle 
                    cx="24" cy="24" r="20" 
                    fill="none" stroke="currentColor" strokeWidth="3" 
                    strokeDasharray={`${(completionPercentage / 100) * 126} 126`}
                    className="text-primary transition-all duration-1000"
                  />
                </svg>
              </div>
              <i className="fi fi-rr-list text-gray-200 text-xl"></i>
            </div>
            <div>
               <p className="text-xs font-black text-secondary leading-tight">Setup checklist</p>
               <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                  {completionPercentage === 100 ? '100% Completed' : `${Math.floor(completionPercentage/25)} of 4 steps complete`}
               </p>
            </div>
            {completionPercentage < 100 && (
               <Link href="/dashboard" onClick={onClose} className="block w-full mt-4 py-3 bg-secondary text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl text-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-black/20">
                  Complete Setup
               </Link>
            )}
          </div>
          
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
        </div>
      </div>

      <div className="p-6 pt-0 opacity-20 hover:opacity-50 transition-opacity">
         <p className="text-[8px] font-black uppercase text-gray-400 tracking-[0.3em] text-center">Monkey Bio v2.0</p>
      </div>
    </div>
  )

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] md:hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] shadow-2xl overflow-hidden"
            >
              <SidebarContent />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="w-72 bg-[#f8fafc] border-r border-gray-50 hidden md:flex flex-col flex-shrink-0 relative h-full overflow-hidden">
        <SidebarContent />
      </aside>
    </>
  )
}
