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
  const [activePlatformFilter, setActivePlatformFilter] = useState('all')
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
    <div className="flex-1 overflow-y-auto p-10 bg-gray-50/30 no-scrollbar">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex items-center justify-between">
           <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-1">
                 <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><i className="fi fi-rr-calendar text-xs"></i></div>
                 <h1 className="font-extrabold text-2xl text-secondary uppercase tracking-tight italic">Social Planner</h1>
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none ml-11">Automate your social presence</p>
           </div>
           <button onClick={() => setShowScheduleModal(true)} className="bg-primary text-white px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-widest hover:shadow-2xl hover:shadow-primary/20 active:scale-95 transition-all flex items-center gap-3">
              <i className="fi fi-rr-add text-xs pt-0.5"></i> Create New Post
           </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {[
             { label: 'Scheduled', val: posts.filter(p => p.status === 'scheduled').length, icon: 'fi-rr-calendar-clock', color: 'text-primary' },
             { label: 'Drafts', val: posts.filter(p => p.status === 'draft').length, icon: 'fi-rr-memo', color: 'text-amber-500' },
             { label: 'Published', val: posts.filter(p => p.status === 'published').length, icon: 'fi-rr-badge-check', color: 'text-emerald-500' },
             { label: 'Audience', val: '+24%', icon: 'fi-rr-chart-user', color: 'text-indigo-500' },
           ].map((stat, i) => (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5 hover:shadow-lg transition-all group">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gray-50 ${stat.color} group-hover:scale-110 transition-transform`}>
                   <i className={`fi ${stat.icon} text-lg pt-0.5`}></i>
                </div>
                <div>
                   <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest leading-none">{stat.label}</p>
                   <h3 className="text-xl font-black text-secondary mt-1">{stat.val}</h3>
                </div>
             </motion.div>
           ))}
        </div>

        {/* Calendar Control */}
        <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-10">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <h2 className="text-2xl font-black text-secondary">
                    {currentDate.toLocaleString('default', { month: 'long' })} <span className="text-primary">{currentDate.getFullYear()}</span>
                 </h2>
                 <div className="flex bg-gray-50 rounded-2xl p-1 border border-gray-100">
                    <button onClick={() => changeMonth(-1)} className="w-10 h-10 rounded-xl hover:bg-white flex items-center justify-center text-gray-400 transition-all font-bold hover:text-primary"><i className="fi fi-rr-angle-left"></i></button>
                    <button onClick={() => changeMonth(1)} className="w-10 h-10 rounded-xl hover:bg-white flex items-center justify-center text-gray-400 transition-all font-bold hover:text-primary"><i className="fi fi-rr-angle-right"></i></button>
                 </div>
              </div>
              <div className="flex items-center bg-gray-50 p-1 rounded-2xl">
                 {['all', 'instagram', 'tiktok'].map(f => (
                   <button key={f} onClick={() => setActivePlatformFilter(f)} className={`px-4 py-2 text-[8px] font-black uppercase tracking-widest rounded-xl transition-all ${activePlatformFilter === f ? 'bg-white shadow-sm text-primary' : 'text-gray-400'}`}>{f}</button>
                 ))}
              </div>
           </div>

           <div ref={calendarRef} className="flex gap-4 overflow-x-auto pb-6 no-scrollbar snap-x scroll-smooth">
              {generateDays().map((date, i) => {
                 const dateStr = date.toISOString().split('T')[0]
                 const dayPosts = posts.filter(p => p.date === dateStr)
                 const isToday = new Date().toDateString() === date.toDateString()
                 
                 return (
                   <motion.div 
                     key={i} 
                     onClick={() => openDayDetails(dateStr)}
                     whileHover={{ y: -8, scale: 1.05 }}
                     className={`flex-shrink-0 w-28 h-36 rounded-[32px] border-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 snap-center relative group ${isToday ? 'bg-primary text-white border-primary shadow-2xl shadow-primary/30' : 'bg-white border-gray-50 text-secondary hover:border-primary/20 hover:shadow-xl hover:shadow-gray-200/50'}`}
                   >
                      <span className={`text-[10px] font-black uppercase tracking-widest ${isToday ? 'text-white/60' : 'text-gray-400'}`}>
                         {date.toLocaleString('default', { weekday: 'short' })}
                      </span>
                      <span className="text-3xl font-black">{date.getDate()}</span>
                      
                      {dayPosts.length > 0 && (
                        <div className="flex gap-1.5 mt-1">
                           {dayPosts.slice(0, 3).map((p, idx) => (
                             <div key={idx} className={`w-2 h-2 rounded-full ring-2 ring-white/20 ${platforms.find(plt => plt.id === p.platform)?.color.includes('gradient') ? 'bg-white/40' : platforms.find(plt => plt.id === p.platform)?.color}`}></div>
                           ))}
                        </div>
                      )}
                      
                      {dayPosts.length > 3 && (
                        <span className={`text-[8px] font-black uppercase tracking-widest ${isToday ? 'text-white/40' : 'text-gray-300'}`}>+{dayPosts.length - 3}</span>
                      )}
                   </motion.div>
                 )
              })}
           </div>
        </div>

        {/* Dashboard Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-10">
            <div className="lg:col-span-1 space-y-3">
               {['calendar', 'queue', 'drafts', 'analytics'].map((tab) => (
                 <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full flex items-center justify-between px-8 py-5 rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-secondary text-white shadow-xl shadow-secondary/20 translate-x-2' : 'bg-white text-gray-400 border border-gray-100 hover:bg-gray-50 hover:translate-x-1'}`}
                 >
                    {tab}
                    <i className="fi fi-rr-arrow-small-right opacity-30 text-lg pt-1"></i>
                 </button>
               ))}
            </div>

            <div className="lg:col-span-5 space-y-6">
                {activeTab === 'queue' ? (
                  posts.filter(p => p.status !== 'draft').length === 0 ? (
                    <div className="text-center py-40 bg-white rounded-[50px] border border-dashed border-gray-200">
                      <div className="w-24 h-24 rounded-[40px] bg-gray-50 flex items-center justify-center mx-auto text-gray-200 mb-8 border-2 border-white shadow-inner">
                         <i className="fi fi-rr-calendar-clock text-4xl"></i>
                      </div>
                      <h3 className="text-xl font-black text-secondary">Your queue is empty</h3>
                      <p className="text-gray-400 font-bold mt-2">Time to schedule your next masterpiece.</p>
                      <button onClick={() => setShowScheduleModal(true)} className="mt-10 px-10 py-5 bg-primary text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/10">Start Scheduling</button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {posts.filter(p => (activePlatformFilter === 'all' || p.platform === activePlatformFilter) && p.status !== 'draft').map((post, i) => (
                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} key={post.id} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex items-center gap-8 group hover:shadow-2xl hover:shadow-gray-200/50 transition-all">
                           <div className={`w-20 h-20 rounded-[32px] flex items-center justify-center text-white text-3xl shrink-0 shadow-lg ${platforms.find(p => p.id === post.platform)?.color} group-hover:rotate-6 transition-transform`}>
                              <i className={`fi ${platforms.find(p => p.id === post.platform)?.icon} pt-1`}></i>
                           </div>
                           <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-2">
                                 <span className="text-[9px] font-black uppercase px-4 py-1.5 rounded-full bg-gray-50 text-gray-400 tracking-widest border border-gray-100">{post.platform}</span>
                                 <span className={`text-[9px] font-black uppercase px-4 py-1.5 rounded-full tracking-widest ${post.status === 'scheduled' ? 'bg-indigo-50 text-indigo-500' : 'bg-emerald-50 text-emerald-500'}`}>{post.status}</span>
                              </div>
                              <p className="text-xl font-black text-secondary truncate">{post.content}</p>
                              <div className="flex items-center gap-6 mt-4">
                                 <div className="flex items-center gap-2 text-[10px] text-gray-400 font-black uppercase tracking-widest">
                                    <i className="fi fi-rr-calendar-lines text-primary pt-0.5"></i> {post.date}
                                 </div>
                                 <div className="flex items-center gap-2 text-[10px] text-gray-400 font-black uppercase tracking-widest">
                                    <i className="fi fi-rr-clock text-primary pt-0.5"></i> {post.time}
                                 </div>
                              </div>
                           </div>
                           <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all">
                              <button onClick={() => openEditModal(post)} className="w-14 h-14 rounded-2xl bg-gray-50 text-gray-400 hover:text-primary hover:bg-white hover:shadow-xl flex items-center justify-center transition-all shadow-sm"><i className="fi fi-rr-edit-alt text-lg"></i></button>
                              <button onClick={() => deletePost(post.id)} className="w-14 h-14 rounded-2xl bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-white hover:shadow-xl flex items-center justify-center transition-all shadow-sm"><i className="fi fi-rr-trash text-lg"></i></button>
                           </div>
                        </motion.div>
                      ))}
                    </div>
                  )
                ) : activeTab === 'drafts' ? (
                   <div className="text-center py-40 bg-white rounded-[50px] border border-dashed border-gray-200">
                      <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">No drafts found.</p>
                   </div>
                ) : (
                  <div className="p-20 text-center bg-gray-50/50 border-2 border-dashed border-gray-100 rounded-[50px]">
                     <p className="text-gray-400 font-black uppercase text-[10px] tracking-widest">Select a vibrant date to start planning</p>
                  </div>
                )}
            </div>
        </div>
      </div>

      {/* Modern Dialogs (Modals) */}
      <AnimatePresence>
        {showDayDetails && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowDayDetails(false)} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
             <motion.div initial={{ scale: 0.9, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 50 }} className="w-full max-w-xl bg-white rounded-[60px] shadow-3xl shadow-black/20 relative overflow-hidden z-10">
                <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                   <div>
                      <h2 className="text-3xl font-black text-secondary uppercase tracking-tight italic">{selectedDateLabel}</h2>
                      <p className="text-[10px] text-primary font-black mt-2 uppercase tracking-[0.3em] leading-none">{selectedDayPosts.length} Active Schedules</p>
                   </div>
                   <button onClick={() => setShowDayDetails(false)} className="w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center text-gray-400 border border-gray-100 hover:rotate-90 transition-all"><i className="fi fi-rr-cross-small"></i></button>
                </div>
                <div className="p-10 max-h-[50vh] overflow-y-auto space-y-6 no-scrollbar">
                   {selectedDayPosts.map((post) => (
                      <div key={post.id} className="p-8 bg-gray-50 rounded-[40px] border border-gray-100 flex items-center gap-8 group hover:bg-white hover:shadow-2xl transition-all h-32">
                         <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center text-white text-2xl shrink-0 shadow-lg ${platforms.find(p => p.id === post.platform)?.color}`}>
                            <i className={`fi ${platforms.find(p => p.id === post.platform)?.icon} pt-1`}></i>
                         </div>
                         <div className="flex-1 min-w-0">
                            <p className="text-xl font-black text-secondary truncate">{post.content}</p>
                            <div className="flex items-center gap-6 mt-3">
                               <div className="flex items-center gap-2 text-[9px] text-gray-400 font-black uppercase tracking-widest"><i className="fi fi-rr-clock pt-0.5"></i> {post.time}</div>
                               <div className="flex items-center gap-2 text-[9px] text-gray-400 font-black uppercase tracking-widest"><i className="fi fi-rr-apps pt-0.5"></i> {post.platform}</div>
                            </div>
                         </div>
                         <div className="flex gap-2">
                            <button onClick={() => { setShowDayDetails(false); openEditModal(post); }} className="w-12 h-12 rounded-2xl bg-white text-gray-300 hover:text-primary shadow-sm flex items-center justify-center transition-all"><i className="fi fi-rr-edit-alt"></i></button>
                            <button onClick={() => { setShowDayDetails(false); deletePost(post.id); }} className="w-12 h-12 rounded-2xl bg-white text-gray-300 hover:text-red-500 shadow-sm flex items-center justify-center transition-all"><i className="fi fi-rr-trash"></i></button>
                         </div>
                      </div>
                   ))}
                </div>
                <div className="p-10 bg-gray-50/50">
                   <button onClick={() => { setShowDayDetails(false); setShowScheduleModal(true); }} className="w-full py-6 bg-secondary text-white font-black uppercase text-[11px] tracking-[0.2em] rounded-full shadow-2xl hover:bg-gray-800 hover:scale-[1.02] active:scale-95 transition-all">Schedule More For Today</button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showScheduleModal && (
          <div className="fixed inset-0 z-[400] flex items-center justify-center p-6">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeScheduleModal} className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
             <motion.div initial={{ scale: 0.9, opacity: 0, y: 100 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 100 }} className="w-full max-w-4xl bg-white rounded-[70px] shadow-[0_50px_200px_rgba(0,0,0,0.5)] relative overflow-hidden z-10 flex flex-col md:flex-row h-[90vh] md:h-auto md:max-h-[85vh]">
                <div className="flex-1 overflow-y-auto no-scrollbar p-12 md:p-16 space-y-12">
                   <div className="flex items-center justify-between">
                      <div>
                         <h2 className="text-4xl font-black text-secondary uppercase tracking-tight italic">{editingPostId ? 'Edit Draft' : 'New Story'}</h2>
                         <p className="text-[10px] text-gray-300 font-black mt-2 uppercase tracking-[0.4em] leading-none">Content is King, Distribution is Queen</p>
                      </div>
                      <button onClick={closeScheduleModal} className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all"><i className="fi fi-rr-cross-small"></i></button>
                   </div>

                   <div className="space-y-12">
                      <div className="space-y-6">
                         <div className="flex items-center justify-between">
                            <label className="text-[11px] font-black uppercase tracking-widest text-secondary ml-2">Choose Platform</label>
                            <span className="text-[9px] font-black text-primary uppercase">Connected</span>
                         </div>
                         <div className="grid grid-cols-5 gap-6">
                           {platforms.map(p => (
                              <button 
                                key={p.id} 
                                onClick={() => setNewPost({ ...newPost, platform: p.id })} 
                                className={`aspect-square rounded-[32px] ${p.color} flex items-center justify-center text-white transition-all ${newPost.platform === p.id ? 'ring-[10px] ring-primary/10 ring-offset-4 scale-110 shadow-3xl' : 'opacity-20 grayscale-sm hover:opacity-100 hover:grayscale-0'}`}
                              >
                                 <i className={`fi ${p.icon} text-2xl pt-1`}></i>
                              </button>
                           ))}
                         </div>
                      </div>

                      <div className="space-y-6">
                         <div className="flex items-center justify-between px-2">
                            <label className="text-[11px] font-black uppercase tracking-widest text-secondary">The Storytelling</label>
                            <button className="flex items-center gap-3 text-[10px] font-black text-primary uppercase tracking-[0.1em] bg-primary/5 px-6 py-3 rounded-full hover:bg-primary/10 transition-all group">
                               <i className="fi fi-rr-sparkles pt-0.5 group-hover:rotate-12 transition-transform"></i> Magic AI Caption
                            </button>
                         </div>
                         <textarea 
                           value={newPost.content} 
                           onChange={(e) => setNewPost({ ...newPost, content: e.target.value })} 
                           className="w-full h-48 p-10 rounded-[50px] bg-gray-50/50 border-4 border-transparent focus:border-primary/5 focus:bg-white outline-none transition-all font-bold text-secondary text-xl resize-none placeholder:text-gray-200" 
                           placeholder="What's happening in your world?"
                         ></textarea>
                      </div>

                      <div className="grid grid-cols-2 gap-8">
                         <div className="space-y-6">
                            <label className="text-[11px] font-black uppercase tracking-widest text-secondary ml-2">Publication Date</label>
                            <input type="date" value={newPost.date} onChange={(e) => setNewPost({ ...newPost, date: e.target.value })} className="w-full p-6 h-20 rounded-[30px] bg-gray-50 border-none outline-none font-black text-secondary text-sm shadow-inner" />
                         </div>
                         <div className="space-y-6">
                            <label className="text-[11px] font-black uppercase tracking-widest text-secondary ml-2">Best Time (EST)</label>
                            <input type="time" value={newPost.time} onChange={(e) => setNewPost({ ...newPost, time: e.target.value })} className="w-full p-6 h-20 rounded-[30px] bg-gray-50 border-none outline-none font-black text-secondary text-sm shadow-inner" />
                         </div>
                      </div>
                   </div>
                </div>

                <div className="w-full md:w-80 bg-gray-50 p-12 border-l border-gray-100 flex flex-col">
                   <h3 className="text-xs font-black text-secondary uppercase tracking-[0.3em] mb-10">Preview Center</h3>
                   <div className="flex-1 space-y-8">
                      <div className="aspect-[4/5] bg-white rounded-[40px] shadow-2xl border-8 border-white overflow-hidden relative group">
                         {newPost.media.length > 0 ? (
                           <img src={newPost.media[0].url} className="w-full h-full object-cover" />
                         ) : (
                           <div className="w-full h-full flex flex-col items-center justify-center p-10 bg-gray-100 text-gray-300">
                             <i className="fi fi-rr-picture text-4xl mb-4"></i>
                             <p className="text-[9px] font-black uppercase tracking-widest text-center leading-relaxed">No visual assets selected yet.</p>
                           </div>
                         )}
                         <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                            <p className="text-[10px] text-white font-bold line-clamp-3 opacity-90">{newPost.content || 'Your story preview will appear here...'}</p>
                         </div>
                         <div className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white"><i className={`fi ${platforms.find(p => p.id === (newPost.platform || 'instagram'))?.icon} text-lg pt-1`}></i></div>
                      </div>
                      <button className="w-full py-6 bg-white border-4 border-dashed border-gray-200 rounded-[30px] text-gray-300 hover:border-primary hover:text-primary transition-all flex flex-col items-center justify-center gap-2 group">
                         <i className="fi fi-rr-add-image text-2xl group-hover:scale-110 transition-transform"></i>
                         <span className="text-[9px] font-black uppercase tracking-widest">Attach Media</span>
                      </button>
                   </div>
                   <div className="mt-12 space-y-4">
                      <button onClick={handleSchedule} disabled={submitting} className="w-full py-6 bg-primary text-white font-black uppercase text-[11px] tracking-[0.2em] rounded-full shadow-2xl shadow-primary/20 hover:scale-[1.03] active:scale-95 transition-all">
                         {editingPostId ? 'Update Post' : 'Schedule Now'}
                      </button>
                      <button onClick={handleSaveDraft} className="w-full py-5 bg-white text-secondary font-black uppercase text-[11px] tracking-[0.2em] rounded-full border-2 border-gray-100 hover:bg-gray-100 transition-all">Draft it</button>
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
