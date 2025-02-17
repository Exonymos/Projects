// utils/xpCalculator.js
/**
 * Validates the input values.
 * @param {Object} params
 * @param {number} params.currentLevel - The current level.
 * @param {number} params.currentExp - The current Exp above the base Exp for the current level.
 * @param {number} params.targetLevel - The target level.
 * @param {Array} params.xpData - Array of [level, baseXP] pairs.
 * @returns {boolean} True if the input is valid; otherwise, false.
 */

export function validateInput({
  currentLevel,
  currentExp,
  targetLevel,
  xpData,
}) {
  if (isNaN(currentLevel) || isNaN(currentExp) || isNaN(targetLevel)) {
    return false;
  }
  if (currentLevel < xpData[0][0]) return false;
  if (currentExp < 0) return false;
  if (targetLevel <= currentLevel || targetLevel > xpData[xpData.length - 1][0])
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
 * @param {number} params.currentExp - The current Exp (beyond the base Exp of current level).
 * @param {number} params.targetLevel - The target level.
 * @returns {Object} If more XP is needed, returns { xpNeeded, reached: false }.
 *                   If the user already has enough XP, returns { reached: true, currentCalculatedLevel, xpToNext, maxLevel }.
 */
export function calculateXp({ xpData, currentLevel, currentExp, targetLevel }) {
  const currentLevelData = xpData.find(([level]) => level === currentLevel);
  const targetLevelData = xpData.find(([level]) => level === targetLevel);

  if (!currentLevelData || !targetLevelData) {
    throw new Error("Invalid level data provided.");
  }

  const currentBaseXp = currentLevelData[1];
  const targetBaseXp = targetLevelData[1];

  const totalCurrentXp = currentBaseXp + currentExp;
  const xpNeeded = targetBaseXp - totalCurrentXp;

  if (xpNeeded > 0) {
    return { xpNeeded, reached: false };
  } else {
    const currentCalculatedLevel = findCurrentLevel(xpData, totalCurrentXp);
    const nextLevelData = xpData.find(
      ([level]) => level === currentCalculatedLevel + 1
    );
    if (!nextLevelData) {
      return {
        reached: true,
        currentCalculatedLevel,
        xpToNext: null,
        maxLevel: true,
      };
    } else {
      const xpToNext = nextLevelData[1] - totalCurrentXp;
      return {
        reached: true,
        currentCalculatedLevel,
        xpToNext,
        maxLevel: false,
      };
    }
  }
}
