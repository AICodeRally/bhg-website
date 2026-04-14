'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'

interface NavLink { label: string; href: string }
interface HeaderContent { logo: string; tagline: string; navLinks: NavLink[] }

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [header, setHeader] = useState<HeaderContent>({
    logo: 'BHG',
    tagline: 'SPM Specialists',
    navLinks: [
      { label: 'Why BHG', href: '/why-bhg' },
      { label: 'Solutions', href: '/solutions' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  })

  useEffect(() => {
    fetch('/content.json')
      .then(res => res.json())
      .then(data => { if (data.header) setHeader(data.header) })
      .catch(() => {})
  }, [])

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
              <span className="gradient-text">{header.logo}</span>
            </div>
            <span className="text-sm text-white/60 group-hover:text-white/80 transition">{header.tagline}</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {header.navLinks.map((link, idx) => (
              <Link key={idx} href={link.href} className="text-white/70 hover:text-white transition font-medium">
                {link.label}
              </Link>
            ))}
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
            {header.navLinks.map((link, idx) => (
              <Link key={idx} href={link.href} className="block px-4 py-2 text-white/70 hover:text-white">
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="btn-primary block text-center mx-4">Contact</Link>
          </div>
        )}
      </div>
    </nav>
  )
}
