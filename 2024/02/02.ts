type VerificationResult = {
    result: true,
    skippedLevelIndex: number | null
} | {
    result: false
}

// 67 4 4 3 2


// Returns true if all every level is ascending or descending relative to the previous level.
export function verifyLevelDiffDirConsistency(levels: number[], direction: "asc" | "desc"): VerificationResult {
    let skippedLevelIndex: number | null = null
    
    let currentLevelIndex = 1
    while (currentLevelIndex < levels.length) {
        const justSkipped = skippedLevelIndex === currentLevelIndex - 1

        const prevLevel = levels[currentLevelIndex - (justSkipped ? 2 : 1)]
        const currentLevel = levels[currentLevelIndex]
        
        if (direction === "desc") {
            if (currentLevel - prevLevel >= 0) {
                if (skippedLevelIndex) return {result: false}
                skippedLevelIndex = currentLevelIndex
            }
        } else {
            if (currentLevel - prevLevel <= 0) {
                if (skippedLevelIndex) return {result: false}
                skippedLevelIndex = currentLevelIndex
            }
        }
        
        currentLevelIndex += 1
    }
    
    return {result: true, skippedLevelIndex}
}

function verifyLevelDifferencesInRange(levels: number[], lowerBound: number, upperBound: number): VerificationResult {
    let skippedLevelIndex: number | null = null
    let currentLevelIndex = 1
    while (currentLevelIndex < levels.length) {
        const justSkipped = skippedLevelIndex === currentLevelIndex - 1

        const prevLevel = levels[currentLevelIndex - (justSkipped ? 2 : 1)]
        const currentLevel = levels[currentLevelIndex]

        const diff = Math.abs(currentLevel - prevLevel)
        if (diff < lowerBound || diff > upperBound) {
            if (skippedLevelIndex) return {result: false}
            skippedLevelIndex = currentLevelIndex
        }

        currentLevelIndex += 1
    }

    return {result: true, skippedLevelIndex}
}

function checkReportSafety(report: string, dampeningEnabled: boolean): VerificationResult {
    const levels = report.split(" ").map(Number)

    const allLevelsAsc = verifyLevelDiffDirConsistency(levels, "asc")
    const allLevelsDesc = verifyLevelDiffDirConsistency(levels, "desc")
    if (!allLevelsAsc.result && !allLevelsDesc.result) {
        return {result: false}
    }

    if (!dampeningEnabled) {
        if (allLevelsAsc.result && Number.isInteger(allLevelsAsc.skippedLevelIndex)) return {result: false}
        if (allLevelsDesc.result && Number.isInteger(allLevelsDesc.skippedLevelIndex)) return {result: false}
    }

    const indexOptions: (number | null)[] = [null]
    if (allLevelsAsc.result) {
        indexOptions.push(allLevelsAsc.skippedLevelIndex)
    }
    if (allLevelsDesc.result) {
        indexOptions.push(allLevelsDesc.skippedLevelIndex)
    }
    if (dampeningEnabled && indexOptions.length === 0) {
        console.warn("Dampening is enabled, but for some reason there are are no indexOptions")
    }

    console.log("---")
    console.log({
        report,
        dampeningEnabled,
        allLevelsAsc,
        allLevelsDesc,
        indexOptions
    })
    
    const diffsInRange = verifyLevelDifferencesInRange(levels, 1, 3)

    if (!diffsInRange.result) return { result: false }

    const usedSkipPreviously = !!indexOptions.find((v) => Number.isInteger(v))
    if (!usedSkipPreviously) return { result: true, skippedLevelIndex: diffsInRange.skippedLevelIndex }
    
    if (dampeningEnabled) {
        const skippedIndex = indexOptions.find((v) => v === diffsInRange.skippedLevelIndex)
        if (skippedIndex === undefined) return { result: false }
        return {result: true, skippedLevelIndex: skippedIndex}
    } else {
        if (diffsInRange.skippedLevelIndex !== null) return { result: false }
        return {result: true, skippedLevelIndex: diffsInRange.skippedLevelIndex}
    }

    throw new Error("Should not reach this point")
    
}


export const part1 = (lines: string[]) => {
    const reportAssessments = lines.map(report => ({
        report, 
        safety: checkReportSafety(report, false)
    }))
    const safeReports = reportAssessments.filter((assessment) => assessment.safety.result)
    return {count: safeReports.length, safeReports}
}

export const part2 = (lines: string[]) => {
    const reportAssessments = lines.map(report => ({
        report, 
        safety: checkReportSafety(report, true)
    }))
    const unsafeReports: typeof reportAssessments = []
    const safeReports: typeof reportAssessments = []
    for (const report of reportAssessments) {
        if (report.safety.result) {
            safeReports.push(report)
        } else {
            unsafeReports.push(report)
        }
    }
    return {safeReportCount: safeReports.length, safeReports, unsafeReports}
}

