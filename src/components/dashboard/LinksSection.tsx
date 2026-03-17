'use client'

import { useState, useEffect } from 'react'
import { motion, Reorder, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { APPS } from '@/data/apps'
import AddLinkModal from '@/components/dashboard/AddLinkModal'
import ManageLinksModal from '@/components/dashboard/ManageLinksModal'

interface Link {
  id: string
  title: string
  url: string
  active: boolean
  platform?: string
  highlighted?: boolean
  thumbnail?: string
  layout?: 'classic' | 'featured'
}

interface LinksSectionProps {
  profile: any
  links: Link[]
  setLinks: (links: Link[]) => void
  setProfile: (profile: any) => void
  refreshData: () => void
}

export default function LinksSection({ profile, links, setLinks, setProfile, refreshData }: LinksSectionProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isManageModalOpen, setIsManageModalOpen] = useState(false)
  const [expandedLinkId, setExpandedLinkId] = useState<string | null>(null)

  const updateLinks = async (newLinks: Link[]) => {
    const sortedLinks = [...newLinks].sort((a, b) => {
      if (a.highlighted && !b.highlighted) return -1
      if (!a.highlighted && b.highlighted) return 1
      return 0
    })
    
    setLinks(sortedLinks)
    setProfile((prev: any) => {
      if (!prev) return null
      return {
        ...prev,
        links: sortedLinks
      }
    })
    
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      await supabase
        .from('monkey_bio')
        .update({ links: sortedLinks })
        .eq('id', session.user.id)
    }
  }

  const toggleHighlight = async (id: string) => {
    const newLinks = links.map(l => l.id === id ? { ...l, highlighted: !l.highlighted } : l)
    await updateLinks(newLinks)
  }

  const toggleLayout = async (id: string) => {
    const newLinks = links.map(l => {
      if (l.id === id) {
        return { ...l, layout: (l.layout === 'featured' ? 'classic' : 'featured') as 'classic' | 'featured' }
      }
      return l
    })
    await updateLinks(newLinks)
  }

  const handleThumbnailUpload = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Preview locally first for speed
    const reader = new FileReader()
    reader.onload = async (event) => {
      const base64 = event.target?.result as string
      const newLinks = links.map(l => l.id === id ? { ...l, thumbnail: base64 } : l)
      await updateLinks(newLinks)
    }
    reader.readAsDataURL(file)
  }

  const handleAddNewLink = async (linkData: { title: string; url: string; platform: string }) => {
    if (links.length >= 20) {
      alert('Maximum 20 links allowed!')
      return
    }
    const newLink: Link = {
      id: Math.random().toString(36).substr(2, 9),
      title: linkData.title,
      url: linkData.url,
      active: true,
      platform: linkData.platform,
      layout: 'classic' as const
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

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      <AddLinkModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddNewLink}
        linksCount={links.length}
      />

      <ManageLinksModal
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
        links={links}
        onUpdate={updateLinks}
      />

      {/* Toolbar */}
      <div className="h-16 px-8 flex items-center justify-between bg-white border-b border-gray-50 flex-shrink-0">
         <h1 className="font-bold text-xl">Links</h1>
         <div className="flex items-center gap-3">
              <button 
                onClick={() => {
                  const url = `https://monkey.link/${profile?.username}`
                  if (navigator.share) {
                    navigator.share({ title: profile?.display_name || 'Monkey Bio', url }).catch(() => {})
                  } else {
                    navigator.clipboard.writeText(url)
                    alert('Link copied to clipboard!')
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 border border-blue-100 bg-blue-50/50 text-blue-600 rounded-full font-bold text-sm hover:bg-blue-100 transition-all active:scale-95"
              >
                  <i className="fi fi-rr-share text-xs"></i> Share
              </button>
              <button 
                onClick={refreshData} 
                className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 flex items-center justify-center transition-all active:rotate-180"
                title="Refresh Data"
              >
                 <i className="fi fi-rr-refresh text-gray-400 text-sm"></i>
              </button>
         </div>
      </div>

      <div className="flex-1 overflow-y-auto p-12 bg-white no-scrollbar">
        <div className="max-w-xl mx-auto space-y-8 pb-32">
          
          {/* Profile Header */}
          <div className="flex items-center gap-6 mb-12 bg-gray-50/50 p-8 rounded-[40px] border border-gray-100">
              <div className="relative group">
                  <div className="w-24 h-24 rounded-full bg-white overflow-hidden border-4 border-white shadow-xl cursor-pointer relative">
                      <img 
                        src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.display_name || 'User'}&background=random`} 
                        className="w-full h-full object-cover" 
                        alt=""
                      />
                  </div>
              </div>
              <div>
                  <h2 className="text-2xl font-black flex items-center gap-2">
                    {profile?.display_name || 'User'} 
                    <i className="fi fi-sr-badge-check text-primary text-xl"></i>
                  </h2>
                  <div className="flex items-center gap-4 mt-3">
                     <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1">
                        <i className="fi fi-rr-link text-[10px]"></i> monkey.link/{profile?.username}
                     </span>
                  </div>
              </div>
          </div>

          {/* Purple Add Link Button */}
          <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md pb-6 pt-4">
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="w-full py-5 bg-[#8b3eff] text-white font-black rounded-[40px] text-lg hover:bg-[#7221e6] transition-all flex items-center justify-center gap-2 group shadow-xl active:scale-95"
              >
                  <i className="fi fi-rr-plus text-sm"></i> Add Link
              </button>
          </div>

           {/* Social Icons Section */}
           <div className="bg-[#fdf2e3] border border-[#e8dcc8] rounded-[40px] p-8">
              <div className="flex items-center justify-between mb-6">
                  <div>
                      <h3 className="font-black text-xl text-secondary">Social Cards</h3>
                      <p className="text-sm text-secondary/60">Manage your link cards ({links.length}/20)</p>
                  </div>
                  <button 
                    onClick={() => setIsManageModalOpen(true)}
                    className="px-5 py-2.5 bg-white border border-gray-200 rounded-full font-bold text-sm hover:bg-gray-100 transition-all shadow-sm"
                  >
                     <i className="fi fi-rr-settings-sliders mr-2"></i> Manage
                  </button>
              </div>
              <div className="flex flex-wrap gap-4">
                  {links.map((link) => {
                    const appConfig = APPS.find(a => a.id === link.platform)
                    return (
                      <a 
                        key={link.id} 
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-white p-4 pr-12 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:-translate-y-1 hover:shadow-md transition-all cursor-pointer relative"
                      >
                         <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center">
                            {link.thumbnail ? (
                              <img src={link.thumbnail} className="w-full h-full object-cover rounded-xl" />
                            ) : (
                              <i className={`fi ${appConfig?.icon || 'fi-rr-link'} text-xl ${appConfig?.color || 'text-secondary'}`}></i>
                            )}
                         </div>
                         <div>
                            <p className="text-xs font-black truncate max-w-[120px]">{link.title}</p>
                         </div>
                         <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <i className="fi fi-rr-arrow-up-right text-[10px] text-primary"></i>
                         </div>
                      </a>
                    )
                  })}
                  {links.length === 0 && (
                    <div className="w-full p-6 bg-white/50 rounded-3xl border border-dashed border-secondary/10 flex flex-col items-center justify-center text-center">
                       <p className="text-xs font-bold text-secondary/40">No link cards added yet.</p>
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
                    className={`bg-white border border-gray-100 rounded-[32px] p-5 shadow-sm hover:shadow-lg transition-all group relative border-l-[6px] ${link.highlighted ? 'border-l-yellow-400' : 'border-l-primary'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-secondary transition-colors p-1">
                         <i className="fi fi-rr-grip-vertical text-sm"></i>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 border border-gray-100 overflow-hidden">
                         {link.thumbnail ? (
                           <img src={link.thumbnail} className="w-full h-full object-cover" />
                         ) : (
                           <i className={`fi ${APPS.find(a => a.id === link.platform)?.icon || 'fi-rr-link'} text-lg text-secondary opacity-70`}></i>
                         )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                           <h3 className="font-black text-lg text-secondary w-full mr-4 truncate">
                             {link.title}
                           </h3>
                           <div className="flex items-center gap-4">
                              <button onClick={() => toggleLink(link.id)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${link.active ? 'bg-primary' : 'bg-gray-200'}`}>
                                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${link.active ? 'translate-x-6' : 'translate-x-1'}`} />
                              </button>
                           </div>
                        </div>
                        <p className="text-xs font-medium text-gray-400 block w-full truncate">
                          {link.url}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="flex items-center gap-4">
                           <button 
                             onClick={() => toggleHighlight(link.id)}
                             className={`${link.highlighted ? 'text-yellow-500' : 'hover:text-yellow-500'} flex items-center gap-2 text-[10px] font-bold transition-colors`}
                             title="Highlight"
                           >
                             <i className={`fi ${link.highlighted ? 'fi-sr-star' : 'fi-rr-star'}`}></i>
                           </button>

                           <button 
                             onClick={() => setExpandedLinkId(expandedLinkId === link.id ? null : link.id)}
                             className={`flex items-center gap-2 text-[10px] font-bold transition-colors ${expandedLinkId === link.id ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}
                             title="More Features"
                           >
                             <i className="fi fi-rr-settings-sliders"></i> Features
                           </button>
                        </div>
                        <button onClick={() => deleteLink(link.id)} className="w-8 h-8 rounded-xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center shadow-sm">
                           <i className="fi fi-rr-trash text-xs"></i>
                        </button>
                    </div>

                    {/* Features Panel */}
                    <AnimatePresence>
                      {expandedLinkId === link.id && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-6 p-6 bg-gray-50 rounded-3xl space-y-6">
                             {/* Layout Toggle */}
                             <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Layout</label>
                                <div className="grid grid-cols-2 gap-3">
                                   <button 
                                      onClick={() => toggleLayout(link.id)}
                                      className={`p-4 rounded-2xl flex flex-col items-center gap-2 transition-all border-2 ${link.layout === 'classic' || !link.layout ? 'bg-white border-primary shadow-sm' : 'bg-white border-transparent grayscale opacity-50'}`}
                                   >
                                      <i className="fi fi-rr-list text-lg"></i>
                                      <span className="text-[10px] font-black uppercase">Classic</span>
                                   </button>
                                   <button 
                                      onClick={() => toggleLayout(link.id)}
                                      className={`p-4 rounded-2xl flex flex-col items-center gap-2 transition-all border-2 ${link.layout === 'featured' ? 'bg-white border-primary shadow-sm' : 'bg-white border-transparent grayscale opacity-50'}`}
                                   >
                                      <i className="fi fi-rr-gallery text-lg"></i>
                                      <span className="text-[10px] font-black uppercase">Featured</span>
                                   </button>
                                </div>
                             </div>

                             {/* Thumbnail Upload */}
                             <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Thumbnail Image</label>
                                <div className="flex items-center gap-4">
                                   <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 overflow-hidden flex items-center justify-center shrink-0 shadow-sm relative group/thumb">
                                      {link.thumbnail ? (
                                        <img src={link.thumbnail} className="w-full h-full object-cover" />
                                      ) : (
                                        <i className="fi fi-rr-picture text-gray-200 text-xl"></i>
                                      )}
                                      <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={(e) => handleThumbnailUpload(link.id, e)}
                                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                      />
                                   </div>
                                   <div className="flex-1 space-y-1">
                                      <p className="text-xs font-bold text-secondary">Set Custom Thumbnail</p>
                                      <p className="text-[10px] text-gray-400 font-medium">Add a photo to make your link stand out.</p>
                                   </div>
                                </div>
                             </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
