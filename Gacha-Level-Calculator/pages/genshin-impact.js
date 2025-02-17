// pages/genshin-impact.js
import Layout from "../components/Layout";
import CalculatorForm from "../components/CalculatorForm";

const genshinXpData = [
  [1, 0], [2, 375], [3, 875], [4, 1500], [5, 2225], [6, 3075], [7, 4025], [8, 5100], [9, 6300], [10, 7600], [11, 9025], [12, 10550], [13, 12200], [14, 13975], [15, 15850], [16, 17850], [17, 20225], [18, 22725], [19, 25350], [20, 28125], [21, 30950], [22, 34375], [23, 38100], [24, 42100], [25, 46400], [26, 50975], [27, 55850], [28, 61000], [29, 66450], [30, 72175], [31, 78200], [32, 84500], [33, 91100], [34, 98000], [35, 105175], [36, 112650], [37, 120400], [38, 128450], [39, 136775], [40, 145400], [41, 155950], [42, 167475], [43, 179950], [44, 193400], [45, 207800], [46, 223150], [47, 239475], [48, 256750], [49, 275000], [50, 294200], [51, 320600], [52, 349400], [53, 380600], [54, 414200], [55, 450200], [56, 682550], [57, 941500], [58, 1227250], [59, 1540075], [60, 1880200]
];

export default function GenshinImpactCalculator() {
  const generateFailureMessage = (xpNeeded, targetLevel) =>
    `You need ${xpNeeded} exp to reach AR ${targetLevel}. Keep exploring!`;

  const generateSuccessMessage = (currentCalculatedLevel, xpToNext) =>
    `Congratulations! You are at AR ${currentCalculatedLevel}. You need ${xpToNext} exp to reach AR ${
      currentCalculatedLevel + 1
    }. Keep on farming!`;

  return (
    <Layout>
      <CalculatorForm
        title="Genshin Impact Calculator"
        xpData={genshinXpData}
        levelLabel="Current Adventure Rank"
        targetLabel="Target Adventure Rank"
        localStorageKey="genshinCalculator"
        generateFailureMessage={generateFailureMessage}
        generateSuccessMessage={generateSuccessMessage}
        buttonBgColor="#d3d6e7"
        buttonHoverColor="#8e99dd"
      />
    </Layout>
  );
}
