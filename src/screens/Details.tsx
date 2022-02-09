import React from "react";
import { Text, View, StyleSheet } from "react-native";

export function Details() {
  return (
    <View style={styles.root}>
      <Text>Está nos detalhes</Text>
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
