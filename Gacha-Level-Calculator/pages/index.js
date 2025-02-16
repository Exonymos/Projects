import Layout from "../components/Layout";
import GameButton from "../components/GameButton";

export default function Home() {
    // Define a list of games. Add more games as needed.
    const games = [
        {
            name: "Genshin Impact",
            image: "/genshin-impact.webp",
            link: "/genshin-impact",
        },
        {
            name: "Wuthering Waves",
            image: "/wuthering-waves.webp",
            link: "/wuthering-waves",
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
            `}</style>
        </Layout>
    );
}
