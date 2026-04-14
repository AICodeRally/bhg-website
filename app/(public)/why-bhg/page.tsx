import { createPageMetadata } from '@/lib/metadata'
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = createPageMetadata({
  title: 'Why BHG | SPM Specialists',
  description: 'Understand why BHG is your partner for SPM success — proven methodology, dedicated team, and 300+ implementations.',
})

export default function WhyBHGPage() {
  const reasons = [
    'Vendor-agnostic optimization expertise',
    'No platform replacement needed',
    'Proven ROI acceleration methodology',
    'Ongoing strategic partnership'
  ]

  return (
    <div className="min-h-screen pt-24">
      <div className="section-container">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">Why Choose BHG?</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            We work alongside your existing platform, not against it.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {reasons.map((reason, idx) => (
            <div key={idx} className="glass-card p-8 border-l-4 border-white/20">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white/70 text-sm font-bold">{idx + 1}</span>
                </div>
                <p className="text-white/80 text-lg">{reason}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Our Track Record</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { stat: '300+', label: 'ICM Implementations' },
              { stat: '200+', label: 'Years Combined Expertise' },
              { stat: '40%', label: 'Average Cycle Compression' }
            ].map((item, idx) => (
              <div key={idx} className="glass-card p-8 text-center">
                <div className="text-4xl font-bold gradient-text mb-2">{item.stat}</div>
                <p className="text-white/60">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-8 mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">What Sets Us Apart</h2>
          <ul className="space-y-3 text-white/70">
            <li className="flex items-start gap-3">
              <span className="text-white/40 mt-1">→</span>
              <span>Deep expertise across Anaplan, Incent, Varicent, and other platforms</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-white/40 mt-1">→</span>
              <span>Proven methodology focused on business outcomes, not feature adoption</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-white/40 mt-1">→</span>
              <span>Strategic partnerships that accelerate value realization</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-white/40 mt-1">→</span>
              <span>Long-term support that scales with your business</span>
            </li>
          </ul>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to unlock your platform's potential?</h2>
          <Link href="/assessment" className="btn-primary inline-flex items-center gap-2">
            Take the Assessment <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
