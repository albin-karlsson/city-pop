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
  let [searchTerm, setSearchTerm] = useState("");
  let [loading, setLoading] = useState(false);

  const showResults = async () => {
    if (searchTerm.length > 1) {
      // Set loading parameter to true
      setLoading(true);

      // Remove whitespace from search term
      searchTerm = searchTerm.trim();

      // Construct api url
      const username = "weknowit";
      const url = `http://api.geonames.org/searchJSON?q=${searchTerm}&maxRows=300&username=${username}`;

      // Make async api call and convert to JavaScript object
      const res = await fetch(url);
      const data = await res.json();

      // If data retrieved from api
      if (data.totalResultsCount > 0) {
        // Filter data from api
        const filterResult = filterData(data);

        // Check for relevant data after filtering
        if (filterResult.length == 0) {
          if (mode !== "city") {
            Alert.alert(
              "Ooops...",
              `No population data found searching for ${searchTerm}, did you mean to search for a city?`,
              [
                {
                  text: "Cancel",
                },
                {
                  text: "Yes",
                  onPress: () =>
                    navigation.navigate("Search", { mode: "city" }),
                },
              ]
            );
          } else {
            Alert.alert(
              "Ooops...",
              `No population data found searching for ${searchTerm}, try searching for something else!`
            );
          }
        } else {
          // Navigate to ResultsScreen
          navigation.navigate("Results", {
            mode: mode,
            data: filterResult,
          });
        }
      }
      // If no data was retrieved from the api
      if (data.totalResultsCount == 0) {
        Alert.alert(
          "Ooops...",
          `No ${mode} called ${searchTerm} was found, try searching for something else!`
        );
      }
      // Reset loading parameter
      setLoading(false);
    } // If no search term
    else {
      Alert.alert("Ooops...", `Please enter a ${mode}`);
    }
  };

  // Filter list to be cities with a population larger than 0, and that has no numerics in their name
  const filterData = (data) => {
    return data.geonames.filter((el) => {
      if (
        el.fclName.includes("city") &&
        !/\d/.test(el.name) &&
        el.population > 0
      ) {
        // Add special conditionals for non city searches
        if (mode !== "city") {
          if (
            el.countryName !== undefined &&
            el.countryName.toUpperCase() === searchTerm.toUpperCase()
          ) {
            return el;
          } // Add special conditionals for city searches
        } else {
          if (
            el !== undefined &&
            el.name.toUpperCase() === searchTerm.toUpperCase()
          ) {
            return el;
          }
        }
      }
    });
  };

  // Set search term from child component
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
