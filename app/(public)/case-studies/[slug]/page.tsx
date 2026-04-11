'use client'

import { useEffect, useState, Suspense } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, TrendingUp, CheckCircle } from 'lucide-react'

interface CaseStudy {
  id: string
  title: string
  slug: string
  platform: string
  industry: string
  companySize: string
  excerpt: string
  challenge: {
    title: string
    description: string
    bullets: string[]
  }
  solution: {
    title: string
    description: string
    approach: string[]
  }
  results: Array<{
    metric: string
    before: string
    after: string
    impact: string
  }>
  roi: {
    annualSavings: string
    savingsBreakdown: string
    paybackPeriod: string
  }
  testimonial: {
    quote: string
    author: string
    company: string
  }
  nextSteps: string[]
}

function CaseStudyContent() {
  const params = useParams()
  const slug = params.slug as string
  const [study, setStudy] = useState<CaseStudy | null>(null)
  const [allStudies, setAllStudies] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/case-studies.json')
      .then((res) => res.json())
      .then((data) => {
        setAllStudies(data)
        const found = data.find((s: CaseStudy) => s.slug === slug)
        setStudy(found)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error loading case study:', err)
        setLoading(false)
      })
  }, [slug])

  if (loading || !study) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-white/20 border-t-red-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading case study...</p>
        </div>
      </div>
    )
  }

  const nextStudy = allStudies[
    (allStudies.findIndex((s) => s.slug === slug) + 1) % allStudies.length
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <section className="relative pt-32 pb-16">
        <div className="gradient-mesh absolute inset-0" />
        <div className="section-container relative z-10">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Case Studies
          </Link>

          <div className="max-w-3xl">
            <div className="flex gap-2 mb-6">
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-white/10 text-white/70 border border-white/20">
                {study.platform}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-white/10 text-white/70 border border-white/20">
                {study.industry}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-white/10 text-white/70 border border-white/20">
                {study.companySize}
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">{study.title}</h1>
            <p className="text-xl text-white/60">{study.excerpt}</p>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="relative py-16 bg-gradient-to-b from-black via-black/50 to-transparent">
        <div className="section-container relative z-10">
          <div className="grid md:grid-cols-3 gap-6">
            {study.results.map((result, idx) => (
              <div
                key={idx}
                className="glass-card p-8"
                style={{ backgroundColor: 'rgba(139, 21, 56, 0.08)' }}
              >
                <p className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-3">
                  {result.metric}
                </p>
                <div className="flex items-center gap-4 mb-3">
                  <div>
                    <p className="text-sm text-white/60">Before</p>
                    <p className="text-2xl font-bold text-white">{result.before}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/40 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-white/60">After</p>
                    <p className="text-2xl font-bold text-white">{result.after}</p>
                  </div>
                </div>
                <p className="text-sm text-white/70 font-semibold" style={{ color: '#8B1538' }}>
                  {result.impact}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="relative py-24">
        <div className="section-container relative z-10">
          <div className="grid md:grid-cols-2 gap-16 mb-24">
            {/* Challenge */}
            <div className="scroll-reveal">
              <h2 className="text-4xl font-bold text-white mb-6">{study.challenge.title}</h2>
              <p className="text-lg text-white/70 mb-8 leading-relaxed">{study.challenge.description}</p>
              <div className="space-y-3">
                {study.challenge.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="w-1.5 h-1.5 bg-white/40 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-white/70">{bullet}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Solution */}
            <div className="scroll-reveal stagger-1">
              <h2 className="text-4xl font-bold text-white mb-6">{study.solution.title}</h2>
              <p className="text-lg text-white/70 mb-8 leading-relaxed">{study.solution.description}</p>
              <div className="space-y-3">
                {study.solution.approach.map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#8B1538' }} />
                    <p className="text-white/70">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ROI Summary */}
          <div className="glass-card p-12 text-center mb-24" style={{ backgroundColor: 'rgba(139, 21, 56, 0.08)' }}>
            <p className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4">
              Financial Impact
            </p>
            <div className="flex items-center justify-center gap-6 mb-8">
              <TrendingUp className="w-8 h-8" style={{ color: '#8B1538' }} />
              <div>
                <p className="text-5xl font-bold text-white">{study.roi.annualSavings}</p>
                <p className="text-white/60 mt-2">Annual Savings</p>
              </div>
            </div>
            <div className="space-y-2 text-white/70">
              <p>{study.roi.savingsBreakdown}</p>
              <p className="font-semibold text-white">Payback Period: {study.roi.paybackPeriod}</p>
            </div>
          </div>

          {/* Testimonial */}
          <div
            className="glass-card p-12 border-l-4 mb-24"
            style={{ borderColor: '#8B1538', backgroundColor: 'rgba(139, 21, 56, 0.05)' }}
          >
            <p className="text-2xl text-white/90 italic mb-6">"{study.testimonial.quote}"</p>
            <div>
              <p className="text-white font-semibold">{study.testimonial.author}</p>
              <p className="text-white/60">{study.testimonial.company}</p>
            </div>
          </div>

          {/* Next Steps */}
          <div>
            <h2 className="text-4xl font-bold text-white mb-8">Ongoing Optimization</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {study.nextSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="glass-card p-6"
                  style={{ backgroundColor: 'rgba(139, 21, 56, 0.08)' }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center mb-4 text-white font-bold text-sm"
                    style={{ backgroundColor: 'rgba(139, 21, 56, 0.2)' }}
                  >
                    {idx + 1}
                  </div>
                  <p className="text-white/80">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Next Case Study */}
      <section className="relative py-24 bg-gradient-to-b from-black via-black to-transparent">
        <div className="section-container relative z-10">
          <p className="text-white/60 uppercase tracking-widest text-sm font-semibold mb-6">Next Case Study</p>
          <div className="flex items-end justify-between">
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{nextStudy.title}</h2>
              <p className="text-lg text-white/60 mb-6">{nextStudy.excerpt}</p>
              <Link
                href={`/case-studies/${nextStudy.slug}`}
                className="inline-flex items-center gap-2 text-white hover:gap-3 transition"
                style={{ color: '#8B1538' }}
              >
                Read Case Study <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24">
        <div className="section-container relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Let's Discuss Your Opportunity
          </h2>
          <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
            Ready to unlock your ICM platform ROI? Schedule a consultation with our optimization specialists.
          </p>
          <Link href="/assessment" className="btn-primary inline-flex items-center gap-2">
            Take the Assessment <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default function CaseStudyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-white/20 border-t-red-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white/60">Loading...</p>
          </div>
        </div>
      }
    >
      <CaseStudyContent />
    </Suspense>
  )
}
