"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "./Modal";
import { WholesaleForm } from "./WholesaleForm";
import styles from "./ContactCtas.module.css";

export function ContactCtas() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={styles.ctas}>
        <Button href="/kontakt" variant="red" size="lg" track="Poručite rakiju (kontakt)">
          Poručite rakiju
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => setOpen(true)}
          track="Veleprodajni upit"
        >
          Veleprodajni upit
        </Button>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Veleprodajni upit"
        subtitle="Za restorane, barove, sale i vinoteke. Šaljemo ponudu po meri."
      >
        <WholesaleForm />
      </Modal>
    </>
  );
}
