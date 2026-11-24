import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { assets } from "@/data/assets";
import { featuredStory, journalCategories, stories } from "@/data/journal";

const readMore = (
  <a href="#journal" className="text-link mt-3">
    Read More <ArrowRight size={12} strokeWidth={1.4} aria-hidden />
  </a>
);

export default function JournalSection() {
  return (
    <section id="journal" aria-label="The Sélune Journal articles" className="wrap mt-[var(--section-tight)]">
      <div data-reveal="journal" className="bg-surface-editorial px-[clamp(16px,3.2vw,56px)] py-[clamp(22px,3.2vw,52px)]">
        <div className="flex flex-col gap-3 border-b border-line pb-[clamp(14px,1.6vw,22px)] md:flex-row md:items-center md:justify-between">
          <Image
            src={assets.wordmark}
            alt="MAISON SÉLUNE"
            sizes="200px"
            className="-mx-[1.2%] w-[clamp(140px,12vw,210px)] mix-blend-multiply"
          />
          <nav aria-label="Journal categories">
            <ul className="flex flex-wrap items-center gap-x-[clamp(12px,1.4vw,20px)] gap-y-1 text-[12.5px] md:text-[13px]">
              {journalCategories.map((category) => (
                <li key={category}>
                  <a href="#journal" className="transition-opacity hover:opacity-60">
                    {category}
                  </a>
                </li>
              ))}
              <li>
                <a href="#journal" className="text-link">
                  Read All <ArrowRight size={12} strokeWidth={1.4} aria-hidden />
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-[clamp(20px,2.4vw,36px)] grid gap-x-[clamp(28px,4.4vw,80px)] md:grid-cols-2">
          <article
            data-reveal-item
            className="grid grid-cols-[1fr_clamp(112px,32vw,160px)] gap-x-4 border-b border-line pb-[clamp(16px,1.8vw,24px)] md:grid-cols-[1fr_1.25fr] md:gap-x-[clamp(18px,2.2vw,36px)] md:self-start md:border-b-0 md:pb-0"
          >
            <div className="flex flex-col md:border-b md:border-line md:pb-6">
              <p className="text-[12px] text-muted">{featuredStory.category}</p>
              <h3 className="mt-1 max-w-[320px] text-[15px] font-medium leading-[1.25] md:text-[clamp(16px,1.3vw,19px)]">
                {featuredStory.title}
              </h3>
              <p className="mt-2 max-w-[300px] text-[13px] leading-[1.55] text-muted">{featuredStory.description}</p>
              {readMore}
            </div>
            <div className="relative aspect-[8/9] overflow-hidden md:aspect-[5/7]">
              <Image
                src={featuredStory.image}
                alt={featuredStory.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1500px) 380px, (min-width: 768px) 26vw, 32vw"
                className="object-cover object-[72%_50%]"
              />
            </div>
          </article>

          <ul>
            {stories.map((story) => (
              <li
                key={story.title}
                data-reveal-item
                className="grid grid-cols-[1fr_auto] gap-4 border-b border-line py-[clamp(16px,1.8vw,24px)] md:first:pt-0"
              >
                <article className="contents">
                  <div className="flex flex-col">
                    <p className="text-[12px] text-muted">{story.category}</p>
                    <h3 className="mt-1 max-w-[300px] text-[15px] font-medium leading-[1.25] md:text-[clamp(16px,1.3vw,19px)]">{story.title}</h3>
                    {readMore}
                  </div>
                  <div className="relative aspect-[8/9] w-[clamp(92px,10vw,156px)] overflow-hidden">
                    <Image
                      src={story.image}
                      alt={story.alt}
                      fill
                      placeholder="blur"
                      sizes="156px"
                      className="object-cover"
                    />
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
