'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Sidebar from '@/components/dashboard/Sidebar'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  MessageSquare, 
  Link2, 
  Lightbulb, 
  Zap, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Star,
  Sparkles
} from 'lucide-react'

function ToolsContent() {
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

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
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const TOOLS = [
    {
      id: 'planner',
      name: 'Social Planner',
      desc: 'Schedule and auto-post your content across all social networks from a single dashboard.',
      icon: <Calendar size={28} />,
      color: 'bg-indigo-500',
      tag: 'Most Popular',
      href: '/dashboard/planner'
    },
    {
      id: 'autoreply',
      name: 'Auto-Reply',
      desc: 'Instantly reply to comments, send direct messages, and turn engagement into leads automatically.',
      icon: <MessageSquare size={28} />,
      color: 'bg-orange-500',
      tag: 'New',
      href: '/dashboard/autoreply'
    },
    {
      id: 'shortener',
      name: 'Link Shortener',
      desc: 'Create beautiful, branded short links and track their performance with deep analytics.',
      icon: <Link2 size={28} />,
      color: 'bg-blue-500',
      tag: 'Essential',
      href: '/dashboard/shortener'
    },
    {
      id: 'ideas',
      name: 'Post Ideas & AI',
      desc: 'Running out of inspiration? Let our AI generate post ideas, captions, and hashtag strategies for you.',
      icon: <Lightbulb size={28} />,
      color: 'bg-yellow-500',
      tag: 'Beta',
      href: '/dashboard/post-ideas'
    },
    {
      id: 'media',
      name: 'Media Assets',
      desc: 'Manage all your images, videos, and branding assets in one centralized library.',
      icon: <Layers size={28} />,
      color: 'bg-purple-500',
      tag: 'Free',
      href: '/dashboard/media'
    },
    {
      id: 'history',
      name: 'Activity History',
      desc: 'View a detailed log of all changes and interactions on your Monkey Bio profile.',
      icon: <ShieldCheck size={28} />,
      color: 'bg-green-500',
      tag: 'Admin',
      href: '/dashboard/history'
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-primary">
        <i className="fi fi-rr-spinner animate-spin text-3xl"></i>
      </div>
    )
  }

  return (
    <div className="h-[100dvh] flex flex-col lg:flex-row overflow-hidden bg-[#fafafa]">
      <Sidebar 
        userProfile={profile} 
        activeMainTab="tools" 
        onMainTabChange={(tab) => {
          if (tab === 'monkeybio') router.push('/dashboard')
          else if (tab === 'audience') router.push('/dashboard/audience')
          else if (tab === 'insights') router.push('/dashboard/insights')
          else if (tab === 'user') router.push('/dashboard?tab=user')
          else if (tab === 'settings') router.push('/dashboard?tab=account')
        }} 
      />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 flex items-center justify-between px-8 bg-white border-b border-gray-100 z-10 shrink-0">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                <Zap size={20} />
             </div>
             <div>
                <h1 className="text-xl font-black text-secondary tracking-tight">Growth Tools</h1>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mt-0.5">Everything you need to scale</p>
             </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="bg-primary/5 px-4 py-2 rounded-xl flex items-center gap-3 border border-primary/10">
                <Sparkles size={14} className="text-primary" />
                <span className="text-[10px] font-bold text-primary select-none uppercase tracking-widest">Enterprise Ready</span>
             </div>
             <button className="px-6 py-2.5 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-black/10">
                Install SDK
             </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-12 no-scrollbar space-y-12 pb-32">
           <div className="max-w-7xl mx-auto space-y-12">
              <div className="space-y-4">
                 <h2 className="text-4xl font-black text-secondary tracking-tight">Expand your potential.</h2>
                 <p className="text-sm font-bold text-gray-400 max-w-2xl leading-relaxed">Boost your engagement and productivity with our powerful suite of integrated tools designed specifically for creators.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {TOOLS.map((tool, i) => (
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: i * 0.05 }}
                     key={tool.id}
                     onClick={() => router.push(tool.href)}
                     className="bg-white p-10 rounded-[48px] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all cursor-pointer group flex flex-col"
                   >
                      <div className="flex items-start justify-between mb-8">
                         <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-white shadow-xl ${tool.color} group-hover:scale-110 transition-transform duration-500`}>
                            {tool.icon}
                         </div>
                         <div className="px-4 py-1.5 bg-gray-50 border border-gray-100 rounded-full text-[8px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                            {tool.tag}
                         </div>
                      </div>

                      <div className="space-y-3 flex-1">
                         <h3 className="text-2xl font-black text-secondary group-hover:text-primary transition-colors">{tool.name}</h3>
                         <p className="text-xs font-bold text-gray-400 leading-relaxed">{tool.desc}</p>
                      </div>

                      <div className="mt-10 pt-8 border-t border-dashed border-gray-100 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                            <Star size={14} className="text-yellow-500 fill-yellow-500" />
                            <span className="text-[10px] font-black text-secondary uppercase tracking-widest">Premium</span>
                         </div>
                         <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-white transition-all transform group-hover:translate-x-2">
                            <ArrowRight size={18} />
                         </div>
                      </div>
                   </motion.div>
                 ))}
              </div>

              {/* Promo Banner */}
              <div className="bg-[#502274] p-16 rounded-[60px] shadow-2xl relative overflow-hidden group">
                 <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 space-y-6">
                       <h3 className="text-4xl font-black text-white tracking-tight">Ready for a power-up?</h3>
                       <p className="text-white/60 font-medium text-lg max-w-xl">Unlock all tools and analytics with a Pro subscription. Join 50,000+ creators growing their brands today.</p>
                       <div className="flex flex-wrap gap-4 pt-4">
                          <button className="px-10 h-16 bg-[#D2E823] text-black font-black text-xs uppercase tracking-[0.2em] rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10">Go Pro Now</button>
                          <button className="px-10 h-16 bg-white/10 text-white font-black text-xs uppercase tracking-[0.2em] rounded-full hover:bg-white/20 transition-all backdrop-blur-md">Learn More</button>
                       </div>
                    </div>
                    <div className="w-full md:w-[400px] aspect-square relative">
                       <div className="absolute inset-0 bg-white/5 rounded-full animate-pulse"></div>
                       <motion.div 
                         animate={{ rotate: 360 }}
                         transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                         className="absolute inset-4 border-2 border-dashed border-white/20 rounded-full"
                       ></motion.div>
                       <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center shadow-2xl rotate-12">
                             <span className="text-6xl font-black text-[#502274] leading-none select-none">M</span>
                          </div>
                       </div>
                       
                       {/* Floating Badges */}
                       <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-10 left-10 p-4 bg-white/10 backdrop-blur rounded-2xl border border-white/10"><CheckCircle2 className="text-[#D2E823]" size={24} /></motion.div>
                       <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute bottom-10 right-10 p-4 bg-white/10 backdrop-blur rounded-2xl border border-white/10"><Zap className="text-blue-400" size={24} /></motion.div>
                    </div>
                 </div>
                 <div className="absolute bottom-0 right-10 w-96 h-96 bg-white/5 rounded-full blur-[100px] -mb-48"></div>
              </div>
           </div>
        </main>
      </div>
    </div>
  )
}

export default function ToolsHubPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white text-primary">
        <i className="fi fi-rr-spinner animate-spin text-3xl"></i>
      </div>
    }>
      <ToolsContent />
    </Suspense>
  )
}
