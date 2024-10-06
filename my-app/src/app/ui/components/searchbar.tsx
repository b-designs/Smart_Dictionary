import { useState } from 'react';

import {
  UserGroupIcon,
  HomeIcon,
  EnvelopeIcon,
  FolderIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';


interface SearchBarProps {
  data: string[];
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ data }) => {
  const [query, setQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<string[]>(data);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value.toLowerCase();
    setQuery(searchQuery);

    if (searchQuery === '') {
      // setFilteredData(data);  // If search bar is empty, show all data
    } else {
      const filtered = data.filter((item) =>
        item.toLowerCase().includes(searchQuery)
      );
      setFilteredData(filtered);
    }
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-lg p-2 bg-white w-full max-w-md">
      {/* Magnifying Glass Icon */}
      <button style={{cursor: 'pointer'}}>
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 ml-1" />
      </button>
      
      {/* Input Field */}
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleSearch}
        className="flex-grow outline-none border-none text-gray-600 ml-2"
      />
      <ul>
        {filteredData.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
      </ul>
      
      {/* Keyboard Shortcut */}
      {/* <span className="text-gray-400 mr-2">⌘K</span> */}
  </div>
  );
};

export default SearchBar;