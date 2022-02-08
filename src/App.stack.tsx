import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Start, Details, Search } from "./screens";

const { Navigator, Screen } = createStackNavigator();

export function Stack() {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="Start">
        <Screen name="Start" component={Start} />
        <Screen name="Details" component={Details} />
        <Screen name="Search" component={Search} />
      </Navigator>
    </NavigationContainer>
  );
}
