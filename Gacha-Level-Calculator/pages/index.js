// pages/index.js
import Layout from "../components/Layout";
import GameButton from "../components/GameButton";

export default function Home() {
  const games = [
    {
      name: "Genshin Impact",
      image: "/images/genshin-impact.webp",
      link: "/genshin-impact",
    },
    {
      name: "Honkai: Star Rail",
      image: "/images/honkai-star-rail.webp",
      link: "/star-rail",
    },
    {
      name: "Wuthering Waves",
      image: "/images/wuthering-waves.webp",
      link: "/wuthering-waves",
    },
    {
      name: "Zenless Zone Zero",
      image: "/images/zenless-zone-zero.webp",
      link: "/zenless-zone-zero",
    },
  ];

  return (
    <Layout>
      <div className="home-content">
        <div className="game-list">
          {games.map((game) => (
            <GameButton key={game.name} game={game} />
          ))}
        </div>
      </div>
      <style jsx>{`
        .home-content {
          text-align: center;
          padding: 2rem;
        }
        .game-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 2rem;
          align-items: center;
        }
        @media (min-width: 768px) {
          .game-list {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
          }
          .game-list > :global(.game-button) {
            flex: 1 1 calc(50% - 1rem);
            margin: 0.5rem;
          }
        }
      `}</style>
    </Layout>
  );
}
