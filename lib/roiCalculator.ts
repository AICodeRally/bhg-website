export interface ROIInputs {
  annualRevenue: number
  compTeamSize: number
  cycleLength: number
  manualWorkPercentage: number
}

export interface ROIOutput {
  currentCycleSavings: number
  automationSavings: number
  decisionSpeedBenefit: number
  totalAnnualBenefit: number
  totalAnnualCost: number
  roi: number
  paybackMonths: number
  assumptions: string[]
}

export function calculateROI(inputs: ROIInputs): ROIOutput {
  const { annualRevenue, compTeamSize, cycleLength, manualWorkPercentage } = inputs

  // Finance team salary assumption: $100k average
  const avgSalary = 100000
  const totalTeamCost = compTeamSize * avgSalary

  // Cost breakdown by activity
  const cycleWorkPercentage = Math.min(cycleLength / 52, 0.4) // Up to 40% of year on cycles
  const currentCycleCost = totalTeamCost * cycleWorkPercentage

  // Cycle compression benefit (8 weeks → 3 weeks)
  // Assume you can compress from current to 3 weeks
  const targetCycleWeeks = 3
  const cycleSavingsFraction = Math.max(0, cycleLength - targetCycleWeeks) / cycleLength
  const cycleSavings = currentCycleCost * cycleSavingsFraction

  // Automation benefit (eliminate manual work)
  // Assume you can eliminate 80% of manual work through automation
  const manualWorkCost = totalTeamCost * (manualWorkPercentage / 100) * 0.8
  const automationBenefit = manualWorkCost * 0.8

  // Decision speed benefit
  // Assume faster decisions lead to 2-3% revenue improvement from better comp decisions
  const decisionSpeedRevenueLift = annualRevenue * 0.025
  const decisionSpeedBenefit = decisionSpeedRevenueLift * 0.2 // 20% captured in year 1

  // Total annual benefit
  const totalBenefit = cycleSavings + automationBenefit + decisionSpeedBenefit

  // Implementation cost assumptions
  // Assume $150k-$300k depending on platform complexity
  const platformCost = 200000 // One-time
  const annualServiceCost = 50000 // Ongoing support/optimization

  // ROI calculation
  const roi = ((totalBenefit - annualServiceCost) / (platformCost + annualServiceCost)) * 100
  const paybackMonths = Math.round((platformCost / (totalBenefit - annualServiceCost)) * 12)

  const assumptions = [
    'Average finance team salary: $100k',
    `Current cycle time: ${cycleLength} weeks`,
    'Target cycle time: 3 weeks (industry best practice)',
    `Current manual work: ${manualWorkPercentage}%`,
    'Automation achieves 80% manual work reduction',
    'Decision speed provides 2.5% revenue insight improvement',
    'Implementation cost: $150-300k',
    'Annual service cost: $50k',
  ]

  return {
    currentCycleSavings: cycleSavings,
    automationSavings: automationBenefit,
    decisionSpeedBenefit: decisionSpeedBenefit,
    totalAnnualBenefit: totalBenefit,
    totalAnnualCost: annualServiceCost + platformCost / 5, // Amortize over 5 years
    roi: Math.round(roi),
    paybackMonths: Math.max(0, paybackMonths),
    assumptions,
  }
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}
