import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import Navbar, { SearchProvider } from '../components/Navbar';

export const metadata: Metadata = {
  title: 'Podcast App',
  description: 'A modern podcast search and discovery app',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-950 text-gray-100 min-h-screen">
        <SearchProvider>
          <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col p-6">
              <div className="mb-8 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full" />
                <span className="text-2xl font-bold tracking-tight">Podbay</span>
              </div>
              <nav className="flex-1 flex flex-col gap-2">
                <a href="#" className="py-2 px-3 rounded-lg hover:bg-gray-800 transition-colors">Home</a>
                <a href="#" className="py-2 px-3 rounded-lg hover:bg-gray-800 transition-colors">Discover</a>
                <div className="mt-6 mb-2 text-xs text-gray-400 uppercase tracking-widest">Your Stuff</div>
                <a href="#" className="py-2 px-3 rounded-lg hover:bg-gray-800 transition-colors">My Queue</a>
                <a href="#" className="py-2 px-3 rounded-lg hover:bg-gray-800 transition-colors">My Podcasts</a>
                <a href="#" className="py-2 px-3 rounded-lg hover:bg-gray-800 transition-colors">Recents</a>
              </nav>
              <div className="mt-auto text-xs text-gray-500 pt-8">Podbay v1.0</div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
              {/* Top bar */}
              <Navbar />
              <main className="flex-1 p-8 overflow-y-auto bg-gray-950">{children}</main>
            </div>
          </div>
        </SearchProvider>
      </body>
    </html>
  );
}
