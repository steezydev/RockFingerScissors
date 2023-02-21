import { motion } from 'framer-motion';
import React from 'react';

interface TitleProps {
  children: React.ReactNode;
}

export default function Title({ children }: TitleProps) {
  return (
    <motion.h1
      initial={{ x: -700 }}
      animate={{ x: 0 }}
      transition={{
        type: 'spring',
        mass: 0.1,
      }}
    >
      {children}
    </motion.h1>
  );
}
