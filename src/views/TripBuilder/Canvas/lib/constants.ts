import { ConnectionLineType, MarkerType } from '@xyflow/react';
import type { NodeTypes } from '@xyflow/react';

import BeachNode from '../nodes/Beach';
import CountryNode from '../nodes/Country';
import HotelNode from '../nodes/Hotel';
import LandmarkNode from '../nodes/Landmark';
import RestaurantNode from '../nodes/Restaurant';
import { NODE_TYPES } from '../types';

export const defaultEdgeOptions = {
  markerEnd: { type: MarkerType.Arrow },
  pathOptions: { offset: 5 },
  type: ConnectionLineType.Bezier,
};

export const nodeTypes: NodeTypes = {
  [NODE_TYPES.COUNTRY]: CountryNode,
  [NODE_TYPES.BEACH]: BeachNode,
  [NODE_TYPES.HOTEL]: HotelNode,
  [NODE_TYPES.LANDMARK]: LandmarkNode,
  [NODE_TYPES.RESTAURANT]: RestaurantNode,
};

export const routeRules = `{
  "blockedEdges": [
    { "from": "FR", "to": "DE" },
    { "from": "IT", "to": "ES" }
  ]
}`;
