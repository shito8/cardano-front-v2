import useDashboard from "../../hooks/useDashboard";
import styles from "../../styles/dashboard.module.scss"

export default function Dashboard() {
  const { usdBtcPrice, usdcBtcPrice, adaBtcPrice, adacBtcPrice, dailyChangeBtcPrice } =
    useDashboard();

  return (
    <section className={styles.dashboardContainer}>
{/*       Dashboard
      <p>BTC: {usdBtcPrice}</p>
      <p>cBTC: {usdcBtcPrice}</p>
      <p>Ada BTC: {adaBtcPrice}</p>
      <p>Ada cBTC: {adacBtcPrice}</p>
      <p>Este es el símbolo de la moneda Dólar de Aruba: ₳</p>
      <p>Daily Change: {dailyChangeBtcPrice}%</p> */}
      <div className={styles.sectionChart}>
        <div className={styles.chartTvl}>
          <h2>TVL</h2>
          <h3>BTC</h3>
          <p>Fecha</p>
        </div>
        <div className={styles.sectionPrice}>
          <div className={styles.priceBtc}>
            <div className={styles.headerPrice}>
              <div className={styles.token}>
                <svg width="25" height="25" id="icon">
                  <use href="/images/crypto/bitcoin-logo.svg#Layer_1"></use>
                </svg>
                <p className={styles.tokenTitle}>BTC Price</p>
              </div>
              <p className={`${styles.changeDaily} ${dailyChangeBtcPrice?.startsWith("-") ? styles.negative:""}`}>
                {dailyChangeBtcPrice}%
              </p>
            </div>
            <div className={styles.adaPrice}>
              {adaBtcPrice}
            </div>
            <p className={styles.usdPrice}>{usdBtcPrice}</p>
          </div>
          <div className={styles.pricecBtc}>
          <div className={styles.headerPrice}>
              <div className={styles.token}>
                <svg width="25" height="25" id="icon">
                  <use href="/images/crypto/cbtc-logo.svg#Layer_1"></use>
                </svg>
                <p className={styles.tokenTitle}>cBTC Price</p>
              </div>
              <p className={`${styles.changeDaily} ${dailyChangeBtcPrice?.startsWith("-") ? styles.negative:""}`}>
                {dailyChangeBtcPrice}%
              </p>
            </div>
            <div className={styles.adaPrice}>
              {adacBtcPrice}
            </div>
            <p className={styles.usdPrice}>{usdcBtcPrice}</p>
          </div>

        </div>
      </div>

      



    </section>
  );
}
