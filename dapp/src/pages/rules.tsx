import * as React from 'react';

import { bcsscanUrl, githubUrl } from '@/lib/const';

import BackButton from '@/components/BackButton/BackButton';
import IconLink from '@/components/IconLink/IconLink';
import Layout from '@/components/layout/Layout';
import Lineup from '@/components/Lineup/Lineup';
import Seo from '@/components/Seo';
import Title from '@/components/Title/Title';

import Finger1 from '~/images/hands/hand-finger-1.png';
import Rock1 from '~/images/hands/hand-rock-1.png';
import Scissors1 from '~/images/hands/hand-scissors-1.png';
import BinanceIcon from '~/svg/Binance.svg';
import GithubIcon from '~/svg/Github.svg';

export default function RulesPage() {
  return (
    <Layout>
      <Seo templateTitle='Rules...' />

      <main>
        <section className='overflow-hidden px-2'>
          <div className='relative flex min-h-screen flex-col'>
            <div className='absolute top-24 left-1/2 -translate-x-1/2 md:top-0 md:left-0 md:translate-x-0'>
              <Title>Rules...</Title>
              <BackButton />
            </div>

            <div className='mt-96 flex h-full flex-row items-center justify-center gap-28'>
              <span className='font-grand text-9xl text-white/70'>«</span>
              <div className='flex'>
                <div className='flex flex-col items-center justify-center gap-10 font-accent text-2xl '>
                  <span>You play against the smart-contract</span>
                  <span>Default bet is 0.001 TBNB</span>
                  <span>
                    If you win, you get double of the bet as your reward{' '}
                  </span>
                </div>
              </div>
              <span className='font-grand text-9xl text-white/70'>»</span>
            </div>
            <div className='mt-32 flex flex-col gap-10'>
              <Lineup hand1={Rock1} hand2={Scissors1}>
                beats...
              </Lineup>
              <Lineup hand1={Scissors1} hand2={Finger1}>
                beats...
              </Lineup>
              <Lineup hand1={Finger1} hand2={Rock1}>
                beats...
              </Lineup>
            </div>

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
