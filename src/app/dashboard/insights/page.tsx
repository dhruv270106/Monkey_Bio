'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Sidebar from '@/components/dashboard/Sidebar'
import { motion } from 'framer-motion'
import { APPS } from '@/data/apps'

export default function InsightsPage() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('7d')
  const [analytics, setAnalytics] = useState<any[]>([])
  const [stats, setStats] = useState([
    { label: 'Views', value: '0', trend: '0%', color: 'text-primary', icon: 'fi-rr-eye' },
    { label: 'Clicks', value: '0', trend: '0%', color: 'text-blue-500', icon: 'fi-rr-cursor' },
    { label: 'CTR', value: '0%', trend: '0%', color: 'text-purple-500', icon: 'fi-rr-chart-line-up' },
    { label: 'Revenue', value: '$0.00', trend: '0%', color: 'text-emerald-500', icon: 'fi-rr-dollar' },
  ])

  useEffect(() => {
    fetchData()
  }, [timeRange])

  const fetchData = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      window.location.href = '/login'
      return
    }

    // Get Profile
    const { data: profileData } = await supabase
      .from('monkey_bio')
      .select('*')
      .eq('id', session.user.id)
      .single()

    if (profileData) {
      setProfile(profileData)
      
      // Calculate date range
      const now = new Date()
      let startDate = new Date()
      if (timeRange === '24h') startDate.setHours(now.getHours() - 24)
      else if (timeRange === '7d') startDate.setDate(now.getDate() - 7)
      else if (timeRange === '30d') startDate.setDate(now.getDate() - 30)

      // Fetch Analytics
      const { data: analyticsData } = await supabase
        .from('analytics')
        .select('*')
        .eq('profile_id', session.user.id)
        .gte('created_at', startDate.toISOString())

      if (analyticsData) {
        setAnalytics(analyticsData)
        
        const viewsCount = analyticsData.filter(a => a.event_type === 'view').length
        const clicksCount = analyticsData.filter(a => a.event_type === 'click').length
        const ctr = viewsCount > 0 ? ((clicksCount / viewsCount) * 100).toFixed(1) : '0'

        setStats([
          { label: 'Views', value: viewsCount.toLocaleString(), trend: '+0%', color: 'text-primary', icon: 'fi-rr-eye' },
          { label: 'Clicks', value: clicksCount.toLocaleString(), trend: '+0%', color: 'text-blue-500', icon: 'fi-rr-cursor' },
          { label: 'CTR', value: `${ctr}%`, trend: '+0%', color: 'text-purple-500', icon: 'fi-rr-chart-line-up' },
          { label: 'Revenue', value: '$0.00', trend: '0%', color: 'text-emerald-500', icon: 'fi-rr-dollar' },
        ])
      }
    }
    setLoading(false)
  }

  // Group analytics by date for the chart
  const getChartData = () => {
     const last7Days = [...Array(7)].map((_, i) => {
        const d = new Date()
        d.setDate(d.getDate() - i)
        return d.toISOString().split('T')[0]
     }).reverse()

     return last7Days.map(date => ({
        date,
        views: analytics.filter(a => a.event_type === 'view' && a.created_at.startsWith(date)).length,
        clicks: analytics.filter(a => a.event_type === 'click' && a.created_at.startsWith(date)).length
     }))
  }

  const chartData = getChartData()
  const maxVal = Math.max(...chartData.map(d => Math.max(d.views, d.clicks)), 1)

  // Top Links Calculation
  const getTopLinks = () => {
    const linkCounts: Record<string, number> = {}
    analytics.filter(a => a.event_type === 'click').forEach(a => {
      if (a.link_id) linkCounts[a.link_id] = (linkCounts[a.link_id] || 0) + 1
    })
    return Object.entries(linkCounts)
      .map(([id, clicks]) => {
        const link = profile?.links?.find((l: any) => (l.id || l.title) === id)
        return { title: link?.title || id, url: link?.url || '#', platform: link?.platform, clicks }
      })
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 4)
  }

  const topLinks = getTopLinks()

  // Device Breakdown
  const deviceStats = {
    mobile: analytics.length > 0 ? Math.round((analytics.filter(a => a.device === 'mobile').length / analytics.length) * 100) : 0,
    desktop: analytics.length > 0 ? Math.round((analytics.filter(a => a.device === 'desktop').length / analytics.length) * 100) : 0,
    tablet: analytics.length > 0 ? Math.round((analytics.filter(a => a.device === 'tablet').length / analytics.length) * 100) : 0,
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-primary">
         <i className="fi fi-rr-spinner animate-spin text-3xl"></i>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        <Sidebar userProfile={profile} />

        <main className="flex-1 flex flex-col bg-white overflow-hidden">
          <div className="h-16 px-8 flex items-center justify-between bg-white border-b border-gray-50 flex-shrink-0">
             <h1 className="font-bold text-xl">Insights</h1>
             <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl">
                {['24h', '7d', '30d'].map(range => (
                  <button 
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${timeRange === range ? 'bg-white text-secondary shadow-sm' : 'text-gray-400 hover:text-secondary'}`}
                  >
                    {range.toUpperCase()}
                  </button>
                ))}
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 bg-white no-scrollbar">
            <div className="max-w-5xl mx-auto space-y-12">
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center bg-gray-50 ${stat.color}`}>
                        <i className={`fi ${stat.icon} text-lg`}></i>
                      </div>
                      <span className="text-[10px] font-black text-green-500 bg-green-50 px-2 py-1 rounded-full">{stat.trend}</span>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{stat.label}</h4>
                      <p className="text-2xl font-black text-secondary">{stat.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-[40px] p-10 border border-gray-100 flex flex-col gap-8 h-[400px]">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-black text-secondary">Activity</h3>
                    <p className="text-sm font-bold text-gray-400">Profile clicks & views</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-primary"></span> <span className="text-[10px] font-black text-gray-400">VIEWS</span></div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span> <span className="text-[10px] font-black text-gray-400">CLICKS</span></div>
                  </div>
                </div>
                
                <div className="flex-1 flex items-end justify-between gap-4 px-4 pb-4">
                   {chartData.map((d, i) => (
                     <div key={i} className="flex-1 group relative flex items-end gap-1 h-full">
                       <motion.div initial={{ height: 0 }} animate={{ height: `${(d.views/maxVal) * 100}%` }} className="flex-1 bg-primary/30 rounded-t-lg group-hover:bg-primary transition-colors relative">
                         <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-secondary text-white text-[8px] font-black px-2 py-1 rounded transition-opacity">
                           {d.views}
                         </div>
                       </motion.div>
                       <motion.div initial={{ height: 0 }} animate={{ height: `${(d.clicks/maxVal) * 100}%` }} className="flex-1 bg-blue-500/30 rounded-t-lg group-hover:bg-blue-500 transition-colors"></motion.div>
                     </div>
                   ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm flex flex-col gap-6">
                  <h3 className="text-lg font-black text-secondary">Top performing links</h3>
                  <div className="space-y-4">
                    {topLinks.map((link, i) => (
                      <div key={i} className="flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                            <i className={`fi ${APPS.find(a => a.id === link.platform)?.icon || 'fi-rr-link'} text-gray-400`}></i>
                          </div>
                          <div>
                            <h4 className="text-sm font-black text-secondary">{link.title}</h4>
                            <p className="text-[10px] font-bold text-gray-400 truncate max-w-[150px]">{link.url.replace('https://', '')}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-black text-secondary">{link.clicks}</p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Clicks</p>
                        </div>
                      </div>
                    ))}
                    {topLinks.length === 0 && <p className="text-xs text-gray-400 font-bold text-center py-10">No link clicks tracked yet</p>}
                  </div>
                </div>

                <div className="bg-[#f2f7ff] rounded-[40px] p-8 border border-[#e1ecff] flex flex-col gap-6">
                  <h3 className="text-lg font-black text-secondary">Device Breakdown</h3>
                  <div className="space-y-6">
                    {[
                      { label: 'Mobile', value: deviceStats.mobile, icon: 'fi-rr-smartphone', color: 'bg-blue-500' },
                      { label: 'Desktop', value: deviceStats.desktop, icon: 'fi-rr-computer', color: 'bg-cyan-500' },
                      { label: 'Tablet', value: deviceStats.tablet, icon: 'fi-rr-tablet', color: 'bg-indigo-500' }
                    ].map((device, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2"><i className={`fi ${device.icon} text-blue-400 text-xs`}></i><span className="text-xs font-black text-secondary/60">{device.label}</span></div>
                          <span className="text-xs font-black text-secondary">{device.value}%</span>
                        </div>
                        <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                           <motion.div initial={{ width: 0 }} animate={{ width: `${device.value}%` }} className={`h-full ${device.color}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
