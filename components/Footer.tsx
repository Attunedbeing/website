import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 text-stone-400 py-12 text-center border-t border-stone-900">
      <div className="container mx-auto px-6">
        <p className="font-serif text-xl text-sage-100 mb-4">Sacred Touch</p>
        <div className="flex justify-center gap-6 mb-8 text-sm uppercase tracking-wider">
          <a href="#overview" className="hover:text-white transition-colors">Overview</a>
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
        <p className="text-xs text-stone-600">
          © {new Date().getFullYear()} Sacred Touch. All rights reserved.
          <br />
          Designed with intention.
        </p>
      </div>
    </footer>
  );
};