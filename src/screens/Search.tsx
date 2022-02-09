import React, { useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { useDebounce } from "use-debounce/lib";
import { usePlaces } from "../api";
import Constants from "expo-constants";
import { CardCity } from "../components/CardCity";
import { useStoredPlaces } from "../App.store";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  navigation: {
    navigate: (to: string) => void;
  };
};

export function Search(props: Props) {
  const { navigation } = props;
  const [placeQuery, setPlaceQuery] = useState("");
  const [debouncedPlaceQuery] = useDebounce(placeQuery, 300);
  const { isLoading, data = [] } = usePlaces(debouncedPlaceQuery);

  const storedPlaces = useStoredPlaces((state) => state.places);
  const storedPlacesInsert = useStoredPlaces((state) => state.addPlace);
  return (
    <View style={styles.root}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Citys")}
        style={{ height: 30, width: 30, marginTop: 2, marginLeft: 15 }}
      >
        <Ionicons name="arrow-back" size={30} />
      </TouchableOpacity>

      <View style={styles.headerSearch}>
        <TextInput
          placeholder="Busque uma cidade"
          style={styles.inputSearch}
          onChangeText={(text) => setPlaceQuery(text)}
          value={placeQuery}
        />
      </View>
      {isLoading && <ActivityIndicator size={20} color={"#add8ec"} />}
      {data.length > 0 ? (
        <FlatList
          contentContainerStyle={{ alignItems: "center" }}
          keyExtractor={(i: string) => i}
          data={data}
          renderItem={({ item }) => (
            <CardCity
              isAddedPlace={storedPlaces.includes(item)}
              location={item}
              addPlace={() => storedPlacesInsert(item)}
            />
          )}
        />
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Cidade não encontrada</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    justifyContent: "center",
  },
  headerSearch: {
    backgroundColor: "#f3f3f3",
    height: 35,
    margin: 15,
    marginTop: 30,
    borderRadius: 7,
  },
  inputSearch: {
    textAlign: "left",
    margin: 10,
  },
});
