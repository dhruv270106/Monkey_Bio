'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { APPS, AppConfig } from '@/data/apps'

interface Link {
  id: string
  title: string
  url: string
  active: boolean
  platform?: string
}

interface ManageLinksModalProps {
  isOpen: boolean
  onClose: () => void
  links: Link[]
  onUpdate: (newLinks: Link[]) => void
}

export default function ManageLinksModal({ isOpen, onClose, links, onUpdate }: ManageLinksModalProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editUrl, setEditUrl] = useState('')

  const getIcon = (platformId: string) => {
    const app = APPS.find(a => a.id === platformId)
    return app?.icon || 'fi-rr-link'
  }

  const getColor = (platformId: string) => {
    const app = APPS.find(a => a.id === platformId)
    return app?.color || 'text-secondary'
  }

  const handleDelete = (id: string) => {
    const newLinks = links.filter(l => l.id !== id)
    onUpdate(newLinks)
  }

  const startEdit = (link: Link) => {
    setEditingId(link.id)
    setEditTitle(link.title)
    setEditUrl(link.url)
  }

  const handleSave = () => {
    if (!editingId) return
    const newLinks = links.map(l => l.id === editingId ? { ...l, title: editTitle, url: editUrl } : l)
    onUpdate(newLinks)
    setEditingId(null)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4">
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
               <h2 className="text-2xl font-black">Manage Social Cards</h2>
               <p className="text-gray-400 font-bold text-sm">Edit or remove your link cards ({links.length}/20)</p>
            </div>
            <button onClick={onClose} className="p-3 hover:bg-gray-50 rounded-full transition-colors">
               <i className="fi fi-rr-cross-small text-2xl text-gray-400"></i>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 no-scrollbar space-y-4">
            {links.map((link) => (
              <div key={link.id} className="bg-gray-50/50 p-6 rounded-[32px] border border-gray-100 flex items-center justify-between group">
                <div className="flex items-center gap-6 flex-1 min-w-0">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm flex-shrink-0 animate-fade-in">
                    <i className={`fi ${getIcon(link.platform || '')} text-2xl ${getColor(link.platform || '')}`}></i>
                  </div>
                  
                  {editingId === link.id ? (
                    <div className="flex-1 space-y-2 pr-4">
                       <input 
                         type="text" 
                         value={editTitle}
                         onChange={(e) => setEditTitle(e.target.value)}
                         className="w-full px-4 py-2 bg-white rounded-xl border-2 border-primary/20 outline-none focus:border-primary font-black text-sm"
                       />
                       <input 
                         type="text" 
                         value={editUrl}
                         onChange={(e) => setEditUrl(e.target.value)}
                         className="w-full px-4 py-2 bg-white rounded-xl border-2 border-primary/20 outline-none focus:border-primary font-bold text-xs text-gray-400"
                       />
                    </div>
                  ) : (
                    <div className="flex-1 min-w-0 pr-4">
                      <h4 className="font-black text-secondary truncate">{link.title}</h4>
                      <p className="text-xs font-bold text-gray-400 truncate mt-1">{link.url}</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {editingId === link.id ? (
                    <button 
                      onClick={handleSave}
                      className="w-10 h-10 rounded-xl bg-primary text-secondary flex items-center justify-center shadow-lg active:scale-95 transition-all"
                    >
                      <i className="fi fi-rr-check text-xs"></i>
                    </button>
                  ) : (
                    <button 
                      onClick={() => startEdit(link)}
                      className="w-10 h-10 rounded-xl bg-white text-gray-400 hover:text-primary flex items-center justify-center shadow-sm hover:shadow-md transition-all active:scale-95"
                    >
                      <i className="fi fi-rr-pencil text-xs"></i>
                    </button>
                  )}
                  
                  <button 
                    onClick={() => handleDelete(link.id)}
                    className="w-10 h-10 rounded-xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all active:scale-95 border border-red-100"
                  >
                    <i className="fi fi-rr-trash text-xs"></i>
                  </button>
                </div>
              </div>
            ))}
            
            {links.length === 0 && (
              <div className="py-20 text-center space-y-4">
                <i className="fi fi-rr-link text-4xl text-gray-100 block"></i>
                <p className="text-gray-400 font-bold">No social cards added yet.</p>
              </div>
            )}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100 flex justify-end">
             <button onClick={onClose} className="px-10 py-4 bg-secondary text-white font-black rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all">
                Done
             </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
