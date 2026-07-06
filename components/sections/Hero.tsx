import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import { featuredRakija } from "@/lib/content";
import styles from "./Hero.module.css";

export function Hero() {
  const featured = {
    name: featuredRakija.name,
    category: featuredRakija.tagline,
    abv: featuredRakija.abv,
    volume: featuredRakija.volume,
    image: featuredRakija.image,
    eyebrow: featuredRakija.eyebrow,
    href: `/rakije/${featuredRakija.slug}`,
  };

  return (
    <section className={styles.hero} aria-label="Naslovna">
      <Image
        src="/images/hero-distillery.png"
        alt="Ilustracija destilerije Maoduš"
        fill
        priority
        sizes="100vw"
        className={styles.bgImage}
      />
      <div className={styles.bgScrim} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.copy}>
          <Eyebrow variant="square" color="red" className={styles.eyebrow}>
            Porodična destilerija iz Kanjiže, od 1960-ih
          </Eyebrow>

          <h1 className={styles.h1}>
            <span className={styles.accent}>Rakija</span> za poklon,
            <br />
            proslavu i dobar meni.
          </h1>

          <p className={styles.sub}>
            Destilerija Maoduš je porodična destilerija iz Kanjiže u Vojvodini
            koja već tri generacije proizvodi rakiju od dunje, kajsije,
            viljamovke, jabuke i šljive za ugostitelje i kupce širom regiona.
          </p>

          <div className={styles.ctas}>
            <Button href="/kontakt" variant="red" size="lg" glow track="Poručite za sebe ili poklon (hero)">
              Poručite za sebe ili poklon
            </Button>
            <Button href="/veleprodaja" variant="dark" size="lg" glow track="Za lokale i proslave">
              Za lokale i proslave
            </Button>
          </div>

          <div className={styles.trust}>
            <div className={styles.avatars} aria-hidden="true">
              {[
                { src: "/images/partner-strand.png", name: "Strand" },
                { src: "/images/partner-tiska.jpg", name: "Tiska" },
                { src: "/images/partner-basch.png", name: "Basch" },
              ].map((p) => (
                <span key={p.name} className={styles.avatar}>
                  <Image src={p.src} alt={p.name} width={46} height={46} className={styles.avatarImg} />
                </span>
              ))}
            </div>
            <div className={styles.trustLabel}>
              Biraju nas kupci,
              <br />
              domaćini i ugostitelji.
            </div>
          </div>

          {/* in-flow featured card (<1024px) */}
          <div className={styles.featuredInflow}>
            <ProductCard {...featured} sizes="340px" priority />
          </div>
        </div>
      </div>

      {/* floating featured card (>=1024px), aligned to the container */}
      <div className={styles.featuredFloatWrap} aria-hidden={false}>
        <div className={styles.featuredFloatInner}>
          <div className={styles.featuredFloat}>
            <ProductCard {...featured} size="lg" sizes="332px" priority />
          </div>
        </div>
      </div>
    </section>
  );
}
