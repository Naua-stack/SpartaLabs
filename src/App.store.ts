import AsyncStorage from "@react-native-async-storage/async-storage";
import create from "zustand";
import { persist } from "zustand/middleware";

type Place = {
  description: string;
  place_id: string;
};

export const useStoredPlaces = create(
  persist(
    (set, get: any) => ({
      places: [] as Place[],
      favorites: [] as string[],

      addPlace: (payload: Place) =>
        set({
          places: [...new Set([...get().places, payload])],
          favorites: get().favorites.filter(
            (place: Place) => place.place_id !== payload.place_id
          ),
        }),
      removePlaces: () => set({ places: [] }),
      favorite: (payload: Place) =>
        set({
          favorites: [...new Set([...get().favorites, payload.place_id])],
        }),
      unfavorite: (payload: Place) =>
        set({
          favorites: get().favorites.filter(
            (place_id: string) => place_id !== payload.place_id
          ),
        }),
      removePlace: (payload: Place) =>
        set({
          places: get().places.filter(
            (place: Place) => place.place_id !== payload.place_id
          ),
        }),
    }),

    {
      name: "@places",
      getStorage: () => AsyncStorage,
    }
  )
);
