import Image from "next/image";
import Link from "next/link";
import { useState, useContext } from "react";

import useCardanoWallet from "../../hooks/useCardanoWallet";
import styles from "../../styles/navbar.module.scss"
import ConnectWallet from "./navbar/ConnectWallet";
import LoggedInWallet from "./navbar/LoggedInWallet";

import { GlobalContext } from "../GlobalContext";
import SelectNetwork from "./navbar/SelectNetwork";
import Setting from "./navbar/Setting";

const Navbar = () => {
  const [isWalletShowing, setIsWalletShowing] = useState(false);

  const { walletMeta, disconnectWallet } = useCardanoWallet();

  const { darkMode } = useContext(GlobalContext);

  const [openSetting, setOpenSetting] = useState(false);
  const [display, setDisplay] = useState(false);

  const handleClickSetting = () =>{
    if(display){
        setOpenSetting(false)
        setTimeout(()=>{
            setDisplay(false)
        },500);
    }else{
        setDisplay(true)
        setTimeout(()=>{
            setOpenSetting(true)
        },50);
    }
   
}



  return (
    <header className={styles.main}>
      <Link href="/" className={styles.logo}>
        {
          darkMode ? (
          <Image src="/images/logo/logo_dark.png" alt="logo aneta" width={146} height={30} priority></Image>
          ):(
            <Image src="/images/logo/logo.png" alt="logo aneta" width={146} height={30} priority></Image>
          )
        }
      </Link>
      
      <section className={styles.nav}>
        <SelectNetwork />

        {walletMeta ? (
            <LoggedInWallet
              disconnectWallet={disconnectWallet}
              walletMeta={walletMeta}
            />
          ) : (
            <button
              onClick={() =>
                isWalletShowing
                  ? setIsWalletShowing(false)
                  : setIsWalletShowing(true)
              }
              className={styles.connectWallet}
            >
              <p>Connect Wallet</p>
              
            </button>
          )}
          <ConnectWallet
            isOpen={isWalletShowing}
            setIsOpen={setIsWalletShowing}
          />

        <div className={`${styles.setting}`} id="setting">
          <svg width="20" height="20" id="icon" onClick={handleClickSetting}>
            <use href="/images/icons/gear.svg#icon"></use>
          </svg>
          {openSetting && (
            <Setting
              openSetting={openSetting}
              setOpenSetting={setOpenSetting}
              display={display}
              setDisplay={setDisplay}
            />
          )}
        </div>



      </section>
    </header>
  );
};

export default Navbar;
