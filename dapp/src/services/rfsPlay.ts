import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from '@wagmi/core';

import { contract } from '@/lib/web3config';

const rfsPlay = async (choice: number) => {
  const config = await prepareWriteContract({
    address: contract.address,
    abi: contract.abi,
    functionName: 'play',
    args: [choice],
  });

  const { hash } = await writeContract(config);

  const data = await waitForTransaction({
    hash,
  });

  return data;
};

export default rfsPlay;
