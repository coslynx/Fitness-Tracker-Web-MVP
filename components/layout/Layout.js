import { useState, useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/context/ThemeContext';
import { store } from '@/lib/store';
import { ZustandProvider } from 'zustand/react';
import { ToastContainer } from 'react-hot-toast';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

import '@/styles/globals.css';

export default function Layout({ children, session }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for demonstration purposes
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <ZustandProvider store={store}>
          <ToastContainer position="bottom-center" />
          <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <main className="container mx-auto flex flex-col items-center justify-center py-12">
              <div className="flex flex-col md:flex-row w-full max-w-7xl">
                <Sidebar />
                <div className="w-full md:w-3/4 px-4 md:px-8">
                  {children}
                </div>
              </div>
            </main>
            <Footer />
          </div>
        </ZustandProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}