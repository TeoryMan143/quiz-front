import type { SVGProps } from 'react';

function Amount(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 2048 2048'
      {...props}
    >
      <path
        fill='currentColor'
        d='m1472 600l575 288v782l-575 288l-576-286v-321l-320 159L0 1224l1-784l575-288l575 288l1 321l320-161zm368 327l-368-183l-368 183l368 184l368-184zM944 479L576 296L208 479l368 184l368-184zM129 583l-1 561l384 191V774L129 583zm511 752l257-127V888l127-63l-1-242l-383 191v561zm385-304l-1 561l384 191v-561l-383-191zm511 752l383-192v-560l-383 191v561z'
      />
    </svg>
  );
}

export default Amount;
