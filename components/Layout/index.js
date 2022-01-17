import Head from 'next/head'
import NavBar from "../NavBar"
import ThemeContextProvider from '../../context/themeContext'
import style from "./style.module.css"


export default function Layout({children}) {
    return (
        <ThemeContextProvider>
            <div className={style.container + " " + "layoutContainer"}>
                <Head>
                    <title>Solvee</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <NavBar />
                {children} 
            </div>
        </ThemeContextProvider>
    )
}
