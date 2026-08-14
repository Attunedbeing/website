import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Overview } from './components/Overview';
import { Ritual } from './components/Ritual';
import { Services } from './components/Services';
import { About } from './components/About';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AgeVerification } from './components/AgeVerification';
import { FAQ } from './components/FAQ';
import { SubscribePopup } from './components/SubscribePopup';
import { SiteDataProvider } from './components/SiteDataContext';
import { Gallery } from './components/Gallery';

const App: React.FC = () => {
  return (
    <AgeVerification>
    <SiteDataProvider>
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Overview />
        <Ritual />
        <Services />
        <About />
        <Testimonials />
        <Gallery />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <SubscribePopup />
    </div>
    </SiteDataProvider>
    </AgeVerification>
  );
};

export default App;// rebuild
