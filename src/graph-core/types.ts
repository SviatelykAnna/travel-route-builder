import type { Node } from '@xyflow/react';

import type { CountryNode, CountryNodeData } from './CountryNode';

export const NODE_TYPES = {
  BEACH: 'beach',
  HOTEL: 'hotel',
  COUNTRY: 'country',
} as const;

export type NodeType = (typeof NODE_TYPES)[keyof typeof NODE_TYPES];

export type GraphNode = CountryNode;
export type GraphNodeData = CountryNodeData;

export type GraphFlowNode = Node<GraphNodeData, NodeType>;
