'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, TrendingUp, DollarSign } from 'lucide-react'
import Link from 'next/link'
import { calculateROI, formatCurrency, type ROIInputs, type ROIOutput } from '@/lib/roiCalculator'

export default function ROICalculatorPage() {
  const [inputs, setInputs] = useState<ROIInputs>({
    annualRevenue: 500000000,
    compTeamSize: 5,
    cycleLength: 8,
    manualWorkPercentage: 50,
  })
  const [result, setResult] = useState<ROIOutput | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handleCalculate = () => {
    const roiResult = calculateROI(inputs)
    setResult(roiResult)
    setShowResult(true)
  }

  const handleInputChange = (field: keyof ROIInputs, value: string | number) => {
    const numValue = typeof value === 'string' ? parseFloat(value) || 0 : value
    setInputs({ ...inputs, [field]: numValue })
    setShowResult(false)
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <section className="relative pt-32 pb-16">
        <div className="gradient-mesh absolute inset-0" />
        <div className="section-container relative z-10 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition mb-8 justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white">
            Calculate Your <span className="gradient-text">ROI Potential</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            See how much you could save by optimizing your compensation platform.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="relative py-24">
        <div className="section-container relative z-10 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Input Form */}
            <div className="space-y-8">
              <div>
                <label className="block text-white font-semibold mb-3">
                  Annual Revenue
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-4 text-white/60">$</span>
                  <input
                    type="number"
                    value={inputs.annualRevenue}
                    onChange={(e) => handleInputChange('annualRevenue', e.target.value)}
                    className="w-full pl-8 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/50"
                  />
                </div>
                <p className="text-white/50 text-sm mt-2">Total company annual revenue</p>
              </div>

              <div>
                <label className="block text-white font-semibold mb-3">
                  Compensation Team Size
                </label>
                <input
                  type="number"
                  value={inputs.compTeamSize}
                  onChange={(e) => handleInputChange('compTeamSize', e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/50"
                />
                <p className="text-white/50 text-sm mt-2">Number of people managing compensation</p>
              </div>

              <div>
                <label className="block text-white font-semibold mb-3">
                  Compression Cycle Length
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="3"
                    max="16"
                    value={inputs.cycleLength}
                    onChange={(e) => handleInputChange('cycleLength', e.target.value)}
                    className="flex-1 h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-red-600"
                  />
                  <span className="text-2xl font-bold text-white w-16 text-right">
                    {inputs.cycleLength}w
                  </span>
                </div>
                <p className="text-white/50 text-sm mt-2">Weeks from final numbers to comp posting</p>
              </div>

              <div>
                <label className="block text-white font-semibold mb-3">
                  Manual Work Percentage
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="10"
                    value={inputs.manualWorkPercentage}
                    onChange={(e) => handleInputChange('manualWorkPercentage', e.target.value)}
                    className="flex-1 h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-red-600"
                  />
                  <span className="text-2xl font-bold text-white w-16 text-right">
                    {inputs.manualWorkPercentage}%
                  </span>
                </div>
                <p className="text-white/50 text-sm mt-2">Spreadsheets, email, manual reconciliation</p>
              </div>

              <button
                onClick={handleCalculate}
                className="w-full px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2 mt-8"
              >
                Calculate ROI <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Results */}
            {showResult && result && (
              <div className="space-y-6">
                <div
                  className="glass-card p-8 rounded-lg"
                  style={{ backgroundColor: 'rgba(139, 21, 56, 0.1)' }}
                >
                  <p className="text-white/60 text-sm uppercase tracking-widest mb-2">Annual ROI Potential</p>
                  <p className="text-5xl font-bold text-white">{result.roi}%</p>
                  <p className="text-white/60 mt-2">Return on investment in year 1</p>
                </div>

                <div
                  className="glass-card p-8 rounded-lg"
                  style={{ backgroundColor: 'rgba(139, 21, 56, 0.1)' }}
                >
                  <p className="text-white/60 text-sm uppercase tracking-widest mb-2">Annual Benefit</p>
                  <p className="text-4xl font-bold text-white">{formatCurrency(result.totalAnnualBenefit)}</p>
                  <p className="text-white/60 text-sm mt-4">Breakdown:</p>
                  <div className="space-y-2 mt-3">
                    <div className="flex justify-between text-white/70">
                      <span>Cycle Compression</span>
                      <span>{formatCurrency(result.currentCycleSavings)}</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Automation Savings</span>
                      <span>{formatCurrency(result.automationSavings)}</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Decision Speed</span>
                      <span>{formatCurrency(result.decisionSpeedBenefit)}</span>
                    </div>
                  </div>
                </div>

                <div
                  className="glass-card p-8 rounded-lg"
                  style={{ backgroundColor: 'rgba(139, 21, 56, 0.1)' }}
                >
                  <p className="text-white/60 text-sm uppercase tracking-widest mb-2">Payback Period</p>
                  <p className="text-3xl font-bold text-white">{result.paybackMonths} months</p>
                  <p className="text-white/60 mt-2">Time to break even on investment</p>
                </div>

                <div>
                  <p className="text-white/60 text-sm uppercase tracking-widest mb-4">Assumptions</p>
                  <div className="space-y-2">
                    {result.assumptions.map((assumption, idx) => (
                      <div key={idx} className="flex gap-2 text-white/70 text-sm">
                        <span className="text-white/40">•</span>
                        <span>{assumption}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Placeholder */}
            {!showResult && (
              <div
                className="glass-card p-12 flex flex-col items-center justify-center rounded-lg"
                style={{ backgroundColor: 'rgba(139, 21, 56, 0.05)' }}
              >
                <TrendingUp className="w-16 h-16 text-white/40 mb-4" />
                <p className="text-white/60 text-center">Enter your information and click calculate to see your ROI potential.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      {showResult && (
        <section className="relative py-24 bg-gradient-to-b from-black via-black to-transparent">
          <div className="section-container relative z-10 text-center max-w-3xl">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Unlock This Value?</h2>
            <p className="text-lg text-white/60 mb-8">
              Schedule a consultation with our optimization specialists to discuss how to capture this ROI.
            </p>
            <Link href="/assessment" className="btn-primary inline-flex items-center gap-2">
              Take the Assessment <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}
