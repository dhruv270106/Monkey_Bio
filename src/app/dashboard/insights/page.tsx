'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Sidebar from '@/components/dashboard/Sidebar'
import { motion } from 'framer-motion'
import { APPS } from '@/data/apps'

interface ActivityData {
  views: number
  clicks: number
  ctr: number
  topLinks: any[]
}

export default function InsightsPage() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('7d')

  // Shared state for a premium look
  const stats = [
    { label: 'Views', value: '1,284', trend: '+12%', color: 'text-primary', icon: 'fi-rr-eye' },
    { label: 'Clicks', value: '432', trend: '+8%', color: 'text-blue-500', icon: 'fi-rr-cursor' },
    { label: 'CTR', value: '33.6%', trend: '+4%', color: 'text-purple-500', icon: 'fi-rr-chart-line-up' },
    { label: 'Revenue', value: '$0.00', trend: '0%', color: 'text-emerald-500', icon: 'fi-rr-dollar' },
  ]

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      window.location.href = '/login'
      return
    }

    const { data: profileData } = await supabase
      .from('monkey_bio')
      .select('*')
      .eq('id', session.user.id)
      .single()

    if (profileData) {
      setProfile(profileData)
    }
    setLoading(false)
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
          {/* Toolbar */}
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
              
              {/* Top Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                  >
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

              {/* Main Activity Chart Area (Placeholder) */}
              <div className="bg-gray-50 rounded-[40px] p-10 border border-gray-100 flex flex-col gap-8 h-[400px]">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-black text-secondary">Activity</h3>
                    <p className="text-sm font-bold text-gray-400">Your profile performance over time</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-primary"></span> <span className="text-[10px] font-black text-gray-400">VIEWS</span></div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span> <span className="text-[10px] font-black text-gray-400">CLICKS</span></div>
                  </div>
                </div>
                
                {/* Visual Chart Placeholder */}
                <div className="flex-1 flex items-end justify-between gap-4 px-4 pb-4">
                   {[40, 60, 45, 90, 65, 80, 50, 70, 40, 85, 95, 60].map((h, i) => (
                     <div key={i} className="flex-1 group relative flex items-end gap-1 h-full">
                       <motion.div 
                         initial={{ height: 0 }} 
                         animate={{ height: `${h}%` }}
                         className="flex-1 bg-primary/20 rounded-t-lg group-hover:bg-primary transition-colors relative"
                       >
                         <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-secondary text-white text-[8px] font-black px-2 py-1 rounded transition-opacity">
                           {h * 10}
                         </div>
                       </motion.div>
                       <motion.div 
                         initial={{ height: 0 }} 
                         animate={{ height: `${h/2}%` }}
                         className="flex-1 bg-blue-500/20 rounded-t-lg group-hover:bg-blue-500 transition-colors"
                       ></motion.div>
                     </div>
                   ))}
                </div>
                <div className="flex justify-between px-2 text-[10px] font-black text-gray-300 uppercase tracking-widest">
                   <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Top Performing Links */}
                <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-secondary">Top performing links</h3>
                    <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">View all</button>
                  </div>
                  <div className="space-y-4">
                    {profile?.links?.slice(0, 4).map((link: any, i: number) => (
                      <div key={i} className="flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                            <i className={`fi ${APPS.find(a => a.id === link.platform)?.icon || 'fi-rr-link'} text-gray-400`}></i>
                          </div>
                          <div>
                            <h4 className="text-sm font-black text-secondary group-hover:text-primary transition-colors">{link.title}</h4>
                            <p className="text-[10px] font-bold text-gray-400 truncate max-w-[150px]">{link.url.replace('https://', '')}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-black text-secondary">{Math.floor(Math.random() * 200) + 50}</p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Clicks</p>
                        </div>
                      </div>
                    ))}
                    {!profile?.links?.length && (
                      <p className="text-xs text-gray-400 font-bold text-center py-10">Add links to your profile to see stats</p>
                    )}
                  </div>
                </div>

                {/* Device & Location Breakdown */}
                <div className="bg-[#f2f7ff] rounded-[40px] p-8 border border-[#e1ecff] flex flex-col gap-6">
                  <h3 className="text-lg font-black text-secondary">Device Breakdown</h3>
                  <div className="space-y-6">
                    {[
                      { label: 'Mobile', value: 78, icon: 'fi-rr-smartphone', color: 'bg-blue-500' },
                      { label: 'Desktop', value: 18, icon: 'fi-rr-computer', color: 'bg-cyan-500' },
                      { label: 'Tablet', value: 4, icon: 'fi-rr-tablet', color: 'bg-indigo-500' }
                    ].map((device, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <i className={`fi ${device.icon} text-blue-400 text-xs`}></i>
                            <span className="text-xs font-black text-secondary/60">{device.label}</span>
                          </div>
                          <span className="text-xs font-black text-secondary">{device.value}%</span>
                        </div>
                        <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${device.value}%` }}
                             className={`h-full ${device.color}`}
                           />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-6 border-t border-blue-100">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xs font-black text-secondary uppercase tracking-widest opacity-40">Top Referral</h4>
                      <span className="text-xs font-black text-blue-500">Instagram (42%)</span>
                    </div>
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
