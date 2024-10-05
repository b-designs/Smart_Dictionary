
'use client'; // <-- Add this at the very top

import Image from "next/image";
import SearchBar from './ui/components/searchbar';

export default function Home() {

  const data = [
    ''
  ];
  return (

    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Let's Start Searching</h1>
        <SearchBar data={data} />
      </div>
      <div>
        <h1>Welcome</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
          It has survived not only five centuries, but also the leap into electronic typesetting, 
          remaining essentially unchanged. It was popularised in the 1960s with the release 
          of Letraset sheets containing Lorem Ipsum passages, and more recently with 
          desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
      </div>
      
      
    </main>
      );
}
