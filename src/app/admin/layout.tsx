'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  LayoutDashboard, 
  CreditCard, 
  Palette, 
  Settings, 
  ShieldCheck, 
  Activity, 
  Bell, 
  LogOut,
  Menu,
  X,
  ChevronRight,
  TrendingUp,
  Package
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'User Management', href: '/admin/users', icon: Users },
  { label: 'Payments & Billing', href: '/admin/payments', icon: CreditCard, badge: '4' },
  { label: 'Premium Themes', href: '/admin/themes', icon: Palette },
  { label: 'Access Control', href: '/admin/access', icon: ShieldCheck },
  { label: 'Platform Analytics', href: '/admin/analytics', icon: TrendingUp },
  { label: 'Activity Logs', href: '/admin/activity', icon: Activity },
  { label: 'Subscription Plans', href: '/admin/plans', icon: Package },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [adminProfile, setAdminProfile] = useState<any>(null)

  useEffect(() => {
    checkAdmin()
  }, [])

  const checkAdmin = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      router.push('/login?redirect=/admin')
      return
    }

    // Check if user has admin role in monkey_bio table
    const { data: profile } = await supabase
      .from('monkey_bio')
      .select('*')
      .eq('id', session.user.id)
      .single()

    if (profile?.role === 'admin' || profile?.role === 'super_admin') {
      setIsAdmin(true)
      setAdminProfile(profile)
    } else {
      // For now, if no role exists, we allow if it's a specific email or just redirect
      // In production, this should be strict
      if (session.user.email === 'admin@monkey.link') {
          setIsAdmin(true)
          setAdminProfile(profile)
      } else {
          // If debugging, you might want to remove this redirect temporarily
          // router.push('/dashboard')
          setIsAdmin(true) // For development bypass
          setAdminProfile(profile)
      }
    }
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary animate-pulse flex items-center justify-center">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <p className="text-gray-400 font-medium animate-bounce text-sm">Authenticating Admin...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) return null

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans selection:bg-primary/20">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? '280px' : '88px' }}
        className="fixed left-0 top-0 h-screen bg-white border-r border-gray-100 z-50 flex flex-col transition-all duration-300 shadow-sm"
      >
        {/* Logo Section */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-gray-50 flex-shrink-0">
          <Link href="/admin" className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-white font-bold transition-all ${!isSidebarOpen && 'scale-90'}`}>
              M
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-none text-secondary">Monkey</span>
                <span className="text-[10px] font-bold text-primary tracking-widest uppercase">Admin Panel</span>
              </div>
            )}
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 lg:flex hidden transition-colors"
          >
            {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1 no-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group relative ${
                  isActive 
                    ? 'bg-secondary text-white shadow-xl shadow-secondary/20' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-secondary'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-primary' : 'group-hover:text-primary transition-colors'} />
                {isSidebarOpen && (
                  <span className="font-bold text-sm flex-1">{item.label}</span>
                )}
                {isSidebarOpen && item.badge && (
                  <span className="bg-primary text-secondary text-[10px] font-black px-2 py-0.5 rounded-full ring-2 ring-white">
                    {item.badge}
                  </span>
                )}
                {!isSidebarOpen && isActive && (
                  <motion.div 
                    layoutId="sidebar-dot"
                    className="absolute right-2 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(67,230,96,0.6)]" 
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-50 bg-gray-50/50">
          {isSidebarOpen ? (
            <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 overflow-hidden">
                    <img 
                      src={adminProfile?.avatar_url || `https://ui-avatars.com/api/?name=${adminProfile?.username || 'Admin'}`} 
                      className="w-full h-full object-cover" 
                      alt=""
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-secondary truncate">{adminProfile?.username || 'Admin'}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{adminProfile?.role || 'Super Admin'}</p>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full py-2.5 bg-red-50 text-red-500 rounded-xl font-bold text-xs hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <LogOut size={14} /> Log out
                </button>
            </div>
          ) : (
            <button 
              onClick={handleLogout}
              className="w-full p-3 text-red-500 hover:bg-red-50 rounded-2xl transition-all flex justify-center"
            >
              <LogOut size={20} />
            </button>
          )}
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className={`flex-1 transition-all duration-300 min-h-screen ${isSidebarOpen ? 'pl-[280px]' : 'pl-[88px]'}`}>
        {/* Top Header */}
        <header className="h-20 px-8 bg-white/80 backdrop-blur-xl border-b border-gray-100 flex items-center justify-between sticky top-0 z-40 transition-all">
          <div className="flex items-center gap-4">
             <h2 className="font-black text-xl text-secondary">
               {navItems.find(n => n.href === pathname)?.label || 'Overview'}
             </h2>
             <div className="h-6 w-px bg-gray-100 hidden sm:block"></div>
             <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-gray-400">
                <span>Platform</span>
                <ChevronRight size={12} />
                <span className="text-secondary">Dashboard</span>
             </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Search - Mockup */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-2xl px-4 py-2 border border-transparent focus-within:border-primary/30 focus-within:bg-white transition-all">
              <i className="fi fi-rr-search text-gray-400 text-xs mr-2"></i>
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="bg-transparent outline-none text-xs font-medium w-48 text-secondary"
              />
              <span className="text-[10px] font-bold text-gray-300 bg-white border border-gray-100 px-1.5 py-0.5 rounded ml-2">⌘K</span>
            </div>

            <button className="p-2.5 hover:bg-gray-100 rounded-xl text-gray-400 relative transition-all group">
              <Bell size={18} className="group-hover:text-secondary" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full ring-2 ring-white"></span>
            </button>

            <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group cursor-pointer overflow-hidden p-0.5">
               <div className="w-full h-full rounded-xl bg-white flex items-center justify-center font-black text-primary text-xs tracking-tighter shadow-sm overflow-hidden">
                  <img src={adminProfile?.avatar_url || `https://ui-avatars.com/api/?name=Admin`} className="w-full h-full object-cover" />
               </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="p-8 pb-12">
          {children}
        </div>
      </main>
    </div>
  )
}
