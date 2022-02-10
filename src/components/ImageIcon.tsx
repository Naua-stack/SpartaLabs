import React from "react";
import { Image } from "react-native";

type props = {
  item: string;
};

export function ImageIcon({ item }: props) {
  return (
    <Image
      style={{ width: 50, height: 40, marginLeft: -10 }}
      source={{
        uri: `http://openweathermap.org/img/wn/${item}@2x.png`,
      }}
    />
  );
}
