import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

function ResultsScreen({ navigation }) {
  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault(); // Prevent default action
      unsubscribe(); // Unsubscribe the event on first call to prevent infinite loop
      navigation.navigate("Home"); // Navigate to the desired screen
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CITY</Text>
    </View>
  );
}

export default ResultsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 120,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});
