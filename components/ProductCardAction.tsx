"use client";

import { useStore } from "./StoreProvider";

export default function ProductCardAction({ id, name }: { id: string; name: string }) {
  const { add } = useStore();

  return (
    <button
      type="button"
      onClick={() => add(id)}
      aria-label={`Add ${name} to bag`}
      className="absolute inset-0 z-10 focus-visible:outline-offset-4"
    />
  );
}
