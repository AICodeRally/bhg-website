'use client'

import Link from 'next/link'
import { ArrowRight, Clock, Zap, TrendingUp, BarChart3 } from 'lucide-react'

interface Solution {
  id: string
  gap: string
  icon: React.ReactNode
  color: string
  title: string
  description: string
  challenge: {
    title: string
    bullets: string[]
  }
  approach: {
    title: string
    bullets: string[]
  }
  outcomes: {
    metric: string
    before: string
    after: string
    impact: string
  }[]
}

export default function SolutionsPage() {
  const solutions: Solution[] = [
    {
      id: 'compression',
      gap: 'Compression Cycle',
      icon: <Clock className="w-8 h-8" />,
      color: 'from-red-500 to-red-600',
      title: 'Compress Your Comp Cycle',
      description: 'Reduce the time between period close and commission delivery from 8+ weeks to 3-4 weeks.',
      challenge: {
        title: 'The Challenge',
        bullets: [
          'Manual data validation and reconciliation across systems',
          'Bottlenecks in approval workflows and exception handling',
          'Untested configuration changes causing delays and errors',
          'Lack of visibility into process status and bottlenecks',
        ],
      },
      approach: {
        title: 'Our Approach',
        bullets: [
          'Streamline data integration and eliminate manual touchpoints',
          'Optimize approval workflows and escalation paths',
          'Test configuration changes in isolated environments before prod',
          'Build dashboards for real-time process visibility',
          'Establish playbooks for recurring pain points',
        ],
      },
      outcomes: [
        {
          metric: 'Average Cycle Time',
          before: '8-10 weeks',
          after: '3-4 weeks',
          impact: 'Up to 75% reduction',
        },
        {
          metric: 'Manual Work Hours',
          before: '200+ per cycle',
          after: '40-50 per cycle',
          impact: '75% fewer exceptions',
        },
        {
          metric: 'Financial Close Speed',
          before: 'Delayed by comp process',
          after: '2-3 days post-period',
          impact: 'On-time closure',
        },
      ],
    },
    {
      id: 'manual-work',
      gap: 'Manual Work',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-yellow-500 to-yellow-600',
      title: 'Eliminate Manual Processes',
      description: 'Replace spreadsheets and manual workflows with automated, auditable systems.',
      challenge: {
        title: 'The Challenge',
        bullets: [
          'Comp calculations live in spreadsheets outside your SPM platform',
          'Manual data entry and copy-paste errors create overpayment/underpayment risk',
          'No audit trail for compensation decisions and plan changes',
          'Ops team spends 70%+ time on manual tasks instead of strategy',
        ],
      },
      approach: {
        title: 'Our Approach',
        bullets: [
          'Migrate spreadsheet logic into your SPM platform for single source of truth',
          'Automate exception handling, rounding rules, and plan adjustments',
          'Build complete audit trails for compliance and dispute resolution',
          'Create self-service dashboards for finance and operations teams',
          'Document playbooks so changes don\'t require your SPM vendor',
        ],
      },
      outcomes: [
        {
          metric: 'Manual Work Reduction',
          before: '500+ hours/month',
          after: '100 hours/month',
          impact: '80% automation',
        },
        {
          metric: 'Error Rate',
          before: '5-8% of calculations',
          after: '<0.5% of calculations',
          impact: '90% fewer disputes',
        },
        {
          metric: 'Audit Readiness',
          before: 'Multiple systems, no trail',
          after: 'Complete audit trail',
          impact: 'Regulatory compliance',
        },
      ],
    },
    {
      id: 'visibility',
      gap: 'Visibility & Forecasting',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600',
      title: 'Drive Forecasting Accuracy',
      description: 'Turn SPM data into real-time visibility and predictive insights for sales leaders.',
      challenge: {
        title: 'The Challenge',
        bullets: [
          'Sales leadership can\'t forecast commission impact of deals',
          'What-if scenarios require manual spreadsheet recalculation',
          'No visibility into rep comp attainment status in real-time',
          'Board and finance reporting requires manual data aggregation',
        ],
      },
      approach: {
        title: 'Our Approach',
        bullets: [
          'Build real-time dashboards showing attainment, forecasts, and variances',
          'Create what-if modeling tools that pull live data from your CRM and SPM',
          'Enable deal desk to model commission impact before opportunity closes',
          'Deliver automated board/investor dashboards for comp impact visibility',
          'Integrate with Salesforce or NetSuite for end-to-end forecasting',
        ],
      },
      outcomes: [
        {
          metric: 'Forecast Accuracy',
          before: '60-70%',
          after: '92-95%',
          impact: 'Better planning',
        },
        {
          metric: 'Scenario Build Time',
          before: '4-8 hours manual',
          after: '< 5 minutes',
          impact: 'Faster decision making',
        },
        {
          metric: 'Reporting Time',
          before: '20 hours/month',
          after: '2 hours/month',
          impact: 'Automated dashboards',
        },
      ],
    },
    {
      id: 'data-quality',
      gap: 'Data Quality',
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'from-green-500 to-green-600',
      title: 'Fix Data Quality Issues',
      description: 'Ensure your SPM system has clean, complete, and trusted data.',
      challenge: {
        title: 'The Challenge',
        bullets: [
          'Duplicate or missing customer/employee records in source systems',
          'Incomplete or inconsistent hierarchy (org structure, reporting lines)',
          'Revenue data misaligned between CRM, ERP, and SPM',
          'Reps dispute commission calculations due to data trust issues',
        ],
      },
      approach: {
        title: 'Our Approach',
        bullets: [
          'Audit source systems (CRM, ERP, HRIS) for data quality issues',
          'Design data governance rules and establish data quality dashboards',
          'Build master data management processes for customers, employees, revenue',
          'Create data validation frameworks that stop bad data before calc runs',
          'Document single source of truth for each entity across systems',
        ],
      },
      outcomes: [
        {
          metric: 'Data Completeness',
          before: '85-90%',
          after: '99%+',
          impact: 'Complete records',
        },
        {
          metric: 'Reconciliation Exceptions',
          before: '200+ per cycle',
          after: '<20 per cycle',
          impact: '90% fewer disputes',
        },
        {
          metric: 'Rep Confidence',
          before: '60%',
          after: '95%+',
          impact: 'Reduced turnover',
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <section className="relative pt-32 pb-16">
        <div className="gradient-mesh absolute inset-0" />
        <div className="section-container relative z-10 max-w-4xl">
          <div className="mb-6">
            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-white/10 text-white/70 border border-white/20">
              Four Gap Types
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Your SPM Optimization Roadmap
          </h1>
          <p className="text-lg text-white/80">
            Every company we work with has a unique combination of gaps. Our approach is diagnostic: find your primary gaps, fix the root causes, and build systems that don't regress.
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="relative py-24">
        <div className="section-container relative z-10">
          <div className="space-y-20">
            {solutions.map((solution, idx) => (
              <div
                key={solution.id}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  idx % 2 === 1 ? 'md:grid-flow-dense' : ''
                }`}
              >
                {/* Content */}
                <div className={idx % 2 === 1 ? 'md:col-start-2' : ''}>
                  <div className={`flex items-center gap-3 mb-4`}>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${solution.color} flex items-center justify-center text-white`}>
                      {solution.icon}
                    </div>
                    <span className="text-sm font-semibold text-white/60 uppercase tracking-wider">
                      {solution.gap}
                    </span>
                  </div>

                  <h2 className="text-4xl font-bold text-white mb-4">
                    {solution.title}
                  </h2>

                  <p className="text-lg text-white/80 mb-8">
                    {solution.description}
                  </p>

                  {/* Challenge */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">
                      {solution.challenge.title}
                    </h3>
                    <ul className="space-y-3">
                      {solution.challenge.bullets.map((bullet, i) => (
                        <li key={i} className="flex gap-3 text-white/80">
                          <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 text-xs mt-0.5">
                            •
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Approach */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">
                      {solution.approach.title}
                    </h3>
                    <ul className="space-y-3">
                      {solution.approach.bullets.map((bullet, i) => (
                        <li key={i} className="flex gap-3 text-white/80">
                          <span className={`w-5 h-5 rounded-full bg-gradient-to-br ${solution.color} flex items-center justify-center flex-shrink-0 text-xs text-white font-bold mt-0.5`}>
                            ✓
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Outcomes */}
                <div className={idx % 2 === 1 ? 'md:col-start-1' : ''}>
                  <div className="space-y-6">
                    {solution.outcomes.map((outcome, i) => (
                      <div key={i} className="glass-card p-6" style={{ backgroundColor: 'rgba(139, 21, 56, 0.1)' }}>
                        <p className="text-white/60 text-sm font-semibold mb-2 uppercase">
                          {outcome.metric}
                        </p>
                        <div className="flex items-baseline gap-4 mb-3">
                          <div>
                            <p className="text-white/60 text-sm">Before</p>
                            <p className="text-2xl font-bold text-white">{outcome.before}</p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-white/40" />
                          <div>
                            <p className="text-white/60 text-sm">After</p>
                            <p className="text-2xl font-bold text-red-500">{outcome.after}</p>
                          </div>
                        </div>
                        <p className="text-white/70 text-sm">{outcome.impact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment CTA */}
      <section className="relative py-24 bg-gradient-to-b from-black via-black to-transparent">
        <div className="section-container relative z-10 max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Which Gap Is Costing You the Most?
          </h2>
          <p className="text-lg text-white/60 mb-8">
            Take our 5-minute assessment to identify your dominant gap and get a custom optimization roadmap.
          </p>
          <Link href="/assessment" className="btn-primary inline-flex items-center gap-2">
            Take the Assessment <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
