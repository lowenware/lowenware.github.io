import {Head, Html, Main, NextScript} from "next/document";

function MyDocument() {
  return (
    <Html>
      <Head>
        <link rel="shortcut icon" href={"/static/lowenware-logo.svg"} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
      <script async src="https://www.w3counter.com/tracker.js?id=127316"></script>
    </Html>
  );
}

export default MyDocument;
