/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { createContext, useState } from "react";

interface ThemeContextProps {
    theme: string,
    setTheme: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
    theme: "light",
    setTheme: () => {},
});

const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [theme, setTheme] = useState("light");
    const sharedProps = {
        theme: theme,
        setTheme: setTheme,
    };
    return (
        <ThemeContext.Provider value={sharedProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeContext, ThemeProvider };