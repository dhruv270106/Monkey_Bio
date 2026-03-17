'use client'

import { motion } from 'framer-motion'
import {
  Users,
  UserCheck,
  UserPlus,
  Crown,
  Clock,
  AlertCircle,
  CheckCircle2,
  DollarSign,
  Palette,
  Lock,
  Unlock,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  ShieldCheck
} from 'lucide-react'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { THEMES } from '@/data/themes'

export default function AdminDashboard() {
  const [stats, setStats] = useState<any[]>([])
  const [activities, setActivities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    setLoading(true)
    
    // 1. Fetch Users Stats
    const { data: users } = await supabase.from('monkey_bio').select('*')
    const totalUsers = users?.length || 0
    const activeUsers = users?.filter(u => u.is_active).length || 0
    const premiumUsers = users?.filter(u => u.plan_status === 'premium').length || 0
    
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const newToday = users?.filter(u => new Date(u.signup_date || u.created_at) >= today).length || 0
    
    // 2. Fetch Payments Stats
    const { data: payments } = await supabase.from('payments').select('*')
    const pendingPayments = payments?.filter(p => p.status === 'pending').length || 0
    const approvedPayments = payments?.filter(p => p.status === 'approved').length || 0
    const rejectedPayments = payments?.filter(p => p.status === 'rejected').length || 0
    const totalRevenue = payments?.filter(p => p.status === 'approved').reduce((acc, p) => acc + (Number(p.amount) || 0), 0) || 0

    // 3. Activity Feed (Last 5 users + Last 5 payments)
    const recentSignups = users?.sort((a, b) => new Date(b.signup_date || b.created_at).getTime() - new Date(a.signup_date || a.created_at).getTime()).slice(0, 5).map(u => ({
      id: `u-${u.id}`,
      type: 'signup',
      user: u.username,
      time: u.signup_date || u.created_at,
      detail: `New user registered`
    })) || []

    const recentPayments = payments?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5).map(p => ({
      id: `p-${p.id}`,
      type: 'payment',
      user: p.user_name || 'User',
      time: p.created_at,
      detail: `Uploaded proof for ${p.plan_id} ($${p.amount})`
    })) || []

    const combinedActivity = [...recentSignups, ...recentPayments]
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, 5)

    setActivities(combinedActivity)

    setStats([
      { label: 'Total Users', value: totalUsers.toLocaleString(), icon: Users, color: 'bg-blue-500', trend: '+12%', trendUp: true },
      { label: 'Active Users', value: activeUsers.toLocaleString(), icon: UserCheck, color: 'bg-green-500', trend: '+5%', trendUp: true },
      { label: 'New Today', value: newToday.toString(), icon: UserPlus, color: 'bg-orange-500', trend: `+${newToday}`, trendUp: true },
      { label: 'Premium Users', value: premiumUsers.toLocaleString(), icon: Crown, color: 'bg-purple-500', trend: '+8%', trendUp: true },
      { label: 'Pending Payments', value: pendingPayments.toString(), icon: Clock, color: 'bg-yellow-500', highlight: pendingPayments > 0 },
      { label: 'Approved Payments', value: approvedPayments.toString(), icon: CheckCircle2, color: 'bg-emerald-500', trend: '+15%', trendUp: true },
      { label: 'Rejected Payments', value: rejectedPayments.toString(), icon: AlertCircle, color: 'bg-red-500' },
      { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-indigo-500', trend: '+24%', trendUp: true },
      { label: 'Total Themes', value: THEMES.length.toString(), icon: Palette, color: 'bg-pink-500' },
      { label: 'Locked Themes', value: THEMES.filter(t => t.isPremium).length.toString(), icon: Lock, color: 'bg-slate-500' },
      { label: 'Unlocked Today', value: '0', icon: Unlock, color: 'bg-cyan-500' }, // Hard to calculate without theme_access logs
      { label: 'Today Logins', value: users?.filter(u => u.last_login && new Date(u.last_login) >= today).length.toString(), icon: TrendingUp, color: 'bg-violet-500' },
    ])
    
    setLoading(false)
  }

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const mins = Math.floor(diff / 60000)
    const hours = Math.floor(mins / 60)
    const days = Math.floor(hours / 24)

    if (mins < 60) return `${mins} mins ago`
    if (hours < 24) return `${hours} hours ago`
    return `${days} days ago`
  }
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-secondary tracking-tight">System Overview</h1>
          <p className="text-gray-400 font-medium">Real-time platform statistics and activity.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span className="text-xs font-bold text-secondary">System Online</span>
          </div>
          <button className="bg-secondary text-white px-6 py-2.5 rounded-2xl font-bold text-sm hover:shadow-lg hover:shadow-secondary/20 transition-all active:scale-95">
            Download Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          Array(8).fill(0).map((_, i) => (
            <div key={i} className="h-32 bg-white rounded-[32px] animate-pulse border border-gray-100 shadow-sm" />
          ))
        ) : (
          stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all group ${stat.highlight ? 'ring-2 ring-primary ring-offset-4' : ''}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110`}>
                  <stat.icon size={24} />
                </div>
                {stat.trend && (
                  <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full ${stat.trendUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {stat.trendUp ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                    {stat.trend}
                  </div>
                )}
              </div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-3xl font-black text-secondary mt-1">{stat.value}</h3>
            </motion.div>
          ))
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Area - Mockup */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-secondary">User Growth</h3>
              <p className="text-gray-400 text-xs font-bold">Registration activity over the last 30 days.</p>
            </div>
            <select className="bg-gray-50 border-none outline-none text-xs font-bold text-secondary px-4 py-2 rounded-xl">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>Last 12 Months</option>
            </select>
          </div>

          <div className="h-[300px] w-full bg-gray-50/50 rounded-3xl border border-dashed border-gray-200 flex items-center justify-center relative overflow-hidden">
            {/* Mockup Chart Lines */}
            <svg className="w-full h-full p-4" viewBox="0 0 800 300">
              <path
                d="M0,250 Q100,220 200,230 T400,150 T600,180 T800,50"
                fill="none"
                stroke="rgba(67, 230, 96, 0.5)"
                strokeWidth="4"
                className="animate-draw"
              />
              <path
                d="M0,280 Q100,260 200,270 T400,200 T600,230 T800,150"
                fill="none"
                stroke="rgba(30, 41, 59, 0.1)"
                strokeWidth="2"
              />
            </svg>
            <div className="absolute inset-x-0 bottom-4 px-8 flex justify-between text-[10px] font-bold text-gray-300 uppercase tracking-widest">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4</span>
            </div>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-secondary">Activity Feed</h3>
            <button className="text-primary text-xs font-bold hover:underline">View All</button>
          </div>
          <div className="space-y-6">
            {loading ? (
              Array(5).fill(0).map((_, i) => <div key={i} className="h-12 bg-gray-50 rounded-xl animate-pulse" />)
            ) : activities.length === 0 ? (
              <p className="text-center text-gray-400 py-10 font-bold">No recent activity</p>
            ) : activities.map((activity, i) => (
              <div key={activity.id} className="flex gap-4 relative">
                {i !== activities.length - 1 && (
                  <div className="absolute left-[19px] top-10 bottom-[-10px] w-px bg-gray-100"></div>
                )}
                <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center border-4 border-white shadow-sm z-10 ${activity.type === 'signup' ? 'bg-blue-500 text-white' :
                    activity.type === 'payment' ? 'bg-yellow-500 text-white' :
                    activity.type === 'premium' ? 'bg-purple-500 text-white' :
                    activity.type === 'theme' ? 'bg-pink-500 text-white' :
                    'bg-red-500 text-white'
                  }`}>
                  {activity.type === 'signup' && <UserPlus size={14} />}
                  {activity.type === 'payment' && <CreditCard size={14} />}
                  {activity.type === 'premium' && <Crown size={14} />}
                  {activity.type === 'theme' && <Palette size={14} />}
                  {activity.type === 'login_fail' && <AlertCircle size={14} />}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-secondary">
                    <span className="text-primary mr-1">@{activity.user}</span>
                    {activity.detail}
                  </p>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1 mt-1">
                    <Clock size={10} /> {formatRelativeTime(activity.time)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-primary/5 rounded-3xl border border-primary/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-secondary">
                <ShieldCheck size={16} />
              </div>
              <div>
                <p className="text-[10px] font-black text-secondary uppercase tracking-wider">Storage Usage</p>
                <div className="w-32 h-1.5 bg-gray-200 rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-primary w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
