'use client'; // <-- Add this at the very top

import SideNav from "@/app/ui/components/sidenav";
import SearchBar from '../ui/components/searchbar';
import styles from '@/app/ui/styles/home.module.css'

export default function Layout({ children }: { children: React.ReactNode }) {
  const data = [
    ''
  ];
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-white">
      <div className={`w-full flex-none md:w-48`}>
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        <SearchBar data={data} />
      {children}
      </div>
    </div>
  );
}
