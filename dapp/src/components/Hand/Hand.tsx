import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

import HandImg from '~/images/hands/hand-point-1.png';

export default function Hand() {
  return (
    <motion.div
      initial={{ y: 500, x: 0 }}
      animate={{ y: 150, x: 0 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        mass: 0.5,
      }}
      className='select-none'
    >
      <Image
        width={398}
        priority
        quality={100}
        alt='hand'
        src={HandImg}
      ></Image>
    </motion.div>
  );
}
