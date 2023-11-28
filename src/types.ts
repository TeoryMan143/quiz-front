export type UUID = `${string}-${string}-${string}-${string}-${string}`;

export interface Product {
  id: UUID;
  image_url: string;
  name: string;
  description: string;
  amount: number;
  price: number;
  total_price: number;
  date: Date;
  [index: string]: any;
}

export interface AddProductDTO {
  image_url: string;
  name: string;
  description: string;
  amount: number;
  price: number;
}

export interface EditProductDTO {
  image_url?: string;
  name?: string;
  description?: string;
  amount?: number;
  price?: number;
}
