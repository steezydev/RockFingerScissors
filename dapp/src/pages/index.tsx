import { ConnectButton } from '@rainbow-me/rainbowkit';
import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';
import { useAccount } from 'wagmi';

import { bcsscanUrl, githubUrl } from '@/lib/const';

import AccentButton from '@/components/AccentButton/AccentButton';
import BetBox from '@/components/BetBox/BetBox';
import HandWrapper from '@/components/HandWrapper/HandWrapper';
import IconLink from '@/components/IconLink/IconLink';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Title from '@/components/Title/Title';

import Pointer1 from '~/images/hands/hand-point-1.png';
import Pointer2 from '~/images/hands/hand-point-2.png';
import BinanceIcon from '~/svg/Binance.svg';
import GithubIcon from '~/svg/Github.svg';

export default function AllsetPage() {
  const { address } = useAccount();

  return (
    <Layout>
      <Seo templateTitle='Welcome' />

      <main>
        <section className='overflow-hidden px-2'>
          <div className='relative flex min-h-screen flex-col'>
            <div className='absolute top-24 left-1/2 flex w-full -translate-x-1/2 items-start justify-between md:top-0 md:left-0 md:translate-x-0'>
              <div>
                <Title>Welcome!</Title>
                <div className='flex flex-col pl-3 font-accent font-light text-white/70'>
                  <span>Welcome to Rock Finger Scissors!</span>
                  <span>Connect your wallet to start playing.</span>
                  <span>Good luck...</span>
                </div>
              </div>
              <div className='flex flex-col items-end gap-3 pt-5'>
                <ConnectButton />
                {address && <BetBox />}
              </div>
            </div>
            <motion.div
              layout
              className='flex h-full w-full flex-grow flex-row items-center justify-center gap-[576px]'
            >
              <AnimatePresence>
                {address && (
                  <motion.div layout>
                    <HandWrapper
                      initial={{ y: 1000 }}
                      animate={{ y: 600 }}
                      hover={{ y: 500 }}
                      skinIndex={1}
                      image={Pointer1}
                    >
                      <AccentButton
                        href='/choose'
                        title='Play'
                        description='Start a new game...'
                      />
                    </HandWrapper>
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                <motion.div layout>
                  <HandWrapper
                    initial={{ y: 1000 }}
                    animate={{ y: 600 }}
                    hover={{ y: 500 }}
                    skinIndex={0}
                    image={Pointer2}
                  >
                    <AccentButton
                      href='/rules'
                      title='Rules'
                      description='Read the rules...'
                    />
                  </HandWrapper>
                </motion.div>
              </AnimatePresence>
            </motion.div>
            <div className='absolute bottom-6 left-5 flex flex-row gap-5'>
              <IconLink href={githubUrl}>
                <GithubIcon />
              </IconLink>
              <IconLink href={bcsscanUrl}>
                <BinanceIcon />
              </IconLink>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
