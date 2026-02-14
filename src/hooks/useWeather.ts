import { useEffect, useState } from "react";
import { getCurrentLocation } from "../services/location.service";
import { getCurrentWeather } from "../services/weather.service";

export const useWeather = () => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadWeather = async () => {
      try {
        setLoading(true);
        const coords = await getCurrentLocation();
        const data = await getCurrentWeather(coords.latitude, coords.longitude);
        if (mounted) {
          setWeather(data);
          setError(null);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadWeather();

    return () => {
      mounted = false;
    };
  }, []);

  return { weather, loading, error };
};
