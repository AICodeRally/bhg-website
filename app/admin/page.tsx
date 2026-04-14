'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Save, LogOut, Plus, Trash2 } from 'lucide-react'

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
  whyBhg: {
    heading: string
    subheading: string
    reasons: string[]
  }
  cta: {
    heading: string
    subheading: string
    ctaText: string
  }
  vendors: { heading: string; logos: string[] }
  testimonials: {
    heading: string
    subheading: string
    quotes: Array<{ quote: string; author: string; company: string }>
  }
  trustedCompanies: string[]
}

type TabName = 'hero' | 'stats' | 'vendors' | 'services' | 'pillars' | 'testimonials' | 'cta' | 'blog' | 'case-studies'

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  author: string
  publishedAt: string
  category: string
  featured: boolean
  readTime: number
  content: string
  tags: string[]
}

interface CaseStudy {
  id: string
  title: string
  slug: string
  platform: string
  industry: string
  companySize: string
  heroImage: string
  excerpt: string
  challenge: { title: string; description: string; bullets: string[] }
  solution: { title: string; description: string; approach: string[] }
  results: Array<{ metric: string; before: string; after: string; impact: string }>
  roi: { annualSavings: string; savingsBreakdown: string; paybackPeriod: string }
  testimonial: { quote: string; author: string; company: string }
  nextSteps: string[]
}

export default function AdminDashboard() {
  const router = useRouter()
  const [content, setContent] = useState<Content | null>(null)
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [activeTab, setActiveTab] = useState<TabName>('hero')

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
      return
    }

    const fetchContent = async () => {
      try {
        const [contentRes, blogRes, casesRes] = await Promise.all([
          fetch('/content.json'),
          fetch('/blog-posts.json'),
          fetch('/case-studies.json'),
        ])

        const contentData = await contentRes.json()
        const blogData = await blogRes.json()
        const casesData = await casesRes.json()

        setContent(contentData)
        setBlogPosts(blogData)
        setCaseStudies(casesData)
      } catch (error) {
        console.error('Error fetching content:', error)
      }
    }

    fetchContent()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    router.push('/admin/login')
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaveMessage('')

    try {
      let response

      if (activeTab === 'blog' && blogPosts.length > 0) {
        response = await fetch('/api/admin/save-blog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(blogPosts),
        })
      } else if (activeTab === 'case-studies' && caseStudies.length > 0) {
        response = await fetch('/api/admin/save-case-study', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(caseStudies),
        })
      } else if (content) {
        response = await fetch('/api/admin/save-content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(content),
        })
      }

      if (response?.ok) {
        setSaveMessage('Content saved successfully! Changes are live.')
        setTimeout(() => setSaveMessage(''), 3000)
      } else {
        setSaveMessage('Error saving content. Please try again.')
      }
    } catch (error) {
      setSaveMessage('Error saving content. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    )
  }

  const tabs: Array<{ id: TabName; label: string }> = [
    { id: 'hero', label: 'Hero' },
    { id: 'stats', label: 'Stats' },
    { id: 'vendors', label: 'Vendors' },
    { id: 'services', label: 'Services' },
    { id: 'pillars', label: 'Pillars' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'cta', label: 'CTA' },
    { id: 'blog', label: 'Blog' },
    { id: 'case-studies', label: 'Case Studies' },
  ]

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold gradient-text">BHG Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        {saveMessage && (
          <div
            className={`p-4 rounded-lg mb-6 ${
              saveMessage.includes('successfully')
                ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                : 'bg-red-500/10 border border-red-500/30 text-red-400'
            }`}
          >
            {saveMessage}
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 border-b border-white/20 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-medium transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-white border-b-2 border-white/80'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="glass-card p-8 mb-8">
          {/* Hero Tab */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Hero Section</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">Badge Text</label>
                  <input
                    type="text"
                    value={content.hero.badge}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, badge: e.target.value } })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">Main Heading</label>
                  <input
                    type="text"
                    value={content.hero.mainHeading}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, mainHeading: e.target.value } })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">Highlight Text (appears in gradient)</label>
                  <input
                    type="text"
                    value={content.hero.highlightText}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, highlightText: e.target.value } })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">Subheading</label>
                  <input
                    type="text"
                    value={content.hero.subheading}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, subheading: e.target.value } })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">Description</label>
                  <textarea
                    value={content.hero.description}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, description: e.target.value } })}
                    rows={3}
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/80 mb-2 text-sm font-medium">Primary CTA Text</label>
                    <input
                      type="text"
                      value={content.hero.ctaText}
                      onChange={(e) => setContent({ ...content, hero: { ...content.hero, ctaText: e.target.value } })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 mb-2 text-sm font-medium">Secondary CTA Text</label>
                    <input
                      type="text"
                      value={content.hero.secondaryCtaText}
                      onChange={(e) => setContent({ ...content, hero: { ...content.hero, secondaryCtaText: e.target.value } })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stats Tab */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Stats</h2>
                <button
                  onClick={() => setContent({
                    ...content,
                    stats: [...content.stats, { number: '', label: '' }]
                  })}
                  className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition"
                >
                  <Plus className="w-4 h-4" /> Add Stat
                </button>
              </div>
              <div className="space-y-4">
                {content.stats.map((stat, idx) => (
                  <div key={idx} className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 text-sm">Stat {idx + 1}</span>
                      <button
                        onClick={() => setContent({
                          ...content,
                          stats: content.stats.filter((_, i) => i !== idx)
                        })}
                        className="text-red-400 hover:text-red-300 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Number (e.g., 8→3 weeks)"
                      value={stat.number}
                      onChange={(e) => {
                        const newStats = [...content.stats]
                        newStats[idx].number = e.target.value
                        setContent({ ...content, stats: newStats })
                      }}
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-white/40"
                    />
                    <input
                      type="text"
                      placeholder="Label (e.g., Avg Cycle Compression)"
                      value={stat.label}
                      onChange={(e) => {
                        const newStats = [...content.stats]
                        newStats[idx].label = e.target.value
                        setContent({ ...content, stats: newStats })
                      }}
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-white/40"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Vendors Tab */}
          {activeTab === 'vendors' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Vendor Logos</h2>
              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">Section Heading</label>
                <input
                  type="text"
                  value={content.vendors.heading}
                  onChange={(e) => setContent({ ...content, vendors: { ...content.vendors, heading: e.target.value } })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-white/80 text-sm font-medium">Logos</label>
                  <button
                    onClick={() => setContent({
                      ...content,
                      vendors: { ...content.vendors, logos: [...content.vendors.logos, ''] }
                    })}
                    className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded text-white transition text-sm"
                  >
                    <Plus className="w-4 h-4" /> Add Logo
                  </button>
                </div>
                <div className="space-y-2">
                  {content.vendors.logos.map((logo, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Logo name (e.g., Anaplan)"
                        value={logo}
                        onChange={(e) => {
                          const newLogos = [...content.vendors.logos]
                          newLogos[idx] = e.target.value
                          setContent({ ...content, vendors: { ...content.vendors, logos: newLogos } })
                        }}
                        className="flex-1 px-3 py-2 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-white/40"
                      />
                      <button
                        onClick={() => setContent({
                          ...content,
                          vendors: { ...content.vendors, logos: content.vendors.logos.filter((_, i) => i !== idx) }
                        })}
                        className="px-3 py-2 text-red-400 hover:text-red-300 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Services</h2>
                <button
                  onClick={() => setContent({
                    ...content,
                    serviceCards: [...content.serviceCards, { title: '', description: '' }]
                  })}
                  className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition"
                >
                  <Plus className="w-4 h-4" /> Add Service
                </button>
              </div>
              <div className="space-y-4">
                {content.serviceCards.map((service, idx) => (
                  <div key={idx} className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 text-sm">Service {idx + 1}</span>
                      <button
                        onClick={() => setContent({
                          ...content,
                          serviceCards: content.serviceCards.filter((_, i) => i !== idx)
                        })}
                        className="text-red-400 hover:text-red-300 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Title"
                      value={service.title}
                      onChange={(e) => {
                        const newServices = [...content.serviceCards]
                        newServices[idx].title = e.target.value
                        setContent({ ...content, serviceCards: newServices })
                      }}
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-white/40"
                    />
                    <textarea
                      placeholder="Description"
                      value={service.description}
                      onChange={(e) => {
                        const newServices = [...content.serviceCards]
                        newServices[idx].description = e.target.value
                        setContent({ ...content, serviceCards: newServices })
                      }}
                      rows={2}
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-white/40"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pillars Tab */}
          {activeTab === 'pillars' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Pillars</h2>
                <button
                  onClick={() => setContent({
                    ...content,
                    pillarCards: [...content.pillarCards, { title: '', description: '' }]
                  })}
                  className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition"
                >
                  <Plus className="w-4 h-4" /> Add Pillar
                </button>
              </div>
              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">Section Heading</label>
                <input
                  type="text"
                  value={content.pillars.heading}
                  onChange={(e) => setContent({ ...content, pillars: { ...content.pillars, heading: e.target.value } })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40 mb-4"
                />
                <label className="block text-white/80 mb-2 text-sm font-medium">Section Subheading</label>
                <input
                  type="text"
                  value={content.pillars.subheading}
                  onChange={(e) => setContent({ ...content, pillars: { ...content.pillars, subheading: e.target.value } })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                />
              </div>
              <div className="space-y-4">
                {content.pillarCards.map((pillar, idx) => (
                  <div key={idx} className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 text-sm">Pillar {idx + 1}</span>
                      <button
                        onClick={() => setContent({
                          ...content,
                          pillarCards: content.pillarCards.filter((_, i) => i !== idx)
                        })}
                        className="text-red-400 hover:text-red-300 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Title"
                      value={pillar.title}
                      onChange={(e) => {
                        const newPillars = [...content.pillarCards]
                        newPillars[idx].title = e.target.value
                        setContent({ ...content, pillarCards: newPillars })
                      }}
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-white/40"
                    />
                    <textarea
                      placeholder="Description"
                      value={pillar.description}
                      onChange={(e) => {
                        const newPillars = [...content.pillarCards]
                        newPillars[idx].description = e.target.value
                        setContent({ ...content, pillarCards: newPillars })
                      }}
                      rows={2}
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-white/40"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Testimonials Tab */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Testimonials</h2>
                <button
                  onClick={() => setContent({
                    ...content,
                    testimonials: {
                      ...content.testimonials,
                      quotes: [...content.testimonials.quotes, { quote: '', author: '', company: '' }]
                    }
                  })}
                  className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition"
                >
                  <Plus className="w-4 h-4" /> Add Testimonial
                </button>
              </div>
              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">Section Heading</label>
                <input
                  type="text"
                  value={content.testimonials.heading}
                  onChange={(e) => setContent({ ...content, testimonials: { ...content.testimonials, heading: e.target.value } })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40 mb-4"
                />
                <label className="block text-white/80 mb-2 text-sm font-medium">Section Subheading</label>
                <input
                  type="text"
                  value={content.testimonials.subheading}
                  onChange={(e) => setContent({ ...content, testimonials: { ...content.testimonials, subheading: e.target.value } })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                />
              </div>
              <div className="space-y-4">
                {content.testimonials.quotes.map((testimonial, idx) => (
                  <div key={idx} className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 text-sm">Testimonial {idx + 1}</span>
                      <button
                        onClick={() => setContent({
                          ...content,
                          testimonials: {
                            ...content.testimonials,
                            quotes: content.testimonials.quotes.filter((_, i) => i !== idx)
                          }
                        })}
                        className="text-red-400 hover:text-red-300 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <textarea
                      placeholder="Quote"
                      value={testimonial.quote}
                      onChange={(e) => {
                        const newQuotes = [...content.testimonials.quotes]
                        newQuotes[idx].quote = e.target.value
                        setContent({ ...content, testimonials: { ...content.testimonials, quotes: newQuotes } })
                      }}
                      rows={2}
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-white/40"
                    />
                    <input
                      type="text"
                      placeholder="Author name"
                      value={testimonial.author}
                      onChange={(e) => {
                        const newQuotes = [...content.testimonials.quotes]
                        newQuotes[idx].author = e.target.value
                        setContent({ ...content, testimonials: { ...content.testimonials, quotes: newQuotes } })
                      }}
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-white/40"
                    />
                    <input
                      type="text"
                      placeholder="Company"
                      value={testimonial.company}
                      onChange={(e) => {
                        const newQuotes = [...content.testimonials.quotes]
                        newQuotes[idx].company = e.target.value
                        setContent({ ...content, testimonials: { ...content.testimonials, quotes: newQuotes } })
                      }}
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-white/40"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Tab */}
          {activeTab === 'cta' && content && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Bottom CTA</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">Heading</label>
                  <input
                    type="text"
                    value={content.cta.heading}
                    onChange={(e) => setContent({ ...content, cta: { ...content.cta, heading: e.target.value } })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">Subheading</label>
                  <textarea
                    value={content.cta.subheading}
                    onChange={(e) => setContent({ ...content, cta: { ...content.cta, subheading: e.target.value } })}
                    rows={3}
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">CTA Button Text</label>
                  <input
                    type="text"
                    value={content.cta.ctaText}
                    onChange={(e) => setContent({ ...content, cta: { ...content.cta, ctaText: e.target.value } })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Blog Tab */}
          {activeTab === 'blog' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Blog Posts ({blogPosts.length})</h2>
                <button
                  onClick={() => setBlogPosts([...blogPosts, {
                    id: Date.now().toString(),
                    slug: '',
                    title: '',
                    excerpt: '',
                    author: 'BHG Team',
                    publishedAt: new Date().toISOString().split('T')[0],
                    category: '',
                    featured: false,
                    readTime: 5,
                    content: '',
                    tags: []
                  }])}
                  className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition"
                >
                  <Plus className="w-4 h-4" /> Add Post
                </button>
              </div>
              <div className="space-y-4">
                {blogPosts.map((post, idx) => (
                  <div key={idx} className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 text-sm">{post.title || 'New Post'}</span>
                      <button
                        onClick={() => setBlogPosts(blogPosts.filter((_, i) => i !== idx))}
                        className="text-red-400 hover:text-red-300 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Title"
                      value={post.title}
                      onChange={(e) => {
                        const newPosts = [...blogPosts]
                        newPosts[idx].title = e.target.value
                        setBlogPosts(newPosts)
                      }}
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-white/40"
                    />
                    <input
                      type="text"
                      placeholder="Slug (e.g., my-post-title)"
                      value={post.slug}
                      onChange={(e) => {
                        const newPosts = [...blogPosts]
                        newPosts[idx].slug = e.target.value
                        setBlogPosts(newPosts)
                      }}
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-white/40"
                    />
                    <textarea
                      placeholder="Excerpt"
                      value={post.excerpt}
                      onChange={(e) => {
                        const newPosts = [...blogPosts]
                        newPosts[idx].excerpt = e.target.value
                        setBlogPosts(newPosts)
                      }}
                      rows={2}
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-white/40"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Category"
                        value={post.category}
                        onChange={(e) => {
                          const newPosts = [...blogPosts]
                          newPosts[idx].category = e.target.value
                          setBlogPosts(newPosts)
                        }}
                        className="px-3 py-2 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-white/40"
                      />
                      <input
                        type="number"
                        placeholder="Read time (min)"
                        value={post.readTime}
                        onChange={(e) => {
                          const newPosts = [...blogPosts]
                          newPosts[idx].readTime = parseInt(e.target.value) || 0
                          setBlogPosts(newPosts)
                        }}
                        className="px-3 py-2 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-white/40"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Case Studies Tab */}
          {activeTab === 'case-studies' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Case Studies ({caseStudies.length})</h2>
                <button
                  onClick={() => setCaseStudies([...caseStudies, {
                    id: Date.now().toString(),
                    title: '',
                    slug: '',
                    platform: '',
                    industry: '',
                    companySize: '',
                    heroImage: '',
                    excerpt: '',
                    challenge: { title: '', description: '', bullets: [] },
                    solution: { title: '', description: '', approach: [] },
                    results: [],
                    roi: { annualSavings: '', savingsBreakdown: '', paybackPeriod: '' },
                    testimonial: { quote: '', author: '', company: '' },
                    nextSteps: []
                  }])}
                  className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition"
                >
                  <Plus className="w-4 h-4" /> Add Study
                </button>
              </div>
              <div className="space-y-4">
                {caseStudies.map((study, idx) => (
                  <div key={idx} className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 text-sm">{study.title || 'New Case Study'}</span>
                      <button
                        onClick={() => setCaseStudies(caseStudies.filter((_, i) => i !== idx))}
                        className="text-red-400 hover:text-red-300 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Title"
                      value={study.title}
                      onChange={(e) => {
                        const newStudies = [...caseStudies]
                        newStudies[idx].title = e.target.value
                        setCaseStudies(newStudies)
                      }}
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-white/40"
                    />
                    <input
                      type="text"
                      placeholder="Slug"
                      value={study.slug}
                      onChange={(e) => {
                        const newStudies = [...caseStudies]
                        newStudies[idx].slug = e.target.value
                        setCaseStudies(newStudies)
                      }}
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-white/40"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Platform (e.g., Anaplan)"
                        value={study.platform}
                        onChange={(e) => {
                          const newStudies = [...caseStudies]
                          newStudies[idx].platform = e.target.value
                          setCaseStudies(newStudies)
                        }}
                        className="px-3 py-2 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-white/40"
                      />
                      <input
                        type="text"
                        placeholder="Industry"
                        value={study.industry}
                        onChange={(e) => {
                          const newStudies = [...caseStudies]
                          newStudies[idx].industry = e.target.value
                          setCaseStudies(newStudies)
                        }}
                        className="px-3 py-2 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-white/40"
                      />
                    </div>
                    <textarea
                      placeholder="Excerpt/Summary"
                      value={study.excerpt}
                      onChange={(e) => {
                        const newStudies = [...caseStudies]
                        newStudies[idx].excerpt = e.target.value
                        setCaseStudies(newStudies)
                      }}
                      rows={2}
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-white/40"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="btn-primary flex items-center gap-2 px-6 py-3"
          >
            <Save className="w-5 h-5" /> {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
