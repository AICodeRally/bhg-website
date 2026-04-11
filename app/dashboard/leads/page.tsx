'use client'

import { useEffect, useState } from 'react'
import { Download, Filter, Search } from 'lucide-react'

interface Lead {
  email: string
  company: string
  name: string
  gapType: string
  score: number
  cycleLength: number
  manualWork: number
  visibilityScore: number
  dataQuality: number
  submittedAt: string
}

export default function LeadsDashboard() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGap, setSelectedGap] = useState<string>('All')
  const [sortBy, setSortBy] = useState<string>('date')

  useEffect(() => {
    // TODO: Replace with actual API call to fetch leads
    // For now, this is a placeholder
    setLoading(false)
  }, [])

  const filteredLeads = leads
    .filter((lead) => {
      const matchesSearch =
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.name.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesGap = selectedGap === 'All' || lead.gapType === selectedGap

      return matchesSearch && matchesGap
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      } else if (sortBy === 'score') {
        return b.score - a.score
      }
      return 0
    })

  const gapTypes = ['All', 'Compression', 'ManualWork', 'Visibility', 'DataQuality']

  const handleExport = () => {
    const csv = [
      ['Name', 'Email', 'Company', 'Gap Type', 'Score', 'Cycle Length', 'Manual Work %', 'Submitted At'],
      ...filteredLeads.map((lead) => [
        lead.name,
        lead.email,
        lead.company,
        lead.gapType,
        lead.score.toString(),
        lead.cycleLength.toString(),
        lead.manualWork.toString(),
        new Date(lead.submittedAt).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-white/20 border-t-red-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Assessment Leads</h1>
          <p className="text-white/60">
            Total leads: <span className="text-white font-semibold">{leads.length}</span>
          </p>
        </div>

        {/* Controls */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {/* Search */}
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search by name, email, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/50"
            />
          </div>

          {/* Gap Type Filter */}
          <select
            value={selectedGap}
            onChange={(e) => setSelectedGap(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/50"
          >
            {gapTypes.map((gap) => (
              <option key={gap} value={gap}>
                {gap === 'ManualWork' ? 'Manual Work' : gap === 'DataQuality' ? 'Data Quality' : gap}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/50"
          >
            <option value="date">Latest First</option>
            <option value="score">Highest Score</option>
          </select>
        </div>

        {/* Export */}
        {leads.length > 0 && (
          <button
            onClick={handleExport}
            className="mb-8 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        )}

        {/* Table */}
        {filteredLeads.length === 0 ? (
          <div className="glass-card p-12 text-center" style={{ backgroundColor: 'rgba(139, 21, 56, 0.05)' }}>
            <p className="text-white/60">No leads found. Assessment submissions will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-white/10">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white/70">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white/70">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white/70">Company</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white/70">Gap Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white/70">Score</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white/70">Cycle</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white/70">Manual Work</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white/70">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredLeads.map((lead, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition">
                    <td className="px-6 py-4 text-white">{lead.name}</td>
                    <td className="px-6 py-4 text-white/70 font-mono text-sm">{lead.email}</td>
                    <td className="px-6 py-4 text-white/70">{lead.company}</td>
                    <td className="px-6 py-4">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/70 border border-white/20"
                      >
                        {lead.gapType === 'ManualWork'
                          ? 'Manual Work'
                          : lead.gapType === 'DataQuality'
                            ? 'Data Quality'
                            : lead.gapType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white font-bold">{lead.score}</span>
                    </td>
                    <td className="px-6 py-4 text-white/70">{lead.cycleLength}w</td>
                    <td className="px-6 py-4 text-white/70">{lead.manualWork}%</td>
                    <td className="px-6 py-4 text-white/70 text-sm">
                      {new Date(lead.submittedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
