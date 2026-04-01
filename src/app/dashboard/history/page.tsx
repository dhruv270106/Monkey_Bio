'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { History as HistoryIcon, Clock, Link as LinkIcon, RefreshCw, Trash2, CheckCircle2 } from 'lucide-react'

export default function HistoryPage() {
  const [activities, setActivities] = useState([
     { id: '1', type: 'link', action: 'Added new link', detail: 'GitHub Profile', time: '2 hours ago' },
     { id: '2', type: 'post', action: 'Scheduled post', detail: 'Instagram - "New Coffee Shop"', time: '5 hours ago' },
     { id: '3', type: 'account', action: 'Updated profile', detail: 'Changed avatar image', time: '1 day ago' },
     { id: '4', type: 'shortener', action: 'Created short link', detail: 'mnky.bio/promo-june', time: '2 days ago' },
     { id: '5', type: 'link', action: 'Updated link title', detail: 'Shop Now -> Explore Collection', time: '3 days ago' },
  ])

  return (
    <div className="flex-1 p-10 overflow-y-auto no-scrollbar bg-[#fcfcfc]">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center text-white shadow-lg">
                <HistoryIcon size={24} />
              </div>
              <div>
                <h1 className="font-black text-3xl text-secondary">Activity History</h1>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mt-1">Track your recent changes and updates</p>
              </div>
           </div>
           <button onClick={() => setActivities([])} className="text-[10px] font-black uppercase text-red-500 tracking-widest hover:underline">Clear All</button>
        </div>

        <div className="bg-white p-10 rounded-[50px] border border-gray-100 shadow-xl space-y-8">
           <div className="space-y-4">
              {activities.length === 0 ? (
                <div className="text-center py-20 text-gray-400">No recent activity.</div>
              ) : (
                activities.map((activity, i) => (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} key={activity.id} className="flex items-center gap-6 p-6 rounded-[32px] hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group">
                     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                        activity.type === 'link' ? 'bg-purple-50 text-purple-500' :
                        activity.type === 'post' ? 'bg-orange-50 text-orange-500' :
                        activity.type === 'account' ? 'bg-primary/20 text-secondary' :
                        'bg-indigo-50 text-indigo-500'
                     }`}>
                        {activity.type === 'link' ? <LinkIcon size={18} /> :
                         activity.type === 'post' ? <Clock size={18} /> :
                         activity.type === 'account' ? <CheckCircle2 size={18} /> :
                         <RefreshCw size={18} />}
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                           <h4 className="font-black text-secondary text-sm">{activity.action}</h4>
                           <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{activity.time}</span>
                        </div>
                        <p className="text-xs font-medium text-gray-400 mt-1">{activity.detail}</p>
                     </div>
                  </motion.div>
                ))
              )}
           </div>
        </div>
      </div>
    </div>
  )
}
