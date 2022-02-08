import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useStoredPlaces } from "../App.store";

type Props = {
  navigation: {
    navigate: (to: string) => void;
  };
};

export function Start(props: Props) {
  const { navigation } = props;

  const storedPlaces = useStoredPlaces((state) => state.places);
  const storedPlacesInsert = useStoredPlaces((state) => state.placesInsert);
  const storedPlacesClear = useStoredPlaces((state) => state.placesClear);

  return (
    <View style={styles.root}>
      <FlatList
        data={storedPlaces}
        keyExtractor={(i) => i.name}
        renderItem={({ item }) => {
          return <Text>{item.name}</Text>;
        }}
      />

      <TouchableOpacity
        onPress={() => storedPlacesClear()}
        style={{ padding: 15, margin: 15, marginTop: 0, height: 50 }}
      >
        <Text>CLEAR ALL</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => storedPlacesInsert({ name: `item-${Date.now()}` })}
        style={{ padding: 15, margin: 15, marginTop: 0, height: 50 }}
      >
        <Text>ADD</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Details")}
        style={{ padding: 15, margin: 15, marginTop: 0, height: 50 }}
      >
        <Text>IR PARA DETALHES</Text>
      </TouchableOpacity>
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
