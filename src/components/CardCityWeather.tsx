import React, { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { usePlaceWeather } from "../api";
import { Entypo, EvilIcons } from "@expo/vector-icons";
import { useStoredPlaces } from "../App.store";
type Props = {
  location: string;
  onPressCard: () => any;
};
type weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};
export function CardCityWeather(item: Props) {
  const { location, onPressCard } = item;
  const itemCity = {
    title: location.substring(0, location.indexOf(",")),
    subtitle: location.substring(location.indexOf(",") + 2),
  };

  const { isLoading, data = [] } = usePlaceWeather(itemCity.title, "metric");
  const removePlace = useStoredPlaces((state) => state.removePlace);
  const favoriteToggle = useStoredPlaces((state) => state.favoriteToggle);
  const unfavoriteToggle = useStoredPlaces((state) => state.unfavoriteToggle);
  const favorites = useStoredPlaces((state) => state.favorites);
  const favorited = favorites.includes(item.location);
  function favoritePlace() {
    if (favorited) {
      unfavoriteToggle(item.location);
    } else {
      favoriteToggle(item.location);
    }
  }
  return !isLoading && data ? (
    <TouchableOpacity onPress={() => onPressCard()}>
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
                    <Text
                      key={weather.id}
                      style={{ fontSize: 22, color: "orange" }}
                    >
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

            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => favoritePlace()}
            >
              {favorited ? (
                <Entypo name="heart" size={35} color="red" />
              ) : (
                <EvilIcons name="heart" size={40} color="red" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => removePlace(item.location)}
            >
              <Entypo name="trash" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
