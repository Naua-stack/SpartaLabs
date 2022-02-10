import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Cities, Details, Search } from "./screens";
const { Navigator, Screen } = createStackNavigator();

export function Stack() {
  return (
    <NavigationContainer>
      <Navigator
        initialRouteName="Cities"
        headerMode="none"
        screenOptions={{
          cardStyle: {
            backgroundColor: "transparent",
          },
        }}
      >
        <Screen name="Cities" component={Cities} />
        <Screen name="Details" component={Details} />
        <Screen name="Search" component={Search} />
      </Navigator>
    </NavigationContainer>
  );
}
