import { ConnectionLineType, MarkerType } from '@xyflow/react';
import type { NodeTypes } from '@xyflow/react';

import { NODE_TYPES } from '@/graph-core/types';

import CountryNode from '../nodes/Country';

export const defaultEdgeOptions = {
  deletable: false,
  focusable: false,
  markerEnd: { type: MarkerType.Arrow },
  pathOptions: { offset: 5 },
  selectable: false,
  type: ConnectionLineType.Bezier,
};

export const nodeTypes: NodeTypes = {
  [NODE_TYPES.COUNTRY]: CountryNode,
  [NODE_TYPES.BEACH]: CountryNode,
  [NODE_TYPES.HOTEL]: CountryNode,
};
