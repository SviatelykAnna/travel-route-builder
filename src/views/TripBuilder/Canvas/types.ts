import type { Node } from '@xyflow/react';

import type { CountryNodeData, HotelNodeData } from './lib/graphSchema';
import type CountryNode from './nodes/Country';

export const NODE_TYPES = {
  BEACH: 'beach',
  HOTEL: 'hotel',
  COUNTRY: 'country',
} as const;

export type NodeType = (typeof NODE_TYPES)[keyof typeof NODE_TYPES];

export type GraphNode = typeof CountryNode;
export type GraphNodeData = CountryNodeData | HotelNodeData;

export type GraphFlowNode = Node<GraphNodeData, NodeType>;
