import Script from "next/script";
import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Script defer data-domain="summary.arguflow.gg" src="https://perhaps.arguflow.com/js/script.js" />
    </>
  );
}

export default MyApp;
