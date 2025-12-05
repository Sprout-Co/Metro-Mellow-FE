import ServiceHero from "@/components/ui/ServiceHero/ServiceHero";

const FoodHero = () => {
  return (
    <ServiceHero
      backgroundImage="/images/food/food-hero.jpg"
      accentText="Hungry"
      mainText="hassle-free eat?"
      description="MetroMellow delivers flavor with fervor! From comfort grub to gourmet goodies, we bring the city's best bites to your door."
      ctaText="ORDER A MEAL"
      animationType="wobble"
      animationIntensity="intense"
      isAvailable={false}
    />
  );
};

export default FoodHero;
