import ServiceHero from "@/components/ui/ServiceHero/ServiceHero";
import { ServiceCategory } from "@/graphql/api";

const CleaningHero = () => {
  return (
    <ServiceHero
      backgroundImage="/images/cleaning/cleaning1.jpg"
      accentText="Cleaning"
      mainText="Sparkles & Shines"
      description="Professional cleaning services. Deep cleaning, regular maintenance, and more—satisfaction guaranteed."
      ctaText="BOOK CLEANING"
      animationType="wobble"
      animationIntensity="intense"
      serviceCategory={ServiceCategory.Cleaning}
      useServiceModal={true}
    />
  );
};

export default CleaningHero;
