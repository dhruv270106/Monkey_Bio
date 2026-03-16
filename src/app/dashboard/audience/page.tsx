'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Sidebar from '@/components/dashboard/Sidebar'
import { motion } from 'framer-motion'

interface Message {
  id: string
  sender_name: string
  message_text: string
  created_at: string
}

export default function AudiencePage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      window.location.href = '/login'
      return
    }

    // Get profile
    const { data: profileData } = await supabase
      .from('monkey_bio')
      .select('*')
      .eq('id', session.user.id)
      .single()

    if (profileData) {
      setProfile(profileData)
      
      // Get messages (Try to fetch from messages table, if it fails, use empty array)
      try {
        const { data: messagesData, error } = await supabase
          .from('messages')
          .select('*')
          .eq('profile_id', session.user.id)
          .order('created_at', { ascending: false })
        
        if (!error && messagesData) {
          setMessages(messagesData)
        }
      } catch (e) {
        console.log("Messages table might not exist yet")
      }
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-primary">
         <i className="fi fi-rr-spinner animate-spin text-3xl"></i>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        <Sidebar userProfile={profile} />

        <main className="flex-1 flex flex-col bg-white overflow-hidden">
          {/* Toolbar */}
          <div className="h-16 px-8 flex items-center justify-between bg-white border-b border-gray-50 flex-shrink-0">
             <h1 className="font-bold text-xl">Audience</h1>
             <div className="flex items-center gap-3">
                 <div className="bg-orange-50 text-orange-500 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                    {messages.length} Messages
                 </div>
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 bg-white no-scrollbar">
            <div className="max-w-4xl mx-auto space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-gray-50 p-8 rounded-[40px] border border-gray-100 flex flex-col gap-2">
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Total Audience</span>
                  <p className="text-3xl font-black text-secondary">{messages.length}</p>
                </div>
                <div className="bg-gray-50 p-8 rounded-[40px] border border-gray-100 flex flex-col gap-2 col-span-2">
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Profile Stats</span>
                  <div className="flex items-center gap-6 mt-2">
                    <div className="flex items-center gap-2">
                      <i className="fi fi-rr-eye text-primary"></i>
                      <span className="text-sm font-bold text-secondary">Views (Alpha)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fi fi-rr-cursor text-blue-500"></i>
                      <span className="text-sm font-bold text-secondary">Clicks (Alpha)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#fef9f1] border border-[#f5e6d3] rounded-[40px] p-10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-black text-secondary">Latest Messages</h2>
                    <p className="text-sm font-bold text-secondary/40">Real-time interactions from your profile</p>
                  </div>
                  <i className="fi fi-rr-envelope text-2xl text-orange-300"></i>
                </div>

                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center py-20 bg-white/50 rounded-[32px] border border-dashed border-gray-200">
                      <i className="fi fi-rr-memo-circle-check text-4xl text-gray-200 mb-4 inline-block"></i>
                      <p className="text-gray-400 font-bold">No messages received yet.</p>
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={msg.id} 
                        className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col gap-3 group hover:shadow-md transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-black text-sm">
                              {msg.sender_name.charAt(0).toUpperCase()}
                            </div>
                            <h4 className="font-black text-secondary">{msg.sender_name}</h4>
                          </div>
                          <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                            {new Date(msg.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-500 font-medium text-sm pl-13 bg-gray-50/50 p-4 rounded-2xl">
                          {msg.message_text}
                        </p>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
