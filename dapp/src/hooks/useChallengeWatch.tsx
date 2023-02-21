import { watchContractEvent } from '@wagmi/core';
import { useState } from 'react';

import { contract } from '@/lib/web3config';

export default function useChallengeWatch(
  playerAddressInit: `0x${string}` | undefined,
  setChallengeId: React.Dispatch<React.SetStateAction<number | null>>,
  setPlayerChoice: React.Dispatch<React.SetStateAction<number | null>>,
  setHostChoice: React.Dispatch<React.SetStateAction<number | null>>,
  setStatus: React.Dispatch<React.SetStateAction<number | null>>
) {
  const [playerAddress] = useState<`0x${string}` | undefined>(
    playerAddressInit
  );

  // useContractEvent({
  //   address: contract.address,
  //   abi: contract.abi,
  //   eventName: 'ChallengeOpened',
  //   listener(challengeId, player, status, playerChoice, hostChoice) {
  //     console.log(player);
  //     if (player == playerAddress) {
  //       setChallengeId(challengeId as number);
  //       setPlayerChoice(playerChoice as number);
  //       setHostChoice(hostChoice as number);
  //       setStatus(status as number);
  //     }
  //   },
  // });

  watchContractEvent(
    {
      address: contract.address,
      abi: contract.abi,
      eventName: 'ChallengeClosed',
    },
    (challengeId, player, status, playerChoice, hostChoice) => {
      if (player == playerAddress) {
        setChallengeId(challengeId as number);
        setPlayerChoice(playerChoice as number);
        setHostChoice(hostChoice as number);
        setStatus(status as number);
      }
    }
  );
}
