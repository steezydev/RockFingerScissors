import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

import { getImageByChoice } from '@/lib/getChoice';
import useChallengeWatch from '@/hooks/useChallengeWatch';

import Layout from '@/components/layout/Layout';
import Lineup from '@/components/Lineup/Lineup';
import Seo from '@/components/Seo';
import Title from '@/components/Title/Title';

import rfsGetCurrentChallengeStatus from '@/services/rfsGetCurrentChallengeStatus';

export default function Play() {
  const router = useRouter();
  const { address } = useAccount();

  // eslint-disable-next-line unused-imports/no-unused-vars
  const [challengeId, setChallengeId] = useState<number | null>(null);
  const [playerChoice, setPlayerChoice] = useState<number | null>(null);
  const [hostChoice, setHostChoice] = useState<number | null>(null);
  const [status, setStatus] = useState<number | null>(null);

  const [secondsLeft, setSecondsLeft] = useState(5);

  useChallengeWatch(
    address,
    setChallengeId,
    setPlayerChoice,
    setHostChoice,
    setStatus
  );

  // useEffect(() => {
  //   console.log(challengeId, status, playerChoice, hostChoice);
  // }, [challengeId, playerChoice, hostChoice, status]);

  useEffect(() => {
    const getStatus = async (address: `0x${string}`) => {
      const { status, challengeId, player, playerChoice, hostChoice } =
        await rfsGetCurrentChallengeStatus(address);

      return { status, challengeId, player, playerChoice, hostChoice };
    };

    if (address) {
      getStatus(address)
        .then(({ status, challengeId, playerChoice, hostChoice }) => {
          setChallengeId(challengeId as number);
          setPlayerChoice(playerChoice as number);
          setHostChoice(hostChoice as number);
          setStatus(status as number);
        })
        .catch(() => router.push('/choose'));
    } else {
      router.push('/');
    }
  }, [address, router]);

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    let interval: string | number | NodeJS.Timeout | undefined;

    if (status !== 3) {
      timer = setTimeout(() => {
        router.push('/rematch');
      }, secondsLeft * 1000);

      interval = setInterval(() => {
        setSecondsLeft((prevSecondsLeft) => prevSecondsLeft - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, secondsLeft]);

  return (
    <Layout>
      <Seo templateTitle='Play' />

      <main>
        <section className='overflow-hidden px-2'>
          <div className='relative flex min-h-screen flex-col'>
            <div className='absolute top-24 left-1/2 flex w-full -translate-x-1/2 justify-between md:top-0 md:left-0 md:translate-x-0'>
              {status != null && (
                <Title>
                  {status == 3 && 'Waiting...'}
                  {status == 0 && 'U Won!'}
                  {status == 1 && 'U Lost!'}
                  {status == 2 && 'Tie!'}
                </Title>
              )}
              {status != 3 && status != null && (
                <span className='font-display text-5xl'>{secondsLeft}</span>
              )}
            </div>
            <div className='mt-10 flex grow flex-col justify-center gap-10'>
              <Lineup
                hand1={getImageByChoice(playerChoice)}
                showHand2={status != 3}
                hover={false}
                hand2={getImageByChoice(hostChoice)}
              >
                <span className='font-accent font-bold'>VS</span>
              </Lineup>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
