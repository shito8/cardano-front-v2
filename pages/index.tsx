import Head from "next/head";
import WrapUnwrap from "../components/home/WrapUnwrap";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../components/GlobalContext";

export default function Home() {

  const { darkMode, setDarkMode } = useContext(GlobalContext);

  useEffect(() => {
    const body = document.body;
    const themeMode = localStorage.getItem("themeMode");
    if (themeMode !== null) {
      const theme = JSON.parse(themeMode);
      if (theme.dark) {
        setDarkMode(true);
        body.classList.add("dark");
      } else {
        setDarkMode(false);
        body.classList.remove("dark");
      }
    } else{
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setDarkMode(mediaQuery.matches);
      const theme = { theme: "system", dark: mediaQuery.matches };
      localStorage.setItem("themeMode", JSON.stringify(theme));
    }
  }, [setDarkMode, darkMode]);

  return (
    <>
      <Head>
        <title>Wrapping | anetaBTC</title>
          <meta name="description" content="A protocol to unlock the value of Bitcoin on Ergo and Cardano" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
          <link rel="shortcut icon" href="/favicon.ico"/>
          <link rel="manifest" href="/site.webmanifest"/>
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#9BD9F2"/>
          <meta name="msapplication-TileColor" content="#9bd9f2"/>
          <meta name="theme-color" content="#ffffff"/>
      </Head>
      <main>
        <WrapUnwrap />
      </main>
    </>
  );
}
