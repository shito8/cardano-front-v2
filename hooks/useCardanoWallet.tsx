import { Cip30Wallet } from "@cardano-sdk/cip30";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../components/GlobalContext";
import { doesAddressMatchNetwork, shortenAddress } from "../utils/address";
import { CONSTANTS } from "../utils/constants";
import { useTryCatch } from "./useTryCatch";

export default function useCardanoWallet() {
  const globalContext = useContext(GlobalContext);
  const { tryWithErrorHandler } = useTryCatch();

  const [walletAddress, setWalletAddress] = useState(
    CONSTANTS.STRINGS.wallet_connecting
  );

  async function updateWalletAddress() {
    const { walletApi, lucid, config } = globalContext;
    if (walletApi && lucid) {
      lucid.selectWallet(walletApi as any);
      const address = await lucid.wallet.address();
      setWalletAddress(
        doesAddressMatchNetwork(address, config.network)
          ? shortenAddress(address)
          : CONSTANTS.STRINGS.wrong_network
      );
    }
  }
  useEffect(() => {
    updateWalletAddress();
  }, [globalContext.walletApi, globalContext.lucid]);

  async function connectWallet(cardanoWalletName: string) {
    await tryWithErrorHandler(async () => {
      if (!window.cardano) {
        throw new Error(CONSTANTS.STRINGS.no_cardano_wallet);
      }

      const cardanoWallet = window.cardano[
        cardanoWalletName.toLowerCase()
      ] as unknown as Cip30Wallet;
      const walletApi = await cardanoWallet.enable();

      globalContext.setWalletMeta(cardanoWallet);
      globalContext.setWalletApi(walletApi);
      localStorage.setItem(
        CONSTANTS.LOCAL_STORAGE_KEYS.WALLET,
        cardanoWalletName
      );
    });
  }

  async function disconnectWallet() {
    globalContext.setWalletMeta(null);
    globalContext.setWalletApi(null);
    localStorage.removeItem(CONSTANTS.LOCAL_STORAGE_KEYS.WALLET);
  }

  return {
    connectWallet,
    disconnectWallet,
    walletApi: globalContext.walletApi,
    walletMeta: globalContext.walletMeta,
    walletAddress,
  };
}
