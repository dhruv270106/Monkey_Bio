'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  Eye, 
  Edit3, 
  ShieldBan, 
  CheckCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  Ban,
  Trash2,
  Unlock
} from 'lucide-react'

// Define profile interface based on what we've seen and what we planned
interface UserProfile {
  id: string
  username: string
  display_name: string
  avatar_url: string
  email?: string
  mobile_number?: string
  role: string
  plan_status: string
  payment_status: string
  is_active: boolean
  signup_date: string
  last_login?: string
  ip_address?: string
  device_info?: string
}

export default function UserManagement() {
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('monkey_bio')
      .select('*')
      .order('signup_date', { ascending: false })

    if (data) {
      const processedUsers = data.map(u => ({
        ...u,
        email: u.email || 'No Email',
        signup_date: u.signup_date || u.created_at || new Date().toISOString(),
        role: u.role || 'user',
        plan_status: u.plan_status || 'free',
        payment_status: u.payment_status || 'none',
        is_active: u.is_active !== undefined ? u.is_active : true
      }))
      setUsers(processedUsers)
    }
    setLoading(false)
  }

  const handleToggleStatus = async (user: UserProfile) => {
    const newStatus = !user.is_active
    const confirmMsg = newStatus ? `Activate ${user.username}?` : `Block ${user.username}?`
    
    if (!confirm(confirmMsg)) return

    const { error } = await supabase
      .from('monkey_bio')
      .update({ is_active: newStatus })
      .eq('id', user.id)

    if (error) {
      alert(error.message)
    } else {
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, is_active: newStatus } : u))
    }
  }

  const handleDeleteUser = async (user: UserProfile) => {
    if (!confirm(`Are you sure you want to PERMANENTLY delete ${user.username}? This cannot be undone.`)) return

    const { error } = await supabase
      .from('monkey_bio')
      .delete()
      .eq('id', user.id)

    if (error) {
      alert(error.message)
    } else {
      setUsers(prev => prev.filter(u => u.id !== user.id))
      alert('User deleted successfully')
    }
  }

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         u.display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (filter === 'all') return matchesSearch
    if (filter === 'premium') return matchesSearch && u.plan_status === 'premium'
    if (filter === 'active') return matchesSearch && u.is_active
    if (filter === 'leads') return matchesSearch && u.payment_status === 'pending'
    return matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-secondary tracking-tight">User Management</h1>
          <p className="text-gray-400 font-medium">Manage and monitor all platform users.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, username or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm"
            />
          </div>
          
          <div className="flex items-center bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm">
             {['all', 'premium', 'active', 'leads'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                    filter === f ? 'bg-secondary text-white' : 'text-gray-400 hover:text-secondary'
                  }`}
                >
                  {f}
                </button>
             ))}
          </div>

          <button className="p-3 bg-white border border-gray-100 rounded-2xl shadow-sm text-gray-500 hover:text-secondary transition-all">
            <Download size={20} />
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">User Profile</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Account Info</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Security</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Last Active</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={6} className="px-8 py-8"><div className="h-12 bg-gray-50 rounded-2xl"></div></td>
                  </tr>
                ))
              ) : filteredUsers.length === 0 ? (
                <tr>
                   <td colSpan={6} className="px-8 py-20 text-center">
                     <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
                          <Users size={32} />
                        </div>
                        <p className="text-gray-400 font-bold">No users found matching your criteria.</p>
                     </div>
                   </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="group hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img 
                            src={user.avatar_url || `https://ui-avatars.com/api/?name=${user.username}&background=random`} 
                            className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white shadow-sm"
                            alt=""
                          />
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${user.is_active ? 'bg-primary' : 'bg-gray-300'}`}></div>
                        </div>
                        <div>
                          <p className="font-black text-secondary group-hover:text-primary transition-colors">{user.display_name}</p>
                          <p className="text-xs font-bold text-gray-400">@{user.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 font-medium">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-secondary font-bold">
                           <Mail size={12} className="text-gray-400" /> {user.email}
                        </div>
                        {user.mobile_number && (
                          <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                             <Phone size={10} /> {user.mobile_number}
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                           <Calendar size={10} /> {new Date(user.signup_date).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                       <div className="flex flex-col gap-2">
                          <span className={`w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            user.plan_status === 'premium' 
                              ? 'bg-purple-100 text-purple-600 border border-purple-200' 
                              : 'bg-blue-100 text-blue-600 border border-blue-200'
                          }`}>
                            {user.plan_status}
                          </span>
                          <span className={`w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            user.payment_status === 'approved' 
                              ? 'bg-emerald-100 text-emerald-600 border border-emerald-200' 
                              : user.payment_status === 'pending'
                              ? 'bg-yellow-100 text-yellow-600 border border-yellow-200'
                              : 'bg-gray-100 text-gray-400 border border-gray-200'
                          }`}>
                            {user.payment_status}
                          </span>
                       </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="space-y-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        <p className="flex items-center gap-2"><CheckCircle size={10} className="text-primary" /> Email Verified</p>
                        <p className="flex items-center gap-2 opacity-40"><CheckCircle size={10} /> Mobile Not Verified</p>
                        <p className="flex items-center gap-2"><ShieldBan size={10} className="text-blue-400" /> RBAC: {user.role}</p>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                       <div className="text-xs font-bold text-secondary">
                          <p>{user.last_login ? new Date(user.last_login).toLocaleDateString() : 'N/A'}</p>
                          <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter Otros truncate w-32">
                             IP: {user.ip_address || 'Hidden'}
                          </p>
                       </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/users/${user.id}`} className="p-2.5 hover:bg-white hover:shadow-md rounded-xl text-gray-400 hover:text-secondary border border-transparent hover:border-gray-100 transition-all">
                             <Eye size={16} />
                          </Link>
                          <button 
                            onClick={() => handleToggleStatus(user)}
                            className={`p-2.5 hover:bg-white hover:shadow-md rounded-xl border border-transparent hover:border-gray-100 transition-all ${user.is_active ? 'text-gray-400 hover:text-red-500' : 'text-primary hover:text-primary-dark'}`}
                            title={user.is_active ? 'Block User' : 'Unblock User'}
                          >
                             {user.is_active ? <Ban size={16} /> : <Unlock size={16} />}
                          </button>
                          <div className="h-4 w-px bg-gray-100 mx-1"></div>
                          <button 
                            onClick={() => handleDeleteUser(user)}
                            className="p-2.5 hover:bg-red-50 hover:shadow-md rounded-xl text-gray-400 hover:text-red-500 border border-transparent hover:border-red-100 transition-all"
                          >
                             <Trash2 size={16} />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-8 py-4 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Showing <span className="text-secondary font-black">{filteredUsers.length}</span> of <span className="text-secondary font-black">{users.length}</span> Users
            </p>
            <div className="flex items-center gap-2">
                <button className="p-2 rounded-xl bg-white border border-gray-100 text-gray-400 hover:text-secondary opacity-50 cursor-not-allowed transition-all">
                   <ChevronLeft size={16} />
                </button>
                <div className="flex items-center gap-1">
                   {[1, 2, 3].map(p => (
                     <button key={p} className={`w-8 h-8 rounded-xl text-xs font-black transition-all ${p === 1 ? 'bg-secondary text-white' : 'hover:bg-white text-gray-400 hover:text-secondary'}`}>
                       {p}
                     </button>
                   ))}
                </div>
                <button className="p-2 rounded-xl bg-white border border-gray-100 text-gray-400 hover:text-secondary transition-all">
                   <ChevronRight size={16} />
                </button>
            </div>
        </div>
      </div>
    </div>
  )
}
