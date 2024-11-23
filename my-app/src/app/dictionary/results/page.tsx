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
  const [englishDefinitions, setEnglishDefinitions] = useState<DictionaryEntry[]>([]);
  const [spanishDefinitions, setSpanishDefinitions] = useState<DictionaryEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [noResultsMessage, setNoResultsMessage] = useState<string | null>(null); // State for no results message

  useEffect(() => {
    const fetchDefinitions = async () => {
      try {
        const res = await fetch(`/api/dictionary?word=${word}`);
        // const data: DictionaryResponse = await res.json();
        // const data = (await res.json()) as DictionaryEntry[];
        const data = await res.json();

        console.log('API Response data:', data);

        if (res.ok) {

          const englishData = data.english.filter((entry: any) => entry.meta?.src === 'medical');
          const spanishData = data.spanish.filter((entry: any) => entry.meta?.src === 'spanish');

          setEnglishDefinitions(englishData);
          setSpanishDefinitions(spanishData);

          // Check for no results
          if (englishData.length === 0 && spanishData.length === 0) {
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
            <div className="w-1/2 pr-4">
              {englishDefinitions.map((entry, index) => (
                <div key={index} className="mb-4">
                  {/* Display the headword (hw) as a title */}
                  <h2 className="text-3xl text-emerald-500 p-2">{entry.hwi?.hw}</h2>
  
                  {/* Display the "Definition:" label and the definitions as a bulleted list */}
                  <div className="p-2">
                    <strong>Definition:</strong>
                    <ul className="list-disc pl-5">
                      {entry.shortdef.map((def, defIndex) => (
                        <li key={defIndex} className="p-2">{def}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
  
            {/* Spanish Definition */}
            <div className="w-1/2 pl-4">
              {spanishDefinitions.map((entry, index) => (
                <div key={index} className="mb-4">
                  {/* Display the headword (hw) as a title */}
                  <h2 className="text-3xl text-emerald-500 p-2">{entry.hwi?.hw}</h2>
  
                  {/* Display the "Definition:" label and the Spanish definitions as a bulleted list */}
                  <div className="p-2">
                    <strong>Definition:</strong>
                    <ul className="list-disc pl-5">
                      {entry.shortdef.map((def, defIndex) => (
                        <li key={defIndex} className="p-2">{def}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        )}
      </div>
    </main>
  );
}