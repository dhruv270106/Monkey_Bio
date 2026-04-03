'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { APPS, CATEGORIES, SUGGESTED_APPS, AppConfig } from '@/data/apps'

interface AddLinkModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (linkData: any) => void
  linksCount: number
}

export default function AddLinkModal({ isOpen, onClose, onAdd, linksCount }: AddLinkModalProps) {
  const [activeCategory, setActiveCategory] = useState('suggested')
  const [search, setSearch] = useState('')
  const [selectedApp, setSelectedApp] = useState<AppConfig | null>(null)
  
  // Input states for different types
  const [inputValue, setInputValue] = useState('')
  const [description, setDescription] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)

  const filteredAppsGrouped = useMemo(() => {
    if (search) {
      return [{
        name: 'Search Results',
        apps: APPS.filter(a => a.title.toLowerCase().includes(search.toLowerCase()))
      }]
    }

    if (activeCategory === 'all') {
      return CATEGORIES.map(cat => ({
        name: cat.name,
        apps: APPS.filter(a => a.category === cat.id)
      }))
    }

    if (activeCategory === 'suggested') {
      return [{
        name: 'Suggested',
        apps: SUGGESTED_APPS
      }]
    }

    const cat = CATEGORIES.find(c => c.id === activeCategory)
    return [{
      name: cat?.name || '',
      apps: APPS.filter(a => a.category === activeCategory)
    }]
  }, [activeCategory, search])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setSelectedFile(file)
    const reader = new FileReader()
    reader.onload = (event) => setFilePreview(event.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleAddLink = () => {
    if (!selectedApp) return
    
    if (linksCount >= 30) {
      alert('Maximum 30 items reached!')
      return
    }
    
    let finalLinkData: any = {
      id: Math.random().toString(36).substr(2, 9),
      title: inputValue || selectedApp.title,
      platform: selectedApp.id,
      active: true,
      layout: 'classic'
    }

    if (selectedApp.type === 'file' || selectedApp.type === 'media') {
       if (!filePreview) { alert('Please select a file'); return }
       finalLinkData.thumbnail = filePreview
       finalLinkData.url = filePreview // Store preview URL for now
    } else if (selectedApp.type === 'text') {
       finalLinkData.description = description
       finalLinkData.url = '#'
    } else {
       if (!inputValue) { alert('Please enter a value'); return }
       let finalUrl = inputValue
       if (selectedApp.prefix && !inputValue.startsWith('http')) {
         finalUrl = selectedApp.prefix + inputValue.replace('@', '')
       }
       finalLinkData.url = finalUrl
    }

    onAdd(finalLinkData)
    resetModal()
    onClose()
  }

  const resetModal = () => {
    setInputValue('')
    setDescription('')
    setSelectedFile(null)
    setFilePreview(null)
    setSelectedApp(null)
    setSearch('')
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
          className="relative w-full max-w-5xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col h-[85vh]"
        >
          {/* Header & Search */}
          <div className="px-10 pt-10 pb-6 border-b border-gray-100 bg-white shadow-sm z-20">
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h2 className="text-2xl font-medium">Add New Asset</h2>
                  <p className="text-[10px] font-medium uppercase text-gray-400 tracking-widest mt-1">Select what you want to add to your Monkey Bio</p>
               </div>
               <button onClick={onClose} className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-2xl hover:bg-gray-100 transition-all text-secondary">
                  <i className="fi fi-rr-cross-small text-2xl"></i>
               </button>
            </div>
            
            <div className="relative">
              <i className="fi fi-rr-search absolute left-6 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input 
                type="text" 
                placeholder="Search services, platforms, apps..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-16 pr-8 py-5 bg-gray-100 rounded-3xl outline-none border-2 border-transparent focus:border-primary/20 font-medium transition-all text-secondary"
              />
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden bg-white">
            {/* Sidebar */}
            <div className="w-72 bg-gray-50/50 border-r border-gray-100 overflow-y-auto p-6 space-y-2 no-scrollbar">
               <p className="text-[9px] font-medium uppercase text-gray-400 tracking-[0.2em] px-4 mb-4">Categories</p>
               <button
                  onClick={() => { setActiveCategory('suggested'); setSearch('') }}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-[22px] font-medium text-[11px] uppercase tracking-widest transition-all ${
                    activeCategory === 'suggested' && !search ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'hover:bg-white text-gray-400 hover:text-secondary'
                  }`}
               >
                  <i className="fi fi-rr-star text-sm"></i>
                  <span>Suggested</span>
               </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id)
                    setSearch('')
                  }}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-[22px] font-medium text-[11px] uppercase tracking-widest transition-all ${
                    activeCategory === cat.id && !search ? `${cat.bg} text-white shadow-xl shadow-current/20` : `hover:bg-white text-gray-400 hover:${cat.color}`
                  }`}
                >
                  <i className={`fi ${cat.icon} text-sm`}></i>
                  <span>{cat.name}</span>
                </button>
              ))}
              <div className="pt-4 mt-6 border-t border-gray-100">
                <button 
                  onClick={() => { setActiveCategory('all'); setSearch('') }}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-[22px] font-medium text-[11px] uppercase tracking-widest transition-all ${
                    activeCategory === 'all' && !search ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'hover:bg-white text-gray-400 hover:text-secondary'
                  }`}
                >
                  <i className="fi fi-rr-apps text-sm"></i>
                  <span>View all</span>
                </button>
              </div>
            </div>

            {/* List Content */}
            <div className="flex-1 overflow-y-auto p-10 bg-white no-scrollbar">
               <div className="space-y-12">
                 {filteredAppsGrouped.map((group, groupIdx) => (
                   <div key={groupIdx} className="space-y-6">
                     {group.name && (
                       <h3 className="text-[10px] font-medium uppercase tracking-[0.3em] text-gray-300 px-2">{group.name}</h3>
                     )}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {group.apps.map((app) => (
                         <div 
                          key={app.id} 
                          onClick={() => { setSelectedApp(app); setInputValue('') }}
                          className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex items-center justify-between hover:border-primary/20 hover:shadow-xl hover:translate-y-[-2px] transition-all cursor-pointer group"
                         >
                           <div className="flex items-center gap-6">
                             <div className="w-14 h-14 rounded-[24px] bg-gray-50 flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm">
                                <i className={`fi ${app.icon} text-2xl ${app.color}`}></i>
                             </div>
                             <div className="min-w-0 pr-4">
                               <h4 className="font-medium text-secondary group-hover:text-primary transition-colors truncate">{app.title}</h4>
                               <p className="text-[10px] font-medium text-gray-400 truncate opacity-80">{app.description}</p>
                             </div>
                           </div>
                           <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 group-hover:bg-primary group-hover:text-white transition-all">
                              <i className="fi fi-rr-plus text-[10px]"></i>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 ))}
                 
                 {filteredAppsGrouped.every(g => g.apps.length === 0) && (
                   <div className="py-24 text-center">
                     <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 opacity-40">
                        <i className="fi fi-rr-search text-4xl text-gray-300"></i>
                     </div>
                     <p className="text-gray-400 font-medium uppercase tracking-widest text-[10px]">No matches found for "{search}"</p>
                   </div>
                 )}
               </div>
            </div>
          </div>
        </motion.div>

        {/* INPUT MODAL - CONTEXTUAL BASED ON TYPE */}
        <AnimatePresence>
          {selectedApp && (
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl"
            >
               <motion.div 
                 initial={{ scale: 0.9, y: 50, opacity: 0 }}
                 animate={{ scale: 1, y: 0, opacity: 1 }}
                 exit={{ scale: 0.9, y: 30, opacity: 0 }}
                 transition={{ type: 'spring', damping: 25 }}
                 className="relative w-full max-w-xl bg-white rounded-[48px] p-12 shadow-[0_50px_100px_rgba(0,0,0,0.3)] text-center flex flex-col items-center"
               >
                 <button 
                   onClick={() => setSelectedApp(null)}
                   className="absolute top-10 right-10 w-10 h-10 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-gray-100 transition-all hover:rotate-90"
                 >
                   <i className="fi fi-rr-cross-small text-xl"></i>
                 </button>

                 <div className="w-24 h-24 rounded-[36px] bg-gray-50 flex items-center justify-center mb-8 shadow-xl shadow-black/5 ring-8 ring-white transform hover:scale-105 transition-all">
                   <i className={`fi ${selectedApp.icon} text-5xl ${selectedApp.color}`}></i>
                 </div>
                 
                 <h3 className="text-3xl font-medium mb-2 tracking-tight">Add {selectedApp.title}</h3>
                 <p className="text-sm font-medium text-gray-400 mb-10 px-8 opacity-80">{selectedApp.description}</p>

                 <div className="space-y-6 w-full">
                    {/* TYPED INPUTS */}
                    {selectedApp.type === 'link' && (
                       <div className="relative">
                          <input 
                            autoFocus
                            type="text" 
                            placeholder={selectedApp.placeholder}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-full px-10 py-6 bg-gray-50 rounded-[32px] border-2 border-transparent focus:border-primary/20 outline-none font-medium text-xl transition-all shadow-inner placeholder:text-gray-300"
                          />
                          {selectedApp.prefix && !inputValue.startsWith('http') && (
                             <div className="mt-4 px-6 py-3 bg-primary/5 rounded-2xl flex items-center gap-3">
                                <span className="text-[10px] font-medium text-primary uppercase tracking-widest">Platform Prefix:</span>
                                <span className="text-[10px] font-medium text-gray-400">{selectedApp.prefix}</span>
                             </div>
                          )}
                       </div>
                    )}

                    {(selectedApp.type === 'file' || selectedApp.type === 'media') && (
                       <div className="space-y-4">
                          <div 
                            onClick={() => document.getElementById('asset-upload')?.click()}
                            className="w-full p-10 border-4 border-dashed border-gray-100 rounded-[40px] flex flex-col items-center justify-center gap-4 hover:border-primary/30 transition-all cursor-pointer group bg-gray-50/50"
                          >
                             {filePreview ? (
                                <div className="w-full h-48 rounded-3xl overflow-hidden relative">
                                   <img src={filePreview} className="w-full h-full object-cover" />
                                   <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                                      <span className="text-white font-medium text-xs uppercase tracking-widest">Change File</span>
                                   </div>
                                </div>
                             ) : (
                                <>
                                   <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-primary shadow-xl group-hover:scale-110 transition-all">
                                      <i className="fi fi-rr-cloud-upload-alt text-2xl"></i>
                                   </div>
                                   <div>
                                      <p className="font-medium text-secondary">Upload your {selectedApp.type}</p>
                                      <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mt-1">Recommended: 1080x1080px</p>
                                   </div>
                                </>
                             )}
                             <input id="asset-upload" type="file" className="hidden" onChange={handleFileUpload} accept={selectedApp.type === 'media' ? 'image/*,video/*' : '*'} />
                          </div>
                       </div>
                    )}

                    {selectedApp.type === 'text' && (
                       <div className="space-y-4">
                          <input 
                            type="text" 
                            placeholder={selectedApp.placeholder}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-full px-10 py-5 bg-gray-50 rounded-3xl border-2 border-transparent focus:border-primary/20 outline-none font-medium text-xl transition-all"
                          />
                          <textarea 
                            placeholder="Enter the body text for your profile..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full h-40 p-10 bg-gray-50 rounded-[40px] border-2 border-transparent focus:border-primary/20 outline-none font-medium text-secondary transition-all resize-none shadow-inner"
                          />
                       </div>
                    )}

                    {selectedApp.type === 'form' && (
                       <div className="space-y-4">
                          <input 
                            type="text" 
                            placeholder="Form Title (e.g., Get my Newsletter)"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-full px-10 py-5 bg-gray-50 rounded-3xl border-2 border-transparent focus:border-primary/20 outline-none font-medium text-xl transition-all"
                          />
                          <div className="grid grid-cols-2 gap-4">
                             <div className="p-4 bg-gray-50 rounded-2xl border-2 border-primary/20 flex items-center justify-between">
                                <span className="text-xs font-medium text-secondary">Email Field</span>
                                <i className="fi fi-rr-check-circle text-primary"></i>
                             </div>
                             <div className="p-4 bg-gray-50 rounded-2xl border-2 border-transparent flex items-center justify-between opacity-40">
                                <span className="text-xs font-medium text-secondary">Name Field</span>
                                <i className="fi fi-rr-circle"></i>
                             </div>
                          </div>
                       </div>
                    )}

                    {/* ACTIONS */}
                    <div className="pt-6 grid grid-cols-2 gap-4">
                       <button 
                         onClick={() => setSelectedApp(null)}
                         className="w-full py-5 text-[11px] font-medium uppercase tracking-widest text-gray-400 hover:text-secondary transition-all"
                       >
                         Cancel
                       </button>
                       <button 
                         onClick={handleAddLink}
                         className="w-full py-5 bg-primary text-white font-medium rounded-full shadow-[0_15px_30px_rgba(139,62,255,0.3)] hover:scale-105 active:scale-95 transition-all uppercase tracking-[0.2em] text-[11px]"
                       >
                         Add to Bio
                       </button>
                    </div>
                 </div>
               </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  )
}

