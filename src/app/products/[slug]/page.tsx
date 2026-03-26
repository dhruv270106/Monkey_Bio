'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const PRODUCT_DATA: any = {
  'link-in-bio': {
    title: 'The only link in bio you\'ll ever need',
    subtitle: 'Monkey Bio + Tools',
    desc: 'Join 50M+ people using Monkey Bio as their link in bio to share everything they create, curate and sell across Instagram, TikTok, Twitter, YouTube and more.',
    color: 'bg-[#EAE6FF]',
    secondaryColor: 'text-black',
    icon: 'fi-rr-link',
    heroImage: '/navbar/linktree_hero_bg.png',
    features: [
      { title: 'Connect your tools', desc: 'Sync with Shopify, Spring, eBay, and more directly on your profile.', icon: 'fi-rr-apps' },
      { title: 'Reach your fans', desc: 'Share your latest content, videos, and music with one single link.', icon: 'fi-rr-megaphone' },
      { title: 'Track your growth', desc: 'Real-time analytics to help you understand your audience better.', icon: 'fi-rr-chart-line-up' },
    ],
    sections: [
      { 
        title: 'One link to help you do it all', 
        desc: 'Monkey Bio is the launchpad for your online home. Connect your audience with all you do.',
        img: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?q=80&w=800&auto=format&fit=crop'
      },
      { 
        title: 'Connect your audience with all you do', 
        desc: 'Monkey Bio is the only link you’ll ever need. Connect your audience with all you do, wherever you are.',
        img: 'https://images.unsplash.com/photo-1557835067-441d618d6e16?q=80&w=800&auto=format&fit=crop'
      },
      { 
        title: 'Keep your followers wherever you go', 
        desc: 'Don’t lose your audience to search algorithms. Monkey Bio is a platform you own and control, so your followers always stay with you.',
        img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop'
      },
      { 
        title: 'Analyze and grow your performance', 
        desc: 'Understand what’s resonating with your audience and turn every link in your bio into a tool for growth.',
        img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop'
      }
    ],
    faqs: [
      { q: 'Is Monkey Bio free?', a: 'Yes, you can start for free and use our core features forever.' },
      { q: 'How many links can I add?', a: 'You can add unlimited links to your Monkey Bio profile.' },
      { q: 'Can I use it on multiple socials?', a: 'Absolutely! One Monkey Bio link works across all platforms.' }
    ]
  },
  'link-shortener': {
    title: 'The link shortener your brand deserves',
    subtitle: 'Powerful Short Links',
    desc: 'Create and track branded short links that drive conversions and build trust with your audience, all from one place.',
    color: 'bg-blue-500',
    secondaryColor: 'text-white',
    icon: 'fi-rr-scissors',
    heroImage: '/navbar/link_shortener_hero.png',
    features: [
      { title: 'Brand Consistency', desc: 'Use your own custom domain for all your short links to build professional trust.', icon: 'fi-rr-label' },
      { title: 'Detailed Analytics', desc: 'Track every click by location, device, and source to fine-tune your growth.', icon: 'fi-rr-chart-pie' },
      { title: 'Global Reach', desc: 'Short links that work everywhere - from social media to email campaigns.', icon: 'fi-rr-globe' },
    ],
    sections: [
      { 
        title: 'More than just a short link', 
        desc: 'Our link shortener gives you total control over how your audience perceives your brand across all channels.',
        img: 'https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=800&auto=format&fit=crop'
      },
      { 
        title: 'Deep dive into clicks', 
        desc: 'Know exactly where your audience is coming from. Our analytics help you master every campaign with precision.',
        img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop'
      },
      { 
        title: 'Branded links build trust', 
        desc: 'Custom domains and branded aliases increase click-through rates by up to 34%.',
        img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop'
      }
    ],
    faqs: [
      { q: 'How many links can I shorten?', a: 'Unlimited! Shorten as many links as your brand needs.' },
      { q: 'Can I change the destination?', a: 'Yes, our links are dynamic and can be redirected anytime.' },
      { q: 'Is there a limit on clicks?', a: 'No, we track every single click without any artificial limits.' }
    ]
  },
  'qr-generator': {
    title: 'Connect your offline and online worlds',
    subtitle: 'Advanced QR Codes',
    desc: 'Create, customize, and track branded QR codes that turn every real-world interaction into a digital connection.',
    color: 'bg-purple-600',
    secondaryColor: 'text-white',
    icon: 'fi-rr-qrcode',
    heroImage: '/navbar/qr_hero.png',
    features: [
      { title: 'Brand Customization', desc: 'Add your logo and choose colors that match your Monkey Bio for total brand harmony.', icon: 'fi-rr-palette' },
      { title: 'Detailed Scan Tracking', desc: 'See where and when your QR codes are being scanned with advanced real-time analytics.', icon: 'fi-rr-chart-user' },
      { title: 'Dynamic Links', desc: 'Change the destination of your QR code anytime without ever needing to print it again.', icon: 'fi-rr-refresh' },
    ],
    sections: [
      { 
        title: 'Bridge the gap instantly', 
        desc: 'From business cards to billboards, Monkey Bio QR codes make it effortless for your audience to find you.',
        img: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?q=80&w=800&auto=format&fit=crop'
      },
      { 
        title: 'Total creative control', 
        desc: 'Customize every detail of your QR code to ensure it reflects your unique brand identity perfectly.',
        img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop'
      },
      { 
        title: 'Dynamic QR Intelligence', 
        desc: 'Change your destination links instantly. Never reprint your QR codes again - just update the link.',
        img: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=800&auto=format&fit=crop'
      }
    ],
    faqs: [
      { q: 'Are your QR codes permanent?', a: 'Yes, they never expire and will work as long as your link is active.' },
      { q: 'Can I add my own logo?', a: 'Yes, full brand customization including logos is available.' },
      { q: 'Can I track scans?', a: 'Yes, every scan is tracked with real-time location insights.' }
    ]
  },
  'canva-editor': {
    title: 'Design your Monkey Bio in seconds with Canva',
    subtitle: 'Creator Integration',
    desc: 'Unleash your creativity. Design, edit, and sync your profile backgrounds and assets directly from your Monkey Bio dashboard with Canva.',
    color: 'bg-cyan-500',
    secondaryColor: 'text-white',
    icon: 'fi-rr-palette',
    heroImage: '/navbar/canva_hero.png',
    features: [
      { title: 'Direct Integration', desc: 'No more downloading and uploading. Edit your designs right inside your profile settings.', icon: 'fi-rr-layers' },
      { title: 'Infinite Backgrounds', desc: 'Access millions of Canva elements and photos to create a background that is uniquely yours.', icon: 'fi-rr-cloud-upload' },
      { title: 'Custom Templates', desc: 'Choose from professionally designed Monkey Bio templates and customize them in a click.', icon: 'fi-rr-edit' },
    ],
    sections: [
      { 
        title: 'Your profile, your way', 
        desc: 'Stand out from the crowd with a custom design. Every pixel is yours to control with the power of Canva.',
        img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop'
      },
      { 
        title: 'Design from the dashboard', 
        desc: 'Save time and stay in your flow. Our native Canva integration makes design a breeze for every creator.',
        img: 'https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?q=80&w=800&auto=format&fit=crop'
      },
      { 
        title: 'Professional Templates', 
        desc: 'Access millions of high-quality templates and assets to make your profile pop in seconds.',
        img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop'
      }
    ],
    faqs: [
      { q: 'Does it work with Canva Pro?', a: 'Yes, it works seamlessly with both free and Pro Canva accounts.' },
      { q: 'Are backgrounds optimized?', a: 'Yes, all designs are auto-optimized for fast loading on mobile.' },
      { q: 'Can I use it for profile pics?', a: 'Yes, you can design anything from backgrounds to profile icons.' }
    ]
  },
  'social-media': {
    title: 'Social Media Management',
    subtitle: 'Hands-free social planning',
    desc: 'Schedule, auto-post, and manage all your social accounts from one powerful dashboard.',
    color: 'bg-indigo-600',
    icon: 'fi-rr-share-square'
  },
  'grow-audience': {
    title: 'Audience Growth',
    subtitle: 'Turn visitors into fans',
    desc: 'Scale your reach, collect leads, and engage your audience like never before.',
    color: 'bg-orange-600',
    icon: 'fi-rr-users'
  },
  'analytics': {
    title: 'Social Analytics',
    subtitle: 'Success tracking',
    desc: 'Deep dive into your clicks, views, and audience behavior with powerful analytics.',
    color: 'bg-blue-600',
    icon: 'fi-rr-stats'
  }
}

export default function ProductDetail() {
  const { slug } = useParams()
  const data = PRODUCT_DATA[slug as string]

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center p-20">
        <Navbar />
        <div className="text-center">
          <h1 className="text-4xl font-black uppercase italic mb-4">Page not found</h1>
          <Link href="/" className="px-10 py-4 bg-black text-white rounded-full font-bold uppercase text-xs">Go Home</Link>
        </div>
      </div>
    )
  }

  const isShops = slug === 'link-in-bio' || slug === 'link-shortener' || slug === 'qr-generator' || slug === 'canva-editor'

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* HERO SECTION */}
      <section className="pt-40 pb-20 px-6 md:px-20 relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-[600px] h-[600px] ${data.color} opacity-10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2`}></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 gap-20 items-center"
          >
            <div className="space-y-10">
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase text-gray-400 tracking-[0.5em]">{data.subtitle}</span>
                <h1 className="text-6xl md:text-[5rem] font-black text-black tracking-tighter leading-none italic uppercase">
                  {data.title}
                </h1>
              </div>
              
              <p className="text-xl text-gray-500 font-medium max-w-lg leading-relaxed">
                {data.desc}
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <button className={`px-12 py-6 rounded-full font-black uppercase text-sm shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all ${slug === 'link-shortener' ? 'bg-blue-600 text-white' : slug === 'qr-generator' ? 'bg-purple-600 text-white' : slug === 'canva-editor' ? 'bg-cyan-600 text-white' : 'bg-black text-linktree-lime'}`}>
                   {slug === 'link-shortener' ? 'Shorten your links' : slug === 'qr-generator' ? 'Generate your QR' : slug === 'canva-editor' ? 'Start Designing' : 'Start Selling Now'}
                </button>
              </div>
            </div>

            <div className="relative">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 0.3, duration: 1 }}
                 className="aspect-square bg-white rounded-[60px] shadow-[0_40px_100px_rgba(0,0,0,0.15)] overflow-hidden p-4 border border-gray-50 flex items-center justify-center"
               >
                  <img 
                    src={data.heroImage || `https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop`} 
                    className="w-full h-full object-cover rounded-[48px]" 
                  />
               </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURE GRID */}
      {isShops && (
        <section className="py-20 bg-gray-50/50 px-6 md:px-20 border-y border-gray-100">
           <div className="max-w-6xl mx-auto">
              <div className="text-center mb-20">
                 <h2 className="text-4xl font-black italic tracking-tighter uppercase px-12 py-6 bg-black text-linktree-lime rounded-full inline-block">Premium Selling Tools</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                 {data.features.map((f: any, i: number) => (
                   <motion.div 
                     key={i} 
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.1 }}
                     className="bg-white p-12 rounded-[50px] shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-50"
                   >
                      <div className="w-16 h-16 rounded-2xl bg-black text-linktree-lime flex items-center justify-center text-2xl mb-8">
                         <i className={`fi ${f.icon}`}></i>
                      </div>
                      <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-4">{f.title}</h3>
                      <p className="text-sm text-gray-400 font-semibold leading-relaxed uppercase tracking-widest">{f.desc}</p>
                   </motion.div>
                 ))}
              </div>
           </div>
        </section>
      )}

      {/* SPLIT SECTIONS */}
      {isShops && data.sections.map((sec: any, i: number) => (
        <section key={i} className={`py-32 px-6 md:px-20 ${i % 2 === 0 ? 'bg-white' : 'bg-black text-white'}`}>
           <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-20">
              <div className={`w-full md:w-1/2 ${i % 2 !== 0 ? 'md:order-2' : ''}`}>
                 <div className="aspect-square rounded-[60px] overflow-hidden shadow-2xl relative">
                    <img src={sec.img} className="w-full h-full object-cover" />
                 </div>
              </div>
              <div className="w-full md:w-1/2 space-y-8">
                 <h2 className={`text-5xl md:text-6xl font-black italic tracking-tighter uppercase leading-none ${i % 2 === 0 ? 'text-black' : 'text-linktree-lime'}`}>
                    {sec.title}
                 </h2>
                 <p className={`text-lg md:text-xl font-medium leading-relaxed ${i % 2 === 0 ? 'text-gray-500' : 'text-gray-400'}`}>
                    {sec.desc}
                 </p>
                 <button className={`px-10 py-5 rounded-full font-black uppercase text-xs transition-all ${i % 2 === 0 ? 'bg-black text-white hover:scale-105' : 'bg-linktree-lime text-black hover:scale-105'}`}>
                   Learn More
                 </button>
              </div>
           </div>
        </section>
      ))}

      {/* FAQ SECTION */}
      {isShops && data.faqs && (
        <section className="py-32 bg-white px-6 md:px-20">
           <div className="max-w-4xl mx-auto">
              <div className="text-center mb-20">
                 <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-4">Frequently Asked Questions</h2>
                 <p className="text-gray-400 font-semibold uppercase tracking-widest text-xs">Everything you need to know about {data.title}</p>
              </div>
              <div className="space-y-6">
                 {data.faqs.map((faq: any, i: number) => (
                   <div key={i} className="p-8 bg-gray-50 rounded-[32px] hover:bg-gray-100 transition-colors cursor-pointer group">
                      <h4 className="text-xl font-black italic uppercase tracking-tighter mb-2 group-hover:text-primary transition-colors">{faq.q}</h4>
                      <p className="text-gray-500 font-medium leading-relaxed">{faq.a}</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>
      )}

      {/* INTEGRATIONS GRID (Shopify, etc) */}
      {isShops && (
        <section className="py-32 bg-gray-50/50 px-6 md:px-20 border-t border-gray-100">
           <div className="max-w-6xl mx-auto text-center">
              <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400 mb-12">Proudly Integrated with</h3>
              <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-30">
                 {['shopify', 'paypal', 'apple-pay', 'stripe', 'amazon', 'google-pay'].map(brand => (
                   <i key={brand} className={`fi fi-brands-${brand} text-5xl md:text-7xl hover:opacity-100 transition-opacity cursor-pointer`}></i>
                 ))}
              </div>
           </div>
        </section>
      )}

      {/* CTA SECTION */}
      <section className={`py-32 px-6 md:px-20 ${data.color} text-black text-center relative overflow-hidden`}>
         <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none mb-12">
               Ready to {slug === 'link-shortener' ? 'shorten?' : slug === 'qr-generator' ? 'generate?' : 'join us?'}
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
               <button className="px-16 py-8 bg-black text-white rounded-full font-black uppercase text-sm shadow-2xl hover:scale-110 active:scale-95 transition-all">Get Started for Free</button>
            </div>
         </div>
      </section>

      <Footer />
    </div>
  )
}
