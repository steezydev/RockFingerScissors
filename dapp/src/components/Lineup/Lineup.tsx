import { StaticImageData } from 'next/image';
import React, { useRef } from 'react';
import { useHover } from 'usehooks-ts';

import Hand from '@/components/Hand/Hand';

interface LineupProps {
  hand1: StaticImageData;
  hand2: StaticImageData;
}

export default function Lineup({ hand1, hand2 }: LineupProps) {
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);

  return (
    <div
      ref={hoverRef}
      className='flex h-96 flex-row items-center justify-between'
    >
      <Hand
        direction={90}
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        hover={{ x: 50 }}
        image={hand1}
        isHover={isHover}
      ></Hand>
      <span className='text-9xl'>beats...</span>
      <Hand
        direction={-90}
        initial={{ x: 200 }}
        animate={{ x: 0 }}
        hover={{ x: -50 }}
        image={hand2}
        isHover={isHover}
      ></Hand>
    </div>
  );
}
