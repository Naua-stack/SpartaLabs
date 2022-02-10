import axios from "axios";
import { useQuery } from "react-query";
import { API_TOKEN_WEATHER, API_URL_WEATHER } from "../App.constants";
import { toast } from "../lib/Toast";

export function usePlaceWeatherForecast(
  lat: string,
  lon: string,
  units: "metric" | "imperial"
) {
  return useQuery({
    queryKey: ["weather", lat, lon, units],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL_WEATHER}/onecall`, {
        params: {
          lat: lat,
          lon: lon,
          appid: API_TOKEN_WEATHER,
          units: units,
          lang: "pt_br",
          exclude: "minutely,hourly,alerts",
        },
      });

      return data;
    },
    onError: () =>
      toast("Não foi possível carregar os detalhes da cidade escolhida"),
    enabled: Boolean(lat),
  });
}
