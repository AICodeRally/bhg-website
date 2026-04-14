'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, Zap, BarChart3, Users, CheckCircle, TrendingUp, Sparkles } from 'lucide-react'

interface Content {
  hero: {
    badge: string
    mainHeading: string
    highlightText: string
    subheading: string
    description: string
    ctaText: string
    secondaryCtaText: string
  }
  stats: Array<{ number: string; label: string }>
  valueProp: {
    heading: string
    subheading: string
    benefits: string[]
    capabilities: string[]
  }
  pillars: { heading: string; subheading: string }
  pillarCards: Array<{ title: string; description: string }>
  services: { heading: string; subheading: string }
  serviceCards: Array<{ title: string; description: string }>
  whyBhg: { heading: string; subheading: string; reasons: string[] }
  cta: { heading: string; subheading: string; ctaText: string }
  vendors: { heading: string; logos: string[] }
  testimonials: {
    heading: string
    subheading: string
    quotes: Array<{ quote: string; author: string; company: string }>
  }
  trustedCompanies: string[]
}

export function HomePageClient() {
  const [content, setContent] = useState<Content | null>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    fetch('/content.json')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(err => console.error('Error loading content:', err))
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const reveals = document.querySelectorAll('.scroll-reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    reveals.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  if (!content) return null

  const { hero, stats, valueProp, pillars, pillarCards, services, serviceCards, whyBhg, cta, vendors, testimonials, trustedCompanies } = content

  // Split heading safely
  const headingParts = hero.mainHeading.includes(hero.highlightText)
    ? hero.mainHeading.split(hero.highlightText)
    : [hero.mainHeading, '', '']

  return (
    <div className="relative">
      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="gradient-mesh absolute inset-0" />
        
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'rgba(80, 0, 0, 0.1)' }} />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'rgba(255, 184, 44, 0.08)', animationDelay: '1s' }} />
        
        <div className="section-container relative z-10 text-center">
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 rounded-full backdrop-blur">
            <Sparkles className="w-4 h-4" style={{ color: '#8B1538' }} />
            <span className="text-sm font-medium text-white/80">{hero.badge}</span>
          </div>

          <h1 className="text-7xl md:text-8xl font-bold mb-6 animate-fade-in-up leading-tight">
            {headingParts[0]}
            <span className="gradient-text">{hero.highlightText}</span>
            {headingParts[1]}
          </h1>
          
          <p className="text-xl md:text-2xl text-white/60 mb-4 max-w-3xl mx-auto animate-fade-in-up stagger-1">
            {hero.subheading}
          </p>

          <p className="text-lg text-white/50 max-w-2xl mx-auto mb-12 animate-fade-in-up stagger-2 leading-relaxed">
            {hero.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up stagger-3">
            <Link href="/assessment" className="btn-primary">
              {hero.ctaText} <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <button className="px-8 py-4 border-2 border-white/20 rounded-lg hover:border-white/50 transition backdrop-blur">
              {hero.secondaryCtaText}
            </button>
          </div>

          <div className="mt-20 grid grid-cols-3 gap-8 max-w-xl mx-auto">
            {stats.map((stat, idx) => (
              <div key={idx} className="scroll-reveal">
                <div className="text-4xl font-bold gradient-text">{stat.number}</div>
                <p className="text-white/50 text-sm mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2 text-white/50">
            <span className="text-sm">Scroll to explore</span>
            <div className="w-1 h-8 border-l border-white/20 animate-pulse" />
          </div>
        </div>
      </section>

      {/* SECTION 1.5: VENDOR LOGOS */}
      <section className="relative py-16 bg-gradient-to-b from-black via-black/50 to-transparent">
        <div className="section-container relative z-10">
          <div className="text-center scroll-reveal mb-12">
            <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest">{vendors.heading}</h3>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {vendors.logos.map((logo, idx) => (
              <div key={idx} className="scroll-reveal" style={{ animationDelay: `${idx * 0.05}s` }}>
                <p className="text-white/70 font-semibold text-lg">{logo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: VALUE PROP */}
      <section className="relative py-24 bg-gradient-to-b from-transparent via-black to-black overflow-hidden">
        <div className="gradient-mesh absolute inset-0" />
        
        <div className="section-container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="scroll-reveal">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                {valueProp.heading}
              </h2>
              <p className="text-lg text-white/60 mb-6 leading-relaxed">
                {valueProp.subheading}
              </p>
              <div className="space-y-4">
                {valueProp.benefits.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#8B1538' }} />
                    <span className="text-white/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative scroll-reveal stagger-1">
              <div className="glass-card p-8" style={{ backgroundColor: 'rgba(139, 21, 56, 0.05)' }}>
                <div className="grid grid-cols-2 gap-4">
                  {valueProp.capabilities.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-lg backdrop-blur" style={{ backgroundColor: 'rgba(80, 0, 0, 0.1)' }}>
                      <p className="text-sm font-semibold text-white">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: PILLARS */}
      <section className="relative py-24">
        <div className="section-container relative z-10">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">{pillars.heading}</h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">{pillars.subheading}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pillarCards.map((pillar, idx) => {
              const icons = [BarChart3, Users, TrendingUp]
              const Icon = icons[idx] || BarChart3
              return (
              <div key={idx} className="scroll-reveal glass-card p-8 group" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-xl group-hover:scale-150 transition duration-500" style={{ backgroundColor: 'rgba(139, 21, 56, 0.1)' }} />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center" style={{ backgroundColor: 'rgba(139, 21, 56, 0.2)' }}>
                    <Icon className="w-6 h-6" style={{ color: '#8B1538' }} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{pillar.title}</h3>
                  <p className="text-white/60">{pillar.description}</p>
                </div>
              </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: SERVICES */}
      <section className="relative py-24 bg-gradient-to-b from-black via-black to-transparent">
        <div className="gradient-mesh absolute inset-0" />
        
        <div className="section-container relative z-10">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">{services.heading}</h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">{services.subheading}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {serviceCards.map((service, idx) => {
              const icons = [Zap, BarChart3, Users, TrendingUp]
              const Icon = icons[idx] || Zap
              return (
              <div key={idx} className="scroll-reveal glass-card p-6 group" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center group-hover:scale-125 transition" style={{ backgroundColor: 'rgba(139, 21, 56, 0.2)' }}>
                  <Icon className="w-6 h-6" style={{ color: '#8B1538' }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-sm text-white/60">{service.description}</p>
              </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: WHY BHG */}
      <section className="relative py-24">
        <div className="section-container relative z-10">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">{whyBhg.heading}</h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">{whyBhg.subheading}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {whyBhg.reasons.map((reason, idx) => (
              <div key={idx} className="scroll-reveal glass-card p-6" style={{ animationDelay: `${idx * 0.1}s` }}>
                <p className="text-white font-semibold">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: PROOF POINTS */}
      <section className="relative py-24 bg-gradient-to-b from-transparent via-black to-black">
        <div className="section-container relative z-10 text-center">
          <h2 className="text-4xl font-bold mb-12 scroll-reveal">Trusted by Industry Leaders</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-center">
            {trustedCompanies.map((company, idx) => (
              <div key={idx} className="scroll-reveal" style={{ animationDelay: `${idx * 0.1}s` }}>
                <p className="text-white/50 font-semibold text-sm">{company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: TESTIMONIALS */}
      <section className="relative py-24">
        <div className="section-container relative z-10">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">{testimonials.heading}</h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">{testimonials.subheading}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.quotes.map((testimonial, idx) => (
              <div key={idx} className="scroll-reveal glass-card p-8 border-l-4" style={{ borderColor: '#8B1538', animationDelay: `${idx * 0.1}s` }}>
                <p className="text-lg text-white/80 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="text-white font-semibold">{testimonial.author}</p>
                  <p className="text-white/50 text-sm">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: RESOURCES */}
      <section className="relative py-24 bg-gradient-to-b from-black via-black to-transparent">
        <div className="gradient-mesh absolute inset-0" />
        
        <div className="section-container relative z-10">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">Resources & Insights</h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">Learn from industry experts and SPM thought leaders</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'SPM Implementation Guide', description: 'A comprehensive playbook for planning your SPM transformation' },
              { title: 'Sales Comp Benchmarking Report', description: 'Industry data on compensation structures and best practices' },
              { title: 'Change Management Checklist', description: 'Critical steps to ensure user adoption and system success' },
            ].map((resource, idx) => (
              <div key={idx} className="scroll-reveal glass-card p-8 hover:scale-105 transition" style={{ animationDelay: `${idx * 0.1}s` }}>
                <h3 className="text-xl font-bold text-white mb-2">{resource.title}</h3>
                <p className="text-white/60 mb-4">{resource.description}</p>
                <button className="text-white font-semibold flex items-center gap-2" style={{ color: '#8B1538' }}>
                  Download <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: BOTTOM CTA */}
      <section className="relative py-24">
        <div className="section-container relative z-10 text-center">
          <div className="scroll-reveal">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">{cta.heading}</h2>
            <p className="text-lg text-white/60 mb-12 max-w-2xl mx-auto">
              {cta.subheading}
            </p>
            <Link href="#contact" className="btn-primary inline-flex items-center gap-2">
              {cta.ctaText} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
