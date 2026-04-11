export interface AssessmentResponse {
  cycleLength: number
  manualWork: number
  visibilityScore: number
  dataQuality: number
  painPoints: string[]
}

export interface GapAnalysis {
  dominantGap: string
  gapType: 'Compression' | 'ManualWork' | 'Visibility' | 'DataQuality'
  score: number
  allGaps: Array<{ gap: string; score: number }>
}

export function analyzeGaps(responses: AssessmentResponse): GapAnalysis {
  // Initialize gap scores (0-100)
  const gaps = {
    Compression: 0,
    ManualWork: 0,
    Visibility: 0,
    DataQuality: 0,
  }

  // Score compression cycles (goal: 3 weeks, penalty for each week above)
  gaps.Compression = Math.min(100, Math.max(0, (responses.cycleLength - 3) * 8))

  // Score manual work percentage (goal: <5%, penalty for each % above)
  gaps.ManualWork = Math.min(100, responses.manualWork * 1.2)

  // Score visibility (inverse scale: 5 = good, 1 = bad)
  gaps.Visibility = (6 - responses.visibilityScore) * 20

  // Score data quality (inverse scale: 5 = good, 1 = bad)
  gaps.DataQuality = (6 - responses.dataQuality) * 20

  // Boost gaps based on selected pain points
  for (const painPoint of responses.painPoints) {
    switch (painPoint) {
      case 'cycles':
        gaps.Compression += 15
        break
      case 'manual':
        gaps.ManualWork += 15
        break
      case 'visibility':
        gaps.Visibility += 15
        break
      case 'data':
        gaps.DataQuality += 15
        break
      case 'forecasting':
        gaps.Visibility += 15
        break
    }
  }

  // Cap all gaps at 100
  Object.keys(gaps).forEach((key) => {
    gaps[key as keyof typeof gaps] = Math.min(100, gaps[key as keyof typeof gaps])
  })

  // Determine dominant gap
  const sortedGaps = Object.entries(gaps)
    .map(([gap, score]) => ({ gap, score }))
    .sort((a, b) => b.score - a.score)

  const dominantGapType = sortedGaps[0].gap as 'Compression' | 'ManualWork' | 'Visibility' | 'DataQuality'

  return {
    dominantGap: dominantGapType,
    gapType: dominantGapType,
    score: Math.round(sortedGaps[0].score),
    allGaps: sortedGaps,
  }
}

export function getGapDescription(gapType: string): string {
  const descriptions: Record<string, string> = {
    Compression: 'You have a Compression Cycle optimization opportunity',
    ManualWork: 'You have a Manual Process optimization opportunity',
    Visibility: 'You have a Visibility & Forecasting optimization opportunity',
    DataQuality: 'You have a Data Quality optimization opportunity',
  }
  return descriptions[gapType] || 'You have an optimization opportunity'
}
