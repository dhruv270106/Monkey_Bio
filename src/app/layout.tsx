import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import '@flaticon/flaticon-uicons/css/all/all.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const openSans = Open_Sans({ 
  subsets: ['latin'],
  variable: '--font-open',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Monkey Bio | One Link for Everything',
  description: 'Connect your audience to everything you are with one simple link.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={openSans.variable}>
      <body dir="ltr" className="antialiased">
        <Navbar />
        <main className="min-h-screen overflow-x-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
