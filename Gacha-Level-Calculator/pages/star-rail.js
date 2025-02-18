// pages/star-rail.js
import Layout from "../components/Layout";
import CalculatorForm from "../components/CalculatorForm";
import SEO from "../components/SEO";

const starrailXpData = [
  [1, 0], [2, 450], [3, 950], [4, 1500], [5, 2110], [6, 2780], [7, 3500], [8, 4280], [9, 5120], [10, 6020], [11, 6980], [12, 8000], [13, 9070], [14, 10200], [15, 11390], [16, 12640], [17, 13950], [18, 15320], [19, 16750], [20, 18250], [21, 19850], [22, 21560], [23, 23390], [24, 25340], [25, 27420], [26, 29630], [27, 31980], [28, 34460], [29, 37080], [30, 39830], [31, 42680], [32, 45640], [33, 48720], [34, 51920], [35, 55250], [36, 58710], [37, 62310], [38, 66040], [39, 69910], [40, 73910], [41, 78050], [42, 82330], [43, 86760], [44, 91330], [45, 96040], [46, 100900], [47, 105900], [48, 111050], [49, 116350], [50, 121790], [51, 127490], [52, 133640], [53, 140270], [54, 147400], [55, 155040], [56, 163210], [57, 171910], [58, 181140], [59, 190920], [60, 201250], [61, 221550], [62, 243330], [63, 266680], [64, 291650], [65, 318280], [66, 383350], [67, 452160], [68, 524650], [69, 600770], [70, 680480]
];

export default function StarrailCalculator() {
  const generateFailureMessage = (xpNeeded, targetLevel) =>
    `You need ${xpNeeded} exp to reach TL ${targetLevel}. Keep progressing!`;

  const generateSuccessMessage = (currentCalculatedLevel, xpToNext) =>
    `Congratulations! You are at TL ${currentCalculatedLevel}. You need ${xpToNext} exp to reach TL ${
      currentCalculatedLevel + 1
    }. Keep on running!`;

  return (
    <Layout>
      <SEO
        title="Honkai: Star Rail Exp Calculator"
        description="Calculate the required exp for leveling up in Honkai: Star Rail."
        image="images/honkai-star-rail.webp"
      />
      <CalculatorForm
        title="Honkai: Star Rail Calculator"
        xpData={starrailXpData}
        levelLabel="Current Trailblaze Level"
        targetLabel="Target Trailblaze Level"
        localStorageKey="starrailCalculator"
        generateFailureMessage={generateFailureMessage}
        generateSuccessMessage={generateSuccessMessage}
        buttonBgColor="#ece1cf"
        buttonHoverColor="#e8bb73"
      />
    </Layout>
  );
}
