import styles from "./ExperienceSection.module.scss";
// import { Button } from "@/components/ui/Button";
import { CTAButton } from "@/components/ui/Button/CTAButton";
import { Routes } from "@/constants/routes";

const ExperienceSection: React.FC = () => {
  // Place your video file (e.g., my-video.mp4) in public/videos/ and use the path below
  const VIDEO_URL = "/videos/metromellow_animation.mp4"; // Example: /videos/my-video.mp4

  return (
    <section className={styles["experience-section"]}>
      <div className={styles["experience-section__container"]}>
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
            Experience a <br />
            life without <br />
            hassle
          </h1>
          <p className={styles["experience-section__subtext"]}>
            We're the spark that turns your chaos into calm, the groove that
            gets your life back in tune.
          </p>
          <CTAButton
            href={Routes.GET_STARTED}
            size="lg"
            variant="primary"
            animationType="vibrate"
          >
            Book a service
          </CTAButton>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
