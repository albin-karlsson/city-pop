import React from "react";
import { View, Text, Button } from "react-native";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Search by city"
        onPress={() => navigation.navigate("Search", { mode: "city" })}
      />
      <Button
        title="Search by country"
        onPress={() => navigation.navigate("Search", { mode: "country" })}
      />
    </View>
  );
}

export default HomeScreen;
