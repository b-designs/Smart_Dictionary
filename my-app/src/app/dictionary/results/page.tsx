/*
 * DESCRIPTION:
 * This file handles the results page. The searched word
 * uses the DictionaryEntry interface to display the relevant
 * information.
 * The API's used are the Websters Dictionary Medical and Spanish APIs
 * 
 */


'use client';  // Necessary for accessing search params in Next.js

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
interface DictionaryEntry {
  meta: {
    src: string;
    id: string;
    uuid: string;
    sort: string;
    stems: string[];
    offensive: boolean;
  };
  hwi: {
    hw: string; // The word itself
    prs?: {
      mw: string; // Pronunciation (e.g., "ˈhärt")
      sound?: {
        audio: string; // Audio filename (e.g., "heart001")
      };
    }[]; // Array of pronunciations
  };
  shortdef: string[]; // Array of definitions
}


interface TranslatedEntry {
  headword: string;
  definitions: string[];
}

export default function Page() {
  const searchParams = useSearchParams();
  const word = searchParams.get('word'); // Get the search term from the URL
  const [englishDefinitions, setEnglishDefinitions] = useState<DictionaryEntry | null>(null);
  const [spanishDefinitions, setSpanishDefinitions] = useState<TranslatedEntry | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [noResultsMessage, setNoResultsMessage] = useState<string | null>(null); // State for no results message
  
  useEffect(() => {
    const fetchDefinitions = async () => {
      try {
        const res = await fetch(`/api/dictionary?word=${word}`);
        const data = await res.json();
  
        console.log('API Response data:', data);
  
        if (res.ok) {
          // Extract English and Spanish definitions
          const englishData = data.english.find((entry: any) => entry.meta?.src === 'medical');
          const spanishData = data.spanish; // Spanish is now assumed to have headword and definition
  
          setEnglishDefinitions(englishData || null);
          setSpanishDefinitions(spanishData || null);
  
          // Handle "no results" case
          if (!englishData && !spanishData) {
            setNoResultsMessage(`No results found for the word '${word}'`);
          } else {
            setNoResultsMessage(null); // Clear the message if results are found
          }
  
          setError(null);
  
          // Add the word to history in localStorage
          if (englishData && spanishData) {
            const historyItem = {
              englishWord: word || '',
              spanishWord: spanishData.headword || '',
            };
  
            // Retrieve existing history from localStorage
            const storedHistory = localStorage.getItem('searchHistory');
            const history = storedHistory ? JSON.parse(storedHistory) : [];
  
            // Avoid duplicate entries in history
            const isDuplicate = history.some(
              (entry: { englishWord: string }) => entry.englishWord === historyItem.englishWord
            );
  
            if (!isDuplicate) {
              // Add new entry to the history
              history.push(historyItem);
  
              // Enforce a maximum limit (e.g., 10 words)
              const maxHistoryLimit = 10;
              if (history.length > maxHistoryLimit) {
                history.shift(); // Remove the oldest entry if the limit is exceeded
              }
  
              // Update localStorage
              localStorage.setItem('searchHistory', JSON.stringify(history));
            }
          }
        } else {
          setError('No definitions found');
        }
      } catch (err) {
        console.error('Failed to fetch definitions:', err);
        setError('Failed to fetch definitions');
      }
    };
  
    if (word) {
      fetchDefinitions();
    }
  }, [word]);
  
  const playPronunciation = (audioFile: string) => {
    const subdirectory = audioFile.startsWith("bix")
      ? "bix"
      : audioFile.startsWith("gg")
      ? "gg"
      : /^[0-9]/.test(audioFile[0])
      ? "number"
      : audioFile[0];
  
    const audioUrl = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${subdirectory}/${audioFile}.mp3`;
  
    // Debugging
    console.log("Audio URL:", audioUrl);
  
    const audio = new Audio(audioUrl);
    audio.play();
  };
  
  
  const addToFavorites = () => {
    if (englishDefinitions && spanishDefinitions) {
      const favoriteItem = {
        englishWord: word || '',
        spanishWord: spanishDefinitions.definitions?.[0]?.split('(')[0]?.trim() || '',
      };
  
      // Retrieve existing favorites from localStorage
      const storedFavorites = localStorage.getItem('favorites');
      const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
  
      // Avoid duplicate entries
      const isDuplicate = favorites.some(
        (entry: { englishWord: string }) => entry.englishWord === favoriteItem.englishWord
      );
  
      if (!isDuplicate) {
        favorites.push(favoriteItem);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${favoriteItem.englishWord} added to favorites!`);
      } else {
        alert(`${favoriteItem.englishWord} is already in favorites!`);
      }
    }
  };
  
  
  
  return (
    <main>
      <div className="flex justify-between items-center mt-4">
        <h1 className="mt-4 text-black-700">Results for {word}...</h1>
        <div className="mt-4">
          <button
            onClick={addToFavorites}
            className="bg-emerald-400 text-white px-4 py-2 rounded hover:bg-emerald-600"
          >
            Add to Favorites
          </button>
        </div>
      </div>
  
      <div className="border border-gray-200 p-4 my-4">
        {error && <p className="text-red-500">{error}</p>}
        {noResultsMessage && <p className="text-yellow-500">{noResultsMessage}</p>}
        {!error && !noResultsMessage && (
          <div className="flex justify-between">
            {/* English Definition */}
            {englishDefinitions && (
              <div className="w-1/2 pr-4">
                <div className="flex items-center">
                  <h2 className="text-3xl text-emerald-500 p-2">{englishDefinitions.hwi?.hw}</h2>
                  {englishDefinitions?.hwi?.prs?.[0]?.sound?.audio && (
                  <button
                    onClick={() => {
                      const audioFile = englishDefinitions?.hwi?.prs?.[0]?.sound?.audio;
                      if (audioFile) {
                        playPronunciation(audioFile);
                      } else {
                        console.error("No audio file available for pronunciation");
                      }
                    }}
                    className="ml-4 bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600"
                  >
                    🔊 Pronounce
                  </button>
                )}

                </div>
                <div className="p-2">
                  <strong>Definition:</strong>
                  <ul className="list-disc pl-5">
                    {englishDefinitions.shortdef.map((def, defIndex) => (
                      <li key={defIndex} className="p-2">
                        {def}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
  
            {/* Spanish Definition */}
            <div className="w-1/2 pl-4">
              <h2 className="text-3xl text-emerald-500 p-2">
                {spanishDefinitions?.headword || "No translation"}
              </h2>
              <div className="p-2">
                <strong>La Definición:</strong>
                <ul className="list-disc pl-5">
                  {spanishDefinitions?.definitions?.length ? (
                    spanishDefinitions.definitions.map((def, index) => (
                      <li key={index} className="p-2">
                        {def}
                      </li>
                    ))
                  ) : (
                    <li>No definitions available</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
  
}