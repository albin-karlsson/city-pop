import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";

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
      determineCountry();
      const filteredData = data.filter((el) => {
        return el.fclName.includes("city") && el.countryName.includes(country);
      });

      setFilteredData(filteredData);
    }
    // Show city population results
    else {
    }
  };

  const determineCountry = () => {
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

    setCountry(country);
  };

  const ResultsDisplay = () => {
    if (mode !== "city") {
      return (
        <FlatList
          keyExtractor={(item) => item.geonameId}
          data={filteredData}
          renderItem={(item) => {
            <Text>{item.name}</Text>;
          }}
        />
      );
    } else return <Text>Displaying city population results..</Text>;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{country.toUpperCase()}</Text>
      <View>{ResultsDisplay()}</View>
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
