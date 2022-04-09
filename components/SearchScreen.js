import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
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
      // Construct api url
      const url = `http://api.geonames.org/searchJSON?q=${searchTerm}&username=weknowit`;

      // Make async api call and convert to JavaScript object
      const res = await fetch(url);
      const data = await res.json();

      // If api call successful... Navigate to results page
      if (data.totalResultsCount > 0) {
        navigation.navigate("Results", {
          mode: mode,
          searchTerm: searchTerm,
          data: data.geonames,
        });
      } // If no results from api call
      else {
        Alert.alert("Ooops...", `Please enter another ${mode}`);
      }
    } // If no search term
    else {
      Alert.alert("Ooops...", `Please enter a ${mode}`);
    }
  };

  const handleSearchInput = (input) => {
    setSearchTerm(input);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss(); // A press outside the keyboard will dismiss it if it is present
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
