import { useEffect, useState } from 'react';
import type { Product } from '../../../types';
import { deleteProduct, getAllProducts, addProduct } from '../../../lib/api';

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const queryProducts = await getAllProducts();
      setProducts(queryProducts);
    };
    getProducts().catch(err => console.error(err));
  }, [products]);

  return { products, deleteProduct, addProduct };
};

export default useProducts;
