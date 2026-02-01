import type { Node } from '@xyflow/react';

import type { CountryNodeData, HotelNodeData } from './graphSchema';
import type { CountryNode } from './nodes/CountryNode';
import type { HotelNode } from './nodes/HotelNode';

export const NODE_TYPES = {
  BEACH: 'beach',
  HOTEL: 'hotel',
  COUNTRY: 'country',
} as const;

export type NodeType = (typeof NODE_TYPES)[keyof typeof NODE_TYPES];

export type GraphNode = CountryNode | HotelNode;
export type GraphNodeData = CountryNodeData | HotelNodeData;

export type GraphFlowNode = Node<GraphNodeData, NodeType>;
