import { createPageMetadata } from '@/lib/metadata'
import { Metadata } from 'next'

export const metadata: Metadata = createPageMetadata({
  title: 'Our Approach | BHG SPM Specialists',
  description: 'How BHG delivers vendor-agnostic SPM optimization — from discovery to deployment.',
})

export default function OurApproachPage() {
  const steps = [
    { step: '01', title: 'Discovery', description: 'We audit your current ICM state — data quality, cycle time, user adoption, and business alignment.' },
    { step: '02', title: 'Design', description: 'We design the optimization layer: territory, compensation, and workflow changes that move the needle.' },
    { step: '03', title: 'Deploy', description: 'We configure your existing platform with proven methodologies and manage change adoption.' },
  ]

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="section-container">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">Our Approach</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            We don't start with a platform recommendation. We start with your business problem.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((item, idx) => (
            <div key={idx} className="glass-card p-8">
              <div className="text-5xl font-bold gradient-text mb-4">{item.step}</div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-white/60">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="glass-card p-8 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">The BHG Difference</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { label: 'Vendor-Agnostic', desc: 'We optimize what you have, not what we sell' },
              { label: 'Proven Methodology', desc: 'Time-tested playbook across 300+ implementations' },
              { label: 'Strategic Partnership', desc: 'We stay alongside you, not just hand off at go-live' },
              { label: 'Business-First', desc: 'Every decision tied to revenue or efficiency impact' }
            ].map((item, idx) => (
              <div key={idx} className="border-l-4 border-white/20 pl-6">
                <h4 className="text-white font-semibold mb-2">{item.label}</h4>
                <p className="text-white/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
