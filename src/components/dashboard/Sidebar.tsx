'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface SidebarProps {
  userProfile: any
}

export default function Sidebar({ userProfile }: SidebarProps) {
  const pathname = usePathname()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const navGroups = [
    {
      label: 'My Linktree',
      items: [
        { label: 'Links', href: '/dashboard', icon: 'fi-rr-link', color: 'text-purple-500' },
        { label: 'Shop', href: '#', icon: 'fi-rr-shopping-bag', color: 'text-blue-500' },
        { label: 'Design', href: '/design', icon: 'fi-rr-palette', color: 'text-pink-500' },
      ]
    },
    {
      label: 'Earn',
      items: [
        { label: 'Overview', href: '#', icon: 'fi-rr-layout-fluid', color: 'text-green-500' },
        { label: 'Earnings ($0.00)', href: '#', icon: 'fi-rr-dollar', color: 'text-emerald-500' },
      ]
    },
    {
      label: 'Analytics',
      items: [
        { label: 'Audience', href: '#', icon: 'fi-rr-users', color: 'text-orange-500' },
        { label: 'Insights', href: '#', icon: 'fi-rr-stats', color: 'text-cyan-500' },
      ]
    }
  ]

  return (
    <aside className="w-64 bg-[#f8fafc] border-r border-gray-100 hidden md:flex flex-col flex-shrink-0 relative h-screen sticky top-0">
      {/* User Selector */}
      <div className="p-6">
        <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-2xl cursor-pointer transition-all group">
          <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/10 overflow-hidden flex items-center justify-center">
            {userProfile?.avatar_url ? (
              <img src={userProfile.avatar_url} alt="" className="w-full h-full object-cover" />
            ) : (
              <i className="fi fi-rr-user text-primary"></i>
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-secondary flex items-center gap-1">
              {userProfile?.username || 'User'} <i className="fi fi-rr-angle-small-down pt-1 text-gray-400"></i>
            </p>
          </div>
          <div className="p-2 text-gray-400 group-hover:text-secondary"><i className="fi fi-rr-bell text-sm"></i></div>
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
                const isActive = pathname === item.href
                return (
                  <Link 
                    key={j}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-2.5 transition-all rounded-xl font-bold text-sm ${
                      isActive 
                        ? 'bg-white text-secondary shadow-sm border border-gray-100' 
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    <i className={`fi ${item.icon} ${item.color} ${isActive ? 'opacity-100' : 'opacity-70'}`}></i>
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}

        <div className="pt-4">
          <p className="px-4 py-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-1">Tools</p>
          <div className="space-y-1">
            <Link href="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-500 font-medium hover:bg-gray-100 transition-all rounded-xl text-sm">
                <i className="fi fi-rr-calendar opacity-70"></i> Social planner
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-500 font-medium hover:bg-gray-100 transition-all rounded-xl text-sm">
                <i className="fi fi-rr-comment-alt opacity-70"></i> Auto-reply
            </Link>
          </div>
        </div>
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

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-100">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-2xl transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
            <i className="fi fi-rr-exit"></i>
          </div>
          Sign out
        </button>
      </div>
    </aside>
  )
}
