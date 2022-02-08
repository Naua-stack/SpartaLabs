import { QueryClient, QueryClientProvider } from "react-query";
import { Start } from "./src/screens/Start";
import NetInfo from "@react-native-community/netinfo";
import { onlineManager } from "react-query";
import { ActivityIndicator } from "react-native";
import { PersistGate } from "zustand-persist";

const queryClient = new QueryClient();

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(Boolean(state.isConnected));
  });
});

export default function App() {
  return (
    <PersistGate loading={<ActivityIndicator />}>
      <QueryClientProvider client={queryClient}>
        <Start />
      </QueryClientProvider>
    </PersistGate>
  );
}
