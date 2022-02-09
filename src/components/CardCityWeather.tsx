import React, { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { usePlaceWeather } from "../api";
import { Entypo, EvilIcons } from "@expo/vector-icons";
type CityWeather = {
  location: string;
};
type weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};
export function CardCityWeather(item: CityWeather) {
  const { location } = item;
  const itemCity = {
    title: location.substring(0, location.indexOf(",")),
    subtitle: location.substring(location.indexOf(",") + 2),
  };

  const { isLoading, data = [] } = usePlaceWeather(itemCity.title, "metric");
  return !isLoading && data ? (
    <View style={styles.card}>
      <View
        style={{
          flex: 1,
          padding: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ fontSize: 24 }}>{itemCity.title}</Text>
          <Text style={{ fontSize: 15, marginLeft: 2 }}>
            {itemCity.subtitle}
          </Text>

          <View style={{ marginTop: 30, flexDirection: "row" }}>
            <View>
              {data.weather.map((weather: weather) => {
                return (
                  <Text style={{ fontSize: 22, color: "orange" }}>
                    {weather.description}
                  </Text>
                );
              })}
              <Text style={{ fontSize: 13, margin: 3 }}>
                {data.main.temp_min}º - {data.main.temp_min}º
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 25, color: "orange" }}>
            {data.main.temp}º
          </Text>

          <TouchableOpacity style={{ alignItems: "center" }}>
            <Entypo name="heart" size={35} color="red" />
            <EvilIcons name="heart" size={35} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#a6dced",
    height: 150,
    width: 320,
    marginTop: 20,
    alignContent: "center",
    borderRadius: 10,
  },
});
