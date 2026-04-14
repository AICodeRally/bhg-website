import type { Metadata } from 'next'
import AdminShortcut from '@/components/AdminShortcut'
import './globals.css'

export const metadata: Metadata = {
  title: 'Blue Horizons Group | Sales Performance Management',
  description: 'BHG is the SPM specialist firm that treats every implementation as a business reinvention, not a software project. 300+ ICM implementations. 200+ years of combined expertise.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AdminShortcut />
        {children}
      </body>
    </html>
  )
}
