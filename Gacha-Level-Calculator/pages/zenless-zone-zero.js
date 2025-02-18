// pages/zenless-zone-zero.js
import Layout from "../components/Layout";
import CalculatorForm from "../components/CalculatorForm";
import SEO from "../components/SEO";

const zenlessXpData = [
  [1, 0], [2, 245], [3, 565], [4, 965], [5, 1440], [6, 1995], [7, 2630], [8, 3340], [9, 4130], [10, 5000], [11, 5950], [12, 6975], [13, 8080], [14, 9265], [15, 10525], [16, 11865], [17, 13280], [18, 14775], [19, 16350], [20, 18000], [21, 20165], [22, 22760], [23, 25785], [24, 29240], [25, 33125], [26, 37440], [27, 42185], [28, 47360], [29, 52965], [30, 59000], [31, 65465], [32, 72360], [33, 79685], [34, 87440], [35, 95625], [36, 104240], [37, 113285], [38, 122760], [39, 132665], [40, 143000], [41, 153820], [42, 165120], [43, 176900], [44, 189160], [45, 201900], [46, 215125], [47, 228830], [48, 243015], [49, 257680], [50, 272825], [51, 307825], [52, 356090], [53, 417615], [54, 492405], [55, 580455], [56, 730455], [57, 912035], [58, 1125200], [59, 1369945], [60, 1646270]
];

export default function ZenlessCalculator() {
  const generateFailureMessage = (xpNeeded, targetLevel) =>
    `You need ${xpNeeded} exp to reach IK ${targetLevel}. Keep dodging!`;

  const generateSuccessMessage = (currentCalculatedLevel, xpToNext) =>
    `Congratulations! You are at IK ${currentCalculatedLevel}. You need ${xpToNext} exp to reach IK ${
      currentCalculatedLevel + 1
    }. Keep on puzzling!`;

  return (
    <Layout>
      <SEO
        title="Zenless Zone Zero Exp Calculator"
        description="Calculate the required exp for leveling up in Zenless Zone Zero."
      />
      <CalculatorForm
        title="Zenless Zone Zero Calculator"
        xpData={zenlessXpData}
        levelLabel="Current Inter-Knot Level"
        targetLabel="Target Inter-Knot Level"
        localStorageKey="zenlessCalculator"
        generateFailureMessage={generateFailureMessage}
        generateSuccessMessage={generateSuccessMessage}
        buttonBgColor="#95c0e6"
        buttonHoverColor="#508dc3"
      />
    </Layout>
  );
}
