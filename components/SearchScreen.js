import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import IconFontAwesome from "react-native-vector-icons/FontAwesome5";

// Pass country or city as route from home screen
function SearchScreen({ route, navigation }) {
  const { mode } = route.params;
  const [searchTerm, setSearchTerm] = useState("");

  const showResults = () => {
    if (searchTerm.length > 1) {
      // Make API call to check if any results
      // Send those results to the results page
      // If no results, promt the user to add a new country or city

      navigation.navigate("Results");
    } else {
      Alert.alert("Ooops...", `Please enter a ${mode}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        SEARCH BY {"\n"} {mode.toUpperCase()}
      </Text>
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <TextInput
          style={{
            marginBottom: 20,
            borderWidth: 2,
            borderColor: "black",
            borderRadius: 5,
            padding: 10,
            width: "90%",
          }}
          placeholder={`Enter a ${mode}`}
          onChangeText={setSearchTerm}
        />
        <TouchableOpacity onPress={showResults}>
          <IconFontAwesome
            style={{
              borderWidth: 2,
              borderColor: "black",
              borderRadius: 30,
              padding: 10,
            }}
            name="search"
            size={40}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SearchScreen;

const styles = StyleSheet.create({
  header: {
    marginTop: 80,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
