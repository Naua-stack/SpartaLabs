import React from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { usePlaceWeatherForecast } from "../api";
import { CardDetailsDays } from "../components/CardDetailsDays";
import { Ionicons } from "@expo/vector-icons";
import { useStoredPlaces } from "../App.store";
type Weather = {
  description: string;
};
type Props = {
  navigation: {
    navigate: (to: string) => void;
  };
  route: {
    params: {
      location: {
        lat: string;
        lon: string;
      };
      name: string;
    };
  };
};
export function Details({ route, navigation }: Props) {
  const { location, name } = route.params;
  const units = useStoredPlaces((state) => state.units);
  const { isLoading, data } = usePlaceWeatherForecast(
    location.lat,
    location.lon,
    units
  );

  return isLoading ? (
    <View>
      <ActivityIndicator size={20} color={"#000"} />
    </View>
  ) : data ? (
    <View style={{ flex: 1 }}>
      <View
        style={{
          marginTop: 50,
          marginLeft: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Cities")}
          style={{ height: 30, width: 30 }}
        >
          <Ionicons name="arrow-back" size={30} />
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 40 }}>
          {name.substring(0, name.indexOf(","))}
        </Text>
        <Text style={{ fontSize: 85, marginLeft: 15 }}>
          {Math.round(data.current.temp)}º
        </Text>
        {data.current.weather.map((weather: Weather) => {
          return (
            <Text key={weather.description} style={{ fontSize: 25 }}>
              {weather.description}
            </Text>
          );
        })}
      </View>

      <View style={styles.containerWeatherDays}>
        <Text style={{ fontSize: 15 }}>Previsão para os próximos 5 dias</Text>
        <FlatList
          keyExtractor={(i) => String(i.dt)}
          data={data.daily.slice(0, 6)}
          renderItem={({ item, index }) => (
            <CardDetailsDays item={item} index={index} />
          )}
        />
      </View>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  containerWeatherDays: {
    flexGrow: 1,
    flex: 1,
    alignItems: "center",
    paddingBottom: 10,
  },
});
