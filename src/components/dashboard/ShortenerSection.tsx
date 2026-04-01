'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, ExternalLink, Trash2, BarChart, Plus } from 'lucide-react'

interface ShortenedLink {
  id: string
  url: string
  alias: string
  clicks: number
  created_at: string
}

export default function ShortenerSection({ profile }: { profile: any }) {
  const [links, setLinks] = useState<ShortenedLink[]>([])
  const [url, setUrl] = useState('')
  const [alias, setAlias] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    if (profile) {
      const saved = localStorage.getItem(`short_links_${profile.id}`)
      if (saved) setLinks(JSON.parse(saved))
    }
  }, [profile])

  const handleShorten = (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return
    
    setLoading(true)
    const newLink: ShortenedLink = {
      id: Math.random().toString(36).substr(2, 9),
      url: url.startsWith('http') ? url : `https://${url}`,
      alias: alias || Math.random().toString(36).substr(2, 6),
      clicks: 0,
      created_at: new Date().toISOString()
    }

    const updated = [newLink, ...links]
    setLinks(updated)
    localStorage.setItem(`short_links_${profile.id}`, JSON.stringify(updated))
    
    setUrl('')
    setAlias('')
    setLoading(false)
  }

  const deleteLink = (id: string) => {
    const updated = links.filter(l => l.id !== id)
    setLinks(updated)
    localStorage.setItem(`short_links_${profile.id}`, JSON.stringify(updated))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(null), 2000)
  }

  const domain = typeof window !== 'undefined' ? window.location.origin : 'mnky.bio'

  return (
    <div className="flex-1 p-10 overflow-y-auto no-scrollbar bg-[#fcfcfc]">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center text-white shadow-lg">
                <i className="fi fi-rr-link-alt text-xl"></i>
              </div>
              <div>
                <h1 className="font-black text-3xl text-secondary">Link Shortener</h1>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mt-1">Create branded, trackable short links</p>
              </div>
           </div>
        </div>

        {/* Input Box */}
        <div className="bg-white p-10 rounded-[50px] border border-gray-100 shadow-xl space-y-8">
           <form onSubmit={handleShorten} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-300 ml-4">Long URL</label>
                    <input 
                      type="text" 
                      placeholder="https://your-long-website.com/very/long/path" 
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="w-full px-8 py-5 rounded-[28px] bg-gray-50 border-none outline-none font-bold text-secondary focus:ring-2 focus:ring-indigo-500/10 transition-all"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-300 ml-4">Custom Alias (Optional)</label>
                    <div className="relative">
                       <span className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">mnky.bio/</span>
                       <input 
                        type="text" 
                        placeholder="my-link" 
                        value={alias}
                        onChange={(e) => setAlias(e.target.value)}
                        className="w-full pl-28 pr-8 py-5 rounded-[28px] bg-gray-50 border-none outline-none font-bold text-secondary focus:ring-2 focus:ring-indigo-500/10 transition-all font-mono text-sm"
                       />
                    </div>
                 </div>
              </div>
              <button 
                type="submit" 
                disabled={loading || !url}
                className="w-full py-5 bg-secondary text-white font-black uppercase text-[11px] tracking-widest rounded-full shadow-2xl hover:scale-[1.02] active:scale-95 transition-all text-center flex items-center justify-center gap-3"
              >
                 {loading ? <i className="fi fi-rr-spinner animate-spin"></i> : <><Plus size={18} /> Shorten Now</>}
              </button>
           </form>
        </div>

        {/* Links List */}
        <div className="space-y-6">
           <div className="flex items-center justify-between px-4">
              <h3 className="text-xl font-black text-secondary">My Short Links</h3>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-[9px] font-black text-gray-400 uppercase tracking-widest">
                 {links.length} Links total
              </div>
           </div>

           <div className="space-y-4 pb-20">
              {links.length === 0 ? (
                <div className="bg-white p-24 rounded-[60px] border border-dashed border-gray-100 text-center space-y-4">
                   <div className="w-20 h-20 bg-gray-50 text-gray-200 rounded-full flex items-center justify-center mx-auto text-3xl"><i className="fi fi-rr-link-slash"></i></div>
                   <p className="text-gray-400 font-bold">No short links created yet.</p>
                </div>
              ) : (
                links.map((link, i) => {
                   const shortUrl = `${domain}/${link.alias}`
                   return (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} key={link.id} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl hover:translate-y-[-2px] transition-all group flex flex-col md:flex-row md:items-center gap-8">
                       <div className="flex-1 min-w-0 space-y-3">
                          <div className="flex items-center gap-3">
                             <h4 className="text-lg font-black text-secondary truncate">mnky.bio/{link.alias}</h4>
                             <button onClick={() => copyToClipboard(shortUrl)} className={`p-2 rounded-xl transition-all ${copied === shortUrl ? 'bg-green-50 text-green-500' : 'bg-gray-50 text-gray-300 hover:text-secondary hover:bg-white hover:shadow-sm'}`}>
                                <Copy size={14} />
                             </button>
                             <a href={link.url} target="_blank" className="p-2 bg-gray-50 text-gray-300 rounded-xl hover:text-secondary hover:bg-white hover:shadow-sm transition-all">
                                <ExternalLink size={14} />
                             </a>
                          </div>
                          <p className="text-xs font-medium text-gray-400 truncate opacity-50">{link.url}</p>
                       </div>
                       
                       <div className="flex items-center gap-10">
                          <div className="text-center">
                             <p className="text-[9px] font-black uppercase text-gray-300 tracking-widest">Clicks</p>
                             <div className="flex items-center gap-2 mt-1">
                                <BarChart size={12} className="text-indigo-500" />
                                <span className="text-xl font-black text-secondary">{link.clicks}</span>
                             </div>
                          </div>
                          <div className="h-10 w-[1px] bg-gray-50"></div>
                          <button onClick={() => deleteLink(link.id)} className="w-12 h-12 rounded-full bg-red-50 text-red-100 hover:text-red-500 hover:bg-red-100/30 transition-all flex items-center justify-center">
                             <Trash2 size={18} />
                          </button>
                       </div>
                    </motion.div>
                   )
                })
              )}
           </div>
        </div>
      </div>
    </div>
  )
}
