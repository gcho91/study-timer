import { StyleSheet, Text, View, Button, TextInput } from "react-native";

const sessionLogs = [
  {
    startTime: "Start Time Stamp 1",
    endTime: "End Time Stamp",
  },
  {
    startTime: "Start Time Stamp 2",
    endTime: "End Time Stamp",
  },
  {
    startTime: "Start Time Stamp 3",
    endTime: "End Time Stamp",
  },
];
export default function Logs({ sessions }) {
  console.log(sessions);
  return (
    <View>
      <Text>Log view </Text>
      {sessionLogs.map((sessionItem, index) => {
        return (
          <Text key={index}>
            {sessionItem.startTime} - {sessionItem.endTime}
          </Text>
        );
      })}
    </View>
  );
}
