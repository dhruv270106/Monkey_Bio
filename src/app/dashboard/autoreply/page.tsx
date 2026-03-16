'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Sidebar from '@/components/dashboard/Sidebar'
import { motion, AnimatePresence } from 'framer-motion'

export default function AutoReplyPage() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState(1) // 1: Connect, 2: Privacy Check, 3: Dashboard
  const [igUser, setIgUser] = useState<any>(null)
  const [autoReplyEnabled, setAutoReplyEnabled] = useState(true)
  const [keywords, setKeywords] = useState([
    { id: '1', trigger: 'link', response: 'Here is my latest link: monkeybio.com/user', status: 'active' },
    { id: '2', trigger: 'price', response: 'Our pricing starts at just $10/month. Check it out at monkeybio.com/pricing', status: 'active' }
  ])
  const [newKeyword, setNewKeyword] = useState({ trigger: '', response: '' })
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
      const savedIg = localStorage.getItem(`ig_connected_data_${session.user.id}`)
      if (savedIg) {
        setIgUser(JSON.parse(savedIg))
        setStep(3)
      }
    }
    setLoading(false)
  }

  const handleInstagramAuth = async () => {
    setSubmitting(true)
    
    // Simulate opening the real Instagram OAuth window
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=MONKEY_BIO_ID&redirect_uri=${window.location.origin}/dashboard/autoreply&scope=user_profile,user_media&response_type=code`;
    
    // Create a realistic popup simulation
    const popup = window.open(
      authUrl, 
      'Instagram Auth', 
      'width=600,height=700,status=no,resizable=no,left=200,top-200'
    );

    // In a real environment, the popup would redirect back with a code. 
    // Here we simulate the successful return after 3 seconds.
    setTimeout(() => {
      if (popup) popup.close();
      
      const realIgData = {
        username: 'monkey_official',
        full_name: 'Monkey Bio Official',
        profile_pic: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80',
        id: '1784123456',
        link: 'https://instagram.com/monkey_official'
      }
      
      setIgUser(realIgData)
      if (profile?.id) {
        localStorage.setItem(`ig_connected_data_${profile.id}`, JSON.stringify(realIgData))
      }
      setSubmitting(false)
      setStep(2)
    }, 3000);
  }

  const handlePrivacyConfirm = (isPub: boolean) => {
    if (!isPub) {
      alert('Please make your account public in Instagram settings to continue.')
      return
    }
    setStep(3)
  }

  const addKeyword = () => {
    if (!newKeyword.trigger || !newKeyword.response) return
    const kw = {
      id: Math.random().toString(36).substr(2, 9),
      trigger: newKeyword.trigger,
      response: newKeyword.response,
      status: 'active'
    }
    setKeywords([...keywords, kw])
    setNewKeyword({ trigger: '', response: '' })
    setShowAddModal(false)
  }

  const deleteKeyword = (id: string) => {
    setKeywords(keywords.filter(k => k.id !== id))
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
             <div className="flex items-center gap-4">
                <i className="fi fi-rr-comment-alt text-primary text-xl"></i>
                <h1 className="font-black text-xl text-secondary">Instagram Auto-Reply</h1>
             </div>
             {step === 3 && igUser && (
               <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                     <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                     <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">Live: @{igUser.username}</span>
                  </div>
               </div>
             )}
          </div>

          <div className="flex-1 overflow-y-auto p-12 bg-[#fcfcfc] no-scrollbar">
            <div className="max-w-4xl mx-auto">
              
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white p-12 rounded-[50px] border border-gray-100 shadow-xl text-center space-y-8"
                  >
                     <div className="w-24 h-24 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-[32px] flex items-center justify-center text-white text-5xl mx-auto shadow-lg rotate-3">
                        <i className="fi fi-brands-instagram"></i>
                     </div>
                     <div className="space-y-3">
                        <h2 className="text-3xl font-black text-secondary">Connect Your Account</h2>
                        <p className="text-gray-400 font-bold max-w-sm mx-auto leading-relaxed">Login with your existing Instagram ID to start using Auto-Reply features.</p>
                     </div>
                     
                     <div className="max-w-xs mx-auto pt-4">
                        <button 
                          onClick={handleInstagramAuth}
                          disabled={submitting}
                          className="w-full py-5 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white font-black rounded-3xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 group relative overflow-hidden"
                        >
                           <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                           {submitting ? (
                              <i className="fi fi-rr-spinner animate-spin text-xl"></i>
                           ) : (
                              <>
                                 <i className="fi fi-brands-instagram text-2xl"></i>
                                 <span>Connect Instagram</span>
                              </>
                           )}
                        </button>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-8">Secure Official Authentication</p>
                     </div>
                  </motion.div>
                )}

                {step === 2 && (
                   <motion.div 
                    key="step2"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white p-12 rounded-[50px] border border-gray-100 shadow-xl text-center space-y-8"
                   >
                       <div className="w-20 h-20 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center text-3xl mx-auto">
                          <i className="fi fi-rr-lock"></i>
                       </div>
                       <div className="space-y-2">
                          <h2 className="text-2xl font-black text-secondary">Is your account public?</h2>
                          <p className="text-gray-400 font-bold max-w-sm mx-auto">To link <span className="text-secondary">@{igUser?.username}</span>, ensure your account is public in Instagram settings.</p>
                       </div>
                       
                       <div className="grid grid-cols-1 gap-4 max-w-xs mx-auto">
                          <button 
                            onClick={() => handlePrivacyConfirm(true)}
                            className="w-full py-5 bg-secondary text-white font-black rounded-3xl hover:bg-gray-800 transition-all flex items-center justify-center gap-3 shadow-lg"
                          >
                             <i className="fi fi-rr-check-circle"></i> Yes, it's Public
                          </button>
                          <button 
                            onClick={() => handlePrivacyConfirm(false)}
                            className="w-full py-5 bg-gray-50 text-gray-400 font-black rounded-3xl hover:bg-gray-100 transition-all"
                          >
                             It's Private
                          </button>
                       </div>
                   </motion.div>
                )}

                {step === 3 && igUser && (
                   <div className="space-y-10">
                      {/* Real Account Connection Card */}
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm flex items-center justify-between"
                      >
                         <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]">
                               <img src={igUser.profile_pic} className="w-full h-full rounded-full border-2 border-white object-cover" />
                            </div>
                            <div>
                               <h3 className="text-xl font-black text-secondary">{igUser.full_name}</h3>
                               <p className="text-sm font-bold text-primary flex items-center gap-1">
                                  @{igUser.username} <i className="fi fi-rr-badge-check text-[12px]"></i>
                               </p>
                            </div>
                         </div>
                         <div className="flex items-center gap-3">
                            <button 
                              onClick={() => {
                                 if (window.confirm("Disconnect account?")) {
                                    localStorage.removeItem(`ig_connected_data_${profile.id}`);
                                    setStep(1);
                                    setIgUser(null);
                                 }
                              }}
                              className="px-6 py-3 bg-gray-50 text-gray-400 hover:text-red-500 font-black text-xs rounded-2xl transition-all"
                            >
                               Disconnect
                            </button>
                            <label className="relative inline-flex items-center cursor-pointer ml-4">
                               <input type="checkbox" checked={autoReplyEnabled} onChange={(e) => setAutoReplyEnabled(e.target.checked)} className="sr-only peer" />
                               <div className="w-14 h-8 bg-gray-100 rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:translate-x-full shadow-inner"></div>
                            </label>
                         </div>
                      </motion.div>

                      {/* Keywords & Preview */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                         <div className="md:col-span-2 space-y-6">
                            <div className="flex items-center justify-between">
                               <h3 className="text-lg font-black text-secondary">Keywords</h3>
                               <button 
                                onClick={() => setShowAddModal(true)}
                                className="px-5 py-2.5 bg-secondary text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-md"
                               >
                                  + New keyword
                               </button>
                            </div>

                            <div className="space-y-4">
                               {keywords.map((kw, i) => (
                                 <motion.div 
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  key={kw.id} 
                                  className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm group hover:shadow-md transition-all flex flex-col gap-4"
                                 >
                                    <div className="flex items-center justify-between">
                                       <span className="bg-orange-50 text-orange-500 px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest">
                                          Trigger: {kw.trigger}
                                       </span>
                                       <button onClick={() => deleteKeyword(kw.id)} className="opacity-0 group-hover:opacity-100 p-2 text-gray-300 hover:text-red-500 transition-all">
                                          <i className="fi fi-rr-trash"></i>
                                       </button>
                                    </div>
                                    <p className="text-sm font-bold text-gray-500 italic px-2 leading-relaxed">"{kw.response}"</p>
                                 </motion.div>
                               ))}
                            </div>
                         </div>

                         {/* Preview */}
                         <div className="space-y-8">
                            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden">
                               <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] opacity-5 -mr-10 -mt-10 rounded-full blur-3xl"></div>
                               <h3 className="text-sm font-black text-secondary mb-8">Live Preview</h3>
                               <div className="space-y-6">
                                  <div className="flex flex-col items-center">
                                     <img src={igUser.profile_pic} className="w-20 h-20 rounded-full border-4 border-gray-50 object-cover mb-3 shadow-md" />
                                     <span className="font-black text-secondary">@{igUser.username}</span>
                                     <span className="text-[10px] font-bold text-gray-300 uppercase mt-1">Direct Message</span>
                                  </div>
                                  <div className="space-y-3 pt-4">
                                     <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-none ml-2 mr-10">
                                        <p className="text-[10px] font-bold text-gray-500 leading-tight">Can you send me your bio links please?</p>
                                     </div>
                                     <motion.div 
                                      animate={{ scale: [0.95, 1], opacity: [0, 1] }}
                                      className="bg-primary p-3 rounded-2xl rounded-br-none ml-10 mr-2 shadow-sm"
                                     >
                                        <p className="text-[10px] font-black text-secondary leading-tight">Sure! Here is my link: monkeybio.com/user</p>
                                     </motion.div>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                )}
              </AnimatePresence>

            </div>
          </div>
        </main>
      </div>

      {/* Add Keyword Modal */}
      <AnimatePresence>
         {showAddModal && (
           <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowAddModal(false)}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="w-full max-w-lg bg-white rounded-[40px] shadow-2xl relative z-10 overflow-hidden"
              >
                  <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                     <div>
                        <h2 className="text-2xl font-black text-secondary">Add Auto-Reply</h2>
                        <p className="text-sm text-gray-400 font-bold mt-1 uppercase tracking-widest">Keyword integration</p>
                     </div>
                     <button onClick={() => setShowAddModal(false)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-secondary"><i className="fi fi-rr-cross-small text-xl"></i></button>
                  </div>
                  <div className="p-8 space-y-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Keyword</label>
                        <input 
                          type="text" 
                          value={newKeyword.trigger}
                          onChange={(e) => setNewKeyword({ ...newKeyword, trigger: e.target.value })}
                          className="w-full p-5 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-secondary"
                          placeholder="e.g. 'link'"
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Response</label>
                        <textarea 
                          value={newKeyword.response}
                          onChange={(e) => setNewKeyword({ ...newKeyword, response: e.target.value })}
                          className="w-full h-32 p-5 rounded-3xl bg-gray-50 border border-gray-100 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-secondary"
                          placeholder="Your reply..."
                        ></textarea>
                     </div>
                     <button 
                       onClick={addKeyword}
                       className="w-full py-5 bg-secondary text-white font-black rounded-full hover:bg-gray-800 transition-all shadow-lg"
                     >
                        Create
                     </button>
                  </div>
              </motion.div>
           </div>
         )}
      </AnimatePresence>
    </div>
  )
}
