'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Sidebar from '@/components/dashboard/Sidebar'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  Search, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Calendar, 
  ChevronRight, 
  Eye, 
  MousePointer2, 
  ArrowLeft,
  Filter,
  Download,
  Clock,
  Smartphone,
  Monitor,
  LayoutGrid
} from 'lucide-react'

// Mock Visitor data for demonstration if no real data exists
const MOCK_VISITORS = [
  {
    id: 'VIS-90234',
    name: 'Anonymous Visitor',
    location: 'Mumbai, India',
    email: 'alex.j@example.com',
    last_active: '2 mins ago',
    type: 'Lead',
    device: 'Mobile (iPhone 15)',
    views: 12,
    clicks: 4,
    source: 'Instagram.com',
    created_at: '2026-04-03T10:44:01Z'
  },
  {
    id: 'VIS-82190',
    name: 'Sarah Wilson',
    location: 'Surat, India',
    email: 'sarah.w@tech.co',
    last_active: '15 mins ago',
    type: 'Subscriber',
    device: 'Desktop (Chrome Mac OS)',
    views: 5,
    clicks: 1,
    source: 'Direct',
    created_at: '2026-04-03T10:30:00Z'
  },
  {
    id: 'VIS-76512',
    name: 'Anonymous Visitor',
    location: 'New York, USA',
    email: null,
    last_active: '1 hour ago',
    type: 'Visitor',
    device: 'Mobile (Samsung Galaxy)',
    views: 8,
    clicks: 3,
    source: 'Twitter.com',
    created_at: '2026-04-03T09:44:01Z'
  },
  {
    id: 'VIS-61234',
    name: 'Mike Ross',
    location: 'Delhi, India',
    email: 'mike@ross.legal',
    last_active: '3 hours ago',
    type: 'Lead',
    device: 'Tablet (iPad Air)',
    views: 20,
    clicks: 15,
    source: 'Linktree Link',
    created_at: '2026-04-03T08:00:00Z'
  }
]

function AudienceContent() {
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [visitors, setVisitors] = useState<any[]>(MOCK_VISITORS)
  const [selectedVisitor, setSelectedVisitor] = useState<any | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('All')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }

      const { data: profileData } = await supabase
        .from('monkey_bio')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (profileData) {
        setProfile(profileData)
        // Fetch Real Analytics if available
        const { data: analyticsData } = await supabase
          .from('analytics')
          .select('*')
          .eq('profile_id', profileData.id)
          .order('created_at', { ascending: false })
          .limit(100)

        if (analyticsData && analyticsData.length > 0) {
           // We could process analytics data to create "sessions" or "visitors"
           // For now, let's keep the mock data for better UX demonstration
           // but real data would go here
        }
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const filteredVisitors = visitors.filter(v => {
    const matchesSearch = v.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (v.name && v.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (v.location && v.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (v.email && v.email.toLowerCase().includes(searchTerm.toLowerCase()))
    
    if (filterType === 'All') return matchesSearch
    return matchesSearch && v.type === filterType
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <i className="fi fi-rr-spinner animate-spin text-4xl text-primary"></i>
          <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Loading Audience Data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-[100dvh] flex flex-col lg:flex-row overflow-hidden bg-[#fafafa]">
      <Sidebar 
        userProfile={profile} 
        activeMainTab="audience" 
        onMainTabChange={(tab) => {
          if (tab === 'monkeybio') router.push('/dashboard')
          else if (tab === 'insights') router.push('/dashboard/insights')
          else if (tab === 'tools') router.push('/dashboard?tab=tools')
          else if (tab === 'user') router.push('/dashboard?tab=user')
          else if (tab === 'settings') router.push('/dashboard?tab=account')
        }} 
      />

      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Main Header */}
        <header className="h-20 flex items-center justify-between px-8 bg-white border-b border-gray-100 z-10 shrink-0">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Users size={20} />
             </div>
             <div>
                <h1 className="text-xl font-black text-secondary tracking-tight">Audience Insights</h1>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mt-0.5">Real-time visitor data and leads</p>
             </div>
          </div>

          <div className="flex items-center gap-3">
             <div className="bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl flex items-center gap-3">
                <span className="text-[10px] font-bold text-gray-400 select-none tracking-tight">monkey-bio.live/{profile?.username}</span>
                <button className="text-primary hover:scale-110 transition-transform"><i className="fi fi-rr-copy text-[10px]"></i></button>
             </div>
             <button className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary transition-all">
                <Download size={18} />
             </button>
             <button className="px-6 py-2.5 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-black/10 flex items-center gap-2">
                Live Status <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             </button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
           {/* Section 1: Visitors List */}
           <div className={`flex-1 flex flex-col transition-all duration-500 ${selectedVisitor ? 'hidden lg:flex lg:w-1/2' : 'w-full'}`}>
              {/* Toolbar */}
              <div className="p-8 border-b border-gray-100 bg-white space-y-6">
                 <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1 group">
                       <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={18} />
                       <input 
                         type="text" 
                         placeholder="Search visitor ID, name, email or location..."
                         value={searchTerm}
                         onChange={(e) => setSearchTerm(e.target.value)}
                         className="w-full pl-16 pr-8 py-5 rounded-[24px] bg-gray-50 border-none outline-none font-bold text-secondary focus:ring-4 focus:ring-primary/5 transition-all text-sm"
                       />
                    </div>
                    
                    <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
                       {['All', 'Visitor', 'Lead', 'Subscriber'].map(t => (
                         <button 
                           key={t}
                           onClick={() => setFilterType(t)}
                           className={`px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filterType === t ? 'bg-white shadow-sm text-primary' : 'text-gray-400 hover:text-gray-600'}`}
                         >
                           {t}
                         </button>
                       ))}
                    </div>
                 </div>

                 <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Showing {filteredVisitors.length} Active Visitors</p>
                    <div className="flex items-center gap-6">
                       <div className="flex items-center gap-2">
                          <Eye size={14} className="text-primary" />
                          <span className="text-[11px] font-black text-secondary">3.4k Views</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <MousePointer2 size={14} className="text-blue-500" />
                          <span className="text-[11px] font-black text-secondary">820 Clicks</span>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Grid/List of Visitors */}
              <div className="flex-1 overflow-y-auto p-8 no-scrollbar pb-32">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredVisitors.map((visitor) => (
                      <motion.div 
                        key={visitor.id}
                        layoutId={`visitor-${visitor.id}`}
                        onClick={() => setSelectedVisitor(visitor)}
                        className={`bg-white p-6 rounded-[32px] border transition-all cursor-pointer group flex flex-col gap-5 ${selectedVisitor?.id === visitor.id ? 'border-primary ring-4 ring-primary/5 shadow-xl shadow-primary/10' : 'border-gray-100 hover:border-primary/50 shadow-sm hover:shadow-xl hover:shadow-gray-200/50'}`}
                        whileHover={{ y: -5 }}
                      >
                         <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                               <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shadow-sm transition-transform group-hover:scale-110 ${
                                 visitor.type === 'Lead' ? 'bg-orange-100 text-orange-500' :
                                 visitor.type === 'Subscriber' ? 'bg-green-100 text-green-500' :
                                 'bg-blue-100 text-blue-500'
                               }`}>
                                  {visitor.name === 'Anonymous Visitor' ? <Users size={20} /> : visitor.name.charAt(0)}
                               </div>
                               <div className="flex flex-col">
                                  <h4 className="font-black text-secondary text-sm group-hover:text-primary transition-colors">{visitor.name}</h4>
                                  <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full w-fit mt-1 tracking-tight">ID: {visitor.id}</span>
                               </div>
                            </div>
                            <div className="flex flex-col items-end">
                               <span className="text-[9px] font-black uppercase text-primary tracking-widest mb-1.5">{visitor.type}</span>
                               <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400">
                                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                  {visitor.last_active}
                               </div>
                            </div>
                         </div>

                         <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50/50 p-3 rounded-2xl border border-gray-50 flex items-center gap-3">
                               <MapPin size={14} className="text-gray-400" />
                               <span className="text-[10px] font-bold text-secondary truncate">{visitor.location}</span>
                            </div>
                            <div className="bg-gray-50/50 p-3 rounded-2xl border border-gray-50 flex items-center gap-3 text-gray-400">
                               <Smartphone size={14} />
                               <span className="text-[10px] font-bold text-secondary truncate">{visitor.device.split(' ')[0]}</span>
                            </div>
                         </div>

                         <div className="flex items-center justify-between pt-2 border-t border-dashed border-gray-100 uppercase tracking-widest text-[9px] font-black">
                            <div className="flex items-center gap-4">
                               <span className="flex items-center gap-1 text-gray-400"><Eye size={12} /> {visitor.views}</span>
                               <span className="flex items-center gap-1 text-gray-400"><MousePointer2 size={12} /> {visitor.clicks}</span>
                            </div>
                            <span className="flex items-center gap-1 text-primary">View Details <ChevronRight size={12} /></span>
                         </div>
                      </motion.div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Section 2: Visitor Detail View */}
           <AnimatePresence>
              {selectedVisitor && (
                <motion.div 
                  initial={{ x: '100%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: '100%', opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="absolute inset-0 lg:relative lg:flex-1 bg-white border-l border-gray-100 flex flex-col z-20"
                >
                   {/* Mobile Back Button */}
                   <button 
                    onClick={() => setSelectedVisitor(null)}
                    className="lg:hidden absolute top-6 left-6 w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-secondary border border-gray-100"
                   >
                      <ArrowLeft size={20} />
                   </button>

                   <div className="flex-1 overflow-y-auto no-scrollbar p-10 lg:p-14 pb-32">
                      <div className="max-w-2xl mx-auto space-y-12">
                         {/* Header Info */}
                         <div className="flex flex-col items-center text-center space-y-6">
                            <motion.div 
                              layoutId={`visitor-detail-avatar-${selectedVisitor.id}`}
                              className={`w-32 h-32 rounded-[40px] flex items-center justify-center font-black text-3xl shadow-2xl ${
                                selectedVisitor.type === 'Lead' ? 'bg-orange-500 text-white shadow-orange-500/20' :
                                selectedVisitor.type === 'Subscriber' ? 'bg-green-500 text-white shadow-green-500/20' :
                                'bg-black text-white shadow-black/20'
                              }`}
                            >
                               {selectedVisitor.name === 'Anonymous Visitor' ? <Users size={48} /> : selectedVisitor.name.charAt(0)}
                            </motion.div>
                            
                            <div className="space-y-2">
                               <h2 className="text-3xl font-black text-secondary tracking-tight">{selectedVisitor.name}</h2>
                               <div className="flex items-center gap-2 justify-center">
                                  <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-primary/10 text-primary px-4 py-1.5 rounded-full">{selectedVisitor.type}</span>
                                  <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-gray-100 text-gray-400 px-4 py-1.5 rounded-full">ID: {selectedVisitor.id}</span>
                               </div>
                            </div>
                         </div>

                         {/* Action Buttons */}
                         <div className="flex items-center justify-center gap-4">
                            <button className="flex-1 h-14 bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-105 transition-transform active:scale-95 shadow-xl shadow-black/10">
                               <Mail size={16} /> Send Email
                            </button>
                            <button className="flex-1 h-14 bg-white border border-gray-100 text-secondary rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-105 transition-transform active:scale-95 shadow-sm">
                               <Phone size={16} /> Call Lead
                            </button>
                         </div>

                         {/* Metadata Cards */}
                         <div className="grid grid-cols-2 gap-6">
                            <div className="p-8 bg-gray-50/50 rounded-[32px] border border-gray-100 space-y-4">
                               <p className="text-[10px] font-black uppercase text-gray-300 tracking-widest">Location</p>
                               <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-500">
                                     <MapPin size={18} />
                                  </div>
                                  <p className="text-sm font-black text-secondary">{selectedVisitor.location}</p>
                               </div>
                            </div>
                            <div className="p-8 bg-gray-50/50 rounded-[32px] border border-gray-100 space-y-4">
                               <p className="text-[10px] font-black uppercase text-gray-300 tracking-widest">Device Info</p>
                               <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-orange-500">
                                     {selectedVisitor.device.includes('Mobile') ? <Smartphone size={18} /> : <Monitor size={18} />}
                                  </div>
                                  <p className="text-sm font-black text-secondary break-words">{selectedVisitor.device}</p>
                               </div>
                            </div>
                            <div className="p-8 bg-gray-50/50 rounded-[32px] border border-gray-100 space-y-4">
                               <p className="text-[10px] font-black uppercase text-gray-300 tracking-widest">Acquisition Source</p>
                               <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-purple-500">
                                     <Globe size={18} />
                                  </div>
                                  <p className="text-sm font-black text-secondary">{selectedVisitor.source}</p>
                               </div>
                            </div>
                            <div className="p-8 bg-gray-50/50 rounded-[32px] border border-gray-100 space-y-4">
                               <p className="text-[10px] font-black uppercase text-gray-300 tracking-widest">First Seen</p>
                               <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-green-500">
                                     <Calendar size={18} />
                                  </div>
                                  <p className="text-sm font-black text-secondary uppercase tracking-tighter">{new Date(selectedVisitor.created_at).toLocaleDateString()}</p>
                               </div>
                            </div>
                         </div>

                         {/* Activity Timeline / Real Data View */}
                         <div className="space-y-8">
                            <div className="flex items-center justify-between">
                               <h3 className="text-xl font-black text-secondary tracking-tight">Real-time Interaction Log</h3>
                               <div className="px-4 py-1.5 bg-secondary text-white rounded-full text-[8px] font-black uppercase tracking-[0.2em]">Live Tracking</div>
                            </div>

                            <div className="relative space-y-6 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-gray-100">
                               {[
                                 { icon: 'eye', color: 'blue', label: 'Viewed Profile', time: '2 mins ago', detail: 'Viewed profile for 45s' },
                                 { icon: 'mouse-pointer-2', color: 'primary', label: 'Clicked Link', time: '5 mins ago', detail: 'Clicked on "My latest YouTube video"' },
                                 { icon: 'layout-grid', color: 'orange', label: 'Captured Lead', time: '12 mins ago', detail: 'Form filled: alex.j@example.com' },
                                 { icon: 'clock', color: 'green', label: 'Session Started', time: '15 mins ago', detail: 'Referrer: Instagram.com/story' },
                               ].map((action, i) => (
                                 <div key={i} className="relative flex items-center gap-6 group">
                                    <div className={`w-10 h-10 rounded-full border-4 border-white shadow-md flex items-center justify-center relative z-10 transition-transform group-hover:scale-110 ${
                                      action.color === 'blue' ? 'bg-blue-500 text-white' :
                                      action.color === 'primary' ? 'bg-primary text-white' :
                                      action.color === 'orange' ? 'bg-orange-500 text-white' :
                                      'bg-green-500 text-white'
                                    }`}>
                                       {action.icon === 'eye' && <Eye size={14} />}
                                       {action.icon === 'mouse-pointer-2' && <MousePointer2 size={14} />}
                                       {action.icon === 'layout-grid' && <LayoutGrid size={14} />}
                                       {action.icon === 'clock' && <Clock size={14} />}
                                    </div>
                                    <div className="flex-1 bg-gray-50/50 p-6 rounded-[28px] border border-gray-100 group-hover:bg-white group-hover:shadow-xl group-hover:shadow-gray-200/50 transition-all">
                                       <div className="flex items-center justify-between mb-1">
                                          <p className="font-black text-secondary text-[11px] uppercase tracking-widest">{action.label}</p>
                                          <span className="text-[10px] font-bold text-gray-300">{action.time}</span>
                                       </div>
                                       <p className="text-xs font-bold text-gray-400">{action.detail}</p>
                                    </div>
                                 </div>
                               ))}
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Footer Info for Admin */}
                   <div className="p-8 border-t border-gray-100 bg-white flex items-center justify-between">
                      <div className="flex items-center gap-4 opacity-50">
                         <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-secondary">
                            <i className="fi fi-rr-shield-check text-xs"></i>
                         </div>
                         <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 leading-tight">Data protected by Monkey Shield<br/>GDPR Compliant Analytics</p>
                      </div>
                      <button 
                        onClick={() => setSelectedVisitor(null)}
                        className="px-8 h-12 bg-gray-100 text-secondary rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-colors"
                      >
                         Close View
                      </button>
                   </div>
                </motion.div>
              )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default function AudiencePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white text-primary">
        <i className="fi fi-rr-spinner animate-spin text-3xl"></i>
      </div>
    }>
      <AudienceContent />
    </Suspense>
  )
}
