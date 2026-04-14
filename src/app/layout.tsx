import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Vizier - 21st Century Digital Steward',
  description: 'Your right-hand AI agent for multi-channel automation.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: 'var(--background)' }}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}