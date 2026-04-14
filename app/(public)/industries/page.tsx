import { createPageMetadata } from '@/lib/metadata'
import { Metadata } from 'next'

export const metadata: Metadata = createPageMetadata({
  title: 'Industries | BHG SPM Specialists',
  description: 'BHG serves Technology, Financial Services, Healthcare, Manufacturing, and more.',
})

export default function IndustriesPage() {
  const industries = [
    { name: 'Technology', description: 'SaaS, hardware, and cloud platforms with complex, multi-product comp structures.' },
    { name: 'Financial Services', description: 'Broker-dealer, insurance, and banking environments with compliance-first ICM.' },
    { name: 'Healthcare', description: 'Medical device and pharma sales with territory and quota complexity.' },
    { name: 'Manufacturing', description: 'Multi-channel distribution with territory management and dealer programs.' },
    { name: 'Telecom & Media', description: 'High-volume transactional comp with frequent plan changes.' },
    { name: 'Professional Services', description: 'Utilization-based models layered on top of traditional quota structures.' },
  ]

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="section-container">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">Industries We Serve</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Vendor-agnostic SPM expertise across every major industry vertical.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {industries.map((industry, idx) => (
            <div key={idx} className="glass-card p-8">
              <h3 className="text-xl font-bold text-white mb-3">{industry.name}</h3>
              <p className="text-white/60">{industry.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
