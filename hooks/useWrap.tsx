import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../components/GlobalContext";
import { useTryCatch } from "./useTryCatch";

export enum WrapStage {
  NotStarted,
  Pending,
  Sent,
}

export default function useWrap() {
  const { config, walletApi } = useContext(GlobalContext);
  const wrapFeeBtc = config.wrapFeeBtc;
  const wrapDepositAddress = config.btcWrapAddress;

  const { tryWithErrorHandler } = useTryCatch();

  const [amount, setAmount] = useState<string>("");
  const [bridgeFee, setBridgeFee] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [wrapStage, setWrapStage] = useState<WrapStage>(WrapStage.NotStarted);
  const [btcToBeReceived, setBtcToBeReceived] = useState(0);

  useEffect(() => {
    const fee = wrapFeeBtc / 100 * Number(amount);
    setBridgeFee(fee);
    setBtcToBeReceived(Number(amount) - fee);
  }, [wrapFeeBtc, amount]);

  const wrap = async () => {
    await tryWithErrorHandler(() => {
      setIsLoading(true);  
      setTimeout(()=>{
        setWrapStage(WrapStage.Pending);
        setIsLoading(false);
      },2000);
    });
  };

  return {
    amount,
    setAmount,
    wrapFeeBtc,
    bridgeFee,
    btcToBeReceived,
    wrapDepositAddress,
    wrap,
    isLoading,
    wrapStage,
    setWrapStage,
  };
}
