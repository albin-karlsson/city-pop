import React, { useEffect } from "react";
import { View, Text } from "react-native";

function ResultsScreen({ navigation }) {
  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault(); // Prevent default action
      unsubscribe(); // Unsubscribe the event on first call to prevent infinite loop
      navigation.navigate("Home"); // Navigate to the desired screen
    });
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Results Screen</Text>
    </View>
  );
}

export default ResultsScreen;
