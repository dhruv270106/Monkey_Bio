'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { THEMES, Theme } from '@/data/themes'
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
      
      if (data) {
        setProfile(data)
        // Track Profile View
        trackEvent('view', data.id)
      }
      setLoading(false)
    }
    fetchProfile()
  }, [username])

  const trackEvent = async (type: string, profileId: string, linkId?: string) => {
    try {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      const isTablet = /iPad|Android|Touch/i.test(navigator.userAgent) && !isMobile
      const device = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'

      await supabase.from('analytics').insert({
        profile_id: profileId,
        event_type: type,
        link_id: linkId,
        device: device
      })
    } catch (e) {
      console.error("Tracking error:", e)
    }
  }

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

  const selectedTheme = (THEMES.find(t => t.id === profile.theme) || THEMES[0]) as Theme

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
      className={`h-screen w-full flex flex-col items-center transition-colors duration-500 relative overflow-hidden overscroll-y-none ${selectedTheme.text}`}
    >
      {/* Background Layer with Blur */}
      <div 
        className={`fixed inset-0 transition-all duration-700 ${selectedTheme.bg} overflow-hidden`}
        style={{
          filter: profile?.bg_blur ? `blur(${profile.bg_blur}px)` : 'none',
          transform: profile?.bg_blur ? 'scale(1.1)' : 'scale(1)',
          ...(selectedTheme.grid && !selectedTheme.video ? {
            backgroundImage: selectedTheme.text.includes('white') 
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
        {selectedTheme.video && (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={selectedTheme.image}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={selectedTheme.video} type="video/mp4" />
          </video>
        )}
      </div>

      {/* Dynamic Font Loader */}
      {profile?.font_family && (
        <link 
          href={`https://fonts.googleapis.com/css2?family=${profile.font_family.replace(/ /g, '+')}:wght@400;700;900&display=swap`} 
          rel="stylesheet" 
        />
      )}

      {/* Main Content Scroll Area */}
      <div className="relative z-10 w-full h-full overflow-y-auto overflow-x-hidden no-scrollbar flex flex-col items-center">
        <div className="w-full max-w-[420px] flex flex-col items-center py-20 px-4 min-h-full">
          {/* Top Utilities */}
          <div className="w-full flex justify-between absolute top-10 left-0 px-8 items-center">
             <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <span className="text-white text-lg font-black">*</span>
             </div>
             <button 
               onClick={() => {
                  const url = window.location.href
                  if (navigator.share) {
                    navigator.share({ title: profile.display_name, url }).catch(() => {})
                  } else {
                    navigator.clipboard.writeText(url)
                    alert('Link copied!')
                  }
               }}
               className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:scale-110 active:scale-90 transition-all"
             >
                <i className="fi fi-rr-share text-white text-xs"></i>
             </button>
          </div>

          {/* Profile Header */}
          <div className="w-24 h-24 rounded-full border-4 border-white/20 shadow-xl mb-6 overflow-hidden mt-4">
             <img 
              src={profile.avatar_url || `https://ui-avatars.com/api/?name=${profile.display_name}&background=6cf383&color=0f172a`} 
              alt={profile.display_name} 
              className="w-full h-full object-cover" 
             />
          </div>
          
          <h1 
            className="text-2xl font-black mb-1 flex items-center justify-center gap-1 tracking-tight"
            style={{ 
              fontFamily: profile.font_family || 'inherit',
              color: profile.font_color || 'inherit'
            }}
          >
            {profile.display_name} 
          </h1>
          <p className="text-[10px] uppercase tracking-widest font-black opacity-50 mb-8">@{profile.username}</p>
          
          <p 
            className="text-center px-4 mb-8 font-bold text-xs leading-relaxed opacity-90 break-words w-full"
            style={{ 
              fontFamily: profile.font_family || 'inherit',
              color: profile.font_color || 'inherit',
              fontSize: profile.font_size || '12px'
            }}
          >
            {profile.bio}
          </p>

          {/* Social Icons Row */}
          {profile.social_links && Object.values(profile.social_links).some(v => v) && (
            <div className="flex flex-wrap justify-center gap-6 mb-12 w-full">
               {Object.entries(profile.social_links).slice(0, 5).map(([platform, url]: [string, any]) => (
                 url && (
                   <a 
                     key={platform}
                     href={url} 
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-2xl transition-transform hover:scale-125 hover:opacity-80"
                     style={{ color: profile.font_color || 'inherit' }}
                   >
                     <i className={`fi ${PLATFORMS[platform]?.icon || 'fi-rr-link'}`}></i>
                   </a>
                 )
               ))}
            </div>
          )}

          {/* Links Section */}
          <div className="w-full space-y-4">
            {profile.links?.filter((l: any) => l.active).map((link: any, i: number) => {
              const isFeatured = link.layout === 'featured'
              return (
                <a 
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('click', profile.id, link.id || link.title)}
                  className={`block w-full font-black shadow-lg hover:scale-[1.01] transition-all duration-300 flex ${isFeatured ? 'flex-col overflow-hidden' : 'items-center py-4 px-5'} group text-sm tracking-wide`}
                  style={getButtonStyle()}
                >
                  {isFeatured ? (
                    <>
                      {link.thumbnail && (
                        <div className="w-full aspect-video overflow-hidden border-b border-black/5">
                           <img src={link.thumbnail} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="p-4 text-center relative w-full">
                         {link.title}
                         <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 group-hover:opacity-100 transition-opacity">
                            <i className="fi fi-rr-menu-dots-vertical text-xs"></i>
                         </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border border-black/5 bg-white/10 overflow-hidden">
                         {link.thumbnail ? (
                           <img src={link.thumbnail} className="w-full h-full object-cover" />
                         ) : (
                           <i className={`fi ${APPS.find(a => a.id === link.platform)?.icon || 'fi-rr-link'} text-xl opacity-80`}></i>
                         )}
                      </div>
                      <span className="flex-1 text-center truncate px-4">{link.title}</span>
                      <div className="w-8 opacity-30 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <i className="fi fi-rr-menu-dots-vertical text-xs"></i>
                      </div>
                    </>
                  )}
                </a>
              )
            })}
          </div>

          {/* Messenger Section Wrapper */}
          <div className="w-full mt-10">
              {/* Optional messaging form could go here, for now keeping it clean like the design */}
          </div>

          {/* Footer CTA */}
          <div className="mt-16 flex flex-col items-center gap-12 w-full">
             <button className="px-10 py-4 bg-white text-secondary font-black rounded-full shadow-2xl transform hover:scale-105 active:scale-95 transition-all text-sm">
                Join {profile.username} on Monkey
             </button>
             
             <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-3 text-[9px] font-black opacity-30 uppercase tracking-[0.3em]">
                   <span>Cookie Preferences</span>
                   <span>•</span>
                   <span>Report</span>
                   <span>•</span>
                   <span>Privacy</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* QR Code - Bottom Right Mobile Corner */}
      <div className="fixed bottom-10 right-10 z-50 flex flex-col items-center gap-2 hidden lg:flex">
         <div className="bg-white p-2 rounded-2xl shadow-2xl border border-gray-100">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(typeof window !== 'undefined' ? `https://${window.location.host}/${profile.username}` : `https://monkeybio.com/${profile.username}`)}`} 
              alt="QR Code" 
              className="w-20 h-20 opacity-80"
            />
         </div>
         <p className="text-[9px] font-black uppercase tracking-widest opacity-40">View on mobile</p>
      </div>
    </div>
  )
}

