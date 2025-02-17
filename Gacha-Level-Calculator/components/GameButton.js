// components/GameButton.js
import Link from "next/link";

export default function GameButton({ game }) {
  return (
    <Link legacyBehavior href={game.link}>
      <a className="game-button">
        <div className="image-wrapper">
          <img src={game.image} alt={game.name} />
        </div>
        <div className="overlay">
          <h2>{game.name}</h2>
        </div>
        <style jsx>{`
          .game-button {
            position: relative;
            display: block;
            overflow: hidden;
            border-radius: 8px;
            text-decoration: none;
            color: #e0e0e0;
            width: 100%;
            max-width: 450px;
            height: 200px;
            margin: 0 auto;
          }
          .image-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
          .image-wrapper img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: brightness(70%);
            transition: transform 0.3s ease;
          }
          .game-button:hover .image-wrapper img {
            transform: scale(1.05);
          }
          .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1;
          }
          h2 {
            font-size: 1.5rem;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
            margin: 0;
          }
          /* Responsive adjustments */
          @media (max-width: 990px) {
            .game-button {
              max-width: 100%;
              height: 150px;
            }
            h2 {
              font-size: 1.2rem;
            }
          }
        `}</style>
      </a>
    </Link>
  );
}
