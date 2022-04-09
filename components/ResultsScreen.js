import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Alert } from "react-native";

function ResultsScreen({ route, navigation }) {
  const { mode, searchTerm, data } = route.params;
  let [result, setResult] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault(); // Prevent default action
      unsubscribe(); // Unsubscribe the event on first call to prevent infinite loop
      navigation.navigate("Home"); // Navigate to the home screen (don't just go back one step)
    });

    formatData();

    setLoading(false);
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
          el.countryName.toUpperCase().includes(result.toUpperCase()) &&
          !/\d/.test(el.name)
        );
      });

      setFilteredData(filteredData);
    }
    // Show city population results
    else {
      // Set most plausible city
      determineCity();
    }
  };

  const determineCountry = () => {
    // Get most plausible country name judging from api results
    result = data
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
    if (result.toUpperCase() !== searchTerm.toUpperCase()) {
      Alert.alert(
        "Ooops...",
        `No exact match found for ${searchTerm}! Showing results for ${result}`
      );
    }

    setResult(result);
  };

  const determineCity = () => {
    result = data
      .filter((el) => {
        return el.fclName.includes("city") && !/\d/.test(el.name);
      })
      .sort((a, b) => {
        return b.population - a.population;
      })[0];

    setResult(result);
  };

  const ResultDisplay = () => {
    console.log("Rendering...");
    if (mode !== "city") {
      return (
        <View>
          <Text style={styles.header}>{result.toUpperCase()}</Text>
          <FlatList
            data={filteredData}
            renderItem={({ item }) => {
              return <Text>{item.name}</Text>;
            }}
            keyExtractor={(item) => item.geonameId}
          />
        </View>
      );
    } else
      return (
        <View>
          <Text style={styles.header}>{result.name.toUpperCase()}</Text>
          <Text>
            Displaying population results for {result.name}... pop :{" "}
            {result.population}
          </Text>
        </View>
      );
  };

  return (
    <View style={styles.container}>
      {loading ? <Text>Loading...</Text> : ResultDisplay()}
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
