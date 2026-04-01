'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ScheduledPost {
  id: string
  platform: string
  content: string
  status: 'scheduled' | 'published' | 'draft'
  date: string
  time: string
  media?: { type: 'image' | 'video', url: string }[]
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
  
  const [currentDate, setCurrentDate] = useState(new Date())
  const calendarRef = useRef<HTMLDivElement>(null)

  const [newPost, setNewPost] = useState<{
    platform: string,
    content: string,
    date: string,
    time: string,
    media: { type: 'image' | 'video', url: string }[]
  }>({
    platform: 'instagram',
    content: '',
    date: '',
    time: '',
    media: []
  })
  const [editingPostId, setEditingPostId] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (profile) {
      const savedPosts = localStorage.getItem(`planner_posts_${profile.id}`)
      if (savedPosts) {
        setPosts(JSON.parse(savedPosts))
      }
      
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
        ? { ...p, platform: newPost.platform, content: newPost.content, date: newPost.date, time: newPost.time, media: newPost.media, status: 'scheduled' as const } 
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
        media: newPost.media,
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
      media: newPost.media,
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
      time: post.time,
      media: post.media || []
    })
    setEditingPostId(post.id)
    setShowScheduleModal(true)
  }

  const closeScheduleModal = () => {
    setShowScheduleModal(false)
    setEditingPostId(null)
    setNewPost({ platform: 'instagram', content: '', date: '', time: '', media: [] })
  }

  const deletePost = (id: string) => {
    const updatedPosts = posts.filter(p => p.id !== id)
    savePosts(updatedPosts)
  }

  const openDayDetails = (dateStr: string) => {
    const dayPosts = posts.filter(p => p.date === dateStr)
    const date = new Date(dateStr)
    const label = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    
    if (dayPosts.length > 0) {
      setSelectedDayPosts(dayPosts)
      setSelectedDateLabel(label)
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

  // Calendar Helpers
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate()
  
  const generateDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const days = []
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    return days
  }

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1)
    setCurrentDate(newDate)
  }

  if (loading) return null

  return (
    <div className="flex-1 overflow-y-auto p-12 bg-[#fcfcfc] no-scrollbar">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-4">
              <i className="fi fi-rr-calendar text-primary text-xl"></i>
              <h1 className="font-black text-3xl text-secondary">Social Planner</h1>
           </div>
           <button onClick={() => setShowScheduleModal(true)} className="bg-primary text-secondary px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl active:shadow-sm">
              Create New Post
           </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {[
             { label: 'Scheduled', val: posts.filter(p => p.status === 'scheduled').length, icon: 'fi-rr-calendar-clock', color: 'text-purple-500' },
             { label: 'Drafts', val: posts.filter(p => p.status === 'draft').length, icon: 'fi-rr-memo', color: 'text-orange-500' },
             { label: 'Published', val: posts.filter(p => p.status === 'published').length, icon: 'fi-rr-badge-check', color: 'text-green-500' },
             { label: 'Growth', val: '+12%', icon: 'fi-rr-trending-up', color: 'text-blue-500' },
           ].map((stat, i) => (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gray-50 ${stat.color}`}>
                   <i className={`fi ${stat.icon} text-lg`}></i>
                </div>
                <div>
                   <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest leading-none">{stat.label}</p>
                   <h3 className="text-xl font-black text-secondary mt-1">{stat.val}</h3>
                </div>
             </motion.div>
           ))}
        </div>

        {/* Horizontal Calendar Control */}
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <h2 className="text-xl font-black text-secondary">
                    {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
                 </h2>
                 <div className="flex bg-gray-50 rounded-xl p-1 border border-gray-100">
                    <button onClick={() => changeMonth(-1)} className="w-8 h-8 rounded-lg hover:bg-white flex items-center justify-center text-gray-400 transition-all"><i className="fi fi-rr-angle-left"></i></button>
                    <button onClick={() => changeMonth(1)} className="w-8 h-8 rounded-lg hover:bg-white flex items-center justify-center text-gray-400 transition-all"><i className="fi fi-rr-angle-right"></i></button>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Post scheduled</span>
                 </div>
              </div>
           </div>

           {/* Horizontal Scroll Area */}
           <div 
             ref={calendarRef}
             className="flex gap-4 overflow-x-auto pb-6 no-scrollbar snap-x"
           >
              {generateDays().map((date, i) => {
                 const dateStr = date.toISOString().split('T')[0]
                 const dayPosts = posts.filter(p => p.date === dateStr)
                 const isToday = new Date().toDateString() === date.toDateString()
                 
                 return (
                   <motion.div 
                     key={i} 
                     onClick={() => openDayDetails(dateStr)}
                     whileHover={{ y: -5 }}
                     className={`flex-shrink-0 w-24 h-32 rounded-3xl border transition-all cursor-pointer flex flex-col items-center justify-center gap-2 snap-center relative group ${isToday ? 'bg-secondary text-white border-secondary shadow-2xl' : 'bg-white border-gray-100 text-secondary hover:border-primary/30'}`}
                   >
                      <span className={`text-[10px] font-black uppercase tracking-widest ${isToday ? 'text-white/40' : 'text-gray-400'}`}>
                         {date.toLocaleString('default', { weekday: 'short' })}
                      </span>
                      <span className="text-2xl font-black">{date.getDate()}</span>
                      
                      {dayPosts.length > 0 && (
                        <div className="flex gap-1 mt-1">
                           {dayPosts.slice(0, 3).map((p, idx) => (
                             <div key={idx} className={`w-1.5 h-1.5 rounded-full ${platforms.find(plt => plt.id === p.platform)?.color.includes('gradient') ? 'bg-primary' : platforms.find(plt => plt.id === p.platform)?.color}`}></div>
                           ))}
                        </div>
                      )}
                      
                      {dayPosts.length > 3 && (
                        <span className="text-[8px] font-black opacity-40">+{dayPosts.length - 3}</span>
                      )}
                   </motion.div>
                 )
              })}
           </div>
        </div>

        {/* Unified Tool Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* View Switcher */}
            <div className="lg:col-span-1 space-y-4">
               {['calendar', 'queue', 'drafts'].map((tab) => (
                 <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full flex items-center justify-between px-8 py-5 rounded-[32px] text-[10px] font-black uppercase tracking-[0.2em] transition-all border ${activeTab === tab ? 'bg-secondary text-white border-secondary shadow-2xl' : 'bg-white text-gray-400 border-gray-100 hover:bg-gray-50'}`}
                 >
                    {tab}
                    <i className="fi fi-rr-arrow-right opacity-30"></i>
                 </button>
               ))}
            </div>

            {/* List View */}
            <div className="lg:col-span-4 space-y-6">
                {activeTab === 'queue' ? (
                  posts.filter(p => p.status !== 'draft').length === 0 ? (
                    <div className="text-center py-32 bg-white rounded-[40px] border border-dashed border-gray-100">
                      <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mx-auto text-gray-200 mb-6">
                         <i className="fi fi-rr-calendar-clock text-4xl"></i>
                      </div>
                      <p className="text-gray-400 font-bold">No upcoming posts scheduled.</p>
                      <button onClick={() => setShowScheduleModal(true)} className="mt-8 text-[10px] font-black uppercase text-primary tracking-widest hover:underline">Schedule your first post</button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {posts.filter(p => p.status !== 'draft').map((post, i) => (
                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} key={post.id} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex items-center gap-8 group hover:shadow-xl transition-all">
                           <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-white text-3xl shrink-0 shadow-lg ${platforms.find(p => p.id === post.platform)?.color}`}>
                              <i className={`fi ${platforms.find(p => p.id === post.platform)?.icon}`}></i>
                           </div>
                           <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-2">
                                 <span className="text-[9px] font-black uppercase px-3 py-1 rounded-full bg-gray-100 text-gray-500 tracking-[0.2em]">{post.platform}</span>
                                 <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full tracking-[0.2em] ${post.status === 'scheduled' ? 'bg-blue-50 text-blue-500' : 'bg-green-50 text-green-500'}`}>{post.status}</span>
                              </div>
                              <p className="text-lg font-black text-secondary truncate">{post.content}</p>
                              <div className="flex items-center gap-4 mt-3">
                                 <div className="flex items-center gap-2 text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                                    <i className="fi fi-rr-calendar"></i> {post.date}
                                 </div>
                                 <div className="flex items-center gap-2 text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                                    <i className="fi fi-rr-clock"></i> {post.time}
                                 </div>
                              </div>
                           </div>
                           <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all">
                              <button onClick={() => openEditModal(post)} className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 hover:text-primary hover:bg-white hover:shadow-md flex items-center justify-center transition-all"><i className="fi fi-rr-edit-alt"></i></button>
                              <button onClick={() => deletePost(post.id)} className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 hover:text-red-500 flex items-center justify-center transition-all"><i className="fi fi-rr-trash"></i></button>
                           </div>
                        </motion.div>
                      ))}
                    </div>
                  )
                ) : activeTab === 'drafts' ? (
                   <div className="text-center py-32 bg-white rounded-[40px] border border-dashed border-gray-100">
                      <p className="text-gray-400 font-bold">No drafts found.</p>
                   </div>
                ) : (
                  <div className="p-12 text-center bg-gray-50 border border-gray-100 rounded-[40px]">
                     <p className="text-gray-400 font-bold">Select a date from the calendar to view scheduled content.</p>
                  </div>
                )}
            </div>
        </div>
      </div>

      {/* Day Details Modal */}
      <AnimatePresence>
        {showDayDetails && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/50 backdrop-blur-md">
             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="w-full max-w-xl bg-white rounded-[50px] shadow-[0_50px_100px_rgba(0,0,0,0.3)] relative overflow-hidden">
                <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                   <div>
                      <h2 className="text-3xl font-black text-secondary">{selectedDateLabel}</h2>
                      <p className="text-[10px] text-gray-400 font-bold mt-2 uppercase tracking-[0.2em] leading-none">{selectedDayPosts.length} Posts scheduled</p>
                   </div>
                   <button onClick={() => setShowDayDetails(false)} className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 border border-gray-100 hover:scale-110 transition-transform"><i className="fi fi-rr-cross-small"></i></button>
                </div>
                <div className="p-10 max-h-[50vh] overflow-y-auto space-y-6 no-scrollbar">
                   {selectedDayPosts.map((post) => (
                      <div key={post.id} className="p-8 bg-gray-50 rounded-[40px] border border-gray-100 flex items-center gap-6 group hover:bg-white hover:shadow-xl transition-all">
                         <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl shrink-0 shadow-md ${platforms.find(p => p.id === post.platform)?.color}`}>
                            <i className={`fi ${platforms.find(p => p.id === post.platform)?.icon}`}></i>
                         </div>
                         <div className="flex-1 min-w-0">
                            <p className="text-lg font-black text-secondary truncate">{post.content}</p>
                            <div className="flex items-center gap-4 mt-2">
                               <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">{post.time}</p>
                               <span className="w-1 h-1 rounded-full bg-gray-200"></span>
                               <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">{post.platform}</p>
                            </div>
                         </div>
                         <div className="flex gap-2">
                            <button onClick={() => { setShowDayDetails(false); openEditModal(post); }} className="p-2 text-gray-300 hover:text-primary"><i className="fi fi-rr-edit-alt"></i></button>
                            <button onClick={() => { setShowDayDetails(false); deletePost(post.id); }} className="p-2 text-gray-300 hover:text-red-500"><i className="fi fi-rr-trash"></i></button>
                         </div>
                      </div>
                   ))}
                </div>
                <div className="p-10 bg-gray-50/50">
                   <button onClick={() => { setShowDayDetails(false); setShowScheduleModal(true); }} className="w-full py-5 bg-secondary text-white font-black uppercase text-[10px] tracking-widest rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all">Schedule New Post</button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Schedule Post Modal */}
      <AnimatePresence>
        {showScheduleModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/50 backdrop-blur-md">
             <motion.div initial={{ scale: 0.9, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-2xl bg-white rounded-[60px] shadow-[0_50px_150px_rgba(0,0,0,0.4)] relative overflow-hidden">
                <div className="p-12 border-b border-gray-50 flex items-center justify-between">
                   <div>
                      <h2 className="text-3xl font-black text-secondary">{editingPostId ? 'Edit Post' : 'New Post'}</h2>
                      <p className="text-[10px] text-gray-400 font-bold mt-2 uppercase tracking-[0.2em] leading-none">Share your story with the world</p>
                   </div>
                   <button onClick={closeScheduleModal} className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100 hover:rotate-90 transition-all"><i className="fi fi-rr-cross-small"></i></button>
                </div>
                <div className="p-12 space-y-10 overflow-y-auto max-h-[70vh] no-scrollbar">
                   {/* Platform Picker */}
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-300 ml-4">Select Platform</label>
                      <div className="flex gap-4">
                        {platforms.map(p => (
                           <button 
                             key={p.id} 
                             onClick={() => setNewPost({ ...newPost, platform: p.id })} 
                             className={`w-14 h-14 rounded-2xl ${p.color} flex items-center justify-center text-white transition-all ${newPost.platform === p.id ? 'ring-[6px] ring-primary/20 ring-offset-4 scale-110 shadow-xl' : 'opacity-30 grayscale hover:opacity-100 hover:grayscale-0'}`}
                           >
                              <i className={`fi ${p.icon} text-lg`}></i>
                           </button>
                        ))}
                      </div>
                   </div>

                   {/* Content */}
                   <div className="space-y-4">
                      <div className="flex items-center justify-between px-4">
                         <label className="text-[10px] font-black uppercase tracking-widest text-gray-300">Caption</label>
                         <button className="flex items-center gap-2 text-[9px] font-black text-primary uppercase tracking-widest bg-primary/5 px-4 py-2 rounded-full hover:bg-primary/10 transition-colors">
                            <i className="fi fi-rr-sparkles"></i> AI Generate
                         </button>
                      </div>
                      <textarea 
                        value={newPost.content} 
                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })} 
                        className="w-full h-40 p-8 rounded-[40px] bg-gray-50 border-2 border-transparent focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-secondary text-lg" 
                        placeholder="What are you sharing today?"
                      ></textarea>
                   </div>

                   {/* Media Upload */}
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-300 ml-4">Media (Images/Videos)</label>
                      <div className="grid grid-cols-4 gap-4">
                         {newPost.media.map((m, i) => (
                           <div key={i} className="aspect-square rounded-2xl bg-gray-100 relative group overflow-hidden border border-gray-100">
                              <img src={m.url} className="w-full h-full object-cover" />
                              <button onClick={() => setNewPost({ ...newPost, media: newPost.media.filter((_, idx) => idx !== i) })} className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><i className="fi fi-rr-cross-small"></i></button>
                           </div>
                         ))}
                         <button className="aspect-square rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-primary hover:text-primary transition-all group">
                            <i className="fi fi-rr-picture text-xl group-hover:scale-110 transition-transform"></i>
                            <span className="text-[8px] font-black uppercase tracking-widest">Add Media</span>
                         </button>
                      </div>
                   </div>

                   {/* Schedule */}
                   <div className="grid grid-cols-2 gap-6 pb-6">
                      <div className="space-y-4">
                         <label className="text-[10px] font-black uppercase tracking-widest text-gray-300 ml-4">Date</label>
                         <input type="date" value={newPost.date} onChange={(e) => setNewPost({ ...newPost, date: e.target.value })} className="w-full p-5 rounded-2xl bg-gray-50 border-none outline-none font-bold text-secondary" />
                      </div>
                      <div className="space-y-4">
                         <label className="text-[10px] font-black uppercase tracking-widest text-gray-300 ml-4">Time</label>
                         <input type="time" value={newPost.time} onChange={(e) => setNewPost({ ...newPost, time: e.target.value })} className="w-full p-5 rounded-2xl bg-gray-50 border-none outline-none font-bold text-secondary" />
                      </div>
                   </div>
                </div>

                <div className="p-12 bg-gray-50 border-t border-gray-100 flex gap-6">
                   <button onClick={handleSaveDraft} className="flex-1 py-5 bg-white text-secondary font-black uppercase text-[10px] tracking-widest rounded-full border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm">Save as Draft</button>
                   <button onClick={handleSchedule} disabled={submitting} className="flex-[2] py-5 bg-secondary text-white font-black uppercase text-[10px] tracking-widest rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all">
                      {editingPostId ? 'Update Schedule' : 'Schedule Post'}
                   </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
