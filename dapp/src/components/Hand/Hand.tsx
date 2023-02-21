import { AnimatePresence, motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

import clsxm from '@/lib/clsxm';

import { Cords } from '@/types/animate';

interface HandProps {
  initial: Cords;
  animate: Cords;
  image: StaticImageData;
  hover?: Cords;
  isHover?: boolean;
  direction?: number;
}

export default function Hand({
  initial,
  animate,
  image,
  hover = {},
  isHover = false,
  direction = 0,
}: HandProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ rotate: direction, ...initial }}
        animate={
          isHover
            ? { rotate: direction, ...hover }
            : { rotate: direction, ...animate }
        }
        exit={{ rotate: direction, ...initial }}
        transition={{
          type: 'spring',
          stiffness: 100,
          mass: 0.5,
        }}
        className={clsxm('w-[398px] select-none')}
      >
        <Image
          width={398}
          priority
          quality={100}
          alt='hand'
          src={image}
        ></Image>
      </motion.div>
    </AnimatePresence>
  );
}
