'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Image as ImageIcon, Video, Folder, Plus, Search, Trash2, Download } from 'lucide-react'

export default function MediaGallery({ profile }: { profile: any }) {
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all')

  const media = [
     { id: '1', type: 'image', url: 'https://images.unsplash.com/photo-1510440299819-4213eb90bf41', name: 'Profile Banner', size: '1.2MB' },
     { id: '2', type: 'image', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2', name: 'Avatar New', size: '400KB' },
     { id: '3', type: 'video', url: '#', name: 'Intro Reel', size: '12MB' },
  ]

  return (
    <div className="flex-1 p-10 overflow-y-auto no-scrollbar bg-[#fcfcfc]">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-secondary shadow-lg">
                <Folder size={24} />
              </div>
              <h1 className="font-black text-3xl text-secondary">Media Asset Library</h1>
           </div>
           <button className="bg-secondary text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">Upload New</button>
        </div>

        <div className="bg-white p-10 rounded-[50px] border border-gray-100 shadow-xl space-y-8">
           <div className="flex items-center justify-between border-b border-gray-50 pb-8">
              <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100">
                 {['all', 'image', 'video'].map((f: any) => (
                    <button 
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-white text-secondary shadow-sm' : 'text-gray-400 hover:text-secondary'}`}
                    >
                       {f}
                    </button>
                 ))}
              </div>
              <div className="relative">
                 <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                 <input type="text" placeholder="Find an asset..." className="pl-14 pr-6 py-3 rounded-2xl bg-gray-50 border-none outline-none font-bold text-secondary focus:ring-2 focus:ring-primary/10 transition-all text-xs" />
              </div>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {media.filter(m => filter === 'all' || m.type === filter).map((m, i) => (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} key={m.id} className="group relative aspect-square bg-gray-50 rounded-3xl overflow-hidden border border-gray-100/50 hover:shadow-xl transition-all cursor-pointer">
                   {m.type === 'image' ? (
                      <img src={m.url} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
                   ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                         <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-secondary shadow-lg">
                            <Video size={20} />
                         </div>
                         <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">{m.name}</span>
                      </div>
                   )}
                   
                   <div className="absolute inset-0 bg-secondary/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-4">
                      <div className="flex gap-2">
                        <button className="w-10 h-10 rounded-xl bg-white text-secondary flex items-center justify-center hover:scale-110 active:scale-95 transition-all"><Download size={16} /></button>
                        <button className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all"><Trash2 size={16} /></button>
                      </div>
                      <p className="text-[9px] font-black text-white uppercase tracking-widest opacity-60">{m.size}</p>
                   </div>
                </motion.div>
              ))}
              
              <button className="aspect-square bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-3 text-gray-400 hover:border-primary hover:text-primary transition-all group">
                 <div className="w-12 h-12 rounded-full border-2 border-gray-200 group-hover:border-primary flex items-center justify-center transition-all bg-white group-hover:scale-110"><Plus size={24} /></div>
                 <span className="text-[10px] font-black uppercase tracking-widest mt-2">New Media</span>
              </button>
           </div>
        </div>
      </div>
    </div>
  )
}
