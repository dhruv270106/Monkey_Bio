'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Package, 
  Plus, 
  CheckCircle2, 
  DollarSign, 
  Zap, 
  Crown, 
  Star,
  Edit3,
  Trash2,
  Calendar,
  Users,
  Settings
} from 'lucide-react'

const plans = [
  { 
    id: 'free', 
    name: 'Free Starter', 
    price: 0, 
    period: 'Forever',
    users: 842,
    features: ['Unlimited Links', 'Basic Analytics', '3 Standard Themes', 'Standard Support'],
    color: 'bg-blue-500',
    type: 'basic'
  },
  { 
    id: 'pro_monthly', 
    name: 'Pro Monthly', 
    price: 19, 
    period: 'Month',
    users: 156,
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
    users: 29,
    features: ['Everything in Pro', 'White-labeling', 'API Access', '24/7 Managed Setup', 'Beta Features Access'],
    color: 'bg-emerald-500',
    type: 'premium'
  }
]

export default function PlanManagement() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-secondary tracking-tight">Subscription Plans</h1>
          <p className="text-gray-400 font-medium">Manage pricing, features and limits for platform plans.</p>
        </div>
        <button className="bg-secondary text-white px-8 py-3.5 rounded-2xl font-black text-sm flex items-center gap-2 hover:shadow-xl hover:shadow-secondary/20 transition-all active:scale-95">
          <Plus size={18} /> Create New Plan
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <motion.div 
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white rounded-[40px] border flex flex-col relative overflow-hidden transition-all hover:shadow-2xl hover:shadow-gray-200/50 ${
              plan.popular ? 'border-primary ring-2 ring-primary/20' : 'border-gray-100'
            }`}
          >
            {plan.popular && (
              <div className="absolute top-6 right-[-35px] bg-primary text-secondary text-[10px] font-black uppercase tracking-widest px-12 py-1 rotate-45 shadow-lg">
                Popular
              </div>
            )}
            
            <div className="p-8 pb-4">
              <div className={`w-14 h-14 rounded-2xl ${plan.color} text-white flex items-center justify-center mb-6 shadow-lg shadow-${plan.color.split('-')[1]}-500/20`}>
                 {plan.type === 'basic' ? <Zap size={28} /> : (plan.popular ? <Crown size={28} /> : <Star size={28} />)}
              </div>
              <h3 className="text-2xl font-black text-secondary mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-4xl font-black text-secondary">${plan.price}</span>
                <span className="text-gray-400 font-bold text-sm uppercase tracking-widest">/ {plan.period}</span>
              </div>
            </div>

            <div className="p-8 pt-0 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-8 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <Users size={16} className="text-gray-400" />
                <span className="text-xs font-bold text-secondary">{plan.users} Active Users</span>
              </div>

              <div className="space-y-4 mb-12">
                 {plan.features.map((feature, i) => (
                   <div key={i} className="flex items-start gap-3">
                     <CheckCircle2 size={16} className="text-primary mt-0.5" />
                     <span className="text-sm font-medium text-gray-500">{feature}</span>
                   </div>
                 ))}
              </div>

              <div className="mt-auto flex items-center gap-3">
                 <button className="flex-1 py-4 bg-secondary text-white rounded-2xl font-black text-xs flex items-center justify-center gap-2 hover:bg-gray-800 transition-all">
                    <Edit3 size={14} /> Edit Plan
                 </button>
                 <button className="p-4 bg-white border border-gray-100 text-gray-400 hover:text-red-500 hover:border-red-100 rounded-2xl transition-all shadow-sm">
                    <Trash2 size={18} />
                 </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Logic Card */}
      <div className="bg-[#1e293b] text-white p-12 rounded-[40px] relative overflow-hidden group">
         <div className="relative z-10 max-w-2xl">
            <h3 className="text-3xl font-black mb-4">Plan Automation Rules</h3>
            <p className="text-gray-400 font-medium mb-8">Configure what happens when a user upgrades, downgrades or a payment is verified.</p>
            <div className="space-y-4">
               {[
                 'Unlock all themes immediately on Pro approval',
                 'Send welcome email with setup guide on Yearly purchase',
                 'Restrict access to 3 links if subscription expires',
                 'Notify admin if payment is pending for > 24 hours'
               ].map((rule, i) => (
                 <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                    <div className="w-8 h-8 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                       <CheckCircle2 size={16} />
                    </div>
                    <span className="text-sm font-bold">{rule}</span>
                 </div>
               ))}
            </div>
         </div>
         <div className="absolute right-[-100px] bottom-[-100px] opacity-10 group-hover:scale-110 transition-transform duration-1000">
            <Package size={500} />
         </div>
      </div>
    </div>
  )
}
