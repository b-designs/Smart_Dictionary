'use client'; // Required for client-side logic like accessing localStorage

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface SearchHistory {
  englishWord: string;
  spanishWord: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<SearchHistory[]>([]);

  // Fetch history from localStorage
  useEffect(() => {
    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  // Clear history handler
  const clearHistory = () => {
    localStorage.removeItem('searchHistory'); // Clear localStorage
    setHistory([]); // Reset history state
  };

  return (
    <main>
      <h1 className="mt-4 text-black-700">Search History</h1>
      <div className="flex justify-between items-center mt-4">
        <p className="text-gray-500">{history.length} items in history</p>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear History
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {history.length === 0 ? (
          <p className="text-gray-500">No search history available</p>
        ) : (
          history.map((entry, index) => (
            <Link
              key={index}
              href={`/dictionary/results?word=${entry.englishWord}`}
            >
              <div className="border border-gray-300 p-4 rounded-lg hover:shadow-lg cursor-pointer">
                <div className="flex justify-between">
                  <span className="font-bold text-xl">{entry.englishWord}</span>
                  <span className="text-xl">{entry.spanishWord}</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </main>
  );
}
