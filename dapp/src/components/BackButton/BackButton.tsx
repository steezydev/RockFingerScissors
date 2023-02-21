import Link from 'next/link';
import React from 'react';

export default function BackButton() {
  return (
    <div className='flex flex-row items-center gap-5'>
      <svg
        width='40'
        height='40'
        viewBox='0 0 50 50'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M32.7231 36.0269C33.5367 36.8404 33.5367 38.1595 32.7231 38.9731C31.9095 39.7867 30.5904 39.7867 29.7768 38.9731L17.2768 26.4731C16.4632 25.6595 16.4632 24.3404 17.2768 23.5269L29.7768 11.0269C30.5904 10.2133 31.9095 10.2133 32.7231 11.0269C33.5367 11.8404 33.5367 13.1595 32.7231 13.9731L21.6962 25L32.7231 36.0269Z'
          fill='white'
        />
      </svg>
      <Link href='/'>
        <span className='font-display text-4xl font-semibold'>Back</span>
      </Link>
    </div>
  );
}
