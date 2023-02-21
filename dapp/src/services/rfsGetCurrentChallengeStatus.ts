import { readContract } from '@wagmi/core';

import { contract } from '@/lib/web3config';

const rfsGetCurrentChallengeStatus = async (address: `0x${string}`) => {
  const { status, challengeId, player, playerChoice, hostChoice } =
    await readContract({
      address: contract.address,
      abi: contract.abi,
      functionName: 'getCurrentChallengeStatus',
      args: [address],
    });

  return { status, challengeId, player, playerChoice, hostChoice };
};

export default rfsGetCurrentChallengeStatus;
