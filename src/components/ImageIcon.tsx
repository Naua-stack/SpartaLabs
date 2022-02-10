import React from "react";
import { Image } from "react-native";

export function ImageIcon(item: any) {
  return (
    <Image
      style={{ width: 50, height: 40, marginLeft: -10 }}
      source={{
        uri: `http://openweathermap.org/img/wn/${
          item.item || item.icon
        }@2x.png`,
      }}
    />
  );
}
