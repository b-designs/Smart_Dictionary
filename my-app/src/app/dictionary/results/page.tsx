/*
 * DESCRIPTION:
 * This file handles the results page. The searched word
 * uses the DictionaryEntry interface to display the relevant
 * information. 
 * 
 */


'use client';  // Necessary for accessing search params in Next.js

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
interface DictionaryEntry {
  meta: {
    src: string;
  }
  hwi: {
    hw: string; // The word itself
  };
  shortdef: string[]; // Array of definitions
}

export default function Page() {
  const searchParams = useSearchParams();
  const word = searchParams.get('word'); // Get the search term from the URL
  const [englishDefinitions, setEnglishDefinitions] = useState<DictionaryEntry | null>(null);
  const [spanishDefinitions, setSpanishDefinitions] = useState<DictionaryEntry | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [noResultsMessage, setNoResultsMessage] = useState<string | null>(null); // State for no results message

  useEffect(() => {
    const fetchDefinitions = async () => {
      try {
        const res = await fetch(`/api/dictionary?word=${word}`);
        const data = await res.json();

        console.log('API Response data:', data);

        if (res.ok) {

          const englishData = data.english.find((entry: any) => entry.meta?.src === 'medical');
          const spanishData = data.spanish.find((entry: any) => entry.meta?.src === 'spanish');

          setEnglishDefinitions(englishData || null);
          setSpanishDefinitions(spanishData || null);

          // Check for no results
          if (!englishData && !spanishData) {
            setNoResultsMessage(`No results found for the word '${word}'`);
          } else {
            setNoResultsMessage(null); // Clear the message if results are found
          }
          setError(null);
        } 
        else {
          setError('No definitions found');
        }
      } 
      catch (err) {
        console.error('Failed to fetch definitions:', err);
        setError('Failed to fetch definitions');
      }
    };

    if (word) {
      fetchDefinitions();
    }
  }, [word]);
  
  return (
    <main>
      <h1 className="mt-4 text-black-700">Results for {word}...</h1>
      <div className="border border-gray-200 p-4 my-4">
        {error && <p className="text-red-500">{error}</p>}
        {noResultsMessage && <p className="text-yellow-500">{noResultsMessage}</p>}
  
        {!error && !noResultsMessage && (
          <div className="flex justify-between">
            {/* English Definition */}
            {englishDefinitions && (
              <div className="w-1/2 pr-4">
                <h2 className="text-3xl text-emerald-500 p-2">{englishDefinitions.hwi?.hw}</h2>
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
            {spanishDefinitions && (
              <div className="w-1/2 pl-4">
                <h2 className="text-3xl text-emerald-500 p-2">
                  {spanishDefinitions.shortdef[0]?.split('(')[0]?.trim()}
                </h2>
                <div className="p-2">
                  <strong>La Definición:</strong>
                  <ul className="list-disc pl-5">
                    {spanishDefinitions.shortdef.map((def, defIndex) => (
                      <li key={defIndex} className="p-2">
                        {def}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}