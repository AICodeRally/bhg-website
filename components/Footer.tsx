'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/10">
      <div className="gradient-mesh absolute inset-0" />
      
      <div className="section-container relative z-10 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-bold mb-4 text-white">Product</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li><Link href="#" className="hover:text-white transition">Solutions</Link></li>
              <li><Link href="#" className="hover:text-white transition">Approach</Link></li>
              <li><Link href="#" className="hover:text-white transition">Insights</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li><Link href="#" className="hover:text-white transition">About</Link></li>
              <li><Link href="#" className="hover:text-white transition">Team</Link></li>
              <li><Link href="#" className="hover:text-white transition">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">Resources</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li><Link href="#" className="hover:text-white transition">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition">Guides</Link></li>
              <li><Link href="#" className="hover:text-white transition">Case Studies</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">Legal</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li><Link href="#" className="hover:text-white transition">Privacy</Link></li>
              <li><Link href="#" className="hover:text-white transition">Terms</Link></li>
              <li><Link href="#" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-white/50 text-sm">
          <p>&copy; 2026 Blue Horizons Group. SPM Specialists.</p>
        </div>
      </div>
    </footer>
  )
}
