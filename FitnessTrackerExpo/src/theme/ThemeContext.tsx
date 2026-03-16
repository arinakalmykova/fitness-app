import {createContext, useState, useContext, ReactNode} from 'react';
import {useColorScheme} from 'react-native';
import {lightColors,darkColors} from './colors';
import { FontStyles } from './fonts';

type Global= {
  colors: typeof lightColors;
  fonts: typeof FontStyles;
};

type ThemeContextType = {
  theme: Global;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({children}: {children:ReactNode}) => {
    const systemScheme = useColorScheme();
    const [dark,setDark] = useState<boolean>(systemScheme === 'dark');
    const toggleTheme = () => setDark(!dark); 
    const theme:Global = {
        colors: (dark ? darkColors : lightColors),
        fonts: FontStyles,
    };
    return (
        <ThemeContext.Provider value ={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const theme = useContext(ThemeContext);
    if (!theme) throw new Error("Error useTheme without ThemeProvider");
    return theme;
}
