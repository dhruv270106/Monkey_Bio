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
  Terminal,
  RefreshCcw
} from 'lucide-react'

interface LogEntry {
  id: string
  user_id: string
  event_type: string
  description: string
  ip_address?: string
  device_info?: string
  created_at: string
  user_profiles?: {
    username: string
    display_name: string
  }
}

const iconMap: Record<string, any> = {
  signup: UserPlus,
  login: LogIn,
  logout: LogOut,
  payment_approved: CreditCard,
  payment_rejected: XCircle,
  theme_change: Palette,
  security_alert: ShieldAlert,
  admin_action: ShieldCheck,
  default: Terminal
}

import { XCircle } from 'lucide-react'

const colorMap: Record<string, string> = {
  signup: 'bg-blue-500',
  login: 'bg-green-500',
  logout: 'bg-gray-500',
  payment_approved: 'bg-emerald-500',
  payment_rejected: 'bg-red-500',
  theme_change: 'bg-purple-500',
  security_alert: 'bg-orange-500',
  admin_action: 'bg-indigo-500',
  default: 'bg-slate-500'
}

export default function ActivityLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(0)
  const pageSize = 20

  useEffect(() => {
    fetchLogs()
  }, [page])

  const fetchLogs = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('activity_logs')
      .select(`
        *,
        user_profiles:monkey_bio(username, display_name)
      `)
      .order('created_at', { ascending: false })
      .range(page * pageSize, (page + 1) * pageSize - 1)
    
    if (data) {
      setLogs(data)
    }
    setLoading(false)
  }

  const filteredLogs = logs.filter(log => 
    log.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.user_profiles?.username?.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
                placeholder="Search logs..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none w-80 font-medium text-xs focus:ring-2 focus:ring-primary/20 transition-all" 
              />
           </div>
           <button onClick={fetchLogs} className="p-3 bg-white border border-gray-100 rounded-2xl shadow-sm text-gray-400 hover:text-secondary transition-all">
             <RefreshCcw size={20} className={loading ? 'animate-spin' : ''} />
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
                  ) : filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-8 py-20 text-center text-gray-400 font-bold">No activity logs found.</td>
                    </tr>
                  ) : (
                    filteredLogs.map((log) => {
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
                                      <span className="text-[10px] font-bold text-primary uppercase tracking-wider">@{log.user_profiles?.username || 'system'}</span>
                                    </div>
                                 </div>
                              </div>
                           </td>
                           <td className="px-6 py-6">
                              <div className="flex items-center gap-2">
                                 <div className={`w-8 h-8 rounded-xl ${color} text-white flex items-center justify-center shadow-lg shadow-gray-200`}>
                                    <Icon size={14} />
                                 </div>
                                 <span className="text-[10px] font-black uppercase tracking-widest text-secondary">{log.event_type?.replace('_', ' ')}</span>
                              </div>
                           </td>
                           <td className="px-6 py-6">
                              <p className="text-sm font-bold text-secondary max-w-sm">{log.description}</p>
                           </td>
                           <td className="px-6 py-6">
                              <div className="flex flex-col gap-2">
                                 <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                                    <Globe size={10} /> {log.ip_address || 'Hidden'}
                                 </div>
                                 <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                                    <Monitor size={10} /> {log.device_info || 'System'}
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
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Showing <span className="text-secondary font-black">{logs.length}</span> entries</p>
            <div className="flex items-center gap-4">
               <button 
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                className="flex items-center gap-2 text-xs font-black text-gray-400 hover:text-secondary transition-all disabled:opacity-30"
               >
                  <ChevronLeft size={16} /> Older Logs
               </button>
               <div className="h-4 w-px bg-gray-200"></div>
               <button 
                onClick={() => setPage(p => p + 1)}
                disabled={logs.length < pageSize}
                className="flex items-center gap-2 text-xs font-black text-secondary hover:text-primary transition-all disabled:opacity-30"
               >
                  Newer Logs <ChevronRight size={16} />
               </button>
            </div>
         </div>
      </div>
    </div>
  )
}
