'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

interface GapDetail {
  id: string
  name: string
  description: string
  impact: string
  solution: string
  metrics: string[]
}

function ResultsContent() {
  const searchParams = useSearchParams()
  const gapType = searchParams.get('gap') || 'Compression'
  const score = parseInt(searchParams.get('score') || '75', 10)
  const [gapDetails, setGapDetails] = useState<GapDetail | null>(null)

  useEffect(() => {
    fetch('/assessment-data.json')
      .then((res) => res.json())
      .then((data) => {
        const gap = data.gapTypes.find((g: GapDetail) => g.id === gapType)
        setGapDetails(gap)
      })
      .catch((err) => console.error('Error loading gap details:', err))
  }, [gapType])

  if (!gapDetails) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-white/20 border-t-red-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading your results...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <div className="section-container max-w-3xl">
        {/* Results Header */}
        <div className="mb-16">
          {/* Score Badge */}
          <div className="inline-flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-red-600/20 to-red-700/20 border border-red-500/30 rounded-lg backdrop-blur mb-8">
            <div className="text-5xl font-bold text-white">{score}</div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-white">Gap Score</p>
              <p className="text-xs text-white/60">Higher score = more opportunity</p>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{gapDetails.name}</h1>
          <p className="text-xl text-white/60">{gapDetails.description}</p>
        </div>

        {/* Gap Impact & Solution */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Impact */}
          <div className="glass-card p-8" style={{ backgroundColor: 'rgba(139, 21, 56, 0.05)' }}>
            <h3 className="text-xl font-bold text-white mb-4">The Impact</h3>
            <p className="text-white/70 leading-relaxed">{gapDetails.impact}</p>
          </div>

          {/* Solution */}
          <div className="glass-card p-8" style={{ backgroundColor: 'rgba(80, 100, 200, 0.05)' }}>
            <h3 className="text-xl font-bold text-white mb-4">The Solution</h3>
            <p className="text-white/70 leading-relaxed">{gapDetails.solution}</p>
          </div>
        </div>

        {/* Metrics */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Expected Impact</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {gapDetails.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="glass-card p-6"
                style={{ backgroundColor: 'rgba(139, 21, 56, 0.08)' }}
              >
                <div className="flex items-start gap-3 mb-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: '#8B1538' }} />
                  <p className="text-white/80">{metric}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mb-16">
          <div className="glass-card p-12 text-center" style={{ backgroundColor: 'rgba(139, 21, 56, 0.08)' }}>
            <h2 className="text-3xl font-bold text-white mb-4">Let's Talk About Your Opportunity</h2>
            <p className="text-lg text-white/60 mb-8 max-w-xl mx-auto">
              Our optimization specialists can help you implement the changes needed to capture this value.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Schedule a Consultation <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/"
                className="px-8 py-4 border-2 border-white/20 rounded-lg hover:border-white/50 transition"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6">Next Steps</h3>
          <ol className="space-y-4">
            {[
              'Share your assessment with your team for alignment',
              'Schedule a 30-minute optimization call with our specialists',
              'Receive a customized roadmap for capturing this value',
            ].map((step, idx) => (
              <li key={idx} className="flex gap-4">
                <span
                  className="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 font-semibold"
                  style={{ backgroundColor: 'rgba(139, 21, 56, 0.2)', color: '#8B1538' }}
                >
                  {idx + 1}
                </span>
                <span className="text-white/70 pt-1">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-white/20 border-t-red-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white/60">Loading results...</p>
          </div>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  )
}
