import ServiceHero from "@/components/ui/ServiceHero/ServiceHero";

const CleaningHero = () => {
  return (
    <ServiceHero
      backgroundImage="/images/cleaning/c2.jpeg"
      accentText="Cleaning"
      mainText="Sparkles & Shines"
      description="We turn mess into mellow magic — deep cleaning, tidying, and everything in between."
      ctaText="BOOK CLEANING"
      animationType="wobble"
      animationIntensity="intense"
    />
  );
};

export default CleaningHero;
