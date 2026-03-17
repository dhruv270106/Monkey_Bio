'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Calendar, 
  Shield, 
  CreditCard, 
  ArrowLeft,
  ChevronRight,
  MessageSquare,
  Lock,
  Unlock,
  Ban,
  Trash2,
  ExternalLink,
  Zap,
  Tag,
  History,
  Activity,
  BarChart3,
  MoreVertical,
  Crown,
  CheckCircle2,
  DollarSign,
  Settings
} from 'lucide-react'
import Link from 'next/link'

export default function UserDetails({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserDetails()
  }, [params.id])

  const fetchUserDetails = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('monkey_bio')
      .select('*')
      .eq('id', params.id)
      .single()

    if (data) {
      setUser({
        ...data,
        email: data.email || `${data.username}@example.com`,
        mobile_number: data.mobile_number || '+1 234 567 8901',
        signup_date: data.signup_date || data.created_at || new Date().toISOString(),
        last_login: new Date().toISOString(),
        plan_status: data.plan_status || 'free',
        payment_status: data.payment_status || 'none',
        role: data.role || 'user',
        ip_address: '192.168.1.45',
        device_info: 'Chrome 122 / Windows 11',
        location: 'California, US',
        tags: ['high value', 'creator']
      })
    } else {
       // Demo data
       setUser({
          id: params.id,
          username: 'johndoe',
          display_name: 'John Doe',
          avatar_url: '',
          email: 'john@example.com',
          mobile_number: '+1 234 567 8901',
          role: 'user',
          plan_status: 'premium',
          payment_status: 'approved',
          signup_date: new Date().toISOString(),
          last_login: new Date().toISOString(),
          ip_address: '192.168.1.45',
          device_info: 'Chrome 122 / Windows 11',
          location: 'California, US',
          bio: 'Creator & Digital Nomad',
          theme: 'glass',
          links: [{ title: 'Instagram', url: 'https://instgr.am/johndoe' }],
          tags: ['high value', 'creator']
       })
    }
    setLoading(false)
  }

  if (loading) return <div className="p-20 text-center text-gray-400 font-bold">Loading User Data...</div>
  if (!user) return <div className="p-20 text-center text-red-500 font-bold">User Not Found</div>

  return (
    <div className="space-y-8 pb-20">
      {/* Breadcrumbs & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/users" className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-secondary shadow-sm transition-all">
            <ArrowLeft size={18} />
          </Link>
          <div>
             <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                <span>Users</span> <ChevronRight size={10} /> <span>{user.username}</span>
             </div>
             <h1 className="text-3xl font-black text-secondary tracking-tight">Profile Details</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 bg-white border border-gray-100 rounded-2xl font-bold text-xs text-secondary flex items-center gap-2 hover:bg-gray-50 transition-all">
             <MessageSquare size={16} /> Send Email
          </button>
          <button className="px-6 py-3 bg-red-50 border border-red-100 rounded-2xl font-bold text-xs text-red-500 flex items-center gap-2 hover:bg-red-500 hover:text-white transition-all">
             <Ban size={16} /> Suspend Account
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
         {/* Left Column: Basic Info */}
         <div className="xl:col-span-1 space-y-8">
            {/* Main Profile Card */}
            <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-8 text-center flex flex-col items-center">
               <div className="relative group mb-6">
                  <div className="w-32 h-32 rounded-[40px] bg-primary/20 border-4 border-white shadow-2xl overflow-hidden ring-4 ring-primary/10">
                    <img src={user.avatar_url || `https://ui-avatars.com/api/?name=${user.username}&background=random`} className="w-full h-full object-cover" />
                  </div>
                  <div className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-white shadow-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform cursor-pointer`}>
                    <Shield size={20} />
                  </div>
               </div>
               
               <h2 className="text-2xl font-black text-secondary mb-1">{user.display_name}</h2>
               <p className="text-sm font-bold text-primary mb-4">@{user.username}</p>
               
               <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                  <span className="px-4 py-1.5 bg-purple-100 text-purple-600 rounded-full text-[10px] font-black uppercase tracking-widest">{user.plan_status}</span>
                  <span className="px-4 py-1.5 bg-emerald-100 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">Email Verified</span>
               </div>

               <div className="w-full space-y-4 pt-8 border-t border-gray-50">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3 text-gray-400">
                        <Mail size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">Email</span>
                     </div>
                     <span className="text-xs font-black text-secondary">{user.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3 text-gray-400">
                        <Phone size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">Mobile</span>
                     </div>
                     <span className="text-xs font-black text-secondary">{user.mobile_number}</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3 text-gray-400">
                        <MapPin size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">Location</span>
                     </div>
                     <span className="text-xs font-black text-secondary">{user.location}</span>
                  </div>
               </div>
            </div>

            {/* Account Status Card */}
            <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-8 space-y-6">
               <h3 className="text-xl font-black text-secondary flex items-center gap-3 pb-4 border-b border-gray-50">
                  <Shield size={20} className="text-primary" /> Security Details
               </h3>
               
               <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Clock size={16} className="text-gray-400" />
                        <div>
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Signup Date</p>
                           <p className="text-xs font-black text-secondary">{new Date(user.signup_date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-gray-200" />
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <History size={16} className="text-gray-400" />
                        <div>
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Last Login</p>
                           <p className="text-xs font-black text-secondary">{new Date(user.last_login).toLocaleTimeString()}</p>
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-gray-200" />
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="flex items-center gap-3 mb-2">
                        <Zap size={16} className="text-primary" />
                        <p className="text-[10px] font-black text-secondary uppercase tracking-widest">Last Access Data</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-1">
                         <div className="text-[10px] font-bold text-gray-400">IP: <span className="text-secondary font-black">{user.ip_address}</span></div>
                         <div className="text-[10px] font-bold text-gray-400">Device: <span className="text-secondary font-black">Windows 11</span></div>
                      </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Right Column: Interaction & Logs */}
         <div className="xl:col-span-2 space-y-8">
            {/* Quick Actions Panel */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
               {[
                 { label: 'Reset Pass', icon: Lock, color: 'text-blue-500', bg: 'bg-blue-50' },
                 { label: 'Grant Pro', icon: Crown, color: 'text-purple-500', bg: 'bg-purple-50' },
                 { label: 'View Page', icon: ExternalLink, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                 { label: 'Delete User', icon: Trash2, color: 'text-red-500', bg: 'bg-red-50' },
               ].map((action, i) => (
                 <button key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col items-center gap-3 hover:shadow-xl hover:shadow-gray-200/50 transition-all active:scale-95 group">
                    <div className={`w-12 h-12 rounded-2xl ${action.bg} ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                       <action.icon size={20} />
                    </div>
                    <span className="text-[10px] font-black text-secondary uppercase tracking-widest text-center leading-tight">{action.label}</span>
                 </button>
               ))}
            </div>

            {/* Financial Overview Card */}
            <div className="bg-[#1e293b] text-white p-8 rounded-[40px] shadow-sm relative overflow-hidden group">
               <div className="relative z-10">
                 <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-primary">
                          <CreditCard size={24} />
                       </div>
                       <div>
                          <h3 className="text-xl font-black">Billing & Plan</h3>
                          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Transaction History</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Lifetime Value</p>
                       <p className="text-3xl font-black text-primary">$149.00</p>
                    </div>
                 </div>
                 
                 <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur">
                       <div className="flex items-center gap-4">
                          <CheckCircle2 size={16} className="text-primary" />
                          <span className="text-sm font-bold">Pro Yearly Subscription</span>
                       </div>
                       <span className="text-xs font-black">$149.00 • Sep 2024</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 opacity-50">
                        <div className="flex items-center gap-4">
                           <CheckCircle2 size={16} className="text-primary" />
                           <span className="text-sm font-bold">Pro Monthly Plan</span>
                        </div>
                        <span className="text-xs font-black">$19.00 • Aug 2024</span>
                    </div>
                 </div>
               </div>
               <DollarSign size={200} className="absolute right-[-40px] top-[-40px] text-white/5 rotate-12 group-hover:scale-110 transition-transform duration-1000" />
            </div>

            {/* Activity & Analytics Tabs */}
            <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
               <div className="flex items-center border-b border-gray-50 px-8">
                  <button className="px-6 py-6 border-b-2 border-primary text-secondary font-black text-xs uppercase tracking-widest flex items-center gap-2">
                     <Activity size={16} /> User Activity
                  </button>
                  <button className="px-6 py-6 text-gray-400 font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:text-secondary">
                     <BarChart3 size={16} /> Analytics
                  </button>
                  <button className="px-6 py-6 text-gray-400 font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:text-secondary ml-auto">
                     <ExternalLink size={16} /> Live Preview
                  </button>
               </div>
               
               <div className="p-8 space-y-6 max-h-[400px] overflow-y-auto no-scrollbar">
                  {[
                    { event: 'Profile Updated', detail: 'Changed avatar and display name', time: '1 hour ago', icon: User, color: 'text-blue-500' },
                    { event: 'Theme Purchased', detail: 'Lifetime access to "Glassmorphism" granted', time: '3 hours ago', icon: Tag, color: 'text-purple-500' },
                    { event: 'New Link Added', detail: 'Added "My Portfolio" (https://john.com)', time: '1 day ago', icon: Activity, color: 'text-orange-500' },
                    { event: 'Login Session', detail: 'New login from Chrome / Windows 11', time: '2 days ago', icon: Shield, color: 'text-emerald-500' },
                    { event: 'Signup Completed', detail: 'Account created and verified', time: '1 month ago', icon: Calendar, color: 'text-slate-500' }
                  ].map((log, i) => (
                    <div key={i} className="flex gap-4 group">
                       <div className={`w-10 h-10 rounded-xl bg-gray-50 flex-shrink-0 flex items-center justify-center ${log.color} group-hover:scale-110 transition-transform`}>
                          <log.icon size={18} />
                       </div>
                       <div className="flex-1 pb-6 border-b border-gray-50 group-last:border-0 group-last:pb-0">
                          <div className="flex items-center justify-between mb-1">
                             <h4 className="font-black text-secondary text-sm">{log.event}</h4>
                             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{log.time}</span>
                          </div>
                          <p className="text-xs font-medium text-gray-500">{log.detail}</p>
                       </div>
                    </div>
                  ))}
               </div>
               
               <div className="p-8 bg-gray-50/50 border-t border-gray-50 text-center">
                  <button className="text-secondary font-black text-[10px] uppercase tracking-widest flex items-center gap-2 mx-auto hover:text-primary transition-all">
                     Load More History <MoreVertical size={14} />
                  </button>
               </div>
            </div>

            {/* Internal Admin Notes */}
            <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-8 space-y-6">
               <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-secondary flex items-center gap-3">
                     <Tag size={20} className="text-primary" /> Internal CRM Notes
                  </h3>
                  <div className="flex items-center gap-2">
                     <span className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-lg text-[8px] font-black uppercase tracking-widest border border-yellow-200">High Value</span>
                     <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-[8px] font-black uppercase tracking-widest border border-blue-200">Creator</span>
                  </div>
               </div>
               
               <div className="space-y-4">
                  <div className="p-4 bg-yellow-50/50 border border-yellow-100 rounded-2xl relative">
                     <p className="text-xs font-bold text-secondary italic">"User interested in custom white-label features. Follow up with a discounted yearly offer by end of month."</p>
                     <div className="flex items-center justify-between mt-3">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Added by Super Admin • 2 days ago</span>
                        <Settings size={12} className="text-gray-300" />
                     </div>
                  </div>
                  
                  <div className="flex gap-2">
                     <textarea placeholder="Add a private note for other admins..." className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl p-4 text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all no-scrollbar min-h-[60px]" />
                     <button className="bg-secondary text-white p-4 rounded-2xl hover:bg-gray-800 transition-all">
                        <CheckCircle2 size={24} />
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}
