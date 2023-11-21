import type { Product } from '../types';

export const getAllProducts = async () => {
  const res = await fetch('http://localhost:8080/products');
  const queryProducts = await res.json();
  const allProducts: Product[] = queryProducts.map((product: any) => {
    const date = new Date(product.date);
    const finalProduct = { ...product, date };
    return finalProduct;
  });
  return allProducts;
};

export const deleteProduct = async (id: string) => {};
