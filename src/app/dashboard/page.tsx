'use client'

import { useState, useEffect } from 'react'
import { motion, Reorder } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import Sidebar from '@/components/dashboard/Sidebar'
import Preview from '@/components/dashboard/Preview'

interface Link {
  id: string
  title: string
  url: string
  active: boolean
  platform?: string
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

export default function Dashboard() {
  const [links, setLinks] = useState<Link[]>([])
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      window.location.href = '/login'
      return
    }

    const [linksRes, profileRes] = await Promise.all([
      supabase.from('monkey_bio').select('links').eq('id', session.user.id).single(),
      supabase.from('monkey_bio').select('*').eq('id', session.user.id).single()
    ])

    if (profileRes.data) {
      if (!profileRes.data.onboarding_completed) {
        window.location.href = '/onboarding'
        return
      }
      setProfile(profileRes.data)
      setLinks(profileRes.data.links || [])
    }
    setLoading(false)
  }

  const updateLinks = async (newLinks: Link[]) => {
    setLinks(newLinks)
    if (profile) {
      await supabase
        .from('monkey_bio')
        .update({ links: newLinks })
        .eq('id', profile.id)
    }
  }

  const toggleLink = async (id: string) => {
    const newLinks = links.map(l => l.id === id ? { ...l, active: !l.active } : l)
    await updateLinks(newLinks)
  }

  const deleteLink = async (id: string) => {
    const newLinks = links.filter(l => l.id !== id)
    await updateLinks(newLinks)
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

        {/* Main Content */}
        <main className="flex-1 flex flex-col bg-white overflow-hidden">
          {/* Toolbar */}
          <div className="h-16 px-8 flex items-center justify-between bg-white border-b border-gray-50 flex-shrink-0">
             <h1 className="font-bold text-xl">Links</h1>
             <div className="flex items-center gap-3">
                 <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full font-bold text-sm hover:bg-gray-50">
                     <i className="fi fi-rr-magic-wand text-purple-500 text-xs"></i> Enhance
                 </button>
                 <button className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 flex items-center justify-center">
                    <i className="fi fi-rr-settings text-gray-400 text-sm"></i>
                 </button>
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 bg-white no-scrollbar">
            <div className="max-w-xl mx-auto space-y-8">
              
              {/* Profile Header */}
              <div className="flex items-center gap-6 mb-12">
                  <div className="relative group">
                      <div className="w-24 h-24 rounded-full bg-gray-50 overflow-hidden border-2 border-white shadow-sm cursor-pointer relative">
                          <img 
                            src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.display_name || 'User'}&background=random`} 
                            className="w-full h-full object-cover" 
                            alt=""
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-white">
                              <i className="fi fi-rr-camera"></i>
                          </div>
                      </div>
                  </div>
                  <div>
                      <h2 className="text-2xl font-bold flex items-center gap-2">
                        {profile?.display_name || 'User'} 
                        <i className="fi fi-sr-badge-check text-blue-500"></i>
                      </h2>
                      <div className="flex items-center gap-4 mt-2">
                         <span className="text-xs text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1">
                            <i className="fi fi-rr-link text-[10px]"></i> linktr.ee/{profile?.username}
                         </span>
                      </div>
                  </div>
              </div>

              {/* Purple Add Link Button */}
              <div className="sticky top-0 z-40 bg-white pb-6 pt-4">
                  <button className="w-full py-4 bg-[#8b3eff] text-white font-bold rounded-[32px] text-[15px] hover:bg-[#7221e6] transition-all flex items-center justify-center gap-2 group">
                      <i className="fi fi-rr-plus text-xs"></i> Add Link
                  </button>
              </div>

              {/* Social Icons Section */}
              <div className="bg-gray-50/50 border border-gray-100 rounded-[32px] p-8">
                  <div className="flex items-center justify-between mb-6">
                      <div>
                          <h3 className="font-bold text-lg">Social Icons</h3>
                          <p className="text-xs text-gray-500">Pick which social icons to show on your profile</p>
                      </div>
                      <button className="px-4 py-2 bg-white border border-gray-200 rounded-full font-bold text-sm hover:bg-gray-100 transition-all">Add Social Icon</button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                      <div className="p-3 bg-white rounded-2xl border border-dashed border-gray-200 text-gray-400 text-xs flex items-center gap-2 cursor-pointer hover:border-purple-300 hover:text-purple-600 transition-all">
                          <i className="fi fi-rr-add"></i> Add your first social icon
                      </div>
                  </div>
              </div>

              {/* Reorderable Links List */}
              <div className="space-y-4">
                {links.length === 0 ? (
                  <div className="py-20 text-center space-y-4 text-gray-400">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                        <i className="fi fi-rr-link text-2xl"></i>
                      </div>
                      <p className="font-medium">No links yet. Click "Add Link" to get started!</p>
                  </div>
                ) : (
                  <Reorder.Group axis="y" values={links} onReorder={updateLinks} className="space-y-4">
                    {links.map((link) => (
                      <Reorder.Item 
                        key={link.id} 
                        value={link} 
                        className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-sm hover:shadow-md transition-all group relative"
                      >
                        <div className="flex items-center gap-4">
                          <div className="cursor-grab active:cursor-grabbing text-gray-300">
                             <i className="fi fi-rr-grip-vertical"></i>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                               <input 
                                 type="text" 
                                 value={link.title}
                                 className="font-bold text-secondary bg-transparent outline-none focus:border-b border-gray-200"
                                 onChange={(e) => {
                                   const newLinks = links.map(l => l.id === link.id ? { ...l, title: e.target.value } : l)
                                   setLinks(newLinks)
                                 }}
                                 onBlur={() => updateLinks(links)}
                               />
                               <div className="flex items-center gap-4">
                                  <button onClick={() => toggleLink(link.id)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${link.active ? 'bg-primary' : 'bg-gray-200'}`}>
                                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${link.active ? 'translate-x-6' : 'translate-x-1'}`} />
                                  </button>
                               </div>
                            </div>
                            <input 
                              type="text" 
                              value={link.url}
                              className="text-sm text-gray-500 bg-transparent outline-none block w-full"
                              onChange={(e) => {
                                const newLinks = links.map(l => l.id === link.id ? { ...l, url: e.target.value } : l)
                                setLinks(newLinks)
                              }}
                              onBlur={() => updateLinks(links)}
                            />
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="flex items-center gap-4 text-gray-400">
                               <button className="hover:text-secondary"><i className="fi fi-rr-picture text-sm"></i></button>
                               <button className="hover:text-secondary"><i className="fi fi-rr-star text-sm"></i></button>
                               <button className="hover:text-secondary"><i className="fi fi-rr-stats text-sm"></i></button>
                            </div>
                            <button onClick={() => deleteLink(link.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                               <i className="fi fi-rr-trash text-sm"></i>
                            </button>
                        </div>
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>
                )}
              </div>

              {/* Archive row */}
              <div className="flex items-center justify-between pt-10 border-t border-gray-50">
                   <button className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-secondary"><i className="fi fi-rr-square-plus"></i> Add collection</button>
                   <button className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-secondary">View archive <i className="fi fi-rr-angle-small-right pt-0.5"></i></button>
              </div>

              <div className="flex items-center gap-2 font-black text-xl px-2 opacity-50 grayscale mt-12 mb-20 text-secondary">
                Monkey <span className="text-primary text-2xl">*</span>
              </div>

            </div>
          </div>
        </main>

        <Preview userProfile={profile} links={links} socialLinks={profile?.social_links} />
      </div>
    </div>
  )
}
