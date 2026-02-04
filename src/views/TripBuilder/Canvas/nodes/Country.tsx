import { Handle, Position } from '@xyflow/react';
import type { Node, NodeProps } from '@xyflow/react';
import { memo } from 'react';

import { cn } from '@/lib/utils';

import type { CountryNodeData } from '../lib/tripBuilderSchema';
import type { NODE_TYPES } from '../types';

export type CountryNodeType = Node<CountryNodeData, typeof NODE_TYPES.COUNTRY>;

const handleClass =
  'border-card! h-2! w-2! rounded-full! border-2! bg-amber-400! ring-1! ring-amber-400!';

const CountryNode = ({ data, ...props }: NodeProps<CountryNodeType>) => {
  return (
    <div
      className={cn(
        'bg-card text-card-foreground flex items-center gap-2 rounded-xl border border-amber-400 px-4 py-3 transition-colors',
        !props.dragging && 'hover:bg-accent',
        {
          'ring-2 ring-indigo-400': props.selected && !props.dragging,
          'border-dashed': props.dragging,
        },
      )}
    >
      <img src={data.flags.png} alt={data.name.common} className="h-auto w-5 shrink-0" />
      <p>{data.name.common}</p>

      <Handle position={Position.Left} type="target" className={cn(handleClass, '-left-1!')} />
      <Handle position={Position.Right} type="source" className={cn(handleClass, '-right-1!')} />
    </div>
  );
};

export default memo(CountryNode);
