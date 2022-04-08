import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  TextInput,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

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
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss(); // A press outside the keyboard will dismiss it if its present
      }}
    >
      <View style={styles.container}>
        <Text style={styles.header}>
          SEARCH BY {"\n"} {mode.toUpperCase()}
        </Text>
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <TextInput
            style={styles.textInput}
            placeholder={`Enter a ${mode}`}
            onChangeText={setSearchTerm}
          />
          <TouchableOpacity onPress={showResults}>
            <FontAwesome5Icon
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
    </TouchableWithoutFeedback>
  );
}

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 100,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  textInput: {
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    width: "90%",
  },
});
