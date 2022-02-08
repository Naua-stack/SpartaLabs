import AsyncStorage from "@react-native-community/async-storage";
import { configurePersist } from "zustand-persist";

const { persist } = configurePersist({
  storage: AsyncStorage,
  rootKey: "@weatherapp",
});

type Place = {
  id: string;
};

export const usePlacesStore = persist({ key: "places" }, (set) => ({
  places: [] as Place[],

  favorites: [] as string[],

  insert: (place: Place) => {
    set((state: any) => {
      if (state.places.find((p: any) => p.id === place.id)) {
        return state;
      }

      return {
        places: [...state.places, place],
      };
    })
  },

  remove: (place: Place) => {
    set((state: any) => ({
      places: state.places.filter((p: any) => p.id !== place.id),
    }))
  },

   favorite: (id: string) => {
    set((state: any) => {
      if (!state.places.find((p: any) => p === id)) {
        return state;
      }

      return {
        favorites: [...state.favorites, id],
      };
    })
   },

   unfavorite: (id: string) => {
    set((state: any) => {
      if (!state.places.find((i: string) => i === id)) {
        return state;
      }

      return {
        favorites: state.favorites.filter((i: string) => i !== id),
      };
    })
   }
}));