'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import { 
  Check, 
  Minus,
  CheckCircle2, 
  Zap, 
  Crown, 
  Star, 
  ChevronRight, 
  Clock,
  ArrowRight,
  TrendingUp,
  Link2,
  Brush,
  BarChart3,
  Globe,
  Users,
  MessageSquare,
  DollarSign,
  ChevronDown
} from 'lucide-react'
import { sendNotification } from '@/lib/notifications'

// Types
interface Plan {
  name: string
  monthlyPrice: number
  yearlyPrice: number
  description: string
  features: string[]
  buttonText: string
  theme: string
  popular?: boolean
}

// Pricing Data
const PLANS_CONTENT: Record<string, Plan> = {
  free: {
    name: 'Free',
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: 'For your personal Linktree',
    features: [
      'Unlimited links',
      'Social icons, videos & embeds',
      'Essential analytics',
      'SEO optimized design',
      'Unique QR code',
      'Monetization features'
    ],
    buttonText: 'Join for free',
    theme: 'border-gray-200 hover:border-gray-300',
    popular: false
  },
  starter: {
    name: 'Starter',
    monthlyPrice: 360,
    yearlyPrice: 220,
    description: 'For creators and brands',
    features: [
      'Everything in Free, plus:',
      'Custom color palettes',
      'Collect & manage subscribers',
      'Redirect links',
      'Social media scheduling',
      'Lower fees (9% on products)'
    ],
    buttonText: 'Get Starter',
    theme: 'border-gray-200 hover:border-gray-300',
    popular: false
  },
  pro: {
    name: 'Pro',
    monthlyPrice: 650,
    yearlyPrice: 440,
    description: 'The complete creator kit',
    features: [
      'Everything in Starter, plus:',
      'Add your own logo',
      'Animated & featured links',
      'Detailed growth analytics',
      'Automated IG replies',
      'Custom shortlinks (UTMs)',
      'Mailchimp/Sheets integrations'
    ],
    buttonText: 'Try Pro for free',
    popular: true,
    theme: 'border-[#502274] shadow-[0_0_0_2px_#502274]'
  },
  premium: {
    name: 'Premium',
    monthlyPrice: 1450,
    yearlyPrice: 1250,
    description: 'For large businesses & teams',
    features: [
      'Everything in Pro, plus:',
      'Concierge onboarding',
      'Unlimited IG replies',
      'Team tools (optional)',
      '0% seller fees',
      '100% affiliate commissions',
      'Priority support'
    ],
    buttonText: 'Get Premium',
    theme: 'border-gray-200 hover:border-gray-300',
    popular: false
  }
}

const FEATURE_CATEGORIES = [
  {
    id: 'links',
    label: 'Links & Buttons',
    icon: <Link2 size={18} />,
    features: [
      { name: 'Unlimited Links', plans: [true, true, true, true] },
      { name: 'Phone Number Collection', plans: [false, true, true, true] },
      { name: 'RSS Feed Link', plans: [true, true, true, true] },
      { name: 'Animation', plans: [false, false, true, true] },
      { name: 'Redirect', plans: [false, true, true, true] },
      { name: 'Spotlight', plans: [false, false, true, true] },
      { name: 'Schedule', plans: [false, false, true, true] },
      { name: 'NFT Lock', plans: [false, false, true, true] }
    ]
  },
  {
    id: 'monetization',
    label: 'Monetization',
    icon: <DollarSign size={18} />,
    features: [
      { name: 'Linktree Shop', plans: [true, true, true, true] },
      { name: 'Digital Products', plans: [true, true, true, true] },
      { name: 'Online Courses', plans: [true, true, true, true] },
      { name: 'Tip Jar', plans: [true, true, true, true] },
      { name: 'Transaction Fees', plans: ['10%', '9%', '5%', '0%'] },
      { name: 'Shopify/Spring Integration', plans: [false, true, true, true] }
    ]
  },
  {
    id: 'customization',
    label: 'Customization',
    icon: <Brush size={18} />,
    features: [
      { name: 'Standard Themes', plans: [true, true, true, true] },
      { name: 'Hide Linktree Footer', plans: [false, false, true, true] },
      { name: 'Custom Backgrounds', plans: [false, true, true, true] },
      { name: 'Custom Fonts', plans: [false, true, true, true] },
      { name: 'Custom Colors', plans: [false, true, true, true] },
      { name: 'Upload Logo', plans: [false, false, true, true] }
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: <BarChart3 size={18} />,
    features: [
      { name: 'Basic (7 days)', plans: [true, true, true, true] },
      { name: 'Advanced (Lifetime)', plans: [false, false, true, true] },
      { name: 'Referrer & Device', plans: [false, false, true, true] },
      { name: 'Location (City level)', plans: [false, false, true, true] },
      { name: 'Commerce Analytics', plans: [false, false, true, true] },
      { name: 'Export Data (CSV/PDF)', plans: [false, false, true, true] },
      { name: 'Individual Link Tracking', plans: [true, true, true, true] }
    ]
  },
  {
    id: 'marketing',
    label: 'Marketing Tech',
    icon: <TrendingUp size={18} />,
    features: [
      { name: 'Google Analytics', plans: [false, false, true, true] },
      { name: 'Facebook Pixel', plans: [false, false, true, true] },
      { name: 'Mailchimp Integration', plans: [false, false, true, true] },
      { name: 'Google Sheets Sink', plans: [false, false, true, true] },
      { name: 'Instagram Auto-reply', plans: [false, false, '1 Post', 'Unlimited'] },
      { name: 'Global UTM Parameters', plans: [false, false, true, true] },
      { name: 'SEO Settings', plans: [true, true, true, true] }
    ]
  },
  {
    id: 'management',
    label: 'Management',
    icon: <Users size={18} />,
    features: [
      { name: 'Add Admins', plans: [false, false, true, true] },
      { name: 'Multiple Linktrees', plans: [false, false, false, true] },
      { name: 'Support Response Time', plans: ['48h', '24h', '24h', 'VIP'] },
      { name: 'Multi-factor Auth', plans: [true, true, true, true] },
      { name: 'Concierge Onboarding', plans: [false, false, false, true] },
      { name: 'White-labeling', plans: [false, false, true, true] }
    ]
  }
]

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly')
  const [activeFeatureTab, setActiveFeatureTab] = useState('links')
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [isUpgrading, setIsUpgrading] = useState(false)
  const [transactionId, setTransactionId] = useState('')
  const [proofUrl, setProofUrl] = useState('')
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

  const handleUpgradeRequest = async (plan: any) => {
    if (!profile) {
      alert('Please login to upgrade')
      return
    }
    setSelectedPlan(plan)
    setIsUpgrading(true)
  }

  const submitPayment = async () => {
    if (!proofUrl || !transactionId) {
      alert('Please provide transaction ID and payment proof URL.')
      return
    }

    setLoading(true)
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) return

    const { error } = await supabase.from('payments').insert({
      user_id: session.user.id,
      user_name: profile?.display_name || profile?.username,
      user_email: session.user.email,
      amount: billingCycle === 'monthly' ? selectedPlan.monthlyPrice : selectedPlan.yearlyPrice,
      currency: 'INR',
      method: 'Manual/Crypto',
      transaction_id: transactionId,
      proof_url: proofUrl,
      status: 'pending',
      plan_id: selectedPlan.name.toLowerCase()
    })

    if (error) {
      alert(error.message)
    } else {
      sendNotification({
        title: 'New Payment Proof Uploaded! 💵',
        message: `User @${profile?.username} just uploaded a proof for the ${selectedPlan.name} plan (${billingCycle}).`,
        type: 'info',
        channels: ['Slack', 'Audit'],
        metadata: { user_id: session.user.id, plan: selectedPlan.name }
      })
      alert('Proof uploaded successfully! Admin will verify it within 24 hours.')
      setIsUpgrading(false)
      setSelectedPlan(null)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-white font-outfit">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black text-[#1e1e1e] tracking-tight mb-8"
        >
          Pick your plan. <br />
          <span className="text-[#502274] italic">Grow your world.</span>
        </motion.h1>
        
        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mt-12 bg-gray-100 p-1.5 rounded-full w-fit mx-auto border border-gray-200">
          <button 
            onClick={() => setBillingCycle('monthly')}
            className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all ${
              billingCycle === 'monthly' ? 'bg-white shadow-md text-[#1e1e1e]' : 'text-gray-500'
            }`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setBillingCycle('yearly')}
            className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
              billingCycle === 'yearly' ? 'bg-[#502274] shadow-md text-white' : 'text-gray-500'
            }`}
          >
            Annually <span className={`${billingCycle === 'yearly' ? 'text-white/80' : 'text-[#2665D6]'} text-[10px] font-black uppercase`}>Save up to 30%</span>
          </button>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-6 pb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(PLANS_CONTENT).map(([key, plan]) => (
            <motion.div 
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`relative flex flex-col p-8 rounded-[40px] border transition-all duration-300 bg-white ${plan.theme}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#502274] text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                  Recommended
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-black text-[#1e1e1e] mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-500 font-medium h-10">{plan.description}</p>
              </div>

              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-4xl font-black text-[#1e1e1e]">
                  ₹{billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                </span>
                <span className="text-gray-400 font-bold text-sm">/mo</span>
                {plan.monthlyPrice > 0 && billingCycle === 'yearly' && (
                   <span className="block text-[10px] text-gray-500 font-bold uppercase mt-1">Billed annually</span>
                )}
              </div>

              <div className="flex-1 space-y-4 mb-10">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check size={18} className="text-[#502274] shrink-0 mt-0.5" />
                    <span className="text-sm font-bold text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleUpgradeRequest(plan)}
                disabled={plan.monthlyPrice === 0}
                className={`w-full py-4 rounded-full font-black text-sm transition-all active:scale-95 ${
                  plan.popular 
                    ? 'bg-[#E9C300] text-[#1e1e1e] hover:shadow-xl hover:shadow-[#E9C300]/20' 
                    : plan.monthlyPrice === 0 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-[#502274] text-white hover:bg-[#3d1a58]'
                }`}
              >
                {plan.buttonText}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Earn Section */}
      <section className="bg-black text-white py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                Get more ways <br /> to <span className="text-[#D2E823]">earn money.</span>
              </h2>
              <p className="text-gray-400 font-bold mb-12 max-w-md">
                Make more and manage less by adding digital stores to your Linktree. No more jumping between apps.
              </p>
              
              <div className="space-y-6">
                {[
                  'Instant checkout, no extra tools',
                  'Kajabi-powered online courses',
                  'Industry-leading affiliate commissions',
                  'Built-in traffic monetization'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#D2E823] flex items-center justify-center text-black">
                      <DollarSign size={20} />
                    </div>
                    <span className="font-bold text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex-1 relative w-full aspect-square md:aspect-auto h-[500px]">
               <div className="absolute inset-0 bg-[#D2E823] rounded-[60px] rotate-3 opacity-20"></div>
               <div className="absolute inset-0 bg-white rounded-[60px] -rotate-3 p-12 text-black flex flex-col justify-between">
                  <div>
                    <h4 className="text-gray-400 font-black uppercase text-[10px] tracking-widest mb-6">Comparison</h4>
                    <div className="space-y-8">
                       <div className="flex items-center justify-between border-b pb-4">
                          <span className="font-black text-xl">Digital Products</span>
                          <span className="text-[#502274] font-black">Linktree Earn</span>
                       </div>
                       <div className="flex items-center justify-between border-b pb-4">
                          <span className="font-bold text-gray-400">Setup Time</span>
                          <span className="font-black">Minutes</span>
                       </div>
                       <div className="flex items-center justify-between border-b pb-4">
                          <span className="font-bold text-gray-400">Transaction Fee</span>
                          <span className="font-black">0% - 5%</span>
                       </div>
                    </div>
                  </div>
                  <div className="bg-black text-white p-8 rounded-[32px] flex items-center justify-between">
                     <span className="font-black">Start selling today</span>
                     <ChevronRight />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Features Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-16">Compare every feature</h2>
          
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar Tabs */}
            <div className="lg:w-1/4 space-y-2">
              {FEATURE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFeatureTab(cat.id)}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-left transition-all ${
                    activeFeatureTab === cat.id 
                      ? 'bg-white shadow-lg text-[#502274]' 
                      : 'text-gray-400 hover:text-[#1e1e1e]'
                  }`}
                >
                  {cat.icon}
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Feature Table */}
            <div className="lg:w-3/4 bg-white rounded-[40px] shadow-2xl p-8 lg:p-12 overflow-x-auto">
               <div className="min-w-[600px]">
                 <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] border-b pb-8 mb-8 text-center text-[10px] font-black uppercase tracking-widest text-gray-400">
                    <div className="text-left">Feature</div>
                    <div>Free</div>
                    <div>Starter</div>
                    <div>Pro</div>
                    <div>Premium</div>
                 </div>

                 <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFeatureTab}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      {FEATURE_CATEGORIES.find(c => c.id === activeFeatureTab)?.features.map((f, i) => (
                        <div key={i} className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center text-center">
                           <div className="text-left font-bold text-[#1e1e1e] text-sm">{f.name}</div>
                           {f.plans.map((p, idx) => (
                             <div key={idx} className="flex justify-center text-sm font-black text-[#502274]">
                               {typeof p === 'boolean' ? (
                                 p ? <CheckCircle2 size={18} className="text-[#502274]" /> : <Minus size={18} className="text-gray-200" />
                               ) : (
                                 <span>{p}</span>
                               )}
                             </div>
                           ))}
                        </div>
                      ))}
                    </motion.div>
                 </AnimatePresence>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Modal */}
      <AnimatePresence>
        {isUpgrading && selectedPlan && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 lg:p-12">
             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               onClick={() => setIsUpgrading(false)}
               className="fixed inset-0 bg-black/60 backdrop-blur-sm"
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
               className="relative bg-white w-full max-w-xl rounded-[48px] shadow-3xl p-10 lg:p-16 overflow-y-auto max-h-[90vh]"
             >
                <div className="text-center">
                  <h2 className="text-3xl font-black text-secondary mb-3">Upgrade to {selectedPlan.name}</h2>
                  <p className="text-gray-400 font-bold text-sm mb-12 uppercase">
                    Amount: <span className="text-[#502274] font-black ml-2">₹{billingCycle === 'monthly' ? selectedPlan.monthlyPrice : selectedPlan.yearlyPrice} {billingCycle}</span>
                  </p>
                  
                  <div className="space-y-8 text-left">
                    <div className="bg-gray-50 p-6 rounded-[32px] border">
                       <h4 className="text-[10px] font-black text-gray-400 uppercase mb-4">Payment Instructions</h4>
                       <p className="text-xs font-bold mb-4">Pay using UPI or Scan: <span className="text-[#502274]">monkeybio@upi</span></p>
                       <div className="w-full aspect-square bg-white rounded-2xl border mb-4 flex items-center justify-center">
                          <span className="text-gray-200">QR CODE HERE</span>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <div>
                          <label className="text-[10px] font-black text-gray-400 uppercase px-2">Transaction ID</label>
                          <input 
                            type="text"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            placeholder="TXN12345678" 
                            className="w-full bg-gray-50 border rounded-2xl p-4 font-bold text-secondary outline-none focus:ring-2 focus:ring-[#502274]/20" 
                          />
                       </div>
                       <div>
                          <label className="text-[10px] font-black text-gray-400 uppercase px-2">Screenshot URL</label>
                          <input 
                            type="text" 
                            value={proofUrl}
                            onChange={(e) => setProofUrl(e.target.value)}
                            placeholder="https://imgur.com/example.jpg" 
                            className="w-full bg-gray-50 border rounded-2xl p-4 font-bold text-secondary outline-none focus:ring-2 focus:ring-[#502274]/20" 
                          />
                       </div>
                    </div>

                    <button 
                      disabled={loading}
                      onClick={submitPayment}
                      className="w-full py-5 bg-[#502274] text-white rounded-full font-black text-sm hover:shadow-2xl transition-all disabled:opacity-50"
                    >
                      {loading ? 'Processing...' : 'Submit Payment Proof'}
                    </button>
                    <p className="text-[10px] text-center text-gray-400 font-bold uppercase flex items-center justify-center gap-2">
                      <Clock size={12} /> Verification within 24 hours
                    </p>
                  </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer CTA */}
      <section className="bg-[#D2E823] py-24 text-center px-6">
         <h2 className="text-5xl md:text-7xl font-black text-[#1e1e1e] mb-12">
           Ready to start? <br /> It's free.
         </h2>
         <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-12 py-5 bg-[#1e1e1e] text-white rounded-full font-black text-lg hover:scale-105 transition-transform">
               Get started for free
            </button>
         </div>
      </section>
    </div>
  )
}
