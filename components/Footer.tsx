import NewsletterForm from "./NewsletterForm";
import PaymentIcons from "./PaymentIcons";

const help = ["Contact", "Shipping", "Returns", "FAQ", "Privacy Policy", "Terms"];
const follow = [
  { label: "Instagram", href: "https://www.instagram.com" },
  { label: "Pinterest", href: "https://www.pinterest.com" },
  { label: "Facebook", href: "https://www.facebook.com" },
];

const column = "border-b border-line pb-6 md:border-b-0 md:pb-0";
const heading = "text-[12px] font-semibold md:text-[12.5px] uppercase tracking-[0.02em]";
const list = "mt-3 space-y-0.5 text-[13px] text-muted";

export default function Footer() {
  return (
    <footer className="mt-[var(--section)] bg-surface-editorial">
      <div data-reveal="footer" className="wrap pt-[clamp(40px,4.4vw,64px)] pb-[clamp(24px,2.6vw,36px)]">
        <div className="grid gap-6 md:grid-cols-[2fr_1fr_1fr_1.6fr] md:gap-x-[clamp(24px,3.2vw,56px)]">
          <div className={column}>
            <h2 className={heading}>About MAISON SÉLUNE</h2>
            <p className="mt-3 max-w-[400px] text-[13px] leading-[1.6] text-muted">
              MAISON SÉLUNE is an independent fragrance house exploring modern perfumery through thoughtful objects,
              carefully considered compositions and an understated approach to luxury.
            </p>
          </div>
          <nav aria-label="Customer care" className={column}>
            <h2 className={heading}>Need Help</h2>
            <ul className={list}>
              {help.map((label) => (
                <li key={label}>
                  <a href="#top" className="inline-block py-0.5 transition-colors hover:text-ink">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Social" className={column}>
            <h2 className={heading}>Follow</h2>
            <ul className={list}>
              {follow.map((item) => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="inline-block py-0.5 transition-colors hover:text-ink">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div id="newsletter" className="scroll-mt-6">
            <h2 className={heading}>Join the Journal</h2>
            <p className="mt-3 max-w-[340px] text-[13px] leading-[1.6] text-muted">
              Occasional notes on fragrance, new releases and the world of MAISON SÉLUNE.
            </p>
            <NewsletterForm />
          </div>
        </div>
        <div className="mt-[clamp(28px,4vw,56px)] flex flex-wrap items-center justify-between gap-3 text-[12px] text-muted md:grid md:grid-cols-[2fr_1fr_1fr_1.6fr] md:gap-x-[clamp(24px,3.2vw,56px)]">
          <p>© 2026 MAISON SÉLUNE. All rights reserved.</p>
          <div className="flex w-full flex-wrap items-center justify-between gap-3 md:col-start-4 md:w-auto">
            <p>France — EUR €</p>
            <PaymentIcons />
          </div>
        </div>
      </div>
    </footer>
  );
}
