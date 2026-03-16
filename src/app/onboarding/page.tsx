'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { THEMES } from '@/data/themes'
import { PLATFORMS } from '@/data/platforms'
import ImageCropperModal from '@/components/modals/ImageCropperModal'

export default function Onboarding() {
  const [step, setStep] = useState(1)
  const [username, setUsername] = useState('')
  const [isUsernameValid, setIsUsernameValid] = useState(false)
  const [usernameError, setUsernameError] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  
  const [selectedTheme, setSelectedTheme] = useState('grid-mocha')
  const [socialLinks, setSocialLinks] = useState<{platform: string, url: string}[]>([])
  const [activePlatform, setActivePlatform] = useState<string | null>(null)
  const [tempLink, setTempLink] = useState('')
  const [linkError, setLinkError] = useState('')

  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [avatar, setAvatar] = useState<string | null>(null)
  const [showCropper, setShowCropper] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setDisplayName(user.user_metadata.full_name || '')
        const base = user.user_metadata.full_name?.toLowerCase().replace(/\s/g, '_') || 'user'
        setSuggestions([`${base}_123`, `${base}_pro`, `the_${base}`])
      }
    }
    fetchUser()
  }, [])

  const checkUsername = async (val: string) => {
    setUsername(val)
    if (val.length < 3) {
      setUsernameError('')
      setIsUsernameValid(false)
      return
    }
    const { data } = await supabase.from('monkey_bio').select('username').eq('username', val.toLowerCase())
    if (data && data.length > 0) {
      setUsernameError('Username already taken in English')
      setIsUsernameValid(false)
    } else {
      setUsernameError('')
      setIsUsernameValid(true)
    }
  }

  const addSocialLink = () => {
    if (!activePlatform) return
    if (socialLinks.length >= 5) {
      setLinkError('Maximum 5 social links allowed only')
      return
    }
    const config = PLATFORMS[activePlatform]
    if (!config.pattern.test(tempLink)) {
      setLinkError(`Please enter a valid ${config.name} link`)
      return
    }
    setSocialLinks([...socialLinks, { platform: activePlatform, url: tempLink }])
    setTempLink('')
    setActivePlatform(null)
    setLinkError('')
  }

  const completeOnboarding = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const socialLinksObj = socialLinks.reduce((acc, curr) => {
      acc[curr.platform] = curr.url
      return acc
    }, {} as any)

    const { error } = await supabase.from('monkey_bio').insert({
      id: user.id,
      username: username.toLowerCase(),
      display_name: displayName,
      bio: bio,
      avatar_url: avatar,
      theme: selectedTheme,
      social_links: socialLinksObj,
      onboarding_completed: true,
      links: []
    })

    if (!error) window.location.href = '/dashboard'
  }

  return (
    <div className="min-h-screen bg-[#fdf2e3] flex flex-col md:flex-row">
      {/* Left Form */}
      <div className="flex-1 p-8 md:p-24 overflow-y-auto max-h-screen no-scrollbar">
        <div className="max-w-md mx-auto">
          <div className="text-secondary font-black text-3xl mb-12 flex items-center gap-2">
            Monkey <span className="text-primary text-4xl">*</span>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
                <div>
                   <h1 className="text-4xl font-black text-secondary leading-tight mb-4">Choose your unique username</h1>
                   <p className="text-secondary/60 font-bold">You can always change this later</p>
                </div>
                
                <div className="space-y-4">
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary/30 font-bold">monkey.link/</span>
                    <input 
                      type="text" 
                      value={username}
                      onChange={(e) => checkUsername(e.target.value)}
                      placeholder="username"
                      className={`w-full pl-[92px] pr-6 py-5 bg-white rounded-3xl border-2 transition-all outline-none font-bold text-lg ${usernameError ? 'border-red-400' : isUsernameValid ? 'border-primary' : 'border-transparent focus:border-primary/50'}`}
                    />
                  </div>
                  {usernameError && <p className="text-red-500 text-sm font-bold pl-2">{usernameError}</p>}
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {suggestions.map(s => (
                      <button key={s} onClick={() => checkUsername(s)} className="px-4 py-2 bg-white rounded-full text-xs font-bold border border-secondary/5 hover:border-primary transition-all">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  disabled={!isUsernameValid}
                  onClick={() => setStep(2)}
                  className="w-full py-5 bg-secondary text-white font-black rounded-full shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                >
                  Continue
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
                <div>
                   <h1 className="text-4xl font-black text-secondary leading-tight mb-4">Select a theme for your profile</h1>
                   <p className="text-secondary/60 font-bold">50+ Premium themes available</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {THEMES.map(theme => (
                    <button 
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme.id)}
                      className={`p-4 rounded-3xl border-4 transition-all flex flex-col items-center gap-3 ${selectedTheme === theme.id ? 'border-primary bg-white' : 'border-transparent bg-white/50 hover:bg-white'}`}
                    >
                       <div className={`w-full h-24 rounded-2xl ${theme.bg} shadow-inner`}></div>
                       <span className="font-bold text-sm">{theme.name}</span>
                    </button>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="flex-1 py-5 bg-white text-secondary font-black rounded-full border-2 border-secondary/5">Back</button>
                  <button onClick={() => setStep(3)} className="flex-[2] py-5 bg-secondary text-white font-black rounded-full shadow-xl">Select Theme</button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
                <div>
                   <h1 className="text-4xl font-black text-secondary leading-tight mb-4">Add your social media (Max 5)</h1>
                </div>

                <div className="space-y-6">
                   <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 max-h-[300px] overflow-y-auto p-2 no-scrollbar">
                      {Object.entries(PLATFORMS).map(([id, config]) => {
                        const isSelected = socialLinks.some(link => link.platform === id)
                        const isLimitReached = socialLinks.length >= 5
                        
                        return (
                          <button 
                            key={id}
                            disabled={isLimitReached && !isSelected}
                            onClick={() => setActivePlatform(id)}
                            className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${
                              activePlatform === id ? 'border-primary bg-primary/5' : 
                              isSelected ? 'border-primary/30 bg-white' :
                              'border-gray-50 bg-white hover:border-gray-200'
                            } ${isLimitReached && !isSelected ? 'opacity-30 cursor-not-allowed' : ''}`}
                          >
                            <i className={`fi ${config.icon} text-xl ${config.color}`}></i>
                            <span className="text-[8px] font-black text-gray-500 text-center truncate w-full">{config.name}</span>
                          </button>
                        )
                      })}
                   </div>
                   {socialLinks.length >= 5 && <p className="text-amber-500 text-xs font-bold text-center">Limit reached! You can only add up to 5 social icons.</p>}

                   {activePlatform && (
                     <div className="p-6 bg-white border border-gray-100 rounded-[32px] shadow-sm animate-fade-in">
                       <h3 className="font-black mb-4">Add {PLATFORMS[activePlatform].name}</h3>
                       <input 
                         type="text" 
                         value={tempLink}
                         onChange={(e) => setTempLink(e.target.value)}
                         placeholder={`Paste ${PLATFORMS[activePlatform].name} link here`}
                         className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-primary/20 mb-4 font-bold"
                       />
                       {linkError && <p className="text-red-500 text-xs font-bold mb-4">{linkError}</p>}
                       <div className="flex gap-3">
                         <button onClick={() => { setActivePlatform(null); setTempLink(''); }} className="flex-1 py-3 text-secondary font-bold">Cancel</button>
                         <button onClick={addSocialLink} className="flex-[2] py-3 bg-primary text-secondary font-black rounded-full">Add Icon</button>
                       </div>
                     </div>
                   )}

                   <div className="flex flex-wrap gap-3">
                     {socialLinks.map((sl, i) => (
                       <div key={i} className="px-4 py-2 bg-white rounded-full flex items-center gap-2 border border-primary/20">
                         <i className={`fi ${PLATFORMS[sl.platform].icon} ${PLATFORMS[sl.platform].color}`}></i>
                         <button onClick={() => setSocialLinks(socialLinks.filter((_, idx) => idx !== i))}>
                           <i className="fi fi-rr-cross-small"></i>
                         </button>
                       </div>
                     ))}
                   </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep(2)} className="flex-1 py-5 bg-white text-secondary font-black rounded-full border-2 border-secondary/5">Back</button>
                  <button onClick={() => setStep(4)} className="flex-[2] py-5 bg-secondary text-white font-black rounded-full">Continue</button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
                <div>
                   <h1 className="text-4xl font-black text-secondary leading-tight mb-4">Complete your profile</h1>
                </div>

                <div className="space-y-6">
                   <div className="flex items-center gap-6">
                      <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center border-4 border-white shadow-xl overflow-hidden group relative">
                        {avatar ? <img src={avatar} alt="Avatar" className="w-full h-full object-cover" /> : <i className="fi fi-rr-user text-3xl text-gray-200"></i>}
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                             const reader = new FileReader()
                             reader.onloadend = () => {
                               setSelectedImage(reader.result as string)
                               setShowCropper(true)
                             }
                             reader.readAsDataURL(file)
                          }
                        }} />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs font-black uppercase text-secondary/40 mb-2 block">Display Name</label>
                        <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full px-6 py-4 bg-white rounded-2xl outline-none border-2 border-transparent focus:border-primary/50 font-bold" />
                      </div>
                   </div>

                   <div>
                      <label className="text-xs font-black uppercase text-secondary/40 mb-2 block">Bio (Max 200 chars)</label>
                      <textarea maxLength={200} value={bio} onChange={(e) => setBio(e.target.value)} className="w-full px-6 py-4 bg-white rounded-3xl outline-none border-2 border-transparent focus:border-primary/50 font-bold h-32 resize-none" />
                      <p className="text-right text-[10px] font-bold text-secondary/40">{bio.length}/200</p>
                   </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep(3)} className="flex-1 py-5 bg-white text-secondary font-black rounded-full border-2 border-secondary/5">Back</button>
                  <button onClick={completeOnboarding} className="flex-[2] py-5 bg-primary text-secondary font-black rounded-full shadow-xl">Launch Profile</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Preview */}
      <div className="hidden md:flex flex-1 bg-white border-l border-secondary/5 items-center justify-center p-12">
        <div 
          className={`w-[320px] h-[650px] rounded-[52px] border-[12px] border-secondary shadow-2xl relative overflow-hidden flex flex-col items-center p-8 transition-all duration-500 ${(THEMES.find(t => t.id === selectedTheme) || THEMES[0]).bg} ${(THEMES.find(t => t.id === selectedTheme) || THEMES[0]).text}`}
          style={{
            ...((THEMES.find(t => t.id === selectedTheme) || THEMES[0]).id === 'grid-mocha' ? {
              backgroundImage: 'linear-gradient(#ffffff1a 1px, transparent 1px), linear-gradient(90deg, #ffffff1a 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            } : (THEMES.find(t => t.id === selectedTheme) || THEMES[0]).image ? {
              backgroundImage: `url(${(THEMES.find(t => t.id === selectedTheme) || THEMES[0]).image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            } : {})
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-secondary rounded-b-3xl"></div>
          
          <div className="w-20 h-20 rounded-full border-4 border-white/20 mb-6 overflow-hidden mt-8">
            {avatar ? <img src={avatar} alt="Avatar" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-primary/20" />}
          </div>
          
          <h2 className="text-xl font-black mb-1">{displayName || 'Your Name'}</h2>
          <p className="text-[10px] font-bold opacity-50 mb-6">@{username || 'username'}</p>
          
          {bio && <p className="text-[10px] text-center font-bold opacity-80 mb-6 line-clamp-3">{bio}</p>}

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {socialLinks.map((sl, i) => (
              <i key={i} className={`fi ${PLATFORMS[sl.platform].icon} text-xl`}></i>
            ))}
          </div>

          <div className="w-full space-y-3">
             <div className={`w-full py-4 rounded-2xl opacity-50 ${(THEMES.find(t => t.id === selectedTheme) || THEMES[0]).button}`}></div>
             <div className={`w-full py-4 rounded-2xl opacity-30 ${(THEMES.find(t => t.id === selectedTheme) || THEMES[0]).button}`}></div>
          </div>
        </div>
      </div>

      <ImageCropperModal 
        isOpen={showCropper}
        imageSrc={selectedImage}
        onClose={() => setShowCropper(false)}
        onCropComplete={(croppedImage) => setAvatar(croppedImage)}
      />
    </div>
  )
}
