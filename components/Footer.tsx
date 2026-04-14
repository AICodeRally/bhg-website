'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'

interface FooterLink { label: string; href: string }
interface FooterContent {
  company: string
  tagline: string
  links: FooterLink[]
  copyright: string
}

export default function Footer() {
  const [footer, setFooter] = useState<FooterContent>({
    company: 'Blue Horizons Group',
    tagline: 'SPM Specialists',
    links: [
      { label: 'Why BHG', href: '/why-bhg' },
      { label: 'Solutions', href: '/solutions' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
    copyright: '© 2024 Blue Horizons Group. All rights reserved.',
  })

  useEffect(() => {
    fetch('/content.json')
      .then(res => res.json())
      .then(data => { if (data.footer) setFooter(data.footer) })
      .catch(() => {})
  }, [])

  return (
    <footer className="relative py-16 bg-gradient-to-t from-black via-black to-transparent border-t border-white/10">
      <div className="section-container">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold gradient-text">{footer.company}</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed">{footer.tagline}</p>
          </div>

          <div>
            <h4 className="text-white/80 font-semibold mb-4 text-sm uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-2">
              {footer.links.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-white/50 hover:text-white transition text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white/80 font-semibold mb-4 text-sm uppercase tracking-widest">Get Started</h4>
            <Link href="/assessment" className="btn-primary inline-flex items-center gap-2 text-sm">
              <Sparkles className="w-4 h-4" /> Take the Assessment
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/40 text-sm">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
