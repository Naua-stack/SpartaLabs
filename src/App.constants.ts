import { ENV_API_TOKEN_WEATHER, ENV_API_TOKEN_GOOGLE } from "@env";
import Constants from "expo-constants";
export const API_TOKEN_WEATHER = ENV_API_TOKEN_WEATHER;
export const API_TOKEN_GOOGLE = ENV_API_TOKEN_GOOGLE;

export const API_URL_GOOGLE = "https://maps.googleapis.com/maps/api";
export const API_URL_WEATHER = "https://api.openweathermap.org/data/2.5/";
export const statusBarHeight = Constants.statusBarHeight;
