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
type Weather = {
  description: string;
};
export function Details({ route }: any) {
  const { location, name, navigation } = route.params;

  const { isLoading, data = [] } = usePlaceWeatherForecast(
    location.lat,
    location.lon,
    "metric"
  );
  return isLoading ? (
    <View>
      <ActivityIndicator size={20} color={"#000"} />
    </View>
  ) : (
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
          return <Text style={{ fontSize: 25 }}>{weather.description}</Text>;
        })}
      </View>

      <View
        style={{
          flexGrow: 1,
          flex: 1,
          alignItems: "center",
          paddingBottom: 10,
        }}
      >
        <Text style={{ fontSize: 15 }}>Previsão para os próximos 5 dias</Text>
        <FlatList
          keyExtractor={(i) => i.dt}
          data={data.daily.slice(0, 6)}
          renderItem={({ item, index }: any) => (
            <CardDetailsDays item={item} index={index} />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
