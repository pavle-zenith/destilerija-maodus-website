import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { blogTeasers } from "@/lib/content";
import styles from "./BlogTeaser.module.css";

export function BlogTeaser() {
  return (
    <section id="blog" className={styles.section} aria-label="Blog">
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <Eyebrow className={styles.eyebrow}>Edukacija i saveti</Eyebrow>
            <h2 className={styles.h2}>Iz naše radionice</h2>
          </div>
          <a href="#" className={styles.allLink}>
            Svi tekstovi →
          </a>
        </div>

        <div className={styles.grid}>
          {blogTeasers.map((post, i) => (
            <a key={post.title} href={post.href} className={styles.card}>
              <ImageSlot label="Foto teksta" height={190} className={styles.thumb} />
              <div className={styles.body}>
                <div className={styles.category}>{post.category}</div>
                <h3 className={styles.title}>{post.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
