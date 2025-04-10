import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './app/routes';
import Header from './modules/layout/ui/Header';
import Footer from './modules/layout/ui/Footer';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-brand-cream">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}