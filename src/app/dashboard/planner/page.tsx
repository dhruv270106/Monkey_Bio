'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Sidebar from '@/components/dashboard/Sidebar'
import { motion, AnimatePresence } from 'framer-motion'

interface ScheduledPost {
  id: string
  platform: 'instagram' | 'tiktok' | 'facebook' | 'twitter' | 'linkedin'
  content: string
  status: 'scheduled'| 'published' | 'draft'
  date: string
  time: string
  image?: string
}

const DUMMY_POSTS: ScheduledPost[] = [
  { id: '1', platform: 'instagram', content: 'Exciting news coming soon! Stay tuned. 🐒🚀', status: 'scheduled', date: '2026-03-20', time: '10:00 AM', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=400' },
  { id: '2', platform: 'tiktok', content: 'New vlog is out! Link in bio. #monkeybio #vlog', status: 'published', date: '2026-03-15', time: '06:30 PM', image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&q=80&w=400' },
  { id: '3', platform: 'linkedin', content: 'We are hiring! Join the team and help us build the future.', status: 'draft', date: '2026-03-25', time: '09:00 AM' },
]

export default function SocialPlannerPage() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('calendar') // calendar, queue, drafts
  const [showScheduleModal, setShowScheduleModal] = useState(false)

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
    }
    setLoading(false)
  }

  const platforms = [
    { id: 'instagram', icon: 'fi-brands-instagram', color: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]', name: 'Instagram' },
    { id: 'tiktok', icon: 'fi-brands-tiktok', color: 'bg-black', name: 'TikTok' },
    { id: 'facebook', icon: 'fi-brands-facebook', color: 'bg-[#1877F2]', name: 'Facebook' },
    { id: 'twitter', icon: 'fi-brands-twitter', color: 'bg-[#1DA1F2]', name: 'X / Twitter' },
    { id: 'linkedin', icon: 'fi-brands-linkedin', color: 'bg-[#0A66C2]', name: 'LinkedIn' },
  ]

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
                <i className="fi fi-rr-calendar text-primary text-xl"></i>
                <h1 className="font-black text-xl text-secondary">Social Planner</h1>
             </div>
             <div className="flex items-center gap-3">
                 <button 
                  onClick={() => setShowScheduleModal(true)}
                  className="bg-primary text-secondary px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-sm"
                 >
                    Schedule Post
                 </button>
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 bg-[#fcfcfc] no-scrollbar">
            <div className="max-w-6xl mx-auto space-y-10">
              
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                 {[
                   { label: 'Scheduled', val: '12', icon: 'fi-rr-calendar-clock', color: 'text-purple-500' },
                   { label: 'Drafts', val: '04', icon: 'fi-rr-memo', color: 'text-orange-500' },
                   { label: 'Published', val: '89', icon: 'fi-rr-badge-check', color: 'text-green-500' },
                   { label: 'Total Accounts', val: '05', icon: 'fi-rr-network', color: 'text-blue-500' },
                 ].map((stat, i) => (
                   <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-5"
                   >
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gray-50 ${stat.color}`}>
                         <i className={`fi ${stat.icon} text-xl`}></i>
                      </div>
                      <div>
                         <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{stat.label}</p>
                         <h3 className="text-xl font-black text-secondary">{stat.val}</h3>
                      </div>
                   </motion.div>
                 ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                 {/* Main Content Area */}
                 <div className="lg:col-span-2 space-y-8">
                    {/* View Switcher */}
                    <div className="flex items-center gap-2 bg-gray-100/50 p-1 rounded-2xl w-fit border border-gray-100">
                       {['calendar', 'queue', 'drafts'].map((tab) => (
                         <button 
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-secondary shadow-sm rounded-xl' : 'text-gray-400 hover:text-secondary'}`}
                         >
                            {tab}
                         </button>
                       ))}
                    </div>

                    {activeTab === 'calendar' && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden"
                      >
                         <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                            <h2 className="text-lg font-black text-secondary">March 2026</h2>
                            <div className="flex items-center gap-2">
                               <button className="p-2 hover:bg-gray-100 rounded-lg"><i className="fi fi-rr-angle-left"></i></button>
                               <button className="p-2 hover:bg-gray-100 rounded-lg"><i className="fi fi-rr-angle-right"></i></button>
                            </div>
                         </div>
                         <div className="grid grid-cols-7 border-b border-gray-50">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                              <div key={day} className="py-3 text-center text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] bg-gray-50/30">
                                {day}
                              </div>
                            ))}
                         </div>
                         <div className="grid grid-cols-7">
                            {Array.from({ length: 31 }).map((_, i) => (
                              <div key={i} className={`h-24 p-2 border-r border-b border-gray-50 hover:bg-gray-50 transition-colors relative group ${i === 15 ? 'bg-primary/5' : ''}`}>
                                 <span className={`text-[10px] font-black ${i === 15 ? 'text-primary' : 'text-gray-400'}`}>{i + 1}</span>
                                 {i === 15 && (
                                   <div className="mt-1 flex flex-col gap-1">
                                      <div className="p-1 px-2 bg-pink-500 text-white rounded-md text-[8px] font-bold truncate">IG Post</div>
                                      <div className="p-1 px-2 bg-black text-white rounded-md text-[8px] font-bold truncate">TikTok</div>
                                   </div>
                                 )}
                                 {i === 19 && (
                                   <div className="mt-1">
                                      <div className="p-1 px-2 bg-blue-500 text-white rounded-md text-[8px] font-bold truncate">Webinar</div>
                                   </div>
                                 )}
                                 <button className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all p-1.5 bg-secondary text-white rounded-lg text-[8px]">
                                    <i className="fi fi-rr-plus"></i>
                                 </button>
                              </div>
                            ))}
                         </div>
                      </motion.div>
                    )}

                    {activeTab === 'queue' && (
                       <div className="space-y-4">
                          {DUMMY_POSTS.filter(p => p.status !== 'draft').map((post, i) => (
                            <motion.div 
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              key={post.id} 
                              className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-6 group hover:shadow-md transition-all"
                            >
                               <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
                                  {post.image ? <img src={post.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-300"><i className="fi fi-rr-picture text-xl"></i></div>}
                               </div>
                               <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                     {platforms.find(p => p.id === post.platform)?.name && (
                                       <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 tracking-widest">{post.platform}</span>
                                     )}
                                     <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full tracking-widest ${post.status === 'scheduled' ? 'bg-blue-50 text-blue-500' : 'bg-green-50 text-green-500'}`}>{post.status}</span>
                                  </div>
                                  <p className="text-sm font-bold text-secondary truncate">{post.content}</p>
                                  <p className="text-[10px] text-gray-400 mt-1 font-medium">{post.date} at {post.time}</p>
                               </div>
                               <div className="flex items-center gap-2">
                                  <button className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 hover:text-secondary flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"><i className="fi fi-rr-edit"></i></button>
                                  <button className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 hover:text-red-500 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"><i className="fi fi-rr-trash"></i></button>
                               </div>
                             </motion.div>
                          ))}
                       </div>
                    )}
                 </div>

                 {/* Right Sidebar */}
                 <div className="space-y-8">
                    {/* Connected Accounts */}
                    <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
                       <h3 className="text-lg font-black text-secondary mb-6">Social Accounts</h3>
                       <div className="space-y-4">
                          {platforms.map((p) => (
                            <div key={p.id} className="flex items-center justify-between group">
                               <div className="flex items-center gap-4">
                                  <div className={`w-10 h-10 rounded-xl ${p.color} flex items-center justify-center text-white shadow-sm`}>
                                     <i className={`fi ${p.icon}`}></i>
                                  </div>
                                  <span className="text-sm font-bold text-secondary">{p.name}</span>
                               </div>
                               <div className="flex items-center">
                                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2 ring-4 ring-green-50"></div>
                                  <span className="text-[10px] font-black text-gray-300 uppercase">Live</span>
                               </div>
                            </div>
                          ))}
                          <button className="w-full mt-4 py-3 bg-gray-50 hover:bg-gray-100 transition-all text-secondary font-black text-xs rounded-2xl border border-dashed border-gray-200">
                             + Add New Account
                          </button>
                       </div>
                    </div>

                    {/* Planning Tips */}
                    <div className="bg-secondary p-8 rounded-[40px] text-white overflow-hidden relative">
                       <div className="relative z-10">
                          <h3 className="text-lg font-black mb-2">Strategy Tip</h3>
                          <p className="text-sm text-gray-400 font-medium leading-relaxed">Schedule your posts between 9 AM and 11 AM for maximum reach on Instagram.</p>
                       </div>
                       <i className="fi fi-rr-bulb absolute -bottom-4 -right-4 text-7xl opacity-5"></i>
                    </div>
                 </div>
              </div>

            </div>
          </div>
        </main>
      </div>

      {/* Schedule Modal */}
      <AnimatePresence>
        {showScheduleModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
             <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowScheduleModal(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
             />
             <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-lg bg-white rounded-[40px] shadow-2xl relative z-10 overflow-hidden"
             >
                <div className="p-8 border-b border-gray-50">
                   <h2 className="text-2xl font-black text-secondary">New Social Post</h2>
                   <p className="text-sm text-gray-400 font-bold mt-1 uppercase tracking-widest">Schedule your next big thing</p>
                </div>
                <div className="p-8 space-y-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Select Platforms</label>
                      <div className="flex gap-3">
                         {platforms.map(p => (
                            <button key={p.id} className={`w-12 h-12 rounded-2xl ${p.color} flex items-center justify-center text-white shadow-sm hover:scale-110 transition-all`}>
                               <i className={`fi ${p.icon}`}></i>
                            </button>
                         ))}
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Content</label>
                      <textarea 
                        className="w-full h-32 p-4 rounded-3xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-secondary"
                        placeholder="Write your caption here..."
                      ></textarea>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Date</label>
                        <input type="date" className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Time</label>
                        <input type="time" className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none" />
                      </div>
                   </div>
                   <div className="pt-4 flex gap-3">
                      <button 
                        onClick={() => setShowScheduleModal(false)}
                        className="flex-1 py-4 bg-secondary text-white font-black rounded-full hover:bg-gray-800 transition-all shadow-lg"
                      >
                         Schedule Now
                      </button>
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
