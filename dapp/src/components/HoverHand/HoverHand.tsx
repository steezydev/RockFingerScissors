import { motion } from 'framer-motion';
import { StaticImageData } from 'next/image';
import React, { useRef } from 'react';
import { useHover } from 'usehooks-ts';

import clsxm from '@/lib/clsxm';

import Hand from '@/components/Hand/Hand';

const rndNum = (range: [number, number]) => {
  return Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
};

interface HoverHandProps {
  children: React.ReactNode;
  handClasses?: string;
  image: StaticImageData;
}

export default function HoverHand({
  children,
  handClasses,
  image,
}: HoverHandProps) {
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);

  return (
    <div
      ref={hoverRef}
      className={clsxm(
        'relative flex h-auto grow cursor-pointer select-none flex-col items-center justify-center',
        handClasses
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 100, rotate: 0 }}
        animate={
          isHover
            ? { opacity: 1, y: -150, rotate: rndNum([-10, 10]) }
            : { opacity: 0, y: 100, rotate: 0 }
        }
      >
        <span className='text-6xl'>{children}</span>
      </motion.div>
      <div className='absolute -bottom-64 left-1/2 -translate-x-1/2'>
        <Hand
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          hover={{ y: -140 }}
          image={image}
          isHover={isHover}
        />
      </div>
    </div>
  );
}
