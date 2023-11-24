import type { AddProductDTO, Product, UUID } from '../types';

const BASE_URL = 'https://quiz-back-dev-exqn.4.us-1.fl0.io';

export const getAllProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  const queryProducts = await res.json();
  const allProducts: Product[] = queryProducts.map((product: any) => {
    const date = new Date(product.date);
    const finalProduct = { ...product, date };
    return finalProduct;
  });
  return allProducts;
};

export const getProduct = async (id: UUID): Promise<Product> => {
  const res = await fetch(`${BASE_URL}/product/${id}`);
  const [queryProduct] = await res.json();
  const date = new Date(queryProduct.date);
  const finalProduct = { ...queryProduct, date };
  return finalProduct;
};

export const addProduct = async (product: AddProductDTO) => {
  const addedProductRes = await fetch(`${BASE_URL}/product`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  const addedProduct = addedProductRes.json();
  return addedProduct;
};

export const deleteProduct = async (id: string) => {
  const res = await fetch(`${BASE_URL}/product/${id}`, { method: 'DELETE' });
  return res.status;
};
