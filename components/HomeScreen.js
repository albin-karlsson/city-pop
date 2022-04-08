import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>CityPop</Text>
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Search", { mode: "city" })}
        >
          <Text style={styles.buttonText}>SEARCH BY CITY</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Search", { mode: "country" })}
        >
          <Text style={styles.buttonText}>SEARCH BY COUNTRY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 100,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    borderWidth: 2,
    borderColor: "black",
    padding: 20,
    margin: 5,
    width: "90%",
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
  },
});
