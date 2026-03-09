'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface SiteSettings {
  scholarshipsEnabled: boolean;
  loading: boolean;
}

const SettingsContext = createContext<SiteSettings>({
  scholarshipsEnabled: true,
  loading: true,
});

export function useSiteSettings() {
  return useContext(SettingsContext);
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [scholarshipsEnabled, setScholarshipsEnabled] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await fetch('/api/public/settings?key=scholarships_enabled');
        if (res.ok) {
          const data = await res.json();
          setScholarshipsEnabled(data.value === 'true');
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ scholarshipsEnabled, loading }}>
      {children}
    </SettingsContext.Provider>
  );
}