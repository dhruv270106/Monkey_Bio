'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { APPS, CATEGORIES, SUGGESTED_APPS, AppConfig } from '@/data/apps'

interface AddLinkModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (linkData: { title: string; url: string; platform: string }) => void
}

export default function AddLinkModal({ isOpen, onClose, onAdd }: AddLinkModalProps) {
  const [activeCategory, setActiveCategory] = useState('suggested')
  const [search, setSearch] = useState('')
  const [selectedApp, setSelectedApp] = useState<AppConfig | null>(null)
  const [inputValue, setInputValue] = useState('')

  const filteredApps = useMemo(() => {
    let list = activeCategory === 'suggested' ? SUGGESTED_APPS : APPS.filter(a => a.category === activeCategory)
    if (search) {
      list = APPS.filter(a => a.title.toLowerCase().includes(search.toLowerCase()))
    }
    return list
  }, [activeCategory, search])

  const handleAddLink = () => {
    if (!selectedApp || !inputValue) return
    
    let finalUrl = inputValue
    if (selectedApp.prefix && !inputValue.startsWith('http')) {
      // If it's just a username/handle, add the prefix
      finalUrl = selectedApp.prefix + inputValue.replace('@', '')
    }

    onAdd({
      title: selectedApp.title,
      url: finalUrl,
      platform: selectedApp.id
    })

    setInputValue('')
    setSelectedApp(null)
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-4xl bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col h-[80vh]"
        >
          {/* Header & Search */}
          <div className="px-8 pt-8 pb-4 border-b border-gray-100 bg-white">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black">Add Link</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                 <i className="fi fi-rr-cross-small text-xl text-gray-400"></i>
              </button>
            </div>
            
            <div className="relative">
              <i className="fi fi-rr-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input 
                type="text" 
                placeholder="Paste or search a link"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-primary/20 border border-transparent focus:border-primary/50 font-medium transition-all"
              />
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar */}
            <div className="w-56 bg-white border-r border-gray-50 overflow-y-auto p-4 space-y-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id)
                    setSearch('')
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                    activeCategory === cat.id && !search ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50 text-gray-400'
                  }`}
                >
                  <i className={`fi ${cat.icon} transition-colors`}></i>
                  <span>{cat.name}</span>
                </button>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-50">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-gray-400 hover:bg-gray-50">
                  <i className="fi fi-rr-apps"></i>
                  <span>View all</span>
                </button>
              </div>
            </div>

            {/* List Content */}
            <div className="flex-1 overflow-y-auto p-8 bg-gray-50/30 auto-scrollbar">
               {/* Quick Feature Cards (Only if no search) */}
               {!search && activeCategory === 'suggested' && (
                 <div className="grid grid-cols-4 gap-4 mb-10">
                    {[
                      { title: 'Collection', icon: 'fi-rr-grid', color: 'bg-purple-100 text-purple-600' },
                      { title: 'Link', icon: 'fi-rr-link', color: 'bg-blue-100 text-blue-600' },
                      { title: 'Product', icon: 'fi-rr-shopping-bag', color: 'bg-pink-100 text-pink-600' },
                      { title: 'Form', icon: 'fi-rr-form', color: 'bg-emerald-100 text-emerald-600' }
                    ].map((f, i) => (
                      <div key={i} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center gap-2 cursor-pointer hover:scale-105 hover:shadow-md transition-all">
                        <div className={`w-10 h-10 rounded-2xl ${f.color} flex items-center justify-center`}>
                          <i className={`fi ${f.icon} text-lg`}></i>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider">{f.title}</span>
                      </div>
                    ))}
                 </div>
               )}

               <div className="space-y-3">
                 {filteredApps.map((app) => (
                   <div 
                    key={app.id} 
                    onClick={() => setSelectedApp(app)}
                    className="bg-white p-5 rounded-[24px] border border-gray-100 shadow-sm flex items-center justify-between hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group"
                   >
                     <div className="flex items-center gap-5">
                       <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center transition-transform group-hover:scale-110">
                          <i className={`fi ${app.icon} text-2xl ${app.color}`}></i>
                       </div>
                       <div>
                         <h4 className="font-black text-secondary group-hover:text-primary transition-colors">{app.title}</h4>
                         <p className="text-xs font-bold text-gray-400">{app.description}</p>
                       </div>
                     </div>
                     <i className="fi fi-rr-angle-small-right text-gray-300 group-hover:text-primary transition-colors text-xl"></i>
                   </div>
                 ))}
                 
                 {filteredApps.length === 0 && (
                   <div className="py-20 text-center">
                     <i className="fi fi-rr-search text-4xl text-gray-200 mb-4 inline-block"></i>
                     <p className="text-gray-400 font-bold">No apps found for "{search}"</p>
                   </div>
                 )}
               </div>
            </div>
          </div>
        </motion.div>

        {/* SUB MODAL: ADD SPECIFIC APP */}
        <AnimatePresence>
          {selectedApp && (
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            >
               <motion.div 
                 initial={{ scale: 0.9, y: 20 }}
                 animate={{ scale: 1, y: 0 }}
                 exit={{ scale: 0.9, y: 20 }}
                 className="relative w-full max-w-md bg-white rounded-[40px] p-10 shadow-2xl text-center"
               >
                 <button 
                   onClick={() => setSelectedApp(null)}
                   className="absolute top-8 right-8 text-gray-300 hover:text-secondary transition-colors"
                 >
                   <i className="fi fi-rr-cross-small text-2xl"></i>
                 </button>

                 <div className="w-20 h-20 rounded-[32px] bg-gray-50 flex items-center justify-center mx-auto mb-6 shadow-sm">
                   <i className={`fi ${selectedApp.icon} text-4xl ${selectedApp.color}`}></i>
                 </div>
                 
                 <h3 className="text-2xl font-black mb-2">Add {selectedApp.title}</h3>
                 <p className="text-sm font-bold text-gray-400 mb-10">Enter your {selectedApp.title} username or link</p>

                 <div className="space-y-4">
                   <div className="relative">
                     {selectedApp.prefix && inputValue && !inputValue.startsWith('http') && (
                       <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 font-bold text-sm pointer-events-none">
                         {selectedApp.id === 'instagram' ? 'instagram.com/' : 
                          selectedApp.id === 'tiktok' ? 'tiktok.com/@' : ''}
                       </span>
                     )}
                     <input 
                       autoFocus
                       type="text" 
                       placeholder={selectedApp.placeholder}
                       value={inputValue}
                       onChange={(e) => setInputValue(e.target.value)}
                       className={`w-full ${selectedApp.prefix && inputValue && !inputValue.startsWith('http') ? 'pl-36' : 'px-6'} py-5 bg-gray-50 rounded-3xl border-2 border-transparent focus:border-primary/50 outline-none font-bold text-lg transition-all`}
                     />
                   </div>

                   <button 
                     onClick={handleAddLink}
                     disabled={!inputValue}
                     className="w-full py-5 bg-secondary text-white font-black rounded-full hover:bg-gray-800 disabled:opacity-50 transition-all shadow-xl active:scale-95"
                   >
                     Add Link
                   </button>
                    <button 
                     onClick={() => setSelectedApp(null)}
                     className="w-full py-4 text-gray-400 font-bold hover:text-secondary transition-all"
                   >
                     Cancel
                   </button>
                 </div>
               </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  )
}
