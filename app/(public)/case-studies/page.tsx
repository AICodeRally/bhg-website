'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, TrendingUp } from 'lucide-react'

interface CaseStudy {
  id: string
  title: string
  slug: string
  platform: string
  industry: string
  excerpt: string
  roi: {
    annualSavings: string
  }
}

export default function CaseStudiesPage() {
  const [studies, setStudies] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/case-studies.json')
      .then((res) => res.json())
      .then((data) => {
        setStudies(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error loading case studies:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-white/20 border-t-red-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading case studies...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <section className="relative pt-32 pb-16">
        <div className="gradient-mesh absolute inset-0" />
        <div className="section-container relative z-10 text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white">
            How We've Optimized <span className="gradient-text">Real Companies</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            See how enterprises across industries have accelerated their ICM ROI with BHG.
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="relative py-24">
        <div className="section-container relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            {studies.map((study, idx) => (
              <Link
                key={study.id}
                href={`/case-studies/${study.slug}`}
                className="group scroll-reveal"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div
                  className="glass-card p-8 h-full flex flex-col hover:translate-y-[-4px] transition duration-300"
                  style={{ backgroundColor: 'rgba(139, 21, 56, 0.05)' }}
                >
                  {/* Platform & Industry */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/70 border border-white/20">
                        {study.platform}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/70 border border-white/20">
                        {study.industry}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:gradient-text transition leading-snug flex-grow">
                    {study.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-white/60 mb-6 flex-grow">{study.excerpt}</p>

                  {/* ROI Badge */}
                  <div className="flex items-center gap-2 pt-6 border-t border-white/10">
                    <TrendingUp className="w-5 h-5" style={{ color: '#8B1538' }} />
                    <span className="text-white font-semibold">{study.roi.annualSavings} Annual Savings</span>
                    <ArrowRight className="w-4 h-4 text-white/40 ml-auto group-hover:text-white/80 transition" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-gradient-to-b from-transparent via-black to-transparent">
        <div className="section-container relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Optimize Your ICM?
          </h2>
          <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
            Schedule a consultation to discuss how we can unlock your platform ROI.
          </p>
          <Link
            href="/assessment"
            className="btn-primary inline-flex items-center gap-2"
          >
            Take the Assessment <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
