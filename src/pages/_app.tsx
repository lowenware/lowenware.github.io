/* This page will configure global CSS styles and shared code between pages
 * for more info please visit:
 * https://nextjs.org/docs/advanced-features/custom-app
 * https://nextjs.org/docs/basic-features/typescript#custom-app
 */

import { useRouter } from "next/router";
import Head from "next/head";
import React, { useEffect } from "react";
import type { AppProps } from "next/app";

import "src/styles/main.scss";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    doScroll("auto");
    window.onhashchange = () => {
      scrollToHash(window.location.hash, "auto");
    };
    router.events.on("hashChangeComplete", () => {
      doScroll("smooth");
    });
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="google" content="notranslate" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta charSet="utf-8" />
        <meta name="author" content="Löwenware.s.r.o" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

function doScroll(behavior: "auto" | "smooth") {
  const hash = window.location.hash;
  if (hash) {
    scrollToHash(hash, behavior);
  } else {
    scroll({ left: 0, top: 0, behavior });
  }
}

function scrollToHash(hash: string, behavior: "auto" | "smooth") {
  if (hash) {
    const element = document.getElementById(hash);
    if (element) {
      const navbar = document.getElementById("navbar");
      if (navbar) {
        const yOffset = navbar.getBoundingClientRect().height;
        scrollIntoViewOffset(element, -yOffset, behavior);
      } else {
        element.scrollIntoView({ behavior });
      }
    }
  }
}

function scrollIntoViewOffset(element: HTMLElement, yOffset: number, behavior: "auto" | "smooth") {
  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({ top: y, behavior });
}
