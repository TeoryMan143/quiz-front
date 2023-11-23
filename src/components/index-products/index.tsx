import ProductCard from '../product-card';
import useProducts from './hooks/useProducts';

function IndexProducts() {
  const { products } = useProducts();
  return (
    <div className='p-6 flex flex-wrap gap-5'>
      {products.map(product => (
        <ProductCard product={product} key={product.id} />
      ))}

      <section className='rounded-md w-72 shadow-md shadow-white border-2 border-white group'>
        <a
          href='new-product'
          className='h-full w-full inline-flex justify-center items-center'
        >
          <div>
            <p className='text-center text-6xl'>+</p>
            <p className='text-center text-transparent group-hover:text-white transition-colors'>
              Añadir producto
            </p>
          </div>
        </a>
      </section>
    </div>
  );
}
export default IndexProducts;
