// components/Footer.js
export default function Footer() {
  return (
    <footer>
      <p>
        Made with ❤️ by{" "}
        <a
          href="https://github.com/Exonymos"
          target="_blank"
          rel="noopener noreferrer"
        >
          Exonymos
        </a>
      </p>
      <style jsx>{`
        footer {
          background: #1f1f1f;
          padding: 1rem;
          color: #e0e0e0;
          text-align: center;
          margin-top: 2rem;
        }
        p {
          margin: 0;
          font-size: 0.9rem;
        }
      `}</style>
    </footer>
  );
}
