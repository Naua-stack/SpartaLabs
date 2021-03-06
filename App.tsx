import { QueryClient, QueryClientProvider } from "react-query";
import NetInfo from "@react-native-community/netinfo";
import { onlineManager } from "react-query";
import { Stack } from "./src/App.stack";
import { useStoredPlaces } from "./src/App.store";
import { LogBox } from "react-native";
import "react-native-gesture-handler";
const queryClient = new QueryClient();

//https://stackoverflow.com/questions/44603362/setting-a-timer-for-a-long-period-of-time-i-e-multiple-minutes
LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(Boolean(state.isConnected));
  });
});

export default function App() {
  useStoredPlaces();

  return (
    <QueryClientProvider client={queryClient}>
      <Stack />
    </QueryClientProvider>
  );
}
