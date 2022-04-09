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
import SearchBar from "./SearchBar";

function SearchScreen({ route, navigation }) {
  const { mode } = route.params;
  const [searchTerm, setSearchTerm] = useState("");

  const showResults = async () => {
    if (searchTerm.length > 1) {
      // Make API call to check if any results
      // Send those results to the results page
      // If no results, promt the user to add a new country or city

      const url = `http://api.geonames.org/searchJSON?q=${searchTerm}&username=weknowit`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.totalResultsCount > 0) {
        navigation.navigate("Results", {
          mode: mode,
          searchTerm: searchTerm,
          data: data.geonames,
        });
      } else {
        Alert.alert("Ooops...", `Please enter another ${mode}`);
      }
    } else {
      Alert.alert("Ooops...", `Please enter a ${mode}`);
    }
  };

  const handleSearchInput = (input) => {
    setSearchTerm(input);
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
          <SearchBar onSearchInput={handleSearchInput} mode={mode} />
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
    marginTop: 120,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});
