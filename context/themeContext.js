import { createContext, useState, useEffect } from "react";
import {themeDataDark, themeDataLight} from "../util/themeData"

export const themeContext = createContext({
    isDarkMode : false
})

export default function ThemeContextProvider ({children}){
    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {
        let root = document.documentElement;
        const themeData = isDarkMode ? themeDataDark : themeDataLight

        root.style.setProperty('--background-color', themeData.backgroundColor);
        root.style.setProperty('--primary-color', themeData.primaryColor);
        root.style.setProperty('--primary-contrass-color', themeData.primaryContrassColor);
        root.style.setProperty('--secondary-color', themeData.secondaryColor);
        root.style.setProperty('--intro-title-background', themeData.introTitleBackground);
        root.style.setProperty('--intro-title-text-color', themeData.introTitleTextColor);
        root.style.setProperty('--intro-background-color', themeData.introBackgroundColor);
        root.style.setProperty('--intro-text-color', themeData.introTextColor);

    }, [isDarkMode])

    return (
        <themeContext.Provider value={{isDarkMode, setIsDarkMode}}>
            {children}
        </themeContext.Provider>
    )
}