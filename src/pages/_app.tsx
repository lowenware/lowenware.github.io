/* eslint-disable no-restricted-imports */
import "../globals.css";

import type {AppProps} from "next/app";

function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
