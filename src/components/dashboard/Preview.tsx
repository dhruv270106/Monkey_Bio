'use client'

import { useDomain } from '@/hooks/useDomain'
import DeviceMockup from './DeviceMockup'

interface PreviewProps {
  userProfile: any
  links: any[]
  socialLinks: any
}

export default function Preview({ userProfile, links, socialLinks }: PreviewProps) {
  const domain = useDomain()

  return (
    <aside className="w-[480px] bg-white border-l border-gray-100 hidden lg:flex flex-col items-center flex-shrink-0 relative h-full overflow-hidden">
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

      {/* iPhone Mockup Wrapper */}
      <div className="flex-1 w-full flex items-center justify-center p-8 relative overflow-hidden">
          <DeviceMockup userProfile={userProfile} links={links} socialLinks={socialLinks} scale={0.9} />
      </div>
    </aside>
  )
}
