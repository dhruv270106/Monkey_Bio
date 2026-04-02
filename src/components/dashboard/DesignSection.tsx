'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { THEMES, Theme } from '@/data/themes'
import { PLATFORMS } from '@/data/platforms'
import { APPS } from '@/data/apps'
import ImageCropperModal from '@/components/modals/ImageCropperModal'
import Link from 'next/link'

interface DesignSectionProps {
  profile: any
  setProfile: (profile: any) => void
  links: any[]
  onBack?: () => void
  subSection?: string
}

export default function DesignSection({ profile, setProfile, links, onBack, subSection }: DesignSectionProps) {
  const [showCropper, setShowCropper] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')
  const [themeTab, setThemeTab] = useState<'free' | 'premium'>('free')
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeSubTab, setActiveSubTab] = useState('Text')
  const [pendingColor, setPendingColor] = useState('#6A373A')
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle')
  const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout | null>(null)
  
  const [activeDesktopTab, setActiveDesktopTab] = useState(subSection ? subSection.charAt(0).toUpperCase() + subSection.slice(1) : 'Header')
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

  const updateProfile = async (updates: any) => {
    if (!profile) return
    setProfile(updates)
    setSaveStatus('saving')
    if (saveTimeout) clearTimeout(saveTimeout)
    const timeout = setTimeout(() => {
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2000)
    }, 800)
    setSaveTimeout(timeout)
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

  const renderContent = () => {
    const currentTab = subSection || activeDesktopTab.toLowerCase()
    
    switch (currentTab) {
      case 'profile':
        return <HeaderSettings profile={profile} updateProfile={updateProfile} handleAvatarUpload={handleAvatarUpload} isDesktop />
      case 'themes':
        return <ThemeSettings profile={profile} themeTab={themeTab} setThemeTab={setThemeTab} activeCategory={activeCategory} setActiveCategory={setActiveCategory} THEME_CATEGORIES={THEME_CATEGORIES} updateProfile={updateProfile} handleCustomBgUpload={handleCustomBgUpload} isDesktop />
      case 'buttons':
        return <StyleSettings profile={profile} activeSubTab="Buttons" setActiveSubTab={() => {}} updateProfile={updateProfile} FONTS={FONTS} isDesktop />
      case 'font':
        return (
          <div className="space-y-6">
             <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-none">Font Family</p>
                <input type="text" placeholder="Search..." className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-[10px] font-bold outline-none focus:border-primary transition-all w-32" value={fontSearch} onChange={(e) => setFontSearch(e.target.value)} />
             </div>
             <div className="grid grid-cols-1 gap-2 max-h-[500px] overflow-y-auto no-scrollbar pr-2">
                {FONTS.filter(f => f.toLowerCase().includes(fontSearch.toLowerCase())).map(font => (
                   <button key={font} onClick={() => updateProfile({ font_family: font })} className={`p-4 rounded-xl text-left transition-all border-2 ${profile?.font_family === font ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-gray-50 border-transparent hover:bg-white hover:border-gray-100'}`} style={{ fontFamily: font }}>
                      <span className="text-base font-black">{font}</span>
                   </button>
                ))}
             </div>
          </div>
        )
      case 'wallpaper':
        return <WallpaperSettings profile={profile} pendingColor={pendingColor} setPendingColor={setPendingColor} updateProfile={updateProfile} handleCustomBgUpload={handleCustomBgUpload} PATTERNS={PATTERNS} PRESET_COLORS={PRESET_COLORS} PRESET_GRADIENTS={PRESET_GRADIENTS} isDesktop />
      default:
        return <HeaderSettings profile={profile} updateProfile={updateProfile} handleAvatarUpload={handleAvatarUpload} isDesktop />
    }
  }

  // If subSection is provided, we only render the content part for the Right Panel
  if (subSection) {
    return (
      <div className="p-6">
         <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-secondary uppercase tracking-tight italic">{subSection}</h2>
            <div className="flex items-center gap-2">
               {saveStatus === 'saving' && <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>}
               {saveStatus === 'saved' && <i className="fi fi-rr-check text-green-500 text-xs"></i>}
            </div>
         </div>
         {renderContent()}
         <ImageCropperModal isOpen={showCropper} imageSrc={selectedImage} onClose={() => setShowCropper(false)} aspect={cropTarget === 'avatar' ? 1/1 : 9/16} circularCrop={cropTarget === 'avatar'} onCropComplete={handleCropComplete} />
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden h-full">
        {/* Fallback for cases where subSection isn't provided */}
        <div className="p-6">
           {renderContent()}
        </div>
        <ImageCropperModal isOpen={showCropper} imageSrc={selectedImage} onClose={() => setShowCropper(false)} aspect={cropTarget === 'avatar' ? 1/1 : 9/16} circularCrop={cropTarget === 'avatar'} onCropComplete={handleCropComplete} />
    </div>
  )
}

function ThemeSettings({ profile, themeTab, setThemeTab, updateProfile, isDesktop }: any) {
  return (
    <div className="flex flex-col gap-6">
       <div className="flex bg-gray-50 p-1 rounded-2xl shrink-0">
          <button onClick={() => setThemeTab('free')} className={`flex-1 py-2.5 text-[10px] font-extrabold uppercase tracking-widest rounded-[14px] transition-all ${themeTab === 'free' ? 'bg-white text-secondary shadow-sm' : 'text-gray-400'}`}>Free</button>
          <button onClick={() => setThemeTab('premium')} className={`flex-1 py-2.5 text-[10px] font-extrabold uppercase tracking-widest rounded-[14px] transition-all ${themeTab === 'premium' ? 'bg-white text-secondary shadow-sm' : 'text-gray-400'}`}>Premium</button>
       </div>
       <div className="grid grid-cols-2 gap-4">
          {THEMES.filter(t => (themeTab === 'premium' ? t.isPremium : !t.isPremium)).map(theme => (
            <button key={theme.id} onClick={() => updateProfile({ theme: theme.id, custom_bg_type: '' })} className="flex flex-col items-center gap-2 group">
               <div className={`aspect-[3/4] w-full rounded-[24px] overflow-hidden border-4 transition-all relative ${profile?.theme === theme.id ? 'border-primary shadow-xl' : 'border-transparent shadow-sm hover:border-gray-100'} ${theme.bg}`}>
                  {theme.image && <img src={theme.image} className="w-full h-full object-cover opacity-80" />}
                  <div className="absolute inset-0 flex items-center justify-center"><span className={`${theme.text.split(' ')[0]} font-extrabold text-xl`}>Aa</span></div>
               </div>
               <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{theme.name}</span>
            </button>
          ))}
       </div>
    </div>
  )
}

function HeaderSettings({ profile, updateProfile, handleAvatarUpload }: any) {
  return (
    <div className="space-y-8">
       <div className="flex flex-col items-center gap-6">
          <div className="relative group">
             <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl relative bg-gray-50">
                <img src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.username}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                   <i className="fi fi-rr-camera text-white text-xl"></i>
                   <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleAvatarUpload} />
                </div>
             </div>
          </div>
          <div className="w-full space-y-2">
             <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">Profile Name</label>
             <input type="text" value={profile?.display_name || ''} onChange={(e) => updateProfile({ display_name: e.target.value })} className="w-full h-14 px-6 rounded-2xl bg-gray-50 text-secondary font-black outline-none border-2 border-transparent focus:border-primary transition-all" />
          </div>
       </div>

       <div className="space-y-6">
          <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">Or choose an Avatar</label>
          <div className="grid grid-cols-5 gap-3">
             {[
               { id: 'man', icon: 'fi-rr-user', color: 'bg-blue-500' },
               { id: 'female', icon: 'fi-rr-venus', color: 'bg-pink-500' },
               { id: 'animal', icon: 'fi-rr-paw', color: 'bg-orange-500' },
               { id: 'bird', icon: 'fi-rr-leaf', color: 'bg-green-500' },
               { id: 'insect', icon: 'fi-rr-bug', color: 'bg-purple-500' }
             ].map(cat => (
               <button 
                  key={cat.id}
                  onClick={() => updateProfile({ avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${cat.id}` })}
                  className="w-10 h-10 rounded-xl bg-gray-50 hover:bg-white flex items-center justify-center group transition-all border border-transparent hover:border-gray-100 shadow-sm"
               >
                  <i className={`fi ${cat.icon} text-gray-400 group-hover:text-secondary pt-0.5`}></i>
               </button>
             ))}
          </div>
       </div>

       <div className="space-y-2">
          <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">Bio Description</label>
          <textarea value={profile?.bio || ''} onChange={(e) => updateProfile({ bio: e.target.value })} className="w-full h-32 p-6 rounded-2xl bg-gray-50 text-secondary font-bold outline-none border-2 border-transparent focus:border-primary transition-all resize-none" placeholder="Add your bio..." />
       </div>
    </div>
  )
}

function WallpaperSettings({ profile, updateProfile, PATTERNS, PRESET_COLORS, PRESET_GRADIENTS }: any) {
  return (
    <div className="space-y-8">
       <div className="grid grid-cols-5 gap-2">
          {[
            { id: 'color', icon: 'fi-rr-palette' },
            { id: 'gradient', icon: 'fi-rr-swatchbook' },
            { id: 'pattern', icon: 'fi-rr-grid' },
            { id: 'image', icon: 'fi-rr-picture' },
            { id: 'video', icon: 'fi-rr-play-alt' },
          ].map(type => (
            <button key={type.id} onClick={() => updateProfile({ custom_bg_type: type.id, theme: 'custom' })} className={`h-12 rounded-xl border-2 transition-all flex items-center justify-center ${profile?.custom_bg_type === type.id ? 'border-primary bg-primary/5 text-primary' : 'border-gray-50 text-gray-300'}`}>
               <i className={`fi ${type.icon} text-lg pt-0.5`}></i>
            </button>
          ))}
       </div>
       
       <div className="space-y-4">
          {profile?.custom_bg_type === 'color' && (
             <div className="grid grid-cols-5 gap-3">
                {PRESET_COLORS.map((c: any) => (
                  <button key={c} onClick={() => updateProfile({ custom_bg: c, custom_bg_type: 'color', theme: 'custom' })} className={`aspect-square rounded-full border-4 transition-all ${profile?.custom_bg === c ? 'border-primary scale-110' : 'border-white shadow-sm hover:scale-105'}`} style={{ backgroundColor: c }} />
                ))}
             </div>
          )}
          {profile?.custom_bg_type === 'gradient' && (
             <div className="grid grid-cols-2 gap-3">
                {PRESET_GRADIENTS.map((g: any, i: number) => (
                  <button key={i} onClick={() => updateProfile({ custom_bg: g, custom_bg_type: 'gradient', theme: 'custom' })} className={`w-full aspect-video rounded-2xl border-2 transition-all relative overflow-hidden ${profile?.custom_bg === g ? 'border-primary shadow-lg' : 'border-transparent shadow-sm'}`}><div className="absolute inset-0" style={{ backgroundImage: g }} /></button>
                ))}
             </div>
          )}
          {profile?.custom_bg_type === 'pattern' && (
             <div className="grid grid-cols-2 gap-3">
                {PATTERNS.map((p: any) => (
                  <button key={p.id} onClick={() => updateProfile({ custom_bg_pattern: p.id, custom_bg_type: 'pattern', theme: 'custom' })} className={`w-full aspect-video rounded-2xl border-2 bg-gray-50 transition-all relative overflow-hidden ${profile?.custom_bg_pattern === p.id ? 'border-primary shadow-lg' : 'border-transparent shadow-sm'}`}><div className="absolute inset-0 opacity-20" style={{ backgroundImage: p.css, backgroundSize: p.size }} /></button>
                ))}
             </div>
          )}
       </div>
    </div>
  )
}

function StyleSettings({ profile, updateProfile }: any) {
  return (
    <div className="space-y-10">
       <div className="space-y-6">
          <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.4em] ml-1 leading-none block">Variant Style</label>
          <div className="grid grid-cols-3 gap-3">
            {['solid', 'outline', 'glass'].map(v => (
              <button key={v} onClick={() => updateProfile({ button_variant: v })} className={`h-14 rounded-2xl border-2 flex items-center justify-center font-black uppercase text-[10px] tracking-widest transition-all ${profile?.button_variant === v ? 'border-primary text-primary bg-primary/5 shadow-lg shadow-primary/10' : 'border-gray-50 text-gray-400 bg-gray-50/50'}`}>{v}</button>
            ))}
          </div>
       </div>
       <div className="space-y-6">
          <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.4em] ml-1 leading-none block">Curvature</label>
          <div className="grid grid-cols-4 gap-2">
             {['none', 'md', 'xl', 'full'].map(r => (
               <button key={r} onClick={() => updateProfile({ button_radius: r })} className={`h-11 rounded-xl border-2 flex items-center justify-center text-[10px] font-black transition-all ${profile?.button_radius === r ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300'}`}>{r.toUpperCase()}</button>
             ))}
          </div>
       </div>
       <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between p-6 bg-gray-50/50 rounded-3xl border border-gray-100">
             <div className="flex flex-col"><span className="font-extrabold text-secondary text-xs">Font Color</span><span className="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-1">Global text tone</span></div>
             <input type="color" value={profile?.font_color || '#000000'} onChange={(e) => updateProfile({ font_color: e.target.value })} className="w-10 h-10 rounded-xl cursor-pointer border-2 border-white shadow-lg" />
          </div>
          <div className="flex items-center justify-between p-6 bg-gray-50/50 rounded-3xl border border-gray-100">
             <div className="flex flex-col"><span className="font-extrabold text-secondary text-xs">Button Fill</span><span className="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-1">Button background</span></div>
             <input type="color" value={profile?.custom_button_bg || '#ffffff'} onChange={(e) => updateProfile({ custom_button_bg: e.target.value })} className="w-10 h-10 rounded-xl cursor-pointer border-2 border-white shadow-lg" />
          </div>
       </div>
    </div>
  )
}
