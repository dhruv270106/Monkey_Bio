'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import Sidebar from '@/components/dashboard/Sidebar'
import Preview from '@/components/dashboard/Preview'
import { THEMES } from '@/data/themes'

interface Link {
  id: string
  title: string
  url: string
  active: boolean
  platform?: string
  highlighted?: boolean
}

interface Profile {
  id: string
  username: string
  display_name: string
  avatar_url: string
  bio: string
  social_links: any
  theme: string
}

export default function DesignPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [links, setLinks] = useState<Link[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      window.location.href = '/login'
      return
    }

    const { data: profileData } = await supabase
      .from('monkey_bio')
      .select('*')
      .eq('id', session.user.id)
      .single()

    if (profileData) {
      setProfile(profileData)
      setLinks(profileData.links || [])
    }
    setLoading(false)
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!profile) return
    const newProfile = { ...profile, ...updates }
    setProfile(newProfile)
    
    setSaving(true)
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      await supabase
        .from('monkey_bio')
        .update(updates)
        .eq('id', session.user.id)
    }
    setSaving(false)
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64 = reader.result as string
      await updateProfile({ avatar_url: base64 })
    }
    reader.readAsDataURL(file)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <i className="fi fi-rr-spinner animate-spin text-3xl text-primary"></i>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Banner */}
      <div className="bg-[#1e293b] text-white py-2 px-8 flex justify-center items-center gap-4 text-sm font-medium sticky top-0 z-[100]">
          <span>Unlock more tools to grow your audience faster.</span>
          <button className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 px-3 py-1 rounded-full flex items-center gap-2 transition-all">
              <i className="fi fi-rr-bolt text-[10px]"></i> Claim free week
          </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <Sidebar userProfile={profile} />

        <main className="flex-1 flex flex-col bg-white overflow-hidden">
          {/* Toolbar */}
          <div className="h-16 px-8 flex items-center justify-between bg-white border-b border-gray-50 flex-shrink-0">
             <h1 className="font-bold text-xl">Appearance</h1>
             {saving && <span className="text-xs font-bold text-primary animate-pulse flex items-center gap-2">
               <i className="fi fi-rr-cloud-upload"></i> Saving...
             </span>}
          </div>

          <div className="flex-1 overflow-y-auto p-12 bg-white no-scrollbar">
            <div className="max-w-xl mx-auto space-y-12">
              
              {/* Profile Section */}
              <section className="space-y-6">
                <h2 className="text-xl font-black">Profile</h2>
                <div className="bg-gray-50/50 p-8 rounded-[40px] border border-gray-100 space-y-8">
                  <div className="flex items-center gap-8">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-full bg-white overflow-hidden border-4 border-white shadow-xl cursor-pointer relative">
                        <img 
                          src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.display_name || 'User'}&background=random`} 
                          className="w-full h-full object-cover" 
                          alt=""
                        />
                        <input 
                          type="file" 
                          className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                          onChange={handleAvatarUpload}
                          accept="image/*"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-white">
                          <i className="fi fi-rr-camera"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                      <button className="w-full py-3 bg-secondary text-white font-black rounded-full text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-lg relative overflow-hidden">
                        Pick an image
                        <input 
                          type="file" 
                          className="absolute inset-0 opacity-0 cursor-pointer" 
                          onChange={handleAvatarUpload}
                          accept="image/*"
                        />
                      </button>
                      <button 
                        onClick={() => updateProfile({ avatar_url: '' })}
                        className="w-full py-3 bg-white border-2 border-gray-100 text-secondary font-black rounded-full text-sm hover:bg-gray-50 transition-all"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block tracking-widest pl-2">Profile Title</label>
                      <input 
                        type="text" 
                        value={profile?.display_name || ''}
                        onChange={(e) => updateProfile({ display_name: e.target.value })}
                        className="w-full px-6 py-4 bg-white rounded-2xl border-2 border-transparent focus:border-primary/50 outline-none font-bold text-secondary shadow-sm transition-all"
                        placeholder="Profile Title"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block tracking-widest pl-2">Bio</label>
                      <textarea 
                        maxLength={200}
                        value={profile?.bio || ''}
                        onChange={(e) => updateProfile({ bio: e.target.value })}
                        className="w-full px-6 py-4 bg-white rounded-2xl border-2 border-transparent focus:border-primary/50 outline-none font-bold text-secondary shadow-sm transition-all h-32 resize-none"
                        placeholder="Bio"
                      />
                      <p className="text-right text-[10px] text-gray-400 font-bold mt-2 pr-2">{profile?.bio?.length || 0}/200</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Themes Section */}
              <section className="space-y-6">
                <div>
                  <h2 className="text-xl font-black">Themes</h2>
                  <p className="text-sm text-gray-400 font-bold mt-1">Select a pre-designed theme for your profile</p>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  {THEMES.map((theme) => (
                    <button 
                      key={theme.id}
                      onClick={() => updateProfile({ theme: theme.id })}
                      className={`group relative flex flex-col gap-3 p-3 rounded-[32px] border-4 transition-all ${profile?.theme === theme.id ? 'border-primary bg-white' : 'border-transparent bg-gray-50/50 hover:bg-white hover:border-gray-100'}`}
                    >
                      <div className={`aspect-[9/16] w-full rounded-2xl overflow-hidden shadow-inner ${theme.bg} relative`}>
                        {theme.id === 'grid-mocha' && (
                          <div className="absolute inset-0" style={{
                            backgroundImage: 'linear-gradient(#ffffff1a 1px, transparent 1px), linear-gradient(90deg, #ffffff1a 1px, transparent 1px)',
                            backgroundSize: '15px 15px'
                          }}></div>
                        )}
                        <div className="flex flex-col items-center pt-6 px-4 gap-2">
                           <div className="w-6 h-6 rounded-full bg-white/20"></div>
                           <div className={`w-full h-3 rounded-lg ${theme.button} opacity-40`}></div>
                           <div className={`w-full h-3 rounded-lg ${theme.button} opacity-40`}></div>
                           <div className={`w-full h-3 rounded-lg ${theme.button} opacity-40`}></div>
                        </div>
                      </div>
                      <span className="font-extrabold text-[11px] text-center text-secondary uppercase tracking-wider">{theme.name}</span>
                      
                      {profile?.theme === theme.id && (
                        <div className="absolute top-5 right-5 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-secondary shadow-lg">
                          <i className="fi fi-rr-check text-[10px]"></i>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </section>

              {/* Custom Appearance Placeholder */}
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black">Custom Appearance</h2>
                  <span className="px-3 py-1 bg-purple-100 text-purple-600 text-[10px] font-black rounded-full uppercase tracking-tighter">Pro</span>
                </div>
                <div className="bg-gray-50/50 p-12 rounded-[40px] border border-gray-100 border-dashed text-center space-y-4">
                  <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mx-auto shadow-sm">
                    <i className="fi fi-rr-palette text-2xl text-purple-400"></i>
                  </div>
                  <h3 className="font-black text-secondary">Advanced Customization</h3>
                  <p className="text-sm text-gray-400 font-bold max-w-xs mx-auto">Upgrade to unlock custom backgrounds, button styles, and high-end fonts.</p>
                  <button className="px-8 py-3 bg-white border border-gray-200 text-secondary font-black rounded-full text-xs hover:bg-gray-50 transition-all shadow-sm">
                    Upgrade to customize
                  </button>
                </div>
              </section>

              <div className="flex items-center gap-2 font-black text-2xl px-2 opacity-10 grayscale py-12 text-secondary">
                Monkey <span className="text-primary text-3xl">*</span>
              </div>
            </div>
          </div>
        </main>

        <Preview userProfile={profile} links={links} socialLinks={profile?.social_links} />
      </div>
    </div>
  )
}
