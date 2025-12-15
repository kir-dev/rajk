"use client";

import React, {createContext, useContext, useEffect, useEffectEvent, useState} from "react";

export type Lang = "HU" | "EN";

type Ctx = { lang: Lang; setLang: (l: Lang) => void };

const LanguageContext = createContext<Ctx | undefined>(undefined);

export function LanguageProvider({
  initialLang = "HU",
  children,
}: {
  initialLang?: Lang;
  children: React.ReactNode;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = (l: Lang) => {
    setLangState(l);
    // persist for 1 year
    document.cookie = `lang=${l}; path=/; max-age=31536000; samesite=lax`;
  };

  const onLoaded = useEffectEvent((cookie: string) => {
      const v = cookie.split("=")[1];
      if (v === "HU" || v === "EN") setLangState(v);
  })

  // hydrate from cookie on the client if present
  useEffect(() => {
    const cookie = document.cookie.split("; ").find((c) => c.startsWith("lang="));
    if (cookie) {
      onLoaded(cookie);
    }
  }, []);

  // keep <html lang> in sync on the client
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang === "EN" ? "en" : "hu";
    }
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
