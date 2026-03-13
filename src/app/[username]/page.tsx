'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'

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

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden flex items-center justify-center py-12 px-4 sm:px-0" style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)' }}>
      {/* Animated Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute rounded-full filter blur-[80px] opacity-15 animate-blob" style={{ width: '400px', height: '400px', background: '#43E660', top: '-10%', left: '-10%' }}></div>
        <div className="absolute rounded-full filter blur-[80px] opacity-10 animate-blob" style={{ width: '500px', height: '500px', background: '#6cf383', bottom: '-20%', right: '-10%', animationDelay: '-5s' }}></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[480px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-[40px] p-8 pb-12 shadow-2xl relative z-10 text-center"
      >
        <img 
          src={profile.avatar_url || `https://ui-avatars.com/api/?name=${profile.display_name}&background=6cf383&color=0f172a`} 
          alt={profile.display_name} 
          className="w-24 h-24 rounded-full border-4 border-white/20 mx-auto shadow-lg mb-4 object-cover"
        />
        <h1 className="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-1">
          {profile.display_name} 
          <i className="fi fi-sr-badge-check text-primary text-xl"></i>
        </h1>
        <p className="text-white/80 font-medium mb-6">{profile.bio || 'Linktree for everything'}</p>
        
        {/* Social Icons */}
        <div className="flex justify-center gap-4 mb-8">
           {profile.social_links && Object.entries(profile.social_links).map(([platform, handle]: [string, any]) => (
             handle && (
               <a 
                 key={platform}
                 href={`#`} 
                 className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all transform hover:scale-110"
               >
                 <i className={`fi fi-brands-${platform === 'x' ? 'twitter' : platform} text-lg`}></i>
               </a>
             )
           ))}
        </div>

        {/* Links */}
        <div className="space-y-4">
          {profile.links?.filter((l: any) => l.active).map((link: any, i: number) => (
            <a 
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 px-6 bg-white/90 backdrop-blur text-secondary rounded-2xl font-semibold shadow-md hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300"
            >
              {link.title}
            </a>
          ))}
        </div>
        
        <a href="/" className="mt-12 inline-flex items-center gap-1 text-white/50 text-sm font-medium hover:text-white transition-colors">
          Powered by <span className="text-white font-bold tracking-tight">Monkey<span className="text-primary">.</span></span>
        </a>
      </motion.div>
    </div>
  )
}
