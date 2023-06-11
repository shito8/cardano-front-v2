import React, { useState, useEffect } from "react";
import styles from "../../../styles/selectNetwork.module.scss"


interface Network {
  name: string;
  image: string;
}

const network: Network[] = [
  { name: "Cardano", image: "/images/crypto/cardano-logo.svg#Layer_1" },
  { name: "Ergo", image: "/images/crypto/ergo-logo.svg#Layer_1" },
];


const SelectNetwork = () => {

  const [selectedNetwork, setSelectedNetwork] = useState(network[0]);
  const [isOpenList, setIsOpenList] = useState(false);


  const handleMenuClick = () => {
    isOpenList ? setIsOpenList(false) : setIsOpenList(true);

  }

  const handleListClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget.dataset;
    const selectedNetwork = target?.network;

    if (selectedNetwork) {
      const selectedNetworkItem = network.find(item => item.name === selectedNetwork);
      if (selectedNetworkItem) {
        setSelectedNetwork(selectedNetworkItem);
        setIsOpenList(false);
      } 
   }
  }

  useEffect(() => {
    if(isOpenList){
      const handleClickOutside = (e: PointerEvent) => {
        const target = e.target as HTMLElement;
        if(!target.closest(`.${styles.list}`) && !target.closest(`.${styles.selected}`) ){
          setIsOpenList(false);
        }
      }
      document.addEventListener('pointerdown', handleClickOutside);
      return () => document.removeEventListener('pointerdown', handleClickOutside);
    }

},[isOpenList])



  return (
    <section className={`${styles.main}`}>

      <div className={styles.selected} onClick={handleMenuClick}>
        <div className={styles.item}>
          <div className={styles.icon}>
            <svg width="20" height="20" id='icon' >
              <use href={selectedNetwork.image}></use>
            </svg>
            <p>{selectedNetwork.name}</p>
          </div>
          <div>
            <svg width="14" height="14" id="icon">
              <use href="/images/icons/chevron-down.svg#icon"></use>
            </svg>
          </div>
        </div>
      </div>

      {
        isOpenList && (
          <div className={styles.list}>
            {network.map((item, index) => {
              return (
              <div key={index} className={`${styles.item} ${item.name === "Cardano" ? 'active' : ''}`} onClick={handleListClick} data-network={/* item.name */"Cardano"}>
                <svg width="20" height="20" id='icon' >
                  <use href={item.image}></use>
                </svg>
                <p>{item.name}</p>

              </div>
            )})}

          </div>
        )
      }

    </section>
  )






}

export default SelectNetwork;