"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, X } from "lucide-react";
import { allProducts, formatPrice } from "@/data/products";
import { assets } from "@/data/assets";
import { useStore, type Panel } from "./StoreProvider";

const sideClasses = {
  left: "inset-y-0 left-0 w-full max-w-[420px] -translate-x-full",
  right: "inset-y-0 right-0 w-full max-w-[420px] translate-x-full",
  top: "inset-x-0 top-0 max-h-[88svh] -translate-y-full",
};

function Sheet({
  id,
  side,
  label,
  children,
}: {
  id: Panel;
  side: keyof typeof sideClasses;
  label: string;
  children: React.ReactNode;
}) {
  const { panel, close } = useStore();
  const isOpen = panel === id;
  const dialog = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  if (isOpen && !mounted) setMounted(true);

  useEffect(() => {
    if (!isOpen) return;
    const frame = requestAnimationFrame(() => {
      const target = dialog.current?.querySelector<HTMLElement>("[data-autofocus]") ?? dialog.current;
      target?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-[visibility] ${isOpen ? "visible" : "pointer-events-none invisible delay-500"}`}
      inert={!isOpen}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-hidden
        onClick={() => close()}
        className={`absolute inset-0 bg-black/20 transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}
      />
      <div
        ref={dialog}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        data-lenis-prevent
        className={`absolute flex flex-col outline-none overflow-y-auto overscroll-contain bg-white duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${sideClasses[side]} ${isOpen ? "visible translate-x-0 translate-y-0 transition-transform" : "invisible transition-[transform,visibility]"}`}
      >
        <div className="flex items-center justify-between px-[var(--gutter)] py-[var(--header-y)] md:px-8">
          <p className="eyebrow">{label}</p>
          <button
            type="button"
            onClick={() => close()}
            aria-label={`Close ${label.toLowerCase()}`}
            className="-mr-2 inline-flex size-9 items-center justify-center transition-opacity hover:opacity-60"
          >
            <X size={16} strokeWidth={1.3} aria-hidden />
          </button>
        </div>
        {mounted && children}
      </div>
    </div>
  );
}

function MobileMenu() {
  const { open, close } = useStore();
  const links = [
    { label: "Shop", href: "#shop" },
    { label: "Objects of Scent", href: "#objects" },
    { label: "Heritage", href: "#heritage" },
    { label: "Stories", href: "#journal" },
    { label: "Journal Sign-up", href: "#newsletter" },
  ];

  return (
    <div className="flex flex-1 flex-col px-[var(--gutter)] pb-8">
      <nav aria-label="Mobile">
        <ul className="border-t border-line">
          {links.map((link) => (
            <li key={link.href} className="border-b border-line">
              <a href={link.href} onClick={() => close(false)} className="flex min-h-13 items-center text-[15px]">
                {link.label}
              </a>
            </li>
          ))}
          <li className="border-b border-line">
            <button type="button" onClick={() => open("search")} className="flex min-h-13 w-full items-center text-[15px]">
              Search
            </button>
          </li>
        </ul>
      </nav>
      <Image src={assets.wordmark} alt="" sizes="200px" className="mt-auto w-[180px] self-center pt-10" />
    </div>
  );
}

function ProductRow({ id }: { id: string }) {
  const product = allProducts.find((p) => p.id === id);
  if (!product) return null;
  return (
    <>
      <div className="relative aspect-[9/10] w-16 shrink-0 overflow-hidden bg-surface">
        <Image src={product.image} alt="" fill sizes="64px" className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[12.5px]">
          {product.name} — {product.type}
        </p>
        <p className="meta mt-0.5">{formatPrice(product.price)}</p>
      </div>
    </>
  );
}

function SearchPanel() {
  const { add } = useStore();
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const results = allProducts.filter((p) => `${p.name} ${p.type}`.toLowerCase().includes(q));

  return (
    <div className="wrap pb-8 md:px-8">
      <label htmlFor="site-search" className="sr-only">
        Search fragrances and objects
      </label>
      <input
        id="site-search"
        type="search"
        data-autofocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search fragrances and objects"
        autoComplete="off"
        className="w-full border-b border-ink/25 bg-transparent py-3 text-[16px] outline-none placeholder:text-muted focus:border-ink"
      />
      <p className="meta mt-4" aria-live="polite">
        {results.length} {results.length === 1 ? "result" : "results"}
      </p>
      <ul className="mt-2 grid gap-x-8 md:grid-cols-2">
        {results.map((p) => (
          <li key={p.id} className="flex items-center gap-4 border-b border-line py-3">
            <ProductRow id={p.id} />
            <button
              type="button"
              onClick={() => add(p.id)}
              aria-label={`Add ${p.name} to bag`}
              className="text-link min-h-9 px-1 hover:text-ink"
            >
              Add to bag
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BagPanel() {
  const { bag, setQty, close } = useStore();
  const subtotal = bag.reduce(
    (sum, line) => sum + (allProducts.find((p) => p.id === line.id)?.price ?? 0) * line.qty,
    0,
  );

  if (bag.length === 0) {
    return (
      <div className="flex flex-1 flex-col px-[var(--gutter)] pb-8 md:px-8">
        <p className="text-[13px] text-muted">Your bag is empty.</p>
        <a href="#shop" onClick={() => close(false)} className="text-link mt-4">
          Discover the collection <ArrowRight size={12} strokeWidth={1.4} aria-hidden />
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col px-[var(--gutter)] pb-8 md:px-8">
      <ul className="border-t border-line">
        {bag.map((line) => (
          <li key={line.id} className="flex items-center gap-4 border-b border-line py-4">
            <ProductRow id={line.id} />
            <div className="flex items-center text-[12px]" role="group" aria-label="Quantity">
              <button type="button" onClick={() => setQty(line.id, line.qty - 1)} aria-label="Decrease quantity" className="size-8">
                −
              </button>
              <span className="w-4 text-center tabular-nums" aria-live="polite">
                {line.qty}
              </span>
              <button type="button" onClick={() => setQty(line.id, line.qty + 1)} aria-label="Increase quantity" className="size-8">
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-10">
        <div className="flex justify-between text-[13px]">
          <span>Subtotal</span>
          <span className="tabular-nums">{formatPrice(subtotal)}</span>
        </div>
        <button
          type="button"
          disabled
          className="mt-5 w-full cursor-not-allowed bg-ink py-3.5 text-[11px] font-medium uppercase tracking-[0.08em] text-white opacity-40"
        >
          Checkout
        </button>
        <p className="meta mt-3 text-center">Checkout is not available in this preview. Your bag is kept for this visit only.</p>
      </div>
    </div>
  );
}

function AccountPanel() {
  const { close } = useStore();
  return (
    <div className="px-[var(--gutter)] pb-8 md:px-8">
      <p className="max-w-[320px] text-[13px] leading-relaxed text-muted">
        Client accounts are not yet available. Join the journal to hear when they open.
      </p>
      <a href="#newsletter" onClick={() => close(false)} className="text-link mt-4">
        Join the journal <ArrowRight size={12} strokeWidth={1.4} aria-hidden />
      </a>
    </div>
  );
}

export default function Overlays() {
  return (
    <>
      <Sheet id="menu" side="left" label="Menu">
        <MobileMenu />
      </Sheet>
      <Sheet id="search" side="top" label="Search">
        <SearchPanel />
      </Sheet>
      <Sheet id="bag" side="right" label="Bag">
        <BagPanel />
      </Sheet>
      <Sheet id="account" side="right" label="Account">
        <AccountPanel />
      </Sheet>
    </>
  );
}
