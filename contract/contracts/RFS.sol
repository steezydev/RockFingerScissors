// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract RFS is VRFConsumerBaseV2, ConfirmedOwner {
    enum StatusEnum {
        WON, // Player WON the challenge
        LOST, // Player LOST the challenge
        TIE, // A TIE
        PENDING // Challenge is PENDING
    }

    struct ChallengeStatus {
        bool exists; // whether a challenge exists
        uint256 bet;
        address player;
        StatusEnum status;
        uint8 playerChoice;
        uint8 hostChoice;
    }

    uint256 constant minBet = 0.001 ether;
    uint256 constant maxBet = 0.1 ether;
    uint8 constant numWords = 1;

    mapping(address => uint256) public s_currentGame;
    mapping(uint256 => ChallengeStatus) public s_challenges;

    VRFCoordinatorV2Interface COORDINATOR;

    // Chainlink subscription ID.
    uint64 subscriptionId;

    // Gas lane keyHash
    bytes32 keyHash;

    uint32 callbackGasLimit;

    uint16 requestConfirmations;

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

    event Received(address sender, uint256 value);

    modifier OnlyValidRps(uint8 _choice) {
        require(
            _choice > 0 && _choice < 4,
            "Choice must be a number between 1 & 3"
        );
        _;
    }

    modifier OnlyEnoughBalance(uint256 _amount) {
        require(_amount <= address(this).balance, "Insufficient balance");
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

    function play(
        uint8 _choice
    ) external payable OnlyValidRps(_choice) OnlyEnoughBalance(msg.value * 2) {
        require(msg.value >= minBet && msg.value <= maxBet, "Invalid bet");
        openChallange(msg.sender, _choice, msg.value);
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
        uint8 _choice,
        uint256 _bet
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
            bet: _bet,
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

    function payWinner(
        address _recipient,
        uint256 _amount
    ) internal OnlyEnoughBalance(_amount) {
        payable(_recipient).transfer(_amount);
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

        if (_status == StatusEnum.WON) {
            payWinner(_challenge.player, _challenge.bet * 2);
        } else if (_status == StatusEnum.TIE) {
            payWinner(_challenge.player, _challenge.bet);
        }

        emit ChallengeClosed(
            challengeId,
            _challenge.player,
            _status,
            _challenge.playerChoice,
            _hostChoice
        );
    }

    function withdraw() public onlyOwner {
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os);
    }

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }
}
