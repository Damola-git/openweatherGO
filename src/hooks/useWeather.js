import { useState } from "react";
import axios from "axios";
import { useSearchHistory } from "./useSearchHistory";

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_KEY;

export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { addToHistory } = useSearchHistory();

  const fetchWeather = async (city) => {
    setLoading(true);
    setError("");

    if (!API_KEY) {
      setError("Missing OpenWeatherMap API key. Please check your .env file.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            q: city,
            units: "metric",
            appid: API_KEY,
          },
        }
      );

      console.log(response);

      const weatherData = {
        city: response.data.name,
        temperature: response.data.main.temp, // Adjusted property name
        condition: response.data.weather[0].main,
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind.speed,
      };

      setWeather(weatherData);
      addToHistory({ city, date: new Date().toISOString() });
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      console.log(err);
    } finally {
      setLoading(false);
    }
};


  return { weather, loading, error, fetchWeather };
};
