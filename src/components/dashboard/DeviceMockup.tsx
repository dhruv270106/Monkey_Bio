'use client'

import { THEMES, Theme } from '@/data/themes'
import { PLATFORMS } from '@/data/platforms'
import { APPS } from '@/data/apps'

interface DeviceMockupProps {
  userProfile: any
  links: any[]
  socialLinks: any
  scale?: number
  yOffset?: number
}

// Patterns used for custom background
const PATTERNS = [
  { id: 'grid', css: 'radial-gradient(rgba(0,0,0,0.1) 1px, transparent 1px)', size: '20px 20px' },
  { id: 'dots', css: 'radial-gradient(rgba(0,0,0,0.2) 2px, transparent 2px)', size: '30px 30px' },
  { id: 'diagonal', css: 'linear-gradient(45deg, rgba(0,0,0,0.05) 25%, transparent 25%, transparent 50%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.05) 75%, transparent 75%, transparent)', size: '20px 20px' },
  { id: 'waves', css: 'repeating-radial-gradient(circle at 0 0, transparent 0, rgba(0,0,0,0.05) 10px), repeating-radial-gradient(circle at 100% 100%, transparent 0, rgba(0,0,0,0.05) 10px)', size: '40px 40px' }
]

export default function DeviceMockup({ userProfile, links = [], socialLinks = {}, scale = 1, yOffset = 0 }: DeviceMockupProps) {
  // Ensure we have a valid theme even if userProfile is missing
  const selectedTheme = (THEMES.find(t => t.id === userProfile?.theme) || THEMES[0]) as Theme

  const getButtonStyle = () => {
    const variant = userProfile?.button_variant || 'solid'
    const radius = userProfile?.button_radius || 'xl'
    const customBg = userProfile?.custom_button_bg || (selectedTheme.button.includes('bg-white') ? '#ffffff' : '#000000')
    const customColor = userProfile?.font_color || (selectedTheme.text.includes('white') ? '#ffffff' : '#000000')
    const borderColor = userProfile?.button_border_color || '#000000'
    const borderWidth = userProfile?.button_border_width || 0
    const shadowColor = userProfile?.button_shadow_color || 'transparent'

    let baseStyle: any = {
      fontFamily: userProfile?.font_family || 'inherit',
      color: customColor,
      borderRadius: radius === 'none' ? '0px' : radius === 'md' ? '12px' : radius === 'xl' ? '24px' : '9999px',
      border: borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : 'none',
      boxShadow: shadowColor !== 'transparent' ? `4px 4px 0px ${shadowColor}` : 'none',
    }

    if (variant === 'outline') {
      baseStyle = {
        ...baseStyle,
        backgroundColor: 'transparent',
        border: `${borderWidth || 2}px solid ${customBg}`,
      }
    } else if (variant === 'glass') {
      baseStyle = {
        ...baseStyle,
        backgroundColor: `${customBg}20`,
        backdropFilter: 'blur(8px)',
        border: borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : '1px solid rgba(255,255,255,0.1)',
      }
    } else {
      baseStyle = {
        ...baseStyle,
        backgroundColor: customBg,
      }
    }

    return baseStyle
  }

  const getBackgroundStyle = () => {
    let style: any = {}
    const pattern = userProfile?.custom_bg_pattern || ''

    if (userProfile?.theme !== 'custom') {
       if (selectedTheme.image) {
         style.backgroundImage = `url(${selectedTheme.image})`
         style.backgroundSize = 'cover'
         style.backgroundPosition = 'center'
       }
    } else {
      const type = userProfile?.custom_bg_type || 'color'
      const value = userProfile?.custom_bg || '#6A373A'

      // Base Layer (Color/Gradient/Image)
      if (type === 'color') style.backgroundColor = value
      else if (type === 'gradient') {
        if (typeof value === 'string' && value.includes('linear-gradient')) style.backgroundImage = value
        else {
          const direction = userProfile?.custom_bg_direction || 'linear-up'
          const dirMap: any = { 'linear-up': 'to top', 'linear-down': 'to bottom', 'radial': 'radial' }
          const dir = dirMap[direction] || 'to top'
          const endColor = userProfile?.custom_bg_end || '#00000066'
          if (dir === 'radial') style.backgroundImage = `radial-gradient(circle, ${value}, ${endColor})`
          else style.backgroundImage = `linear-gradient(${dir}, ${value}, ${endColor})`
        }
      }
      else if (type === 'image') {
        style.backgroundImage = `url(${value})`
        style.backgroundSize = 'cover'
        style.backgroundPosition = 'center'
      }
    }

    // Pattern Overlay (Additive)
    if (pattern) {
      const p = PATTERNS.find(pat => pat.id === pattern)
      if (p) {
        if (style.backgroundImage) {
          style.backgroundImage = `${p.css}, ${style.backgroundImage}`
          style.backgroundSize = `${p.size}, ${style.backgroundSize || 'auto'}`
        } else {
          style.backgroundImage = p.css
          style.backgroundSize = p.size
        }
      }
    }

    return style
  }

  return (
    <div 
      className={`w-full max-w-[280px] aspect-[9/18.5] rounded-[44px] border-[10px] border-[#020617] shadow-2xl relative overflow-hidden flex flex-col items-center transition-all duration-500 origin-center ${selectedTheme.text}`}
      style={{ transform: `scale(${scale}) translateY(${yOffset}px)` }}
    >
        {/* Background Layer with Blur */}
        <div 
          className={`absolute inset-0 transition-all duration-700 ${selectedTheme.bg} overflow-hidden`}
          style={{
            filter: userProfile?.bg_blur ? `blur(${userProfile.bg_blur}px)` : 'none',
            transform: userProfile?.bg_blur ? 'scale(1.1)' : 'scale(1)',
            willChange: 'transform, filter',
            ...getBackgroundStyle()
          }}
        >
          {/* Noise Grain Overlay */}
          {userProfile?.custom_bg_noise && (
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>
          )}
          {((userProfile?.theme === 'custom' && userProfile?.custom_bg_type === 'video') || selectedTheme.video) && (
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={userProfile?.theme === 'custom' ? undefined : (selectedTheme.image || undefined)}
              className="absolute inset-0 w-full h-full object-cover"
              key={(userProfile?.theme === 'custom' ? userProfile?.custom_bg : selectedTheme.video) || 'no-video'}
            >
              <source src={userProfile?.theme === 'custom' ? userProfile?.custom_bg : selectedTheme.video} type="video/mp4" />
            </video>
          )}
        </div>

        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#020617] rounded-b-[16px] z-50"></div>
        
        {/* Asterisk top left */}
        <div className="absolute top-8 left-6 w-6 h-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/10 z-20">
          <span className="text-white text-[10px] font-black">*</span>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full h-full overflow-y-auto no-scrollbar flex flex-col items-center p-8 pt-12 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-white/20 mb-6 overflow-hidden shadow-lg flex-shrink-0">
              <img 
                src={userProfile?.avatar_url || `https://ui-avatars.com/api/?name=${userProfile?.display_name || 'U'}&background=6cf383&color=0f172a`} 
                className="w-full h-full object-cover" 
                alt=""
              />
            </div>
            
            <h3 
              className="font-black text-xl mb-1 tracking-tight"
              style={{ 
                fontFamily: userProfile?.font_family || 'inherit',
                color: userProfile?.font_color || 'inherit'
              }}
            >
              {userProfile?.display_name || 'Your Name'}
            </h3>
            <h3 className="text-[10px] font-bold opacity-70 mb-4 tracking-tighter">@{userProfile?.username || 'username'}</h3>

            <p 
              className="text-[11px] text-center px-4 mb-6 opacity-80 font-bold leading-relaxed break-words w-full"
              style={{ 
                fontFamily: userProfile?.font_family || 'inherit',
                color: userProfile?.font_color || 'inherit',
                fontSize: userProfile?.font_size || '11px'
              }}
            >
              {userProfile?.bio}
            </p>

            {/* Social Icons Row */}
            <div className="flex flex-wrap justify-center gap-4 mb-10 w-full animate-fade-in">
              {socialLinks && typeof socialLinks === 'object' && Object.entries(socialLinks).slice(0, 5).map(([platform, url]: [string, any]) => (
                url && (
                  <div 
                    key={platform} 
                    className="transition-transform hover:scale-125"
                    style={{ color: userProfile?.font_color || 'inherit' }}
                  >
                      <i className={`fi ${PLATFORMS[platform]?.icon || 'fi-rr-link'} text-2xl`}></i>
                  </div>
                )
              ))}
            </div>

            {/* Regular Links */}
            {/* All Links and Content Assets */}
            <div className="w-full space-y-4">
              {Array.isArray(links) && links.filter((l: any) => l.active).map((link: any, i: number) => {
                const appInfo = APPS.find(a => a.id === link.platform)
                const type = appInfo?.type || 'link'
                
                // FEATURED MEDIA / FILE
                if (type === 'media' || type === 'file' || link.layout === 'featured') {
                  return (
                    <div key={link.id || i} className="w-full rounded-[24px] overflow-hidden shadow-sm border border-black/5 flex flex-col bg-white/5 backdrop-blur-sm" style={getButtonStyle()}>
                       <div className="w-full aspect-video bg-black/5 overflow-hidden">
                          <img src={link.thumbnail || 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400'} className="w-full h-full object-cover" />
                       </div>
                       <div className="p-4 text-center">
                          <p className="text-[11px] font-black">{link.title}</p>
                       </div>
                    </div>
                  )
                }

                // TEXT ASSET
                if (type === 'text') {
                   return (
                      <div key={link.id || i} className="w-full p-6 bg-white/5 backdrop-blur-sm rounded-[24px] text-center" style={{ color: userProfile?.font_color || 'inherit' }}>
                         <h4 className="text-[12px] font-black uppercase tracking-widest mb-2">{link.title}</h4>
                         <p className="text-[10px] font-bold opacity-70 leading-relaxed">{link.description || 'Custom text content...'}</p>
                      </div>
                   )
                }

                // FORM ASSET
                if (type === 'form') {
                   return (
                      <div key={link.id || i} className="w-full p-5 bg-white/5 backdrop-blur-sm rounded-[24px] space-y-3" style={getButtonStyle()}>
                         <p className="text-[11px] font-black text-center">{link.title}</p>
                         <div className="h-10 bg-black/5 rounded-xl border border-black/5 flex items-center px-4">
                            <span className="text-[9px] font-bold opacity-30">Enter your email...</span>
                         </div>
                         <button className="w-full py-2.5 rounded-xl bg-black/10 text-[10px] font-black uppercase tracking-widest">Submit</button>
                      </div>
                   )
                }

                // AUDIO ASSET
                if (type === 'audio') {
                   return (
                      <div key={link.id || i} className="w-full p-4 flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-[24px]" style={getButtonStyle()}>
                         <div className="w-10 h-10 rounded-xl bg-black/10 flex items-center justify-center">
                            <i className="fi fi-rr-play text-xs"></i>
                         </div>
                         <div className="flex-1 text-left min-w-0">
                            <p className="text-[11px] font-black truncate">{link.title}</p>
                            <p className="text-[9px] font-bold opacity-50 uppercase tracking-widest">Listen on {appInfo?.title || 'Platform'}</p>
                         </div>
                         <i className={`fi ${appInfo?.icon || 'fi-rr-music'} opacity-30`}></i>
                      </div>
                   )
                }

                // STANDARD LINK
                return (
                  <a 
                    key={link.id || i} 
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full transition-all text-[11px] font-bold shadow-sm flex items-center py-3 px-4 group cursor-pointer"
                    style={getButtonStyle()}
                  >
                        <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0 border border-black/5 bg-black/10">
                           {link.thumbnail ? (
                             <img src={link.thumbnail} className="w-full h-full object-cover" />
                           ) : (
                             <i className={`fi ${appInfo?.icon || 'fi-rr-link'} text-[12px] opacity-70`}></i>
                           )}
                        </div>
                        <span className="flex-1 text-center truncate px-2">{link.title}</span>
                        <div className="w-5 opacity-30 flex items-center justify-center">
                           <i className="fi fi-rr-menu-dots-vertical text-[10px]"></i>
                        </div>
                  </a>
                )
              })}
              {(!Array.isArray(links) || links.filter((l: any) => l.active).length === 0) && (
                <div className="space-y-3 w-full opacity-10">
                  <div className={`w-full h-12 rounded-xl ${selectedTheme.button}`}></div>
                  <div className={`w-full h-12 rounded-xl ${selectedTheme.button}`}></div>
                </div>
              )}
            </div>

            <div className="mt-auto pt-12 mb-2 w-full flex flex-col items-center gap-6">
                <button className="px-6 py-2.5 bg-white text-secondary text-[10px] font-black rounded-full shadow-xl transform active:scale-95 transition-all">
                  Join {userProfile?.username || 'user'} on Monkey
                </button>
                <div className="flex items-center gap-2 text-[8px] font-bold opacity-40 uppercase tracking-widest">
                  <span>Report</span>
                  <span>•</span>
                  <span>Privacy</span>
                </div>
            </div>
        </div>
    </div>
  )
}
