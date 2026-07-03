import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon, type IconName } from "@/components/ui/Icon";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { site, mapEmbedSrc, mapLinkHref } from "@/lib/site";
import styles from "./ContactSection.module.css";

type Row = {
  icon: IconName;
  value: string;
  label: string;
  href?: string;
  external?: boolean;
};

const rows: Row[] = [
  { icon: "phone", value: site.phone, label: "Kontakt telefon", href: site.phoneHref },
  { icon: "mail", value: site.email, label: "E-mail adresa", href: site.emailHref },
  {
    icon: "instagram",
    value: site.instagram,
    label: "Pratite nas na Instagramu",
    href: site.instagramHref,
    external: true,
  },
  { icon: "pin", value: site.addressShort, label: "Adresa", href: mapLinkHref, external: true },
];

export function ContactSection({ defaultRakija = "" }: { defaultRakija?: string }) {
  return (
    <section className={styles.section} aria-label="Kontakt">
      <div className={styles.inner}>
        {/* intro */}
        <div className={styles.intro}>
          <Eyebrow className={styles.eyebrow}>Kontakt</Eyebrow>
          <div className={styles.rating}>
            <span className={styles.stars} aria-hidden="true">★★★★★</span>
            <span className={styles.ratingText}>Ocenjeno 5/5 na Google</span>
          </div>
          <h1 className={styles.h1}>Poručite rakiju</h1>
          <p className={styles.subhead}>
            Za poklon, proslavu, ličnu porudžbinu ili bilo koje pitanje, tu smo.
          </p>
        </div>

        {/* mobile-only quick-call button, sits between intro and form */}
        <a href={site.phoneHref} className={styles.mobileCall}>
          <Icon name="phone" size={20} />
          Pozovite nas: {site.phone}
        </a>

        {/* form */}
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>Pošaljite upit za porudžbinu</h2>
          <InquiryForm variant="consumer" defaultRakija={defaultRakija} />
        </div>

        {/* contact info */}
        <div className={styles.info}>
          <ul className={styles.rows}>
            {rows.map((r) => {
              const inner = (
                <>
                  <span className={styles.chip}>
                    <Icon name={r.icon} size={20} />
                  </span>
                  <span className={styles.rowText}>
                    <span className={styles.rowValue}>{r.value}</span>
                    <span className={styles.rowLabel}>{r.label}</span>
                  </span>
                </>
              );
              return (
                <li key={r.label} className={styles.row}>
                  {r.href ? (
                    <a
                      href={r.href}
                      className={styles.rowLink}
                      {...(r.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className={styles.rowLink}>{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>

          <p className={styles.crossLink}>
            Tražite veleprodajnu ponudu?{" "}
            <a href="/#veleprodaja" className={styles.crossLinkA}>
              Posetite stranicu za ugostitelje →
            </a>
          </p>
        </div>

        {/* map — full-width row */}
        <div className={styles.mapBlock}>
          <div className={styles.mapHead}>
            <Eyebrow className={styles.eyebrow}>Lokacija</Eyebrow>
            <a
              href={mapLinkHref}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapLink}
            >
              Otvorite u Google mapama →
            </a>
          </div>
          <div className={styles.mapWrap}>
            <iframe
              src={mapEmbedSrc}
              title="Lokacija · Destilerija Maoduš"
              className={styles.map}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
