'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { THEMES } from '@/data/themes'
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
  DollarSign,
  RefreshCcw,
  LayoutDashboard
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
  const [syncing, setSyncing] = useState(false)

  useEffect(() => {
    fetchThemes()
  }, [])

  const fetchThemes = async () => {
    setLoading(true)
    const { data } = await supabase.from('themes').select('*').order('display_order', { ascending: true })
    
    if (data && data.length > 0) {
      setThemes(data)
    } else {
      // If table is empty, we show data from THEMES constant but it's not "synced" yet
      const initialThemes = THEMES.map((t, index) => ({
        id: t.id,
        name: t.name,
        slug: t.id,
        preview_url: t.image || 'https://placehold.co/400x600?text=' + t.name,
        is_premium: t.isPremium || false,
        price: t.isPremium ? 9 : 0,
        status: 'active' as const,
        display_order: index + 1,
        category: t.isPremium ? 'Premium' : 'Basic'
      }))
      setThemes(initialThemes)
    }
    setLoading(false)
  }

  const syncThemes = async () => {
    setSyncing(true)
    try {
      for (const t of THEMES) {
        const { error } = await supabase.from('themes').upsert({
          id: t.id,
          name: t.name,
          slug: t.id,
          preview_url: t.image || '',
          is_premium: t.isPremium || false,
          price: t.isPremium ? 9 : 0,
          status: 'active',
          display_order: THEMES.indexOf(t) + 1
        })
        if (error) console.error("Sync error:", error)
      }
      alert("Successfully synced with code configuration!")
      fetchThemes()
    } catch (err) {
      console.error(err)
    } finally {
      setSyncing(false)
    }
  }

  const togglePremium = async (theme: Theme) => {
    const newStatus = !theme.is_premium
    const { error } = await supabase.from('themes').update({ is_premium: newStatus, price: newStatus ? 9 : 0 }).eq('id', theme.id)
    if (!error) {
      setThemes(prev => prev.map(t => t.id === theme.id ? { ...t, is_premium: newStatus, price: newStatus ? 9 : 0 } : t))
    }
  }

  const toggleStatus = async (theme: Theme) => {
    const newStatus = theme.status === 'active' ? 'inactive' : 'active'
    const { error } = await supabase.from('themes').update({ status: newStatus }).eq('id', theme.id)
    if (!error) {
      setThemes(prev => prev.map(t => t.id === theme.id ? { ...t, status: newStatus } : t))
    }
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
          <button 
            onClick={syncThemes}
            disabled={syncing}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl font-bold text-sm text-gray-500 hover:text-secondary transition-all shadow-sm"
          >
            <RefreshCcw size={16} className={syncing ? 'animate-spin' : ''} />
            {syncing ? 'Syncing...' : 'Sync with Code'}
          </button>
          
          <div className="flex items-center bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8">
           {themes.map((theme) => (
             <motion.div
               layout
               key={theme.id}
               className="group bg-white rounded-[40px] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all overflow-hidden flex flex-col"
             >
                {/* Preview */}
                <div className="aspect-[3/4] bg-gray-50 relative overflow-hidden">
                   <img 
                    src={theme.preview_url || 'https://placehold.co/400x600?text=' + theme.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt={theme.name}
                   />
                   <div className="absolute inset-0 bg-secondary/40 opacity-0 group-hover:opacity-100 transition-all backdrop-blur-[2px] flex flex-col items-center justify-center p-8 text-center">
                       <button 
                        onClick={() => togglePremium(theme)}
                        className="w-full py-4 bg-white text-secondary rounded-2xl font-black text-xs flex items-center justify-center gap-2 mb-3 hover:bg-primary transition-all"
                       >
                          {theme.is_premium ? <Unlock size={16} /> : <Lock size={16} />}
                          {theme.is_premium ? 'Revoke Premium' : 'Make Premium'}
                       </button>
                       <button 
                        onClick={() => toggleStatus(theme)}
                        className="w-full py-4 bg-secondary text-white rounded-2xl font-black text-xs flex items-center justify-center gap-2 hover:bg-gray-800 transition-all"
                       >
                          {theme.status === 'active' ? <Eye size={16} /> : <ImageIcon size={16} />}
                          {theme.status === 'active' ? 'Hide Theme' : 'Show Theme'}
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
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{theme.category || 'Theme'}</p>
                      </div>
                      <button className="p-2 text-gray-300 hover:text-secondary transition-colors"><MoreHorizontal size={20} /></button>
                   </div>
                   
                   <div className="flex items-center gap-2 pt-4 border-t border-gray-50 mt-auto">
                      <div className="flex-1 flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter Otros truncate">
                         <Tag size={10} /> {theme.slug}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                         <Settings2 size={10} /> {theme.display_order}
                      </div>
                   </div>
                </div>
             </motion.div>
           ))}
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
                             <img src={theme.preview_url || 'https://placehold.co/400x600?text=' + theme.name} className="w-12 h-16 rounded-xl object-cover" />
                             <span className="font-black text-secondary">{theme.name}</span>
                          </div>
                       </td>
                       <td className="px-6 py-4 font-mono text-xs text-secondary">{theme.slug}</td>
                       <td className="px-6 py-4">
                          <button 
                            onClick={() => togglePremium(theme)}
                            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${theme.is_premium ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'}`}
                          >
                             {theme.is_premium ? 'Premium' : 'Free'}
                          </button>
                       </td>
                       <td className="px-6 py-4 font-black text-secondary">${theme.price}</td>
                       <td className="px-6 py-4">
                          <button 
                            onClick={() => toggleStatus(theme)}
                            className="flex items-center gap-2"
                          >
                             <div className={`w-2 h-2 rounded-full ${theme.status === 'active' ? 'bg-primary' : 'bg-red-500'}`}></div>
                             <span className="text-xs font-bold text-gray-500 capitalize">{theme.status}</span>
                          </button>
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
