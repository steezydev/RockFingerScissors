import { StaticImageData } from 'next/image';
import React, { useRef } from 'react';
import { useHover } from 'usehooks-ts';

import clsxm from '@/lib/clsxm';

import Hand from '@/components/Hand/Hand';

import { Cords } from '@/types/animate';

interface HandWrapperProps {
  initial: Cords;
  animate: Cords;
  hover: Cords;
  children: React.ReactNode;
  handClasses?: string;
  skinIndex?: number;
  image: StaticImageData;
}

export default function HandWrapper({
  children,
  initial,
  animate,
  hover,
  handClasses,
  image,
}: HandWrapperProps) {
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);

  return (
    <div ref={hoverRef} className='relative grow'>
      <div className='h-full'>{children}</div>
      <div
        className={clsxm(
          'absolute bottom-56 left-1/2 -z-10 -translate-x-1/2 md:-bottom-20',
          handClasses
        )}
      >
        <Hand
          initial={initial}
          animate={animate}
          hover={hover}
          image={image}
          isHover={isHover}
        />
      </div>
    </div>
  );
}
