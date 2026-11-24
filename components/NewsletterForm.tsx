"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Status = { kind: "idle" | "error" | "preview"; message: string };

export default function NewsletterForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle", message: "" });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim();
    if (!EMAIL.test(email)) {
      setStatus({ kind: "error", message: "Please enter a valid email address." });
      return;
    }
    setStatus({
      kind: "preview",
      message: "Thank you. Sign-up is not yet connected in this preview, so no subscription was created.",
    });
  };

  const invalid = status.kind === "error";

  return (
    <form onSubmit={onSubmit} noValidate className="mt-4">
      <div className={`flex items-center border-b ${invalid ? "border-[#a33]" : "border-ink/30"} focus-within:border-ink`}>
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="E-Mail Address"
          aria-invalid={invalid}
          aria-describedby="newsletter-status"
          onChange={() => status.kind !== "idle" && setStatus({ kind: "idle", message: "" })}
          className="min-w-0 flex-1 bg-transparent py-2 text-[16px] outline-none placeholder:text-muted md:text-[13px]"
        />
        <button type="submit" aria-label="Join the journal" className="-mr-1 inline-flex min-h-9 items-center px-1 transition-opacity hover:opacity-60">
          <ArrowRight size={15} strokeWidth={1.4} aria-hidden />
        </button>
      </div>
      <p id="newsletter-status" aria-live="polite" className={`mt-2 min-h-[1.5em] text-[12px] ${invalid ? "text-[#a33]" : "text-muted"}`}>
        {status.message}
      </p>
    </form>
  );
}
