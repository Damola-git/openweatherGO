import React from "react";
import { useSearchHistory } from "../hooks/useSearchHistory";
import { Trash2, Trash } from "lucide-react";

export const HistoryPage = () => {
  const { history, removeFromHistory, clearHistory } = useSearchHistory();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Search History</h1>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="flex items-center space-x-2 px-4 py-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash size={20} />
            <span>Clear All</span>
          </button>
        )}
      </div>
      <div className="space-y-4">
        {history.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-4 flex justify-between items-center hover:shadow-md transition-shadow"
          >
            <div>
              <p className="font-semibold text-lg text-gray-800">{item.city}</p>
              <p className="text-sm text-gray-500">{formatDate(item.date)}</p>
            </div>
            <button
              onClick={() => removeFromHistory(index)}
              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
              title="Delete from history"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
        {history.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No search history yet</p>
            <p className="text-sm text-gray-400 mt-2">
              Search for a city to see your history here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
