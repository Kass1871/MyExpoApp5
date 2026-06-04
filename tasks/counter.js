import React, {useState, useEffect, useContext} from "react";
import {View, Text, Button} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import globalStyles from "../globalStyles";
import {ThemeContext} from "../contexts/themeContext";

export default function Counter() {
    const {theme} = useContext(ThemeContext);
    const [count, setCount] = useState(0);
    const [running, setRunning] = useState(false);
    const intervalMs = 1000;

    useEffect(() => {
        const loadCount = async () => {
            try {
                const savedValue = await AsyncStorage.getItem("count");
                if(savedValue !== null){
                    setCount(Number(savedValue))
                }
            } catch(error){
                console.log("Failed to load counter: ", error);
            }
        };
        loadCount();
    }, []);

    useEffect(() => {
        AsyncStorage.setItem("count", String(count));
    }, [count]);

    useEffect(() => {
        if(!running) return;

        const id = setInterval(() => {
            setCount(prev => prev + 1);
        }, intervalMs);

        return () => clearInterval(id);
    }, [running, intervalMs])

    const textColor = theme === "dark" ? "#ffffff" : "#000000";

    return (
      <View style={globalStyles.container}>
          <Text style={[globalStyles.counterText, {color: textColor}]}>{count}</Text>
          <View style={globalStyles.controls}>
              <Button title="Increment" onPress={() => setCount((prev => prev+1))}></Button>
              <Button title={running? "Stop" : "Start"} onPress={() => setRunning(!running)}/>
              <Button title="Decrement" onPress={() => setCount((prev => prev-1))}></Button>
              <Button title="Reset" onPress={() => setCount(0)}></Button>
          </View>
      </View>
    );
}