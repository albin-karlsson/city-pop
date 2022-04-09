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

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault(); // Prevent default action
      unsubscribe(); // Unsubscribe the event on first call to prevent infinite loop
      navigation.navigate("Home"); // Navigate to the home screen (don't just go back one step)
    });
  }, []);

  const handleCitySelect = (cityName) => {
    console.log(cityName);
  };

  const ResultDisplay = () => {
    if (mode !== "city") {
      return (
        <View>
          <Text style={styles.header}>{data[0].countryName.toUpperCase()}</Text>
          <FlatList
            data={data}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity>
                  <Text
                    onPress={() => {
                      handleCitySelect(item.name);
                    }}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.geonameId}
          />
        </View>
      );
    } else
      return (
        <View style={{ alignItems: "center" }}>
          <Text style={styles.header}>{data[0].name.toUpperCase()}</Text>
          <View
            style={{
              borderWidth: 2,
              borderColor: "black",
              padding: 5,
              width: "90%",
              height: 180,
              marginTop: 200,
              position: "relative",
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 15 }}>
              POPULATION
            </Text>
            <Text
              style={{
                textAlign: "center",
                marginTop: 40,
                fontSize: 40,
              }}
            >
              {data[0].population}
            </Text>
          </View>
        </View>
      );
  };

  return <View style={styles.container}>{ResultDisplay()}</View>;
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
