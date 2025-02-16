/**
 * Validates the input values.
 * @param {Object} params
 * @param {number} params.currentLevel - The current level.
 * @param {number} params.currentXp - The current XP above the base XP for the current level.
 * @param {number} params.targetLevel - The target level.
 * @param {Array} params.xpData - Array of [level, baseXP] pairs.
 * @returns {boolean} True if the input is valid; otherwise, false.
 */

export function validateInput({
    currentLevel,
    currentXp,
    targetLevel,
    xpData,
}) {
    if (isNaN(currentLevel) || isNaN(currentXp) || isNaN(targetLevel)) {
        return false;
    }
    if (currentLevel < xpData[0][0]) return false; // Ensure level is not below the first level.
    if (currentXp < 0) return false; // XP cannot be negative.
    if (
        targetLevel <= currentLevel ||
        targetLevel > xpData[xpData.length - 1][0]
    )
        return false;
    return true;
}

/**
 * Finds the current level based on total XP.
 * @param {Array} xpData - Array of [level, baseXP] pairs.
 * @param {number} totalXp - The total XP (base XP of current level plus current XP).
 * @returns {number} The calculated level.
 */
export function findCurrentLevel(xpData, totalXp) {
    for (let i = 0; i < xpData.length; i++) {
        if (totalXp < xpData[i][1]) {
            return xpData[i - 1][0];
        }
    }
    return xpData[xpData.length - 1][0];
}

/**
 * Calculates the XP requirements.
 * @param {Object} params
 * @param {Array} params.xpData - Array of [level, baseXP] pairs.
 * @param {number} params.currentLevel - The current level.
 * @param {number} params.currentXp - The current XP (beyond the base XP of current level).
 * @param {number} params.targetLevel - The target level.
 * @returns {Object} If more XP is needed, returns { xpNeeded, reached: false }.
 *                   If the user already has enough XP, returns { reached: true, currentCalculatedLevel, xpToNext }.
 */
export function calculateXp({ xpData, currentLevel, currentXp, targetLevel }) {
    // Find the base XP for the current and target levels.
    const currentLevelData = xpData.find(([level]) => level === currentLevel);
    const targetLevelData = xpData.find(([level]) => level === targetLevel);

    if (!currentLevelData || !targetLevelData) {
        throw new Error("Invalid level data provided.");
    }

    const currentBaseXp = currentLevelData[1];
    const targetBaseXp = targetLevelData[1];

    // Total XP is the base XP of the current level plus the XP you've gained.
    const totalCurrentXp = currentBaseXp + currentXp;
    const xpNeeded = targetBaseXp - totalCurrentXp;

    if (xpNeeded > 0) {
        // More XP is needed to reach the target.
        return { xpNeeded, reached: false };
    } else {
        // You've reached or exceeded the target XP.
        const currentCalculatedLevel = findCurrentLevel(xpData, totalCurrentXp);
        const nextLevelData = xpData.find(
            ([level]) => level === currentCalculatedLevel + 1
        );
        const xpToNext = nextLevelData ? nextLevelData[1] - totalCurrentXp : 0;
        return { reached: true, currentCalculatedLevel, xpToNext };
    }
}
