import ServiceHero from "@/components/ui/ServiceHero/ServiceHero";

const FoodHero = () => {
  return (
    <ServiceHero
      backgroundImage="/images/food/food-hero.jpg"
      accentText="Hungry"
      mainText="Order Fresh Meals"
      connectorText=""
      description="Metromellow delivers flavor with fervor! From comfort grub to gourmet goodies, we bring the city's best bites to your door."
      ctaText="ORDER A MEAL"
      animationType="wobble"
      animationIntensity="intense"
    />
  );
};

export default FoodHero;
