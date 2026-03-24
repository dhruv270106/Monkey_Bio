'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { Mail, User, Clock, Trash2, Search, ArrowRight, MessageSquare, Filter, RefreshCcw } from 'lucide-react'

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  created_at: string
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('contact_requests')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) setMessages(data)
    setLoading(false)
  }

  const deleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return
    const { error } = await supabase.from('contact_requests').delete().eq('id', id)
    if (!error) {
      setMessages(messages.filter(m => m.id !== id))
      setSelectedMessage(null)
    }
  }

  const filteredMessages = messages.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-secondary tracking-tight">Inbox</h1>
          <p className="text-gray-400 font-medium">Manage all incoming contact requests.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search messages..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none w-80 font-bold text-xs" 
              />
           </div>
           <button onClick={fetchMessages} className="p-3 bg-white border border-gray-100 rounded-2xl shadow-sm hover:bg-gray-50 transition-all text-gray-400">
             <RefreshCcw size={20} className={loading ? 'animate-spin' : ''} />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 h-[calc(100vh-250px)]">
         {/* MESSAGE LIST */}
         <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="overflow-y-auto flex-1 divide-y divide-gray-50">
               {loading ? (
                 Array(5).fill(0).map((_, i) => <div key={i} className="p-8 animate-pulse"><div className="h-4 bg-gray-50 rounded-full w-3/4 mb-4" /><div className="h-4 bg-gray-50 rounded-full w-1/2" /></div>)
               ) : filteredMessages.length === 0 ? (
                 <div className="p-20 text-center text-gray-400 font-bold">No messages found.</div>
               ) : (
                 filteredMessages.map((m) => (
                   <button 
                     key={m.id} 
                     onClick={() => setSelectedMessage(m)}
                     className={`w-full text-left p-8 hover:bg-gray-50/50 transition-all border-l-4 ${selectedMessage?.id === m.id ? 'border-[#422066] bg-gray-50' : 'border-transparent'}`}
                   >
                      <div className="flex justify-between items-start mb-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                         <span>{new Date(m.created_at).toLocaleDateString()}</span>
                         <span className="text-[#D2E823] bg-black px-2 py-0.5 rounded-full">{m.subject}</span>
                      </div>
                      <h4 className="font-black text-secondary mb-1">{m.name}</h4>
                      <p className="text-xs font-bold text-gray-500 truncate">{m.message}</p>
                   </button>
                 ))
               )}
            </div>
         </div>

         {/* MESSAGE DETAIL */}
         <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col relative">
            <AnimatePresence mode="wait">
               {selectedMessage ? (
                 <motion.div 
                   key={selectedMessage.id}
                   initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                   className="p-10 flex flex-col h-full"
                 >
                    <div className="flex justify-between items-start mb-10 border-b border-gray-50 pb-8">
                       <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-secondary font-black text-xl">
                             {selectedMessage.name.charAt(0)}
                          </div>
                          <div>
                             <h2 className="text-2xl font-black text-secondary">{selectedMessage.name}</h2>
                             <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{selectedMessage.email}</p>
                          </div>
                       </div>
                       <button onClick={() => deleteMessage(selectedMessage.id)} className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                          <Trash2 size={20} />
                       </button>
                    </div>

                    <div className="flex-1">
                       <div className="mb-8">
                          <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 block mb-2 px-2">Subject</span>
                          <div className="p-6 bg-gray-50 rounded-2xl font-black text-secondary uppercase tracking-tighter text-lg">
                             {selectedMessage.subject}
                          </div>
                       </div>
                       <div className="mb-8 overflow-y-auto max-h-[300px]">
                          <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 block mb-2 px-2">Message</span>
                          <p className="p-8 bg-gray-50 rounded-3xl font-bold text-gray-600 leading-relaxed italic text-lg shadow-inner">
                             &quot;{selectedMessage.message}&quot;
                          </p>
                       </div>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-8 border-t border-gray-50">
                       <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">
                          Received on: <span className="text-secondary">{new Date(selectedMessage.created_at).toLocaleString()}</span>
                       </p>
                       <a 
                         href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                         className="bg-black text-[#D2E823] px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
                       >
                          Reply ↗
                       </a>
                    </div>
                 </motion.div>
               ) : (
                 <div className="flex flex-col items-center justify-center h-full text-gray-300 gap-6 opacity-40">
                    <MessageSquare size={120} strokeWidth={1} />
                    <p className="text-xl font-black uppercase tracking-widest">Select a message to view</p>
                 </div>
               )}
            </AnimatePresence>
         </div>
      </div>
    </div>
  )
}
