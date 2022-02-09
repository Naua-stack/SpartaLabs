import AsyncStorage from "@react-native-async-storage/async-storage";
import create from "zustand";
import { persist } from "zustand/middleware";

export const useStoredPlaces = create(
  persist(
    (set, get: any) => ({
      places: [] as string[],
      favorites: [] as string[],

      addPlace: (payload: string) =>
        set({ places: [...new Set([...get().places, payload])] }),
      removePlaces: () => set({ places: [] }),
      favoriteToggle: (payload: string) =>
        set({ favorites: [...new Set([...get().favorites, payload])] }),
      unfavoriteToggle: (payload: string) =>
        set({
          favorites: get().favorites.filter(
            (place: string) => place !== payload
          ),
        }),
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
