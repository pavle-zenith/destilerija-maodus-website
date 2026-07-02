import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { blogTeasers } from "@/lib/content";
import styles from "./BlogTeaser.module.css";

export function BlogTeaser() {
  return (
    <section id="blog" className={styles.section} aria-label="Blog">
      <div className={styles.inner}>
        <Reveal className={styles.header}>
          <div>
            <Eyebrow className={styles.eyebrow}>Edukacija i saveti</Eyebrow>
            <h2 className={styles.h2}>Iz naše radionice</h2>
          </div>
          <a href="#" className={styles.allLink}>
            Svi tekstovi →
          </a>
        </Reveal>

        <div className={styles.grid}>
          {blogTeasers.map((post, i) => (
            <RevealItem key={post.title} href={post.href} className={styles.card} index={i}>
              <ImageSlot label="Foto teksta" height={190} className={styles.thumb} />
              <div className={styles.body}>
                <div className={styles.category}>{post.category}</div>
                <h3 className={styles.title}>{post.title}</h3>
              </div>
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  );
}
