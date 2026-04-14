import Link from 'next/link'
import { createPageMetadata } from '@/lib/metadata'
import { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = createPageMetadata({
  title: 'Insights & Resources | BHG SPM Specialists',
  description: 'SPM guides, benchmarks, and implementation resources from BHG experts.',
})

export default function InsightsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="section-container">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">Insights & Resources</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Learn from 300+ ICM implementations.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <Link href="/blog" className="glass-card p-8 hover:scale-105 transition block">
            <h3 className="text-xl font-bold text-white mb-2">Blog</h3>
            <p className="text-white/60 mb-4">Tactical SPM guides and implementation best practices.</p>
            <span className="text-white flex items-center gap-2" style={{ color: '#8B1538' }}>Read articles <ArrowRight className="w-4 h-4" /></span>
          </Link>
          <Link href="/case-studies" className="glass-card p-8 hover:scale-105 transition block">
            <h3 className="text-xl font-bold text-white mb-2">Case Studies</h3>
            <p className="text-white/60 mb-4">Real ROI results from actual client engagements.</p>
            <span className="text-white flex items-center gap-2" style={{ color: '#8B1538' }}>View results <ArrowRight className="w-4 h-4" /></span>
          </Link>
          <Link href="/roi-calculator" className="glass-card p-8 hover:scale-105 transition block">
            <h3 className="text-xl font-bold text-white mb-2">ROI Calculator</h3>
            <p className="text-white/60 mb-4">See your potential savings from SPM optimization.</p>
            <span className="text-white flex items-center gap-2" style={{ color: '#8B1538' }}>Calculate now <ArrowRight className="w-4 h-4" /></span>
          </Link>
          <Link href="/assessment" className="glass-card p-8 hover:scale-105 transition block">
            <h3 className="text-xl font-bold text-white mb-2">Free Assessment</h3>
            <p className="text-white/60 mb-4">5-minute gap analysis to find your biggest SPM opportunities.</p>
            <span className="text-white flex items-center gap-2" style={{ color: '#8B1538' }}>Take assessment <ArrowRight className="w-4 h-4" /></span>
          </Link>
        </div>
      </div>
    </div>
  )
}
