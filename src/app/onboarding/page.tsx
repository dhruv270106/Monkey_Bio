'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { THEMES } from '@/data/themes'
import debounce from 'lodash.debounce'
import ReactCrop, { Crop, centerCrop, makeAspectCrop, PixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

// --- Types ---
interface SocialLink {
  platform: string
  handle: string
  url: string
}

interface PlatformConfig {
  name: string
  icon: string
  color: string
  pattern: RegExp
  placeholder: string
}

const PLATFORMS: Record<string, PlatformConfig> = {
  instagram: { name: 'Instagram', icon: 'fi-brands-instagram', color: 'text-pink-600', pattern: /instagram\.com\//, placeholder: 'https://instagram.com/yourname' },
  youtube: { name: 'YouTube', icon: 'fi-brands-youtube', color: 'text-red-600', pattern: /youtube\.com\//, placeholder: 'https://youtube.com/@channel' },
  tiktok: { name: 'TikTok', icon: 'fi-brands-tiktok', color: 'text-black', pattern: /tiktok\.com\//, placeholder: 'https://tiktok.com/@yourname' },
  twitter: { name: 'X (Twitter)', icon: 'fi-brands-twitter', color: 'text-gray-900', pattern: /(twitter\.com|x\.com)\//, placeholder: 'https://x.com/yourname' },
  linkedin: { name: 'LinkedIn', icon: 'fi-brands-linkedin', color: 'text-blue-700', pattern: /linkedin\.com\//, placeholder: 'https://linkedin.com/in/yourname' },
  facebook: { name: 'Facebook', icon: 'fi-brands-facebook', color: 'text-blue-600', pattern: /facebook\.com\//, placeholder: 'https://facebook.com/yourname' },
}

// --- Helper for Profile Preview ---
const ProfilePreview = ({ username, theme, avatar, bio, socialLinks, displayName }: any) => {
  const selectedTheme = THEMES.find(t => t.id === theme) || THEMES[0]
  
  return (
    <div className={`w-[280px] h-[550px] rounded-[3rem] border-[8px] border-secondary overflow-hidden flex flex-col items-center p-6 relative shadow-2xl transition-all duration-500 ${selectedTheme.bg} ${selectedTheme.text}`}>
       {/* Notch */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-secondary rounded-b-xl z-10" />
       
       <div className="mt-8 flex flex-col items-center w-full">
          <div className="w-20 h-20 rounded-full border-2 border-primary/20 bg-gray-100 mb-4 overflow-hidden">
             {avatar ? <img src={avatar} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-400"><i className="fi fi-rr-user text-2xl"></i></div>}
          </div>
          <h3 className="font-bold text-lg leading-tight text-center">{displayName || `@${username || 'username'}`}</h3>
          <p className="text-[10px] opacity-70 mb-6">@{username || 'username'}</p>
          
          <div className="w-full space-y-3 px-2">
             <div className={`w-full py-3 rounded-xl text-center text-xs font-bold shadow-sm ${selectedTheme.button}`}>Sample Link</div>
             <div className={`w-full py-3 rounded-xl text-center text-xs font-bold shadow-sm ${selectedTheme.button}`}>Portfolio</div>
          </div>
          
          {bio && <p className="mt-6 text-[10px] text-center px-4 leading-relaxed opacity-80">{bio}</p>}
          
          <div className="flex flex-wrap justify-center gap-3 mt-8">
             {socialLinks.map((s: any, i: number) => (
                <i key={i} className={`fi ${PLATFORMS[s.platform]?.icon} text-lg`}></i>
             ))}
          </div>
       </div>

       <div className="mt-auto mb-2 opacity-30 flex items-center gap-1">
          <span className="text-[10px] font-black">Monkey</span>
          <span className="text-primary text-xs">*</span>
       </div>
    </div>
  )
}

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  
  // States
  const [username, setUsername] = useState('')
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle')
  const [suggestions, setSuggestions] = useState<string[]>([])
  
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0].id)
  
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])
  const [activePlatform, setActivePlatform] = useState<string | null>(null)
  const [tempLink, setTempLink] = useState('')
  const [linkError, setLinkError] = useState('')
  
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [avatar, setAvatar] = useState<string | null>(null)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [imgSrc, setImgSrc] = useState('')
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        window.location.href = '/login'
        return
      }
      setUserId(session.user.id)
      const name = session.user.user_metadata.full_name || session.user.user_metadata.name || ''
      setDisplayName(name)
      if (name) {
        const base = name.toLowerCase().replace(/\s+/g, '')
        setSuggestions([base, `${base}_${Math.floor(Math.random() * 99)}`, `${base}.${Math.floor(Math.random() * 999)}`])
      }
    }
    init()
  }, [])

  // --- Step 1: Username Logic ---
  const checkUsername = useCallback(
    debounce(async (val: string) => {
      if (val.length < 3) {
        setUsernameStatus('idle')
        return
      }
      setUsernameStatus('checking')
      const { data } = await supabase.from('monkey_bio').select('username').eq('username', val.toLowerCase()).single()
      setUsernameStatus(data ? 'taken' : 'available')
    }, 500),
    []
  )

  const handleUsernameChange = (val: string) => {
    const cleaned = val.replace(/[^a-zA-Z0-9_.]/g, '').toLowerCase()
    setUsername(cleaned)
    checkUsername(cleaned)
  }

  // --- Step 2: Theme Selection ---
  // No complex logic, just state

  // --- Step 3: Social Links Logic ---
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
    const newLink: SocialLink = { platform: activePlatform, handle: '', url: tempLink }
    setSocialLinks([...socialLinks, newLink])
    setActivePlatform(null)
    setTempLink('')
    setLinkError('')
  }

  // --- Step 4: Profile & Bio Logic ---
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''))
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const getCroppedImg = () => {
    if (!completedCrop || !imgRef.current) return
    const canvas = document.createElement('canvas')
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height
    canvas.width = completedCrop.width
    canvas.height = completedCrop.height
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.drawImage(
        imgRef.current,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width,
        completedCrop.height
      )
      setAvatar(canvas.toDataURL('image/jpeg'))
      setImgSrc('')
    }
  }

  const handleFinalSubmit = async () => {
    if (!userId) return
    setLoading(true)
    
    // Format social links object
    const socialObj: Record<string, string> = {}
    socialLinks.forEach(s => {
      socialObj[s.platform] = s.url
    })

    const { error } = await supabase
      .from('monkey_bio')
      .upsert({
        id: userId,
        username: username,
        display_name: displayName,
        bio: bio,
        avatar_url: avatar,
        theme: selectedTheme,
        social_links: socialObj,
        onboarding_completed: true,
        links: []
      })

    if (error) {
      alert(error.message)
      setLoading(false)
    } else {
      window.location.href = '/dashboard'
    }
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col lg:flex-row">
      {/* LEFT: FORM SIDE */}
      <div className="flex-1 p-8 lg:p-24 overflow-y-auto max-h-screen no-scrollbar">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center gap-2 mb-16">
            <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-secondary font-bold text-xl">M</span>
            <span className="font-bold text-xl tracking-tight text-secondary">Monkey</span>
          </div>

          <AnimatePresence mode="wait">
            {/* STEP 1: USERNAME */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h1 className="text-4xl font-black text-secondary mb-4">Choose your link name</h1>
                <p className="text-gray-500 font-medium mb-12">This will be your unique URL on Monkey. You can change it later.</p>
                
                <div className="space-y-6">
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg">monkey.link/</span>
                    <input 
                      type="text" 
                      value={username}
                      onChange={(e) => handleUsernameChange(e.target.value)}
                      className={`w-full pl-36 pr-6 py-5 bg-white border-2 rounded-[24px] outline-none font-bold text-lg transition-all shadow-sm ${
                        usernameStatus === 'available' ? 'border-primary' : 
                        usernameStatus === 'taken' ? 'border-red-400' : 'border-transparent focus:border-primary/50'
                      }`}
                      placeholder="username"
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2">
                      {usernameStatus === 'checking' && <i className="fi fi-rr-spinner animate-spin text-gray-400"></i>}
                      {usernameStatus === 'available' && <i className="fi fi-rr-check-circle text-primary text-xl"></i>}
                      {usernameStatus === 'taken' && <i className="fi fi-rr-cross-circle text-red-400 text-xl"></i>}
                    </div>
                  </div>

                  {usernameStatus === 'taken' && (
                    <p className="text-red-500 text-sm font-bold flex items-center gap-2 px-2">
                       <i className="fi fi-rr-exclamation"></i> Username already taken in English
                    </p>
                  )}

                  <div className="pt-4">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Suggestions</p>
                    <div className="flex flex-wrap gap-3">
                      {suggestions.map((s, i) => (
                        <button 
                          key={i} 
                          onClick={() => handleUsernameChange(s)}
                          className="px-4 py-2 bg-white border border-gray-100 rounded-full text-sm font-bold hover:border-primary transition-all shadow-sm"
                        >
                          @{s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    disabled={usernameStatus !== 'available'}
                    onClick={() => setStep(2)}
                    className="w-full py-5 bg-secondary text-white font-black rounded-full hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-12 shadow-xl"
                  >
                    Next Step <i className="fi fi-rr-arrow-right ml-2"></i>
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: THEMES */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h1 className="text-4xl font-black text-secondary mb-4">Pick a theme</h1>
                <p className="text-gray-500 font-medium mb-12">Select from 50 unique styles to match your personality.</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto p-2 no-scrollbar border-b border-gray-100">
                  {THEMES.map((theme) => (
                    <button 
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme.id)}
                      className={`relative aspect-[4/5] rounded-3xl overflow-hidden border-4 transition-all ${
                        selectedTheme === theme.id ? 'border-primary ring-4 ring-primary/20 scale-95' : 'border-transparent'
                      }`}
                    >
                      <div className={`w-full h-full ${theme.bg} flex flex-col p-4`}>
                         <div className={`w-full h-2 rounded-full mb-2 opacity-20 ${theme.button.includes('bg-white') ? 'bg-black' : 'bg-white'}`} />
                         <div className={`w-full h-2 rounded-full mb-2 opacity-20 ${theme.button.includes('bg-white') ? 'bg-black' : 'bg-white'}`} style={{ width: '70%' }} />
                         <div className="mt-auto flex gap-1">
                            <div className="w-4 h-4 rounded-full border border-black/10" style={{ background: theme.accent }} />
                            <span className="text-[8px] font-bold opacity-50 truncate">{theme.name}</span>
                         </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex gap-4 mt-12">
                   <button onClick={() => setStep(1)} className="flex-1 py-5 border-2 border-gray-100 font-black rounded-full hover:bg-white">Back</button>
                   <button onClick={() => setStep(3)} className="flex-[2] py-5 bg-secondary text-white font-black rounded-full hover:bg-gray-800 shadow-xl">Continue <i className="fi fi-rr-arrow-right ml-2"></i></button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: SOCIAL MEDIA */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h1 className="text-4xl font-black text-secondary mb-4">Add your socials</h1>
                <p className="text-gray-500 font-medium mb-12">Connect your other platforms to your Monkey profile.</p>

                <div className="space-y-6">
                   <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                      {Object.entries(PLATFORMS).map(([id, config]) => {
                        const isSelected = socialLinks.some(link => link.platform === id)
                        const isLimitReached = socialLinks.length >= 5
                        
                        return (
                          <button 
                            key={id}
                            disabled={isLimitReached && !isSelected}
                            onClick={() => setActivePlatform(id)}
                            className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                              activePlatform === id ? 'border-primary bg-primary/5' : 
                              isSelected ? 'border-primary/30 bg-white' :
                              'border-gray-50 bg-white hover:border-gray-200'
                            } ${isLimitReached && !isSelected ? 'opacity-30 cursor-not-allowed' : ''}`}
                          >
                            <i className={`fi ${config.icon} text-2xl ${config.color}`}></i>
                            <span className="text-[10px] font-bold text-gray-500">{config.name}</span>
                          </button>
                        )
                      })}
                   </div>
                   {socialLinks.length >= 5 && <p className="text-amber-500 text-xs font-bold text-center">Limit reached! You can only add up to 5 social icons.</p>}

                   {activePlatform && (
                     <div className="p-6 bg-white border border-gray-100 rounded-[32px] shadow-sm animate-fade-in">
                        <div className="flex items-center gap-4 mb-4">
                           <i className={`fi ${PLATFORMS[activePlatform].icon} text-3xl ${PLATFORMS[activePlatform].color}`}></i>
                           <h4 className="font-bold">Add {PLATFORMS[activePlatform].name}</h4>
                        </div>
                        <div className="space-y-4">
                           <input 
                             type="url" 
                             placeholder={PLATFORMS[activePlatform].placeholder}
                             value={tempLink}
                             onChange={(e) => setTempLink(e.target.value)}
                             className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-primary/50 outline-none font-medium"
                           />
                           {linkError && <p className="text-red-500 text-xs font-bold px-2">{linkError}</p>}
                           <div className="flex gap-3">
                              <button onClick={() => setActivePlatform(null)} className="flex-1 py-3 text-sm font-bold text-gray-400">Cancel</button>
                              <button onClick={addSocialLink} className="flex-1 py-3 bg-secondary text-white font-bold rounded-xl active:scale-95 transition-all">Add Link</button>
                           </div>
                        </div>
                     </div>
                   )}

                   <div className="space-y-3">
                      {socialLinks.map((link, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white border border-gray-50 rounded-2xl shadow-sm">
                           <div className="flex items-center gap-3">
                              <i className={`fi ${PLATFORMS[link.platform].icon} text-lg ${PLATFORMS[link.platform].color}`}></i>
                              <span className="text-xs font-bold text-gray-600 truncate max-w-[200px]">{link.url}</span>
                           </div>
                           <button onClick={() => setSocialLinks(socialLinks.filter((_, idx) => idx !== i))} className="text-gray-300 hover:text-red-400 transition-colors"><i className="fi fi-rr-trash"></i></button>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="flex gap-4 mt-12">
                   <button onClick={() => setStep(2)} className="flex-1 py-5 border-2 border-gray-100 font-black rounded-full hover:bg-white">Back</button>
                   <button onClick={() => setStep(4)} className="flex-[2] py-5 bg-secondary text-white font-black rounded-full hover:bg-gray-800 shadow-xl">Continue <i className="fi fi-rr-arrow-right ml-2"></i></button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: PROFILE & BIO */}
            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h1 className="text-4xl font-black text-secondary mb-4">Complete your profile</h1>
                <p className="text-gray-500 font-medium mb-12">Add a face to your name and a short bio about what you do.</p>

                <div className="space-y-8">
                   <div className="flex flex-col items-center gap-6">
                      <div className="relative group">
                         <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl bg-gray-100 overflow-hidden relative">
                            {avatar ? <img src={avatar} className="w-full h-full object-cover" alt="" /> : <div className="w-full h-full flex items-center justify-center text-gray-300"><i className="fi fi-rr-user text-4xl"></i></div>}
                            <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer text-white">
                               <input type="file" accept="image/*" className="hidden" onChange={onSelectFile} />
                               <i className="fi fi-rr-camera"></i>
                            </label>
                         </div>
                      </div>
                      <p className="text-xs font-bold text-gray-400">Click to upload & crop profile picture</p>
                   </div>

                   {imgSrc && (
                     <div className="fixed inset-0 z-[100] bg-black/80 flex flex-col items-center justify-center p-8">
                        <div className="bg-white rounded-[32px] p-8 max-w-lg w-full">
                           <h3 className="font-bold text-xl mb-6">Crop Image</h3>
                           <div className="max-h-[400px] overflow-hidden rounded-2xl bg-gray-100">
                             <ReactCrop crop={crop} onChange={c => setCrop(c)} onComplete={c => setCompletedCrop(c)} aspect={1}>
                                <img ref={imgRef} src={imgSrc} alt="Crop" onLoad={() => {
                                  const { width, height } = imgRef.current!
                                  const cropConfig = centerCrop(makeAspectCrop({ unit: '%', width: 90 }, 1, width, height), width, height)
                                  setCrop(cropConfig)
                                }} />
                             </ReactCrop>
                           </div>
                           <div className="flex gap-4 mt-8">
                              <button onClick={() => setImgSrc('')} className="flex-1 py-4 border-2 rounded-2xl font-bold">Cancel</button>
                              <button onClick={getCroppedImg} className="flex-1 py-4 bg-secondary text-white rounded-2xl font-bold">Apply Crop</button>
                           </div>
                        </div>
                     </div>
                   )}

                   <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Bio</label>
                      <div className="relative">
                        <textarea 
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          className={`w-full p-6 bg-white border-2 rounded-[24px] outline-none font-medium text-lg transition-all shadow-sm h-32 no-scrollbar ${
                            bio.length > 200 ? 'border-red-400' : 'border-transparent focus:border-primary/50'
                          }`}
                          placeholder="Tell us about yourself..."
                        />
                        <div className={`absolute bottom-6 right-6 text-xs font-bold ${bio.length > 200 ? 'text-red-500' : 'text-gray-300'}`}>
                          {bio.length}/200
                        </div>
                      </div>
                      {bio.length > 200 && <p className="text-red-500 text-xs font-bold px-2 mt-2">Maximum 200 characters only allowed</p>}
                   </div>
                </div>

                <div className="flex gap-4 mt-12">
                   <button onClick={() => setStep(3)} className="flex-1 py-5 border-2 border-gray-100 font-black rounded-full hover:bg-white">Back</button>
                   <button 
                     disabled={bio.length > 200}
                     onClick={() => setStep(5)} 
                     className="flex-[2] py-5 bg-secondary text-white font-black rounded-full hover:bg-gray-800 shadow-xl disabled:opacity-50"
                   >
                     Continue <i className="fi fi-rr-arrow-right ml-2"></i>
                   </button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: REVIEW */}
            {step === 5 && (
              <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h1 className="text-4xl font-black text-secondary mb-4">You&apos;re ready!</h1>
                <p className="text-gray-500 font-medium mb-12">Confirm your profile details and jump into your dashboard.</p>

                <div className="p-8 bg-primary/10 rounded-[40px] border border-primary/20 space-y-6">
                   <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden">
                        {avatar && <img src={avatar} className="w-full h-full object-cover" alt="" />}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{displayName || username}</h3>
                        <p className="text-gray-400 font-bold">@{username}</p>
                      </div>
                   </div>

                   {bio && <p className="text-gray-600 font-medium italic border-l-4 border-primary pl-4">{bio}</p>}

                   <div className="flex flex-wrap gap-2 pt-4">
                      {socialLinks.map((s, i) => (
                        <div key={i} className="px-3 py-1 bg-white rounded-full text-[10px] font-bold text-gray-500 border border-gray-100">
                           {PLATFORMS[s.platform].name}
                        </div>
                      ))}
                   </div>
                </div>

                <button 
                  disabled={loading}
                  onClick={handleFinalSubmit}
                  className="w-full py-5 bg-primary text-secondary font-black rounded-full hover:bg-primary-dark transition-all mt-12 shadow-[0_12px_40px_rgba(108,243,131,0.3)] flex items-center justify-center gap-2"
                >
                  {loading ? <i className="fi fi-rr-spinner animate-spin"></i> : 'Go to Dashboard'}
                </button>
                <button onClick={() => setStep(4)} className="w-full py-4 text-sm font-bold text-gray-400 mt-2">Back to edit profile</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* RIGHT: PREVIEW SIDE */}
      <div className="hidden lg:flex lg:w-[450px] bg-white border-l border-gray-100 items-center justify-center sticky top-0 h-screen overflow-hidden">
         <div className="absolute inset-0 bg-[#fcfcfc] opacity-50" />
         
         <div className="relative">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary/20 rounded-full animate-bounce-slow" />
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-blue-100 rounded-full animate-pulse" />
            
            <ProfilePreview 
              username={username}
              theme={selectedTheme}
              avatar={avatar}
              bio={bio}
              socialLinks={socialLinks}
              displayName={displayName}
            />
         </div>

         <div className="absolute top-8 right-8 px-4 py-2 bg-gray-50 rounded-full border border-gray-100 flex items-center gap-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Live Preview</span>
         </div>
      </div>
    </div>
  )
}
