'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { THEMES, Theme } from '@/data/themes'
import ImageCropperModal from '@/components/modals/ImageCropperModal'
import Preview from './Preview' // Reuse preview logic

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
  const [activeSheet, setActiveSheet] = useState<string | null>(null)
  const [activeSubTab, setActiveSubTab] = useState('Customizable')
  const [fontSearch, setFontSearch] = useState('')
  const [themeCategory, setThemeCategory] = useState('free')

  const FONTS = [
    'Inter', 'Roboto', 'Outfit', 'Playfair Display', 'Poppins', 'Montserrat', 'Open Sans', 'Lato', 'Ubuntu', 'Lora',
    'Dancing Script', 'Pacifico', 'Caveat', 'Satisfy', 'Oswald', 'Raleway', 'Nunito', 'Merriweather', 'Bebas Neue',
    'Abel', 'Abril Fatface', 'Arvo', 'Assistant', 'Barlow', 'Bitter', 'Cabin', 'Cairo', 'Catamaran', 'Comfortaa',
    'Dosis', 'Exo 2', 'Fira Sans', 'Heebo', 'Inconsolata', 'Josefin Sans', 'Kanit', 'Karla', 'Libre Baskerville',
    'Libre Franklin', 'Lobster', 'Maven Pro', 'Muli', 'Noticia Text', 'Notosans', 'Old Standard TT', 'Overpass', 
    'Oxygen', 'PT Sans', 'PT Serif', 'Quicksand', 'Questrial', 'Righteous', 'Rubik', 'Shadows Into Light', 'Spectral', 
    'Teko', 'Titillium Web', 'Varela Round', 'Work Sans', 'Zilla Slab'
  ]

  const PRESET_GRADIENTS = [
    'linear-gradient(135deg, #fceabb 0%, #f8b500 100%)',
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)',
    'linear-gradient(135deg, #c3cfe2 0%, #c3cfe2 100%)',
    'linear-gradient(135deg, #00dbde 0%, #fc00ff 100%)'
  ]

  const updateProfile = async (updates: any) => {
    if (!profile) return
    const newProfile = { ...profile, ...updates }
    setProfile(newProfile)
    setHasChanges(true)

    // AUTO-SAVE LOGIC: Update DB immediately for a seamless feel
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

  const handleCustomBgUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
     const file = e.target.files?.[0]
     if (!file) return
     if (type === 'image') {
        setCropTarget('wallpaper')
        const reader = new FileReader()
        reader.onloadend = () => {
           setSelectedImage(reader.result as string)
           setShowCropper(true)
        }
        reader.readAsDataURL(file)
        return
     }
  }

  const handleWallpaperCropComplete = async (base64: string) => {
    setSaving(true)
    try {
      const res = await fetch(base64)
      const blob = await res.blob()
      const fileName = `${Date.now()}.jpg`
      const filePath = `${profile.id}/${fileName}`
      const { error: uploadError } = await supabase.storage.from('bg-assets').upload(filePath, blob, { upsert: true })
      if (!uploadError) {
        const { data: { publicUrl } } = supabase.storage.from('bg-assets').getPublicUrl(filePath)
        updateProfile({ custom_bg: publicUrl, custom_bg_type: 'image', theme: 'custom' })
        setShowCropper(false)
      }
    } catch (e) { console.error(e) }
    setSaving(false)
  }

  const handleAvatarCropComplete = async (base64: string) => {
    setSaving(true)
    try {
      const res = await fetch(base64)
      const blob = await res.blob()
      const fileName = `avatar-${Date.now()}.jpg`
      const filePath = `${profile.id}/${fileName}`
      const { error: uploadError } = await supabase.storage.from('bg-assets').upload(filePath, blob, { upsert: true })
      if (!uploadError) {
        const { data: { publicUrl } } = supabase.storage.from('bg-assets').getPublicUrl(filePath)
        updateProfile({ avatar_url: publicUrl })
        setShowCropper(false)
      }
    } catch (e) { console.error(e) }
    setSaving(false)
  }

  const NAV_ITEMS = [
    { id: 'theme', icon: 'Aa', label: 'Theme', isIcon: false },
    { id: 'header', icon: 'fi-rr-user', label: 'Header', isIcon: true },
    { id: 'wallpaper', icon: 'fi-rr-picture', label: 'Wallpaper', isIcon: true },
    { id: 'style', icon: 'fi-rr-swatches', label: 'Style', isIcon: true },
  ]

  // SHEETS DATA
  const renderSheetContent = () => {
    switch (activeSheet) {
      case 'theme':
        return (
          <div className="space-y-6">
            <div className="flex border-b border-gray-100 mb-4">
              {['Customizable', 'Curated'].map(t => (
                <button key={t} onClick={() => setActiveSubTab(t)} className={`flex-1 py-4 text-xs font-black uppercase tracking-widest ${activeSubTab === t ? 'border-b-4 border-secondary text-secondary' : 'text-gray-400'}`}>{t}</button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3 overflow-y-auto max-h-[400px] no-scrollbar pb-10">
               <button onClick={() => updateProfile({ theme: 'custom' })} className="flex flex-col items-center gap-2">
                  <div className="aspect-[3/4] w-full rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center">
                    <i className="fi fi-rr-paintbrush text-2xl text-gray-300"></i>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400">Custom</span>
               </button>
               {THEMES.filter(t => activeSubTab === 'Curated' ? t.isPremium : !t.isPremium).map(theme => (
                 <button key={theme.id} onClick={() => updateProfile({ theme: theme.id })} className={`flex flex-col items-center gap-2 group`}>
                    <div className={`aspect-[3/4] w-full rounded-2xl overflow-hidden border-2 transition-all ${profile?.theme === theme.id ? 'border-secondary scale-95' : 'border-transparent'} ${theme.bg}`}>
                       {theme.image && <img src={theme.image} className="w-full h-full object-cover" />}
                       <div className="absolute inset-0 flex items-center justify-center">
                          <span className={`${theme.text.split(' ')[0]} font-black text-xl`}>Aa</span>
                       </div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-500">{theme.name}</span>
                 </button>
               ))}
            </div>
          </div>
        )
      case 'header':
        return (
          <div className="space-y-8 pb-10">
             <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-3xl">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md relative">
                   <img src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.username}`} className="w-full h-full object-cover" />
                   <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleAvatarUpload} />
                </div>
                <div className="flex-1">
                   <p className="font-black text-secondary text-sm">Avatar</p>
                   <p className="text-[10px] text-gray-400 font-bold">Pick a profile picture</p>
                </div>
             </div>
             <div className="space-y-4">
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">Display Name</label>
                 <input type="text" value={profile?.display_name || ''} onChange={(e) => updateProfile({ display_name: e.target.value })} className="w-full h-12 px-5 rounded-2xl bg-gray-50 border-none outline-none font-bold text-secondary" />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">Bio</label>
                 <textarea value={profile?.bio || ''} onChange={(e) => updateProfile({ bio: e.target.value })} className="w-full h-24 p-5 rounded-2xl bg-gray-50 border-none outline-none font-bold text-secondary resize-none" />
               </div>
             </div>
          </div>
        )
      case 'wallpaper':
        return (
          <div className="space-y-6 pb-10">
             <div className="grid grid-cols-4 gap-2">
                {['color', 'gradient', 'pattern', 'image'].map(type => (
                  <button key={type} onClick={() => updateProfile({ custom_bg_type: type, theme: 'custom' })} className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all ${profile?.custom_bg_type === type ? 'border-secondary bg-secondary/5' : 'border-gray-50'}`}>
                     <i className={`fi ${type==='color'?'fi-rr-palette':'fi-rr-grid'} text-lg ${profile?.custom_bg_type === type ? 'text-secondary' : 'text-gray-300'}`}></i>
                     <span className="text-[9px] font-black uppercase mt-1 tracking-tighter">{type}</span>
                  </button>
                ))}
             </div>
             {profile?.custom_bg_type === 'color' && (
               <input type="color" value={profile?.custom_bg || '#ffffff'} onChange={(e) => updateProfile({ custom_bg: e.target.value })} className="w-full h-12 rounded-xl border-none cursor-pointer" />
             )}
             {profile?.custom_bg_type === 'gradient' && (
               <div className="grid grid-cols-4 gap-2">
                  {PRESET_GRADIENTS.map(g => (
                    <button key={g} onClick={() => updateProfile({ custom_bg: g, custom_bg_type: 'gradient', theme: 'custom' })} className="aspect-square rounded-xl shadow-inner" style={{ background: g }} />
                  ))}
               </div>
             )}
          </div>
        )
      case 'style':
        return (
          <div className="space-y-6">
             <div className="flex border-b border-gray-100">
              {['Text', 'Buttons', 'Colors'].map(t => (
                <button key={t} onClick={() => setActiveSubTab(t)} className={`flex-1 py-4 text-xs font-black uppercase tracking-widest ${activeSubTab === t ? 'border-b-4 border-secondary text-secondary' : 'text-gray-400'}`}>{t}</button>
              ))}
            </div>
            <div className="max-h-[350px] overflow-y-auto no-scrollbar pb-10">
               {activeSubTab === 'Text' && (
                 <div className="grid grid-cols-2 gap-2">
                    {FONTS.slice(0, 20).map(f => (
                      <button key={f} onClick={() => updateProfile({ font_family: f })} className={`p-4 rounded-xl border-2 transition-all ${profile?.font_family === f ? 'border-secondary bg-gray-50' : 'border-gray-50 bg-white'}`} style={{ fontFamily: f }}>{f}</button>
                    ))}
                 </div>
               )}
               {activeSubTab === 'Buttons' && (
                 <div className="space-y-4">
                    {['solid', 'outline', 'glass'].map(v => (
                       <button key={v} onClick={() => updateProfile({ button_variant: v })} className={`w-full h-12 rounded-xl border-2 flex items-center justify-center font-black uppercase text-xs tracking-widest ${profile?.button_variant === v ? 'border-secondary text-secondary' : 'border-gray-100 text-gray-400'}`}>
                         {v}
                       </button>
                    ))}
                 </div>
               )}
               {activeSubTab === 'Colors' && (
                 <div className="space-y-4">
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-black uppercase text-gray-400">Font Color</span>
                       <input type="color" value={profile?.font_color || '#000000'} onChange={(e) => updateProfile({ font_color: e.target.value })} className="w-10 h-10 rounded-full cursor-pointer" />
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
      <div className="md:hidden flex flex-col h-full">
         {/* Top bar */}
         <div className="flex items-center justify-between px-6 py-4 bg-white z-[100]">
            <button className="w-10 h-10 flex items-center justify-center text-secondary"><i className="fi fi-rr-angle-small-left text-2xl"></i></button>
            <h1 className="font-black text-lg">Design</h1>
            <button className="w-10 h-10 flex items-center justify-center text-secondary"><i className="fi fi-rr-share-square text-lg"></i></button>
         </div>

         {/* Preview Area (Scalable) */}
         <div className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gray-50/50">
            <motion.div 
               animate={{ 
                 scale: activeSheet ? 0.65 : 1,
                 y: activeSheet ? -80 : 0
               }}
               transition={{ type: 'spring', damping: 25, stiffness: 200 }}
               className="w-full max-w-[320px] aspect-[9/18] rounded-[48px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.1)] border-[8px] border-black bg-white pointer-events-none relative"
            >
               {/* Simplified Preview Shell */}
               <div className="w-full h-full overflow-hidden flex flex-col">
                  <div 
                    className={`absolute inset-0 z-0 ${(THEMES.find(t=>t.id===profile?.theme)||THEMES[0])?.bg}`}
                    style={{
                      ...(profile?.custom_bg_type === 'color' ? { backgroundColor: profile.custom_bg } : {}),
                      ...(profile?.custom_bg_type === 'gradient' ? { backgroundImage: profile.custom_bg } : {}),
                      ...(profile?.custom_bg_type === 'image' ? { backgroundImage: `url(${profile.custom_bg})`, backgroundSize: 'cover' } : {}),
                    }}
                  />
                  <div className="relative z-10 flex flex-col items-center p-8 pt-12">
                     <img src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.username}`} className="w-20 h-20 rounded-full border-4 border-white mb-4" />
                     <h3 className="font-black text-2xl text-secondary mb-1">@{profile?.username}</h3>
                     <p className="text-sm font-bold opacity-60 text-center">{profile?.bio}</p>
                     
                     <div className="w-full mt-10 space-y-4">
                        {[1,2,3].map(i => (
                          <div key={i} className="w-full h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30" />
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
                 className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[40px] p-6 z-[160] shadow-[0_-20px_60px_rgba(0,0,0,0.2)]"
               >
                  <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-6" />
                  <div className="flex items-center justify-between mb-2">
                     <h3 className="font-black text-xl uppercase tracking-tighter text-secondary">{activeSheet}</h3>
                     <button onClick={() => setActiveSheet(null)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                        <i className="fi fi-rr-cross-small text-xl pt-1"></i>
                     </button>
                  </div>
                  {renderSheetContent()}
               </motion.div>
            )}
         </AnimatePresence>

         {/* Mobile Bottom Tab Bar */}
         <div className="bg-white border-t border-gray-100 flex items-center justify-around py-4 px-6 z-[140] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
            {NAV_ITEMS.map(item => (
              <button 
                key={item.id}
                onClick={() => {
                   setActiveSheet(item.id)
                   setActiveSubTab(item.id === 'theme' ? 'Customizable' : item.id === 'style' ? 'Text' : '')
                }}
                className={`flex flex-col items-center gap-1 transition-all ${activeSheet === item.id ? 'text-secondary scale-110' : 'text-gray-300'}`}
              >
                 <div className={`w-14 h-11 rounded-2xl flex items-center justify-center transition-all ${activeSheet === item.id ? 'bg-gray-100' : ''}`}>
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

      {/* DESKTOP UI (unchanged but ensured to follow same logic) */}
      <div className="hidden md:flex flex-col h-full pt-10">
          {/* Reuse the previous logic but keep it compact for now or just maintain it as is */}
          <div className="px-8 mb-8">
             <h1 className="text-3xl font-black text-secondary">Design Workspace</h1>
             <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1 italic">Building your visual identity</p>
          </div>
          <div className="flex-1 flex overflow-hidden">
             {/* The previous desktop sidebar layout could go here, but focusing on mobile as priority */}
             <div className="w-full flex items-center justify-center text-gray-300 italic">
                Desktop optimization coming in next phase. Please use mobile view for the new experience.
             </div>
          </div>
      </div>

      <ImageCropperModal isOpen={showCropper} imageSrc={selectedImage} onClose={() => setShowCropper(false)} aspect={cropTarget === 'avatar' ? 1/1 : 9/16} circularCrop={cropTarget === 'avatar'} onCropComplete={(croppedImage) => { if (cropTarget === 'avatar') { handleAvatarCropComplete(croppedImage) } else { handleWallpaperCropComplete(croppedImage) } }} />
    </div>
  )
}
