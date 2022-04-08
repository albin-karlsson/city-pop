import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { Alert } from "react-native";

function SearchScreen({ route, navigation }) {
  const { mode } = route.params;
  const [searchTerm, setSearchTerm] = useState("");

  const showResults = () => {
    if (searchTerm.length > 1) {
      navigation.navigate("Results");
    } else {
      Alert.alert("Ooops...", `Please enter a ${mode}`);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Search by {mode}</Text>
      <TextInput placeholder={`Enter a ${mode}`} onChangeText={setSearchTerm} />
      <Button title="Go to Results" onPress={showResults} />
    </View>
  );
}

export default SearchScreen;
