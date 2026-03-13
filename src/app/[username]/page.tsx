'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { THEMES } from '@/data/themes'

const PLATFORMS: Record<string, any> = {
  instagram: { icon: 'fi-brands-instagram' },
  youtube: { icon: 'fi-brands-youtube' },
  tiktok: { icon: 'fi-brands-tiktok' },
  twitter: { icon: 'fi-brands-twitter' },
  linkedin: { icon: 'fi-brands-linkedin' },
  facebook: { icon: 'fi-brands-facebook' },
}

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
    <div className={`min-h-screen w-full flex flex-col items-center pt-24 pb-12 px-4 transition-colors duration-500 ${selectedTheme.bg} ${selectedTheme.text}`}>
      
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
        
        <h1 className="text-2xl font-bold mb-1 flex items-center justify-center gap-1">
          {profile.display_name} 
          <i className="fi fi-sr-badge-check text-primary text-xl"></i>
        </h1>
        <p className="text-sm font-medium opacity-70 mb-6">@{profile.username}</p>
        
        {profile.bio && <p className="text-center px-8 mb-10 font-medium max-w-md leading-relaxed opacity-90">{profile.bio}</p>}
        
        {/* Social Icons */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
           {profile.social_links && Object.entries(profile.social_links).map(([platform, url]: [string, any]) => (
             url && (
               <a 
                 key={platform}
                 href={url} 
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-2xl transition-transform hover:scale-125 hover:opacity-80"
               >
                 <i className={`fi ${PLATFORMS[platform]?.icon || 'fi-rr-link'}`}></i>
               </a>
             )
           ))}
        </div>

        {/* Links */}
        <div className="w-full space-y-4">
          {profile.links?.filter((l: any) => l.active).map((link: any, i: number) => (
            <a 
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`block w-full py-5 px-6 rounded-2xl font-bold shadow-md hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 text-center ${selectedTheme.button}`}
            >
              {link.title}
            </a>
          ))}
        </div>
        
        <div className="mt-24 flex flex-col items-center gap-4">
           <a href="/" className="inline-flex items-center gap-1 opacity-50 text-sm font-bold hover:opacity-100 transition-opacity">
              Join millions on <span className="font-black tracking-tight">Monkey<span className="text-primary">*</span></span>
           </a>
        </div>
      </motion.div>
    </div>
  )
}
