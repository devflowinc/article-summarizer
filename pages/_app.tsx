import type { AppProps } from "next/app";
import Script from "next/script";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Script defer data-domain="summary.arguflow.gg" src="https://example.com/script.js" />
    </>
  );
}

export default MyApp;
