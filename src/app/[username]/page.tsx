'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'

export default function PublicProfile({ params }: { params: { username: string } }) {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('monkey_bio')
        .select('*')
        .eq('username', params.username.toLowerCase())
        .single()

      if (error || !data) {
        setError(true)
      } else {
        setProfile(data)
      }
      setLoading(false)
    }

    fetchProfile()
  }, [params.username])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <i className="fi fi-rr-spinner animate-spin text-3xl text-primary"></i>
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-8 text-center">
        <h1 className="text-4xl font-black mb-4">404</h1>
        <p className="text-gray-500 font-medium mb-8">The page you're looking for doesn't exist.</p>
        <a href="/" className="px-8 py-3 bg-secondary text-white font-bold rounded-full">Go Home</a>
      </div>
    )
  }

  const avatarUrl = profile.avatar_url || `https://ui-avatars.com/api/?name=${profile.username}&background=6cf383&color=0F172A&bold=true`

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-6 pt-16">
      <div className="w-full max-w-xl flex flex-col items-center">
        {/* Profile Header */}
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-lg mb-4">
          <img src={avatarUrl} alt={profile.username} className="w-full h-full object-cover" />
        </div>
        <h1 className="text-xl font-extrabold text-secondary mb-1">@{profile.username}</h1>
        {profile.bio && <p className="text-sm font-medium text-gray-500 mb-8 text-center max-w-sm">{profile.bio}</p>}

        {/* Links */}
        <div className="w-full space-y-4">
          {(profile.links || []).filter((l: any) => l.active).map((link: any, i: number) => (
            <motion.a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="w-full py-4 px-6 bg-white border-2 border-gray-100 rounded-2xl flex items-center justify-between group hover:border-primary transition-all shadow-sm hover:shadow-md no-underline"
            >
              <span className="flex-1 text-center font-bold text-secondary text-[15px]">{link.title}</span>
            </motion.a>
          ))}
        </div>

        {/* Social Icons (Footer style) */}
        {profile.social_links && Object.keys(profile.social_links).length > 0 && (
          <div className="flex items-center justify-center gap-6 mt-12">
            {Object.entries(profile.social_links).map(([platform, handle]: [string, any]) => (
              <a key={platform} href="#" className="text-gray-400 hover:text-secondary transition-colors">
                 <i className={`fi fi-brands-${platform === 'x' ? 'twitter' : platform} text-xl`}></i>
              </a>
            ))}
          </div>
        )}

        {/* Bottom Banner */}
        <div className="mt-20 mb-8">
           <a href="/" className="flex items-center gap-1 font-black text-xl text-gray-400 hover:text-secondary transition-colors italic">
              Monkey <span className="text-primary not-italic">*</span>
           </a>
        </div>
      </div>

      {/* Floating Buttons */}
      <div className="fixed top-6 right-6 flex gap-3">
        <button className="p-3 bg-white/70 backdrop-blur-md border border-gray-100 rounded-full shadow-lg hover:bg-white transition-all">
          <i className="fi fi-rr-share text-secondary text-lg flex items-center justify-center"></i>
        </button>
        <button className="p-3 bg-white/70 backdrop-blur-md border border-gray-100 rounded-full shadow-lg hover:bg-white transition-all">
          <i className="fi fi-rr-menu-dots-vertical text-secondary text-lg flex items-center justify-center"></i>
        </button>
      </div>
    </div>
  )
}
