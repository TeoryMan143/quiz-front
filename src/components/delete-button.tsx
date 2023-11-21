import { useRef } from 'react';
import DeleteIcon from '../icons/Delete.astro';

function DeleteButton({ id }: { id: string }) {
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
            className='focus:border border-white'
          >
            Cancelar
          </button>
          <button>Comfirmar</button>
        </div>
      </dialog>
      <button
        className='border border-white rounded-xl p-2 bg-red-700 hover:bg-red-900 hover:shadow-xl transition hover:scale-105'
        onClick={handleClick}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='1em'
          height='1em'
          viewBox='0 0 24 24'
          className='inline-block relative bottom-[2px]'
        >
          <path
            fill='currentColor'
            d='M10 5h4a2 2 0 1 0-4 0ZM8.5 5a3.5 3.5 0 1 1 7 0h5.75a.75.75 0 0 1 0 1.5h-1.32l-1.17 12.111A3.75 3.75 0 0 1 15.026 22H8.974a3.75 3.75 0 0 1-3.733-3.389L4.07 6.5H2.75a.75.75 0 0 1 0-1.5H8.5Zm2 4.75a.75.75 0 0 0-1.5 0v7.5a.75.75 0 0 0 1.5 0v-7.5ZM14.25 9a.75.75 0 0 0-.75.75v7.5a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75Z'
          ></path>
        </svg>
        Eliminar
      </button>
    </>
  );
}
export default DeleteButton;
