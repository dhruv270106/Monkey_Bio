'use client'

interface PreviewProps {
  userProfile: any
  links: any[]
  socialLinks: any
}

export default function Preview({ userProfile, links, socialLinks }: PreviewProps) {
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
          <div className="w-full max-w-[280px] aspect-[9/18.5] rounded-[44px] border-[10px] border-[#020617] shadow-2xl relative overflow-hidden bg-white flex flex-col items-center transform scale-90 xxl:scale-100 transition-transform origin-center">
             {/* Notch */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#020617] rounded-b-[16px] z-50"></div>
             
             {/* Iframe-like content */}
             <div className="w-full h-full overflow-y-auto no-scrollbar flex flex-col items-center p-8 pt-12">
                 <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-white/20 mb-4 overflow-hidden shadow-lg flex-shrink-0">
                    <img 
                      src={userProfile?.avatar_url || `https://ui-avatars.com/api/?name=${userProfile?.display_name || 'U'}&background=6cf383&color=0f172a`} 
                      className="w-full h-full object-cover" 
                      alt=""
                    />
                 </div>
                 <h3 className="text-secondary font-bold text-sm mb-6">@{userProfile?.username || 'username'}</h3>

                 <div className="w-full space-y-3">
                    {links.filter(l => l.active).map((link, i) => (
                      <div 
                        key={i} 
                        className="w-full py-3 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-xl transition-all text-center text-[10px] font-bold text-secondary shadow-sm cursor-pointer"
                      >
                        {link.title}
                      </div>
                    ))}
                    {links.filter(l => l.active).length === 0 && (
                      <div className="space-y-3 w-full">
                        <div className="w-full py-3 bg-gray-50 rounded-xl animate-pulse"></div>
                        <div className="w-full py-3 bg-gray-50 rounded-xl animate-pulse"></div>
                        <div className="w-full py-3 bg-gray-50 rounded-xl animate-pulse"></div>
                      </div>
                    )}
                 </div>

                 {/* Social Icons inside mockup */}
                 <div className="flex flex-wrap justify-center gap-3 mt-8">
                    {socialLinks && Object.entries(socialLinks).map(([platform, handle]: [string, any]) => (
                      handle && (
                        <div key={platform} className="text-gray-400 hover:text-secondary transition-colors">
                           <i className={`fi fi-brands-${platform === 'x' ? 'twitter' : platform} text-lg`}></i>
                        </div>
                      )
                    ))}
                 </div>

                 <div className="mt-auto pt-10 mb-4 w-full flex flex-col items-center gap-3">
                     <button className="px-3 py-1.5 bg-white border border-gray-100 text-secondary text-[8px] font-bold rounded-full shadow-lg">Join us on Monkey</button>
                 </div>
             </div>
          </div>
      </div>
    </aside>
  )
}
