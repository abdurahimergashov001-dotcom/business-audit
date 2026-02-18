
export const calculateAudit = (data) => {
    const {
        monthlyIncomeGoal,
        averageCheck,
        salesConversion,
        hasCrm,
        hasSalesTeam
    } = data;

    // Pasrse inputs to numbers
    const goal = parseFloat(monthlyIncomeGoal) || 0;
    const check = parseFloat(averageCheck) || 0;
    const conversionRate = parseFloat(salesConversion) || 0;

    // 1. Calculate required clients and leads
    const requiredClients = check > 0 ? Math.ceil(goal / check) : 0;
    const requiredLeads = (conversionRate > 0 && requiredClients > 0)
        ? Math.ceil(requiredClients / (conversionRate / 100))
        : 0;

    // 2. Determine penalties based on "Efficiency Penalty" logic
    let penaltyPercentage = 0;
    if (!hasCrm) penaltyPercentage += 20;
    if (!hasSalesTeam) penaltyPercentage += 20;

    // 3. Define CPL based on benchmarks (User gave $0.8 - $1.5 for Instagram, assuming generic for now or adjusting)
    // If specific platform logic is needed, we can add it. For now using the user's benchmark.
    const baseCplMin = 0.8;
    const baseCplMax = 1.5;

    // Apply penalty to CPL (Simulating that it costs more to get a *converted* customer or efficiency loss makes effective CPL higher? 
    // User said "real budget 40% more expensive". So we increase the BUDGET needed, or the CPL.
    // Let's increase the LEADS needed? No, user says "Real budget 40% more expensive".
    // So we calculate base budget, then add penalty.

    const baseMinBudget = requiredLeads * baseCplMin;
    const baseMaxBudget = requiredLeads * baseCplMax;

    const penaltyFactor = 1 + (penaltyPercentage / 100);

    const realMinBudget = baseMinBudget * penaltyFactor;
    const realMaxBudget = baseMaxBudget * penaltyFactor;

    // 4. Risk Level
    let riskLevel = 'LOW';
    if (penaltyPercentage >= 40) riskLevel = 'CRITICAL';
    else if (penaltyPercentage >= 20) riskLevel = 'MEDIUM';

    return {
        financials: {
            goal,
            check,
            requiredClients,
            requiredLeads,
            conversionRate
        },
        budget: {
            base: {
                min: baseMinBudget,
                max: baseMaxBudget
            },
            real: {
                min: realMinBudget,
                max: realMaxBudget
            },
            penaltyPercentage
        },
        risk: {
            level: riskLevel, // LOW, MEDIUM, CRITICAL
            hasCrm,
            hasSalesTeam
        }
    };
};
