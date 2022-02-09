import { useQuery } from "react-query";
import axios from "axios";
import { API_URL_GOOGLE, API_TOKEN_GOOGLE } from "../App.constants";
import { toast } from "../lib/Toast";

export function usePlaces(query: string) {
  return useQuery({
    queryKey: ["places", query],
    queryFn: async () => {
      const { data } = await axios.get(
        `${API_URL_GOOGLE}/place/autocomplete/json`,
        {
          params: {
            input: query,
            types: "(cities)",
            key: API_TOKEN_GOOGLE,
            language: "pt-BR",
          },
        }
      );

      return (
        data?.predictions.map((i: { description: string }) => {
          return i.description;
        }) ?? []
      );
    },
    onError: () => toast("Não foi possivel buscar as cidades"),
    enabled: Boolean(query.trim()),
  });
}
