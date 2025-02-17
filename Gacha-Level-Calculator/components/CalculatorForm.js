// components/CalculatorForm.js
import { useState, useEffect } from "react";
import { validateInput, calculateXp } from "../utils/xpCalculator";

export default function CalculatorForm({
  title,
  xpData,
  levelLabel,
  targetLabel,
  localStorageKey,
  generateFailureMessage,
  generateSuccessMessage,
  buttonBgColor,
  buttonHoverColor,
}) {
  // Local state for inputs
  const [currentLevel, setCurrentLevel] = useState("");
  const [currentExp, setCurrentExp] = useState("");
  const [targetLevel, setTargetLevel] = useState("");
  const [dailyExp, setDailyExp] = useState("");
  const [result, setResult] = useState("");
  const [daysResult, setDaysResult] = useState("");

  // Load saved values from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(localStorageKey);
      if (saved) {
        const { currentLevel, currentExp, targetLevel } = JSON.parse(saved);
        setCurrentLevel(currentLevel);
        setCurrentExp(currentExp);
        setTargetLevel(targetLevel);
      }
    }
  }, [localStorageKey]);

  // Save values to localStorage when they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = { currentLevel, currentExp, targetLevel };
      localStorage.setItem(localStorageKey, JSON.stringify(data));
    }
  }, [currentLevel, currentExp, targetLevel, localStorageKey]);

  const handleCalculate = (e) => {
    e.preventDefault();

    const currentLevelNum = parseInt(currentLevel, 10);
    const currentExpNum = parseInt(currentExp, 10) || 0;
    const targetLevelNum = parseInt(targetLevel, 10);
    const dailyExpNum = parseFloat(dailyExp) || null;

    if (
      !validateInput({
        currentLevel: currentLevelNum,
        currentExp: currentExpNum,
        targetLevel: targetLevelNum,
        xpData,
      })
    ) {
      alert(
        `Please enter valid input values. Ensure the current level is at least ${
          xpData[0][0]
        }, current exp is non-negative, and target level is greater than current level (maximum is ${
          xpData[xpData.length - 1][0]
        }).`
      );
      return;
    }

    const xpResult = calculateXp({
      xpData,
      currentLevel: currentLevelNum,
      currentExp: currentExpNum,
      targetLevel: targetLevelNum,
    });

    if (!xpResult.reached) {
      setResult(generateFailureMessage(xpResult.xpNeeded, targetLevelNum));
      if (dailyExpNum) {
        const days = xpResult.xpNeeded / dailyExpNum;
        setDaysResult(`Days to reach milestone: ${days.toFixed(2)}`);
      } else {
        setDaysResult("");
      }
    } else {
      if (xpResult.maxLevel) {
        setResult(
          `Congratulations! You've reached the maximum level of ${xpResult.currentCalculatedLevel}.`
        );
      } else {
        setResult(
          generateSuccessMessage(
            xpResult.currentCalculatedLevel,
            xpResult.xpToNext
          )
        );
      }
      setDaysResult("");
    }
  };

  return (
    <div className="calculator-container">
      <h1>{title}</h1>
      <form onSubmit={handleCalculate} className="calculator-form">
        <div className="form-group">
          <label>{levelLabel}:</label>
          <input
            type="number"
            value={currentLevel}
            onChange={(e) => setCurrentLevel(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Current Exp:</label>
          <input
            type="number"
            value={currentExp}
            onChange={(e) => setCurrentExp(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>{targetLabel}:</label>
          <input
            type="number"
            value={targetLevel}
            onChange={(e) => setTargetLevel(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Daily Exp (Optional):</label>
          <input
            type="number"
            value={dailyExp}
            onChange={(e) => setDailyExp(e.target.value)}
          />
        </div>
        <button className="calc-button" type="submit">
          Calculate
        </button>
      </form>
      {result && (
        <div className="result">
          <p>{result}</p>
          {daysResult && <p>{daysResult}</p>}
        </div>
      )}
      <style jsx>{`
        button {
          background-color: ${buttonBgColor};
          padding: 0.75rem;
          font-size: 1rem;
          font-family: "Montserrat", sans-serif;
          font-weight: bold;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          color: #121212;
        }
        button:hover {
          background-color: ${buttonHoverColor};
        }
        /* Responsive adjustments for the calculator container */
        @media (max-width: 990px) {
          .calculator-container {
            margin: 1rem auto;
            padding: 1rem;
            width: 90%;
          }
          .calculator-form {
            gap: 0.75rem;
          }
          .form-group input {
            font-size: 0.9rem;
            padding: 0.4rem;
          }
          button {
            padding: 0.65rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}
