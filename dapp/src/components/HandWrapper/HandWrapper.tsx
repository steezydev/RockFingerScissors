import React from 'react';

import Hand from '@/components/Hand/Hand';

interface HandWrapperProps {
  children: React.ReactNode;
}

export default function HandWrapper({ children }: HandWrapperProps) {
  return (
    <div>
      {children}
      <div className='absolute bottom-56 left-1/2 -z-10 -translate-x-1/2 md:-bottom-20'>
        <Hand />
      </div>
    </div>
  );
}
