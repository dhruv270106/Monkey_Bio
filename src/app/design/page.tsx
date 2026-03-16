'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import Sidebar from '@/components/dashboard/Sidebar'
import Preview from '@/components/dashboard/Preview'
import { THEMES } from '@/data/themes'
import ImageCropperModal from '@/components/modals/ImageCropperModal'

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
  custom_bg?: string
  custom_button_bg?: string
  font_family?: string
  font_size?: string
  font_color?: string
}

export default function DesignPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [links, setLinks] = useState<Link[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showCropper, setShowCropper] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')
  const [activeTab, setActiveTab] = useState('Header')
  const [fontSearch, setFontSearch] = useState('')

  const TABS = [
    { id: 'Header', icon: 'fi-rr-user' },
    { id: 'Theme', icon: 'fi-rr-palette' },
    { id: 'Text', icon: 'fi-rr-text' },
    { id: 'Buttons', icon: 'fi-rr-apps' },
    { id: 'Colors', icon: 'fi-rr-paint-brush' },
  ]

  const FONTS = [
    'Inter', 'Roboto', 'Outfit', 'Playfair Display', 'Poppins', 'Montserrat', 'Open Sans', 'Lato', 'Ubuntu', 'Lora',
    'Dancing Script', 'Pacifico', 'Caveat', 'Satisfy', 'Oswald', 'Raleway', 'Nunito', 'Merriweather', 'Bebas Neue'
  ]

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
    reader.onloadend = () => {
      setSelectedImage(reader.result as string)
      setShowCropper(true)
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
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* Top Banner */}
      <div className="bg-[#1e293b] text-white py-2 px-8 flex justify-center items-center gap-4 text-sm font-medium flex-shrink-0 z-[100]">
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
             <h1 className="font-bold text-xl">{activeTab}</h1>
             <div className="flex items-center gap-4">
               {saving && <span className="text-xs font-bold text-primary animate-pulse flex items-center gap-2">
                 <i className="fi fi-rr-cloud-upload"></i> Saving...
               </span>}
               <button className="bg-primary text-secondary font-black px-6 py-2 rounded-full text-sm shadow-lg hover:scale-105 transition-all">
                 Save
               </button>
             </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Design Tab Sidebar */}
            <div className="w-24 bg-white border-r border-gray-100 flex flex-col items-center py-8 gap-8 flex-shrink-0 overflow-y-auto no-scrollbar">
              {TABS.map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center gap-2 transition-all shrink-0 ${activeTab === tab.id ? 'text-secondary' : 'text-gray-300 hover:text-gray-400'}`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeTab === tab.id ? 'bg-gray-50' : 'bg-transparent'}`}>
                    <i className={`fi ${tab.icon} text-lg`}></i>
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-tighter ${activeTab === tab.id ? 'opacity-100' : 'opacity-0'}`}>{tab.id}</span>
                </button>
              ))}
            </div>

            {/* Content Area - Floating "Box" structure */}
            <div className="flex-1 bg-gray-50/30 p-8 overflow-hidden flex flex-col">
              <div className="flex-1 bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden flex flex-col max-w-2xl mx-auto w-full">
                <div className="flex-1 overflow-y-auto p-10 no-scrollbar">
                  <div className="space-y-12 pb-24">
                
                {activeTab === 'Header' && (
                  <motion.section initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <h2 className="text-xl font-black">Profile Header</h2>
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
                  </motion.section>
                )}

                {activeTab === 'Theme' && (
                  <motion.section initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div>
                      <h2 className="text-xl font-black">Themes</h2>
                      <p className="text-sm text-gray-400 font-bold mt-1">Select a pre-designed theme for your profile</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      {THEMES.map((theme) => (
                        <button 
                          key={theme.id}
                          onClick={() => updateProfile({ theme: theme.id })}
                          className={`group relative flex flex-col gap-3 p-3 rounded-[32px] border-4 transition-all ${profile?.theme === theme.id ? 'border-primary bg-white' : 'border-transparent bg-gray-50/50 hover:bg-white hover:border-gray-100'}`}
                        >
                          <div 
                            className={`aspect-[9/16] w-full rounded-2xl overflow-hidden shadow-inner ${theme.bg} relative transition-all duration-300 group-hover:scale-105`}
                            style={{
                              ...(theme.image ? {
                                backgroundImage: `url(${theme.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                              } : theme.id === 'custom' ? {
                                backgroundColor: profile?.custom_bg || '#ffffff',
                              } : {})
                            }}
                          >
                            {theme.grid && (
                              <div className="absolute inset-0 opacity-20" style={{
                                backgroundImage: theme.id === 'grid-mocha' 
                                  ? 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)'
                                  : 'linear-gradient(#000000 1px, transparent 1px), linear-gradient(90deg, #000000 1px, transparent 1px)',
                                backgroundSize: '15px 15px'
                              }}></div>
                            )}
                            <div className="flex flex-col items-center pt-8 px-4 gap-2">
                                 <div className={`w-6 h-6 rounded-full mb-1 ${theme.text.includes('white') ? 'bg-white/20' : 'bg-black/10'} ring-1 ring-white/20`}></div>
                                 <div className={`w-full h-2.5 rounded-md ${theme.button.split(' ')[0]} opacity-80 shadow-sm border border-black/5`}></div>
                                 <div className={`w-full h-2.5 rounded-md ${theme.button.split(' ')[0]} opacity-80 shadow-sm border border-black/5`}></div>
                            </div>
                          </div>
                          <span className="font-extrabold text-[10px] text-center text-secondary uppercase tracking-widest mt-1 opacity-80">{theme.name}</span>
                          
                          {profile?.theme === theme.id && (
                            <div className="absolute top-1 right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-secondary shadow-lg z-10">
                              <i className="fi fi-rr-check text-[10px]"></i>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.section>
                )}

                {activeTab === 'Text' && (
                  <motion.section initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                    <h2 className="text-xl font-black">Typography</h2>
                    
                    <div className="space-y-6">
                      {/* Font Family search/dropdown */}
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2">Font Style</label>
                        <div className="relative">
                          <input 
                             type="text"
                             placeholder="Search fonts..."
                             className="w-full px-10 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-primary/50 outline-none font-bold text-secondary shadow-sm transition-all"
                             value={fontSearch}
                             onChange={(e) => setFontSearch(e.target.value)}
                          />
                          <i className="fi fi-rr-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-2 h-48 overflow-y-auto no-scrollbar bg-gray-50 p-2 rounded-2xl border border-gray-100">
                          {FONTS.filter(f => f.toLowerCase().includes(fontSearch.toLowerCase())).map(font => (
                            <button 
                              key={font}
                              onClick={() => updateProfile({ font_family: font })}
                              className={`p-4 rounded-xl text-left transition-all ${profile?.font_family === font ? 'bg-white shadow-sm border border-primary/20 scale-95' : 'hover:bg-white'}`}
                              style={{ fontFamily: font }}
                            >
                              <span className="font-bold">{font}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Font Color Picker */}
                      <div className="p-8 bg-gray-50/50 rounded-[32px] border border-gray-100 space-y-4">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-black text-secondary">Font Color</label>
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black uppercase text-gray-400">{profile?.font_color || '#000000'}</span>
                            <input 
                              type="color" 
                              value={profile?.font_color || '#000000'}
                              onChange={(e) => updateProfile({ font_color: e.target.value })}
                              className="w-12 h-12 rounded-lg border-2 border-white shadow-sm cursor-pointer"
                            />
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                           {['#000000', '#ffffff', '#4b5563', '#2563eb', '#dc2626', '#16a34a', '#9333ea'].map(c => (
                             <button key={c} onClick={() => updateProfile({ font_color: c })} className="w-8 h-8 rounded-full border border-white shadow-sm" style={{ backgroundColor: c }}></button>
                           ))}
                        </div>
                      </div>

                      {/* Font Size with input and dropdown */}
                      <div className="p-8 bg-gray-50/50 rounded-[32px] border border-gray-100 space-y-4">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2">Font Size</label>
                        <div className="flex gap-4">
                           <div className="flex-1 relative">
                             <input 
                               type="number"
                               min="8"
                               max="72"
                               className="w-full px-4 py-4 bg-white rounded-2xl border-2 border-transparent focus:border-primary/50 outline-none font-bold text-secondary shadow-sm"
                               value={profile?.font_size?.replace('px', '') || '16'}
                               onChange={(e) => updateProfile({ font_size: e.target.value + 'px' })}
                             />
                             <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-gray-300 text-xs uppercase">px</span>
                           </div>
                           <select 
                             className="flex-1 px-4 py-4 bg-white rounded-2xl border-2 border-transparent focus:border-primary/50 outline-none font-bold text-secondary shadow-sm appearance-none"
                             value={profile?.font_size || '16px'}
                             onChange={(e) => updateProfile({ font_size: e.target.value })}
                           >
                             {[12, 14, 16, 18, 20, 24, 32, 48].map(s => (
                               <option key={s} value={`${s}px`}>{s}px - {s <= 14 ? 'Small' : s <= 18 ? 'Normal' : 'Large'}</option>
                             ))}
                           </select>
                        </div>
                      </div>
                    </div>
                  </motion.section>
                )}

                {activeTab === 'Buttons' && (
                  <motion.section initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                    <h2 className="text-xl font-black">Button Style</h2>
                    
                    <div className="space-y-8">
                       <div className="grid grid-cols-3 gap-4">
                          {['Solid', 'Glass', 'Outline'].map(type => (
                            <button key={type} className="flex flex-col items-center gap-3 p-4 bg-gray-50/50 rounded-3xl border border-transparent hover:border-gray-200 transition-all">
                               <div className={`w-full h-12 rounded-xl bg-white border-2 border-slate-200 ${type === 'Glass' ? 'opacity-40' : type === 'Outline' ? 'bg-transparent' : ''}`}></div>
                               <span className="text-xs font-bold text-gray-400">{type}</span>
                            </button>
                          ))}
                       </div>

                       <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Corner Roundness</label>
                          <div className="grid grid-cols-4 gap-3">
                             {['Square', 'Round', 'Rounder', 'Full'].map(type => (
                               <button key={type} className="p-4 bg-gray-50/50 rounded-2xl border border-transparent hover:border-gray-200 transition-all flex flex-col items-center gap-2">
                                  <div className={`w-8 h-8 border-2 border-slate-300 ${type === 'Square' ? '' : type === 'Round' ? 'rounded-md' : type === 'Rounder' ? 'rounded-xl' : 'rounded-full'}`}></div>
                                  <span className="text-[8px] font-black uppercase text-gray-400">{type}</span>
                               </button>
                             ))}
                          </div>
                       </div>
                    </div>
                  </motion.section>
                )}

                {activeTab === 'Colors' && (
                  <motion.section initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div>
                      <h2 className="text-xl font-black">Button Colors</h2>
                      <p className="text-sm text-gray-400 font-bold mt-1">Customize the background color of your social links</p>
                    </div>
                    <div className="p-8 bg-gray-50/50 rounded-[40px] border border-gray-100 space-y-6">
                         <div className="flex items-center justify-between">
                            <span className="font-bold text-gray-400">Box Color</span>
                            <input 
                              type="color" 
                              value={profile?.custom_button_bg || '#ffffff'}
                              onChange={(e) => updateProfile({ custom_button_bg: e.target.value })}
                              className="w-12 h-12 rounded-lg border-2 border-white shadow-sm cursor-pointer"
                            />
                         </div>
                         <div className="flex flex-wrap gap-2">
                            {['#ffffff', '#000000', '#f1f5f9', '#1e293b', '#6cf383', '#ff4f6a', '#9ef01a'].map(c => (
                              <button 
                                key={c}
                                onClick={() => updateProfile({ custom_button_bg: c })}
                                className="w-10 h-10 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-all"
                                style={{ backgroundColor: c }}
                              ></button>
                            ))}
                         </div>
                    </div>

                    <div className="p-8 bg-gray-50/50 rounded-[40px] border border-gray-100 space-y-6">
                         <div className="flex items-center justify-between">
                            <h2 className="text-sm font-black text-secondary">Page Background</h2>
                            <input 
                              type="color" 
                              value={profile?.custom_bg || '#ffffff'}
                              onChange={(e) => updateProfile({ custom_bg: e.target.value, theme: 'custom' })}
                              className="w-10 h-10 rounded-lg border-2 border-white shadow-sm cursor-pointer"
                            />
                         </div>
                    </div>
                  </motion.section>
                )}

                <div className="flex items-center gap-2 font-black text-2xl px-2 opacity-10 grayscale py-12 text-secondary">
                  Monkey <span className="text-primary text-3xl">*</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

        <Preview userProfile={profile} links={links} socialLinks={profile?.social_links} />
      </div>

      <ImageCropperModal 
        isOpen={showCropper}
        imageSrc={selectedImage}
        onClose={() => setShowCropper(false)}
        onCropComplete={(croppedImage) => updateProfile({ avatar_url: croppedImage })}
      />
    </div>
  )
}
