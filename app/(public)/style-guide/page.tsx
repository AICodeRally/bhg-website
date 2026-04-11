'use client';

import { useState } from 'react';

interface ColorItem {
  name: string;
  hex: string;
  rgb: string;
  usage: string;
}

const colors: ColorItem[] = [
  { name: 'Primary Maroon', hex: '#8B1538', rgb: 'rgb(139, 21, 56)', usage: 'Main brand color for buttons, links, and accents' },
  { name: 'Dark Maroon', hex: '#500000', rgb: 'rgb(80, 0, 0)', usage: 'Darker variant for hover states and backgrounds' },
  { name: 'Accent Gold', hex: '#FFB82C', rgb: 'rgb(255, 184, 44)', usage: 'Highlight text, badges, and secondary accents' },
  { name: 'Dark BG', hex: '#0a0e27', rgb: 'rgb(10, 14, 39)', usage: 'Primary background color' },
  { name: 'Mid BG', hex: '#1a1f3a', rgb: 'rgb(26, 31, 58)', usage: 'Secondary background layers' },
  { name: 'Text Primary', hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)', usage: 'Primary text on dark backgrounds' },
  { name: 'Text Secondary', hex: '#E0E0E0', rgb: 'rgb(224, 224, 224)', usage: 'Secondary text and muted content' },
  { name: 'Border Light', hex: 'rgba(255, 255, 255, 0.1)', rgb: 'rgba(255, 255, 255, 0.1)', usage: 'Glass morphism borders' },
  { name: 'Border Med', hex: 'rgba(255, 255, 255, 0.2)', rgb: 'rgba(255, 255, 255, 0.2)', usage: 'Interactive element borders' },
];

export default function StyleGuidePage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

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
          <p className="text-xl text-gray-300 max-w-2xl">
            Comprehensive style guide for BHG brand identity. Control all UI/UX elements from this single source of truth.
          </p>
        </div>
      </div>

      {/* Color Palette Section */}
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
                      className="text-left px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-all text-gray-200 hover:text-white"
                    >
                      {copiedIndex === idx ? '✓ Copied!' : `HEX: ${color.hex}`}
                    </button>
                    <button
                      onClick={() => copyToClipboard(color.rgb, idx + 100)}
                      className="text-left px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-all text-gray-200 hover:text-white"
                    >
                      {copiedIndex === idx + 100 ? '✓ Copied!' : `RGB: ${color.rgb}`}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typography Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-12">Typography</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Headings */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6">Headings (Geist)</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-xs text-gray-400 mb-2">H1 / 56px / font-black</p>
                  <h1 className="text-5xl font-black">Design System</h1>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-2">H2 / 48px / font-black</p>
                  <h2 className="text-4xl font-black">Color Palette</h2>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-2">H3 / 30px / font-bold</p>
                  <h3 className="text-2xl font-bold">Typography</h3>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-2">H4 / 24px / font-bold</p>
                  <h4 className="text-xl font-bold">Buttons & Components</h4>
                </div>
              </div>
            </div>

            {/* Body Text */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6">Body Text (Geist)</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-400 mb-2">Large / 18px</p>
                  <p className="text-lg">The SPM Specialist Firm. Built for business reinvention.</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-2">Regular / 16px</p>
                  <p className="text-base">SPM implementations fail without the right specialist. We bring clarity, expertise, and accountability to every engagement.</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-2">Small / 14px</p>
                  <p className="text-sm">300+ implementations • 50+ enterprise clients • 99% success rate</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-2">Caption / 12px</p>
                  <p className="text-xs text-gray-400">Last updated: February 2026 • Design System v1.0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Buttons Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-12">Buttons & CTAs</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Primary Button */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6">Primary Button</h3>
              <div className="space-y-4">
                <button className="btn-primary">Talk to a Specialist</button>
                <p className="text-sm text-gray-400 mt-4">
                  Background: Gradient from Maroon to Dark Maroon<br/>
                  Hover: Scale 105%, shadow glow effect<br/>
                  Used for: Main CTAs, primary actions
                </p>
              </div>
            </div>

            {/* Secondary Button */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6">Secondary Button</h3>
              <div className="space-y-4">
                <button className="px-8 py-4 font-bold border border-white/20 rounded-lg hover:border-white/40 transition-all duration-300 hover:bg-white/5">
                  See How We Work
                </button>
                <p className="text-sm text-gray-400 mt-4">
                  Background: Transparent with border<br/>
                  Hover: Increased border opacity, subtle fill<br/>
                  Used for: Secondary actions, learn more
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Components Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-12">Components</h2>

          {/* Glass Cards */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">Glass Card</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass-card p-6 hover:shadow-2xl transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#8B1538] to-[#FFB82C] rounded-lg mb-4"></div>
                  <h4 className="text-lg font-bold mb-2">Feature {i}</h4>
                  <p className="text-sm text-gray-300">
                    Glass morphism cards with backdrop blur and border. Perfect for highlighting features.
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient Text */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">Gradient Text</h3>
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
              <p className="text-4xl font-black gradient-text mb-4">
                The SPM Specialist Firm
              </p>
              <p className="text-sm text-gray-400">
                Used for: Main headings, highlights<br/>
                Gradient: Maroon to Gold
              </p>
            </div>
          </div>

          {/* Badges */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">Badges & Tags</h3>
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex flex-wrap gap-3">
                <span className="inline-block px-3 py-1 rounded-full bg-[#8B1538]/30 border border-[#8B1538]/50 text-sm font-medium">
                  Modern SPM Intelligence
                </span>
                <span className="inline-block px-3 py-1 rounded-full bg-[#FFB82C]/20 border border-[#FFB82C]/40 text-sm font-medium text-[#FFB82C]">
                  Enterprise Solutions
                </span>
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-medium">
                  Industry Standard
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacing & Layout Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-12">Spacing & Layout</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-lg font-bold mb-4">Container</h3>
              <ul className="text-sm space-y-2 text-gray-300">
                <li>Max-width: 80rem (7xl)</li>
                <li>Horizontal padding: 1-2rem</li>
                <li>Vertical padding: 4rem sections</li>
              </ul>
            </div>

            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-lg font-bold mb-4">Grid Gaps</h3>
              <ul className="text-sm space-y-2 text-gray-300">
                <li>Small: 1rem (4 cols)</li>
                <li>Medium: 1.5rem (3 cols)</li>
                <li>Large: 2rem (2 cols)</li>
              </ul>
            </div>

            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-lg font-bold mb-4">Responsive</h3>
              <ul className="text-sm space-y-2 text-gray-300">
                <li>Mobile-first design</li>
                <li>Breakpoints: sm, md, lg, xl</li>
                <li>Flex for alignment</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Guidelines Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-12">Brand Guidelines</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Do's */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-green-400">✓ Do's</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">→</span>
                  <span>Keep the luxury/dark aesthetic — Aggie maroon on dark backgrounds</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">→</span>
                  <span>Use glass morphism for interactive elements</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">→</span>
                  <span>Include micro-animations and scroll reveals</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">→</span>
                  <span>Maintain high contrast text for accessibility</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">→</span>
                  <span>Use Geist font for consistent typography</span>
                </li>
              </ul>
            </div>

            {/* Don'ts */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-red-400">✗ Don'ts</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">×</span>
                  <span>Don't use bright colors or light themes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">×</span>
                  <span>Don't remove the transparency/backdrop effects</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">×</span>
                  <span>Don't use serif fonts or generic system fonts</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">×</span>
                  <span>Don't flatten the design — keep depth with shadows and layers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">×</span>
                  <span>Don't mix conflicting gradient directions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Design Principles */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10 mb-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-12">Design Principles</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Luxury & Refinement', desc: 'Dark sophisticated backgrounds with precise maroon and gold accents' },
              { title: 'Glass Morphism', desc: 'Transparent, blurred backgrounds create depth and visual interest' },
              { title: 'Micro-interactions', desc: 'Smooth animations on scroll, hover, and load states' },
              { title: 'High Contrast', desc: 'White text on dark backgrounds ensures readability' },
              { title: 'Consistent Typography', desc: 'Geist font family throughout for cohesive brand voice' },
              { title: 'Responsive Design', desc: 'Mobile-first approach that scales to all screen sizes' },
            ].map((principle, idx) => (
              <div key={idx} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-2 text-[#FFB82C]">{principle.title}</h3>
                <p className="text-gray-300 text-sm">{principle.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
