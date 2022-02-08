import { Alert, Platform, ToastAndroid } from "react-native";

export function toast(message: string) {
  if (Platform.OS) {
    Alert.alert("Erro", message);
  } else {
    ToastAndroid.show(message, 50);
  }
}
