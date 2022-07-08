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
    </Html>
  );
}

export default MyDocument;
