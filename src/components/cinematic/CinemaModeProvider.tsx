"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface CinemaModeContextType {
  isCinemaMode: boolean;
  toggleCinemaMode: () => void;
  setCinemaMode: (val: boolean) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

const CinemaModeContext = createContext<CinemaModeContextType>({
  isCinemaMode: false,
  toggleCinemaMode: () => {},
  setCinemaMode: () => {},
  soundEnabled: false,
  toggleSound: () => {},
});

export const CinemaModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCinemaMode, setIsCinemaMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Allow Esc key to exit Cinema Mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCinemaMode) {
        setIsCinemaMode(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCinemaMode]);

  const toggleCinemaMode = () => setIsCinemaMode((prev) => !prev);
  const toggleSound = () => setSoundEnabled((prev) => !prev);

  return (
    <CinemaModeContext.Provider
      value={{
        isCinemaMode,
        toggleCinemaMode,
        setCinemaMode: setIsCinemaMode,
        soundEnabled,
        toggleSound,
      }}
    >
      {children}
    </CinemaModeContext.Provider>
  );
};

export const useCinemaMode = () => useContext(CinemaModeContext);
