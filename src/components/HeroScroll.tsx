'use client'

import { motion } from 'framer-motion'
import React from 'react'

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

const ShowcaseCard = ({ data }: { data: typeof CREATOR_DATA[0] }) => {
  return (
    <div className="w-[420px] h-[520px] rounded-[60px] overflow-hidden relative group bg-white shadow-2xl shrink-0">
      {/* BACKGROUND IMAGE */}
      <img src={data.img} alt={data.name} className="w-full h-full object-cover" />
      
      {/* TEXT OVERLAY BOTTOM - IMPROVED GRADIENT */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 p-8 flex flex-col justify-end">
         <p className="text-white font-black text-lg md:text-xl drop-shadow-2xl leading-tight">
           {data.name}
         </p>
         <p className="text-white/80 font-bold text-xs uppercase tracking-widest mt-1">
           {data.role}
         </p>
      </div>
      
      {/* FLOATING UI (LOOKS LIKE PHONE/PROFILE) */}
      <div className="absolute right-6 top-10 w-[150px] bg-white/95 rounded-[24px] shadow-2xl p-4 flex flex-col items-center border border-white/40 backdrop-blur-sm transform group-hover:-translate-x-2 transition-transform duration-700 z-20">
         <div className="w-10 h-10 rounded-full bg-linktree-lime mb-3 shadow-inner" style={{ backgroundColor: data.color }} />
         <p className="font-extrabold text-[9px] text-gray-400 mb-4 tracking-tighter uppercase">{data.username}</p>
         
         <div className="w-full space-y-1.5">
           {data.links.map((l, i) => (
             <div key={i} className="w-full h-6 rounded-md bg-gray-50 flex items-center justify-center font-bold text-[7px] text-linktree-text">
               {l}
             </div>
           ))}
         </div>
         
         <div className="mt-3 flex gap-1 opacity-20">
           <div className="w-1.5 h-1.5 rounded-full bg-black" />
           <div className="w-1.5 h-1.5 rounded-full bg-black" />
           <div className="w-1.5 h-1.5 rounded-full bg-black" />
         </div>
      </div>
      
      {/* DARK OVERLAY ON BOTTOM */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
    </div>
  )
}

export default function HeroScroll() {
  return (
    <div className="relative h-full w-full overflow-hidden select-none pointer-events-none">
      {/* MASKING GRADIENTS (Blending with Lime) */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-linktree-lime to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-linktree-lime to-transparent z-10" />
      
      <div className="pt-4 pb-24 flex flex-col items-center">
        <motion.div 
          animate={{ y: [0, -1536] }} 
          transition={{ 
            y: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 35,
              ease: "linear",
            }
          }}
          className="flex flex-col gap-12"
        >
          {/* Multiply list for long infinite scroll */}
          {[...CREATOR_DATA, ...CREATOR_DATA, ...CREATOR_DATA, ...CREATOR_DATA].map((data, i) => (
            <ShowcaseCard key={i} data={data} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}
