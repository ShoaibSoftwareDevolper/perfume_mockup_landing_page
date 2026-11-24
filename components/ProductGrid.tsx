import Image from "next/image";
import { formatPrice, type Product } from "@/data/products";
import ProductCardAction from "./ProductCardAction";

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group relative">
      <div className="relative aspect-[9/10] overflow-hidden bg-surface">
        <Image
          src={product.image}
          alt={product.alt}
          fill
          placeholder="blur"
          sizes="(min-width: 1500px) 360px, (min-width: 768px) 24vw, 48vw"
          className="object-cover [transition:scale_1.8s_cubic-bezier(0.16,1,0.3,1),filter_1.2s_ease-out,opacity_1.2s_ease-out] group-hover:scale-[1.04] group-hover:opacity-[0.94] group-hover:blur-[0.6px]"
        />
      </div>
      <div className="mt-3">
        <h3 className="text-[13px] leading-snug md:text-[14px]">
          {product.name} — {product.type}
        </h3>
        <p className="mt-0.5 text-[12px] tabular-nums text-ink/80 md:text-[13px]">{formatPrice(product.price)}</p>
      </div>
      <ProductCardAction id={product.id} name={product.name} />
    </article>
  );
}

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <ul data-reveal="grid" className="grid grid-cols-2 gap-x-[var(--grid-gap)] gap-y-[clamp(24px,2.6vw,40px)] md:grid-cols-4">
      {products.map((product) => (
        <li key={product.id} data-reveal-item>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
