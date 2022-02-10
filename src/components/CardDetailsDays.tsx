import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import moment from "moment";
import "moment/min/locales";
import { ImageIcon } from "./ImageIcon";
moment.locale("pt-br");
type Props = {
  item: any;
  index: number;
};
export function CardDetailsDays(props: Props) {
  const { item, index } = props;

  function getDayOfWeek() {
    if (index === 0) {
      return "Hoje";
    } else {
      if (index === 1) {
        return "Amanhã";
      }
    }
    return moment.unix(item.dt).format("dddd");
  }
  return (
    <View style={styles.card}>
      <View
        style={{
          flex: 1,
          padding: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ justifyContent: "space-between" }}>
          <View>
            <Text style={{ fontSize: 26 }}>{getDayOfWeek()}</Text>
            <Text style={{ fontSize: 17 }}>
              {moment.unix(item.dt).format("DD [de] MMMM")}
            </Text>
          </View>
          <View>
            <ImageIcon item={item.weather[0].icon} />
            <Text style={{ fontSize: 17 }}>{item.weather[0].description}</Text>
            <Text style={{ fontSize: 15 }}>
              {Math.round(item.temp.min)}º - {Math.round(item.temp.max)}º
            </Text>
          </View>
        </View>
      </View>
      <View style={{ margin: 20 }}>
        <Text style={{ fontSize: 30, color: "orange" }}>
          {Math.round(item.temp.day)}º
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 320,
    flexDirection: "row",
    backgroundColor: "#a6dced",
    height: 180,
    marginTop: 20,
    alignContent: "center",
    borderRadius: 10,
  },
});
