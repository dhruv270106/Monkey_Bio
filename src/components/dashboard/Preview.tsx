'use client'

import { THEMES } from '@/data/themes'

interface PreviewProps {
  userProfile: any
  links: any[]
  socialLinks: any
}

const PLATFORMS: Record<string, any> = {
  instagram: { icon: 'fi-brands-instagram' },
  youtube: { icon: 'fi-brands-youtube' },
  tiktok: { icon: 'fi-brands-tiktok' },
  twitter: { icon: 'fi-brands-twitter' },
  linkedin: { icon: 'fi-brands-linkedin' },
  facebook: { icon: 'fi-brands-facebook' },
}

export default function Preview({ userProfile, links, socialLinks }: PreviewProps) {
  const selectedTheme = THEMES.find(t => t.id === userProfile?.theme) || THEMES[0]

  return (
    <aside className="w-[480px] bg-white border-l border-gray-100 hidden lg:flex flex-col items-center flex-shrink-0 relative h-screen sticky top-0 overflow-hidden">
      {/* Search/URL simulation */}
      <div className="w-full p-8 flex items-center justify-center gap-3">
          <div className="bg-gray-100 flex items-center rounded-xl p-1 w-full max-w-sm">
              <span className="px-4 text-[10px] font-bold text-gray-400 truncate">
                linktr.ee/{userProfile?.username || 'user'}
              </span>
              <button className="p-2 bg-white rounded-lg shadow-sm ml-auto flex items-center justify-center">
                <i className="fi fi-rr-share text-[10px]"></i>
              </button>
          </div>
          <button className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 flex-shrink-0 flex items-center justify-center">
            <i className="fi fi-rr-refresh text-xs text-gray-400"></i>
          </button>
      </div>

      {/* iPhone Mockup */}
      <div className="flex-1 w-full flex items-center justify-center p-8 relative overflow-hidden">
          <div className={`w-full max-w-[280px] aspect-[9/18.5] rounded-[44px] border-[10px] border-[#020617] shadow-2xl relative overflow-hidden flex flex-col items-center transform scale-90 xxl:scale-100 transition-all duration-500 origin-center ${selectedTheme.bg} ${selectedTheme.text}`}>
             {/* Notch */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#020617] rounded-b-[16px] z-50"></div>
             
             {/* Content */}
             <div className="w-full h-full overflow-y-auto no-scrollbar flex flex-col items-center p-8 pt-12">
                 <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-white/20 mb-4 overflow-hidden shadow-lg flex-shrink-0">
                    <img 
                      src={userProfile?.avatar_url || `https://ui-avatars.com/api/?name=${userProfile?.display_name || 'U'}&background=6cf383&color=0f172a`} 
                      className="w-full h-full object-cover" 
                      alt=""
                    />
                 </div>
                 <h3 className="font-bold text-sm mb-1">{userProfile?.display_name || 'Your Name'}</h3>
                 <h3 className="text-[10px] opacity-70 mb-6">@{userProfile?.username || 'username'}</h3>

                 {userProfile?.bio && <p className="text-[10px] text-center px-2 mb-8 opacity-80 leading-relaxed line-clamp-3">{userProfile.bio}</p>}

                 <div className="w-full space-y-3">
                    {links && links.filter(l => l.active).map((link, i) => (
                      <div 
                        key={i} 
                        className={`w-full py-3 rounded-xl transition-all text-center text-[10px] font-bold shadow-sm cursor-pointer hover:scale-[1.02] ${selectedTheme.button}`}
                      >
                        {link.title}
                      </div>
                    ))}
                    {(!links || links.filter(l => l.active).length === 0) && (
                      <div className="space-y-3 w-full opacity-20">
                        <div className={`w-full py-3 rounded-xl ${selectedTheme.button} brightness-90`}></div>
                        <div className={`w-full py-3 rounded-xl ${selectedTheme.button} brightness-90`}></div>
                        <div className={`w-full py-3 rounded-xl ${selectedTheme.button} brightness-90`}></div>
                      </div>
                    )}
                 </div>

                 {/* Social Icons inside mockup */}
                 <div className="flex flex-wrap justify-center gap-3 mt-8">
                    {socialLinks && Object.entries(socialLinks).map(([platform, url]: [string, any]) => (
                      url && (
                        <a key={platform} href={url} target="_blank" rel="noreferrer" className="transition-transform hover:scale-110">
                           <i className={`fi ${PLATFORMS[platform]?.icon || 'fi-rr-link'} text-lg`}></i>
                        </a>
                      )
                    ))}
                 </div>

                 <div className="mt-auto pt-10 mb-4 w-full flex flex-col items-center gap-3">
                     <button className={`px-4 py-2 border border-white/10 text-[8px] font-bold rounded-full shadow-lg ${selectedTheme.button} brightness-110`}>Join us on Monkey</button>
                 </div>
             </div>
          </div>
      </div>
    </aside>
  )
}
