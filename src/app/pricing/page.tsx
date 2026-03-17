'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import { 
  CheckCircle2, 
  Zap, 
  Crown, 
  Star, 
  ChevronRight, 
  Upload, 
  AlertCircle,
  Clock,
  ArrowRight
} from 'lucide-react'
import { sendNotification } from '@/lib/notifications'

const plans = [
  { 
    id: 'free', 
    name: 'Free Starter', 
    price: 0, 
    period: 'Forever',
    features: ['Unlimited Links', 'Basic Analytics', '3 Standard Themes', 'Standard Support'],
    color: 'bg-blue-500',
    type: 'basic'
  },
  { 
    id: 'pro_monthly', 
    name: 'Pro Monthly', 
    price: 19, 
    period: 'Month',
    features: ['Everything in Free', 'Advanced Analytics', 'All Premium Themes', 'Priority Support', 'Custom Domains', 'Remove Branding'],
    color: 'bg-purple-500',
    type: 'premium',
    popular: true
  },
  { 
    id: 'pro_yearly', 
    name: 'Pro Yearly', 
    price: 149, 
    period: 'Year',
    features: ['Everything in Pro', 'White-labeling', 'API Access', '24/7 Managed Setup', 'Beta Features Access'],
    color: 'bg-emerald-500',
    type: 'premium'
  }
]

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [isUpgrading, setIsUpgrading] = useState(false)
  const [proofUrl, setProofUrl] = useState('')
  const [transactionId, setTransactionId] = useState('')
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      const { data } = await supabase.from('monkey_bio').select('*').eq('id', session.user.id).single()
      setProfile(data)
    }
  }

  const handleUpgradeRequest = async () => {
    if (!proofUrl || !transactionId) {
      alert('Please provide transaction ID and payment proof URL.')
      return
    }

    setLoading(true)
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      alert('Please login first.')
      return
    }

    const { error } = await supabase.from('payments').insert({
      user_id: session.user.id,
      user_name: profile?.display_name || profile?.username,
      user_email: session.user.email,
      amount: selectedPlan.price,
      currency: 'USD',
      method: 'Manual/Crypto',
      transaction_id: transactionId,
      proof_url: proofUrl,
      status: 'pending',
      plan_id: selectedPlan.id
    })

    if (error) {
      alert(error.message)
    } else {
      // Notify Admin via Slack
      sendNotification({
        title: 'New Payment Proof Uploaded! 💵',
        message: `User @${profile?.username} just uploaded a proof for the ${selectedPlan.name}.\nAmount: $${selectedPlan.price}`,
        type: 'info',
        channels: ['Slack', 'Audit'],
        metadata: { user_id: session.user.id, plan: selectedPlan.id }
      })
      
      alert('Proof uploaded successfully! Admin will verify it within 24 hours.')
      setIsUpgrading(false)
      setSelectedPlan(null)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 pt-40 pb-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
           <h1 className="text-4xl sm:text-6xl font-black text-secondary tracking-tight mb-6">
             Choose your <span className="text-primary italic">superpower</span>.
           </h1>
           <p className="text-gray-500 font-bold mb-16 max-w-2xl mx-auto">
             Upgrade to pro and unlock all premium themes, advanced analytics and custom branding to grow your creator empire.
           </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
           {plans.map((plan, i) => (
             <motion.div 
               key={plan.id}
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className={`bg-white rounded-[40px] p-10 border transition-all hover:shadow-2xl hover:shadow-gray-200/50 flex flex-col items-start text-left relative overflow-hidden group ${
                 plan.popular ? 'border-primary ring-2 ring-primary/10' : 'border-gray-100'
               }`}
             >
                {plan.popular && (
                  <div className="absolute top-6 right-[-35px] bg-primary text-secondary text-[10px] font-black uppercase tracking-widest px-12 py-1 rotate-45 shadow-lg shadow-primary/20">
                    Popular
                  </div>
                )}
                
                <div className={`w-14 h-14 rounded-2xl ${plan.color} text-white flex items-center justify-center mb-10 shadow-lg shadow-${plan.color.split('-')[1]}-500/20 group-hover:scale-110 transition-transform`}>
                   {plan.type === 'basic' ? <Zap size={28} /> : (plan.popular ? <Crown size={28} /> : <Star size={28} />)}
                </div>

                <h3 className="text-2xl font-black text-secondary mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-black text-secondary">${plan.price}</span>
                  <span className="text-gray-400 font-bold text-sm uppercase tracking-widest">/ {plan.period}</span>
                </div>

                <div className="space-y-4 mb-12 flex-1">
                   {plan.features.map((feature, idx) => (
                     <div key={idx} className="flex items-start gap-3">
                       <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                       <span className="text-sm font-medium text-gray-500">{feature}</span>
                     </div>
                   ))}
                </div>

                <button 
                  onClick={() => {
                    if (plan.price === 0) return
                    setSelectedPlan(plan); setIsUpgrading(true);
                  }}
                  className={`w-full py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 active:scale-95 ${
                    plan.price === 0 
                      ? 'bg-gray-50 text-gray-400 cursor-not-allowed' 
                      : 'bg-secondary text-white hover:bg-gray-800 hover:shadow-xl hover:shadow-secondary/20'
                  }`}
                >
                   {plan.price === 0 ? 'Current Plan' : <>Upgrade Now <ArrowRight size={16} /></>}
                </button>
             </motion.div>
           ))}
        </div>

        {/* Manual Payment Experience */}
        <AnimatePresence>
          {isUpgrading && selectedPlan && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
               <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                 onClick={() => setIsUpgrading(false)}
                 className="fixed inset-0 bg-secondary/80 backdrop-blur-md"
               />
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                 className="relative bg-white w-full max-w-xl rounded-[48px] shadow-3xl p-10 lg:p-16 overflow-hidden"
               >
                  <div className="flex flex-col items-center text-center">
                     <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mb-8 shadow-inner">
                        <Upload size={40} />
                     </div>
                     <h2 className="text-3xl font-black text-secondary mb-3">Upgrade to {selectedPlan.name}</h2>
                     <p className="text-gray-400 font-bold text-sm mb-12 uppercase tracking-widest">Amount Due: <span className="text-primary font-black ml-2">${selectedPlan.price} USD</span></p>
                     
                     <div className="w-full space-y-8">
                        <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100 text-left">
                           <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Payment Instructions</h4>
                           <p className="text-xs font-bold text-secondary mb-4">Send exactly <span className="text-primary">${selectedPlan.price}</span> to our Wallet/Account below:</p>
                           <div className="bg-white p-4 rounded-2xl border border-gray-200 font-mono text-[10px] break-all truncate relative group">
                              0x71C7656EC7ab88b098defB751B7401B5f6d8976F
                              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-50 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all"><ChevronRight size={12} /></button>
                           </div>
                           <div className="flex items-center gap-3 mt-4 text-orange-500">
                              <AlertCircle size={14} />
                              <span className="text-[10px] font-black uppercase tracking-tight">Only USDT/TRC20 supported for manual payments.</span>
                           </div>
                        </div>

                        <div className="space-y-4">
                           <div className="space-y-2 text-left">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Transaction ID / Hash</label>
                              <input 
                                type="text"
                                value={transactionId}
                                onChange={(e) => setTransactionId(e.target.value)}
                                placeholder="Enter TxHash or ID" 
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-bold text-secondary outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
                              />
                           </div>
                           <div className="space-y-2 text-left">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Payment Proof (Screenshot URL)</label>
                              <input 
                                type="text" 
                                value={proofUrl}
                                onChange={(e) => setProofUrl(e.target.value)}
                                placeholder="https://imgur.com/your-proof.jpg" 
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-bold text-secondary outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
                              />
                           </div>
                        </div>

                        <div className="flex flex-col gap-4 mt-8">
                           <button 
                             disabled={loading}
                             onClick={handleUpgradeRequest}
                             className="w-full py-5 bg-secondary text-white rounded-[24px] font-black text-sm hover:shadow-2xl hover:shadow-secondary/20 transition-all active:scale-95 disabled:opacity-50"
                           >
                              {loading ? 'Uploading...' : 'Submit Payment Proof'}
                           </button>
                           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                              <Clock size={12} /> Verification typically takes 2-4 hours
                           </p>
                        </div>
                     </div>
                  </div>
               </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
