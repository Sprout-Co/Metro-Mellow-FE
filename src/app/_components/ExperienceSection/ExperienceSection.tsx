import styles from "./ExperienceSection.module.scss";
// import { Button } from "@/components/ui/Button";
import { CTAButton } from "@/components/ui/Button/CTAButton";
import { Routes } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";

const ExperienceSection: React.FC = () => {
  // Place your video file (e.g., my-video.mp4) in public/videos/ and use the path below
  const VIDEO_URL = "/videos/metromellow_animation.mp4"; // Example: /videos/my-video.mp4

  return (
    <section className={styles["experience-section"]}>
      <Link
        href={Routes.METROEATS}
        className={styles["experience-section__banner"]}
        aria-label="Go to MetroEats page"
      >
        <Image
          src="/images/metroeats/banners/metroeat-launch-banner.jpg"
          alt="MetroEats launch banner"
          width={1920}
          height={640}
          sizes="100vw"
          className={styles["experience-section__banner-image"]}
          priority
        />
        <div className={styles["experience-section__banner-overlay"]}>
          <h2 className={styles["experience-section__banner-title"]}>
            Fresh Homemade Meals, Ready To Deliver
          </h2>
          <p className={styles["experience-section__banner-subtext"]}>
            Explore MetroEats, MetroMellow&apos;s cloud kitchen for delicious
            Nigerian meals and bulk meal plans.
          </p>
          <div className={styles["experience-section__banner-cta"]}>
            <CTAButton
              href={Routes.METROEATS}
              size="lg"
              variant="white"
              animationType="pulse"
              animationIntensity="medium"
              animationInterval={2200}
            >
              Go To MetroEats
            </CTAButton>
          </div>
        </div>
      </Link>
      {/* <div className={styles["experience-section__container"]}>
        <div className={styles["experience-section__media"]}>
          <div className={styles["experience-section__video-box"]}>
            <video
              className={styles["experience-section__video"]}
              src={VIDEO_URL}
              controls
            />
          </div>
        </div>
        <div className={styles["experience-section__content"]}>
          <h1 className={styles["experience-section__heading"]}>
            Professional home services that give you back your time.
          </h1>
          <CTAButton
            href={Routes.GET_STARTED}
            size="lg"
            variant="primary"
            animationType="vibrate"
          >
            Book Now!
          </CTAButton>
        </div>
      </div> */}
    </section>
  );
};

export default ExperienceSection;
