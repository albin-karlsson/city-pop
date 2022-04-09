import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Alert } from "react-native";

function ResultsScreen({ route, navigation }) {
  const { mode, searchTerm, data } = route.params;
  let [country, setCountry] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault(); // Prevent default action
      unsubscribe(); // Unsubscribe the event on first call to prevent infinite loop
      navigation.navigate("Home"); // Navigate to the home screen (don't just go back one step)
    });

    formatData();
  }, []);

  const formatData = () => {
    // If mode is not city
    if (mode !== "city") {
      // Set most plausible country
      determineCountry();

      // Filter city options on being cities in the current country and without a numeric included in their name property
      const filteredData = data.filter((el) => {
        return (
          el.fclName.includes("city") &&
          el.countryName.includes(country) &&
          !/\d/.test(el.name)
        );
      });

      setFilteredData(filteredData);
    }
    // Show city population results
    else {
    }
  };

  const determineCountry = () => {
    // Get most plausible country name judging from api results
    country = data
      .map((el) => {
        return el.countryName;
      })
      .sort(
        (a, b) =>
          data.filter((v) => v === a).length -
          data.filter((v) => v === b).length
      )
      .pop();

    // Alert user if another (more plausible) country was found
    if (country.toUpperCase() !== searchTerm.toUpperCase()) {
      Alert.alert(
        "Ooops...",
        `No exact match found! Showing results for ${country}`
      );
    }

    setCountry(country);
  };

  const ResultsDisplay = () => {
    if (mode !== "city") {
      return (
        <FlatList
          data={filteredData}
          renderItem={({ item }) => {
            return <Text>{item.name}</Text>;
          }}
          keyExtractor={(item) => item.geonameId}
        />
      );
    } else return <Text>Displaying city population results..</Text>;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{country.toUpperCase()}</Text>
      {ResultsDisplay()}
    </View>
  );
}

export default ResultsScreen;

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
