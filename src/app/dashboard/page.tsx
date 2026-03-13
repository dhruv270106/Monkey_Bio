'use client'

import { useState, useEffect } from 'react'
import { motion, Reorder } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import Sidebar from '@/components/dashboard/Sidebar'
import Preview from '@/components/dashboard/Preview'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [links, setLinks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        window.location.href = '/login'
        return
      }

      const { data: profile } = await supabase
        .from('monkey_bio')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (!profile || !profile.onboarding_completed) {
        window.location.href = '/onboarding'
        return
      }

      setUser(session.user)
      setProfile(profile)
      setLinks(profile.links || [])
      setLoading(false)
    }

    fetchUserData()
  }, [])

  const saveLinks = async (updatedLinks: any[]) => {
    if (!user) return
    await supabase
      .from('monkey_bio')
      .update({ links: updatedLinks })
      .eq('id', user.id)
  }

  const addLink = () => {
    const newLink = { id: Date.now(), title: '', url: '', active: true, clicks: 0 }
    const updatedLinks = [newLink, ...links]
    setLinks(updatedLinks)
    saveLinks(updatedLinks)
  }

  const updateLink = (id: number, field: string, value: any) => {
    const updatedLinks = links.map(l => l.id === id ? { ...l, [field]: value } : l)
    setLinks(updatedLinks)
    saveLinks(updatedLinks)
  }

  const deleteLink = (id: number) => {
    if (confirm('Delete this link?')) {
      const updatedLinks = links.filter(l => l.id !== id)
      setLinks(updatedLinks)
      saveLinks(updatedLinks)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <i className="fi fi-rr-spinner animate-spin text-3xl text-primary"></i>
      </div>
    )
  }

  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar userProfile={profile} />

      <main className="flex-1 flex flex-col bg-white overflow-hidden">
        {/* Toolbar */}
        <div className="h-16 px-8 flex items-center justify-between bg-white border-b border-gray-50 flex-shrink-0">
          <h1 className="font-bold text-xl">Links</h1>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full font-bold text-sm hover:bg-gray-50">
              <i className="fi fi-rr-magic-wand text-purple-500"></i> Enhance
            </button>
            <button className="p-2 border border-gray-200 rounded-full hover:bg-gray-50">
              <i className="fi fi-rr-settings text-gray-400 text-xl flex items-center justify-center w-5 h-5"></i>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-12 bg-white">
          <div className="max-w-xl mx-auto space-y-8">
            
            {/* Profile Header */}
            <div className="flex items-center gap-6 mb-12">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-gray-50 overflow-hidden border-2 border-white shadow-sm cursor-pointer relative">
                  <img 
                    src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.username}&background=6cf383&color=0F172A&bold=true`} 
                    className="w-full h-full object-cover" 
                    alt="Avatar"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-white">
                    <i className="fi fi-rr-camera text-2xl"></i>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  {profile?.display_name || profile?.username} <i className="fi fi-rr-check-circle text-blue-500 text-lg"></i>
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
                  {profile?.bio || 'No bio yet'}
                </div>
              </div>
            </div>

            {/* Add Link Section */}
            <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md pb-6 pt-4">
              <button 
                onClick={addLink}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-[32px] text-[15px] hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <i className="fi fi-rr-plus"></i> Add Link
              </button>
            </div>

            {/* Links List */}
            <Reorder.Group axis="y" values={links} onReorder={setLinks} className="space-y-4">
              {links.map((link) => (
                <Reorder.Item key={link.id} value={link} className="relative group animate-fade-in mb-6">
                  <div className="absolute inset-y-0 -left-8 flex items-center text-gray-200 group-hover:text-gray-400 transition-colors cursor-grab">
                    <i className="fi fi-rr-grip-vertical text-xl"></i>
                  </div>
                  <div className="bg-white border-2 border-gray-100 rounded-[32px] p-6 shadow-sm hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 mr-4 space-y-2">
                        <input 
                          type="text" 
                          value={link.title} 
                          onChange={(e) => updateLink(link.id, 'title', e.target.value)}
                          className="font-bold text-[15px] text-secondary bg-transparent border-none p-0 focus:ring-0 w-full placeholder-gray-400 outline-none" 
                          placeholder="Title"
                        />
                        <input 
                          type="text" 
                          value={link.url} 
                          onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                          className="text-sm text-gray-500 bg-transparent border-none p-0 focus:ring-0 w-full placeholder-gray-400 outline-none" 
                          placeholder="URL"
                        />
                      </div>
                      <div className="flex items-center gap-4">
                        <button className="text-gray-300 hover:text-secondary"><i className="fi fi-rr-picture text-xl"></i></button>
                        <div 
                          onClick={() => updateLink(link.id, 'active', !link.active)}
                          className={`w-12 h-6 ${link.active ? 'bg-primary' : 'bg-gray-200'} rounded-full relative p-1 cursor-pointer transition-all`}
                        >
                          <div className={`w-4 h-4 bg-white rounded-full absolute ${link.active ? 'right-1' : 'left-1'} transition-all shadow-sm`}></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 mt-6 pt-4 border-t border-gray-50">
                      <button className="text-gray-400 hover:text-secondary transition-all"><i className="fi fi-rr-star text-lg"></i></button>
                      <button className="text-gray-400 hover:text-secondary transition-all"><i className="fi fi-rr-clock text-lg"></i></button>
                      <span className="flex items-center gap-1.5 text-xs font-bold text-gray-400 ml-auto mr-4">
                        <i className="fi fi-rr-stats text-sm"></i> {link.clicks || 0} clicks
                      </span>
                      <button 
                        onClick={() => deleteLink(link.id)}
                        className="text-gray-300 hover:text-red-500 transition-all font-bold text-xs flex items-center gap-1"
                      >
                        <i className="fi fi-rr-trash text-lg"></i>
                      </button>
                    </div>
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>

            {links.length === 0 && (
              <div className="py-20 text-center space-y-4 text-gray-400">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                  <i className="fi fi-rr-link text-3xl"></i>
                </div>
                <p className="font-medium">No links yet. Click "Add Link" to get started!</p>
              </div>
            )}

            <div className="flex items-center justify-between pt-10 border-t border-gray-50">
              <button className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-secondary"><i className="fi fi-rr-add text-xl"></i> Add collection</button>
              <button className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-secondary">View archive <i className="fi fi-rr-angle-right text-lg"></i></button>
            </div>
          </div>
        </div>
      </main>

      <Preview userProfile={profile} links={links} socialLinks={profile?.social_links} />
    </div>
  )
}
