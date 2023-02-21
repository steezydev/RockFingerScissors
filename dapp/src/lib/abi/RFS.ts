const ABI = [
  {
    inputs: [
      {
        internalType: 'uint64',
        name: '_subscriptionId',
        type: 'uint64',
      },
      {
        internalType: 'bytes32',
        name: '_keyHash',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: '_coordinator',
        type: 'address',
      },
      {
        internalType: 'uint32',
        name: '_callbackGasLimit',
        type: 'uint32',
      },
      {
        internalType: 'uint16',
        name: '_requestConfirmations',
        type: 'uint16',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'have',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'want',
        type: 'address',
      },
    ],
    name: 'OnlyCoordinatorCanFulfill',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'challengeId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'player',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'enum Rps.StatusEnum',
        name: 'status',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'playerChoice',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'hostChoice',
        type: 'uint8',
      },
    ],
    name: 'ChallengeClosed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'challengeId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'player',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'enum Rps.StatusEnum',
        name: 'status',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'playerChoice',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'hostChoice',
        type: 'uint8',
      },
    ],
    name: 'ChallengeOpened',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferRequested',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_challengeId',
        type: 'uint256',
      },
    ],
    name: 'getChallengeStatus',
    outputs: [
      {
        internalType: 'enum Rps.StatusEnum',
        name: 'status',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'challengeId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'player',
        type: 'address',
      },
      {
        internalType: 'uint8',
        name: 'playerChoice',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'hostChoice',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_player',
        type: 'address',
      },
    ],
    name: 'getCurrentChallengeStatus',
    outputs: [
      {
        internalType: 'enum Rps.StatusEnum',
        name: 'status',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'challengeId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'player',
        type: 'address',
      },
      {
        internalType: 'uint8',
        name: 'playerChoice',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'hostChoice',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: '_choice',
        type: 'uint8',
      },
    ],
    name: 'play',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: 'randomWords',
        type: 'uint256[]',
      },
    ],
    name: 'rawFulfillRandomWords',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 's_challenges',
    outputs: [
      {
        internalType: 'bool',
        name: 'exists',
        type: 'bool',
      },
      {
        internalType: 'address',
        name: 'player',
        type: 'address',
      },
      {
        internalType: 'enum Rps.StatusEnum',
        name: 'status',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'playerChoice',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'hostChoice',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 's_currentGame',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

export default ABI;
