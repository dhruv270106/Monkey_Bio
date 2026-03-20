'use client'

import { motion } from 'framer-motion'
import React, { useState, useEffect } from 'react'

const CREATOR_DATA = [
  {
    name: 'Sarah & Alex',
    role: 'Artistic Duo at Studio Bloom',
    img: '/assets/creators/creator1.png',
    username: '@studiobloom',
    color: '#D2E823',
    links: ['Our Collection', 'Art Workshop', 'Buy Prints']
  },
  {
    name: 'Marcus Rivera',
    role: 'Travel Photographer',
    img: '/assets/creators/creator2.png',
    username: '@marcusvisuals',
    color: '#2665D6',
    links: ['New Presets', 'Photography Gear', 'Photo Tours']
  },
  {
    name: 'Chef Leyla',
    role: 'Culinary Artist',
    img: '/assets/creators/creator3.png',
    username: '@cookwithleyla',
    color: '#502274',
    links: ['Latest Recipes', 'Kitchen Essentials', 'E-Book']
  }
]

const ShowcaseCard = ({ data, isMobile }: { data: typeof CREATOR_DATA[0], isMobile: boolean }) => {
  return (
    <div className={`${isMobile ? 'w-[280px] h-[360px] rounded-[40px]' : 'w-[420px] h-[520px] rounded-[60px]'} overflow-hidden relative group bg-white shadow-2xl shrink-0`}>
      {/* BACKGROUND IMAGE */}
      <img src={data.img} alt={data.name} className="w-full h-full object-cover" />
      
      {/* TEXT OVERLAY BOTTOM */}
      <div className={`absolute inset-x-0 bottom-0 ${isMobile ? 'h-24 p-4' : 'h-40 p-8'} bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 flex flex-col justify-end`}>
         <p className={`text-white font-black ${isMobile ? 'text-sm' : 'text-lg md:text-xl'} drop-shadow-2xl leading-tight`}>
           {data.name}
         </p>
         <p className="text-white/80 font-bold text-[10px] uppercase tracking-widest mt-1">
           {data.role}
         </p>
      </div>
      
      {/* FLOATING UI */}
      <div className={`absolute ${isMobile ? 'right-4 top-4 w-[110px] p-2' : 'right-6 top-10 w-[150px] p-4'} bg-white/95 rounded-[24px] shadow-2xl flex flex-col items-center border border-white/40 backdrop-blur-sm z-20`}>
         <div className={`${isMobile ? 'w-6 h-6 mb-2' : 'w-10 h-10 mb-3'} rounded-full bg-linktree-lime shadow-inner`} style={{ backgroundColor: data.color }} />
         <p className="font-extrabold text-[8px] text-gray-400 mb-2 tracking-tighter uppercase">{data.username}</p>
         <div className="w-full space-y-1">
           {data.links.map((l, i) => (
             <div key={i} className={`w-full ${isMobile ? 'h-4' : 'h-6'} rounded-md bg-gray-50 flex items-center justify-center font-bold text-[6px] text-linktree-text`}>
               {l}
             </div>
           ))}
         </div>
      </div>
    </div>
  )
}

export default function HeroScroll() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (isMobile) {
    return (
      <div className="w-full py-10 overflow-hidden relative select-none z-10 pointer-events-none">
        <motion.div 
          animate={{ x: [0, -1200] }} 
          transition={{ 
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            }
          }}
          className="flex gap-6 pl-4"
        >
          {[...CREATOR_DATA, ...CREATOR_DATA, ...CREATOR_DATA, ...CREATOR_DATA].map((data, i) => (
            <ShowcaseCard key={i} data={data} isMobile={true} />
          ))}
        </motion.div>
      </div>
    )
  }

  return (
    <div className="absolute inset-x-0 -top-40 bottom-0 pointer-events-none select-none z-10">
      {/* GRADIENT MASK TOP */}
      <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-[#D2E823] via-[#D2E823]/60 to-transparent z-10" />
      
      <div className="flex flex-col items-center h-full">
        <motion.div 
          animate={{ y: [0, -1600] }} 
          transition={{ 
            y: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            }
          }}
          className="flex flex-col gap-16 pt-20"
        >
          {[...CREATOR_DATA, ...CREATOR_DATA, ...CREATOR_DATA, ...CREATOR_DATA, ...CREATOR_DATA].map((data, i) => (
            <ShowcaseCard key={i} data={data} isMobile={false} />
          ))}
        </motion.div>
      </div>

      {/* GRADIENT MASK BOTTOM */}
      <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-[#D2E823] via-[#D2E823]/40 to-transparent z-10" />
    </div>
  )
}
