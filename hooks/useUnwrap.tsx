import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../components/GlobalContext";
import useLucid from "./useLucid";
import { useTryCatch } from "./useTryCatch";
import { validate } from 'multicoin-address-validator';

export enum UnwrapStage {
  NotStart,
  Success,
}

export default function useUnwrap() {
  const { config } = useContext(GlobalContext);
  const unwrapFeeBtc = config.unwrapFeeBtc;
  const unwrapFeeCardano = config.unwrapFeeCardano;

  const { tryWithErrorHandler } = useTryCatch();
  const { unwrap: lucidUnwrap } = useLucid();

  const [amount, setAmount] = useState<string>("");
  const [unwrapBtcDestination, setUnwrapBtcDestination] = useState("");
  const [bridgeFee, setBridgeFee] = useState(0);
  const [btcToBeReceived, setBtcToBeReceived] = useState(0);
  const [isTxSuccessful, setIsTxSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [unwrapStage, setUnwrapStage] = useState<UnwrapStage>(
    UnwrapStage.NotStart
  );

  useEffect(() => {
    const fee = unwrapFeeBtc / 100 * Number(amount);
    setBridgeFee(fee);
    setBtcToBeReceived(Number(amount) - fee);
  }, [unwrapFeeBtc, amount]);

  const unwrap = async () => {
    const validAdrres = validate(unwrapBtcDestination, 'BTC', 'testnet');
    await tryWithErrorHandler(async () => {
      setIsLoading(true);
      if (!validAdrres) {
        setIsLoading(false);
        throw new Error(
          "Please enter a valid BTC Destination Address"
        );
      }

      await lucidUnwrap({
        burnAmount: Number(amount),
        btcAddress: unwrapBtcDestination,
      });



        setUnwrapStage(UnwrapStage.Success);


    });
    setIsLoading(false);
  };

  return {
    amount,
    unwrapFeeBtc,
    unwrapFeeCardano,
    bridgeFee,
    btcToBeReceived,
    unwrapBtcDestination,
    isTxSuccessful,
    setAmount,
    unwrap,
    setUnwrapBtcDestination,
    isLoading,
    unwrapStage,
    setUnwrapStage,
  };
}
