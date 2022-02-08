import { QueryClient, QueryClientProvider } from "react-query";
import NetInfo from "@react-native-community/netinfo";
import { onlineManager } from "react-query";
import { ActivityIndicator } from "react-native";
import { PersistGate } from "zustand-persist";
import { Stack } from "./src/App.stack";
import { useStoredPlaces } from "./src/App.store";

const queryClient = new QueryClient();

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(Boolean(state.isConnected));
  });
});

export default function App() {
  useStoredPlaces();

  return (
    <PersistGate>
      <QueryClientProvider client={queryClient}>
        <Stack />
      </QueryClientProvider>
    </PersistGate>
  );
}
