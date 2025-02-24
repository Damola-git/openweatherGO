import { useState } from "react";
import axios from "axios";
import { useSearchHistory } from "./useSearchHistory";

const API_KEY = "156b4afc91c52df6d850fa3c0ab62392";

export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { addToHistory } = useSearchHistory();

  const fetchWeather = async (city) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `https://open-weather13.p.rapidapi.com/city/${city}/EN`,
        {
          headers: {
            "x-rapidapi-host": "open-weather13.p.rapidapi.com",
            "x-rapidapi-key": API_KEY,
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
