// pages/_app.js
import { globalStyles } from "../styles/GlobalStyles";
import SEO from "../components/SEO";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SEO />
      <Component {...pageProps} />
      <style jsx global>
        {globalStyles}
      </style>
    </>
  );
}

export default MyApp;
