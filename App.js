import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  Platform,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Logs from "./Logs";
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";

const Tab = createBottomTabNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to timer"
        onPress={() => navigation.navigate("Timer")}
      ></Button>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Timer" component={Timer} />
      </Stack.Navigator> */}

      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen}></Tab.Screen>
        <Tab.Screen name="Timer" component={Timer}></Tab.Screen>
        <Tab.Screen name="Logs" component={Logs}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function Duration({ setDuration }) {
  const handlePress = (seconds) => {
    setDuration(seconds);
    console.log(`pressed ${seconds} seconds`);
  };
  return (
    <View style={styles.buttonContainer}>
      <Pressable onPress={() => handlePress(5)} style={styles.pressableBtn}>
        <Text>5 seconds</Text>
      </Pressable>
      <Pressable onPress={() => handlePress(10)} style={styles.pressableBtn}>
        <Text>10 seconds</Text>
      </Pressable>
      <Pressable onPress={() => handlePress(0)} style={styles.pressableBtn}>
        <Text>0 seconds</Text>
      </Pressable>
    </View>
  );
}

function Timer() {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [sessionDuration, setSessionDuration] = useState(0); // in seconds
  // duration calculation needs to change ? based on time stamps?
  const [sessions, setSessions] = useState([]);

  const getCurrentTime = () => {
    const date = new Date().toLocaleTimeString();
    return date;
  };
  const handleStart = () => {
    setIsTimerActive(true);
    const start = getCurrentTime();
    setStartTime(start);
  };
  const handleEnd = () => {
    const end = getCurrentTime();
    setEndTime(end);

    setIsTimerActive(false);
  };

  const resetTimer = () => {
    // send session info to db

    setSessions((prevSessions) => [
      ...prevSessions,
      {
        startTime,
        endTime,
      },
    ]);
    // save(startTime, endTime);
    // save();
    setStartTime();
    setEndTime();
    setIsTimerActive(false);
    setSessionDuration(0);
  };

  useEffect(() => {
    let interval;
    if (isTimerActive) {
      interval = setInterval(() => {
        setSessionDuration((prev) => {
          if (prev === 0) {
            // log end time
            const end = getCurrentTime();
            setEndTime(end);
            clearInterval(interval);
            return 0;
          } else {
            return prev - 1;
          }
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isTimerActive]);

  useEffect(() => {
    console.log("sessions", sessions);
  }, [sessions]);
  return (
    <View style={styles.container}>
      <Text>Timer </Text>
      <Text>Start: {startTime}</Text>
      <Text>End: {endTime}</Text>
      <Text>duration: {sessionDuration}</Text>

      <Button
        onPress={handleStart}
        title="Start"
        disabled={sessionDuration === 0 && isTimerActive === false}
      ></Button>
      <Button onPress={handleEnd} title="End"></Button>
      <Button onPress={resetTimer} title="Reset/Log"></Button>

      <Duration setDuration={setSessionDuration} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  pressableBtn: {
    borderStyle: "solid",
    borderWidth: "1px",
  },
});
