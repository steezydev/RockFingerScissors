import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

import { getImageByChoice, getTitleByChoice } from '@/lib/getChoice';

import HoverHand from '@/components/HoverHand/HoverHand';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Title from '@/components/Title/Title';

import rfsGetCurrentChallengeStatus from '@/services/rfsGetCurrentChallengeStatus';
import rfsPlay from '@/services/rfsPlay';

import Finger from '~/images/hands/hand-finger-2.png';
import Rock from '~/images/hands/hand-rock-2.png';
import Scissors from '~/images/hands/hand-scissors-1.png';

export default function ChoosePage() {
  const router = useRouter();
  const { address } = useAccount();

  const [selected, setSelected] = useState<number | null>(null);
  const [showSelected, setShowSelected] = useState<boolean>(false);

  const select = async (choice: number) => {
    if (!address) {
      return false;
    }

    setSelected(choice);

    try {
      await rfsPlay(choice);
    } catch (e) {
      setShowSelected(false);
      setSelected(null);
      // eslint-disable-next-line no-console
      console.error(e);
    }

    const { status } = await rfsGetCurrentChallengeStatus(address);

    if (status == 3) {
      router.push('/play');
    }
  };

  useEffect(() => {
    const getStatus = async (address: `0x${string}`) => {
      const { challengeId, status } = await rfsGetCurrentChallengeStatus(
        address
      );

      return { challengeId, status };
    };

    if (address) {
      getStatus(address)
        .then(({ status }) => {
          if (status == 3) {
            router.push('/play');
          }
        })
        // eslint-disable-next-line no-console
        .catch(console.error);
    } else {
      router.push('/');
    }
  }, [address, router]);

  return (
    <Layout>
      <Seo templateTitle='Choose' />

      <main>
        <section className='overflow-hidden px-2'>
          <div className='relative flex min-h-screen flex-col'>
            <div className='absolute top-24 left-1/2 -translate-x-1/2 md:top-0 md:left-0 md:translate-x-0'>
              <Title>Choose!</Title>
            </div>
            {selected != null && showSelected && (
              <div className='mt-48 flex h-full w-full grow flex-row items-stretch justify-around'>
                <HoverHand
                  active={true}
                  image={getImageByChoice(selected)}
                  handClasses='relative flex h-auto w-1/3 flex-col items-center justify-center'
                >
                  "{getTitleByChoice(selected)}"
                </HoverHand>
              </div>
            )}
            <AnimatePresence>
              {selected == null && (
                <motion.div
                  onAnimationComplete={() => setShowSelected(true)}
                  exit={{ y: 800 }}
                  className='mt-48 flex h-full w-full grow flex-row items-stretch justify-around'
                >
                  <HoverHand
                    onClick={() => select(1)}
                    image={Rock}
                    handClasses='relative flex h-auto w-1/3 flex-col items-center justify-center'
                  >
                    "rock"
                  </HoverHand>
                  <HoverHand
                    onClick={() => select(2)}
                    image={Finger}
                    handClasses='relative flex h-auto w-1/3 flex-col items-center justify-center'
                  >
                    "finger"
                  </HoverHand>
                  <HoverHand
                    onClick={() => select(3)}
                    image={Scissors}
                    handClasses='relative flex h-auto w-1/3 flex-col items-center justify-center'
                  >
                    "scissors"
                  </HoverHand>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>
    </Layout>
  );
}
