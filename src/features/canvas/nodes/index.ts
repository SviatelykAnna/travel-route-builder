import type { NodeTypes } from '@xyflow/react';

import { NODE_TYPES } from '@/graph-core/types';

import { CountryNode } from './country';

export const nodeTypes: NodeTypes = {
  [NODE_TYPES.COUNTRY]: CountryNode,
  [NODE_TYPES.BEACH]: CountryNode,
  [NODE_TYPES.HOTEL]: CountryNode,
};
