"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Outfit } from "@/lib/data";

interface State {
  user: any;
  phone: string | null;
  bodyType: string | null;
  heightCm: number;
  unit: "cm" | "ft";
  categories: Set<string>;
  currentOutfits: Outfit[];
  savedLooks: Outfit[];
  cart: Outfit[];
  compareMode: boolean;
  compareList: number[];
  obStep: number;
  isDark: boolean;
  activeSection: string;
}

interface StoreContextType {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
  showSection: (id: string) => void;
  toast: (msg: string) => void;
  toastMsg: string | null;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>({
    user: null,
    phone: null,
    bodyType: null,
    heightCm: 170,
    unit: "cm",
    categories: new Set(["casual"]),
    currentOutfits: [],
    savedLooks: [],
    cart: [],
    compareMode: false,
    compareList: [],
    obStep: 1,
    isDark: false,
    activeSection: "hero",
  });
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    // initialize from localstorage
    const saved = localStorage.getItem("sf_saved");
    const cart = localStorage.getItem("sf_cart");
    const theme = localStorage.getItem("sf_theme");
    setState((s) => ({
      ...s,
      savedLooks: saved ? JSON.parse(saved) : [],
      cart: cart ? JSON.parse(cart) : [],
      isDark: theme === "dark",
    }));
  }, []);

  const showSection = (id: string) => {
    setState((s) => ({ ...s, activeSection: id }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3200);
  };

  return (
    <StoreContext.Provider value={{ state, setState, showSection, toast, toastMsg }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) throw new Error("useStore must be used within StoreProvider");
  return context;
};
