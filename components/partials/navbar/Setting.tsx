import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../GlobalContext";
import styles from "../../../styles/setting.module.scss"
import Link from "next/link";

interface Props {
  openSetting: boolean;
  setOpenSetting: React.Dispatch<React.SetStateAction<boolean>>;
  display: boolean;
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}

const Setting = (props: Props) => {

  const { openSetting, setOpenSetting, display, setDisplay } = props;
  const { setDarkMode } = useContext(GlobalContext);
  const [theme, setTheme] = useState<String>('');

  useEffect(() => {
    const themeMode = localStorage.getItem('themeMode')
    if(themeMode!==null){
      const themeModeObj = JSON.parse(themeMode)
      setTheme(themeModeObj.theme)
    }

  }, [theme])

  const handleThemeChange = (newTheme: string) => {
    let theme, dark;
    if (newTheme === "light") {
        setDarkMode(false)
        theme = 'light';
        dark = false;
    } else if (newTheme === "dark") {
      setDarkMode(true)
        theme = 'dark';
        dark = true;
    } else {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setDarkMode(mediaQuery.matches)
      theme = 'system';
      dark = mediaQuery.matches;
    }
    const themeMode = {theme, dark}
    setTheme(theme)
    setOpenSetting(false);
    setDisplay(false)
    localStorage.setItem('themeMode', JSON.stringify(themeMode))
  };

  const handleSetting = () => {
    setOpenSetting(false);
    setTimeout(()=>{
      setDisplay(false)
  },500);
  }

  useEffect(() => {
    if(openSetting){
      const handleClickOutside = (e: PointerEvent) => {
        const target = e.target as HTMLElement;
        if(!target.closest(`.${styles.main}`) && (!target.closest('#setting'))){
          setOpenSetting(false);
          setDisplay(false)
        }
      }
      document.addEventListener('pointerdown', handleClickOutside);
      return () => document.removeEventListener('pointerdown', handleClickOutside);
    }

},[openSetting, setOpenSetting, setDisplay])





return (
  <main className={`${styles.main} ${display ? '': 'display'} ${openSetting ? 'open': ''}`}>

    <div className={styles.close} onClick={handleSetting}>
      <svg width="20" height="20" id='icon' >
        <use href="/images/icons/x.svg#icon"></use>
      </svg>
    </div>
    <div className={styles.item}>
        <p>Theme</p>
        <div className={styles.themeMode}>
          <div onClick={() => handleThemeChange("light")} className={`${styles.theme} ${theme === "light" ? `${styles.active}` : ""}`}>Light</div>
          <div onClick={() => handleThemeChange("dark")} className={`${styles.theme} ${theme === "dark" ? `${styles.active}` : ""}`}>Dark</div>
          <div onClick={() => handleThemeChange("system")} className={`${styles.theme} ${theme === "system" ? `${styles.active}` : ""}`}>System</div>
        </div>

      </div>

      <div className={styles.item}>
        <p>Language</p>
        <div className={styles.language} >
          <p>English</p>
        </div>
      </div>

      <div className={styles.item}>
        <Link href='https://docs.anetabtc.io/docs/user-guides/wrapping' target="_blank" className={styles.link}>
          <p>
            <svg width="14" height="14" id='icon'>
              <use href="/images/icons/question-circle.svg#icon"></use>
            </svg>
          How to use
          </p>
        </Link>  
      </div>
      <div className={styles.item}>
        <Link href='https://docs.anetabtc.io/' target="_blank" className={styles.link}>
        <p>
            <svg width="14" height="14" id='icon'>
              <use href="/images/icons/file-earmark-text.svg#icon"></use>
            </svg>
          Docs
        </p>
        </Link>
      </div>

      <div className={styles.item}>
        <Link href='https://github.com/anetabtc' target='_blank' className={styles.link}>
          <p>
              <svg width="14" height="14" id='icon'>
                <use href="/images/icons/github.svg#icon"></use>
              </svg>
            GitHub
          </p>
        </Link>  
      </div>



  </main>
)

}

export default Setting;