import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

function ResultsScreen({ route, navigation }) {
  const { mode, searchTerm } = route.params;

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault(); // Prevent default action
      unsubscribe(); // Unsubscribe the event on first call to prevent infinite loop
      navigation.navigate("Home"); // Navigate to the home screen (don't just go back one step)
    });
  }, []);

  const ResultsDisplay = () => {
    if (mode !== "city") {
      return <Text>Displaying {mode} options...</Text>;
    } else return <Text>Displaying cities..</Text>;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{searchTerm.toUpperCase()}</Text>
      <View>{ResultsDisplay()}</View>
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
