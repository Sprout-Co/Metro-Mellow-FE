import ServiceHero from "@/components/ui/ServiceHero/ServiceHero";

const FoodHero = () => {
  return (
    <ServiceHero
      backgroundImage="https://res.cloudinary.com/dyhfnsl0g/image/upload/v1754151621/f21_y5gd8w.jpg"
      accentText="Hungry"
      mainText="hassle-free eat?"
      description="MetroMellow delivers flavor with fervor! From comfort grub to gourmet goodies, we bring the city's best bites to your door."
      ctaText="ORDER A MEAL"
      animationType="wobble"
      animationIntensity="intense"
    />
  );
};

export default FoodHero;
