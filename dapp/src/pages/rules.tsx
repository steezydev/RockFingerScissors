import * as React from 'react';

import { bcsscanUrl, githubUrl, twitterUrl } from '@/lib/const';

import IconLink from '@/components/IconLink/IconLink';
import Layout from '@/components/layout/Layout';
import Lineup from '@/components/Lineup/Lineup';
import Seo from '@/components/Seo';

import Finger1 from '~/images/hands/hand-finger-1.png';
import Rock1 from '~/images/hands/hand-rock-1.png';
import Scissors1 from '~/images/hands/hand-scissors-1.png';
import BinanceIcon from '~/svg/Binance.svg';
import GithubIcon from '~/svg/Github.svg';
import TwitterIcon from '~/svg/Twitter.svg';

export default function RulesPage() {
  return (
    <Layout>
      <Seo templateTitle='Rules...' />

      <main>
        <section className='overflow-hidden px-2'>
          <div className='relative flex min-h-screen flex-col'>
            <div className='absolute top-24 left-1/2 -translate-x-1/2 md:top-0 md:left-0 md:translate-x-0'>
              <h1>Rules...</h1>
              <div className='flex flex-row  items-center gap-5'>
                <svg
                  width='40'
                  height='40'
                  viewBox='0 0 50 50'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M32.7231 36.0269C33.5367 36.8404 33.5367 38.1595 32.7231 38.9731C31.9095 39.7867 30.5904 39.7867 29.7768 38.9731L17.2768 26.4731C16.4632 25.6595 16.4632 24.3404 17.2768 23.5269L29.7768 11.0269C30.5904 10.2133 31.9095 10.2133 32.7231 11.0269C33.5367 11.8404 33.5367 13.1595 32.7231 13.9731L21.6962 25L32.7231 36.0269Z'
                    fill='white'
                  />
                </svg>

                <span className='font-display text-4xl font-semibold'>
                  Back
                </span>
              </div>
            </div>

            <div className='mt-96 flex h-full flex-row items-center justify-center gap-28'>
              <span className='font-grand text-9xl text-white/70'>«</span>
              <div className='flex'>
                <div className='flex flex-col items-center justify-center gap-10 font-grand text-2xl '>
                  <span>You play against smart-contract</span>
                  <span>Default bet is 0.01 TBNB</span>
                  <span>If you win, you get 0.02 TBNB as your reward </span>
                </div>
              </div>
              <span className='font-grand text-9xl text-white/70'>»</span>
            </div>
            <div className='mt-10 flex flex-col gap-10'>
              <Lineup hand1={Rock1} hand2={Scissors1} />
              <Lineup hand1={Scissors1} hand2={Finger1} />
              <Lineup hand1={Finger1} hand2={Rock1} />
            </div>

            <div className='absolute bottom-6 left-5 flex flex-row gap-5'>
              <IconLink href={twitterUrl}>
                <TwitterIcon />
              </IconLink>
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
