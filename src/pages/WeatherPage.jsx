import React, { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { WeatherDisplay } from "../components/WeatherDisplay";
import { useWeather } from "../hooks/useWeather";

export const WeatherPage = () => {
  const [city, setCity] = useState("");
  const { weather, loading, error, fetchWeather } = useWeather();
  const handleSearch = (searchCity) => {
    setCity(searchCity);
    fetchWeather(searchCity);
  };
  return (
    <div className="max-w-2xl mx-auto">
      <SearchBar onSearch={handleSearch} />
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      )}
      {error && <div className="text-red-500 text-center mt-4">{error}</div>}
      {weather && <WeatherDisplay weather={weather} />}
    </div>
  );
};
