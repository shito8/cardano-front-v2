import { useEffect, useState } from "react";
import useAdaPrice from "./useAdaPrice";
import useBitcoinPrice from "./useBitcoinPrice";
import { adaFormat, usdFormat } from "../utils/format";


export default function useDashboard() {

  const { usdBtc, dailyChangeBtc} = useBitcoinPrice();
  const { usdAda} = useAdaPrice();

  const [usdBtcPrice, setUsdBtcPrice] = useState<string | undefined>();
  const [usdcBtcPrice, setUsdcBtcPrice] = useState<string | undefined>();
  const [adaBtcPrice, setAdaBtcPrice] = useState<string | undefined>();
  const [adacBtcPrice, setAdacBtcPrice] = useState<string | undefined>();
  const [dailyChangeBtcPrice, setDailyChangeBtcPrice] = useState<string | undefined>();


  useEffect(() => {
    if(usdAda && usdBtc){
      setAdaBtcPrice(adaFormat((Number(usdBtc)/Number(usdAda)).toFixed(2)))
      setUsdBtcPrice(usdFormat(usdBtc))
      setAdacBtcPrice(adaFormat(((Number(usdBtc)/Number(usdAda))*1.005).toFixed(2)))
      setUsdcBtcPrice(usdFormat((Number(usdBtc)*1.005).toFixed(2)))
      setDailyChangeBtcPrice((Number(dailyChangeBtc)*100).toFixed(2))
    }
  },[usdAda, usdBtc, dailyChangeBtc])

  return {
    usdBtcPrice,
    usdcBtcPrice,
    adaBtcPrice,
    adacBtcPrice,
    dailyChangeBtcPrice,
  }

}