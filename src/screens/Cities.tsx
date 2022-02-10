import React, { useMemo } from "react";
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
  const units = useStoredPlaces((state) => state.units);
  const changeUnits = useStoredPlaces((state) => state.changeUnits);
  const favorites = useStoredPlaces((state) => state.favorites);

  const cards = useMemo(() => {
    return [
      storedPlaces.filter((i) => favorites.includes(i.place_id)),
      storedPlaces.filter((i) => !favorites.includes(i.place_id)),
    ].flat();
  }, [storedPlaces, favorites]);
  return (
    <View style={styles.root}>
      <View style={styles.header}>
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
      <View style={styles.containerChangeMetric}>
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => changeUnits("metric")}
        >
          <Text style={{ fontSize: 25 }}>Cº</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeUnits("imperial")}>
          <Text style={{ fontSize: 25 }}>Fº</Text>
        </TouchableOpacity>
      </View>
      {storedPlaces.length > 0 ? (
        <FlatList
          data={cards}
          contentContainerStyle={{ alignItems: "center" }}
          keyExtractor={(i) => i.place_id}
          renderItem={({ item }) => (
            <CardCityWeather
              location={item}
              navigation={navigation}
              units={units}
            />
          )}
        />
      ) : (
        <View style={styles.containerEmptyList}>
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
  containerEmptyList: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  header: {
    margin: 20,
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerChangeMetric: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
    marginRight: 20,
  },
});
