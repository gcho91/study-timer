import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function App() {
  const [timerActive, setTimerActive] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [duration, setDuration] = useState(20);
  const [sessions, setSessions] = useState([]);

  const handleStart = () => {
    setTimerActive(true);
    const start = getCurrentTime();
    setStartTime(start);
  };

  const getCurrentTime = () => {
    const date = new Date().toLocaleTimeString();
    return date;
  };
  const handleEnd = () => {
    // setEndTime(getCurrentTime());
    const end = getCurrentTime();
    setEndTime(end);
    setSessions((prevSessions) => [
      ...prevSessions,
      {
        startTime,
        endTime: end,
      },
    ]);
    setTimerActive(false);
  };

  const handleReset = () => {
    setStartTime(null);
    setEndTime(null);
    setTimerActive(false);
  };

  useEffect(() => {
    console.log("SESSIONS", sessions);
  }, [sessions]);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Button title="Reset" onPress={handleReset} />
      <Text>Start: {startTime}</Text>
      <Text>End:{endTime}</Text>
      <Text>Timer Duration: {duration}</Text>
      <View style={styles.buttonRow}>
        <Button title="Start" onPress={handleStart} disabled={timerActive} />
        <Button title="End" onPress={handleEnd} disabled={!timerActive} />
      </View>
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
  buttonRow: {
    flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "center",
  },
});

// set timer duration of 25 min
// press start to start a study session
// show remaining time via count down
// record what time the timer started
// press end to stop study session
// record what time the timer ended

// start with:
// start and stop timer duration of x minutes
// record session time data
// make it accessible thru data
