import React, { useEffect } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { usePlaceWeather } from "../api";
import { Entypo, EvilIcons } from "@expo/vector-icons";
import { useStoredPlaces } from "../App.store";
import { ImageIcon } from "./ImageIcon";
type Props = {
  location: { description: string; place_id: string };
  navigation: {
    navigate: (to: string, props: any) => void;
  };
  units: string;
};

export function CardCityWeather(props: Props) {
  const { location, navigation, units } = props;
  const itemCity = {
    title: location.description.substring(0, location.description.indexOf(",")),
    subtitle: location.description.substring(
      location.description.indexOf(",") + 2
    ),
  };

  const { isLoading, data } = usePlaceWeather(location.place_id, units);
  const removePlace = useStoredPlaces((state) => state.removePlace);
  const favoriteToggle = useStoredPlaces((state) => state.favorite);
  const unfavoriteToggle = useStoredPlaces((state) => state.unfavorite);
  const favorites = useStoredPlaces((state) => state.favorites);

  const favorited = favorites.includes(location.place_id);

  function favoritePlace() {
    if (favorited) {
      unfavoriteToggle(location);
    } else {
      favoriteToggle(location);
    }
  }

  function onPressCard() {
    navigation.navigate("Details", {
      location: data?.coord,
      name: location.description,
    });
  }

  return !isLoading && data ? (
    <TouchableOpacity onPress={() => onPressCard()}>
      <View style={styles.card}>
        <View style={styles.containerCardIntern}>
          <View>
            <Text style={{ fontSize: 24 }}>{itemCity.title}</Text>
            <Text style={{ fontSize: 15, marginLeft: 2 }}>
              {itemCity.subtitle}
            </Text>

            <View style={{ flexDirection: "row" }}>
              <View>
                <ImageIcon item={data.weather[0].icon} />
                <Text style={{ fontSize: 22, color: "orange" }}>
                  {data.weather[0].description}
                </Text>
                <Text style={{ fontSize: 13, margin: 3 }}>
                  {Math.round(data.main.temp_min)}º -{" "}
                  {Math.round(data.main.temp_min)}º
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
              {Math.round(data.main.temp)}º
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
              onPress={() => removePlace(location)}
            >
              <Entypo name="trash" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  ) : (
    <View style={styles.containerCardIntern}>
      <ActivityIndicator size={20} color={"#000"} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#a6dced",
    height: 180,
    width: 320,
    marginTop: 20,
    alignContent: "center",
    borderRadius: 10,
  },
  containerCardIntern: {
    flex: 1,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
