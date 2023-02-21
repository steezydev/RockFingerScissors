// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract Rps is VRFConsumerBaseV2, ConfirmedOwner {
    enum StatusEnum {
        WON, // Player WON the challenge
        LOST, // Player LOST the challenge
        TIE, // A TIE
        PENDING // Challenge is PENDING
    }

    struct ChallengeStatus {
        bool exists; // whether a challenge exists
        address player;
        StatusEnum status;
        uint8 playerChoice;
        uint8 hostChoice;
    }

    mapping(address => uint256) public s_currentGame;
    mapping(uint256 => ChallengeStatus) public s_challenges;

    VRFCoordinatorV2Interface COORDINATOR;

    // Chainlink subscription ID.
    uint64 subscriptionId;

    // Gas lane keyHash
    bytes32 keyHash;

    uint32 callbackGasLimit;

    uint16 requestConfirmations;

    // 1 random value
    uint8 numWords = 1;

    event ChallengeOpened(
        uint256 indexed challengeId,
        address indexed player,
        StatusEnum indexed status,
        uint8 playerChoice,
        uint8 hostChoice
    );

    event ChallengeClosed(
        uint256 indexed challengeId,
        address indexed player,
        StatusEnum indexed status,
        uint8 playerChoice,
        uint8 hostChoice
    );

    modifier OnlyValidRps(uint8 _choice) {
        require(
            _choice > 0 && _choice < 4,
            "Choice must be a number between 1 & 3"
        );
        _;
    }

    constructor(
        uint64 _subscriptionId,
        bytes32 _keyHash,
        address _coordinator,
        uint32 _callbackGasLimit,
        uint16 _requestConfirmations
    ) VRFConsumerBaseV2(_coordinator) ConfirmedOwner(msg.sender) {
        COORDINATOR = VRFCoordinatorV2Interface(_coordinator);
        subscriptionId = _subscriptionId;
        keyHash = _keyHash;
        callbackGasLimit = _callbackGasLimit;
        requestConfirmations = _requestConfirmations;
    }

    function getCurrentChallengeStatus(
        address _player
    )
        external
        view
        returns (
            StatusEnum status,
            uint256 challengeId,
            address player,
            uint8 playerChoice,
            uint8 hostChoice
        )
    {
        uint256 currentChallengeId = s_currentGame[_player];
        return getChallengeStatus(currentChallengeId);
    }

    function getChallengeStatus(
        uint256 _challengeId
    )
        public
        view
        returns (
            StatusEnum status,
            uint256 challengeId,
            address player,
            uint8 playerChoice,
            uint8 hostChoice
        )
    {
        require(s_challenges[_challengeId].exists, "Challenge not found");
        ChallengeStatus memory challenge = s_challenges[_challengeId];
        return (
            challenge.status,
            _challengeId,
            challenge.player,
            challenge.playerChoice,
            challenge.hostChoice
        );
    }

    function play(uint8 _choice) external OnlyValidRps(_choice) {
        openChallange(msg.sender, _choice);
    }

    function determineWinner(
        uint8 value1,
        uint8 value2
    ) internal pure returns (StatusEnum) {
        if (value1 == value2) {
            return StatusEnum.TIE;
        } else if (
            (value1 == 1 && value2 == 3) ||
            (value1 == 2 && value2 == 1) ||
            (value1 == 3 && value2 == 2)
        ) {
            return StatusEnum.WON;
        }

        return StatusEnum.LOST;
    }

    function openChallange(
        address _player,
        uint8 _choice
    ) internal OnlyValidRps(_choice) returns (uint256 challengeId) {
        //require(s_challenges[_player].status != StatusEnum.PENDING, "The previous game has not finished");

        // Will revert if subscription is not set and funded.
        challengeId = COORDINATOR.requestRandomWords(
            keyHash,
            subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );

        s_currentGame[_player] = challengeId;
        s_challenges[challengeId] = ChallengeStatus({
            exists: true,
            player: _player,
            status: StatusEnum.PENDING,
            playerChoice: _choice,
            hostChoice: 0
        });

        emit ChallengeOpened(
            challengeId,
            _player,
            StatusEnum.PENDING,
            _choice,
            0
        );

        return challengeId;
    }

    function fulfillRandomWords(
        uint256 challengeId,
        uint256[] memory _randomWords
    ) internal override {
        ChallengeStatus memory _challenge = s_challenges[challengeId];

        require(_challenge.exists, "Challenge not found");

        uint8 _hostChoice = uint8((_randomWords[0] % 3) + 1);
        StatusEnum _status = determineWinner(
            _challenge.playerChoice,
            _hostChoice
        );

        s_challenges[challengeId].hostChoice = _hostChoice;
        s_challenges[challengeId].status = _status;

        emit ChallengeClosed(
            challengeId,
            _challenge.player,
            _status,
            _challenge.playerChoice,
            _hostChoice
        );
    }
}
