import type { Node } from '@xyflow/react';

import type {
  BeachNodeData,
  CountryNodeData,
  HotelNodeData,
  LandmarkNodeData,
  RestaurantNodeData,
} from './lib/tripBuilderSchema';
import type CountryNode from './nodes/Country';

export const NODE_TYPES = {
  LANDMARK: 'landmark',
  RESTAURANT: 'restaurant',
  COUNTRY: 'country',
  HOTEL: 'hotel',
  BEACH: 'beach',
} as const;

export type NodeType = (typeof NODE_TYPES)[keyof typeof NODE_TYPES];

export type GraphNode = typeof CountryNode;
export type GraphNodeData =
  | CountryNodeData
  | HotelNodeData
  | BeachNodeData
  | LandmarkNodeData
  | RestaurantNodeData;

export type GraphFlowNode = Node<GraphNodeData, NodeType>;
