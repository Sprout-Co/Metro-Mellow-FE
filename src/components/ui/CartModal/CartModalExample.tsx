"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button/Button';
import CartModal, { CartItem } from './CartModal';

// Sample data for demonstration
const sampleCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Fried Rice',
    price: 5400,
    image: '/public/images/food/fried-rice.jpeg',
    quantity: 1,
    variants: ['Beef', 'Turkey', 'Salad']
  },
  {
    id: '2',
    name: 'Fried Rice',
    price: 5400,
    image: '/public/images/food/fried-rice.jpeg',
    quantity: 1,
    variants: ['Beef', 'Turkey', 'Salad']
  },
  {
    id: '3',
    name: 'Fried Rice',
    price: 5400,
    image: '/public/images/food/fried-rice.jpeg',
    quantity: 1,
    variants: ['Beef', 'Turkey', 'Salad']
  }
];

export default function CartModalExample() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(sampleCartItems);
  
  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  const handleRemoveItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  const handleContinue = () => {
    console.log('Continue with checkout');
    setIsCartOpen(false);
  };
  
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Cart Modal Example</h1>
      <Button 
        variant="primary" 
        size="lg" 
        onClick={() => setIsCartOpen(true)}
      >
        Open Cart ({cartItems.length})
      </Button>
      
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onContinue={handleContinue}
      />
    </div>
  );
} 