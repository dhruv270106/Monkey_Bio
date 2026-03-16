'use client'

import React, { useState, useRef, useEffect } from 'react'
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { motion, AnimatePresence } from 'framer-motion'

interface ImageCropperModalProps {
  isOpen: boolean
  imageSrc: string
  onClose: () => void
  onCropComplete: (croppedImage: string) => void
}

export default function ImageCropperModal({ isOpen, imageSrc, onClose, onCropComplete }: ImageCropperModalProps) {
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const imgRef = useRef<HTMLImageElement>(null)

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget
    
    const initialCrop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        1 / 1,
        width,
        height
      ),
      width,
      height
    )
    setCrop(initialCrop)
  }

  const getCroppedImg = async () => {
    if (!completedCrop || !imgRef.current) return

    const canvas = document.createElement('canvas')
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height
    canvas.width = completedCrop.width
    canvas.height = completedCrop.height
    const ctx = canvas.getContext('2d')

    if (!ctx) return

    ctx.drawImage(
      imgRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    )

    const base64Image = canvas.toDataURL('image/jpeg', 0.9)
    onCropComplete(base64Image)
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md" 
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col p-8 items-center"
        >
          <div className="w-full flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-secondary">Crop your image</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <i className="fi fi-rr-cross-small text-xl text-gray-400"></i>
            </button>
          </div>

          <div className="max-h-[60vh] overflow-auto w-full flex justify-center bg-gray-50 rounded-2xl p-4 mb-8">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1 / 1}
              circularCrop
            >
              <img
                ref={imgRef}
                alt="Crop me"
                src={imageSrc}
                onLoad={onImageLoad}
                className="max-w-full"
              />
            </ReactCrop>
          </div>

          <div className="w-full flex gap-4">
            <button 
              onClick={onClose}
              className="flex-1 py-4 bg-gray-100 text-secondary font-black rounded-full hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={getCroppedImg}
              className="flex-1 py-4 bg-primary text-secondary font-black rounded-full shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
            >
              Save & Apply
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
