import React from "react";
import styles from "./SignaturePattern.module.scss";
import Image from "next/image";

const SignaturePattern = () => {
  return (
    <div className={styles.signaturePattern} aria-hidden="true">
      <Image
        src="/images/brand/signature-pattern/Pattern.png"
        alt=""
        fill
        className={styles.patternImage}
        priority={false}
      />
    </div>
  );
};

export default SignaturePattern;
