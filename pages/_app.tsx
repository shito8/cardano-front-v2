import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import GlobalContextProvider from "../components/GlobalContext";
//import KYA from "../components/home/KYA";
import Init from "../components/Init";
import Modal from "../components/Modal";
import Leftbar from "../components/partials/Leftbar";
import Navbar from "../components/partials/Navbar";
import "../styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  const [showKya, setShowKya] = useState<boolean>(true);

  return (
    <div>
      <GlobalContextProvider>
        <Init>
          <Modal></Modal>
          <Navbar />
          {/* <KYA isOpen={showKya} setIsOpen={setShowKya} /> */}
          <Component {...pageProps} />
          <Leftbar />
        </Init>
      </GlobalContextProvider>
    </div>
  );
}
