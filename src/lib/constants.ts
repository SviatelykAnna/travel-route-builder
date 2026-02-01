import { ConnectionLineType, MarkerType } from '@xyflow/react';

export const defaultEdgeOptions = {
  deletable: false,
  focusable: false,
  markerEnd: { type: MarkerType.Arrow },
  pathOptions: { offset: 5 },
  selectable: false,
  type: ConnectionLineType.Bezier,
};
