// pages/wuthering-waves.js
import { useState } from "react";
import Layout from "../components/Layout";
import { validateInput, calculateXp } from "../utils/xpCalculator";

const wutheringXpData = [
    [1, 0], [2, 400], [3, 900], [4, 1500], [5, 2600], [6, 3800], [7, 5100], [8, 6500], [9, 8000], [10, 9600], [11, 11200], [12, 12850], [13, 14500], [14, 16200], [15, 17900], [16, 19600], [17, 21350], [18, 23100], [19, 24900], [20, 26700], [21, 29000], [22, 31400], [23, 33900], [24, 36400], [25, 38900], [26, 41600], [27, 44500], [28, 47500], [29, 50700], [30, 54100], [31, 60600], [32, 67300], [33, 74100], [34, 81300], [35, 88900], [36, 96900], [37, 105300], [38, 114300], [39, 123900], [40, 133900], [41, 144100], [42, 154500], [43, 165100], [44, 175900], [45, 187100], [46, 198700], [47, 210700], [48, 223100], [49, 235900], [50, 248900], [51, 262000], [52, 275300], [53, 288800], [54, 302500], [55, 316400], [56, 330500], [57, 344800], [58, 359300], [59, 374000], [60, 389700], [61, 411300], [62, 433200], [63, 455500], [64, 478500], [65, 502300], [66, 527000], [67, 553100], [68, 580600], [69, 610000], [70, 639400], [71, 671800], [72, 704600], [73, 738100], [74, 772600], [75, 808200], [76, 845400], [77, 884500], [78, 925800], [79, 969900], [80, 1017200]
];

export default function WutheringWavesCalculator() {
    const [currentLevel, setCurrentLevel] = useState("");
    const [currentXp, setCurrentXp] = useState("");
    const [targetLevel, setTargetLevel] = useState("");
    const [dailyXp, setDailyXp] = useState("");
    const [result, setResult] = useState("");
    const [daysResult, setDaysResult] = useState("");

    const handleCalculate = (e) => {
        e.preventDefault();

        const currentLevelNum = parseInt(currentLevel, 10);
        const currentXpNum = parseInt(currentXp, 10) || 0;
        const targetLevelNum = parseInt(targetLevel, 10);
        const dailyXpNum = parseFloat(dailyXp) || null;

        // Validate input using our reusable function.
        if (
            !validateInput({
                currentLevel: currentLevelNum,
                currentXp: currentXpNum,
                targetLevel: targetLevelNum,
                xpData: wutheringXpData,
            })
        ) {
            alert(
                "Please enter valid input values. Ensure the current Union Level is at least 1, current Exp is non-negative, and target Union Level is greater than current level (maximum is 80)."
            );
            return;
        }

        // Calculate XP requirements.
        const xpResult = calculateXp({
            xpData: wutheringXpData,
            currentLevel: currentLevelNum,
            currentXp: currentXpNum,
            targetLevel: targetLevelNum,
        });

        if (!xpResult.reached) {
            setResult(
                `You need ${xpResult.xpNeeded} Exp to reach Union Level ${targetLevelNum}. Keep pushing forward!`
            );
            if (dailyXpNum) {
                const days = xpResult.xpNeeded / dailyXpNum;
                setDaysResult(`Days to reach milestone: ${days.toFixed(2)}`);
            } else {
                setDaysResult("");
            }
        } else {
            setResult(
                `Congratulations! You are at Union Level ${xpResult.currentCalculatedLevel
                }. You need ${xpResult.xpToNext} Exp to reach Union Level ${xpResult.currentCalculatedLevel + 1
                }. Keep up the grind!`
            );
            setDaysResult("");
        }
    };

    return (
        <Layout>
            <div className="calculator-container">
                <h1>Wuthering Waves Calculator</h1>
                <form onSubmit={handleCalculate} className="calculator-form">
                    <div className="form-group">
                        <label>Current Union Level:</label>
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
                        <label>Target Union Level:</label>
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
                            value={dailyXp}
                            onChange={(e) => setDailyXp(e.target.value)}
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
                    background-color:rgb(134, 148, 252);
                    color: #121212;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }
                button:hover {
                    background-color:rgb(101, 117, 211);
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
