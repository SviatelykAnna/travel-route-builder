import { Handle, Position } from '@xyflow/react';
import type { Node, NodeProps } from '@xyflow/react';
import { memo } from 'react';

import { cn } from '@/lib/utils';

import type { CountryNodeData } from '../lib/tripBuilderSchema';
import type { NODE_TYPES } from '../types';

export type CountryNodeType = Node<CountryNodeData, typeof NODE_TYPES.COUNTRY>;

const CountryNode = ({ data, ...props }: NodeProps<CountryNodeType>) => {
  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-xl border border-amber-400 bg-white px-4 py-3 transition-colors hover:bg-indigo-400/10',
        {
          'ring-2 ring-indigo-400': props.selected && !props.dragging,
          'border-dashed': props.dragging,
        },
      )}
    >
      <img src={data.flags.png} alt={data.name.common} className="h-auto w-5 shrink-0" />
      <p>{data.name.common}</p>

      <Handle
        position={Position.Left}
        type="target"
        className="-left-1! h-2! w-2! rounded-full! border-2! border-white! bg-amber-400! ring-1! ring-amber-400!"
      />
      <Handle
        position={Position.Right}
        type="source"
        className="-right-1! h-2! w-2! rounded-full! border-2! border-white! bg-amber-400! ring-1! ring-amber-400!"
      />
    </div>
  );
};

export default memo(CountryNode);
