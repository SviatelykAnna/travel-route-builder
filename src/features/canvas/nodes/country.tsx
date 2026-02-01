import { Handle, Position } from '@xyflow/react';
import type { Node, NodeProps } from '@xyflow/react';
import { memo } from 'react';

import type { CountryNodeData } from '@/graph-core/graphSchema';
import { NODE_TYPES } from '@/graph-core/types';

type CountryNode = Node<CountryNodeData, typeof NODE_TYPES.COUNTRY>;

const CountryNode = ({ data }: NodeProps<CountryNode>) => {
  return (
    <div className="flex items-center gap-2 rounded-2xl border-2 border-amber-400 bg-white p-4">
      <img src={data.flags.png} alt={data.name.common} className="h-auto w-5 shrink-0" />
      <p>{data.name.common}</p>

      <Handle position={Position.Left} type="target" />
      <Handle position={Position.Right} type="source" />
    </div>
  );
};

export default memo(CountryNode);
