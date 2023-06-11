import { useState, useEffect } from "react";
import useUnwrap, { UnwrapStage } from "../../../hooks/useUnwrap";
import styles from "../../../styles/wrapUnwrap.module.scss"
import ButtonLoader from "../../partials/loader/ButtonLoader";
import UnwrapSuccessful from "./unwrap/UnwrapSuccessful";
import useCardanoWallet from "../../../hooks/useCardanoWallet";
import ConnectWallet from "../../partials/navbar/ConnectWallet";

const Unwrap = () => {
  const {
    unwrapFeeBtc,
    bridgeFee,
    unwrapFeeCardano,
    btcToBeReceived,
    amount,
    setAmount,
    unwrap,
    unwrapBtcDestination,
    setUnwrapBtcDestination,
    isLoading,
    unwrapStage,
    setUnwrapStage,
  } = useUnwrap();

  const { walletMeta } = useCardanoWallet();
  const [isWalletShowing, setIsWalletShowing] = useState(false);

  const [checkInput, setCheckInput] = useState<boolean>(false);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^[0-9]-?\d*\.?\d{0,8}$/;
    if ((regex.test(value) || value === "") && value.length < 12){
      setAmount(value);
    }
    parseFloat(value)<0.001 ? setCheckInput(true) : setCheckInput(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === '+' || e.key === '-' || e.key === 'ArrowUp' || e.key === 'ArrowDown'){
      e.preventDefault();
    }
  }

  const handleWhell = (e: WheelEvent) => {
    e.preventDefault();
  }

  useEffect(() => {
    const inputElement = document.querySelector('input');
    inputElement?.addEventListener('wheel',  handleWhell,  {passive: false});
    return () => {
      inputElement?.removeEventListener('wheel',  handleWhell);
    }
  },[])

  return (
    <section className={styles.menu}>
      <p className={styles.title}>Redeem BTC</p>

      {/* amount field  */}
      <div className={styles.inputAmount}>
        <input
          placeholder="0"
          value={amount}
          type="number"
          onChange={handleValueChange}
          onKeyDown={handleKeyDown}
        />
        <div className={styles.token}>
          <div className={styles.tokenName}>
            <svg width="30" height="30" id='icon' >
                <use href='/images/crypto/cbtc-logo.svg#Layer_1'></use>
              </svg>
              <p>cBTC</p>
          </div>
        </div>
        {checkInput ? (
          <div className={styles.warning}>
            <svg width="14" height="14" id='icon' >
              <use href='/images/icons/exclamation-circle-fill.svg#icon'></use>
            </svg>
            <p>You can redeem a minimum of 0.001 BTC.</p>
          </div>
        ):(undefined)}
      </div>

      {/* source address  */}
      <div className={styles.inputAddress}>
        <input
          value={unwrapBtcDestination}
          onChange={(e) => setUnwrapBtcDestination(e.target.value)}
          type="text"
          placeholder="Enter your BTC address"
          required
        />
      </div>

      {/* fee */}
      <div className={styles.sectionFee}>
        <p className={styles.title}>Bridge Fee ({unwrapFeeBtc}%)</p>
        <div>
          <div className={styles.token}>
            <p>{bridgeFee.toFixed(8).replace(/\.?0+$/, '')}</p>
            <p>cBTC</p>
            <svg width="30" height="30" id='icon' >
              <use href='/images/crypto/cbtc-logo.svg#Layer_1'></use>
            </svg>
          </div>
        </div>
      </div>

      {/* fee */}
      <div className={styles.sectionFee}>
        <p className={styles.title}>Cardano Transaction Fee</p>
        <div>
          <div className={styles.token}>
            <p>{unwrapFeeCardano}</p>
            <p>ADA</p>
            <svg width="30" height="30" id='icon' >
              <use href='/images/crypto/cardano-logo.svg#Layer_1'></use>
            </svg>
          </div>
        </div>
      </div>

      {/* my receive amount  */}

      <div className={styles.sectionFee}>
        <p className={styles.title}>You Will Receive</p>
        <div>
          <div className={styles.token}>
            <p>{btcToBeReceived.toFixed(8).replace(/\.?0+$/, '')}</p>
            <p>BTC</p>
            <svg width="30" height="30" id='icon' >
              <use href='/images/crypto/bitcoin-logo.svg#Layer_1'></use>
            </svg>
          </div>
        </div>
      </div>
      {/* final button  */}

      {
        walletMeta ? (
          <button
          disabled={!Boolean(amount)||checkInput||unwrapBtcDestination === ""}
          onClick={unwrap}
          className={styles.wrapBtn}
        >
          {isLoading ? <ButtonLoader /> : null}
          {amount ? (checkInput ? "Invalid amount" : (unwrapBtcDestination === "" ? "Enter an address" : "Unwrap cBTC")) : "Enter an amount"}
        </button>
        ):(
          <>
          <button className={styles.wrapBtn}
          onClick={() =>
            isWalletShowing
              ? setIsWalletShowing(false)
              : setIsWalletShowing(true)
          }>Connect Wallet</button>
          <ConnectWallet
            isOpen={isWalletShowing}
            setIsOpen={setIsWalletShowing}
          />
        </>
        )
      }



      {/* success modal  */}
      <UnwrapSuccessful
        isOpen={unwrapStage === UnwrapStage.Success}
        amount={amount}
        amountToReceive={btcToBeReceived.toString()}
        unwrapBtcDestination={unwrapBtcDestination}
        onClick={() => setUnwrapStage(UnwrapStage.NotStart)}
        onClose={() => setUnwrapStage(UnwrapStage.NotStart)}
      ></UnwrapSuccessful>
    </section>
  );
};

export default Unwrap;
