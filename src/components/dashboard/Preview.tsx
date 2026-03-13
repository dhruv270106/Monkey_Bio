'use client'

import { motion } from 'framer-motion'

interface PreviewProps {
  userProfile: any
  links: any[]
  socialLinks: any
}

export default function Preview({ userProfile, links, socialLinks }: PreviewProps) {
  const username = userProfile?.username || 'username'
  const avatarUrl = userProfile?.avatar_url || `https://ui-avatars.com/api/?name=${username}&background=6cf383&color=0F172A&bold=true`

  return (
    <aside className="w-[480px] bg-white border-l border-gray-100 hidden lg:flex flex-col items-center flex-shrink-0 relative overflow-hidden h-screen sticky top-0">
      <div className="w-full p-8 flex items-center justify-center gap-3">
        <div className="bg-gray-100 flex items-center rounded-xl p-1 w-full max-w-sm">
          <span className="px-4 text-[10px] font-bold text-gray-400 truncate">linktr.ee/{username}</span>
          <button className="p-2 bg-white rounded-lg shadow-sm ml-auto">
            <i className="fi fi-rr-upload w-4 h-4 scale-x-[-1] flex items-center justify-center"></i>
          </button>
        </div>
        <button className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 flex-shrink-0" onClick={() => window.location.reload()}>
          <i className="fi fi-rr-refresh w-4 h-4 text-gray-400 flex items-center justify-center"></i>
        </button>
      </div>

      <div className="flex-1 w-full flex items-center justify-center p-8 relative overflow-hidden">
        <div className="w-full max-w-[280px] aspect-[9/18.5] rounded-[44px] border-[10px] border-[#020617] shadow-2xl relative overflow-hidden bg-white flex flex-col items-center transform scale-90 transition-transform origin-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#020617] rounded-b-[16px] z-50"></div>
          
          <div className="w-full h-full overflow-y-auto no-scrollbar flex flex-col items-center p-8 pt-12">
            <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-white/20 mb-4 overflow-hidden shadow-lg flex-shrink-0">
              <img src={avatarUrl} className="w-full h-full object-cover" alt="Avatar" />
            </div>
            <h3 className="text-secondary font-bold text-sm mb-6 text-center">@{username}</h3>

            <div className="w-full space-y-3">
              {/* Social Icons as boxes */}
              {Object.entries(socialLinks || {}).map(([platform, handle]: [string, any]) => (
                <div key={platform} className="w-full py-3 px-4 bg-white/90 backdrop-blur-sm text-secondary text-[10px] font-bold rounded-xl flex items-center shadow-sm border border-gray-100/50 hover:scale-[1.02] transition-all cursor-pointer group">
                   <div className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                      <i className={`fi fi-brands-${platform === 'x' ? 'twitter' : platform} text-[12px]`}></i>
                   </div>
                   <span className="flex-1 capitalize">{platform}</span>
                </div>
              ))}

              {/* Custom Links */}
              {links.filter(l => l.active && l.title && l.url).map((link, i) => (
                <a 
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-white text-secondary font-bold rounded-xl flex items-center justify-center text-center shadow-md border border-gray-100 hover:scale-[1.02] transition-all cursor-pointer mb-3 no-underline group"
                >
                  <span className="text-xs">{link.title}</span>
                </a>
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
