import React from "react";
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type City = {
  location: string;
  addPlace: () => void;
  isAddedPlace: boolean;
};
export function CardCity(item: City) {
  const { location, addPlace, isAddedPlace } = item;
  const itemCity = {
    title: location.substring(0, location.indexOf(",")),
    subtitle: location.substring(location.indexOf(",") + 2),
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.card}>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 24 }}>{itemCity.title}</Text>
          <Text style={{ fontSize: 15, marginLeft: 2 }}>
            {itemCity.subtitle}
          </Text>
        </View>
        <View style={{ padding: 20 }}>
          <TouchableOpacity onPress={() => addPlace()}>
            <Text style={{ fontSize: 17, color: "#4169e1" }}>
              {isAddedPlace ? "Adicionado" : "Adicionar"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
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
