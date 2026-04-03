'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Sidebar from '@/components/dashboard/Sidebar'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MousePointer2, 
  Globe, 
  Smartphone, 
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Layers,
  Map,
  Clock,
  ExternalLink
} from 'lucide-react'

function InsightsContent() {
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
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
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-primary">
        <i className="fi fi-rr-spinner animate-spin text-3xl"></i>
      </div>
    )
  }

  return (
    <div className="h-[100dvh] flex flex-col lg:flex-row overflow-hidden bg-[#fafafa]">
      <Sidebar 
        userProfile={profile} 
        activeMainTab="insights" 
        onMainTabChange={(tab) => {
          if (tab === 'monkeybio') router.push('/dashboard')
          else if (tab === 'audience') router.push('/dashboard/audience')
          else if (tab === 'tools') router.push('/dashboard?tab=tools')
          else if (tab === 'user') router.push('/dashboard?tab=user')
          else if (tab === 'settings') router.push('/dashboard?tab=account')
        }} 
      />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 flex items-center justify-between px-8 bg-white border-b border-gray-100 z-10 shrink-0">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <BarChart3 size={20} />
             </div>
             <div>
                <h1 className="text-xl font-black text-secondary tracking-tight">Analytics Insights</h1>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mt-0.5">Deep performance metrics</p>
             </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl flex items-center gap-3">
                <Calendar size={14} className="text-gray-400" />
                <span className="text-[10px] font-bold text-gray-400 select-none">Last 30 Days</span>
                <i className="fi fi-rr-angle-small-down text-[10px] text-gray-400"></i>
             </div>
             <button className="px-6 py-2.5 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-black/10">
                Advanced Report
             </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-10 no-scrollbar space-y-10 pb-32">
           {/* Top Stats */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Views', value: '12,482', change: '+18%', icon: <Users size={20} />, color: 'blue' },
                { label: 'Link Clicks', value: '4,103', change: '+24%', icon: <MousePointer2 size={20} />, color: 'purple' },
                { label: 'Conversion Rate', value: '32.8%', change: '+5%', icon: <TrendingUp size={20} />, color: 'green' },
                { label: 'Avg. Sesion', value: '1m 24s', change: '-2%', icon: <Clock size={20} />, color: 'orange' },
              ].map((stat, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
                >
                   <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        stat.color === 'blue' ? 'bg-blue-50 text-blue-500' :
                        stat.color === 'purple' ? 'bg-purple-50 text-purple-500' :
                        stat.color === 'green' ? 'bg-green-50 text-green-500' :
                        'bg-orange-50 text-orange-500'
                      }`}>
                         {stat.icon}
                      </div>
                      <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${
                        stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                      }`}>
                         {stat.change.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                         {stat.change}
                      </div>
                   </div>
                   <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] mb-1">{stat.label}</p>
                   <h3 className="text-3xl font-black text-secondary group-hover:text-primary transition-colors">{stat.value}</h3>
                </motion.div>
              ))}
           </div>

           {/* Main Charts Mockup */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-10 rounded-[50px] border border-gray-100 shadow-sm space-y-8">
                 <div className="flex items-center justify-between">
                    <h4 className="text-xl font-black text-secondary">Traffic Overview</h4>
                    <div className="flex gap-2">
                       <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          <span className="text-[9px] font-black uppercase text-gray-400">Views</span>
                       </div>
                       <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span className="text-[9px] font-black uppercase text-gray-400">Clicks</span>
                       </div>
                    </div>
                 </div>
                 
                 {/* Visual Chart Placeholder */}
                 <div className="h-[300px] w-full bg-gray-50 rounded-[40px] flex items-end justify-between px-10 pb-8 gap-4 overflow-hidden group">
                    {[40, 70, 45, 90, 65, 80, 55, 95, 75, 85, 60, 50].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-3">
                         <div 
                           className="w-full bg-primary/20 rounded-t-xl group-hover:bg-primary/40 transition-all" 
                           style={{ height: `${h}%` }}
                         ></div>
                         <span className="text-[8px] font-black text-gray-300">{(i+1)*2}h</span>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="bg-white p-10 rounded-[50px] border border-gray-100 shadow-sm space-y-8">
                 <div className="flex items-center justify-between">
                    <h4 className="text-xl font-black text-secondary">Geography</h4>
                    <Map size={18} className="text-gray-300" />
                 </div>
                 
                 <div className="space-y-6">
                    {[
                      { country: 'India', flag: '🇮🇳', pct: 64, color: 'bg-green-500' },
                      { country: 'United States', flag: '🇺🇸', pct: 18, color: 'bg-blue-500' },
                      { country: 'United Kingdom', flag: '🇬🇧', pct: 9, color: 'bg-orange-500' },
                      { country: 'Others', flag: '🌍', pct: 9, color: 'bg-gray-300' },
                    ].map((loc, i) => (
                      <div key={i} className="space-y-2">
                         <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-secondary">
                            <span className="flex items-center gap-3">{loc.flag} {loc.country}</span>
                            <span>{loc.pct}%</span>
                         </div>
                         <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${loc.pct}%` }}
                              transition={{ duration: 1, delay: i * 0.1 }}
                              className={`h-full ${loc.color}`} 
                            />
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Referrer & Device */}
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-[#1e293b] p-10 rounded-[50px] shadow-2xl relative overflow-hidden group col-span-1 lg:col-span-2">
                 <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                       <h4 className="text-white font-black text-2xl">Top Referrers</h4>
                       <div className="space-y-4">
                          {[
                            { name: 'Instagram', val: '2.4k', icon: 'fi-brands-instagram' },
                            { name: 'Direct Links', val: '1.8k', icon: 'fi-rr-link' },
                            { name: 'Twitter (X)', val: '920', icon: 'fi-brands-twitter' },
                          ].map((ref, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                               <div className="flex items-center gap-3">
                                  <i className={`fi ${ref.icon} text-white/40`}></i>
                                  <span className="text-[11px] font-black uppercase tracking-widest text-white/90">{ref.name}</span>
                               </div>
                               <span className="text-[11px] font-black text-white/40">{ref.val}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                    <div className="space-y-6">
                       <h4 className="text-white font-black text-2xl">Social Engagement</h4>
                       <div className="p-8 bg-primary/10 rounded-[40px] border border-primary/20 text-center space-y-4">
                          <p className="text-[10px] font-black uppercase text-primary tracking-[0.3em]">Viral Coefficient</p>
                          <h3 className="text-5xl font-black text-white">1.24</h3>
                          <p className="text-xs font-bold text-white/40 leading-relaxed">Your profile is being shared 1.2x more than average users.</p>
                       </div>
                    </div>
                 </div>
                 <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -mr-32 -mt-32"></div>
              </div>

              <div className="bg-white p-10 rounded-[50px] border border-gray-100 shadow-sm space-y-8">
                 <h4 className="text-xl font-black text-secondary">Device Split</h4>
                 <div className="flex flex-col items-center gap-8">
                    <div className="relative w-40 h-40">
                       <svg className="w-full h-full transform -rotate-90">
                          <circle cx="80" cy="80" r="70" fill="transparent" stroke="#f3f4f6" strokeWidth="12" />
                          <circle cx="80" cy="80" r="70" fill="transparent" stroke="#502274" strokeWidth="12" strokeDasharray="440" strokeDashoffset="88" strokeLinecap="round" />
                          <circle cx="80" cy="80" r="70" fill="transparent" stroke="#3b82f6" strokeWidth="12" strokeDasharray="440" strokeDashoffset="352" strokeLinecap="round" />
                       </svg>
                       <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <Smartphone size={24} className="text-secondary/20 mb-1" />
                          <span className="text-xl font-black text-secondary">82%</span>
                          <span className="text-[8px] font-black uppercase text-gray-300">Mobile</span>
                       </div>
                    </div>
                    
                    <div className="w-full space-y-3">
                       <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-secondary">
                          <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-primary"></div>
                             <span>Mobile</span>
                          </div>
                          <span>82%</span>
                       </div>
                       <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-secondary">
                          <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                             <span>Desktop</span>
                          </div>
                          <span>15%</span>
                       </div>
                       <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-secondary">
                          <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                             <span>Tablet</span>
                          </div>
                          <span>3%</span>
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

export default function InsightsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white text-primary">
        <i className="fi fi-rr-spinner animate-spin text-3xl"></i>
      </div>
    }>
      <InsightsContent />
    </Suspense>
  )
}
