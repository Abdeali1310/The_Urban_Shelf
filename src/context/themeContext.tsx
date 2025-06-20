/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, type ReactNode } from "react";

export type ThemeContextType = {
    theme:string,
    toggleTheme:()=>void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


export const ThemeProvider = ({children}:{children:ReactNode})=>{
    const currentTheme = localStorage.getItem("theme");
    const [theme,setTheme] = useState(currentTheme ? currentTheme : "dark");
    const toggleTheme = ()=>{
        localStorage.setItem("theme",theme === "light" ? "dark" : "light");
        setTheme(theme === "light" ? "dark" : "light");
    }
    return (
        <ThemeContext.Provider value={{theme,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}
