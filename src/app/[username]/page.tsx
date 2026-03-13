'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { THEMES } from '@/data/themes'
import { PLATFORMS } from '@/data/platforms'

export default function PublicProfile() {
  const { username } = useParams()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('monkey_bio')
        .select('*')
        .eq('username', (username as string).toLowerCase())
        .single()
      
      if (data) setProfile(data)
      setLoading(false)
    }
    fetchProfile()
  }, [username])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <i className="fi fi-rr-spinner animate-spin text-3xl text-primary"></i>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white">
        <h1 className="text-2xl font-bold">User not found</h1>
      </div>
    )
  }

  const selectedTheme = THEMES.find(t => t.id === profile.theme) || THEMES[0]

  return (
    <div 
      className={`min-h-screen w-full flex flex-col items-center pt-24 pb-12 px-4 transition-colors duration-500 relative ${selectedTheme.bg} ${selectedTheme.text}`}
      style={selectedTheme.id === 'grid-mocha' ? {
        backgroundImage: 'linear-gradient(#ffffff1a 1px, transparent 1px), linear-gradient(90deg, #ffffff1a 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      } : {}}
    >
      {/* Top Left Icon */}
      <div className="fixed top-8 left-8 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 z-[100]">
        <span className="text-white text-lg font-black">*</span>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[580px] flex flex-col items-center"
      >
        <div className="w-24 h-24 rounded-full border-4 border-white/20 shadow-xl mb-6 overflow-hidden">
           <img 
            src={profile.avatar_url || `https://ui-avatars.com/api/?name=${profile.display_name}&background=6cf383&color=0f172a`} 
            alt={profile.display_name} 
            className="w-full h-full object-cover" 
           />
        </div>
        
        <h1 className="text-3xl font-black mb-1 flex items-center justify-center gap-1 tracking-tight">
          {profile.display_name} 
          <i className="fi fi-sr-badge-check text-primary text-xl"></i>
        </h1>
        <p className="text-sm font-bold opacity-70 mb-10">@{profile.username}</p>
        
        {/* Bio Area */}
        {profile.bio && <p className="text-center px-8 mb-8 font-bold max-w-md leading-relaxed opacity-90">{profile.bio}</p>}

        {/* Social Icons Row (From Onboarding - Max 5) */}
        <div className="flex flex-wrap justify-center gap-8 mb-16 w-full">
           {profile.social_links && Object.entries(profile.social_links).slice(0, 5).map(([platform, url]: [string, any]) => (
             url && (
               <a 
                 key={platform}
                 href={url} 
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-4xl transition-transform hover:scale-125 hover:opacity-80"
               >
                 <i className={`fi ${PLATFORMS[platform]?.icon || 'fi-rr-link'}`}></i>
               </a>
             )
           ))}
        </div>

        {/* Links Section (Only Cards/Boxes) */}
        <div className="w-full space-y-4">
          {profile.links?.filter((l: any) => l.active).map((link: any, i: number) => (
            <a 
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`block w-full py-6 px-8 rounded-2xl font-black shadow-lg hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 text-center relative group text-lg tracking-wide ${selectedTheme.button}`}
            >
              <span>{link.title}</span>
              <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-30 group-hover:opacity-100 transition-opacity">
                 <i className="fi fi-rr-menu-dots-vertical text-lg"></i>
              </div>
            </a>
          ))}
        </div>
        
        <div className="mt-24 flex flex-col items-center gap-8">
           <button className="px-8 py-3 bg-white text-secondary font-black rounded-full shadow-2xl transform hover:scale-105 active:scale-95 transition-all">
              Join {profile.username} on Monkey
           </button>
           
           <div className="flex items-center gap-3 text-[10px] font-bold opacity-30 uppercase tracking-[0.2em]">
              <span>Report</span>
              <span>•</span>
              <span>Privacy</span>
           </div>
        </div>
      </motion.div>
    </div>
  )
}
