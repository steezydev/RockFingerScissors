import * as React from 'react';

import HoverHand from '@/components/HoverHand/HoverHand';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import Finger from '~/images/hands/hand-finger-2.png';
import Rock from '~/images/hands/hand-rock-2.png';
import Scissors from '~/images/hands/hand-scissors-1.png';

export default function ChoosePage() {
  return (
    <Layout>
      <Seo templateTitle='Choose' />

      <main>
        <section className='overflow-hidden px-2'>
          <div className='relative flex min-h-screen flex-col'>
            <div className='absolute top-24 left-1/2 -translate-x-1/2 md:top-0 md:left-0 md:translate-x-0'>
              <h1>Choose!</h1>
            </div>
            <div className='mt-48 flex h-full w-full grow flex-row items-stretch justify-around'>
              <HoverHand
                image={Rock}
                handClasses='relative flex h-auto grow flex-col items-center justify-center'
              >
                "rock"
              </HoverHand>
              <HoverHand
                image={Finger}
                handClasses='relative flex h-auto grow flex-col items-center justify-center'
              >
                "finger"
              </HoverHand>
              <HoverHand
                image={Scissors}
                handClasses='relative flex h-auto grow flex-col items-center justify-center'
              >
                "scissors"
              </HoverHand>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
