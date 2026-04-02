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
    // Mocking a successful connection for now since we don't have a real App ID
    setTimeout(() => {
        const mockIgData = {
            username: profile?.username || 'creator_pro',
            profile_pic: profile?.avatar_url || 'https://ui-avatars.com/api/?name=IG',
            id: 'ig_12345'
        }
        setIgUser(mockIgData)
        if (profile?.id) {
          localStorage.setItem(`ig_connected_data_${profile.id}`, JSON.stringify(mockIgData))
        }
        setSubmitting(false)
        setStep(2)
    }, 1500)
  }

  if (loading) return null

  return (
    <div className="flex-1 p-10 overflow-y-auto no-scrollbar bg-gray-50/30">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="flex items-center justify-between">
           <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-1">
                 <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><i className="fi fi-rr-comment-alt text-xs"></i></div>
                 <h1 className="font-extrabold text-2xl text-secondary uppercase tracking-tight italic">Auto-Reply</h1>
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none ml-11">Automate your Instagram DMs</p>
           </div>
           {step === 2 && (
             <div className="bg-white px-6 py-2.5 rounded-full flex items-center gap-3 border border-emerald-100 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.2em] pt-0.5">Live Connection</span>
             </div>
           )}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
             <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="bg-white p-20 rounded-[60px] border border-gray-100 shadow-2xl shadow-gray-200/50 text-center space-y-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] opacity-[0.03] blur-[100px] rounded-full"></div>
                <div className="relative group">
                    <div className="w-32 h-32 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-[45px] flex items-center justify-center text-white text-6xl mx-auto shadow-2xl group-hover:rotate-6 transition-all cursor-pointer duration-500">
                       <i className="fi fi-brands-instagram pt-1"></i>
                    </div>
                </div>
                <div className="space-y-6 max-w-md mx-auto">
                   <h2 className="text-5xl font-black text-secondary tracking-tight">Scale your DMs effortlessy</h2>
                   <p className="text-gray-400 font-bold leading-relaxed text-lg italic">Connect your project to Meta and automate your community growth.</p>
                </div>
                <div className="max-w-sm mx-auto space-y-8">
                   <button onClick={handleInstagramConnect} disabled={submitting} className="w-full py-6 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white font-black rounded-[35px] shadow-3xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 group">
                      {submitting ? <i className="fi fi-rr-spinner animate-spin text-xl"></i> : <><i className="fi fi-brands-instagram text-2xl pt-1"></i> <span className="uppercase text-xs tracking-widest pt-1">Authorize with Meta</span></>}
                   </button>
                    <div className="flex items-center justify-center gap-2 opacity-40">
                        <i className="fi fi-rr-shield-check text-xs"></i>
                        <p className="text-[10px] font-black uppercase tracking-widest">Official Meta API Provider</p>
                    </div>
                </div>
             </motion.div>
          ) : (
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-10">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-10 rounded-[45px] border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all">
                       <div className="flex items-center gap-8">
                          <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] shadow-2xl group-hover:rotate-12 transition-all">
                             <img src={igUser?.profile_pic} className="w-full h-full rounded-full border-4 border-white object-cover" />
                          </div>
                          <div>
                             <h3 className="text-3xl font-black text-secondary uppercase tracking-tight">@{igUser?.username}</h3>
                             <div className="flex items-center gap-3 mt-1">
                                <span className="px-3 py-1 bg-gray-50 rounded-full text-[9px] font-black text-gray-400 uppercase tracking-widest">Business ID: {igUser?.id}</span>
                             </div>
                          </div>
                       </div>
                       <button onClick={() => { if(confirm("Disconnect ID?")) setStep(1); }} className="w-14 h-14 rounded-2xl bg-gray-50 text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all flex items-center justify-center"><i className="fi fi-rr-exit text-lg"></i></button>
                    </motion.div>

                    <div className="space-y-8">
                       <div className="flex items-center justify-between px-6">
                           <div className="flex flex-col">
                              <h3 className="text-2xl font-black text-secondary tracking-tight uppercase italic">Active Triggers</h3>
                              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1 ml-1">{keywords.length} automation active</p>
                           </div>
                           <button onClick={() => setShowAddModal(true)} className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl shadow-primary/30 hover:scale-110 active:scale-95 transition-all hover:bg-secondary"><i className="fi fi-rr-plus text-lg pt-1"></i></button>
                       </div>
                       
                       <div className="grid grid-cols-1 gap-4">
                         {keywords.length === 0 ? (
                            <div className="bg-white/40 p-24 rounded-[60px] border-4 border-dashed border-gray-100 text-center space-y-6">
                               <div className="w-24 h-24 bg-white text-gray-100 rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner"><i className="fi fi-rr-comment-dots"></i></div>
                               <div className="space-y-2">
                                  <p className="text-gray-300 font-black uppercase text-xs tracking-widest">No triggers set</p>
                                  <p className="text-[10px] text-gray-400 font-bold max-w-[200px] mx-auto leading-relaxed">Add keywords like "price" or "link" to automate replies.</p>
                               </div>
                            </div>
                         ) : (
                            keywords.map((kw, i) => (
                               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} key={kw.id} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-2xl hover:translate-x-2 transition-all border-l-[12px] border-l-primary">
                                  <div className="flex-1">
                                     <div className="flex items-center gap-3 mb-2">
                                        <span className="text-[10px] font-black text-primary uppercase tracking-widest px-4 py-1.5 bg-primary/5 rounded-full ring-1 ring-primary/10 italic">Keyword: {kw.trigger}</span>
                                     </div>
                                     <h4 className="text-xl font-black text-secondary leading-tight mt-3">{kw.response}</h4>
                                  </div>
                                  <button onClick={() => setKeywords(keywords.filter(k => k.id !== kw.id))} className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-300 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center hover:bg-red-50 hover:text-red-500"><i className="fi fi-rr-trash"></i></button>
                               </motion.div>
                            ))
                         )}
                       </div>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-8">
                   <div className="bg-secondary p-12 rounded-[60px] shadow-3xl shadow-secondary/30 space-y-12 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full"></div>
                      <div className="relative z-10 space-y-12">
                         <div className="flex items-center justify-between">
                            <h3 className="text-white font-black text-xs uppercase tracking-[0.3em] flex items-center gap-4"><div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div> Live Preview</h3>
                            <div className="flex gap-1.5">
                               {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/10"></div>)}
                            </div>
                         </div>
                         <div className="space-y-8">
                            <div className="space-y-2">
                               <div className="flex items-center gap-3 mb-1">
                                  <div className="w-5 h-5 rounded-full bg-white/10"></div>
                                  <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Customer</span>
                               </div>
                               <div className="bg-white/10 p-6 rounded-[30px] rounded-bl-none mr-12 text-sm font-bold text-gray-300 italic backdrop-blur-md border border-white/5 shadow-2xl">
                                  "Hey! What's the link for this?"
                               </div>
                            </div>
                             <div className="space-y-2 flex flex-col items-end">
                               <div className="flex items-center gap-3 mb-1 pr-1">
                                  <span className="text-[8px] font-black text-primary/40 uppercase tracking-widest">You (Auto)</span>
                                  <div className="w-5 h-5 rounded-full bg-primary/20"></div>
                               </div>
                               <div className="bg-primary p-6 rounded-[30px] rounded-br-none ml-12 text-sm font-black text-secondary leading-relaxed shadow-3xl shadow-primary/20 border-4 border-white/10">
                                  "Sure! You can find it here: {domain}/{profile?.username}"
                               </div>
                               <div className="flex items-center gap-1.5 mt-2 pr-4 opacity-30">
                                  <i className="fi fi-rr-check-double text-[8px] text-white"></i>
                                  <span className="text-[8px] font-black text-white uppercase tracking-widest">Sent 2m ago</span>
                               </div>
                            </div>
                         </div>
                      </div>
                      <i className="fi fi-rr-comment-quote absolute -bottom-16 -right-16 text-[15rem] text-white/5 -rotate-12 pointer-events-none italic">AI</i>
                   </div>
                   
                   <div className="bg-white p-10 rounded-[50px] border border-gray-100 shadow-sm space-y-6">
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Connected Platforms</h4>
                      <div className="flex justify-around opacity-30">
                         <i className="fi fi-brands-instagram text-2xl"></i>
                         <i className="fi fi-brands-facebook-messenger text-2xl"></i>
                         <i className="fi fi-brands-whatsapp text-2xl"></i>
                      </div>
                   </div>
                </div>
             </div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
         {showAddModal && (
            <div className="fixed inset-0 z-[500] flex items-center justify-center p-6">
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAddModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-xl" />
               <motion.div initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 30 }} className="bg-white w-full max-w-xl rounded-[60px] overflow-hidden shadow-3xl relative z-10 p-16 space-y-12">
                  <div className="space-y-4">
                     <h2 className="text-4xl font-black text-secondary tracking-tight uppercase italic">New Response</h2>
                     <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] ml-1">Automate a customer path</p>
                  </div>
                  <div className="space-y-8">
                     <div className="space-y-4">
                        <label className="text-[11px] font-black uppercase text-secondary tracking-widest ml-4 italic">The Trigger Keyword</label>
                        <input type="text" id="trigger" className="w-full h-20 px-8 bg-gray-50 border-4 border-transparent focus:border-primary/10 focus:bg-white rounded-[30px] outline-none font-black text-secondary text-lg shadow-inner transition-all" placeholder="e.g. 'link'" />
                     </div>
                     <div className="space-y-4">
                        <label className="text-[11px] font-black uppercase text-secondary tracking-widest ml-4 italic">The Auto Message</label>
                        <textarea id="response" className="w-full h-40 p-10 bg-gray-50 border-4 border-transparent focus:border-primary/10 focus:bg-white rounded-[45px] outline-none font-black text-secondary text-lg resize-none shadow-inner transition-all" placeholder="Hey! Check this out..."></textarea>
                     </div>
                     <button onClick={() => { const t = (document.getElementById('trigger') as HTMLInputElement).value; const r = (document.getElementById('response') as HTMLTextAreaElement).value; if(t && r) { setKeywords([...keywords, { id: Date.now().toString(), trigger: t, response: r }]); setShowAddModal(false); } }} className="w-full py-7 bg-secondary text-white font-black text-xs uppercase tracking-[0.3em] rounded-full hover:bg-gray-800 transition-all shadow-3xl shadow-secondary/20 hover:scale-[1.03] active:scale-95">Set Automation</button>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>
      <div className="pb-20"></div>
    </div>
  )
}
