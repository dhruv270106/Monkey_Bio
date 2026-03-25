'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  const [showCropper, setShowCropper] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')
  const [activeSheet, setActiveSheet] = useState<string | null>(null)
  const [themeTab, setThemeTab] = useState<'free' | 'premium'>('free')
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeSubTab, setActiveSubTab] = useState('Text')

  const THEME_CATEGORIES = ['All', 'Simple', 'Creative', 'Professional', 'Anime', 'Business', 'Abstract']

  const FONTS = [
    'Inter', 'Roboto', 'Outfit', 'Playfair Display', 'Poppins', 'Montserrat', 'Open Sans', 'Lato', 'Ubuntu', 'Lora',
    'Dancing Script', 'Pacifico', 'Caveat', 'Satisfy', 'Oswald', 'Raleway', 'Nunito', 'Merriweather'
  ]

  const updateProfile = async (updates: any) => {
    if (!profile) return
    const newProfile = { ...profile, ...updates }
    setProfile(newProfile)
    setHasChanges(true)

    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      await supabase.from('monkey_bio').update(updates).eq('id', session.user.id)
    }
  }

  const [cropTarget, setCropTarget] = useState<'avatar' | 'wallpaper'>('avatar')

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setCropTarget('avatar')
    const reader = new FileReader()
    reader.onloadend = () => {
      setSelectedImage(reader.result as string)
      setShowCropper(true)
    }
    reader.readAsDataURL(file)
  }

  const handleCustomBgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setCropTarget('wallpaper')
    const reader = new FileReader()
    reader.onloadend = () => {
      setSelectedImage(reader.result as string)
      setShowCropper(true)
    }
    reader.readAsDataURL(file)
  }

  const handleCropComplete = async (base64: string) => {
    try {
      const res = await fetch(base64)
      const blob = await res.blob()
      const fileName = `${cropTarget}-${Date.now()}.jpg`
      const filePath = `${profile.id}/${fileName}`
      const { error: uploadError } = await supabase.storage.from('bg-assets').upload(filePath, blob, { upsert: true })
      if (!uploadError) {
        const { data: { publicUrl } } = supabase.storage.from('bg-assets').getPublicUrl(filePath)
        if (cropTarget === 'avatar') updateProfile({ avatar_url: publicUrl })
        else updateProfile({ custom_bg: publicUrl, custom_bg_type: 'image', theme: 'custom' })
        setShowCropper(false)
      }
    } catch (e) { console.error(e) }
  }

  const NAV_ITEMS = [
    { id: 'theme', icon: 'Aa', label: 'Theme', isIcon: false },
    { id: 'header', icon: 'fi-rr-user', label: 'Header', isIcon: true },
    { id: 'wallpaper', icon: 'fi-rr-picture', label: 'Wallpaper', isIcon: true },
    { id: 'style', icon: 'fi-rr-swatches', label: 'Style', isIcon: true },
  ]

  const renderSheetContent = () => {
    switch (activeSheet) {
      case 'theme':
        return (
          <div className="flex flex-col h-[500px]">
             {/* Free/Premium Tabs */}
             <div className="flex bg-gray-50 p-1 rounded-2xl mb-4 shrink-0">
                <button onClick={() => setThemeTab('free')} className={`flex-1 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-[14px] transition-all ${themeTab === 'free' ? 'bg-white text-secondary shadow-sm' : 'text-gray-400'}`}>Free</button>
                <button onClick={() => setThemeTab('premium')} className={`flex-1 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-[14px] transition-all ${themeTab === 'premium' ? 'bg-white text-secondary shadow-sm' : 'text-gray-400'}`}>Premium</button>
             </div>
             {/* Horizontal Categories */}
             <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 mb-4 shrink-0">
                {THEME_CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-secondary text-white' : 'bg-gray-50 text-gray-400'}`}>
                    {cat}
                  </button>
                ))}
             </div>
             {/* Vertical Grid Scroll */}
             <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
                <div className="grid grid-cols-3 gap-3">
                   <button onClick={() => updateProfile({ theme: 'custom' })} className="flex flex-col items-center gap-2 group">
                      <div className="aspect-[3/4] w-full rounded-[24px] bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-1 group-hover:bg-gray-100 transition-colors">
                        <i className="fi fi-rr-paintbrush text-xl text-gray-300"></i>
                        <span className="text-[8px] font-black uppercase text-gray-400">Custom</span>
                      </div>
                   </button>
                   {THEMES.filter(t => (themeTab === 'premium' ? t.isPremium : !t.isPremium)).map(theme => (
                     <button key={theme.id} onClick={() => updateProfile({ theme: theme.id })} className="flex flex-col items-center gap-2 group">
                        <div className={`aspect-[3/4] w-full rounded-[24px] overflow-hidden border-2 transition-all relative ${profile?.theme === theme.id ? 'border-secondary' : 'border-transparent'} ${theme.bg}`}>
                           {theme.image && <img src={theme.image} className="w-full h-full object-cover" />}
                           <div className="absolute inset-0 flex items-center justify-center">
                              <span className={`${theme.text.split(' ')[0]} font-black text-xl`}>Aa</span>
                           </div>
                        </div>
                        <span className="text-[8px] font-bold text-gray-500 uppercase">{theme.name}</span>
                     </button>
                   ))}
                </div>
             </div>
          </div>
        )
      case 'header':
        return (
          <div className="space-y-6 pb-20 overflow-y-auto no-scrollbar h-[400px]">
             <div className="relative group mx-auto w-24 h-24">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl relative bg-gray-50">
                   <img src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.username}`} className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <i className="fi fi-rr-camera text-white"></i>
                   </div>
                   <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleAvatarUpload} />
                </div>
             </div>
             <div className="space-y-4">
               <div className="space-y-2">
                 <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">Profile Username</label>
                 <input type="text" value={profile?.username || ''} disabled className="w-full h-14 px-6 rounded-2xl bg-gray-50 text-gray-400 font-bold outline-none" />
               </div>
               <div className="space-y-2">
                 <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">Display Name</label>
                 <input type="text" value={profile?.display_name || ''} onChange={(e) => updateProfile({ display_name: e.target.value })} className="w-full h-14 px-6 rounded-2xl bg-gray-50 text-secondary font-black outline-none border-2 border-transparent focus:border-secondary/10 transition-all" />
               </div>
               <div className="space-y-2">
                 <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">Bio</label>
                 <textarea value={profile?.bio || ''} onChange={(e) => updateProfile({ bio: e.target.value })} className="w-full h-32 p-6 rounded-2xl bg-gray-50 text-secondary font-bold outline-none border-2 border-transparent focus:border-secondary/10 transition-all resize-none" placeholder="Tell the world who you are..." />
               </div>
             </div>
          </div>
        )
      case 'wallpaper':
        return (
          <div className="space-y-6 pb-20 overflow-y-auto no-scrollbar h-[350px]">
             <div className="grid grid-cols-4 gap-2">
                {['color', 'gradient', 'pattern', 'image'].map(type => (
                  <button key={type} onClick={() => updateProfile({ custom_bg_type: type, theme: 'custom' })} className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all ${profile?.custom_bg_type === type ? 'border-secondary bg-secondary/5' : 'border-gray-50'}`}>
                     <i className={`fi ${type==='color'?'fi-rr-palette':type==='gradient'?'fi-rr-swatchbook':type==='pattern'?'fi-rr-grid':'fi-rr-picture'} text-lg ${profile?.custom_bg_type === type ? 'text-secondary' : 'text-gray-300'}`}></i>
                     <span className="text-[8px] font-black uppercase mt-1.5 tracking-tighter">{type}</span>
                  </button>
                ))}
             </div>
             <div className="p-4 bg-gray-50 rounded-3xl">
                {profile?.custom_bg_type === 'image' && (
                  <div className="relative h-32 rounded-2xl overflow-hidden bg-white border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2">
                     <i className="fi fi-rr-picture text-2xl text-gray-200"></i>
                     <span className="text-[10px] font-black text-gray-400 uppercase">Upload Wallpaper</span>
                     <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleCustomBgUpload} />
                  </div>
                )}
                {profile?.custom_bg_type === 'color' && (
                  <input type="color" value={profile?.custom_bg || '#ffffff'} onChange={(e) => updateProfile({ custom_bg: e.target.value, theme: 'custom' })} className="w-full h-12 rounded-xl border-none cursor-pointer" />
                )}
             </div>
          </div>
        )
      case 'style':
        return (
          <div className="flex flex-col h-[400px]">
             <div className="flex border-b border-gray-100 mb-6 shrink-0">
                {['Text', 'Buttons', 'Colors'].map(t => (
                  <button key={t} onClick={() => setActiveSubTab(t)} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest ${activeSubTab === t ? 'border-b-4 border-secondary text-secondary' : 'text-gray-400'}`}>{t}</button>
                ))}
             </div>
             <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
                {activeSubTab === 'Text' && (
                   <div className="grid grid-cols-2 gap-3">
                      {FONTS.map(f => (
                        <button key={f} onClick={() => updateProfile({ font_family: f })} className={`p-5 rounded-2xl border-2 transition-all flex items-center justify-center text-center ${profile?.font_family === f ? 'border-secondary bg-secondary/5 text-secondary' : 'border-gray-50 bg-white text-gray-500'}`} style={{ fontFamily: f }}>
                          {f}
                        </button>
                      ))}
                   </div>
                )}
                {activeSubTab === 'Buttons' && (
                   <div className="space-y-4">
                      {['solid', 'outline', 'glass'].map(v => (
                        <button key={v} onClick={() => updateProfile({ button_variant: v })} className={`w-full h-14 rounded-2xl border-2 flex items-center justify-center font-black uppercase text-xs tracking-widest transition-all ${profile?.button_variant === v ? 'border-secondary text-secondary bg-secondary/5' : 'border-gray-50 text-gray-400'}`}>
                          {v} Style
                        </button>
                      ))}
                   </div>
                )}
                {activeSubTab === 'Colors' && (
                  <div className="p-6 bg-gray-50 rounded-[32px] space-y-6">
                     <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase text-gray-400">Main Font Color</span>
                        <input type="color" value={profile?.font_color || '#000000'} onChange={(e) => updateProfile({ font_color: e.target.value })} className="w-12 h-12 rounded-full cursor-pointer shadow-lg border-2 border-white" />
                     </div>
                  </div>
                )}
             </div>
          </div>
        )
      default: return null
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden h-screen">
      {/* MOBILE UI */}
      <div className="md:hidden flex flex-col h-full relative">
         {/* Top bar (Static) */}
         <div className="flex items-center justify-between px-6 py-4 bg-white z-[100] shrink-0">
            <button className="w-10 h-10 flex items-center justify-center text-secondary"><i className="fi fi-rr-angle-small-left text-2xl"></i></button>
            <h1 className="font-black text-lg">Design</h1>
            <button className="w-10 h-10 flex items-center justify-center text-secondary"><i className="fi fi-rr-share-square text-lg"></i></button>
         </div>

         {/* Preview Area (Scalable Hinterlayer) */}
         <div className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gray-50/50">
            <motion.div 
               animate={{ 
                 scale: activeSheet ? 0.65 : 1,
                 y: activeSheet ? -100 : 0
               }}
               transition={{ type: 'spring', damping: 25, stiffness: 200 }}
               className="w-full max-w-[320px] aspect-[9/18] rounded-[52px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.12)] border-[10px] border-black bg-white pointer-events-none relative"
            >
               <div className="w-full h-full overflow-hidden flex flex-col">
                  {/* LIVE BACKGROUND PREVIEW */}
                  <div 
                    className={`absolute inset-0 z-0 ${(THEMES.find(t=>t.id===profile?.theme)||THEMES[0])?.bg}`}
                    style={{
                      ...(profile?.custom_bg_type === 'color' ? { backgroundColor: profile.custom_bg } : {}),
                      ...(profile?.custom_bg_type === 'gradient' ? { backgroundImage: profile.custom_bg } : {}),
                      ...(profile?.custom_bg_type === 'image' ? { backgroundImage: `url(${profile.custom_bg})`, backgroundSize: 'cover' } : {}),
                    }}
                  />
                  {/* LIVE CONTENT PREVIEW */}
                  <div className="relative z-10 flex flex-col items-center p-8 pt-12" style={{ fontFamily: profile?.font_family || 'inherit' }}>
                     <img src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.username}`} className="w-20 h-20 rounded-full border-4 border-white mb-4 shadow-lg" />
                     <h3 className="font-black text-2xl mb-1" style={{ color: profile?.font_color || '#000000' }}>@{profile?.username}</h3>
                     <p className="text-sm font-bold opacity-70 text-center line-clamp-2" style={{ color: profile?.font_color || '#000000' }}>{profile?.bio}</p>
                     
                     <div className="w-full mt-10 space-y-4">
                        {[1,2,3].map(i => (
                          <div 
                            key={i} 
                            className={`w-full h-14 rounded-2xl transition-all border ${profile?.button_variant === 'outline' ? 'bg-transparent border-white/50' : profile?.button_variant === 'glass' ? 'bg-white/20 backdrop-blur-md border-white/30' : 'bg-white shadow-sm border-transparent'}`} 
                          />
                        ))}
                     </div>
                  </div>
               </div>
            </motion.div>
         </div>

         {/* Bottom Sheet Overlay */}
         <AnimatePresence>
            {activeSheet && (
               <motion.div 
                 initial={{ opacity: 0 }} 
                 animate={{ opacity: 1 }} 
                 exit={{ opacity: 0 }}
                 onClick={() => setActiveSheet(null)}
                 className="fixed inset-0 bg-black/40 z-[150]"
               />
            )}
         </AnimatePresence>

         <AnimatePresence>
            {activeSheet && (
               <motion.div 
                 initial={{ y: '100%' }}
                 animate={{ y: 0 }}
                 exit={{ y: '100%' }}
                 transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                 className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[40px] px-6 pt-2 pb-6 z-[160] shadow-[0_-20px_60px_rgba(0,0,0,0.2)] max-h-[80vh] flex flex-col"
               >
                  <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-6 shrink-0" />
                  <div className="flex items-center justify-between mb-4 shrink-0">
                     <h3 className="font-black text-xl uppercase tracking-tighter text-secondary">{activeSheet}</h3>
                     <button 
                        onClick={() => setActiveSheet(null)} 
                        className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-secondary border border-gray-100 active:scale-90 transition-transform"
                     >
                        <i className="fi fi-rr-cross-small text-xl pt-0.5"></i>
                     </button>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    {renderSheetContent()}
                  </div>
               </motion.div>
            )}
         </AnimatePresence>

         {/* Mobile Bottom Tab Bar (Static at bottom) */}
         <div className="bg-white border-t border-gray-100 flex items-center justify-around py-4 px-6 z-[140] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] shrink-0">
            {NAV_ITEMS.map(item => (
              <button 
                key={item.id}
                onClick={() => {
                   setActiveSheet(item.id)
                   if (item.id === 'style') setActiveSubTab('Text')
                }}
                className={`flex flex-col items-center gap-1.5 transition-all ${activeSheet === item.id ? 'text-secondary' : 'text-gray-300 hover:text-gray-400'}`}
              >
                 <div className={`w-14 h-11 rounded-[20px] flex items-center justify-center transition-all ${activeSheet === item.id ? 'bg-gray-100/80 scale-105' : ''}`}>
                    {item.isIcon ? (
                      <i className={`fi ${item.icon} text-lg`}></i>
                    ) : (
                      <span className="font-black text-lg">{item.icon}</span>
                    )}
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-tight">{item.label}</span>
              </button>
            ))}
         </div>
      </div>

      <ImageCropperModal isOpen={showCropper} imageSrc={selectedImage} onClose={() => setShowCropper(false)} aspect={cropTarget === 'avatar' ? 1/1 : 9/16} circularCrop={cropTarget === 'avatar'} onCropComplete={handleCropComplete} />
    </div>
  )
}
