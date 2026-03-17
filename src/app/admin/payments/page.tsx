'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { sendNotification } from '@/lib/notifications'
import { 
  CreditCard, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Eye, 
  ExternalLink,
  DollarSign,
  User,
  Image as ImageIcon,
  MoreHorizontal,
  FileText,
  AlertTriangle,
  ArrowRight
} from 'lucide-react'

interface Payment {
  id: string
  user_id: string
  user_name: string
  user_email: string
  amount: number
  currency: string
  method: string
  transaction_id: string
  proof_url: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  plan_id: string
  remarks?: string
}

export default function PaymentVerification() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [stats, setStats] = useState({ totalRevenue: 0, pendingCount: 0 })

  useEffect(() => {
    fetchPayments()
  }, [])

  const fetchPayments = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) {
      setPayments(data)
      const approved = data.filter(p => p.status === 'approved')
      const pending = data.filter(p => p.status === 'pending')
      const totalRev = approved.reduce((acc, p) => acc + (Number(p.amount) || 0), 0)
      setStats({ totalRevenue: totalRev, pendingCount: pending.length })
    }
    setLoading(false)
  }

  const handleAction = async (status: 'approved' | 'rejected', remarks?: string) => {
    if (!selectedPayment) return
    setActionLoading(true)
    
    try {
      const { error: payError } = await supabase
        .from('payments')
        .update({ status, remarks })
        .eq('id', selectedPayment.id)

      if (payError) throw payError

      if (status === 'approved') {
        const { error: userError } = await supabase
          .from('monkey_bio')
          .update({ 
            plan_status: 'premium', 
            payment_status: 'approved'
          })
          .eq('id', selectedPayment.user_id)
        
        if (userError) console.error("Error updating user profile:", userError)
          
        await supabase.from('activity_logs').insert({
          user_id: selectedPayment.user_id,
          event_type: 'payment_approved',
          description: `Payment of ${selectedPayment.amount} approved by Admin for ${selectedPayment.plan_id}.`
        })

        // Notify Slack & Audit
        sendNotification({
          title: 'Payment Approved! 💰',
          message: `User ${selectedPayment.user_name} has been upgraded to Premium.\nAmount: ${selectedPayment.amount} ${selectedPayment.currency}`,
          type: 'success',
          channels: ['Slack', 'Audit', 'Email'],
          metadata: { user_id: selectedPayment.user_id, payment_id: selectedPayment.id }
        })
      } else {
        // Notify Rejection
        sendNotification({
          title: 'Payment Rejected ❌',
          message: `Payment from ${selectedPayment.user_name} was rejected.\nReason: ${remarks || 'No reason provided'}`,
          type: 'error',
          channels: ['Slack', 'Audit'],
          metadata: { user_id: selectedPayment.user_id, payment_id: selectedPayment.id }
        })
      }

      alert(`Payment ${status} successfully!`)
      setPayments(prev => prev.map(p => p.id === selectedPayment.id ? { ...p, status } : p))
      setIsModalOpen(false)
    } catch (err: any) {
      console.error(err)
      alert('Error: ' + err.message)
    } finally {
      setActionLoading(false)
    }
  }

  const filteredPayments = payments.filter(p => {
    const matchesSearch = p.transaction_id?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.user_name?.toLowerCase().includes(searchTerm.toLowerCase())
    if (filter === 'all') return matchesSearch
    return matchesSearch && p.status === filter
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-secondary tracking-tight">Payment Verification</h1>
          <p className="text-gray-400 font-medium">Verify manual payments and grant premium access.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="flex flex-col items-end">
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Revenue</span>
             <span className="text-xl font-black text-secondary">${stats.totalRevenue.toLocaleString()}</span>
           </div>
           <div className="w-px h-10 bg-gray-100 mx-2"></div>
           <button className="bg-primary/10 text-primary p-3 rounded-2xl hover:bg-primary/20 transition-all">
             <DollarSign size={20} />
           </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
         <div className="flex items-center gap-8">
            {['all', 'pending', 'approved', 'rejected'].map((s) => (
              <button 
                key={s} 
                onClick={() => setFilter(s as any)}
                className={`pb-4 text-xs font-black uppercase tracking-widest relative transition-all ${filter === s ? 'text-secondary' : 'text-gray-400'}`}
              >
                {s}
                {filter === s && <motion.div layoutId="pay-active" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />}
              </button>
            ))}
         </div>
         <div className="flex items-center gap-4 mb-4">
            <div className="relative">
               <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
               <input 
                type="text" 
                placeholder="Search Transaction ID..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-white border border-gray-100 rounded-xl outline-none text-xs font-medium w-64 shadow-sm" 
               />
            </div>
         </div>
      </div>

      {/* Payments Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {loading ? (
          Array(4).fill(0).map((_, i) => <div key={i} className="h-64 bg-white rounded-[40px] animate-pulse shadow-sm"></div>)
        ) : filteredPayments.length === 0 ? (
          <div className="col-span-2 py-20 bg-white rounded-[40px] text-center border border-dashed border-gray-200">
            <p className="text-gray-400 font-bold">No payments found</p>
          </div>
        ) : (
          filteredPayments.map((pay) => (
            <motion.div 
              key={pay.id}
              layout
              className={`bg-white p-8 rounded-[40px] border shadow-sm transition-all flex flex-col sm:flex-row gap-8 ${
                pay.status === 'pending' ? 'border-primary/20 shadow-primary/5' : 'border-gray-100'
              }`}
            >
              {/* Proof Preview */}
              <div 
                onClick={() => { setSelectedPayment(pay); setIsModalOpen(true); }}
                className="w-full sm:w-48 h-64 bg-gray-50 rounded-3xl overflow-hidden relative group cursor-pointer border border-gray-100 flex-shrink-0"
              >
                 <img src={pay.proof_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Proof" />
                 <div className="absolute inset-0 bg-secondary/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-[2px]">
                    <ImageIcon size={32} className="text-white" />
                 </div>
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col">
                 <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <User size={14} className="text-primary" />
                        <span className="text-sm font-black text-secondary">{pay.user_name}</span>
                      </div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{pay.user_email}</p>
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      pay.status === 'approved' ? 'bg-emerald-100 text-emerald-600' : 
                      pay.status === 'rejected' ? 'bg-red-100 text-red-600' : 
                      'bg-yellow-100 text-yellow-600 animate-pulse'
                    }`}>
                      {pay.status}
                    </span>
                 </div>

                 <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between text-xs">
                       <span className="text-gray-400 font-bold uppercase tracking-widest">Plan Selection</span>
                       <span className="text-secondary font-black bg-gray-50 px-3 py-1 rounded-lg uppercase tracking-wider">{pay.plan_id?.replace('_', ' ')}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                       <span className="text-gray-400 font-bold uppercase tracking-widest">Amount</span>
                       <span className="text-lg font-black text-primary">${pay.amount}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] bg-gray-50/50 p-3 rounded-2xl border border-dashed border-gray-200">
                       <div className="flex flex-col gap-1">
                          <span className="text-gray-400 font-bold uppercase tracking-[0.2em]">Transaction ID</span>
                          <span className="text-secondary font-black">{pay.transaction_id}</span>
                       </div>
                       <button className="p-2 text-gray-400 hover:text-secondary"><ExternalLink size={14} /></button>
                    </div>
                 </div>

                 <div className="mt-auto flex items-center gap-3">
                    {pay.status === 'pending' ? (
                      <>
                        <button 
                          onClick={() => { setSelectedPayment(pay); setIsModalOpen(true); }}
                          className="flex-1 py-4 bg-secondary text-white rounded-2xl font-black text-xs hover:shadow-xl hover:shadow-secondary/20 transition-all flex items-center justify-center gap-2"
                        >
                          <CheckCircle2 size={16} /> Verify & Approve
                        </button>
                        <button 
                          onClick={() => handleAction('rejected', 'Invalid proof or payment not received')}
                          className="p-4 bg-white border border-red-100 text-red-500 rounded-2xl hover:bg-red-50 transition-all"
                        >
                           <XCircle size={18} />
                        </button>
                      </>
                    ) : (
                      <button className="w-full py-4 bg-gray-50 text-gray-400 rounded-2xl font-black text-xs border border-gray-100 cursor-default">
                        Action Recorded • {new Date(pay.created_at).toLocaleDateString()}
                      </button>
                    )}
                 </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Verification Modal */}
      <AnimatePresence>
        {isModalOpen && selectedPayment && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 pb-24 lg:p-12 overflow-y-auto">
             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               onClick={() => setIsModalOpen(false)}
               className="fixed inset-0 bg-secondary/80 backdrop-blur-md"
             />
             <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
             >
                {/* Proof Full View */}
                <div className="md:w-1/2 bg-gray-100 relative group overflow-hidden">
                   <img src={selectedPayment.proof_url} className="w-full h-full object-contain" alt="" />
                   <div className="absolute top-6 left-6 flex flex-col gap-2">
                      <span className="bg-white/90 backdrop-blur px-4 py-2 rounded-2xl text-[10px] font-black uppercase text-secondary shadow-lg">Evidence #1</span>
                   </div>
                </div>

                {/* Verification Panel */}
                <div className="md:w-1/2 p-12 flex flex-col">
                   <h2 className="text-3xl font-black text-secondary leading-tight mb-2">Verify Transaction</h2>
                   <p className="text-gray-400 font-medium mb-8">Confirm if payment is valid to unlock premium features.</p>
                   
                   <div className="space-y-6 flex-1">
                      <div className="p-6 bg-primary/5 rounded-[32px] border border-primary/10 space-y-4">
                         <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Expected Amount</span>
                            <span className="text-xl font-black text-primary">${selectedPayment.amount}</span>
                         </div>
                         <div className="h-px bg-primary/10"></div>
                         <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Payment Method</span>
                            <span className="text-sm font-black text-secondary">{selectedPayment.method}</span>
                         </div>
                      </div>

                      <div className="space-y-3">
                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Verification Checklist</label>
                         {[
                           'Transaction ID matches receipt',
                           'Amount is exactly as expected',
                           'Sender name matches account',
                           'Screenshot is not manipulated'
                         ].map((item, i) => (
                           <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:border-primary/30 transition-all cursor-pointer group">
                             <div className="w-5 h-5 rounded-lg border-2 border-gray-200 group-hover:border-primary flex items-center justify-center transition-colors">
                               <CheckCircle2 size={12} className="text-primary opacity-0 group-hover:opacity-100" />
                             </div>
                             <span className="text-xs font-bold text-secondary">{item}</span>
                           </div>
                         ))}
                      </div>
                   </div>

                   <div className="border-t border-gray-100 pt-8 mt-8 flex flex-col gap-4">
                      <button 
                        disabled={actionLoading}
                        onClick={() => handleAction('approved')}
                        className="w-full py-5 bg-primary text-secondary rounded-2xl font-black text-sm hover:shadow-xl hover:shadow-primary/20 transition-all flex items-center justify-center gap-3 active:scale-95"
                      >
                         {actionLoading ? 'Processing...' : <><CheckCircle2 size={18} /> Approve & Unlock Premium</>}
                      </button>
                      <button 
                         disabled={actionLoading}
                         onClick={() => handleAction('rejected', 'User cancelled or fake proof')}
                         className="w-full py-4 text-red-500 font-black text-xs hover:bg-red-50 rounded-2xl transition-all"
                      >
                         Reject with Reason
                      </button>
                   </div>
                </div>
                
                <button 
                   onClick={() => setIsModalOpen(false)}
                   className="absolute top-6 right-6 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-400 hover:text-secondary transition-all"
                >
                   <XCircle size={20} />
                </button>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
