import { useRef } from 'react';
import { deleteProduct } from '../lib/api';

const DeleteIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    viewBox='0 0 24 24'
    className={className}
  >
    <path
      fill='currentColor'
      d='M10 5h4a2 2 0 1 0-4 0ZM8.5 5a3.5 3.5 0 1 1 7 0h5.75a.75.75 0 0 1 0 1.5h-1.32l-1.17 12.111A3.75 3.75 0 0 1 15.026 22H8.974a3.75 3.75 0 0 1-3.733-3.389L4.07 6.5H2.75a.75.75 0 0 1 0-1.5H8.5Zm2 4.75a.75.75 0 0 0-1.5 0v7.5a.75.75 0 0 0 1.5 0v-7.5ZM14.25 9a.75.75 0 0 0-.75.75v7.5a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75Z'
    ></path>
  </svg>
);

const CancelIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    viewBox='0 0 2048 2048'
    className={className}
  >
    <path
      fill='currentColor'
      d='m1115 1024l690 691l-90 90l-691-690l-691 690l-90-90l690-691l-690-691l90-90l691 690l691-690l90 90l-690 691z'
    />
  </svg>
);

function DeleteButton({
  id,
  noText = false,
}: {
  id: string;
  noText?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);

  const handleClick = () => {
    dialog.current?.showModal();
  };

  return (
    <>
      <dialog
        className='backdrop:bg-slate-700/60 bg-slate-800 text-white  border border-white rounded-xl p-4'
        ref={dialog}
      >
        <h3 className='text-3xl font-lilita '>¿Estas seguro?</h3>
        <div className='mt-3 flex justify-center gap-2'>
          <button
            onClick={() => {
              dialog.current?.close();
            }}
            autoFocus
            className='border border-white rounded-xl p-2 transition hover:scale-105 hover:bg-slate-800 hover:shadow-xl focus:scale-105 focus:bg-slate-800 focus:shadow-xl bg-slate-700'
          >
            <CancelIcon className='inline-block relative bottom-[2px]' />
            Cancelar
          </button>
          <button
            onClick={async () => {
              await deleteProduct(id);
              window.location.href = '/';
            }}
            className='border border-white rounded-xl p-2 bg-red-700 transition hover:scale-105 hover:bg-red-900 focus:shadow-xl focus:scale-105 focus:bg-red-900 hover:shadow-xl'
          >
            <DeleteIcon className='inline-block relative bottom-[2px]' />{' '}
            Comfirmar
          </button>
        </div>
      </dialog>
      <button
        className='border border-white rounded-xl p-2 bg-red-700 hover:bg-red-900 hover:shadow-xl transition hover:scale-105'
        onClick={handleClick}
      >
        <DeleteIcon className='inline-block relative bottom-[2px]' />
        {noText ? '' : 'Eliminar'}
      </button>
    </>
  );
}
export default DeleteButton;
