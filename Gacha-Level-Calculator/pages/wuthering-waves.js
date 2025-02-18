// pages/wuthering-waves.js
import Layout from "../components/Layout";
import CalculatorForm from "../components/CalculatorForm";
import SEO from "../components/SEO";

const wutheringXpData = [
  [1, 0], [2, 400], [3, 900], [4, 1500], [5, 2600], [6, 3800], [7, 5100], [8, 6500], [9, 8000], [10, 9600], [11, 11200], [12, 12850], [13, 14500], [14, 16200], [15, 17900], [16, 19600], [17, 21350], [18, 23100], [19, 24900], [20, 26700], [21, 29000], [22, 31400], [23, 33900], [24, 36400], [25, 38900], [26, 41600], [27, 44500], [28, 47500], [29, 50700], [30, 54100], [31, 60600], [32, 67300], [33, 74100], [34, 81300], [35, 88900], [36, 96900], [37, 105300], [38, 114300], [39, 123900], [40, 133900], [41, 144100], [42, 154500], [43, 165100], [44, 175900], [45, 187100], [46, 198700], [47, 210700], [48, 223100], [49, 235900], [50, 248900], [51, 262000], [52, 275300], [53, 288800], [54, 302500], [55, 316400], [56, 330500], [57, 344800], [58, 359300], [59, 374000], [60, 389700], [61, 411300], [62, 433200], [63, 455500], [64, 478500], [65, 502300], [66, 527000], [67, 553100], [68, 580600], [69, 610000], [70, 639400], [71, 671800], [72, 704600], [73, 738100], [74, 772600], [75, 808200], [76, 845400], [77, 884500], [78, 925800], [79, 969900], [80, 1017200]
];

export default function WutheringWavesCalculator() {
  const generateFailureMessage = (xpNeeded, targetLevel) =>
    `You need ${xpNeeded} exp to reach UL ${targetLevel}. Keep fighting!`;

  const generateSuccessMessage = (currentCalculatedLevel, xpToNext) =>
    `Congratulations! You are at UL ${currentCalculatedLevel}. You need ${xpToNext} exp to reach UL ${
      currentCalculatedLevel + 1
    }. Keep up the grind!`;

  return (
    <Layout>
      <SEO
        title="Wuthering Waves Exp Calculator"
        description="Calculate the required exp for leveling up in Wuthering Waves."
      />
      <CalculatorForm
        title="Wuthering Waves Calculator"
        xpData={wutheringXpData}
        levelLabel="Current Union Level"
        targetLabel="Target Union Level"
        localStorageKey="wutheringCalculator"
        generateFailureMessage={generateFailureMessage}
        generateSuccessMessage={generateSuccessMessage}
        buttonBgColor="#95c0e6"
        buttonHoverColor="#508dc3"
      />
    </Layout>
  );
}
