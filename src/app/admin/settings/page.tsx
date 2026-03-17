'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings, 
  Globe, 
  Mail, 
  Shield, 
  Bell, 
  Code, 
  Image as ImageIcon,
  CheckCircle2,
  Save,
  CreditCard,
  Target,
  Smartphone,
  Webhook,
  Zap,
  DollarSign,
  Plus
} from 'lucide-react'

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general')
  const [saving, setSaving] = useState(false)

  const handleSave = () => {
     setSaving(true)
     setTimeout(() => setSaving(false), 1500)
  }

  const sections = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'payment', label: 'Payments', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'email', label: 'Email SMTP', icon: Mail },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'automation', label: 'Automation', icon: Zap },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-secondary tracking-tight">System Settings</h1>
          <p className="text-gray-400 font-medium">Configure platform defaults, integrations and security.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-secondary text-white px-8 py-3.5 rounded-2xl font-black text-sm flex items-center gap-2 hover:shadow-xl hover:shadow-secondary/20 transition-all active:scale-95 disabled:opacity-50"
        >
          {saving ? 'Saving...' : <><Save size={18} /> Save All Changes</>}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
         {/* Sidebar Tabs */}
         <div className="lg:w-72 flex flex-col gap-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-sm text-left ${
                  activeTab === section.id 
                    ? 'bg-white text-secondary shadow-sm border border-gray-100' 
                    : 'text-gray-400 hover:bg-gray-50'
                }`}
              >
                <section.icon size={18} className={activeTab === section.id ? 'text-primary' : 'text-gray-300'} />
                {section.label}
              </button>
            ))}
         </div>

         {/* Content Area */}
         <div className="flex-1 bg-white rounded-[40px] border border-gray-100 shadow-sm p-12 overflow-hidden relative">
            {activeTab === 'general' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                 <div className="space-y-6">
                    <h3 className="text-xl font-black text-secondary flex items-center gap-3">
                       <Globe size={24} className="text-primary" /> Branding & Identity
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Site Title</label>
                          <input type="text" defaultValue="Monkey Bio" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-bold text-secondary outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Support Email</label>
                          <input type="text" defaultValue="hello@monkey.link" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-bold text-secondary outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Platform Description</label>
                       <textarea rows={3} defaultValue="The ultimate creator link-in-bio platform for modern developers and designers." className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-bold text-secondary outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                    </div>
                 </div>

                 <div className="h-px bg-gray-50"></div>

                 <div className="space-y-6">
                    <h3 className="text-xl font-black text-secondary flex items-center gap-3">
                       <ImageIcon size={24} className="text-primary" /> Assets & Media
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                       {[
                         { label: 'Admin Logo', desc: 'Main dashboard logo' },
                         { label: 'Favicon', desc: 'Browser tab icon' },
                         { label: 'OG Image', desc: 'Social sharing' }
                       ].map((asset, i) => (
                         <div key={i} className="p-6 bg-gray-50 border-2 border-dashed border-gray-200 rounded-[32px] flex flex-col items-center justify-center text-center group cursor-pointer hover:border-primary/30 hover:bg-white transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-300 group-hover:text-primary transition-all mb-4">
                               <ImageIcon size={24} />
                            </div>
                            <span className="text-xs font-black text-secondary mb-1">{asset.label}</span>
                            <span className="text-[10px] font-bold text-gray-400">{asset.desc}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </motion.div>
            )}

            {activeTab === 'payment' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                 <div className="space-y-6">
                    <h3 className="text-xl font-black text-secondary flex items-center gap-3">
                       <CreditCard size={24} className="text-primary" /> Gateway Integration
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="p-6 bg-white border border-gray-100 rounded-[32px] shadow-sm flex items-center justify-between group">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <DollarSign size={24} />
                             </div>
                             <div>
                                <p className="font-black text-secondary">Stripe Connect</p>
                                <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Active & Verified</p>
                             </div>
                          </div>
                          <button className="text-gray-300 hover:text-secondary group-hover:rotate-90 transition-all"><Settings size={18} /></button>
                       </div>
                       
                       <div className="p-6 bg-white border border-gray-100 rounded-[32px] shadow-sm flex items-center justify-between opacity-50">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
                                <Target size={24} />
                             </div>
                             <div>
                                <p className="font-black text-secondary">Razorpay</p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Not Configured</p>
                             </div>
                          </div>
                          <button className="text-gray-300 hover:text-secondary"><Plus size={18} /></button>
                       </div>
                    </div>

                    <div className="p-8 bg-primary/5 rounded-[40px] border border-primary/20 mt-8">
                       <div className="flex items-center gap-4 mb-4">
                          <Webhook size={24} className="text-primary" />
                          <h4 className="font-black text-secondary text-lg">Manual Payment Webhooks</h4>
                       </div>
                       <p className="text-gray-500 text-sm font-medium mb-6">Enter URLs to receive JSON payloads whenever a manual payment proof is uploaded or verified.</p>
                       <div className="flex gap-4">
                          <input type="text" placeholder="https://your-api.com/webhook" className="flex-1 bg-white border border-primary/10 rounded-2xl p-4 font-mono text-xs text-secondary outline-none focus:ring-2 focus:ring-primary/20 shadow-sm" />
                          <button className="px-6 bg-secondary text-white rounded-2xl font-black text-xs">Add Endpoint</button>
                       </div>
                    </div>
                 </div>
              </motion.div>
            )}

            {activeTab === 'automation' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                 <div className="space-y-8">
                    <h3 className="text-xl font-black text-secondary flex items-center gap-3">
                       <Zap size={24} className="text-primary" /> Automation Rules
                    </h3>
                    
                    <div className="space-y-4">
                       {[
                         { title: 'Auto-Unlock on Approval', desc: 'Immediately grant theme access when a payment is marked as Approved.', active: true },
                         { title: 'Email Reminder System', desc: 'Send email to user 3 days before their premium subscription expires.', active: true },
                         { title: 'Slack/Telegram Notifications', desc: 'Push every new signup and payment request to a private channel.', active: false },
                         { title: 'Auto-Reject Suspicious', desc: 'Automatically flag and pending payments from blacklisted IPs.', active: false }
                       ].map((rule, i) => (
                         <div key={i} className="flex items-center justify-between p-6 bg-gray-50 rounded-[32px] border border-gray-100">
                            <div>
                               <p className="font-black text-secondary">{rule.title}</p>
                               <p className="text-xs font-bold text-gray-400">{rule.desc}</p>
                            </div>
                            <button className={`w-14 h-8 rounded-full relative transition-all ${rule.active ? 'bg-primary shadow-[0_0_12px_rgba(67,230,96,0.5)]' : 'bg-gray-200'}`}>
                               <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${rule.active ? 'left-7' : 'left-1'}`}></div>
                            </button>
                         </div>
                       ))}
                    </div>
                 </div>
              </motion.div>
            )}

            {saving && (
               <div className="absolute inset-x-0 bottom-0 py-4 bg-primary text-secondary flex items-center justify-center gap-2 font-black text-xs uppercase tracking-[0.2em] shadow-2xl">
                  <CheckCircle2 size={16} /> All settings synchronized with server
               </div>
            )}
         </div>
      </div>
    </div>
  )
}
