import React from "react";

function SearchScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Search Screen</Text>
      <Button
        title="Go to Results"
        onPress={() => navigation.navigate("Results")}
      />
    </View>
  );
}

export default SearchScreen;
