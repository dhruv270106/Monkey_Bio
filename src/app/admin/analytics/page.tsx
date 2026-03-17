'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Users, 
  MousePointer2, 
  Eye, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter,
  Download,
  Calendar,
  Layers,
  Globe,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react'

// Mock data for charts
const stats = [
  { label: 'Total Page Views', value: '458.2K', change: '+12.5%', trend: 'up', icon: Eye, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Unique Visitors', value: '124.8K', change: '+8.2%', trend: 'up', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Average CTR', value: '24.3%', change: '-2.1%', trend: 'down', icon: MousePointer2, color: 'text-orange-600', bg: 'bg-orange-50' },
  { label: 'Conversion Rate', value: '12.8%', change: '+4.3%', trend: 'up', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
]

const recentStats = [
  { name: 'Monday', views: 42000, clicks: 8400 },
  { name: 'Tuesday', views: 38000, clicks: 7600 },
  { name: 'Wednesday', views: 52000, clicks: 12400 },
  { name: 'Thursday', views: 48000, clicks: 9600 },
  { name: 'Friday', views: 61000, clicks: 15200 },
  { name: 'Saturday', views: 72000, clicks: 18000 },
  { name: 'Sunday', views: 68000, clicks: 16500 },
]

const topThemes = [
  { name: 'Mesh Candy', users: '12.4K', growth: '+15%', color: 'bg-[#ff7eb3]' },
  { name: 'Northern Lights', users: '9.2K', growth: '+8%', color: 'bg-black' },
  { name: 'Cyber City', users: '8.1K', growth: '+22%', color: 'bg-[#0f172a]' },
  { name: 'Deep Forest', users: '7.5K', growth: '+12%', color: 'bg-[#064e3b]' },
]

const devices = [
  { type: 'Mobile', value: '72%', icon: Smartphone, color: 'bg-green-500' },
  { type: 'Desktop', value: '22%', icon: Monitor, color: 'bg-blue-500' },
  { type: 'Tablet', value: '6%', icon: Tablet, color: 'bg-orange-500' },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d')

  return (
    <div className="space-y-8 pb-12">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-secondary">Platform Analytics</h1>
          <p className="text-gray-400 font-medium">Deep insights into user behavior and growth.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white rounded-xl p-1 border border-gray-100 shadow-sm">
            {['24h', '7d', '30d', '1y'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  timeRange === range ? 'bg-secondary text-white shadow-md' : 'text-gray-400 hover:text-secondary'
                }`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>
          <button className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-secondary shadow-sm transition-all">
            <Filter size={18} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-secondary font-bold text-sm rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110`}>
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-black px-2 py-1 rounded-lg ${
                stat.trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
              }`}>
                {stat.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.change}
              </div>
            </div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-3xl font-black text-secondary mt-1">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Growth Chart Mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm flex flex-col"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-secondary">Engagement Over Time</h3>
              <p className="text-sm font-bold text-gray-400">Page views vs Clicks</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <span className="text-xs font-bold text-gray-500">Views</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
                <span className="text-xs font-bold text-gray-500">Clicks</span>
              </div>
            </div>
          </div>

          <div className="flex-1 min-h-[300px] flex items-end justify-between gap-4">
            {recentStats.map((data, i) => (
              <div key={i} className="flex-1 flex flex-col items-center group">
                <div className="w-full flex items-end justify-center gap-1 h-[250px]">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.views / 80000) * 100}%` }}
                    className="w-1/2 bg-blue-100 rounded-t-lg group-hover:bg-blue-200 transition-colors"
                  />
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.clicks / 80000) * 100 * 3}%` }}
                    className="w-1/2 bg-primary/40 rounded-t-lg group-hover:bg-primary/60 transition-colors"
                  />
                </div>
                <span className="mt-4 text-[10px] font-bold text-gray-400 uppercase">{data.name.slice(0, 3)}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Device Distribution */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-secondary rounded-[40px] p-8 shadow-2xl text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 opacity-10">
            <Globe size={200} className="translate-x-1/2 -translate-y-1/2" />
          </div>
          
          <h3 className="text-xl font-black mb-2 relative z-10">Device Traffic</h3>
          <p className="text-white/50 text-sm font-bold mb-8 relative z-10">Where your users browse from</p>

          <div className="space-y-6 relative z-10">
            {devices.map((device, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between text-sm font-bold">
                  <div className="flex items-center gap-2">
                    <device.icon size={16} />
                    <span>{device.type}</span>
                  </div>
                  <span>{device.value}</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: device.value }}
                    className={`h-full ${device.color}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
            <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Pro Tip</p>
            <p className="text-sm font-medium leading-relaxed">
              Mobile traffic has increased by <span className="text-primary font-bold">18%</span> this month. Focus on mobile-first themes.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Popular Themes */}
        <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-secondary">Trending Themes</h3>
            <button className="text-xs font-black text-primary uppercase tracking-tighter hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {topThemes.map((theme, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-3xl hover:bg-gray-50 transition-all group">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl ${theme.color} shadow-lg shadow-black/10`} />
                  <div>
                    <p className="font-bold text-secondary">{theme.name}</p>
                    <p className="text-xs font-bold text-gray-400">{theme.users} active users</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-green-500 font-bold text-sm">
                  <ArrowUpRight size={14} />
                  {theme.growth}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Browser Stats Table */}
        <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm">
          <h3 className="text-xl font-black text-secondary mb-8">Top Browsers</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                  <th className="pb-4 px-2">Browser</th>
                  <th className="pb-4 px-2">Users</th>
                  <th className="pb-4 px-2">Bounce Rate</th>
                  <th className="pb-4 px-2">Session Duration</th>
                </tr>
              </thead>
              <tbody className="text-sm font-bold text-secondary">
                {[
                  { name: 'Chrome', users: '64.2K', bounce: '24%', duration: '2m 45s' },
                  { name: 'Safari', users: '28.1K', bounce: '18%', duration: '3m 12s' },
                  { name: 'Firefox', users: '12.4K', bounce: '32%', duration: '2m 10s' },
                  { name: 'Edge', users: '8.9K', bounce: '28%', duration: '2m 20s' },
                ].map((browser, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-2">{browser.name}</td>
                    <td className="py-4 px-2">{browser.users}</td>
                    <td className="py-4 px-2">{browser.bounce}</td>
                    <td className="py-4 px-2 text-gray-400 font-medium">{browser.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
