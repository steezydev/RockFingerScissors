import { StaticImageData } from 'next/image';

export type THands = 'point' | 'scissors' | 'finger' | 'rock' | 'ok';
export type IHandsImgs = {
  [key in THands]: StaticImageData[];
};
