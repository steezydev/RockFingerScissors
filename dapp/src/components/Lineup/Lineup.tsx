import { StaticImageData } from 'next/image';
import React, { useRef } from 'react';
import { useHover } from 'usehooks-ts';

import Hand from '@/components/Hand/Hand';

interface LineupProps {
  hand1: StaticImageData;
  hand2: StaticImageData;
  showHand2?: boolean;
  hover?: boolean;
  children: React.ReactNode;
}

export default function Lineup({
  hand1,
  hand2,
  showHand2 = true,
  hover = true,
  children,
}: LineupProps) {
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);

  return (
    <div
      ref={hoverRef}
      className='flex h-96 flex-row items-center justify-between'
    >
      <Hand
        direction={90}
        initial={{ x: -400 }}
        animate={{ x: 70 }}
        hover={{ x: 50 }}
        image={hand1}
        isHover={isHover && hover}
      />
      <span className='text-9xl'>{children}</span>
      <Hand
        direction={-90}
        initial={{ x: 400 }}
        animate={showHand2 ? { x: -70 } : {}}
        hover={{ x: -50 }}
        image={hand2}
        isHover={isHover && hover}
      />
    </div>
  );
}
