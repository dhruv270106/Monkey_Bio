'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, MessageCircle, Heart, Search, ChevronRight, Send, CheckCircle } from 'lucide-react'

export default function SupportPage({ initialTab = 'help' }: { initialTab?: 'help' | 'ask' | 'feedback' }) {
  const [activeTab, setActiveTab] = useState(initialTab)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => { setSubmitted(false); setActiveTab('help'); }, 3000)
  }

  const helpTopics = [
     { title: 'Getting Started', desc: 'New to Monkey Bio? Learn the basics of your profile.', icon: 'fi-rr-rocket' },
     { title: 'Customizing Design', desc: 'How to use themes, colors, and fonts.', icon: 'fi-rr-palette' },
     { title: 'Advanced Analytics', desc: 'Understanding your audience insights and clicks.', icon: 'fi-rr-stats' },
     { title: 'Billing & Plans', desc: 'Managing your subscription and upgrade options.', icon: 'fi-rr-credit-card' },
     { title: 'Social Integration', desc: 'Connecting Instagram, TikTok, and more.', icon: 'fi-rr-share' },
     { title: 'Domain Management', desc: 'Using custom domains and branded links.', icon: 'fi-rr-world' },
  ]

  return (
    <div className="flex-1 p-10 overflow-y-auto no-scrollbar bg-[#fcfcfc]">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-pink-500 flex items-center justify-center text-white shadow-lg shadow-pink-500/20">
                <HelpCircle size={24} />
              </div>
              <h1 className="font-black text-3xl text-secondary">Support Center</h1>
           </div>
           
           <div className="flex bg-gray-100 p-1 rounded-2xl border border-gray-100">
              <button 
                onClick={() => setActiveTab('help')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'help' ? 'bg-white text-secondary shadow-sm' : 'text-gray-400 hover:text-secondary'}`}
              >
                 Help Topics
              </button>
              <button 
                onClick={() => setActiveTab('ask')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'ask' ? 'bg-white text-secondary shadow-sm' : 'text-gray-400 hover:text-secondary'}`}
              >
                 Ask Question
              </button>
              <button 
                onClick={() => setActiveTab('feedback')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'feedback' ? 'bg-white text-secondary shadow-sm' : 'text-gray-400 hover:text-secondary'}`}
              >
                 Feedback
              </button>
           </div>
        </div>

        <AnimatePresence mode="wait">
           {activeTab === 'help' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="help" className="space-y-10">
                 <div className="relative">
                    <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                    <input type="text" placeholder="Search for answers..." className="w-full pl-20 pr-8 py-6 rounded-[32px] bg-white border border-gray-100 shadow-xl outline-none font-bold text-secondary text-lg focus:ring-2 focus:ring-pink-500/10 transition-all" />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {helpTopics.map((topic, i) => (
                       <div key={i} className="p-8 bg-white border border-gray-100 rounded-[40px] hover:shadow-2xl hover:translate-y-[-4px] transition-all group cursor-pointer flex items-start gap-6">
                          <div className="w-14 h-14 rounded-3xl bg-gray-50 flex items-center justify-center text-secondary group-hover:bg-pink-50 group-hover:text-pink-500 transition-colors shrink-0 shadow-sm border border-gray-50">
                             <i className={`fi ${topic.icon} text-lg`}></i>
                          </div>
                          <div className="flex-1">
                             <h4 className="text-lg font-black text-secondary">{topic.title}</h4>
                             <p className="text-xs font-medium text-gray-400 mt-2 leading-relaxed">{topic.desc}</p>
                             <div className="flex items-center gap-2 text-[9px] font-black uppercase text-pink-500 tracking-widest mt-4 opacity-0 group-hover:opacity-100 transition-all">
                                Read more <ChevronRight size={10} />
                             </div>
                          </div>
                       </div>
                    ))}
                 </div>
              </motion.div>
           )}

           {(activeTab === 'ask' || activeTab === 'feedback') && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="form" className="bg-white p-12 rounded-[50px] border border-gray-100 shadow-xl space-y-10 relative overflow-hidden">
                 {submitted ? (
                    <div className="py-20 text-center space-y-6">
                       <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto text-4xl shadow-lg border border-green-100"><CheckCircle size={40} /></div>
                       <h2 className="text-3xl font-black text-secondary">Success!</h2>
                       <p className="text-gray-400 font-bold max-w-sm mx-auto">Your {activeTab === 'ask' ? 'question' : 'feedback'} has been sent to our hero support team.</p>
                    </div>
                 ) : (
                    <>
                       <div className="space-y-4">
                          <h2 className="text-3xl font-black text-secondary">
                             {activeTab === 'ask' ? 'Ask a Question' : 'Share Your Feedback'}
                          </h2>
                          <p className="text-gray-400 font-bold max-w-md leading-relaxed">
                             {activeTab === 'ask' ? 'Having some issues? Our support team typically replies within 2 hours.' : 'Love Monkey Bio? Have a suggestion? We’d love to hear from you!'}
                          </p>
                       </div>

                       <form onSubmit={handleSubmit} className="space-y-8">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-300 ml-4">Your Name</label>
                                <input type="text" placeholder="John Doe" className="w-full px-8 py-5 rounded-[28px] bg-gray-50 border-none outline-none font-bold text-secondary focus:ring-2 focus:ring-pink-500/10 transition-all" required />
                             </div>
                             <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-300 ml-4">Subject</label>
                                <select className="w-full px-8 py-5 rounded-[28px] bg-gray-50 border-none outline-none font-bold text-secondary focus:ring-2 focus:ring-pink-500/10 transition-all appearance-none cursor-pointer">
                                   <option>General Support</option>
                                   <option>Billing Issue</option>
                                   <option>Feature Request</option>
                                   <option>Other</option>
                                </select>
                             </div>
                          </div>
                          <div className="space-y-3">
                             <label className="text-[10px] font-black uppercase tracking-widest text-gray-300 ml-4">Your Message</label>
                             <textarea placeholder="Write your message here..." className="w-full h-48 px-8 py-8 rounded-[40px] bg-gray-50 border-none outline-none font-bold text-secondary text-lg focus:ring-2 focus:ring-pink-500/10 transition-all resize-none" required></textarea>
                          </div>
                          <button type="submit" className="w-full py-5 bg-secondary text-white font-black uppercase text-[11px] tracking-widest rounded-full shadow-2xl hover:scale-[1.02] active:scale-95 transition-all text-center flex items-center justify-center gap-3">
                             <Send size={18} /> Send Message
                          </button>
                       </form>
                    </>
                 )}
                 <div className={`absolute -bottom-10 -right-10 text-[12rem] opacity-5 transition-transform duration-[2000ms] ${activeTab === 'ask' ? 'rotate-12' : 'rotate-[-10deg]'}`}>
                    {activeTab === 'ask' ? <MessageCircle /> : <Heart />}
                 </div>
              </motion.div>
           )}
        </AnimatePresence>
      </div>
    </div>
  )
}
