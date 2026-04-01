'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Download, Search, User, Calendar, Trash2 } from 'lucide-react'

interface Lead {
  id: string
  email: string
  name?: string
  source: string
  created_at: string
}

export default function LeadsSection({ profile }: { profile: any }) {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (profile) {
      // Dummy leads for demonstration
      const dummyLeads: Lead[] = [
        { id: '1', email: 'alex@example.com', name: 'Alex Johnson', source: 'Linktree Signup', created_at: '2026-03-28' },
        { id: '2', email: 'sarah.w@tech.co', name: 'Sarah Wilson', source: 'Newsletter Modal', created_at: '2026-03-29' },
        { id: '3', email: 'mike_r@gmail.com', source: 'Contact Link', created_at: '2026-03-31' },
      ]
      setLeads(dummyLeads)
      setLoading(false)
    }
  }, [profile])

  const filteredLeads = leads.filter(l => 
    l.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const exportLeads = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Email,Name,Source,Date\n" + 
      leads.map(l => `${l.email},${l.name || ''},${l.source},${l.created_at}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "monkey_leads.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="flex-1 p-10 overflow-y-auto no-scrollbar bg-[#fcfcfc]">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                <Mail size={24} />
              </div>
              <div>
                <h1 className="font-black text-3xl text-secondary">Mailing List</h1>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mt-1">Capture and manage your audience leads</p>
              </div>
           </div>
           
           <button 
            onClick={exportLeads}
            disabled={leads.length === 0}
            className="px-8 py-4 bg-white border border-gray-100 rounded-full text-[10px] font-black uppercase tracking-widest text-secondary shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
           >
              <Download size={16} /> Export CSV
           </button>
        </div>

        <div className="bg-white p-10 rounded-[50px] border border-gray-100 shadow-xl space-y-8">
           <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input 
                type="text" 
                placeholder="Search leads by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-8 py-5 rounded-[28px] bg-gray-50 border-none outline-none font-bold text-secondary focus:ring-2 focus:ring-orange-500/10 transition-all text-sm"
              />
           </div>

           <div className="space-y-4">
              <div className="grid grid-cols-4 px-8 text-[9px] font-black uppercase text-gray-300 tracking-[0.2em] pb-2 border-b border-gray-50">
                 <span>User Information</span>
                 <span>Source</span>
                 <span>Captured Date</span>
                 <span className="text-right">Actions</span>
              </div>

              {filteredLeads.length === 0 ? (
                <div className="text-center py-24 bg-gray-50/10 rounded-[40px] space-y-4">
                  <p className="text-gray-400 font-bold">No leads found matching your criteria.</p>
                </div>
              ) : (
                filteredLeads.map((lead, i) => (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} key={lead.id} className="grid grid-cols-4 items-center px-8 py-6 bg-white border border-gray-100 rounded-[32px] hover:shadow-lg transition-all group">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                           <User size={16} />
                        </div>
                        <div className="min-w-0">
                           <p className="text-sm font-black text-secondary truncate">{lead.name || 'Anonymous'}</p>
                           <p className="text-[10px] font-bold text-gray-400 truncate">{lead.email}</p>
                        </div>
                     </div>
                     <span className="text-[11px] font-bold text-secondary/60 bg-gray-50 px-3 py-1 rounded-full w-fit">{lead.source}</span>
                     <div className="flex items-center gap-2 text-gray-400 font-bold text-[10px]">
                        <Calendar size={12} /> {new Date(lead.created_at).toLocaleDateString()}
                     </div>
                     <div className="flex justify-end">
                        <button className="w-10 h-10 rounded-xl bg-red-50 text-red-300 opacity-0 group-hover:opacity-100 transition-all hover:text-red-500 hover:bg-white hover:shadow-md flex items-center justify-center"><Trash2 size={16} /></button>
                     </div>
                  </motion.div>
                ))
              )}
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
           <div className="bg-[#1e293b] p-10 rounded-[50px] shadow-2xl relative overflow-hidden group">
              <div className="relative z-10 space-y-4">
                 <h4 className="text-white font-black text-2xl">Integrate Mailing List</h4>
                 <p className="text-white/40 font-bold text-sm leading-relaxed">Connect your favorite email marketing tools like Mailchimp or MailerLite to automate your workflow.</p>
                 <button className="px-8 py-3 bg-secondary text-white font-black text-[10px] uppercase tracking-widest rounded-full hover:bg-black transition-colors">Explorer Integrations</button>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
           </div>
           
           <div className="bg-white p-10 rounded-[50px] border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
              <p className="text-[10px] font-black uppercase text-gray-300 tracking-widest">Total Leads Captured</p>
              <h3 className="text-5xl font-black text-secondary">{leads.length}</h3>
              <div className="flex items-center gap-2 text-green-500 bg-green-50 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase">
                 <i className="fi fi-rr-trending-up"></i> +14% this week
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
