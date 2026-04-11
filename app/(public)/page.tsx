'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, Zap, BarChart3, Users, CheckCircle, TrendingUp, Sparkles } from 'lucide-react'

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)

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

  return (
    <div className="relative">
      {/* SECTION 1: HERO - DRAMATIC & MODERN */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="gradient-mesh absolute inset-0" />
        
        {/* Animated background elements - Aggie maroon and gold */}
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'rgba(80, 0, 0, 0.1)' }} />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'rgba(255, 184, 44, 0.08)', animationDelay: '1s' }} />
        
        <div className="section-container relative z-10 text-center">
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 rounded-full backdrop-blur">
            <Sparkles className="w-4 h-4" style={{ color: '#8B1538' }} />
            <span className="text-sm font-medium text-white/80">Modern SPM Intelligence</span>
          </div>

          <h1 className="text-7xl md:text-8xl font-bold mb-6 animate-fade-in-up leading-tight">
            The <span className="gradient-text">SPM Specialist</span> Firm
          </h1>
          
          <p className="text-xl md:text-2xl text-white/60 mb-4 max-w-3xl mx-auto animate-fade-in-up stagger-1">
            Built for Business Reinvention, Not Just Software Configuration
          </p>

          <p className="text-lg text-white/50 max-w-2xl mx-auto mb-12 animate-fade-in-up stagger-2 leading-relaxed">
            SPM implementations fail when treated as software projects. We scope what others miss, integrate what others break, and stay with you long after go-live.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up stagger-3">
            <Link href="#contact" className="btn-primary">
              Talk to a Specialist <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <button className="px-8 py-4 border-2 border-white/20 rounded-lg hover:border-white/50 transition backdrop-blur">
              See How We Work
            </button>
          </div>

          {/* Stats bar - floating */}
          <div className="mt-20 grid grid-cols-3 gap-8 max-w-xl mx-auto">
            <div className="scroll-reveal">
              <div className="text-4xl font-bold gradient-text">300+</div>
              <p className="text-white/50 text-sm mt-2">ICM Implementations</p>
            </div>
            <div className="scroll-reveal stagger-1">
              <div className="text-4xl font-bold gradient-text">200+</div>
              <p className="text-white/50 text-sm mt-2">Years Combined Expertise</p>
            </div>
            <div className="scroll-reveal stagger-2">
              <div className="text-4xl font-bold gradient-text">8/8</div>
              <p className="text-white/50 text-sm mt-2">Implementation Elements</p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2 text-white/50">
            <span className="text-sm">Scroll to explore</span>
            <div className="w-1 h-8 border-l border-white/20 animate-pulse" />
          </div>
        </div>
      </section>

      {/* SECTION 2: VALUE PROP - ASYMMETRIC LAYOUT */}
      <section className="relative py-24 bg-gradient-to-b from-transparent via-black to-black overflow-hidden">
        <div className="gradient-mesh absolute inset-0" />
        
        <div className="section-container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="scroll-reveal">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Why <span className="gradient-text">Your SPM</span> Needs a Specialist
              </h2>
              <p className="text-lg text-white/60 mb-6 leading-relaxed">
                Every company thinks their business is unique. It is. But 90% of SPM implementations fail because teams focus on the software instead of the transformation.
              </p>
              <div className="space-y-4">
                {['End-to-end ownership from RFP to revenue impact', 'Cross-functional process redesign', 'Change management excellence', 'Ongoing optimization and support'].map((item, i) => (
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
                  {['Process Design', 'Data Strategy', 'Team Training', 'Governance Framework', 'Security & Compliance', 'Performance Analytics'].map((item, idx) => (
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

      {/* SECTION 3: THREE PILLARS */}
      <section className="relative py-24">
        <div className="section-container relative z-10">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">The SPM Foundation</h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">Three pillars that every successful SPM implementation must address</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'SPM Strategy',
                description: 'Align comp, territory, and quota strategy with business objectives',
                icon: BarChart3,
              },
              {
                title: 'Implementation',
                description: 'Scope, configure, and integrate your SPM system end-to-end',
                icon: Users,
              },
              {
                title: 'Analytics',
                description: 'Unlock revenue insights and continuous optimization',
                icon: TrendingUp,
              },
            ].map((pillar, idx) => (
              <div key={idx} className="scroll-reveal glass-card p-8 group" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-xl group-hover:scale-150 transition duration-500" style={{ backgroundColor: 'rgba(139, 21, 56, 0.1)' }} />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center" style={{ backgroundColor: 'rgba(139, 21, 56, 0.2)' }}>
                    <pillar.icon className="w-6 h-6" style={{ color: '#8B1538' }} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{pillar.title}</h3>
                  <p className="text-white/60">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: SERVICES */}
      <section className="relative py-24 bg-gradient-to-b from-black via-black to-transparent">
        <div className="gradient-mesh absolute inset-0" />
        
        <div className="section-container relative z-10">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">End-to-end support at every stage of your SPM journey</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                title: 'Advisory',
                description: 'Strategic consulting to define your SPM roadmap',
                icon: Zap,
              },
              {
                title: 'Implementation',
                description: 'Full-cycle system design, configuration, and deployment',
                icon: BarChart3,
              },
              {
                title: 'Enablement',
                description: 'Training and change management for your teams',
                icon: Users,
              },
              {
                title: 'Managed Services',
                description: 'Ongoing optimization and operational support',
                icon: TrendingUp,
              },
            ].map((service, idx) => (
              <div key={idx} className="scroll-reveal glass-card p-6 group" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center mb-4 group-hover:scale-125 transition" style={{ backgroundColor: 'rgba(139, 21, 56, 0.2)' }}>
                  <service.icon className="w-6 h-6" style={{ color: '#8B1538' }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-sm text-white/60">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: WHY BHG */}
      <section className="relative py-24">
        <div className="section-container relative z-10">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">Why Choose BHG?</h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">What sets us apart from every other SPM firm</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              'Deep SPM domain expertise',
              'Vendor-agnostic approach',
              'Change management focus',
              'Post-implementation support',
            ].map((reason, idx) => (
              <div key={idx} className="scroll-reveal glass-card p-6" style={{ animationDelay: `${idx * 0.1}s` }}>
                <p className="text-white font-semibold">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: PROOF POINTS - LOGOS */}
      <section className="relative py-24 bg-gradient-to-b from-transparent via-black to-black">
        <div className="section-container relative z-10 text-center">
          <h2 className="text-4xl font-bold mb-12 scroll-reveal">Trusted by Industry Leaders</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-center">
            {['Verizon', 'Penske', 'LPL Financial', 'US Foods', 'Palo Alto Networks'].map((company, idx) => (
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
            <h2 className="text-5xl md:text-6xl font-bold mb-4">Client Success Stories</h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">See what our clients say about working with BHG</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote: 'BHG transformed our SPM implementation from a software project to a business transformation. The result: 40% increase in rep productivity.',
                author: 'Vice President of Sales',
                company: 'Fortune 500 Tech Company',
              },
              {
                quote: 'We tried to build SPM in-house. After 18 months and $2M, we engaged BHG. They completed in 6 months and integrated with 3 legacy systems.',
                author: 'Chief Revenue Officer',
                company: 'Enterprise SaaS',
              },
            ].map((testimonial, idx) => (
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
              {
                title: 'SPM Implementation Guide',
                description: 'A comprehensive playbook for planning your SPM transformation',
              },
              {
                title: 'Sales Comp Benchmarking Report',
                description: 'Industry data on compensation structures and best practices',
              },
              {
                title: 'Change Management Checklist',
                description: 'Critical steps to ensure user adoption and system success',
              },
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
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Ready to Transform Your SPM?</h2>
            <p className="text-lg text-white/60 mb-12 max-w-2xl mx-auto">
              Let's talk about your SPM journey. Our specialists are ready to help.
            </p>
            <Link href="#contact" className="btn-primary inline-flex items-center gap-2">
              Schedule a Consultation <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
