import { Handle, Position, useNodeConnections } from '@xyflow/react';
import type { Node, NodeProps } from '@xyflow/react';
import { LandmarkIcon, SparklesIcon } from 'lucide-react';
import { memo } from 'react';

import { cn } from '@/lib/utils';

import type { LandmarkNodeData } from '../lib/tripBuilderSchema';
import type { NODE_TYPES } from '../types';

export type LandmarkNodeType = Node<LandmarkNodeData, typeof NODE_TYPES.LANDMARK>;

const handleClass =
  'border-card! h-2! w-2! rounded-full! border-2! bg-rose-500! ring-1! ring-rose-500!';

const LandmarkNode = ({ data, ...props }: NodeProps<LandmarkNodeType>) => {
  const connections = useNodeConnections({
    handleType: 'target',
  });
  return (
    <div
      className={cn(
        'bg-card text-card-foreground relative w-56 rounded-xl border border-rose-400 shadow-sm transition-all',
        !props.dragging && 'hover:shadow-md',
        {
          'ring-2 ring-rose-300': props.selected && !props.dragging,
          'border-dashed opacity-80': props.dragging,
        },
      )}
    >
      <div className="flex items-center justify-between rounded-t-lg bg-rose-500 px-3 py-1.5">
        <div className="flex items-center gap-1.5">
          <LandmarkIcon className="size-3.5 text-white" />
          <span className="text-xs font-medium text-white/90">Landmark</span>
        </div>
        {data.importance && (
          <div className="flex items-center gap-1 rounded-full bg-white/20 px-1.5 py-0.5">
            <SparklesIcon className="size-3 text-white" />
            <span className="text-xs font-medium text-white">{data.importance}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 px-3 py-2.5">
        <p className="text-sm leading-snug font-medium">{data.name}</p>

        {data.description && (
          <p className="text-muted-foreground line-clamp-2 border-t border-rose-200 pt-2 text-xs leading-relaxed dark:border-rose-500/30">
            {data.description}
          </p>
        )}
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

export default memo(LandmarkNode);
