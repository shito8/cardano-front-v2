import { Cip30Wallet } from "@cardano-sdk/cip30";
import { useEffect, useState } from "react";
import useCardanoWallet from "../../../hooks/useCardanoWallet";
import styles from "../../../styles/connectWallet.module.scss"
import { CONSTANTS } from "../../../utils/constants";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const ConnectWallet = ({ isOpen, setIsOpen }: Props) => {
  const { connectWallet } = useCardanoWallet();
  const [cardanoWallets, setCardanoWallets] = useState<Cip30Wallet[]>([]);

  const handleConnectWallet = (cardanoWalletName: string) => {
    setIsOpen(false);
    connectWallet(cardanoWalletName);
  };

  useEffect(() => {
    const cardano = window.cardano;
    if (cardano == null) {
      return;
    }
    setCardanoWallets(
      CONSTANTS.CARDANO_WALLETS.map((walletKey) => cardano[walletKey]) as any
    );
  }, []);
  
  useEffect(() => {
    if(isOpen){
      const handleClickOutside = (e: PointerEvent) => {
        const target = e.target as HTMLElement;
        if(!target.closest(`.${styles.main}`)){
          setIsOpen(false);
        }
      }
      document.addEventListener('pointerdown', handleClickOutside);
      return () => document.removeEventListener('pointerdown', handleClickOutside);
    }

},[isOpen, setIsOpen])

  return (
    <>
      {
        isOpen && 
        <div className={styles.walletPopup}>
          <section className={styles.main}>
            <div className={styles.popUp}>
              <header className={styles.header}>
                <p>Connect wallet</p>
                  <svg width="20" height="20" id="icon" onClick={() => setIsOpen(false)}>
                    <use href="/images/icons/x.svg#icon"></use>
                  </svg>
              </header>
              <div className={styles.walletsList}>
              {cardanoWallets.map((wallet: Cip30Wallet, i: number) =>
                      wallet?.name && wallet?.icon ? (
                        <div
                          key={i}
                          onClick={() => handleConnectWallet(wallet.name)}
                          className={styles.item}
                        >
                          <div className={styles.name}>
                            <h2>{wallet.name}</h2>
                          </div>
                          <Image
                            src={wallet.icon}
                            alt={wallet.name}
                            width={40}
                            height={40}
                          />
                        </div>
                      ) : null
                )}
              </div>
            </div>
          </section>
        </div>
      }
    </>
  );
};

export default ConnectWallet;
