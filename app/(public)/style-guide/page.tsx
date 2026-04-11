'use client';

import { useState } from 'react';
import { Copy, Check, Sparkles, AlertCircle, CheckCircle, Eye, Zap } from 'lucide-react';

interface ColorItem {
  name: string;
  hex: string;
  rgb: string;
  usage: string;
}

const colors: ColorItem[] = [
  { name: 'Primary Maroon', hex: '#8B1538', rgb: 'rgb(139, 21, 56)', usage: 'CTAs, primary actions, brand accent' },
  { name: 'Dark Maroon', hex: '#500000', rgb: 'rgb(80, 0, 0)', usage: 'Hover states, depth layers' },
  { name: 'Accent Gold', hex: '#FFB82C', rgb: 'rgb(255, 184, 44)', usage: 'Highlights, secondary emphasis' },
  { name: 'Dark BG', hex: '#0a0e27', rgb: 'rgb(10, 14, 39)', usage: 'Primary background' },
  { name: 'Mid BG', hex: '#1a1f3a', rgb: 'rgb(26, 31, 58)', usage: 'Secondary backgrounds' },
  { name: 'Text Primary', hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)', usage: 'Main text' },
  { name: 'Text Secondary', hex: '#E0E0E0', rgb: 'rgb(224, 224, 224)', usage: 'Secondary text, captions' },
  { name: 'Border Light', hex: 'rgba(255, 255, 255, 0.1)', rgb: 'rgba(255, 255, 255, 0.1)', usage: 'Subtle borders' },
  { name: 'Border Med', hex: 'rgba(255, 255, 255, 0.2)', rgb: 'rgba(255, 255, 255, 0.2)', usage: 'Interactive borders' },
];

export default function StyleGuidePage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>('overview');

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white" style={{ background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)' }}>
      {/* Hero Section */}
      <div className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-[#8B1538] via-[#FFB82C] to-[#8B1538] bg-clip-text text-transparent">
              Design System
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mb-8">
            Complete brand guide for the BHG marketing team. Everything you need to create on-brand content.
          </p>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2">
            {['overview', 'components', 'content', 'patterns', 'quick'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-[#8B1538] text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <>
          {/* Color Palette */}
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black mb-12">Color Palette</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {colors.map((color, idx) => (
                  <div key={idx} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300">
                    <div
                      className="h-24 w-full border-b border-white/10"
                      style={{ backgroundColor: color.name.includes('rgba') ? '#1a1f3a' : color.hex }}
                    >
                      {color.name.includes('rgba') && (
                        <div className="h-full w-full opacity-20 bg-white"></div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-2">{color.name}</h3>
                      <p className="text-sm text-gray-300 mb-4">{color.usage}</p>
                      <div className="flex gap-2 flex-col text-sm">
                        <button
                          onClick={() => copyToClipboard(color.hex, idx)}
                          className="text-left px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-all text-gray-200 hover:text-white flex items-center gap-2"
                        >
                          {copiedIndex === idx ? <Check size={14} /> : <Copy size={14} />}
                          {copiedIndex === idx ? 'Copied!' : color.hex}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Typography */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black mb-12">Typography</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
                  <h3 className="text-xl font-bold mb-6">Headings (Geist)</h3>
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs text-gray-400 mb-2">H1 / 56px / font-black</p>
                      <h1 className="text-5xl font-black">Design System</h1>
                      <p className="text-xs text-gray-500 mt-2">Use for: Main page titles, hero sections</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-2">H2 / 48px / font-black</p>
                      <h2 className="text-4xl font-black">Section Headings</h2>
                      <p className="text-xs text-gray-500 mt-2">Use for: Major section headers</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-2">H3 / 30px / font-bold</p>
                      <h3 className="text-2xl font-bold">Feature Title</h3>
                      <p className="text-xs text-gray-500 mt-2">Use for: Subsections, feature titles</p>
                    </div>
                  </div>
                </div>

                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
                  <h3 className="text-xl font-bold mb-6">Body Text (Geist)</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-400 mb-2">Large / 18px / Line height 1.6</p>
                      <p className="text-lg">The SPM Specialist Firm built for reinvention.</p>
                      <p className="text-xs text-gray-500 mt-2">Use for: Lead paragraphs, hero text</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-2">Regular / 16px / Line height 1.6</p>
                      <p className="text-base">Clear expertise and accountability in every engagement.</p>
                      <p className="text-xs text-gray-500 mt-2">Use for: Body copy, descriptions</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-2">Small / 14px / Line height 1.5</p>
                      <p className="text-sm">300+ implementations • 99% success rate</p>
                      <p className="text-xs text-gray-500 mt-2">Use for: Stats, captions, labels</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Brand Guidelines */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black mb-12">Brand Fundamentals</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-6 text-green-400 flex items-center gap-2">
                    <CheckCircle size={24} /> Do's
                  </h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Use dark luxury aesthetic — maroon on dark backgrounds</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Include glass morphism for interactive elements</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Use Geist font exclusively for consistency</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Maintain 4.5:1 contrast ratio for accessibility</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Add smooth transitions (0.3s cubic-bezier)</span>
                    </li>
                  </ul>
                </div>

                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-6 text-red-400 flex items-center gap-2">
                    <AlertCircle size={24} /> Don'ts
                  </h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Don't use bright colors or light themes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Don't flatten the design — keep depth and shadows</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Don't remove backdrop blur or transparency</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Don't use serif fonts or system fonts</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Don't lower contrast below 3:1 for any text</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* COMPONENTS TAB */}
      {activeTab === 'components' && (
        <>
          {/* Buttons */}
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black mb-12">Button System</h2>

              {/* Primary Buttons */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">Primary Buttons</h3>
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
                  <div className="space-y-6">
                    {/* States */}
                    <div>
                      <p className="text-sm text-gray-400 mb-4">States & Variations</p>
                      <div className="flex flex-wrap gap-4">
                        <button className="btn-primary">Normal State</button>
                        <button className="btn-primary opacity-50 cursor-not-allowed">Disabled</button>
                        <button className="btn-primary text-sm py-2 px-4">Small</button>
                        <button className="btn-primary py-3 px-10">Large</button>
                      </div>
                    </div>

                    {/* With Icons */}
                    <div>
                      <p className="text-sm text-gray-400 mb-4">With Icons</p>
                      <div className="flex flex-wrap gap-4">
                        <button className="btn-primary flex items-center gap-2">
                          <Sparkles size={16} /> Talk to Specialist
                        </button>
                        <button className="btn-primary flex items-center gap-2">
                          <Zap size={16} /> Get Started
                        </button>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <p className="text-sm text-gray-400">Use Primary buttons for:</p>
                      <ul className="text-sm text-gray-300 mt-2 space-y-1">
                        <li>• Main call-to-action buttons</li>
                        <li>• Primary form submissions</li>
                        <li>• Main page navigation CTAs</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Buttons */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">Secondary Buttons</h3>
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-gray-400 mb-4">States & Variations</p>
                      <div className="flex flex-wrap gap-4">
                        <button className="px-8 py-4 font-bold border border-white/20 rounded-lg hover:border-white/40 transition-all hover:bg-white/5">
                          Learn More
                        </button>
                        <button className="px-8 py-4 font-bold border border-white/20 rounded-lg opacity-50 cursor-not-allowed">
                          Disabled
                        </button>
                        <button className="px-4 py-2 text-sm font-bold border border-white/20 rounded-lg hover:border-white/40 transition-all">
                          Small
                        </button>
                        <button className="px-10 py-3 font-bold border border-white/20 rounded-lg hover:border-white/40 transition-all">
                          Large
                        </button>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <p className="text-sm text-gray-400">Use Secondary buttons for:</p>
                      <ul className="text-sm text-gray-300 mt-2 space-y-1">
                        <li>• Secondary actions (Learn More, See How We Work)</li>
                        <li>• Back buttons, Cancel actions</li>
                        <li>• Multiple action choices on a page</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cards & Components */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black mb-12">Cards & Components</h2>

              {/* Glass Cards */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">Feature Cards</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {['Standard', 'With Icon', 'With CTA'].map((variant, idx) => (
                    <div key={idx} className="glass-card p-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#8B1538] to-[#FFB82C] rounded-lg mb-4"></div>
                      <h4 className="text-lg font-bold mb-2">{variant}</h4>
                      <p className="text-sm text-gray-300 mb-4">
                        Glass morphism cards highlight features, benefits, or testimonials with backdrop blur.
                      </p>
                      {variant === 'With CTA' && (
                        <button className="text-sm text-[#FFB82C] hover:text-[#FFB82C]/80 font-medium">
                          Learn more →
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Badges */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">Badges & Labels</h3>
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-gray-400 mb-3">Maroon Badges</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full bg-[#8B1538]/30 border border-[#8B1538]/50 text-sm font-medium">Modern SPM</span>
                        <span className="px-3 py-1 rounded-full bg-[#8B1538]/30 border border-[#8B1538]/50 text-sm font-medium">Enterprise</span>
                        <span className="px-3 py-1 rounded-full bg-[#8B1538]/30 border border-[#8B1538]/50 text-sm font-medium">Award Winner</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-3">Gold Badges</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full bg-[#FFB82C]/20 border border-[#FFB82C]/40 text-sm font-medium text-[#FFB82C]">Featured</span>
                        <span className="px-3 py-1 rounded-full bg-[#FFB82C]/20 border border-[#FFB82C]/40 text-sm font-medium text-[#FFB82C]">Best Seller</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-3">Neutral Badges</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-medium">New</span>
                        <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-medium">Popular</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* CONTENT TAB */}
      {activeTab === 'content' && (
        <>
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black mb-12">Content & Voice</h2>

              {/* Voice & Tone */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">Brand Voice</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
                    <h4 className="text-lg font-bold mb-4 text-[#FFB82C]">How We Sound</h4>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start gap-3">
                        <span className="text-[#FFB82C] mt-1">→</span>
                        <span><strong>Expert but Approachable:</strong> We know SPM deeply, but explain it plainly</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#FFB82C] mt-1">→</span>
                        <span><strong>Direct and Confident:</strong> We stand behind our work with no hedging</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#FFB82C] mt-1">→</span>
                        <span><strong>Focused on Results:</strong> Everything ties back to business outcomes</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#FFB82C] mt-1">→</span>
                        <span><strong>Proof-Driven:</strong> We lead with numbers, case studies, and evidence</span>
                      </li>
                    </ul>
                  </div>

                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
                    <h4 className="text-lg font-bold mb-4 text-[#FFB82C]">Writing Guidelines</h4>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start gap-3">
                        <span className="text-[#FFB82C] mt-1">→</span>
                        <span>Use short sentences (under 15 words)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#FFB82C] mt-1">→</span>
                        <span>Active voice preferred ("We implement" not "implementation occurs")</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#FFB82C] mt-1">→</span>
                        <span>Numbers over adjectives (99% vs "excellent")</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#FFB82C] mt-1">→</span>
                        <span>Avoid jargon — explain or skip it</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Copy Examples */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">Copy Examples</h3>
                <div className="space-y-4">
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
                    <p className="text-sm text-gray-400 mb-2">Hero Headlines</p>
                    <p className="text-3xl font-black mb-2">The SPM Specialist Firm</p>
                    <p className="text-sm text-gray-400">Built for business reinvention.</p>
                    <p className="text-xs text-gray-500 mt-4">✓ Direct, confident, results-focused • States what we are and promise</p>
                  </div>

                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
                    <p className="text-sm text-gray-400 mb-2">CTAs</p>
                    <p className="text-lg font-bold mb-2">Talk to a Specialist</p>
                    <p className="text-sm text-gray-400">Get Started • See How We Work • Schedule a Demo</p>
                    <p className="text-xs text-gray-500 mt-4">✓ Action-oriented, benefit-focused, specific</p>
                  </div>

                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
                    <p className="text-sm text-gray-400 mb-2">Stats & Proof Points</p>
                    <p className="text-xl font-black text-[#FFB82C] mb-2">300+</p>
                    <p className="text-lg font-bold mb-2">Implementations Delivered</p>
                    <p className="text-sm text-gray-400">99% Success Rate • 50+ Enterprise Clients</p>
                    <p className="text-xs text-gray-500 mt-4">✓ Specific numbers, clear outcomes, build credibility</p>
                  </div>
                </div>
              </div>

              {/* Headlines */}
              <div>
                <h3 className="text-2xl font-bold mb-6">Headline Templates</h3>
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
                  <div className="space-y-4 text-gray-300">
                    <p><strong>[Number] [Benefit]</strong><br/>Example: 300+ implementations. 99% success.</p>
                    <p><strong>The [Problem] Problem: [Solution]</strong><br/>Example: The Integration Problem: Native SPM Expertise</p>
                    <p><strong>How [Type] Companies [Result]</strong><br/>Example: How Enterprise SPM Leaders Avoid Chaos</p>
                    <p><strong>[Action] Your [Area] With [Benefit]</strong><br/>Example: Transform Your SPM With Confidence</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* PATTERNS TAB */}
      {activeTab === 'patterns' && (
        <>
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black mb-12">Common Patterns</h2>

              {/* Spacing */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">Spacing System</h3>
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-gray-400 mb-3">Base Unit: 4px</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-4">
                          <div className="w-4 h-8 bg-gradient-to-r from-[#8B1538] to-[#FFB82C]"></div>
                          <span className="text-sm">4px (1 unit) - Micro spacing</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-gradient-to-r from-[#8B1538] to-[#FFB82C]"></div>
                          <span className="text-sm">8px (2 units) - Element padding</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-8 bg-gradient-to-r from-[#8B1538] to-[#FFB82C]"></div>
                          <span className="text-sm">12px (3 units) - Component spacing</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-8 bg-gradient-to-r from-[#8B1538] to-[#FFB82C]"></div>
                          <span className="text-sm">16px (4 units) - Section padding</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-24 h-8 bg-gradient-to-r from-[#8B1538] to-[#FFB82C]"></div>
                          <span className="text-sm">24px (6 units) - Large sections</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Responsive */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">Responsive Behavior</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
                    <h4 className="text-lg font-bold mb-4">Mobile — 768px and smaller</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• Full-width cards (no gutters)</li>
                      <li>• 16px padding on left/right</li>
                      <li>• Single column layouts</li>
                      <li>• Touch-friendly buttons (48px minimum height)</li>
                      <li>• Larger text for readability</li>
                      <li>• Simplified navigation (hamburger menu)</li>
                    </ul>
                  </div>

                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
                    <h4 className="text-lg font-bold mb-4">Desktop — 768px and larger</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• Multi-column grids (2-3 columns)</li>
                      <li>• Gap: 1.5rem between columns</li>
                      <li>• Max-width: 1280px container</li>
                      <li>• Hover states active</li>
                      <li>• Full navigation visible</li>
                      <li>• Side-by-side layouts preferred</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Animations */}
              <div>
                <h3 className="text-2xl font-bold mb-6">Animation Guidelines</h3>
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
                  <div className="space-y-4 text-gray-300">
                    <div>
                      <p className="font-bold text-[#FFB82C] mb-2">Page Load Animations</p>
                      <p className="text-sm">Fade in + slide up with 0.3-0.8s stagger per element</p>
                    </div>
                    <div>
                      <p className="font-bold text-[#FFB82C] mb-2">Hover States</p>
                      <p className="text-sm">Scale, shadow, or color shift at 0.3s ease</p>
                    </div>
                    <div>
                      <p className="font-bold text-[#FFB82C] mb-2">Scroll Reveals</p>
                      <p className="text-sm">Fade + slide on viewport entry with cubic-bezier easing</p>
                    </div>
                    <div>
                      <p className="font-bold text-[#FFB82C] mb-2">Transitions</p>
                      <p className="text-sm">All color/size changes: 0.3s. Page navigation: 0.2s</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* QUICK REFERENCE TAB */}
      {activeTab === 'quick' && (
        <>
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black mb-12">Quick Reference</h2>

              {/* Checklist */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">Content Creation Checklist</h3>
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
                  <div className="space-y-3">
                    {[
                      'Use Geist font (Google Fonts or system)',
                      'Primary button: Maroon gradient (#8B1538 → #500000)',
                      'Headline color: White or gradient (maroon → gold)',
                      'Body text: White (#FFFFFF) on dark background',
                      'Background: Gradient from #0a0e27 to #1a1f3a',
                      'Cards: Glass morphism (backdrop-blur-xl + bg-white/5)',
                      'Borders: 1px solid rgba(255, 255, 255, 0.1)',
                      'Hover states: Increase opacity or scale 105%',
                      'Min contrast ratio: 4.5:1 for text',
                      'Mobile padding: 16px, Desktop: 24-32px',
                      'Section spacing: 64px (16 * 4)',
                      'Animation timing: 0.3s ease for most interactions',
                    ].map((item, idx) => (
                      <label key={idx} className="flex items-start gap-3 p-3 rounded hover:bg-white/5 transition cursor-pointer">
                        <input type="checkbox" className="mt-1" />
                        <span className="text-gray-300">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Common Tasks */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">Common Tasks</h3>
                <div className="space-y-4">
                  {[
                    { task: 'Create a landing page', steps: 'Hero section → Features (3-4 cards) → Stats → CTA → Footer' },
                    { task: 'Write a headline', steps: 'Make it benefit-focused, use numbers if available, 5-10 words max' },
                    { task: 'Choose a button color', steps: 'Primary action = Maroon (#8B1538), Secondary = Transparent border' },
                    { task: 'Make text accessible', steps: 'White text on dark background, min 16px size, line-height 1.5-1.6' },
                    { task: 'Build a CTA section', steps: 'Bold headline + subtext + primary button + optional secondary link' },
                  ].map((item, idx) => (
                    <div key={idx} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
                      <h4 className="font-bold text-[#FFB82C] mb-2">{item.task}</h4>
                      <p className="text-gray-300 text-sm">{item.steps}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resources */}
              <div>
                <h3 className="text-2xl font-bold mb-6">Resources for Marketing Team</h3>
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
                  <div className="space-y-4 text-gray-300">
                    <p><strong>Google Fonts:</strong> <span className="text-gray-400">fonts.google.com → Search "Geist"</span></p>
                    <p><strong>Color Values:</strong> All colors on this page (click to copy hex/RGB)</p>
                    <p><strong>Icons:</strong> lucide-react.com (same icons used site-wide)</p>
                    <p><strong>Gradients:</strong> Linear 135deg from primary to gold for emphasis</p>
                    <p><strong>Questions?</strong> Check if answer is in this Design System first, then ask Todd/marketing lead</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Footer Spacing */}
      <div className="pb-16"></div>
    </div>
  );
}
