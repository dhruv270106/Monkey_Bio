'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Sidebar({ userProfile }: { userProfile: any }) {
  const pathname = usePathname()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const navItems = [
    { icon: 'fi-rr-link', label: 'Links', href: '/dashboard', active: true, color: 'text-purple-500' },
    { icon: 'fi-rr-shopping-bag', label: 'Shop', href: '#' },
    { icon: 'fi-rr-palette', label: 'Design', href: '#' },
  ]

  return (
    <aside className="w-64 bg-[#f8fafc] border-r border-gray-100 hidden md:flex flex-col flex-shrink-0 relative h-screen sticky top-0">
      {/* User Selector */}
      <div className="p-6">
        <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-2xl cursor-pointer transition-all group">
          <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/10 overflow-hidden flex items-center justify-center">
            {userProfile?.avatar_url ? (
              <img src={userProfile.avatar_url} className="w-full h-full object-cover" alt="Avatar" />
            ) : (
              <i className="fi fi-rr-user text-primary text-xl"></i>
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-secondary flex items-center gap-1">
              {userProfile?.username || 'User'} <i className="fi fi-rr-angle-small-down text-gray-400"></i>
            </p>
          </div>
          <div className="p-2 text-gray-400 group-hover:text-secondary"><i className="fi fi-rr-bell w-4 h-4"></i></div>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="px-4 flex-1 space-y-1 overflow-y-auto">
        <div>
          <button className="w-full flex items-center justify-between px-4 py-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-1">
            My Linktree <i className="fi fi-rr-angle-small-up w-3 h-3"></i>
          </button>
          <div className="space-y-1">
            {navItems.map((item, i) => (
              <Link 
                key={i} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
                  item.active 
                    ? 'bg-white text-secondary font-bold shadow-sm border border-gray-100' 
                    : 'text-gray-500 font-medium hover:bg-gray-100'
                }`}
              >
                <i className={`fi ${item.icon} ${item.color || ''}`}></i>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <button className="w-full flex items-center justify-between px-4 py-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-1">
            Earn <i className="fi fi-rr-angle-small-down w-3 h-3"></i>
          </button>
          <div className="space-y-1">
            <Link href="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-500 font-medium hover:bg-gray-100 transition-all rounded-xl">
              <i className="fi fi-rr-layout-fluid w-4 h-4 mr-1"></i> Overview
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-500 font-medium hover:bg-gray-100 transition-all rounded-xl">
              <i className="fi fi-rr-dollar w-4 h-4 mr-1"></i> Earnings ($0.00)
            </Link>
          </div>
        </div>

        <div className="pt-8 text-gray-400 font-bold text-[10px] uppercase tracking-widest px-4 mb-2">Tools</div>
        <Link href="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-500 font-medium hover:bg-gray-100 transition-all rounded-xl">
          <i className="fi fi-rr-calendar w-4 h-4 mr-1"></i> Social planner
        </Link>
        <Link href="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-500 font-medium hover:bg-gray-100 transition-all rounded-xl">
          <i className="fi fi-rr-comment w-4 h-4 mr-1"></i> Auto-reply
        </Link>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-2xl transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
            <i className="fi fi-rr-exit w-4 h-4"></i>
          </div>
          Sign out
        </button>
      </div>
    </aside>
  )
}
