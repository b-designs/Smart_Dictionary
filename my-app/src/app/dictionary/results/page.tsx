'use client';  // Necessary for accessing search params in Next.js

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface DictionaryEntry {
  hwi: {
    hw: string; // The word itself
  };
  shortdef: string[]; // Array of definitions
}

export default function Page() {
  const searchParams = useSearchParams();
  const word = searchParams.get('word'); // Get the search term from the URL
  const [definitions, setDefinitions] = useState<DictionaryEntry[]>([]);
  const [primaryDefinitions, setPrimaryDefinitions] = useState<string[]>([]);
  const [additionalDefinitions, setAdditionalDefinitions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [noResultsMessage, setNoResultsMessage] = useState<string | null>(null); // State for no results message

  useEffect(() => {
    const fetchDefinitions = async () => {
      try {
        const res = await fetch(`/api/dictionary?word=${word}`);
        const data = await res.json();

        if (res.ok) {
          setDefinitions(data);

          // Process definitions and split them by colon
          const primary: string[] = [];
          const additional: string[] = [];

          data[0]?.shortdef.forEach((def: string) => {
            const parts = def.split(':');
            primary.push(parts[0]?.trim()); // First part before the colon
            additional.push(parts[1]?.trim() || ''); // Second part after the colon (if it exists)
          });

          // Omit the first item from each array
          setPrimaryDefinitions(primary.slice(1));
          setAdditionalDefinitions(additional.slice(1));

          // Check for no results
          if (primary.length === 0 && additional.length === 0) {
            setNoResultsMessage(`No results found for the word '${word}'`);
          } else {
            setNoResultsMessage(null); // Clear the message if results are found
          }

          setError(null);
        } else {
          setError('No definitions found');
        }
      } catch (err) {
        setError('Failed to fetch definitions');
      }
    };

    if (word) {
      fetchDefinitions();
    }
  }, [word]);

  // Capitalize the first letter of the displayed word, with a fallback
  // const capitalizedWord = definitions[0]?.hwi?.hw
  //   ? definitions[0].hwi.hw.charAt(0).toUpperCase() + definitions[0].hwi.hw.slice(1)
  //   : '';

  return (
    <main>
      <h1 className="mt-4 text-black-700">Results for {word}...</h1>
      <div className="border border-gray-200 p-4 my-4">
        {error && <p className="text-red-500">{error}</p>}

        {!error && definitions.length > 0 && (
          <div className="flex justify-between">
            {/* English Definition */}
            <div className="w-1/2 pr-4">
              <h2 className="text-3xl text-emerald-500 p-2">{definitions[0]?.hwi?.hw}</h2>
              <ul className="list-disc pl-5">
                {/* {definitions[0]?.shortdef.map((def, index) => (
                  <li key={index} className="p-2">{def}</li>
                ))} */}
                {primaryDefinitions.map((def, index) => (
                  <li key={index} className="p-2">{def}</li>
                ))}
              </ul>
            </div>
            {/* Spanish Definition */}
            <div className="w-1/2 pl-4">
              <h2 className="text-3xl text-emerald-500 p-2">{definitions[0]?.shortdef[0]}</h2>
              <ul className="list-disc pl-5">
                {additionalDefinitions.map((detail, index) => (
                  <li key={index} className="p-2">{detail}</li>
                ))}
              </ul>
              <p className="p-2">
                {/* Translation logic can go here if available */}
                {/* For now, you can either display a mock translation or skip this */}

              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
