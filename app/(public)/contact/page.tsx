'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Loader2 } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    gap: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const gaps = [
    { value: 'compression', label: 'Compression Cycle (3-4 weeks compression)' },
    { value: 'manual-work', label: 'Manual Work (80% automation)' },
    { value: 'visibility', label: 'Visibility & Forecasting (92-95% accuracy)' },
    { value: 'data-quality', label: 'Data Quality (99%+ completeness)' },
    { value: 'other', label: 'Other / Not Sure Yet' },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        company: '',
        gap: '',
        message: '',
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    } catch (err) {
      setError('Failed to submit form. Please try again.')
      console.error('Form submission error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <section className="relative pt-32 pb-16">
        <div className="gradient-mesh absolute inset-0" />
        <div className="section-container relative z-10 max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Let's Talk
          </h1>
          <p className="text-lg text-white/80">
            Whether you're evaluating a new SPM implementation, struggling with your current system, or looking to optimize what you already have, our specialists are here to help.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="relative py-24">
        <div className="section-container relative z-10 max-w-2xl">
          {submitted ? (
            <div className="glass-card p-12 text-center" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}>
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">
                Thanks for reaching out!
              </h2>
              <p className="text-white/80 mb-8">
                We've received your message and will be in touch within 24 hours. In the meantime, feel free to explore our resources or take our assessment to get a quick gap analysis.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/assessment" className="btn-primary">
                  Take Assessment
                </Link>
                <Link href="/" className="px-6 py-2 border border-white/20 rounded-lg text-white hover:bg-white/5 transition">
                  Back Home
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-white font-semibold mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 transition"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-white font-semibold mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 transition"
                  placeholder="your@email.com"
                />
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-white font-semibold mb-2">
                  Company *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 transition"
                  placeholder="Your company"
                />
              </div>

              {/* Gap Type */}
              <div>
                <label htmlFor="gap" className="block text-white font-semibold mb-2">
                  What gap resonates most with you?
                </label>
                <select
                  id="gap"
                  name="gap"
                  value={formData.gap}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/50 transition"
                >
                  <option value="">Select a gap (optional)</option>
                  {gaps.map((g) => (
                    <option key={g.value} value={g.value}>
                      {g.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-white font-semibold mb-2">
                  Tell us about your situation
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 transition resize-none"
                  placeholder="What's your current challenge? What are you trying to accomplish?"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                  <p className="text-red-200">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 flex items-center justify-center gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>Send Message</>
                )}
              </button>

              <p className="text-white/60 text-sm text-center">
                We'll get back to you within 24 hours. No spam, no sales pitch — just a conversation about your SPM challenges.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-24 bg-gradient-to-b from-black via-black to-transparent">
        <div className="section-container relative z-10 max-w-3xl">
          <h2 className="text-3xl font-bold text-white mb-12">Common Questions</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-3">
                What can BHG help with?
              </h3>
              <p className="text-white/80">
                We specialize in SPM optimization across three areas: reducing your compression cycle (3-4 weeks), eliminating manual processes (80% automation), improving forecasting accuracy (92-95%), and fixing data quality issues. Whether you're implementing new or optimizing existing, we're here to help.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-3">
                How long does engagement typically take?
              </h3>
              <p className="text-white/80">
                Quick assessment projects take 4-6 weeks. Full implementations or major optimization work typically spans 3-6 months. We'll scope your specific situation during our first conversation.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-3">
                What platforms do you work with?
              </h3>
              <p className="text-white/80">
                We're platform-agnostic specialists. We optimize your implementation across Anaplan, Incent, Varicent, NetSuite, Salesforce, and other ICM platforms. We focus on the gaps in your system, not selling you a new platform.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-3">
                Is there a cost to this initial conversation?
              </h3>
              <p className="text-white/80">
                No. Our first conversation is free. We'll learn about your situation, identify your primary gaps, and discuss next steps. No obligation, no sales pressure.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
