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
      className={`min-h-screen w-full flex flex-col items-center pt-24 pb-12 px-4 transition-colors duration-500 relative overflow-hidden ${selectedTheme.text}`}
    >
      {/* Background Layer with Blur */}
      <div 
        className={`fixed inset-0 transition-all duration-700 ${selectedTheme.bg}`}
        style={{
          filter: profile?.bg_blur ? `blur(${profile.bg_blur}px)` : 'none',
          transform: profile?.bg_blur ? 'scale(1.1)' : 'scale(1)',
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
      />
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
        className="w-full max-w-[580px] flex flex-col items-center z-10 relative"
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
        
        {/* Contact Form Section */}
        <div className="w-full mt-12 bg-white/5 backdrop-blur-md rounded-[40px] p-8 border border-white/10">
          <h3 className="text-xl font-black mb-6 flex items-center gap-2" style={{ color: profile.font_color || 'inherit' }}>
            <i className="fi fi-rr-envelope"></i> Message Me
          </h3>
          <form 
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const name = formData.get('name') as string;
              const email = formData.get('email') as string;
              const message = formData.get('message') as string;

              if (!name || !message) {
                alert('Please fill in name and message');
                return;
              }

              const { error } = await supabase
                .from('messages')
                .insert({
                  profile_id: profile.id,
                  sender_name: name,
                  sender_email: email,
                  message_text: message
                });

              if (error) {
                alert('Error sending message. Make sure the "messages" table is created.');
              } else {
                alert('Message sent successfully!');
                (e.target as HTMLFormElement).reset();
              }
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                name="name"
                type="text" 
                placeholder="Your Name" 
                className="w-full px-6 py-4 bg-white/10 rounded-2xl border border-white/20 outline-none focus:border-primary transition-all font-bold placeholder:text-gray-400"
                style={{ color: profile.font_color || 'inherit' }}
                required
              />
              <input 
                name="email"
                type="email" 
                placeholder="Email (Optional)" 
                className="w-full px-6 py-4 bg-white/10 rounded-2xl border border-white/20 outline-none focus:border-primary transition-all font-bold placeholder:text-gray-400"
                style={{ color: profile.font_color || 'inherit' }}
              />
            </div>
            <textarea 
              name="message"
              placeholder="Your Message..." 
              className="w-full px-6 py-4 bg-white/10 rounded-3xl border border-white/20 outline-none focus:border-primary transition-all font-bold placeholder:text-gray-400 h-32 resize-none"
              style={{ color: profile.font_color || 'inherit' }}
              required
            />
            <button 
              type="submit"
              className="w-full py-5 bg-primary text-secondary font-black rounded-full shadow-xl hover:scale-[1.02] active:scale-95 transition-all text-lg"
            >
              Send Message
            </button>
          </form>
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

