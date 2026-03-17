'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  ExternalLink
} from 'lucide-react'

const admins = [
  { id: 1, name: 'Dhruv Rana', email: 'dhruv@monkey.link', role: 'Super Admin', status: 'active', lastActive: '2 mins ago', avatar: null },
  { id: 2, name: 'Sahil Patel', email: 'sahil@monkey.link', role: 'Admin', status: 'active', lastActive: '1 hour ago', avatar: null },
  { id: 3, name: 'Priya Sharma', email: 'priya@monkey.link', role: 'Moderator', status: 'inactive', lastActive: '2 days ago', avatar: null },
  { id: 4, name: 'Rahul Varma', email: 'rahul@monkey.link', role: 'Support', status: 'active', lastActive: '10 mins ago', avatar: null },
]

const permissions = [
  { id: 'user_manage', name: 'User Management', desc: 'Can view, edit, and ban users', roles: ['Super Admin', 'Admin', 'Moderator'] },
  { id: 'payment_verify', name: 'Payment Verification', desc: 'Can approve or reject payments', roles: ['Super Admin', 'Admin'] },
  { id: 'theme_manage', name: 'Theme Management', desc: 'Can add, edit, and toggle themes', roles: ['Super Admin', 'Admin'] },
  { id: 'log_view', name: 'System Logs', desc: 'Can view all platform activity logs', roles: ['Super Admin', 'Admin', 'Moderator', 'Support'] },
  { id: 'config_site', name: 'Site Configuration', desc: 'Can change global site settings', roles: ['Super Admin'] },
]

export default function AccessControlPage() {
  const [activeTab, setActiveTab] = useState('admins')
  const [searchTerm, setSearchTerm] = useState('')

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
        <button 
          onClick={() => setActiveTab('security')}
          className={`px-8 py-4 text-sm font-bold transition-all relative ${
            activeTab === 'security' ? 'text-secondary' : 'text-gray-400 hover:text-secondary'
          }`}
        >
          System Security
          {activeTab === 'security' && (
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
          {/* Search and Filters */}
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
            {admins.map((admin) => (
              <motion.div 
                key={admin.id}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm relative overflow-hidden group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 border border-secondary/5 overflow-hidden flex items-center justify-center font-black text-secondary text-xl">
                    {admin.avatar ? <img src={admin.avatar} alt="" /> : admin.name[0]}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-secondary">{admin.name}</h3>
                    <p className="text-sm font-medium text-gray-400">{admin.email}</p>
                  </div>
                  <button className="p-2 hover:bg-gray-50 rounded-xl text-gray-400 transition-colors">
                    <MoreVertical size={20} />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Global Role</span>
                    <div className="flex items-center gap-2">
                      <Shield size={14} className="text-secondary" />
                      <span className="text-sm font-black text-secondary">{admin.role}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${admin.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
                      <span className={`text-sm font-bold ${admin.status === 'active' ? 'text-green-600' : 'text-gray-400'}`}>
                        {admin.status === 'active' ? 'Active now' : 'Dormant'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2">
                  <button className="flex-1 py-3 px-4 bg-gray-50 hover:bg-secondary hover:text-white rounded-xl text-xs font-bold text-gray-500 transition-all flex items-center justify-center gap-2">
                    <Edit3 size={14} /> Permissions
                  </button>
                  <button className="py-3 px-4 bg-red-50 text-red-500 rounded-xl text-xs font-bold hover:bg-red-500 hover:text-white transition-all">
                    Revoke
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'roles' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden"
        >
          <div className="p-8 border-b border-gray-50">
            <h3 className="text-xl font-black text-secondary">Role Permission Map</h3>
            <p className="text-sm font-bold text-gray-400">Define what each role can access across the platform.</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left bg-gray-50/50">
                  <th className="py-5 px-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">Feature Group</th>
                  {['Super Admin', 'Admin', 'Moderator', 'Support'].map(role => (
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
                    {['Super Admin', 'Admin', 'Moderator', 'Support'].map(role => (
                      <td key={role} className="py-6 px-4">
                        <div className="flex justify-center">
                          {perm.roles.includes(role) ? (
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
        </motion.div>
      )}

      {activeTab === 'security' && (
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm space-y-6">
            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/20">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h4 className="font-black text-orange-900 leading-none mb-1">Security Alert</h4>
                <p className="text-orange-700 text-xs font-bold">2 staff accounts do not have 2FA enabled.</p>
              </div>
            </div>

            <h3 className="text-xl font-black text-secondary pt-4">Authentication Policy</h3>
            
            <div className="space-y-4">
              {[
                { label: 'Admin 2FA Requirement', desc: 'Require all staff to use two-factor authentication', status: true },
                { label: 'Session Timeout', desc: 'Automatically log out inactive admins after 2 hours', status: true },
                { label: 'Login Notifications', desc: 'Notify super admins when a new device logs into staff panel', status: false },
                { label: 'IP Whitelisting', desc: 'Restrict admin access to specific IP ranges', status: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-[24px] bg-gray-50 group hover:bg-white border border-transparent hover:border-gray-100 transition-all">
                  <div className="flex-1">
                    <p className="font-bold text-secondary text-sm">{item.label}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{item.desc}</p>
                  </div>
                  <button className={`w-12 h-6 rounded-full transition-all relative ${item.status ? 'bg-primary' : 'bg-gray-200'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${item.status ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-secondary rounded-[40px] p-8 shadow-2xl text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Lock size={120} />
               </div>
               <h3 className="text-xl font-black mb-6">Recent Security Events</h3>
               <div className="space-y-6">
                 {[
                    { event: 'New Admin Invited', user: 'Dhruv Rana', time: '12 mins ago', icon: UserPlus },
                    { event: 'Root Login Detected', user: 'System', time: '1 hour ago', icon: ShieldCheck },
                    { event: 'Password Changed', user: 'Rahul Varma', time: '3 hours ago', icon: Key },
                 ].map((log, i) => (
                    <div key={i} className="flex items-start gap-4 text-white/80 group">
                       <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-secondary transition-all">
                          <log.icon size={18} />
                       </div>
                       <div>
                          <p className="text-sm font-bold text-white leading-none mb-1">{log.event}</p>
                          <p className="text-xs font-medium text-white/50">{log.user} • {log.time}</p>
                       </div>
                    </div>
                 ))}
               </div>
               <button className="w-full mt-8 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest transition-all">
                  View Full Audit Log
               </button>
            </div>

            <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm">
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Clock size={24} />
                  </div>
                  <h3 className="text-lg font-black text-secondary">Active Sessions</h3>
               </div>
               <p className="text-sm text-gray-400 font-medium mb-6">Currently active staff logged in from other devices.</p>
               <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-500">
                    <span>Delhi, India • Chrome on macOS</span>
                    <button className="text-red-500 hover:underline">Revoke</button>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-gray-500">
                    <span>Mumbai, India • Safari on iPhone</span>
                    <button className="text-red-500 hover:underline">Revoke</button>
                  </div>
               </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
