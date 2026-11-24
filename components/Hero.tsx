import Image, { getImageProps } from "next/image";
import { assets } from "@/data/assets";
import HeroSlides from "./HeroSlides";

const alt = "A man in desert linens beside MAISON SÉLUNE fragrances";

export default function Hero() {
  const { props: { srcSet: desktop } } = getImageProps({ src: assets.heroDesktop, alt, sizes: "100vw" });
  const { props: mobile } = getImageProps({
    src: assets.heroMobile,
    alt,
    sizes: "100vw",
    loading: "eager",
    fetchPriority: "high",
  });

  return (
    <section
      aria-label="Introduction"
      className="relative mx-auto h-[92svh] max-h-[880px] min-h-[560px] max-w-[var(--page)] overflow-hidden bg-[#8e98a2] md:h-[clamp(600px,max(84svh,min(52vw,860px)),1060px)] md:max-h-none"
    >
      <picture>
        <source media="(min-width: 768px)" srcSet={desktop} sizes="100vw" />
        {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
        <img
          {...mobile}
          data-hero="image"
          className="absolute inset-0 size-full object-cover object-[50%_30%] md:object-[68%_18%]"
        />
      </picture>
      <HeroSlides
        slides={[
          { src: assets.heroSunlight, position: "62% 30%" },
          { src: assets.heroEditorial, position: "45% 30%" },
        ]}
      />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.36),rgba(0,0,0,0.2)_24%,rgba(0,0,0,0.2)_60%,rgba(0,0,0,0.58))] md:bg-[linear-gradient(to_bottom,rgba(0,0,0,0.34),rgba(0,0,0,0.2)_24%,rgba(0,0,0,0.2)_58%,rgba(0,0,0,0.5))]" />
      <div className="absolute inset-0 flex items-center justify-center pb-[30svh] md:pb-[3%]">
        <h1>
          <Image
            src={assets.wordmark}
            alt="MAISON SÉLUNE"
            sizes="(min-width: 1500px) 780px, (min-width: 768px) 50vw, 96vw"
            data-hero="wordmark"
            loading="eager"
            fetchPriority="high"
            className="w-[96vw] max-w-[600px] invert mix-blend-screen md:w-[clamp(460px,50vw,780px)] md:max-w-none"
          />
        </h1>
      </div>
      <p
        data-hero="description"
        className="absolute inset-x-0 bottom-[clamp(22px,3.4vw,48px)] mx-auto max-w-[min(380px,88vw)] text-center text-[14px] font-semibold leading-[1.45] text-white md:max-w-[520px] md:text-[16px]"
      >
        An independent fragrance house exploring the quiet relationship between scent, memory and presence.
      </p>
    </section>
  );
}
