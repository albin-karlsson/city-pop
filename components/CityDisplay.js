import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

const formatPopulation = (population) => {
  return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

function CityDisplay({ city }) {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={styles.header}>{city.name.toUpperCase()}</Text>
      <View style={styles.popDisplay}>
        <Text style={{ textAlign: "center", fontSize: 15 }}>POPULATION</Text>
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
}

export default CityDisplay;

const styles = StyleSheet.create({
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
});
