import React from "react";
import { Sun, Cloud, CloudRain, CloudSnow } from "lucide-react";

export const WeatherDisplay = ({ weather }) => {
  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return <Sun className="w-16 h-16 text-yellow-400" />;
      case "clouds":
        return <Cloud className="w-16 h-16 text-gray-400" />;
      case "rain":
        return <CloudRain className="w-16 h-16 text-blue-400" />;
      case "snow":
        return <CloudSnow className="w-16 h-16 text-blue-200" />;
      default:
        return <Sun className="w-16 h-16 text-yellow-400" />;
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{weather.city}</h2>
          <p className="text-4xl font-bold text-gray-900 mt-2">
            {Math.round(weather.temperature)}°C
          </p>
          <p className="text-gray-600 mt-1 capitalize">{weather.condition}</p>
        </div>
        {getWeatherIcon(weather.condition)}
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="text-center">
          <p className="text-gray-600">Humidity</p>
          <p className="text-xl font-semibold">{weather.humidity}%</p>
        </div>
        <div className="text-center">
          <p className="text-gray-600">Wind Speed</p>
          <p className="text-xl font-semibold">{weather.windSpeed} km/h</p>
        </div>
      </div>
    </div>
  );
};
