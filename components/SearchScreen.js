import React from "react";
import { View, Text, Button } from "react-native";

function SearchScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Search Screen</Text>
      <Button
        title="Go to Results"
        onPress={() => navigation.navigate("Results")}
      />
    </View>
  );
}

export default SearchScreen;
