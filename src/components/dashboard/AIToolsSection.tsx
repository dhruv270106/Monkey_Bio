'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Copy, RefreshCw, Send, Image as ImageIcon, MessageSquare, Lightbulb } from 'lucide-react'

export default function AIToolsSection({ profile, initialTool = 'caption' }: { profile: any, initialTool?: 'caption' | 'ideas' }) {
  const [tool, setTool] = useState<'caption' | 'ideas'>(initialTool)
  const [loading, setLoading] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState<string | string[]>('')
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    if (!prompt) return
    setLoading(true)
    
    // Simulating AI delay
    setTimeout(() => {
       if (tool === 'caption') {
          setResult("✨ Growing my audience one post at a time! 🚀 Check out my latest link in bio for more exclusive updates. #SocialGrowth #MonkeyBio #Innovate")
       } else {
          setResult([
            "A 'day in the life' vlog featuring your workspace setup.",
            "Top 5 tools you can't live without as a creator.",
            "Answering the most frequent question you get in DMs.",
            "Before vs After transformation of your latest project."
          ])
       }
       setLoading(false)
    }, 2000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex-1 p-10 overflow-y-auto no-scrollbar bg-[#fcfcfc]">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#DEF141] flex items-center justify-center text-secondary shadow-lg">
                <Sparkles size={24} />
              </div>
              <div>
                <h1 className="font-black text-3xl text-secondary">Monkey AI</h1>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mt-1">Supercharge your social presence</p>
              </div>
           </div>
           
           <div className="flex bg-gray-100 p-1 rounded-2xl border border-gray-100">
              <button 
                onClick={() => { setTool('caption'); setResult(''); setPrompt(''); }}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${tool === 'caption' ? 'bg-white text-secondary shadow-sm' : 'text-gray-400 hover:text-secondary'}`}
              >
                 <MessageSquare size={14} /> Caption
              </button>
              <button 
                onClick={() => { setTool('ideas'); setResult(''); setPrompt(''); }}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${tool === 'ideas' ? 'bg-white text-secondary shadow-sm' : 'text-gray-400 hover:text-secondary'}`}
              >
                 <Lightbulb size={14} /> Ideas
              </button>
           </div>
        </div>

        <div className="bg-white p-10 rounded-[50px] border border-gray-100 shadow-xl space-y-10">
           <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-300 ml-4">
                {tool === 'caption' ? 'What is your post about?' : 'What is your niche or topic?'}
              </label>
              <div className="relative">
                 <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full h-40 p-8 pt-10 rounded-[40px] bg-gray-50 border-2 border-transparent focus:border-primary/10 transition-all outline-none font-bold text-secondary text-lg resize-none"
                  placeholder={tool === 'caption' ? "e.g. My new coffee shop opening..." : "e.g. Tech reviews, Minimal Lifestyle..."}
                 />
                 <button 
                  onClick={handleGenerate}
                  disabled={loading || !prompt}
                  className="absolute bottom-6 right-6 w-14 h-14 bg-secondary text-white rounded-2xl shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
                 >
                    {loading ? <RefreshCw className="animate-spin" size={20} /> : <Send size={20} />}
                 </button>
              </div>
           </div>

           <AnimatePresence>
              {result && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4 pt-10 border-t border-gray-50">
                    <div className="flex items-center justify-between px-4">
                       <p className="text-[10px] font-black uppercase tracking-widest text-primary">Generated {tool === 'caption' ? 'Caption' : 'Ideas'}</p>
                       <button 
                        onClick={() => copyToClipboard(Array.isArray(result) ? result.join('\n') : result)}
                        className="flex items-center gap-2 text-[9px] font-black text-secondary tracking-widest bg-gray-50 px-4 py-2 rounded-full hover:bg-white hover:shadow-sm"
                       >
                          {copied ? 'Copied!' : tool === 'caption' ? 'Copy Text' : 'Copy All'}
                       </button>
                    </div>

                    <div className="p-8 bg-gray-50 rounded-[40px] border border-gray-100">
                       {tool === 'caption' ? (
                          <p className="text-xl font-bold text-secondary leading-relaxed">{result}</p>
                       ) : (
                          <ul className="space-y-4">
                             {(result as string[]).map((idea, i) => (
                               <li key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-white transition-all group cursor-pointer border border-transparent hover:border-gray-100">
                                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-xs shrink-0">{i+1}</div>
                                  <p className="text-lg font-bold text-secondary">{idea}</p> 
                               </li>
                             ))}
                          </ul>
                       )}
                    </div>
                </motion.div>
              )}
           </AnimatePresence>
        </div>

        <div className="bg-[#1e293b] p-10 rounded-[50px] shadow-2xl relative overflow-hidden group">
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 text-center md:text-left">
                 <h4 className="text-white font-black text-2xl">Create visuals with AI</h4>
                 <p className="text-white/40 font-bold text-sm max-w-sm">Bring your ideas to life with our high-fidelity AI Image Generator coming soon.</p>
              </div>
              <button className="px-10 py-4 bg-primary text-secondary font-black rounded-full uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20">Notify Me</button>
           </div>
           <ImageIcon className="absolute bottom-[-20px] right-[-20px] text-[10rem] text-white/5 rotate-[-15deg]" />
        </div>
      </div>
    </div>
  )
}
