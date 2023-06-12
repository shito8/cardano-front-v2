import { Fragment, useState } from "react";
import styles from "../../styles/wrapUnwrap.module.scss"
import InvalidBTCAddressModal from "./wrapUnwrap/InvalidBTCAddressModal";
import Unwrap from "./wrapUnwrap/Unwrap";
import Wrap from "./wrapUnwrap/Wrap";

const WrapUnwrap = () => {
  const [btcValidAddressFinal, setBtcValidAddressFinal] =
    useState<boolean>(true);
  const [tabName, setTabName] = useState<string>("Wrap");

  return (
    <div className={`${styles.wrapUnwrap} ${tabName === "Wrap" ? `${styles.wrap}`: `${styles.unwrap}`}`}>
      <div className={styles.options}>
          <div className={styles.item}>
            {["Wrap", "Unwrap"].map((value: string) => (
              <Fragment key={value}>
                <p
                  onClick={() => setTabName(value)}
                  className={styles.selection}
                >
                  {value}
                </p>
                <span className={`${styles.select} ${tabName !== "Wrap" ? `${styles.active}`:""}`}></span>
              </Fragment>
            ))}
          </div>
      </div>
      {tabName == "Unwrap" ? <Unwrap /> : <Wrap />}
{/*       <InvalidBTCAddressModal
        isOpen={btcValidAddressFinal == false}
        setIsOpen={setBtcValidAddressFinal}
      /> */}
    </div>
  );
};

export default WrapUnwrap;
