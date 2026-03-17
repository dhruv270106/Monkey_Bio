'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ScheduledPost {
  id: string
  platform: string
  content: string
  status: 'scheduled' | 'published' | 'draft'
  date: string
  time: string
  image?: string
  user_id: string
}

interface PlannerSectionProps {
  profile: any
}

export default function PlannerSection({ profile }: PlannerSectionProps) {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('calendar')
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showDayDetails, setShowDayDetails] = useState(false)
  const [selectedDayPosts, setSelectedDayPosts] = useState<ScheduledPost[]>([])
  const [selectedDateLabel, setSelectedDateLabel] = useState('')
  const [posts, setPosts] = useState<ScheduledPost[]>([])
  
  const [newPost, setNewPost] = useState({
    platform: 'instagram',
    content: '',
    date: '',
    time: ''
  })
  const [editingPostId, setEditingPostId] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (profile) {
      const savedPosts = localStorage.getItem(`planner_posts_${profile.id}`)
      if (savedPosts) {
        setPosts(JSON.parse(savedPosts))
      }
      
      // Auto-select first active platform
      const activePlats = platforms.filter(p => profile?.links?.some((l: any) => l.platform === p.id))
      if (activePlats.length > 0) {
        setNewPost(prev => ({ ...prev, platform: activePlats[0].id }))
      }

      setLoading(false)
    }
  }, [profile])

  const savePosts = (updatedPosts: ScheduledPost[]) => {
    setPosts(updatedPosts)
    if (profile?.id) {
       localStorage.setItem(`planner_posts_${profile.id}`, JSON.stringify(updatedPosts))
    }
  }

  const handleSchedule = () => {
    if (!newPost.content || !newPost.date || !newPost.time) {
      alert('Please fill all fields')
      return
    }

    setSubmitting(true)
    if (editingPostId) {
      const updatedPosts = posts.map(p => 
        p.id === editingPostId 
        ? { ...p, platform: newPost.platform, content: newPost.content, date: newPost.date, time: newPost.time, status: 'scheduled' as const } 
        : p
      )
      savePosts(updatedPosts)
    } else {
      const post: ScheduledPost = {
        id: Math.random().toString(36).substr(2, 9),
        platform: newPost.platform,
        content: newPost.content,
        status: 'scheduled',
        date: newPost.date,
        time: newPost.time,
        user_id: profile?.id || '',
      }
      const updatedPosts = [post, ...posts]
      savePosts(updatedPosts)
    }
    closeScheduleModal()
    setSubmitting(false)
  }

  const handleSaveDraft = () => {
    const post: ScheduledPost = {
      id: editingPostId || Math.random().toString(36).substr(2, 9),
      platform: newPost.platform,
      content: newPost.content,
      status: 'draft',
      date: newPost.date || new Date().toISOString().split('T')[0],
      time: newPost.time || '12:00',
      user_id: profile?.id || '',
    }

    if (editingPostId) {
      const updatedPosts = posts.map(p => p.id === editingPostId ? post : p)
      savePosts(updatedPosts)
    } else {
      const updatedPosts = [post, ...posts]
      savePosts(updatedPosts)
    }
    closeScheduleModal()
  }

  const openEditModal = (post: ScheduledPost) => {
    setNewPost({
      platform: post.platform,
      content: post.content,
      date: post.date,
      time: post.time
    })
    setEditingPostId(post.id)
    setShowScheduleModal(true)
  }

  const closeScheduleModal = () => {
    setShowScheduleModal(false)
    setEditingPostId(null)
    setNewPost({ platform: 'instagram', content: '', date: '', time: '' })
  }

  const deletePost = (id: string) => {
    const updatedPosts = posts.filter(p => p.id !== id)
    savePosts(updatedPosts)
  }

  const openDayDetails = (dateStr: string, dayNum: number) => {
    const dayPosts = posts.filter(p => p.date === dateStr)
    if (dayPosts.length > 0) {
      setSelectedDayPosts(dayPosts)
      setSelectedDateLabel(`March ${dayNum}, 2026`)
      setShowDayDetails(true)
    } else {
      setNewPost(prev => ({ ...prev, date: dateStr }))
      setShowScheduleModal(true)
    }
  }

  const platforms = [
    { id: 'instagram', icon: 'fi-brands-instagram', color: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]', name: 'Instagram' },
    { id: 'tiktok', icon: 'fi-brands-tiktok', color: 'bg-black', name: 'TikTok' },
    { id: 'facebook', icon: 'fi-brands-facebook', color: 'bg-[#1877F2]', name: 'Facebook' },
    { id: 'twitter', icon: 'fi-brands-twitter', color: 'bg-[#1DA1F2]', name: 'X / Twitter' },
    { id: 'linkedin', icon: 'fi-brands-linkedin', color: 'bg-[#0A66C2]', name: 'LinkedIn' },
  ]

  if (loading) return null

  return (
    <div className="flex-1 overflow-y-auto p-12 bg-[#fcfcfc] no-scrollbar">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-4">
              <i className="fi fi-rr-calendar text-primary text-xl"></i>
              <h1 className="font-black text-3xl text-secondary">Planner</h1>
           </div>
           <button onClick={() => setShowScheduleModal(true)} className="bg-primary text-secondary px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg active:shadow-sm">
              Schedule Post
           </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {[
             { label: 'Scheduled', val: posts.filter(p => p.status === 'scheduled').length.toString().padStart(2, '0'), icon: 'fi-rr-calendar-clock', color: 'text-purple-500' },
             { label: 'Drafts', val: posts.filter(p => p.status === 'draft').length.toString().padStart(2, '0'), icon: 'fi-rr-memo', color: 'text-orange-500' },
             { label: 'Published', val: posts.filter(p => p.status === 'published').length.toString().padStart(2, '0'), icon: 'fi-rr-badge-check', color: 'text-green-500' },
             { label: 'Total Posts', val: posts.length.toString().padStart(2, '0'), icon: 'fi-rr-stats', color: 'text-blue-500' },
           ].map((stat, i) => (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-5">
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

        <div className="space-y-8">
          {/* Connected Accounts - Horizontal */}
          {profile?.links?.some((l: any) => l.platform) && (
            <div className="bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm flex flex-col gap-4">
              <h3 className="text-sm font-black text-secondary/40 uppercase tracking-widest ml-2">Connected Accounts</h3>
              <div className="flex flex-wrap gap-4">
                {platforms.filter(p => profile?.links?.some((l: any) => l.platform === p.id)).map((p) => (
                  <div key={p.id} className="flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100 group transition-all hover:bg-white hover:shadow-md">
                    <div className={`w-8 h-8 rounded-xl ${p.color} flex items-center justify-center text-white shadow-sm`}>
                      <i className={`fi ${p.icon} text-xs`}></i>
                    </div>
                    <span className="text-xs font-black text-secondary">{p.name}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 ring-2 ring-green-100 ml-1"></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="lg:col-span-3 space-y-8">
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
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
                 <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                    <h2 className="text-lg font-black text-secondary">March 2026</h2>
                    <div className="flex items-center gap-2">
                       <button className="p-2 hover:bg-gray-100 rounded-lg"><i className="fi fi-rr-angle-left"></i></button>
                       <button className="p-2 hover:bg-gray-100 rounded-lg"><i className="fi fi-rr-angle-right"></i></button>
                    </div>
                 </div>
                 <div className="grid grid-cols-7 border-b border-gray-50 bg-gray-50/10">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="py-3 text-center text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">
                        {day}
                      </div>
                    ))}
                 </div>
                 <div className="grid grid-cols-7">
                    {Array.from({ length: 31 }).map((_, i) => {
                       const day = i + 1;
                       const dateStr = `2026-03-${day.toString().padStart(2, '0')}`;
                       const dayPosts = posts.filter(p => p.date === dateStr);
                       return (
                        <div key={i} onClick={() => openDayDetails(dateStr, day)} className={`h-28 p-2 border-r border-b border-gray-50 hover:bg-gray-50 transition-colors relative group cursor-pointer ${day === new Date().getDate() ? 'bg-primary/5' : ''}`}>
                           <span className={`text-[10px] font-black ${day === new Date().getDate() ? 'text-primary' : 'text-gray-400'}`}>{day}</span>
                           <div className="mt-1 flex flex-col gap-1 overflow-hidden h-[50px]">
                              {dayPosts.slice(0, 2).map((p, idx) => (
                                 <div key={idx} className={`p-1 px-2 rounded-md text-[7px] font-bold truncate text-white ${platforms.find(plt => plt.id === p.platform)?.color || 'bg-secondary'}`}>
                                    {p.content}
                                 </div>
                              ))}
                           </div>
                           <button onClick={(e) => { e.stopPropagation(); setNewPost(prev => ({ ...prev, date: dateStr })); setShowScheduleModal(true); }} className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all p-1.5 bg-secondary text-white rounded-lg text-[8px] z-10 shadow-lg translate-y-2 group-hover:translate-y-0">
                              <i className="fi fi-rr-plus"></i>
                           </button>
                        </div>
                       )
                    })}
                 </div>
              </motion.div>
            )}

            {activeTab === 'queue' && (
               <div className="space-y-4">
                  {posts.filter(p => p.status !== 'draft').length === 0 ? (
                     <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-gray-200">
                        <i className="fi fi-rr-calendar-clock text-4xl text-gray-200 mb-4 inline-block"></i>
                        <p className="text-gray-400 font-bold">No posts in queue yet.</p>
                     </div>
                  ) : (
                    posts.filter(p => p.status !== 'draft').map((post, i) => (
                      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} key={post.id} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-6 group hover:shadow-md transition-all">
                         <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl shrink-0 ${platforms.find(p => p.id === post.platform)?.color}`}>
                            <i className={`fi ${platforms.find(p => p.id === post.platform)?.icon}`}></i>
                         </div>
                         <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                               <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 tracking-widest">{post.platform}</span>
                               <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full tracking-widest ${post.status === 'scheduled' ? 'bg-blue-50 text-blue-500' : 'bg-green-50 text-green-500'}`}>{post.status}</span>
                            </div>
                            <p className="text-sm font-bold text-secondary truncate">{post.content}</p>
                            <p className="text-[10px] text-gray-400 mt-1 font-medium italic">{post.date} at {post.time}</p>
                         </div>
                         <div className="flex items-center gap-2 opactiy-0 group-hover:opacity-100 transition-all">
                            <button onClick={() => openEditModal(post)} className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 hover:text-primary flex items-center justify-center text-sm shadow-sm"><i className="fi fi-rr-edit-alt"></i></button>
                            <button onClick={() => deletePost(post.id)} className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 hover:text-red-500 flex items-center justify-center text-sm shadow-sm"><i className="fi fi-rr-trash"></i></button>
                         </div>
                       </motion.div>
                    ))
                  )}
               </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showDayDetails && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="w-full max-w-lg bg-white rounded-[40px] shadow-2xl relative overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                   <div>
                      <h2 className="text-2xl font-black text-secondary">{selectedDateLabel}</h2>
                      <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-widest leading-none">{selectedDayPosts.length} Posts scheduled</p>
                   </div>
                   <button onClick={() => setShowDayDetails(false)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400"><i className="fi fi-rr-cross-small"></i></button>
                </div>
                <div className="p-8 max-h-[50vh] overflow-y-auto space-y-4 no-scrollbar">
                   {selectedDayPosts.map((post) => (
                      <div key={post.id} className="p-5 bg-gray-50 rounded-[32px] border border-gray-100 flex items-center gap-4 group">
                         <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl shrink-0 ${platforms.find(p => p.id === post.platform)?.color}`}>
                            <i className={`fi ${platforms.find(p => p.id === post.platform)?.icon}`}></i>
                         </div>
                         <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-secondary truncate">{post.content}</p>
                            <p className="text-[9px] text-gray-400 font-black uppercase mt-1">{post.time} • {post.platform}</p>
                         </div>
                         <button onClick={() => { setShowDayDetails(false); deletePost(post.id); }} className="p-2 text-red-300 hover:text-red-500"><i className="fi fi-rr-trash"></i></button>
                      </div>
                   ))}
                </div>
                <div className="p-8 bg-gray-50/50">
                   <button onClick={() => { setShowDayDetails(false); setShowScheduleModal(true); }} className="w-full py-4 bg-secondary text-white font-black rounded-full shadow-lg">Add New Post</button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showScheduleModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
             <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }} className="w-full max-w-lg bg-white rounded-[40px] shadow-2xl relative overflow-hidden">
                <div className="p-10 border-b border-gray-50 flex items-center justify-between">
                   <h2 className="text-2xl font-black text-secondary">{editingPostId ? 'Edit Post' : 'New Post'}</h2>
                   <button onClick={closeScheduleModal} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400"><i className="fi fi-rr-cross-small"></i></button>
                </div>
                <div className="p-10 space-y-8">
                   <div className="flex gap-4">
                      {platforms.filter(p => profile?.links?.some((l: any) => l.platform === p.id)).map(p => (
                         <button key={p.id} onClick={() => setNewPost({ ...newPost, platform: p.id })} className={`w-12 h-12 rounded-2xl ${p.color} flex items-center justify-center text-white transition-all ${newPost.platform === p.id ? 'ring-4 ring-primary ring-offset-2' : 'opacity-40 grayscale'}`}><i className={`fi ${p.icon}`}></i></button>
                      ))}
                      {platforms.filter(p => profile?.links?.some((l: any) => l.platform === p.id)).length === 0 && (
                        <p className="text-xs font-bold text-gray-400">Please add social links first to schedule posts.</p>
                      )}
                   </div>
                   <textarea value={newPost.content} onChange={(e) => setNewPost({ ...newPost, content: e.target.value })} className="w-full h-32 p-6 rounded-[32px] bg-gray-50 border-none focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold text-secondary" placeholder="What's on your mind?"></textarea>
                   <div className="grid grid-cols-2 gap-4">
                      <input type="date" value={newPost.date} onChange={(e) => setNewPost({ ...newPost, date: e.target.value })} className="p-4 rounded-2xl bg-gray-50 border-none outline-none font-bold" />
                      <input type="time" value={newPost.time} onChange={(e) => setNewPost({ ...newPost, time: e.target.value })} className="p-4 rounded-2xl bg-gray-50 border-none outline-none font-bold" />
                   </div>
                   <div className="flex gap-4">
                      <button onClick={handleSaveDraft} className="flex-1 py-4 bg-gray-100 text-secondary font-black rounded-full">Draft</button>
                      <button onClick={handleSchedule} disabled={submitting} className="flex-1 py-4 bg-secondary text-white font-black rounded-full shadow-lg">Schedule</button>
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
