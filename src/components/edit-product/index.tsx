import * as Form from '@radix-ui/react-form';
import PriceTagIcon from '../../icons/PriceTag';
import AmountIcon from '../../icons/Amount';
import { useRef, type FormEventHandler, useState, useEffect } from 'react';
import { checkImageUrl } from '../../lib/utils';
import useProducts from '../../hooks/useProducts';
import styles from './styles.module.css';
import type { Product, UUID } from '../../types';
import { editProduct } from '../../lib/api';

function NewProduct({ id }: { id: UUID }) {
  const [loading, setLoading] = useState(false);
  const [loadingInit, setLoadingInit] = useState(true);
  const [done, setDone] = useState(false);
  const [initProduct, setInitProduct] = useState<Product | null>(null);

  const { getProduct } = useProducts();

  useEffect(() => {
    const run = async () => {
      const res = await getProduct(id);

      if (res.error) {
        return (window.location.href = '/404');
      }

      setInitProduct(res as Product);
      setLoadingInit(false);
    };

    run();
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const name = formData.get('name');
    const description = formData.get('description');
    const amount = formData.get('amount');
    const price = formData.get('price');
    const imageUrl = formData.get('image');

    const formObj = {
      name: name?.toString(),
      description: description?.toString(),
      amount:
        amount?.toString() == null ? null : parseFloat(amount?.toString()),
      price: price?.toString() == null ? null : parseFloat(price?.toString()),
      image_url: imageUrl?.toString(),
    } as any;

    let finalProduct = {} as any;

    for (const [key, value] of Object.entries(formObj as Object)) {
      if (!initProduct) return;

      if (initProduct[key] !== value) {
        finalProduct[key] = formObj[key] || null;
      }
    }

    editProduct(id, finalProduct);

    setLoading(false);
    setDone(true);
  };

  return (
    <div className='flex justify-center items-center mt-16 '>
      <Form.Root
        className='rounded-md p-5 border-2 border-white w-[370PX] bg-blue-950'
        onSubmit={handleSubmit}
      >
        {loadingInit ? (
          <div className='grid place-content-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='1em'
              height='1em'
              viewBox='0 0 24 24'
              className='text-6xl'
            >
              <g
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeWidth='2'
              >
                <path
                  strokeDasharray='60'
                  strokeDashoffset='60'
                  strokeOpacity='.3'
                  d='M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z'
                >
                  <animate
                    fill='freeze'
                    attributeName='stroke-dashoffset'
                    dur='1.3s'
                    values='60;0'
                  />
                </path>
                <path
                  strokeDasharray='15'
                  strokeDashoffset='15'
                  d='M12 3C16.9706 3 21 7.02944 21 12'
                >
                  <animate
                    fill='freeze'
                    attributeName='stroke-dashoffset'
                    dur='0.3s'
                    values='15;0'
                  />
                  <animateTransform
                    attributeName='transform'
                    dur='1.5s'
                    repeatCount='indefinite'
                    type='rotate'
                    values='0 12 12;360 12 12'
                  />
                </path>
              </g>
            </svg>
          </div>
        ) : done ? (
          <div className='flex flex-col justify-center items-center'>
            <svg
              width='1em'
              height='1em'
              viewBox='0 0 50 50'
              xmlns='http://www.w3.org/2000/svg'
              className='text-6xl'
            >
              <circle
                cx='25'
                cy='25'
                r='20'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              />
              <path
                onAnimationEnd={() => (window.location.href = '/')}
                id='checkmark'
                className={styles.checkAnimation}
                fill='none'
                stroke='currentColor'
                strokeWidth='4'
                d='M14 27 l7 7 l16 -16'
              />
            </svg>
            <p>Producto registrado</p>
          </div>
        ) : (
          <>
            <h2 className='font-bold text-2xl mb-3'>Nuevo Producto</h2>
            <div className='flex flex-col gap-3'>
              <Form.Field name='name'>
                <div className='flex items-baseline justify-between'>
                  <Form.Label className='leading-[35px] text-white'>
                    Nombre
                  </Form.Label>
                  <Form.Message
                    className='text-sm text-red-400 opacity-[0.8]'
                    match='valueMissing'
                  >
                    Por favor introduce un nombre
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input
                    className='box-border w-full bg-blue-900 shadow-white inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_white] focus:shadow-[0_0_0_2px_white] selection:color-white selection:bg-white'
                    required
                    defaultValue={initProduct?.name}
                  />
                </Form.Control>
              </Form.Field>
              <Form.Field name='description'>
                <div className='flex items-baseline justify-between'>
                  <Form.Label className='leading-[35px] text-white'>
                    Descripcion
                  </Form.Label>
                  <Form.Message
                    className='text-sm text-red-400 opacity-[0.8]'
                    match='valueMissing'
                  >
                    Por favor introduce una descipción
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <textarea
                    className='box-border w-full bg-blue-900 shadow-white inline-flex appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_white] focus:shadow-[0_0_0_2px_white] selection:color-white selection:bg-white h-14'
                    required
                    defaultValue={initProduct?.description}
                  />
                </Form.Control>
              </Form.Field>
              <Form.Field name='image'>
                <div className='flex items-baseline justify-between'>
                  <Form.Label className='leading-[35px] text-white'>
                    URL Imagen
                  </Form.Label>
                  <Form.Message
                    className='text-sm text-red-400 opacity-[0.8]'
                    match='valueMissing'
                  >
                    Por favor introduce unu URL para la imagen
                  </Form.Message>
                  <Form.Message
                    className='text-sm text-red-400 opacity-[0.8]'
                    match={async value => !(await checkImageUrl(value))}
                  >
                    Por favor introduce un URL valido
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input
                    className='box-border w-full bg-blue-900 shadow-white inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_white] focus:shadow-[0_0_0_2px_white] selection:color-white selection:bg-white'
                    required
                    defaultValue={initProduct?.image_url}
                  />
                </Form.Control>
              </Form.Field>
              <div className='flex gap-8'>
                <Form.Field name='price'>
                  <div className='flex items-baseline justify-between'>
                    <Form.Label className='leading-[35px] text-white'>
                      Precio <PriceTagIcon className='inline-block' />
                    </Form.Label>
                    <Form.Message
                      className='text-sm text-red-400 opacity-[0.8]'
                      match='valueMissing'
                    >
                      Por favor introduce un precio
                    </Form.Message>
                  </div>
                  <Form.Control asChild>
                    <input
                      className='box-border  bg-blue-900 shadow-white inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_white] focus:shadow-[0_0_0_2px_white] selection:color-white selection:bg-white'
                      type='number'
                      required
                      defaultValue={initProduct?.price}
                    />
                  </Form.Control>
                </Form.Field>
                <Form.Field name='amount'>
                  <div className='flex items-baseline justify-between'>
                    <Form.Label className='leading-[35px] text-white'>
                      Cantidad <AmountIcon className='inline-block' />
                    </Form.Label>
                    <Form.Message
                      className='text-sm text-red-400 opacity-[0.8]'
                      match='valueMissing'
                    >
                      Por favor introduce una cantidad
                    </Form.Message>
                  </div>
                  <Form.Control asChild>
                    <input
                      className='box-border bg-blue-900 shadow-white inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_white] focus:shadow-[0_0_0_2px_white] selection:color-white selection:bg-white w-20'
                      type='number'
                      required
                      defaultValue={initProduct?.amount}
                    />
                  </Form.Control>
                </Form.Field>
              </div>
              <div className='grid place-content-center mt-5'>
                <Form.Submit asChild>
                  <button
                    className='bg-white rounded-md text-slate-800 p-3'
                    disabled={loading}
                  >
                    {loading ? (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='1em'
                        height='1em'
                        viewBox='0 0 24 24'
                      >
                        <g
                          fill='none'
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeWidth='2'
                        >
                          <path
                            strokeDasharray='60'
                            strokeDashoffset='60'
                            strokeOpacity='.3'
                            d='M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z'
                          >
                            <animate
                              fill='freeze'
                              attributeName='stroke-dashoffset'
                              dur='1.3s'
                              values='60;0'
                            />
                          </path>
                          <path
                            strokeDasharray='15'
                            strokeDashoffset='15'
                            d='M12 3C16.9706 3 21 7.02944 21 12'
                          >
                            <animate
                              fill='freeze'
                              attributeName='stroke-dashoffset'
                              dur='0.3s'
                              values='15;0'
                            />
                            <animateTransform
                              attributeName='transform'
                              dur='1.5s'
                              repeatCount='indefinite'
                              type='rotate'
                              values='0 12 12;360 12 12'
                            />
                          </path>
                        </g>
                      </svg>
                    ) : (
                      <strong>Agregar</strong>
                    )}
                  </button>
                </Form.Submit>
              </div>
            </div>
          </>
        )}
      </Form.Root>
    </div>
  );
}
export default NewProduct;
