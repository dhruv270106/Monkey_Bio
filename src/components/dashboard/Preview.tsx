'use client'

import { THEMES, Theme } from '@/data/themes'
import { PLATFORMS } from '@/data/platforms'
import { APPS } from '@/data/apps'
import { useDomain } from '@/hooks/useDomain'

interface PreviewProps {
  userProfile: any
  links: any[]
  socialLinks: any
}

export default function Preview({ userProfile, links, socialLinks }: PreviewProps) {
  const domain = useDomain()
  const selectedTheme = (THEMES.find(t => t.id === userProfile?.theme) || THEMES[0]) as Theme

  const getButtonStyle = () => {
    const variant = userProfile?.button_variant || 'solid'
    const radius = userProfile?.button_radius || 'xl'
    const customBg = userProfile?.custom_button_bg || (selectedTheme.button.includes('bg-white') ? '#ffffff' : '#000000')
    const customColor = userProfile?.font_color || (selectedTheme.text.includes('white') ? '#ffffff' : '#000000')

    let baseStyle: any = {
      fontFamily: userProfile?.font_family || 'inherit',
      color: customColor,
      borderRadius: radius === 'none' ? '0px' : radius === 'md' ? '12px' : radius === 'xl' ? '24px' : '9999px',
    }

    if (variant === 'outline') {
      baseStyle = {
        ...baseStyle,
        backgroundColor: 'transparent',
        border: `2px solid ${customBg}`,
      }
    } else if (variant === 'glass') {
      baseStyle = {
        ...baseStyle,
        backgroundColor: `${customBg}20`,
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.1)',
      }
    } else {
      baseStyle = {
        ...baseStyle,
        backgroundColor: customBg,
      }
    }

    return baseStyle
  }

  return (
    <aside className="w-[480px] bg-white border-l border-gray-100 hidden lg:flex flex-col items-center flex-shrink-0 relative h-screen sticky top-0 overflow-hidden">
      {/* Dynamic Font Loader */}
      {userProfile?.font_family && (
        <link 
          href={`https://fonts.googleapis.com/css2?family=${userProfile.font_family.replace(/ /g, '+')}:wght@400;700;900&display=swap`} 
          rel="stylesheet" 
        />
      )}
      {/* Search/URL simulation */}
      <div className="w-full p-8 flex items-center justify-center gap-3">
          <div className="bg-gray-100 flex items-center rounded-xl p-1 w-full max-w-sm">
              <span className="px-4 text-[10px] font-bold text-gray-400 truncate">
                {domain}/{userProfile?.username || 'user'}
              </span>
              <button 
                onClick={() => {
                  const url = `https://${domain}/${userProfile?.username}`
                  if (navigator.share) {
                    navigator.share({
                      title: userProfile?.display_name || 'Monkey Bio',
                      url: url
                    }).catch(() => {})
                  } else {
                    navigator.clipboard.writeText(url)
                    alert('Link copied to clipboard!')
                  }
                }}
                className="p-2 bg-white rounded-lg shadow-sm ml-auto flex items-center justify-center hover:bg-primary hover:text-white transition-all active:scale-90"
              >
                <i className="fi fi-rr-share text-[10px]"></i>
              </button>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 flex-shrink-0 flex items-center justify-center active:rotate-180 transition-all duration-500"
          >
            <i className="fi fi-rr-refresh text-xs text-gray-400"></i>
          </button>
      </div>

      {/* iPhone Mockup */}
      <div className="flex-1 w-full flex items-center justify-center p-8 relative overflow-hidden">
          <div 
            className={`w-full max-w-[280px] aspect-[9/18.5] rounded-[44px] border-[10px] border-[#020617] shadow-2xl relative overflow-hidden flex flex-col items-center transform scale-90 xxl:scale-100 transition-all duration-500 origin-center ${selectedTheme.text}`}
          >
             {/* Background Layer with Blur */}
             <div 
               className={`absolute inset-0 transition-all duration-700 ${selectedTheme.bg} overflow-hidden`}
               style={{
                 filter: userProfile?.bg_blur ? `blur(${userProfile.bg_blur}px)` : 'none',
                 transform: userProfile?.bg_blur ? 'scale(1.1)' : 'scale(1)',
                 ...(selectedTheme.grid && !selectedTheme.video ? {
                   backgroundImage: selectedTheme.text.includes('white') 
                     ? 'linear-gradient(#ffffff1a 1px, transparent 1px), linear-gradient(90deg, #ffffff1a 1px, transparent 1px)'
                     : 'linear-gradient(#0000000a 1px, transparent 1px), linear-gradient(90deg, #0000000a 1px, transparent 1px)',
                   backgroundSize: '25px 25px',
                 } : selectedTheme.image ? {
                   backgroundImage: `url(${selectedTheme.image})`,
                   backgroundSize: 'cover',
                   backgroundPosition: 'center'
                 } : selectedTheme.id === 'custom' ? {
                   backgroundColor: userProfile?.custom_bg || '#ffffff',
                   backgroundImage: 'none'
                 } : {})
               }}
             >
               {selectedTheme.video && (
                 <video
                   autoPlay
                   loop
                   muted
                   playsInline
                   poster={selectedTheme.image}
                   className="absolute inset-0 w-full h-full object-cover"
                 >
                   <source src={selectedTheme.video} type="video/mp4" />
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
             <div className="relative z-10 w-full h-full overflow-y-auto no-scrollbar flex flex-col items-center p-8 pt-12">
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
                 <h3 className="text-[10px] font-bold opacity-70 mb-4">@{userProfile?.username || 'username'}</h3>

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

                 {/* Social Icons Row (From Onboarding - Max 5) */}
                 <div className="flex flex-wrap justify-center gap-4 mb-10 w-full animate-fade-in">
                    {socialLinks && Object.entries(socialLinks).slice(0, 5).map(([platform, url]: [string, any]) => (
                      url && (
                        <a 
                          key={platform} 
                          href={url} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="transition-transform hover:scale-125"
                          style={{ color: userProfile?.font_color || 'inherit' }}
                        >
                           <i className={`fi ${PLATFORMS[platform]?.icon || 'fi-rr-link'} text-2xl`}></i>
                        </a>
                      )
                    ))}
                 </div>

                 {/* Regular Links (From Dashboard Add Link - Box Style) */}
                 <div className="w-full space-y-3">
                    {links && links.filter((l: any) => l.active).map((link: any, i: number) => {
                      const isFeatured = link.layout === 'featured'
                      return (
                        <a 
                          key={i} 
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className={`w-full transition-all text-[11px] font-bold shadow-sm cursor-pointer hover:scale-[1.01] flex ${isFeatured ? 'flex-col overflow-hidden' : 'items-center py-2.5 px-3'} group`}
                          style={getButtonStyle()}
                        >
                          {isFeatured ? (
                            <>
                              {link.thumbnail && (
                                <div className="w-full aspect-video overflow-hidden border-b border-black/5">
                                   <img src={link.thumbnail} className="w-full h-full object-cover" />
                                </div>
                              )}
                              <div className="p-3 text-center relative">
                                 {link.title}
                                 <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-30">
                                    <i className="fi fi-rr-menu-dots-vertical text-[10px]"></i>
                                 </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0 border border-black/5 bg-black/5">
                                 {link.thumbnail ? (
                                   <img src={link.thumbnail} className="w-full h-full object-cover" />
                                 ) : (
                                   <i className={`fi ${APPS.find(a => a.id === link.platform)?.icon || 'fi-rr-link'} text-[12px] opacity-70`}></i>
                                 )}
                              </div>
                              <span className="flex-1 text-center truncate px-2">{link.title}</span>
                              <div className="w-5 opacity-30 flex items-center justify-center">
                                 <i className="fi fi-rr-menu-dots-vertical text-[10px]"></i>
                              </div>
                            </>
                          )}
                        </a>
                      )
                    })}
                    {(!links || links.filter((l: any) => l.active).length === 0) && (
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
      </div>
    </aside>
  )
}
