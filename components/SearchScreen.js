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
import infoLog from "react-native/Libraries/Utilities/infoLog";
import SearchBar from "./SearchBar";

function SearchScreen({ route, navigation }) {
  const { mode } = route.params;
  let [searchTerm, setSearchTerm] = useState("");
  let [loading, setLoading] = useState(false);
  let filterResult = [];

  const showResults = async () => {
    if (searchTerm.length > 1) {
      // Set loading parameter to true
      setLoading(true);

      // Remove whitespace from search term
      searchTerm = searchTerm.trim();

      // Construct api url
      const username = "weknowit";
      const url = `http://api.geonames.org/searchJSON?q=${searchTerm}&username=${username}`;

      // Make async api call and convert to JavaScript object
      const res = await fetch(url);
      const data = await res.json();

      // If data retrieved from api
      if (data.totalResultsCount > 0) {
        if (mode !== "city") {
          // Filter for relevant country name and get all cities
          filterResult = data.geonames.filter(
            (el) =>
              el.countryName !== undefined &&
              el.countryName.toUpperCase() === searchTerm.toUpperCase() &&
              el.fclName.includes("city") &&
              !/\d/.test(el.name)
          );
        } else {
          // Filter for relevant city name
          filterResult = data.geonames.filter(
            (el) =>
              el !== undefined &&
              el.name.toUpperCase() === searchTerm.toUpperCase() &&
              el.fclName.includes("city") &&
              !/\d/.test(el.name)
          );
        }

        if (filterResult.length > 0) {
          navigation.navigate("Results", {
            mode: mode,
            data: filterResult,
          });
        }
      }
      if (data.totalResultsCount == 0 || filterResult.length == 0) {
        Alert.alert(
          "Ooops...",
          `No ${mode} called ${searchTerm} that was found, try searching for something else!`
        );
      }
      // Reset loading parameter
      setLoading(false);
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
          {loading ? (
            <Text style={{ fontSize: 20 }}>Loading...</Text>
          ) : (
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
          )}
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
