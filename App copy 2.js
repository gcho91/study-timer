import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function App() {
  const [timerActive, setTimerActive] = useState(false);
  const [duration, setDuration] = useState(5);
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [sessions, setSessions] = useState([]);

  const handleStart = () => {
    setTimerActive((prev) => !prev);
  };
  const formatTime = () => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes.toString().padStart(2, 0)}:${seconds
      .toString()
      .padStart(2, 0)}`;
  };
  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        // decrease time remaining everys econd
        setTimeRemaining((prevTime) => {
          if (prevTime === 0) {
            clearInterval(interval);
            setTimerActive(false);
            // perform any action you want to happen when timer is finished
            console.log("timer is finished");
            return 0;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(interval);
  }, [timerActive]);

  return (
    <View style={styles.container}>
      <Text>Set Duration: {duration}</Text>
      {/* <Text>Remaining duration: {timeRemaining}</Text> */}
      <Text>{formatTime()}</Text>
      <Button title={timerActive ? "Pause" : "Start"} onPress={handleStart} />
      <Button
        title="Stop"
        onPress={() => {
          setTimerActive(false);
          setTimeRemaining(duration);
        }}
      />
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
});
