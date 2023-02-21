import { useRouter } from 'next/router';
import * as React from 'react';

import HoverHand from '@/components/HoverHand/HoverHand';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Title from '@/components/Title/Title';

import Finger from '~/images/hands/hand-finger-1.png';
import Ok from '~/images/hands/hand-ok-1.png';

export default function RematchPage() {
  const router = useRouter();

  return (
    <Layout>
      <Seo templateTitle='Rematch' />

      <main>
        <section className='overflow-hidden px-2'>
          <div className='relative flex min-h-screen flex-col'>
            <div className='absolute top-24 left-1/2 -translate-x-1/2 md:top-0 md:left-0 md:translate-x-0'>
              <Title>Rematch?</Title>
            </div>
            <div className='mt-48 flex h-full w-full grow flex-row items-stretch justify-around'>
              <HoverHand
                onClick={() => router.push('/choose')}
                image={Ok}
                handClasses='relative flex h-auto grow flex-col items-center justify-center'
              >
                "yes"
              </HoverHand>
              <HoverHand
                onClick={() => router.push('/')}
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
