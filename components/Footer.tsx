import React from 'react';
import { Instagram, Facebook } from 'lucide-react';

const INSTAGRAM_URL = 'https://www.instagram.com/attuned.being/';
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61589695391260';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 text-stone-400 py-12 text-center border-t border-stone-900">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          <p className="font-serif text-xl text-sage-100">Attuned Being</p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-stone-500 hover:text-sage-200 transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-stone-500 hover:text-sage-200 transition-colors"
          >
            <Facebook className="w-5 h-5" />
          </a>
        </div>
        <p className="text-xs text-stone-600">
          © {new Date().getFullYear()} Attuned Being. All rights reserved.
          <br />
          Made locally by <a href="https://smooth-landings.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Smooth Landings</a>
        </p>
      </div>
    </footer>
  );
};
