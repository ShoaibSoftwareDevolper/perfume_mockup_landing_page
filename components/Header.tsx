"use client";

import { ShoppingBag } from "lucide-react";
import { useStore } from "./StoreProvider";

const links = [
  { label: "Shop", href: "#shop" },
  { label: "Stories", href: "#journal" },
  { label: "Heritage", href: "#heritage" },
];

const item = "inline-flex min-h-9 items-center transition-opacity duration-300 hover:opacity-60";

export default function Header() {
  const { open, count } = useStore();

  return (
    <header className="absolute inset-x-0 top-0 z-30 text-white" data-hero="header">
      <nav aria-label="Primary" className="wrap flex items-center justify-between py-[var(--header-y)] text-[13px] tracking-[0.005em] md:text-[13.5px]">
        <button type="button" className={`${item} md:hidden`} onClick={() => open("menu")} aria-haspopup="dialog">
          Menu
        </button>
        <ul className="hidden items-center gap-[clamp(20px,2vw,34px)] md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={item}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <button type="button" className={item} onClick={() => open("search")} aria-haspopup="dialog">
              Search
            </button>
          </li>
        </ul>
        <div className="flex items-center gap-[clamp(18px,1.8vw,28px)]">
          <button type="button" className={item} onClick={() => open("account")} aria-haspopup="dialog">
            Account
          </button>
          <button
            type="button"
            className={`${item} gap-1`}
            onClick={() => open("bag")}
            aria-haspopup="dialog"
            aria-label={`Bag, ${count} ${count === 1 ? "item" : "items"}`}
          >
            <ShoppingBag size={16} strokeWidth={1.4} aria-hidden />
            {count > 0 && <span className="text-[12px] tabular-nums">{count}</span>}
          </button>
        </div>
      </nav>
    </header>
  );
}
