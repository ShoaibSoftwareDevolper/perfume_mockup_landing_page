import { ArrowRight } from "lucide-react";
import Image, { type StaticImageData } from "next/image";

type Shot = { src: StaticImageData; alt: string };

type Props = {
  id: string;
  title: string;
  description: string;
  href: string;
  product: Shot;
  campaign: Shot;
};

function SwapFrame({ shot, next, sizes, className }: { shot: Shot; next: Shot; sizes: string; className: string }) {
  return (
    <div data-swap className={`relative overflow-hidden ${className}`}>
      <div data-swap-base className="absolute inset-0">
        <Image src={shot.src} alt={shot.alt} fill placeholder="blur" sizes={sizes} data-reveal-img className="object-cover" />
      </div>
      <div data-swap-next aria-hidden className="absolute inset-0" style={{ transform: "translateY(100%)" }}>
        <Image src={next.src} alt="" fill placeholder="blur" sizes={sizes} className="object-cover" />
      </div>
    </div>
  );
}

export default function CollectionFeature({ id, title, description, href, product, campaign }: Props) {
  const headingId = `${id}-title`;

  return (
    <section id={id} aria-labelledby={headingId} className="wrap mt-[var(--section)] grid items-stretch gap-[var(--panel-gap)] md:grid-cols-2">
      <div
        data-reveal="panel"
        className="flex flex-col items-center bg-surface px-6 py-[clamp(28px,3.2vw,52px)] text-center md:aspect-[6/7]"
      >
        <h2 id={headingId} className="eyebrow">
          {title}
        </h2>
        <SwapFrame
          shot={product}
          next={campaign}
          sizes="(min-width: 1500px) 460px, (min-width: 768px) 30vw, 58vw"
          className="my-[clamp(28px,4vw,48px)] aspect-[4/5] w-[min(66%,360px)] md:my-auto md:w-[min(54%,460px)] lg:w-[min(60%,460px)]"
        />
        <p className="max-w-[380px] text-[13px] leading-[1.55] md:text-[14px]">{description}</p>
        <a href={href} className="text-link mt-3">
          Discover <ArrowRight size={12} strokeWidth={1.4} aria-hidden />
        </a>
      </div>
      <div data-reveal="panel" className="bg-surface">
        <SwapFrame
          shot={campaign}
          next={product}
          sizes="(min-width: 1500px) 720px, (min-width: 768px) 48vw, 92vw"
          className="aspect-[6/7] h-full w-full"
        />
      </div>
    </section>
  );
}
