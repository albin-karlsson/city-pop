import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

function ResultsScreen({ route, navigation }) {
  const { mode, data } = route.params;
  let [viewMode, setViewMode] = useState(mode);
  let [city, setCity] = useState({});
  let [sortedCities, setSortedCities] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault(); // Prevent default action
      unsubscribe(); // Unsubscribe the event on first call to prevent infinite loop
      navigation.navigate("Home"); // Navigate to the home screen (don't just go back one step)
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

  const handleCitySelect = (cityName) => {
    const city = data
      .filter((city) => {
        return city.name === cityName;
      })
      .shift();

    setCity(city);
    setViewMode((viewMode = "city"));
  };

  const formatPopulation = (population) => {
    return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const ResultsDisplay = () => {
    if (viewMode !== "city") {
      return (
        <View>
          <Text style={styles.header}>{data[0].countryName.toUpperCase()}</Text>
          <View style={{ marginTop: 200 }}>
            <FlatList
              ListFooterComponent={<View style={{ height: 400 }} />}
              data={sortedCities}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={{ alignItems: "center" }}
                    onPress={() => {
                      handleCitySelect(item.name);
                    }}
                  >
                    <Text style={styles.listText}>{item.name}</Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => item.geonameId}
            />
          </View>
        </View>
      );
    } else
      return (
        <View style={{ alignItems: "center" }}>
          <Text style={styles.header}>{city.name.toUpperCase()}</Text>
          <View style={styles.popDisplay}>
            <Text style={{ textAlign: "center", fontSize: 15 }}>
              POPULATION
            </Text>
            <Text
              style={{
                textAlign: "center",
                marginTop: 45,
                fontSize: 40,
              }}
            >
              {formatPopulation(city.population)}
            </Text>
          </View>
        </View>
      );
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
  popDisplay: {
    borderWidth: 2,
    borderColor: "black",
    padding: 5,
    width: "90%",
    height: 180,
    marginTop: 200,
    position: "relative",
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
