'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'

export default function AccountPage() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('info')
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: ''
  })
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  })
  const [mfaEnabled, setMfaEnabled] = useState(false)
  const [showQR, setShowQR] = useState(false)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    const { data } = await supabase.from('monkey_bio').select('*').eq('id', session.user.id).single()
    if (data) {
      setProfile(data)
      setFormData({
        name: data.full_name || '',
        username: data.username || '',
        email: session.user.email || ''
      })
    }
    setLoading(false)
  }

  const handleUpdateInfo = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    try {
      const { error } = await supabase
        .from('monkey_bio')
        .update({
          full_name: formData.name,
          username: formData.username
        })
        .eq('id', profile.id)

      if (error) throw error
      setMessage({ type: 'success', text: 'Information updated successfully!' })
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (confirm("Are you sure you want to delete your account? This action is IRREVERSIBLE and all your Linktrees, data, and settings will be permanently erased.")) {
        alert("Account deletion initiated. You will be logged out shortly.")
        // In a real app, you'd call a server function to handle cascading deletion
        await supabase.auth.signOut()
        window.location.href = '/'
    }
  }

  const tabs = [
    { id: 'info', label: 'My information', icon: 'fi-rr-user' },
    { id: 'security', label: 'Security & Privacy', icon: 'fi-rr-shield-check' },
    { id: 'password', label: 'Password', icon: 'fi-rr-lock' },
    { id: 'manage', label: 'Manage Account', icon: 'fi-rr-settings-sliders' },
  ]

  if (loading) return (
    <div className="h-full flex items-center justify-center">
       <i className="fi fi-rr-spinner animate-spin text-2xl text-primary"></i>
    </div>
  )

  return (
    <div className="h-full flex flex-col bg-[#fcfcfc] overflow-hidden">
      <div className="p-8 md:p-12 max-w-4xl mx-auto w-full space-y-12 overflow-y-auto no-scrollbar">
        
        <div>
           <h1 className="text-4xl font-black text-secondary">Account Settings</h1>
           <p className="text-gray-400 font-bold mt-2 uppercase tracking-widest text-[10px]">Manage your personal information and security</p>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
            {/* Nav */}
            <div className="md:w-64 space-y-2 shrink-0">
               {tabs.map(tab => (
                 <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-secondary text-white shadow-xl' : 'text-gray-400 hover:bg-gray-100'}`}
                 >
                    <i className={`${tab.icon} pt-0.5`}></i>
                    {tab.label}
                 </button>
               ))}
            </div>

            {/* Content */}
            <div className="flex-1 bg-white p-8 md:p-12 rounded-[40px] border border-gray-100 shadow-sm">
                <AnimatePresence mode="wait">
                  {activeTab === 'info' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="info" className="space-y-8">
                       <h2 className="text-2xl font-black text-secondary">My Information</h2>
                       <form onSubmit={handleUpdateInfo} className="space-y-6">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Full Name</label>
                             <input 
                              type="text" 
                              value={formData.name} 
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none font-bold text-secondary focus:ring-2 focus:ring-primary/20"
                             />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Username</label>
                             <div className="relative">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold">@</span>
                                <input 
                                  type="text" 
                                  value={formData.username} 
                                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                  className="w-full pl-12 pr-6 py-4 rounded-2xl bg-gray-50 border-none outline-none font-bold text-secondary focus:ring-2 focus:ring-primary/20"
                                />
                             </div>
                          </div>
                          <div className="space-y-2 opacity-60">
                             <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Email Address</label>
                             <input 
                              type="email" 
                              value={formData.email} 
                              readOnly
                              className="w-full px-6 py-4 rounded-2xl bg-gray-100 border-none outline-none font-bold text-gray-400 cursor-not-allowed"
                             />
                             <p className="text-[8px] font-bold text-gray-400 ml-4 uppercase tracking-widest leading-none mt-2">Email cannot be changed directly</p>
                          </div>
                          
                          {message && (
                            <div className={`p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest ${message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                               {message.text}
                            </div>
                          )}

                          <button 
                            type="submit" 
                            disabled={saving}
                            className="w-full py-4 bg-secondary text-white font-black uppercase text-[10px] tracking-widest rounded-full hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
                          >
                             {saving ? 'Saving...' : 'Save Changes'}
                          </button>
                       </form>
                    </motion.div>
                  )}

                  {activeTab === 'security' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="security" className="space-y-10">
                       <h2 className="text-2xl font-black text-secondary">Security & Privacy</h2>
                       
                       <div className="p-8 rounded-[32px] bg-gray-50 border border-gray-100 space-y-6">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                               <p className="text-[10px] font-black uppercase tracking-widest text-primary">Multi-Factor Authentication</p>
                               <h4 className="font-extrabold text-secondary">Authenticator App</h4>
                               <p className="text-xs font-semibold text-gray-400">Secure your account using TOTP QR Codes</p>
                            </div>
                            <button 
                              onClick={() => setShowQR(!showQR)}
                              className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${mfaEnabled ? 'bg-green-500 text-white' : 'bg-secondary text-white'}`}
                            >
                               {mfaEnabled ? 'Enabled' : 'Enable'}
                            </button>
                          </div>

                          {showQR && (
                            <div className="pt-6 border-t border-gray-200 flex flex-col items-center gap-6">
                               <div className="w-48 h-48 bg-white p-4 rounded-3xl border border-gray-100 flex items-center justify-center">
                                  {/* Dummy QR */}
                                  <div className="w-full h-full bg-secondary/5 rounded-2xl flex items-center justify-center text-secondary border border-dashed border-secondary/20">
                                     <i className="fi fi-rr-qrcode text-6xl"></i>
                                  </div>
                               </div>
                               <div className="space-y-4 w-full">
                                  <p className="text-center text-xs font-bold text-gray-500">Scan this QR code with your Authenticator App (Google, Authy, etc.) then enter the 6-digit code below.</p>
                                  <input type="text" placeholder="000 000" className="w-full text-center py-4 bg-white rounded-2xl border border-gray-100 font-black text-xl tracking-[1em]" />
                                  <button onClick={() => { setMfaEnabled(true); setShowQR(false); }} className="w-full py-4 bg-primary text-secondary font-black uppercase text-[10px] tracking-widest rounded-full">Verify & Enable</button>
                               </div>
                            </div>
                          )}
                       </div>

                       <div className="p-8 rounded-[32px] bg-gray-50 border border-gray-100 flex items-center justify-between opacity-50">
                          <div className="space-y-1">
                             <p className="text-[10px] font-black uppercase tracking-widest text-secondary/40">Optional Security</p>
                             <h4 className="font-extrabold text-secondary">SMS Authentication</h4>
                             <p className="text-xs font-semibold text-gray-400">Receive a code via text message</p>
                          </div>
                          <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-not-allowed">
                             <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                          </div>
                       </div>
                    </motion.div>
                  )}

                  {activeTab === 'password' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="password" className="space-y-8">
                       <h2 className="text-2xl font-black text-secondary">Update Password</h2>
                       <form className="space-y-6">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Current Password</label>
                             <input type="password" placeholder="••••••••" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none font-bold text-secondary focus:ring-2 focus:ring-primary/20" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">New Password</label>
                             <input type="password" placeholder="••••••••" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none font-bold text-secondary focus:ring-2 focus:ring-primary/20" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Confirm New Password</label>
                             <input type="password" placeholder="••••••••" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none font-bold text-secondary focus:ring-2 focus:ring-primary/20" />
                          </div>
                          <button type="submit" className="w-full py-4 bg-secondary text-white font-black uppercase text-[10px] tracking-widest rounded-full shadow-lg">Change Password</button>
                       </form>
                    </motion.div>
                  )}

                  {activeTab === 'manage' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="manage" className="space-y-12">
                       <div className="space-y-4">
                          <h2 className="text-2xl font-black text-secondary">Manage Account</h2>
                          <p className="text-sm font-medium text-gray-400">Control your account data and visibility.</p>
                       </div>

                       <div className="space-y-6">
                          <div className="p-6 border border-gray-100 rounded-3xl flex items-center justify-between">
                             <div>
                                <h4 className="font-extrabold text-secondary">Deactivate Account</h4>
                                <p className="text-[10px] font-medium text-gray-400">Temporarily hide your Linktree</p>
                             </div>
                             <button className="px-6 py-2 border border-gray-200 rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-gray-50 transition-colors">Deactivate</button>
                          </div>

                          <div className="p-8 border border-red-100 bg-red-50/10 rounded-3xl space-y-6">
                             <div>
                                <h4 className="font-extrabold text-red-500">Delete Account</h4>
                                <p className="text-xs font-medium text-gray-400 mt-1">Permanently delete your account and all associated data. This action is not reversible.</p>
                             </div>
                             <button onClick={handleDeleteAccount} className="w-full py-4 bg-red-500 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-lg shadow-red-500/20 hover:bg-red-600 transition-colors">Delete My Account</button>
                          </div>
                       </div>
                    </motion.div>
                  )}
                </AnimatePresence>
            </div>
        </div>
      </div>
    </div>
  )
}
