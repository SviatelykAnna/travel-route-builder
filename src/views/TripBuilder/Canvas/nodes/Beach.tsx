import { Handle, Position, useNodeConnections } from '@xyflow/react';
import type { Node, NodeProps } from '@xyflow/react';
import { SunIcon } from 'lucide-react';
import { memo } from 'react';

import { cn } from '@/lib/utils';

import type { BeachNodeData } from '../lib/tripBuilderSchema';
import type { NODE_TYPES } from '../types';

export type BeachNodeType = Node<BeachNodeData, typeof NODE_TYPES.BEACH>;

const handleClass =
  'border-card! h-2! w-2! rounded-full! border-2! bg-sky-400! ring-1! ring-sky-400!';

const BeachNode = ({ data, ...props }: NodeProps<BeachNodeType>) => {
  const connections = useNodeConnections({
    handleType: 'target',
  });

  return (
    <div
      className={cn(
        'bg-card text-card-foreground relative w-56 rounded-xl border border-sky-400 shadow-sm transition-all',
        !props.dragging && 'hover:shadow-md',
        {
          'ring-2 ring-sky-300': props.selected && !props.dragging,
          'border-dashed opacity-80': props.dragging,
        },
      )}
    >
      <div className="flex items-center justify-between rounded-t-lg bg-linear-to-r from-sky-400 to-cyan-400 px-3 py-1.5">
        <div className="flex items-center gap-1.5">
          <SunIcon className="size-3.5 text-white" />
          <span className="text-xs font-medium text-white/90">Beach</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 px-3 py-2.5">
        <p className="text-sm leading-snug font-medium">{data.name}</p>

        <div className="flex flex-col gap-1.5 border-t border-sky-200 pt-2 dark:border-sky-500/30">
          {data.description && (
            <p className="text-muted-foreground line-clamp-2 text-xs leading-relaxed">
              {data.description}
            </p>
          )}
        </div>
      </div>

      <Handle
        isConnectable={connections.length < 1}
        position={Position.Left}
        type="target"
        className={cn(handleClass, '-left-1!')}
      />
    </div>
  );
};

export default memo(BeachNode);
