import * as React from 'react';

import { bcsscanUrl, githubUrl, twitterUrl } from '@/lib/const';

import AccentButton from '@/components/AccentButton/AccentButton';
import HandWrapper from '@/components/HandWrapper/HandWrapper';
import IconLink from '@/components/IconLink/IconLink';

import BinanceIcon from '~/svg/Binance.svg';
import GithubIcon from '~/svg/Github.svg';
import TwitterIcon from '~/svg/Twitter.svg';

export default function HomePage() {
  return (
    <main>
      <section className='overflow-hidden px-2'>
        <div className='relative flex min-h-screen flex-col'>
          <div className='absolute top-24 left-1/2 -translate-x-1/2 md:top-0 md:left-0 md:translate-x-0'>
            <h1>Welcome!</h1>
          </div>
          <div className='flex h-full flex-grow flex-col items-center justify-center'>
            <HandWrapper>
              <AccentButton
                title='Connect wallet'
                description='Connect only burner wallet to keep your funds safe!'
              />
            </HandWrapper>
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
  );
}
