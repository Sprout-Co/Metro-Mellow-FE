import React from "react";
import styles from "./SignaturePattern.module.scss";
import Image from "next/image";

interface SignaturePatternProps {
  bgType?: "green" | "orange" | "transparent";
}

const SignaturePattern = ({ bgType = "green" }: SignaturePatternProps) => {
  return (
    <div className={styles.signaturePattern} aria-hidden="true">
      <Image
        src={`/images/brand/signature-pattern/signature-${bgType}.png`}
        alt=""
        fill
        className={styles.patternImage}
        priority={false}
      />
    </div>
  );
};

export default SignaturePattern;
