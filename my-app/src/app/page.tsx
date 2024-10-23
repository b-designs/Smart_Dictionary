
'use client'; // <-- Add this at the very top

import Image from "next/image";
import SearchBar from './ui/components/searchbar';
import styles from '@/app/ui/styles/home.module.css'
import DictionaryLookup from './api/dictionaryLookUp';


export default function Home() {

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="container mx-auto p-4 relative">
        <div className="bg-white border-2 border-emerald-100 rounded-lg p-6 grid grid-cols-1 gap-4">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl text-emerald-500 font-bold mb-4 p-1">Let's Start Searching</h1>
            <SearchBar/>
            <p className="text-lg text-gray-700 mt-4 mb-4">
              A place to improve second language aquisition learning. A place to recollect previous searches and improve recognition.
            </p>
            <a href="/dictionary/history" className={`outline outline-1 outline-offset-2 border-purple-600 text-emerald-700 hover:text-white py-2 px-4 rounded hover:bg-emerald-600 md:w-auto ${styles.fit_content}`}>
              Search History
            </a>
          </div>
          {/* <div>
            <h1>Smart Dictionary Lookup</h1>
              <DictionaryLookup />
          </div> */}
        </div>

      </div>
      {/* <div className="bg-purple-800 hidden md:block absolute top-0 right-0 bottom-0 left-2/3 z-0"></div> */}
    </main>
      );
}
