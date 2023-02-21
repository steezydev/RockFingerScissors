import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from '@wagmi/core';
import { ethers } from 'ethers';

import { contract } from '@/lib/web3config';

const rfsPlay = async (address: string, choice: number, bet: number) => {
  const config = await prepareWriteContract({
    address: contract.address,
    abi: contract.abi,
    functionName: 'play',
    args: [choice],
    overrides: {
      from: address,
      value: ethers.utils.parseEther(bet.toString()),
    },
  });

  const { hash } = await writeContract(config);

  const data = await waitForTransaction({
    hash,
  });

  return data;
};

export default rfsPlay;
