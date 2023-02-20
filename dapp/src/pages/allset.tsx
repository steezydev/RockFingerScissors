import * as React from 'react';

import { bcsscanUrl, githubUrl, twitterUrl } from '@/lib/const';

import AccentButton from '@/components/AccentButton/AccentButton';
import HandWrapper from '@/components/HandWrapper/HandWrapper';
import IconLink from '@/components/IconLink/IconLink';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import Pointer1 from '~/images/hands/hand-point-1.png';
import Pointer2 from '~/images/hands/hand-point-2.png';
import BinanceIcon from '~/svg/Binance.svg';
import GithubIcon from '~/svg/Github.svg';
import TwitterIcon from '~/svg/Twitter.svg';

export default function AllsetPage() {
  return (
    <Layout>
      <Seo templateTitle='Allset!' />

      <main>
        <section className='overflow-hidden px-2'>
          <div className='relative flex min-h-screen flex-col'>
            <div className='absolute top-24 left-1/2 -translate-x-1/2 md:top-0 md:left-0 md:translate-x-0'>
              <h1>All set!</h1>
            </div>
            <div className='flex h-full w-full flex-grow flex-row items-center justify-center gap-[576px]'>
              <HandWrapper
                initial={{ y: 1000 }}
                animate={{ y: 600 }}
                hover={{ y: 500 }}
                skinIndex={1}
                image={Pointer1}
              >
                <AccentButton title='Play' description='Start a new game...' />
              </HandWrapper>
              <HandWrapper
                initial={{ y: 1000 }}
                animate={{ y: 600 }}
                hover={{ y: 500 }}
                skinIndex={0}
                image={Pointer2}
              >
                <AccentButton title='Rules' description='Read the rules...' />
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
    </Layout>
  );
}
