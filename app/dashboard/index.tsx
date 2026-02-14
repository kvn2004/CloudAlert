import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { getCurrentWeather } from "../../src/services/weather.service";
import { LOCATION_SEARCH_URL, WEATHER_API_KEY } from "@/src/constants/api";

// small helper to format ISO time -> HH:MM
const formatHour = (iso: string) => {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return iso;
  }
};

export default function HomeWeather() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [currentTemp, setCurrentTemp] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [windSpeed, setWindSpeed] = useState<number | null>(null);
  const [visibility, setVisibility] = useState<number | null>(null);
  const [cloudCover, setCloudCover] = useState<number | null>(null);
  const [locationName, setLocationName] = useState<string | null>(null);
  const [results, setResults] = useState<any[]>([]);

  const [hourly, setHourly] = useState<Array<{ time: string; temp: number }>>(
    [],
  );

  const [loading, setLoading] = useState(false);
  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      alert("Location permission denied");
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    setLocation(loc);
    return loc.coords;
  };
  const searchCity = async (cityName: string) => {
    try {
      if (cityName.length < 3) {
        setResults([]);
        return;
      }

      const res = await fetch(
        `${LOCATION_SEARCH_URL}?q=${cityName}&limit=5&appid=${WEATHER_API_KEY}`,
      );

      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.log("Search error", error);
    }
  };
  const selectCity = async (lat: number, lon: number, name: string) => {
    try {
      setLoading(true);
      setResults([]);
      setSearch(name);

      const data = await getCurrentWeather(lat, lon);

      setCurrentTemp(data.main?.temp ?? null);
      setHumidity(data.main?.humidity ?? null);
      setWindSpeed(data.wind?.speed ?? null);
      setVisibility(data.visibility ?? null);
      setCloudCover(data.clouds?.all ?? null);
      setLocationName(name);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const loadWeather = async () => {
    try {
      setLoading(true);
      const coords = await getCurrentLocation();
      if (!coords) return;

      const data = await getCurrentWeather(coords.latitude, coords.longitude);

      setCurrentTemp(data.main?.temp ?? null);
      setHumidity(data.main?.humidity ?? null);
      setWindSpeed(data.wind?.speed ?? null);
      setVisibility(data.visibility ?? null);
      const address = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      console.log(address);

      setCloudCover(data.clouds?.all ?? null);
      setLocationName(address[0]?.city ?? null);
      // Mock hourly or implement forecast later
      setHourly([]);
    } catch (err: any) {
      console.warn("Weather load error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather();
  }, []);
  useEffect(() => {
    const delay = setTimeout(() => {
      if (search.length > 2) {
        searchCity(search);
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [search]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* 1. Header & Search */}
      <View className="px-6 pt-4 pb-2 my-8">
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-2xl font-light tracking-tighter">
            Cloud<Text className="font-bold">ALERT</Text>
          </Text>
          <TouchableOpacity className="items-center justify-center w-10 h-10 bg-black rounded-full">
            <Ionicons name="person-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center px-4 bg-gray-100 rounded-2xl h-14">
          <Ionicons name="search-outline" size={20} color="#9ca3af" />
          <TextInput
            className="flex-1 ml-3 text-base text-black"
            placeholder="Search city..."
            placeholderTextColor="#9ca3af"
            value={search}
            onChangeText={setSearch}
          />
          {results.length > 0 && (
            <View className="mt-2 bg-white shadow-md rounded-2xl max-h-60">
              <ScrollView>
                {results.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    className="px-4 py-3 border-b border-gray-100"
                    onPress={() => selectCity(item.lat, item.lon, item.name)}
                  >
                    <Text className="font-medium text-black">
                      {item.name}, {item.country}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6">
        {/* 2. Main Weather Hero */}
        <View className="items-center py-10 border-b border-gray-100">
          <Text className="text-gray-500 text-lg uppercase tracking-[4px] mb-2">
            {location ? locationName || "Current Location" : "Your Location"}
          </Text>
          <Text className="font-black text-black text-8xl">
            {currentTemp !== null ? `${Math.round(currentTemp)}°` : "--"}
          </Text>
          <View className="flex-row items-center mt-2">
            <Ionicons name="cloud-outline" size={24} color="black" />
            <Text className="ml-2 text-xl font-medium text-gray-800">
              {loading ? "Loading…" : "Current conditions"}
            </Text>
          </View>
          <Text className="mt-1 text-gray-400">
            {location ? "Live data" : ""}
          </Text>
        </View>

        {/* 3. Hourly Forecast Horizontal List */}
        <View className="py-8">
          <Text className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-6">
            Hourly Forecast
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row"
          >
            {hourly.length === 0 ? (
              <Text className="text-gray-400">No hourly data available</Text>
            ) : (
              hourly.map((item, index) => (
                <View key={index} className="items-center mr-6">
                  <Text className="mb-3 text-xs text-gray-400">
                    {formatHour(item.time)}
                  </Text>
                  <Ionicons name="cloud-outline" size={20} color="black" />
                  <Text className="mt-3 text-lg font-bold text-black">
                    {Math.round(item.temp)}°
                  </Text>
                </View>
              ))
            )}
          </ScrollView>
        </View>

        {/* 4. Weather Details Grid */}
        <View className="flex-row flex-wrap justify-between pb-10">
          <DetailCard
            label="Humidity"
            value={humidity !== null ? `${humidity}%` : "--"}
            icon="water-outline"
          />
          <DetailCard
            label="Wind"
            value={windSpeed !== null ? `${windSpeed} m/s` : "--"}
            icon="thunderstorm-outline"
          />
          <DetailCard
            label="Overcast Clouds"
            value={cloudCover !== null ? `${cloudCover}%` : "--"}
            icon="cloud-outline"
          />
          <DetailCard
            label="Visibility"
            value={visibility !== null ? `${visibility / 1000} km` : "--"}
            icon="eye-outline"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Helper Component for the grid
const DetailCard = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: any;
}) => (
  <View className="w-[48%] bg-gray-50 rounded-3xl p-5 mb-4 border border-gray-100">
    <View className="flex-row items-start justify-between mb-4">
      <Ionicons name={icon} size={20} color="black" />
    </View>
    <Text className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">
      {label}
    </Text>
    <Text className="mt-1 text-xl font-bold text-black">{value}</Text>
  </View>
);
