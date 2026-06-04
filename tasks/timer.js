import {StyleSheet, View, Text, Button, Alert} from "react-native";
import {useState, useRef, useContext} from "react";
import globalStyles from "../globalStyles";
import {ThemeContext} from "../contexts/themeContext";

export default function Timer() {
    const {theme} = useContext(ThemeContext);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const hours = Math.floor(totalSeconds/3600)
    const minutes = Math.floor((totalSeconds%3600)/60)
    const seconds = totalSeconds%60

    const intervalRef = useRef(null);

    const handleStart = () => {
        if(isRunning || totalSeconds === 0) return;
        let remaining = totalSeconds;
        setIsRunning(true);

        intervalRef.current = setInterval(() => {
            remaining--;
            setTotalSeconds(remaining);

            if(remaining <= 0) {
                clearInterval(intervalRef.current);
                setIsRunning(false);
                Alert.alert("Time is up!", "Timer is over!");
                console.log("Time up.")
            }
        }, 1000)
    };

    const handlePause = () => {
        clearInterval(intervalRef.current);
        setIsRunning(false);
    }

    const handleReset = () => {
        clearInterval(intervalRef.current);
        setIsRunning(false);
        setTotalSeconds(0);
    }

    const adjust = (unit, delta) => {
        if (isRunning) return;
        setTotalSeconds(prev => {
            let h = Math.floor(prev/3600);
            let m = Math.floor((prev%3600)/60);
            let s = prev%60;

            if(unit == "h") h = Math.max(0, Math.min(99, h+delta));
            if(unit == "m") m = Math.max(0, Math.min(59, m+delta));
            if(unit == "s") s = Math.max(0, Math.min(59, s+delta));

            return h * 3600 + m * 60 + s;
        });
    };

    const pad = (n) => String(n).padStart(2, "0");

    const textColor = theme === "dark" ? "#ffffff" : "#000000";

    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.btnRow}>
                <Button title="+" onPress={() => adjust("h", 1)}/>
                <Button title="+" onPress={() => adjust("m", 1)}/>
                <Button title="+" onPress={() => adjust("s", 1)}/>
            </View>
            <Text style={[globalStyles.display, {color: textColor}]}>
                {pad(hours)}:{pad(minutes)}:{pad(seconds)}
            </Text>
            <View style={globalStyles.btnRow}>
                <Button title="-" onPress={() => adjust("h", -1)}/>
                <Button title="-" onPress={() => adjust("m", -1)}/>
                <Button title="-" onPress={() => adjust("s", -1)}/>
            </View>

            <View style={globalStyles.controls}>
                <Button title="Start" onPress={handleStart}/>
                <Button title="Pause" onPress={handlePause}/>
                <Button title="Reset" onPress={handleReset}/>
            </View>
        </View>
    )
}