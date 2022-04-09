import React from "react";
import { StyleSheet, TextInput } from "react-native";

function SearchBar({ onSearchInput, mode }) {
  return (
    <TextInput
      style={styles.textInput}
      placeholder={`Enter a ${mode}`}
      onChangeText={(input) => onSearchInput(input)}
    />
  );
}

export default SearchBar;

const styles = StyleSheet.create({
  textInput: {
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    width: "90%",
  },
});
