import { nanoid } from 'nanoid';

import algaeImageUrl from './assets/algae.png';
import antsImageUrl from './assets/ants.png';
import claptrapImageUrl from './assets/claptrap.png';
import ductTapeImageUrl from './assets/duct-tape.png';
import potatoesImageUrl from './assets/potatoes.png';
import railsImageUrl from './assets/rails.png';
import rocketLauncherImageUrl from './assets/rocket-launcher.png';
import roverImageUrl from './assets/rover.png';

export const storageItems = [
  {
    id: nanoid(),
    title: 'Rocket launcher',
    description:
      'A rocket launcher is a device that launches an unguided, rocket-propelled projectile.',
    value: 100,
    weight: 500,
    imageUrl: rocketLauncherImageUrl
  },
  {
    id: nanoid(),
    title: 'Martian rails',
    description: 'Fast and cheap transportation for goods and guys.',
    value: 250,
    weight: 3000,
    imageUrl: railsImageUrl
  },
  {
    id: nanoid(),
    title: 'Ants',
    description:
      'Although an important part of many ecosystems, ants can also be detrimental to other organisms.',
    value: 25,
    weight: 100,
    imageUrl: antsImageUrl
  },
  {
    id: nanoid(),
    title: 'Rover',
    description: 'Providing safe transport vehicles.',
    value: 500,
    weight: 1000,
    imageUrl: roverImageUrl
  },
  {
    id: nanoid(),
    title: 'Arctic algae',
    description: 'Suitable for freezing temperatures.',
    value: 750,
    weight: 100,
    imageUrl: algaeImageUrl
  },
  {
    id: nanoid(),
    title: 'Robotic workforce',
    description: 'Machines must suffer.',
    value: 2750,
    weight: 1500,
    imageUrl: claptrapImageUrl
  },
  {
    id: nanoid(),
    title: 'Potato seeds',
    description: 'Dip this potato in some grenadine.',
    value: 1650,
    weight: 450,
    imageUrl: potatoesImageUrl
  },
  {
    id: nanoid(),
    title: 'Duct tape',
    description: 'Your chance to have a real MacGyver moment.',
    value: 1750,
    weight: 325,
    imageUrl: ductTapeImageUrl
  }
];
