import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Constants from "expo-constants";
import { useStoredPlaces } from "../App.store";
import { CardCityWeather } from "../components/CardCityWeather";

type Props = {
  navigation: {
    navigate: (to: string) => void;
  };
};

export function Citys(props: Props) {
  const { navigation } = props;

  const storedPlaces = useStoredPlaces((state) => state.places);
  return (
    <View style={styles.root}>
      <View
        style={{
          backgroundColor: "#add8ec",
          marginTop: Constants.statusBarHeight - 5,
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 25 }}>Cidades</Text>
        <TouchableOpacity
          style={{
            alignItems: "flex-end",
          }}
          onPress={() => navigation.navigate("Search")}
        >
          <Text>Pesquisar</Text>
        </TouchableOpacity>
      </View>

      {storedPlaces.length > 0 ? (
        <FlatList
          data={storedPlaces}
          contentContainerStyle={{ alignItems: "center" }}
          keyExtractor={(i: string) => i}
          renderItem={({ item }) => (
            <CardCityWeather
              location={item}
              onPressCard={() => navigation.navigate("Details")}
            />
          )}
        />
      ) : (
        <View
          style={{
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center", padding: 20 }}>
            Nenhuma cidade adicionada, adicione usando o botão de pesquisa
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
  },
});
