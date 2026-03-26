'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { THEMES, Theme } from '@/data/themes'
import { PLATFORMS } from '@/data/platforms'
import { APPS } from '@/data/apps'
import ImageCropperModal from '@/components/modals/ImageCropperModal'
import Link from 'next/link'
import DeviceMockup from './DeviceMockup'

interface DesignSectionProps {
  profile: any
  setProfile: (profile: any) => void
  links: any[]
  onBack: () => void
}

export default function DesignSection({ profile, setProfile, links, onBack }: DesignSectionProps) {
  const [showCropper, setShowCropper] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')
  const [activeSheet, setActiveSheet] = useState<string | null>(null)
  const [themeTab, setThemeTab] = useState<'free' | 'premium'>('free')
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeSubTab, setActiveSubTab] = useState('Text')
  const [pendingColor, setPendingColor] = useState('#6A373A')
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle')
  const [pendingChanges, setPendingChanges] = useState<any>({})
  const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout | null>(null)
  
  // Desktop specific state
  const [activeDesktopTab, setActiveDesktopTab] = useState('Header')
  const [fontSearch, setFontSearch] = useState('')

  const THEME_CATEGORIES = ['All', 'Simple', 'Creative', 'Professional', 'Anime', 'Business', 'Abstract']

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
    'linear-gradient(to top, #30cfd0 0%, #330867 100%)',
    'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)',
    'linear-gradient(to top, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(to top, #48c6ef 0%, #6f86d6 100%)',
    'linear-gradient(to top, #fa709a 0%, #fee140 100%)',
    'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(to right, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  ]

  const PRESET_COLORS = ['#000000', '#FFFFFF', '#6A373A', '#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#8B5CF6', '#06B6D4']

  const PATTERNS = [
     { id: 'grid', css: 'radial-gradient(rgba(0,0,0,0.1) 1px, transparent 1px)', size: '20px 20px' },
     { id: 'dots', css: 'radial-gradient(rgba(0,0,0,0.2) 2px, transparent 2px)', size: '30px 30px' },
     { id: 'diagonal', css: 'linear-gradient(45deg, rgba(0,0,0,0.05) 25%, transparent 25%, transparent 50%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.05) 75%, transparent 75%, transparent)', size: '20px 20px' },
     { id: 'waves', css: 'repeating-radial-gradient(circle at 0 0, transparent 0, rgba(0,0,0,0.05) 10px), repeating-radial-gradient(circle at 100% 100%, transparent 0, rgba(0,0,0,0.05) 10px)', size: '40px 40px' }
  ]

  const DESKTOP_TABS = [
    { id: 'Header', icon: 'fi-ss-user', label: 'PROFILE' },
    { id: 'Theme', icon: 'fi-ss-palette', label: 'THEMES' },
    { id: 'Buttons', icon: 'fi-ss-apps-add', label: 'BUTTONS' },
    { id: 'Fonts', icon: 'fi-ss-text', label: 'FONTS' },
    { id: 'Wallpaper', icon: 'fi-ss-picture', label: 'WALLPAPER' },
  ]

  const updateProfile = async (updates: any) => {
    if (!profile) return
    
    // 1. Update through parent (which handles sync and DB)
    setProfile(updates)

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

    if (isMobile) {
      // For mobile, we just track that we are saving to show the spinner
      setSaveStatus('saving')
      setTimeout(() => {
        setSaveStatus('saved')
        setTimeout(() => setSaveStatus('idle'), 2000)
      }, 800)
    } else {
      // For laptop, show auto-save status
      setSaveStatus('saving')
      if (saveTimeout) clearTimeout(saveTimeout)
      const timeout = setTimeout(() => {
        setSaveStatus('saved')
        setTimeout(() => setSaveStatus('idle'), 2000)
      }, 1000)
      setSaveTimeout(timeout)
    }
  }

  const handleMobileSave = async () => {
     setActiveSheet(null)
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
    } else {
       const fileName = `bg-video-${Date.now()}.mp4`
       const filePath = `${profile.id}/${fileName}`
       const { error: uploadError } = await supabase.storage.from('bg-assets').upload(filePath, file, { upsert: true })
       if (!uploadError) {
          const { data: { publicUrl } } = supabase.storage.from('bg-assets').getPublicUrl(filePath)
          updateProfile({ custom_bg: publicUrl, custom_bg_type: 'video', theme: 'custom' })
       }
    }
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
    { id: 'style', icon: 'fi-rr-magic-wand', label: 'Style', isIcon: true },
  ]

  const selectedTheme = (THEMES.find(t => t.id === profile?.theme) || THEMES[0]) as Theme

  const renderSheetContent = () => {
    switch (activeSheet) {
      case 'theme':
        return <ThemeSettings profile={profile} themeTab={themeTab} setThemeTab={setThemeTab} activeCategory={activeCategory} setActiveCategory={setActiveCategory} THEME_CATEGORIES={THEME_CATEGORIES} updateProfile={updateProfile} handleCustomBgUpload={handleCustomBgUpload} />
      case 'header':
        return <HeaderSettings profile={profile} updateProfile={updateProfile} handleAvatarUpload={handleAvatarUpload} />
      case 'wallpaper':
        return <WallpaperSettings profile={profile} pendingColor={pendingColor} setPendingColor={setPendingColor} updateProfile={updateProfile} handleCustomBgUpload={handleCustomBgUpload} PATTERNS={PATTERNS} PRESET_COLORS={PRESET_COLORS} PRESET_GRADIENTS={PRESET_GRADIENTS} />
      case 'style':
        return <StyleSettings profile={profile} activeSubTab={activeSubTab} setActiveSubTab={setActiveSubTab} updateProfile={updateProfile} FONTS={FONTS} />
      default: return null
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden h-full">
      <div className="flex flex-col h-full bg-white">
          <div className="px-4 md:px-8 py-4 md:py-6 flex items-center justify-between border-b border-gray-50 flex-shrink-0 bg-white z-[70]">
             <div className="flex flex-col">
                <h1 className="font-extrabold text-lg md:text-2xl text-secondary uppercase tracking-tighter shrink-0">Design Workspace</h1>
                <span className="hidden md:block text-[10px] font-black uppercase text-gray-400 tracking-widest">Live Customization ΓÇó {activeDesktopTab}</span>
             </div>
             <div className="flex items-center gap-6">
                <AnimatePresence mode="wait">
                   {saveStatus === 'saving' && (
                     <motion.div key="saving" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-primary font-bold text-[10px] md:text-xs bg-primary/5 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-primary/10">
                        <i className="fi fi-rr-spinner animate-spin"></i>
                        <span>Saving...</span>
                     </motion.div>
                   )}
                   {saveStatus === 'saved' && (
                     <motion.div key="saved" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-green-500 font-bold text-[10px] md:text-xs bg-green-50 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-green-100">
                        <i className="fi fi-rr-check"></i>
                        <span>Updated</span>
                     </motion.div>
                   )}
                </AnimatePresence>
             </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
             {/* Unified Navigation - Ribbon for desktop, simplified for mobile */}
             <div className="w-16 md:w-24 border-r border-gray-50 flex flex-col items-center py-6 md:py-10 gap-6 md:gap-10 overflow-y-auto no-scrollbar bg-white z-[60]">
                {DESKTOP_TABS.map(tab => (
                   <button key={tab.id} onClick={() => setActiveDesktopTab(tab.id)} className={`flex flex-col items-center gap-1.5 md:gap-2 transition-all shrink-0 ${activeDesktopTab === tab.id ? 'text-secondary font-black' : 'text-gray-300 hover:text-gray-500'}`}>
                      <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-[22px] flex items-center justify-center transition-all ${activeDesktopTab === tab.id ? 'bg-secondary text-white shadow-lg md:shadow-xl rotate-12' : 'bg-transparent'}`}>
                         <i className={`fi ${tab.icon} text-lg md:text-xl`}></i>
                      </div>
                      <span className={`text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] ${activeDesktopTab === tab.id ? 'opacity-100' : 'opacity-40'}`}>{tab.label.slice(0, 4)}</span>
                   </button>
                ))}
             </div>

             {/* Dynamic Content Area */}
             <div className="flex-1 bg-gray-50/20 overflow-hidden relative">
                <div className="absolute inset-0 overflow-y-auto p-4 md:p-12 no-scrollbar pb-40">
                   <div className="max-w-2xl mx-auto space-y-10 md:space-y-16">
                      <AnimatePresence mode="wait">
                         {activeDesktopTab === 'Header' && (
                            <motion.section key="header" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 md:space-y-10">
                               <h2 className="text-xl md:text-3xl font-black text-secondary uppercase tracking-tighter italic">Identity</h2>
                               <div className="bg-white p-6 md:p-10 rounded-[30px] md:rounded-[50px] border border-gray-100 shadow-sm">
                                  <HeaderSettings profile={profile} updateProfile={updateProfile} handleAvatarUpload={handleAvatarUpload} isDesktop />
                               </div>
                            </motion.section>
                         )}
                         {activeDesktopTab === 'Theme' && (
                            <motion.section key="theme" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 md:space-y-10">
                               <h2 className="text-xl md:text-3xl font-extrabold text-secondary uppercase tracking-tighter italic">Themes</h2>
                               <ThemeSettings profile={profile} themeTab={themeTab} setThemeTab={setThemeTab} activeCategory={activeCategory} setActiveCategory={setActiveCategory} THEME_CATEGORIES={THEME_CATEGORIES} updateProfile={updateProfile} handleCustomBgUpload={handleCustomBgUpload} isDesktop />
                            </motion.section>
                         )}
                         {activeDesktopTab === 'Buttons' && (
                            <motion.section key="buttons" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 md:space-y-10">
                               <h2 className="text-xl md:text-3xl font-black text-secondary uppercase tracking-tighter italic">Buttons</h2>
                               <StyleSettings profile={profile} activeSubTab="Buttons" setActiveSubTab={() => {}} updateProfile={updateProfile} FONTS={FONTS} isDesktop />
                            </motion.section>
                         )}
                         {activeDesktopTab === 'Fonts' && (
                            <motion.section key="fonts" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 md:space-y-10">
                               <div className="flex items-center justify-between">
                                  <h2 className="text-xl md:text-3xl font-black text-secondary uppercase tracking-tighter italic">Typography</h2>
                                  <input type="text" placeholder="Search..." className="w-24 md:w-auto px-4 py-2 bg-white border border-gray-100 rounded-full text-[10px] md:text-xs font-bold outline-none focus:border-secondary transition-all" value={fontSearch} onChange={(e) => setFontSearch(e.target.value)} />
                               </div>
                               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 max-h-[400px] overflow-y-auto no-scrollbar bg-white p-4 md:p-6 rounded-[30px] md:rounded-[40px] border border-gray-100">
                                  {FONTS.filter(f => f.toLowerCase().includes(fontSearch.toLowerCase())).map(font => (
                                     <button key={font} onClick={() => updateProfile({ font_family: font })} className={`p-4 md:p-8 rounded-[20px] md:rounded-[28px] text-left transition-all border-2 ${profile?.font_family === font ? 'bg-secondary text-white border-secondary' : 'bg-gray-50 border-transparent'}`} style={{ fontFamily: font }}>
                                        <span className="text-base md:text-xl font-black">{font}</span>
                                     </button>
                                  ))}
                               </div>
                            </motion.section>
                         )}
                         {activeDesktopTab === 'Wallpaper' && (
                           <motion.section key="wallpaper" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 md:space-y-10">
                              <h2 className="text-xl md:text-3xl font-black text-secondary uppercase tracking-tighter italic">Wallpaper Engine</h2>
                              <div className="bg-white p-6 md:p-10 rounded-[30px] md:rounded-[50px] border border-gray-100 shadow-sm">
                                 <WallpaperSettings profile={profile} pendingColor={pendingColor} setPendingColor={setPendingColor} updateProfile={updateProfile} handleCustomBgUpload={handleCustomBgUpload} PATTERNS={PATTERNS} PRESET_COLORS={PRESET_COLORS} PRESET_GRADIENTS={PRESET_GRADIENTS} isDesktop />
                              </div>
                           </motion.section>
                         )}
                      </AnimatePresence>
                   </div>
                </div>
             </div>
          </div>
      </div>
      <ImageCropperModal isOpen={showCropper} imageSrc={selectedImage} onClose={() => setShowCropper(false)} aspect={cropTarget === 'avatar' ? 1/1 : 9/16} circularCrop={cropTarget === 'avatar'} onCropComplete={handleCropComplete} />
    </div>
  )
}

function ThemeSettings({ profile, themeTab, setThemeTab, activeCategory, setActiveCategory, THEME_CATEGORIES, updateProfile, handleCustomBgUpload, isDesktop }: any) {
  return (
    <div className={`flex flex-col ${isDesktop ? 'gap-6' : 'h-[350px]'}`}>
       <div className="flex bg-gray-50 p-1 rounded-2xl shrink-0">
          <button onClick={() => setThemeTab('free')} className={`flex-1 py-2.5 text-[10px] font-extrabold uppercase tracking-widest rounded-[14px] transition-all ${themeTab === 'free' ? 'bg-white text-secondary shadow-sm' : 'text-gray-400'}`}>Free</button>
          <button onClick={() => setThemeTab('premium')} className={`flex-1 py-2.5 text-[10px] font-extrabold uppercase tracking-widest rounded-[14px] transition-all ${themeTab === 'premium' ? 'bg-white text-secondary shadow-sm' : 'text-gray-400'}`}>Premium</button>
       </div>
       {!isDesktop && (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 shrink-0">
             {THEME_CATEGORIES.map((cat: any) => (
               <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-secondary text-white' : 'bg-gray-50 text-gray-400'}`}>{cat}</button>
             ))}
          </div>
       )}
       <div className={`overflow-y-auto no-scrollbar ${isDesktop ? '' : 'flex-1 pb-10'}`}>
          <div className={`grid gap-4 ${isDesktop ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-3'}`}>

             {THEMES.filter(t => (themeTab === 'premium' ? t.isPremium : !t.isPremium)).map(theme => (
               <button key={theme.id} onClick={() => updateProfile({ theme: theme.id, custom_bg_type: '' })} className="flex flex-col items-center gap-2 group">
                  <div className={`aspect-[3/4] w-full rounded-[24px] overflow-hidden border-2 transition-all relative ${profile?.theme === theme.id ? 'border-secondary shadow-xl' : 'border-transparent'} ${theme.bg}`}>
                     {theme.image && <img src={theme.image} className="w-full h-full object-cover" />}
                     <div className="absolute inset-0 flex items-center justify-center"><span className={`${theme.text.split(' ')[0]} font-extrabold text-xl`}>Aa</span></div>
                  </div>
                  <span className="text-[9px] font-semibold text-gray-500 uppercase">{theme.name}</span>
               </button>
             ))}
          </div>
       </div>
    </div>
  )
}

function HeaderSettings({ profile, updateProfile, handleAvatarUpload, isDesktop }: any) {
  return (
    <div className={`space-y-8 ${isDesktop ? '' : 'pb-20 h-[400px] overflow-y-auto no-scrollbar'}`}>
       <div className={`flex items-center gap-8 ${isDesktop ? 'flex-row' : 'flex-col sm:flex-row'}`}>
          <div className="relative group shrink-0">
             <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-xl relative bg-gray-50">
                <img src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.username}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><i className="fi fi-rr-camera text-white"></i></div>
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleAvatarUpload} />
             </div>
          </div>
          <div className="flex-1 w-full space-y-4">
             <div className="space-y-2">
               <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">Profile Name</label>
               <input type="text" value={profile?.display_name || ''} onChange={(e) => updateProfile({ display_name: e.target.value })} className="w-full h-14 px-6 rounded-2xl bg-gray-50 text-secondary font-black outline-none border-2 border-transparent focus:border-secondary transition-all" />
             </div>
          </div>
       </div>
       <div className="space-y-2">
          <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">Bio</label>
          <textarea value={profile?.bio || ''} onChange={(e) => updateProfile({ bio: e.target.value })} className="w-full h-32 p-6 rounded-2xl bg-gray-50 text-secondary font-bold outline-none border-2 border-transparent focus:border-secondary transition-all resize-none" placeholder="Tell the world who you are..." />
       </div>
    </div>
  )
}

function WallpaperSettings({ profile, pendingColor, setPendingColor, updateProfile, handleCustomBgUpload, PATTERNS, PRESET_COLORS, PRESET_GRADIENTS, isDesktop }: any) {
  return (
    <div className={`flex flex-col ${isDesktop ? 'gap-8' : 'h-[550px]'}`}>
       <div className="grid grid-cols-5 gap-2 shrink-0">
          {[
            { id: 'color', label: 'Color', icon: 'fi-rr-palette' },
            { id: 'gradient', label: 'Gradient', icon: 'fi-rr-swatchbook' },
            { id: 'pattern', label: 'Pattern', icon: 'fi-rr-grid' },
            { id: 'image', label: 'Image', icon: 'fi-rr-picture' },
            { id: 'video', label: 'Video', icon: 'fi-rr-play-alt' },
          ].map(type => (
            <button key={type.id} onClick={() => updateProfile({ custom_bg_type: type.id, theme: 'custom' })} className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl border-2 transition-all ${profile?.custom_bg_type === type.id ? 'border-secondary bg-secondary/5' : 'border-gray-50'}`}>
               <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center ${profile?.custom_bg_type === type.id ? 'bg-primary text-white' : 'bg-gray-50 text-gray-400'}`}><i className={`fi ${type.icon} text-sm sm:text-lg`}></i></div>
               <span className="text-[8px] font-black uppercase tracking-widest hidden xs:block">{type.label}</span>
            </button>
          ))}
       </div>
       <div className={`${isDesktop ? '' : 'flex-1 overflow-y-auto no-scrollbar pb-10'}`}>
          {profile?.custom_bg_type === 'color' && (
            <div className="space-y-6">
               <div className={`grid gap-2 sm:gap-3 ${isDesktop ? 'grid-cols-10' : 'grid-cols-5'}`}>
                  {PRESET_COLORS.map((c: any) => (
                    <button key={c} onClick={() => { setPendingColor(c); updateProfile({ custom_bg: c, custom_bg_type: 'color', theme: 'custom' }) }} className={`aspect-square rounded-full border-4 transition-all ${profile?.custom_bg === c ? 'border-secondary' : 'border-white shadow-sm'}`} style={{ backgroundColor: c }} />
                  ))}

               </div>
            </div>
          )}
          {profile?.custom_bg_type === 'gradient' && (
             <div className={`grid gap-3 ${isDesktop ? 'grid-cols-4' : 'grid-cols-2'}`}>
                {PRESET_GRADIENTS.map((g: any, i: number) => (
                  <button key={i} onClick={() => updateProfile({ custom_bg: g, custom_bg_type: 'gradient', theme: 'custom' })} className={`w-full aspect-video rounded-2xl border-2 transition-all relative overflow-hidden ${profile?.custom_bg === g ? 'border-secondary' : 'border-transparent shadow-sm'}`}><div className="absolute inset-0" style={{ backgroundImage: g }} /></button>
                ))}
             </div>
          )}
          {profile?.custom_bg_type === 'pattern' && (
             <div className={`grid gap-3 ${isDesktop ? 'grid-cols-4' : 'grid-cols-2'}`}>
                {PATTERNS.map((p: any) => (
                  <button key={p.id} onClick={() => updateProfile({ custom_bg_pattern: p.id, custom_bg_type: 'pattern', theme: 'custom', custom_bg: profile?.custom_bg || '#6A373A' })} className={`w-full aspect-video rounded-2xl border-2 transition-all relative overflow-hidden bg-gray-50 ${profile?.custom_bg_pattern === p.id ? 'border-secondary shadow-lg' : 'border-transparent'}`}><div className="absolute inset-0 opacity-20" style={{ backgroundImage: p.css, backgroundSize: p.size }} /><span className="relative z-10 text-[9px] font-black uppercase text-gray-400">{p.id}</span></button>
                ))}
             </div>
          )}
          {(profile?.custom_bg_type === 'image' || profile?.custom_bg_type === 'video') && (
            <div className="p-12 border-4 border-dashed border-gray-50 bg-gray-50/50 rounded-[40px] flex flex-col items-center gap-4 text-center relative group">
               <div className="w-16 h-16 rounded-3xl bg-white shadow-xl flex items-center justify-center text-secondary"><i className={`fi ${profile?.custom_bg_type === 'image' ? 'fi-rr-picture' : 'fi-rr-play-alt'} text-3xl`}></i></div>
               <p className="font-black text-secondary text-xs uppercase tracking-widest">Upload local {profile?.custom_bg_type} asset</p>
               <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleCustomBgUpload(e, profile?.custom_bg_type as any)} accept={profile?.custom_bg_type === 'image' ? 'image/*' : 'video/*'} />
            </div>
          )}
       </div>
    </div>
  )
}

function StyleSettings({ profile, activeSubTab, setActiveSubTab, updateProfile, FONTS, isDesktop }: any) {
  return (
    <div className={`flex flex-col ${isDesktop ? 'gap-8' : 'h-[350px]'}`}>
       {!isDesktop && (
          <div className="flex border-b border-gray-100 shrink-0">
             {['Text', 'Buttons', 'Colors'].map(t => (
               <button key={t} onClick={() => setActiveSubTab(t)} className={`flex-1 py-4 text-[10px] font-extrabold uppercase tracking-widest ${activeSubTab === t ? 'border-b-4 border-secondary text-secondary' : 'text-gray-400'}`}>{t}</button>
             ))}
          </div>
       )}
       <div className={`${isDesktop ? '' : 'flex-1 overflow-y-auto no-scrollbar pb-10 pt-4'}`}>
          {(isDesktop || activeSubTab === 'Text') && (
            <div className="space-y-6 h-full">
               <label className="text-[10px] font-extrabold uppercase text-gray-400 tracking-[0.4em] pl-2">Font Family</label>
               <div className="grid grid-cols-2 gap-3 pb-20">
                  {FONTS.map((font: string) => (
                    <button 
                      key={font} 
                      onClick={() => updateProfile({ font_family: font })} 
                      className={`p-4 rounded-xl border-2 text-left transition-all ${profile?.font_family === font ? 'border-secondary bg-secondary/5' : 'border-gray-50'}`}
                      style={{ fontFamily: font }}
                    >
                       <span className="text-sm font-extrabold">{font}</span>
                    </button>
                  ))}
               </div>
            </div>
          )}
          {(isDesktop || activeSubTab === 'Buttons') && (
             <div className="space-y-10">
                <div className="space-y-6">
                   <label className="text-[10px] font-extrabold uppercase text-gray-400 tracking-[0.4em] pl-2">Variant Style</label>
                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                     {['solid', 'outline', 'glass'].map(v => (
                       <button key={v} onClick={() => updateProfile({ button_variant: v })} className={`h-14 rounded-2xl border-2 flex items-center justify-center font-extrabold uppercase text-[10px] tracking-widest transition-all ${profile?.button_variant === v ? 'border-secondary text-secondary bg-secondary/5 shadow-lg' : 'border-gray-50 text-gray-400 bg-gray-50/50'}`}>{v}</button>
                     ))}
                   </div>
                </div>
                <div className="space-y-6">
                   <label className="text-[10px] font-extrabold uppercase text-gray-400 tracking-[0.4em] pl-2">Curvature Settings</label>
                   <div className="flex gap-3">
                      {['none', 'md', 'xl', 'full'].map(r => (
                        <button key={r} onClick={() => updateProfile({ button_radius: r })} className={`flex-1 h-12 rounded-xl border-2 flex items-center justify-center text-[10px] font-extrabold transition-all ${profile?.button_radius === r ? 'bg-secondary text-white border-secondary shadow-lg' : 'bg-white text-gray-400 border-gray-100'}`}>{r.toUpperCase()}</button>
                      ))}
                   </div>
                </div>
             </div>
          )}
          {(isDesktop || activeSubTab === 'Colors') && (
            <div className={`space-y-8 ${isDesktop ? 'mt-12' : ''}`}>
               <div className="flex items-center justify-between p-8 bg-gray-50/50 rounded-[40px] border border-gray-100">
                  <div className="flex flex-col"><span className="font-extrabold text-secondary">Font Color</span><span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Global text color tone</span></div>
                  <input type="color" value={profile?.font_color || '#000000'} onChange={(e) => updateProfile({ font_color: e.target.value })} className="w-16 h-16 rounded-[24px] cursor-pointer border-4 border-white shadow-2xl" />
               </div>
               <div className="flex items-center justify-between p-8 bg-gray-50/50 rounded-[40px] border border-gray-100">
                  <div className="flex flex-col"><span className="font-extrabold text-secondary">Button Color</span><span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Override theme color</span></div>
                  <input type="color" value={profile?.custom_button_bg || '#ffffff'} onChange={(e) => updateProfile({ custom_button_bg: e.target.value })} className="w-16 h-16 rounded-[24px] cursor-pointer border-4 border-white shadow-2xl" />
               </div>
            </div>
          )}
       </div>
    </div>
  )
}
