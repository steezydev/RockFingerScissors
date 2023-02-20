import React from 'react';

interface AccentButton {
  title: string;
  description?: string;
  onClick?: () => void;
}

export default function AccentButton({
  title,
  description,
  onClick = () => void 1,
}: AccentButton) {
  return (
    <button
      onClick={onClick}
      className='flex cursor-pointer select-none flex-col items-center justify-center gap-3'
    >
      <span className='font-display text-3xl font-semibold md:text-5xl'>
        {title}
      </span>
      {description ? (
        <span className='text-center font-accent text-lg text-white/60 md:text-xl'>
          {description}
        </span>
      ) : null}
    </button>
  );
}
