import { ArrowRight } from "lucide-react";
import CollectionFeature from "@/components/CollectionFeature";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import JournalSection from "@/components/JournalSection";
import Overlays from "@/components/Overlays";
import ProductGrid from "@/components/ProductGrid";
import ScrollReveal from "@/components/ScrollReveal";
import SmoothScroll from "@/components/SmoothScroll";
import StoreProvider from "@/components/StoreProvider";
import { assets } from "@/data/assets";
import { objectProducts, signatureProducts } from "@/data/products";

export default function Home() {
  return (
    <StoreProvider>
      <SmoothScroll />
      <ScrollReveal />
      <div id="top" className="relative">
        <Header />
        <main>
          <Hero />

          <section id="shop" aria-labelledby="shop-title" className="wrap mt-[var(--section-tight)] scroll-mt-6">
            <h2 id="shop-title" data-reveal="heading" className="eyebrow mb-[var(--heading-gap)] text-center">
              MAISON SÉLUNE — An Independent French Fragrance House
            </h2>
            <ProductGrid products={signatureProducts} />
            <p className="mt-[clamp(24px,2.6vw,40px)] text-center">
              <a href="#objects" className="text-link">
                Shop All <ArrowRight size={12} strokeWidth={1.4} aria-hidden />
              </a>
            </p>
          </section>

          <CollectionFeature
            id="heritage"
            title="The Sable Collection"
            description="A study in warmth and restraint. Quietly composed fragrances inspired by light, texture and the passing of time."
            href="#shop"
            product={{ src: assets.sableStillLife, alt: "A frosted MAISON SÉLUNE bottle on a stone plinth against a white arch" }}
            campaign={{
              src: assets.linenPortrait,
              alt: "A man in a linen shirt leaning on a stone wall, holding a MAISON SÉLUNE bottle",
            }}
          />

          <section id="objects" aria-labelledby="objects-title" className="wrap mt-[var(--section)] scroll-mt-6">
            <h2 id="objects-title" data-reveal="heading" className="eyebrow mb-[var(--heading-gap)] text-center">
              Objects of Scent
            </h2>
            <ProductGrid products={objectProducts} />
          </section>

          <section aria-labelledby="journal-title" className="wrap mt-[var(--section)] text-center">
            <h2
              id="journal-title"
              data-reveal="heading"
              className="font-display text-[clamp(30px,4.6vw,72px)] font-medium uppercase leading-[1] tracking-[-0.01em]"
            >
              The Sélune Journal
            </h2>
            <p data-reveal="heading" className="mt-[clamp(10px,1.2vw,16px)] text-[13px] font-medium md:text-[14px]">
              Notes on fragrance, craft, and the art of presence.
            </p>
          </section>

          <JournalSection />

          <CollectionFeature
            id="signature"
            title="Nocturne — The Signature"
            description="An intimate composition of shadow, warmth and quiet intensity."
            href="#shop"
            product={{ src: assets.nocturneCloseUp, alt: "A frosted MAISON SÉLUNE bottle in raking afternoon light on stone" }}
            campaign={{
              src: assets.signatureCampaign,
              alt: "A man seated on a stone ledge beside a MAISON SÉLUNE bottle",
            }}
          />
        </main>
        <Footer />
      </div>
      <Overlays />
    </StoreProvider>
  );
}
