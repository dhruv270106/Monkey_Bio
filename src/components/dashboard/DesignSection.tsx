'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { THEMES, Theme } from '@/data/themes'
import ImageCropperModal from '@/components/modals/ImageCropperModal'

interface DesignSectionProps {
  profile: any
  setProfile: (profile: any) => void
  hasChanges: boolean
  setHasChanges: (hasChanges: boolean) => void
}

export default function DesignSection({ profile, setProfile, hasChanges, setHasChanges }: DesignSectionProps) {
  const [saving, setSaving] = useState(false)
  const [showCropper, setShowCropper] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')
  const [activeTab, setActiveTab] = useState('Header')
  const [fontSearch, setFontSearch] = useState('')
  const [themeCategory, setThemeCategory] = useState('free')

  const TABS = [
    { id: 'Header', icon: 'fi-rr-user' },
    { id: 'Theme', icon: 'fi-rr-palette' },
    { id: 'Text', icon: 'fi-rr-text' },
    { id: 'Buttons', icon: 'fi-rr-apps' },
    { id: 'Colors', icon: 'fi-rr-paint-brush' },
  ]

  const FONTS = [
    'Inter', 'Roboto', 'Outfit', 'Playfair Display', 'Poppins', 'Montserrat', 'Open Sans', 'Lato', 'Ubuntu', 'Lora',
    'Dancing Script', 'Pacifico', 'Caveat', 'Satisfy', 'Oswald', 'Raleway', 'Nunito', 'Merriweather', 'Bebas Neue',
    'Abel', 'Abril Fatface', 'Arvo', 'Assistant', 'Barlow', 'Bitter', 'Cabin', 'Cairo', 'Catamaran', 'Comfortaa',
    'Dosis', 'Exo 2', 'Fira Sans', 'Heebo', 'Inconsolata', 'Josefin Sans', 'Kanit', 'Karla', 'Libre Baskerville',
    'Libre Franklin', 'Lobster', 'Maven Pro', 'Muli', 'Noticia Text', 'Notosans', 'Old Standard TT', 'Overpass', 
    'Oxygen', 'PT Sans', 'PT Serif', 'Quicksand', 'Questrial', 'Righteous', 'Rubik', 'Shadows Into Light', 'Spectral', 
    'Teko', 'Titillium Web', 'Varela Round', 'Work Sans', 'Zilla Slab'
  ]

  const updateProfile = (updates: any) => {
    if (!profile) return
    setProfile({ ...profile, ...updates })
    setHasChanges(true)
  }

  const handleSave = async () => {
    if (!profile) return
    setSaving(true)
    
    const { id, username, display_name, avatar_url, bio, social_links, theme, custom_bg, custom_button_bg, font_family, font_size, font_color, button_variant, button_radius, bg_blur } = profile
    const dbUpdates = { display_name, avatar_url, bio, social_links, theme, custom_bg, custom_button_bg, font_family, font_size, font_color, button_variant, button_radius, bg_blur }

    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      const { error } = await supabase
        .from('monkey_bio')
        .update(dbUpdates)
        .eq('id', session.user.id)
      
      if (!error) {
        setHasChanges(false)
      } else {
        alert('Error saving changes: ' + error.message)
      }
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

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {profile?.font_family && (
        <link 
          href={`https://fonts.googleapis.com/css2?family=${profile.font_family.replace(/ /g, '+')}:wght@400;700;900&display=swap`} 
          rel="stylesheet" 
        />
      )}

      {/* Toolbar */}
      <div className="h-16 px-8 flex items-center justify-between bg-white border-b border-gray-50 flex-shrink-0">
         <h1 className="font-bold text-xl">{activeTab}</h1>
         <div className="flex items-center gap-4">
           {saving ? (
             <span className="text-xs font-bold text-primary animate-pulse flex items-center gap-2">
               <i className="fi fi-rr-cloud-upload"></i> Saving...
             </span>
           ) : hasChanges ? (
             <span className="text-xs font-bold text-orange-400 flex items-center gap-2">
               <i className="fi fi-rr-info"></i> Unsaved
             </span>
           ) : (
             <span className="text-xs font-bold text-green-400 flex items-center gap-2">
               <i className="fi fi-rr-check"></i> Saved
             </span>
           )}
           <button 
             onClick={handleSave}
             disabled={saving}
             className={`font-black px-6 py-2 rounded-full text-sm shadow-lg transition-all ${saving ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-primary text-secondary hover:scale-105'}`}
           >
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

        {/* Content Area */}
        <div className="flex-1 bg-gray-50/30 p-8 overflow-hidden flex flex-col">
          <div className="flex-1 bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden flex flex-col max-w-2xl mx-auto w-full">
            <div className="flex-1 overflow-y-auto p-10 no-scrollbar pb-32">
              <div className="space-y-12">
            
            {activeTab === 'Header' && (
              <motion.section initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h2 className="text-xl font-black">Profile Header</h2>
                <div className="bg-gray-50/50 p-8 rounded-[40px] border border-gray-100 space-y-8">
                  <div className="flex items-center gap-8">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-full bg-white overflow-hidden border-4 border-white shadow-xl cursor-pointer relative">
                        <img src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.display_name || 'User'}&background=random`} className="w-full h-full object-cover" />
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={handleAvatarUpload} accept="image/*" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-white">
                          <i className="fi fi-rr-camera"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                      <button className="w-full py-3 bg-secondary text-white font-black rounded-full text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-lg relative overflow-hidden">
                        Pick an image
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleAvatarUpload} accept="image/*" />
                      </button>
                      <button onClick={() => updateProfile({ avatar_url: '' })} className="w-full py-3 bg-white border-2 border-gray-100 text-secondary font-black rounded-full text-sm hover:bg-gray-50 transition-all">Remove</button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block tracking-widest pl-2">Profile Title</label>
                      <input type="text" value={profile?.display_name || ''} onChange={(e) => updateProfile({ display_name: e.target.value })} className="w-full px-6 py-4 bg-white rounded-2xl border-2 border-transparent focus:border-primary/50 outline-none font-bold text-secondary shadow-sm transition-all" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block tracking-widest pl-2">Bio</label>
                      <textarea maxLength={200} value={profile?.bio || ''} onChange={(e) => updateProfile({ bio: e.target.value })} className="w-full px-6 py-4 bg-white rounded-2xl border-2 border-transparent focus:border-primary/50 outline-none font-bold text-secondary shadow-sm transition-all h-32 resize-none" />
                      <p className="text-right text-[10px] text-gray-400 font-bold mt-2 pr-2">{profile?.bio?.length || 0}/200</p>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {activeTab === 'Theme' && (
              <motion.section initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black">Themes</h2>
                  <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-3xl border border-gray-100">
                    <i className="fi fi-rr-opacity text-gray-400"></i>
                    <input type="range" min="0" max="20" value={profile?.bg_blur || 0} onChange={(e) => updateProfile({ bg_blur: parseInt(e.target.value) })} className="accent-primary h-1 w-24 rounded-lg cursor-pointer mt-1" />
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-gray-50/50 p-1.5 rounded-[24px] w-fit border border-gray-100">
                  <button onClick={() => setThemeCategory('free')} className={`px-8 py-3 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all ${themeCategory === 'free' ? 'bg-white text-secondary' : 'text-gray-400'}`}>Free</button>
                  <button onClick={() => setThemeCategory('premium')} className={`px-8 py-3 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all ${themeCategory === 'premium' ? 'bg-white text-secondary' : 'text-gray-400'}`}>Premium</button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {THEMES.filter(t => themeCategory === 'premium' ? t.isPremium : !t.isPremium).map((theme) => (
                    <button key={theme.id} onClick={() => updateProfile({ theme: theme.id })} className={`group relative flex flex-col gap-3 p-3 rounded-[32px] border-4 transition-all ${profile?.theme === theme.id ? 'border-primary bg-white' : 'border-transparent bg-gray-50/50 hover:bg-white hover:border-gray-100'}`}>
                      <div className={`aspect-[9/16] w-full rounded-2xl overflow-hidden shadow-inner ${theme.bg} relative transition-all duration-300 group-hover:scale-105`} style={{...(theme.image ? { backgroundImage: `url(${theme.image})`, backgroundSize: 'cover', backgroundPosition: 'center'} : theme.id === 'custom' ? { backgroundColor: profile?.custom_bg || '#ffffff'} : {})}}>
                        {theme.video && <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover"><source src={theme.video} type="video/mp4" /></video>}
                        <div className="flex flex-col items-center pt-8 px-4 gap-2">
                             <div className={`w-6 h-6 rounded-full mb-1 ${theme.text.includes('white') ? 'bg-white/20' : 'bg-black/10'}`}></div>
                             <div className={`w-full h-2.5 rounded-md ${theme.button.split(' ')[0]} opacity-80`}></div>
                             <div className={`w-full h-2.5 rounded-md ${theme.button.split(' ')[0]} opacity-80`}></div>
                        </div>
                      </div>
                      <span className="font-extrabold text-[10px] text-center text-secondary uppercase tracking-widest mt-1 opacity-80">{theme.name}</span>
                    </button>
                  ))}
                </div>
              </motion.section>
            )}

            {activeTab === 'Text' && (
              <motion.section initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <h2 className="text-xl font-black">Typography</h2>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2">Font Style</label>
                    <input type="text" placeholder="Search fonts..." className="w-full px-10 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-primary/50 outline-none font-bold text-secondary shadow-sm transition-all" value={fontSearch} onChange={(e) => setFontSearch(e.target.value)} />
                    <div className="grid grid-cols-2 gap-2 mt-2 h-48 overflow-y-auto no-scrollbar bg-gray-50 p-2 rounded-2xl border border-gray-100">
                      {FONTS.filter(f => f.toLowerCase().includes(fontSearch.toLowerCase())).map(font => (
                        <button key={font} onClick={() => updateProfile({ font_family: font })} className={`p-4 rounded-xl text-left transition-all ${profile?.font_family === font ? 'bg-white shadow-sm border border-primary/20 scale-95' : 'hover:bg-white'}`} style={{ fontFamily: font }}>
                          <span className="font-bold">{font}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {activeTab === 'Buttons' && (
              <motion.section initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <h2 className="text-xl font-black">Button Style</h2>
                <div className="grid grid-cols-3 gap-4">
                  {['Solid', 'Glass', 'Outline'].map(type => (
                    <button key={type} onClick={() => updateProfile({ button_variant: type.toLowerCase() })} className={`flex flex-col items-center gap-3 p-4 rounded-3xl border-2 transition-all ${profile?.button_variant === type.toLowerCase() ? 'border-primary bg-white' : 'border-transparent bg-gray-50/50 hover:bg-white'}`}>
                       <div className={`w-full h-12 rounded-xl border-2 ${type === 'Glass' ? 'bg-gray-100 opacity-40 border-gray-200' : type === 'Outline' ? 'bg-transparent border-slate-200' : 'bg-slate-800 border-slate-800'}`}></div>
                       <span className="text-xs font-bold text-gray-500">{type}</span>
                    </button>
                  ))}
                </div>
              </motion.section>
            )}

            {activeTab === 'Colors' && (
              <motion.section initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h2 className="text-xl font-black">Colors</h2>
                <div className="p-8 bg-gray-50/50 rounded-[40px] border border-gray-100 space-y-6">
                     <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-400">Button Color</span>
                        <input type="color" value={profile?.custom_button_bg || '#ffffff'} onChange={(e) => updateProfile({ custom_button_bg: e.target.value })} className="w-12 h-12 rounded-lg border-2 border-white shadow-sm cursor-pointer" />
                     </div>
                     <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-400">Background Color</span>
                        <input type="color" value={profile?.custom_bg || '#ffffff'} onChange={(e) => updateProfile({ custom_bg: e.target.value, theme: 'custom' })} className="w-12 h-12 rounded-lg border-2 border-white shadow-sm cursor-pointer" />
                     </div>
                </div>
              </motion.section>
            )}

              </div>
            </div>
          </div>
        </div>
      </div>

      <ImageCropperModal isOpen={showCropper} imageSrc={selectedImage} onClose={() => setShowCropper(false)} onCropComplete={(croppedImage) => updateProfile({ avatar_url: croppedImage })} />
    </div>
  )
}
