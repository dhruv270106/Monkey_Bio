'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Sidebar from '@/components/dashboard/Sidebar'
import { motion, AnimatePresence } from 'framer-motion'

export default function AutoReplyPage() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState(1) // 1: Connect, 2: Dashboard
  const [igUser, setIgUser] = useState<any>(null)
  const [autoReplyEnabled, setAutoReplyEnabled] = useState(true)
  const [keywords, setKeywords] = useState<any[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      window.location.href = '/login'
      return
    }

    const { data: profileData } = await supabase
      .from('monkey_bio')
      .select('*')
      .eq('id', session.user.id)
      .single()

    if (profileData) {
      setProfile(profileData)
      
      // Check for DB connection first, fallback to localStorage
      if (profileData.instagram_connection) {
        setIgUser(profileData.instagram_connection)
        setStep(2)
      } else {
        const savedIg = localStorage.getItem(`ig_connected_data_${session.user.id}`)
        if (savedIg) {
          setIgUser(JSON.parse(savedIg))
          setStep(2)
        }
      }
    }
    setLoading(false)
  }

  const handleInstagramConnect = () => {
    setSubmitting(true)
    
    const APP_ID = process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID || 'YOUR_APP_ID';
    const REDIRECT_URI = typeof window !== 'undefined' ? `${window.location.origin}/auth/instagram/callback` : '';
    const SCOPES = [
      'instagram_basic',
      'instagram_manage_messages',
      'pages_show_list',
      'pages_read_engagement',
      'public_profile'
    ].join(',');

    const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${SCOPES}&response_type=code`;
    
    const popup = window.open(authUrl, 'Connect Instagram', 'width=600,height=800,status=no,resizable=yes,left=300,top=100');

    // Listener for the message from the callback popup
    const handleMessage = (event: MessageEvent) => {
       if (event.data.type === 'INSTAGRAM_AUTH_SUCCESS') {
          const igData = event.data.data;
          
          setIgUser(igData)
          if (profile?.id) {
            localStorage.setItem(`ig_connected_data_${profile.id}`, JSON.stringify(igData))
          }
          setSubmitting(false)
          setStep(2)
          window.removeEventListener('message', handleMessage);
       }
    };

    window.addEventListener('message', handleMessage);

    // Safety timeout in case user closes popup manually
    const checkPopup = setInterval(() => {
       if (!popup || popup.closed) {
          clearInterval(checkPopup);
          setSubmitting(false);
          window.removeEventListener('message', handleMessage);
       }
    }, 1000);
  }

  if (loading) return null

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar userProfile={profile} />

      <main className="flex-1 flex flex-col bg-[#fcfcfc]">
        {/* Header */}
        <header className="h-16 px-8 flex items-center justify-between bg-white border-b border-gray-50">
           <div className="flex items-center gap-3">
              <i className="fi fi-rr-comment-alt text-primary"></i>
              <h1 className="font-black text-secondary">Auto-Reply</h1>
           </div>
           {step === 2 && (
             <div className="bg-green-50 px-4 py-1.5 rounded-full flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">Active Connection</span>
             </div>
           )}
        </header>

        <div className="flex-1 p-10 overflow-y-auto no-scrollbar">
           <div className="max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                   <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white p-12 rounded-[50px] border border-gray-100 shadow-xl text-center space-y-8 mt-10"
                   >
                      <div className="w-24 h-24 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-[32px] flex items-center justify-center text-white text-5xl mx-auto shadow-lg rotate-2">
                         <i className="fi fi-brands-instagram"></i>
                      </div>
                      <div className="space-y-4">
                         <h2 className="text-3xl font-black text-secondary">Link Your Instagram</h2>
                         <p className="text-gray-400 font-bold max-w-xs mx-auto">Connect your main Instagram ID to start using automatic replies for your followers.</p>
                      </div>
                      <div className="max-w-xs mx-auto space-y-4">
                         <button 
                          onClick={handleInstagramConnect}
                          disabled={submitting}
                          className="w-full py-5 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white font-black rounded-3xl shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3"
                         >
                            {submitting ? <i className="fi fi-rr-spinner animate-spin"></i> : <><i className="fi fi-brands-instagram text-xl"></i> Connect Instagram</>}
                         </button>
                          <p className="text-[10px] text-gray-400 font-bold">
                           Requires an <span className="text-secondary">Instagram Business/Creator</span> account linked to a <span className="text-secondary">Facebook Page</span>.
                         </p>
                      </div>

                      <div className="max-w-md mx-auto p-6 bg-blue-50/50 rounded-3xl border border-blue-100/50 space-y-3">
                         <div className="flex items-center gap-2 text-blue-600">
                           <i className="fi fi-rr-info text-sm"></i>
                           <span className="text-[10px] font-black uppercase tracking-widest">Why Facebook login?</span>
                         </div>
                         <p className="text-[11px] text-blue-800/70 font-bold leading-relaxed">
                           To enable <span className="text-blue-900">Auto DM/Automated Messaging</span>, Meta requires access through their official Business API. This ensures your account remains secure while allowing Monkey Bio to handle automated replies on your behalf.
                         </p>
                      </div>

                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Official Meta Integration</p>
                   </motion.div>
                ) : (
                   <div className="space-y-8">
                      {/* Connection Card */}
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                        className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex items-center justify-between"
                      >
                         <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]">
                               <img src={igUser.profile_pic} className="w-full h-full rounded-full border-2 border-white object-cover shadow-sm" />
                            </div>
                            <div>
                               <h3 className="text-xl font-black text-secondary">@{igUser.username}</h3>
                               <p className="text-xs font-bold text-gray-300 uppercase tracking-widest mt-0.5">Primary ID Linked</p>
                            </div>
                         </div>
                         <button 
                          onClick={async () => { 
                            if(confirm("Disconnect ID?")) { 
                              setLoading(true);
                              await supabase.from('monkey_bio').update({ instagram_connection: null }).eq('id', profile.id);
                              localStorage.removeItem(`ig_connected_data_${profile.id}`); 
                              setIgUser(null);
                              setStep(1); 
                              setLoading(false);
                            } 
                          }}
                          className="px-6 py-3 bg-gray-50 text-gray-400 hover:text-red-500 font-black text-xs rounded-2xl transition-all"
                         >
                            Disconnect
                         </button>
                      </motion.div>

                      {/* Keywords Panel */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                         <div className="md:col-span-2 space-y-6">
                            <div className="flex items-center justify-between px-2">
                               <h3 className="text-lg font-black text-secondary">Auto-Reponses</h3>
                               <button onClick={() => setShowAddModal(true)} className="w-10 h-10 bg-secondary text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all">
                                  <i className="fi fi-rr-plus"></i>
                               </button>
                            </div>

                            {keywords.length === 0 ? (
                               <div className="bg-white p-12 rounded-[40px] border border-dashed border-gray-200 text-center space-y-4">
                                  <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto text-xl">
                                     <i className="fi fi-rr-comment-dots"></i>
                                  </div>
                                  <p className="text-sm font-bold text-gray-400">No auto-replies set up yet.</p>
                                  <button onClick={() => setShowAddModal(true)} className="text-primary font-black text-xs uppercase tracking-widest hover:underline">Add Your First Keyword</button>
                               </div>
                            ) : (
                               <div className="space-y-4">
                                  {keywords.map((kw, i) => (
                                    <div key={kw.id} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between group">
                                       <div className="space-y-1">
                                          <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">When they say "{kw.trigger}"</span>
                                          <p className="text-sm font-bold text-gray-500">{kw.response}</p>
                                       </div>
                                       <button onClick={() => setKeywords(keywords.filter(k => k.id !== kw.id))} className="w-8 h-8 rounded-full bg-red-50 text-red-500 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                                          <i className="fi fi-rr-trash text-xs"></i>
                                       </button>
                                    </div>
                                  ))}
                               </div>
                            )}
                         </div>

                         {/* Preview */}
                         <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm h-fit">
                            <h3 className="text-sm font-black text-secondary mb-6 flex items-center gap-2">
                               <i className="fi fi-rr-eye text-primary"></i> Preview
                            </h3>
                            <div className="space-y-8">
                               <div className="flex flex-col items-center">
                                  <img src={igUser.profile_pic} className="w-20 h-20 rounded-full mb-3 shadow-md border-4 border-white" />
                                  <span className="font-black text-secondary text-sm">@{igUser.username}</span>
                               </div>
                               <div className="space-y-4 pt-4 border-t border-gray-50">
                                  <div className="bg-gray-50 p-3 rounded-2xl rounded-bl-none mr-8 text-[10px] font-bold text-gray-400 italic">"Send me your link!"</div>
                                  <div className="bg-primary p-3 rounded-2xl rounded-br-none ml-8 text-[10px] font-black text-secondary">"Sure! Here it is: monkeybio.com/user"</div>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                )}
              </AnimatePresence>
           </div>
        </div>

        {/* Modal */}
        <AnimatePresence>
           {showAddModal && (
              <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAddModal(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                 <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white w-full max-w-lg rounded-[40px] overflow-hidden shadow-2xl relative z-10 p-10 space-y-6">
                    <h2 className="text-2xl font-black text-secondary">New Auto-Reply</h2>
                    <div className="space-y-4">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Keyword</label>
                          <input type="text" id="trigger" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold text-secondary" placeholder="e.g. 'link'" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Reply</label>
                          <textarea id="response" className="w-full h-32 p-4 bg-gray-50 border border-gray-100 rounded-3xl outline-none font-bold text-secondary" placeholder="Your reply message..."></textarea>
                       </div>
                       <button 
                        onClick={() => {
                           const t = (document.getElementById('trigger') as HTMLInputElement).value;
                           const r = (document.getElementById('response') as HTMLTextAreaElement).value;
                           if(t && r) {
                              setKeywords([...keywords, { id: Date.now().toString(), trigger: t, response: r }]);
                              setShowAddModal(false);
                           }
                        }}
                        className="w-full py-4 bg-secondary text-white font-black rounded-full hover:bg-gray-800 transition-all shadow-lg"
                       >
                          Add Auto-Reply
                       </button>
                    </div>
                 </motion.div>
              </div>
           )}
        </AnimatePresence>
      </main>
    </div>
  )
}
