'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PLATFORMS } from '@/data/platforms'

interface SocialSelectorModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (platform: string) => void
  existingSocials: string[]
}

export default function SocialSelectorModal({ isOpen, onClose, onSelect, existingSocials }: SocialSelectorModalProps) {
  const [search, setSearch] = useState('')

  const availablePlatforms = Object.entries(PLATFORMS).filter(([id, data]) => {
     const matchesSearch = data.name.toLowerCase().includes(search.toLowerCase())
     const isAlreadyAdded = existingSocials.includes(id)
     return matchesSearch && !isAlreadyAdded
  })

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md" 
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col h-[70vh] p-10"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
               <h2 className="text-2xl font-black">Add Social Link</h2>
               <p className="text-gray-400 font-bold text-sm italic">Select a platform to add to your bio profile</p>
            </div>
            <button onClick={onClose} className="p-3 hover:bg-gray-50 rounded-full transition-colors">
               <i className="fi fi-rr-cross-small text-2xl text-gray-400"></i>
            </button>
          </div>

          <div className="relative mb-8">
             <i className="fi fi-rr-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"></i>
             <input 
               type="text" 
               placeholder="Search social platforms..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="w-full pl-14 pr-6 py-4 bg-gray-50 rounded-[24px] outline-none border-2 border-transparent focus:border-primary/20 font-bold text-secondary transition-all"
             />
          </div>

          <div className="flex-1 overflow-y-auto pr-2 no-scrollbar">
             <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {availablePlatforms.map(([id, data]) => (
                   <button
                     key={id}
                     onClick={() => {
                        onSelect(id)
                        onClose()
                     }}
                     className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col items-center gap-4 hover:border-primary hover:shadow-xl hover:translate-y-[-4px] transition-all group"
                   >
                      <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                         <i className={`fi ${data.icon} text-3xl ${data.color || 'text-secondary'}`}></i>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-secondary group-hover:text-primary transition-colors">{data.name}</span>
                   </button>
                ))}
             </div>

             {availablePlatforms.length === 0 && (
                <div className="py-20 text-center space-y-4">
                   <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto opacity-20"><i className="fi fi-rr-search text-3xl"></i></div>
                   <p className="text-gray-400 font-bold">No social platforms found...</p>
                </div>
             )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
