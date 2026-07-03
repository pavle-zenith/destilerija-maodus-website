import { Button } from "@/components/ui/Button";
import styles from "./ContactCtas.module.css";

export function ContactCtas() {
  return (
    <div className={styles.ctas}>
      <Button href="/kontakt" variant="red" size="lg" track="Porudžbina za sebe (kontakt)">
        Porudžbina za sebe
      </Button>
      <Button href="/veleprodaja" variant="outline" size="lg" track="Veleprodajni upit">
        Veleprodajni upit
      </Button>
    </div>
  );
}
