import * as Form from '@radix-ui/react-form';
import PriceTagIcon from '../../icons/PriceTag';
import AmountIcon from '../../icons/Amount';
import { useRef, type FormEventHandler } from 'react';
import { checkImageUrl } from '../../lib/utils';
import useProducts from '../index-products/hooks/useProducts';

function NewProduct() {
  const formRef = useRef(null);
  const { addProduct } = useProducts();

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

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
  };

  return (
    <div className='flex justify-center mt-16 '>
      <Form.Root
        className='rounded-md p-5 border-2 border-white w-[370PX] bg-blue-950'
        ref={formRef}
        onSubmit={handleSubmit}
      >
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
              <button className='bg-white rounded-md text-slate-800 p-3'>
                <strong>Agregar</strong>
              </button>
            </Form.Submit>
          </div>
        </div>
      </Form.Root>
    </div>
  );
}
export default NewProduct;
