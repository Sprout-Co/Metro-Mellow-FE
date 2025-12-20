import ServiceHero from "@/components/ui/ServiceHero/ServiceHero";
import { ServiceCategory } from "@/graphql/api";

const CleaningHero = ({ onCTAClick }: { onCTAClick: () => void }) => {
  return (
    <ServiceHero
      backgroundImage="/images/cleaning/cleaning1.jpg"
      accentText="Cleaning"
      mainText="Service in Lagos"
      connectorText=""
      description="Professional cleaning services across Lagos. Deep cleaning, regular maintenance, and more—satisfaction guaranteed. We serve all major areas throughout Lagos State."
      ctaText="BOOK CLEANING"
      animationType="wobble"
      animationIntensity="intense"
      serviceCategory={ServiceCategory.Cleaning}
      onCTAClick={onCTAClick}
    />
  );
};

export default CleaningHero;
