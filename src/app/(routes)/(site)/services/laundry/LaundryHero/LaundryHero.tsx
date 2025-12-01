import ServiceHero from "@/components/ui/ServiceHero/ServiceHero";

const LaundryHero = () => {
  return (
    <ServiceHero
      backgroundImage="/images/home/home1.jpg"
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
