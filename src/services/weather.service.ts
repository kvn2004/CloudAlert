import { WEATHER_API_KEY, WEATHER_BASE_URL } from "../constants/api";

export const getCurrentWeather = async (
  lat: number,
  lon: number
) => {
  const res = await fetch(
    `${WEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch weather");
  }

  return res.json();
};