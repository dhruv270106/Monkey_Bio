'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { THEMES } from '@/data/themes'
import { PLATFORMS } from '@/data/platforms'
import { APPS } from '@/data/apps'

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

  const getButtonStyle = () => {
    const variant = profile?.button_variant || 'solid'
    const radius = profile?.button_radius || 'xl'
    const customBg = profile?.custom_button_bg || (selectedTheme.button.includes('bg-white') ? '#ffffff' : '#000000')
    const customColor = profile?.font_color || (selectedTheme.text.includes('white') ? '#ffffff' : '#000000')

    let baseStyle: any = {
      fontFamily: profile?.font_family || 'inherit',
      color: customColor,
      borderRadius: radius === 'none' ? '0px' : radius === 'md' ? '12px' : radius === 'xl' ? '24px' : '9999px',
    }

    if (variant === 'outline') {
      baseStyle = {
        ...baseStyle,
        backgroundColor: 'transparent',
        border: `2px solid ${customBg}`,
      }
    } else if (variant === 'glass') {
      baseStyle = {
        ...baseStyle,
        backgroundColor: `${customBg}20`,
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
      }
    } else {
      baseStyle = {
        ...baseStyle,
        backgroundColor: customBg,
      }
    }

    return baseStyle
  }

  return (
    <div 
      className={`min-h-screen w-full flex flex-col items-center pt-24 pb-12 px-4 transition-colors duration-500 relative ${selectedTheme.bg} ${selectedTheme.text}`}
      style={{
        ...(selectedTheme.grid ? {
          backgroundImage: selectedTheme.id === 'grid-mocha' 
            ? 'linear-gradient(#ffffff1a 1px, transparent 1px), linear-gradient(90deg, #ffffff1a 1px, transparent 1px)'
            : 'linear-gradient(#0000000a 1px, transparent 1px), linear-gradient(90deg, #0000000a 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        } : selectedTheme.image ? {
          backgroundImage: `url(${selectedTheme.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        } : selectedTheme.id === 'custom' ? {
          backgroundColor: profile.custom_bg || '#ffffff',
          backgroundImage: 'none'
        } : {})
      }}
    >
      {/* Dynamic Font Loader */}
      {profile?.font_family && (
        <link 
          href={`https://fonts.googleapis.com/css2?family=${profile.font_family.replace(/ /g, '+')}:wght@400;700;900&display=swap`} 
          rel="stylesheet" 
        />
      )}
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
        
        <h1 
          className="text-3xl font-black mb-1 flex items-center justify-center gap-1 tracking-tight"
          style={{ 
            fontFamily: profile.font_family || 'inherit',
            color: profile.font_color || 'inherit'
          }}
        >
          {profile.display_name} 
          <i className="fi fi-sr-badge-check text-primary text-xl"></i>
        </h1>
        <p className="text-sm font-bold opacity-70 mb-10">@{profile.username}</p>
        
        <p 
          className="text-center px-8 mb-8 font-bold max-w-md leading-relaxed opacity-90 break-words w-full"
          style={{ 
            fontFamily: profile.font_family || 'inherit',
            color: profile.font_color || 'inherit',
            fontSize: profile.font_size || 'inherit'
          }}
        >
          {profile.bio}
        </p>

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
                 style={{ color: profile.font_color || 'inherit' }}
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
              className={`block w-full py-6 px-8 font-black shadow-lg hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 flex items-center justify-between group text-lg tracking-wide`}
              style={getButtonStyle()}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border border-black/5 bg-white/10">
                 <i className={`fi ${APPS.find(a => a.id === link.platform)?.icon || 'fi-rr-link'} text-2xl opacity-80`}></i>
              </div>
              <span className="flex-1 text-center truncate px-4">{link.title}</span>
              <div className="w-10 opacity-30 group-hover:opacity-100 transition-opacity flex items-center justify-center">
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
