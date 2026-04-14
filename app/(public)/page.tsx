import { Metadata } from 'next'
import { HomePageClient } from './page-client'
import { createPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = createPageMetadata({
  title: 'BHG | SPM Specialists - Optimize Your ICM Platform',
  description: 'Unlock your sales compensation potential. Vendor-agnostic ICM optimization for Anaplan, Incent, Varicent & more. 300+ implementations.',
  ogType: 'website',
})

export default function HomePage() {
  return <HomePageClient />
}
