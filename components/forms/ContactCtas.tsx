"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "./Modal";
import { InquiryForm } from "./InquiryForm";
import { WholesaleForm } from "./WholesaleForm";
import styles from "./ContactCtas.module.css";

type Which = null | "inquiry" | "wholesale";

export function ContactCtas() {
  const [open, setOpen] = useState<Which>(null);
  const close = () => setOpen(null);

  return (
    <>
      <div className={styles.ctas}>
        <Button
          variant="red"
          size="lg"
          onClick={() => setOpen("wholesale")}
          track="Veleprodajni upit"
        >
          Veleprodajni upit
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => setOpen("inquiry")}
          track="Porudžbina za sebe"
        >
          Porudžbina za sebe
        </Button>
      </div>

      <Modal
        open={open === "inquiry"}
        onClose={close}
        title="Porudžbina za sebe ili poklon"
        subtitle="Javite koju rakiju želite, količinu i grad — vraćamo se sa predlogom."
      >
        <InquiryForm />
      </Modal>

      <Modal
        open={open === "wholesale"}
        onClose={close}
        title="Veleprodajni upit"
        subtitle="Za restorane, barove, sale i vinoteke. Šaljemo ponudu po meri."
      >
        <WholesaleForm />
      </Modal>
    </>
  );
}
