import Head from 'next/head'
import Sceen from "../Sceen"
import NavBar from "../NavBar"
import ThemeContextProvider from '../../context/themeContext'
import ScrollTriggerProvider from "../../context/localScrollTriggerContext"
import style from "./style.module.css"

export default function Layout({children}) {
    return (
        <ThemeContextProvider>
            <ScrollTriggerProvider>
                <div className={style.container + " " + "layoutContainer"}>
                    <Head>
                        <title>Solvee</title>
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
                    <Sceen />
                    <NavBar />
                    {children} 
                </div>
            </ScrollTriggerProvider>
        </ThemeContextProvider>
    )
}
