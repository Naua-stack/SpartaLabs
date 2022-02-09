import AsyncStorage from "@react-native-async-storage/async-storage";
import create from "zustand";
import { persist } from "zustand/middleware";

export const useStoredPlaces = create(
  persist(
    (set, get: any) => ({
      places: [] as string[],

      addPlace: (payload: string) =>
        set({ places: [...new Set([...get().places, payload])] }),
      removePlaces: () => set({ places: [] }),
      removePlace: (payload: string) =>
        set({
          places: get().places.filter((place: string) => place !== payload),
        }),
    }),

    {
      name: "@places",
      getStorage: () => AsyncStorage,
    }
  )
);
