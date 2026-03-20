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
    <div className="w-[400px] h-[480px] rounded-[50px] overflow-hidden relative group bg-white shadow-2xl shrink-0">
      {/* BACKGROUND IMAGE */}
      <img src={data.img} alt={data.name} className="w-full h-full object-cover" />
      
      {/* TEXT OVERLAY BOTTOM */}
      <div className="absolute bottom-8 left-8 right-8 z-20">
         <p className="text-white font-bold text-base md:text-lg drop-shadow-lg leading-tight">
           {data.name}. {data.role}.
         </p>
      </div>
      
      {/* FLOATING UI (LOOKS LIKE PHONE/PROFILE) */}
      <div className="absolute right-6 top-10 w-[140px] bg-white rounded-[20px] shadow-2xl p-3 flex flex-col items-center border border-white/20 backdrop-blur-sm transform group-hover:-translate-x-2 transition-transform duration-700">
         <div className="w-8 h-8 rounded-full bg-linktree-lime mb-2" style={{ backgroundColor: data.color }} />
         <p className="font-bold text-[8px] text-gray-400 mb-3">{data.username}</p>
         
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
    <div className="relative h-[650px] w-[440px] rounded-[60px] overflow-hidden border-[10px] border-white shadow-2xl bg-white select-none pointer-events-none">
      {/* MASKING GRADIENTS */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white via-white/40 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/40 to-transparent z-10" />
      
      <div className="p-4 flex flex-col items-center">
        <motion.div 
          animate={{ y: [0, -1536] }} // Exact height of 3 cards (480 + 32) * 3
          transition={{ 
            y: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            }
          }}
          className="flex flex-col gap-8"
        >
          {/* Double list for infinite scroll */}
          {[...CREATOR_DATA, ...CREATOR_DATA, ...CREATOR_DATA].map((data, i) => (
            <ShowcaseCard key={i} data={data} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}
