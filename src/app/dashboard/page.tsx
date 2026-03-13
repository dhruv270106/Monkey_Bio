'use client'

import { useState, useEffect } from 'react'
import { motion, Reorder } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import Sidebar from '@/components/dashboard/Sidebar'
import Preview from '@/components/dashboard/Preview'
import AddLinkModal from '@/components/dashboard/AddLinkModal'

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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

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

  const handleAddNewLink = async (linkData: { title: string; url: string; platform: string }) => {
    const newLink: Link = {
      id: Math.random().toString(36).substr(2, 9),
      title: linkData.title,
      url: linkData.url,
      active: true,
      platform: linkData.platform
    }
    const newLinks = [newLink, ...links]
    await updateLinks(newLinks)
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
      <AddLinkModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddNewLink}
      />

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
              <div className="flex items-center gap-6 mb-12 bg-gray-50/50 p-8 rounded-[40px] border border-gray-100">
                  <div className="relative group">
                      <div className="w-24 h-24 rounded-full bg-white overflow-hidden border-4 border-white shadow-xl cursor-pointer relative">
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
                      <h2 className="text-2xl font-black flex items-center gap-2">
                        {profile?.display_name || 'User'} 
                        <i className="fi fi-sr-badge-check text-primary text-xl"></i>
                      </h2>
                      <div className="flex items-center gap-4 mt-2">
                         <span className="text-xs text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1">
                            <i className="fi fi-rr-link text-[10px]"></i> linktr.ee/{profile?.username}
                         </span>
                      </div>
                  </div>
              </div>

              {/* Purple Add Link Button - Now triggers the modal */}
              <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md pb-6 pt-4">
                  <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="w-full py-5 bg-[#8b3eff] text-white font-black rounded-[40px] text-lg hover:bg-[#7221e6] transition-all flex items-center justify-center gap-2 group shadow-xl active:scale-95"
                  >
                      <i className="fi fi-rr-plus text-sm"></i> Add Link
                  </button>
              </div>

              {/* Social Icons Section (Keeping this for the large box cards) */}
              <div className="bg-[#fdf2e3] border border-[#e8dcc8] rounded-[40px] p-8">
                  <div className="flex items-center justify-between mb-6">
                      <div>
                          <h3 className="font-black text-xl text-secondary">Social Cards</h3>
                          <p className="text-sm text-secondary/60">Large display cards for your main socials</p>
                      </div>
                      <button className="px-5 py-2.5 bg-white border border-gray-200 rounded-full font-bold text-sm hover:bg-gray-100 transition-all shadow-sm">
                         <i className="fi fi-rr-add mr-2"></i> Manage
                      </button>
                  </div>
                  <div className="flex flex-wrap gap-4">
                      {profile?.social_links && Object.entries(profile.social_links).map(([platform, url]: [string, any]) => (
                        url && (
                          <div key={platform} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:-translate-y-1 transition-all cursor-pointer">
                             <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center">
                                <i className={`fi fi-brands-${platform === 'x' ? 'twitter' : platform} text-xl`}></i>
                             </div>
                             <div>
                                <p className="text-xs font-black capitalize">{platform}</p>
                             </div>
                          </div>
                        )
                      ))}
                      {Object.keys(profile?.social_links || {}).length === 0 && (
                        <div className="w-full p-6 bg-white/50 rounded-3xl border border-dashed border-secondary/10 flex flex-col items-center justify-center text-center">
                           <p className="text-xs font-bold text-secondary/40">No social cards added.</p>
                        </div>
                      )}
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
                        className="bg-white border border-gray-100 rounded-[40px] p-8 shadow-sm hover:shadow-lg transition-all group relative border-l-[6px] border-l-primary"
                      >
                        <div className="flex items-center gap-6">
                          <div className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-secondary transition-colors">
                             <i className="fi fi-rr-grip-vertical text-lg"></i>
                          </div>
                          <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                             <i className={`fi ${link.platform?.startsWith('fi-') ? link.platform : `fi-brands-${link.platform || 'link'}`} text-xl text-secondary`}></i>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                               <input 
                                 type="text" 
                                 value={link.title}
                                 className="font-black text-xl text-secondary bg-transparent outline-none focus:border-b-2 border-primary w-full mr-4"
                                 onChange={(e) => {
                                   const newLinks = links.map(l => l.id === link.id ? { ...l, title: e.target.value } : l)
                                   setLinks(newLinks)
                                 }}
                                 onBlur={() => updateLinks(links)}
                               />
                               <div className="flex items-center gap-4">
                                  <button onClick={() => toggleLink(link.id)} className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${link.active ? 'bg-primary' : 'bg-gray-200'}`}>
                                      <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${link.active ? 'translate-x-6' : 'translate-x-1'}`} />
                                  </button>
                               </div>
                            </div>
                            <input 
                              type="text" 
                              value={link.url}
                              className="text-sm font-medium text-gray-400 bg-transparent outline-none block w-full hover:text-secondary transition-colors"
                              onChange={(e) => {
                                const newLinks = links.map(l => l.id === link.id ? { ...l, url: e.target.value } : l)
                                setLinks(newLinks)
                              }}
                              onBlur={() => updateLinks(links)}
                            />
                          </div>
                        </div>
                        
                        <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <div className="flex items-center gap-6 text-gray-400">
                               <button className="hover:text-secondary flex items-center gap-2 text-xs font-bold"><i className="fi fi-rr-picture"></i> Image</button>
                               <button className="hover:text-secondary flex items-center gap-2 text-xs font-bold"><i className="fi fi-rr-star"></i> Highlight</button>
                               <button className="hover:text-secondary flex items-center gap-2 text-xs font-bold"><i className="fi fi-rr-stats"></i> Analytics</button>
                            </div>
                            <button onClick={() => deleteLink(link.id)} className="w-10 h-10 rounded-2xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center">
                               <i className="fi fi-rr-trash"></i>
                            </button>
                        </div>
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>
                )}
              </div>

              <div className="flex items-center gap-2 font-black text-2xl px-2 opacity-50 grayscale mt-20 mb-32 text-secondary">
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
