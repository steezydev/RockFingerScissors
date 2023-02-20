import { IHandsImgs } from '@/types/hands';

import Point1 from '~/images/hands/hand-point-1.png';
import Scissors1 from '~/images/hands/hand-point-1.png';
import Finger1 from '~/images/hands/hand-point-1.png';
import Rock1 from '~/images/hands/hand-point-1.png';
import Ok1 from '~/images/hands/hand-point-1.png';
import Point2 from '~/images/hands/hand-point-2.png';
import Scissors2 from '~/images/hands/hand-point-2.png';
import Finger2 from '~/images/hands/hand-point-2.png';
import Rock2 from '~/images/hands/hand-point-2.png';
import Ok2 from '~/images/hands/hand-point-2.png';
import Point3 from '~/images/hands/hand-point-3.png';
import Scissors3 from '~/images/hands/hand-point-3.png';
import Finger3 from '~/images/hands/hand-point-3.png';
import Rock3 from '~/images/hands/hand-point-3.png';
import Ok3 from '~/images/hands/hand-point-3.png';

const bcsscanUrl = '';
const twitterUrl = 'https://twitter.com/0xsteezy';
const githubUrl = 'https://github.com/steezydev';

export const hands: IHandsImgs = {
  point: [Point1, Point2, Point3],
  scissors: [Scissors1, Scissors2, Scissors3],
  finger: [Finger1, Finger2, Finger3],
  rock: [Rock1, Rock2, Rock3],
  ok: [Ok1, Ok2, Ok3],
};

export { bcsscanUrl, githubUrl, twitterUrl };
