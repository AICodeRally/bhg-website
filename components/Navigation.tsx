'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="text-xl font-bold tracking-tighter">
              <span className="gradient-text">BHG</span>
            </div>
            <span className="text-sm text-white/60 group-hover:text-white/80 transition">SPM Specialists</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-12">
            <Link href="/why-bhg" className="text-white/70 hover:text-white transition font-medium">Why BHG</Link>
            <Link href="/solutions" className="text-white/70 hover:text-white transition font-medium">Solutions</Link>
            <Link href="/case-studies" className="text-white/70 hover:text-white transition font-medium">Case Studies</Link>
            <Link href="/assessment" className="text-white/70 hover:text-white transition font-medium">Assessment</Link>
            <Link href="/insights" className="text-white/70 hover:text-white transition font-medium">Insights</Link>
            <Link href="/style-guide" className="text-white/70 hover:text-white/90 transition font-medium text-sm">Design</Link>
            <Link href="/contact" className="btn-primary text-sm py-2 px-6">
              <Sparkles className="w-4 h-4" />
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-red-500 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur border-t border-white/10 py-4 space-y-3">
            <Link href="/why-bhg" className="block px-4 py-2 text-white/70 hover:text-white">Why BHG</Link>
            <Link href="/solutions" className="block px-4 py-2 text-white/70 hover:text-white">Solutions</Link>
            <Link href="/case-studies" className="block px-4 py-2 text-white/70 hover:text-white">Case Studies</Link>
            <Link href="/assessment" className="block px-4 py-2 text-white/70 hover:text-white">Assessment</Link>
            <Link href="/insights" className="block px-4 py-2 text-white/70 hover:text-white">Insights</Link>
            <Link href="/style-guide" className="block px-4 py-2 text-white/70 hover:text-white">Design System</Link>
            <Link href="/contact" className="btn-primary block text-center mx-4">Contact</Link>
          </div>
        )}
      </div>
    </nav>
  )
}
