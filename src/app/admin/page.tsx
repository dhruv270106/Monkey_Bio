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

const stats = [
  { label: 'Total Users', value: '1,284', icon: Users, color: 'bg-blue-500', trend: '+12%', trendUp: true },
  { label: 'Active Users', value: '842', icon: UserCheck, color: 'bg-green-500', trend: '+5%', trendUp: true },
  { label: 'New Today', value: '12', icon: UserPlus, color: 'bg-orange-500', trend: '+2', trendUp: true },
  { label: 'Premium Users', value: '156', icon: Crown, color: 'bg-purple-500', trend: '+8%', trendUp: true },
  { label: 'Pending Payments', value: '4', icon: Clock, color: 'bg-yellow-500', highlight: true },
  { label: 'Approved Payments', value: '29', icon: CheckCircle2, color: 'bg-emerald-500', trend: '+15%', trendUp: true },
  { label: 'Rejected Payments', value: '2', icon: AlertCircle, color: 'bg-red-500' },
  { label: 'Total Revenue', value: '$2,480', icon: DollarSign, color: 'bg-indigo-500', trend: '+24%', trendUp: true },
  { label: 'Total Themes', value: '42', icon: Palette, color: 'bg-pink-500' },
  { label: 'Locked Themes', value: '30', icon: Lock, color: 'bg-slate-500' },
  { label: 'Unlocked Today', value: '5', icon: Unlock, color: 'bg-cyan-500' },
  { label: 'Today Logins', value: '312', icon: TrendingUp, color: 'bg-violet-500' },
]

const recentActivity = [
  { id: 1, type: 'signup', user: 'johndoe', time: '2 mins ago', detail: 'New user registered from USA' },
  { id: 2, type: 'payment', user: 'sarah_smith', time: '15 mins ago', detail: 'Uploaded proof for Pro Plan ($19)' },
  { id: 3, type: 'premium', user: 'mike_ross', time: '45 mins ago', detail: 'Premium access granted by Admin' },
  { id: 4, type: 'theme', user: 'elena_q', time: '1 hour ago', detail: 'Unlocked "Glassmorphism" theme' },
  { id: 5, type: 'login_fail', user: 'unknown', time: '2 hours ago', detail: 'Failed login attempt from IP 192.168.1.1' },
]

export default function AdminDashboard() {
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
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all group ${stat.highlight ? 'ring-2 ring-primary ring-offset-4' : ''}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center text-white shadow-lg shadow-${stat.color.split('-')[1]}-500/20 group-hover:scale-110 transition-transform`}>
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
        ))}
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
            {recentActivity.map((activity, i) => (
              <div key={activity.id} className="flex gap-4 relative">
                {i !== recentActivity.length - 1 && (
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
                <div>
                  <p className="text-xs font-bold text-secondary">
                    <span className="text-primary mr-1">@{activity.user}</span>
                    {activity.detail}
                  </p>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1 mt-1">
                    <Clock size={10} /> {activity.time}
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
