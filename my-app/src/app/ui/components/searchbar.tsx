import { useState } from 'react';

import {
  UserGroupIcon,
  HomeIcon,
  EnvelopeIcon,
  FolderIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

// const SearchBar: React.FC<SearchBarProps> = ({ data }) => {
export default function SearchBar(){
  const [word, setWord] = useState<string>('');
  const [definition, setDefinition] = useState<any>(null);  // You may want to create a proper type for the definition if you know the structure.
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!word) return;

    try {
      // const res = await fetch(`/ui/components/searchbar?word=${word}`);
      const res = await fetch(`/api/dictionary?word=${word}`);
      const data = await res.json();

      if (res.ok) {
        setDefinition(data);
        setError(null);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to fetch data');
    }
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-lg p-2 bg-white w-full max-w-md">
      {/*Magnifying Glass Icon */}
      <button onClick={handleSearch} style={{cursor: 'pointer'}}>
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 ml-1" />
      </button>
      
      {/* Input Field */}
      <input
        type="text"
        placeholder="Search..."
        value={word}
        onChange={(e) => setWord(e.target.value)}
        className="flex-grow outline-none border-none text-gray-600 ml-2"
      />

      {error && <p>{error}</p>}
        {definition && (
          <div>
            <h3>Definition:</h3>
              <pre>{JSON.stringify(definition, null, 2)}</pre>
          </div>
        )}
      
  </div>
  );
};
