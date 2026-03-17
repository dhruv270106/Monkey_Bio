'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'

interface SidebarProps {
  userProfile: any
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export default function Sidebar({ userProfile, activeTab, onTabChange }: SidebarProps) {
  const pathname = usePathname()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [accounts, setAccounts] = useState<any[]>([])

  useEffect(() => {
    // Load accounts from localStorage
    const savedAccounts = localStorage.getItem('monkey_accounts')
    if (savedAccounts) {
      const parsed = JSON.parse(savedAccounts)
      setAccounts(parsed)
      
      // Update current account info if it's already in the list
      if (userProfile && !parsed.find((a: any) => a.id === userProfile.id)) {
        const newList = [...parsed, userProfile]
        localStorage.setItem('monkey_accounts', JSON.stringify(newList))
        setAccounts(newList)
      }
    } else if (userProfile) {
      const newList = [userProfile]
      localStorage.setItem('monkey_accounts', JSON.stringify(newList))
      setAccounts(newList)
    }
  }, [userProfile])

  const handleLogout = async () => {
    // Remove current account from the list
    const otherAccounts = accounts.filter(a => a.id !== userProfile.id)
    localStorage.setItem('monkey_accounts', JSON.stringify(otherAccounts))

    if (otherAccounts.length > 0) {
      // If there are other accounts, we just refresh of simulate switch
      // In a real app we'd need to switch tokens, for now we refresh
      // and the user will likely need to login again or we can try to
      // simulate the "automatic open" by redirecting to login with a hint
      alert(`Logging out. Switching to ${otherAccounts[0].username}...`)
      await supabase.auth.signOut()
      window.location.href = '/login'
    } else {
      await supabase.auth.signOut()
      window.location.href = '/'
    }
  }

  const addAccount = () => {
    // Redirect to login to add another account
    window.location.href = '/login?mode=add_account'
  }

  const navGroups = [
    {
      label: 'My Linktree',
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

  return (
    <aside className="w-64 bg-[#f8fafc] border-r border-gray-100 hidden md:flex flex-col flex-shrink-0 relative h-screen sticky top-0">
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
              <p className="text-sm font-bold text-secondary flex items-center gap-1">
                {userProfile?.username || 'User'} <i className={`fi fi-rr-angle-small-${isDropdownOpen ? 'up' : 'down'} pt-1 text-gray-400 transition-transform`}></i>
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => onTabChange?.('audience')}
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
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] px-3 mb-2">Accounts</p>
                  {accounts.map((acc, i) => (
                    <div 
                      key={i}
                      className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${acc.id === userProfile?.id ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                    >
                       <img src={acc.avatar_url || `https://ui-avatars.com/api/?name=${acc.username}`} className="w-8 h-8 rounded-full" />
                       <div className="flex-1">
                          <p className="text-xs font-black text-secondary">{acc.username}</p>
                          {acc.id === userProfile?.id && <p className="text-[8px] font-bold text-primary uppercase">Active now</p>}
                       </div>
                    </div>
                  ))}
               </div>
               
               <div className="border-t border-gray-50 pt-2 space-y-1">
                  <button 
                    onClick={addAccount}
                    className="w-full flex items-center gap-3 p-3 text-xs font-bold text-gray-500 hover:bg-gray-50 rounded-2xl transition-all"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center">
                      <i className="fi fi-rr-plus-small text-lg"></i>
                    </div>
                    Add account
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 p-3 text-xs font-bold text-red-500 hover:bg-red-50 rounded-2xl transition-all"
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
            <p className="px-4 py-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-1">
              {group.label}
            </p>
            <div className="space-y-1">
              {group.items.map((item, j) => {
                const isActive = activeTab === item.id
                
                const content = (
                  <>
                    <i className={`fi ${item.icon} ${item.color} ${isActive ? 'opacity-100' : 'opacity-70'}`}></i>
                    {item.label}
                  </>
                )

                const className = `w-full flex items-center gap-3 px-4 py-2.5 transition-all rounded-xl font-bold text-sm ${
                  isActive 
                    ? 'bg-white text-secondary shadow-sm border border-gray-100' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`

                if (onTabChange) {
                  return (
                    <button 
                      key={j}
                      onClick={() => onTabChange(item.id)}
                      className={className}
                    >
                      {content}
                    </button>
                  )
                }

                return (
                  <Link 
                    key={j}
                    href={`/dashboard?tab=${item.id}`}
                    className={className}
                  >
                    {content}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Checklist Card */}
      <div className="p-4 mt-auto">
        <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full border-2 border-primary/20 relative flex items-center justify-center">
              <span className="text-[10px] font-bold text-primary">33%</span>
            </div>
          </div>
          <p className="text-xs font-bold text-gray-700 leading-tight">Your setup checklist</p>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">2 of 6 complete</p>
          <button className="w-full py-2 bg-secondary text-white font-bold text-xs rounded-full hover:bg-gray-800 transition-all">Finish setup</button>
        </div>
      </div>

      {/* Sidebar Footer - Keeping it simple since Logout is in dropdown now */}
      <div className="p-4 border-t border-gray-100">
         <div className="px-4 py-2">
            <p className="text-[8px] font-black uppercase text-gray-300 tracking-[0.3em]">Monkey Bio v1.0</p>
         </div>
      </div>
    </aside>
  )
}
