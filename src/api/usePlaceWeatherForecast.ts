import axios from "axios";
import { useQuery } from "react-query";
import { API_TOKEN_WEATHER, API_URL_WEATHER } from "../App.constants";
import { toast } from "../lib/Toast";

export function usePlaceWeatherForecast(location: string, units : 'metric' | 'imperial') {
  return useQuery({
    queryKey: ["weather", location, units],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL_WEATHER}/forecast`, {
        params: {
          city: location,
          KEY: API_TOKEN_WEATHER,
          units: units
        },
      });

      return data;
    },
    onError: () => toast("Não foi possível carregar os detalhes da cidade escolhida"),
    enabled: Boolean(location.trim())
  });
}
