// components/Layout.js
import Header from "./Header";
import Footer from "./Footer";
import Container from "./Container";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <main>
        <Container>{children}</Container>
      </main>
      <Footer />
    </div>
  );
}
