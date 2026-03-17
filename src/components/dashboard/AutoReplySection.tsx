'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'
import { useDomain } from '@/hooks/useDomain'

interface AutoReplySectionProps {
  profile: any
}

export default function AutoReplySection({ profile }: AutoReplySectionProps) {
  const domain = useDomain()
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState(1) // 1: Connect, 2: Dashboard
  const [igUser, setIgUser] = useState<any>(null)
  const [keywords, setKeywords] = useState<any[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (profile) {
      if (profile.instagram_connection) {
        setIgUser(profile.instagram_connection)
        setStep(2)
      } else {
        const savedIg = localStorage.getItem(`ig_connected_data_${profile.id}`)
        if (savedIg) {
          setIgUser(JSON.parse(savedIg))
          setStep(2)
        }
      }
      setLoading(false)
    }
  }, [profile])

  const handleInstagramConnect = () => {
    setSubmitting(true)
    const APP_ID = process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID || 'YOUR_APP_ID'
    const REDIRECT_URI = typeof window !== 'undefined' ? `${window.location.origin}/auth/instagram/callback` : ''
    const SCOPES = ['instagram_basic', 'instagram_manage_messages', 'pages_show_list', 'pages_read_engagement', 'public_profile'].join(',')
    const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${SCOPES}&response_type=code`
    const popup = window.open(authUrl, 'Connect Instagram', 'width=600,height=800,status=no,resizable=yes,left=300,top=100')

    const handleMessage = (event: MessageEvent) => {
       if (event.data.type === 'INSTAGRAM_AUTH_SUCCESS') {
          const igData = event.data.data
          setIgUser(igData)
          if (profile?.id) {
            localStorage.setItem(`ig_connected_data_${profile.id}`, JSON.stringify(igData))
          }
          setSubmitting(false)
          setStep(2)
          window.removeEventListener('message', handleMessage)
       }
    }
    window.addEventListener('message', handleMessage)
    const checkPopup = setInterval(() => { if (!popup || popup.closed) { clearInterval(checkPopup); setSubmitting(false); window.removeEventListener('message', handleMessage); } }, 1000)
  }

  if (loading) return null

  return (
    <div className="flex-1 p-10 overflow-y-auto no-scrollbar bg-[#fcfcfc]">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-3">
              <i className="fi fi-rr-comment-alt text-primary text-xl"></i>
              <h1 className="font-black text-3xl text-secondary">Auto-Reply</h1>
           </div>
           {step === 2 && (
             <div className="bg-green-50 px-4 py-1.5 rounded-full flex items-center gap-2 border border-green-100/50">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">Active Connection</span>
             </div>
           )}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white p-16 rounded-[60px] border border-gray-100 shadow-xl text-center space-y-10">
                <div className="w-28 h-28 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-[40px] flex items-center justify-center text-white text-6xl mx-auto shadow-2xl rotate-2 hover:rotate-0 transition-transform cursor-pointer">
                   <i className="fi fi-brands-instagram"></i>
                </div>
                <div className="space-y-4">
                   <h2 className="text-4xl font-black text-secondary">Link Your Instagram</h2>
                   <p className="text-gray-400 font-bold max-w-sm mx-auto leading-relaxed">Connect your creator ID to automate DMs for links, discounts, and custom replies.</p>
                </div>
                <div className="max-w-xs mx-auto space-y-6">
                   <button onClick={handleInstagramConnect} disabled={submitting} className="w-full py-5 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white font-black rounded-[32px] shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 group relative overflow-hidden">
                      {submitting ? <i className="fi fi-rr-spinner animate-spin"></i> : <><i className="fi fi-brands-instagram text-xl"></i> Connect Instagram</>}
                   </button>
                    <p className="text-[10px] text-gray-400 font-bold leading-tight">Requires an <span className="text-secondary">Instagram Business/Creator</span> account.</p>
                </div>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em]">Official Meta Integration</p>
             </motion.div>
          ) : (
             <div className="space-y-8">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex items-center justify-between group">
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] shadow-xl group-hover:rotate-12 transition-transform">
                         <img src={igUser?.profile_pic} className="w-full h-full rounded-full border-2 border-white object-cover" />
                      </div>
                      <div>
                         <h3 className="text-2xl font-black text-secondary">@{igUser?.username}</h3>
                         <p className="text-xs font-bold text-gray-300 uppercase tracking-widest mt-0.5">Primary ID Linked</p>
                      </div>
                   </div>
                   <button onClick={() => { if(confirm("Disconnect?")) setStep(1); }} className="px-6 py-3 bg-gray-50 text-gray-400 hover:text-red-500 font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all">Disconnect</button>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   <div className="md:col-span-2 space-y-6">
                      <div className="flex items-center justify-between px-2">
                         <h3 className="text-xl font-black text-secondary">Auto-Reponses</h3>
                         <button onClick={() => setShowAddModal(true)} className="w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all"><i className="fi fi-rr-plus"></i></button>
                      </div>
                      <div className="space-y-4">
                        {keywords.length === 0 ? (
                           <div className="bg-white p-20 rounded-[50px] border border-dashed border-gray-200 text-center space-y-4">
                              <div className="w-20 h-20 bg-gray-50 text-gray-200 rounded-full flex items-center justify-center mx-auto text-3xl"><i className="fi fi-rr-comment-dots"></i></div>
                              <p className="text-gray-400 font-bold">No auto-replies set up yet.</p>
                           </div>
                        ) : (
                           keywords.map(kw => (
                              <div key={kw.id} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-lg transition-all border-l-8 border-l-primary">
                                 <div>
                                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">When they say "{kw.trigger}"</span>
                                    <p className="text-sm font-bold text-secondary/70 mt-1">{kw.response}</p>
                                 </div>
                                 <button onClick={() => setKeywords(keywords.filter(k => k.id !== kw.id))} className="w-10 h-10 rounded-xl bg-red-50 text-red-400 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center"><i className="fi fi-rr-trash"></i></button>
                              </div>
                           ))
                        )}
                      </div>
                   </div>
                   <div className="bg-secondary p-10 rounded-[50px] shadow-2xl space-y-8 relative overflow-hidden h-fit">
                      <div className="relative z-10 space-y-10">
                         <h3 className="text-white font-black text-lg flex items-center gap-3"><i className="fi fi-rr-eye text-primary"></i> Chat Preview</h3>
                         <div className="space-y-6">
                            <div className="bg-white/10 p-5 rounded-3xl rounded-bl-none mr-6 text-[11px] font-bold text-gray-300 italic group">"What is your website link?"</div>
                             <div className="bg-primary p-5 rounded-3xl rounded-br-none ml-6 text-[11px] font-black text-secondary leading-relaxed shadow-lg">"Sure! Here it is: {domain}/{profile?.username}"</div>
                         </div>
                      </div>
                      <i className="fi fi-rr-comment-quote absolute -bottom-10 -right-10 text-9xl text-white/5 rotate-12"></i>
                   </div>
                </div>
             </div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
         {showAddModal && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
               <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white w-full max-w-lg rounded-[50px] overflow-hidden shadow-2xl relative z-10 p-12 space-y-8">
                  <h2 className="text-2xl font-black text-secondary">New Auto-Reply</h2>
                  <div className="space-y-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Keyword (Case Insensitive)</label>
                        <input type="text" id="trigger" className="w-full p-5 bg-gray-50 border-none rounded-2xl outline-none font-bold text-secondary" placeholder="e.g. 'link' or 'price'" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Response Message</label>
                        <textarea id="response" className="w-full h-32 p-5 bg-gray-50 border-none rounded-3xl outline-none font-bold text-secondary resize-none" placeholder="Your reply message..."></textarea>
                     </div>
                     <button onClick={() => { const t = (document.getElementById('trigger') as HTMLInputElement).value; const r = (document.getElementById('response') as HTMLTextAreaElement).value; if(t && r) { setKeywords([...keywords, { id: Date.now().toString(), trigger: t, response: r }]); setShowAddModal(false); } }} className="w-full py-5 bg-secondary text-white font-black rounded-full hover:bg-gray-800 transition-all shadow-xl active:scale-95">Add Auto-Reply</button>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>
      <div className="pb-20"></div>
    </div>
  )
}
