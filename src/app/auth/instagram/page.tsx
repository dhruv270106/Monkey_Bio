'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function MockInstagramAuth() {
  const [loading, setLoading] = useState(false)

  const handleAuthorize = () => {
    setLoading(true)
    setTimeout(() => {
      // Send message to parent window
      window.opener.postMessage({ type: 'INSTAGRAM_AUTH_SUCCESS' }, '*')
      window.close()
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-[400px] bg-white border border-gray-300 rounded-sm p-10 flex flex-col items-center text-center space-y-6 shadow-sm">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" 
          alt="Instagram" 
          className="w-32 mb-4"
        />
        
        <div className="space-y-2">
           <h1 className="text-xl font-semibold text-gray-800">Monkey Bio would like to access:</h1>
           <p className="text-sm text-gray-500 leading-relaxed">
             This will allow <span className="font-bold text-gray-800">Monkey Bio</span> to see your profile info, username, and media to enable Auto-Reply features.
           </p>
        </div>

        <div className="w-full h-[1px] bg-gray-200"></div>

        <div className="w-full space-y-3">
           <button 
             onClick={handleAuthorize}
             disabled={loading}
             className="w-full py-2.5 bg-[#0095f6] text-white font-semibold rounded-lg hover:bg-[#1877f2] transition-colors flex items-center justify-center gap-2"
           >
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Allow Permission'}
           </button>
           <button 
             onClick={() => window.close()}
             className="w-full py-2.5 text-gray-800 font-semibold text-sm hover:bg-gray-50 rounded-lg transition-colors border border-gray-300"
           >
              Cancel
           </button>
        </div>

        <p className="text-[10px] text-gray-400">
           By clicking Allow, you authorize Monkey Bio to use your info in accordance with their terms.
        </p>
      </div>

      <div className="mt-8 text-xs text-gray-400">
         © 2026 INSTAGRAM FROM META
      </div>
    </div>
  )
}
