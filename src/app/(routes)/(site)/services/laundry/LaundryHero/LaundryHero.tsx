import ServiceHero from "@/components/ui/ServiceHero/ServiceHero";

const LaundryHero = () => {
  return (
    <ServiceHero
      backgroundImage="/images/laundry/l3.jpeg"
      accentText="Laundry"
      mainText="Washes & Wows"
      description="Turn your dirty laundry blues into crisp, clean tunes. We pickup and deliver."
      ctaText="BOOK LAUNDRY"
      animationType="vibrate"
      animationIntensity="intense"
    />
  );
};

export default LaundryHero;
