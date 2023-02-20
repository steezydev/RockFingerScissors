import * as React from 'react';

import HoverHand from '@/components/HoverHand/HoverHand';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import Finger from '~/images/hands/hand-finger-1.png';
import Ok from '~/images/hands/hand-ok-1.png';

export default function RematchPage() {
  return (
    <Layout>
      <Seo templateTitle='Rematch' />

      <main>
        <section className='overflow-hidden px-2'>
          <div className='relative flex min-h-screen flex-col'>
            <div className='absolute top-24 left-1/2 -translate-x-1/2 md:top-0 md:left-0 md:translate-x-0'>
              <h1>Rematch?</h1>
            </div>
            <div className='mt-48 flex h-full w-full grow flex-row items-stretch justify-around'>
              <HoverHand
                image={Ok}
                handClasses='relative flex h-auto grow flex-col items-center justify-center'
              >
                "yes"
              </HoverHand>
              <HoverHand
                image={Finger}
                handClasses='relative flex h-auto grow flex-col items-center justify-center'
              >
                "no"
              </HoverHand>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
