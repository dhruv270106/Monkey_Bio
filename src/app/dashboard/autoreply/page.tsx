'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Sidebar from '@/components/dashboard/Sidebar'
import { motion, AnimatePresence } from 'framer-motion'

export default function AutoReplyPage() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState(1) // 1: Connect, 2: Privacy Check, 3: Dashboard
  const [igUsername, setIgUsername] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  
  // Dashboard states
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
      // Check if IG is already connected in local storage
      const savedIg = localStorage.getItem(`ig_connected_${session.user.id}`)
      if (savedIg) {
        setIgUsername(savedIg)
        setStep(3)
      }
    }
    setLoading(false)
  }

  const handleConnect = () => {
    if (!igUsername.startsWith('@')) {
       alert('Please enter a valid Instagram username starting with @')
       return
    }
    setStep(2)
  }

  const handlePrivacyConfirm = (isPub: boolean) => {
    if (!isPub) {
      alert('Please make your account public in Instagram settings to continue.')
      return
    }
    setIsPublic(true)
    setStep(3)
    if (profile?.id) {
      localStorage.setItem(`ig_connected_${profile.id}`, igUsername)
    }
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
             {step === 3 && (
               <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                     <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                     <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">Live: {igUsername}</span>
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
                        <h2 className="text-3xl font-black text-secondary">Connect Instagram</h2>
                        <p className="text-gray-400 font-bold max-w-sm mx-auto leading-relaxed">Boost your engagement by automatically replying to DMs with your Monkey Bio links.</p>
                     </div>
                     <div className="max-w-xs mx-auto space-y-4">
                        <button 
                          onClick={() => {
                             setSubmitting(true);
                             // Simulating Instagram OAuth Popup
                             setTimeout(() => {
                                setIgUsername('@monkey_creator'); // Mocked username from "auth"
                                setSubmitting(false);
                                setStep(2);
                             }, 1500);
                          }}
                          disabled={submitting}
                          className="w-full py-5 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white font-black rounded-3xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-70"
                        >
                           {submitting ? (
                              <i className="fi fi-rr-spinner animate-spin"></i>
                           ) : (
                              <>
                                 <i className="fi fi-brands-instagram text-xl"></i>
                                 Connect with Instagram
                              </>
                           )}
                        </button>
                     </div>
                     <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Trusted by 1M+ creators</p>
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
                          <p className="text-gray-400 font-bold max-w-sm mx-auto">Instagram requires your account to be <span className="text-secondary">Public</span> for Auto-Reply to work. Private accounts cannot use this feature.</p>
                       </div>
                       
                       <div className="grid grid-cols-1 gap-4 max-w-xs mx-auto">
                          <button 
                            onClick={() => handlePrivacyConfirm(true)}
                            className="w-full py-5 bg-secondary text-white font-black rounded-3xl hover:bg-gray-800 transition-all flex items-center justify-center gap-3"
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
                       
                       <div className="pt-6 border-t border-gray-50 text-left">
                          <p className="text-xs font-black text-secondary mb-4 uppercase tracking-widest">How to make public:</p>
                          <ul className="text-sm font-bold text-gray-400 space-y-3">
                             <li className="flex gap-3">
                                <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] flex-shrink-0">1</span>
                                Open Instagram Settings
                             </li>
                             <li className="flex gap-3">
                                <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] flex-shrink-0">2</span>
                                Tap Privacy {'>'} Account Privacy
                             </li>
                             <li className="flex gap-3">
                                <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] flex-shrink-0">3</span>
                                Toggle off 'Private Account'
                             </li>
                          </ul>
                       </div>
                   </motion.div>
                )}

                {step === 3 && (
                   <div className="space-y-10">
                      {/* Configuration Card */}
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm flex items-center justify-between"
                      >
                         <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-[24px] bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white text-2xl shadow-inner">
                               <i className="fi fi-brands-instagram"></i>
                            </div>
                            <div>
                               <h3 className="text-xl font-black text-secondary">{igUsername}</h3>
                               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Status: <span className="text-green-500 font-black">Connected & Active</span></p>
                            </div>
                         </div>
                         <div className="flex items-center gap-3">
                            <button 
                              onClick={() => {
                                 const confirm = window.confirm("Disconnect Instagram?");
                                 if (confirm) {
                                    localStorage.removeItem(`ig_connected_${profile.id}`);
                                    setStep(1);
                                 }
                              }}
                              className="px-6 py-3 bg-gray-50 text-gray-400 hover:text-red-500 font-black text-xs rounded-2xl transition-all"
                            >
                               Disconnect
                            </button>
                            <label className="relative inline-flex items-center cursor-pointer ml-4">
                               <input type="checkbox" checked={autoReplyEnabled} onChange={(e) => setAutoReplyEnabled(e.target.checked)} className="sr-only peer" />
                               <div className="w-14 h-8 bg-gray-100 peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                         </div>
                      </motion.div>

                      {/* Main Dashboard Panel */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                         <div className="md:col-span-2 space-y-6">
                            <div className="flex items-center justify-between">
                               <h3 className="text-lg font-black text-secondary">Auto-Reply Keywords</h3>
                               <button 
                                onClick={() => setShowAddModal(true)}
                                className="px-5 py-2.5 bg-secondary text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-md"
                               >
                                  + New Keyword
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
                                       <div className="flex items-center gap-3">
                                          <div className="bg-orange-50 text-orange-500 px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest">
                                             Keyword: {kw.trigger}
                                          </div>
                                          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                       </div>
                                       <button onClick={() => deleteKeyword(kw.id)} className="opacity-0 group-hover:opacity-100 p-2 text-gray-300 hover:text-red-500 transition-all">
                                          <i className="fi fi-rr-trash"></i>
                                       </button>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 min-h-[60px]">
                                       <p className="text-sm font-bold text-gray-500 italic leading-relaxed">"{kw.response}"</p>
                                    </div>
                                 </motion.div>
                               ))}
                            </div>
                         </div>

                         <div className="space-y-8">
                            {/* Instagram Preview Card */}
                            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden">
                               <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] opacity-5 -mr-10 -mt-10 rounded-full blur-3xl"></div>
                               <h3 className="text-sm font-black text-secondary mb-6 flex items-center gap-2">
                                  <i className="fi fi-brands-instagram"></i> Live Preview
                               </h3>
                               <div className="space-y-6">
                                  <div className="flex flex-col items-center">
                                     <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-1 mb-3">
                                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center p-0.5">
                                           <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-gray-300 text-3xl">
                                              <i className="fi fi-rr-user"></i>
                                           </div>
                                        </div>
                                     </div>
                                     <span className="font-black text-secondary">{igUsername}</span>
                                     <span className="text-[10px] font-bold text-gray-300 uppercase mt-1">Direct Message</span>
                                  </div>
                                  <div className="space-y-3">
                                     <div className="bg-gray-50 p-3 rounded-2xl rounded-bl-none ml-2 mr-10 shadow-sm border border-gray-100">
                                        <p className="text-[10px] font-bold text-gray-500">How do I get your latest link?</p>
                                     </div>
                                     <motion.div 
                                      animate={{ scale: [0.95, 1], opacity: [0, 1] }}
                                      className="bg-primary p-3 rounded-2xl rounded-br-none ml-10 mr-2 shadow-sm"
                                     >
                                        <p className="text-[10px] font-black text-secondary">Here is my latest link: monkeybio.com/user</p>
                                     </motion.div>
                                  </div>
                               </div>
                            </div>

                            <div className="bg-secondary p-8 rounded-[40px] text-white">
                               <h4 className="text-sm font-black uppercase tracking-widest mb-2 opacity-50">Pro Tip</h4>
                               <p className="text-sm font-bold leading-relaxed">Use short keywords like <span className="text-primary italic">'link'</span> or <span className="text-primary italic">'sale'</span> to make it easy for your followers.</p>
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
                        <p className="text-sm text-gray-400 font-bold mt-1 uppercase tracking-widest">Connect keywords to actions</p>
                     </div>
                     <button onClick={() => setShowAddModal(false)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-secondary transition-all"><i className="fi fi-rr-cross-small text-xl"></i></button>
                  </div>
                  <div className="p-8 space-y-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Trigger Keyword</label>
                        <input 
                          type="text" 
                          value={newKeyword.trigger}
                          onChange={(e) => setNewKeyword({ ...newKeyword, trigger: e.target.value })}
                          className="w-full p-5 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-secondary"
                          placeholder="e.g. 'link', 'price', 'help'"
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Auto-Reply Message</label>
                        <textarea 
                          value={newKeyword.response}
                          onChange={(e) => setNewKeyword({ ...newKeyword, response: e.target.value })}
                          className="w-full h-32 p-5 rounded-3xl bg-gray-50 border border-gray-100 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-secondary"
                          placeholder="What should it say?"
                        ></textarea>
                     </div>
                     <button 
                       onClick={addKeyword}
                       className="w-full py-5 bg-secondary text-white font-black rounded-full hover:bg-gray-800 transition-all shadow-lg"
                     >
                        Confirm Keyword
                     </button>
                  </div>
              </motion.div>
           </div>
         )}
      </AnimatePresence>
    </div>
  )
}
