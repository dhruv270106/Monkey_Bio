'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { 
  Activity, 
  Search, 
  Filter, 
  Clock, 
  User, 
  Globe, 
  Monitor, 
  Smartphone, 
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  UserPlus,
  LogIn,
  LogOut,
  CreditCard,
  Palette,
  ChevronLeft,
  ChevronRight,
  Terminal
} from 'lucide-react'

interface LogEntry {
  id: string
  user_id: string
  user_name: string
  user_username: string
  event_type: string
  description: string
  ip: string
  device: string
  browser: string
  created_at: string
}

const iconMap: Record<string, any> = {
  signup: UserPlus,
  login: LogIn,
  logout: LogOut,
  payment: CreditCard,
  theme: Palette,
  security: ShieldAlert,
  admin: ShieldCheck,
  default: Terminal
}

const colorMap: Record<string, string> = {
  signup: 'bg-blue-500',
  login: 'bg-green-500',
  logout: 'bg-gray-500',
  payment: 'bg-yellow-500',
  theme: 'bg-purple-500',
  security: 'bg-red-500',
  admin: 'bg-indigo-500',
  default: 'bg-slate-500'
}

export default function ActivityLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchLogs()
  }, [])

  const fetchLogs = async () => {
    setLoading(true)
    const { data } = await supabase.from('activity_logs').select('*').order('created_at', { ascending: false }).limit(50)
    
    if (data && data.length > 0) {
      setLogs(data)
    } else {
      // Mock data
      setLogs([
        { id: '1', user_id: 'u1', user_name: 'John Doe', user_username: 'johndoe', event_type: 'login', description: 'Successful login from Chrome/Windows', ip: '192.168.1.5', device: 'Desktop', browser: 'Chrome', created_at: new Date().toISOString() },
        { id: '2', user_id: 'u2', user_name: 'Sarah Smith', user_username: 'sarah_s', event_type: 'payment', description: 'Manual payment proof uploaded for Yearly Plan', ip: '45.12.33.1', device: 'Mobile', browser: 'Safari', created_at: new Date(Date.now() - 3600000).toISOString() },
        { id: '3', user_id: 'u3', user_name: 'Mike Ross', user_username: 'mike', event_type: 'security', description: 'Failed password attempt (3 times)', ip: '103.44.1.2', device: 'Desktop', browser: 'Firefox', created_at: new Date(Date.now() - 7200000).toISOString() },
        { id: '4', user_id: 'u4', user_name: 'Elena Q', user_username: 'elena', event_type: 'theme', description: 'Changed theme to "Glassmorphism"', ip: '182.55.12.9', device: 'Mobile', browser: 'Chrome', created_at: new Date(Date.now() - 86400000).toISOString() },
        { id: '5', user_id: 'u5', user_name: 'Admin', user_username: 'admin', event_type: 'admin', description: 'Verified payment for user Sarah Smith', ip: '127.0.0.1', device: 'Desktop', browser: 'Brave', created_at: new Date(Date.now() - 90000000).toISOString() },
      ])
    }
    setLoading(false)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-secondary tracking-tight">Activity Logs</h1>
          <p className="text-gray-400 font-medium">Platform-wide audit trail of all user and admin actions.</p>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search logs, IPs, users..." 
                className="pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none w-80 font-medium text-xs focus:ring-2 focus:ring-primary/20 transition-all" 
              />
           </div>
           <button className="p-3 bg-white border border-gray-100 rounded-2xl shadow-sm text-gray-400 hover:text-secondary transition-all">
             <Filter size={20} />
           </button>
        </div>
      </div>

      {/* Logs Timeline */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-50">
                     <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest min-w-[200px]">Timestamp & Actor</th>
                     <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Event Type</th>
                     <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest min-w-[300px]">Description</th>
                     <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Client Data</th>
                     <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Details</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {loading ? (
                    Array(8).fill(0).map((_, i) => <tr key={i} className="animate-pulse"><td colSpan={5} className="px-8 py-8"><div className="h-4 bg-gray-50 rounded-full w-full"></div></td></tr>)
                  ) : (
                    logs.map((log) => {
                      const Icon = iconMap[log.event_type] || iconMap.default
                      const color = colorMap[log.event_type] || colorMap.default
                      return (
                        <tr key={log.id} className="hover:bg-gray-50/50 transition-all group">
                           <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                 <div className="flex flex-col">
                                    <span className="text-xs font-black text-secondary whitespace-nowrap">{new Date(log.created_at).toLocaleString()}</span>
                                    <div className="flex items-center gap-2 mt-1">
                                      <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                                        <User size={10} className="text-gray-400" />
                                      </div>
                                      <span className="text-[10px] font-bold text-primary uppercase tracking-wider">@{log.user_username}</span>
                                    </div>
                                 </div>
                              </div>
                           </td>
                           <td className="px-6 py-6">
                              <div className="flex items-center gap-2">
                                 <div className={`w-8 h-8 rounded-xl ${color} text-white flex items-center justify-center shadow-lg shadow-gray-200`}>
                                    <Icon size={14} />
                                 </div>
                                 <span className="text-[10px] font-black uppercase tracking-widest text-secondary">{log.event_type}</span>
                              </div>
                           </td>
                           <td className="px-6 py-6">
                              <p className="text-sm font-bold text-secondary max-w-sm">{log.description}</p>
                           </td>
                           <td className="px-6 py-6">
                              <div className="flex flex-col gap-2">
                                 <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                                    <Globe size={10} /> {log.ip}
                                 </div>
                                 <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                                    {log.device === 'Mobile' ? <Smartphone size={10} /> : <Monitor size={10} />}
                                    {log.browser} / {log.device}
                                 </div>
                              </div>
                           </td>
                           <td className="px-8 py-6 text-right">
                              <button className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-secondary hover:border-primary/30 transition-all shadow-sm">
                                 JSON <ArrowRight size={10} className="inline ml-1" />
                              </button>
                           </td>
                        </tr>
                      )
                    })
                  )}
               </tbody>
            </table>
         </div>

         {/* Pagination */}
         <div className="p-8 border-t border-gray-50 flex items-center justify-between bg-gray-50/20">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Data retention: <span className="text-secondary font-black">90 Days</span></p>
            <div className="flex items-center gap-4">
               <button className="flex items-center gap-2 text-xs font-black text-gray-400 hover:text-secondary transition-all">
                  <ChevronLeft size={16} /> Older Logs
               </button>
               <div className="h-4 w-px bg-gray-200"></div>
               <button className="flex items-center gap-2 text-xs font-black text-secondary hover:text-primary transition-all">
                  Newer Logs <ChevronRight size={16} />
               </button>
            </div>
         </div>
      </div>
    </div>
  )
}
