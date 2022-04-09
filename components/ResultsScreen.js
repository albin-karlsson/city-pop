import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Alert } from "react-native";

function ResultsScreen({ route, navigation }) {
  const { mode, data } = route.params;

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault(); // Prevent default action
      unsubscribe(); // Unsubscribe the event on first call to prevent infinite loop
      navigation.navigate("Home"); // Navigate to the home screen (don't just go back one step)
    });
  }, []);

  const ResultDisplay = () => {
    if (mode !== "city") {
      return (
        <View>
          <Text style={styles.header}>{data[0].countryName.toUpperCase()}</Text>
          <FlatList
            data={data}
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
          <Text style={styles.header}>{data[0].name.toUpperCase()}</Text>
          <Text>
            Displaying population results for {data[0].name}... pop :{" "}
            {data[0].population}
          </Text>
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
