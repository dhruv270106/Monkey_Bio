import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@flaticon/flaticon-uicons/css/all/all.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Monkey Linktree | One Link for Everything',
  description: 'Connect your audience to everything you are with one simple link.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body dir="ltr" className={inter.className}>{children}</body>
    </html>
  )
}
