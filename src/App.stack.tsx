import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Citys, Details, Search } from "./screens";
const { Navigator, Screen } = createStackNavigator();

export function Stack() {
  return (
    <NavigationContainer>
      <Navigator
        initialRouteName="Citys"
        headerMode="none"
        screenOptions={{
          cardStyle: {
            backgroundColor: "transparent",
          },
        }}
      >
        <Screen name="Citys" component={Citys} />
        <Screen name="Details" component={Details} />
        <Screen name="Search" component={Search} />
      </Navigator>
    </NavigationContainer>
  );
}
