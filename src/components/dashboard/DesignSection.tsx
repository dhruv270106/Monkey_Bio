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
  hasChanges: boolean
  setHasChanges: (hasChanges: boolean) => void
  links: any[]
  onBack: () => void
}

export default function DesignSection({ profile, setProfile, hasChanges, setHasChanges, links, onBack }: DesignSectionProps) {
  const [showCropper, setShowCropper] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')
  const [activeSheet, setActiveSheet] = useState<string | null>(null)
  const [themeTab, setThemeTab] = useState<'free' | 'premium'>('free')
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeSubTab, setActiveSubTab] = useState('Text')
  const [pendingColor, setPendingColor] = useState('#6A373A')

  const THEME_CATEGORIES = ['All', 'Simple', 'Creative', 'Professional', 'Anime', 'Business', 'Abstract']

  const FONTS = [
    'Inter', 'Roboto', 'Outfit', 'Playfair Display', 'Poppins', 'Montserrat', 'Open Sans', 'Lato', 'Ubuntu', 'Lora',
    'Dancing Script', 'Pacifico', 'Caveat', 'Satisfy', 'Oswald', 'Raleway', 'Nunito', 'Merriweather'
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
    { id: 'style', icon: 'fi-rr-swatches', label: 'Style', isIcon: true },
  ]

  const selectedTheme = (THEMES.find(t => t.id === profile?.theme) || THEMES[0]) as Theme

  const getButtonStyle = () => {
    const variant = profile?.button_variant || 'solid'
    const radius = profile?.button_radius || 'xl'
    const customBg = profile?.custom_button_bg || (selectedTheme.button.includes('bg-white') ? '#ffffff' : '#000000')
    const customColor = profile?.font_color || (selectedTheme.text.includes('white') ? '#ffffff' : '#000000')

    let baseStyle: any = {
      fontFamily: profile?.font_family || 'inherit',
      color: customColor,
      borderRadius: radius === 'none' ? '0px' : radius === 'md' ? '12px' : radius === 'xl' ? '24px' : '9999px',
    }

    if (variant === 'outline') {
      baseStyle = { ...baseStyle, backgroundColor: 'transparent', border: `2px solid ${customBg}` }
    } else if (variant === 'glass') {
      baseStyle = { ...baseStyle, backgroundColor: `${customBg}20`, backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }
    } else {
      baseStyle = { ...baseStyle, backgroundColor: customBg }
    }
    return baseStyle
  }

  const getBackgroundStyle = () => {
    if (profile?.theme !== 'custom') {
       if (selectedTheme.image) return { backgroundImage: `url(${selectedTheme.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }
       return {}
    }
    const type = profile?.custom_bg_type || 'color'
    const value = profile?.custom_bg || '#6A373A'
    if (type === 'pattern') {
        const p = PATTERNS.find(pat => pat.id === profile?.custom_bg_pattern) || PATTERNS[0]
        return { backgroundColor: value, backgroundImage: p.css, backgroundSize: p.size }
    }
    if (type === 'color') return { backgroundColor: value }
    if (type === 'gradient') return { backgroundImage: value }
    if (type === 'image') return { backgroundImage: `url(${value})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    return { backgroundColor: '#000000' }
  }

  const renderSheetContent = () => {
     switch (activeSheet) {
        case 'theme': return <ThemeSettings profile={profile} themeTab={themeTab} setThemeTab={setThemeTab} activeCategory={activeCategory} setActiveCategory={setActiveCategory} THEME_CATEGORIES={THEME_CATEGORIES} updateProfile={updateProfile} />
        case 'header': return <HeaderSettings profile={profile} updateProfile={updateProfile} handleAvatarUpload={handleAvatarUpload} />
        case 'wallpaper': return <WallpaperSettings profile={profile} pendingColor={pendingColor} setPendingColor={setPendingColor} updateProfile={updateProfile} handleCustomBgUpload={handleCustomBgUpload} PATTERNS={PATTERNS} PRESET_COLORS={PRESET_COLORS} PRESET_GRADIENTS={PRESET_GRADIENTS} />
        case 'style': return <StyleSettings profile={profile} activeSubTab={activeSubTab} setActiveSubTab={setActiveSubTab} updateProfile={updateProfile} FONTS={FONTS} />
        default: return null
     }
  }

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden min-h-screen">
      
      {/* LAPTOP / DESKTOP VIEW - Standard Sidebar Layout */}
      <div className="hidden md:flex flex-col h-full">
         <div className="h-16 px-8 flex items-center justify-between border-b border-gray-50 flex-shrink-0 bg-white sticky top-0 md:relative z-[60]">
            <h1 className="font-black text-xl uppercase tracking-tighter">Appearance</h1>
            <div className="flex items-center gap-3">
               <button onClick={() => window.location.reload()} className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 flex items-center justify-center transition-all active:rotate-180">
                  <i className="fi fi-rr-refresh text-gray-400 text-sm"></i>
               </button>
            </div>
         </div>

         <div className="max-w-xl mx-auto w-full p-8 space-y-12 pb-32">
            <DesktopSection title="Profile">
               <HeaderSettings profile={profile} updateProfile={updateProfile} handleAvatarUpload={handleAvatarUpload} isDesktop />
            </DesktopSection>

            <DesktopSection title="Themes">
               <ThemeSettings profile={profile} themeTab={themeTab} setThemeTab={setThemeTab} activeCategory={activeCategory} setActiveCategory={setActiveCategory} THEME_CATEGORIES={THEME_CATEGORIES} updateProfile={updateProfile} isDesktop />
            </DesktopSection>

            <DesktopSection title="Custom Background">
               <WallpaperSettings profile={profile} pendingColor={pendingColor} setPendingColor={setPendingColor} updateProfile={updateProfile} handleCustomBgUpload={handleCustomBgUpload} PATTERNS={PATTERNS} PRESET_COLORS={PRESET_COLORS} PRESET_GRADIENTS={PRESET_GRADIENTS} isDesktop />
            </DesktopSection>

            <DesktopSection title="Buttons & Text">
               <StyleSettings profile={profile} activeSubTab={activeSubTab} setActiveSubTab={setActiveSubTab} updateProfile={updateProfile} FONTS={FONTS} isDesktop />
            </DesktopSection>
         </div>
      </div>

      {/* MOBILE MOBILE VIEW - Fullscreen Workspace with Sheets */}
      <div className="md:hidden flex flex-col h-screen relative bg-white">
         <div className="flex items-center justify-between px-6 py-4 bg-white z-[100] shrink-0 border-b border-gray-50">
            <div className="flex items-center gap-4">
               <button onClick={onBack} className="w-10 h-10 flex items-center justify-center text-secondary active:scale-90 transition-transform bg-gray-50 rounded-xl border border-gray-100">
                  <i className="fi fi-rr-angle-left text-xl"></i>
               </button>
               <Link href="/" className="flex items-center gap-2 group">
                  <span className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-lg bg-black text-linktree-lime">M</span>
                  <span className="font-black text-lg tracking-tighter uppercase text-black">Monkey</span>
               </Link>
            </div>
            <button className="w-10 h-10 flex items-center justify-center text-secondary bg-gray-50 rounded-xl border border-gray-100"><i className="fi fi-rr-share-square text-lg"></i></button>
         </div>

         <div className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gray-50/50">
            <motion.div 
               animate={{ scale: activeSheet ? 0.6 : 1, y: activeSheet ? -120 : 0 }}
               transition={{ type: 'spring', damping: 25, stiffness: 200 }}
               className={`w-full max-w-[320px] aspect-[9/18.5] rounded-[52px] border-[10px] border-[#020617] shadow-[0_40px_100px_rgba(0,0,0,0.15)] relative overflow-hidden flex flex-col items-center bg-white ${selectedTheme.text}`}
            >
               <div className={`absolute inset-0 transition-all duration-700 ${selectedTheme.bg}`} style={getBackgroundStyle()}>
                 {((profile?.theme === 'custom' && profile?.custom_bg_type === 'video') || selectedTheme.video) && (
                   <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                     <source src={profile?.theme === 'custom' ? profile?.custom_bg : selectedTheme.video} type="video/mp4" />
                   </video>
                 )}
               </div>
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#020617] rounded-b-[16px] z-50" />
               <div className="relative z-10 w-full h-full overflow-y-auto no-scrollbar flex flex-col items-center p-8 pt-12">
                   <img src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.username}`} className="w-16 h-16 rounded-full border-2 border-white/20 mb-6 shadow-lg object-cover" />
                   <h3 className="font-black text-xl mb-1 tracking-tight" style={{ fontFamily: profile?.font_family || 'inherit', color: profile?.font_color || 'inherit' }}>{profile?.display_name || 'Your Name'}</h3>
                   <h3 className="text-[10px] font-bold opacity-70 mb-4" style={{ color: profile?.font_color || 'inherit' }}>@{profile?.username}</h3>
                   <p className="text-[11px] text-center px-4 mb-6 opacity-80 font-bold leading-relaxed" style={{ color: profile?.font_color || 'inherit' }}>{profile?.bio}</p>
                   <div className="flex flex-wrap justify-center gap-4 mb-10 w-full">
                      {profile?.social_links && Object.entries(profile.social_links).slice(0, 5).map(([p, url]: [string, any]) => url && <i key={p} className={`fi ${PLATFORMS[p]?.icon || 'fi-rr-link'} text-2xl`} style={{ color: profile?.font_color || 'inherit' }} />)}
                   </div>
                   <div className="w-full space-y-3">
                      {links && links.filter(l => l.active).slice(0,3).map((link, i) => (
                        <div key={i} className="w-full py-2.5 px-3 rounded-xl border flex items-center justify-center font-bold text-[11px]" style={getButtonStyle()}>{link.title}</div>
                      ))}
                   </div>
                   <div className="mt-auto pt-10 mb-2 flex flex-col items-center gap-4 opacity-30">
                       <div className="px-6 py-2 bg-white rounded-full text-[8px] font-black uppercase shadow-lg">Join on Monkey</div>
                   </div>
               </div>
            </motion.div>
         </div>

         <AnimatePresence>
            {activeSheet && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveSheet(null)} className="fixed inset-0 bg-black/40 z-[150]" />}
         </AnimatePresence>
         <AnimatePresence>
            {activeSheet && (
               <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 300 }} className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[40px] px-6 pt-2 pb-24 z-[180] shadow-[0_-20px_60px_rgba(0,0,0,0.2)] max-h-[85vh] flex flex-col">
                  <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-6 shrink-0" />
                  <div className="flex items-center justify-between mb-4 shrink-0 px-2">
                     <h3 className="font-black text-xl uppercase tracking-tighter text-secondary">{activeSheet}</h3>
                     <button onClick={() => setActiveSheet(null)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-secondary border border-gray-100"><i className="fi fi-rr-cross-small text-xl pt-0.5" /></button>
                  </div>
                  <div className="flex-1 overflow-hidden px-2">{renderSheetContent()}</div>
               </motion.div>
            )}
         </AnimatePresence>
         <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-center justify-around py-4 px-6 z-[170] shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
            {NAV_ITEMS.map(item => (
              <button key={item.id} onClick={() => { setActiveSheet(item.id); if (item.id === 'style') setActiveSubTab('Text') }} className={`flex flex-col items-center gap-1.5 transition-all outline-none ${activeSheet === item.id ? 'text-secondary' : 'text-gray-300'}`}>
                 <div className={`w-14 h-11 rounded-[20px] flex items-center justify-center transition-all ${activeSheet === item.id ? 'bg-gray-100/80 scale-105' : ''}`}>
                    {item.isIcon ? <i className={`fi ${item.icon} text-lg`}></i> : <span className="font-black text-lg">{item.icon}</span>}
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

function DesktopSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
       <div className="px-10 py-6 border-b border-gray-50 bg-gray-50/10">
          <h2 className="font-black text-lg uppercase tracking-tight text-secondary">{title}</h2>
       </div>
       <div className="p-10">{children}</div>
    </div>
  )
}

function ThemeSettings({ profile, themeTab, setThemeTab, activeCategory, setActiveCategory, THEME_CATEGORIES, updateProfile, isDesktop }: any) {
  return (
    <div className={`flex flex-col ${isDesktop ? 'gap-6' : 'h-[500px]'}`}>
       <div className="flex bg-gray-50 p-1 rounded-2xl shrink-0">
          <button onClick={() => setThemeTab('free')} className={`flex-1 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-[14px] transition-all ${themeTab === 'free' ? 'bg-white text-secondary shadow-sm' : 'text-gray-400'}`}>Free</button>
          <button onClick={() => setThemeTab('premium')} className={`flex-1 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-[14px] transition-all ${themeTab === 'premium' ? 'bg-white text-secondary shadow-sm' : 'text-gray-400'}`}>Premium</button>
       </div>
       <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 shrink-0">
          {THEME_CATEGORIES.map((cat: any) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-secondary text-white' : 'bg-gray-50 text-gray-400'}`}>{cat}</button>
          ))}
       </div>
       <div className={`overflow-y-auto no-scrollbar ${isDesktop ? '' : 'flex-1 pb-20'}`}>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
             <button onClick={() => updateProfile({ theme: 'custom' })} className="flex flex-col items-center gap-2 group">
                <div className="aspect-[3/4] w-full rounded-[24px] bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-1 group-hover:bg-gray-100 transition-colors">
                  <i className="fi fi-rr-paintbrush text-xl text-gray-300"></i>
                  <span className="text-[8px] font-black uppercase text-gray-400">Custom</span>
                </div>
             </button>
             {THEMES.filter(t => (themeTab === 'premium' ? t.isPremium : !t.isPremium)).map(theme => (
               <button key={theme.id} onClick={() => updateProfile({ theme: theme.id, custom_bg_type: '' })} className="flex flex-col items-center gap-2 group">
                  <div className={`aspect-[3/4] w-full rounded-[24px] overflow-hidden border-2 transition-all relative ${profile?.theme === theme.id ? 'border-secondary shadow-xl' : 'border-transparent'} ${theme.bg}`}>
                     {theme.image && <img src={theme.image} className="w-full h-full object-cover" />}
                     <div className="absolute inset-0 flex items-center justify-center"><span className={`${theme.text.split(' ')[0]} font-black text-xl`}>Aa</span></div>
                  </div>
                  <span className="text-[9px] font-bold text-gray-500 uppercase">{theme.name}</span>
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
       <div className="flex flex-col sm:flex-row items-center gap-8">
          <div className="relative group shrink-0">
             <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl relative bg-gray-50">
                <img src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.username}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><i className="fi fi-rr-camera text-white"></i></div>
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleAvatarUpload} />
             </div>
          </div>
          <div className="flex-1 w-full space-y-4">
             <div className="space-y-2">
               <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">Profile Name</label>
               <input type="text" value={profile?.display_name || ''} onChange={(e) => updateProfile({ display_name: e.target.value })} className="w-full h-14 px-6 rounded-2xl bg-gray-50 text-secondary font-black outline-none border-2 border-transparent focus:border-secondary/10 transition-all" placeholder="Enter display name" />
             </div>
          </div>
       </div>
       <div className="space-y-2">
          <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">Bio</label>
          <textarea value={profile?.bio || ''} onChange={(e) => updateProfile({ bio: e.target.value })} className="w-full h-32 p-6 rounded-2xl bg-gray-50 text-secondary font-bold outline-none border-2 border-transparent focus:border-secondary/10 transition-all resize-none" placeholder="Tell the world who you are..." />
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
       <div className={`${isDesktop ? '' : 'flex-1 overflow-y-auto no-scrollbar pb-24'}`}>
          {profile?.custom_bg_type === 'color' && (
            <div className="space-y-6">
               <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 sm:gap-3">
                  {PRESET_COLORS.map((c: any) => (
                    <button key={c} onClick={() => { setPendingColor(c); updateProfile({ custom_bg: c, custom_bg_type: 'color', theme: 'custom' }) }} className={`aspect-square rounded-full border-4 transition-all ${profile?.custom_bg === c ? 'border-secondary' : 'border-white shadow-sm'}`} style={{ backgroundColor: c }} />
                  ))}
                  <div className="relative aspect-square rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden"><i className="fi fi-rr-plus text-gray-300"></i><input type="color" value={pendingColor} onChange={(e) => { setPendingColor(e.target.value); updateProfile({ custom_bg: e.target.value, custom_bg_type: 'color', theme: 'custom' }) }} className="absolute inset-0 opacity-0 cursor-pointer" /></div>
               </div>
            </div>
          )}
          {profile?.custom_bg_type === 'gradient' && (
             <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PRESET_GRADIENTS.map((g: any, i: number) => (
                  <button key={i} onClick={() => updateProfile({ custom_bg: g, custom_bg_type: 'gradient', theme: 'custom' })} className={`w-full aspect-video rounded-2xl border-2 transition-all relative overflow-hidden ${profile?.custom_bg === g ? 'border-secondary' : 'border-transparent shadow-sm'}`}><div className="absolute inset-0" style={{ backgroundImage: g }} /></button>
                ))}
             </div>
          )}
          {profile?.custom_bg_type === 'pattern' && (
             <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PATTERNS.map((p: any) => (
                  <button key={p.id} onClick={() => updateProfile({ custom_bg_pattern: p.id, custom_bg_type: 'pattern', theme: 'custom', custom_bg: profile?.custom_bg || '#6A373A' })} className={`w-full aspect-video rounded-2xl border-2 transition-all relative overflow-hidden bg-gray-50 ${profile?.custom_bg_pattern === p.id ? 'border-secondary' : 'border-transparent'}`}><div className="absolute inset-0 opacity-20" style={{ backgroundImage: p.css, backgroundSize: p.size }} /><span className="relative z-10 text-[9px] font-black uppercase text-gray-400">{p.id}</span></button>
                ))}
             </div>
          )}
          {profile?.custom_bg_type === 'image' && (
            <div className="p-8 border-4 border-dashed border-gray-50 bg-gray-50/50 rounded-[40px] flex flex-col items-center gap-4 text-center relative group">
               <div className="w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center text-secondary"><i className="fi fi-rr-picture text-xl"></i></div>
               <p className="font-black text-secondary text-[10px] uppercase">Upload Custom Image</p>
               <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleCustomBgUpload(e, 'image')} />
            </div>
          )}
          {profile?.custom_bg_type === 'video' && (
            <div className="p-8 border-4 border-dashed border-gray-50 bg-gray-50/50 rounded-[40px] flex flex-col items-center gap-4 text-center relative">
               <div className="w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center text-primary"><i className="fi fi-rr-play-alt text-xl"></i></div>
               <p className="font-black text-secondary text-[10px] uppercase">Upload Background Video (MP4)</p>
               <input type="file" accept="video/mp4" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleCustomBgUpload(e, 'video')} />
            </div>
          )}
       </div>
    </div>
  )
}

function StyleSettings({ profile, activeSubTab, setActiveSubTab, updateProfile, FONTS, isDesktop }: any) {
  return (
    <div className={`flex flex-col ${isDesktop ? 'gap-8' : 'h-[400px]'}`}>
       <div className="flex border-b border-gray-100 shrink-0">
          {['Text', 'Buttons', 'Colors'].map(t => (
            <button key={t} onClick={() => setActiveSubTab(t)} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest ${activeSubTab === t ? 'border-b-4 border-secondary text-secondary' : 'text-gray-400'}`}>{t}</button>
          ))}
       </div>
       <div className={`${isDesktop ? '' : 'flex-1 overflow-y-auto no-scrollbar pb-20 pt-4'}`}>
          {activeSubTab === 'Text' && (
             <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {FONTS.map((f: any) => (
                  <button key={f} onClick={() => updateProfile({ font_family: f })} className={`p-4 rounded-2xl border-2 transition-all text-xs ${profile?.font_family === f ? 'border-secondary bg-secondary/5 text-secondary' : 'border-gray-50 bg-white text-gray-500'}`} style={{ fontFamily: f }}>{f}</button>
                ))}
             </div>
          )}
          {activeSubTab === 'Buttons' && (
             <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                   {['solid', 'outline', 'glass'].map(v => (
                     <button key={v} onClick={() => updateProfile({ button_variant: v })} className={`h-12 rounded-2xl border-2 flex items-center justify-center font-black uppercase text-[10px] tracking-widest ${profile?.button_variant === v ? 'border-secondary text-secondary bg-secondary/5' : 'border-gray-50 text-gray-400'}`}>{v}</button>
                   ))}
                </div>
                <div className="space-y-4">
                   <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Button Curvature</p>
                   <div className="flex gap-2">
                      {['none', 'md', 'xl', 'full'].map(r => (
                        <button key={r} onClick={() => updateProfile({ button_radius: r })} className={`flex-1 h-10 rounded-xl border flex items-center justify-center text-[10px] font-black transition-all ${profile?.button_radius === r ? 'bg-secondary text-white border-secondary' : 'bg-white text-gray-400 border-gray-100'}`}>{r.toUpperCase()}</button>
                      ))}
                   </div>
                </div>
             </div>
          )}
          {activeSubTab === 'Colors' && (
            <div className="space-y-6 font-inter">
               <div className="flex items-center justify-between p-4 bg-gray-50 rounded-3xl">
                  <div><p className="text-[10px] font-black uppercase text-secondary">Font Color</p><p className="text-[9px] font-bold text-gray-400">All text on profile</p></div>
                  <input type="color" value={profile?.font_color || '#000000'} onChange={(e) => updateProfile({ font_color: e.target.value })} className="w-10 h-10 rounded-full cursor-pointer shadow-lg border-2 border-white" />
               </div>
               <div className="flex items-center justify-between p-4 bg-gray-50 rounded-3xl">
                  <div><p className="text-[10px] font-black uppercase text-secondary">Button Background</p><p className="text-[9px] font-bold text-gray-400">Primary button color</p></div>
                  <input type="color" value={profile?.custom_button_bg || '#ffffff'} onChange={(e) => updateProfile({ custom_button_bg: e.target.value })} className="w-10 h-10 rounded-full cursor-pointer shadow-lg border-2 border-white" />
               </div>
            </div>
          )}
       </div>
    </div>
  )
}
