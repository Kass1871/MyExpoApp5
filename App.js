import {Animated, Pressable, StyleSheet, Text, View} from 'react-native';
import Counter from './tasks/counter';
import TaskList from './tasks/taskList';
import Timer from './tasks/timer';
import globalStyles from './globalStyles'
import {useContext, useEffect, useRef} from "react";
import {ThemeContext, ThemeProvider} from "./contexts/themeContext";

const MainApp = () => {
  const {theme, setTheme} = useContext(ThemeContext);
  const animation = useRef(new Animated.Value(theme === "dark" ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation,{
      toValue: theme === 'dark' ? 1:0,
      duration: 400,
      useNativeDriver: false
    }).start();
  }, [theme]);

  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["#ffffff", "#121212"]
  });

  const textColor = theme === 'dark' ? "#000000" : "#ffffff";
  const bgColor = theme === 'dark' ? "#ffffff" : "#000000";

  return(
      <Animated.View style={[globalStyles.container, { backgroundColor }]}>
        {/*<Counter />
        <Timer/>*/}
        <TaskList/>
        <View style={globalStyles.centering}>
          <Pressable style={[globalStyles.changeTheme, {backgroundColor: bgColor}]} onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            <Text style={[globalStyles.changeThemeText, {color: textColor}]}>
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </Text>
          </Pressable>
        </View>
      </Animated.View>
  )
}

export default function App() {
    return(
        <ThemeProvider>
          <MainApp/>
        </ThemeProvider>
  );
}
