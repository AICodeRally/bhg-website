'use client'

import { useEffect, useState } from 'react'
import { Sparkles, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import AssessmentForm from '@/components/AssessmentForm'

interface Question {
  id: string
  type: 'range' | 'percentage' | 'scale' | 'checkbox'
  question: string
  description?: string
  min?: number
  max?: number
  minLabel?: string
  maxLabel?: string
  defaultValue?: number
  step?: number
  scale?: Array<{ value: number; label: string }>
  options?: Array<{ value: string; label: string; gapType: string }>
}

export default function AssessmentPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/assessment-data.json')
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.questions)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error loading assessment data:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-white/20 border-t-red-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading assessment...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <div className="section-container">
        {/* Header */}
        <div className="mb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 rounded-full backdrop-blur mb-6">
              <Sparkles className="w-4 h-4" style={{ color: '#8B1538' }} />
              <span className="text-sm font-medium text-white/80">5-Minute Assessment</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Find Your <span className="gradient-text">ICM Optimization</span> Gap
            </h1>

            <p className="text-xl text-white/60 mb-2">
              Answer a few quick questions about your current setup.
            </p>
            <p className="text-lg text-white/50">
              We'll identify where you're losing efficiency and show you the path to ROI.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-2xl">
          <div className="glass-card p-12" style={{ backgroundColor: 'rgba(139, 21, 56, 0.05)' }}>
            <AssessmentForm questions={questions} />
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-16 max-w-2xl grid md:grid-cols-3 gap-8">
          <div>
            <p className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-2">
              Your Privacy
            </p>
            <p className="text-white/50 text-sm">We never share your data. Your assessment results are confidential.</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-2">
              No Obligation
            </p>
            <p className="text-white/50 text-sm">See your results instantly. No sales call required unless you want one.</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-2">
              5 Minutes
            </p>
            <p className="text-white/50 text-sm">Quick questions designed to pinpoint your biggest optimization opportunities.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
