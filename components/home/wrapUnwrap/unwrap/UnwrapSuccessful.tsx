import Image from "next/image";
//import WrapUnwrapModal from "../WrapUnwrapModal";
import styles from "../../../../styles/unWrapConfirm.module.scss";

interface Props {
  isOpen: boolean;
  amount: string;
  amountToReceive: string;
  unwrapBtcDestination: string;
  onClick: () => void;
  onClose: () => void;
  resetAmount: () => void;
}



export default function UnwrapSuccessful({
  isOpen,
  amount,
  amountToReceive,
  unwrapBtcDestination,
  onClick,
  onClose,
  resetAmount,
}: Props) {


  const handleClick = () => {
    onClick();
    resetAmount();
}


  return (
    <>
      {
        isOpen &&
        <div className={styles.modal}>
          <main className={styles.main}>
            <section className={styles.popUp}>
              <header className={styles.header}>
                <svg width="24" height="24" id='icon'>
                  <use href='/images/crypto/cbtc-logo.svg#Layer_1'></use>
                </svg>
                <h2>Unwrap cBTC</h2>
              </header>
              <section className={styles.body}>
                <div className={styles.result}>
                  <div className={styles.group}>
                    <div className={styles.name}>
                      <svg width="20" height="20" id='icon' >
                        <use href='/images/crypto/cbtc-logo.svg#Layer_1'></use>
                      </svg>
                      <h3>cBTC</h3>
                    </div>
                    <div className={styles.value}>
                      <p>{amount}</p>
                    </div>
                  </div>
                  <div className={styles.arrow}>
                    <Image src='/images/icons/arrow_blue.png' width={83} height={24} alt="arrow" />
                  </div>
                  <div className={styles.group}>
                    <div className={styles.name}>
                      <svg width="20" height="20" id='icon' >
                        <use href='/images/crypto/bitcoin-logo.svg#Layer_1'></use>
                      </svg>
                      <h3>BTC</h3>
                    </div>
                    <div className={styles.value}>
                      <p>{amountToReceive}</p>
                    </div>
                  </div>
                </div>

                <div className={styles.address}>
                  <p>BTC Destination Address:</p>
                  <p>{unwrapBtcDestination}</p>
                </div>


                <div className={styles.text}>
                  <p>
                  Your cBTC has been sent for unwrap. BTC will be sent to your BTC wallet shortly. This may take up to 24 hours. {`Don't `}worry, your funds are safu :).
                  </p>
                  <p className={styles.parragraph}>
                  If you need support, send your BTC transaction ID and your Cardano address and we will help you.
                  </p>
                </div>


                <button onClick={handleClick} className={styles.wrapBtn}>
                  Close
                </button>
              </section>
            </section>

          </main>
        </div>
      }
    </>
/*     <WrapUnwrapModal
      isOpen={isOpen}
      closeModal={onClose}
      title={
        <>
          <Image
            src={"/images/logo/bitcoin-blue.png"}
            alt="Bitcoin image"
            width={25}
            height={25}
          />
          Unwrap cBTC
        </>
      }
      buttonText="Close"
      onClick={onClick}
    >
      <div className="flex gap-6 flex-col">
        <div className="flex items-center justify-center gap-4">
          <div className="flex flex-col justify-center items-center gap-1">
            <div className="flex items-center gap-2 bg-primary-mid-dark-color rounded-md border border-neutral-800 px-2.5 py-1.5 ">
              <Image
                src={"/images/logo/bitcoin-blue.png"}
                alt="Bitcoin blue"
                height={20}
                width={20}
              />
              <p>cBTC</p>
            </div>
            <p className="text-lg font-nunito-sans">{amountToReceive}</p>
          </div>
          <Image
            src={"/images/assets/right-arrow.png"}
            alt="Right Arrow"
            className=" object-contain mt-2"
            height={15}
            width={80}
          />
          <div className="flex flex-col justify-center items-center gap-1">
            <div className="flex items-center gap-2 bg-primary-mid-dark-color rounded-md border border-neutral-800 px-2.5 py-1.5 ">
              <Image
                src={"/images/logo/bitcoin.png"}
                alt="Bitcoin"
                height={20}
                width={20}
              />
              <p>BTC</p>
            </div>
            <p className="text-lg font-nunito-sans">{amount}</p>
          </div>
        </div>
        <div className="rounded-lg p-4 bg-primary-mid-dark-color font-nunito-sans  space-y-1">
          <div>
            <h4 className="flex gap-1 items-center">
              BTC Destination Address:
            </h4>
          </div>
          <p className=" text-neutral-300">{unwrapBtcDestination}</p>
        </div>
        <p>
          Your cBTC has been sent for unwrap. BTC will be sent to your BTC
          wallet shortly. This may take up to 24 hours. Don&apos;t worry, your
          funds are safu :)
        </p>
        <p>
          If you need support, your BTC transaction ID and your ERG transaction
          ID will help us assist you.
        </p>
      </div>
    </WrapUnwrapModal> */
  );
}
