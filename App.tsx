import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Overview } from './components/Overview';
import { Ritual } from './components/Ritual';
import { Services } from './components/Services';
import { About } from './components/About';
import { Pricing } from './components/Pricing';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  // Simple state to handle scroll transparency for nav if needed, 
  // but Navbar component handles it internally mostly.
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Overview />
        <Ritual />
        <Services />
        <About />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;