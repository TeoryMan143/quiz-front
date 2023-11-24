import * as Form from '@radix-ui/react-form';
import PriceTagIcon from '../../icons/PriceTag';
import AmountIcon from '../../icons/Amount';
import { useRef, type FormEventHandler, useState } from 'react';
import { checkImageUrl, delay } from '../../lib/utils';
import useProducts from '../index-products/hooks/useProducts';
import styles from './styles.module.css';

function NewProduct() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const { addProduct } = useProducts();

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    setLoading(true);

    if (!formRef.current) {
      return;
    }

    const formData = new FormData(formRef.current);

    const name = formData.get('name');
    const description = formData.get('description');
    const amount = formData.get('amount');
    const price = formData.get('price');
    const imageUrl = formData.get('image');

    if (!name || !description || !amount || !price || !imageUrl) {
      return;
    }

    addProduct({
      name: name.toString(),
      description: description.toString(),
      amount: parseFloat(amount.toString()),
      price: parseFloat(price.toString()),
      image_url: imageUrl.toString(),
    });

    setLoading(false);
    setDone(true);
  };

  return (
    <div className='flex justify-center items-center mt-16 '>
      <Form.Root
        className='rounded-md p-5 border-2 border-white w-[370PX] bg-blue-950'
        ref={formRef}
        onSubmit={handleSubmit}
      >
        {done ? (
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
