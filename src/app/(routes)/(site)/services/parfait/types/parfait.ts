export interface Ingredient {
  id: string;
  name: string;
  emoji: string;
  price: number;
  category: "base" | "fruits" | "toppings" | "sauce";
  color?: string;
}

export interface ParfaitItem {
  id: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
  popular?: boolean;
  ingredients: string[];
}

export interface CustomParfait {
  size: "small" | "medium" | "large";
  ingredients: Ingredient[];
  totalPrice: number;
}

export interface Testimonial {
  id: number;
  text: string;
  author: string;
  rating: number;
  emoji?: string;
}
