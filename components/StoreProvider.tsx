"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { getLenis } from "./SmoothScroll";

export type Panel = "menu" | "search" | "bag" | "account";
type BagLine = { id: string; qty: number };

type Store = {
  panel: Panel | null;
  bag: BagLine[];
  count: number;
  open: (panel: Panel) => void;
  close: (restoreFocus?: boolean) => void;
  add: (id: string) => void;
  setQty: (id: string, qty: number) => void;
};

const StoreContext = createContext<Store | null>(null);

export function useStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error("useStore must be used inside StoreProvider");
  return store;
}

const lockScroll = (locked: boolean) => {
  document.documentElement.style.overflow = locked ? "hidden" : "";
  const lenis = getLenis();
  if (locked) lenis?.stop();
  else lenis?.start();
};

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const [panel, setPanel] = useState<Panel | null>(null);
  const [bag, setBag] = useState<BagLine[]>([]);
  const trigger = useRef<HTMLElement | null>(null);

  const open = useCallback((next: Panel) => {
    if (document.activeElement instanceof HTMLElement && !trigger.current) {
      trigger.current = document.activeElement;
    }
    lockScroll(true);
    setPanel(next);
  }, []);

  const close = useCallback((restoreFocus = true) => {
    lockScroll(false);
    setPanel(null);
    if (restoreFocus) trigger.current?.focus({ preventScroll: true });
    trigger.current = null;
  }, []);

  const add = useCallback(
    (id: string) => {
      setBag((lines) =>
        lines.some((l) => l.id === id)
          ? lines.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l))
          : [...lines, { id, qty: 1 }],
      );
      open("bag");
    },
    [open],
  );

  const setQty = useCallback((id: string, qty: number) => {
    setBag((lines) =>
      qty <= 0 ? lines.filter((l) => l.id !== id) : lines.map((l) => (l.id === id ? { ...l, qty } : l)),
    );
  }, []);

  useEffect(() => {
    if (!panel) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panel, close]);

  const value = useMemo(
    () => ({ panel, bag, count: bag.reduce((n, l) => n + l.qty, 0), open, close, add, setQty }),
    [panel, bag, open, close, add, setQty],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
