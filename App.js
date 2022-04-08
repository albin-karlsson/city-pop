import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/HomeScreen";
import SearchScreen from "./components/SearchScreen";
import ResultsScreen from "./components/ResultsScreen";
import FoundationIcon from "react-native-vector-icons/Foundation";

const Stack = createNativeStackNavigator();

function App({ navigation }) {
  function CustomHeader() {
    return <Text></Text>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerBackTitle: "CityPop",
          headerTitle: (props) => <CustomHeader {...props} />,
        }}
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
