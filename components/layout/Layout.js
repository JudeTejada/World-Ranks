
import Head from 'next/head';
import {useState, useEffect} from 'react';
import {
  Brightness6Rounded
} from "@material-ui/icons";

import styles from './layout.module.css';
const Layout = ({children, title='World ranks'}) => {
  
  const [theme, setTheme] =useState('light');

useEffect(() => {
  document.documentElement.setAttribute('data-theme',localStorage.getItem('theme'))

  setTheme(localStorage.getItem('theme'))
},[])

  const switchTheme = () => {
    if(theme === 'light') {
      saveTheme('dark')

    } else{
      saveTheme('light')
     
    }
  }

  const saveTheme = (theme) => {
    setTheme(theme);
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme',theme)
  }

  return(




  <div className={styles.container}>
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <header className={styles.header}>
        <h1>World Ranks</h1>
        <button className={styles.themeSwitcher} onClick={switchTheme}>
          <Brightness6Rounded />
        </button>
    </header>
    <main className={styles.main}>{children}</main>

    <footer className={styles.footer}>Jude Tejada @ judetejada.me</footer>
  </div>
)}



export default Layout;