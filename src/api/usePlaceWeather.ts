import axios from "axios";
import { useQuery } from "react-query";
import { API_TOKEN_WEATHER, API_URL_WEATHER } from "../App.constants";
import { toast } from "../lib/Toast";

export function usePlaceWeather(location: string) {
  return useQuery({
    queryKey: ["weather", location],
    refetchInterval: 1800000,
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL_WEATHER}/weather`, {
        params: {
          city: location,
          KEY: API_TOKEN_WEATHER,
        },
      });

      return data;
    },
    onError: () => toast("Não foi possível carregar o clima da cidade escolhida"),
    enabled: Boolean(location.trim())
  });
}
