'use client'

import { motion } from 'framer-motion'
import React from 'react'

const PROFILE_DATA_LEFT = [
  { username: 'skincarewithzainab', color: '#E8EFD6', pfp: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop' },
  { username: 'thetravelingfoodie', color: '#780016', pfp: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=400&fit=crop', textColor: 'white' },
  { username: 'fitwithmarcus', color: '#2665D6', pfp: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop', textColor: 'white' },
  { username: 'techwithriya', color: '#502274', pfp: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop', textColor: 'white' },
]

const PROFILE_DATA_RIGHT = [
  { username: 'nicoandfran', color: '#D2E823', pfp: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
  { username: 'artbyelena', color: '#F3F3F1', pfp: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop' },
  { username: 'podcasterjohn', color: '#254F1A', pfp: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop', textColor: 'white' },
  { username: 'makeupbysarah', color: '#E9D5FF', pfp: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop' },
]

const ProfileCard = ({ data }: { data: typeof PROFILE_DATA_LEFT[0] & { textColor?: string } }) => {
  return (
    <div 
      className="w-[280px] h-[480px] rounded-[40px] shadow-2xl overflow-hidden flex flex-col items-center p-6 relative group transform transition-transform duration-500 hover:scale-[1.02]"
      style={{ backgroundColor: data.color }}
    >
      <div className="w-20 h-20 rounded-full border-4 border-white/20 mb-4 overflow-hidden shadow-lg">
        <img src={data.pfp} alt={data.username} className="w-full h-full object-cover" />
      </div>
      <div 
        className="font-black text-xl mb-8 tracking-tight"
        style={{ color: data.textColor || '#254F1A' }}
      >
        @{data.username}
      </div>
      
      <div className="w-full space-y-3 px-2">
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className="w-full h-12 rounded-xl backdrop-blur-md flex items-center justify-center font-bold text-sm shadow-sm transition-all border border-white/10"
            style={{ 
              backgroundColor: data.textColor === 'white' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              color: data.textColor || '#254F1A'
            }}
          >
            Link {i}
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-6 flex gap-3 opacity-30">
        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: data.textColor || '#254F1A' }} />
        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: data.textColor || '#254F1A' }} />
        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: data.textColor || '#254F1A' }} />
      </div>
    </div>
  )
}

const PROFILE_DATA_CENTRE = [
  { username: 'chef_tony', color: '#2665D6', pfp: 'https://images.unsplash.com/photo-1577214495775-4081954848d6?w=400&h=400&fit=crop', textColor: 'white' },
  { username: 'yogawithluna', color: '#D2E823', pfp: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop' },
  { username: 'gamer_rex', color: '#502274', pfp: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop', textColor: 'white' },
]

export default function HeroScroll() {
  return (
    <div className="flex gap-6 items-center overflow-hidden h-[900px] w-[140%] relative pointer-events-none select-none translate-x-[15%]">
      {/* GRADIENTS TO MASK EDGES */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-linktree-lime/100 via-linktree-lime/80 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-linktree-lime/100 via-linktree-lime/80 to-transparent z-10" />
      
      {/* TRACK 1 */}
      <div className="flex flex-col gap-6 shrink-0">
        <motion.div 
          animate={{ y: [0, -1200] }}
          transition={{ 
            y: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 35,
              ease: "linear",
            }
          }}
          className="flex flex-col gap-6"
        >
          {[...PROFILE_DATA_LEFT, ...PROFILE_DATA_LEFT, ...PROFILE_DATA_LEFT].map((data, i) => (
            <ProfileCard key={`left-${i}`} data={data} />
          ))}
        </motion.div>
      </div>

      {/* TRACK 2 */}
      <div className="flex flex-col gap-6 shrink-0 mt-20">
        <motion.div 
          animate={{ y: [-1200, 0] }}
          transition={{ 
            y: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            }
          }}
          className="flex flex-col gap-6"
        >
          {[...PROFILE_DATA_CENTRE, ...PROFILE_DATA_CENTRE, ...PROFILE_DATA_CENTRE].map((data, i) => (
            <ProfileCard key={`centre-${i}`} data={data} />
          ))}
        </motion.div>
      </div>

      {/* TRACK 3 */}
      <div className="flex flex-col gap-6 shrink-0 -mt-20">
        <motion.div 
          animate={{ y: [0, -1200] }}
          transition={{ 
            y: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            }
          }}
          className="flex flex-col gap-6"
        >
          {[...PROFILE_DATA_RIGHT, ...PROFILE_DATA_RIGHT, ...PROFILE_DATA_RIGHT].map((data, i) => (
            <ProfileCard key={`right-${i}`} data={data} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}
