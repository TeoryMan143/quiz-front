import type { Product } from '../types';
import AmountIcon from '../icons/Amount';
import PriceTagIcon from '../icons/PriceTag';
import DollarIcon from '../icons/Dollar';
import EditIcon from '../icons/Edit';
import DeleteButton from './delete-button';
import Eye from '../icons/Eye';

interface Props {
  product: Product;
}

function ProductCard({ product }: Props) {
  const {
    amount,
    description,
    image_url: imageUrl,
    name,
    price,
    total_price: totalPrice,
    date,
    id,
  } = product;

  return (
    <section className='bg-slate-700 flex flex-col gap-3 p-5 rounded-md max-w-xs items-center text-ellipsis relative group/all'>
      <h3 className='font-medium text-2xl font-lilita'>{name}</h3>
      <div className='relative overflow-hidden rounded-md '>
        <img
          src={imageUrl}
          alt='A bird'
          width='175'
          height='175'
          className='aspect-square object-cover relative z-0'
        />
        <div className='absolute backdrop-blur-sm h-full w-full grid place-content-center z-10 group-hover/all:translate-y-[-175px] transition-transform duration-200'>
          <a href={`product/${id}`} className='group/view text-gray-400'>
            <Eye className='text-6xl' />
            <p className='text-center'>Ir a ver</p>
          </a>
        </div>
      </div>
      <p>{description}</p>
      <div className='flex gap-2 border border-white rounded-xl p-3 bg-slate-800'>
        <div className='flex flex-col items-center min-w-[48px]'>
          <span className='text-sm text-center'>Cantidad</span>
          <AmountIcon className='text-2xl' />
          <span>{amount}</span>
        </div>
        <div className='py-2'>
          <div className='h-full w-[1px] bg-white'></div>
        </div>
        <div className='flex flex-col items-center min-w-[48px]'>
          <span className='text-sm text-center'>Precio</span>
          <PriceTagIcon className='text-2xl' />
          <span>{price}</span>
        </div>
        <div className='py-2'>
          <div className='h-full w-[1px] bg-white'></div>
        </div>
        <div className='flex flex-col items-center min-w-[48px]'>
          <span className='text-sm text-center'>Total</span>
          <DollarIcon className='text-2xl' />
          <span>{totalPrice}</span>
        </div>
      </div>
      <p className='text-xs'>
        Añadido:{' '}
        {date.toLocaleString('es-CO', {
          month: 'long',
          day: '2-digit',
          year: 'numeric',
        })}
      </p>
      <div className='mt-3 flex gap-4'>
        <a
          href={`edit-product/${id}`}
          className='border border-white rounded-xl p-2 hover:bg-slate-800 hover:shadow-xl transition hover:scale-105'
        >
          <EditIcon className='inline-block relative bottom-[2px]' />
          Editar
        </a>
        <DeleteButton id={id} />
      </div>
    </section>
  );
}
export default ProductCard;
