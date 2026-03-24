'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { TEMPLATES, TEMPLATE_CATEGORIES, Template } from '@/data/templates'
import { THEMES, Theme } from '@/data/themes'
import { supabase } from '@/lib/supabase'

export default function TemplatesPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'free' | 'premium'>('free')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
  }, [])

  const filteredTemplates = TEMPLATES.filter(
    (t) => (selectedCategory === 'All' || t.category === selectedCategory) && 
    (activeTab === 'premium' ? t.isPremium : !t.isPremium)
  )

  const availableCategories = TEMPLATE_CATEGORIES.filter(cat => {
    if (cat === 'All') return true
    return TEMPLATES.some(t => t.category === cat && (activeTab === 'premium' ? t.isPremium : !t.isPremium))
  })

  useEffect(() => {
    if (selectedCategory !== 'All' && !availableCategories.includes(selectedCategory)) {
      setSelectedCategory('All')
    }
  }, [activeTab, availableCategories, selectedCategory])

  useEffect(() => {
    const pendingTheme = localStorage.getItem('pendingTheme')
    if (pendingTheme && user) {
      const template = TEMPLATES.find(t => t.themeId === pendingTheme)
      if (template) {
        handleCreateLinktree(template)
        localStorage.removeItem('pendingTheme')
      }
    }
  }, [user])

  const handleCreateLinktree = async (template: Template) => {
    if (!user) {
      localStorage.setItem('pendingTheme', template.themeId)
      router.push('/login?redirect=/templates')
      return
    }

    setLoading(true)
    const selectedTheme = THEMES.find(t => t.id === template.themeId)
    
    if (selectedTheme) {
      const { error } = await supabase
        .from('monkey_bio')
        .update({ theme: selectedTheme.id })
        .eq('id', user.id)

      if (error) {
        alert('Error updating theme: ' + error.message)
      } else {
        router.push('/dashboard?tab=design')
      }
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">

      <main className="flex-1 flex flex-col pt-32 px-4 max-w-[1400px] mx-auto w-full pb-20">
        <div className="flex flex-col md:flex-row gap-12 flex-1">
          {/* Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 px-4">Categories</h2>
            <div className="flex flex-row md:flex-col gap-1 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap md:whitespace-normal px-4 py-3 rounded-2xl font-bold transition-all text-sm block min-w-fit md:min-w-0 ${
                    selectedCategory === cat
                      ? 'bg-gray-100 text-secondary'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-50">
              <h1 className="text-4xl font-black text-linktree-text">Templates</h1>
              
              {/* Tabs */}
              <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-[28px] w-fit relative z-[70] mx-auto sm:mx-0">
                <button
                  type="button"
                  onClick={() => setActiveTab('free')}
                  className={`px-10 py-3 rounded-[22px] text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer select-none ring-offset-2 focus:ring-2 focus:ring-primary/20 ${
                    activeTab === 'free' ? 'bg-white text-secondary shadow-md ring-1 ring-black/5' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  Free
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('premium')}
                  className={`px-10 py-3 rounded-[22px] text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer select-none ring-offset-2 focus:ring-2 focus:ring-primary/20 ${
                    activeTab === 'premium' ? 'bg-white text-secondary shadow-md ring-1 ring-black/5' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <i className="fi fi-ss-crown text-[10px] text-amber-400 pointer-events-none"></i> Premium
                </button>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-12 gap-x-8">
              <AnimatePresence mode="popLayout">
                {filteredTemplates.map((template) => (
                  <motion.div
                    key={template.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col gap-4 cursor-pointer group"
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <div className="aspect-[9/16] bg-gray-50 rounded-[40px] overflow-hidden relative shadow-sm group-hover:shadow-2xl transition-all duration-500 border border-gray-100">
                        {/* Recursive Mini Preview */}
                        <div className="absolute inset-0 scale-[1] origin-top">
                           <ThemePreviewContent 
                          themeId={template.themeId} 
                          templateId={template.id} 
                          overrideImage={template.image} 
                          isMini 
                        />
                        </div>

                        {template.isPremium && (
                          <div className="absolute top-6 right-6 bg-primary text-secondary px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-xl z-20">
                             Premium
                          </div>
                        )}

                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors z-10" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-secondary">{template.name}</h3>
                      <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{template.category}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      {/* Preview Modal */}
      <AnimatePresence>
        {selectedTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
          >
            <div className="absolute inset-0 bg-secondary/60 backdrop-blur-sm" onClick={() => setSelectedTemplate(null)} />
            
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-6xl bg-[#f3f3f1] rounded-[48px] overflow-hidden shadow-2xl flex flex-col md:flex-row h-[90vh] md:h-auto max-h-[90vh]"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedTemplate(null)}
                className="absolute top-8 right-8 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all z-50"
              >
                <i className="fi fi-rr-cross text-xs"></i>
              </button>

              {/* Left Side: Info */}
              <div className="flex-1 p-8 md:p-16 flex flex-col justify-center overflow-y-auto">
                <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-8">
                   <span>Templates</span>
                   <i className="fi fi-rr-angle-right text-[8px]"></i>
                   <span className="text-secondary">{selectedTemplate.name}</span>
                </nav>

                <h2 className="text-5xl md:text-7xl font-black text-secondary mb-8">{selectedTemplate.name}</h2>
                <p className="text-lg md:text-xl font-medium text-gray-600 mb-12 leading-relaxed">
                  {selectedTemplate.description}
                </p>

                <button
                  onClick={() => handleCreateLinktree(selectedTemplate)}
                  disabled={loading}
                  className="w-full md:w-fit px-10 py-5 bg-[#e9c0e9] hover:bg-[#dfafd2] text-secondary font-black rounded-full text-lg shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <i className="fi fi-rr-spinner animate-spin"></i>
                  ) : (
                    'Create your Linktree'
                  )}
                </button>
              </div>

              {/* Right Side: Mobile Preview */}
              <div className="w-full md:w-[45%] bg-white p-8 md:p-16 flex items-center justify-center relative overflow-hidden">
                  <div className="w-full max-w-[320px] aspect-[9/18.5] rounded-[44px] border-[10px] border-[#020617] shadow-2xl relative overflow-hidden flex flex-col items-center">
                     {/* Theme Background */}
                     <ThemePreviewContent 
                       themeId={selectedTemplate.themeId} 
                       templateId={selectedTemplate.id} 
                       overrideImage={selectedTemplate.image} 
                     />
                     
                     {/* Notch */}
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#020617] rounded-b-[16px] z-50"></div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
                  <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-200/40 rounded-full blur-3xl" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ThemePreviewContent({ themeId, templateId, overrideImage, isMini }: { themeId: string, templateId?: string, overrideImage?: string, isMini?: boolean }) {
  const theme = THEMES.find(t => t.id === themeId) || THEMES[0]
  
  // Massively Expanded Mock Profiles to prevent repetition
  const mockProfiles = [
    { name: 'Katy Delma', bio: 'Solar design practice.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200' },
    { name: 'Hydra Juice', bio: 'Daily vitamin C dose.', avatar: 'https://images.unsplash.com/photo-1613511723521-085e6878b66e?auto=format&fit=crop&q=80&w=200' },
    { name: 'Matthew Hugh', bio: 'Skater & home cook.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200' },
    { name: 'Elena Rossi', bio: 'Fashion designer.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200' },
    { name: 'Drift Theory', bio: 'Street style culture.', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200' },
    { name: 'Wild Roots', bio: 'Urban gardener.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200' },
    { name: 'Tech Pulse', bio: 'Software engineer.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
    { name: 'Saffron Sage', bio: 'Farm to table recipes.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200' },
    { name: 'Orbit Lab', bio: 'Space & innovation.', avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=200' },
    { name: 'Lunar Beats', bio: 'Nightlife curator.', avatar: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&q=80&w=200' },
    { name: 'Aero Motion', bio: 'Drone cinematography.', avatar: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&q=80&w=200' },
    { name: 'Velvet Ink', bio: 'Tattoo & illustration.', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200' },
    { name: 'Oasis Flow', bio: 'Wellness & meditation.', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?auto=format&fit=crop&q=80&w=200' },
    { name: 'Pixel Craft', bio: 'Digital art studio.', avatar: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&q=80&w=200' },
    { name: 'Iron Will', bio: 'Fitness coaching.', avatar: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&q=80&w=200' },
    { name: 'Cobalt Blue', bio: 'Interior design blog.', avatar: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&q=80&w=200' },
    { name: 'Amber Trail', bio: 'Hiking and outdoor photography.', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=200' },
    { name: 'Neon Knight', bio: 'Professional gaming & streaming.', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200' },
    { name: 'Slate Legal', bio: 'Corporate law simplified.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200' },
    { name: 'Equity First', bio: 'Ethical financial advisory.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' }
  ]
  
  // Expanded varied link sets
  const mockLinkSets = [
    [
      { label: 'Travel Blog', icon: 'fi-rr-plane' },
      { label: 'YouTube', icon: 'fi-brands-youtube' },
      { label: 'Instagram', icon: 'fi-brands-instagram' }
    ],
    [
      { label: 'Portfolio', icon: 'fi-rr-briefcase' },
      { label: 'Contact', icon: 'fi-rr-envelope' },
      { label: 'LinkedIn', icon: 'fi-brands-linkedin' }
    ],
    [
      { label: 'Shop Now', icon: 'fi-rr-shopping-cart' },
      { label: 'New Arrivals', icon: 'fi-rr-bolt' },
      { label: 'Support', icon: 'fi-rr-headset' }
    ],
    [
      { label: 'Latest Stream', icon: 'fi-brands-twitch' },
      { label: 'Discord', icon: 'fi-brands-discord' },
      { label: 'Setup', icon: 'fi-rr-computer' }
    ],
    [
      { label: 'Full Menu', icon: 'fi-rr-restaurant' },
      { label: 'Reservations', icon: 'fi-rr-calendar' },
      { label: 'Order Online', icon: 'fi-rr-box' }
    ],
    [
      { label: 'Free Course', icon: 'fi-rr-graduation-cap' },
      { label: 'E-Books', icon: 'fi-rr-book' },
      { label: 'Mentorship', icon: 'fi-rr-user' }
    ],
    [
      { label: 'Whitepaper', icon: 'fi-rr-document' },
      { label: 'Buy Token', icon: 'fi-rr-coins' },
      { label: 'Twitter Hub', icon: 'fi-brands-twitter' }
    ]
  ]

  // Use templateId for uniqueness if available
  const uniqueId = templateId || theme.id
  const hash = uniqueId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const mock = mockProfiles[hash % mockProfiles.length]
  const links = mockLinkSets[hash % mockLinkSets.length]
  
  const footerImages = [
    'https://images.unsplash.com/photo-1541701494587-cb58502866ab',
    'https://images.unsplash.com/photo-1550684848-fac1c5b4e853',
    'https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c',
    'https://images.unsplash.com/photo-1518770660439-4636190af475'
  ]
  const footerImg = footerImages[hash % footerImages.length]

  const backgroundImage = overrideImage || theme.image

  return (
    <div className={`absolute inset-0 ${theme.bg} flex flex-col items-center p-3 sm:p-4 pt-8 md:pt-16 overflow-hidden`}>
      {/* Background layer */}
      {backgroundImage && (
        <div 
          className="absolute inset-0"
          style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
      )}
      {theme.video && !isMini && (
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          poster={backgroundImage}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={theme.video} type="video/mp4" />
        </video>
      )}

      {/* Profile Mockup */}
      <div className={`relative z-10 w-full flex flex-col items-center ${isMini ? 'scale-[0.8]' : ''} transition-transform`}>
        <div className={`${isMini ? 'w-12 h-12' : 'w-20 h-20'} rounded-full bg-white/20 backdrop-blur-md border border-white/40 mb-4 overflow-hidden shadow-2xl shrink-0`}>
          <img src={mock.avatar} className="w-full h-full object-cover" alt="" />
        </div>
        
        <h4 className={`font-black text-center mb-1 leading-tight ${isMini ? 'text-[10px]' : 'text-xl'} ${theme.text.includes('white') ? 'text-white' : 'text-secondary'}`}>
           {mock.name}
        </h4>
        <p className={`text-center px-4 font-bold opacity-80 leading-tight mb-8 ${isMini ? 'text-[6px]' : 'text-xs'} ${theme.text.includes('white') ? 'text-white' : 'text-secondary'}`}>
           {mock.bio}
        </p>

        {/* Buttons List */}
        <div className="w-full space-y-3 pb-20">
          {links.map((btn, i) => (
            <div 
              key={i} 
              className={`w-full flex items-center gap-3 transition-all truncate shadow-sm group-hover:scale-[1.02] ${isMini ? 'h-8 px-2 rounded-xl' : 'h-12 px-4 rounded-2xl'} ${theme.button}`}
            >
              <i className={`fi ${btn.icon} ${isMini ? 'text-[8px]' : 'text-sm'} opacity-90`}></i>
              <span className={`flex-1 text-center font-bold truncate ${isMini ? 'text-[7px]' : 'text-[11px]'}`}>
                {btn.label}
              </span>
            </div>
          ))}
        </div>

        {/* Social Icons Row */}
        {!isMini && (
          <div className="mt-4 flex gap-4">
             {['fi-brands-tiktok', 'fi-brands-youtube', 'fi-brands-twitter', 'fi-brands-instagram'].map((icon, i) => (
               <div key={icon} className={`w-8 h-8 rounded-full ${theme.text.includes('white') ? 'bg-white/10' : 'bg-black/5'} flex items-center justify-center transition-transform hover:scale-125`}>
                  <i className={`fi ${icon} text-lg ${theme.text.includes('white') ? 'text-white' : 'text-secondary'}`}></i>
               </div>
             ))}
          </div>
        )}
      </div>

      {/* Bottom Decorative Overlay */}
      {!theme.video && (
        <div className="absolute bottom-[-5%] left-0 right-0 h-1/3 opacity-40 pointer-events-none">
           <img src={footerImg + '?auto=format&fit=crop&q=80&w=400'} className="w-full h-full object-contain object-bottom filter blur-md" alt="" />
        </div>
      )}
    </div>
  )
}
