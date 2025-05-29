"use client";
import { useState, createContext, useContext, ReactNode } from "react";

interface SearchContextType {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function useSearch() {
    const ctx = useContext(SearchContext);
    if (!ctx) throw new Error("useSearch must be used within SearchProvider");
    return ctx;
}

export function SearchProvider({ children }: { children: ReactNode }) {
    const [searchTerm, setSearchTerm] = useState("");
    return (
        <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
            {children}
        </SearchContext.Provider>
    );
}

export default function Navbar() {
    const { searchTerm, setSearchTerm } = useSearch();
    return (
        <header className="flex items-center justify-between px-8 py-4 border-b border-gray-800 bg-gray-950">
            <form className="flex-1 max-w-xl" onSubmit={e => e.preventDefault()}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Search through over 70 million podcasts and episodes..."
                    className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </form>
            <div className="flex gap-2 ml-6">
                <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold">Log in</button>
                <button className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-100 font-semibold border border-gray-700">Sign up</button>
            </div>
        </header>
    );
} 