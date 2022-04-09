import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";

function ListDisplay({ onSelectCity, sortedCities, navigation }) {
  return (
    <View>
      <Text style={styles.header}>
        {sortedCities[0].countryName.toUpperCase()}
      </Text>
      <View style={{ marginTop: 200 }}>
        <FlatList
          onEndReached={() => {
            Alert.alert("Not here?", "Try searching for a city instead", [
              {
                text: "Cancel",
              },
              {
                text: "OK",
                onPress: () => navigation.navigate("Home"),
              },
            ]);
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={<View style={{ height: 400 }} />}
          data={sortedCities}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() => {
                  onSelectCity(item.name);
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
}

export default ListDisplay;

const styles = StyleSheet.create({
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
