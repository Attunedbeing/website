import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'age_verified';

interface Props {
  children: React.ReactNode;
}

export const AgeVerification: React.FC<Props> = ({ children }) => {
  const [verified, setVerified] = useState<boolean | null>(null);
  const [declined, setDeclined] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setVerified(stored === 'true');
  }, []);

  const handleConfirm = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setVerified(true);
  };

  const handleDecline = () => {
    setDeclined(true);
  };

  // Still checking localStorage
  if (verified === null) return null;

  if (verified) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950">
      <div className="max-w-md w-full mx-6 text-center">
        <p className="font-serif text-3xl md:text-4xl text-white mb-3">Attuned Being</p>
        <div className="w-12 h-px bg-sage-500 mx-auto mb-10"></div>

        {declined ? (
          <div>
            <p className="text-stone-400 text-sm leading-relaxed">
              This website is intended for adults aged 18 and over. You must be 18 or older to enter.
            </p>
          </div>
        ) : (
          <>
            <p className="text-stone-300 text-sm leading-relaxed mb-2">
              This website contains content intended for adults only.
            </p>
            <p className="text-stone-400 text-sm mb-12">
              By entering you confirm you are 18 years of age or older.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleConfirm}
                className="px-10 py-3 bg-sage-500 text-white text-xs uppercase tracking-widest hover:bg-sage-400 transition-colors"
              >
                I am 18 or older - Enter
              </button>
              <button
                onClick={handleDecline}
                className="px-10 py-3 border border-stone-700 text-stone-400 text-xs uppercase tracking-widest hover:border-stone-500 transition-colors"
              >
                Exit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
