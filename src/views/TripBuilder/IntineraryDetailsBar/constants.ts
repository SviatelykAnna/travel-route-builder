import { Hotel, Landmark, Palmtree, Utensils } from 'lucide-react';

import { NODE_TYPES } from '../Canvas/types';

export const itineraryItems = [
  {
    type: NODE_TYPES.HOTEL,
    label: 'Hotel',
    icon: Hotel,
    color: 'text-violet-500',
    border: 'border-b-violet-500',
    data: {
      name: 'Some boutique hotel',
      description: 'Where your suitcase rests and Wi-Fi passwords are hunted.',
      nights: 3,
      notes: ['Late check-in', 'Early coffee.'],
    },
  },
  {
    type: NODE_TYPES.BEACH,
    label: 'Beach',
    icon: Palmtree,
    color: 'text-cyan-500',
    border: 'border-b-cyan-500',
    data: {
      name: 'Whitehaven Beach',
      description: 'Sun, sand, and the strong urge to do absolutely nothing.',
      notes: 'Bring sunscreen. And patience.',
    },
  },
  {
    type: NODE_TYPES.LANDMARK,
    label: 'Landmark',
    icon: Landmark,
    color: 'text-rose-500',
    border: 'border-b-rose-500',
    data: {
      name: 'Sydney Opera House',
      description: 'A must-see spot for photos you’ll post later.',
      importance: 'Iconic',
    },
  },
  {
    type: NODE_TYPES.RESTAURANT,
    label: 'Restaurant',
    icon: Utensils,
    color: 'text-orange-500',
    border: 'border-b-orange-500',
    data: {
      name: 'The Fish Shop',
      description: 'The reason the trip budget quietly disappears.',
      cuisine: 'Local',
      reservation: true,
    },
  },
];
