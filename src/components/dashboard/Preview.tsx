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
    <div className="relative flex flex-col items-center">
      {/* Device Mockup Wrapper */}
      <div className="relative">
          <DeviceMockup userProfile={userProfile} links={links} socialLinks={socialLinks} />
      </div>
    </div>
  )
}
