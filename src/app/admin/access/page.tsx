'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { 
  ShieldCheck, 
  UserPlus, 
  Search, 
  MoreVertical, 
  Shield, 
  Lock, 
  Key, 
  Eye, 
  Trash2, 
  Edit3,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ExternalLink,
  ChevronDown
} from 'lucide-react'

interface AdminUser {
  id: string
  display_name: string
  email: string
  role: string
  is_active: boolean
  last_login: string
  avatar_url?: string
}

export default function AccessControlPage() {
  const [activeTab, setActiveTab] = useState('admins')
  const [searchTerm, setSearchTerm] = useState('')
  const [admins, setAdmins] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAdmins()
  }, [])

  const fetchAdmins = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('monkey_bio')
      .select('*')
      .neq('role', 'user')
      .order('role', { ascending: false })
    
    if (data) {
      setAdmins(data)
    }
    setLoading(false)
  }

  const handleRoleChange = async (userId: string, newRole: string) => {
    const { error } = await supabase
      .from('monkey_bio')
      .update({ role: newRole })
      .eq('id', userId)
    
    if (error) {
      alert(error.message)
    } else {
      setAdmins(prev => prev.map(a => a.id === userId ? { ...a, role: newRole } : a))
    }
  }

  const filteredAdmins = admins.filter(a => 
    a.display_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const permissions = [
    { id: 'user_manage', name: 'User Management', desc: 'Can view, edit, and ban users', roles: ['super_admin', 'admin', 'moderator'] },
    { id: 'payment_verify', name: 'Payment Verification', desc: 'Can approve or reject payments', roles: ['super_admin', 'admin'] },
    { id: 'theme_manage', name: 'Theme Management', desc: 'Can add, edit, and toggle themes', roles: ['super_admin', 'admin'] },
    { id: 'log_view', name: 'System Logs', desc: 'Can view all platform activity logs', roles: ['super_admin', 'admin', 'moderator', 'support'] },
  ]

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-secondary">Access Control</h1>
          <p className="text-gray-400 font-medium">Manage admin roles and system permissions.</p>
        </div>
        
        <button className="flex items-center gap-2 px-6 py-3 bg-secondary text-white font-bold rounded-2xl shadow-xl shadow-secondary/20 hover:scale-[1.02] transition-all">
          <UserPlus size={18} className="text-primary" />
          Invite Staff member
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        <button 
          onClick={() => setActiveTab('admins')}
          className={`px-8 py-4 text-sm font-bold transition-all relative ${
            activeTab === 'admins' ? 'text-secondary' : 'text-gray-400 hover:text-secondary'
          }`}
        >
          Staff Directory
          {activeTab === 'admins' && (
            <motion.div layoutId="tab-line" className="absolute bottom-0 left-0 right-0 h-1 bg-secondary rounded-t-full" />
          )}
        </button>
        <button 
          onClick={() => setActiveTab('roles')}
          className={`px-8 py-4 text-sm font-bold transition-all relative ${
            activeTab === 'roles' ? 'text-secondary' : 'text-gray-400 hover:text-secondary'
          }`}
        >
          Roles & Permissions
          {activeTab === 'roles' && (
            <motion.div layoutId="tab-line" className="absolute bottom-0 left-0 right-0 h-1 bg-secondary rounded-t-full" />
          )}
        </button>
      </div>

      {activeTab === 'admins' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Search */}
          <div className="flex items-center bg-white rounded-2xl px-6 py-2 border border-gray-100 shadow-sm">
            <Search className="text-gray-400 mr-4" size={20} />
            <input 
              type="text" 
              placeholder="Search staff by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none flex-1 py-3 text-sm font-medium text-secondary"
            />
          </div>

          {/* Admin List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {loading ? (
              Array(2).fill(0).map((_, i) => <div key={i} className="h-48 bg-white rounded-[32px] animate-pulse shadow-sm"></div>)
            ) : filteredAdmins.length === 0 ? (
               <div className="col-span-2 py-10 text-center font-bold text-gray-400 bg-white rounded-[32px]">No staff members found.</div>
            ) : (
              filteredAdmins.map((admin) => (
                <motion.div 
                  key={admin.id}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm relative overflow-hidden group"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <img 
                      src={admin.avatar_url || `https://ui-avatars.com/api/?name=${admin.display_name}&background=random`} 
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white shadow-sm"
                      alt=""
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-secondary">{admin.display_name}</h3>
                      <p className="text-sm font-medium text-gray-400">{admin.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Global Role</span>
                      <div className="relative group/role">
                        <div className="flex items-center gap-2 cursor-pointer bg-gray-50 px-3 py-1.5 rounded-xl border border-transparent hover:border-primary/30 transition-all">
                          <Shield size={14} className="text-primary" />
                          <span className="text-sm font-black text-secondary capitalize">{admin.role.replace('_', ' ')}</span>
                          <ChevronDown size={12} className="text-gray-400" />
                        </div>
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-2xl opacity-0 invisible group-hover/role:opacity-100 group-hover/role:visible transition-all z-20 overflow-hidden">
                           {['super_admin', 'admin', 'moderator', 'support'].map(r => (
                             <button 
                               key={r}
                               onClick={() => handleRoleChange(admin.id, r)}
                               className="w-full px-4 py-3 text-left text-xs font-bold text-gray-500 hover:bg-primary hover:text-secondary capitalize transition-all"
                             >
                               {r.replace('_', ' ')}
                             </button>
                           ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</span>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${admin.is_active ? 'bg-green-500' : 'bg-gray-300'}`} />
                        <span className={`text-sm font-bold ${admin.is_active ? 'text-green-600' : 'text-gray-400'}`}>
                          {admin.is_active ? 'Active' : 'Locked'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-2">
                    <button className="flex-1 py-3 px-4 bg-gray-50 hover:bg-secondary hover:text-white rounded-xl text-xs font-bold text-gray-500 transition-all flex items-center justify-center gap-2">
                      <Edit3 size={14} /> Update Access
                    </button>
                    <button 
                      onClick={() => handleRoleChange(admin.id, 'user')}
                      className="py-3 px-4 bg-red-50 text-red-500 rounded-xl text-xs font-bold hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    >
                      Demote to User
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      )}

      {activeTab === 'roles' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden"
        >
          <div className="p-8 border-b border-gray-50 text-center md:text-left">
            <h3 className="text-xl font-black text-secondary">Role Permission Map</h3>
            <p className="text-sm font-bold text-gray-400">Define what each role can access across the platform.</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left bg-gray-50/50">
                  <th className="py-5 px-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">Feature Group</th>
                  {['Admin', 'Moderator', 'Support'].map(role => (
                    <th key={role} className="py-5 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">{role}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {permissions.map((perm) => (
                  <tr key={perm.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="py-6 px-8">
                      <p className="font-bold text-secondary">{perm.name}</p>
                      <p className="text-xs text-gray-400 font-medium">{perm.desc}</p>
                    </td>
                    {['admin', 'moderator', 'support'].map(role => (
                      <td key={role} className="py-6 px-4">
                        <div className="flex justify-center">
                          {perm.roles.includes(role) || perm.roles.includes('super_admin') ? (
                            <div className="w-6 h-6 rounded-full bg-green-50 text-green-500 flex items-center justify-center">
                              <CheckCircle2 size={16} />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-gray-50 text-gray-200 flex items-center justify-center">
                              <Lock size={14} />
                            </div>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-8 bg-gray-50 text-center">
             <p className="text-xs font-bold text-gray-400">Note: Super Admin has full bypass access to all features by default.</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
