import { FC } from "react";
import styles from "./ContactHero.module.scss";
import SignaturePattern from "@/components/ui/SignaturePattern/SignaturePattern";

const ContactHero: FC = () => {
  return (
    <section className={styles.contactHero}>
      <SignaturePattern bgType="orange" />
      <div className={styles.contactHero__container}>
        <div className={styles.contactHero__content}>
          <h1 className={styles.contactHero__title}>Let's Talk!</h1>
          <p className={styles.contactHero__subtitle}>
            Got a question? A wrinkle to iron out? Or just want to say hi?
          </p>
          <p className={styles.contactHero__text}>We're all ears</p>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
