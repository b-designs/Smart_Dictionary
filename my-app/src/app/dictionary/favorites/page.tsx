'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface FavoriteItem {
  englishWord: string;
  spanishWord: string;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  // Fetch favorites from localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Clear favorites handler
  const clearFavorites = () => {
    localStorage.removeItem('favorites'); // Clear localStorage
    setFavorites([]); // Reset favorites state
  };

  return (
    <main>
      <h1 className="mt-4 text-black-700">Favorites</h1>
      <div className="flex justify-between items-center mt-4">
        <p className="text-gray-500">{favorites.length} items in favorites</p>
        {favorites.length > 0 && (
          <button
            onClick={clearFavorites}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear Favorites
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {favorites.length === 0 ? (
          <p className="text-gray-500">No favorites added yet</p>
        ) : (
          favorites.map((entry, index) => (
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
