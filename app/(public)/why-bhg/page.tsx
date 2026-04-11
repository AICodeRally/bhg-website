'use client'

import Link from 'next/link'
import { ArrowRight, TrendingUp, DollarSign, Users, Shield } from 'lucide-react'

export default function WhyBHGPage() {
  return (
    <div>
      {/* SECTION 1: PAGE INTRO */}
      <section className="py-20 px-4 bg-gradient-to-br from-bhg-blue to-blue-900 text-white">
        <div className="section-container max-w-3xl">
          <h1 className="text-5xl font-bold mb-8">
            Why Companies Who've Been Burned Before Choose BHG
          </h1>
          <p className="text-lg text-blue-100 mb-6">
            Most SPM implementations aren't derailed by bad software. They're derailed by gaps in scoping, rushed integrations, undertested configurations, and partners who disappear at go-live. BHG was built specifically to prevent those failures — with a methodology, a team, and a client commitment that generalist firms can't match.
          </p>
        </div>
      </section>

      {/* SECTION 2: HOW WE HELP */}
      <section className="py-20 px-4 bg-white">
        <div className="section-container">
          <h2 className="text-4xl font-bold mb-16 text-bhg-blue">
            How BHG Helps You Get More From Your SPM Investment
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <div className="w-16 h-16 bg-bhg-red rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-bhg-blue">Increase Profitable Revenue</h3>
              <h4 className="font-semibold text-lg mb-3 text-gray-900">Aligning Comp to the Behaviors That Drive Growth</h4>
              <p className="text-gray-700">
                Your comp plans are only as good as their implementation. BHG makes sure your system is configured correctly, handles plan changes efficiently, and delivers the analytics that help you optimize your comp strategy. We make sure your SPM platform drives the behaviors you designed your plans to incentivize — not just calculates commissions.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-bhg-red rounded-lg flex items-center justify-center mb-6">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-bhg-blue">Decrease Bottom Line Costs</h3>
              <h4 className="font-semibold text-lg mb-3 text-gray-900">Eliminating the Scope Gaps That Cause Overruns</h4>
              <p className="text-gray-700">
                The average failed SPM implementation costs 1–3× the original budget to fix. BHG's depth of industry expertise and our proprietary methodology eliminates the scope gaps that cause cost overruns before they become your problem.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-bhg-red rounded-lg flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-bhg-blue">Attract and Retain Top Performers</h3>
              <h4 className="font-semibold text-lg mb-3 text-gray-900">Delivering Comp Accuracy Your Reps Can Trust</h4>
              <p className="text-gray-700">
                Your top sales performers leave when they don't trust their comp. Shadow accounting, payment disputes, and slow plan changes are symptoms of a broken implementation — not bad software. BHG fixes the root cause so your reps stay focused on selling, not auditing their paychecks. We help you deliver employee satisfaction which means talent retention.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-bhg-red rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-bhg-blue">Mitigate and Minimize Risks</h3>
              <h4 className="font-semibold text-lg mb-3 text-gray-900">Replacing Manual Processes with Tested, Auditable Systems</h4>
              <p className="text-gray-700">
                Error-prone manual comp processes create overpayment/underpayment exposure, audit risk, and regulatory liability. BHG brings the integration depth and testing rigor to replace spreadsheet-based workflows with accurate, compliant, fully auditable SPM systems — and we stay with you to keep them that way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: INDUSTRY STATS */}
      <section className="py-20 px-4 bg-bhg-light">
        <div className="section-container">
          <h2 className="text-4xl font-bold mb-12 text-center text-bhg-blue">
            Why Sales Performance Management Matters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg">
              <p className="text-gray-600 text-sm mb-2">Gartner, Magic Quadrant for SPM</p>
              <p className="text-3xl font-bold text-bhg-red mb-2">40%</p>
              <p className="text-gray-700">of B2B companies deploy SPM to reduce overpayments</p>
            </div>
            <div className="bg-white p-8 rounded-lg">
              <p className="text-gray-600 text-sm mb-2">Forrester Research</p>
              <p className="text-3xl font-bold text-bhg-red mb-2">7 months</p>
              <p className="text-gray-700">is the average payback period for SPM deployment</p>
            </div>
            <div className="bg-white p-8 rounded-lg">
              <p className="text-gray-600 text-sm mb-2">Simon-Kucher & Partners</p>
              <p className="text-3xl font-bold text-bhg-red mb-2">50%</p>
              <p className="text-gray-700">acceleration in financial close times</p>
            </div>
            <div className="bg-white p-8 rounded-lg">
              <p className="text-gray-600 text-sm mb-2">Forrester Total Economic Impact (TEI) Study</p>
              <p className="text-3xl font-bold text-bhg-red mb-2">90% / 80%</p>
              <p className="text-gray-700">improved payment accuracy & reduction in audit & compliance time</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE NUMBERS */}
      <section className="py-20 px-4 bg-white">
        <div className="section-container">
          <h2 className="text-4xl font-bold mb-12 text-center text-bhg-blue">
            The Numbers Behind the Name
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-l-4 border-bhg-red p-6">
              <p className="text-4xl font-bold text-bhg-red mb-2">300+</p>
              <p className="text-gray-700">ICM implementations and 200+ years of combined SPM expertise</p>
            </div>
            <div className="border-l-4 border-bhg-red p-6">
              <p className="text-4xl font-bold text-bhg-red mb-2">87.5%</p>
              <p className="text-gray-700">Reduction in payroll processing time for 6,500 reps (Mattress Firm)</p>
            </div>
            <div className="border-l-4 border-bhg-red p-6">
              <p className="text-4xl font-bold text-bhg-red mb-2">0</p>
              <p className="text-gray-700">Defects on BHG's first Varicent Designer implementation for 7 SRS Distribution</p>
            </div>
            <div className="border-l-4 border-bhg-red p-6">
              <p className="text-xl font-bold text-bhg-red mb-2">On time & on budget</p>
              <p className="text-gray-700">BHG helped Palo Alto Networks launch a complex partner rebate transformation</p>
            </div>
            <div className="border-l-4 border-bhg-red p-6">
              <p className="text-xl font-bold text-bhg-red mb-2">KPMG partnership</p>
              <p className="text-gray-700">Gives clients like Verizon, LPL Financial, Penske, and US Foods the best of both</p>
            </div>
            <div className="border-l-4 border-bhg-red p-6">
              <p className="text-xl font-bold text-bhg-red mb-2">Award-winning</p>
              <p className="text-gray-700">BHG is a winner of the Xactly "Innovative Partner of the Year" award</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: OUR COMMITMENT */}
      <section className="py-20 px-4 bg-bhg-light">
        <div className="section-container max-w-3xl">
          <h2 className="text-4xl font-bold mb-8 text-bhg-blue">
            Our Success Metric Is Yours
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            As your SPM implementation partner, we measure success the way you do — by whether your sales team trusts their comp, your finance team closes on time, and your operations team can own the system without calling us for every change.
          </p>
          <p className="text-lg text-gray-700">
            We meet you where you are. Whether you need a full implementation, a rescue project, or long-term managed services, BHG's specialists bring the same depth of expertise and commitment to every engagement.
          </p>
        </div>
      </section>

      {/* SECTION 6: BOTTOM CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-bhg-blue to-blue-900 text-white">
        <div className="section-container max-w-2xl text-center">
          <h2 className="text-4xl font-bold mb-6">
            See the BHG Difference for Yourself
          </h2>
          <p className="text-lg text-blue-100 mb-12">
            Talk to an SPM specialist about your current challenges, your upcoming implementation, or how BHG can support your team long-term.
          </p>
          <button className="inline-flex items-center gap-2 bg-white text-bhg-blue px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition">
            Schedule a Conversation <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  )
}
