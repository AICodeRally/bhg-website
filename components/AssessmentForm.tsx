'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Loader2 } from 'lucide-react'
import { AssessmentResponse } from '@/lib/assessment'

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

interface AssessmentFormProps {
  questions: Question[]
}

export default function AssessmentForm({ questions }: AssessmentFormProps) {
  const router = useRouter()
  const [responses, setResponses] = useState<Partial<AssessmentResponse>>({})
  const [loading, setLoading] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showContactInfo, setShowContactInfo] = useState(false)
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', company: '' })

  const handleRangeChange = (id: string, value: number) => {
    setResponses({ ...responses, [id]: value })
  }

  const handlePercentageChange = (id: string, value: number) => {
    setResponses({ ...responses, [id]: value })
  }

  const handleScaleChange = (id: string, value: number) => {
    setResponses({ ...responses, [id]: value })
  }

  const handleCheckboxChange = (id: string, value: string) => {
    const current = (responses.painPoints || []) as string[]
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    setResponses({ ...responses, painPoints: updated })
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/assessment/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...responses,
          name: contactInfo.name,
          email: contactInfo.email,
          company: contactInfo.company,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        router.push(
          `/assessment/results?gap=${data.analysis.gapType}&score=${data.analysis.score}&email=${contactInfo.email}`
        )
      }
    } catch (error) {
      console.error('Assessment submission error:', error)
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowContactInfo(true)
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-white/60">Question {currentQuestion + 1} of {questions.length}</span>
          <span className="text-sm font-medium text-white/80">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-600 to-red-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">{question.question}</h2>
        {question.description && (
          <p className="text-lg text-white/60">{question.description}</p>
        )}
      </div>

      {/* Answer Input - Range */}
      {question.type === 'range' && (
        <div className="space-y-4">
          <input
            type="range"
            min={question.min}
            max={question.max}
            value={responses[question.id as keyof AssessmentResponse] || question.defaultValue || 0}
            onChange={(e) => handleRangeChange(question.id, parseInt(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-red-600"
          />
          <div className="flex justify-between text-sm text-white/60">
            <span>{question.minLabel}</span>
            <span className="text-base font-semibold text-white">
              {responses[question.id as keyof AssessmentResponse] || question.defaultValue} weeks
            </span>
            <span>{question.maxLabel}</span>
          </div>
        </div>
      )}

      {/* Answer Input - Percentage */}
      {question.type === 'percentage' && (
        <div className="space-y-4">
          <input
            type="range"
            min={question.min || 0}
            max={question.max || 100}
            step={question.step || 1}
            value={responses[question.id as keyof AssessmentResponse] || question.defaultValue || 0}
            onChange={(e) => handlePercentageChange(question.id, parseInt(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-red-600"
          />
          <div className="flex justify-between items-center">
            <span className="text-sm text-white/60">0%</span>
            <span className="text-3xl font-bold text-white">
              {responses[question.id as keyof AssessmentResponse] || question.defaultValue || 0}%
            </span>
            <span className="text-sm text-white/60">100%</span>
          </div>
        </div>
      )}

      {/* Answer Input - Scale */}
      {question.type === 'scale' && (
        <div className="space-y-3">
          {question.scale?.map((option) => (
            <label
              key={option.value}
              className="block p-4 border-2 border-white/10 rounded-lg cursor-pointer hover:border-white/30 transition"
            >
              <input
                type="radio"
                name={question.id}
                value={option.value}
                checked={responses[question.id as keyof AssessmentResponse] === option.value}
                onChange={() => handleScaleChange(question.id, option.value)}
                className="mr-3 cursor-pointer"
              />
              <span className="text-white">{option.label}</span>
            </label>
          ))}
        </div>
      )}

      {/* Answer Input - Checkbox */}
      {question.type === 'checkbox' && (
        <div className="space-y-3">
          {question.options?.map((option) => (
            <label
              key={option.value}
              className="flex items-center p-4 border-2 border-white/10 rounded-lg cursor-pointer hover:border-white/30 transition"
            >
              <input
                type="checkbox"
                value={option.value}
                checked={(responses.painPoints || []).includes(option.value)}
                onChange={() => handleCheckboxChange(question.id, option.value)}
                className="mr-3 w-5 h-5 cursor-pointer"
              />
              <span className="text-white">{option.label}</span>
            </label>
          ))}
        </div>
      )}

      {/* Navigation */}
      {!showContactInfo ? (
        <div className="flex gap-4 mt-12">
          <button
            type="button"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="px-6 py-3 border border-white/20 rounded-lg text-white hover:border-white/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>

          {currentQuestion < questions.length - 1 ? (
            <button
              type="button"
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              className="ml-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition flex items-center gap-2"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="ml-auto px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition flex items-center gap-2"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      ) : (
        <div className="mt-12 space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={contactInfo.name}
            onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/50"
          />
          <input
            type="email"
            placeholder="Work Email"
            value={contactInfo.email}
            onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/50"
          />
          <input
            type="text"
            placeholder="Company"
            value={contactInfo.company}
            onChange={(e) => setContactInfo({ ...contactInfo, company: e.target.value })}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/50"
          />

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => setShowContactInfo(false)}
              className="px-6 py-3 border border-white/20 rounded-lg text-white hover:border-white/50 transition"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleContactSubmit}
              disabled={loading || !contactInfo.email}
              className="ml-auto px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  See Results <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </form>
  )
}
