'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function BillingPage() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    const { data } = await supabase.from('monkey_bio').select('*').eq('id', session.user.id).single()
    if (data) setProfile(data)
    setLoading(false)
  }

  if (loading) return (
    <div className="h-full flex items-center justify-center">
       <i className="fi fi-rr-spinner animate-spin text-2xl text-primary"></i>
    </div>
  )

  const isPro = profile?.subscription_plan === 'pro'

  return (
    <div className="h-full flex flex-col bg-[#fcfcfc] overflow-hidden">
      <div className="p-8 md:p-12 max-w-4xl mx-auto w-full space-y-12 overflow-y-auto no-scrollbar">
        
        <div>
           <h1 className="text-4xl font-black text-secondary">Billing & Subscription</h1>
           <p className="text-gray-400 font-bold mt-2 uppercase tracking-widest text-[10px]">Manage your plan and payment methods</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* PLAN CARD */}
            <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden group">
               <div className="relative z-10 space-y-8">
                  <div className="flex items-center justify-between">
                     <p className="text-[10px] font-black uppercase tracking-widest text-primary">Current Plan</p>
                     <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tight ${isPro ? 'bg-primary text-secondary' : 'bg-gray-100 text-gray-500'}`}>
                        {isPro ? 'PRO PLAN' : 'FREE PLAN'}
                     </div>
                  </div>
                  
                  <div>
                     <h3 className="text-4xl font-black text-secondary">₹ {isPro ? '99' : '0'}/mo</h3>
                     <p className="text-sm font-medium text-gray-400 mt-2">Next payment: Never (Free)</p>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-gray-50">
                     {[
                       'Unlimited Links',
                       'Basic Analytics',
                       'Monkey Bio Branding',
                       'Social Planner (Limited)',
                     ].map(f => (
                       <div key={f} className="flex items-center gap-3">
                          <i className="fi fi-rr-check text-green-500 text-sm"></i>
                          <span className="text-xs font-bold text-secondary opacity-70">{f}</span>
                       </div>
                     ))}
                  </div>

                  <Link href="/pricing" className="block w-full py-4 bg-secondary text-white font-black uppercase text-[10px] tracking-widest rounded-full text-center hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-black/20">
                     {isPro ? 'Manage Subscription' : 'Upgrade to Pro'}
                  </Link>
               </div>
               
               <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
            </div>

            {/* BILLING SETTINGS */}
            <div className="space-y-8">
               <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
                  <h4 className="text-lg font-black text-secondary flex items-center gap-2">
                    <i className="fi fi-rr-credit-card text-gray-300"></i>
                    Payment Details
                  </h4>
                  <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex items-center justify-between opacity-50">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center">
                           <i className="fi fi-brands-visa text-lg"></i>
                        </div>
                        <div>
                           <p className="text-xs font-extrabold text-secondary">No Card Added</p>
                           <p className="text-[9px] font-bold text-gray-400">Add a card for pro features</p>
                        </div>
                     </div>
                     <button className="text-[9px] font-black uppercase text-primary hover:underline">Add</button>
                  </div>
                  <button className="w-full py-3 border-2 border-gray-100 text-gray-400 font-extrabold text-[10px] uppercase tracking-widest rounded-full hover:bg-gray-50 transition-colors">Manage Invoices</button>
               </div>

               <div className="bg-[#1e293b] p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
                  <div className="relative z-10 space-y-6">
                     <h4 className="text-lg font-black tracking-tight">Need a custom plan?</h4>
                     <p className="text-xs font-medium text-white/60 leading-relaxed max-w-[200px]">Talk to our team about enterprise solutions for your brand.</p>
                     <button className="px-8 py-3 bg-[#D2E823] text-black font-black text-[9px] uppercase tracking-widest rounded-full hover:scale-105 transition-all">Contact Sales</button>
                  </div>
                  <i className="fi fi-rr-envelope-plus absolute bottom-[-10px] right-[-10px] text-8xl opacity-10 rotate-[-20deg]"></i>
               </div>
            </div>
        </div>

        {/* RECENT BILLING HISTORY */}
        <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
           <h4 className="text-lg font-black text-secondary flex items-center gap-2">
              <i className="fi fi-rr-time-past text-gray-300"></i>
              Billing History
           </h4>
           <div className="space-y-4">
              <div className="grid grid-cols-4 px-6 text-[9px] font-black uppercase text-gray-400 tracking-widest pb-4 border-b border-gray-50">
                 <span>Invoice ID</span>
                 <span>Date</span>
                 <span>Amount</span>
                 <span>Status</span>
              </div>
              <div className="text-center py-12">
                 <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mx-auto text-gray-300 mb-4">
                    <i className="fi fi-rr-document-signed"></i>
                 </div>
                 <p className="text-xs font-bold text-gray-400">No invoices found yet.</p>
              </div>
           </div>
        </div>

      </div>
    </div>
  )
}
