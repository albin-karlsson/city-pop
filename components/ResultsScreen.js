import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import CityDisplay from "./CityDisplay";
import ListDisplay from "./ListDisplay";

function ResultsScreen({ route, navigation }) {
  const { mode, data } = route.params;
  let [viewMode, setViewMode] = useState(mode);
  let [city, setCity] = useState({});
  let [sortedCities, setSortedCities] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    // Navigate to home screen, and just do not go back one step, in case of a 'Back' press on the header
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault(); // Prevent default action
      unsubscribe(); // Unsubscribe the event on first call to prevent infinite loop
      navigation.navigate("Home"); // Navigate to HomeScreen
    });

    //Sort list of cities according to their population
    sortedCities = data.sort((a, b) => {
      return b.population - a.population;
    });
    setSortedCities(sortedCities);

    // Set city to the most populated city
    if (viewMode === "city") {
      setCity((city = sortedCities[0]));
    }

    setLoading(false);
  }, []);

  // Filter cities for the incoming city name and set city
  const handleCitySelect = (cityName) => {
    const city = data
      .filter((city) => {
        return city.name === cityName;
      })
      .shift();

    setCity(city);
    setViewMode((viewMode = "city"));
  };

  const ResultsDisplay = () => {
    if (viewMode !== "city") {
      return (
        <ListDisplay
          onSelectCity={handleCitySelect}
          sortedCities={sortedCities}
        />
      );
    } else return <CityDisplay city={city} />;
  };

  return (
    <View style={styles.container}>
      {loading ? <Text>Loading...</Text> : ResultsDisplay()}
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
  listText: {
    borderWidth: 2,
    borderColor: "black",
    width: "90%",
    textAlign: "center",
    padding: 15,
    fontSize: 15,
    margin: 5,
  },
});
