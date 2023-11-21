export interface Product {
  id: `${string}-${string}-${string}-${string}-${string}`;
  image_url: string;
  name: string;
  description: string;
  amount: number;
  price: number;
  total_price: number;
  date: Date;
}
