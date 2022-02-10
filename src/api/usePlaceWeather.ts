import axios from "axios";
import { useQuery } from "react-query";
import {
  API_TOKEN_GOOGLE,
  API_TOKEN_WEATHER,
  API_URL_GOOGLE,
  API_URL_WEATHER,
} from "../App.constants";
import { toast } from "../lib/Toast";

export function usePlaceWeather(
  place_id: string,
  units: "metric" | "imperial"
) {
  return useQuery({
    queryKey: ["weather", place_id, units],
    queryFn: async () => {
      return axios
        .get(`${API_URL_GOOGLE}/place/details/json`, {
          params: {
            place_id: place_id,
            key: API_TOKEN_GOOGLE,
            fields: "geometry",
          },
        })
        .then(async ({ data }) => {
          const weather = await axios.get(`${API_URL_WEATHER}weather`, {
            params: {
              lat: data.result.geometry.location.lat,
              lon: data.result.geometry.location.lng,
              lang: "pt_br",
              appid: API_TOKEN_WEATHER,
              units: units,
            },
          });
          return weather.data;
        });
    },
    onError: () =>
      toast("Não foi possível carregar o clima da cidade escolhida"),
    enabled: Boolean(place_id.trim()),
  });
}
