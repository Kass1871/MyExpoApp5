import React, {createContext, useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const loadTheme = async() => {
            try{
                const savedTheme = await AsyncStorage.getItem('theme');
                if(savedTheme){
                    setTheme(savedTheme);
                }
            } catch (error){
                console.log("Error loading theme: ", error)
            } finally{
                setIsLoaded(true);
            }
        };
        loadTheme();
    }, [])

    const toggleTheme = async() => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        try{
            await AsyncStorage.setItem('theme', newTheme);
        } catch(error){
            console.log("Error saving theme: ", error)
        }
    };
    if(!isLoaded) return null;

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}