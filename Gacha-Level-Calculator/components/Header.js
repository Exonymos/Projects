// components/Header.js
import { useRouter } from "next/router";

export default function Header() {
    const router = useRouter();

    const handleBack = () => {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.push("/");
        }
    };

    return (
        <header>
            <button
                className="back-button"
                onClick={handleBack}
                aria-label="Go Back"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416zM128 256c0-6.7 2.8-13 7.7-17.6l112-104c7-6.5 17.2-8.2 25.9-4.4s14.4 12.5 14.4 22l0 208c0 9.5-5.7 18.2-14.4 22s-18.9 2.1-25.9-4.4l-112-104c-4.9-4.5-7.7-10.9-7.7-17.6z" />
                </svg>
            </button>
            <nav>
                <h1>Gacha Calculator Hub</h1>
            </nav>
            <style jsx>{`
                header {
                    background: #1f1f1f;
                    padding: 1rem;
                    color: #e0e0e0;
                    display: flex;
                    align-items: center;
                }
                .back-button {
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    color: #e0e0e0;
                    padding: 0;
                    margin-right: 1rem;
                }
                .back-button svg {
                    width: 24px;
                    height: 24px;
                    fill: currentColor;
                }
                nav {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                }
                h1 {
                    font-family: "Montserrat", sans-serif;
                    font-weight: 700;
                    font-size: 2rem;
                    margin: 0;
                }
            `}</style>
        </header>
    );
}
