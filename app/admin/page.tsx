'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Save, LogOut } from 'lucide-react'

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
}

export default function AdminDashboard() {
  const router = useRouter()
  const [content, setContent] = useState<Content | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
      return
    }

    const fetchContent = async () => {
      const response = await fetch('/public/content.json')
      const data = await response.json()
      setContent(data)
    }

    fetchContent()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    router.push('/admin/login')
  }

  const handleSave = async () => {
    if (!content) return

    setIsSaving(true)
    setSaveMessage('')

    try {
      const response = await fetch('/api/admin/save-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      })

      if (response.ok) {
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

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto">
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

        <div className="space-y-8">
          {/* Hero Section */}
          <div className="glass-card p-6">
            <h2 className="text-2xl font-bold mb-6 text-white">Hero Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">Badge Text</label>
                <input
                  type="text"
                  value={content.hero.badge}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, badge: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                />
              </div>
              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">Main Heading</label>
                <input
                  type="text"
                  value={content.hero.mainHeading}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, mainHeading: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                />
              </div>
              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">Highlight Text (in gradient)</label>
                <input
                  type="text"
                  value={content.hero.highlightText}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, highlightText: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                />
              </div>
              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">Subheading</label>
                <input
                  type="text"
                  value={content.hero.subheading}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, subheading: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                />
              </div>
              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">Description</label>
                <textarea
                  value={content.hero.description}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, description: e.target.value },
                    })
                  }
                  rows={3}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">CTA Button Text</label>
                  <input
                    type="text"
                    value={content.hero.ctaText}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, ctaText: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">Secondary Button Text</label>
                  <input
                    type="text"
                    value={content.hero.secondaryCtaText}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, secondaryCtaText: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="glass-card p-6">
            <h2 className="text-2xl font-bold mb-6 text-white">Bottom CTA</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">Heading</label>
                <input
                  type="text"
                  value={content.cta.heading}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      cta: { ...content.cta, heading: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                />
              </div>
              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">Subheading</label>
                <textarea
                  value={content.cta.subheading}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      cta: { ...content.cta, subheading: e.target.value },
                    })
                  }
                  rows={2}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
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
