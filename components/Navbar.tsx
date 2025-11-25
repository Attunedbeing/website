import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#overview' },
    { name: 'The Ritual', href: '#ritual' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled || isMobileMenuOpen ? 'bg-stone-50/95 backdrop-blur-sm shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo / Brand Name */}
        <a href="#" className="flex items-center gap-4 group">
          <img
            src="Images/logo_Sage.svg"
            alt="Serene massage setting with plants"
            className={`h-6 w-6 object-cover transition-colors ${isScrolled || isMobileMenuOpen ? 'filter brightness-100' : 'filter brightness-0 invert'}`}
          />
          <span className={`text-xl tracking-widest font-serif font-semibold uppercase transition-colors ${
            isScrolled || isMobileMenuOpen ? 'text-stone-800' : 'text-white'
          }`}>
            Attuned Being
          </span>
        </a>
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm uppercase tracking-wider font-medium hover:text-sage-500 transition-colors ${
                isScrolled ? 'text-stone-600' : 'text-stone-200'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className={`h-6 w-6 ${isScrolled || isMobileMenuOpen ? 'text-stone-800' : 'text-white'}`} />
          ) : (
            <Menu className={`h-6 w-6 ${isScrolled ? 'text-stone-800' : 'text-white'}`} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-stone-50 border-b border-stone-200 shadow-lg py-4 px-6 flex flex-col space-y-4 animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-stone-800 hover:text-sage-500 uppercase tracking-widest text-sm font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};