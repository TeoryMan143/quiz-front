import type { SVGProps } from 'react';

function House(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 36 36'
      {...props}
    >
      <path
        fill='currentColor'
        d='M33 19a1 1 0 0 1-.71-.29L18 4.41L3.71 18.71A1 1 0 0 1 2.3 17.3l15-15a1 1 0 0 1 1.41 0l15 15A1 1 0 0 1 33 19Z'
      />
      <path
        fill='currentColor'
        d='M18 7.79L6 19.83V32a2 2 0 0 0 2 2h7V24h6v10h7a2 2 0 0 0 2-2V19.76Z'
      />
      <path fill='none' d='M0 0h36v36H0z' />
    </svg>
  );
}

export default House;
