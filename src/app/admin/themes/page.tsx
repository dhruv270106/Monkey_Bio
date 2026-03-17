'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { 
  Palette, 
  Plus, 
  Search, 
  Grid, 
  List, 
  Lock, 
  Unlock, 
  Tag, 
  Trash2, 
  Edit3, 
  Image as ImageIcon,
  MoreHorizontal,
  ExternalLink,
  Eye,
  Settings2,
  CheckCircle2,
  DollarSign
} from 'lucide-react'

interface Theme {
  id: string
  name: string
  slug: string
  preview_url: string
  is_premium: boolean
  price: number
  status: 'active' | 'inactive'
  display_order: number
  category?: string
}

export default function ThemeLibrary() {
  const [themes, setThemes] = useState<Theme[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    fetchThemes()
  }, [])

  const fetchThemes = async () => {
    setLoading(true)
    const { data } = await supabase.from('themes').select('*').order('display_order', { ascending: true })
    
    if (data && data.length > 0) {
      setThemes(data)
    } else {
      // Mock data
      setThemes([
        { id: '1', name: 'Clean White', slug: 'white', preview_url: 'https://placehold.co/400x600?text=White+Theme', is_premium: false, price: 0, status: 'active', display_order: 1, category: 'Basic' },
        { id: '2', name: 'Dark Night', slug: 'dark', preview_url: 'https://placehold.co/400x600?text=Dark+Theme', is_premium: false, price: 0, status: 'active', display_order: 2, category: 'Basic' },
        { id: '3', name: 'Glassmorphism', slug: 'glass', preview_url: 'https://placehold.co/400x600?text=Glass+Theme', is_premium: true, price: 9, status: 'active', display_order: 3, category: 'Premium' },
        { id: '4', name: 'Retro Vibes', slug: 'retro', preview_url: 'https://placehold.co/400x600?text=Retro+Theme', is_premium: true, price: 5, status: 'active', display_order: 4, category: 'Aesthetic' },
        { id: '5', name: 'Cyberpunk', slug: 'cyber', preview_url: 'https://placehold.co/400x600?text=Cyber+Theme', is_premium: true, price: 12, status: 'inactive', display_order: 5, category: 'Gaming' },
      ])
    }
    setLoading(false)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-secondary tracking-tight">Theme Library</h1>
          <p className="text-gray-400 font-medium">Manage free and premium visual themes.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white p-1 rounded-2xl border border-gray-100 shadow-sm mr-2">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-secondary text-white' : 'text-gray-400 hover:text-secondary'}`}
            >
              <Grid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2.5 rounded-xl transition-all ${viewMode === 'list' ? 'bg-secondary text-white' : 'text-gray-400 hover:text-secondary'}`}
            >
              <List size={18} />
            </button>
          </div>
          <button className="bg-primary text-secondary px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-95">
            <Plus size={18} /> Add New Theme
          </button>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
         {[
           { label: 'Total Themes', value: themes.length, icon: Palette, color: 'text-blue-500', bg: 'bg-blue-50' },
           { label: 'Premium Themes', value: themes.filter(t => t.is_premium).length, icon: Lock, color: 'text-purple-500', bg: 'bg-purple-50' },
           { label: 'Inactive/Private', value: themes.filter(t => t.status === 'inactive').length, icon: Eye, color: 'text-gray-500', bg: 'bg-gray-100' },
         ].map((stat, i) => (
           <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-secondary">{stat.value}</p>
              </div>
           </div>
         ))}
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8 min-[1800px]:grid-cols-5">
           {themes.map((theme) => (
             <motion.div
               layout
               key={theme.id}
               className="group bg-white rounded-[40px] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all overflow-hidden flex flex-col"
             >
                {/* Preview */}
                <div className="aspect-[3/4] bg-gray-50 relative overflow-hidden">
                   <img 
                    src={theme.preview_url} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt={theme.name}
                   />
                   <div className="absolute inset-0 bg-secondary/20 opacity-0 group-hover:opacity-100 transition-all backdrop-blur-[2px] flex flex-col items-center justify-center p-8 text-center">
                       <button className="w-full py-4 bg-white text-secondary rounded-2xl font-black text-xs flex items-center justify-center gap-2 mb-3 hover:bg-primary transition-all">
                          <Eye size={16} /> Live Preview
                       </button>
                       <button className="w-full py-4 bg-secondary text-white rounded-2xl font-black text-xs flex items-center justify-center gap-2 hover:bg-gray-800 transition-all">
                          <Edit3 size={16} /> Edit Theme
                       </button>
                   </div>
                   
                   {/* Badges */}
                   <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <span className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg backdrop-blur-md ${
                        theme.is_premium ? 'bg-purple-500/90 text-white' : 'bg-white/90 text-secondary'
                      }`}>
                         {theme.is_premium ? 'Premium' : 'Free'}
                      </span>
                      {theme.status === 'inactive' && (
                        <span className="bg-red-500/90 text-white px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg">
                           Inactive
                        </span>
                      )}
                   </div>
                   
                   {theme.is_premium && (
                     <div className="absolute bottom-4 right-4 bg-primary text-secondary px-4 py-2 rounded-2xl font-black text-xs shadow-lg ring-4 ring-primary/20">
                        ${theme.price}
                     </div>
                   )}
                </div>

                {/* Info */}
                <div className="p-6">
                   <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-black text-secondary group-hover:text-primary transition-colors">{theme.name}</h3>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{theme.category}</p>
                      </div>
                      <button className="p-2 text-gray-300 hover:text-secondary transition-colors"><MoreHorizontal size={20} /></button>
                   </div>
                   
                   <div className="flex items-center gap-2 pt-4 border-t border-gray-50 mt-auto">
                      <div className="flex-1 flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter Otros truncate">
                         <Tag size={10} /> slug: {theme.slug}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                         <Settings2 size={10} /> {theme.display_order}
                      </div>
                   </div>
                </div>
             </motion.div>
           ))}
           
           {/* Add New Card */}
           <div className="border-4 border-dashed border-gray-100 rounded-[40px] flex flex-col items-center justify-center text-center p-8 group cursor-pointer hover:border-primary/30 hover:bg-primary/5 transition-all aspect-[3/4]">
              <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-primary group-hover:text-secondary transition-all mb-4">
                <Plus size={32} />
              </div>
              <h3 className="font-black text-gray-400 group-hover:text-secondary transition-all">Create New</h3>
              <p className="text-xs font-bold text-gray-300 group-hover:text-gray-400 uppercase tracking-widest mt-1">Design System</p>
           </div>
        </div>
      )}

      {/* List View - Alternative */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-[40px] border border-gray-100 overflow-hidden shadow-sm">
           <table className="w-full text-left">
              <thead>
                 <tr className="bg-gray-50/50 border-b border-gray-50">
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Theme</th>
                    <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Slug</th>
                    <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Type</th>
                    <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Price</th>
                    <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                 </tr>
              </thead>
              <tbody>
                 {themes.map(theme => (
                   <tr key={theme.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-all">
                      <td className="px-8 py-4">
                         <div className="flex items-center gap-4">
                            <img src={theme.preview_url} className="w-12 h-16 rounded-xl object-cover" />
                            <span className="font-black text-secondary">{theme.name}</span>
                         </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-secondary">{theme.slug}</td>
                      <td className="px-6 py-4">
                         <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${theme.is_premium ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'}`}>
                            {theme.is_premium ? 'Premium' : 'Free'}
                         </span>
                      </td>
                      <td className="px-6 py-4 font-black text-secondary">${theme.price}</td>
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${theme.status === 'active' ? 'bg-primary' : 'bg-red-500'}`}></div>
                            <span className="text-xs font-bold text-gray-500 capitalize">{theme.status}</span>
                         </div>
                      </td>
                      <td className="px-8 py-4 text-right">
                         <div className="flex items-center justify-end gap-2">
                            <button className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-secondary transition-all shadow-sm"><Edit3 size={16} /></button>
                            <button className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-red-500 transition-all shadow-sm"><Trash2 size={16} /></button>
                         </div>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      )}
    </div>
  )
}
