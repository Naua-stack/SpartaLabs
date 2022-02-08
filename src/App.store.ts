import AsyncStorage from "@react-native-async-storage/async-storage";
import { configurePersist } from "zustand-persist";
import createStore from "zustand";

const { persist } = configurePersist({
  storage: AsyncStorage,
  rootKey: "root",
});

export const useStoredPlaces = createStore<{
  places: any[];
  placesInsert: (payload: any) => any;
  placesClear: () => any;
}>(
  persist(
    {
      key: "places",
    },
    (set) => ({
      places: [],
      placesInsert: (place: any) =>
        set((state: any) => {
          return {
            places: [...state.places, place],
          };
        }),
      placesClear: () =>
        set((state) => {
          return {
            places: [],
          };
        }),
    })
  )
);
