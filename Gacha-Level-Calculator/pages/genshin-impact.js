// pages/genshin-impact.js
import { useState } from "react";
import Layout from "../components/Layout";
import { validateInput, calculateXp } from "../utils/xpCalculator";

// Genshin Impact Adventure Rank XP data (level, base XP)
const genshinXpData = [
    [1, 0], [2, 375], [3, 875], [4, 1500], [5, 2225], [6, 3075], [7, 4025], [8, 5100], [9, 6300], [10, 7600], [11, 9025], [12, 10550], [13, 12200], [14, 13975], [15, 15850], [16, 17850], [17, 20225], [18, 22725], [19, 25350], [20, 28125], [21, 30950], [22, 34375], [23, 38100], [24, 42100], [25, 46400], [26, 50975], [27, 55850], [28, 61000], [29, 66450], [30, 72175], [31, 78200], [32, 84500], [33, 91100], [34, 98000], [35, 105175], [36, 112650], [37, 120400], [38, 128450], [39, 136775], [40, 145400], [41, 155950], [42, 167475], [43, 179950], [44, 193400], [45, 207800], [46, 223150], [47, 239475], [48, 256750], [49, 275000], [50, 294200], [51, 320600], [52, 349400], [53, 380600], [54, 414200], [55, 450200], [56, 682550], [57, 941500], [58, 1227250], [59, 1540075], [60, 1880200]
];

export default function GenshinImpactCalculator() {
    const [currentLevel, setCurrentLevel] = useState("");
    const [currentXp, setCurrentXp] = useState("");
    const [targetLevel, setTargetLevel] = useState("");
    const [dailyExp, setDailyExp] = useState("");
    const [result, setResult] = useState("");
    const [daysResult, setDaysResult] = useState("");

    const handleCalculate = (e) => {
        e.preventDefault();

        const currentLevelNum = parseInt(currentLevel, 10);
        const currentXpNum = parseInt(currentXp, 10) || 0;
        const targetLevelNum = parseInt(targetLevel, 10);
        const dailyExpNum = parseFloat(dailyExp) || null;

        // Validate input using our reusable function.
        if (
            !validateInput({
                currentLevel: currentLevelNum,
                currentXp: currentXpNum,
                targetLevel: targetLevelNum,
                xpData: genshinXpData,
            })
        ) {
            alert(
                "Please enter valid input values. Ensure the current level is at least 1, current Exp is non-negative, and target Adventure Rank is greater than current rank (maximum is 60)."
            );
            return;
        }

        // Calculate XP requirements.
        const xpResult = calculateXp({
            xpData: genshinXpData,
            currentLevel: currentLevelNum,
            currentXp: currentXpNum,
            targetLevel: targetLevelNum,
        });

        if (!xpResult.reached) {
            setResult(
                `You need ${xpResult.xpNeeded} XP to reach Adventure Rank ${targetLevelNum}. Keep exploring!`
            );
            if (dailyExpNum) {
                const days = xpResult.xpNeeded / dailyExpNum;
                setDaysResult(`Days to reach milestone: ${days.toFixed(2)}`);
            } else {
                setDaysResult("");
            }
        } else {
            setResult(
                `Congratulations! You are at Adventure Rank ${
                    xpResult.currentCalculatedLevel
                }. You need ${xpResult.xpToNext} Exp to reach Adventure Rank ${
                    xpResult.currentCalculatedLevel + 1
                }. Keep up the grind!`
            );
            setDaysResult("");
        }
    };

    return (
        <Layout>
            <div className="calculator-container">
                <h1>Genshin Impact Calculator</h1>
                <form onSubmit={handleCalculate} className="calculator-form">
                    <div className="form-group">
                        <label>Current Adventure Rank:</label>
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
                            value={currentXp}
                            onChange={(e) => setCurrentXp(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Target Adventure Rank:</label>
                        <input
                            type="number"
                            value={targetLevel}
                            onChange={(e) => setTargetLevel(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Daily XP (Optional):</label>
                        <input
                            type="number"
                            value={dailyExp}
                            onChange={(e) => setDailyExp(e.target.value)}
                        />
                    </div>
                    <button className="calc-button" type="submit">Calculate</button>
                </form>
                {result && (
                    <div className="result">
                        <p>{result}</p>
                        {daysResult && <p>{daysResult}</p>}
                    </div>
                )}
            </div>
            <style jsx>{`
                .calculator-container {
                    padding: 2rem;
                    max-width: 600px;
                    margin: 2rem auto;
                    background: #1a1a1a;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                    text-align: center;
                }
                h1 {
                    margin-bottom: 1.5rem;
                }
                .calculator-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                    text-align: left;
                }
                label {
                    margin-bottom: 0.5rem;
                    font-weight: bold;
                }
                input {
                    padding: 0.5rem;
                    font-size: 1rem;
                    border: 1px solid #444;
                    border-radius: 4px;
                    background: #2a2a2a;
                    color: #e0e0e0;
                }
                button {
                    padding: 0.75rem;
                    font-size: 1rem;
                    font-family: "Montserrat", sans-serif;
                    font-weight: bold;
                    background-color:rgb(134, 205, 252);
                    color: #121212;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }
                button:hover {
                    background-color:rgb(101, 171, 211);
                }
                .result {
                    margin-top: 2rem;
                    padding: 1rem;
                    background-color: #2a2a2a;
                    border-radius: 4px;
                    text-align: center;
                }
            `}</style>
        </Layout>
    );
}
