import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useStoredPlaces } from "../App.store";
import { CardCityWeather } from "../components/CardCityWeather";
import { statusBarHeight } from "../App.constants";
import { FontAwesome } from "@expo/vector-icons";
type Props = {
  navigation: {
    navigate: (to: string) => void;
  };
};

export function Cities(props: Props) {
  const { navigation } = props;
  const storedPlaces = useStoredPlaces((state) => state.places);

  return (
    <View style={styles.root}>
      <View
        style={{
          margin: 20,
          alignContent: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 30 }}>Cidades</Text>
        <TouchableOpacity
          style={{
            alignItems: "flex-end",
          }}
          onPress={() => navigation.navigate("Search")}
        >
          <FontAwesome name="search-plus" size={30} />
        </TouchableOpacity>
      </View>
      {storedPlaces.length > 0 ? (
        <FlatList
          data={storedPlaces}
          contentContainerStyle={{ alignItems: "center" }}
          keyExtractor={(i) => i.place_id}
          renderItem={({ item }) => (
            <CardCityWeather location={item} navigation={navigation} />
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
    marginTop: statusBarHeight,
  },
});
