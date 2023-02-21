import Finger from '~/images/hands/hand-finger-2.png';
import Rock from '~/images/hands/hand-rock-2.png';
import Scissors from '~/images/hands/hand-scissors-1.png';

export const getImageByChoice = (choice: number | null) => {
  switch (choice) {
    case 1:
      return Rock;
    case 2:
      return Finger;
    case 3:
      return Scissors;
    default:
      return Rock;
  }
};

export const getTitleByChoice = (choice: number | null) => {
  switch (choice) {
    case 1:
      return 'rock';
    case 2:
      return 'finger';
    case 3:
      return 'scissors';
    default:
      return 'rock';
  }
};
