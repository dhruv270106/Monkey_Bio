'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from '@/components/Reveal'
import { Phone, Mail, MapPin, Send, MessageSquare, Clock, Globe, Instagram, Facebook, Linkedin, CheckCircle2 } from 'lucide-react'
import Lenis from 'lenis'
import { supabase } from '@/lib/supabase'
import { sendNotification } from '@/lib/notifications'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'GENERAL INQUIRY',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const lenis = new Lenis()
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    window.scrollTo(0, 0)
    return () => lenis.destroy()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields.")
      return
    }

    setLoading(true)
    setSuccess(false)

    try {
      // 1. Save to Dedicated Table (contact_requests)
      const { error: dbError } = await supabase.from('contact_requests').insert([{
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      }])

      if (dbError) throw dbError

      // 2. Send Notification
      await sendNotification({
        title: `New Contact Request: ${formData.subject}`,
        message: `From: ${formData.name} (${formData.email})\n\nMessage: ${formData.message}`,
        type: 'success',
        channels: ['Email'],
        metadata: {
          email: formData.email,
          name: formData.name
        }
      })

      // 3. UI Success Feedback
      setSuccess(true)
      setFormData({ name: '', email: '', subject: 'GENERAL INQUIRY', message: '' })
      setTimeout(() => setSuccess(false), 10000)

    } catch (err: any) {
      console.error(err)
      alert(`Error sending message: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      label: 'Call Us',
      value: '+91 99742 22176',
      sub: 'Mon-Fri from 9am to 6pm',
      href: 'tel:+919974222176',
      color: 'bg-green-50 text-green-600'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Email Support',
      value: 'support@monkeybio.com',
      sub: 'We usually respond within 24h',
      href: 'mailto:support@monkeybio.com',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: 'Visit Us',
      value: 'Surat, India',
      sub: 'Gujarat, 395006',
      href: 'https://maps.google.com/?q=Surat,India',
      color: 'bg-purple-50 text-purple-600'
    }
  ]

  return (
    <div className="min-h-screen bg-white pt-24 md:pt-32 lg:pt-40 pb-20 overflow-hidden font-sans">
      <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#D2E823]/10 rounded-full blur-[120px] -z-10 -translate-y-1/2 translate-x-1/2" />
      <main className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        {/* HERO SECTION */}
        <div className="relative z-10 mb-16 md:mb-32 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
           <div className="max-w-4xl text-center lg:text-left">
              <Reveal delay={0.1} width="100%">
                 <h1 className="text-[12vw] sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-[-0.04em] uppercase mb-8">
                    Let&apos;s talk <br /> 
                    <span className="text-secondary italic">Human to Human.</span>
                 </h1>
              </Reveal>
              <Reveal delay={0.2} width="100%">
                 <p className="text-lg md:text-2xl font-bold text-gray-500 uppercase tracking-tight max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                    Got questions, ideas, or just want to say hi? <br className="hidden md:block" /> 
                    Whether you&apos;re a creator or a brand, our team is here for you.
                 </p>
              </Reveal>
           </div>
           <motion.div 
             initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
             animate={{ opacity: 1, scale: 1, rotate: 0 }}
             transition={{ duration: 1, ease: "easeOut" }}
             className="relative aspect-square w-full max-w-[400px] mx-auto flex items-center justify-center bg-gray-50/50 rounded-[40px] md:rounded-[60px] border-[8px] md:border-[16px] border-gray-50 shadow-2xl overflow-hidden"
           >
              <div className="absolute inset-0 bg-[#D2E823]/10 rounded-full blur-[80px]" />
              <img 
                src="/images/contact_hero.png" 
                className="w-full h-full object-contain relative z-10 drop-shadow-2xl" 
                alt="Support Monkey" 
              />
           </motion.div>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-32">
           {contactInfo.map((info, i) => (
             <motion.a 
               key={i} href={info.href} target="_blank" rel="noopener noreferrer"
               initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }} transition={{ delay: i * 0.1 }}
               className="p-8 md:p-10 bg-gray-50 rounded-[30px] md:rounded-[40px] border border-gray-100 flex flex-col gap-6 md:gap-8 hover:bg-white hover:shadow-2xl transition-all"
             >
                <div className={`w-12 h-12 md:w-14 md:h-14 ${info.color} rounded-2xl flex items-center justify-center shrink-0`}>{info.icon}</div>
                <div><span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{info.label}</span><h3 className="text-lg md:text-xl font-black">{info.value}</h3></div>
             </motion.a>
           ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-24 mb-32 items-start">
           <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-secondary text-white p-10 md:p-14 rounded-[50px] shadow-3xl">
              <h2 className="text-4xl font-black uppercase mb-4 italic">Drop a line.</h2>
              <form onSubmit={handleSubmit} className="space-y-6 mt-12">
                 <input name="name" value={formData.name} onChange={handleInputChange} placeholder="YOUR NAME" required className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 font-bold outline-none focus:border-white" />
                 <input name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="EMAIL ADDRESS" required className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 font-bold outline-none focus:border-white" />
                 <div className="relative">
                    <select 
                       name="subject" 
                       value={formData.subject} 
                       onChange={handleInputChange} 
                       className="w-full bg-white/10 border border-white/10 rounded-2xl p-5 font-bold outline-none focus:border-white text-white/90 cursor-pointer appearance-none"
                    >
                       <option className="bg-[#1E2330] text-white" value="GENERAL INQUIRY">GENERAL INQUIRY</option>
                       <option className="bg-[#1E2330] text-white" value="PARTNERSHIP">PARTNERSHIP</option>
                       <option className="bg-[#1E2330] text-white" value="TECHNICAL SUPPORT">TECHNICAL SUPPORT</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/30 text-xs">▼</div>
                 </div>
                 <textarea name="message" value={formData.message} onChange={handleInputChange} rows={5} placeholder="MESSAGE..." required className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 font-bold outline-none focus:border-white resize-none" />
                 <button type="submit" disabled={loading} className="w-full bg-[#D2E823] text-black font-black text-xl py-6 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                    {loading ? "SENDING..." : <>SEND MESSAGE <Send className="w-5 h-5" /></>}
                 </button>
                 {success && <div className="text-[#D2E823] font-black text-center text-xs uppercase tracking-widest">Message sent successfully!</div>}
              </form>
           </motion.div>
           <div className="w-full aspect-[4/3] rounded-[50px] overflow-hidden shadow-2xl border border-gray-100 relative grayscale hover:grayscale-0 transition-all duration-1000">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.52982230407!2d72.73989420790479!3d21.17094170000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1711256865664!5m2!1sen!2sin" className="absolute inset-0 w-full h-full" allowFullScreen loading="lazy"></iframe>
           </div>
        </div>
      </main>
    </div>
  )
}
