export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string; // Added for categories
}

export interface CartItem extends Product {
  quantity: number;
}