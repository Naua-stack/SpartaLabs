import axios from "axios";
import { useQuery } from "react-query";
import { API_TOKEN_WEATHER, API_URL_WEATHER } from "../App.constants";
import { toast } from "../lib/Toast";

export type weatherData = {
  coord: {
    lat: string;
    lon: string;
  };
  temp: {
    min: number;
    max: number;
    day: number;
  };
  current: {
    temp: number;
    weather: { description: string }[];
  };
  daily: { dt: number }[];
  weather: { icon: string; description: string }[];
};

export function usePlaceWeatherForecast(
  lat: string,
  lon: string,
  units: string
) {
  return useQuery({
    queryKey: ["weather", lat, lon, units],
    queryFn: async () => {
      const { data } = await axios.get<weatherData>(
        `${API_URL_WEATHER}/onecall`,
        {
          params: {
            lat: lat,
            lon: lon,
            appid: API_TOKEN_WEATHER,
            units: units,
            lang: "pt_br",
            exclude: "minutely,hourly,alerts",
          },
        }
      );

      return data;
    },
    onError: () =>
      toast("Não foi possível carregar os detalhes da cidade escolhida"),
    enabled: Boolean(lat),
  });
}
